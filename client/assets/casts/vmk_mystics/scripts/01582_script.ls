-- Script
property m_rSprite
property m_rFrame
property m_rAnimFrame
property m_iTileSize
property m_rShadowSpr

on construct t_iMagicFX
end
on deconstruct t_iMagicFX
end
on Init t_iMagicFX, t_rSprite
  trace("Init let it go renderer!")
  t_iMagicFX.m_rSprite = t_rSprite
  t_iMagicFX.m_rAnimFrame = 1
  t_rSprite.member = member("magic_flurry_1")
  t_rSprite.width = t_rSprite.member.width
  t_rSprite.height = t_rSprite.member.height
end
on update t_iMagicFX
  t_iMagicFX.m_rFrame = t_iMagicFX.m_rFrame + 1
  if t_iMagicFX.m_rFrame mod 4 = 0 then
    t_iMagicFX.m_rAnimFrame = t_iMagicFX.m_rAnimFrame mod 15 + 1
    t_rFrameStr = t_iMagicFX.m_rAnimFrame
    t_iMagicFX.m_rSprite.member = member("magic_flurry_" & t_rFrameStr)
    t_iMagicFX.m_rSprite.width = t_iMagicFX.m_rSprite.member.width * (t_iMagicFX.m_iTileSize / 32)
    t_iMagicFX.m_rSprite.height = t_iMagicFX.m_rSprite.member.height * (t_iMagicFX.m_iTileSize / 32)
  end if
  t_iMagicFX.m_rShadowSpr.blend = 50 + sin(t_iMagicFX.m_rFrame * 1.32499992847443) * 50
end
on getOffsetZ t_iMagicFX
  return 2
end
on SetParams t_iMagicFX, a_rParams
end
on SetAvatar t_iMagicFX, a_iMagicFx
  t_iMagicFX.m_rShadowSpr = a_iMagicFx.GetVisual().m_rShadowSpr
  t_iMagicFX.m_rShadowSpr.member = member("room_shadow_snowflake")
  t_iMagicFX.m_rShadowSpr.ink = 8
  t_iMagicFX.m_rShadowSpr.width = t_iMagicFX.m_rShadowSpr.member.width
  t_iMagicFX.m_rShadowSpr.height = t_iMagicFX.m_rShadowSpr.member.height
end
on endMagic t_iMagicFX
  t_iMagicFX.m_rShadowSpr.member = getMember("room_avatar_shadow")
  t_iMagicFX.m_rShadowSpr.width = t_iMagicFX.m_rShadowSpr.member.width
  t_iMagicFX.m_rShadowSpr.height = t_iMagicFX.m_rShadowSpr.member.height
  t_iMagicFX.m_rShadowSpr.ink = 39
  t_iMagicFX.m_rShadowSpr.blend = 50
end
on SetTileSize t_iMagicFX, a_iTileSize
  t_iMagicFX.m_iTileSize = a_iTileSize
end