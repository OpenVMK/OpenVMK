-- Script
property m_rClient
property m_sWindowName

on construct me
  m_sWindowName = "HMG Window Results"
  return 1
end
on deconstruct me
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
on InitWindow me
  executeMessage("StopRoomSound")
  m_bActive = 0
  t_ar_roundResults = m_rClient.GetRoundResults()
  t_iWinningTeam = t_ar_roundResults[1]
  t_iTeam1Score = t_ar_roundResults[2]
  t_iTeam2Score = t_ar_roundResults[3]
  t_bIsLastStage = t_ar_roundResults[4]
  t_iDoorRaceWinner = t_ar_roundResults[5]
  t_bGameIsCancelled = t_ar_roundResults[6]
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  t_bGameWasCancelled = 0
  if t_ar_roundResults.count >= 6 then
    t_bGameWasCancelled = t_ar_roundResults[6]
  end if
  createWindow(m_sWindowName, "vmk_hm_modal.window")
  tWndObj = getWindow(m_sWindowName)
  if not voidp(tWndObj) then
    tWndObj.center()
  else
    return error(me, "HMGWindow.Results: Unable to create window ", #InitWindow)
  end if
  tWndObj.merge("vmk_hm_results.window")
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#EventProc, me.getID(), #mouseUp)
  t_iRound = m_rClient.getComponent().getRounds()
  t_rOwnPlayer = m_rClient.getComponent().getOwnPlayer()
  if objectp(t_rOwnPlayer) then
    if t_rOwnPlayer.GetParam("Team") = t_ar_roundResults[1] then
      executeMessage("PlayInterfaceSound", "HMG-win")
    else
      executeMessage("PlayInterfaceSound", "HMG-loose")
    end if
  end if
  me.setResultTeamScore(#green, t_ar_roundResults[2])
  me.setResultTeamScore(#purple, t_ar_roundResults[3])
  t_rGameEngine = m_rClient.GetGameEngine()
  tScoreBoard = t_rGameEngine.GetObjectsByCode(5)
  if tScoreBoard.count = 1 then
    me.setResultTeamWins(#green, tScoreBoard[1].GetFactor().GetTeam1Wins())
    me.setResultTeamWins(#purple, tScoreBoard[1].GetFactor().GetTeam2Wins())
  else
    me.setResultTeamWins(#green, 0)
    me.setResultTeamWins(#purple, 0)
  end if
  repeat with i = 1 to 4
    tWndObj.getElement("green.doorwinner" & i).hide()
    tWndObj.getElement("purple.doorwinner" & i).hide()
  end repeat
  t_ar_Players = t_rGameEngine.GetObjectsByCode(3)
  t_ar_purple = []
  t_ar_Green = []
  t_ar_purple.sort()
  t_ar_Green.sort()
  repeat with t_rPlayer in t_ar_Players
    t_iTeam = t_rPlayer.GetParam("Team")
    t_iScore = t_rPlayer.GetParam("GameParams")[1]
    t_sName = t_rPlayer.GetFactor().GetName()
    t_bExit = t_rPlayer.GetFactor().getFoundExit()
    t_bCaught = t_rPlayer.GetFactor().getCaughtBySuperGhost()
    case t_iTeam of
      1:
        t_ar_Green.append([t_iScore, t_sName, t_bExit, t_bCaught])
      2:
        t_ar_purple.append([t_iScore, t_sName, t_bExit, t_bCaught])

    end case
  end repeat
  repeat with i = 1 to t_ar_Green.count
    t_rScore = t_ar_Green[i]
    tWndObj.getElement("green.player" & i).setText(t_rScore[2])
    tWndObj.getElement("green.player" & i & ".score").setText(t_rScore[1])
    if t_rScore[3] then
      tWndObj.getElement("green.doorwinner" & i).show()
      m_rClient.SetNumber(m_sWindowName, "green.doorwinner" & i, "racewinner.green")
      next repeat
    end if
    if t_rScore[4] then
      tWndObj.getElement("green.doorwinner" & i).show()
      m_rClient.SetNumber(m_sWindowName, "green.doorwinner" & i, "ghostcatch")
    end if
  end repeat
  repeat with i = 1 to t_ar_purple.count
    t_rScore = t_ar_purple[i]
    tWndObj.getElement("purple.player" & i).setText(t_rScore[2])
    tWndObj.getElement("purple.player" & i & ".score").setText(t_rScore[1])
    if t_rScore[3] then
      tWndObj.getElement("purple.doorwinner" & i).show()
      m_rClient.SetNumber(m_sWindowName, "purple.doorwinner" & i, "racewinner.purple")
      next repeat
    end if
    if t_rScore[4] then
      tWndObj.getElement("purple.doorwinner" & i).show()
      m_rClient.SetNumber(m_sWindowName, "purple.doorwinner" & i, "ghostcatch")
    end if
  end repeat
  m_rClient.fixAntialisingTextElement(m_sWindowName, "hm.dialog.hd", 1, getText("hmg.results.title") && t_iRound, 0)
  case t_ar_roundResults[5] of
    0:
      tWndObj.getElement("hm.startstatus").setText(getText("hmg.results.startstatus0"))
      tWndObj.getElement("team.doorwinner").hide()
    1:
      tWndObj.getElement("hm.startstatus").setText(getText("hmg.results.startstatus1"))
      m_rClient.SetNumber(m_sWindowName, "team.doorwinner", "racewinner.green")
    2:
      tWndObj.getElement("hm.startstatus").setText(getText("hmg.results.startstatus2"))
      m_rClient.SetNumber(m_sWindowName, "team.doorwinner", "racewinner.purple")

  end case
  if t_bGameWasCancelled then
    t_sWinner = getText("hmg.results.winner.cancel")
    t_rColor = VOID
  else
    case t_ar_roundResults[1] of
      1:
        t_sWinner = getText("hmg.results.winner1") && t_iRound
        t_rColor = rgb("#B1ED35")
      2:
        t_sWinner = getText("hmg.results.winner2") && t_iRound
        t_rColor = rgb("#ED3599")
      otherwise:
        t_sWinner = getText("hmg.results.winner0") && t_iRound
        t_rColor = VOID

    end case
  end if
  m_rClient.fixAntialisingTextElement(m_sWindowName, "hm.winner", 1, t_sWinner, 0, t_rColor)
  if not t_bGameWasCancelled then
    if not t_ar_roundResults[4] then
      put "LAST STAGE" && t_ar_roundResults
      createTimeout("hmShowGameEnd", 3000, #ShowWindow, m_rClient.getID(), "GameOver", 1)
    end if
  end if
end
on setResultTeamScore me, i_team, i_score
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
on setResultTeamWins me, i_team, i_score
  t_num01b = member("hm_" & i_score)
  case i_team of
    #green:
      m_rClient.SetNumber(m_sWindowName, "score.green", t_num01b)
    #purple:
      m_rClient.SetNumber(m_sWindowName, "score.red", t_num01b)

  end case
  return 0
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