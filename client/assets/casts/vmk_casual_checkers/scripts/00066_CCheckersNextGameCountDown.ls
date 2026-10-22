-- Script
property m_sDialog

on construct this
  m_sDialog = getUniqueID()
  t = createObject(m_sDialog, "CCheckersGameDialog")
  t.open("vmk_checkers_gamestart_counter.window")
end
on deconstruct this
  removeObject(m_sDialog)
end
on Destroy this
  if this.valid then
    removeObject(this.getID())
  end if
end
on updateCounter this, a_iSeconds
  t_rDialog = getObject(m_sDialog)
  if objectp(t_rDialog) then
    t_rWindow = t_rDialog.GetWindowInstance()
    if objectp(t_rWindow) then
      t_rElement = t_rWindow.getElement("gamestart_counter_number")
      if objectp(t_rElement) then
        t_rElement.setProperty(#member, getMember("checkers.gamestarts.counter." & a_iSeconds))
      end if
    end if
  end if
end