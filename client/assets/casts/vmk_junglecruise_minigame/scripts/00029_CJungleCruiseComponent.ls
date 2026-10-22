-- Behavior
property m_stage
property m_animalMgr
property m_powerupMgr
property m_hazardMgr
property m_idCounter
property m_ar_photoAlbum
property m_gameOn
property m_hostCharacter
property m_filmstrip
property m_tutorial
property m_spriteHider
property m_initialized
property m_prepared
property m_ar_animalscores
property m_gameend
property m_boat
property m_score
property m_Color
property m_deviation
property m_fuel
property m_film
property m_throttle
property m_ar_avatarFigure
property m_avatarOnDock
property m_avatarInBoat
property m_objAnimator
property m_ImgAvatar
property m_rMotorSound
property m_rSoundPlayer
property m_soundUpdateFreq
property m_sdacc
property m_bInitializedFully

on construct me
  put "CJungleCruiseComponent::Construct - begin"
  put "Init variables"
  m_objAnimator = createObject(#temp, "CAvatarAnimator")
  m_ImgAvatar = VOID
  m_stage = 0
  m_initialized = 0
  m_prepared = 0
  m_hostCharacter = VOID
  m_filmstrip = VOID
  m_tutorial = VOID
  m_spriteHider = VOID
  m_ar_avatarFigure = VOID
  m_rMotorSound = VOID
  m_rMusic = VOID
  m_rAtmosphere = VOID
  m_ar_rFX = []
  m_soundUpdateFreq = 10
  m_sdacc = 0
  m_ar_animalscores = []
  m_ar_animalscores[1] = 100
  m_ar_animalscores[2] = 100
  m_ar_animalscores[3] = 500
  m_ar_animalscores[4] = 500
  m_ar_animalscores[5] = 250
  m_ar_animalscores[6] = 250
  m_ar_animalscores[7] = 300
  m_ar_animalscores[8] = 300
  m_ar_animalscores[9] = 300
  m_ar_animalscores[10] = 300
  m_ar_animalscores[11] = 300
  m_ar_animalscores[12] = 300
  m_ar_animalscores[13] = 300
  m_ar_animalscores[14] = 350
  m_ar_animalscores[15] = 350
  m_ar_animalscores[16] = 200
  m_ar_animalscores[17] = 200
  m_ar_animalscores[18] = 500
  m_ar_animalscores[19] = 500
  m_ar_animalscores[20] = 150
  m_ar_animalscores[21] = 150
  m_ar_animalscores[22] = 100
  m_ar_animalscores[23] = 100
  m_ar_animalscores[24] = 300
  m_ar_animalscores[25] = 300
  m_ar_animalscores[26] = 200
  m_ar_animalscores[27] = 200
  m_ar_animalscores[28] = 200
  m_ar_animalscores[29] = 200
  m_ar_animalscores[30] = 400
  m_ar_animalscores[31] = 400
  m_ar_animalscores[32] = 150
  m_ar_animalscores[33] = 150
  m_ar_animalscores[34] = 450
  m_ar_animalscores[35] = 450
  m_ar_animalscores[36] = 200
  m_ar_animalscores[37] = 200
  m_ar_animalscores[38] = 300
  m_ar_animalscores[39] = 300
  m_ar_animalscores[40] = 450
  m_ar_animalscores[41] = 450
  m_ar_animalscores[42] = 350
  m_ar_animalscores[43] = 350
  m_ar_animalscores[44] = 400
  m_ar_animalscores[45] = 400
  m_ar_animalscores[46] = 300
  m_ar_animalscores[47] = 100
  m_ar_animalscores[48] = 100
  m_ar_animalscores[49] = 100
  m_ar_animalscores[50] = 500
  m_ar_animalscores[51] = 500
  m_ar_animalscores[52] = 500
  m_ar_animalscores[53] = 250
  m_ar_animalscores[54] = 250
  m_ar_animalscores[55] = 250
  m_ar_animalscores[56] = 300
  m_ar_animalscores[57] = 300
  m_ar_animalscores[58] = 300
  m_ar_animalscores[59] = 300
  m_ar_animalscores[60] = 300
  m_ar_animalscores[61] = 300
  m_ar_animalscores[62] = 300
  m_ar_animalscores[63] = 300
  m_ar_animalscores[64] = 300
  m_ar_animalscores[65] = 300
  m_ar_animalscores[66] = 300
  m_ar_animalscores[67] = 300
  m_ar_animalscores[68] = 350
  m_ar_animalscores[69] = 350
  m_ar_animalscores[70] = 350
  m_ar_animalscores[71] = 200
  m_ar_animalscores[72] = 200
  m_ar_animalscores[73] = 200
  m_ar_animalscores[74] = 500
  m_ar_animalscores[75] = 500
  m_ar_animalscores[76] = 500
  m_ar_animalscores[77] = 150
  m_ar_animalscores[78] = 150
  m_ar_animalscores[79] = 150
  m_ar_animalscores[80] = 100
  m_ar_animalscores[81] = 100
  m_ar_animalscores[82] = 100
  m_ar_animalscores[83] = 300
  m_ar_animalscores[84] = 300
  m_ar_animalscores[85] = 300
  m_ar_animalscores[86] = 200
  m_ar_animalscores[87] = 200
  m_ar_animalscores[88] = 200
  m_ar_animalscores[89] = 200
  m_ar_animalscores[90] = 200
  m_ar_animalscores[91] = 200
  m_ar_animalscores[92] = 400
  m_ar_animalscores[93] = 400
  m_ar_animalscores[94] = 400
  m_ar_animalscores[95] = 150
  m_ar_animalscores[96] = 150
  m_ar_animalscores[97] = 150
  m_ar_animalscores[98] = 450
  m_ar_animalscores[99] = 450
  m_ar_animalscores[100] = 450
  m_ar_animalscores[101] = 200
  m_ar_animalscores[102] = 200
  m_ar_animalscores[103] = 200
  m_ar_animalscores[104] = 300
  m_ar_animalscores[105] = 300
  m_ar_animalscores[106] = 300
  m_ar_animalscores[107] = 450
  m_ar_animalscores[108] = 450
  m_ar_animalscores[109] = 450
  m_ar_animalscores[110] = 350
  m_ar_animalscores[111] = 350
  m_ar_animalscores[112] = 350
  m_ar_animalscores[113] = 400
  m_ar_animalscores[114] = 400
  m_ar_animalscores[115] = 400
  executeMessage(#SetMinigameHandler, "CJungleCruiseHandlerExtension")
  t_Img = image(80, 160, 32)
  t_rAlpha = image(80, 160, 8, #grayscale)
  t_Img.setAlpha(t_rAlpha)
  t_Img.useAlpha = 1
  getMember("tempAvatarImage").image = t_Img
  put "Register listeners"
  registerMessage(#room_ready, me.getID(), #InitStage)
  registerMessage(#room_leave, me.getID(), #StopStage)
  put "CJungleCruiseComponent::Construct - end"
  return 1
end
on deconstruct me
  put "CJungleCruiseComponent::Deconstruct - begin"
  if m_prepared then
    me.UnprepareRoom()
  end if
  put "Show room ui"
  executeMessage(#ui_show)
  t_Img = image(80, 160, 32)
  t_rAlpha = image(80, 160, 8, #grayscale)
  t_Img.setAlpha(t_rAlpha)
  t_Img.useAlpha = 1
  getMember("tempAvatarImage").image = t_Img
  put "Re-enable messenger"
  executeMessage(#MinigameState, #idle)
  put "Unregister listeners"
  unregisterMessage(#room_ready, me.getID())
  unregisterMessage(#room_leave, me.getID())
  if objectp(m_objAnimator) then
    m_objAnimator.deconstruct()
  end if
  put "CJungleCruiseComponent::Deconstruct - end"
  return 1
end
on PrepareRoom me
  put "CJungleCruiseComponent::PrepareRoom - begin"
  m_bInitializedFully = 0
  put "Disable messenger"
  executeMessage(#MinigameState, #running, "jungle_cruise")
  put "remove albumview if any"
  removeObject("JCAlbumView")
  put "prepare interface"
  me.getInterface().PrepareRoom()
  put "init variables"
  m_idCounter = 0
  m_score = 0
  m_Color = random(4)
  m_deviation = 0.0
  tFuel = getVariableValue("junglecruise.powerUp.fuel.startAmount")
  if tFuel = 0 then
    tFuel = 180
  end if
  m_fuel = tFuel
  tFilm = getVariableValue("junglecruise.powerUp.film.startAmount")
  if tFilm = 0 then
    tFilm = 25
  end if
  m_film = tFilm
  m_throttle = 0.0
  m_ar_photoAlbum = []
  m_lastPhotoID = -1
  m_lastPhotoScore = 0
  m_gameOn = 1
  m_rSoundPlayer = createObject("JCSoundFX", "CJungleCruiseGameSoundPlayer")
  m_hostCharacter = createObject("DrunkenNed", "CGuideCharacter")
  m_hostCharacter.SetSoundPlayer(m_rSoundPlayer)
  m_filmstrip = createObject("FilmStrip", "CFilmStrip")
  m_filmstrip.setFilmAmount(m_film)
  m_tutorial = createObject("Tutorial", "CTutorial")
  m_myAvatar = VOID
  m_myAvatarXML = VOID
  m_spriteHider = createObject("SpriteHider", "CSpriteHider")
  m_avatarInBoat = 0
  m_gameend = 0
  m_hostCharacter.showGuide()
  put "Init last photo"
  createMember("lastPhoto", #bitmap)
  put "Start managers"
  m_animalMgr = createObject("JCAnimalMgr", "CAnimalManager")
  m_powerupMgr = createObject("JCPowerupMgr", "CPowerupManager")
  m_hazardMgr = createObject("JCHazardMgr", "CHazardManager")
  put "Create Sound objects"
  m_rMotorSound = createObject(#random, "CSoundObject")
  put "Avatar placeholder sprite"
  m_avatarOnDock = sprite(reserveSprite(me.getID()))
  m_avatarOnDock.member = VOID
  put "Start update"
  receiveUpdate(me.getID())
  getThread("minigame").getComponent().StartMinigameEngine()
  executeMessage("StopRoomSound")
  m_prepared = 1
  put "CJungleCruiseComponent::PrepareRoom - end"
end
on UnprepareRoom me
  put "CJungleCruiseComponent::UnprepareRoom - begin"
  me.getInterface().UnprepareRoom()
  put "stop sounds"
  m_rMotorSound.StopSound()
  put "release objects"
  if not voidp(m_rMotorSound) then
    removeObject(m_rMotorSound.getID())
  end if
  if m_rSoundPlayer <> 0 then
    removeObject(m_rSoundPlayer.getID())
  end if
  if m_stage <> 0 then
    removeObject(m_stage.getID())
  end if
  if not voidp(m_animalMgr) then
    removeObject(m_animalMgr.getID())
  end if
  if not voidp(m_powerupMgr) then
    removeObject(m_powerupMgr.getID())
  end if
  if not voidp(m_hazardMgr) then
    removeObject(m_hazardMgr.getID())
  end if
  if not voidp(m_hostCharacter) then
    removeObject(m_hostCharacter.getID())
  end if
  if not voidp(m_filmstrip) then
    removeObject(m_filmstrip.getID())
  end if
  if not voidp(m_tutorial) then
    removeObject(m_tutorial.getID())
  end if
  if not voidp(m_spriteHider) then
    removeObject(m_spriteHider.getID())
  end if
  if not voidp(m_avatarOnDock) then
    releaseSprite(m_avatarOnDock.spriteNum)
  end if
  m_prepared = 0
  executeMessage("PlayRoomSound")
  put "Return variable state"
  m_stage = 0
  m_initialized = 0
  m_prepared = 0
  m_hostCharacter = VOID
  m_filmstrip = VOID
  m_tutorial = VOID
  m_spriteHider = VOID
  m_ar_avatarFigure = VOID
  m_soundUpdateFreq = 10
  m_sdacc = 0
  put "CJungleCruiseComponent::UnprepareRoom - end"
end
on HideNodeGraphics me, a_rRoomContext, a_sQuery, a_sParam
  if not voidp(a_rRoomContext) then
    tNode = a_rRoomContext.Search(a_sQuery, a_sParam)
    if not voidp(tNode) then
      tSprite = tNode.GetVisual()
      if not voidp(tSprite) then
        tSprite.getSprite().member = VOID
      end if
    end if
  end if
end
on HideSubNodeGraphics me, a_rRoomContext, a_sQuery, a_sParam
  if not voidp(a_rRoomContext) then
    tRoot = a_rRoomContext.Search(a_sQuery, a_sParam)
    if not voidp(tRoot) then
      repeat with i = 1 to tRoot.GetCount()
        tRoot[i].GetVisual().getSprite().member = VOID
      end repeat
    end if
  end if
end
on playFx me, a_sName
  m_rSoundPlayer.SoundFX(getMember(a_sName))
end
on InitStage me, m_rContext
  put "CJungleCruiseComponent::InitStage - begin"
  if not m_prepared then
    put "Preparing room"
    me.PrepareRoom()
  end if
  m_bInitializedFully = 0
  if not m_initialized then
    m_rMotorSound.Define("JC-boat-motor")
    m_rMotorSound.SetSoundType("fx")
    t_bOn = getObject(#session).get("fx")
    if t_bOn then
      m_rMotorSound.PlaySound()
    end if
    m_initialized = 1
  end if
  getThread("minigame").getComponent().StartMinigameEngine()
  if m_stage <> 0 then
    m_gameOn = 1
    executeMessage(#stop_Music)
    executeMessage(#stop_AllSounds)
    if getObject(#session).get("music") then
      m_rSoundPlayer.music(getMember(m_stage.GetMusic()))
    end if
    if getObject(#session).get("fx") then
      m_rSoundPlayer.Atmos(getMember(m_stage.GetAtmosphere()))
    end if
    t_rRoomContext = getThread("room").getComponent()._AccessRoom()
    repeat with i = 1 to 49
      if i < 10 then
        tAppendix = "00" & i
      else
        if i < 100 then
          tAppendix = "0" & i
        else
          tAppendix = i
        end if
      end if
      tNode = t_rRoomContext.Search("NAME", "mickey" & tAppendix)
      if tNode <> 0 then
        tNode.GetVisual().getSprite().member = VOID
      end if
    end repeat
    me.HideSubNodeGraphics(t_rRoomContext, "NAME", "jcanimals")
    me.HideSubNodeGraphics(t_rRoomContext, "NAME", "jcpowerups")
    me.HideSubNodeGraphics(t_rRoomContext, "NAME", "jchazards")
    me.HideNodeGraphics(t_rRoomContext, "NAME", "vmk_anim_7")
    t_rPointer = t_rRoomContext.Search("NAME", "pointer")
    repeat while not voidp(t_rPointer)
      t_rRoomContext.Remove(t_rPointer.GetKey())
      t_rPointer = t_rRoomContext.Search("NAME", "pointer")
    end repeat
    t_rXML = CreateXML()
    t_rXML.open(getMember("empty.node.xml").text)
    t_rXML.Search("type", "NODE")
    t_rXML.SetParam("REF", 1)
    t_rXML.SetParam("CLASS", "boat")
    t_rRoomContext._CreateIndexed(1, "boat", t_rXML)
    m_boat = t_rRoomContext._AccessIndexed(1, "boat")
    m_boat.SetOwner(t_rRoomContext)
    if voidp(m_boat) then
      return error(me, "FATAL ERROR : Boat object create unsuccesful", #Contruct)
    else
      m_boat.SetParam("Reference", 1)
      m_boat.SetParam("Color", m_Color)
      m_boat.SetParam("Direction", m_stage.getDirection())
      m_boat.SetParam("SpotOn", m_stage.GetSpot())
      m_boat.SetParam("Fuel", m_fuel)
      m_boat.SetParam("Film", m_film)
      m_boat.SetParam("Throttle", m_throttle)
      m_boat.SetParam("Steer", 0.0)
      m_boat.SetParam("Stage", m_stage)
      m_boat.SetParam("BoundsType", #circle)
      tRadius = getVariableValue("junglecruise.collisionBoundary.radius.boat")
      if tRadius = 0 then
        tRadius = 20
      end if
      m_boat.SetParam("BoundingCircleRadius", tRadius)
      m_boat.SetParam("AvatarOn", 1)
      m_boat.SetParam("Velocity", vector(0, 0, 0))
      m_boat.SetParam("WorldPosition", m_stage.GetBaseSpline().InterpolateAt(0.0))
      m_boat.GetFactor().update()
    end if
    tdir = 1
    if m_stage.getDirection() = "down" then
      tdir = 3
    end if
    me.DrawAvatar(tdir)
    m_animalMgr.SetRoomContext(t_rRoomContext)
    m_animalMgr.SetStage(m_stage)
    m_animalMgr.SetBoat(m_boat)
    m_powerupMgr.SetRoomContext(t_rRoomContext)
    m_powerupMgr.SetStage(m_stage)
    m_powerupMgr.SetBoat(m_boat)
    m_hazardMgr.SetRoomContext(t_rRoomContext)
    m_hazardMgr.SetStage(m_stage)
    m_hazardMgr.SetBoat(m_boat)
    put "HAZARDS COUNT" && m_stage.GetHazards().count
    m_hazardMgr.AddAllHazards()
    if m_stage.GetName() = "dock.stage1" then
      m_tutorial.ReadTutorial("tutorial")
      me.DrawAvatar()
      m_avatarOnDock.member = member("tempAvatarImage")
      m_avatarOnDock.loc = point(500, 265)
      m_avatarOnDock.locZ = -1000000
      m_avatarOnDock.width = member("tempAvatarImage").image.width * 0.75
      m_avatarOnDock.height = member("tempAvatarImage").image.height * 0.75
      m_boat.SetParam("AvatarOn", 0)
      m_boat.SetParam("Deviation", -40)
    end if
  end if
  put "CJungleCruiseComponent::InitStage - end"
end
on DrawAvatar me, a_iDir, a_sParam
  if voidp(m_ar_avatarFigure) then
    me.delay(100, #DrawAvatar, a_iDir, a_sParam)
  else
    tdir = 1
    if m_stage.getDirection() = "down" then
      tdir = 3
    end if
    if not m_avatarInBoat then
      t_mp_data2 = [#head: 3, #body: 3, #emoticon: 0, #LeftHand: 0, #RightHand: 0, #legs: 0, #magic: 0]
    else
      t_mp_data2 = [#head: tdir, #body: tdir, #emoticon: 0, #LeftHand: 100, #RightHand: 100, #legs: 0, #magic: 0]
    end if
    t_mp_data = [#outlook: m_ar_avatarFigure, #tilesize: 32]
    m_objAnimator.Define(t_mp_data)
    m_objAnimator.SetAction(t_mp_data2)
    m_objAnimator.setCallback(me.getID(), #DrawAvatarToBoat, [#Dir: a_iDir, #param: a_sParam])
  end if
end
on DrawAvatarToBoat me, a_img, a_ar_Param
  getMember("tempAvatarImage").image = a_img
  tdir = 1
  if m_stage.getDirection() = "down" then
    tdir = 3
  end if
  if tdir = 1 then
    getMember("tempAvatarImage").regPoint = point(73, 116)
  else
    getMember("tempAvatarImage").regPoint = point(65, 152)
  end if
  if not m_avatarInBoat then
    getMember("tempAvatarImage").regPoint = point(48, 90)
  end if
end
on LoadStage me, i_sStageName
  put "CJungleCruiseComponent::LoadStage - begin"
  m_animalMgr.ClearAll()
  m_powerupMgr.ClearAll()
  m_hazardMgr.ClearAll()
  if m_stage <> 0 then
    removeObject(m_stage.getID())
  end if
  m_stage = createObject("stage_" & i_sStageName, "CStage")
  m_stage.LoadXML(i_sStageName & ".xml")
  executeMessage(#room_switch, m_stage.getRoomName())
  me.initializeWindow()
  me.getInterface().enableCamera()
  if not (m_stage.GetName() = "dock.stage1") then
    getThread("minigame").getHandler()._SendStageLoaded()
  end if
  put "CJungleCruiseComponent::LoadStage - end"
end
on initializeWindow me
  if not me.GetGameEnd() then
    if not m_bInitializedFully then
      if m_boat <> 0 then
        put "mmmok"
        me.getInterface().showJCInterface()
        m_bInitializedFully = 1
      end if
    end if
  end if
end
on StageStartCountDown me
  m_iStageStartedAt = the milliSeconds
end
on StageEndCountDown me, i_iTime, i_ar_params
  m_iStageEndedAt = the milliSeconds
end
on StopStage me, m_rContext
  getThread("minigame").getComponent().StopMinigameEngine()
  m_gameOn = 0
end
on GetBoat me
  return m_boat
end
on GetAnimalManager me
  return m_animalMgr
end
on GetHazardManager me
  return m_hazardMgr
end
on GetScore me
  return m_score
end
on gameOn me
  return m_gameOn
end
on GetSpriteHider me
  return m_spriteHider
end
on AddScore me, i_iFrameID, i_iAmount
  m_score = m_score + i_iAmount
  me.getInterface().updateScoreinfo()
  repeat with tPhoto in m_ar_photoAlbum
    if tPhoto.frameid = i_iFrameID then
      put "Found photo"
      tPhoto.score = i_iAmount
      exit repeat
    end if
  end repeat
end
on AddPowerup me, i_iId, i_type
  if m_powerupMgr.AddOnePowerup(i_iId, i_type) then
    me.playFx("power_up_2")
  end if
  me.getInterface().updatePowerups()
end
on AwardPowerup me, a_iFuel, a_iFilm
  if m_stage <> 0 then
    if m_stage.GetName() <> "tutorial" then
      tFilm = m_boat.GetParam("Film")
      tFilm = tFilm + a_iFilm
      m_boat.SetParam("Film", tFilm)
      m_filmstrip.AddFilm(a_iFilm)
      tFuel = m_boat.GetParam("Fuel")
      tFuel = tFuel + a_iFuel
      m_boat.SetParam("Fuel", tFuel)
    end if
  end if
  me.getInterface().updatePowerups()
end
on SetAvatarFigure me, a_Ar_Data
  m_ar_avatarFigure = a_Ar_Data
end
on CheckFrameHit me, i_rCamera
  tHitList = []
  repeat with tAnimal in m_animalMgr.GetVisibleAnimalList()
    if not voidp(tAnimal.GetVisual()) then
      tCamSpr = i_rCamera.getSprite()
      tAnimalSpr = tAnimal.GetVisual().getSprite()
      if tCamSpr.intersects(tAnimalSpr) and tAnimal.GetParam("State") <> #leaving then
        tCameraRect = tCamSpr.rect
        tAnimalRect = tAnimalSpr.rect
        tCamCenter = vector((tCameraRect.left + tCameraRect.right) / 2, (tCameraRect.top + tCameraRect.bottom) / 2, 0)
        tAnimalCenter = vector((tAnimalRect.left + tAnimalRect.right) / 2, (tAnimalRect.top + tAnimalRect.bottom) / 2, 0)
        tAccuracy = 0
        t2DDist = integer((tAnimalCenter - tCamCenter).length)
        if t2DDist > 99 then
          t2DDist = 99
        end if
        tAccuracy = 100 - t2DDist
        if tAccuracy < 1 then
          tAccuracy = 1
        end if
        tTime = integer(100 * tAnimal.GetParam("Time") / tAnimal.GetParam("FullTime"))
        tHitList.append([#ref: tAnimal.GetParam("Reference"), #distance: 1, #accuracy: tAccuracy, #time: tTime])
      end if
    end if
  end repeat
  return tHitList
end
on SendHits me, a_ar_hits, a_iFrameID
  tdata = []
  tdata.append(a_iFrameID)
  tdata.append(a_ar_hits.count())
  repeat with tHit in a_ar_hits
    tdata.append(tHit.ref)
    tdata.append(tHit.distance)
    tdata.append(tHit.accuracy)
    tdata.append(tHit.time)
  end repeat
  put "Send possible hits to server" && tdata
  executeMessage(#SendMinigameAction, 1, tdata)
end
on Calculatescore me, a_ar_hits
  SCORE_MULTIPLIER = 1
  tScore = 0
  repeat with tHit in a_ar_hits
    tScore = tScore + SCORE_MULTIPLIER * m_ar_animalscores[m_animalMgr.GetAnimalID(tHit.ref)] * (tHit.accuracy + tHit.time) / 200
  end repeat
  return tScore
end
on TakePhoto me, i_rCamera
  if not voidp(m_boat) then
    if m_boat.GetParam("Film") = 0 then
      m_hostCharacter.SaySomething("SN-youre_out_of_film", "You're out of film!")
    end if
    if i_rCamera.ready() and m_boat.GetParam("Film") > 0 then
      m_spriteHider.ClearHideables()
      t_ar_hideables = me.getInterface().GetHideables()
      repeat with tSpr in t_ar_hideables
        m_spriteHider.AddHideable(tSpr)
        put sprite(tSpr).member.name
      end repeat
      t_ar_hideables = m_hostCharacter.GetHideables()
      repeat with tSpr in t_ar_hideables
        m_spriteHider.AddHideable(tSpr)
      end repeat
      m_spriteHider.HideSprites()
      updateStage()
      m_rSoundPlayer.camera(getMember("JC-camera"))
      tFrameID = m_idCounter
      m_idCounter = m_idCounter + 1
      tHitList = me.CheckFrameHit(i_rCamera)
      tScore = me.Calculatescore(tHitList)
      if tHitList.count > 0 then
        me.SendHits(tHitList, tFrameID)
        m_hostCharacter.SayPositive()
        repeat with tHit in tHitList
          m_animalMgr.LeaveAnimal(tHit.ref)
        end repeat
      else
        m_lastPhotoScore = 0
        m_hostCharacter.SayNegative()
      end if
      me.getInterface().DisplayPhotoScore(tScore)
      tMaxList = tHitList.duplicate()
      repeat with tHit in tMaxList
        tHit.accuracy = 100
        tHit.time = 100
      end repeat
      tMaxScore = me.Calculatescore(tMaxList)
      if tMaxScore = 0 then
        tQuality = 0
      else
        tQuality = tScore * 1.0 / tMaxScore
      end if
      me.getInterface().DisplayFeedback(tQuality)
      if m_stage <> 0 then
        if m_stage.GetName() <> "tutorial" then
          tRect = i_rCamera.getSprite().rect
          tImage = image(tRect.right - tRect.left, tRect.bottom - tRect.top, 32)
          tImage.copyPixels((the stage).image, rect(0, 0, tRect.right - tRect.left, tRect.bottom - tRect.top), tRect)
          m_ar_photoAlbum.append([#frameid: tFrameID, #image: tImage, #score: 0])
          i_rCamera.StartFilmWind()
          tFilm = m_boat.GetParam("Film")
          tFilm = tFilm - 1
          m_boat.SetParam("Film", tFilm)
          m_filmstrip.AddFrame(tImage)
        end if
      end if
      m_spriteHider.ShowSprites()
      updateStage()
    end if
  end if
  me.getInterface().updateScrollingFilm(m_filmstrip)
  me.getInterface().updatePowerups()
end
on GoToAlbumView me
  executeMessage(#ui_show)
  executeMessage(#SendMinigameAction, 6, [])
  createObject("JCAlbumView", "CAlbumWindow")
  tAlbum = getObject("JCAlbumView")
  tAlbum.SetPhotos(m_ar_photoAlbum)
  tAlbum.PopulatePhotos(1)
  m_gameOn = 0
  if m_stage <> 0 then
    removeObject(m_stage.getID())
  end if
  m_stage = 0
  m_boat.SetParam("Stage", VOID)
  me.UnprepareRoom()
end
on EndGame me
  m_gameend = 1
  me.LoadStage("dock.endstage")
  m_boat.GetFactor().DisableCollision()
  me.getInterface().RemoveCamera()
  m_hostCharacter.SaySomething(EMPTY, "Well Done! You finished with " & m_score & "points. See you again soon!")
  if not voidp(m_filmstrip) then
    removeObject(m_filmstrip.getID())
  end if
  m_filmstrip = VOID
  me.getInterface().m_exitButton.sprite.visible = 0
end
on updateSound me
  if m_boat <> 0 then
    tSpeed = m_boat.GetFactor().getSpeed()
    t_bOn = getObject(#session).get("fx")
    if t_bOn then
      m_rMotorSound.PitchSound(tSpeed * 3.0 + 1.0)
    end if
  end if
end
on update me
  if voidp(m_stage) then
    exit
  end if
  if m_stage <> 0 then
    m_sdacc = m_sdacc + 1
    if m_sdacc > m_soundUpdateFreq then
      me.updateSound()
      m_sdacc = 1
    end if
    if m_stage.GetName() = "dock.stage1" then
      m_boat.GetFactor().DisableCollision()
      tSay = m_tutorial.GetSomethingToSay()
      if tSay.count > 0 then
        m_hostCharacter.SaySomething(tSay.sound, tSay.text)
      end if
      tDist = (vector(500, 265, m_boat.GetScrPos().z) - m_boat.GetScrPos()).length
      if tDist < 100 and not m_avatarInBoat then
        getThread("minigame").getHandler()._SendStageLoaded()
        m_boat.SetParam("AvatarOn", 1)
        m_avatarOnDock.member = VOID
        m_avatarInBoat = 1
        tdir = 1
        if m_stage.getDirection() = "down" then
          tdir = 3
        end if
        me.DrawAvatar(tdir)
      end if
    else
      if not m_avatarInBoat then
        if not voidp(m_boat) then
          m_boat.SetParam("AvatarOn", 1)
          m_avatarOnDock.member = VOID
          m_avatarInBoat = 1
        end if
      end if
    end if
    if me.GetGameEnd() then
      if not voidp(m_boat) then
        tDist = (vector(500, 265, m_boat.GetScrPos().z) - m_boat.GetScrPos()).length
        if tDist < 150 then
          me.GoToAlbumView()
        end if
      end if
    end if
    if not me.GetGameEnd() then
      m_animalMgr.update()
      m_powerupMgr.update()
      m_hazardMgr.update()
      if me.StageFinished() then
        me.getInterface().disableCamera()
        m_Color = m_boat.GetParam("Color")
        m_deviation = m_boat.GetParam("Deviation")
        m_fuel = m_boat.GetParam("Fuel")
        m_film = m_boat.GetParam("Film")
        m_throttle = m_boat.GetParam("Throttle")
        executeMessage(#SendMinigameAction, 3, [])
        removeObject(m_stage.getID())
        m_stage = 0
        m_rMotorSound.StopSound()
        if getThread("junglecruiseViewer") <> 0 then
          executeMessage("JCViewer")
        end if
      end if
    end if
  end if
end
on GetGameEnd me
  return m_gameend
end
on StageFinished me
  if not voidp(m_boat) then
    if m_boat.GetParam("StageOver") then
      return 1
    else
      return 0
    end if
  end if
  return 1
end
on GetHostCharacter me
  return m_hostCharacter
end
on GetAvatarInBoat me
  return m_avatarInBoat
end