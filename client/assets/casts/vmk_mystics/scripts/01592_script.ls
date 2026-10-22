-- Script
property m_rSprite
property m_rFrame
property m_rAnimFrame
property m_iTileSize

on construct this
end
on deconstruct this
end
on Init this, t_rSprite
  trace("Init rob renderer")
  this.m_rSprite = t_rSprite
  this.m_rAnimFrame = 0
  this.m_rSprite.flipV = 1
  t_rSprite.member = member("shot_000002")
  t_rSprite.width = t_rSprite.member.width * (this.m_iTileSize / 32)
  t_rSprite.height = t_rSprite.member.height * (this.m_iTileSize / 32)
end
on update this
  this.m_rFrame = this.m_rFrame + 1
  t_rFrameStr = "shot_000"
  if m_rAnimFrame < 10 then
    t_rFrameStr = t_rFrameStr & "0"
  end if
  if m_rAnimFrame < 100 then
    t_rFrameStr = t_rFrameStr & "0"
  end if
  t_rFrameStr = t_rFrameStr & m_rAnimFrame
  if m_rAnimFrame < 3 then
    t_rFrameStr = "shot_000002"
  end if
  this.m_rSprite.member = member(t_rFrameStr)
  this.m_rSprite.width = this.m_rSprite.member.width * (this.m_iTileSize / 32)
  this.m_rSprite.height = this.m_rSprite.member.height * (this.m_iTileSize / 32)
  this.m_rAnimFrame = (this.m_rAnimFrame + 1) mod 136
end
on getOffsetZ this
  return 2
end
on SetParams this, a_rParams
end
on SetAvatar this, a_rAvatar
end
on endMagic this
end
on SetTileSize this, a_iTileSize
  this.m_iTileSize = a_iTileSize
end