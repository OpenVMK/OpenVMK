-- Script
on OnStartStage me
  put "Start stage"
  getThread("piratesminigame").getComponent().StageStartCountDown()
end
on OnEndStage me, i_iTime, i_ar_params
  put "End stage"
  getThread("piratesminigame").getComponent().StageEndCountDown(i_iTime, i_ar_params)
end
on OnLoadStage me, i_sName, i_iVersion, i_ar_params
  getThread("minigame").getComponent().StopMinigameEngine()
  getThread("piratesminigame").getComponent().LoadStage(i_sName, i_iVersion, i_ar_params)
end
on OnJoin me
end
on OnLeave me
  put "Leave game"
end
on onEnd me
  put "game END"
end
on OnPrepareRoom me
  put "Prepare room"
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
        tParams.setaProp(#Dir, 0)
        tDiff = intvector(tX, tY, 0).substract(tWorldPos)
        tdir = tGameEngine.GetComponentToAngle().getAngleFromComponents(tDiff.x, tDiff.y)
        tNewPos = intvector(tWorldPos.x + tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * t_rShip.getObject().GetParam("BowCannonOffset") / 256, tWorldPos.y + tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * t_rShip.getObject().GetParam("BowCannonOffset") / 256, 500)
        tParams.setaProp(#worldpos, tNewPos)
        tVel = intvector(tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tCannonBallSpeed / 256, tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tCannonBallSpeed / 256, 0)
        tInvincible = TestBit(t_rShip.getObject().GetParam("State"), 6)
        tCannonballs = t_rShip.getObject().GetParam("Ammo")
        tGolden = 0
        if listp(tCannonballs) then
          if tCannonballs.count > 0 then
            tGolden = tCannonballs[1]
          end if
        end if
        tstate = 0
        if tInvincible then
          tstate = SetBit(tstate, 1)
        end if
        if tGolden then
          tstate = SetBit(tstate, 4)
        end if
        tParams.setaProp(#extra, [tShooter, integer(tVel.x), integer(tVel.y), tCannonballTTL, tstate])
        tGameEngine._CreateObject("MGO:" & tCannonball, tParams)
        tPiratesEngine.GetSoundPlayer().PlayCannon(tGolden)
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
      tParams.setaProp(#Dir, 0)
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
      tstate = i_ar_iData[5]
      tTeam = i_ar_iData[6]
      tAmount = i_ar_iData[7]
      tParams = [:]
      tParams.setaProp(#ref, tPowerup)
      tParams.setaProp(#type, 3)
      tParams.setaProp(#owner, -1)
      tParams.setaProp(#team, tTeam)
      tNewPos = intvector(tPosX, tPosY, 0)
      tParams.setaProp(#worldpos, tNewPos)
      tParams.setaProp(#Dir, 0)
      tParams.setaProp(#extra, [ttype, tstate, tAmount])
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
        if not voidp(tShip) and i_ar_iData[4] <> -1 then
          tShip.GetFactor().LoseGold(i_ar_iData[4])
        end if
      end if
    7:
      if tDebugOut then
        put "Kill fixture"
      end if
      tFixture = tGameEngine.GetMGObject(i_ar_iData[1])
      tKiller = tGameEngine.GetMGObject(i_ar_iData[2])
      tPiratesEngine.GetSoundPlayer().PlayHit()
      tFixture.GetFactor().Kill()
      if not voidp(tKiller) and i_ar_iData[3] <> -1 then
        tKiller.GetFactor().AwardScore(i_ar_iData[3])
      end if
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
      tstate = i_ar_iData[3]
      tTeam = i_ar_iData[4]
      tPowerupAmount = i_ar_iData[5]
      tShip = tGameEngine.GetMGObject(tCollector)
      if ttype = 1 then
        tCannonballs = tShip.getObject().GetParam("Ammo")
        if tstate = 1 then
          repeat with i = 1 to tPowerupAmount
            if i = 1 then
              tCannonballs.append(1)
              next repeat
            end if
            tCannonballs.append(0)
          end repeat
        else
          repeat with i = 1 to tPowerupAmount
            tCannonballs.append(0)
          end repeat
        end if
        repeat while tCannonballs.count > tShip.getObject().GetParam("MaxAmmo")
          tCannonballs.deleteAt(tCannonballs.count)
        end repeat
        tShip.getObject().SetParam("Ammo", tCannonballs)
      else
        if ttype = 2 then
          tHealth = tShip.getObject().GetParam("Health")
          tHealth = tHealth + tPowerupAmount
          if tHealth > tShip.getObject().GetParam("MaxHealth") then
            tHealth = tShip.getObject().GetParam("MaxHealth")
          end if
          tShip.getObject().SetParam("Health", tHealth)
        else
          if ttype = 3 then
            tOwnFlag = 1
            if tShip.GetParam("Team") <> tTeam then
              tOwnFlag = 0
            end if
            tShip.GetFactor().setCarryingFlag(1, tOwnFlag)
          end if
        end if
      end if
      tShip.GetFactor().SyncGameParameters()
      if tShip = getObject(#minigame_component).GetMyObjects()[1] then
        if ttype = 1 then
          tPiratesEngine.GetSoundPlayer().PlayVoiceOver(#GetAmmo)
        else
          if ttype = 2 then
            tPiratesEngine.GetSoundPlayer().PlayVoiceOver(#GetHealth)
          else
            if ttype = 3 then
              tPiratesEngine.GetSoundPlayer().PlayVoiceOver(#GetFlag)
            end if
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
      if tDebugOut then
        put "Cannonball hit ship at" && [tTargetRef, tPos, tShooterRef, tScore]
      end if
      if t_rShip.GetFactor().GetHealth() > -1 then
        t_rShip.GetFactor().LoseHealth()
        tPiratesEngine.GetFloatFactory().CreateNewFloat(tScore && "gold", point(tScreenPos.locH, tScreenPos.locV - 20))
        tShooter = tGameEngine.GetMGObject(tShooterRef)
        tShooter.GetFactor().AwardScore(tScore)
        if tDebugOut then
          put "Cannonball hit award Gold to Shooter" && [tShooter, tScore]
        end if
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
      tGolden = i_ar_iData[5]
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
              if tAmmo.count > 0 then
                tAmmo.deleteAt(1)
              end if
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
              if tAmmo.count > 0 then
                tAmmo.deleteAt(1)
              end if
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
      tParams.setaProp(#Dir, 0)
      tOffset = t_rShip.GetParam("SideCannonOffset")
      tNewPos = intvector(tWorldPos.x + tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tOffset / 256, tWorldPos.y + tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tOffset / 256, 500)
      tParams.setaProp(#worldpos, tNewPos)
      tVel = intvector(tGameEngine.GetVelocityTable().GetBaseVelX(tdir) * tCannonBallSpeed / 256, tGameEngine.GetVelocityTable().GetBaseVelY(tdir) * tCannonBallSpeed / 256, 0)
      tInvincible = TestBit(t_rShip.getObject().GetParam("State"), 6)
      tstate = 0
      if tInvincible then
        tstate = SetBit(tstate, 1)
      end if
      if tGolden then
        tstate = SetBit(tstate, 4)
      end if
      tParams.setaProp(#extra, [tShooter, integer(tVel.x), integer(tVel.y), tCannonballTTL, tstate])
      tGameEngine._CreateObject("MGO:" & tCannonballRef, tParams)
      tPiratesEngine.CreatePuff(ProjectAxonometricPosition(point(tNewPos.x, tNewPos.y)), "puff", tPiratesEngine.GetNewReference())
    17:
    18:
      if tDebugOut then
        put "sea monster show" && i_ar_iData[4]
      end if
      tParams = [:]
      tParams.setaProp(#ref, i_ar_iData[1])
      tParams.setaProp(#type, i_ar_iData[4])
      tParams.setaProp(#owner, -1)
      tParams.setaProp(#team, -1)
      tNewPos = intvector(i_ar_iData[2], i_ar_iData[3], 0)
      tParams.setaProp(#worldpos, tNewPos)
      tParams.setaProp(#Dir, 0)
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
      tHealthLost = i_ar_iData[3]
      repeat with i = 1 to tHealthLost
        tShip.GetFactor().LoseHealth()
      end repeat
      tPiratesEngine.GetSoundPlayer().PlaySeaMonsterAttack()
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
      tParams.setaProp(#Dir, 0)
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
      tParams.setaProp(#Dir, 0)
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
      tParams.setaProp(#Dir, 0)
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
        tParams.setaProp(#Dir, 0)
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
    34:
      tDropper = i_ar_iData[1]
      ttype = i_ar_iData[2]
      tShip = tGameEngine.GetMGObject(tDropper)
      if ttype = 3 then
        tOwnFlag = tShip.GetFactor().IsCarryingOwnFlag()
        tEnemyFlag = tShip.GetFactor().IsCarryingEnemyFlag()
        if tDebugOut then
          put "drop flag own flag: " && tOwnFlag && " enemy flag: " && tEnemyFlag
        end if
        tShip.GetFactor().setCarryingFlag(0, tOwnFlag)
        tPiratesEngine.GetSoundPlayer().PlayDropFlag()
      end if
      tShip.GetFactor().SyncGameParameters()
    35:
      tShip = i_ar_iData[1]
      tTeamBase = i_ar_iData[2]
      tCorrectTeamBase = i_ar_iData[3]
      if tCorrectTeamBase = 0 then
        if tDebugOut then
          put "Ship" && tShip, "reached enemy team base"
        end if
      else
        if tCorrectTeamBase = 1 then
          if tDebugOut then
            put "Ship" && tShip, "reached own team base!"
          end if
        end if
      end if
    36:
      tShip = i_ar_iData[1]
      if tDebugOut then
        put "Ship changed to rowboat" && i_ar_iData[1]
      end if
      tShip = tGameEngine.GetMGObject(tShip)
      tShip.GetFactor().setRowingBoat(1)
      tHealth = 0
      tShip.getObject().SetParam("Health", tHealth)
      tAmmo = []
      tShip.getObject().SetParam("Ammo", tAmmo)
      if tDebugOut then
        put "Ship changed to rowboat new health" && tHealth && "new ammo" && tAmmo && "maxAmmo" && tShip.getObject().GetParam("MaxAmmo")
      end if
      tShip.GetFactor().SyncGameParameters()
      if tShip = getObject(#minigame_component).GetMyObjects()[1] then
        tPiratesEngine.GetSoundPlayer().PlayTurnIntoRowboat()
      end if
    37:
      tShip = i_ar_iData[1]
      if tDebugOut then
        put "Rowboat changed to ship" && i_ar_iData
      end if
      tShip = tGameEngine.GetMGObject(tShip)
      tShip.GetFactor().setRowingBoat(0)
      tHealth = i_ar_iData[2]
      tShip.getObject().SetParam("Health", tHealth)
      tAmmo = []
      if i_ar_iData[3] > 0 then
        tAmmo[i_ar_iData[3]] = 0
      end if
      tShip.getObject().SetParam("Ammo", tAmmo)
      tShip.GetFactor().SyncGameParameters()
    38:
      tShip = i_ar_iData[1]
      tTeamBase = i_ar_iData[2]
      if tDebugOut then
        put "Ship brought the enemy flag home" && i_ar_iData
      end if
      tShip = tGameEngine.GetMGObject(tShip)
      tTeamBase = tGameEngine.GetMGObject(tTeamBase)
      tOwnFlag = tShip.GetFactor().IsCarryingOwnFlag()
      tShip.GetFactor().setCarryingFlag(0, tOwnFlag)
      tTeamBase.GetFactor().setCarryingFlag(1)
      tShip.GetFactor().SyncGameParameters()
      tTeamBase.GetFactor().SyncGameParameters()
      tPiratesEngine.GetSoundPlayer().PlayFlagToBase()
    39:
      tWinnerTeam = i_ar_iData[1]
      if tDebugOut then
        put "Team won" && i_ar_iData
      end if
      tScoreBoard = tGameEngine.GetObjectsByCode(9)
      if tScoreBoard.count <> 1 then
        if tDebugOut then
          put "Scoreboard object could not be found!"
        end if
      end if
      tScoreBoard[1].GetFactor().addTeamWin(tWinnerTeam)
    40:
      tGameMode = i_ar_iData[1]
      if tDebugOut then
        put "Extended play" && i_ar_iData
      end if
      tRemovedRefs = []
      if tGameMode = 1 then
        t_ar_Cannonballs = tGameEngine.GetObjectsByCode(3)
        repeat with tObj in t_ar_Cannonballs
          if objectp(tObj.GetFactor()) and tObj.GetParam("PowerupType") = 1 then
            tRef = tObj.GetParam("Reference")
            tRemovedRefs.add(tRef)
          end if
        end repeat
      else
        if tGameMode = 2 then
          t_ar_health = tGameEngine.GetObjectsByCode(3)
          repeat with tObj in t_ar_health
            if objectp(tObj.GetFactor()) and tObj.GetParam("PowerupType") = 2 then
              tRef = tObj.GetParam("Reference")
              tRemovedRefs.add(tRef)
            end if
          end repeat
          t_ar_Cannonballs = tGameEngine.GetObjectsByCode(3)
          repeat with tObj in t_ar_Cannonballs
            if objectp(tObj.GetFactor()) and tObj.GetParam("PowerupType") = 1 then
              if not tObj.GetFactor().IsGolden() then
                tObj.GetFactor().setGolden(1)
                tObj.GetFactor().SyncGameParameters()
              end if
            end if
          end repeat
        end if
      end if
      repeat with tRef in tRemovedRefs
        tGameEngine._MinigameDeleteObject(tRef)
      end repeat
    41:
      tRef = i_ar_iData[1]
      if tDebugOut then
        put "expire powerup" && tRef
      end if
      tGameEngine._MinigameDeleteObject(tRef)
    42:
      tRef = i_ar_iData[1]
      if tDebugOut then
        put "about to expire powerup" && tRef
      end if
    otherwise:
      if tDebugOut then
        put "Pirates Minigame Handler : Unrecognized event ID"
      end if

  end case
end