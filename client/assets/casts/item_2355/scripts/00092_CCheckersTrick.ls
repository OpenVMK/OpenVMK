-- Script
property m_rPiece
property m_ar_iParams
property m_rAnimation

on construct this
  m_rAnimation = createObject(getUniqueID(), "CCheckersSpriteAnimPlayer")
  m_ar_iParams = []
  return 1
end
on deconstruct this
  removeUpdate(this.getID())
  if objectp(m_rAnimation) then
    removeObject(m_rAnimation.getID())
    m_rAnimation = VOID
  end if
  return 1
end
on start this
  receiveUpdate(this.getID())
end
on update this
  if objectp(m_rPiece) then
    if objectp(m_rAnimation) then
      if not m_rAnimation.IsPlaying() then
        removeObject(this.getID())
      end if
    end if
  end if
end
on SetPiece this, a_rPiece
  m_rPiece = a_rPiece
end
on GetPiece this
  return m_rPiece
end
on SetParams this, a_ar_iParams
  m_ar_iParams = a_ar_iParams
end
on GetParams this
  return m_ar_iParams
end
on setAnimation this, a_rAnimation
  m_rAnimation = a_rAnimation
end
on getAnimation this
  return m_rAnimation
end