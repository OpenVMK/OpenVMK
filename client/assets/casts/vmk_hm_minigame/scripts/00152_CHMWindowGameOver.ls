-- Script
property m_rClient
property m_sWindowName
property m_sHMGWindowResults
property m_ar_roundResults
property m_iLastGreenWins
property m_iLastPurpleWins
property m_iExitCounter

on construct me
  m_sWindowName = "HMG Window Game Over"
  m_sHMGWindowResults = "HMG Window Results"
  m_ar_roundResults = []
  m_iLastPurpleWins = 0
  m_iLastGreenWins = 0
  registerMessage(#room_leave, me.getID(), #HideGameOverWindow)
  return 1
end
on deconstruct me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  return 1
end
on HideGameOverWindow me
  m_iExitCounter = m_iExitCounter + 1
  if m_iExitCounter >= 2 then
    removeObject(me.getID())
  end if
end
on Init me, a_rClient
  m_rClient = a_rClient
  m_ar_roundResults = m_rClient.GetRoundResults()
  t_rGameEngine = m_rClient.GetGameEngine()
  tScoreBoard = t_rGameEngine.GetObjectsByCode(5)
  if tScoreBoard.count = 1 then
    m_iLastGreenWins = tScoreBoard[1].GetFactor().GetTeam1Wins()
    m_iLastPurpleWins = tScoreBoard[1].GetFactor().GetTeam2Wins()
  end if
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
on InitWindow me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  createWindow(m_sWindowName, "vmk_hm_simple.window")
  tWndObj = getWindow(m_sWindowName)
  if not voidp(tWndObj) then
    tWndObj.center()
  else
    return error(me, "HMGWindow.GameOver: Unable to create window ", #InitWindow)
  end if
  tWndObj.merge("vmk_hm_stageend.window")
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#EventProc, me.getID(), #mouseUp)
  m_rClient.fixAntialisingTextElement(m_sWindowName, "hm.dialog.hd", 1, getText("hmg.gameresults.title"), 0)
  t_bInit = 1
  if not listp(m_ar_roundResults) then
    t_bInit = 0
  end if
  if m_ar_roundResults.count < 1 then
    t_bInit = 0
  end if
  tWndObj.getElement("hm.startstatus.red").hide()
  tWndObj.getElement("hm.startstatus.green").hide()
  if t_bInit then
    case m_ar_roundResults[1] of
      1:
        t_sWinner = getText("hmg.gameresults.winner1")
      2:
        t_sWinner = getText("hmg.gameresults.winner2")
      otherwise:
        t_sWinner = getText("hmg.gameresults.winner0")

    end case
    t_iScore1 = m_rClient.GetTotalGhosts(1)
    t_iScore2 = m_rClient.GetTotalGhosts(2)
    t_iWins1 = m_iLastGreenWins
    t_iWins2 = m_iLastPurpleWins
  else
    t_sWinner = EMPTY
    t_iScore1 = 0
    t_iScore2 = 0
    t_iWins1 = 0
    t_iWins2 = 0
  end if
  m_rClient.fixAntialisingTextElement(m_sWindowName, "hm.roundwinner", 1, t_sWinner, 0)
  me.setGameResultTeamScore(#green, t_iScore1)
  me.setGameResultTeamScore(#purple, t_iScore2)
  me.setGameResultTeamWins(#green, t_iWins1)
  me.setGameResultTeamWins(#purple, t_iWins2)
end
on EventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWindowName)
  if tEvent = #mouseUp then
    case tElemID of
      "hm.help":
        executeMessage(#open_help_page, "help.games.hauntedmansion")
      "hm.close":
        removeObject(me.getID())

    end case
  end if
end
on setGameResultTeamScore me, i_team, i_score
  tScore100 = integer(i_score mod 1000 / 100)
  tScore010 = integer(i_score mod 100 / 10)
  tScore001 = integer(i_score mod 10 / 1)
  t_num100b = member("hm_" & tScore100)
  t_num010b = member("hm_" & tScore010)
  t_num001b = member("hm_" & tScore001)
  case i_team of
    #green:
      m_rClient.SetNumber(m_sWindowName, "ghosts.green.01", t_num001b)
      m_rClient.SetNumber(m_sWindowName, "ghosts.green.10", t_num010b)
      m_rClient.SetNumber(m_sWindowName, "ghosts.green.100", t_num100b)
    #purple:
      m_rClient.SetNumber(m_sWindowName, "ghosts.red.01", t_num001b)
      m_rClient.SetNumber(m_sWindowName, "ghosts.red.10", t_num010b)
      m_rClient.SetNumber(m_sWindowName, "ghosts.red.100", t_num100b)

  end case
  return 0
end
on setGameResultTeamWins me, i_team, i_score
  t_num01b = member("hmb_" & i_score)
  case i_team of
    #green:
      m_rClient.SetNumber(m_sWindowName, "roundwins.green", t_num01b)
    #purple:
      m_rClient.SetNumber(m_sWindowName, "roundwins.red", t_num01b)

  end case
  return 0
end