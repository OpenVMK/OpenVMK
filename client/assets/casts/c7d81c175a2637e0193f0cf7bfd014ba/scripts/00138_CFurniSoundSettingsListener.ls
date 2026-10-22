-- Script
property m_rOwner
property m_kHandler

on construct this
  m_kHandler = #checkSoundSettings
  registerMessage("close_Settings", this.getID(), #checkSoundSettings)
  return 1
end
on deconstruct this
  unregisterMessage("close_Settings", this.getID())
end
on Init this, _owner, _handler
  m_rOwner = _owner
  m_kHandler = _handler
end
on checkSoundSettings this
  passEvent = 1
  if not objectp(m_rOwner) then
    passEvent = 0
  else
    if m_rOwner.handlers().getOne(m_kHandler) = 0 then
      put "[CFurniSoundSettingsListener Notice] " & m_rOwner & " Missing " & m_kHandler & "-handler"
      passEvent = 0
    end if
  end if
  if passEvent then
    call(m_kHandler, m_rOwner)
  end if
end