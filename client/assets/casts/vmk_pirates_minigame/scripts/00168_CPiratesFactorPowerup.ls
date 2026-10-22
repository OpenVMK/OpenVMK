-- Script
property m_rMGE
property m_collided
global g_profCollisionAcc

on construct me
  m_rMGE = getThread("minigame").getComponent()
  m_collided = 0
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  me.getObject().SetParam("BoundsType", #circle)
  me.getObject().SetParam("BoundingCircleRadius", 550)
  me.getObject().SetParam("WindAffects", 1)
  me.getObject().GetVisual().setCollisionVisualization(0)
end
on UpdateParameters me, i_ar_data
end
on IsRemovable me
  return m_collided
end
on move me
  if m_rMGE.getSyncState() then
    tcol = the milliSeconds
    t_mp_ships = m_rMGE.GetObjectsByCode(1)
    repeat with tShip in t_mp_ships
      if not TestBit(tShip.GetParam("State"), 4) then
        if m_rMGE._TestCollision(me.getObject(), tShip) then
          m_collided = 1
        end if
      end if
    end repeat
    g_profCollisionAcc = g_profCollisionAcc + (the milliSeconds - tcol)
  end if
end