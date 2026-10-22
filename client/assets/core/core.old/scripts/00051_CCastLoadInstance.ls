-- Script
property pFile
property pURL
property pNetId
property pGroupId
property pLoadTime
property pBytesSoFar
property ptryCount
property pPercent
property pState

on Define me, tFile, tURL, tpreloadId
  pFile = tFile
  pURL = tURL
  pGroupId = tpreloadId
  ptryCount = 1
  return me.Activate()
end
on Activate me
  if ptryCount > 1 then
    if pURL contains "http://" then
      if not (pURL contains "?") then
        pURL = pURL & "?" & the milliSeconds
      end if
    end if
  end if
  if not voidp(pNetId) then
    netAbort(pNetId)
  end if
  pNetId = preloadNetThing(pURL)
  pLoadTime = the milliSeconds
  pBytesSoFar = 0
  pPercent = 0.0
  pState = #LOADING
  return 1
end
on update me
  if pState = #done then
    return 1
  end if
  tStreamStatus = getStreamStatus(pNetId)
  if not listp(tStreamStatus) then
    return error(me, "Invalid stream status:" && pFile && "/" && tStreamStatus, #update)
  end if
  if tStreamStatus.bytesSoFar > 0 then
    tBytesSoFar = tStreamStatus.bytesSoFar
    tBytesTotal = tStreamStatus.bytesTotal
    if tBytesTotal = 0 then
      tBytesTotal = tBytesSoFar
    end if
    pPercent = 1.0 * tBytesSoFar / tBytesTotal
    getCastLoadManager().TellStreamState(pFile, pState, pPercent, pGroupId)
  end if
  if tStreamStatus.bytesSoFar <> pBytesSoFar and tStreamStatus.bytesSoFar > 0 then
    pBytesSoFar = tStreamStatus.bytesSoFar
    pLoadTime = the milliSeconds
  else
    if the milliSeconds - pLoadTime > getIntVariable("castload.retry.delay", 10000) then
      tErrorMsg = getCastLoadManager().solveNetErrorMsg(netError(pNetId))
      error(me, "Failed network operation:" & RETURN & pURL & RETURN & tErrorMsg, #update)
      ptryCount = ptryCount + 1
      pLoadTime = the milliSeconds
      if ptryCount > 2 then
        put "Reactivating" && pURL
        return me.Activate()
      end if
    end if
  end if
  if tStreamStatus.url = EMPTY and tStreamStatus.state <> "Complete" then
    if the milliSeconds - pLoadTime > getIntVariable("castload.retry.delay", 10000) then
      error(me, "Castload misbehavior, URL for file" && QUOTE & pFile & QUOTE && "is now EMPTY!", #update)
      return me.Activate()
    end if
  end if
  if tStreamStatus.error <> EMPTY and tStreamStatus.error <> "OK" then
    pState = #error
  end if
  if netDone(pNetId) and pState <> #error then
    pPercent = 1.0
    pState = #done
    getCastLoadManager().DoneCurrentDownLoad(pFile, pURL, pGroupId, pState)
  end if
end