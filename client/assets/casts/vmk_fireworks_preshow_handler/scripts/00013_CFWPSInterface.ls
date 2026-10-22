-- Movie Script
property m_clickSprites
property m_sTimerWindowTitle
property m_iTimeLeft
property m_sInstructionsWindowTitle
property m_iInstructionsCurrentPage
property m_ar_mp_instructions
property m_sHighscoreWindowTitle
property m_bSignedUp
property m_iLastMode
property m_bLastSignup
property m_sSignupWindowTitle

on construct me
  m_clickSprites = []
  m_bSignedUp = 0
  m_bLastSignup = 0
  m_iLastMode = VOID
  m_iWndMode = #none
  m_sTimerWindowTitle = "FWPSGameStatus"
  m_iTimeLeft = -1
  m_sSignupWindowTitle = "FWPSSignUp"
  m_sInstructionsWindowTitle = "FWPSInstructions"
  m_iInstructionsCurrentPage = 0
  m_sHighscoreWindowTitle = "FWPSHighScores"
  t_iHMHelpPageCount = value(getText("fwps.instructions.page.count"))
  if t_iHMHelpPageCount <= 0 then
    t_iHMHelpPageCount = 4
  end if
  m_ar_mp_instructions = []
  repeat with i = 1 to t_iHMHelpPageCount
    t_ar_instruction = [:]
    t_ar_instruction[#text] = "fwps.instructions.page." & i
    t_ar_instruction[#image] = "fwps.instructions.pic.page." & i
    m_ar_mp_instructions.append(t_ar_instruction)
  end repeat
  receiveUpdate(me.getID())
  registerMessage(#room_ready, me.getID(), #initSign)
  return 1
end
on initSign me
  if not me.getComponent().IsDisabled() then
    if not windowExists(m_sSignupWindowTitle) then
      createWindow(m_sSignupWindowTitle, "vmk_fw_signup.window")
      tWndObj = getWindow(m_sSignupWindowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcFWPS, me.getID(), #mouseUp)
      tWndObj.moveTo(367, 234)
    end if
    tWndObj = getWindow(m_sSignupWindowTitle)
    if not m_bSignedUp then
      tWndObj.getElement("fw.signup.play").show()
    else
      tWndObj.getElement("fw.signup.play").hide()
    end if
    tGameMode = me.GetGameStatus()
    if tGameMode = #waiting then
      tWndObj.getElement("signup.gamestart.text1").hide()
      tWndObj.getElement("signup.gamestart.text2").hide()
      tWndObj.getElement("signup.gamestart.count").hide()
      tWndObj.getElement("signup.players.text1").show()
      tWndObj.getElement("signup.players.text2").show()
      tWndObj.getElement("signup.players.count").show()
    else
      if tGameMode = #countdown then
        tWndObj.getElement("signup.gamestart.text1").show()
        tWndObj.getElement("signup.gamestart.text2").show()
        tWndObj.getElement("signup.gamestart.count").show()
        tWndObj.getElement("signup.players.text1").hide()
        tWndObj.getElement("signup.players.text2").hide()
        tWndObj.getElement("signup.players.count").hide()
      end if
    end if
    getWindowManager().deactivate(m_sSignupWindowTitle)
  end if
end
on deconstruct me
  if windowExists(m_sTimerWindowTitle) then
    removeWindow(m_sTimerWindowTitle)
  end if
  removeWindow(m_sHighscoreWindowTitle)
  removeWindow(m_sSignupWindowTitle)
  repeat with tSprite in m_clickSprites
    releaseSprite(tSprite.spriteNum)
  end repeat
  removeUpdate(me.getID())
  removeTimeout("FWCountdown")
  unregisterMessage(#room_ready, me.getID())
  return 1
end
on eventProcFWPS me, tEvent, tElemID, tParm
  getWindowManager().deactivate(m_sSignupWindowTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "fw.signup.play":
        executeMessage("PlayInterfaceSound", "fireworks-UI-3")
        m_bSignedUp = 1
        getThread("lobby").getComponent().SetReadyToPlayState(1)
        tWndObj = getWindow(m_sSignupWindowTitle)
      "fw.signup.leave":
        executeMessage("PlayInterfaceSound", "fireworks-UI-1")
        getThread("lobby").getComponent().SetReadyToPlayState(0)
        me.DisableTimerWindow()
      "fw.signup.highscores":
        executeMessage("PlayInterfaceSound", "fireworks-UI-3")
        if not createWindow(m_sHighscoreWindowTitle, "vmk_fw_window.window") then
          return error(me, "Failed to create highscore window!", #eventProcFWPS)
        end if
        tWndObj = getWindow(m_sHighscoreWindowTitle)
        if not tWndObj.merge("vmk_highscores.window") then
          return error(me, "Failed to merge highscores window!", #eventProcFWPS)
        end if
        DisplayHighscore(1, tWndObj.getElement("highscores"), rgb("#EFEFEF"))
        tWndObj.registerClient(me.getID())
        tWndObj.registerProcedure(#HighScoreWndEventProc, me.getID(), #mouseUp)
        tWndObj.getElement("fw.dialog.hd").setText(getText("fwps.highscore.title"))
        me.fixAntiAliasing(tWndObj, "fw.dialog.hd")
      "fw.signup.instructions":
        executeMessage("PlayInterfaceSound", "fireworks-UI-1")
        if not createWindow(m_sInstructionsWindowTitle, "vmk_fw_window.window") then
          return error(me, "Failed to create instructions window!", #eventProcInstructionsWindow)
        end if
        tWndObj = getWindow(m_sInstructionsWindowTitle)
        if not tWndObj.merge("vmk_fw_instructions.window") then
          return error(me, "Failed to merge instructions window!", #eventProcInstructionsWindow)
        end if
        m_iInstructionsCurrentPage = 1
        tWndObj.registerClient(me.getID())
        tWndObj.registerProcedure(#eventProcInstructionsWindow, me.getID(), #mouseUp)
        tWndObj.getElement("fw.dialog.hd").setText(getText("fwps.instructions.title"))
        me.fixAntiAliasing(tWndObj, "fw.dialog.hd")
        me.RenderInstructions()

    end case
  end if
end
on HighScoreWndEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sHighscoreWindowTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "fw.close":
        removeWindow(m_sHighscoreWindowTitle)

    end case
  end if
end
on RenderInstructions me
  if windowExists(m_sInstructionsWindowTitle) and m_iInstructionsCurrentPage <> 0 then
    tWnd = getWindow(m_sInstructionsWindowTitle)
    tWnd.getElement("fw.instructions.text").setText(getText(m_ar_mp_instructions[m_iInstructionsCurrentPage].text))
    tWnd.getElement("fw.instructions.image").feedImage(member(getText(m_ar_mp_instructions[m_iInstructionsCurrentPage].image)).image)
  end if
  if m_iInstructionsCurrentPage = 1 then
    getWindow(m_sInstructionsWindowTitle).getElement("fw.nextpage").show()
    getWindow(m_sInstructionsWindowTitle).getElement("fw.previouspage").hide()
  else
    if m_iInstructionsCurrentPage = m_ar_mp_instructions.count then
      getWindow(m_sInstructionsWindowTitle).getElement("fw.nextpage").hide()
      getWindow(m_sInstructionsWindowTitle).getElement("fw.previouspage").show()
    else
      getWindow(m_sInstructionsWindowTitle).getElement("fw.nextpage").show()
      getWindow(m_sInstructionsWindowTitle).getElement("fw.previouspage").show()
    end if
  end if
end
on DisableTimerWindow me
  removeTimeout("FWCountdown")
  m_iTimeLeft = -1
  m_bSignedUp = 0
end
on eventProcInstructionsWindow me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "fw.previouspage":
        executeMessage("PlayInterfaceSound", "fireworks-UI-2")
        if m_iInstructionsCurrentPage - 1 > 0 then
          m_iInstructionsCurrentPage = m_iInstructionsCurrentPage - 1
          me.RenderInstructions()
        end if
      "fw.nextpage":
        executeMessage("PlayInterfaceSound", "fireworks-UI-2")
        if m_iInstructionsCurrentPage + 1 <= m_ar_mp_instructions.count then
          m_iInstructionsCurrentPage = m_iInstructionsCurrentPage + 1
          me.RenderInstructions()
        end if
      "fw.close":
        executeMessage("PlayInterfaceSound", "fireworks-UI-1")
        removeWindow(m_sInstructionsWindowTitle)

    end case
  end if
end
on dropasec me
  m_iTimeLeft = m_iTimeLeft - 1
  if m_iTimeLeft < 0 then
    m_iTimeLeft = 0
  end if
end
on GetGameStatus me, a_rGame
  tGame = getThread("lobby").getComponent().GetGameByIndex(1)
  if not voidp(tGame) then
    if tGame.GetParameterValue("NumParticipants") < value(tGame.GetParameterValue("miu")) then
      return #waiting
    else
      return #countdown
    end if
  end if
  return #waiting
end
on update me
  tGame = getThread("lobby").getComponent().GetGameByIndex(1)
  if not voidp(tGame) then
    tGameMode = me.GetGameStatus()
    if tGameMode <> m_iLastMode or m_bLastSignup <> m_bSignedUp then
      me.initSign()
    end if
    m_iLastMode = tGameMode
    m_bLastSignup = m_bSignedUp
    tWndObj = getWindow(m_sSignupWindowTitle)
    if tWndObj <> 0 then
      if tGameMode = #countdown then
        if not timeoutExists("FWCountdown") then
          m_iTimeLeft = tGame.GetParameterValue("TimeLeft")
          if m_iTimeLeft <> 0 then
            createTimeout("FWCountdown", 1000, #dropasec, me.getID(), VOID, VOID)
          end if
        end if
        tWndObj.getElement("signup.gamestart.count").setText(string(integer(m_iTimeLeft)))
      else
        if tGameMode = #waiting then
          tMinPlayers = value(tGame.GetParameterValue("miu"))
          tPlayersNeeded = tMinPlayers - tGame.GetParameterValue("NumParticipants")
          tWndObj.getElement("signup.players.count").setText(string(tPlayersNeeded))
          if timeoutExists("FWCountdown") then
            me.DisableTimerWindow()
          end if
        end if
      end if
    end if
  end if
end
on EnableButtons me
  me.initSign()
end
on DisableButtons me
  if windowExists(m_sSignupWindowTitle) then
    removeWindow(m_sSignupWindowTitle)
  end if
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