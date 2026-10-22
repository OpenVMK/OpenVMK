-- Script
property m_rClient
property m_sWindowName

on construct me
  m_sWindowName = "HMG Window Get Ready"
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
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  createWindow(m_sWindowName, "vmk_hm_getready.window")
  tWndObj = getWindow(m_sWindowName)
  if not voidp(tWndObj) then
    tWndObj.center()
  else
    return error(me, "HMGWindow.GetReady: Unable to create window ", #InitWindow)
  end if
  t_iRound = m_rClient.getComponent().getRounds()
  m_rClient.fixAntialisingTextElement(m_sWindowName, "hm.roundnumber", 1, "ROUND" && t_iRound, 0)
  t_ar_roundResults = m_rClient.GetRoundResults()
  if t_ar_roundResults.count > 0 then
    case t_ar_roundResults[5] of
      0:
        tWndObj.getElement("hm.startingteam").setText(getText("hmg.getready.startingteam0"))
      1:
        tWndObj.getElement("hm.startingteam").setText(getText("hmg.getready.startingteam1"))
      2:
        tWndObj.getElement("hm.startingteam").setText(getText("hmg.getready.startingteam2"))
      otherwise:
        tWndObj.getElement("hm.startingteam").setText(getText("hmg.getready.startingteam0"))

    end case
  else
    tWndObj.getElement("hm.startingteam").setText(getText("hmg.getready.startingteam0"))
  end if
  t_rGameEngine = m_rClient.GetGameEngine()
  if not voidp(t_rGameEngine) then
    tScoreBoard = []
  else
    tScoreBoard = []
  end if
  if tScoreBoard.count = 1 then
    me.setGetReadyTeamScore(#purple, tScoreBoard[1].GetFactor().GetTeam1Wins())
    me.setGetReadyTeamScore(#green, tScoreBoard[1].GetFactor().GetTeam2Wins())
  else
    me.setGetReadyTeamScore(#purple, 0)
    me.setGetReadyTeamScore(#green, 0)
  end if
  m_rClient.SetNumber(m_sWindowName, "bg", member("hm.getready.bg"))
  m_rClient.SetNumber(m_sWindowName, "getready.countdown", member("hmb_5"))
  createTimeout("hmGetReadyCounter", 1000, #GetReadyCountdown, me.getID(), 5, 1)
  m_bActive = 0
end
on setGetReadyTeamScore me, i_team, i_score
  t_num01b = member("hm_" & i_score)
  case i_team of
    #purple:
      m_rClient.SetNumber(m_sWindowName, "score.red", t_num01b)
    #green:
      m_rClient.SetNumber(m_sWindowName, "score.green", t_num01b)

  end case
  return 0
end
on GetReadyCountdown me, t_iCounter
  if t_iCounter > 10 then
    t_iCounter = 10
  end if
  if t_iCounter > 0 then
    t_iCounter = t_iCounter - 1
    m_rClient.SetNumber(m_sWindowName, "getready.countdown", member("hmb_" & t_iCounter))
    createTimeout("hmGetReadyCounter", 1000, #GetReadyCountdown, me.getID(), t_iCounter, 1)
  else
    if getWindow(m_sWindowName) <> 0 then
      removeWindow(m_sWindowName)
    end if
    m_rClient.HMGGetWindow("UI").setChattable(1)
    m_rClient.setActive(1)
    m_rClient.initAvatar()
    t_rPlayer = m_rClient.GetMyAvatar()
    if objectp(t_rPlayer) then
      t_iOwner = t_rPlayer.GetParam("Owner")
      if objectp(m_rClient.getComponent().getCollisionEngine()) then
      end if
    end if
  end if
end