-- Script
property m_rGameEngine
property m_rPiratesEngine
property m_lastTime
property m_MOVEBIT
property m_SLOWBIT
property m_SHOOTBIT
property m_DESTROYEDBIT
property m_FLOATINGWRECKBIT
property m_INVINCIBILITYBIT
property m_myShip
property m_a3_ws
global g_profShipFactorAcc
global g_profCollisionAcc

on construct me
  m_rGameEngine = getObject(#minigame_component)
  m_rPiratesEngine = getObject(#piratesminigame_component)
  m_lastTime = the milliSeconds
  m_MOVEBIT = 1
  m_SLOWBIT = 2
  m_SHOOTBIT = 3
  m_DESTROYEDBIT = 4
  m_FLOATINGWRECKBIT = 5
  m_INVINCIBILITYBIT = 6
  m_myShip = 0
  m_a3_ws = value(getMember("wp3suck").text)
  return 1
end
on deconstruct me
  me.getObject().GetVisual().setCollisionVisualization(0)
  return 1
end
on SetConstants me
  me.getObject().SetParam("BoundsType", #triplecircle)
  me.getObject().SetParam("1stRadius", 1000)
  me.getObject().SetParam("2ndRadius", 1500)
  me.getObject().SetParam("3rdRadius", 1000)
  me.getObject().SetParam("1stOffset", 1500)
  me.getObject().SetParam("3rdOffset", -1500)
  me.getObject().SetParam("LargestRadius", 2500)
  me.getObject().SetParam("NavigationStopRadius", 1000)
  me.getObject().SetParam("BowCannonOffset", 2000)
  me.getObject().SetParam("SideCannonOffset", 1000)
  me.getObject().SetParam("TurningRate", 15)
  me.getObject().SetParam("Speed", 700)
  me.getObject().SetParam("Velocity", intvector(0, 0, 0))
  me.getObject().SetParam("Health", 5)
  me.getObject().SetParam("MaxHealth", 5)
  me.getObject().SetParam("Ammo", 5)
  me.getObject().SetParam("MaxAmmo", 5)
  me.getObject().SetParam("State", 0)
  me.getObject().SetParam("NavigationTarget", intvector(0, 0, 0))
  me.getObject().SetParam("Score", 0)
  me.getObject().SetParam("WindAffects", 1)
  me.getObject().SetParam("ArcStart", 0)
  me.getObject().SetParam("ArcEnd", 90)
  me.getObject().SetParam("WhirlpoolThrow", intvector(0, 0, 0))
  me.getObject().SetParam("LastMove", the milliSeconds)
  me.getObject().GetVisual().setCollisionVisualization(0)
end
on UpdateParameters me, i_ar_data
  me.getObject().SetParam("Velocity", intvector(i_ar_data[1], i_ar_data[2], 0))
  me.getObject().SetParam("Health", i_ar_data[3])
  me.getObject().SetParam("Ammo", i_ar_data[4])
  me.getObject().SetParam("State", i_ar_data[5])
  me.getObject().SetParam("NavigationTarget", intvector(i_ar_data[6], i_ar_data[7], 0))
  me.getObject().SetParam("Score", i_ar_data[8])
  me.getObject().SetParam("WhirlpoolSuckState", i_ar_data[9])
end
on SetNavigationTarget me, i_iX, i_iY
  me.getObject().SetParam("NavigationTarget", intvector(i_iX, i_iY, 0))
  tstate = me.getObject().GetParam("State")
  tstate = SetBit(tstate, m_MOVEBIT)
  tstate = ClearBit(tstate, m_SHOOTBIT)
  me.getObject().SetParam("State", tstate)
end
on Shoot me
  tAmmo = me.getObject().GetParam("Ammo")
  if tAmmo > 0 then
    tAmmo = tAmmo - 1
    me.getObject().SetParam("Ammo", tAmmo)
    return 1
  end if
  return 0
end
on InvincibilityOn me
  tstate = me.getObject().GetParam("State")
  tstate = SetBit(tstate, m_INVINCIBILITYBIT)
  me.getObject().SetParam("State", tstate)
end
on InvincibilityOff me
  tstate = me.getObject().GetParam("State")
  tstate = ClearBit(tstate, m_INVINCIBILITYBIT)
  me.getObject().SetParam("State", tstate)
end
on IsFloatingWreck me
  tstate = me.getObject().GetParam("State")
  return TestBit(tstate, m_FLOATINGWRECKBIT)
end
on GetDirectionVector me
  tdir = me.getObject().GetParam("Direction")
  return intvector(m_rGameEngine.GetVelocityTable().GetBaseVelX(tdir), m_rGameEngine.GetVelocityTable().GetBaseVelY(tdir), 0)
end
on Kill me
  tstate = me.getObject().GetParam("State")
  tstate = SetBit(tstate, m_FLOATINGWRECKBIT)
  tstate = SetBit(tstate, m_DESTROYEDBIT)
  me.getObject().SetParam("State", tstate)
  me.getObject().SetParam("Health", 0)
  if m_myShip then
    getThread("piratesminigame").getComponent().GetSoundPlayer().PlayVoiceOver(#Death)
  end if
end
on Burn me
  me.LoseHealth()
end
on Blow me
  tstate = me.getObject().GetParam("State")
  tstate = ClearBit(tstate, m_FLOATINGWRECKBIT)
  me.getObject().SetParam("State", tstate)
  me.getObject().SetParam("BoundsType", #none)
end
on LoseHealth me
  tHealth = me.getObject().GetParam("Health") - 1
  if tHealth < 0 then
    tHealth = 0
  end if
  me.getObject().SetParam("Health", tHealth)
  if m_myShip then
    if tHealth <> 0 then
      if tHealth <= 2 then
        getThread("piratesminigame").getComponent().GetSoundPlayer().PlayVoiceOver(#LowHealth)
      else
        getThread("piratesminigame").getComponent().GetSoundPlayer().PlayVoiceOver(#OwnShipHit)
      end if
    end if
  end if
  me.SyncGameParameters()
end
on GetHealth me
  return me.getObject().GetParam("Health")
end
on MarkMyShip me, a_bVal
  m_myShip = a_bVal
end
on collision me, a_rOtherObject
end
on move me
  tBonus = the milliSeconds
  t_bSync = m_rGameEngine.GetMinigameHandler().getSyncState()
  if t_bSync then
    tMyObject = me.getObject()
    tMyObject.SetParam("LastMove", the milliSeconds)
    tPos = tMyObject.GetParam("WorldPosition")
    tdir = tMyObject.GetParam("Direction")
    tNavigationTarget = tMyObject.GetParam("NavigationTarget")
    tTURNING_RATE = tMyObject.GetParam("TurningRate")
    tSpeed = tMyObject.GetParam("Speed")
    tstate = tMyObject.GetParam("State")
    tExtraParams = tMyObject.GetParam("GameParams")
    tVel = intvector(tExtraParams[1], tExtraParams[2], 0)
    tWind = m_rGameEngine.GetObjectsByCode(8)
    tWindStrength = 0
    tWindDirection = 0
    if tWind.count <> 1 then
      error(me, "Either no wind indicator object found or more than 1 found!", #move)
    else
      tWindStrength = tWind[1].GetParam("Strength")
      tWindDirection = tWind[1].GetParam("Direction")
    end if
    tOrigPosX = tPos.x
    tOrigPosY = tPos.y
    tOrigDir = tdir
    t_ar_Whirlpools = m_rGameEngine.GetObjectsByCode(12)
    if t_ar_Whirlpools.count > 0 then
      tWhirlpool = t_ar_Whirlpools[1]
      tWpPos = tWhirlpool.GetParam("WorldPosition")
      tSuckState = tMyObject.GetParam("WhirlpoolSuckState")
      if tSuckState = -1 and me.testDistance(tPos.x, tPos.y, tWpPos.x, tWpPos.y, 3500) then
        tstate = ClearBit(tstate, m_MOVEBIT)
        tMyObject.SetParam("WhirlpoolSuckState", 0)
      else
        if tSuckState > -1 then
          if tSuckState < m_a3_ws.count then
            tAngle = m_a3_ws[tSuckState + 1][1]
            tMagnitude = m_a3_ws[tSuckState + 1][2]
            tRotation = m_a3_ws[tSuckState + 1][3]
            tdir = AdjustDirection(tdir, tRotation)
            tMyObject.SetParam("Direction", tdir)
            tThrowDir = 0
            if tAngle = -1000 then
              tQRandom = m_rGameEngine.GetQuickRandom()
              tSeed = tQRandom.IterateSeed(m_rGameEngine.GetTurnNumber() + tPos.x)
              tThrowDir = tQRandom.getRandomNumber(tSeed, 360)
            else
              tWhirlPos = tWhirlpool.GetParam("WorldPosition")
              tThrowDir = m_rGameEngine.GetComponentToAngle().getAngleFromComponents(tWhirlPos.x - tPos.x, tWhirlPos.y - tPos.y)
              tThrowDir = tThrowDir + tAngle
            end if
            tVelTable = m_rGameEngine.GetVelocityTable()
            tPos.x = tPos.x + tVelTable.GetBaseVelX(tThrowDir) * tMagnitude / 256
            tPos.y = tPos.y + tVelTable.GetBaseVelY(tThrowDir) * tMagnitude / 256
            me.getObject().SetParam("WorldPosition", tPos)
            tColliding = me.TestCollision()
            if tColliding then
              tPos.x = tOrigPosX
              tPos.y = tOrigPosY
              tMyObject.SetParam("WorldPosition", tPos)
            end if
            tVel.x = tPos.x - tOrigPosX
            tVel.y = tPos.y - tOrigPosY
            tMyObject.SetParam("Velocity", tVel)
            tMyObject.SetParam("WhirlpoolSuckState", tSuckState + 1)
            me.SyncGameParameters()
            exit
          else
            tMyObject.SetParam("WhirlpoolSuckState", -1)
          end if
        end if
      end if
    end if
    if TestBit(tstate, m_MOVEBIT) and not TestBit(tstate, m_DESTROYEDBIT) then
      navigationDirection = m_rGameEngine.GetComponentToAngle().getAngleFromComponents(tNavigationTarget.x - tPos.x, tNavigationTarget.y - tPos.y)
      difference = tdir - navigationDirection
      absoluteDifference = abs(difference)
      if absoluteDifference < tTURNING_RATE then
        tdir = navigationDirection
      else
        if absoluteDifference < 180 then
          if difference < 0 then
            tdir = AdjustDirection(tdir, tTURNING_RATE)
          else
            tdir = AdjustDirection(tdir, -tTURNING_RATE)
          end if
        else
          if difference < 0 then
            tdir = AdjustDirection(tdir, -tTURNING_RATE)
          else
            tdir = AdjustDirection(tdir, tTURNING_RATE)
          end if
        end if
      end if
      if tPos.x > tNavigationTarget.x - tMyObject.GetParam("NavigationStopRadius") and tPos.x < tNavigationTarget.x + tMyObject.GetParam("NavigationStopRadius") and tPos.y > tNavigationTarget.y - tMyObject.GetParam("NavigationStopRadius") and tPos.y < tNavigationTarget.y + tMyObject.GetParam("NavigationStopRadius") then
        tstate = ClearBit(tstate, m_MOVEBIT)
        tVel.x = 0
        tVel.y = 0
      else
        tVel = me.GetVelocityVector(tstate, tdir, tSpeed)
        tPos = tPos.add(tVel)
      end if
    end if
    if tMyObject.GetParam("WindAffects") then
      tPos = tPos.add(me.GetVelocityVector(tstate, tWindDirection, tWindStrength))
    end if
    tMyObject.SetParam("State", tstate)
    tMyObject.SetParam("Direction", tdir)
    tMyObject.SetParam("WorldPosition", tPos)
    tcol = the milliSeconds
    tColliding = 0
    if not TestBit(tstate, m_DESTROYEDBIT) or TestBit(tstate, m_FLOATINGWRECKBIT) then
      tColliding = me.TestCollision()
      if TestBit(tstate, m_MOVEBIT) then
        if tColliding then
          tTestDir = AdjustDirection(tdir, 45)
          tTestPos = intvector(tOrigPosX, tOrigPosY, 0).add(me.GetVelocityVector(tstate, tTestDir, tSpeed / 2))
          tMyObject.SetParam("WorldPosition", tTestPos)
          tColliding = me.TestCollision()
          if tColliding then
            tTestDir = AdjustDirection(tdir, -45)
            tTestPos = intvector(tOrigPosX, tOrigPosY, 0).add(me.GetVelocityVector(tstate, tTestDir, tSpeed / 2))
            tMyObject.SetParam("WorldPosition", tTestPos)
            tColliding = me.TestCollision()
            if tColliding then
              tTestDir = AdjustDirection(tdir, 85)
              tTestPos = intvector(tOrigPosX, tOrigPosY, 0).add(me.GetVelocityVector(tstate, tTestDir, tSpeed / 2))
              tMyObject.SetParam("WorldPosition", tTestPos)
              tColliding = me.TestCollision()
              if tColliding then
                tTestDir = AdjustDirection(tdir, -85)
                tTestPos = intvector(tOrigPosX, tOrigPosY, 0).add(me.GetVelocityVector(tstate, tTestDir, tSpeed / 2))
                tMyObject.SetParam("WorldPosition", tTestPos)
                tColliding = me.TestCollision()
                if not tColliding then
                  tPos = tTestPos
                end if
              else
                tPos = tTestPos
              end if
            else
              tPos = tTestPos
            end if
          else
            tPos = tTestPos
          end if
        end if
      end if
    end if
    g_profCollisionAcc = g_profCollisionAcc + (the milliSeconds - tcol)
    if tColliding then
      tPos.x = tOrigPosX
      tPos.y = tOrigPosY
      tMyObject.SetParam("Direction", tOrigDir)
      tVel.x = 0
      tVel.y = 0
    end if
    tVel.x = tPos.x - tOrigPosX
    tVel.y = tPos.y - tOrigPosY
    tMyObject.SetParam("WorldPosition", tPos)
    tMyObject.SetParam("Velocity", tVel)
    me.SyncGameParameters()
  end if
  tBonus = the milliSeconds - tBonus
  g_profShipFactorAcc = g_profShipFactorAcc + tBonus
end
on AwardScore me, a_iAmount
  tScore = me.getObject().GetParam("Score")
  tScore = tScore + a_iAmount
  if tScore < 0 then
    tScore = 0
  end if
  me.getObject().SetParam("Score", tScore)
  me.SyncGameParameters()
  tScoreBoard = m_rGameEngine.GetObjectsByCode(9)
  if tScoreBoard.count <> 1 then
    return error(me, "Scoreboard object could not be found!", #AwardScore)
  end if
  tScoreBoard[1].GetFactor().UpdateTeamScores()
end
on IsShootable me, a_vPos
  tVelTable = m_rGameEngine.GetVelocityTable()
  tDistance = a_vPos.substract(me.getObject().GetParam("WorldPosition"))
  tDirection = me.getObject().GetParam("Direction")
  tMenoVector = intvector(tVelTable.GetBaseVelX(tDirection), tVelTable.GetBaseVelY(tDirection), 0)
  if me.getObject().GetParam("Ammo") > 0 and tDistance.length() <= 25 * 1400 then
    tAngle = AngleBetweenVectors(tMenoVector, tDistance)
    if tAngle >= me.getObject().GetParam("ArcStart") and tAngle <= me.getObject().GetParam("ArcEnd") then
      return 1
    else
      return 0
    end if
  else
    return 0
  end if
end
on SyncGameParameters me
  t_params = []
  tVel = me.getObject().GetParam("Velocity")
  t_params[1] = tVel.x
  t_params[2] = tVel.y
  t_params[3] = me.getObject().GetParam("Health")
  t_params[4] = me.getObject().GetParam("Ammo")
  t_params[5] = me.getObject().GetParam("State")
  tNavTarget = me.getObject().GetParam("NavigationTarget")
  t_params[6] = tNavTarget.x
  t_params[7] = tNavTarget.y
  t_params[8] = me.getObject().GetParam("Score")
  t_params[9] = me.getObject().GetParam("WhirlpoolSuckState")
  me.getObject().SetParam("GameParams", t_params)
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
  t_ar_ships = m_rGameEngine.GetObjectsByCode(1)
  repeat with tObj in t_ar_ships
    if tObj <> tMyObject then
      tShipNotCollidable = TestBit(tObj.GetParam("State"), m_DESTROYEDBIT) and not TestBit(tObj.GetParam("State"), m_FLOATINGWRECKBIT)
      if not tShipNotCollidable then
        if m_rGameEngine._TestCollision(tMyObject, tObj) then
          return 1
        end if
      end if
    end if
  end repeat
  return 0
end
on GetVelocityVector me, a_iState, a_iDir, a_iSpeed
  tVelTable = m_rGameEngine.GetVelocityTable()
  tVel = intvector(tVelTable.GetBaseVelX(a_iDir) * a_iSpeed / 256, tVelTable.GetBaseVelY(a_iDir) * a_iSpeed / 256, 0)
  return tVel
end
on testDistance me, i_pos1X, i_pos1Y, i_pos2X, i_pos2Y, i_distance
  distX = abs(i_pos2X - i_pos1X)
  distY = abs(i_pos2Y - i_pos1Y)
  if distX > i_distance or distY > i_distance then
    return 0
  else
    if distX * distX + distY * distY < i_distance * i_distance then
      return 1
    end if
  end if
  return 0
end