-- Script
property m_rGlow
property m_rSprite
property m_rShadowSpr
property m_iType
property m_sMood
property m_iDirection
property m_iFrame
property m_bFlip
property m_iTimer
property m_ar_framesCache

on construct me
  m_ar_framesCache = [:]
  m_rGlow = sprite(reserveSprite(me.getID()))
  m_rGlow.member = VOID
  m_rGlow.ink = 33
  m_rGlow.locZ = -49
  m_rShadowSpr = VOID
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.member = VOID
  m_rSprite.ink = 36
  m_rSprite.locZ = -49
  m_iColor = VOID
  m_sMood = "idl"
  m_iDirection = 0
  m_bFlip = 0
  m_iFrame = 0
  m_iTimer = 0
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  releaseSprite(m_rGlow.spriteNum)
  if not voidp(m_rShadowSpr) then
    releaseSprite(m_rShadowSpr.spriteNum)
  end if
  return 1
end
on setDirection me, i_iDir, i_iMood
  case i_iDir of
    0:
      m_iDirection = 0
      m_bFlip = 0
    1:
      m_iDirection = 1
      m_bFlip = 0
    2:
      m_iDirection = 2
      m_bFlip = 0
    3:
      m_iDirection = 3
      m_bFlip = 0
    4:
      m_iDirection = 4
      m_bFlip = 0
    5:
      m_iDirection = 3
      m_bFlip = 1
    6:
      m_iDirection = 2
      m_bFlip = 1
    7:
      m_iDirection = 1
      m_bFlip = 1
    otherwise:
      m_iDirection = 0
      m_bFlip = 1

  end case
  case i_iMood of
    0:
      m_sMood = "idl"
    1:
      m_sMood = "chs"
    2:
      m_sMood = "flee"
    otherwise:
      m_sMood = "idl"

  end case
end
on selectSprite me
  case me.getObject().GetParam("Team") of
    1:
      m_iType = 1
      m_rGlow.member = member("greenGhost_glow")
      m_rGlow.width = m_rGlow.member.width
      m_rGlow.height = m_rGlow.member.height
    2:
      m_iType = 2
      m_rGlow.member = member("purpleGhost_glow")
      m_rGlow.width = m_rGlow.member.width
      m_rGlow.height = m_rGlow.member.height

  end case
  if voidp(m_rShadowSpr) then
    m_rShadowSpr = sprite(reserveSprite(me.getID()))
    m_rShadowSpr.member = getMember("room_avatar_shadow")
    m_rShadowSpr.width = m_rShadowSpr.member.width
    m_rShadowSpr.height = m_rShadowSpr.member.height
    m_rShadowSpr.ink = 39
    m_rShadowSpr.blend = 50
  end if
end
on update me
  if voidp(m_iType) then
    me.selectSprite()
  end if
  t_sMemName = m_sMood & "_ghst" & m_iType & "_" & m_iDirection & "_" & m_iFrame
  t_rMem = m_ar_framesCache.getaProp(t_sMemName)
  if voidp(t_rMem) then
    t_rMem = member(t_sMemName)
    m_ar_framesCache[t_sMemName] = t_rMem
  else
    m_rSprite.width = t_rMem.image.width
    m_rSprite.height = t_rMem.image.height
  end if
  m_rSprite.member = t_rMem
  m_rSprite.width = t_rMem.image.width
  m_rSprite.height = t_rMem.image.height
  m_rSprite.flipH = m_bFlip
  tloc = me.getObject().GetScrPos()
  m_rSprite.loc = point(tloc.x, tloc.y)
  m_rSprite.locZ = tloc.z
  m_rGlow.loc = point(tloc.x, tloc.y)
  m_rGlow.locZ = tloc.z + 1
  m_rShadowSpr.loc = point(tloc.x, tloc.y)
  m_rShadowSpr.locZ = tloc.z - 1
  m_iTimer = m_iTimer + 1
  if m_iTimer mod 3 = 0 then
    m_iFrame = m_iFrame + 1
    if m_iFrame > 3 then
      m_iFrame = 0
    end if
  end if
end