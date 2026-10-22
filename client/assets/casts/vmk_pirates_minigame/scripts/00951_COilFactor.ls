-- Script
property m_rGameEngine

on construct me
  m_rGameEngine = getThread("minigame").getComponent()
  return 1
end
on deconstruct me
  return 1
end
on IsRemovable me
  return 0
end
on SetConstants me
end
on move me
  tMyObject = me.getObject()
  tAge = tMyObject.GetParam("Age")
  tAge = tAge + 1
  tPos = tMyObject.GetParam("WorldPosition")
  tWind = m_rGameEngine.GetObjectsByCode(8)
  tWindStrength = 0
  tWindDirection = 0
  if tWind.count <> 1 then
    error(me, "Either no wind indicator object found or more than 1 found!", #move)
  else
    tWindStrength = tWind[1].GetParam("Strength")
    tWindDirection = tWind[1].GetParam("Direction")
  end if
  if tMyObject.GetParam("WindAffects") then
    tPos = tPos.add(me.GetVelocityVector(tWindDirection, tWindStrength))
  end if
  tMyObject.SetParam("WorldPosition", tPos)
  tMyObject.SetParam("Age", tAge)
end
on GetVelocityVector me, a_iDir, a_iSpeed
  tVelTable = m_rGameEngine.GetVelocityTable()
  tVel = intvector(tVelTable.GetBaseVelX(a_iDir) * a_iSpeed / 128, tVelTable.GetBaseVelY(a_iDir) * a_iSpeed / 128, 0)
  return tVel
end