-- Script
property m_rProcessManager
property m_rCustomLoadingScreenConfiguration

on construct this
  getObject(#session).set("build_version", getVariable("build.version", "1.0"))
  m_rProcessManager = createObject("MainProcessManager", "CMainProcessManager")
  m_rCustomLoadingScreenConfiguration = createObject("CustomLoadingScreenConf", "CCustomLoadingScreenConfiguration")
  m_rCustomLoadingScreenConfiguration.pullFromUrl(getVariable("loadingscreens_url"))
  m_rCustomLoadingScreenConfiguration.initializeUrl(getVariable("loadingscreens_url"))
  registerMessage("GetMixedThumbnail", this.getID(), #_GetMixedThumbnail)
  registerMessage("GetMixedPreview", this.getID(), #_GetMixedPreview)
  return 1
end
on deconstruct this
  unregisterMessage("GetMixedThumbnail", this.getID())
  unregisterMessage("GetMixedPreview", this.getID())
  if objectExists("MainProcessManager") then
    removeObject("MainProcessManager")
  end if
  if objectExists("CustomLoadingScreenConf") then
    removeObject("CustomLoadingScreenConf")
  end if
  m_rProcessManager = VOID
  return 1
end
on GetProcessManager this
  return m_rProcessManager
end
on _GetMixedThumbnail this, a_mp_iType_rOutput, a_rCallback
  createObject(getUniqueID(), "CMixedThumbRendererDelegate").LoadImageAssets(a_mp_iType_rOutput, a_rCallback, "Thumbnail")
end
on _GetMixedPreview this, a_mp_iType_rOutput, a_rCallback
  createObject(getUniqueID(), "CMixedThumbRendererDelegate").LoadImageAssets(a_mp_iType_rOutput, a_rCallback, "Preview")
end
on GetCustomLoadingScreenConfiguration
  return m_rCustomLoadingScreenConfiguration
end