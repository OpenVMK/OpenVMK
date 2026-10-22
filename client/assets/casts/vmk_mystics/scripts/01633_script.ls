-- Script
property m_rSprite
property m_rSprite2
property m_rFrame
property m_rAnimFrame
property m_iTileSize

on construct this
end
on deconstruct this
end
on Init this, t_rSprite
  trace("Init teacup renderer")
  this.m_rSprite = t_rSprite
  this.m_rAnimFrame = 0
  this.m_rSprite.flipV = 1
  t_rSprite.member = member("shot_000002")
  t_rSprite.width = t_rSprite.member.width * (this.m_iTileSize / 32)
  t_rSprite.height = t_rSprite.member.height * (this.m_iTileSize / 32)
end
on update this
  this.m_rFrame = this.m_rFrame + 1
  t_iDirection = 3
  t_bFlip = 0
  t_rFrameStr = EMPTY
  if not memberExists(t_rFrameStr) then
    t_rFrameStr = "null"
  end if
  this.m_rSprite.member = member(t_rFrameStr)
  this.m_rSprite.width = this.m_rSprite.member.width * (this.m_iTileSize / 32)
  this.m_rSprite.height = this.m_rSprite.member.height * (this.m_iTileSize / 32)
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