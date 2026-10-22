-- Script
property pStatus
property pTime
property pLoader
property pWonkyLine
property pNetVal
property pLoadTime
property pSign
global gGlobal

on new me
  _global.testLoad = 0
  pStatus = #tellServer
  pSign = script("pSign").new()
  pWonkyLine = member("wonkyline", "img")
  pLoader = member("loader")
  pLoadTime = 0
  me.makeLoadBar(0)
  return me
end
on frameEvent me
  if pStatus = #loadCheck then
    me.loadCheck()
  else
    if pStatus = #waitLoadCheck then
      me.waitLoadCheck()
    else
      if pStatus = #waitLoadGame then
        me.doWaitLoadGame()
      else
        if pStatus = #tellServer then
          me.tellServer()
        end if
      end if
    end if
  end if
  pLoadTime = pLoadTime + 1
  pSign.frameEvent()
end
on tellServer me
  tDomain = externalParamValue("sw7")
  getNetText(tDomain & "/b?method=got_loader")
  pStatus = #loadCheck
end
on loadCheck me
  pNetVal = getNetText(the moviePath & "loadcheck.txt?" & random(10000))
  pStatus = #waitLoadCheck
  pTime = 0
end
on waitLoadCheck me
  if netDone(pNetVal) then
    tResult = netTextResult(pNetVal)
    gGlobal = [:]
    gGlobal[#pFiles] = [:]
    gGlobal[#pFiles][#pRegister] = tResult.word[1]
    gGlobal[#pFiles][#pServers] = tResult.word[2]
    gGlobal[#pFiles][#pGame] = tResult.word[3]
    gGlobal[#pFiles][#pXML] = tResult.word[4]
    gGlobal[#pFiles][#pIcons] = tResult.word[5]
    gGlobal[#pFiles][#pPeople] = tResult.word[6]
    gGlobal[#pFiles][#pEmoticons] = tResult.word[7]
    gGlobal[#pFiles][#pItems] = tResult.word[8]
    gGlobal[#pFiles][#pBadges] = tResult.word[9]
    pNetVal = preloadNetThing(gGlobal[#pFiles][#pGame])
    pStatus = #waitLoadGame
    pTime = 0
  end if
end
on doWaitLoadGame me
  tStat = getStreamStatus(pNetVal)
  if the runMode = "author" then
    _global.testLoad = _global.testLoad + 10
    tStat = [#bytesSoFar: _global.testLoad, #bytesTotal: 120, #state: "Complete"]
  end if
  if tStat[#bytesSoFar] = 0 then
    exit
  end if
  loadStatus = tStat[#bytesSoFar] * 1.0 / tStat[#bytesTotal] * 1.0
  if loadStatus > 1 then
    loadStatus = 1
  end if
  if pLoadTime < 120 then
    tMax = pLoadTime / 120.0
    if loadStatus > tMax then
      loadStatus = pLoadTime / 15 * 15 / 120.0
    else
      nothing()
    end if
  end if
  if pSign.checkDone() then
    me.makeLoadBar(loadStatus / 2.0)
  end if
  if tStat[#state] = "Complete" and pLoadTime > 100 and pSign.checkDone() then
    pStatus = #done
    go("continue")
  end if
end
on addWonkyLine me, inImg, inColor, inPoint, inL
  repeat with x = 1 to 4
    pWonkyLine.vertex[x] = point(inL[x][1], inL[x][2])
  end repeat
  tAdd = pWonkyLine.image
  addImage(inImg, tAdd, inPoint, [#color: inColor])
end
on makeLoadBar me, inPercent
  timg = image(211, 49, 32)
  tAdd = member("loadbar").image
  addImage(timg, tAdd)
  TH = 171 * inPercent
  tV1 = 3 * inPercent
  tV2 = 21 - 4 * inPercent
  tBorderRect = [[0, 3], [TH, 3 - tV1], [TH + 2, tV2], [0, 21]]
  tRect = tBorderRect + [[1, 1], [-1, 1], [-1, -1], [1, -1]]
  me.addWonkyLine(timg, rgb("8ab043"), point(27, 7), tBorderRect)
  me.addWonkyLine(timg, rgb("9bcc4e"), point(27, 7), tRect)
  pLoader.image = timg
end