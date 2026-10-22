-- Script
property m_particleSystem
property m_ar_fireworks
property m_ar_rocketParticles
property m_lastTime
property m_autoExplode

on construct me
  m_ar_fireworks = []
  m_ar_rocketParticles = []
  m_particleSystem = VOID
  receiveUpdate(me.getID())
  m_lastTime = the milliSeconds
  m_autoExplode = 1
end
on deconstruct me
  removeUpdate(me.getID())
end
on AddFirework me, i_payload
  m_ar_fireworks.append(i_payload)
  m_ar_rocketParticles.append(m_particleSystem.requestNewParticle(i_payload.GetRocketVisual(), vector(0, 0, 0), i_payload.GetLagTime(), i_payload.getPosition()))
end
on GetParticleParams i_sStyle
  tParams = getVariableValue(i_sStyle)
  return tParams
end
on SetParticleSystem me, i_rParticleSystem
  m_particleSystem = i_rParticleSystem
end
on SetAutoExplode me, i_bVal
  m_autoExplode = i_bVal
end
on ExplodeBomb me, i_rBomb, i_fPowerMod, i_fPPSMod, i_fSpreadMod, i_fLifeMod
  i_rBomb.SetExploded(1)
  t_ar_Emitters = i_rBomb.getEmitters()
  repeat with tExplosion in t_ar_Emitters
    tPower = tExplosion[#power]
    tPPS = tExplosion[#pps]
    tSpread = tExplosion[#spread]
    tLife = tExplosion[#life]
    if not voidp(i_fPowerMod) then
      tPower = tPower * i_fPowerMod
    end if
    if not voidp(i_fPPSMod) then
      tPPS = tPPS * i_fPPSMod
    end if
    if not voidp(i_fSpreadMod) then
      tSpread = tSpread * i_fSpreadMod
    end if
    if not voidp(i_fLifeMod) then
      tLife = tLife * i_fLifeMod
    end if
    t_rEmitter = m_particleSystem.requestNewEmitter(tPower, tPPS, tSpread, tLife, GetParticleParams(tExplosion[#style]))
    if t_rEmitter <> VOID then
      t_rEmitter.setPosition(i_rBomb.getPosition())
      t_rEmitter.AlignRight(i_rBomb.GetVelocity())
      i_rBomb.AddEmitterNode(t_rEmitter)
    end if
  end repeat
end
on update me
  t_currentTime = the milliSeconds
  t_deltaTime = float(t_currentTime - m_lastTime) * 0.813999950885773
  m_lastTime = t_currentTime
  repeat with i = 1 to m_ar_fireworks.count
    tBomb = m_ar_fireworks[i]
    tBomb.update(t_deltaTime, vector(-2.55656242370605, 0, 0))
    if not voidp(m_ar_rocketParticles[i]) then
      m_ar_rocketParticles[i].setPosition(tBomb.getPosition())
    end if
    if m_autoExplode and tBomb.TimeToExplode() and not tBomb.GetExploded() then
      me.ExplodeBomb(tBomb)
      if not voidp(m_ar_rocketParticles[i]) then
        m_ar_rocketParticles[i].SetRemoveFlag(1)
      end if
    end if
  end repeat
  t_ar_newBomblist = []
  t_ar_newRocketParticleList = []
  repeat with i = 1 to m_ar_fireworks.count
    tBomb = m_ar_fireworks[i]
    if not tBomb.TimeToRemove() then
      t_ar_newBomblist.append(tBomb)
      t_ar_newRocketParticleList.append(m_ar_rocketParticles[i])
    end if
  end repeat
  m_ar_fireworks = t_ar_newBomblist
  m_ar_rocketParticles = t_ar_newRocketParticleList
end