-- Script
property m_sOwnerKey
property m_rProcessor

on setup this, a_sKey, a_rProcessor
  m_sOwnerKey = a_sKey
  m_rProcessor = a_rProcessor
end
on mouseEnter this
  if not m_rProcessor.Process(#mouseEnter, m_sOwnerKey) then
    pass()
  end if
end
on mouseLeave this
  if not m_rProcessor.Process(#mouseLeave, m_sOwnerKey) then
    pass()
  end if
end
on mouseWithin this
  if not m_rProcessor.Process(#mouseWithin, m_sOwnerKey) then
    pass()
  end if
end
on mouseDown this
  t_rSprite = sprite(this.spriteNum)
  if m_rProcessor.Process(#mouseDown, m_sOwnerKey) then
    stopEvent()
  else
    pass()
  end if
end
on mouseUp this
  if m_rProcessor.Process(#mouseUp, m_sOwnerKey) then
    stopEvent()
  else
    pass()
  end if
end
on mouseUpOutSide this
  if m_rProcessor.Process(#mouseUpOutSide, m_sOwnerKey) then
    stopEvent()
  else
    pass()
  end if
end