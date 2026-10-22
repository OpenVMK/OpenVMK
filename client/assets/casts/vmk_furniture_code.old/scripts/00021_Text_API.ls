-- Behavior
on CreateTextManager
  return createManager(#text_manager, GetClsVariable("text.manager.class"))
end
on RemoveTextManager
  return removeManager(#text_manager)
end
on getTextManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#text_manager) then
    return t_rMgr.getManager(#text_manager)
  else
    return CreateTextManager()
  end if
end
on createText tID, tvalue
  return getTextManager().create(tID, tvalue)
end
on removeText tID
  return getTextManager().Remove(tID)
end
on setText tID, tvalue
  return getTextManager().create(tID, tvalue)
end
on getText tID, tDefault
  return getTextManager().get(tID, tDefault)
end
on textExists tID
  return getTextManager().exists(tID)
end
on printTexts
  return getTextManager().print()
end
on dumpTextField tField, tDelimiter
  return getTextManager().dump(tField, tDelimiter)
end