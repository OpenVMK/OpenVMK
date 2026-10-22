-- Score Script
property m_visible

on construct me
  m_visible = 0
  registerMessage(#ui_help, me.getID(), #showHideHelp)
end
on deconstruct me
  unregisterMessage(#ui_help, me.getID())
end
on showHideHelp me
  if m_visible then
    me.getInterface().hideHelp()
  else
    me.getInterface().showHelp()
  end if
  m_visible = not m_visible
end