-- Script
property m_mpSeed
property m_rNode
property m_arPics
property m_iDelay
property m_iMaxDelay
property m_iCurFrame

on construct me
  m_mpSeed = [:]
  m_iDelay = 1
  m_iMaxDelay = 1
  m_iCurFrame = 1
end
on SetSeed me, a_mpSeed
  m_mpSeed = a_mpSeed
end
on setNode me, a_rNode
  m_rNode = a_rNode
end
on SetPics me, a_arPics
  m_arPics = a_arPics
end
on SetFps me, a_iFps
  m_iMaxDelay = 30 / integer(a_iFps)
  if m_iMaxDelay < 1 then
    m_iMaxDelay = 1
  end if
end
on GetFrameNum me, a_iMilliseconds
  m_iCurFrame = m_iCurFrame + random(3)
  if m_iCurFrame > 5 then
    m_iCurFrame = m_iCurFrame - 5
  end if
  return m_iCurFrame
end
on Run me
  receiveUpdate(me.getID())
  m_iDelay = 1
end
on stop me
  removeUpdate(me.getID())
end
on update me
  if m_iDelay >= m_iMaxDelay then
    tSprite = m_rNode.GetVisual().getSprite()
    tmember = m_arPics[me.GetFrameNum()]
    tSprite.member = tmember
    tSprite.width = tmember.image.width
    tSprite.height = tmember.image.height
    m_iDelay = 1
  else
    m_iDelay = m_iDelay + 1
  end if
end