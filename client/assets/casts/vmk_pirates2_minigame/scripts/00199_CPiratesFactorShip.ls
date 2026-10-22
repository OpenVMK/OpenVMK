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
property m_CARRYINGOWNFLAGBIT
property m_ROWINGBOATBIT
property m_CARRYINGENEMYFLAGBIT
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
  m_CARRYINGOWNFLAGBIT = 7
  m_ROWINGBOATBIT = 8
  m_CARRYINGENEMYFLAGBIT = 9
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
  me.getObject().SetParam("NavigationStopRadius", 1423)
  me.getObject().SetParam("BowCannonOffset", 2000)
  me.getObject().SetParam("SideCannonOffset", 1000)
  me.getObject().SetParam("Speed", 700)
  me.getObject().SetParam("Velocity", intvector(0, 0, 0))
  me.getObject().SetParam("Health", 5)
  me.getObject().SetParam("MaxHealth", 5)
  me.getObject().SetParam("Ammo", [0, 0, 0, 0, 0])
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
  me.SetSpeedAndHealth()
  me.getObject().GetVisual().updateConstants()
end
on SetSpeedAndHealth me
  t_ar_param = me.getObject().GetParam("GameParams")
  t_iShipSpeed = 666
  t_iMaxHealth = 5
  t_iMaxAmmo = 5
  t_iTurningRate = 14
  t_iHealth = 5
  t_iShipType = integer(t_ar_param[10])
  case t_iShipType of
    1:
      t_iShipSpeed = 1024
      t_iMaxHealth = 3
      t_iTurningRate = 17
    2:
      t_iShipSpeed = 666
      t_iMaxHealth = 4
      t_iTurningRate = 14
    3:
      t_iShipSpeed = 666
      t_iMaxHealth = 3
      t_iTurningRate = 14
    otherwise:
      t_iShipSpeed = 666
      t_iMaxHealth = 5
      t_iTurningRate = 14

  end case
  if me.IsRowingBoat() then
    t_iShipSpeed = 444
    t_iMaxHealth = 0
    t_iMaxAmmo = 0
    t_iTurningRate = 14
  else
  end if
  t_iDefaultHealth = me.getObject().GetParam("Health")
  t_iHealth = min(t_iMaxHealth, t_iDefaultHealth)
  me.getObject().SetParam("Health", t_iHealth)
  me.getObject().SetParam("MaxHealth", t_iMaxHealth)
  me.getObject().SetParam("Speed", t_iShipSpeed)
  me.getObject().SetParam("MaxAmmo", t_iMaxAmmo)
  me.getObject().SetParam("TurningRate", t_iTurningRate)
  me.getObject().SetParam("Score", t_ar_param[8])
  me.getObject().SetParam("WhirlpoolSuckState", t_ar_param[9])
  me.getObject().SetParam("Type", t_ar_param[10])
  me.getObject().SetParam("Gold", t_ar_param[11])
end
on UpdateParameters me, i_ar_data
  me.getObject().SetParam("Velocity", intvector(i_ar_data[1], i_ar_data[2], 0))
  me.getObject().SetParam("Health", i_ar_data[3])
  t = []
  if i_ar_data[4] > 0 then
    t[i_ar_data[4]] = 0
  end if
  me.getObject().SetParam("Ammo", t)
  me.getObject().SetParam("State", i_ar_data[5])
  me.getObject().SetParam("NavigationTarget", intvector(i_ar_data[6], i_ar_data[7], 0))
  me.getObject().SetParam("Score", i_ar_data[8])
  me.getObject().SetParam("WhirlpoolSuckState", i_ar_data[9])
  me.getObject().SetParam("Type", i_ar_data[10])
  me.getObject().SetParam("Gold", i_ar_data[11])
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
  if tAmmo.count > 0 then
    tAmmo.deleteAt(1)
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
on setCarryingFlag me, a_bFlagOnShip, a_bOwnFlag
  tstate = me.getObject().GetParam("State")
  if a_bFlagOnShip then
    if a_bOwnFlag then
      tstate = SetBit(tstate, m_CARRYINGOWNFLAGBIT)
    else
      tstate = SetBit(tstate, m_CARRYINGENEMYFLAGBIT)
    end if
  else
    if a_bOwnFlag then
      tstate = ClearBit(tstate, m_CARRYINGOWNFLAGBIT)
    else
      tstate = ClearBit(tstate, m_CARRYINGENEMYFLAGBIT)
    end if
  end if
  me.getObject().SetParam("State", tstate)
end
on IsFloatingWreck me
  tstate = me.getObject().GetParam("State")
  return TestBit(tstate, m_FLOATINGWRECKBIT)
end
on IsDestroyed me
  tstate = me.getObject().GetParam("State")
  return TestBit(tstate, m_DESTROYEDBIT)
end
on isCarryingFlag me
  tstate = me.getObject().GetParam("State")
  return TestBit(tstate, m_CARRYINGOWNFLAGBIT) or TestBit(tstate, m_CARRYINGENEMYFLAGBIT)
end
on IsCarryingOwnFlag me
  tstate = me.getObject().GetParam("State")
  return TestBit(tstate, m_CARRYINGOWNFLAGBIT)
end
on IsCarryingEnemyFlag me
  tstate = me.getObject().GetParam("State")
  return TestBit(tstate, m_CARRYINGENEMYFLAGBIT)
end
on IsRowingBoat me
  tstate = me.getObject().GetParam("State")
  return TestBit(tstate, m_ROWINGBOATBIT)
end
on setRowingBoat me, a_bRowingBoat
  tstate = me.getObject().GetParam("State")
  if a_bRowingBoat then
    tstate = SetBit(tstate, m_ROWINGBOATBIT)
  else
    tstate = ClearBit(tstate, m_ROWINGBOATBIT)
  end if
  me.getObject().SetParam("State", tstate)
  me.SetSpeedAndHealth()
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
  me.getObject().SetParam("Health", -1)
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
  if me.IsDestroyed() then
  else
    tHealth = me.getObject().GetParam("Health") - 1
    if tHealth < 0 then
      tHealth = -1
    end if
    me.getObject().SetParam("Health", tHealth)
    if m_myShip then
      if tHealth > -1 then
        if tHealth <= 1 then
          getThread("piratesminigame").getComponent().GetSoundPlayer().PlayVoiceOver(#LowHealth)
        else
          getThread("piratesminigame").getComponent().GetSoundPlayer().PlayVoiceOver(#OwnShipHit)
        end if
      end if
    end if
    me.SyncGameParameters()
  end if
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
      tWhirlPool = t_ar_Whirlpools[1]
      tWpPos = tWhirlPool.GetParam("WorldPosition")
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
              tWhirlPos = tWhirlPool.GetParam("WorldPosition")
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
  if a_iAmount <> 0 then
    tGold = me.getObject().GetParam("Gold")
    tGold = tGold + a_iAmount
    if tGold < 0 then
      tGold = 0
    end if
    me.getObject().SetParam("Gold", tGold)
    me.SyncGameParameters()
    tScoreBoard = m_rGameEngine.GetObjectsByCode(9)
    t_iGameMode = getThread("piratesminigame").getComponent().GetGameMode()
    if t_iGameMode = 1 then
      if tScoreBoard.count <> 1 then
        return error(me, "Scoreboard object could not be found!", #AwardScore)
      end if
      tScoreBoard[1].GetFactor().AddToVault(me.getObject().GetParam("Team"), a_iAmount)
    end if
  end if
end
on LoseGold me, a_iAmount
  if a_iAmount <> 0 then
    tGold = me.getObject().GetParam("Gold")
    tGold = tGold - a_iAmount
    if tGold < 0 then
      tGold = 0
    end if
    me.getObject().SetParam("Gold", tGold)
    me.SyncGameParameters()
  end if
end
on IsShootable me, a_vPos
  tVelTable = m_rGameEngine.GetVelocityTable()
  tDistance = a_vPos.substract(me.getObject().GetParam("WorldPosition"))
  tDirection = me.getObject().GetParam("Direction")
  tMenoVector = intvector(tVelTable.GetBaseVelX(tDirection), tVelTable.GetBaseVelY(tDirection), 0)
  if me.getObject().GetParam("Ammo").count > 0 and tDistance.length() <= 25 * 1400 then
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
  t_params[4] = me.getObject().GetParam("Ammo").count
  t_params[5] = me.getObject().GetParam("State")
  tNavTarget = me.getObject().GetParam("NavigationTarget")
  t_params[6] = tNavTarget.x
  t_params[7] = tNavTarget.y
  t_params[8] = me.getObject().GetParam("Score")
  t_params[9] = me.getObject().GetParam("WhirlpoolSuckState")
  t_params[10] = me.getObject().GetParam("Type")
  t_params[11] = me.getObject().GetParam("Gold")
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