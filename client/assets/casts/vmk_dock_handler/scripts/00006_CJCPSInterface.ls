-- Behavior
property m_signUpBoard
property m_sSignupWndTitle
property m_ar_sPages
property m_ar_rImages
property m_iCurPage
property m_sHighscoreWindowTitle

on construct me
  m_signUpBoard = VOID
  m_sHighscoreWindowTitle = "JungleCruiseHighScore"
  m_sSignupWndTitle = "JungleCruiseSignup"
  m_ar_sPages = ["jc.instructions.text", "jc.instructions.page.1", "jc.instructions.page.2", "jc.instructions.page.3", "jc.instructions.page.4", "jc.instructions.page.5"]
  t_ar_sImages = ["jc.instructions.image1", "jc.instructions.image2", "jc.instructions.image3", "jc.instructions.image4", "jc.instructions.image5", "jc.instructions.image6"]
  m_ar_rImages = []
  repeat with t_sImage in t_ar_sImages
    m_ar_rImages.append(member(t_sImage).image)
  end repeat
  m_iCurPage = 1
  registerMessage(#room_ready, me.getID(), #initSign)
  registerMessage("room_tile_selection", me.getID(), #_TileSelection)
  return 1
end
on deconstruct me
  if not voidp(m_signUpBoard) then
    releaseSprite(m_signUpBoard.spriteNum)
  end if
  if windowExists(m_sSignupWndTitle) then
    removeWindow(m_sSignupWndTitle)
  end if
  if windowExists(m_sHighscoreWindowTitle) then
    removeWindow(m_sHighscoreWindowTitle)
  end if
  unregisterMessage(#room_ready, me.getID())
  if getThread("highscore") <> 0 then
    DisableHighScore()
  end if
  return 1
end
on _TileSelection me, a_rTile
  tloc = a_rTile.GetAbsPos()
  if tloc.x <= 141 and tloc.y <= 213 then
    tGameOn = 0
    tJCThread = getThread("junglecruise")
    if tJCThread <> 0 then
      tGameOn = tJCThread.getComponent().gameOn()
    end if
    if not tGameOn then
      me.showSignUpWindow(1)
    end if
  end if
end
on initSign me
  m_signUpBoard = sprite(reserveSprite(me.getID()))
  m_signUpBoard.ink = 0
  m_signUpBoard.blend = 100
  m_signUpBoard.loc = point(168, 200)
  m_signUpBoard.locZ = -40000000
  m_signUpBoard.member = getMember("dock_signup_board")
  m_signUpBoard.width = m_signUpBoard.member.width
  m_signUpBoard.height = m_signUpBoard.member.height
  setEventBroker(m_signUpBoard.spriteNum, "Signup")
  m_signUpBoard.registerProcedure(#eventProcDock, me.getID(), #mouseDown)
  m_signUpBoard.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
end
on showSignUpWindow me, a_true
  if a_true then
    if windowExists(m_sSignupWndTitle) then
      getWindow(m_sSignupWndTitle).setProperty(#visible, 1)
    else
      if createWindow(m_sSignupWndTitle, "vmk_jc_main.window") then
        if getWindow(m_sSignupWndTitle).merge("vmk_jc_instructions.window") then
          m_iCurPage = 1
          getWindow(m_sSignupWndTitle).registerClient(me.getID())
          getWindow(m_sSignupWndTitle).registerProcedure(#SignupEventProc, me.getID(), #mouseUp)
          getWindow(m_sSignupWndTitle).getElement("button.arrowprev.active").hide()
          me.fixAntialiasing(m_sSignupWndTitle, "jc.window.hd", 0, getText("junglecruise.signup.window.title"))
          getWindow(m_sSignupWndTitle).getElement("jc.instructions.image").feedImage(m_ar_rImages[m_iCurPage])
        else
          error(me, "Failed to merge instructions to jungle cruise signup window", #showSignUpWindow)
        end if
      else
        error(me, "Failed to create jungle cruise signup window", #showSignUpWindow)
      end if
    end if
  else
    removeWindow(m_sSignupWndTitle)
  end if
end
on fixAntialiasing me, i_sWindowTitle, tElemName, forceupdate, setText, bDebug
  tWndObj = getWindow(i_sWindowTitle)
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
on eventProcDock me, tEvent, tElemID, tParm
  tGameOn = 0
  tJCThread = getThread("junglecruise")
  if tJCThread <> 0 then
    tGameOn = tJCThread.getComponent().gameOn()
  end if
  if not tGameOn then
    if tEvent = #mouseDown then
      executeMessage("PlayInterfaceSound", "open-popup")
      me.showSignUpWindow(1)
    end if
  end if
end
on ChangePage me, a_direction
  case a_direction of
    #next:
      m_iCurPage = m_iCurPage + 1
    #previous:
      m_iCurPage = m_iCurPage - 1

  end case
  if m_iCurPage >= m_ar_sPages.count then
    getWindow(m_sSignupWndTitle).getElement("button.arrownext.active").hide()
    m_iCurPage = m_ar_sPages.count
  else
    getWindow(m_sSignupWndTitle).getElement("button.arrownext.active").show()
  end if
  if m_iCurPage <= 1 then
    getWindow(m_sSignupWndTitle).getElement("button.arrowprev.active").hide()
    m_iCurPage = 1
  else
    getWindow(m_sSignupWndTitle).getElement("button.arrowprev.active").show()
  end if
  getWindow(m_sSignupWndTitle).getElement("jc.instructions.text").setText(getText(m_ar_sPages[m_iCurPage]))
  getWindow(m_sSignupWndTitle).getElement("jc.instructions.image").feedImage(m_ar_rImages[m_iCurPage])
end
on SignupEventProc me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "button.arrownext.active":
        me.ChangePage(#next)
        executeMessage("PlayInterfaceSound", "UI-click")
      "button.arrowprev.active":
        me.ChangePage(#previous)
        executeMessage("PlayInterfaceSound", "UI-click")
      "button.jccancel.active", "close":
        me.showSignUpWindow(0)
        executeMessage("PlayInterfaceSound", "UI-click")
      "button.jcstartgame.active":
        getThread("lobby").getComponent().SetReadyToPlayState(1)
        executeMessage("PlayInterfaceSound", "open-popup")
      "button.jchighscores.active":
        executeMessage("PlayInterfaceSound", "UI-click")
        if not createWindow(m_sHighscoreWindowTitle, "vmk_jc_main.window") then
          return error(me, "Failed to create highscore window!", #SignupEventProc)
        end if
        me.fixAntialiasing(m_sHighscoreWindowTitle, "jc.window.hd", 0, getText("junglecruise.highscores.window.title"))
        tWndObj = getWindow(m_sHighscoreWindowTitle)
        if not tWndObj.merge("vmk_highscores.window") then
          return error(me, "Failed to merge highscores window!", #SignupEventProc)
        end if
        tWndObj.moveTo(250, 50)
        tWndObj.registerClient(me.getID())
        tWndObj.registerProcedure(#JCHighScoresEventProc, me.getID(), #mouseUp)
        DisplayHighscore(2, tWndObj.getElement("highscores"), rgb(254, 254, 254))
      "help":
        executeMessage(#open_help_page, "help.games.jungle")

    end case
  end if
end
on JCHighScoresEventProc me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "UI-click")
        removeWindow(m_sHighscoreWindowTitle)
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, "help.games.jungle")

    end case
  end if
end