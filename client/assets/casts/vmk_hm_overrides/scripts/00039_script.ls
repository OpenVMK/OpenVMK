-- Script
property m_rClient
property m_bActive
property m_sWindowName
property m_iLastPurpleScore
property m_iLastGreenScore
property m_iLastPurpleWins
property m_pCannedField
property m_iLastGreenWins

on construct me
  m_sWindowName = "HMG Window UI"
  m_iLastPurpleScore = 0
  m_iLastGreenScore = 0
  m_iLastPurpleWins = 0
  m_iLastGreenWins = 0
  me.m_bActive = 0
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  if getWindow(me.m_sWindowName) <> 0 then
    removeWindow(me.m_sWindowName)
  end if
  return 1
end
on Init me, a_rClient
  m_rClient = a_rClient
end
on hide me
  if getWindow(me.m_sWindowName) <> 0 then
    removeWindow(me.m_sWindowName)
  end if
  me.m_bActive = 0
end
on show me
  if getWindow(me.m_sWindowName) <> 0 then
    getWindow(me.m_sWindowName).show()
  else
    me.InitWindow()
  end if
end
on update me
  if me.m_bActive then
    tGreenScore = me.m_rClient.GetGameEngine()
    tScoreBoard = tGreenScore.GetObjectsByCode(5)
    if tScoreBoard.count = 1 then
      t_rGameEngine = tScoreBoard[1].GetFactor().GetTeam1Score()
      tPurpleWins = tScoreBoard[1].GetFactor().GetTeam2Score()
      tGreenWins = tScoreBoard[1].GetFactor().GetTeam1Wins()
      tPurpleScore = tScoreBoard[1].GetFactor().GetTeam2Wins()
      if tPurpleWins <> me.m_iLastPurpleScore then
        me.setTeamScore(#purple, tPurpleWins)
      end if
      if t_rGameEngine <> me.m_iLastGreenScore then
        me.setTeamScore(#green, t_rGameEngine)
      end if
      if tPurpleScore <> me.m_iLastPurpleWins then
        me.SetTeamWins(#purple, tPurpleScore)
      end if
      if tGreenWins <> me.m_iLastGreenWins then
        me.SetTeamWins(#green, tGreenWins)
      end if
      m_iLastPurpleScore = tPurpleWins
      m_iLastGreenScore = t_rGameEngine
      m_iLastPurpleWins = tPurpleScore
      m_iLastGreenWins = tGreenWins
    end if
  end if
end
on setChattable me, t_bChatMode
  getWindow(me.m_sWindowName).getElement("pirates.chat.field").setEdit(t_bChatMode)
  me.m_rClient.setButtonState(me.m_sWindowName, "pirates.exitgame.button", t_bChatMode)
  me.m_rClient.setButtonState(me.m_sWindowName, "hm.keyoptions.button", t_bChatMode)
end
on InitWindow me
  createWindow(me.m_sWindowName, "vmk_hm_ingameui.window")
  t_num0 = getWindow(me.m_sWindowName)
  if not voidp(t_num0) then
    t_num0.moveTo(61, 565)
    tWndObj = t_num0
  else
    return error(me, "HMGWindow.UI: Unable to create window ", #InitWindow)
  end if
  t_num0.registerClient(me.getID())
  t_num0.registerProcedure(#EventProc, me.getID(), #mouseUp)
  t_num0.registerProcedure(#EventProc, me.getID(), #keyDown)
  t_num0.registerProcedure(#EventProc, me.getID(), #keyUp)
  t_num0.getElement("back").hide()
  t_num0.getElement("time.red").hide()
  m_rGameInterfaceWindow = member("hm_0")
  t_num0b = member("hmb_0")
  me.m_rClient.SetNumber(me.m_sWindowName, "score.green", m_rGameInterfaceWindow)
  me.m_rClient.SetNumber(me.m_sWindowName, "score.red", m_rGameInterfaceWindow)
  me.m_rClient.SetNumber(me.m_sWindowName, "time.green", member("time.green"))
  me.m_rClient.SetNumber(me.m_sWindowName, "bg", member("hm_:"))
  me.SetTimerDisplay(0)
  me.setTeamScore(#purple, 0)
  me.setTeamScore(#green, 0)
  if me.m_pCannedField = 0 then
    m_pCannedField = CreateCannedField(me.m_sWindowName, "pirates.chat.field", rgb("#EFEFEF"), rgb(255, 0, 0))
    if me.m_pCannedField <> 0 then
      me.m_pCannedField.setAllowErrors(1)
    end if
  end if
  me.setChattable(0)
  me.m_bActive = 1
end
on SetTimerDisplay me, a_iSecondsLeft
  if a_iSecondsLeft = 10 then
    executeMessage("PlayInterfaceSound", "HMG-bell")
    me.m_rClient.ShowWindow("Notice", "hurry up")
  end if
  if a_iSecondsLeft > 30 then
    me.m_rClient.SetNumber(me.m_sWindowName, "time.green", member("time.green"))
  else
    me.m_rClient.SetNumber(me.m_sWindowName, "time.green", member("time.red"))
  end if
  tSec01 = a_iSecondsLeft / 60
  tSec10 = a_iSecondsLeft - 60 * tSec01
  if tSec01 < 10 then
    me.m_rClient.SetNumber(me.m_sWindowName, "time.minutes", member("hm_" & tSec01))
  else
    me.m_rClient.SetNumber(me.m_sWindowName, "time.minutes", member("hm_9"))
  end if
  tSeconds = tSec10 / 10
  tMinutes = tSec10 - 10 * tSeconds
  me.m_rClient.SetNumber(me.m_sWindowName, "time.seconds.10", member("hm_" & tSeconds))
  me.m_rClient.SetNumber(me.m_sWindowName, "time.seconds.01", member("hm_" & tMinutes))
end
on setTeamScore me, i_score, i_team
  t_num001b = integer(i_team mod 1000 / 100)
  t_num010b = integer(i_team mod 100 / 10)
  t_num100b = integer(i_team mod 10 / 1)
  tScore001 = member("hmb_" & t_num001b)
  tScore010 = member("hmb_" & t_num010b)
  tScore100 = member("hmb_" & t_num100b)
  if i_score = #purple then
    me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.red.01", tScore100)
    me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.red.10", tScore010)
    me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.red.100", tScore001)
    if i_team < 100 then
      getWindow(me.m_sWindowName).getElement("ghosts.red.100").hide()
    else
      getWindow(me.m_sWindowName).getElement("ghosts.red.100").show()
    end if
  else
    if i_score = #green then
      me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.green.01", tScore100)
      me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.green.10", tScore010)
      me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.green.100", tScore001)
      if i_team < 100 then
        getWindow(me.m_sWindowName).getElement("ghosts.green.100").hide()
      else
        getWindow(me.m_sWindowName).getElement("ghosts.green.100").show()
      end if
    else
      return 0
    end if
  end if
end
on SetTeamWins me, i_score, i_team
  t_num01b = member("hm_" & i_team)
  if i_score = #purple then
    me.m_rClient.SetNumber(me.m_sWindowName, "score.red", t_num01b)
  else
    if i_score = #green then
      me.m_rClient.SetNumber(me.m_sWindowName, "score.green", t_num01b)
    else
      return 0
    end if
  end if
end
on HideTimerDisplay me
end
on sendMessage me, t_ar_cWords
  tCmd = 560
  getConnection(getVariable("main.connection.id", "VMK")).send(tCmd, TransformCannedToMsg(t_ar_cWords, 1))
  return 1
end
on EventProc me, tElemID, tParm, tEvent
  t_num0 = getWindow(me.m_sWindowName)
  if tElemID = #mouseUp then
    if tParm = "hm.keyoptions.button" then
      me.m_rClient.ShowWindow("Keys")
    else
      if tParm = "pirates.exitgame.button" then
        if not DialogWindowExists("hauntedmansion_exit") then
          tAscii = createDialogWindow(me.getID(), "hauntedmansion_exit", 2, 1)
          tAscii.show()
          tAscii.setText(getText("hmg.dialog.exit.text"), getText("hmg.dialog.exit.title"), getText("hmg.dialog.exit.no"), getText("hmg.dialog.exit.yes"))
        end if
      end if
    end if
  else
    if tElemID = #keyDown then
      t = keyCode()
      trace(t)
      if t >= 82 and t <= 92 then
        trace("skipping key?")
        return 1
      end if
      if key() = RETURN or key() = ENTER then
        t = 36
      end if
      if t = 51 then
        me.m_pCannedField.updateContent()
        pass()
      else
        if t = 36 then
          t_iKeyCode = me.m_pCannedField.CheckContent()
          if t_iKeyCode then
            me.sendMessage(me.m_pCannedField.m_ar_cWords)
            getWindow(me.m_sWindowName).getElement("pirates.chat.field").setText(EMPTY)
          end if
          return 1
        else
          if t = 49 then
            t_iKeyCode = me.m_pCannedField.CheckContent()
            if t_iKeyCode then
              me.m_pCannedField.updateContent()
            end if
          else
            if not me.m_pCannedField.updateContent() then
              return 1
            end if
          end if
        end if
      end if
      t_iChar = EMPTY
      t_pass = charToNum(key())
      t_allow = 0
      if t_pass > 31 and t_pass < 128 then
        if t_iChar contains key() or t_iChar = EMPTY then
          t_allow = 1
        end if
      end if
      if not t_allow then
        return 1
      end if
      tValidKeys = t_num0.getElement(tParm)
      if tValidKeys <> 0 then
        tElem = tValidKeys.pMember.text.char.count + 1
        if tValidKeys.pMember.charPosToLoc(tElem).locH >= tValidKeys.pMember.width - 10 then
          return 1
        end if
      end if
    else
      if tElemID = #keyUp then
        t = keyCode()
        if me.m_pCannedField <> 0 then
          if t <> 36 then
            if t = 49 then
            else
              me.m_pCannedField.CheckWord()
            end if
          end if
        end if
      end if
    end if
  end if
end
on dialogWindowEvent me, t_dialogEvent, t_dialogName
  if t_dialogEvent = "hauntedmansion_exit" then
    if t_dialogName = #dialogOK then
      getThread("minigame").getComponent().StopMinigameEngine()
      executeMessage(#SendMinigameAction, 5, [])
    else
      if t_dialogName = #dialogCancel then
      else
        put "Unknown event" && t_dialogName
      end if
    end if
  else
    put "HM Unknown Dialog Window" && t_dialogEvent
  end if
end