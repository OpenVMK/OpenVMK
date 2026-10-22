-- Script
on construct me
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  me.getObject().SetParam("WindAffects", 0)
end
on UpdateParameters me, i_ar_data
end
on move me
end
on addTeamWin me, i_team
  t_ar_gameParams = []
  t_ar_gameParams[1] = me.GetTeam1Gold()
  t_ar_gameParams[2] = me.GetTeam2Gold()
  tTeam1Wins = me.GetTeam1Wins()
  if i_team = 1 then
    tTeam1Wins = tTeam1Wins + 1
  end if
  t_ar_gameParams[3] = tTeam1Wins
  tTeam2Wins = me.GetTeam2Wins()
  if i_team = 2 then
    tTeam2Wins = tTeam2Wins + 1
  end if
  t_ar_gameParams[4] = tTeam2Wins
  me.getObject().SetParam("GameParams", t_ar_gameParams)
end
on AddToVault me, i_team, i_Amount
  if i_Amount < 1 then
    exit
  end if
  t_team1Gold = me.GetTeam1Gold()
  t_team2Gold = me.GetTeam2Gold()
  case i_team of
    1:
      t_team1Gold = t_team1Gold + i_Amount
    2:
      t_team2Gold = t_team2Gold + i_Amount

  end case
  exit
  t_ar_gameParams = []
  t_ar_gameParams[1] = t_team1Gold
  t_ar_gameParams[2] = t_team2Gold
  t_ar_gameParams[3] = me.GetTeam1Wins()
  t_ar_gameParams[4] = me.GetTeam2Wins()
  me.getObject().SetParam("GameParams", t_ar_gameParams)
end
on GetTeam1Gold me
  return me.getObject().GetParam("GameParams")[1]
end
on GetTeam2Gold me
  return me.getObject().GetParam("GameParams")[2]
end
on GetTeam1Wins me
  return me.getObject().GetParam("GameParams")[3]
end
on GetTeam2Wins me
  return me.getObject().GetParam("GameParams")[4]
end
on GetTeam1Score me
  t_ar_rShips = getThread("minigame").getComponent().GetObjectsByCode(1)
  t_teamGold = 0
  repeat with tShip in t_ar_rShips
    case tShip.GetParam("Team") of
      1:
        t_teamGold = t_teamGold + tShip.GetParam("Score")

    end case
  end repeat
  return t_teamGold
end
on GetTeam2Score me
  t_ar_rShips = getThread("minigame").getComponent().GetObjectsByCode(1)
  t_teamGold = 0
  repeat with tShip in t_ar_rShips
    case tShip.GetParam("Team") of
      2:
        t_teamGold = t_teamGold + tShip.GetParam("Score")

    end case
  end repeat
  return t_teamGold
end