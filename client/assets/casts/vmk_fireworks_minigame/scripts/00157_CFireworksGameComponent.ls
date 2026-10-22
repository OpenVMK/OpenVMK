-- Score Script
property pView
property fViewTheta
property fViewOmega
property fViewMu
property pPipeline
property m_particleSystem
property m_rFireworksEngine
property m_ar_visual
property m_softBuffer
property m_viewImg
property m_viewImgSprite
property m_bufMember
property m_ClearImage
property m_bgRegPoint
property m_maskMember
property m_maskSprite
property m_flashMember
property m_flashSprite
property m_selectorMember
property m_selectorSprite
property m_fIconSize
property m_fWarningFlashTime
property m_mp_sparkList
property m_iLastMilliseconds
property m_ar_level
property m_fLevelEnd
property m_iCurrentLevel
property m_iGameState
property m_fStateTime
property m_ar_fwList
property m_sWriterName
property m_rWriterSprite
property m_rSoundPlayer
property m_ar_hitList
property m_iScore
property m_iRank
property m_ar_scoreList
property m_stage
property m_initialized
property m_bScoreSent
property m_prepared
property m_tutorialmode
property m_iShotCount
property m_ar_currentCombination
property m_iBonus

on construct me
  put "CFireworksGameComponent::construct - begin"
  m_ar_fwList = []
  m_ar_level = []
  m_ar_currentCombination = []
  m_iCurrentLevel = 0
  m_fLevelTimer = 0.0
  m_iGameState = #start
  m_ar_hitList = []
  m_iScore = 0
  m_iRank = 0
  m_ar_scoreList = []
  m_tutorialmode = 0
  m_initialized = 0
  m_sWriterName = EMPTY
  m_bScoreSent = 0
  m_viewImgSprite = VOID
  m_particleSystem = VOID
  m_rFireworksEngine = VOID
  m_softBuffer = VOID
  m_maskSprite = VOID
  m_flashSprite = VOID
  m_selectorSprite = VOID
  m_rWriterSprite = VOID
  m_stage = VOID
  m_prepared = 0
  m_fIconSize = 1.0
  m_fWarningFlashTime = 0.5
  m_iBonus = 1.0
  m_iShotCount = 0
  executeMessage(#SetMinigameHandler, "CFireworksMinigameHandler")
  return 1
end
on deconstruct me
  if m_prepared then
    me.UnprepareRoom()
  end if
end
on PrepareRoom me
  put "CFireworksGameComponent::PrepareRoom - begin"
  executeMessage(#MinigameState, #running)
  getThread("FireworksPreShow").getComponent().DisableFireworks()
  getThread("FireworksPreShow").getInterface().DisableTimerWindow()
  me.getInterface().PrepareRoom()
  m_stage = createObject(#random, "CFireworksStage")
  if voidp(m_stage) then
    return error(me, "Unable to create stage.", #construct)
  end if
  m_maskMember = VOID
  m_maskSprite = sprite(reserveSprite(me.getID()))
  m_maskSprite.locZ = -102
  m_maskSprite.loc = point(0, 0)
  m_maskSprite.member = m_maskMember
  m_selectorMember = VOID
  m_selectorSprite = sprite(reserveSprite(me.getID()))
  m_selectorSprite.locZ = -101
  m_selectorSprite.loc = point(0, 0)
  m_selectorSprite.member = m_selectorMember
  m_flashMember = VOID
  m_flashSprite = sprite(reserveSprite(me.getID()))
  m_flashSprite.locZ = -100
  m_flashSprite.loc = point(0, 0)
  m_flashSprite.ink = 33
  m_flashSprite.blendLevel = 50
  m_flashSprite.member = m_flashMember
  tWriterStyle = getStructVariable("struct.font.plain")
  tWriterStyle.setaProp(#color, rgb("#EFEFFE"))
  tWriterStyle.setaProp(#bgColor, rgb("#000000"))
  tWriterStyle.setaProp(#fixedLineSpace, 20)
  tWriterStyle.setaProp(#lineHeight, 20)
  tWriterStyle.setaProp(#fontSize, 20)
  tWriterStyle.setaProp(#font, "Folio BoldCondensed *")
  tWriterStyle.setaProp(#alignment, #center)
  m_sWriterName = "fireworks_writer"
  createWriter(m_sWriterName)
  getWriter(m_sWriterName).Define(tWriterStyle)
  m_rWriterSprite = sprite(reserveSprite(me.getID()))
  m_rWriterSprite.member = member("writer.bitmap")
  m_rWriterSprite.ink = 36
  m_rWriterSprite.loc = point((the stage).image.width / 2, (the stage).image.height / 2 - 50)
  m_rWriterSprite.locZ = -25
  m_rWriterSprite.width = m_rWriterSprite.member.image.width
  m_rWriterSprite.height = m_rWriterSprite.member.image.height
  executeMessage(#stop_Music)
  m_rSoundPlayer = createObject("FireworksSoundPlayer", "CFireworksGameSoundPlayer")
  registerMessage(#room_ready, me.getID(), #InitGame)
  executeMessage(#room_switch, "fireworks")
  puppetTempo(18)
  m_prepared = 1
  DisableHighScore()
  if connectionExists(getVariable("main.connection.id", "VMK")) then
    getConnection(getVariable("main.connection.id", "VMK")).send(580)
  end if
  put "CFireworksGameComponent::PrepareRoom - end"
end
on UnprepareRoom me
  removeUpdate(me.getID())
  me.getInterface().HideStageEnd()
  if getThread("minigame") <> 0 then
    getThread("minigame").getComponent().StopMinigameEngine()
  end if
  me.getInterface().UnprepareRoom()
  unregisterMessage(#room_ready, me.getID())
  if not voidp(m_particleSystem) then
    removeObject(m_particleSystem.getID())
  end if
  if not voidp(m_rFireworksEngine) then
    removeObject(m_rFireworksEngine.getID())
  end if
  if not voidp(m_softBuffer) then
    removeObject(m_softBuffer.getID())
  end if
  repeat with tSpark in m_mp_sparkList
    if not voidp(tSpark) then
      removeObject(tSpark.getID())
    end if
  end repeat
  removeWriter(m_sWriterName)
  if not voidp(m_stage) then
    if m_stage <> 0 then
      removeObject(m_stage.getID())
    end if
  end if
  if not voidp(m_maskSprite) then
    releaseSprite(m_maskSprite.spriteNum)
  end if
  if not voidp(m_flashSprite) then
    releaseSprite(m_flashSprite.spriteNum)
  end if
  if not voidp(m_selectorSprite) then
    releaseSprite(m_selectorSprite.spriteNum)
  end if
  if not voidp(m_viewImgSprite) then
    releaseSprite(m_viewImgSprite.spriteNum)
  end if
  if not voidp(m_rWriterSprite) then
    releaseSprite(m_rWriterSprite.spriteNum)
  end if
  removeObject("spark4")
  if m_rSoundPlayer <> 0 then
    removeObject(m_rSoundPlayer.getID())
  end if
  executeMessage(#play_Music)
  m_prepared = 0
  m_initialized = 0
  m_ar_fwList = []
  m_ar_level = []
  m_iCurrentLevel = 0
  m_fLevelTimer = 0.0
  m_iGameState = #start
  m_ar_hitList = []
  m_iScore = 0
  m_iRank = 0
  m_ar_scoreList = []
  m_initialized = 0
  m_mp_sparkList = [:]
  m_sWriterName = EMPTY
  m_bScoreSent = 0
  m_viewImgSprite = VOID
  m_particleSystem = VOID
  m_rFireworksEngine = VOID
  m_softBuffer = VOID
  m_maskSprite = VOID
  m_flashSprite = VOID
  m_selectorSprite = VOID
  m_rWriterSprite = VOID
  m_stage = VOID
  m_prepared = 0
  m_iCrowdSatisfaction = 1
  m_rSoundPlayer = 0
  puppetTempo(getIntVariable("system.tempo", 30))
  executeMessage(#MinigameState, #idle)
end
on InitGame me
  put "CFireworksGameComponent::InitGame - begin"
  if not m_initialized then
    m_particleSystem = createObject("Particle.System", "Particle System Class")
    m_particleSystem.initParticleSystem()
    m_particleSystem.setParticleLimit(0)
    m_particleSystem.setEmitterLimit(0)
    m_particleSystem.setGravity(vector(-14, 0, 0))
    m_rFireworksEngine = createObject("FWEngine", "CFireworksEngineInterface")
    m_rFireworksEngine.SetParticleSystem(m_particleSystem)
    m_rFireworksEngine.SetAutoExplode(0)
    fViewTheta = 0.0
    fViewOmega = 0.0
    fViewMu = 40
    pView = new(script("Simple 3D View Class"), fViewTheta, fViewOmega, fViewMu, 300)
    pView.setNearClipDistance(1)
    pView.setFarClipDistance(1)
    pPipeline = new(script("3D Particle System Pipeline Class"))
    pPipeline.setView(pView)
    t_ar_particleTypes = getVariableValue("particle_types")
    if voidp(t_ar_particleTypes) then
      error(me, "particle_types variable is invalid.", #construct)
    end if
    removeObject("spark4")
    t_spark4 = createObject("spark4", "SoftSprite Class")
    t_spark4.setImage(member("Test Spark 4").image)
    m_mp_sparkList = ["Test Spark 4": t_spark4]
    c = 0
    repeat with ttype in t_ar_particleTypes
      tPStyle = getVariableValue(ttype)
      if voidp(tPStyle) then
        return error(me, ttype & " variable is invalid.", #construct)
      end if
      repeat with tSpr in tPStyle[#spriteList]
        if not tSpr[#loop] then
          if not m_mp_sparkList[tSpr[#sprite]] then
            createObject("fwspark:" & c, "SoftSprite Class")
            tSpark = getObject("fwspark:" & c)
            tSpark.setImage(member(tSpr[#sprite]).image)
            m_mp_sparkList[tSpr[#sprite]] = tSpark
            c = c + 1
          end if
        end if
      end repeat
    end repeat
    t_bufImg = image((the stage).image.width, (the stage).image.height, 24)
    t_bufImg.fill(0, 0, t_bufImg.width, t_bufImg.height, [#color: color(0, 0, 0)])
    m_viewImg = t_bufImg.duplicate()
    m_bufMember = member("ViewBuffer")
    m_bufMember.image = m_viewImg
    m_bgRegPoint = point(0, 0)
    m_bufMember.regPoint = m_bgRegPoint
    m_viewImgSprite = sprite(reserveSprite(me.getID()))
    m_viewImgSprite.member = m_bufMember
    m_viewImgSprite.ink = 0
    m_viewImgSprite.loc = point(0, 0)
    m_viewImgSprite.locZ = -103
    m_viewImgSprite.cursor = 200
    m_viewImgSprite.width = m_bufMember.image.width
    m_viewImgSprite.height = m_bufMember.image.height
    m_softBuffer = createObject("SoftBuffer", "SoftBuffer Class")
    m_softBuffer.setBuffer(t_bufImg)
    m_ClearImage = t_bufImg.duplicate()
    m_softBuffer.useTransparentCopyClear(m_ClearImage, 50)
    receiveUpdate(me.getID())
    m_initialized = 1
  end if
  if getThread("minigame") <> 0 then
    getThread("minigame").getComponent().StartMinigameEngine()
  end if
end
on StageStart me, i_iTime
  m_bScoreSent = 0
  m_ar_hitList = []
  me.switchState(#nextlevel)
  m_iBonus = 1.0
  me.getInterface().StageStart()
  if m_iCurrentLevel = 0 then
    me.getInterface().updateScores([])
  end if
  me.getInterface().remainingFireWorkCount(m_stage.GetLevel().count - m_iShotCount)
end
on StageEnd me, i_iTime, i_ar_params
  if not m_bScoreSent then
    me.SendScore()
  end if
  tTopScore = [:]
  repeat with i = 0 to 14
    tTopScore.addProp(i_ar_params[i * 2 + 6], i_ar_params[i * 2 + 7])
  end repeat
  if m_stage.GetQualifiedPercent() < 100 then
    tRoundnum = 0
    tRank = i_ar_params[1]
    tLowestQual = i_ar_params[3]
    if i_ar_params[4] = 0 then
      if i_ar_params[2] = 1 then
        me.getInterface().ShowStageEnd(#qualified, tRoundnum, tTopScore, tRank, m_iScore, tLowestQual, i_iTime)
      else
        me.getInterface().ShowStageEnd(#disqualified, tRoundnum, tTopScore, tRank, m_iScore, tLowestQual, i_iTime)
      end if
    else
      me.getInterface().ShowStageEnd(#gameover, tRoundnum, tTopScore, tRank, m_iScore, VOID, i_iTime)
    end if
  end if
  m_iScore = i_ar_params[5]
  me.getInterface().setScore(m_iScore)
  me.RemoveActionSprites()
  me.switchState(#waitforserver)
end
on RemoveActionSprites me
  if not voidp(me.getInterface()) then
    repeat with i = 1 to me.getInterface().getFireWorksActionSprites().count
      me.getInterface().setFireworksActionSprite(i, point(-1000, -1000), VOID, 0)
    end repeat
  end if
end
on GetAvatarName me, a_iAvatarRef
  if getThread("minigame") <> 0 then
    t_rParticipant = getThread("minigame").getComponent().GetParticipantlist().getaProp(a_iAvatarRef)
    if listp(t_rParticipant) then
      return t_rParticipant[#name]
    else
      return EMPTY
    end if
  else
    return EMPTY
  end if
end
on GetAvatarFigureData me, a_iAvatarRef
  if getThread("minigame") <> 0 then
    t_rParticipant = getThread("minigame").getComponent().GetParticipantlist().getaProp(a_iAvatarRef)
    if listp(t_rParticipant) then
      return t_rParticipant[#figuredata]
    else
      return []
    end if
  else
    return []
  end if
end
on LoadStage me, i_sName, i_iVersion, i_ar_params
  if voidp(m_stage) then
    m_initialized = 0
    return error(me, "Fireworks client is in unprepared state!", #LoadStage)
  end if
  me.getInterface().HideStageEnd()
  m_iScore = integer(i_ar_params.getaProp("s"))
  me.getInterface().setScore(m_iScore)
  m_stage.LoadXML("stage." & i_sName & ".xml")
  m_stage.loadServerParameters(i_ar_params)
  me.getInterface().SetSelector(m_stage.GetSelectorContent())
  m_fIconSize = m_stage.GetVisualIconSize()
  m_maskMember = getMember(m_stage.GetVisualForegroundMask())
  m_selectorMember = getMember(m_stage.GetVisualInterfaceMask())
  m_flashMember = getMember(m_stage.GetVisualLightMask())
  m_maskSprite.member = m_maskMember
  if not voidp(m_maskMember) then
    m_maskSprite.width = m_maskMember.image.width
    m_maskSprite.height = m_maskMember.image.height
  end if
  m_selectorSprite.member = m_selectorMember
  t_bufImg = image((the stage).image.width, m_stage.GetVisualBufferHeight(), 24)
  t_bufImg.fill(0, 0, t_bufImg.width, t_bufImg.height, [#color: color(0, 0, 0)])
  m_viewImg = t_bufImg.duplicate()
  m_bufMember = member("ViewBuffer")
  m_bufMember.image = m_viewImg
  m_bgRegPoint = getMember(m_stage.GetVisualBackground()).regPoint
  m_bufMember.regPoint = m_bgRegPoint
  m_viewImgSprite.member = m_bufMember
  m_viewImgSprite.ink = 0
  m_viewImgSprite.loc = point(0, 0)
  m_viewImgSprite.cursor = 200
  m_viewImgSprite.width = m_viewImgSprite.member.image.width
  m_viewImgSprite.height = m_viewImgSprite.member.image.height
  m_softBuffer.setBuffer(t_bufImg)
  m_ClearImage = t_bufImg.duplicate()
  m_ClearImage.copyPixels(getMember(m_stage.GetVisualBackground()).image, rect(1, 1, 800, m_stage.GetVisualBufferHeight()), rect(1, 1, 800, m_stage.GetVisualBufferHeight()))
  m_softBuffer.useTransparentCopyClear(m_ClearImage, 30)
  m_particleSystem.setParticleLimit(m_stage.Get3DParticleLimit())
  m_particleSystem.setEmitterLimit(m_stage.Get3DEmitterLimit())
  m_particleSystem.setGravity(vector(m_stage.Get3DGravity(), 0, 0))
  fViewTheta = 0.0
  fViewOmega = 0.0
  fViewMu = m_stage.Get3DViewMu()
  pView = new(script("Simple 3D View Class"), fViewTheta, fViewOmega, fViewMu, m_stage.Get3DViewPlaneDistance())
  pView.setNearClipDistance(m_stage.Get3DNearClip())
  pView.setFarClipDistance(m_stage.Get3DFarClip())
  pPipeline.setView(pView)
  getThread("minigame").getHandler()._SendStageLoaded()
  me.switchState(#waitforserver)
  m_iShotCount = 0
  m_ar_currentCombination = []
end
on shootOne me, i_sStyle, i_vPos, i_iId
  tDirectionVector = vector(1000, random(m_stage.GetLaunchSidewaysRandom() * 2) - m_stage.GetLaunchSidewaysRandom(), -m_stage.GetLaunchZTilt() - random(m_stage.GetLaunchZRandom()))
  tDirectionVector.normalize()
  tBomb = m_rFireworksEngine.ShootAFirework(i_sStyle, i_vPos, tDirectionVector)
  tmember = VOID
  repeat with tIcon in m_stage.GetSelectorContent()
    if tIcon.name = i_sStyle then
      tmember = member("fw.type" & tIcon.type & ".aim")
    end if
  end repeat
  m_ar_fwList.append([#ref: tBomb, #icon: tmember, #style: i_sStyle, #id: i_iId])
  m_iShotCount = m_iShotCount + 1
  me.getInterface().remainingFireWorkCount(m_stage.GetLevel().count - m_iShotCount)
end
on switchState me, i_newstate
  m_iGameState = i_newstate
  m_fStateTime = 0.0
end
on getFireworksBetween me, i_fStart, i_fEnd
  tList = []
  repeat with tEntry in m_stage.GetLevel()
    tTime = tEntry[#t]
    if i_fStart <= tTime and tTime < i_fEnd then
      tList.append(tEntry)
    end if
  end repeat
  if m_tutorialmode then
    tBombs = getVariableValue("payload_types")
    if random(100) > 95 then
      tList.append([#f: tBombs[random(tBombs.count)], #pos: vector(-15, random(20) - 10, 10 - random(20)), #id: -1])
    end if
  end if
  return tList
end
on getLevelEnd me
  if not m_tutorialmode then
    t_ar_level = m_stage.GetLevel()
    tLastFirework = t_ar_level[t_ar_level.count]
    tFwStyle = getVariableValue(tLastFirework[#f])
    if voidp(tFwStyle) then
      error(me, tLastFirework[#f] & " variable is invalid.", #getLevelEnd)
    end if
    tMaxEmitterLife = 0.0
    tMaxParticleLife = 0.0
    repeat with tEmi in tFwStyle[#emitters]
      if tEmi[#life] > tMaxEmitterLife then
        tMaxEmitterLife = tEmi[#life]
      end if
      tParticleStyle = getVariableValue(tEmi[#style])
      if voidp(tParticleStyle) then
        error(me, tEmi[#style] & " variable is invalid.", #getLevelEnd)
      end if
      if tParticleStyle[#life] > tMaxParticleLife then
        tMaxParticleLife = tParticleStyle[#life]
      end if
    end repeat
    return tLastFirework[#t] + tFwStyle[#lagtime] + tMaxEmitterLife + tMaxParticleLife
  else
    return 180.0
  end if
end
on SetFlash me, i_bState
  if i_bState then
    m_flashSprite.member = m_flashMember
    if not voidp(m_flashMember) then
      m_flashSprite.width = m_flashMember.image.width
      m_flashSprite.height = m_flashMember.image.height
    end if
  else
    m_flashSprite.member = VOID
  end if
end
on SendStageEnd me
  if not m_bScoreSent then
    me.SendScore()
  end if
  tMsg = []
  executeMessage(#SendMinigameAction, 1, tMsg)
end
on SendScore me
  if m_ar_hitList.count > 0 then
    tMsg = []
    tMsg.append(m_ar_hitList.count)
    repeat with tHit in m_ar_hitList
      tMsg.append(tHit.hit)
      tMsg.append(tHit.selectedType)
      tMsg.append(tHit.id)
    end repeat
    tMsg.append(m_stage.GetChecksum())
    executeMessage(#SendMinigameAction, 3, tMsg)
    m_ar_hitList = []
  end if
end
on update me
  if m_prepared then
    tTime = the milliSeconds
    if m_iGameState = #start then
      m_iLastMilliseconds = tTime
    end if
    tDt = float(tTime - m_iLastMilliseconds) / 1000.0
    m_iLastMilliseconds = tTime
    if windowExists("Game_Status") then
      removeWindow("Game_Status")
    end if
    if m_initialized then
      tBrightness = m_flashSprite.blendLevel - m_stage.GetVisualFlashDim()
      if tBrightness < 0 then
        tBrightness = 0
      end if
      m_flashSprite.blendLevel = tBrightness
      tNextState = m_iGameState
      case m_iGameState of
        #waitforserver:
        #start:
          tNextState = #waitforserver
        #play:
          if m_rWriterSprite.member.image.width <> 0 then
            m_rWriterSprite.member.image = image(0, 0, 32)
          end if
          t_ar_newFireworks = me.getFireworksBetween(m_fStateTime, m_fStateTime + tDt)
          if t_ar_newFireworks.count > 0 then
            repeat with tBombDesc in t_ar_newFireworks
              me.shootOne(tBombDesc[#f], tBombDesc[#pos], tBombDesc[#id])
              m_rSoundPlayer.Shoot(getMember(m_rFireworksEngine.GetBombSound(tBombDesc[#f], #liftoff)), float(random(5)))
            end repeat
          end if
          t_ar_newFwList = []
          repeat with tFw in m_ar_fwList
            if not tFw[#ref].TimeToExplode() then
              t_ar_newFwList.append(tFw)
              next repeat
            end if
            if tFw[#ref].GetExploded() then
              me.SetFlash(1)
              m_flashSprite.blendLevel = m_stage.GetVisualFlashBrightness()
              m_rSoundPlayer.Boom(getMember(m_rFireworksEngine.GetBombSound(tFw[#style], #Explode)), float(random(5)))
              m_rSoundPlayer.Crowd(#positive)
              next repeat
            end if
            m_rSoundPlayer.Crowd(#negative)
          end repeat
          m_ar_fwList = t_ar_newFwList
          if m_fStateTime > m_fLevelEnd then
            me.SendStageEnd()
            m_bScoreSent = 1
            me.RemoveActionSprites()
            tNextState = #waitforserver
          end if
        #nextlevel:
          if not voidp(m_stage.GetLevel()) then
            me.getInterface().toggleStageInfo()
            m_iCurrentLevel = m_iCurrentLevel + 1
            tWriter = getWriter(m_sWriterName)
            t_sLevelText = m_stage.GetDescription() & RETURN & m_stage.GetDescription2()
            tImage = tWriter.render(t_sLevelText)
            m_rWriterSprite.member.image = tImage
            m_rWriterSprite.width = tImage.width
            m_rWriterSprite.height = tImage.height
            tNextState = #startlevel
          end if
        #startlevel:
          m_fLevelEnd = me.getLevelEnd()
          if m_fStateTime >= m_stage.GetStartTime() then
            me.getInterface().toggleStageInfo()
            tNextState = #play
            if getObject(#session).get("music") then
              m_rSoundPlayer.music(getMember(m_stage.GetMusic()))
            end if
          end if
        #end:
          tNextState = #gameover
        #gameover:
          if m_fStateTime > m_stage.GetLookFeelGameOverPause() then
            tNextState = #highscores
          end if
        #highscores:
          if m_fStateTime > m_stage.GetLookFeelHighScorePause() then
            tNextState = #exit
          end if
        #exit:
          m_initialized = 0
          me.UnprepareRoom()
          executeMessage(#SendMinigameAction, 2, [])
          tNextState = #postexit
        #postexit:

      end case
      m_fStateTime = m_fStateTime + tDt
      if tNextState <> m_iGameState then
        me.switchState(tNextState)
      end if
      if m_prepared then
        pView.setViewAngle(fViewTheta, fViewOmega)
        pPipeline.setView(pView)
        m_ar_visual = pPipeline.Process(m_particleSystem.getAllParticles())
        tScreenSizeX = (the stage).image.width
        tScreenSizeY = (the stage).image.height
        tCOP_X = tScreenSizeX / 2
        tCOP_Y = tScreenSizeY / 2
        m_softBuffer.clear()
        t_backBuffer = m_softBuffer.getImage()
        repeat with tVis in m_ar_visual
          t_spriteName = tVis[1]
          t_sprite = m_mp_sparkList[t_spriteName]
          tX = tVis[2].x + tCOP_X - t_sprite.getWidth() / 2
          tY = tVis[2].y + tCOP_Y - t_sprite.getHeight() / 2
          t_sprite.addPinBlit(tX, tY, t_backBuffer)
        end repeat
        m_bufMember.image = t_backBuffer
        m_bufMember.regPoint = m_bgRegPoint
        repeat with i = 1 to m_ar_fwList.count
          tFw = m_ar_fwList[i]
          tWorldPos = tFw[#ref].getPosition()
          tViewSpc = pView.transformToViewSpace(tWorldPos)
          if pView.testClip(tViewSpc) then
            tScreenPos = pView.transformToProjected(tViewSpc)
            tloc = point(tScreenPos.x + tCOP_X, tScreenPos.y + tCOP_Y)
            me.getInterface().setFireworksActionSprite(i, tloc, tFw[#icon], 1, m_fIconSize)
            me.getInterface().setFireworksActionSpriteVicinity(i, tFw[#ref].getAge() / tFw[#ref].GetLagTime())
            tPercentLeft = tFw[#ref].getAge() - (tFw[#ref].GetLagTime() - m_fWarningFlashTime)
            if tPercentLeft > 0.0 then
              me.getInterface().setWarningFlash(i, tPercentLeft / m_fWarningFlashTime)
              next repeat
            end if
            me.getInterface().setWarningFlash(i, 0.0)
          end if
        end repeat
        repeat with i = m_ar_fwList.count + 1 to me.getInterface().getFireWorksActionSprites().count
          me.getInterface().setFireworksActionSprite(i, point(-1000, -1000), VOID, 0, 1.0)
          me.getInterface().setWarningFlash(i, 0.0)
        end repeat
        me.getInterface().setScore(m_iScore)
      end if
    end if
  end if
end
on AddHit me, i_iAccuracy, i_bSelection, i_iType, i_iId, a_iHitType, i_iSelectedType
  tScore = i_iAccuracy
  if not i_bSelection then
    tScore = tScore / 4
  end if
  m_iScore = m_iScore + tScore
  m_ar_hitList.append([#accuracy: i_iAccuracy, #selected: i_bSelection, #type: i_iType, #id: i_iId, #hit: a_iHitType, #selectedType: i_iSelectedType])
  if a_iHitType = 5 then
    m_iBonus = m_iBonus + 0.5
    if m_iBonus > 3 then
      m_iBonus = 3.0
    end if
  else
    m_iBonus = 1.0
  end if
  if i_bSelection then
    me.CheckBonusCombination(i_iType)
  else
    m_ar_currentCombination = []
  end if
end
on CheckBonusCombination me, a_iType
  t_ar_combination = m_stage.GetBonusCombination()
  if t_ar_combination.count = m_ar_currentCombination.count then
    m_ar_currentCombination = []
  end if
  t_iCheckIndex = m_ar_currentCombination.count + 1
  if t_iCheckIndex <= t_ar_combination.count then
    if t_ar_combination[t_iCheckIndex] = a_iType then
      m_ar_currentCombination.append(a_iType)
      if t_ar_combination.count = m_ar_currentCombination.count then
      end if
    else
      m_ar_currentCombination = []
      t_iCheckIndex = 1
      if t_ar_combination[t_iCheckIndex] = a_iType then
        m_ar_currentCombination.append(a_iType)
      end if
    end if
  else
    m_ar_currentCombination = []
  end if
end
on EndGame me
  me.switchState(#end)
end
on GetFireWorkName me, i_index
  return m_ar_fwList[i_index][#style]
end
on GetFireworkId me, i_index
  return m_ar_fwList[i_index][#id]
end
on GetFireWorkRef me, i_index
  return m_ar_fwList[i_index][#ref]
end
on GetFireworkCount me
  return the count of m_ar_fwList
end
on GetFireworkEngine me
  return m_rFireworksEngine
end
on GetStage me
  return m_stage
end
on GetBonus me
  return m_iBonus
end
on GetComboStatus me
  return m_ar_currentCombination
end
on SetHighScores me, tNewRank, tScoreList
  m_iRank = tNewRank
  m_ar_scoreList = tScoreList
end
on getAllAvatarsInRoom me
  t_ar_avatars = [:]
  t_rIterator = getThread(#room).component._AccessRoom().GetIterator("avatar")
  repeat while 1
    t_rAvatar = t_rIterator.getToken()
    if voidp(t_rAvatar) then
      exit repeat
    end if
    t_sRef = t_rAvatar.GetParam("REF")
    t_ar_avatars[t_sRef] = t_rAvatar.GetVisual().GetOutlook()
    if not t_rIterator.NextToken() then
      exit repeat
    end if
  end repeat
  t_rIterator.clear()
  t_rIterator = VOID
  return t_ar_avatars
end