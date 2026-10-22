-- Script
property m_rSprite
property m_rFlameSprite
property m_flameMember
property m_vLocalPosition
property m_maxDiff

on construct me
  m_rSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprite.member = getMember("turret_island")
  m_rSprite.ink = 36
  m_rSprite.locZ = -51
  m_rFlameSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rFlameSprite.member = VOID
  m_rFlameSprite.ink = 36
  m_rFlameSprite.locZ = -50
  m_vLocalPosition = VOID
  m_flameMember = getmemnum("turret_1_damage")
  return 1
end
on deconstruct me
  getSpriteManager().releaseSprite(m_rSprite.spriteNum)
  getSpriteManager().releaseSprite(m_rFlameSprite.spriteNum)
  return 1
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tdir = me.getObject().GetParam("Direction") + 1
  m_rSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  m_rFlameSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  if me.getObject().GetParam("Killed") and not voidp(m_rFlameSprite.member) then
    m_rFlameSprite.member = m_flameMember
  end if
  me.SprZToScreenSpace([m_rSprite, m_rFlameSprite], 0)
end