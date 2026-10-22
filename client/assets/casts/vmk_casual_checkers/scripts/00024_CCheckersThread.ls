-- Script
property m_rModule

on construct this
  m_rModule = createObject(getUniqueID(), GetClsVariable("checkers.module.class"))
  return 1
end
on deconstruct this
  if objectp(m_rModule) then
    if m_rModule.valid = 1 then
      removeObject(m_rModule.getID())
      m_rModule = VOID
    end if
  end if
  return 1
end