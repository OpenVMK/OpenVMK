-- Script
property m_ar_emitters
property m_vPosition
property m_vVelocity
property m_fLagTime
property m_fAge
property m_fMaxEmitterAge
property m_bExploded
property m_ar_rocketVisual
property m_ar_activeEmitters

on new me
  m_ar_emitters = []
  m_vPosition = vector(0, 0, 0)
  m_vVelocity = vector(0, 0, 0)
  m_fLagTime = 0.0
  m_fAge = 0.0
  m_fMaxEmitterAge = 0.0
  m_bExploded = 0
  m_ar_rocketVisual = [:]
  m_ar_activeEmitters = []
  return me
end
on parsePayload me, i_mp_value, i_vDirectionNormal
  if voidp(i_vDirectionNormal) then
    m_vVelocity = vector(0, i_mp_value[#velocity], 0)
  else
    m_vVelocity = i_vDirectionNormal * i_mp_value[#velocity]
  end if
  m_fLagTime = float(i_mp_value[#lagtime])
  m_ar_emitters = i_mp_value[#emitters]
  repeat with tEmitter in m_ar_emitters
    if tEmitter[#life] > m_fMaxEmitterAge then
      m_fMaxEmitterAge = tEmitter[#life]
    end if
  end repeat
end
on TimeToExplode me
  return m_fAge >= m_fLagTime
end
on TimeToRemove me
  return m_fAge >= m_fLagTime + m_fMaxEmitterAge
end
on Explode me, i_rFireworkEngine, i_fPowerMod, i_fPPSMod, i_fSpreadMod, i_fLifeMod
  m_fLagTime = m_fAge
  i_rFireworkEngine.ExplodeBomb(me, i_fPowerMod, i_fPPSMod, i_fSpreadMod, i_fLifeMod)
end
on update me, i_dt, i_vDrag
  m_fAge = m_fAge + i_dt
  m_vPosition = m_vPosition + m_vVelocity * i_dt
  if not voidp(i_vDrag) then
    m_vVelocity = m_vVelocity + i_vDrag * i_dt
  end if
  repeat with tNode in m_ar_activeEmitters
    tNode.setPosition(m_vPosition)
  end repeat
end
on AddEmitterNode me, i_rNode
  m_ar_activeEmitters.append(i_rNode)
end
on SetExploded me, i_bVal
  m_bExploded = i_bVal
end
on SetRocketVisual me, i_spriteSeq
  m_ar_rocketVisual = i_spriteSeq
end
on setPosition me, i_vPosition
  m_vPosition = i_vPosition
end
on setVelocity me, i_vVelocity
  m_vVelocity = i_vVelocity
end
on setLagTime me, i_fLagTime
  m_fLagTime = i_fLagTime
end
on GetExploded me
  return m_bExploded
end
on getEmitters me
  return m_ar_emitters
end
on getAge me
  return m_fAge
end
on getPosition me
  return m_vPosition
end
on GetLagTime me
  return m_fLagTime
end
on GetRocketVisual me
  return m_ar_rocketVisual
end
on GetVelocity me
  return m_vVelocity
end