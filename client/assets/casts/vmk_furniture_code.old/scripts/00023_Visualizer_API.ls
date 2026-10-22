-- Behavior
on CreateVisualizerManager
  return createManager(#visualizer_manager, GetClsVariable("visualizer.manager.class"))
end
on RemoveVisualizerManager
  return removeManager(#visualizer_manager)
end
on getVisualizerManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#visualizer_manager) then
    return t_rMgr.getManager(#visualizer_manager)
  else
    return CreateVisualizerManager()
  end if
end
on createVisualizer a_sID, a_sLayout
  return getVisualizerManager().create(a_sID, a_sLayout)
end
on CreateVisualizerXML a_sID, a_sLayout
  return getVisualizerManager().CreateXML(a_sID, a_sLayout)
end
on removeVisualizer a_sID
  return getVisualizerManager().Remove(a_sID)
end
on getVisualizer a_sID
  return getVisualizerManager().get(a_sID)
end
on visualizerExists a_sID
  return getVisualizerManager().exists(a_sID)
end
on printVisualizers
  return getVisualizerManager().print()
end