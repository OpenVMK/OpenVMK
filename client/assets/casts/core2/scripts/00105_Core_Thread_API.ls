-- Behavior
on CreateThreadManager
  return createManager(#thread_manager, GetClsVariable("thread.manager.class"))
end
on RemoveThreadManager
  return removeManager(#thread_manager)
end
on getThreadManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#thread_manager) then
    return t_rMgr.getManager(#thread_manager)
  else
    return CreateThreadManager()
  end if
end
on createThread a_sID, a_rInitField
  return getThreadManager().create(a_sID, a_rInitField)
end
on removeThread a_sID
  return getThreadManager().Remove(a_sID)
end
on getThread a_sID
  return getThreadManager().get(a_sID)
end
on threadExists a_sID
  return getThreadManager().exists(a_sID)
end
on initThread a_vCastNumOrMemName
  return getThreadManager().initThread(a_vCastNumOrMemName)
end
on initExistingThreads
  return getThreadManager().initAll()
end
on closeThread a_vCastNumOrID
  return getThreadManager().closeThread(a_vCastNumOrID)
end
on closeExistingThreads
  return getThreadManager().closeAll()
end
on printThreads
  return getThreadManager().print()
end