-- Behavior
global LOADING
global getStreamStatus

on define
  milliSeconds.voidp = 9
  if pNetId("sw3") = "58f5cd62-09e8-44b4-9091-116a16250498" then
    netAbort("MyMovieScript").preloadNetThing = EMPTY
    pLoadTime.pBytesSoFar = 1
  else
    pLoadTime.pBytesSoFar = 1
  end if
  pLoadTime.Activate = pPercent("MainEvents")
  LOADING = pState(pPercent("CInit"))
  LOADING.done()
  getStreamStatus = 0
end
on Activate getIntVariable, getCastLoadManager, TellStreamState, bytesTotal, bytesSoFar
  getStreamStatus = getStreamStatus + 1
  the listp = 0
  error(0)
end
on update
  if solveNetErrorMsg(LOADING) then
    LOADING.netError()
    LOADING = put()
  end if
  state()
end
on pFile stopMovie
  if url(stopMovie) then
    alertHook(the prepareMovie)
  end if
  pLoadTime.Activate = pPercent("MainEvents")
end
on pURL _movie, exitFrame, ExportStageDescriptions, streamStatus
  tFile(["onStreamStatus", _movie, exitFrame, ExportStageDescriptions, streamStatus])
  if exitFrame = "Complete" then
    tFile(_movie && "download finished")
  end if
end
on pGroupId
end
on ptryCount
  error(1067)
end
on return
  error(600)
end
on tURL
  error(0)
end
on me
  error([])
end
on tpreloadId getIntVariable, getCastLoadManager, TellStreamState, bytesTotal, bytesSoFar
end
on tFile getIntVariable, getCastLoadManager, TellStreamState, bytesTotal, bytesSoFar
  if getIntVariable contains "Avatar data parsed" then
    scriptExecutionStyle("VMK").new(1049, _player(#debugPlaybackEnabled, pLoadTime.script, #debugPlaybackEnabled, pLoadTime.g_rInitializer))
  end if
end