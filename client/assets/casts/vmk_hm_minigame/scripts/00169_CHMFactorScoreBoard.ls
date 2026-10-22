-- Script
on construct me
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  put "Forced scoreboard setconstants"
end
on UpdateParameters me, i_ar_data
  put "Forced scoreboard update" && i_ar_data
end
on move me
end
on TeamWins me, i_iTeam
  put "HM Scoreboard: updated team-wins: " && i_iTeam
  case i_iTeam of
    1:
      me.getObject().GetParam("GameParams")[3] = me.getObject().GetParam("GameParams")[3] + 1
    2:
      me.getObject().GetParam("GameParams")[4] = me.getObject().GetParam("GameParams")[4] + 1

  end case
  me.UpdateTeamScores()
end
on UpdateTeamScores me
  t_ar_rShips = getThread("minigame").getComponent().GetObjectsByCode(3)
  t_team1Score = 0
  t_team2Score = 0
  t_team1Members = 0
  t_team2Members = 0
  repeat with tPlayer in t_ar_rShips
    case tPlayer.GetParam("Team") of
      1:
        t_team1Score = t_team1Score + tPlayer.GetParam("Score")
        t_team1Members = t_team1Members + 1
      2:
        t_team2Score = t_team2Score + tPlayer.GetParam("Score")
        t_team2Members = t_team2Members + 1

    end case
  end repeat
  if t_team1Members <> 0 then
    t_team1Score = t_team1Score
  end if
  if t_team2Members <> 0 then
    t_team2Score = t_team2Score
  end if
  t_ar_gameParams = []
  t_ar_gameParams[1] = t_team1Score
  t_ar_gameParams[2] = t_team2Score
  t_ar_gameParams[3] = me.getObject().GetParam("GameParams")[3]
  t_ar_gameParams[4] = me.getObject().GetParam("GameParams")[4]
  me.getObject().SetParam("GameParams", t_ar_gameParams)
end
on GetTeam1Score me
  return me.getObject().GetParam("GameParams")[1]
end
on GetTeam2Score me
  return me.getObject().GetParam("GameParams")[2]
end
on GetTeam1Wins me
  return me.getObject().GetParam("GameParams")[3]
end
on GetTeam2Wins me
  return me.getObject().GetParam("GameParams")[4]
end