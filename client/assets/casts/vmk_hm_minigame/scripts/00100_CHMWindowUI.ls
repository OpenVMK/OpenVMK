-- Script
property m_rClient
property m_sWindowName
property m_bActive
property m_pCannedField
property m_iLastPurpleScore
property m_iLastGreenScore
property m_iLastPurpleWins
property m_iLastGreenWins

on construct me
  m_sWindowName = "HMG Window UI"
  m_iLastPurpleScore = 0
  m_iLastGreenScore = 0
  m_iLastPurpleWins = 0
  m_iLastGreenWins = 0
  m_bActive = 0
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  return 1
end
on Init me, a_rClient
  m_rClient = a_rClient
end
on hide me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  m_bActive = 0
end
on show me
  if getWindow(m_sWindowName) <> 0 then
    getWindow(m_sWindowName).show()
  else
    me.InitWindow()
  end if
end
on update me
  if m_bActive then
    t_rGameEngine = m_rClient.GetGameEngine()
    tScoreBoard = t_rGameEngine.GetObjectsByCode(5)
    if tScoreBoard.count = 1 then
      tGreenScore = tScoreBoard[1].GetFactor().GetTeam1Score()
      tPurpleScore = tScoreBoard[1].GetFactor().GetTeam2Score()
      tGreenWins = tScoreBoard[1].GetFactor().GetTeam1Wins()
      tPurpleWins = tScoreBoard[1].GetFactor().GetTeam2Wins()
      if tPurpleScore <> m_iLastPurpleScore then
        me.setTeamScore(#purple, tPurpleScore)
      end if
      if tGreenScore <> m_iLastGreenScore then
        me.setTeamScore(#green, tGreenScore)
      end if
      if tPurpleWins <> m_iLastPurpleWins then
        me.SetTeamWins(#purple, tPurpleWins)
      end if
      if tGreenWins <> m_iLastGreenWins then
        me.SetTeamWins(#green, tGreenWins)
      end if
      m_iLastPurpleScore = tPurpleScore
      m_iLastGreenScore = tGreenScore
      m_iLastPurpleWins = tPurpleWins
      m_iLastGreenWins = tGreenWins
    end if
  end if
end
on setChattable me, t_bChatMode
  getWindow(m_sWindowName).getElement("pirates.chat.field").setEdit(t_bChatMode)
  m_rClient.setButtonState(m_sWindowName, "pirates.exitgame.button", t_bChatMode)
  m_rClient.setButtonState(m_sWindowName, "hm.keyoptions.button", t_bChatMode)
end
on InitWindow me
  createWindow(m_sWindowName, "vmk_hm_ingameui.window")
  tWndObj = getWindow(m_sWindowName)
  if not voidp(tWndObj) then
    tWndObj.moveTo(61, 565)
    m_rGameInterfaceWindow = tWndObj
  else
    return error(me, "HMGWindow.UI: Unable to create window ", #InitWindow)
  end if
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#EventProc, me.getID(), #mouseUp)
  tWndObj.registerProcedure(#EventProc, me.getID(), #keyDown)
  tWndObj.registerProcedure(#EventProc, me.getID(), #keyUp)
  tWndObj.getElement("back").hide()
  tWndObj.getElement("time.red").hide()
  t_num0 = member("hm_0")
  t_num0b = member("hmb_0")
  m_rClient.SetNumber(m_sWindowName, "score.green", t_num0)
  m_rClient.SetNumber(m_sWindowName, "score.red", t_num0)
  m_rClient.SetNumber(m_sWindowName, "time.green", member("time.green"))
  m_rClient.SetNumber(m_sWindowName, "bg", member("hm_:"))
  me.SetTimerDisplay(0)
  me.setTeamScore(#purple, 0)
  me.setTeamScore(#green, 0)
  if m_pCannedField = 0 then
    m_pCannedField = CreateCannedField(m_sWindowName, "pirates.chat.field", rgb("#EFEFEF"), rgb(255, 0, 0))
    if m_pCannedField <> 0 then
      m_pCannedField.setAllowErrors(1)
    end if
  end if
  me.setChattable(0)
  m_bActive = 1
end
on SetTimerDisplay me, a_iSecondsLeft
  if a_iSecondsLeft = 10 then
    executeMessage("PlayInterfaceSound", "HMG-bell")
    m_rClient.ShowWindow("Notice", "hurry up")
  end if
  if a_iSecondsLeft > 30 then
    m_rClient.SetNumber(m_sWindowName, "time.green", member("time.green"))
  else
    m_rClient.SetNumber(m_sWindowName, "time.green", member("time.red"))
  end if
  tMinutes = a_iSecondsLeft / 60
  tSeconds = a_iSecondsLeft - 60 * tMinutes
  if tMinutes < 10 then
    m_rClient.SetNumber(m_sWindowName, "time.minutes", member("hm_" & tMinutes))
  else
    m_rClient.SetNumber(m_sWindowName, "time.minutes", member("hm_9"))
  end if
  tSec10 = tSeconds / 10
  tSec01 = tSeconds - 10 * tSec10
  m_rClient.SetNumber(m_sWindowName, "time.seconds.10", member("hm_" & tSec10))
  m_rClient.SetNumber(m_sWindowName, "time.seconds.01", member("hm_" & tSec01))
end
on setTeamScore me, i_team, i_score
  tScore100 = integer(i_score mod 1000 / 100)
  tScore010 = integer(i_score mod 100 / 10)
  tScore001 = integer(i_score mod 10 / 1)
  t_num100b = member("hmb_" & tScore100)
  t_num010b = member("hmb_" & tScore010)
  t_num001b = member("hmb_" & tScore001)
  case i_team of
    #purple:
      m_rClient.SetNumber(m_sWindowName, "ghosts.red.01", t_num001b)
      m_rClient.SetNumber(m_sWindowName, "ghosts.red.10", t_num010b)
      m_rClient.SetNumber(m_sWindowName, "ghosts.red.100", t_num100b)
      if i_score < 100 then
        getWindow(m_sWindowName).getElement("ghosts.red.100").hide()
      else
        getWindow(m_sWindowName).getElement("ghosts.red.100").show()
      end if
    #green:
      m_rClient.SetNumber(m_sWindowName, "ghosts.green.01", t_num001b)
      m_rClient.SetNumber(m_sWindowName, "ghosts.green.10", t_num010b)
      m_rClient.SetNumber(m_sWindowName, "ghosts.green.100", t_num100b)
      if i_score < 100 then
        getWindow(m_sWindowName).getElement("ghosts.green.100").hide()
      else
        getWindow(m_sWindowName).getElement("ghosts.green.100").show()
      end if

  end case
  return 0
end
on SetTeamWins me, i_team, i_score
  t_num01b = member("hm_" & i_score)
  case i_team of
    #purple:
      m_rClient.SetNumber(m_sWindowName, "score.red", t_num01b)
    #green:
      m_rClient.SetNumber(m_sWindowName, "score.green", t_num01b)

  end case
  return 0
end
on HideTimerDisplay me
end
on SendMessage me, t_ar_cWords
  tCmd = 560
  getConnection(getVariable("main.connection.id", "VMK")).send(tCmd, TransformCannedToMsg(t_ar_cWords, 1))
  return 1
end
on EventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWindowName)
  if tEvent = #mouseUp then
    case tElemID of
      "hm.keyoptions.button":
        m_rClient.ShowWindow("Keys")
      "pirates.exitgame.button":
        if not DialogWindowExists("hauntedmansion_exit") then
          t = createDialogWindow(me.getID(), "hauntedmansion_exit", 2, 1)
          t.show()
          t.setText(getText("hmg.dialog.exit.text"), getText("hmg.dialog.exit.title"), getText("hmg.dialog.exit.no"), getText("hmg.dialog.exit.yes"))
        end if

    end case
  else
    if tEvent = #keyDown then
      t_iKeyCode = the keyCode
      if t_iKeyCode >= 82 and t_iKeyCode <= 92 then
        return 1
      end if
      if "0123456789" contains the key then
        return 1
      end if
      if the key = RETURN or the key = ENTER then
        t_iKeyCode = 36
      end if
      if m_pCannedField <> 0 then
        case t_iKeyCode of
          123, 124, 125, 126:
            m_pCannedField.updateContent()
            pass()
          117, 51:
            m_pCannedField.updateContent()
            pass()
          36:
            t_pass = m_pCannedField.CheckContent()
            if t_pass then
              me.SendMessage(m_pCannedField.m_ar_cWords)
              m_pCannedField.reset()
            end if
            return 1
          49:
            t_pass = m_pCannedField.CheckContent()
            if t_pass then
              m_pCannedField.updateContent()
            end if
          otherwise:
            if not m_pCannedField.updateContent() then
              return 1
            end if
            tValidKeys = "abcdefghijlkmnopqrstuvwxyz_-=+?!@<>:.,'*/()[]\#;" & QUOTE
            tAscii = charToNum(the key)
            t_allow = 0
            if tAscii > 31 and tAscii < 128 then
              if tValidKeys contains the key or tValidKeys = EMPTY then
                t_allow = 1
              end if
            end if
            if not t_allow then
              return 1
            end if

        end case
        tElem = tWndObj.getElement(tElemID)
        if tElem <> 0 then
          t_iChar = tElem.pMember.text.char.count + 1
          if tElem.pMember.charPosToLoc(t_iChar).locH >= tElem.pMember.width - 10 then
            return 1
          end if
        end if
      end if
    else
      if tEvent = #keyUp then
        t_iKeyCode = the keyCode
        if m_pCannedField <> 0 then
          case t_iKeyCode of
            36, 49:
            otherwise:
              m_pCannedField.CheckWord()

          end case
        end if
      end if
    end if
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "hauntedmansion_exit":
      case t_dialogEvent of
        #dialogOK:
          getThread("minigame").getComponent().StopMinigameEngine()
          executeMessage(#SendMinigameAction, 5, [])
        #dialogCancel:
        otherwise:
          put "Unknown event" && t_dialogEvent

      end case
    otherwise:
      put "HM Unknown Dialog Window" && t_dialogName

  end case
end