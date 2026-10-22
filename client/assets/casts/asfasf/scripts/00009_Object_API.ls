-- Behavior
global g_rCore

on CreateObjectManager
  if objectp(g_rCore) then
    return g_rCore
  else
    t_sCls = value(convertToPropList(field("System Props"), RETURN).getaProp("object.manager.class"))[1]
    g_rCore = script(t_sCls).new()
    g_rCore.construct()
    return g_rCore
  end if
end
on RemoveObjectManager
  if voidp(g_rCore) then
    return 0
  else
    g_rCore.deconstruct()
    g_rCore = VOID
    return 1
  end if
end
on getObjectManager
  if objectp(g_rCore) then
    return g_rCore
  else
    return CreateObjectManager()
  end if
end
on createObject a_sID
  t_ar_vClass = []
  repeat with i = 2 to the paramCount
    t_vParam = param(i)
    if listp(t_vParam) then
      repeat with t_vClass in t_vParam
        t_ar_vClass.add(t_vClass)
      end repeat
      next repeat
    end if
    t_ar_vClass.add(t_vParam)
  end repeat
  return getObjectManager().create(a_sID, t_ar_vClass)
end
on removeObject a_sID
  return getObjectManager().Remove(a_sID)
end
on getObject a_sID
  return getObjectManager().get(a_sID)
end
on objectExists a_sID
  return getObjectManager().exists(a_sID)
end
on printObjects
  return getObjectManager().print()
end
on registerObject a_sID, a_rObject
  return getObjectManager().registerObject(a_sID, a_rObject)
end
on unregisterObject a_sID
  return getObjectManager().unregisterObject(a_sID)
end
on createManager a_sID
  t_ar_vClass = []
  repeat with i = 2 to the paramCount
    t_vParam = param(i)
    if listp(t_vParam) then
      repeat with t_vClass in t_vParam
        t_ar_vClass.add(t_vClass)
      end repeat
      next repeat
    end if
    t_ar_vClass.add(t_vParam)
  end repeat
  t_rMgr = getObjectManager()
  t_rObj = t_rMgr.create(a_sID, t_ar_vClass)
  t_rMgr.registerManager(a_sID)
  t_rMgr.setaProp(a_sID, t_rObj)
  return t_rObj
end
on removeManager a_sID
  return getObjectManager().Remove(a_sID)
end
on getManager a_sID
  return getObjectManager().getManager(a_sID)
end
on managerExists a_sID
  return getObjectManager().managerExists(a_sID)
end
on printManagers
  return getObjectManager().print()
end
on registerManager a_sID
  return getObjectManager().registerManager(a_sID)
end
on unregisterManager a_sID
  return getObjectManager().unregisterManager(a_sID)
end
on receivePrepare a_sID
  return getObjectManager().receivePrepare(a_sID)
end
on removePrepare a_sID
  return getObjectManager().removePrepare(a_sID)
end
on receiveUpdate a_sID
  return getObjectManager().receiveUpdate(a_sID)
end
on removeUpdate a_sID
  return getObjectManager().removeUpdate(a_sID)
end
on pauseUpdate
  return getObjectManager().pauseUpdate()
end
on resumeUpdate
  return getObjectManager().resumeUpdate()
end
on unpauseUpdate
  return getObjectManager().resumeUpdate()
end