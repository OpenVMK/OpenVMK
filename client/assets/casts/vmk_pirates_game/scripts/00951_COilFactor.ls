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
  me.getObject().SetParam("WindAffects", 1)
end
on move me
  t_bSync = m_rGameEngine.GetMinigameHandler().getSyncState()
  if t_bSync then
    tMyObject = me.getObject()
    tAge = tMyObject.GetParam("Age")
    tAge = tAge + 1
    tPos = tMyObject.GetParam("WorldPosition")
    tOrigPosX = tPos.x
    tOrigPosY = tPos.y
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
      tPosDrift = me.GetVelocityVector(tWindDirection, tWindStrength)
      tPos = tPos.add(tPosDrift)
      tMyObject.SetParam("WorldPosition", tPos)
      tColliding = me.TestCollision()
      if tColliding then
        tPos.x = tOrigPosX
        tPos.y = tOrigPosY
        tMyObject.SetParam("WorldPosition", tPos)
      end if
      tMyObject.SetParam("Age", tAge)
    end if
  end if
end
on GetVelocityVector me, a_iDir, a_iSpeed
  tVelTable = m_rGameEngine.GetVelocityTable()
  tVel = intvector(tVelTable.GetBaseVelX(a_iDir) * a_iSpeed / 512, tVelTable.GetBaseVelY(a_iDir) * a_iSpeed / 512, 0)
  return tVel
end
on TestCollision me
  tMyObject = me.getObject()
  tstate = tMyObject.GetParam("State")
  tCMap = getThread("piratesminigame").getComponent().GetCollisionMap()
  if not voidp(tCMap) then
    tMapHeight = TestShipToCMap(tMyObject, tCMap)
    if tMapHeight = 0 or tMapHeight = -1 then
    else
      if tMapHeight = 1 then
      else
        if tMapHeight > 1 then
          return 1
        end if
      end if
    end if
  else
    error(me, "Collision Map Data is missing!!", #move)
  end if
  return 0
end