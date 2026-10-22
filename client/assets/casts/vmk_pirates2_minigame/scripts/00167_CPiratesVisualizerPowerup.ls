-- Script
property m_rSprite
property m_vLocalPosition
property m_maxDiff
property m_sineOffset1
property m_sineOffset2
property m_ammoGraphic
property m_ammoGoldenGraphic
property m_healthGraphic
property m_flagGraphic1
property m_flagGraphic2
global g_gfxPickupAmmo
global g_gfxPickupAmmoGolden
global g_gfxPickupHealth
global g_gfxPickupFlag1
global g_gfxPickupFlag2

on construct me
  m_rSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprite.member = VOID
  m_rSprite.ink = 36
  m_rSprite.locZ = -51
  m_healthGraphic = g_gfxPickupHealth
  m_ammoGraphic = g_gfxPickupAmmo
  m_ammoGoldenGraphic = g_gfxPickupAmmoGolden
  m_flagGraphic1 = g_gfxPickupFlag1
  m_flagGraphic2 = g_gfxPickupFlag2
  m_vLocalPosition = VOID
  return 1
end
on deconstruct me
  getSpriteManager().releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tTeam = me.getObject().GetParam("Team").value
  tdir = me.getObject().GetParam("Direction") + 1
  ttype = me.getObject().GetParam("GameParams")[1]
  tstate = me.getObject().GetParam("GameParams")[2]
  m_sineOffset2 = m_sineOffset2 + 1.23999989032745
  if m_sineOffset2 > 2.0 * PI then
    m_sineOffset2 = 0.0
  end if
  tWaveOffset = sin(tPos.x / 2300 + m_sineOffset2) * 100
  m_rSprite.loc = ProjectAxonometricPosition(point(tPos.x + tWaveOffset, tPos.y + tWaveOffset))
  if ttype = 1 then
    if TestBit(tstate, 1) then
      if m_rSprite.member <> m_ammoGoldenGraphic then
        m_rSprite.member = m_ammoGoldenGraphic
        m_rSprite.width = m_rSprite.member.width
        m_rSprite.height = m_rSprite.member.height
      end if
    else
      if m_rSprite.member <> m_ammoGraphic then
        m_rSprite.member = m_ammoGraphic
        m_rSprite.width = m_rSprite.member.width
        m_rSprite.height = m_rSprite.member.height
      end if
    end if
  else
    if ttype = 2 then
      if m_rSprite.member <> m_healthGraphic then
        m_rSprite.member = m_healthGraphic
        m_rSprite.width = m_rSprite.member.width
        m_rSprite.height = m_rSprite.member.height
      end if
    else
      if ttype = 3 then
        if tTeam = 1 then
          if m_rSprite.member <> m_flagGraphic1 then
            m_rSprite.member = m_flagGraphic1
            m_rSprite.width = m_rSprite.member.width
            m_rSprite.height = m_rSprite.member.height
          end if
        else
          if m_rSprite.member <> m_flagGraphic2 then
            m_rSprite.member = m_flagGraphic2
            m_rSprite.width = m_rSprite.member.width
            m_rSprite.height = m_rSprite.member.height
          end if
        end if
      end if
    end if
  end if
  me.SprZToScreenSpace([m_rSprite], 0)
end