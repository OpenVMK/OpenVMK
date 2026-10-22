-- Script
property m_rIterator
property m_sLastTile
property m_ptLastScrPos
property m_veLastScrPos
property m_iTileSize

on construct this
  m_rIterator = VOID
  m_sLastTile = VOID
  m_ptLastScrPos = point(0, 0)
  m_veLastScrPos = vector()
  m_sLastTile = EMPTY
  m_iTileSize = 0
  return 1
end
on deconstruct this
  m_sLastTile = EMPTY
  m_ptLastScrPos = point(0, 0)
  m_veLastScrPos = vector()
  m_iTileSize = 0
  if objectp(m_rIterator) then
    m_rIterator.clear()
    m_rIterator = VOID
  end if
  return 1
end
on update this
  if the mouseLoc <> m_ptLastScrPos then
    t_bValid = 0
    m_sLastTile = EMPTY
    m_ptLastScrPos = the mouseLoc
    t_iX = m_ptLastScrPos.locH
    t_iY = m_ptLastScrPos.locV
    t_rContext = this.getObject().GetContext()
    if voidp(m_rIterator) then
      m_rIterator = t_rContext.GetIterator("floor")
    end if
    if m_rIterator.FirstToken() then
      repeat while 1
        t_rFloor = m_rIterator.getToken()
        if voidp(t_rFloor) then
          m_sLastTile = EMPTY
          exit repeat
        end if
        t_rTile = t_rFloor.GetVisual().GetTileByScrLoc(t_iX, t_iY)
        if objectp(t_rTile) then
          t_bValid = 1
          t_veLoc = t_rTile.GetScrPos()
          m_sLastTile = t_rTile.GetKey()
          if m_veLastScrPos <> t_veLoc then
            m_veLastScrPos = t_veLoc
            this.getObject().SetAbsPos(t_veLoc)
            this.getObject().SetParam("POINTED", t_rTile.GetParam("CLASS"))
          end if
          t_rIterateBlock = t_rTile
          repeat while t_rIterateBlock.GetCount() > 0
            t_rIterateBlock = t_rIterateBlock[1]
            if t_rIterateBlock.GetParam("ACT") = 1 then
              this.getObject().SetParam("POINTED", "teleport")
              exit repeat
            end if
            if t_rIterateBlock.GetParam("ACT") = 2 then
              this.getObject().SetParam("POINTED", "hide")
              exit repeat
            end if
            if t_rIterateBlock.GetParam("SIT") = 1 then
              this.getObject().SetParam("POINTED", "sit")
              exit repeat
            end if
          end repeat
          exit repeat
        end if
        if not m_rIterator.NextToken() then
          exit repeat
        end if
      end repeat
    end if
    if not t_bValid then
      this.getObject().SetParam("POINTED", "hide")
    end if
  end if
end
on SetToTileStack this
  return 0
end
on GetTheTileStack this
  if m_sLastTile <> EMPTY then
    return this.getObject().GetContext().GetObjByKey(m_sLastTile)
  else
    return VOID
  end if
end