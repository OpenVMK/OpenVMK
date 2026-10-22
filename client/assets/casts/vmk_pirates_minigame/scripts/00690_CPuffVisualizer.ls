-- Script
property m_sprite

on construct me
  m_sprite = sprite(reserveSprite(me.getID()))
  m_sprite.member = VOID
  m_sprite.locZ = -45
  m_sprite.loc = point(0, 0)
  return 1
end
on deconstruct me
  releaseSprite(m_sprite.spriteNum)
  return 1
end
on update me
  tAge = me.getObject().GetParam("Age")
  ttype = me.getObject().GetParam("Type")
  tSize = me.getObject().GetParam("Size")
  tFrame = tAge / 2 + 1
  t_ar_frames = getVariableValue(ttype).framelist
  if tFrame > t_ar_frames.count then
    tFrame = t_ar_frames.count
  end if
  tPuffFrame = t_ar_frames[tFrame]
  m_sprite.member = getMember(tPuffFrame)
  m_sprite.loc = me.getObject().GetParam("Position")
  m_sprite.ink = getVariableValue(ttype).ink
  if not voidp(tSize) then
    m_sprite.width = getMember(tPuffFrame).image.width * tSize
    m_sprite.height = getMember(tPuffFrame).image.height * tSize
  end if
  me.SprZToFixed([m_sprite], vector(500, 500, 5000))
end