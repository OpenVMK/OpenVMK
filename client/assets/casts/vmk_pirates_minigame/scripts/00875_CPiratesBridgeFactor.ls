-- Script
property m_team1Score
property m_team2Score

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
  tGameParams = me.getObject().GetParam("GameParams")
end