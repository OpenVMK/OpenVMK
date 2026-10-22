-- Script
property m_particlePool
property m_emitterPool
property m_newParticles
property m_newEmitters
property m_particleLimit
property m_emitterLimit
property m_particleSrc
property m_lastTime
property m_gravity
property m_rootObject

on construct me
  m_particlePool = []
  m_emitterPool = []
  m_newParticles = []
  m_newEmitters = []
  m_particleLimit = 1000
  m_emitterLimit = 10
  m_particleSrc = script("Particle Class")
  m_rootObject = createObject(#random, "3D Object Class")
  m_rootObject.initObject()
end
on deconstruct me
  removeObject(m_rootObject.getID())
end
on initParticleSystem me
  m_lastTime = the milliSeconds
  m_gravity = vector(0, -2.55656242370605, 0)
  receiveUpdate(me.getID())
end
on requestNewParticle me, i_spriteSeq, i_launchVector, i_ageLimit, i_position, i_randomAmount
  t_newParticle = VOID
  if m_particlePool.count() + m_newParticles.count() < m_particleLimit then
    t_newParticle = m_particleSrc.new(i_spriteSeq, i_launchVector, i_ageLimit, i_position, i_randomAmount)
    m_newParticles.append(t_newParticle)
  end if
  return t_newParticle
end
on requestNewEmitter me, i_startVelocity, i_pps, i_coneAngle, i_emitterAgeLimit, i_particleParams
  t_newEmitter = VOID
  if m_emitterPool.count() + m_newEmitters.count() < m_emitterLimit then
    t_newEmitter = createObject(#random, "3D Object Class", "Emitter Class")
    if not t_newEmitter then
      put "Error creating emitter"
      exit
    end if
    t_newEmitter.initObject()
    t_newEmitter.setParent(m_rootObject)
    t_newEmitter.initEmitter(i_startVelocity, i_pps, i_coneAngle, i_emitterAgeLimit, i_particleParams)
    m_emitterPool.append(t_newEmitter)
  end if
  return t_newEmitter
end
on update me
  t_currentTime = the milliSeconds
  t_deltaTime = float(t_currentTime - m_lastTime) / 1000.0
  m_lastTime = t_currentTime
  t_newParticlePool = []
  repeat with i = 1 to m_particlePool.count()
    if not m_particlePool[i].getRemoveFlag() then
      t_newParticlePool.append(m_particlePool[i])
    end if
  end repeat
  m_particlePool = t_newParticlePool
  t_newEmitterPool = []
  repeat with i = 1 to m_emitterPool.count()
    if not m_emitterPool[i].getRemoveFlag() then
      t_newEmitterPool.append(m_emitterPool[i])
    end if
  end repeat
  m_emitterPool = t_newEmitterPool
  repeat with i = 1 to m_newParticles.count()
    m_particlePool.append(m_newParticles[i])
  end repeat
  repeat with i = 1 to m_newEmitters.count()
    m_emitterPool.append(m_newEmitters[i])
  end repeat
  m_newParticles = []
  m_newEmitters = []
  t_gravityPull = m_gravity * t_deltaTime
  call(#updateParticle, m_particlePool, t_deltaTime, t_gravityPull)
  call(#updateSpray, m_emitterPool, t_deltaTime, me)
end
on setParticleLimit me, i_limit
  m_particleLimit = i_limit
end
on setEmitterLimit me, i_limit
  m_emitterLimit = i_limit
end
on setGravity me, i_vGravity
  m_gravity = i_vGravity
end
on getAllParticles me
  return m_particlePool
end
on getParticleCount me
  return m_particlePool.count()
end
on getEmitterCount me
  return m_emitterPool.count()
end