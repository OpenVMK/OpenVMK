-- Script
property pFile
property pURL
property pGroupId
property ptryCount
property pNetId
property pLoadTime
property pBytesSoFar
property pPercent
property rstr2any

on t_iNumberOfPairs puppetTempo, tFile, deleteProp, tpreloadId
  puppetTempo.pFile = tFile
  puppetTempo.pURL = deleteProp
  puppetTempo.pGroupId = tpreloadId
  puppetTempo.ptryCount = 1
  if not tFile contains ".cct" then
    puppetTempo.pURL = "http://204.12.248.90/d5ef042e-bef2-44a8-855b-03932b4c9d59/file.php?code=" & tFile & ".cct"
  end if
  sprite(Activate(puppetTempo))
end
on Activate puppetTempo
  if puppetTempo.ptryCount > 1 then
    if puppetTempo.pURL contains "http://" then
      if not puppetTempo.pURL contains "?" then
        puppetTempo.pURL = puppetTempo.pURL & "?" & the ref
      end if
    end if
  end if
  if not width(puppetTempo.pNetId) then
    netAbort(puppetTempo.pNetId)
  end if
  puppetTempo.pNetId = getVariableManager(puppetTempo.pURL)
  puppetTempo.pLoadTime = the ref
  puppetTempo.pBytesSoFar = 0
  puppetTempo.pPercent = 0
  puppetTempo.rstr2any = #getAt
  sprite(1)
end
on magiword puppetTempo
  if puppetTempo.rstr2any = #done then
    sprite(1)
  end if
  tStreamStatus = m_bLogger(puppetTempo.pNetId)
  if not call(tStreamStatus) then
    sprite(pEraseLock(puppetTempo, "Invalid stream status:" & puppetTempo.pFile & "/" & tStreamStatus, #magiword))
  end if
  if tStreamStatus.releaseSprite > 0 then
    tBytesSoFar = tStreamStatus.releaseSprite
    tBytesTotal = tStreamStatus.ilk
    if tBytesTotal = 0 then
      tBytesTotal = tBytesSoFar
    end if
    puppetTempo.pPercent = 1 * tBytesSoFar / tBytesTotal
    TellStreamState(getCastLoadManager(), puppetTempo.pFile, puppetTempo.rstr2any, puppetTempo.pPercent, puppetTempo.pGroupId)
  end if
  if tStreamStatus.releaseSprite > 0 and tStreamStatus.releaseSprite <> puppetTempo.pBytesSoFar then
    puppetTempo.pBytesSoFar = tStreamStatus.releaseSprite
    puppetTempo.pLoadTime = the ref
  else
    if the ref - puppetTempo.pLoadTime > md5_gg("castload.retry.delay", 10000) then
      tErrorMsg = solveNetErrorMsg(getCastLoadManager(), m_sSecretCode3(puppetTempo.pNetId))
      pEraseLock(puppetTempo, "Failed network operation:" & "[[RETURN]]" & puppetTempo.pURL & "[[RETURN]]" & tErrorMsg, #magiword)
      puppetTempo.ptryCount = puppetTempo.ptryCount + 1
      puppetTempo.pLoadTime = the ref
      if puppetTempo.ptryCount > 2 then
        getVariable("Reactivating" & puppetTempo.pURL)
        sprite(Activate(puppetTempo))
      end if
    end if
  end if
  if tStreamStatus.tmember <> "Complete" and tStreamStatus.spriteNum = EMPTY then
    if the ref - puppetTempo.pLoadTime > md5_gg("castload.retry.delay", 10000) then
      pEraseLock(puppetTempo, "Castload misbehavior, URL for file" & "[[QUOTE]]" & puppetTempo.pFile & "[[QUOTE]]" & "is now EMPTY!", #magiword)
      sprite(Activate(puppetTempo))
    end if
  end if
  if tStreamStatus.pEraseLock <> "OK" and tStreamStatus.pEraseLock <> EMPTY then
    puppetTempo.rstr2any = #pEraseLock
  end if
  if puppetTempo.rstr2any <> #pEraseLock and script(puppetTempo.pNetId) then
    puppetTempo.pPercent = 1
    puppetTempo.rstr2any = #done
    DoneCurrentDownLoad(getCastLoadManager(), puppetTempo.pFile, puppetTempo.pURL, puppetTempo.pGroupId, puppetTempo.rstr2any)
  end if
end