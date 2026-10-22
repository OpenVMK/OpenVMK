-- Script
property m_camera
property m_feedback
property m_store
property m_scoreSprite
property m_writer
property m_ar_hideables
property m_exitButton
property m_prepared
property m_mp_keystate
property m_bAnimalsInSight
property m_sWindowTitle
property m_bMouseIsDown

on construct me
  m_prepared = 0
  m_sWindowTitle = "JungleCruiseWindow"
  m_bMouseIsDown = 0
  return 1
end
on deconstruct me
  if m_prepared then
    me.UnprepareRoom()
  end if
  set the keyDownScript to EMPTY
  set the keyUpScript to EMPTY
  set the mouseDownScript to EMPTY
  return 1
end
on PrepareRoom me
  put "CJungleCruiseInterface::PrepareRoom - begin"
  executeMessage(#ui_hide)
  m_store = [:]
  m_store.setaProp("keydownscript", the keyDownScript)
  m_store.setaProp("keyupscript", the keyUpScript)
  m_store.setaProp("mousedownscript", the mouseDownScript)
  set the keyDownScript to EMPTY
  set the keyUpScript to EMPTY
  set the mouseDownScript to EMPTY
  put "Create Camera"
  m_camera = createObject("JCCamera", "CGameCamera")
  m_camera.SetConstraints(0, 36, (the stage).image.width, (the stage).image.height)
  put "Create Feedback"
  m_feedback = createObject("JCFeedback", "CScoreFeedback")
  put "Create Writer"
  tFontPlain = getStructVariable("struct.font.plain")
  tFontPlain.setaProp(#color, rgb("#FEFEFE"))
  tFontPlain.setaProp(#bgColor, rgb("#000000"))
  tFontPlain.setaProp(#lineHeight, 25)
  tFontPlain.setaProp(#fontSize, 23)
  tFontPlain.setaProp(#alignment, #center)
  createWriter("JCScoreDisplay", tFontPlain)
  m_writer = getWriter("JCScoreDisplay")
  put "Create Interface"
  createMember("ScoreFloat", #bitmap)
  m_scoreSprite = VOID
  m_exitButton = [:]
  ma_ar_hideables = []
  put "Create Hit Test Timer"
  createTimeout("jc_camera_hittest", 100, #CheckHits, me.getID(), VOID, 0)
  m_bAnimalsInSight = 0
  put "Start Update"
  m_bMouseIsDown = 0
  receiveUpdate(me.getID())
  m_prepared = 1
  put "CJungleCruiseInterface::PrepareRoom - end"
end
on UnprepareRoom me
  put "CJungleCruiseInterface::UnprepareRoom - begin"
  if m_prepared then
    removeTimeout("jc_camera_hittest")
    if not voidp(m_scoreSprite) then
      releaseSprite(m_scoreSprite.spriteNum)
    end if
    if m_exitButton.count <> 0 then
      releaseSprite(m_exitButton.sprite.spriteNum)
    end if
    removeMember("ScoreFloat")
    if not voidp(m_camera) then
      removeObject(m_camera.getID())
    end if
    if not voidp(m_feedback) then
      removeObject(m_feedback.getID())
    end if
    removeUpdate(me.getID())
  end if
  if getWindow(m_sWindowTitle) <> 0 then
    removeWindow(m_sWindowTitle)
  end if
  m_prepared = 0
  put "CJungleCruiseInterface::UnprepareRoom - end"
end
on GetHideables me
  return m_ar_hideables
end
on showJCInterface me
  executeMessage(#ui_hide)
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj = 0 then
    if ilk(m_scoreSprite, #sprite) <> 1 then
      m_scoreSprite = sprite(reserveSprite(me.getID()))
    end if
    m_scoreSprite.member = getMember("ScoreFloat")
    m_scoreSprite.width = m_scoreSprite.member.width
    m_scoreSprite.height = m_scoreSprite.member.height
    m_scoreSprite.loc = point(-100, -100)
    m_scoreSprite.locZ = 3
    m_exitButton = [:]
    m_exitButton[#sprite] = sprite(reserveSprite(me.getID()))
    m_exitButton[#Active] = getMember("button.exitpirates.active")
    m_exitButton[#pressed] = getMember("button.exitpirates.pressed")
    m_exitButton.sprite.member = m_exitButton.Active
    m_exitButton.sprite.width = m_exitButton.sprite.member.width
    m_exitButton.sprite.height = m_exitButton.sprite.member.height
    m_exitButton.sprite.locZ = 4
    m_exitButton.sprite.loc = point(726, 570)
    m_exitButton.sprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
    m_ar_hideables = [m_scoreSprite.spriteNum, m_exitButton.sprite.spriteNum]
    repeat with tHideable in m_camera.GetHideables()
      m_ar_hideables.append(tHideable)
    end repeat
    if createWindow(m_sWindowTitle, "vmk_jc_interface.window", 0, 0) then
      tWndObj = getWindow(m_sWindowTitle)
      me.fixAntialising("gas.amount")
      me.fixAntialising("film.amount")
      me.fixAntialising("jc.score")
      me.fixAntialising("jc.pts", 1)
      me.updateScrollingFilm(me.getComponent().m_filmstrip)
      me.updatePowerups()
      me.updateScoreinfo()
      return 1
    else
      return 0
    end if
  else
    return 1
  end if
end
on fixAntialising me, tElemName, forceupdate
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tElem.pParams.deleteProp(#ink)
      tElem.pParams.deleteProp(#color)
      tElem.pParams.deleteProp(#bgColor)
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.foreColor = 255
        tSprite.bgColor = tElem.pTextMem.bgColor
      end if
      if forceupdate then
        tElem.render()
      end if
    end if
  end if
end
on DisplayPhotoScore me, a_iAmount
  tImage = m_writer.render(string(a_iAmount))
  m_scoreSprite.member.image = tImage
  m_scoreSprite.width = m_scoreSprite.member.width
  m_scoreSprite.height = m_scoreSprite.member.height
  m_scoreSprite.loc = the mouseLoc
  m_scoreSprite.blend = 100
  me.updateScoreinfo()
end
on DisplayFeedback me, i_quality
  m_feedback.display(the mouseLoc, i_quality)
end
on updateScoreinfo me
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    tScore = me.getComponent().GetScore()
    tWndObj.getElement("jc.score").setText(tScore)
  end if
end
on updateScrollingFilm me, i_filmStrip
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement("filmstrip")
    if tElem <> 0 then
      tImg = i_filmStrip.GetThumbnails()
      tElem.feedImage(tImg)
    end if
  end if
end
on updatePowerups me
  tBoat = me.getComponent().GetBoat()
  if tBoat <> 0 then
    tWndObj = getWindow(m_sWindowTitle)
    if tWndObj <> 0 then
      tFilm = tBoat.GetParam("Film")
      tFuel = tBoat.GetParam("Fuel")
      tElem = tWndObj.getElement("film.amount")
      if tElem <> 0 then
        tElem.setText(tFilm)
      end if
      tElem = tWndObj.getElement("gas.amount")
      if tElem <> 0 then
        tElem.setText(tFuel)
      end if
    end if
  end if
end
on CheckHits me
  tHitList = me.getComponent().CheckFrameHit(m_camera)
  if tHitList.count > 0 then
    repeat with tHit in tHitList
      if tHit.accuracy > 30 then
        m_bAnimalsInSight = 1
        exit
      end if
    end repeat
  end if
  m_bAnimalsInSight = 0
end
on RemoveCamera me
  if not voidp(m_camera) then
    removeObject(m_camera.getID())
  end if
  m_camera = VOID
end
on disableCamera me
  m_camera.inActivate()
  repeat with tHideable in m_camera.GetHideables()
    sprite(tHideable).visible = 0
  end repeat
end
on enableCamera me
  put "enable camera"
  m_camera.Activate()
  repeat with tHideable in m_camera.GetHideables()
    sprite(tHideable).visible = 1
  end repeat
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "junglecruise_exit":
      case t_dialogEvent of
        #dialogOK:
          getThread("minigame").getComponent().StopMinigameEngine()
          executeMessage(#ui_show)
          executeMessage(#SendMinigameAction, 8, [])
        #dialogCancel:
          me.enableCamera()

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on JCMouseDown me
  if not me.getComponent().GetGameEnd() then
    if m_exitButton.count <> 0 then
      if (the mouseLoc).inside(m_exitButton.sprite.rect) then
        m_exitButton.sprite.member = m_exitButton.pressed
        if not DialogWindowExists("junglecruise_exit") then
          t = createDialogWindow(me.getID(), "junglecruise_exit", 2, 0)
          t.show()
          t.setText("Do you want to exit?", "Jungle Cruise", "No", "Yes")
        end if
        me.disableCamera()
      else
        if me.getComponent().gameOn() and objectp(m_camera) then
          if m_camera.GetActive() then
            if me.getComponent().GetAvatarInBoat() and not me.getComponent().GetGameEnd() then
              me.getComponent().TakePhoto(m_camera)
            end if
          end if
        end if
      end if
    end if
  end if
end
on update me
  if the mouseDown then
    if not m_bMouseIsDown then
      me.JCMouseDown()
    end if
    m_bMouseIsDown = 1
  else
    if m_bMouseIsDown then
      if m_exitButton.count <> 0 then
        if m_exitButton.sprite.member = m_exitButton.pressed then
          m_exitButton.sprite.member = m_exitButton.Active
          m_exitButton.sprite.width = m_exitButton.sprite.member.width
          m_exitButton.sprite.height = m_exitButton.sprite.member.height
        end if
      end if
      m_bMouseIsDown = 0
    end if
  end if
  if me.getComponent().gameOn() then
    tBoat = me.getComponent().GetBoat()
    if tBoat <> 0 then
      if not voidp(tBoat.GetFactor()) then
        if me.getComponent().GetAvatarInBoat() and not me.getComponent().GetGameEnd() then
          tSize = 1.0
          m_camera.SetLock(m_bAnimalsInSight)
          m_camera.render()
          if keyPressed(123) then
            tBoat.GetFactor().GoLeft()
          end if
          if keyPressed(124) then
            tBoat.GetFactor().GoRight()
          end if
          if keyPressed(126) then
            tBoat.GetFactor().GoUp()
          end if
          if keyPressed(125) then
            tBoat.GetFactor().GoDown()
          end if
        end if
        if not voidp(m_scoreSprite) then
          m_scoreSprite.loc = point(m_scoreSprite.locH, m_scoreSprite.locV - 5)
          tBlend = m_scoreSprite.blend - 4
          if tBlend < 0 then
            tBlend = 0
            m_scoreSprite.member.image = image(0, 0, 8)
            m_scoreSprite.width = m_scoreSprite.member.width
            m_scoreSprite.height = m_scoreSprite.member.height
          end if
          m_scoreSprite.blend = tBlend
        end if
      end if
    end if
  end if
end