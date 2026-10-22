-- Script
property m_graphic
property m_rSprite
property m_ar_members
property m_bActive
property m_iBlend
property m_iCounter

on construct me
  m_iBlend = 0
  m_iCounter = 100
  m_bActive = 1
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_ar_members = []
  t_ar_memnames = ["hit.oops", "hit.ok", "hit.good", "hit.flawless", "hit.awesome"]
  repeat with tName in t_ar_memnames
    m_ar_members.append(getMember(tName))
  end repeat
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  removeUpdate(me.getID())
  return 1
end
on Activate me
  m_bActive = 1
  m_rSprite.visible = m_bActive
end
on inActivate me
  m_bActive = 0
  m_rSprite.visible = m_bActive
end
on GetActive me
  return m_bActive
end
on display me, tloc, tQuality
  tMem = m_ar_members.count * tQuality
  tMem = max(1, min(m_ar_members.count, tMem))
  put tQuality && tMem && m_ar_members.count
  if m_ar_members.count > 0 then
    m_iCounter = 100
    m_iBlend = 100
    m_rSprite.member = m_ar_members[tMem]
    m_rSprite.loc = tloc
    m_rSprite.width = m_rSprite.member.width
    m_rSprite.height = m_rSprite.member.height
    m_rSprite.blend = m_iBlend
  end if
end
on update me
  if m_iCounter > 0 then
    m_iCounter = m_iCounter - 10
  end if
  if m_iCounter <= 0 then
    if m_iBlend > 0 then
      m_iBlend = m_iBlend - 20
      m_rSprite.blend = m_iBlend
    end if
  end if
end
on getSprite me
  return m_rSprite
end
on GetHideables me
  return [the spriteNum of m_rSprite]
end