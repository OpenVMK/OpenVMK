-- Script
property m_HEALTH
property m_carryingFlag

on construct me
  m_HEALTH = 1
  return 1
end
on deconstruct me
  me.getObject().GetVisual().setCollisionVisualization(0)
  return 1
end
on SetConstants me
  if me.getObject().GetParam("GameParams")[1] = 0 then
    m_carryingFlag = 0
  else
    m_carryingFlag = 1
  end if
  me.getObject().SetParam("Killed", 0)
  me.getObject().SetParam("BoundsType", #circle)
  me.getObject().SetParam("BoundingCircleRadius", 3000)
  me.getObject().SetParam("WindAffects", 0)
  me.getObject().GetVisual().setCollisionVisualization(0)
end
on setCarryingFlag me, a_bFlagOnShip
  tstate = me.getObject().GetParam("State")
  if a_bFlagOnShip then
    m_carryingFlag = 1
  else
    m_carryingFlag = 0
  end if
end
on isCarryingFlag me
  return m_carryingFlag
end
on UpdateParameters me, i_ar_data
  if me.getObject().GetParam("GameParams")[1] = 0 then
    m_carryingFlag = 0
  else
    m_carryingFlag = 1
  end if
end
on move me
end
on HitByCannonball me
end
on Kill me
end
on SyncGameParameters me
  t_params = []
  t_params[1] = integer(me.isCarryingFlag())
  me.getObject().SetParam("GameParams", t_params)
end