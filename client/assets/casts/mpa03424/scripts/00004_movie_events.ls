-- Behavior
global gMain
global gGlobal

on prepareMovie
  the trace = 0
  tG = gGlobal
  clearGlobals()
  gGlobal = tG
  gMain = script("gMain").new()
end
on smoothTo iFrom, iTo, iSpeed
  tFrom = iFrom
  iFrom = iFrom + (iTo - iFrom) / iSpeed
  if iFrom = tFrom and iFrom < iTo then
    iFrom = iFrom + 1
  end if
  if iFrom = tFrom and iFrom > iTo then
    iFrom = iFrom - 1
  end if
  return iFrom
end
on addImage inImg, inAdd, inPos, inList
  if voidp(inPos) then
    inPos = point(0, 0)
  end if
  tRect = inAdd.rect
  inImg.copyPixels(inAdd, tRect + rect(inPos[1], inPos[2], inPos[1], inPos[2]), tRect, inList)
end