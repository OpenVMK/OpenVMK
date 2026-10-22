-- Behavior
on CreateWindowManager
  return createManager(#window_manager, GetClsVariable("window.manager.class"))
end
on RemoveWindowManager
  return removeManager(#window_manager)
end
on getWindowManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#window_manager) then
    return t_rMgr.getManager(#window_manager)
  else
    return CreateWindowManager()
  end if
end
on createWindow a_sID, a_sLayout, a_iLocX, a_iLocY, a_kSpecial
  return getWindowManager().create(a_sID, a_sLayout, a_iLocX, a_iLocY, a_kSpecial)
end
on removeWindow a_sID
  return getWindowManager().Remove(a_sID)
end
on getWindow a_sID
  return getWindowManager().get(a_sID)
end
on windowExists a_sID
  return getWindowManager().exists(a_sID)
end
on mergeWindow a_sID, a_sLayout
  if windowExists(a_sID) then
    return getWindow(a_sID).merge(a_sLayout)
  else
    return 0
  end if
end
on activateWindow a_sID
  if voidp(a_sID) then
    return 0
  else
    return getWindowManager().Activate(a_sID)
  end if
end
on deactivateWindow a_sID
  if voidp(a_sID) then
    return 0
  else
    return getWindowManager().deactivate(a_sID)
  end if
end
on registerClient a_sID, a_sClientID
  if windowExists(a_sID) then
    return getWindow(a_sID).registerClient(a_sClientID)
  else
    return 0
  end if
end
on registerProcedure a_sID, a_kHandler, a_sClientID, a_kEvent
  if windowExists(a_sID) then
    return getWindow(a_sID).registerProcedure(a_kHandler, a_sClientID, a_kEvent)
  else
    return 0
  end if
end
on showWindows
  return getWindowManager().showAll()
end
on hideWindows
  return getWindowManager().hideAll()
end
on lockWindowLayering
  return getWindowManager().lock()
end
on unlockWindowLayering
  return getWindowManager().unlock()
end
on printWindows
  return getWindowManager().print()
end