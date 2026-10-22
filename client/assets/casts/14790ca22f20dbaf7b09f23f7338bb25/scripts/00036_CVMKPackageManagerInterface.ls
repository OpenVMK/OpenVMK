-- Score Script
property m_objLoadingWindow

on construct this
  m_objLoadingWindow = VOID
  return 1
end
on deconstruct this
  return 1
end
on ShowLoadingWindow this
  t_sHdTxt = "Loading Additional Resources..."
  m_objLoadingWindow = createObject(getUniqueID(), "CLoadingWindow")
  t_mp_data = [#headline: t_sHdTxt, #showbutton: 0, #client: this.getID(), #modal: 1]
  if objectp(m_objLoadingWindow) then
    m_objLoadingWindow.DefineWindow(t_mp_data)
  end if
end
on RemoveLoadingWindow this
  if objectp(m_objLoadingWindow) then
    removeObject(m_objLoadingWindow.getID())
  end if
end