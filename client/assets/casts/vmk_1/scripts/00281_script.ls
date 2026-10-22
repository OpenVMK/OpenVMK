-- Behavior
global g_rInitializer
global tErrorCount

on prepareMovie
  _movie.scriptExecutionStyle = 9
  _player.debugPlaybackEnabled = 1
  _player.alertHook = script("MainEvents")
  g_rInitializer = new(script("CInit"))
  g_rInitializer.CTOR()
  tErrorCount = 0
end
on alertHook a, b, c, d, e
  if tErrorCount > 50 then
    return 1
  end if
  tErrorCount = tErrorCount + 1
  the trace = 0
  return 0
end
on stopMovie
  if objectp(g_rInitializer) then
    g_rInitializer.DTOR()
    g_rInitializer = VOID
  end if
  clearGlobals()
end
on exitFrame foo
  if voidp(foo) then
    go(the frame)
    _player.alertHook = script("MainEvents")
  end if
end
on streamStatus url, state, bytesSoFar, bytesTotal
  put ["onStreamStatus", url, state, bytesSoFar, bytesTotal]
  if state = "Complete" then
    put url && "download finished"
  end if
end
on ExportStageDescriptions
end