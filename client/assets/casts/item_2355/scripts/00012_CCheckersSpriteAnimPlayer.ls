-- Script
property m_iFrame
property m_bPlaying
property m_ar_rFrames
property m_ar_rMembers
property m_rSprite
property m_bLooping
property m_ptCenter
property m_iLocZ
property m_bPositionSet
property m_bReleaseSprite
property m_bDestroyWhenReady

on construct this
  m_iFrame = 0
  m_bPlaying = 0
  m_ar_rFrames = []
  m_ar_rMembers = []
  m_bLooping = 0
  m_ptCenter = point(0, 0)
  m_iLocZ = 1000
  m_bPositionSet = 0
  m_bReleaseSprite = 0
  m_bDestroyWhenReady = 0
end
on deconstruct this
  m_bDestroyWhenReady = 0
  this.stop()
end
on SetSprite this, a_rSprite
  if not voidp(m_rSprite) then
    if m_bReleaseSprite then
      releaseSprite(m_rSprite.spriteNum)
    end if
  end if
  m_bReleaseSprite = 0
  m_rSprite = a_rSprite
  if not m_bPositionSet then
    m_ptCenter = a_rSprite.loc
    m_iLocZ = a_rSprite.locZ
  end if
end
on getSprite this
  if voidp(m_rSprite) then
    m_rSprite = sprite(reserveSprite(this.getID()))
    m_bReleaseSprite = 1
  end if
  return m_rSprite
end
on setPosition this, a_ptCenter, a_iLocZ
  m_ptCenter = a_ptCenter
  m_iLocZ = a_iLocZ
  m_bPositionSet = 1
end
on getPosition this
  return m_ptCenter
end
on SetFrameList this, a_ar_rFrames
  m_ar_rFrames = a_ar_rFrames
end
on GetFrameList this
  return m_ar_rFrames
end
on SetMemberList this, a_ar_rMembers
  m_ar_rMembers = a_ar_rMembers
end
on GetMemberList this
  return m_ar_rMembers
end
on LoadAnimData this, a_rAnimation
  t_iVersion = a_rAnimation[#version]
  m_ar_rFrames = a_rAnimation[#frames]
  m_ar_rMembers = a_rAnimation[#members]
end
on SaveAnimData this, a_rMember
  a_rMember.text = string([#version: 0, #members: m_ar_rMembers, #frames: m_ar_rFrames])
end
on SetSelfDestruct this, a_bDestroy
  m_bDestroyWhenReady = a_bDestroy = 1
end
on IsPlaying this
  return m_bPlaying
end
on start this
  m_iFrame = 0
  m_bPlaying = 1
  receiveUpdate(this.getID())
  if voidp(m_rSprite) then
    m_rSprite = sprite(reserveSprite(this.getID()))
    m_bReleaseSprite = 1
  end if
end
on stop this
  if m_bPlaying then
    removeUpdate(this.getID())
    m_bPlaying = 0
  end if
  if m_bReleaseSprite then
    if not voidp(m_rSprite) then
      releaseSprite(m_rSprite.spriteNum)
    end if
  end if
  m_rSprite = VOID
  if m_bDestroyWhenReady then
    removeObject(this.getID())
  end if
end
on pause this
  m_bPlaying = 0
end
on resume this
  if not voidp(m_rSprite) then
    m_bPlaying = 1
  end if
end
on update this
  if m_bPlaying then
    m_iFrame = m_iFrame + 1
    if m_iFrame > m_ar_rFrames.count then
      if m_bLooping then
        m_iFrame = 1
      else
        this.stop()
      end if
    end if
  end if
  if m_bPlaying then
    t_rFrame = m_ar_rFrames[m_iFrame]
    m_rSprite.member = getMember(m_ar_rMembers[t_rFrame[#member]])
    m_rSprite.loc = m_ptCenter + t_rFrame[#offset]
    m_rSprite.locZ = m_iLocZ
    m_rSprite.blend = t_rFrame[#blend]
    m_rSprite.flipH = t_rFrame[#flipH]
    m_rSprite.flipV = t_rFrame[#flipV]
    m_rSprite.width = t_rFrame[#scale][1] * m_rSprite.member.width
    m_rSprite.height = t_rFrame[#scale][2] * m_rSprite.member.height
  end if
end