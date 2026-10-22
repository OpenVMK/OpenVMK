-- Script
property m_bValid
property m_iTileSize
property m_pBsp
property m_iSelectMode

on construct this
  m_iTileSize = [:]
  m_bBsp = VOID
  m_bValid = 0
  t_bExists = getObject(#session).exists("tileSelectMode")
  if t_bExists then
    m_iSelectMode = getObject(#session).get("tileSelectMode")
  else
    m_iSelectMode = #bsp
  end if
  return 1
end
on deconstruct this
  m_iTileSize = [:]
  m_bValid = 0
  if objectp(m_pBsp) then
    removeObject(m_pBsp.getID())
  end if
  return 1
end
on GetTileByScrLoc this, a_iX, a_iY
  if not m_bValid then
    this._Prepare()
  end if
  if m_iSelectMode = #old then
    t_rObj = this.getObject()
    t_veScr = t_rObj.GetScrPos()
    t_iSiz = integer(t_rObj.GetContext().GetParam("TILESIZE"))
    t_iCnt = t_rObj.GetCount()
    t_ptTest = point(a_iX, a_iY)
    repeat with i = 1 to t_iCnt
      t_rTile = t_rObj[i]
      t_veScr = t_rTile.GetScrPos()
      t_ptScr = point(t_veScr.x, t_veScr.y)
      if this._IsInsideQuad(t_ptTest, t_ptScr, m_iTileSize) then
        return t_rTile
      end if
    end repeat
    return VOID
  end if
  if m_iSelectMode = #bsp then
    t_ptRel = this._ScrToRel(point(a_iX, a_iY))
    return m_pBsp.Search([the locH of t_ptRel, the locV of t_ptRel])
  end if
end
on _Prepare this
  t_rObj = this.getObject()
  t_iCnt = t_rObj.GetCount()
  m_iTileSize = integer(t_rObj.GetContext().GetParam("TILESIZE"))
  if m_iSelectMode = #old then
    m_mp_sLoc_sTile = [:]
    repeat with i = 1 to t_iCnt
      t_rTile = t_rObj[i]
      t_veRel = t_rTile.GetRelPos()
      m_mp_sLoc_sTile.addProp(integer(t_veRel.x) & "/" & integer(t_veRel.y), t_rTile.GetKey())
    end repeat
  end if
  if m_iSelectMode = #bsp then
    t_rXML = getThread("room").getComponent().m_rRoomBSPXML
    if voidp(t_rXML) then
      error(this, "BSP doc missing, defaulting to old selection mode", #_Prepare)
      m_iSelectMode = #old
      return this._Prepare()
    end if
    t_rXML.GetRoot()
    t_result = t_rXML.Search("NAME", this.getObject().GetParam("NAME"))
    if not t_result then
      error(this, "Could not find floor in BSP doc", #_Prepare)
      m_iSelectMode = #old
      return this._Prepare()
    end if
    t_rXML.Search("type", "NODE")
    m_pBsp = createObject(#random, "CBspTree")
    m_pBsp.setup_import(t_rXML)
  end if
  m_bValid = 1
end
on update this
  if not m_bValid then
    this._Prepare()
  end if
end
on _IsInsideQuad this, a_ptTest, a_ptScr, a_iSize
  if this._IsInsideTri(a_ptTest, a_ptScr + point(-a_iSize, 0), a_ptScr + point(0, -a_iSize / 2), a_ptScr + point(a_iSize, 0)) then
    return 1
  end if
  if this._IsInsideTri(a_ptTest, a_ptScr + point(-a_iSize, 0), a_ptScr + point(0, a_iSize / 2), a_ptScr + point(a_iSize, 0)) then
    return 1
  end if
  return 0
end
on _IsInsideTri this, a_ptTest, a_ptTriA, a_ptTriB, a_ptTriC
  t_ptA = this._TriArea(a_ptTest, a_ptTriB, a_ptTriC)
  t_ptB = this._TriArea(a_ptTest, a_ptTriA, a_ptTriC)
  t_ptC = this._TriArea(a_ptTest, a_ptTriA, a_ptTriB)
  t_ptD = this._TriArea(a_ptTriA, a_ptTriB, a_ptTriC)
  return not (t_ptA + t_ptB + t_ptC > t_ptD)
end
on _TriArea this, a_ptA, a_ptB, a_ptC
  t_ptA = a_ptA.locH - a_ptC.locH
  t_ptB = a_ptA.locV - a_ptC.locV
  t_ptC = a_ptB.locH - a_ptC.locH
  t_ptD = a_ptB.locV - a_ptC.locV
  return 0.5 * abs(t_ptA * t_ptD - t_ptB * t_ptC)
end
on _ScrToRel this, a_ptPoint
  t_veCenter = this.getObject().GetScrPos()
  t_veOrig = vector(a_ptPoint.locH - t_veCenter.x, (a_ptPoint.locV - t_veCenter.y) * 2, 0)
  t_veVecX = vector(1, 1, 0)
  t_veVecY = vector(-1, 1, 0)
  t_fX = t_veVecX.dot(t_veOrig) / (t_veVecX.length() * t_veVecX.length())
  t_fY = t_veVecY.dot(t_veOrig) / (t_veVecY.length() * t_veVecY.length())
  return point(integer(t_fX), integer(t_fY))
end