-- Script
property m_rSprite

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.member = getMember("moonbeam")
  m_rSprite.ink = 33
  m_rSprite.locZ = -49
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tloc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  m_rSprite.loc = tloc
  me.SprZToFixed([m_rSprite], vector(500, 500, 15000))
end