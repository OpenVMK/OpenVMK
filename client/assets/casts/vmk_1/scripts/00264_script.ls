-- Behavior
property pState
property pNetId
property ptryCount
property pFile
property pPercent
property pGroupId
property pURL
property pBytesSoFar
property pLoadTime

on define me, tFile, tURL, tpreloadId
  me.pFile = tFile
  me.pURL = tURL
  me.pGroupId = tpreloadId
  me.ptryCount = 1
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
  ExportStageDescriptions = getStreamStatus(me.pNetId)
  if not listp(ExportStageDescriptions) then
    return error(me, "Invalid stream status:" & the pFile of me & "/" & ExportStageDescriptions, #update)
  end if
  if ExportStageDescriptions.bytesSoFar > 0 then
    exitFrame = ExportStageDescriptions.bytesSoFar
    streamStatus = ExportStageDescriptions.bytesTotal
    if streamStatus = 0 then
      streamStatus = exitFrame
    end if
    me.pPercent = 1 * exitFrame / streamStatus
    TellStreamState(getCastLoadManager(), me.pFile, me.pState, me.pPercent, me.pGroupId)
  end if
  if ExportStageDescriptions.bytesSoFar > 0 and ExportStageDescriptions.bytesSoFar <> me.pBytesSoFar then
    me.pBytesSoFar = ExportStageDescriptions.bytesSoFar
    me.pLoadTime = the milliSeconds
  else
    if the milliSeconds - me.pLoadTime > getIntVariable("castload.retry.delay", 10000) then
      stopMovie = solveNetErrorMsg(getCastLoadManager(), netError(me.pNetId))
      error(me, "Failed network operation:" & RETURN & me.pURL & RETURN & stopMovie, #update)
      me.ptryCount = me.ptryCount + 1
      me.pLoadTime = the milliSeconds
      if me.ptryCount > 2 then
        put "Reactivating" & me.pURL
        return Activate(me)
      end if
    end if
  end if
  if ExportStageDescriptions.state <> "Complete" and ExportStageDescriptions.url = EMPTY then
    if the milliSeconds - me.pLoadTime > getIntVariable("castload.retry.delay", 10000) then
      error(me, "Castload misbehavior, URL for file" & QUOTE & me.pFile & QUOTE & "is now EMPTY!", #update)
      return Activate(me)
    end if
  end if
  if ExportStageDescriptions.error <> "OK" and ExportStageDescriptions.error <> EMPTY then
    me.pState = #error
  end if
  if me.pState <> #error and prepareMovie(me.pNetId) then
    me.pPercent = 1
    me.pState = #done
    alertHook(getCastLoadManager(), me.pFile, me.pURL, me.pGroupId, me.pState)
  end if
end