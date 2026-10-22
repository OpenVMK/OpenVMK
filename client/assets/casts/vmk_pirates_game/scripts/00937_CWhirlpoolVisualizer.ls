-- Script
property m_rSprite
property m_vLocalPosition
property m_maxDiff
property m_ar_frames
property m_iFrame

on construct me
  m_rSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprite.member = getMember("whirlpool_01")
  m_rSprite.ink = 33
  m_rSprite.locZ = getVariableValue("window.default.locz") - 103
  m_ar_frames = [getMember("whirlpool_01"), getMember("whirlpool_01"), getMember("whirlpool_01"), getMember("whirlpool_01"), getMember("whirlpool_02"), getMember("whirlpool_02"), getMember("whirlpool_02"), getMember("whirlpool_02"), getMember("whirlpool_03"), getMember("whirlpool_03"), getMember("whirlpool_03"), getMember("whirlpool_03"), getMember("whirlpool_04"), getMember("whirlpool_04"), getMember("whirlpool_04"), getMember("whirlpool_04"), getMember("whirlpool_05"), getMember("whirlpool_05"), getMember("whirlpool_05"), getMember("whirlpool_05"), getMember("whirlpool_06"), getMember("whirlpool_06"), getMember("whirlpool_06"), getMember("whirlpool_06"), getMember("whirlpool_07"), getMember("whirlpool_07"), getMember("whirlpool_07"), getMember("whirlpool_07"), getMember("whirlpool_08"), getMember("whirlpool_08"), getMember("whirlpool_08"), getMember("whirlpool_08")]
  m_iFrame = 1
  m_vLocalPosition = VOID
  return 1
end
on deconstruct me
  getSpriteManager().releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tdir = me.getObject().GetParam("Direction") + 1
  m_rSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  m_rSprite.member = m_ar_frames[m_iFrame]
  m_rSprite.width = m_rSprite.member.width
  m_rSprite.height = m_rSprite.member.height
  m_iFrame = m_iFrame + 1
  if m_iFrame > m_ar_frames.count then
    m_iFrame = 1
  end if
  me.SprZToScreenSpace([m_rSprite], 0)
end