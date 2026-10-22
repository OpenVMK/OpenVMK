-- Script
property pStatus
property pTime
property pSprite
property pwidth
property pheight
property pBoing

on new me, inList
  pTime = 0
  tNr = inList[#pNr]
  pStatus = inList[#pVer]
  pSprite = sprite(10 + tNr)
  pwidth = pSprite.width
  pheight = pSprite.height
  if pStatus = #start then
    pBoing = script("pBoing").new([#pStiff: 1.57499992847443, #pDamp: 1.79999995231628, #pPos: 100, #pStatus: #bounce])
    pSprite.width = 1
    pSprite.height = 1
    pSprite.blend = 100
  end if
  return me
end
on frameEvent me
  if pStatus = #start then
    pBoing.frameEvent()
    tPos = pBoing.pPos
    pSprite.width = pwidth - tPos / 100.0 * pwidth
    pSprite.height = pheight - tPos / 100.0 * pheight
    if pBoing.pStatus = #nothing then
      return #kill
    end if
  else
    if pStatus = #end then
      pTime = pTime + 1
      pwidth = pwidth - (-30 + pTime * pTime)
      pheight = pheight - (-30 + pTime * pTime)
      if pwidth < 1 or pheight < 1 then
        pSprite.blend = 0
        return #kill
      else
        pSprite.width = pwidth
        pSprite.height = pheight
      end if
    end if
  end if
end