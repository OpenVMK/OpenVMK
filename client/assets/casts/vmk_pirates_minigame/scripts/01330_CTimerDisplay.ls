-- Script
property m_rSprite
property m_rMember

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rMember = member(createMember("piratestimer", #text))
  m_rMember.fontSize = 30
  m_rMember.font = "Folio BoldCondensed *"
  m_rMember.text = "00:00"
  m_rSprite.member = VOID
  m_rSprite.loc = point((the stage).image.width - 70, 10)
  m_rSprite.locZ = 0
  m_rSprite.ink = 36
  m_rSprite.foreColor = color(250, 250, 250)
  m_rSprite.backColor = color(0, 0, 0)
  return 1
end
on deconstruct me
  removeMember("piratestimer")
  releaseSprite(m_rSprite.spriteNum)
  return 1
end
on show me, a_iSeconds
  tMinutes = a_iSeconds / 60
  tSeconds = a_iSeconds - 60 * tMinutes
  tText = EMPTY
  if tMinutes < 10 then
    tText = "0" & tMinutes
  else
    tText = string(tMinutes)
  end if
  tText = tText & ":"
  if tSeconds < 10 then
    tText = tText & "0" & tSeconds
  else
    tText = tText & string(tSeconds)
  end if
  m_rMember.text = tText
  if m_rSprite.member <> m_rMember then
    m_rSprite.member = m_rMember
  end if
  if a_iSeconds > 30 then
    m_rSprite.color = color(250, 250, 250)
  else
    m_rSprite.color = color(250, 50, 50)
  end if
end
on hide me
  m_rSprite.member = VOID
end