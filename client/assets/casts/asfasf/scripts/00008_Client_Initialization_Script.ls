-- Behavior
on startClient
  if not CreateObjectManager() then
    return 0
  end if
  if not dumpVariableField("System Props") then
    return stopClient()
  end if
  if not resetCastLibs(0, 0) then
    return stopClient()
  end if
  if not getResourceManager().preIndexMembers() then
    return stopClient()
  end if
  if not dumpTextField("System Texts") then
    return stopClient()
  end if
  if not getThreadManager().create(#core, #core) then
    return stopClient()
  end if
  return 1
end
on stopClient
  if voidp(g_rCore) then
    return 0
  end if
  RemoveTimeoutManager()
  RemoveObjectManager()
  RemoveErrorManager()
  return 0
end
on resetClient
  if the runMode contains "Author" then
    stopClient()
    startClient()
  else
    t_sURL = the moviePath
    if objectExists(#session) then
      if getObject(#session).exists("client_url") then
        t_sURL = getObject(#session).get("client_url")
      end if
    end if
    gotoNetPage(t_sURL)
  end if
  return 1
end
on CleanCore
  if closeExistingThreads() then
    resetCastLibs(1, 1)
    stopClient()
  end if
end