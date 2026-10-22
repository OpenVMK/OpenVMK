-- Behavior
on CreateWriterManager
  return createManager(#writer_manager, GetClsVariable("writer.manager.class"))
end
on RemoveWriterManager
  return removeManager(#writer_manager)
end
on getWriterManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#writer_manager) then
    return t_rMgr.getManager(#writer_manager)
  else
    return CreateWriterManager()
  end if
end
on createWriter a_sID, a_rMetrics
  return getWriterManager().create(a_sID, a_rMetrics)
end
on removeWriter a_sID
  return getWriterManager().Remove(a_sID)
end
on getWriter a_sID
  return getWriterManager().get(a_sID)
end
on writerExists a_sID
  return getWriterManager().exists(a_sID)
end
on printWriters
  return getWriterManager().print()
end