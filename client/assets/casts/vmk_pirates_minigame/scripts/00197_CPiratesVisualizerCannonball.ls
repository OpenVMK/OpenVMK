-- Script
property m_rSprite
property m_BIT_INVINCIBLE
property m_BIT_BROADSIDE
property m_BIT_SHRAPNEL
property m_rShrapnelMember
property m_rInvincibleMember
property m_rBroadsideMember
property m_rMGE
global g_profCannonballVisualizerAcc
global g_gfxCbNormal
global g_gfxCbRed
global g_gfxCbWhite
global g_gfxCbFire

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.member = g_gfxCbNormal
  m_rSprite.ink = 36
  m_rSprite.locZ = -49
  m_BIT_INVINCIBLE = 1
  m_BIT_BROADSIDE = 2
  m_BIT_SHRAPNEL = 3
  m_rShrapnelMember = g_gfxCbFire
  m_rInvincibleMember = g_gfxCbWhite
  m_rBroadsideMember = g_gfxCbRed
  m_rMGE = getThread("minigame").getComponent()
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  tTime = the milliSeconds
  tMyObject = me.getObject()
  tLastMove = tMyObject.GetParam("LastMove")
  tDt = (tTime - tLastMove) / 1000.0
  tGameParams = tMyObject.GetParam("GameParams")
  tVelocity = intvector(tGameParams[2], tGameParams[3], 0)
  tPos = me.getObject().GetParam("WorldPosition")
  if m_rMGE.getSyncState() then
    tPos = tPos.add(tVelocity.multiply(tDt / m_rMGE.GetSubturnSpacing()))
  end if
  tloc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  m_rSprite.loc = tloc
  tstate = tMyObject.GetParam("GameParams")[5]
  if TestBit(tstate, m_BIT_INVINCIBLE) then
    m_rSprite.member = m_rInvincibleMember
  else
    if TestBit(tstate, m_BIT_SHRAPNEL) then
      m_rSprite.member = m_rShrapnelMember
    else
      if TestBit(tstate, m_BIT_BROADSIDE) then
        m_rSprite.member = m_rBroadsideMember
      end if
    end if
  end if
  me.SprZToScreenSpace([m_rSprite], 0)
  g_profCannonballVisualizerAcc = g_profCannonballVisualizerAcc + (the milliSeconds - tTime)
end