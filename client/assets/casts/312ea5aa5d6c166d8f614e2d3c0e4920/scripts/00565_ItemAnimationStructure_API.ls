-- Behavior
on CreateItemAniStructureManager
  return createManager(#roomobject_animation_manager, "CItemAniStructureManager")
end
on RemoveItemAniStructureManager
  return removeManager(#roomobject_animation_manager)
end
on GetItemAniStructureManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#roomobject_animation_manager) then
    return t_rMgr.getManager(#roomobject_animation_manager)
  else
    return CreateItemAniStructureManager()
  end if
end
on CreateItemAniStructure a_sID, a_rInitField
  return GetItemAniStructureManager().create(a_sID, a_rInitField)
end
on RemoveItemAniStructure a_sID
  return GetItemAniStructureManager().Remove(a_sID)
end
on GetItemAniStructure a_sID
  return GetItemAniStructureManager().get(a_sID)
end
on GetItemAniStates a_sID
  return GetItemAniStructureManager().GetStates(a_sID)
end
on ItemAniStructureExists a_sID
  return GetItemAniStructureManager().exists(a_sID)
end
on InitItemAniStructure a_vCastNumOrMemName
  return GetItemAniStructureManager().InitAnimation(a_vCastNumOrMemName)
end
on InitExistingItemAniStructures
  return GetItemAniStructureManager().initAll()
end
on CloseItemAniStructure a_vCastNumOrID
  return GetItemAniStructureManager().CloseAnimation(a_vCastNumOrID)
end
on CloseExistingItemAniStructures
  return GetItemAniStructureManager().closeAll()
end
on PrintItemAniStructures
  return GetItemAniStructureManager().print()
end