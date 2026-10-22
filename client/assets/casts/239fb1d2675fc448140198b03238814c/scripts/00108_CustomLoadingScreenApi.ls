-- Behavior
global g_rLoadingScreen

on GetLoadingScreenConfigurationObj
  return getThread("main").getComponent().GetCustomLoadingScreenConfiguration()
end
on PullLoadingScreenConfiguration
  GetLoadingScreenConfigurationObj().PullConfigurationSequential()
end
on ShowCustomLoadingScreen a_iID
  RemoveCustomLoadingScreen()
  g_rLoadingScreen = createObject(getUniqueID(), "CCustomLoadingScreen")
  return g_rLoadingScreen.Define(a_iID)
end
on GetCustomLoadingScreenObject
  return g_rLoadingScreen
end
on RemoveCustomLoadingScreen
  if objectp(g_rLoadingScreen) then
    removeObject(g_rLoadingScreen.getID())
  end if
  g_rLoadingScreen = VOID
end