-- Script
property m_rSprite
property m_vLocalPosition
property m_maxDiff
property m_HEALTH
property m_graphic
property m_ar_graphicTable
property m_rFlameSprite
property m_flameMember

on construct me
  m_rSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprite.member = VOID
  m_rSprite.ink = 36
  m_rSprite.locZ = -51
  m_vLocalPosition = VOID
  m_HEALTH = 1
  m_ar_graphicTable = []
  m_ar_graphicTable[1] = getmemnum("bridge")
  m_rFlameSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rFlameSprite.member = VOID
  m_rFlameSprite.ink = 36
  m_rFlameSprite.locZ = -50
  m_flameMember = VOID
  return 1
end
on deconstruct me
  getSpriteManager().releaseSprite(m_rSprite.spriteNum)
  getSpriteManager().releaseSprite(m_rFlameSprite.spriteNum)
  return 1
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tHealth = me.getObject().GetParam("GameParams")[m_HEALTH]
  m_rSprite.member = m_ar_graphicTable[1]
  m_rSprite.width = m_rSprite.member.width
  m_rSprite.height = m_rSprite.member.height
  m_rSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  m_rFlameSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  if me.getObject().GetParam("Killed") and not voidp(m_rFlameSprite.member) then
    m_rFlameSprite.member = m_flameMember
    m_rFlameSprite.width = m_rFlameSprite.member.width
    m_rFlameSprite.height = m_rFlameSprite.member.height
  end if
  me.SprZToScreenSpace([m_rSprite], 0)
end