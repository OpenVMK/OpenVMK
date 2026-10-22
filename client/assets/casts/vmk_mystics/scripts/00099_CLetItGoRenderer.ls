-- Script
property m_rSprite
property m_rFrame
property m_rAnimFrame
property m_iTileSize
property m_rShadowSpr

on construct this
end
on deconstruct this
end
on Init this, t_rSprite
  trace("Init let it go renderer!")
  this.m_rSprite = t_rSprite
  this.m_rAnimFrame = 1
  t_rSprite.member = member("magic_flurry_1")
  t_rSprite.width = t_rSprite.member.width
  t_rSprite.height = t_rSprite.member.height
end
on update this
  this.m_rFrame = this.m_rFrame + 1
  if this.m_rFrame mod 4 = 0 then
    this.m_rAnimFrame = this.m_rAnimFrame mod 15 + 1
    t_rFrameStr = this.m_rAnimFrame
    this.m_rSprite.member = member("magic_flurry_" & t_rFrameStr)
    this.m_rSprite.width = this.m_rSprite.member.width * (this.m_iTileSize / 32)
    this.m_rSprite.height = this.m_rSprite.member.height * (this.m_iTileSize / 32)
  end if
  this.m_rShadowSpr.blend = 50 + sin(this.m_rFrame * 1.32499992847443) * 50
end
on getOffsetZ this
  return 2
end
on SetParams this, a_rParams
end
on SetAvatar this, a_rAvatar
  this.m_rShadowSpr = a_rAvatar.GetVisual().m_rShadowSpr
  this.m_rShadowSpr.member = member("room_shadow_snowflake")
  this.m_rShadowSpr.ink = 8
  this.m_rShadowSpr.width = this.m_rShadowSpr.member.width
  this.m_rShadowSpr.height = this.m_rShadowSpr.member.height
end
on endMagic this
  this.m_rShadowSpr.member = getMember("room_avatar_shadow")
  this.m_rShadowSpr.width = this.m_rShadowSpr.member.width
  this.m_rShadowSpr.height = this.m_rShadowSpr.member.height
  this.m_rShadowSpr.ink = 39
  this.m_rShadowSpr.blend = 50
end
on SetTileSize this, a_iTileSize
  this.m_iTileSize = a_iTileSize
end