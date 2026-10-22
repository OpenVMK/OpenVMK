-- Script
property m_pSpriteRef
property m_fParticlesPerSecond
property m_fStartVelocity
property m_fAge
property m_fEmitterAgeLimit
property m_fConeAngle
property m_mp_particleParams
property m_removeFlag
property m_countIterator
property m_mtxSrc

on construct me
end
on deconstruct me
end
on initEmitter me, p_startVelocity, p_pps, p_coneAngle, p_emitterAgeLimit, P_mp_particleParams
  m_pSpriteRef = VOID
  m_fStartVelocity = 0.0
  m_fParticlesPerSecond = 0.0
  m_fAge = 0.0
  m_fConeAngle = 180.0
  m_fEmitterAgeLimit = 0.0
  m_removeFlag = 0
  m_countIterator = 0.0
  if the paramCount > 1 then
    if ilk(p_startVelocity, #number) then
      m_fStartVelocity = p_startVelocity
    end if
    if ilk(p_pps, #number) then
      m_fParticlesPerSecond = p_pps
    end if
    if ilk(p_coneAngle, #number) then
      m_fConeAngle = p_coneAngle
    end if
    if ilk(p_emitterAgeLimit, #number) then
      m_fEmitterAgeLimit = p_emitterAgeLimit
    end if
    if ilk(P_mp_particleParams, #propList) then
      m_mp_particleParams = P_mp_particleParams
    end if
  end if
  m_mtxSrc = script("Matrix Class")
end
on updateSpray me, p_dt, p_pParticleSystem
  m_fAge = m_fAge + p_dt
  if m_fEmitterAgeLimit > 0.0 and m_fAge > m_fEmitterAgeLimit then
    m_removeFlag = 1
    exit
  end if
  t_toWorld = me.getToWorldMatrix().duplicate()
  t_toWorld.setRow(4, [0, 0, 0, 1])
  m_countIterator = m_countIterator + m_fParticlesPerSecond * p_dt
  t_iCount = integer(m_fParticlesPerSecond * p_dt)
  m_countIterator = m_countIterator - t_iCount
  t_rotXMtx = new(m_mtxSrc, 4, 4)
  t_rotZMtx = new(m_mtxSrc, 4, 4)
  t_totalRotMtx = new(m_mtxSrc, 4, 4)
  repeat with i = 1 to t_iCount
    t_fRandom1 = float(random(100000000) - 50000000) / 50000000
    t_fRandom3 = float(random(100000000) - 50000000) / 50000000
    t_tempFwd = me.getTransform().getRight()
    t_rotXMtx.loadRotateX(t_fRandom1 * m_fConeAngle / 2)
    t_rotZMtx.loadRotateZ(t_fRandom3 * m_fConeAngle / 2)
    t_rotXMtx.multiply(t_rotZMtx, t_totalRotMtx)
    t_launchVector = t_totalRotMtx.transform(t_tempFwd)
    t_worldSpaceLaunchVector = t_toWorld.transform(t_launchVector)
    t_worldSpaceLaunchVector.normalize()
    t_worldSpaceLaunchVector = t_worldSpaceLaunchVector * m_fStartVelocity
    p_pParticleSystem.requestNewParticle(m_mp_particleParams[#spriteList], t_worldSpaceLaunchVector, m_mp_particleParams[#life], me.getPosition(), m_mp_particleParams[#randomAmount])
  end repeat
end
on getRemoveFlag me
  return m_removeFlag
end