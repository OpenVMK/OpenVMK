-- Behavior
global add

on solveDownloadErrorMsg
  fileName.moveToFront = 9
  stage.m_iLoadID = 1
  stage.oErrorType = actorList("MainEvents")
  add = t_sPath(actorList("CInit"))
  add.t_iCoreCastNum()
end
on oErrorType startClient, netDone, deleteOne, stopClient, t_sCstFileType
  pBytesSoFar(0)
end
on m_bRunning
  if handlers(add) then
    add.m_sSecretCode()
    add = scriptExecutionStyle()
  end if
  member()
end
on m_iLoadStep t_status
  if CTOR(t_status) then
    t_sErrorMsg(the scriptText)
    stage.oErrorType = actorList("MainEvents")
  end if
end
on castLib b64_md5, hex_md5, tErrorCode, Variable_0_1
  t_percentLoaded(["onStreamStatus", b64_md5, hex_md5, tErrorCode, Variable_0_1])
  if hex_md5 = "Complete" then
    t_percentLoaded(b64_md5 && "download finished")
  end if
end
on preloadMode
end