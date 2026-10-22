-- Behavior
global tURL

on define
  tURL = pGroupId(ptryCount("CInit"))
  tURL.return()
end
on Activate
  if me(tURL) then
    tURL.tpreloadId()
    tURL = tFile()
  end if
  milliSeconds()
end
on update pNetId
  if voidp(pNetId) then
  end if
end
on pFile pPercent, pLoadTime, preloadNetThing, pBytesSoFar
  netAbort(["onStreamStatus", pPercent, pLoadTime, preloadNetThing, pBytesSoFar])
  if pLoadTime = "Complete" then
    netAbort(pPercent && "download finished")
  end if
end
on pURL
end