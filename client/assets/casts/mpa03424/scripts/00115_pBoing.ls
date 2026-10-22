-- Script
property pPos
property pDest
property pStiff
property pDamp
property pVeloc
property pStatus

on new me, inList
  me.Init(inList)
  return me
end
on Init me, inList
  me.resetVal()
  pStatus = #nothing
  pVersion = inList[#pVersion]
  pStiff = inList[#pStiff]
  pDamp = inList[#pDamp]
  if inList[#pPos] <> VOID then
    pPos = inList[#pPos]
  end if
  if inList[#pStatus] <> VOID then
    pStatus = inList[#pStatus]
  end if
end
on resetVal me
  pPos = -10
  pDest = 0
  pVeloc = 0
end
on frameEvent me
  if pStatus = #bounce then
    me.bounce()
    return 1
  else
    return 0
  end if
end
on setBounce me, inPower
  pVeloc = inPower
  me.resetVal()
  pStatus = #bounce
end
on bounce me
  if pStatus = #bounce then
    pVeloc = pVeloc + (pDest - pPos) * pStiff
    pVeloc = pVeloc * pDamp
    pPos = pPos + pVeloc
    if abs(pVeloc) < 1.44999992847443 and abs(pDest - pPos) < 1.44999992847443 then
      pPos = pDest
      pStatus = #nothing
    end if
  end if
  return pPos
end