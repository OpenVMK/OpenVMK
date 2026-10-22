-- Script
on GetTileByLogicalLoc this, a_xTile, a_yTile
  t_rObj = this.getObject()
  t_iSiz = integer(t_rObj.GetContext().GetParam("TILESIZE"))
  t_iCnt = t_rObj.GetCount()
  t_iX = a_xTile * t_iSiz - t_iSiz
  t_iY = a_yTile * t_iSiz - t_iSiz
  repeat with i = 1 to t_iCnt
    t_rTile = t_rObj[i]
    t_vePos = t_rTile.GetRelPos()
    if t_vePos.x = t_iX then
      if t_vePos.y = t_iY then
        return t_rTile
      end if
    end if
  end repeat
  return VOID
end
on GetTileByRelLoc this, a_iX, a_iY
  t_rObj = this.getObject()
  t_iCnt = t_rObj.GetCount()
  repeat with i = 1 to t_iCnt
    t_rTile = t_rObj[i]
    t_vePos = t_rTile.GetRelPos()
    if t_vePos.x = a_iX then
      if t_vePos.y = a_iY then
        return t_rTile
      end if
    end if
  end repeat
  return VOID
end