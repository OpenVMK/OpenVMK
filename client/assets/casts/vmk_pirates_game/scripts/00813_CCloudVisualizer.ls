-- Script
property m_rSprite
property m_rShadowSprite

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.member = getMember("cloud_day")
  m_rSprite.locZ = -40
  m_rSprite.loc = point(0, 0)
  m_rSprite.width = 160
  m_rSprite.height = 80
  m_rSprite.ink = 0
  m_rShadowSprite = sprite(reserveSprite(me.getID()))
  m_rShadowSprite.member = getMember("cloud_day_shadow")
  m_rShadowSprite.locZ = -51
  m_rShadowSprite.loc = point(0, 0)
  m_rShadowSprite.width = 160
  m_rShadowSprite.height = 80
  m_rShadowSprite.ink = 0
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  releaseSprite(m_rShadowSprite.spriteNum)
  return 1
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tProjPos = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  m_rSprite.loc = tProjPos
  m_rShadowSprite.loc = point(tProjPos.locH + 50, tProjPos.locV + 150)
  me.SprZToFixed([m_rSprite], vector(500, 500, 15000))
  me.SprZToFixed([m_rShadowSprite], vector(500, 500, 10000))
end