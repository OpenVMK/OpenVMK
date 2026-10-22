-- Behavior
on AbsToScr a_veLoc
  t_fX = a_veLoc.x
  t_fY = a_veLoc.y
  t_fZ = a_veLoc.z
  t_fXs = t_fX - t_fY
  t_fYs = -t_fZ + 0.5 * (t_fX + t_fY)
  t_fZs = t_fX * 10 + t_fY * 10 + t_fZ * 5
  return vector(t_fXs, t_fYs, t_fZs)
end
on ScrToAbs a_ptLoc, a_ptClick
  t_pCenter = a_ptLoc
  tVecX = vector(1, 0, 1)
  tVecY = vector(-1, 0, 1)
  tVecZ = vector(1, 0, -1)
  tOgPoint = vector(a_ptClick.locH - t_pCenter.locH, 0, (a_ptClick.locV - t_pCenter.locV) * 2)
  t_iX = integer(tVecX.dot(tOgPoint) / (tVecX.length() * tVecX.length()))
  tOgPoint = vector(a_ptClick.locH - t_pCenter.locH, 0, (a_ptClick.locV - t_pCenter.locV) * 2)
  t_iZ = integer(tVecZ.dot(tOgPoint) / (tVecZ.length() * tVecZ.length()))
  return point(t_iX + t_iZ, t_iZ)
end
on PntInsideTile a_ptTest, a_ptScr, a_iSize
  if PntInsideTri(a_ptTest, a_ptScr + point(-a_iSize, 0), a_ptScr + point(0, -a_iSize / 2), a_ptScr + point(a_iSize, 0)) then
    return 1
  end if
  if PntInsideTri(a_ptTest, a_ptScr + point(-a_iSize, 0), a_ptScr + point(0, a_iSize / 2), a_ptScr + point(a_iSize, 0)) then
    return 1
  end if
  return 0
end
on PntInsideTri a_ptTest, a_ptTriA, a_ptTriB, a_ptTriC
  t_fA = _TriArea(a_ptTest, a_ptTriB, a_ptTriC)
  t_fB = _TriArea(a_ptTest, a_ptTriA, a_ptTriC)
  t_fC = _TriArea(a_ptTest, a_ptTriA, a_ptTriB)
  t_fD = _TriArea(a_ptTriA, a_ptTriB, a_ptTriC)
  return not (t_fA + t_fB + t_fC > t_fD)
end
on _TriArea a_ptA, a_ptB, a_ptC
  t_iA = a_ptA.locH - a_ptC.locH
  t_iB = a_ptA.locV - a_ptC.locV
  t_iC = a_ptB.locH - a_ptC.locH
  t_ID = a_ptB.locV - a_ptC.locV
  return 0.5 * abs(t_iA * t_ID - t_iB * t_iC)
end
on GetTileAtPos t_vPos
  a_rContext = getThread("room").getComponent()._AccessRoom()
  if not voidp(t_vPos) then
    t_veOff = a_rContext.GetScrPos()
    t_scrPos = t_veOff + AbsToScr(t_vPos)
    t_rIterator = a_rContext.GetIterator("floor")
    if t_rIterator.FirstToken() then
      repeat while 1
        t_rFloor = t_rIterator.getToken()
        if voidp(t_rFloor) then
          exit repeat
        end if
        t_rTile = t_rFloor.GetVisual().GetTileByScrLoc(integer(t_scrPos.x), integer(t_scrPos.y))
        if objectp(t_rTile) then
          return t_rTile
          exit repeat
        end if
        if not t_rIterator.NextToken() then
          exit repeat
        end if
      end repeat
    else
    end if
  else
  end if
  return VOID
end
on GetTilesOnFloor t_sFloorName
  t_ar_tiles = [:]
  if voidp(t_sFloorName) then
    return t_ar_tiles
  end if
  tRoomContext = getThread("room").getComponent()._AccessRoom()
  if objectp(tRoomContext) then
    t_mp_sElements = tRoomContext.m_mp_sCls_mp_iRef_sKey["floor"]
    if voidp(t_mp_sElements) then
      return t_ar_tiles
    end if
    repeat with tID in t_mp_sElements
      t_rFloor = tRoomContext.m_rChilds[tID]
      t_sName = t_rFloor.GetParam("NAME")
      if t_sName = t_sFloorName then
        return the m_rChilds of t_rFloor
      end if
    end repeat
  end if
  return t_ar_tiles
end
on GetAvatarsOnTiles a_ar_tiles
  tRoomContext = getThread("room").getComponent()._AccessRoom()
  t_ar_foundAvatars = []
  if objectp(tRoomContext) then
    t_mp_sElements = tRoomContext.m_mp_sCls_mp_iRef_sKey["avatar"]
    if voidp(t_mp_sElements) then
      return t_ar_foundAvatars
    end if
    repeat with tID in t_mp_sElements
      t_rAvatar = tRoomContext.m_rChilds[tID]
      if t_rAvatar.GetParam("CLASS") <> "avatar" then
        put "ABORT! INVALID AVATAR!"
        return t_ar_foundAvatars
      end if
      t_rAvatarTile = t_rAvatar.GetFactor().m_rTarget
      if voidp(t_rAvatarTile) then
        t_rAvatarTile = t_rAvatar.GetFactor().m_rOldTarget
      end if
      if voidp(t_rAvatarTile) then
        t_rAvatarTile = GetTileAtPos(t_rAvatar.GetAbsPos())
      end if
      if listp(a_ar_tiles) then
        repeat with t_rTile in a_ar_tiles
          if t_rAvatarTile = t_rTile then
            t_ar_foundAvatars.append(t_rAvatar)
          end if
        end repeat
      end if
    end repeat
  end if
  return t_ar_foundAvatars
end
on GetTileAtScrPos t_vPos
  a_rContext = getThread("room").getComponent()._AccessRoom()
  if not voidp(t_vPos) then
    t_rIterator = a_rContext.GetIterator("floor")
    if t_rIterator.FirstToken() then
      repeat while 1
        t_rFloor = t_rIterator.getToken()
        if voidp(t_rFloor) then
          exit repeat
        end if
        t_rTile = t_rFloor.GetVisual().GetTileByScrLoc(integer(t_vPos.x), integer(t_vPos.y))
        if objectp(t_rTile) then
          return t_rTile
          exit repeat
        end if
        if not t_rIterator.NextToken() then
          exit repeat
        end if
      end repeat
    else
    end if
  else
  end if
  return VOID
end
on floor f
  return bitOr(f, 0) - ((f < 0) + (f <> integer(f)) = 2)
end