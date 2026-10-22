-- Script
property m_sWindow

on construct this
  m_sWindow = getUniqueID()
end
on deconstruct this
  if windowExists(m_sWindow) then
    removeWindow(m_sWindow)
  end if
end
on Destroy this
  if this.valid then
    removeObject(this.getID())
  end if
end
on open this, a_sWindow
  if windowExists(m_sWindow) then
    removeWindow(m_sWindow)
  end if
  if createWindow(m_sWindow) then
    t_rWindow = getWindow(m_sWindow)
    t_rWindow.merge(a_sWindow)
    t_rWindow.center()
  end if
end
on close this
  if windowExists(m_sWindow) then
    removeWindow(m_sWindow)
  end if
end
on GetWindowInstance this
  return getWindow(m_sWindow)
end