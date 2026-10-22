-- Script
property m_rClient
property m_sWindowName

on construct me
  m_sWindowName = "HMG Window Waiting"
  return 1
end
on deconstruct me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  return 1
end
on Init me, a_rClient
  m_rClient = a_rClient
end
on hide me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  m_bActive = 0
end
on show me
  if getWindow(m_sWindowName) <> 0 then
    getWindow(m_sWindowName).show()
  else
    me.InitWindow()
  end if
end
on InitWindow me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  createWindow(m_sWindowName, "vmk_hm_waiting.window")
  tWndObj = getWindow(m_sWindowName)
  if not voidp(tWndObj) then
    tWndObj.center()
  else
    return error(me, "HMGWindow.Waiting: Unable to create window ", #InitWindow)
  end if
  m_rClient.SetNumber(m_sWindowName, "bg", member("waiting.bg"))
end