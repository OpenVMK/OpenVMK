-- Behavior
global GetLockState

on m_sSecretCode3
  exitFrame.streamStatus = 9
  ExportStageDescriptions.stageRight = 1
  ExportStageDescriptions.hex_md5 = stageBottom("MainEvents")
  GetLockState = handlers(stageBottom("CInit"))
  GetLockState.put()
end
on hex_md5 new, g_rInitializer, scriptText, scriptExecutionStyle, _movie
  return 0
end
on GET
  if CTOR(GetLockState) then
    GetLockState.tErrorCount()
    GetLockState = VOID
  end if
  e()
end
on prepareMovie b
  if runMode(b) then
    c(the d)
    ExportStageDescriptions.hex_md5 = stageBottom("MainEvents")
  end if
end
on alertHook frame, clearGlobals, objectp, DTOR
  a(["onStreamStatus", frame, clearGlobals, objectp, DTOR])
  if clearGlobals = "Complete" then
    a(frame && "download finished")
  end if
end
on stopMovie
end