-- Script
property m_collided
property m_BIT_INVINCIBLE
property m_BIT_BROADSIDE
property m_BIT_SHRAPNEL
property m_BIT_GOLDEN
property m_rPiratesEngine
property m_rGameEngine
global g_profCannonballFactorAcc
global g_profCollisionAcc

on construct me
  m_BIT_INVINCIBLE = 1
  m_BIT_BROADSIDE = 2
  m_BIT_SHRAPNEL = 3
  m_BIT_GOLDEN = 4
  return 1
end
on deconstruct me
  return 1
end
on SetConstants me
  me.getObject().SetParam("BoundsType", #point)
  me.getObject().SetParam("WindAffects", 0)
  me.getObject().SetParam("LastMove", the milliSeconds)
  m_collided = 0
  m_rPiratesEngine = getThread("piratesminigame").getComponent()
  m_rGameEngine = getThread("minigame").getComponent()
end
on UpdateParameters me
end
on GetLife me
  return me.getObject().GetParam("GameParams")[4]
end
on IsRemovable me
  return me.GetLife() <= 0 or m_collided
end
on move me
  tt = the milliSeconds
  t_bSync = m_rGameEngine.GetMinigameHandler().getSyncState()
  if t_bSync then
    tMyObject = me.getObject()
    tMyObject.SetParam("LastMove", the milliSeconds)
    t_ar_gameParams = tMyObject.GetParam("GameParams")
    tVelX = t_ar_gameParams[2]
    tVelY = t_ar_gameParams[3]
    tPos = tMyObject.GetParam("WorldPosition")
    tPos = tPos.add(intvector(tVelX, tVelY, 0))
    tLife = t_ar_gameParams[4] - 1
    t_ar_gameParams[4] = tLife
    tcol = the milliSeconds
    tColliding = 0
    tMyObject.SetParam("WorldPosition", tPos)
    tCMap = m_rPiratesEngine.GetCollisionMap()
    tMapHeight = TestShipToCMap(me.getObject(), tCMap)
    if tMapHeight > 3 then
      m_collided = 1
    end if
    m_mp_objects = m_rGameEngine.GetAllObjects()
    tOwnerShip = m_rGameEngine.GetMGObject(t_ar_gameParams[1])
    tInvincible = TestBit(tMyObject.GetParam("State"), m_BIT_INVINCIBLE)
    tGolden = TestBit(tMyObject.GetParam("State"), m_BIT_GOLDEN)
    t_ar_ships = m_rGameEngine.GetObjectsByCode(1)
    t_ar_turrets = m_rGameEngine.GetObjectsByCode(4)
    t_ar_buildings = m_rGameEngine.GetObjectsByCode(5)
    repeat with tObj in t_ar_ships
      if tObj <> tOwnerShip then
        totallyDestroyed = TestBit(tObj.GetParam("State"), 4) and not TestBit(tObj.GetParam("State"), 5)
        if not totallyDestroyed then
          tShipInvincible = TestBit(tObj.GetParam("State"), 6)
          if not tInvincible and not tShipInvincible or tInvincible and tShipInvincible then
            if m_rGameEngine._TestCollision(tMyObject, tObj) then
              if tGolden then
              end if
              tProjPos = ProjectAxonometricPosition(point(tPos.x, tPos.y))
              tObj.GetVisual().flash(tProjPos)
              m_rPiratesEngine.CreatePuff(tProjPos, "explosion", m_rPiratesEngine.GetNewReference())
              m_collided = 1
            end if
          end if
        end if
      end if
    end repeat
    repeat with tObj in t_ar_turrets
      if m_rGameEngine._TestCollision(tMyObject, tObj) then
        m_collided = 1
      end if
    end repeat
    repeat with tObj in t_ar_buildings
      if m_rGameEngine._TestCollision(tMyObject, tObj) then
        m_collided = 1
      end if
    end repeat
    g_profCollisionAcc = g_profCollisionAcc + (the milliSeconds - tcol)
    tMyObject.SetParam("WorldPosition", tPos)
    tMyObject.SetParam("GameParams", t_ar_gameParams)
  end if
  g_profCannonballFactorAcc = g_profCannonballFactorAcc + (the milliSeconds - tt)
end