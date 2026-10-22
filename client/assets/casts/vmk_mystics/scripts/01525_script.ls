-- Script
property m_rSprite
property m_rFrame
property m_rAnimFrame
property m_iTileSize

on construct t_aParams
end
on deconstruct t_aParams
end
on Init t_aParams, t_rSprite
  trace("Init blue inferno renderer!")
  t_aParams.m_rSprite = t_rSprite
  t_aParams.m_rAnimFrame = 0
  t_rSprite.ink = 33
  t_rSprite.member = member("magic_villain_1")
  t_rSprite.width = t_rSprite.member.width * (t_aParams.m_iTileSize / 32)
  t_rSprite.height = t_rSprite.member.height * (t_aParams.m_iTileSize / 32)
end
on update t_aParams
  t_aParams.m_rFrame = t_aParams.m_rFrame + 1
  t_aParams.m_rAnimFrame = (t_aParams.m_rAnimFrame + 1) mod 21
  t_rFrameStr = t_aParams.m_rAnimFrame
  t_aParams.m_rSprite.ink = 33
  t_aParams.m_rSprite.member = member("magic_villain_" & t_rFrameStr)
  t_aParams.m_rSprite.width = t_aParams.m_rSprite.member.width * (t_aParams.m_iTileSize / 32)
  t_aParams.m_rSprite.height = t_aParams.m_rSprite.member.height * (t_aParams.m_iTileSize / 32)
end
on getOffsetZ t_aParams
  return 2
end
on SetParams t_aParams, a_rParams
end
on SetAvatar t_aParams, a_aParams
end
on endMagic t_aParams
end
on SetTileSize t_aParams, a_iTileSize
  t_aParams.m_iTileSize = a_iTileSize
end