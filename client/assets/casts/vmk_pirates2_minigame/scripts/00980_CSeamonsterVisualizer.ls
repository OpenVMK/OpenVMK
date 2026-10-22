-- Script
property m_rSprite
property m_vLocalPosition
property m_maxDiff
property m_ar_frames
property m_bFlip
property m_attackFrame
property m_ATTACK_BIT
property m_bMirror

on construct me
  m_rSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprite.member = getMember("seamonster_06")
  m_rSprite.ink = 36
  m_rSprite.locZ = -49
  m_bMirror = 0
  m_ATTACK_BIT = 1
  m_ar_frames = ["seamonster_06", "seamonster_10", "seamonster_10", "seamonster_12", "seamonster_12", "seamonster_14", "seamonster_14", "seamonster_18", "seamonster_18", "seamonster_20", "seamonster_20", "seamonster_22", "seamonster_22", "seamonster_24", "seamonster_24", "seamonster_26", "seamonster_26", "seamonster_28", "seamonster_28", "seamonster_30", "seamonster_30", "seamonster_40", "seamonster_40", "seamonster_38", "seamonster_38", "seamonster_38", "seamonster_38", "seamonster_40", "seamonster_40", "seamonster_40", "seamonster_40", "seamonster_38", "seamonster_38", "seamonster_38", "seamonster_38", "seamonster_40", "seamonster_40", "seamonster_40", "seamonster_40", "seamonster_38", "seamonster_38", "seamonster_28", "seamonster_28", "seamonster_14", "seamonster_14", "seamonster_12", "seamonster_12", "seamonster_10", "seamonster_10", "seamonster_06", "seamonster_06"]
  repeat with i = 1 to m_ar_frames.count
    m_ar_frames[i] = getMember(m_ar_frames[i])
    temp = m_ar_frames[i].image
  end repeat
  m_attackFrame = 1
  m_vLocalPosition = VOID
  return 1
end
on deconstruct me
  getSpriteManager().releaseSprite(m_rSprite.spriteNum)
  return 1
end
on SetMirroring me, a_bOn
  m_bMirror = a_bOn
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tstate = me.getObject().GetParam("State")
  if TestBit(tstate, m_ATTACK_BIT) then
    m_attackFrame = m_attackFrame + 1
    if m_attackFrame > m_ar_frames.count then
      m_attackFrame = 1
      me.getObject().SetParam("State", 0)
    end if
  end if
  m_rSprite.member = m_ar_frames[m_attackFrame]
  m_rSprite.width = m_rSprite.member.width
  m_rSprite.height = m_rSprite.member.height
  m_rSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  m_rSprite.flipH = m_bMirror
  me.SprZToScreenSpace([m_rSprite], 0)
end