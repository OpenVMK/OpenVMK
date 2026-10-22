-- Script
property m_rSprite
property m_rFrame
property m_rAnimFrame
property m_iTileSize
property m_rShadowSpr

on construct t_aParams
end
on deconstruct t_aParams
end
on Init t_aParams, t_rSprite
  trace("Init let it go renderer!")
  t_aParams.m_rSprite = t_rSprite
  t_aParams.m_rAnimFrame = 1
  t_rSprite.member = member("magic_flurry_1")
  t_rSprite.width = t_rSprite.member.width
  t_rSprite.height = t_rSprite.member.height
end
on update t_aParams
  t_aParams.m_rFrame = t_aParams.m_rFrame + 1
  if t_aParams.m_rFrame mod 4 = 0 then
    t_aParams.m_rAnimFrame = t_aParams.m_rAnimFrame mod 15 + 1
    t_rFrameStr = t_aParams.m_rAnimFrame
    t_aParams.m_rSprite.member = member("magic_flurry_" & t_rFrameStr)
    t_aParams.m_rSprite.width = t_aParams.m_rSprite.member.width * (t_aParams.m_iTileSize / 32)
    t_aParams.m_rSprite.height = t_aParams.m_rSprite.member.height * (t_aParams.m_iTileSize / 32)
  end if
  t_aParams.m_rShadowSpr.blend = 50 + sin(t_aParams.m_rFrame * 1.32499992847443) * 50
end
on getOffsetZ t_aParams
  return 2
end
on SetParams t_aParams, a_rParams
end
on SetAvatar t_aParams, a_iMagicFx
  t_aParams.m_rShadowSpr = a_iMagicFx.GetVisual().m_rShadowSpr
  t_aParams.m_rShadowSpr.member = member("room_shadow_snowflake")
  t_aParams.m_rShadowSpr.ink = 8
  t_aParams.m_rShadowSpr.width = t_aParams.m_rShadowSpr.member.width
  t_aParams.m_rShadowSpr.height = t_aParams.m_rShadowSpr.member.height
end
on endMagic t_aParams
  t_aParams.m_rShadowSpr.member = getMember("room_avatar_shadow")
  t_aParams.m_rShadowSpr.width = t_aParams.m_rShadowSpr.member.width
  t_aParams.m_rShadowSpr.height = t_aParams.m_rShadowSpr.member.height
  t_aParams.m_rShadowSpr.ink = 39
  t_aParams.m_rShadowSpr.blend = 50
end
on SetTileSize t_aParams, a_iTileSize
  t_aParams.m_iTileSize = a_iTileSize
end