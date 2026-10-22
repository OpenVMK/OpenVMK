-- Behavior
property m_gameInitialized
property m_rMGE
property m_myAvatarRef
property m_vWind
property m_stage
property m_ar_puffs
property m_iReferenceCounter
property m_iStageStartedAt
property m_iStageEndedAt
property m_ar_stagevictoryparams
property m_rCloudField
property m_cmapVisualizer
property m_cmapVisualSprite
property m_ar_ar_dmgObjects
property m_ar_ar_burnObjects
property m_ar_buildingBounds
property m_rSoundPlayer
property m_gameOn
property m_prepared
property m_rFloatFactory
property m_iGameMode
global g_profComponent

on construct me
  m_prepared = 0
  m_rSoundPlayer = VOID
  executeMessage(#SetMinigameHandler, "CPiratesMinigameHandlerExtension")
  return 1
end
on deconstruct me
  if m_prepared then
    me.UnprepareRoom()
  end if
  return 1
end
on PrepareRoom me
  initIntVector()
  executeMessage(#MinigameState, #running)
  me.getInterface().PrepareRoom()
  m_rMGE = getThread("minigame").getComponent()
  m_rFloatFactory = createObject("FloatFactory", "CFloatingTextFactory")
  registerMessage(#room_ready, me.getID(), #InitGameEngine)
  registerMessage(#room_leave, me.getID(), #StopGameEngine)
  m_stage = VOID
  m_iGameMode = 0
  m_gameInitialized = 0
  m_myAvatarRef = 0
  m_vWind = intvector(0, 0, 0)
  m_ar_puffs = []
  m_iReferenceCounter = 0
  m_iStageStartedAt = 0
  m_iStageEndedAt = 0
  m_ar_stagevictoryparams = []
  m_ar_ar_dmgObjects = []
  m_ar_ar_burnObjects = []
  m_ar_buildingBounds = []
  executeMessage("StopRoomSound")
  m_rSoundPlayer = createObject("PiratesSoundPlayer", "CPiratesSound")
  executeMessage(#room_switch, "pirates_game")
  receiveUpdate(me.getID())
  me.getInterface().ShowPreGame()
  me.getHandler()._Config(1)
  m_gameOn = 0
  m_prepared = 1
  if connectionExists(getVariable("main.connection.id", "VMK")) then
    getConnection(getVariable("main.connection.id", "VMK")).send(580)
  end if
end
on UnprepareRoom me
  removeUpdate(me.getID())
  me.getInterface().UnprepareRoom()
  if not voidp(m_rCloudField) then
    removeObject(m_rCloudField.getID())
  end if
  if not voidp(m_rSoundPlayer) then
    removeObject(m_rSoundPlayer.getID())
  end if
  if not voidp(m_stage) then
    removeObject(m_stage.getID())
  end if
  removeObject(m_rFloatFactory.getID())
  unregisterMessage(#room_ready, me.getID())
  unregisterMessage(#room_leave, me.getID())
  m_stage = VOID
  m_prepared = 0
  t_rAnimationManager = getObject("AnimationManager")
  if objectp(t_rAnimationManager) then
    t_rAnimationManager.ClearAll()
  end if
  executeMessage(#MinigameState, #idle)
  put getSpriteManager().pTotalSprList.count && getSpriteManager().pFreeSprList.count
end
on update me
  tt = the milliSeconds
  tMGE = getThread("minigame").getComponent()
  t_ar_rShips = tMGE.GetObjectsByCode(1)
  repeat with tShip in t_ar_rShips
    if objectp(tShip.GetVisual()) then
      tOwner = tShip.getObject().GetParam("Owner")
      tScreenPos = ProjectAxonometricPosition(point(tShip.getObject().GetParam("WorldPosition").x, tShip.getObject().GetParam("WorldPosition").y))
      tAvatarPos = InverseAxonometricPosition(point(tScreenPos.locH, (the stage).image.height + 200))
      t_rAvatar = getThread("room").component._AccessRoom()._AccessIndexed(tOwner, "avatar")
      if t_rAvatar <> 0 then
        t_rAvatar.SetAbsPos(vector(tAvatarPos.locH / 100, tAvatarPos.locV / 100, 0))
      end if
    end if
  end repeat
  if tMGE.GetMinigameHandler().getSyncState() then
    m_gameOn = 1
    t_ar_Cannonballs = tMGE.GetObjectsByCode(2)
    t_ar_deadRef = []
    repeat with tObj in t_ar_Cannonballs
      if tObj.GetFactor().IsRemovable() then
        t_ar_deadRef.append(tObj.GetParam("Reference"))
      end if
    end repeat
    repeat with tDead in t_ar_deadRef
      tMGE._MinigameDeleteObject(tDead)
    end repeat
    t_ar_newpuffs = []
    repeat with tPuff in m_ar_puffs
      if not voidp(tPuff.GetFactor()) then
        if not tPuff.GetFactor().IsRemovable() then
          t_ar_newpuffs.append(tPuff)
          next repeat
        end if
        me.RemovePuff(tPuff)
      end if
    end repeat
    m_ar_puffs = t_ar_newpuffs
    t_ar_powerups = tMGE.GetObjectsByCode(3)
    t_ar_deadRef = []
    repeat with tObj in t_ar_powerups
      if tObj.GetFactor().IsRemovable() then
        t_ar_deadRef.append(tObj.GetParam("Reference"))
      end if
    end repeat
    repeat with tDead in t_ar_deadRef
      tMGE._MinigameDeleteObject(tDead)
    end repeat
  else
    m_gameOn = 0
  end if
  m_rFloatFactory.update()
  if m_iStageStartedAt <> 0 then
    tTimeRemaining = value(m_stage.GetStartTime()) - (the milliSeconds - m_iStageStartedAt) / 1000
    me.getInterface().ShowPrepare(tTimeRemaining)
    if tTimeRemaining < 0 then
      me.getInterface().HidePrepare()
      tTimeRemaining = 0
      m_iStageStartedAt = 0
      me.getInterface().enableExitButton(1)
    end if
  end if
  if m_iStageEndedAt <> 0 then
    tTimeRemaining = m_stage.GetEndTime() - integer((the milliSeconds - m_iStageEndedAt) / 1000)
    if not me.getInterface().MidstageWindowExists() then
      t_mp_score = me.GetAllScores()
      if m_ar_stagevictoryparams[4] <> 1 then
        me.getInterface().DisplayStageEnd(m_stage.GetName(), m_ar_stagevictoryparams, t_mp_score.players, t_mp_score.scores, t_mp_score[#vaults], t_mp_score.teamscores, t_mp_score.TeamWins, tTimeRemaining, t_mp_score[#dead])
      else
        me.getInterface().DisplayGameEnd(m_stage.GetName(), m_ar_stagevictoryparams, t_mp_score.players, t_mp_score.scores, t_mp_score[#vaults], t_mp_score.teamscores, t_mp_score.TeamWins, tTimeRemaining)
      end if
    end if
    if tTimeRemaining < 0 then
      tTimeRemaining = 0
      m_iStageEndedAt = 0
      me.getInterface().RemoveMidstageWindow()
    end if
  end if
  g_profComponent = the milliSeconds - tt
  ProfilerReset()
end
on GetAllScores me
  t_out = [#players: [], #scores: [], #teamscores: []]
  t_ar_ships = getThread("minigame").getComponent().GetObjectsByCode(1)
  t_ar_scoreboard = getThread("minigame").getComponent().GetObjectsByCode(9)
  t_ar_leftteam = []
  t_ar_rightteam = []
  repeat with tShip in t_ar_ships
    t_bDead = 0
    if tShip.GetParam("Health") < 0 then
      t_bDead = 1
    end if
    if tShip.GetParam("Team") = 1 then
      if tShip.GetParam("Owner") = -1 then
        tName = getText("pirates_computer_player_name.1")
      else
        t_rList = m_rMGE.GetParticipantlist().getaProp(tShip.GetParam("Owner"))
        if listp(t_rList) then
          tName = t_rList[#name]
        else
          tName = EMPTY
        end if
      end if
      t_ar_leftteam.append([#name: tName, #score: tShip.GetParam("Gold"), #vault: tShip.GetParam("Score"), #dead: t_bDead])
      next repeat
    end if
    if tShip.GetParam("Team") = 2 then
      if tShip.GetParam("Owner") = -1 then
        tName = getText("pirates_computer_player_name.2")
      else
        t_rList = m_rMGE.GetParticipantlist().getaProp(tShip.GetParam("Owner"))
        if listp(t_rList) then
          tName = t_rList[#name]
        else
          tName = EMPTY
        end if
      end if
      t_ar_rightteam.append([#name: tName, #score: tShip.GetParam("Gold"), #vault: tShip.GetParam("Score"), #dead: t_bDead])
    end if
  end repeat
  t_ar_return = [#players: [], #scores: [], #vaults: [], #teamscores: [], #TeamWins: [], #dead: []]
  if t_ar_leftteam.count < 4 then
    repeat with i = t_ar_leftteam.count + 1 to 4
      t_ar_leftteam.append([#name: EMPTY, #score: 0, #dead: 0, #vault: 0])
    end repeat
  end if
  if t_ar_rightteam.count < 4 then
    repeat with i = t_ar_rightteam.count + 1 to 4
      t_ar_rightteam.append([#name: EMPTY, #score: 0, #dead: 0, #vault: 0])
    end repeat
  end if
  repeat with t_rPlayer in t_ar_leftteam
    t_ar_return[#players].append(t_rPlayer.name)
    t_ar_return[#scores].append(t_rPlayer.score)
    t_ar_return[#vaults].append(t_rPlayer.vault)
    t_ar_return[#dead].append(t_rPlayer.dead)
  end repeat
  repeat with t_rPlayer in t_ar_rightteam
    t_ar_return[#players].append(t_rPlayer.name)
    t_ar_return[#scores].append(t_rPlayer.score)
    t_ar_return[#vaults].append(t_rPlayer.vault)
    t_ar_return[#dead].append(t_rPlayer.dead)
  end repeat
  t_ar_return[#teamscores].append(t_ar_scoreboard[1].GetFactor().GetTeam1Score())
  t_ar_return[#teamscores].append(t_ar_scoreboard[1].GetFactor().GetTeam2Score())
  t_ar_return[#TeamWins].append(t_ar_scoreboard[1].GetFactor().GetTeam1Wins())
  t_ar_return[#TeamWins].append(t_ar_scoreboard[1].GetFactor().GetTeam2Wins())
  return t_ar_return
end
on InitGameEngine me, m_rContext
  getThread("minigame").getComponent().StartMinigameEngine()
  executeMessage(#RegisterMinigameObject, 1, "piratesship")
  executeMessage(#RegisterMinigameObject, 2, "piratescannonball")
  executeMessage(#RegisterMinigameObject, 3, "piratespowerup")
  executeMessage(#RegisterMinigameObject, 4, "piratesturret")
  executeMessage(#RegisterMinigameObject, 5, "piratesbuilding")
  executeMessage(#RegisterMinigameObject, 7, "piratestree")
  executeMessage(#RegisterMinigameObject, 8, "pirateswindindicator")
  executeMessage(#RegisterMinigameObject, 9, "piratesscoreboard")
  executeMessage(#RegisterMinigameObject, 10, "piratesbridge")
  executeMessage(#RegisterMinigameObject, 11, "piratesseamonster")
  executeMessage(#RegisterMinigameObject, 12, "pirateswhirlpool")
  executeMessage(#RegisterMinigameObject, 13, "piratesmoonlight")
  executeMessage(#RegisterMinigameObject, 14, "piratesoilspill")
  executeMessage(#RegisterMinigameObject, 15, "piratesbuilding")
  executeMessage(#RegisterMinigameObject, 17, "piratesteambase")
  executeMessage(#RegisterMinigameObject, 18, "pirateskrakenseamonster")
  executeMessage(#SetMinigameOwnerRef, m_myAvatarRef)
  getThread("minigame").getComponent()._SetPooledAllocationModel()
  if not voidp(m_stage) then
    put "preallocate often-used objects"
    getThread("minigame").getComponent().GetObjectPool().Reserve("piratescannonball", 30)
    getThread("minigame").getComponent().GetObjectPool().Reserve("piratespuff", 10)
    getThread("minigame").getComponent().GetObjectPool().Reserve("piratespowerup", 20)
    m_gameInitialized = 1
    t_sStageName = m_stage.GetName()
    if voidp(m_rCloudField) then
      m_rCloudField = createObject("PiratesCloudField", "CCloudField")
    end if
    if t_sStageName contains "level1" then
      m_rCloudField.InitClouds(0)
    else
      m_rCloudField.InitClouds(getVariableValue("visual.noclouds"))
    end if
    m_ar_ar_dmgObjects = []
    m_ar_ar_burnObjects = []
    tBurnRoot = getThread("room").getComponent()._AccessRoom().Search("NAME", "Burn")
    if not voidp(tBurnRoot) then
      repeat with i = 1 to tBurnRoot.GetCount()
        tName = tBurnRoot[i].GetParam("NAME")
        if tName.char[1] = "h" then
          sc = tName.char[2]
          if sc = "0" or sc = "1" or sc = "2" or sc = "3" or sc = "4" or sc = "5" or sc = "6" or sc = "7" or sc = "8" or sc = "9" then
            if tName contains "dmg" then
              tStart = offset("dmg", tName)
              tBuildingIndex = value(chars(tName, 2, tStart - 1))
              tDmgLevel = value(chars(tName, tStart + 3, tName.length))
              repeat while m_ar_ar_dmgObjects.count < tBuildingIndex
                m_ar_ar_dmgObjects.append([])
              end repeat
              if ilk(m_ar_ar_dmgObjects[tBuildingIndex]) <> #list then
                m_ar_ar_dmgObjects[tBuildingIndex] = []
              end if
              repeat while m_ar_ar_dmgObjects[tBuildingIndex].count < tDmgLevel
                m_ar_ar_dmgObjects[tBuildingIndex].append([])
              end repeat
              m_ar_ar_dmgObjects[tBuildingIndex][tDmgLevel].append(tBurnRoot[i])
              tBurnRoot[i].GetVisual().getSprite().visible = 0
              next repeat
            end if
            if tName contains "burn" then
              tStart = offset("burn", tName)
              tBuildingIndex = value(chars(tName, 2, tStart - 1))
              if m_ar_ar_burnObjects.count < tBuildingIndex then
                m_ar_ar_burnObjects[tBuildingIndex] = [tBurnRoot[i]]
              else
                if ilk(m_ar_ar_burnObjects[tBuildingIndex]) <> #list then
                  m_ar_ar_burnObjects[tBuildingIndex] = [tBurnRoot[i]]
                else
                  m_ar_ar_burnObjects[tBuildingIndex].append(tBurnRoot[i])
                end if
              end if
              tBurnRoot[i].GetVisual().getSprite().visible = 0
            end if
          end if
        end if
      end repeat
    end if
    m_ar_buildingBounds = []
    t_mp_mp_fixtures = m_stage.GetBuildings()
    repeat with i = 1 to t_mp_mp_fixtures.count
      tIndex = t_mp_mp_fixtures.getPropAt(i)
      tRect = t_mp_mp_fixtures.getaProp(tIndex).BBox
      m_ar_buildingBounds[tIndex] = [intvector(tRect.left, tRect.top, 0), intvector(tRect.right, tRect.bottom, 0)]
    end repeat
    getThread("minigame").getHandler()._SendStageLoaded()
  end if
end
on GetBuildingBounds me, a_iGraphicCode
  return m_ar_buildingBounds[a_iGraphicCode]
end
on GetBuildingDmgObjects me, a_iGraphicCode
  return m_ar_ar_dmgObjects[a_iGraphicCode]
end
on GetBuildingBurnObjects me, a_iGraphicCode
  return m_ar_ar_burnObjects[a_iGraphicCode]
end
on StopGameEngine me, m_rContext
  getThread("minigame").getComponent().StopMinigameEngine()
  m_gameOn = 0
end
on CollisionMapVisualize me
  removeObject("qwerty")
  createObject("qwerty", "CVisualizeCollisionMap")
  m_cmapVisualizer = getObject("qwerty")
  m_cmapVisualizer.CreateImage("CMapTestImage", m_stage.GetCollisionMap())
  m_cmapVisualSprite = sprite(reserveSprite(me.getID()))
  m_cmapVisualSprite.member = getMember("CMapTestImage")
  m_cmapVisualSprite.ink = 33
  m_cmapVisualSprite.loc = point((the stage).image.width / 2, (the stage).image.height / 2)
  m_cmapVisualSprite.locZ = 15000
end
on LoadStage me, i_sStageName, i_iVersion, i_ar_params
  me.getInterface().showStoryLine(i_sStageName)
  me.getInterface().m_piratesBar.setEditable(0)
  put "CPiratesComponent::LoadStage - begin" && [i_sStageName, i_iVersion, i_ar_params]
  m_iGameMode = integer(i_ar_params["m"])
  me.getInterface().showMessageBar()
  me.getInterface().HideTimerDisplay()
  me.getInterface().HideNavigationTarget()
  if not voidp(m_stage) then
    removeObject(m_stage.getID())
  end if
  m_stage = createObject("stage_" & i_sStageName, "CStage")
  m_stage.LoadXML("stage." & i_sStageName & ".xml")
  if not voidp(m_rCloudField) then
    removeObject("PiratesCloudField")
  end if
  m_rCloudField = VOID
  getThread("minigame").getComponent().GetObjectPool().ClearAll()
  executeMessage(#room_switch, i_sStageName)
  me.getInterface().SetMyShip(VOID)
  executeMessage("StopRoomSound")
  m_rSoundPlayer.PlaySea()
  m_rSoundPlayer.playMusic(m_stage.GetMusic())
  if not m_stage.GetMoonlightUserTriggered() then
    me.getInterface().m_piratesBar.disableInvincibility()
  end if
  t_rAnimationManager = getObject("AnimationManager")
  if objectp(t_rAnimationManager) then
    t_rAnimationManager.ClearAll()
  end if
  case i_sStageName of
    "pirates_level1_stage1":
      me.attachAnimation("p2_l1s1_flag", "POTC2_lvl1_stage1.ani")
    "pirates_level1_stage2":
      me.attachAnimation("p2_l1s2_sgull", "POTC2_lvl1_stage2.ani")
    "pirates_level1_stage3":
      me.attachAnimation("p2_l1s3_candle", "POTC2_lvl1_stage3_1.ani")
      me.attachAnimation("p2_l1s3_gold", "POTC2_lvl1_stage3_2.ani")
    "pirates_level2_stage1":
      me.attachAnimation("p2_l2s1_men", "POTC2_lvl2_stage1.ani")
    "pirates_level2_stage2":
      me.attachAnimation("p2_l2s2_women", "POTC2_lvl2_stage2.ani")
    "pirates_level2_stage3":
      me.attachAnimation("p2_l2s3_well", "POTC2_lvl2_stage3.ani")
    "pirates_level3_stage1":
      me.attachAnimation("p2_l3s1_shoot", "POTC2_lvl3_stage1.ani")
    "pirates_level3_stage2":
      me.attachAnimation("p2_l3s2_prison", "POTC2_lvl3_stage2.ani")
    "pirates_level3_stage3":
      me.attachAnimation("p2_l3s3_looter", "POTC2_lvl3_stage3_1.ani")
      me.attachAnimation("p2_l3s3_drunks", "POTC2_lvl3_stage3_2.ani")

  end case
  me.getInterface().HideIdleKickWarning()
end
on attachAnimation me, a_sElemName, a_sAnimMemName
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_rAnimationManager = getObject("AnimationManager")
  if objectp(t_rAnimationManager) then
    if objectp(tRoomContext) then
      tNode = tRoomContext.Search("NAME", a_sElemName)
      if tNode <> 0 then
        tWorldPos = tNode.getObject().GetAbsPos()
        if getmemnum(a_sAnimMemName) <> 0 then
          t_rAnimationManager.NewAnimation(tWorldPos, a_sElemName, a_sAnimMemName)
        end if
        tSprite = tNode.GetVisual().getSprite()
        if tSprite.spriteNum <> 0 then
          tSprite.visible = 0
        end if
      end if
    end if
  end if
end
on CreatePuff me, i_pCoordinates, i_sPuffType, i_iRef, a_iSize
  t_mp_Params = ["Position": i_pCoordinates, "Age": 1, "Type": i_sPuffType, "Size": a_iSize]
  tObject = m_rMGE.GetObjectPool().newObject("piratespuff", t_mp_Params)
  m_ar_puffs.append(tObject)
end
on RemovePuff me, a_rPuff
  m_rMGE.GetObjectPool().FreeObject(a_rPuff)
end
on FirstCharToUpper me, a_cWord
  tNum = charToNum(a_cWord.char[1])
  if tNum >= 97 and tNum <= 122 then
    return string(numToChar(tNum - 32)) & chars(a_cWord, 2, the length of a_cWord)
  else
    return a_cWord
  end if
end
on StageStartCountDown me
  me.getInterface().HidePreGame()
  m_iStageStartedAt = the milliSeconds
  tParticipantList = getThread("minigame").getComponent().GetParticipantlist()
  t_ar_nameList = []
  if not voidp(tParticipantList) then
    repeat with t_rParticipant in tParticipantList
      t_sName = t_rParticipant[#name]
      if t_ar_nameList.getOne(t_sName) = 0 then
        t_ar_nameList.append(t_sName & "'s")
        t_ar_nameList.append(me.FirstCharToUpper(t_sName & "'s"))
        t_ar_nameList.append(t_sName & "s")
        t_ar_nameList.append(me.FirstCharToUpper(t_sName & "s"))
        t_ar_nameList.append(t_sName)
        t_ar_nameList.append(me.FirstCharToUpper(t_sName))
      end if
    end repeat
    SetCannedFreeWordList(t_ar_nameList)
  end if
  me.getInterface().m_piratesBar.setEditable(1)
end
on StageEndCountDown me, i_iTime, i_ar_params
  m_iStageEndedAt = the milliSeconds
  m_ar_stagevictoryparams = i_ar_params
  if i_ar_params[4] = 1 then
    tMyShip = me.getInterface().GetMyShip()
    if tMyShip.GetParam("Team") = i_ar_params[1] then
    end if
  end if
  me.getInterface().enableExitButton(0)
end
on GetGameMode me
  return m_iGameMode
end
on SetGameMode me, a_iGameMode
  put "Set GAme Mode" && a_iGameMode
  if not voidp(a_iGameMode) then
    m_iGameMode = a_iGameMode
  end if
end
on GetNewReference me
  m_iReferenceCounter = m_iReferenceCounter + 1
  return m_iReferenceCounter
end
on GetMyAvatarRef me
  return m_myAvatarRef
end
on GetCollisionMap me
  if not voidp(m_stage) then
    return m_stage.GetCollisionMap()
  else
    return VOID
  end if
end
on GetStage me
  return m_stage
end
on GetSoundPlayer me
  return m_rSoundPlayer
end
on gameOn me
  return m_gameOn
end
on GetFloatFactory me
  return m_rFloatFactory
end
on GetShipByOwner me, a_iRef
  t_ar_ships = m_rMGE.GetObjectsByCode(1)
  repeat with tShip in t_ar_ships
    if a_iRef = tShip.GetParam("Owner") then
      return tShip
    end if
  end repeat
  return VOID
end