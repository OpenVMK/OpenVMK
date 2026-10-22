-- Script
property m_ar_windStrength

on construct me
  m_ar_windStrength = [0, 2, 4, 8, 10, 16, 20, 30, 40, 50, 60, 80, 100]
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  me.getObject().SetParam("Strength", m_ar_windStrength[1])
end
on ChangeWind me, a_iDirection, a_iVelocity
  tGameParams = me.getObject().GetParam("GameParams")
  tGameParams[1] = a_iVelocity
  me.getObject().SetParam("GameParams", tGameParams)
  me.getObject().SetParam("Direction", a_iDirection)
  me.getObject().SetParam("Strength", m_ar_windStrength[a_iVelocity + 1])
end
on UpdateParameters me, i_ar_data
  me.getObject().SetParam("GameParams", i_ar_data)
  me.getObject().SetParam("Strength", m_ar_windStrength[i_ar_data[1] + 1])
end
on move me
  tGameParams = me.getObject().GetParam("GameParams")
  me.getObject().SetParam("Strength", m_ar_windStrength[tGameParams[1] + 1])
end