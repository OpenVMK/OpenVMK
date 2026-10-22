-- Script
property m_fwEngineCore
property m_refPayloadScript

on construct me
  m_refPayloadScript = script("CFireworkPayload")
  m_fwEngineCore = createObject(#random, "CFireworksEngineComponent")
end
on deconstruct me
  removeObject(m_fwEngineCore.getID())
end
on SetParticleSystem me, i_rPS
  m_fwEngineCore.SetParticleSystem(i_rPS)
end
on SetAutoExplode me, i_bVal
  m_fwEngineCore.SetAutoExplode(i_bVal)
end
on ExplodeBomb me, i_rBomb, i_fPowerMod, i_fPPSMod, i_fSpreadMod, i_fLifeMod
  m_fwEngineCore.ExplodeBomb(i_rBomb, i_fPowerMod, i_fPPSMod, i_fSpreadMod, i_fLifeMod)
end
on ShootAFirework me, i_sType, i_vPosition, i_vDirectionNormal
  tPayload = new(m_refPayloadScript)
  tContents = getVariableValue(i_sType)
  if voidp(tContents) then
    error(me, i_sType & " variable is invalid.", #ShootAFirework)
  end if
  tPayload.parsePayload(tContents, i_vDirectionNormal)
  tPayload.setPosition(i_vPosition)
  tPayload.SetRocketVisual([[#ms: 5000, #sprite: "Test Spark 4"], [#loop: 1]])
  m_fwEngineCore.AddFirework(tPayload)
  return tPayload
end
on GetBombSound me, i_sType, i_parameter
  tBombDesc = getVariableValue(i_sType)
  return tBombDesc[#sound][i_parameter]
end