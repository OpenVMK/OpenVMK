-- Behavior
on CreateTimeoutManager
  return createManager(#timeout_manager, GetClsVariable("timeout.manager.class"))
end
on RemoveTimeoutManager
  return removeManager(#timeout_manager)
end
on getTimeoutManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#timeout_manager) then
    return t_rMgr.getManager(#timeout_manager)
  else
    return CreateTimeoutManager()
  end if
end
on createTimeout tID, tTime, tHandler, tClientID, tArguments, tIterations
  return getTimeoutManager().create(tID, tTime, tHandler, tClientID, tArguments, tIterations)
end
on removeTimeout tID
  return getTimeoutManager().Remove(tID)
end
on getTimeout tID
  return getTimeoutManager().get(tID)
end
on timeoutExists tID
  return getTimeoutManager().exists(tID)
end
on printTimeouts
  return getTimeoutManager().print()
end