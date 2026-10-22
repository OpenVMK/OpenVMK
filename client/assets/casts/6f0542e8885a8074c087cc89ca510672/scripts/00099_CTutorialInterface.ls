-- Script
property m_windowTitle
property m_currentView

on construct me
  m_windowTitle = "Tutorial Window"
  m_currentView = "vmk_hlp_topics.window"
end
on deconstruct me
end
on show me
  me.changeView(m_currentView)
end
on hide me
  removeWindow(m_windowTitle)
end
on changeView me, i_sWindowName
  tWndObj = getWindow(m_windowTitle)
  tLastView = m_currentView
  if tWndObj = 0 then
    if not createWindow(m_windowTitle, "vmk_hlp.window") then
      return error(me, "Failed to open help window!!!", #changeView)
    else
      tWndObj = getWindow(m_windowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcHelp, me.getID(), #mouseUp)
      tWndObj.registerProcedure(#eventProcHelp, me.getID(), #mouseDown)
      tWndObj.registerProcedure(#eventProcHelp, me.getID(), #keyDown)
      tWndObj.merge(m_currentView)
    end if
  else
    if tLastView <> i_sWindowName then
      tWndObj.unmerge()
    end if
  end if
  if tLastView <> i_sWindowName then
    tWndObj.merge(i_sWindowName)
  end if
  m_currentView = i_sWindowName
end
on eventProcHelp me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_windowTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        me.getComponent().showHide()

    end case
  end if
end