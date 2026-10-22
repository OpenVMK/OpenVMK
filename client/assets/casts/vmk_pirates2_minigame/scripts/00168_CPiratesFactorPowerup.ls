-- Script
property m_rMGE
property m_collided
property m_GOLDENBIT
global g_profCollisionAcc

on construct me
  m_rMGE = getThread("minigame").getComponent()
  m_collided = 0
  m_GOLDENBIT = 1
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
  t_ar_param = me.getObject().GetParam("GameParams")
  me.getObject().SetParam("PowerupType", t_ar_param[1])
  me.getObject().SetParam("State", t_ar_param[2])
  me.getObject().SetParam("PowerupAmount", t_ar_param[3])
end
on UpdateParameters me, i_ar_data
  me.getObject().SetParam("PowerupType", i_ar_data[1])
  me.getObject().SetParam("State", i_ar_data[2])
  me.getObject().SetParam("PowerupAmount", i_ar_data[3])
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
          if me.getObject().GetParam("PowerupType") = 3 then
            t_PowerupTeam = me.getObject().GetParam("Team")
            t_ShipTeam = tShip.GetParam("Team")
            if tShip.GetFactor().isCarryingFlag() or t_ShipTeam = t_PowerupTeam then
              m_collided = 0
            else
              m_collided = 1
            end if
            next repeat
          end if
          m_collided = 1
        end if
      end if
    end repeat
    g_profCollisionAcc = g_profCollisionAcc + (the milliSeconds - tcol)
  end if
end
on setGolden me, a_bGolden
  tstate = me.getObject().GetParam("State")
  if a_bGolden then
    tstate = SetBit(tstate, m_GOLDENBIT)
  else
    tstate = SetBit(tstate, m_GOLDENBIT)
  end if
  me.getObject().SetParam("State", tstate)
end
on IsGolden me
  tstate = me.getObject().GetParam("State")
  return TestBit(tstate, m_GOLDENBIT)
end
on GetPowerupAmount me
  return me.getObject().GetParam("PowerupAmount")
end
on SyncGameParameters me
  t_params = []
  t_params[1] = me.getObject().GetParam("PowerupType")
  t_params[2] = me.getObject().GetParam("State")
  t_params[3] = me.getObject().GetParam("PowerupAmount")
  me.getObject().SetParam("GameParams", t_params)
end