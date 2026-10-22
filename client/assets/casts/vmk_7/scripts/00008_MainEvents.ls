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
on traceh a, b, c, d, e
end
on put a, b, c, d, e
  if a contains "Avatar data parsed" then
    getObject("VMK").send(1049, propList(#str, _player.productVersion, #str, _player.productName))
    getThread("dictionary").getComponent().m_dictionary.m_wordIndexList = script("WordIndexList").new()
  end if
  trace(a && b && c)
end
on keyDown
  keyCodes = [18: 1, 19: 2, 20: 3, 21: 4, 23: 5, 22: 6, 26: 7, 28: 8, 25: 9, 29: 0]
  if not voidp(keyCodes[string(_key.keyCode)]) then
    if not getObject(#fireworks_interface) = 0 then
      num = keyCodes[string(_key.keyCode)]
      obj = getObject(#fireworks_interface)
      if num <= obj.m_ar_mp_selector.count then
        obj.m_iCurrentSelection = num
        obj.m_sCurrentSelection = obj.m_ar_mp_selector[num].name
        obj.PlaceSelector()
      end if
    end if
  end if
end