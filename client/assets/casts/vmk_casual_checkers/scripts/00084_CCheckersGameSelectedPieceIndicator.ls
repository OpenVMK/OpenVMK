-- Script
property m_rMember
property m_rSprite
property m_rTile
property m_rPiece
property m_rGameEngine

on construct this
  m_bReady = 0
  m_rSprite = sprite(reserveSprite(this.getID()))
  m_rMember = getMember("checkers.piece.hilite")
  m_rSprite.member = m_rMember
  m_rSprite.width = m_rSprite.member.width
  m_rSprite.height = m_rSprite.member.height
  registerMessage("room_tile_selection", this.getID(), #_TileSelectedCbk)
  return 1
end
on deconstruct this
  unregisterMessage("room_tile_selection", this.getID())
  if m_rSprite.ilk = #sprite then
    if m_rSprite.spriteNum > 0 then
      releaseSprite(m_rSprite.spriteNum)
      m_rSprite = VOID
    end if
  end if
  m_rGameEngine = VOID
  m_rMember = VOID
  m_rTile = VOID
  m_rPiece = VOID
  return 1
end
on SetGameEngine this, a_rEngine
  m_rGameEngine = a_rEngine
end
on ShowPosition this, a_rTile, a_rPiece
  if voidp(a_rTile) then
    m_rSprite.visible = 0
    m_rTile = VOID
    m_rPiece = VOID
  else
    m_rTile = a_rTile
    m_rPiece = a_rPiece
    t_veAbs = a_rTile.GetScrPos()
    m_rSprite.locH = t_veAbs.x
    m_rSprite.locV = t_veAbs.y
    m_rSprite.locZ = t_veAbs.z - 1
    m_rSprite.width = m_rSprite.member.width
    m_rSprite.height = m_rSprite.member.height
    m_rSprite.blend = 80
    m_rSprite.visible = 1
  end if
end
on EventProc this, a_kEvent, a_sID
  if a_kEvent = #mouseUp then
    return 1
  end if
end
on _TileSelectedCbk this, a_rTile
  if m_rGameEngine.IsMyTurn() then
    if objectp(a_rTile) then
      if a_rTile.GetCount() then
        t_rChild = a_rTile[1]
        if objectp(t_rChild) then
          t_rPiece = m_rGameEngine.GetPieceByRef(integer(t_rChild.GetParam("REF")))
          if objectp(t_rPiece) then
            if t_rPiece.GetParam("CHECKERS_GAME_PIECE") then
              this.ShowPosition(a_rTile, t_rPiece)
              exit
            end if
          end if
        end if
      end if
    end if
  end if
  this.ShowPosition(VOID, VOID)
end