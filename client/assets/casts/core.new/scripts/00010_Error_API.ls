-- Behavior
global g_rError

on CreateErrorManager
  if objectp(g_rError) then
    return g_rError
  else
    t_sCls = value(convertToPropList(field("System Props"), RETURN).getaProp("error.manager.class"))[1]
    g_rError = script(t_sCls).new()
    g_rError.construct()
    try()
    createObject(#error_manager, g_rError)
    catch()
    return g_rError
  end if
end
on RemoveErrorManager
  if not objectp(g_rError) then
    return 0
  else
    g_rError.deconstruct()
    g_rError = VOID
    return 1
  end if
end
on getErrorManager
  if objectp(g_rError) then
    return g_rError
  else
    return CreateErrorManager()
  end if
end
on error a_rObject, a_sMsg, a_kMethod
  return getErrorManager().error(a_rObject, a_sMsg, a_kMethod)
end
on SystemAlert a_rObject, a_sMsg, a_kMethod
  return getErrorManager().SystemAlert(a_rObject, a_sMsg, a_kMethod)
end
on setDebugLevel a_iLevel
  return getErrorManager().setDebugLevel(a_iLevel)
end
on printErrors
  return getErrorManager().print()
end