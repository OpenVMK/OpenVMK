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
    tPurpleScore = tGreenScore.GetObjectsByCode(5)
    if tPurpleScore.count = 1 then
      tGreenWins = tPurpleScore[1].GetFactor().GetTeam1Score()
      tPurpleWins = tPurpleScore[1].GetFactor().GetTeam2Score()
      t_rGameEngine = tPurpleScore[1].GetFactor().GetTeam1Wins()
      tScoreBoard = tPurpleScore[1].GetFactor().GetTeam2Wins()
      if tPurpleWins <> me.m_iLastPurpleScore then
        me.setTeamScore(#purple, tPurpleWins)
      end if
      if tGreenWins <> me.m_iLastGreenScore then
        me.setTeamScore(#green, tGreenWins)
      end if
      if tScoreBoard <> me.m_iLastPurpleWins then
        me.SetTeamWins(#purple, tScoreBoard)
      end if
      if t_rGameEngine <> me.m_iLastGreenWins then
        me.SetTeamWins(#green, t_rGameEngine)
      end if
      m_iLastPurpleScore = tPurpleWins
      m_iLastGreenScore = tGreenWins
      m_iLastPurpleWins = tScoreBoard
      m_iLastGreenWins = t_rGameEngine
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
  tWndObj = getWindow(me.m_sWindowName)
  if not voidp(tWndObj) then
    tWndObj.moveTo(61, 565)
    t_num0 = tWndObj
  else
    return error(me, "HMGWindow.UI: Unable to create window ", #InitWindow)
  end if
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#EventProc, me.getID(), #mouseUp)
  tWndObj.registerProcedure(#EventProc, me.getID(), #keyDown)
  tWndObj.registerProcedure(#EventProc, me.getID(), #keyUp)
  tWndObj.getElement("back").hide()
  tWndObj.getElement("time.red").hide()
  t_num0b = member("hm_0")
  m_rGameInterfaceWindow = member("hmb_0")
  me.m_rClient.SetNumber(me.m_sWindowName, "score.green", t_num0b)
  me.m_rClient.SetNumber(me.m_sWindowName, "score.red", t_num0b)
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
  tSec10 = a_iSecondsLeft / 60
  tSec01 = a_iSecondsLeft - 60 * tSec10
  if tSec10 < 10 then
    me.m_rClient.SetNumber(me.m_sWindowName, "time.minutes", member("hm_" & tSec10))
  else
    me.m_rClient.SetNumber(me.m_sWindowName, "time.minutes", member("hm_9"))
  end if
  tMinutes = tSec01 / 10
  tSeconds = tSec01 - 10 * tMinutes
  me.m_rClient.SetNumber(me.m_sWindowName, "time.seconds.10", member("hm_" & tMinutes))
  me.m_rClient.SetNumber(me.m_sWindowName, "time.seconds.01", member("hm_" & tSeconds))
end
on setTeamScore me, i_team, i_score
  tScore100 = integer(i_score mod 1000 / 100)
  tScore010 = integer(i_score mod 100 / 10)
  tScore001 = integer(i_score mod 10 / 1)
  t_num100b = member("hmb_" & tScore100)
  t_num010b = member("hmb_" & tScore010)
  t_num001b = member("hmb_" & tScore001)
  if i_team = #purple then
    me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.red.01", t_num001b)
    me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.red.10", t_num010b)
    me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.red.100", t_num100b)
    if i_score < 100 then
      getWindow(me.m_sWindowName).getElement("ghosts.red.100").hide()
    else
      getWindow(me.m_sWindowName).getElement("ghosts.red.100").show()
    end if
  else
    if i_team = #green then
      me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.green.01", t_num001b)
      me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.green.10", t_num010b)
      me.m_rClient.SetNumber(me.m_sWindowName, "ghosts.green.100", t_num100b)
      if i_score < 100 then
        getWindow(me.m_sWindowName).getElement("ghosts.green.100").hide()
      else
        getWindow(me.m_sWindowName).getElement("ghosts.green.100").show()
      end if
    else
      return 0
    end if
  end if
end
on SetTeamWins me, i_team, i_score
  t_num01b = member("hm_" & i_score)
  if i_team = #purple then
    me.m_rClient.SetNumber(me.m_sWindowName, "score.red", t_num01b)
  else
    if i_team = #green then
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
on EventProc me, tParm, tElemID, tEvent
  tWndObj = getWindow(me.m_sWindowName)
  if tParm = #mouseUp then
    if tElemID = "hm.keyoptions.button" then
      me.m_rClient.ShowWindow("Keys")
    else
      if tElemID = "pirates.exitgame.button" then
        if not DialogWindowExists("hauntedmansion_exit") then
          t_allow = createDialogWindow(me.getID(), "hauntedmansion_exit", 2, 1)
          t_allow.show()
          t_allow.setText(getText("hmg.dialog.exit.text"), getText("hmg.dialog.exit.title"), getText("hmg.dialog.exit.no"), getText("hmg.dialog.exit.yes"))
        end if
      end if
    end if
  else
    if tParm = #keyDown then
      tElem = keyCode()
      trace(tElem)
      if tElem >= 82 and tElem <= 92 then
        trace("skipping key?")
        return 1
      end if
      if key() = RETURN or key() = ENTER then
        tElem = 36
      end if
      if tElem = 51 then
        me.m_pCannedField.updateContent()
        pass()
      else
        if tElem = 36 then
          t = me.m_pCannedField.CheckContent()
          if t then
            me.sendMessage(me.m_pCannedField.m_ar_cWords)
            getWindow(me.m_sWindowName).getElement("pirates.chat.field").setText(EMPTY)
          end if
          return 1
        else
          if tElem = 49 then
            t = me.m_pCannedField.CheckContent()
            if t then
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
      t_iKeyCode = 0
      if t_pass > 31 and t_pass < 128 then
        if t_iChar contains key() or t_iChar = EMPTY then
          t_iKeyCode = 1
        end if
      end if
      if not t_iKeyCode then
        return 1
      end if
      tValidKeys = tWndObj.getElement(tElemID)
      if tValidKeys <> 0 then
        tAscii = tValidKeys.pMember.text.char.count + 1
        if tValidKeys.pMember.charPosToLoc(tAscii).locH >= tValidKeys.pMember.width - 10 then
          return 1
        end if
      end if
    else
      if tParm = #keyUp then
        tElem = keyCode()
        if me.m_pCannedField <> 0 then
          if tElem <> 36 then
            if tElem = 49 then
            else
              me.m_pCannedField.CheckWord()
            end if
          end if
        end if
      end if
    end if
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  if t_dialogName = "hauntedmansion_exit" then
    if t_dialogEvent = #dialogOK then
      getThread("minigame").getComponent().StopMinigameEngine()
      executeMessage(#SendMinigameAction, 5, [])
    else
      if t_dialogEvent = #dialogCancel then
      else
        put "Unknown event" && t_dialogEvent
      end if
    end if
  else
    put "HM Unknown Dialog Window" && t_dialogName
  end if
end