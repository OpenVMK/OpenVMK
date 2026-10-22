-- Script
property pStatus
property pTime
property pSpeedV
property pSignToV
property pCloudToV
property pLoaderToV
property pSignV
property pCloudV
property pLoaderV
property pSign
property pCloud
property pLoader
property pSignBounce
property pCloudBounce
property pLoaderBounce

on new me
  pStatus = #fadeUpCloud
  pSignToV = 185
  pCloudToV = 59
  pLoaderToV = 327
  pSpeedV = 30
  pSignBounce = script("pBoing").new([#pStiff: 1.4099999666214, #pDamp: 1.83749997615814, #pPos: pSpeedV, #pStatus: #bounce])
  pLoaderBounce = script("pBoing").new([#pStiff: 1.36499989032745, #pDamp: 1.84999990463257, #pPos: pSpeedV, #pStatus: #bounce])
  pCloudBounce = script("pBoing").new([#pStiff: 1.36499989032745, #pDamp: 1.82499992847443, #pPos: -71, #pStatus: #bounce])
  pSign = sprite(15)
  pCloud = sprite(40)
  pLoader = sprite(16)
  me.initSprites()
  pTime = 0
  return me
end
on initSprites me
  pSignV = pSignToV - pSpeedV * 10
  pLoaderV = pLoaderToV - pSpeedV * 10
end
on frameEvent me
  if pStatus = #fadeUpCloud then
    me.doFadeUpCloud()
  else
    if pStatus = #fadeup then
      me.doFadeUp()
    end if
  end if
end
on doFadeUpCloud me
  pTime = pTime + 1
  if pTime = 35 then
    pTime = 0
    pStatus = #fadeup
  end if
  me.doCloud()
end
on doCloud me
  pCloudBounce.frameEvent()
  pCloudV = pCloudToV + pCloudBounce.pPos
  pCloud.locV = pCloudV
end
on checkDone me
  if pStatus = #fadeup and pTime > 113 then
    return 1
  end if
end
on doFadeUp me
  pTime = pTime + 1
  if pTime < 11 then
    pSignV = pSignV + pSpeedV
    pLoaderV = pLoaderV + pSpeedV
  else
    pSignBounce.frameEvent()
    pSignV = pSignToV + pSignBounce.pPos
    pLoaderBounce.frameEvent()
    pLoaderV = pLoaderToV + pLoaderBounce.pPos
  end if
  me.doCloud()
  pSign.locV = pSignV
  pLoader.locV = pLoaderV
  if pTime = 100 then
  end if
end