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
on UpdateTeamScores me
  t_ar_rShips = getThread("minigame").getComponent().GetObjectsByCode(1)
  t_team1Score = 0
  t_team2Score = 0
  t_team1Members = 0
  t_team2Members = 0
  repeat with tShip in t_ar_rShips
    case tShip.GetParam("Team") of
      1:
        t_team1Score = t_team1Score + tShip.GetParam("Score")
        t_team1Members = t_team1Members + 1
      2:
        t_team2Score = t_team2Score + tShip.GetParam("Score")
        t_team2Members = t_team2Members + 1

    end case
  end repeat
  if t_team1Members <> 0 then
    t_team1Score = t_team1Score / t_team1Members
  end if
  if t_team2Members <> 0 then
    t_team2Score = t_team2Score / t_team2Members
  end if
  t_ar_gameParams = []
  t_ar_gameParams[1] = t_team1Score
  t_ar_gameParams[2] = t_team2Score
  me.getObject().SetParam("GameParams", t_ar_gameParams)
end
on GetTeam1Score me
  return me.getObject().GetParam("GameParams")[1]
end
on GetTeam2Score me
  return me.getObject().GetParam("GameParams")[2]
end