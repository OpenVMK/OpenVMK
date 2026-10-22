-- Script
property m_rMbr
property m_rSpr
property m_rGlow
property m_iTeam
property m_iState
property m_iFrame
property m_iDir
property m_bFlip
property m_sMemname
property m_iCounter
property m_rOrgMember

on construct me
  m_rGlow = sprite(reserveSprite(me.getID()))
  m_rGlow.member = VOID
  m_rGlow.ink = 33
  m_rGlow.locZ = -49
  m_iCounter = 0
  m_iTeam = 1
  m_iState = 1
  m_iFrame = 0
  m_iDir = 4
  m_bFlip = 0
  m_rSpr = sprite(0)
  m_sMemname = "flee_ghst" & m_iTeam & "_" & m_iDir & "_" & m_iFrame
  m_rMyMbr = member(m_sMemname)
  m_rOrgMember = VOID
  return 1
end
on deconstruct me
  releaseSprite(m_rGlow.spriteNum)
  return 1
end
on Init me, i_iTeam, i_iDir
  case value(i_iTeam) of
    1:
      m_iTeam = 2
      m_rGlow.member = member("purpleGhost_glow")
    2:
      m_iTeam = 1
      m_rGlow.member = member("greenGhost_glow")

  end case
  m_rGlow.width = m_rGlow.member.width
  m_rGlow.height = m_rGlow.member.height
end
on GetShirtColor me
  case m_iTeam of
    1:
      return rgb("#FF5AB7")
    2:
      return rgb("#40FF31")

  end case
  return rgb("#FF5AB7")
end
on HideArrow me
end
on ShowHideAvatarName me
end
on update me, a_Spr
  if m_rSpr = sprite(0) then
    m_rOrgMember = a_Spr.member
  end if
  t_sMemName = "flee_ghst" & m_iTeam & "_" & m_iDir & "_" & m_iFrame
  if t_sMemName <> m_sMemname then
    m_sMemname = t_sMemName
    m_rSpr = a_Spr
    m_rMbr = member(m_sMemname)
    a_Spr.member = m_rMbr
    a_Spr.width = m_rMbr.width
    a_Spr.height = m_rMbr.height
    a_Spr.flipH = m_bFlip
  end if
  m_iCounter = m_iCounter + 1
  if m_iCounter mod 4 = 0 then
    m_iCounter = 0
    m_iFrame = m_iFrame + 1
    if m_iFrame > 3 then
      m_iFrame = 0
    end if
  end if
  if m_rSpr <> sprite(0) then
    if m_rGlow.visible = 0 then
      m_rGlow.visible = 1
    end if
    m_rGlow.loc = m_rSpr.loc
    m_rGlow.locZ = m_rSpr.locZ + 1
  end if
  return 1
end
on Release me
  m_rGlow.visible = 0
  m_rSpr.member = m_rOrgMember
  m_rSpr.width = m_rOrgMember.member.width
  m_rSpr.height = m_rOrgMember.member.height
  m_rSpr = sprite(0)
end
on Define me, a_mp_PartList
  put "HMAvatar #define"
end
on Action me, a_Ar_Data
  i_iDir = a_Ar_Data[1]
  case i_iDir of
    0:
      m_iDir = 0
      m_bFlip = 0
    1:
      m_iDir = 1
      m_bFlip = 0
    2:
      m_iDir = 2
      m_bFlip = 0
    3:
      m_iDir = 3
      m_bFlip = 0
    4:
      m_iDir = 4
      m_bFlip = 0
    5:
      m_iDir = 3
      m_bFlip = 1
    6:
      m_iDir = 2
      m_bFlip = 1
    7:
      m_iDir = 1
      m_bFlip = 1
    otherwise:
      m_iDir = 0
      m_bFlip = 1

  end case
end
on SetSpriteLoc me, i_vLoc
  if m_rSpr <> sprite(0) then
    m_rSpr.loc = point(i_vLoc.x, i_vLoc.y)
    m_rSpr.locZ = i_vLoc.z
  end if
end