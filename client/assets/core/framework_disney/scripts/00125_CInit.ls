-- Script
property m_iLoadID
property m_bRunning

on CTOR this
  if m_bRunning then
    return 0
  else
    if the runMode = "Author" then
      t_sCstFileType = ".cst"
    else
      t_sCstFileType = ".cct"
    end if
    t_iCoreCastNum = 3
    t_sPath = the moviePath & "vmk_core/core" & t_sCstFileType
    castLib(t_iCoreCastNum).fileName = t_sPath
    m_bRunning = 0
    moveToFront(the stage)
    set the exitLock to 1
    castLib(t_iCoreCastNum).preloadMode = 1
    m_iLoadID = preloadNetThing(castLib(t_iCoreCastNum).fileName)
    (the actorList).add(this)
    return 1
  end if
end
on DTOR this
  if m_bRunning then
    m_bRunning = 0
    stopClient()
  end if
  (the actorList).deleteOne(this)
  return 1
end
on stepFrame this
  t_status = getStreamStatus(m_iLoadID)
  if netDone(m_iLoadID) then
    put netError(m_iLoadID)
    if netError(m_iLoadID) = "OK" or netError(m_iLoadID) = 900 then
      (the actorList).deleteOne(this)
      if startClient() then
        m_bRunning = 1
      end if
    else
      t_sErrorMsg = this.solveDownloadErrorMsg(netError(m_iLoadID))
      put "Error downloading core:" && t_sErrorMsg
    end if
  else
    if t_status.state = "Started" or t_status.state = "InProgress" then
      if t_status.bytesSoFar <> 0 and t_status.bytesTotal <> 0 then
        t_percentLoaded = t_status.bytesSoFar / t_status.bytesTotal * 100.0
      end if
    end if
  end if
end
on solveDownloadErrorMsg me, tErrorCode
  case tErrorCode of
    0:
      return "OK"
    1:
      return "Directory doesn't exist"
    4:
      return "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all."
    5:
      return "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies."
    6:
      return "This alert can be achieved by using an URL which Shockwave does not support."
    20:
      return "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error."
    900:
      return "File to be written to is read-only"
    903:
      return "Disk is full."
    905:
      return "Bad filespec"
    2018:
      return "postNetText syntax-error "
    4144:
      return "Failed network operation"
    4145:
      return "Failed network operation"
    4146:
      return "Connection could not be established with the remote host"
    4149:
      return "Data supplied by the server was in an unexpected format"
    4150:
      return "Unexpected early closing of connection"
    4154:
      return "Operation could not be completed due to timeout."
    4155:
      return "Not enough memory available to complete the transaction"
    4156:
      return "Protocol reply to request indicates an error in the reply"
    4157:
      return "Transaction failed to be authenticated"
    4159:
      return "Invalid URL"
    4164:
      return "Could not create a socket"
    4165:
      return "Requested Object could not be found (URL may be incorrect)"
    4166:
      return "Generic proxy failure"
    4167:
      return "Transfer was intentionally interrupted by client"
    4242:
      return "Download stopped by netAbort(url)"
    4836:
      return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned"
    4144:
      return "Failed network operation"
    4145:
      return "Failed network operation"
    4146:
      return "Connection could not be established with the remote host"
    4147:
      return "Failed network operation"
    4148:
      return "Failed network operation"
    4149:
      return "Data supplied by the server was in an unexpected format"
    4150:
      return "Unexpected early closing of connection"
    4151:
      return "Failed network operation"
    4152:
      return "Data returned is truncated"
    4153:
      return "Failed network operation"
    4154:
      return "Operation could not be completed due to timeout"
    4155:
      return "Not enough memory available to complete the transaction"
    4157:
      return "Transaction failed to be authenticated"
    4159:
      return "Invalid URL"
    4160:
      return "Failed network operation"
    4161:
      return "Failed network operation"
    4162:
      return "Failed network operation"
    4163:
      return "Failed network operation"
    4164:
      return "Could not create a socket"
    4165:
      return "Requested Object could not be found (URL may be incorrect)"
    4166:
      return "Generic proxy failure"
    4167:
      return "Transfer was intentionally interrupted by client"
    4168:
      return "Failed network operation"
    4240:
      return "The network xtras weren't initialized properly. (Lewis Francis)"
    4242:
      return "Download stopped by netAbort(url)"
    4836:
      return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned."

  end case
  return "Unknown error!"
end