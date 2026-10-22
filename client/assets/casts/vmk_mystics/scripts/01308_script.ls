-- Script
property m_rSprite
property m_rFrame
property m_rAnimFrame
property m_iTileSize

on construct t_iMagicFX
end
on deconstruct t_iMagicFX
end
on Init t_iMagicFX, t_rSprite
  trace("Init fw renderer")
  t_iMagicFX.m_rSprite = t_rSprite
  t_iMagicFX.m_rAnimFrame = 0
  t_rSprite.member = member("fw_1")
  t_rSprite.width = t_rSprite.member.width * (t_iMagicFX.m_iTileSize / 32)
  t_rSprite.height = t_rSprite.member.height * (t_iMagicFX.m_iTileSize / 32)
end
on update t_iMagicFX
  t_iMagicFX.m_rFrame = t_iMagicFX.m_rFrame + 1
  if t_iMagicFX.m_rFrame mod 4 = 0 then
    t_iMagicFX.m_rAnimFrame = (t_iMagicFX.m_rAnimFrame + 1) mod 25
    t_rFrameStr = t_iMagicFX.m_rAnimFrame + 1
    t_iMagicFX.m_rSprite.member = member("fw_" & t_rFrameStr)
    t_iMagicFX.m_rSprite.width = t_iMagicFX.m_rSprite.member.width * (t_iMagicFX.m_iTileSize / 32)
    t_iMagicFX.m_rSprite.height = t_iMagicFX.m_rSprite.member.height * (t_iMagicFX.m_iTileSize / 32)
  end if
end
on getOffsetZ t_iMagicFX
  return 2
end
on SetParams t_iMagicFX, a_rParams
end
on SetAvatar t_iMagicFX, a_iMagicFx
end
on endMagic t_iMagicFX
end
on SetTileSize t_iMagicFX, a_iTileSize
  t_iMagicFX.m_iTileSize = a_iTileSize
end