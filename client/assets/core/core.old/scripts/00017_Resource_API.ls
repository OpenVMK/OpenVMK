-- Behavior
on CreateResourceManager
  return createManager(#resource_manager, GetClsVariable("resource.manager.class"))
end
on RemoveResourceManager
  return removeManager(#resource_manager)
end
on getResourceManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#resource_manager) then
    return t_rMgr.getManager(#resource_manager)
  else
    return CreateResourceManager()
  end if
end
on createMember a_sName, a_kType
  return getResourceManager().createMember(a_sName, a_kType)
end
on removeMember a_sName
  return getResourceManager().removeMember(a_sName)
end
on getMember a_sName
  return getResourceManager().getMember(a_sName)
end
on updateMember a_sName
  return getResourceManager().updateMember(a_sName)
end
on registerMember a_sName, a_iOptionalMemNum
  return getResourceManager().registerMember(a_sName, a_iOptionalMemNum)
end
on unregisterMember a_sName
  return getResourceManager().unregisterMember(a_sName)
end
on replaceMember a_sExistingMemName, a_sReplacingMemName
  return getResourceManager().replaceMember(a_sExistingMemName, a_sReplacingMemName)
end
on memberExists a_sName
  return getResourceManager().exists(a_sName)
end
on getmemnum a_sName
  return getResourceManager().getmemnum(a_sName)
end
on printMembers
  return getResourceManager().print()
end