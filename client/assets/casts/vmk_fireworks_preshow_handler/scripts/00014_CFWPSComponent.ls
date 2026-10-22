-- Score Script
property pView
property pPipeline
property fViewTheta
property fViewOmega
property fViewMu
property m_particleSystem
property m_rFireworksEngine
property m_softBuffer
property m_viewImg
property m_viewImgSprite
property m_bufMember
property m_ClearImage
property m_bgRegPoint
property m_mp_sparkList
property m_iLastMilliseconds
property m_disabled

on construct me
  m_particleSystem = VOID
  m_disabled = 0
  registerMessage(#room_ready, me.getID(), #initEngine)
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  removeObject(m_particleSystem.getID())
  removeObject(m_rFireworksEngine.getID())
  removeObject(m_softBuffer.getID())
  repeat with tSpark in m_mp_sparkList
    removeObject(tSpark.getID())
  end repeat
  releaseSprite(m_viewImgSprite.spriteNum)
  unregisterMessage(#room_ready, me.getID())
  DisableHighScore()
  return 1
end
on initEngine me
  if not m_disabled then
    if voidp(m_particleSystem) then
      if objectExists("Preshow.Particle.System") then
        removeObject("Preshow.Particle.System")
      end if
      m_particleSystem = createObject("Preshow.Particle.System", "Particle System Class")
      m_particleSystem.initParticleSystem()
      m_particleSystem.setParticleLimit(500)
      m_particleSystem.setEmitterLimit(5)
      m_particleSystem.setGravity(vector(-2.71281242370605, 0, 0))
      if objectExists("Preshow.FWEngine") then
        removeObject("Preshow.FWEngine")
      end if
      m_rFireworksEngine = createObject("Preshow.FWEngine", "CFireworksEngineInterface")
      m_rFireworksEngine.SetParticleSystem(m_particleSystem)
      m_rFireworksEngine.SetAutoExplode(1)
      fViewTheta = 0.0
      fViewOmega = 0.0
      fViewMu = 80
      pView = new(script("Simple 3D View Class"), fViewTheta, fViewOmega, fViewMu, 300)
      pView.setNearClipDistance(1)
      pView.setFarClipDistance(1500)
      pPipeline = new(script("3D Particle System Pipeline Class"))
      pPipeline.setView(pView)
      t_bufImg = image(getMember("background").image.width, getMember("background").image.height, 24)
      t_bufImg.copyPixels(getMember("background").image, rect(0, 0, t_bufImg.width, t_bufImg.height), getMember("background").image.rect)
      m_viewImg = t_bufImg.duplicate()
      m_bufMember = member("ViewBuffer")
      m_bufMember.image = m_viewImg
      m_bgRegPoint = point(0, 0)
      m_bufMember.regPoint = m_bgRegPoint
      m_viewImgSprite = sprite(reserveSprite(me.getID()))
      m_viewImgSprite.member = m_bufMember
      m_viewImgSprite.ink = 0
      m_viewImgSprite.loc = point(140, 0)
      m_viewImgSprite.locZ = -50000000
      m_viewImgSprite.width = m_bufMember.image.width
      m_viewImgSprite.height = m_bufMember.image.height
      if objectExists("Preshow.SoftBuffer") then
        removeObject("Preshow.SoftBuffer")
      end if
      m_softBuffer = createObject("Preshow.SoftBuffer", "SoftBuffer Class")
      m_softBuffer.setBuffer(t_bufImg)
      m_ClearImage = getMember("background").image.duplicate()
      m_softBuffer.useTransparentCopyClear(m_ClearImage, 30)
      t_ar_particleTypes = getVariableValue("particle_types")
      if voidp(t_ar_particleTypes) then
        error(me, "particle_types variable is invalid.", #construct)
      end if
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
              createObject("Preshow.fwspark:" & c, "SoftSprite Class")
              tSpark = getObject("Preshow.fwspark:" & c)
              tSpark.setImage(member(tSpr[#sprite]).image)
              m_mp_sparkList[tSpr[#sprite]] = tSpark
              c = c + 1
            end if
          end if
        end repeat
      end repeat
    end if
    receiveUpdate(me.getID())
    m_iLastMilliseconds = the milliSeconds
  end if
end
on ShootEventFirework me, a_ar_Params
  t_sStyle = EMPTY
  case a_ar_Params[1] of
    0:
      t_sStyle = "sparkle_ferris"
    1:
      t_sStyle = "magic_dawn"
    2:
      t_sStyle = "blue_whirlcombo"

  end case
  t_vPos = vector(a_ar_Params[2], a_ar_Params[3], a_ar_Params[4])
  t_vDirection = vector(a_ar_Params[5], a_ar_Params[6], a_ar_Params[7])
  t_vDirection.normalize()
  tBomb = m_rFireworksEngine.ShootAFirework(t_sStyle, t_vPos, t_vDirection)
end
on DisableFireworks me
  m_disabled = 1
  m_viewImgSprite.member = VOID
  me.getInterface().DisableButtons()
  removeUpdate(me.getID())
end
on EnableFireworks me
  m_disabled = 0
  m_viewImgSprite.member = m_bufMember
  me.getInterface().EnableButtons()
  receiveUpdate(me.getID())
end
on IsDisabled me
  return m_disabled
end
on update me
  if not m_disabled then
    tTime = the milliSeconds
    tDt = float(tTime - m_iLastMilliseconds) / 1000.0
    m_iLastMilliseconds = tTime
    pView.setViewAngle(fViewTheta, fViewOmega)
    pPipeline.setView(pView)
    t_ar_visual = pPipeline.Process(m_particleSystem.getAllParticles())
    m_softBuffer.clear()
    t_backBuffer = m_softBuffer.getImage()
    tScreenSizeX = (the stage).image.width
    tScreenSizeY = (the stage).image.height
    tCOP_X = tScreenSizeX / 2
    tCOP_Y = tScreenSizeY / 2
    repeat with i = 1 to t_ar_visual.count()
      t_spriteName = t_ar_visual[i][1]
      t_sprite = m_mp_sparkList[t_spriteName]
      tX = t_ar_visual[i][2].x + tCOP_X - t_sprite.getWidth() / 2 - 144
      tY = t_ar_visual[i][2].y + tCOP_Y - t_sprite.getHeight() / 2
      t_sprite.addPinBlit(tX, tY, t_backBuffer)
    end repeat
    m_bufMember.image = t_backBuffer
    m_bufMember.regPoint = m_bgRegPoint
  end if
end