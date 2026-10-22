-- Script
property m_sWindowTitle
property m_ar_photos
property m_offset
property m_page
property m_mp_stats
property m_currentView
property m_iTotalScore
property m_iExitCounter

on construct me
  m_page = 1
  m_offset = 1
  m_ar_photos = []
  m_mp_stats = [#shots: 0, #accuracy: 0, #fuel: 0, #bumps: 0]
  m_sWindowTitle = "JungleCruisePhotoAlbum"
  m_currentView = "vmk_jc_photos.window"
  me.changeView("vmk_jc_photos.window")
  m_iTotalScore = 0
  me.updateTotalScore()
  registerMessage(#room_leave, me.getID(), #hideJCAlbum)
  return 1
end
on deconstruct me
  removeWindow(m_sWindowTitle)
  return 1
end
on hideJCAlbum me
  m_iExitCounter = m_iExitCounter + 1
  if m_iExitCounter >= 2 then
    removeObject(me.getID())
  end if
end
on updateTotalScore me
  if getThread("junglecruise") <> 0 then
    m_iTotalScore = getThread("junglecruise").getComponent().GetScore()
  end if
end
on UpdateView me
  me.changeView(m_currentView)
end
on changeView me, tView
  tWndObj = getWindow(m_sWindowTitle)
  tLastView = m_currentView
  if tWndObj = 0 then
    if not createWindow(m_sWindowTitle, "vmk_jc_main.window") then
      return error(me, "Failed to create Photo Album Basic Window!", #construct)
    else
      tWindow = getWindow(m_sWindowTitle)
      if not tWindow.merge("vmk_jc_photos.window") then
        return error(me, "Failed to merge Photo Album Window!", #construct)
      end if
      tWindow.registerProcedure(#EventProcAlbum, me.getID(), #mouseUp)
    end if
  end if
  if tLastView <> tView then
    tWndObj.unmerge()
    tWndObj.merge(tView)
    m_currentView = tView
  end if
  case m_currentView of
    "vmk_jc_photos.window":
      me.fixAntialising("pic1.score", 0, 0)
      me.fixAntialising("pic2.score", 0, 0)
      me.fixAntialising("pic3.score", 0, 0)
      me.fixAntialising("pic4.score", 0, 0)
      me.fixAntialising("jc.window.hd", 0, "Jungle Cruise Scores", 1)
    "vmk_jc_statistics.window":
      me.updateTotalScore()
      me.fixAntialising("jc.statistics.hd1", 0, "YOUR TOTAL SCORE")
      me.fixAntialising("jc.total.score", 0, m_iTotalScore)

  end case
end
on fixAntialising me, tElemName, forceupdate, setText, bDebug
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
on SetPhotos me, i_ar_photos
  m_ar_photos = i_ar_photos
end
on SetPhotosTaken me, a_iPhotos
  m_mp_stats.shots = a_iPhotos
end
on SetOverallAccuracy me, a_fAccuracy
  m_mp_stats.accuracy = a_fAccuracy
end
on SetFuelConsumed me, a_iFuel
  m_mp_stats.fuel = a_iFuel
end
on SetBumpsHit me, a_iBumps
  m_mp_stats.bumps = a_iBumps
end
on PopulatePhotos me, i_offset
  tWndObj = getWindow(m_sWindowTitle)
  if voidp(tWndObj) then
    return error(me, "Album view window is missing!", #PopulatePhotos)
  end if
  t_greenImage = image(184, 124, 32)
  t_greenImage.fill(t_greenImage.rect, [#color: rgb("#434D38")])
  repeat with i = 1 to 4
    tIndex = m_offset + i - 1
    tPicElement = VOID
    tScoreElement = VOID
    case i of
      1:
        tPicElement = tWndObj.getElement("jc.photo1")
        tScoreElement = tWndObj.getElement("pic1.score")
      2:
        tPicElement = tWndObj.getElement("jc.photo2")
        tScoreElement = tWndObj.getElement("pic2.score")
      3:
        tPicElement = tWndObj.getElement("jc.photo3")
        tScoreElement = tWndObj.getElement("pic3.score")
      4:
        tPicElement = tWndObj.getElement("jc.photo4")
        tScoreElement = tWndObj.getElement("pic4.score")

    end case
    if tIndex <= m_ar_photos.count then
      tPicElement.feedImage(m_ar_photos[tIndex].image)
      tScoreElement.setText(m_ar_photos[tIndex].score)
    else
      tPicElement.feedImage(t_greenImage)
      tScoreElement.setText(EMPTY)
    end if
    if m_offset <= 1 then
      tWndObj.getElement("button.arrowprev.active").deactivate()
      next repeat
    end if
    if m_currentView = "vmk_jc_statistics.window" then
      tWndObj.getElement("button.arrownext.active").deactivate()
      next repeat
    end if
    tWndObj.getElement("button.arrowprev.active").Activate()
    tWndObj.getElement("button.arrownext.active").Activate()
  end repeat
end
on EventProcAlbum me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "button.arrowprev.active":
        if not (m_currentView = "vmk_jc_photos.window") then
          me.changeView("vmk_jc_photos.window")
        else
          m_offset = m_offset - 4
          if m_offset < 1 then
            m_offset = 1
          end if
          m_page = m_page - 1
        end if
        me.PopulatePhotos()
        executeMessage("PlayInterfaceSound", "UI-click")
      "button.arrownext.active":
        if m_offset + 4 <= m_ar_photos.count then
          m_offset = m_offset + 4
          m_page = m_page + 1
          me.PopulatePhotos()
        else
          me.changeView("vmk_jc_statistics.window")
        end if
        executeMessage("PlayInterfaceSound", "UI-click")
      "button.jccancel.active":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sWindowTitle)
        executeMessage(#SendMinigameAction, 6, [])
      "help":
        executeMessage(#open_help_page, "help.games.jungle")

    end case
  end if
end