-- Parent Script
property m_fireWorkSelector
property m_rStageInfoWindow
property m_ar_fwSpritelist
property m_ar_vicinityList
property m_ar_mp_flashList
property m_ar_pulse
property m_sCurrentSelection
property m_iCurrentSelection
property m_rSelectorSprite
property m_iIconSpacing
property m_oldKeydownScript
property m_oldMousedownScript
property m_prepared
property m_ar_clicks
property m_ar_comments
property m_rWriterSprite
property m_rscorewriter
property m_ar_mp_selector
property m_sEndStageWndTitle
property m_iStageStartCount
property m_rSelectorSound
property m_ar_sprGraphicCursor
property m_ar_memberAimCursor
property m_ar_mFlashAnim
property m_bKeyIsDown
property m_ar_numbers
property m_ar_hideElements
property m_ar_selectorLocations
property m_ar_scoreDisplay
property m_ar_bonusDisplay
property m_ar_fwAmountDisplay
property m_bControlsLocked
property m_bExplodeAllActive
property m_rDisplayComboStatusSprites
property m_rDisplayComboAwardSprite
property m_sDisplayComboAwardWriter

on construct me
  put "CFireworksGameInterface::construct - begin"
  m_prepared = 0
  m_bExplodeAllActive = 1
  m_rSelectorSprite = VOID
  m_ar_fwSpritelist = []
  m_ar_selectorSpriteList = []
  m_oldKeydownScript = EMPTY
  m_ar_comments = []
  m_sEndStageWndTitle = "FireworksEndStage"
  m_ar_sprGraphicCursor = []
  m_ar_memberAimCursor = []
  m_ar_mp_flashList = []
  m_ar_mFlashAnim = ["fw.flash.01", "fw.flash.02", "fw.flash.03", "fw.flash.04", "fw.flash.05"]
  m_bKeyIsDown = 0
  m_ar_numbers = []
  m_ar_hideElements = []
  m_ar_scoreDisplay = []
  m_ar_bonusDisplay = []
  m_ar_fwAmountDisplay = []
  m_rDisplayComboStatusSprites = []
  m_rDisplayComboAwardSprite = VOID
  m_rStageInfoWindow = VOID
  m_ar_selectorLocations = script("CVectorStruct").new()
  tWriterStyle = getStructVariable("struct.font.plain")
  tWriterStyle.setaProp(#color, rgb("#EFEFFE"))
  tWriterStyle.setaProp(#bgColor, rgb("#000000"))
  tWriterStyle.setaProp(#fixedLineSpace, 20)
  tWriterStyle.setaProp(#lineHeight, 20)
  tWriterStyle.setaProp(#fontSize, 20)
  tWriterStyle.setaProp(#font, "Folio BoldCondensed *")
  tWriterStyle.setaProp(#alignment, #left)
  m_sDisplayComboAwardWriter = "fireworks_combo_writer"
  createWriter(m_sDisplayComboAwardWriter)
  getWriter(m_sDisplayComboAwardWriter).Define(tWriterStyle)
end
on deconstruct me
  if m_prepared then
    me.UnprepareRoom()
  end if
  m_ar_selectorLocations = VOID
end
on generateBitmapNumbers me
  t_ar_numbers = []
  repeat with i = 0 to 9
    t_ar_numbers.append(member("fw_" & i))
  end repeat
  return t_ar_numbers
end
on StageStart me
  repeat with t_sElement in m_ar_hideElements
  end repeat
  me.displayBonus()
end
on PrepareRoom me
  put "CFireworksGameInterface::PrepareRoom - begin"
  executeMessage("StopRoomSound")
  t_rMod = getWindow("mod_wnd")
  if objectp(t_rMod) then
    t_rMod.hide()
  end if
  if m_ar_numbers.count = 0 then
    m_ar_numbers = me.generateBitmapNumbers()
  end if
  createWindow("fwselector", "vmk_fw_interface.window")
  m_fireWorkSelector = getWindow("fwselector")
  m_fireWorkSelector.center()
  m_fireWorkSelector.moveZ(5000)
  m_fireWorkSelector.hide()
  m_fireWorkSelector.registerProcedure(#eventProcTest, me.getID(), #mouseUp)
  me.changeImageInElement(m_fireWorkSelector, "bonusx", member("fw_x"))
  me.changeImageInElement(m_fireWorkSelector, "bonus.", member("fw_."))
  me.toggleControlMethod(1)
  me.fixAntiAliasing(m_fireWorkSelector, "fw.rankstatus.1")
  me.fixAntiAliasing(m_fireWorkSelector, "fw.rankstatus.2")
  me.fixAntiAliasing(m_fireWorkSelector, "fw.rankstatus.3")
  m_ar_hideElements = ["fw.incoming.1", "fw.incoming.2", "fireworks.amount.1", "fireworks.amount.10", "bonus1.0", "bonus.", "bonus0.1", "bonusx"]
  repeat with i = 1 to 3
    t_ar_scoreDisplay = []
    repeat with n = 0 to 5
      m_ar_hideElements.append("score" & i & "." & "n" & n)
      t_rSprite = me.getElementSprite(m_fireWorkSelector, "score" & i & "." & "n" & n)
      t_ar_scoreDisplay.append(t_rSprite)
      t_rSprite.member = getNumberImg(0)
    end repeat
    t_sElem = "fw.rankstatus." & i
    m_fireWorkSelector.getElement(t_sElem).setText(i & "." && EMPTY)
    m_ar_hideElements.append(t_sElem)
    m_ar_scoreDisplay.append(t_ar_scoreDisplay)
  end repeat
  repeat with t_sElement in m_ar_hideElements
  end repeat
  m_ar_fwAmountDisplay = []
  m_ar_fwAmountDisplay.append(me.getElementSprite(m_fireWorkSelector, "fireworks.amount.1"))
  m_ar_fwAmountDisplay.append(me.getElementSprite(m_fireWorkSelector, "fireworks.amount.10"))
  repeat with t_rSprite in m_ar_fwAmountDisplay
    t_rSprite.member = getNumberImg(0)
  end repeat
  m_ar_bonusDisplay = []
  m_ar_bonusDisplay.append(me.getElementSprite(m_fireWorkSelector, "bonus0.1"))
  m_ar_bonusDisplay.append(me.getElementSprite(m_fireWorkSelector, "bonus1.0"))
  repeat with t_rSprite in m_ar_bonusDisplay
    t_rSprite.member = getNumberImg(0)
  end repeat
  m_ar_fwSpritelist = []
  m_ar_vicinityList = []
  m_ar_pulse = []
  repeat with i = 1 to 30
    t_rSpr = sprite(reserveSprite(me.getID()))
    t_rSpr.member = VOID
    t_rSpr.ink = 33
    t_rSpr.blend = 50
    t_rSpr.locZ = -50
    t_rSpr.loc = point(-1000, -1000)
    t_rSpr.visible = 0
    m_ar_fwSpritelist[i] = t_rSpr
    m_ar_vicinityList[i] = 1.0
    m_ar_pulse[i] = 0.0
    m_ar_mp_flashList[i] = [#frame: 0, #sprite: sprite(reserveSprite(me.getID()))]
    m_ar_mp_flashList[i].sprite.locZ = -49
    m_ar_mp_flashList[i].sprite.member = VOID
    m_ar_mp_flashList[i].sprite.ink = 33
  end repeat
  repeat with i = 1 to 8
    t_rSpr = sprite(reserveSprite(me.getID()))
    t_rSpr.member = VOID
    t_rSpr.ink = 36
    t_rSpr.blend = 50
    t_rSpr.locZ = -50
    t_rSpr.loc = point(-1000, -1000)
    t_rSpr.visible = 0
    m_rDisplayComboStatusSprites[i] = t_rSpr
  end repeat
  m_rDisplayComboAwardSprite = sprite(reserveSprite(me.getID()))
  put "hey"
  t_iMemNum = createMember(m_sDisplayComboAwardWriter & ".image", #bitmap)
  if t_iMemNum > 0 then
    member(t_iMemNum).image = image(1, 1, 32)
    m_rDisplayComboAwardSprite.member = member(t_iMemNum)
    m_rDisplayComboAwardSprite.ink = 36
    m_rDisplayComboAwardSprite.loc = point(0, 0)
    m_rDisplayComboAwardSprite.locZ = -25
    m_rDisplayComboAwardSprite.width = m_rDisplayComboAwardSprite.member.image.width
    m_rDisplayComboAwardSprite.height = m_rDisplayComboAwardSprite.member.image.height
  else
    put "Could not init display-combo-award"
  end if
  put "ho"
  m_iIconSpacing = 55
  m_sCurrentSelection = EMPTY
  m_iCurrentSelection = 1
  m_iStageStartCount = 0
  m_oldMousedownScript = the mouseDownScript
  set the mouseDownScript to "FWMouseDown"
  m_ar_clicks = []
  repeat with i = 1 to 10
    t_rSpr = sprite(reserveSprite(me.getID()))
    t_rSpr.member = VOID
    t_rSpr.ink = 36
    t_rSpr.locZ = -50
    t_rSpr.loc = point(-1000, -1000)
    m_ar_comments[i] = [#sprite: t_rSpr, #time: 0]
  end repeat
  tMetrics = [#font: "Folio BoldCondensed *", #fontSize: 36, #lineHeight: 38, #fixedLineSpace: 38, #color: rgb("#FEFEFE"), #ilk: #struct, #fontStyle: [#plain]]
  createWriter("fireworks_score", tMetrics)
  m_rscorewriter = getWriter("fireworks_score")
  m_ar_mp_selector = []
  m_rSelectorSprite = sprite(reserveSprite(me.getID()))
  m_rSelectorSprite.locZ = 0
  me.showSelectorWindow()
  m_ar_sprGraphicCursor.append(sprite(reserveSprite(me.getID())))
  m_ar_sprGraphicCursor.append(sprite(reserveSprite(me.getID())))
  m_ar_sprGraphicCursor[1].member = member("cursor.aim")
  m_ar_sprGraphicCursor[1].width = m_ar_sprGraphicCursor[1].member.width
  m_ar_sprGraphicCursor[1].height = m_ar_sprGraphicCursor[1].member.height
  _player.cursor(200)
  executeMessage(#ui_hide)
  receiveUpdate(me.getID())
  m_prepared = 0
  me.activateExplodeAll(1)
  put "CFireworksGameInterface::PrepareRoom - end"
end
on UnprepareRoom me
  put "CFireworksGameInterface::UnprepareRoom - begin"
  removeUpdate(me.getID())
  t_rMod = getWindow("mod_wnd")
  if objectp(t_rMod) then
    t_rMod.show()
  end if
  removeWindow(m_fireWorkSelector.getID())
  if objectp(m_rStageInfoWindow) then
    removeWindow(m_rStageInfoWindow.getID())
  end if
  repeat with tSpr in m_ar_fwSpritelist
    if not voidp(tSpr) then
      releaseSprite(tSpr.spriteNum)
    end if
  end repeat
  repeat with tComm in m_ar_comments
    if not voidp(tComm) then
      releaseSprite(tComm.sprite.spriteNum)
    end if
  end repeat
  repeat with tFlash in m_ar_mp_flashList
    if not voidp(tFlash) then
      releaseSprite(tFlash.sprite.spriteNum)
    end if
  end repeat
  repeat with tSpr in m_rDisplayComboStatusSprites
    if not voidp(tSpr) then
      releaseSprite(tSpr.spriteNum)
    end if
  end repeat
  if not voidp(m_rDisplayComboAwardSprite) then
    releaseSprite(m_rDisplayComboAwardSprite.spriteNum)
  end if
  if not voidp(m_rSelectorSprite) then
    releaseSprite(m_rSelectorSprite.spriteNum)
  end if
  set the mouseDownScript to m_oldMousedownScript
  removeWriter("fireworks_score")
  removeWriter(m_sDisplayComboAwardWriter)
  removeMember(m_sDisplayComboAwardWriter & ".image")
  me.FreeSelector()
  repeat with tSpr in m_ar_sprGraphicCursor
    if not voidp(tSpr) then
      releaseSprite(tSpr.spriteNum)
    end if
  end repeat
  m_ar_sprGraphicCursor = []
  executeMessage(#ui_show)
  executeMessage("PlayRoomSound")
  _player.cursor(-1)
  if timeoutExists("ExplodeAllTimeout") then
    removeTimeout("ExplodeAllTimeout")
  end if
  m_prepared = 0
  put "CFireworksGameInterface::UnprepareRoom - end"
end
on toggleControlMethod me, a_bDontSetSelector
  if voidp(m_bControlsLocked) then
    m_bControlsLocked = 0
  else
    m_bControlsLocked = not m_bControlsLocked
  end if
  if m_bControlsLocked then
    t_rMem = member("button.controlswitch.lock")
  else
    t_rMem = member("button.controlswitch.unlock")
  end if
  me.changeImageInElement(m_fireWorkSelector, "controlswitch", t_rMem)
  if not a_bDontSetSelector then
    if not m_bControlsLocked then
      me.SetSelector(me.getComponent().GetStage().GetSelectorContent())
    end if
  end if
end
on toggleStageInfo me
  if not objectp(m_rStageInfoWindow) then
    t = createWindow("fw_stage_info_window")
    m_rStageInfoWindow = getWindow("fw_stage_info_window")
    m_rStageInfoWindow.merge("vmk_fw_nextstage.window")
    m_rStageInfoWindow.center()
    t_bShowWindow = 1
    m_prepared = 1
  else
    t_bShowWindow = not m_rStageInfoWindow.getProperty(#visible)
  end if
  if t_bShowWindow then
    t_stage = me.getComponent().GetStage()
    t_ar_combination = t_stage.GetBonusCombination()
    t_ar_Images = []
    t_iWidth = 0
    t_iHeight = 0
    repeat with t_sBonus in t_ar_combination
      t_rImg = member("fw.type" & t_sBonus & ".next").image.duplicate()
      t_iWidth = t_iWidth + t_rImg.width
      t_iHeight = t_iHeight + t_rImg.height
      t_ar_Images.append(t_rImg)
    end repeat
    t_rContainer = image(t_iWidth, t_iHeight, 32)
    t_rOffset = rect(0, 0, 0, 0)
    repeat with t_rImg in t_ar_Images
      t_rContainer.copyPixels(t_rImg, t_rImg.rect + t_rOffset, t_rImg.rect)
      t_rOffset = t_rOffset + rect(t_rImg.width, 0, t_rImg.width, 0)
    end repeat
    tElement = m_rStageInfoWindow.getElement("fw.combo")
    if objectp(tElement) then
      tElement.feedImage(t_rContainer)
      tSprite = tElement.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.member.image = t_rContainer
        tSprite.width = tSprite.member.width
        tSprite.height = tSprite.member.height
        tSprite.member.regPoint = point(tSprite.member.width / 2, 0) - point(255 / 2, 0)
      end if
    end if
    m_rStageInfoWindow.show()
    me.initComboStatus()
    me.activateExplodeAll(1)
  else
    m_rStageInfoWindow.hide()
    me.activateExplodeAll()
  end if
end
on initComboStatus me
  t_stage = me.getComponent().GetStage()
  t_ar_combination = t_stage.GetBonusCombination()
  repeat with t_rSpr in m_rDisplayComboStatusSprites
    t_rSpr.visible = 0
  end repeat
  t_iOffsetX = 0
  repeat with i = 1 to t_ar_combination.count
    t_sBonus = t_ar_combination[i]
    t_rMem = member("fw.type" & t_sBonus & ".aim")
    t_rSprite = m_rDisplayComboStatusSprites[i]
    t_rSprite.member = t_rMem
    t_rSprite.width = t_rMem.width
    t_rSprite.height = t_rMem.height
    t_rSprite.visible = 1
    t_rSprite.loc = point(t_iOffsetX, 0) + t_rMem.regPoint
    t_rSprite.locZ = 1000
    t_rSprite.blend = 50
    t_iOffsetX = t_iOffsetX + t_rMem.width
  end repeat
  tWriter = getWriter(m_sDisplayComboAwardWriter)
  t_sLevelText = string(t_stage.GetComboReward())
  tImage = tWriter.render(t_sLevelText)
  m_rDisplayComboAwardSprite.member.image = tImage
  m_rDisplayComboAwardSprite.member.regPoint = point(0, 0)
  m_rDisplayComboAwardSprite.width = tImage.width
  m_rDisplayComboAwardSprite.height = tImage.height
  m_rDisplayComboAwardSprite.loc = point(t_iOffsetX, 0)
  m_rDisplayComboAwardSprite.blend = 50
end
on updateComboStatus me
  t_ar_CurrentStatus = me.getComponent().GetComboStatus()
  repeat with t_rSpr in m_rDisplayComboStatusSprites
    t_rSpr.blend = 50
  end repeat
  repeat with i = 1 to t_ar_CurrentStatus.count
    t_rSpr = m_rDisplayComboStatusSprites[i]
    t_rSpr.blend = 100
  end repeat
end
on HandleKeyDown me, t_direction
  tNum = m_iCurrentSelection + t_direction
  if tNum < 1 then
    tNum = m_ar_mp_selector.count
  else
    if tNum > m_ar_mp_selector.count then
      tNum = 1
    end if
  end if
  if m_ar_mp_selector.count > 0 then
    m_iCurrentSelection = tNum
    m_sCurrentSelection = m_ar_mp_selector[tNum].name
    me.PlaceSelector()
  end if
  me.rotateSelector(t_direction)
end
on mouseDown me
  m_ar_clicks.append(the mouseLoc)
end
on PinComment me, tPos, a_iScore, a_iHitType
  tFree = 0
  repeat with i = 1 to m_ar_comments.count
    if m_ar_comments[i].time <= 0 then
      tFree = i
      exit repeat
    end if
  end repeat
  if tFree <> 0 then
    case a_iHitType of
      5:
        m_ar_comments[tFree].sprite.member = getMember("hit.flawless")
      4:
        m_ar_comments[tFree].sprite.member = getMember("hit.awesome")
      3:
        m_ar_comments[tFree].sprite.member = getMember("hit.good")
      2:
        m_ar_comments[tFree].sprite.member = getMember("hit.ok")
      otherwise:
        m_ar_comments[tFree].sprite.member = getMember("hit.oops")

    end case
    m_ar_comments[tFree].sprite.loc = tPos
    m_ar_comments[tFree].time = 45
    m_ar_comments[tFree].sprite.ink = 0
    m_ar_comments[tFree].sprite.width = m_ar_comments[tFree].sprite.member.image.width
    m_ar_comments[tFree].sprite.height = m_ar_comments[tFree].sprite.member.image.height
  end if
end
on updateScores me, a_ar_scores
  repeat while a_ar_scores.count < 3
    a_ar_scores.append([#ref: -1, #score: -1, #rank: 0])
  end repeat
  repeat with i = 1 to a_ar_scores.count
    t_rScore = a_ar_scores[i]
    t_iRef = t_rScore[#ref]
    if t_iRef = -1 then
      t_sName = EMPTY
    else
      t_sName = getThread("fireworks").getComponent().GetAvatarName(t_iRef)
    end if
    me.showScore(i, t_rScore[#score], t_rScore[#rank], t_sName)
  end repeat
end
on showScore me, i_pos, a_iScore, a_iRank, a_sName
  t_rElem = m_fireWorkSelector.getElement("fw.rankstatus." & i_pos)
  if a_sName = EMPTY then
    t_sTitle = EMPTY
  else
    t_sTitle = a_iRank & "." && a_sName
  end if
  t_rElem.setText(t_sTitle)
  t_bHide = 1
  repeat with i = 5 down to 0
    if a_iScore > -1 then
      t_iInt = integer(a_iScore mod power(10, i + 1) / power(10, i) - 0.5)
      if t_bHide then
        if t_iInt > 0 then
          t_bHide = 0
        else
          if i = 0 then
            t_bHide = 0
          end if
        end if
      end if
    end if
    t_rSprite = m_ar_scoreDisplay[i_pos][i + 1]
    if t_bHide then
      t_rSprite.visible = 0
      next repeat
    end if
    t_rSprite.visible = 1
    t_iNumImg = me.getNumberImg(t_iInt)
    t_rSprite.member = t_iNumImg
    t_rSprite.width = t_iNumImg.width
    t_rSprite.height = t_iNumImg.height
  end repeat
end
on getNumberImg me, i
  if i < 0 then
    i = 0
  end if
  if i > 9 then
    i = 0
  end if
  return m_ar_numbers[i + 1]
end
on setScore me, a_iScore
end
on rotateSelector me, t_iDir
  if m_bControlsLocked then
    if t_iDir > 0 then
      m_ar_selectorLocations.rotateAntiClockwise()
    else
      m_ar_selectorLocations.rotateClockwise()
    end if
    repeat with i = 1 to m_ar_mp_selector.count
      tSelection = m_ar_mp_selector[i]
      tSelection.sprite.loc = m_ar_selectorLocations[i]
    end repeat
  end if
end
on PlaceSelector me
  if not m_bControlsLocked then
    t_iSelectorIndex = m_iCurrentSelection
    tloc = getWindow("fwselector").getElement("fw.type.selectarea").getProperty(#sprite).loc
    tloc = tloc + point((t_iSelectorIndex - 1) * m_iIconSpacing + (8 - m_ar_mp_selector.count) / 2 * m_iIconSpacing, 0)
    m_rSelectorSprite.loc = tloc
    m_rSelectorSprite.locZ = 10000
    m_rSelectorSprite.ink = 36
    m_rSelectorSprite.member = member("fw.selector")
    m_rSelectorSprite.width = m_rSelectorSprite.member.image.width
    m_rSelectorSprite.height = m_rSelectorSprite.member.image.height
  end if
  m_ar_sprGraphicCursor[2].member = m_ar_memberAimCursor[m_iCurrentSelection]
  m_ar_sprGraphicCursor[2].width = m_ar_sprGraphicCursor[2].member.image.width
  m_ar_sprGraphicCursor[2].height = m_ar_sprGraphicCursor[2].member.image.height
end
on FreeSelector me
  repeat with tSelection in m_ar_mp_selector
    if not voidp(tSelection) then
      if tSelection <> 0 then
        releaseSprite(tSelection.sprite.spriteNum)
      end if
    end if
  end repeat
  m_ar_mp_selector = []
end
on SetSelector me, a_ar_mp_selector
  if m_ar_mp_selector.count > 0 then
    me.FreeSelector()
  end if
  tWnd = getWindow("fwselector")
  tWnd.getElement("fw.type.selectarea").getProperty(#sprite).locZ = -50000000
  tSelAreaLoc = tWnd.getElement("fw.type.selectarea").getProperty(#sprite).loc
  m_ar_mp_selector = a_ar_mp_selector.duplicate()
  m_ar_selectorLocations.flush()
  i = 0
  repeat with tSelection in m_ar_mp_selector
    tSelection.setaProp(#sprite, sprite(reserveSprite(me.getID())))
    tSelection.sprite.member = member("fw.type" & tSelection.type & ".select")
    tSelection.sprite.loc = point(tSelAreaLoc.locH + i * m_iIconSpacing + (8 - m_ar_mp_selector.count) / 2 * m_iIconSpacing, tSelAreaLoc.locV)
    tSelection.sprite.locZ = 5000
    tSelection.sprite.width = tSelection.sprite.member.image.width
    tSelection.sprite.height = tSelection.sprite.member.image.height
    i = i + 1
    m_ar_memberAimCursor[i] = member("fw.type" & tSelection.type & ".aim")
    m_ar_selectorLocations.push(tSelection.sprite.loc)
  end repeat
  if m_bControlsLocked then
    m_iCurrentSelection = integer(m_ar_mp_selector.count / 2.0)
  else
    m_iCurrentSelection = 1
  end if
  m_sCurrentSelection = m_ar_mp_selector[m_iCurrentSelection].name
  t_iSelectorIndex = m_iCurrentSelection
  tloc = getWindow("fwselector").getElement("fw.type.selectarea").getProperty(#sprite).loc
  tloc = tloc + point((t_iSelectorIndex - 1) * m_iIconSpacing + (8 - m_ar_mp_selector.count) / 2 * m_iIconSpacing, 0)
  m_rSelectorSprite.loc = tloc
  m_rSelectorSprite.locZ = 10000
  m_rSelectorSprite.ink = 36
  m_rSelectorSprite.member = member("fw.selector")
  m_rSelectorSprite.width = m_rSelectorSprite.member.image.width
  m_rSelectorSprite.height = m_rSelectorSprite.member.image.height
  me.PlaceSelector()
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "fw_exit":
      case t_dialogEvent of
        #dialogOK:
          if not me.getComponent().m_tutorialmode then
            executeMessage(#SendMinigameAction, 2, [])
          else
            me.getComponent().EndTutorial()
          end if
        #dialogCancel:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on activateExplodeAll me, a_bDeActivate
  m_bExplodeAllActive = not a_bDeActivate
  if timeoutExists("ExplodeAllTimeout") then
    removeTimeout("ExplodeAllTimeout")
  end if
  tElemID = "fw.explode.button"
  if objectp(m_fireWorkSelector) then
    if objectp(m_fireWorkSelector.getElement(tElemID)) then
      if a_bDeActivate then
        m_fireWorkSelector.getElement(tElemID).deactivate()
      else
        m_fireWorkSelector.getElement(tElemID).Activate()
      end if
    end if
  end if
end
on eventProcTest me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "fw.selectarea":
        tOfs = tParm.locH / m_iIconSpacing
        if tOfs <= m_ar_mp_selector.count then
          m_iCurrentSelection = tOfs
          m_sCurrentSelection = m_ar_mp_selector[tOfs].name
          me.PlaceSelector()
        end if
      "fw.exitgame.button":
        if not DialogWindowExists("fw_exit") then
          t = createDialogWindow(me.getID(), "fw_exit", 2)
          t.show()
          t.setText("Do you want to exit?", "Fireworks Game", "No", "Yes")
        end if
      "fw.explode.button":
        me.activateExplodeAll(1)
        createTimeout("ExplodeAllTimeout", 10 * 1000, #activateExplodeAll, me.getID(), VOID, 1)
        me.ExplodeVisibleFireworks()
      "controlswitch":
        if m_prepared then
          me.toggleControlMethod()
        end if

    end case
  end if
end
on ExplodeVisibleFireworks me, a_bCheckMouse
  t_ar_explodableFireworks = []
  if a_bCheckMouse then
    repeat with tClickLoc in m_ar_clicks
      repeat with i = 1 to m_ar_fwSpritelist.count
        if m_ar_fwSpritelist[i].visible then
          if m_ar_sprGraphicCursor[1].intersects(m_ar_fwSpritelist[i]) then
            t_ar_explodableFireworks.append(i)
          end if
        end if
      end repeat
    end repeat
  else
    repeat with i = 1 to m_ar_fwSpritelist.count
      if m_ar_fwSpritelist[i].visible then
        t_ar_explodableFireworks.append(i)
      end if
    end repeat
  end if
  repeat with i in t_ar_explodableFireworks
    tName = me.getComponent().GetFireWorkName(i)
    tBomb = me.getComponent().GetFireWorkRef(i)
    tID = me.getComponent().GetFireworkId(i)
    tOptimalTime = tBomb.GetLagTime()
    tAge = tBomb.getAge()
    tPercentHit = tAge / tOptimalTime
    if tPercentHit > 1.0 then
      tPercentHit = 1.0
    end if
    tPercent = tPercentHit
    t_bAccurate = 1
    if tName <> m_sCurrentSelection then
      t_bAccurate = 0
      tPercentHit = tPercentHit / 2
    end if
    t_iType = 0
    repeat with tIcon in m_ar_mp_selector
      if tIcon.name = tName then
        t_iType = integer(tIcon.type)
      end if
    end repeat
    if not t_bAccurate then
      t_iSelectedType = 0
      repeat with tIcon in m_ar_mp_selector
        if tIcon.name = m_sCurrentSelection then
          t_iSelectedType = integer(tIcon.type)
        end if
      end repeat
    else
      t_iSelectedType = t_iType
    end if
    tScore = integer(tPercent * 1000)
    if not t_bAccurate then
      tScore = tScore / 4
    end if
    t_iHitType = 1
    if tScore >= 950 then
      t_iHitType = 5
    else
      if tScore < 950 and tScore >= 801 then
        t_iHitType = 4
      else
        if tScore < 801 and tScore >= 401 then
          t_iHitType = 3
        else
          if tScore < 401 and tScore >= 201 then
            t_iHitType = 2
          else
            if tScore < 201 and tScore >= 0 then
              t_iHitType = 1
            end if
          end if
        end if
      end if
    end if
    me.getComponent().AddHit(integer(tPercent * 1000), t_bAccurate, t_iType, tID, t_iHitType, t_iSelectedType)
    tBomb.Explode(me.getComponent().GetFireworkEngine(), tPercentHit, tPercentHit)
    me.PinComment(m_ar_fwSpritelist[i].loc + point(0, -20), tScore, t_iHitType)
    m_ar_fwSpritelist[i].visible = 0
    me.displayBonus()
    me.updateComboStatus()
  end repeat
end
on update me
  if m_prepared then
    case 1 of
      keyPressed(123):
        t_direction = -1
      keyPressed(124):
        t_direction = 1
      keyPressed(SPACE):
        if m_bExplodeAllActive then
          me.activateExplodeAll(1)
          createTimeout("ExplodeAllTimeout", 10 * 1000, #activateExplodeAll, me.getID(), VOID, 1)
          me.ExplodeVisibleFireworks()
        end if
      otherwise:
        t_direction = 0

    end case
    if t_direction <> 0 then
      if not m_bKeyIsDown then
        me.HandleKeyDown(t_direction)
        m_bKeyIsDown = 1
      end if
    else
      m_bKeyIsDown = 0
    end if
    me.ExplodeVisibleFireworks(1)
    m_ar_clicks = []
    m_ar_sprGraphicCursor[1].loc = the mouseLoc - point(10, 10)
    m_ar_sprGraphicCursor[2].loc = the mouseLoc - point(10, 10)
    repeat with i = 1 to m_ar_fwSpritelist.count
      if m_ar_fwSpritelist[i].visible then
        tSpr = m_ar_fwSpritelist[i]
        m_ar_pulse[i] = m_ar_pulse[i] + m_ar_vicinityList[i] * 3.0
        tSpr.blend = integer(49.0 + 25.0 * sin(m_ar_pulse[i]))
        tFlash = m_ar_mp_flashList[i]
        if tFlash.frame <> 0 then
          tFlash.sprite.loc = tSpr.loc
          if tFlash.sprite.member <> m_ar_mFlashAnim[tFlash.frame] then
            tFlash.sprite.member = m_ar_mFlashAnim[tFlash.frame]
            tFlash.sprite.width = tFlash.sprite.member.image.width
            tFlash.sprite.height = tFlash.sprite.member.image.height
          end if
          tFlash.sprite.rotation = integer(tFlash.sprite.rotation + 5) mod 360
          next repeat
        end if
        if not voidp(tFlash.sprite.member) then
          tFlash.sprite.member = VOID
        end if
      end if
    end repeat
    repeat with tComment in m_ar_comments
      tComment.time = tComment.time - 1
      if tComment.time <= 0 then
        tComment.sprite.member = VOID
      end if
    end repeat
  end if
end
on dropasec me
  tWnd = getWindow(m_sEndStageWndTitle)
  m_iStageStartCount = m_iStageStartCount - 1
  tWnd.getElement("fw.gamestart.count").setText(string(m_iStageStartCount))
end
on ShowStageEnd me, a_qual, a_iRoundN, a_mp_top15, a_iRank, a_iScore, a_iLowestQual, a_iTime
  me.activateExplodeAll(1)
  if windowExists(m_sEndStageWndTitle) then
    removeWindow(m_sEndStageWndTitle)
  end if
  if createWindow(m_sEndStageWndTitle, "vmk_fw_modal.window") then
    tWnd = getWindow(m_sEndStageWndTitle)
    case a_qual of
      #qualified:
        tWnd.merge("vmk_fw_nextlevel.window")
      #disqualified:
        tWnd.merge("vmk_fw_gameover.window")
      #gameover:
        tWnd.merge("vmk_fw_congratulations.window")

    end case
    tWnd.merge("vmk_fw_ranking.window")
    tWnd.center()
    tWnd.moveBy(0, -30)
    me.fixAntiAliasing(tWnd, "fw.dialog.hd", 1)
    me.fixAntiAliasing(tWnd, "fw.returntoroom.text", 1)
    me.fixAntiAliasing(tWnd, "fw.gamestart.count", 1)
    me.fixAntiAliasing(tWnd, "fw.gamestart.seconds", 1)
    me.fixAntiAliasing(tWnd, "fw.levelstart.text", 1)
    me.fixAntiAliasing(tWnd, "fw.status.hd", 1)
    me.changeImageInElement(tWnd, "rank1", member("fw_1"))
    me.changeImageInElement(tWnd, "rank2", member("fw_2"))
    me.changeImageInElement(tWnd, "rank3", member("fw_3"))
    me.changeImageInElement(tWnd, "rank1.", member("fw_."))
    me.changeImageInElement(tWnd, "rank2.", member("fw_."))
    me.changeImageInElement(tWnd, "rank3.", member("fw_."))
    repeat with i = 1 to 3
      tElement = tWnd.getElement("fw.avatar" & i)
      tElement.hide()
    end repeat
    tWnd.getElement("fw.dialog.hd").setText(getText("fw.roundranking.title"))
    repeat with i = 1 to a_mp_top15.count
      tAvatarID = a_mp_top15.getPropAt(i)
      tScore = a_mp_top15[i]
      tColor = rgb("#EFEFEF")
      if tScore < a_iLowestQual then
        t_sDropColor = getText("fw.player.drop.color", "#000000")
        tColor = rgb(t_sDropColor)
      end if
      if tAvatarID <> -1 then
        if i < 4 then
          tColor = rgb("#000000")
          t_ar_data = [:]
          t_ar_data[#figure] = me.getComponent().GetAvatarFigureData(tAvatarID)
          t_ar_data[#Output] = VOID
          t_ar_data[#Dir] = [4, 4]
          if i = 1 then
            t_ar_data[#act] = [101, 0]
          else
            t_ar_data[#act] = [0, 0]
          end if
          if t_ar_data[#figure].count > 0 then
            executeMessage("GetAvatarImage", t_ar_data)
          else
            t_ar_data[#input] = [2, 4, 4, 1]
            executeMessage("RandomAvatar", t_ar_data)
          end if
          tElement = tWnd.getElement("fw.avatar" & i)
          tElement.show()
          tSprite = tElement.getProperty(#sprite)
          if tSprite <> 0 then
            tSprite.ink = 8
            tSprite.member.image = t_ar_data[#Output]
            tSprite.member.regPoint = point(0, 20)
            tSprite.width = tSprite.member.width
            tSprite.height = tSprite.member.height
            tSprite.member.useAlpha = 1
          end if
        end if
        tElement = tWnd.getElement("fw.roundrank.name" & i)
        tFont = tElement.getFont()
        tFont[#color] = tColor
        tElement.setFont(tFont)
        tElement.setText(me.getComponent().GetAvatarName(tAvatarID))
        tElement = tWnd.getElement("fw.rank" & i)
        if objectp(tElement) then
          tFont = tElement.getFont()
          tFont[#color] = tColor
          tElement.setFont(tFont)
          tElement.setText(string(i) & ".")
        end if
        tElement = tWnd.getElement("fw.score" & i)
        tFont = tElement.getFont()
        tFont[#color] = tColor
        tElement.setFont(tFont)
        tElement.setText(string(tScore) && getText("fw_roundranking_points"))
      end if
    end repeat
    if a_iRank > 15 then
      tColor = rgb("#FFCC00")
      tElement = tWnd.getElement("fw.yourrank.hd")
      tFont = tElement.getFont()
      tFont[#color] = tColor
      tElement.setFont(tFont)
      tElement.setText(a_iRank)
      tElement = tWnd.getElement("fw.roundrank.ownname")
      tFont = tElement.getFont()
      tFont[#color] = tColor
      tElement.setFont(tFont)
      tElement.setText(getObject(#session).get("name"))
      tElement = tWnd.getElement("fw.yourscore")
      tFont = tElement.getFont()
      tFont[#color] = tColor
      tElement.setFont(tFont)
      tElement.setText(a_iScore)
    else
      tWnd.getElement("fw.yourrank.hd").setText(EMPTY)
      tWnd.getElement("fw.roundrank.ownname").setText(EMPTY)
      tWnd.getElement("fw.yourscore").setText(EMPTY)
    end if
    m_iStageStartCount = a_iTime
    createTimeout("FWMidStageCountdown", 1000, #dropasec, me.getID(), VOID, a_iTime)
  end if
end
on HideStageEnd me
  if windowExists(m_sEndStageWndTitle) then
    removeWindow(m_sEndStageWndTitle)
  end if
  if timeoutExists("FWMidStageCountdown") then
    removeTimeout("FWMidStageCountdown")
  end if
end
on showSelectorWindow me
  m_fireWorkSelector.show()
  if m_sCurrentSelection <> EMPTY then
    me.PlaceSelector()
  end if
end
on hideSelectorWindow me
  m_fireWorkSelector.hide()
  m_rSelectorSprite.member = VOID
end
on setFireworksActionSprite me, i_index, i_pLoc, i_rMember, a_visible, a_fScale
  m_ar_fwSpritelist[i_index].loc = i_pLoc
  if m_ar_fwSpritelist[i_index].member <> i_rMember then
    m_ar_fwSpritelist[i_index].member = i_rMember
    if not voidp(i_rMember) then
      m_ar_fwSpritelist[i_index].width = i_rMember.image.width
      m_ar_fwSpritelist[i_index].height = i_rMember.image.height
    end if
  end if
  m_ar_fwSpritelist[i_index].visible = a_visible
end
on setFireworksActionSpriteVicinity me, i_index, i_fVicinity
  m_ar_vicinityList[i_index] = i_fVicinity
end
on getFireWorksActionSprites me
  return m_ar_fwSpritelist
end
on getSelection me
  return m_sCurrentSelection
end
on setWarningFlash me, i_index, a_fPercentTimeLeft
  m_ar_mp_flashList[i_index].frame = integer(a_fPercentTimeLeft * (m_ar_mFlashAnim.count - 1) + 1.0)
  if a_fPercentTimeLeft = 0.0 then
    m_ar_mp_flashList[i_index].frame = 0
    if not voidp(m_ar_mp_flashList[i_index].sprite.member) then
      m_ar_mp_flashList[i_index].sprite.member = VOID
    end if
  else
    if m_ar_mp_flashList[i_index].frame > m_ar_mFlashAnim.count then
      m_ar_mp_flashList[i_index].frame = 0
      m_ar_mp_flashList[i_index].sprite.member = VOID
    end if
  end if
end
on remainingFireWorkCount me, a_iFireworksLeft
  repeat with i = 0 to 1
    t_iPos = integer(power(10, i))
    t_iInt = integer(a_iFireworksLeft mod power(10, i + 1) / power(10, i) - 0.5)
    t_rSprite = m_ar_fwAmountDisplay[i + 1]
    t_rMember = me.getNumberImg(t_iInt)
    t_rSprite.member = t_rMember
    t_rSprite.width = t_rMember.width
    t_rSprite.height = t_rMember.height
  end repeat
  me.displayNextFireworks(a_iFireworksLeft)
end
on displayNextFireworks me, a_iFireworksLeft
  t_ar_level = me.getComponent().GetStage().GetLevel()
  if a_iFireworksLeft > 0 then
    t_iFirst = t_ar_level.count - a_iFireworksLeft + 1
    t_iNext = t_ar_level.count - a_iFireworksLeft + 2
    if t_iFirst <= t_ar_level.count then
      t_iType = t_ar_level[t_iFirst][#type]
      t_rMember1 = member("fw.type" & t_iType & ".next")
    else
      t_rMember1 = member("null")
    end if
    if t_iNext <= t_ar_level.count then
      t_iType = t_ar_level[t_iNext][#type]
      t_rMember2 = member("fw.type" & t_iType & ".next")
    else
      t_rMember2 = member("null")
    end if
    me.changeImageInElement(m_fireWorkSelector, "fw.incoming.1", t_rMember1)
    me.changeImageInElement(m_fireWorkSelector, "fw.incoming.2", t_rMember2)
  else
    t_rMember = member("null")
    me.changeImageInElement(m_fireWorkSelector, "fw.incoming.1", t_rMember)
    me.changeImageInElement(m_fireWorkSelector, "fw.incoming.2", t_rMember)
  end if
end
on changeImageInElement me, tWndObj, tElemName, tmember
  if objectp(tWndObj) then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.ink = 8
        tSprite.member = tmember
        tSprite.width = tmember.width
        tSprite.height = tmember.height
      end if
    end if
  end if
end
on getElementMember me, tWndObj, tElemName
  if objectp(tWndObj) then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        return the member of tSprite
      end if
    end if
  end if
  return member("null")
end
on getElementSprite me, tWndObj, tElemName
  if objectp(tWndObj) then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        return tSprite
      end if
    end if
  end if
  return sprite(1000)
end
on displayBonus me
  t_iBonus = integer(me.getComponent().GetBonus() * 10)
  t_ar_elements = ["bonus0.1", "bonus1.0"]
  repeat with i = 0 to 1
    t_iInt = integer(t_iBonus mod power(10, i + 1) / power(10, i) - 0.5)
    t_rSprite = m_ar_bonusDisplay[i + 1]
    t_rMember = me.getNumberImg(t_iInt)
    t_rSprite.member = t_rMember
    t_rSprite.width = t_rMember.width
    t_rSprite.height = t_rMember.height
  end repeat
end
on fixAntiAliasing me, tWndObj, tElemName, forceupdate, setText, bDebug
  if tWndObj <> 0 then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tElem.pParams.deleteProp(#ink)
      tElem.pParams.deleteProp(#color)
      tElem.pParams.deleteProp(#bgColor)
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.foreColor = 255
        tSprite.bgColor = tElem.pFontData[#bgColor]
        tSprite.ink = 36
      end if
      if not voidp(setText) then
        tElem.setText(setText)
      end if
      if forceupdate then
        tElem.render()
      end if
    end if
  end if
end
on fixAntialiasing2 me, tWndObj, tElemName, forceupdate
  if objectp(tWndObj) then
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
      return 1
    end if
  end if
  return 0
end