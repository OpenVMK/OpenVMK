-- Script
property m_ar_sprites
property m_vLocalPosition
property m_maxDiff
property m_ar_frames_front
property m_ar_frames_back
property m_ar_frames_follow
property m_iLastState
property m_bFlip
property m_iCurrentFrame
property m_ATTACK_BIT
property m_bMirror

on construct me
  m_ar_sprites = []
  t_rSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  t_rSprite.member = getMember("seamonster_06")
  t_rSprite.width = t_rSprite.member.width
  t_rSprite.height = t_rSprite.member.height
  t_rSprite.ink = 36
  t_rSprite.locZ = -49
  m_ar_sprites.append(t_rSprite)
  t_rSprite = sprite(getSpriteManager().reserveSprite(me.getID()))
  t_rSprite.member = getMember("seamonster_06")
  t_rSprite.width = t_rSprite.member.width
  t_rSprite.height = t_rSprite.member.height
  t_rSprite.ink = 36
  t_rSprite.locZ = -49
  m_ar_sprites.append(t_rSprite)
  m_bMirror = 0
  m_ATTACK_BIT = 1
  t_ar_frames_follow = ["Kraken_warning_1", "Kraken_warning_2", "Kraken_warning_3", "Kraken_warning_4", "Kraken_warning_5"]
  t_ar_frames_back = ["Kraken_back_1", "Kraken_back_2", "Kraken_back_3", "Kraken_back_3", "Kraken_back_4", "Kraken_back_5", "Kraken_back_6", "Kraken_back_7"]
  t_ar_frames_front = ["Kraken_front_1", "Kraken_front_2", "Kraken_front_3", "Kraken_front_3", "Kraken_front_4", "Kraken_front_5", "Kraken_front_6", "Kraken_front_7", "Kraken_front_8", "Kraken_front_9"]
  m_ar_frames_follow = []
  m_ar_frames_front = []
  m_ar_frames_back = []
  m_iLastState = 0
  t_iSpeed = 3
  repeat with i = 1 to t_ar_frames_front.count
    t_rMem = getMember(t_ar_frames_front[i])
    repeat with k = 1 to t_iSpeed
      m_ar_frames_front.append(t_rMem)
    end repeat
  end repeat
  repeat with i = 1 to t_ar_frames_back.count
    t_rMem = getMember(t_ar_frames_back[i])
    repeat with k = 1 to t_iSpeed
      m_ar_frames_back.append(t_rMem)
    end repeat
  end repeat
  repeat with i = 1 to t_ar_frames_follow.count
    t_rMem = getMember(t_ar_frames_follow[i])
    repeat with k = 1 to t_iSpeed
      m_ar_frames_follow.append(t_rMem)
    end repeat
  end repeat
  m_iCurrentFrame = 1
  m_vLocalPosition = VOID
  return 1
end
on deconstruct me
  repeat with t_rSprite in m_ar_sprites
    t_rSprite.member = VOID
    getSpriteManager().releaseSprite(t_rSprite.spriteNum)
  end repeat
  return 1
end
on SetMirroring me, a_bOn
  m_bMirror = a_bOn
end
on update me
  tPos = me.getObject().GetParam("WorldPosition")
  tstate = me.getObject().GetParam("State")
  if tstate <> m_iLastState then
    m_iCurrentFrame = 1
  end if
  if TestBit(tstate, m_ATTACK_BIT) then
    m_iCurrentFrame = m_iCurrentFrame + 1
    if m_iCurrentFrame > m_ar_frames_front.count then
      m_iCurrentFrame = 1
      me.getObject().SetParam("State", 0)
    end if
    t_rSprite = m_ar_sprites[1]
    if m_iCurrentFrame > m_ar_frames_back.count then
      t_rSprite.member = VOID
    else
      t_rSprite.member = m_ar_frames_back[m_iCurrentFrame]
      t_rSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
      t_rSprite.width = t_rSprite.member.width
      t_rSprite.height = t_rSprite.member.height
      t_rSprite.flipH = m_bMirror
      me.SprZToScreenSpace([t_rSprite], 0)
    end if
    t_rSprite = m_ar_sprites[2]
    t_rSprite.member = m_ar_frames_front[m_iCurrentFrame]
    t_rSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
    t_rSprite.width = t_rSprite.member.width
    t_rSprite.height = t_rSprite.member.height
    t_rSprite.flipH = m_bMirror
    me.SprZToScreenSpace([t_rSprite], 0)
  else
    m_iCurrentFrame = m_iCurrentFrame + 1
    if m_iCurrentFrame > m_ar_frames_follow.count then
      m_iCurrentFrame = 1
    end if
    t_rSprite = m_ar_sprites[1]
    t_rSprite.member = VOID
    t_rSprite = m_ar_sprites[2]
    t_rSprite.member = m_ar_frames_follow[m_iCurrentFrame]
    t_rSprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
    t_rSprite.width = t_rSprite.member.width
    t_rSprite.height = t_rSprite.member.height
    t_rSprite.flipH = m_bMirror
    me.SprZToScreenSpace([t_rSprite], 0)
  end if
  m_iLastState = tstate
end