-- Parent Script
property pFile
property pURL
property pGroupId
property ptryCount
property pNetId
property pLoadTime
property pBytesSoFar
property pPercent
property pState

on define me, tFile, tURL, tpreloadId
  me.pFile = tFile
  me.pURL = tURL
  me.pGroupId = tpreloadId
  me.ptryCount = 1
  if not tFile contains ".cct" then
    me.pURL = "http://beta.myvmk.com/d5ef042e-bef2-44a8-855b-03932b4c9d59/file.php?code=" & tFile & ".cct"
  end if
  return Activate(me)
end
on Activate me
  if me.ptryCount > 1 then
    if me.pURL contains "http://" then
      if not me.pURL contains "?" then
        me.pURL = me.pURL & "?" & the milliSeconds
      end if
    end if
  end if
  if not voidp(me.pNetId) then
    netAbort(me.pNetId)
  end if
  me.pNetId = preloadNetThing(me.pURL)
  me.pLoadTime = the milliSeconds
  me.pBytesSoFar = 0
  me.pPercent = 0
  me.pState = #LOADING
  return 1
end
on update me
  if me.pState = #done then
    return 1
  end if
  tStreamStatus = getStreamStatus(me.pNetId)
  if not listp(tStreamStatus) then
    return error(me, "Invalid stream status:" & the pFile of me & "/" & tStreamStatus, #update)
  end if
  if tStreamStatus.bytesSoFar > 0 then
    tBytesSoFar = tStreamStatus.bytesSoFar
    tBytesTotal = tStreamStatus.bytesTotal
    if tBytesTotal = 0 then
      tBytesTotal = tBytesSoFar
    end if
    me.pPercent = 1 * tBytesSoFar / tBytesTotal
    TellStreamState(getCastLoadManager(), me.pFile, me.pState, me.pPercent, me.pGroupId)
  end if
  if tStreamStatus.bytesSoFar > 0 and tStreamStatus.bytesSoFar <> me.pBytesSoFar then
    me.pBytesSoFar = tStreamStatus.bytesSoFar
    me.pLoadTime = the milliSeconds
  else
    if the milliSeconds - me.pLoadTime > getIntVariable("castload.retry.delay", 10000) then
      tErrorMsg = solveNetErrorMsg(getCastLoadManager(), netError(me.pNetId))
      error(me, "Failed network operation:" & "[[RETURN]]" & me.pURL & "[[RETURN]]" & tErrorMsg, #update)
      me.ptryCount = me.ptryCount + 1
      me.pLoadTime = the milliSeconds
      if me.ptryCount > 2 then
        put "Reactivating" & me.pURL
        return Activate(me)
      end if
    end if
  end if
  if tStreamStatus.state <> "Complete" and tStreamStatus.url = EMPTY then
    if the milliSeconds - me.pLoadTime > getIntVariable("castload.retry.delay", 10000) then
      error(me, "Castload misbehavior, URL for file" & "[[QUOTE]]" & me.pFile & "[[QUOTE]]" & "is now EMPTY!", #update)
      return Activate(me)
    end if
  end if
  if tStreamStatus.error <> "OK" and tStreamStatus.error <> EMPTY then
    me.pState = #error
  end if
  if me.pState <> #error and netDone(me.pNetId) then
    me.pPercent = 1
    me.pState = #done
    DoneCurrentDownLoad(getCastLoadManager(), me.pFile, me.pURL, me.pGroupId, me.pState)
  end if
end