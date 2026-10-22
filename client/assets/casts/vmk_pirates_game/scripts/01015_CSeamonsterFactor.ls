-- Script
property m_ATTACK_BIT
property m_rMGE

on construct me
  m_ATTACK_BIT = 1
  m_rMGE = getThread("minigame").getComponent()
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  me.getObject().SetParam("BoundsType", #circle)
  me.getObject().SetParam("BoundingCirleRadius", 5000)
  me.getObject().SetParam("WindAffects", 0)
  me.getObject().SetParam("NavigationStopRadius", 1000)
  me.getObject().SetParam("State", 0)
  me.getObject().SetParam("Speed", getThread("piratesminigame").getComponent().GetStage().GetSeaMonsterSettings().getaProp("ChaseSpeed"))
end
on UpdateParameters me, i_ar_iData
end
on move me
  tMyObject = me.getObject()
  tPos = tMyObject.GetParam("WorldPosition")
  tdir = tMyObject.GetParam("Direction")
  tGameParams = tMyObject.GetParam("GameParams")
  tNavigationTarget = intvector(tGameParams[1], tGameParams[2], 0)
  tSpeed = tMyObject.GetParam("Speed")
  tVel = intvector(0, 0, 0)
  t_iDeltaX = tNavigationTarget.x - tPos.x
  t_iDeltaY = tNavigationTarget.y - tPos.y
  t_iDirection = m_rMGE.GetComponentToAngle().getAngleFromComponents(t_iDeltaX, t_iDeltaY)
  if t_iDeltaX < 0 then
    t_iDeltaX = -t_iDeltaX
  end if
  if t_iDeltaY < 0 then
    t_iDeltaY = -t_iDeltaY
  end if
  if t_iDeltaX < 20 and t_iDeltaY < 20 then
    tPos.x = tNavigationTarget.x
    tPos.y = tNavigationTarget.y
  else
    tVelTable = m_rMGE.GetVelocityTable()
    tVel.x = tVelTable.GetBaseVelX(t_iDirection) * tSpeed / 256
    tVel.y = tVelTable.GetBaseVelY(t_iDirection) * tSpeed / 256
    tPos = tPos.add(tVel)
  end if
  tMyObject.SetParam("WorldPosition", tPos)
  tMyObject.SetParam("GameParams", tGameParams)
end
on Attack me
  tstate = me.getObject().GetParam("State")
  tstate = SetBit(tstate, m_ATTACK_BIT)
  me.getObject().SetParam("State", tstate)
end