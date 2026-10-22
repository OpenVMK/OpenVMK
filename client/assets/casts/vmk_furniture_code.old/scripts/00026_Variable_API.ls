-- Behavior
on CreateVariableManager
  return createManager(#variable_manager, value(convertToPropList(field "System Props", RETURN)["variable.manager.class"]))
end
on RemoveVariableManager
  return removeManager(#variable_manager)
end
on getVariableManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#variable_manager) then
    return t_rMgr.getManager(#variable_manager)
  else
    return CreateVariableManager()
  end if
end
on createVariable a_sID, a_vValue
  return getVariableManager().create(a_sID, a_vValue)
end
on removeVariable a_sID
  return getVariableManager().Remove(a_sID)
end
on setVariable a_sID, a_vValue
  return getVariableManager().create(a_sID, a_vValue)
end
on getVariable a_sID, a_vDefault
  return getVariableManager().get(a_sID, a_vDefault)
end
on getIntVariable a_sID, a_iDefault
  return getVariableManager().getInt(a_sID, a_iDefault)
end
on getStructVariable a_sID, a_rDefault
  return getVariableManager().getValue(a_sID, a_rDefault)
end
on getClassVariable a_sID, a_rDefault
  return getVariableManager().getValue(a_sID, a_rDefault)
end
on GetClsVariable a_sID, a_rDefault
  return getVariableManager().getValue(a_sID, a_rDefault)
end
on getVariableValue a_sID, a_vDefault
  return getVariableManager().getValue(a_sID, a_vDefault)
end
on variableExists a_sID
  return getVariableManager().exists(a_sID)
end
on printVariables
  return getVariableManager().print()
end
on dumpVariableField a_sField, a_cDelimiter
  return getVariableManager().dump(a_sField, a_cDelimiter)
end