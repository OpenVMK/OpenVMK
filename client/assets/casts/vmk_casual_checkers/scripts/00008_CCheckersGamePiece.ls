-- Script
property m_rGameEngine
property m_ar_iAllowedTiles
property m_bMoving
property m_ar_iTricks
property m_rZTransfer
property m_rCurve
property m_fMoveTime
property m_bInitialized
property m_sndObj

on construct this
  m_bInitialized = 0
  m_ar_iAllowedTiles = []
  m_rGameEngine = VOID
  m_bMoving = 0
  m_ar_iTricks = []
  m_rZTransfer = createObject(getUniqueID(), "CTransferFunction", "CRampClampTransferFunction")
  m_rCurve = createObject(#temp, "CRoomBezierCurve")
  m_fMoveTime = 0.0
  m_sndObj = VOID
  return 1
end
on deconstruct this
  if objectp(m_rGameEngine) then
    m_rGameEngine.PieceRemoved(this)
  end if
  m_rCurve = VOID
  m_rZTransfer = VOID
  m_ar_iAllowedTiles = VOID
  m_rGameEngine = VOID
  m_bInitialized = 0
  if objectp(m_sndObj) then
    m_sndObj.StopSound()
  end if
  callAncestor(#deconstruct, this)
  return 1
end
on SetObject this, a_rObject
  a_rObject.SetParam("CHECKERS_GAME_PIECE", 1)
  callAncestor(#SetObject, this, a_rObject)
end
on SetGameEngine this, a_rEngine
  m_rGameEngine = a_rEngine
  m_bInitialized = 1
end
on GetGameEngine this
  return m_rGameEngine
end
on SetPieceState this, a_iState
  put "Piece is now in state" && a_iState
  if a_iState = 2 then
    executeMessage("PlayFxSound", "checkers-intosupercharacter")
  end if
end
on TrickAssigned this, a_iTrickType
  if m_ar_iTricks.getPos(a_iTrickType) = 0 then
    m_ar_iTricks.add(a_iTrickType)
  end if
end
on TrickConsumed this, a_iTrickType
  if m_ar_iTricks.getPos(a_iTrickType) > 0 then
    m_ar_iTricks.deleteOne(a_iTrickType)
  end if
end
on PlayTrick this, a_iTrick, a_iParams
  t_rTrick = createObject(getUniqueID(), GetClsVariable("checkers.trick.class." & a_iTrick))
  t_rTrick.SetParams(a_iParams)
  t_rTrick.SetPiece(this)
  t_rTrick.start()
  put "Trick used:" && a_iTrick
end
on update this
  if m_bInitialized then
    t_rBlock = this.GetBlocks()[1]
    t_ar_rSprites = t_rBlock.GetVisual().GetSprites()
    if t_ar_rSprites.count > 1 then
      if m_ar_iTricks.count then
        t_rSprite = t_ar_rSprites[2]
        if m_ar_iTricks.getPos(3) and m_ar_iTricks.getPos(5) then
          t_rSprite.member = getMember("checkers.magic.hilite.3.5")
          t_rSprite.blend = 100
        else
          if m_ar_iTricks.getPos(3) then
            t_rSprite.member = getMember("checkers.magic.hilite.3")
            t_rSprite.blend = 100
          else
            if m_ar_iTricks.getPos(5) then
              t_rSprite.member = getMember("checkers.magic.hilite.5")
              t_rSprite.blend = 100
            else
              t_rSprite.member = getMember("null")
              t_rSprite.blend = 0
            end if
          end if
        end if
        t_rSprite.width = t_rSprite.member.width
        t_rSprite.height = t_rSprite.member.height
      else
        t_ar_rSprites[2].blend = 0
        t_ar_rSprites[2].member = getMember("null")
      end if
    end if
    if m_bMoving then
      t_veScrPos = AbsToScr(m_rCurve.GetPointAt(m_fMoveTime)) + m_rGameEngine.GetRoomContext().GetScrPos()
      i = 1
      repeat with t_rSprite in t_ar_rSprites
        t_rSprite.locH = t_veScrPos.x
        t_rSprite.locV = t_veScrPos.y
        t_rSprite.locZ = t_veScrPos.z + i
        i = i + 1
      end repeat
      if m_fMoveTime >= 1.0 then
        m_bMoving = 0
      end if
      m_fMoveTime = m_fMoveTime + 1.57499992847443
    end if
  end if
  callAncestor(#update, this)
end
on select this
  if objectp(m_rGameEngine) then
    m_rGameEngine.ShowAllowedMoves(this)
  end if
  t_rBlock = this.GetBlocks()[1]
  t_ar_rSprites = t_rBlock.GetVisual().GetSprites()
  put "#" && t_ar_rSprites[1].locZ && t_ar_rSprites[2].locZ
end
on SetAllowedTiles this, a_ar_iTileRefs
  m_ar_iAllowedTiles = a_ar_iTileRefs
end
on GetAllowedTiles this
  return m_ar_iAllowedTiles
end
on SetToTileStack this, a_rTile, a_iStack
  if m_bInitialized then
    t_mp_SndObj = [#obj: VOID]
    executeMessage("PlayFxSound", "checkers-movepiece", 1, t_mp_SndObj)
    m_sndObj = t_mp_SndObj.obj
    m_bMoving = 1
    m_fMoveTime = 0.0
    t_veSource = this.getObject().GetAbsPos()
    t_veTarget = a_rTile.GetAbsPos()
    t_veMiddle = t_veSource + (t_veTarget - t_veSource) / 2 + vector(0, 0, 20)
    m_rCurve.clear()
    m_rCurve.AddTriple(t_veSource, t_veMiddle, t_veTarget)
  end if
  return callAncestor(#SetToTileStack, this, a_rTile, a_iStack)
end