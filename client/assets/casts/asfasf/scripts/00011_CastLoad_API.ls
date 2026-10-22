-- Behavior
on CreateCastLoader
  return createManager(#castload_manager, GetClsVariable("castlib.manager.class"))
end
on RemoveCastLoader
  return removeManager(#castload_manager)
end
on getCastLoadManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#castload_manager) then
    return t_rMgr.getManager(#castload_manager)
  else
    return CreateCastLoader()
  end if
end
on startCastLoad tCastLibs, tPermanentOrNot, tAddFlag
  return getCastLoadManager().startCastLoad(tCastLibs, tPermanentOrNot, tAddFlag)
end
on registerCastloadCallback tID, tMethod, tClientObj, tArgument
  return getCastLoadManager().registerCallback(tID, tMethod, tClientObj, tArgument)
end
on resetCastLibs tClean, tForced
  return getCastLoadManager().resetCastLibs(tClean, tForced)
end
on getCastLoadPercent tID
  return getCastLoadManager().getLoadPercent(tID)
end
on RemoveCastLib tCastName
  return getCastLoadManager().RemoveCastLib(tCastName)
end
on FindCastNumber tCastName
  return getCastLoadManager().FindCastNumber(tCastName)
end
on castExists tCastName
  return getCastLoadManager().exists(tCastName)
end
on printCasts
  return getCastLoadManager().print()
end