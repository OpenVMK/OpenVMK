-- Script
property m_rSprite
property m_vLocalPosition
property m_maxDiff
property m_sineOffset1
property m_sineOffset2
property m_ammoGraphic
property m_healthGraphic
global g_gfxPickupAmmo
global g_gfxPickupHealth

on construct me
  m_rSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprite.member = VOID
  m_rSprite.ink = 36
  m_rSprite.locZ = -51
  m_healthGraphic = g_gfxPickupHealth
  m_ammoGraphic = g_gfxPickupAmmo
  m_vLocalPosition = VOID
  return 1
end
on deconstruct me
  getSpriteManager().releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tdir = me.getObject().GetParam("Direction") + 1
  ttype = me.getObject().GetParam("GameParams")[1]
  m_sineOffset2 = m_sineOffset2 + 0.03
  if m_sineOffset2 > 2.0 * PI then
    m_sineOffset2 = 0.0
  end if
  tWaveOffset = sin(tPos.x / 2300 + m_sineOffset2) * 100
  m_rSprite.loc = ProjectAxonometricPosition(point(tPos.x + tWaveOffset, tPos.y + tWaveOffset))
  if ttype = 1 then
    if m_rSprite.member <> m_ammoGraphic then
      m_rSprite.member = m_ammoGraphic
    end if
  else
    if ttype = 2 then
      if m_rSprite.member <> m_healthGraphic then
        m_rSprite.member = m_healthGraphic
      end if
    end if
  end if
  me.SprZToScreenSpace([m_rSprite], 0)
end