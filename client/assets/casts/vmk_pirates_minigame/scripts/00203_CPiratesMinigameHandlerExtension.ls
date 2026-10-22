-- Behavior
on OnStartStage me
  getThread("piratesminigame").getComponent().StageStartCountDown()
end
on OnEndStage me, i_iTime, i_ar_params
  getThread("piratesminigame").getComponent().StageEndCountDown(i_iTime, i_ar_params)
end
on OnLoadStage me, i_sName
  getThread("minigame").getComponent().StopMinigameEngine()
  getThread("piratesminigame").getComponent().LoadStage(i_sName)
end
on OnJoin me
end
on OnLeave me
end
on OnPrepareRoom me
  getThread("piratesminigame").getComponent().PrepareRoom()
end
on OnEvent me, i_iEvent, i_ar_iData
  tGameEngine = getThread("minigame").getComponent()
  tPiratesEngine = getThread("piratesminigame").getComponent()
  tPiratesInterface = getThread("piratesminigame").getInterface()
  tCannonBallSpeed = getVariableValue("game.cannonballspeed")
  tCannonballTTL = getVariableValue("game.cannonballtimetolive")
  tDebugOut = 0
  case i_iEvent of
    1:
      tRef = i_ar_iData[1]
      tNavX = i_ar_iData[2]
      tNavY = i_ar_iData[3]
      t_rShip = tGameEngine.GetMGObject(tRef)
      t_rShip.GetFactor().SetNavigationTarget(tNavX, tNavY)
    2:
      if tDebugOut then
        put "Start shoot: Obsolete!"
      end if
    3:
      if tDebugOut then
        put "Shoot"
      end if
      tShooter = i_ar_iData[1]
      tCannonball = i_ar_iData[2]
      tX = i_ar_iData[3]
      tY = i_ar_iData[4]
      t_rShip = tGameEngine.GetMGObject(tShooter)
      if t_rShip.GetFactor().Shoot() then
        tParams = [:]
        tParams.setaProp(#ref, tCannonball)
        tParams.setaProp(#type, 2)
        tParams.setaProp(#owner, t_rShip.getObject().GetParam("Owner"))
        tParams.setaProp(#team, t_rShip.getObject().GetParam("Team"))
        tWorldPos = t_rShip.getObject().GetParam("WorldPosition")
        tParams.setaProp(#dir, 0)
        tDiff = intvector(tX, tY, 0).substract(tWorldPos)
        tdir = tGameEngine.GetComponentToAngle().getAngleFromComponents(tDiff.x, tDiff.y)
        tNewPos = intvector(tWorldPos.x + tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * t_rShip.getObject().GetParam("BowCannonOffset") / 256, tWorldPos.y + tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * t_rShip.getObject().GetParam("BowCannonOffset") / 256, 500)
        tParams.setaProp(#worldpos, tNewPos)
        tVel = intvector(tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tCannonBallSpeed / 256, tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tCannonBallSpeed / 256, 0)
        tInvincible = TestBit(t_rShip.getObject().GetParam("State"), 6)
        tstate = 0
        if tInvincible then
          tstate = SetBit(tstate, 1)
        end if
        tParams.setaProp(#extra, [tShooter, integer(tVel.x), integer(tVel.y), tCannonballTTL, tstate])
        tGameEngine._CreateObject("MGO:" & tCannonball, tParams)
        tPiratesEngine.GetSoundPlayer().PlayCannon()
        tPiratesEngine.CreatePuff(ProjectAxonometricPosition(point(tNewPos.x, tNewPos.y)), "puff", tPiratesEngine.GetNewReference())
      end if
    4:
      if tDebugOut then
        put "turret shoot"
      end if
      tShooter = i_ar_iData[1]
      tCannonball = i_ar_iData[2]
      tdir = i_ar_iData[3]
      t_rTurret = tGameEngine.GetMGObject(tShooter)
      tParams = [:]
      tParams.setaProp(#ref, tCannonball)
      tParams.setaProp(#type, 2)
      tParams.setaProp(#owner, -1)
      tParams.setaProp(#team, -1)
      tWorldPos = t_rTurret.getObject().GetParam("WorldPosition")
      tParams.setaProp(#dir, 0)
      tNewPos = intvector(tWorldPos.x + tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tCannonBallSpeed / 256, tWorldPos.y + tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tCannonBallSpeed / 256, 500)
      tParams.setaProp(#worldpos, tNewPos)
      tVel = intvector(tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tCannonBallSpeed / 256, tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tCannonBallSpeed / 256, 0)
      tstate = 0
      tParams.setaProp(#extra, [tShooter, integer(tVel.x), integer(tVel.y), tCannonballTTL, tstate])
      tGameEngine._CreateObject("MGO:" & tCannonball, tParams)
      tPiratesEngine.GetSoundPlayer().PlayCannon()
      tPiratesEngine.CreatePuff(ProjectAxonometricPosition(point(tNewPos.x, tNewPos.y)), "puff", tPiratesEngine.GetNewReference())
    5:
      if tDebugOut then
        put "Create Powerup"
      end if
      tPowerup = i_ar_iData[1]
      tPosX = i_ar_iData[2]
      tPosY = i_ar_iData[3]
      ttype = i_ar_iData[4]
      tParams = [:]
      tParams.setaProp(#ref, tPowerup)
      tParams.setaProp(#type, 3)
      tParams.setaProp(#owner, -1)
      tParams.setaProp(#team, -1)
      tNewPos = intvector(tPosX, tPosY, 0)
      tParams.setaProp(#worldpos, tNewPos)
      tParams.setaProp(#dir, 0)
      tParams.setaProp(#extra, [ttype])
      tGameEngine._CreateObject("MGO" & tPowerup, tParams)
    6:
      if tDebugOut then
        put "Kill Ship"
      end if
      tShip = tGameEngine.GetMGObject(i_ar_iData[1])
      t_shipPos = tShip.GetParam("WorldPosition")
      tPiratesEngine.CreatePuff(ProjectAxonometricPosition(point(t_shipPos.x, t_shipPos.y)), "explosion", tPiratesEngine.GetNewReference())
      tPiratesEngine.GetSoundPlayer().PlayHit()
      tShip.GetFactor().Kill()
      if i_ar_iData[2] <> -1 then
        tKiller = tGameEngine.GetMGObject(i_ar_iData[2])
        if not voidp(tKiller) and i_ar_iData[3] <> -1 then
          tKiller.GetFactor().AwardScore(i_ar_iData[3])
        end if
      end if
    7:
      if tDebugOut then
        put "Kill fixture"
      end if
      tFixture = tGameEngine.GetMGObject(i_ar_iData[1])
      tKiller = tGameEngine.GetMGObject(i_ar_iData[2])
      tFixture.GetFactor().Kill()
      tPiratesEngine.GetSoundPlayer().PlayHit()
    8:
    9:
    10:
      if tDebugOut then
        put "Wind Change dir :" && i_ar_iData[1] && "vel :" && i_ar_iData[2]
      end if
      tWindIndicator = tGameEngine.GetObjectsByCode(8)
      if tWindIndicator.count <> 1 then
        return error(me, "Either no wind indicator object found or more than 1 found!", #OnEvent)
      end if
      tWindIndicator[1].GetFactor().ChangeWind(i_ar_iData[1], i_ar_iData[2])
    11:
      tCollector = i_ar_iData[1]
      ttype = i_ar_iData[2]
      tShip = tGameEngine.GetMGObject(tCollector)
      if ttype = 1 then
        tCannonballs = tShip.getObject().GetParam("Ammo")
        tCannonballs = tCannonballs + 3
        if tCannonballs > tShip.getObject().GetParam("MaxAmmo") then
          tCannonballs = tShip.getObject().GetParam("MaxAmmo")
        end if
        tShip.getObject().SetParam("Ammo", tCannonballs)
      else
        if ttype = 2 then
          tHealth = tShip.getObject().GetParam("Health")
          tHealth = tHealth + 3
          if tHealth > tShip.getObject().GetParam("MaxHealth") then
            tHealth = tShip.getObject().GetParam("MaxHealth")
          end if
          tShip.getObject().SetParam("Health", tHealth)
        end if
      end if
      tShip.GetFactor().SyncGameParameters()
      if tShip = getObject(#minigame_component).GetMyObjects()[1] then
        if ttype = 1 then
          tPiratesEngine.GetSoundPlayer().PlayVoiceOver(#GetAmmo)
        else
          if ttype = 2 then
            tPiratesEngine.GetSoundPlayer().PlayVoiceOver(#GetHealth)
          end if
        end if
      end if
    12:
      if tDebugOut then
        put "Cannonball hits environment"
      end if
      tPos = point(i_ar_iData[1], i_ar_iData[2])
      tHeight = tPiratesEngine.GetCollisionMap().TestPointToCMap(tPos)
      if tHeight <= 0 then
        tPiratesEngine.CreatePuff(ProjectAxonometricPosition(tPos), "splash", tPiratesEngine.GetNewReference())
        tPiratesEngine.GetSoundPlayer().PlaySplash()
      else
        tPiratesEngine.CreatePuff(ProjectAxonometricPosition(tPos), "explosion", tPiratesEngine.GetNewReference())
        tPiratesEngine.GetSoundPlayer().PlayHit()
      end if
    13:
      if tDebugOut then
        put "Cannonball hits enemy ship"
      end if
      tTargetRef = i_ar_iData[1]
      tPos = point(i_ar_iData[2], i_ar_iData[3])
      tShooterRef = i_ar_iData[4]
      tScore = i_ar_iData[5]
      t_rShip = tGameEngine.GetMGObject(tTargetRef)
      t_shipPos = t_rShip.getObject().GetParam("WorldPosition")
      tScreenPos = ProjectAxonometricPosition(point(t_shipPos.x, t_shipPos.y))
      tPiratesEngine.CreatePuff(tScreenPos, "explosion", tPiratesEngine.GetNewReference())
      if t_rShip.GetFactor().GetHealth() > 0 then
        t_rShip.GetFactor().LoseHealth()
        tPiratesEngine.GetFloatFactory().CreateNewFloat(tScore & " pts", point(tScreenPos.locH, tScreenPos.locV - 20))
        tShooter = tGameEngine.GetMGObject(tShooterRef)
        tShooter.GetFactor().AwardScore(tScore)
        t_rShip.GetFactor().AwardScore(-1 * (tScore / 2))
      end if
      tPiratesEngine.GetSoundPlayer().PlayHit()
    14:
      if tDebugOut then
        put "Cannonball hits fixture"
      end if
      tTarget = i_ar_iData[1]
      t_rFixture = tGameEngine.GetMGObject(tTarget)
      t_rFixture.GetFactor().HitByCannonball()
      tScreenPos = ProjectAxonometricPosition(point(i_ar_iData[2], i_ar_iData[3]))
      tPiratesEngine.CreatePuff(tScreenPos, "explosion", tPiratesEngine.GetNewReference(), 2)
      t_rShooter = tGameEngine.GetMGObject(i_ar_iData[4])
      t_rShooter.GetFactor().AwardScore(i_ar_iData[5])
      if i_ar_iData[5] > 0 then
        tPiratesEngine.GetFloatFactory().CreateNewFloat(i_ar_iData[5] & " pts", point(tScreenPos.locH, tScreenPos.locV - 20))
      end if
      tPiratesEngine.GetSoundPlayer().PlayHit()
    15:
      tRef = i_ar_iData[1]
    16:
      tShooter = i_ar_iData[1]
      tCannonballRef = i_ar_iData[2]
      tSide = i_ar_iData[3]
      tCannonNum = i_ar_iData[4]
      if tDebugOut then
        put "Broadsideshot : " & tShooter && tSide && tCannonNum
      end if
      t_rShip = tGameEngine.GetMGObject(tShooter)
      tParams = [:]
      tParams.setaProp(#ref, tCannonballRef)
      tParams.setaProp(#type, 2)
      tParams.setaProp(#owner, t_rShip.getObject().GetParam("Owner"))
      tParams.setaProp(#team, t_rShip.getObject().GetParam("Team"))
      tAmmo = t_rShip.getObject().GetParam("Ammo")
      tdir = t_rShip.getObject().GetParam("Direction")
      case tSide of
        0:
          case tCannonNum of
            1:
              tdir = tdir - 80
              tAmmo = tAmmo - 1
              tPiratesEngine.GetSoundPlayer().PlayCannon()
            2:
              tdir = tdir - 85
            3:
              tdir = tdir - 90
            4:
              tdir = tdir - 95
            5:
              tdir = tdir - 100

          end case
        1:
          case tCannonNum of
            1:
              tdir = tdir + 80
              tAmmo = tAmmo - 1
              tPiratesEngine.GetSoundPlayer().PlayCannon()
            2:
              tdir = tdir + 85
            3:
              tdir = tdir + 90
            4:
              tdir = tdir + 95
            5:
              tdir = tdir + 100

          end case

      end case
      if tdir < 0 then
        tdir = tdir + 360
      end if
      tdir = tdir mod 360
      t_rShip.getObject().SetParam("Ammo", tAmmo)
      tWorldPos = t_rShip.getObject().GetParam("WorldPosition")
      tParams.setaProp(#dir, 0)
      tOffset = t_rShip.GetParam("SideCannonOffset")
      tNewPos = intvector(tWorldPos.x + tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tOffset / 256, tWorldPos.y + tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tOffset / 256, 500)
      tParams.setaProp(#worldpos, tNewPos)
      tVel = intvector(tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tCannonBallSpeed / 256, tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tCannonBallSpeed / 256, 0)
      tInvincible = TestBit(t_rShip.getObject().GetParam("State"), 6)
      tstate = 0
      if tInvincible then
        tstate = SetBit(tstate, 1)
      end if
      tParams.setaProp(#extra, [tShooter, integer(tVel.x), integer(tVel.y), tCannonballTTL, tstate])
      tGameEngine._CreateObject("MGO:" & tCannonballRef, tParams)
      tPiratesEngine.CreatePuff(ProjectAxonometricPosition(point(tNewPos.x, tNewPos.y)), "puff", tPiratesEngine.GetNewReference())
    17:
    18:
      if tDebugOut then
        put "sea monster show"
      end if
      tParams = [:]
      tParams.setaProp(#ref, i_ar_iData[1])
      tParams.setaProp(#type, 11)
      tParams.setaProp(#owner, -1)
      tParams.setaProp(#team, -1)
      tNewPos = intvector(i_ar_iData[2], i_ar_iData[3], 0)
      tParams.setaProp(#worldpos, tNewPos)
      tParams.setaProp(#dir, 0)
      tVel = intvector(0, 0, 0)
      tParams.setaProp(#extra, [integer(tNewPos.x), integer(tNewPos.y)])
      tGameEngine._CreateObject("MGO" & i_ar_iData[1], tParams)
      tPiratesEngine.GetSoundPlayer().playFx("PG-seamonster-long")
    19:
      if tDebugOut then
        put " sea monster hide"
      end if
      tGameEngine._MinigameDeleteObject(i_ar_iData[1])
    20:
      if tDebugOut then
        put "sea monster eat ship"
      end if
      tMonster = tGameEngine.GetMGObject(i_ar_iData[1])
      tMonster.GetFactor().Attack()
      tShip = tGameEngine.GetMGObject(i_ar_iData[2])
      tShip.GetFactor().LoseHealth()
      tShip.GetFactor().LoseHealth()
    21:
      if tDebugOut then
        put "whirlpool show"
      end if
      tParams = [:]
      tParams.setaProp(#ref, i_ar_iData[1])
      tParams.setaProp(#type, 12)
      tParams.setaProp(#owner, -1)
      tParams.setaProp(#team, -1)
      tNewPos = intvector(i_ar_iData[2], i_ar_iData[3], 0)
      tParams.setaProp(#worldpos, tNewPos)
      tParams.setaProp(#dir, 0)
      tParams.setaProp(#extra, [])
      tGameEngine._CreateObject("MGO" & i_ar_iData[1], tParams)
    22:
      if tDebugOut then
        put "whirlpool hide"
      end if
      tGameEngine._MinigameDeleteObject(i_ar_iData[1])
    23:
      if tDebugOut then
        put "Show moonlight"
      end if
      tMoonlight = i_ar_iData[1]
      tPosX = i_ar_iData[2]
      tPosY = i_ar_iData[3]
      tVelX = i_ar_iData[4]
      tVelY = i_ar_iData[5]
      tParams = [:]
      tParams.setaProp(#ref, tMoonlight)
      tParams.setaProp(#type, 13)
      tParams.setaProp(#owner, -1)
      tParams.setaProp(#team, -1)
      tNewPos = intvector(tPosX, tPosY, 0)
      tParams.setaProp(#worldpos, tNewPos)
      tParams.setaProp(#dir, 0)
      tVel = intvector(tVelX, tVelY, 0)
      tParams.setaProp(#extra, [integer(tVel.x), integer(tVel.y)])
      tGameEngine._CreateObject("MGO" & tMoonlight, tParams)
    24:
      if tDebugOut then
        put "Hide moonlight"
      end if
      tMoonlight = i_ar_iData[1]
      tGameEngine._MinigameDeleteObject(tMoonlight)
    25:
      if tDebugOut then
        put "invincibility on"
      end if
      tTarget = i_ar_iData[1]
      t_rShip = tGameEngine.GetMGObject(tTarget)
      t_rShip.GetFactor().InvincibilityOn()
      tPiratesEngine.GetSoundPlayer().playFx("PG-moonlight")
    26:
      if tDebugOut then
        put "invincibility off"
      end if
      tTarget = i_ar_iData[1]
      t_rShip = tGameEngine.GetMGObject(tTarget)
      t_rShip.GetFactor().InvincibilityOff()
    27:
      if tDebugOut then
        put "show flaming oil"
      end if
      tParams = [:]
      tParams.setaProp(#ref, i_ar_iData[1])
      tParams.setaProp(#type, 14)
      tParams.setaProp(#owner, -1)
      tParams.setaProp(#team, -1)
      tNewPos = intvector(i_ar_iData[2], i_ar_iData[3], 0)
      tParams.setaProp(#worldpos, tNewPos)
      tParams.setaProp(#dir, 0)
      tParams.setaProp(#extra, [])
      tGameEngine._CreateObject("MGO" & i_ar_iData[1], tParams)
    28:
      if tDebugOut then
        put "hide flaming oil"
      end if
      tGameEngine._MinigameDeleteObject(i_ar_iData[1])
    29:
      if tDebugOut then
        put "flaming oil burn"
      end if
      tShip = tGameEngine.GetMGObject(i_ar_iData[2])
      tShip.GetFactor().Burn()
    30:
      if tDebugOut then
        put "blow up ship"
      end if
      tShip = tGameEngine.GetMGObject(i_ar_iData[1])
      tPos = tShip.getObject().GetParam("WorldPosition")
      tPiratesEngine.CreatePuff(ProjectAxonometricPosition(point(tPos.x, tPos.y)), "explosion", tPiratesEngine.GetNewReference(), 5)
      tPiratesEngine.CreatePuff(ProjectAxonometricPosition(point(tPos.x + 500, tPos.y + 500)), "explosion", tPiratesEngine.GetNewReference(), 4)
      tShooter = tShip.getObject().GetParam("Reference")
      tSeed = tGameEngine.GetTurnNumber()
      tQRandom = tGameEngine.GetQuickRandom()
      tShrapnelCount = i_ar_iData[2]
      repeat with i = 1 to tShrapnelCount
        tRef = i_ar_iData[2 + i]
        tSeed = tQRandom.IterateSeed(tSeed)
        tdir = tQRandom.getRandomNumber(tSeed, 360)
        tSeed = tQRandom.IterateSeed(tSeed)
        tVelSpeed = tCannonBallSpeed - tQRandom.getRandomNumber(tSeed, tCannonBallSpeed / 2)
        tParams = [:]
        tParams.setaProp(#ref, tRef)
        tParams.setaProp(#type, 2)
        tParams.setaProp(#owner, tShip.getObject().GetParam("Owner"))
        tParams.setaProp(#team, tShip.getObject().GetParam("Team"))
        tWorldPos = tShip.getObject().GetParam("WorldPosition")
        tParams.setaProp(#dir, 0)
        tNewPos = intvector(tWorldPos.x, tWorldPos.y, 500)
        tParams.setaProp(#worldpos, tNewPos)
        tVel = intvector(tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tVelSpeed / 256, tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tVelSpeed / 256, 0)
        tSeed = tQRandom.IterateSeed(tSeed)
        tTimeToLive = tQRandom.getRandomNumber(tSeed, tCannonBallSpeed / 20) + 5
        tstate = 4
        tParams.setaProp(#extra, [tShooter, integer(tVel.x), integer(tVel.y), tTimeToLive, tstate])
        tGameEngine._CreateObject("MGO:" & i & "+" & the milliSeconds, tParams)
      end repeat
      tShip.GetFactor().Blow()
      tPiratesEngine.GetSoundPlayer().PlayBroadSide()
    31:
      if tDebugOut then
        put "sea monster move"
      end if
      tMonster = tGameEngine.GetMGObject(i_ar_iData[1])
      tGameParams = tMonster.getObject().GetParam("GameParams")
      tGameParams[1] = i_ar_iData[2]
      tGameParams[2] = i_ar_iData[3]
      tMonster.getObject().SetParam("GameParams", tGameParams)
    32:
      tPiratesInterface.SetTimerDisplay(i_ar_iData[1])
    33:
      tAvatarRef = i_ar_iData[1]
      tTimer = i_ar_iData[2]
      tMyShip = tPiratesInterface.GetMyShip()
      if not voidp(tMyShip) then
        if tAvatarRef = tMyShip.GetParam("Reference") then
          tPiratesInterface.ShowIdleKickWarning(tTimer)
        end if
      end if
    otherwise:
      put "Pirates Minigame Handler : Unrecognized event ID"

  end case
end