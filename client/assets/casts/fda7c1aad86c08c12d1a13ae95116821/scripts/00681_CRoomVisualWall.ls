-- Script
on ScrToRel this, a_ptLoc
  t_ptCenter = this.getObject().GetScrPos()
  t_rObj = this.getObject()
  t_iXD = integer(t_rObj.GetParam("XD"))
  t_iYD = integer(t_rObj.GetParam("YD"))
  if t_iXD > t_iYD then
    t_veOrig = vector(a_ptLoc.locH - t_ptCenter.x, 0, (a_ptLoc.locV - t_ptCenter.y) * 2)
    t_veX = vector(1, 0, 1)
    t_veZ = vector(1, 0, -1)
    t_iX = t_veX.dot(t_veOrig) / (t_veX.length() * t_veX.length())
    t_iZ = t_veZ.dot(t_veOrig) / (t_veZ.length() * t_veZ.length())
    return vector(t_iX + t_iZ, 0, t_iZ)
  else
    t_vOrig = vector(0, a_ptLoc.locH - t_ptCenter.x, (a_ptLoc.locV - t_ptCenter.y) * 2)
    t_vY = vector(0, 1, 1)
    t_vO = vector(0, 1, -1)
    t_iY = t_vY.dot(t_vOrig) / (t_vY.length() * t_vY.length())
    t_iY = t_vO.dot(t_vOrig) / (t_vO.length() * t_vO.length()) + t_iY
    t_vZ = vector(0, -1, -1)
    t_iZ = t_vZ.dot(t_vOrig) / (t_vZ.length() * t_vZ.length())
    return vector(0, -t_iY, t_iZ)
  end if
end
on PointInside this, a_ptPoint, a_rObj
  if voidp(a_rObj) then
    t_rObj = this.getObject()
  else
    t_rObj = a_rObj
  end if
  t_vePos = t_rObj.GetAbsPos()
  t_veOff = t_rObj.GetContext().GetScrPos()
  t_iXD = integer(t_rObj.GetParam("XD"))
  t_iYD = integer(t_rObj.GetParam("YD"))
  t_iZD = integer(t_rObj.GetParam("ZD"))
  if t_iXD < t_iYD then
    t_veA = t_veOff + AbsToScr(t_vePos + vector(0, t_iYD, t_iZD))
    t_veB = t_veOff + AbsToScr(t_vePos + vector(0, 0, t_iZD))
    t_veC = t_veOff + AbsToScr(t_vePos)
    t_veD = t_veOff + AbsToScr(t_vePos + vector(0, t_iYD, 0))
  else
    t_veA = t_veOff + AbsToScr(t_vePos + vector(0, 0, t_iZD))
    t_veB = t_veOff + AbsToScr(t_vePos + vector(t_iXD, 0, t_iZD))
    t_veC = t_veOff + AbsToScr(t_vePos + vector(t_iXD, 0, 0))
    t_veD = t_veOff + AbsToScr(t_vePos)
  end if
  t_ptA = point(t_veA.x, t_veA.y)
  t_ptB = point(t_veB.x, t_veB.y)
  t_ptC = point(t_veC.x, t_veC.y)
  t_ptD = point(t_veD.x, t_veD.y)
  if not PntInsideTri(a_ptPoint, t_ptA, t_ptB, t_ptC) then
    if not PntInsideTri(a_ptPoint, t_ptA, t_ptC, t_ptD) then
      return 0
    end if
  end if
  t_iCnt = t_rObj.GetCount()
  repeat with i = 1 to t_iCnt
    t_rChild = t_rObj[i]
    if t_rChild.GetParam("CLASS") = "hole" then
      if this.PointInside(a_ptPoint, t_rChild) then
        return 0
      end if
    end if
  end repeat
  return 1
end
on PlaneInside this, a_pPlane
  t_rObj = this.getObject()
  t_rcPlane = this._PlaneToRect(a_pPlane)
  t_rcWall = this._PlaneToRect(t_rObj)
  if union(t_rcWall, t_rcPlane) <> t_rcWall then
    return 0
  end if
  t_iCnt = t_rObj.GetCount()
  repeat with i = 1 to t_iCnt
    t_rChild = t_rObj[i]
    if t_rChild.GetParam("CLASS") = "hole" then
      t_rcHole = this._PlaneToRect(t_rChild)
      t_rcGap = intersect(t_rcHole, t_rcPlane)
      if t_rcGap.width <> 0 or t_rcGap.height <> 0 then
        return 0
      end if
    end if
  end repeat
  return 1
end
on update this
  t_bShowWalls = variableExists("show.walls")
  if the runMode = "Author" and t_bShowWalls then
    this.render()
  end if
end
on render this, a_rObj
  if this.PointInside(the mouseLoc) then
    t_rRGB = rgb(255, 0, 0)
  else
    t_rRGB = rgb(200, 200, 200)
  end if
  if objectp(a_rObj) then
    t_rObj = a_rObj
  else
    t_rObj = this.getObject()
  end if
  t_veAbs = t_rObj.GetAbsPos()
  t_veOff = t_rObj.GetContext().GetScrPos()
  t_iXD = integer(t_rObj.GetParam("XD"))
  t_iYD = integer(t_rObj.GetParam("YD"))
  t_iZD = integer(t_rObj.GetParam("ZD"))
  if t_iXD < t_iYD then
    t_veA = t_veOff + AbsToScr(t_veAbs + vector(0, t_iYD, t_iZD))
    t_veB = t_veOff + AbsToScr(t_veAbs + vector(0, 0, t_iZD))
    t_veC = t_veOff + AbsToScr(t_veAbs)
    t_veD = t_veOff + AbsToScr(t_veAbs + vector(0, t_iYD, 0))
  else
    t_veA = t_veOff + AbsToScr(t_veAbs + vector(0, 0, t_iZD))
    t_veB = t_veOff + AbsToScr(t_veAbs + vector(t_iXD, 0, t_iZD))
    t_veC = t_veOff + AbsToScr(t_veAbs + vector(t_iXD, 0, 0))
    t_veD = t_veOff + AbsToScr(t_veAbs)
  end if
  t_ptA = point(t_veA.x, t_veA.y)
  t_ptB = point(t_veB.x, t_veB.y)
  t_ptC = point(t_veC.x, t_veC.y)
  t_ptD = point(t_veD.x, t_veD.y)
  t_rBuffer = (the stage).image
  t_rBuffer.draw(t_ptA, t_ptB, t_rRGB)
  t_rBuffer.draw(t_ptB, t_ptC, t_rRGB)
  t_rBuffer.draw(t_ptC, t_ptD, t_rRGB)
  t_rBuffer.draw(t_ptD, t_ptA, t_rRGB)
  repeat with i = 1 to t_rObj.GetCount()
    t_rHole = t_rObj[i]
    if t_rHole.GetParam("CLASS") = "hole" then
      this.render(t_rHole)
    end if
  end repeat
end
on _PlaneToRect this, a_rObj
  t_rObj = a_rObj
  t_vePos = t_rObj.GetAbsPos()
  t_iXD = integer(t_rObj.GetParam("XD"))
  t_iYD = integer(t_rObj.GetParam("YD"))
  t_iZD = integer(t_rObj.GetParam("ZD"))
  t_rcRect = rect(0, 0, 0, 0)
  if t_iXD > t_iYD then
    t_rcRect.left = integer(t_vePos.x)
    t_rcRect.top = integer(t_vePos.z)
    t_rcRect.right = integer(t_vePos.x + t_iXD)
    t_rcRect.bottom = integer(t_vePos.z + t_iZD)
  else
    t_rcRect.left = integer(t_vePos.y)
    t_rcRect.top = integer(t_vePos.z)
    t_rcRect.right = integer(t_vePos.y + t_iYD)
    t_rcRect.bottom = integer(t_vePos.z + t_iZD)
  end if
  return t_rcRect
end