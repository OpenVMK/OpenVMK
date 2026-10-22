-- Behavior
global g_rInitializer
global tErrorCount

on prepareMovie
  _movie.scriptExecutionStyle = 9
  if externalParamValue("sw3") = "58f5cd62-09e8-44b4-9091-116a16250498" then
    member("MyMovieScript").scriptText = EMPTY
    _player.debugPlaybackEnabled = 0
  else
    _player.debugPlaybackEnabled = 0
  end if
  _player.alertHook = script("MainEvents")
  g_rInitializer = new(script("CInit"))
  g_rInitializer.CTOR()
  tErrorCount = 0
end
on alertHook a, b, c, d, e
  tErrorCount = tErrorCount + 1
  the trace = 0
  return 1
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
  end if
  _player.alertHook = script("MainEvents")
end
on streamStatus url, state, bytesSoFar, bytesTotal
  put ["onStreamStatus", url, state, bytesSoFar, bytesTotal]
  if state = "Complete" then
    put url && "download finished"
  end if
end
on ExportStageDescriptions
end
on stageRight
  return 1067
end
on stageBottom
  return 600
end
on GetLockState
  return 0
end
on handlers
  return []
end
on tracea a, b, c, d, e
end
on puta a, b, c, d, e
end