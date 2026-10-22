-- Behavior
property m_iGameID
property m_rPlayers
property m_rInterface
property m_rRoomContext
property m_rTileSetBoard
property m_mp_iRef_rPiece
property m_ar_rTileIndicators
property m_ar_rTileIndicatorPool
property m_iCurrentTrick
property m_iOwnPlayer
property m_iWhosTurn

on construct this
  m_rPlayers = [:]
  m_mp_iRef_rPiece = [:]
  m_ar_rTileIndicators = []
  m_ar_rTileIndicatorPool = []
  m_iCurrentTrick = -1
  m_iOwnPlayer = 0
  m_iWhosTurn = 0
  return 1
end
on deconstruct this
  if objectp(m_rInterface) then
    removeObject(m_rInterface.getID())
    m_rInterface = VOID
  end if
  repeat with t_rObj in m_ar_rTileIndicators
    removeObject(t_rObj.getID())
  end repeat
  repeat with t_rObj in m_ar_rTileIndicatorPool
    removeObject(t_rObj.getID())
  end repeat
  m_ar_rTileIndicators = VOID
  m_ar_rTileIndicatorPool = VOID
  m_mp_iRef_rPiece = VOID
  m_rTileSetBoard = VOID
  m_rRoomContext = VOID
  return 1
end
on setup this, a_iGameID, a_rRoomContext
  m_iGameID = a_iGameID
  m_rRoomContext = a_rRoomContext
  t_iRef = 0
  repeat while 1
    t_rTileSet = a_rRoomContext._AccessIndexed(t_iRef, "floor")
    if voidp(t_rTileSet) then
      exit repeat
    end if
    if t_rTileSet.GetParam("NAME") = "board" then
      m_rTileSetBoard = t_rTileSet
      exit repeat
    end if
    t_iRef = t_iRef + 1
  end repeat
  if voidp(m_rTileSetBoard) then
    return error(this, "Checkers board tileset not found!", #setup)
  end if
  m_mp_iRef_rPiece = [:]
  t_rIterator = a_rRoomContext.GetIterator("element")
  repeat while 1
    t_rPiece = t_rIterator.getToken()
    if voidp(t_rPiece) then
      exit repeat
    end if
    if t_rPiece.GetParam("CHECKERS_GAME_PIECE") then
      t_iRef = integer(t_rPiece.GetParam("REF"))
      m_mp_iRef_rPiece.setaProp(t_iRef, t_rPiece)
      t_rPiece.GetFactor().SetGameEngine(this)
      t_rPiece.GetFactor().SetAllowedTiles([])
    end if
    if not t_rIterator.NextToken() then
      exit repeat
    end if
  end repeat
  t_rIterator.clear()
  t_rIterator = VOID
  if objectp(m_rInterface) then
    error(this, "Checkers game interface already running!", #setup)
    removeObject(m_rInterface.getID())
  end if
  m_rInterface = createObject(getUniqueID(), "CCheckersGameInterface")
  m_rInterface.SetGameEngine(this)
end
on AddPlayer this, a_iAvatarRef, a_rMsg
  t_iLevel = a_rMsg.connection.GetIntFrom()
  t_iIndex = a_rMsg.connection.GetIntFrom() + 1
  t_rAvatar = m_rRoomContext._AccessIndexed(a_iAvatarRef, "avatar")
  t_iPoints = 0
  m_rPlayers.setaProp(a_iAvatarRef, [#index: t_iIndex, #name: t_rAvatar.GetParam("NAME"), #points: t_iPoints, #level: t_iLevel, #tricks: 0])
  put m_rPlayers.getaProp(a_iAvatarRef)
  if t_rAvatar.GetParam("NAME") = getObject(#session).get("name") then
    m_iOwnPlayer = t_iIndex
  end if
  if objectp(m_rInterface) then
    m_rInterface.AddPlayer(a_iAvatarRef, t_rAvatar.GetParam("NAME"), t_iIndex)
  end if
  this.UpdatePoints(a_iAvatarRef, t_iPoints)
end
on RemovePlayer this, a_iAvatarRef, a_rMsg
  m_rPlayers.deleteProp(a_iAvatarRef)
  if objectp(m_rInterface) then
    m_rInterface.RemovePlayer(a_iAvatarRef)
  end if
end
on GameStart this, a_rMsg
  t_iMaxTricks = a_rMsg.connection.GetIntFrom()
  t_iTimePerTurn = a_rMsg.connection.GetIntFrom()
  t_bIsNewGame = a_rMsg.connection.GetIntFrom()
  if objectp(m_rInterface) then
    if m_iOwnPlayer > 0 then
      m_rInterface.SetGameMode(#play)
    else
      m_rInterface.SetGameMode(#watch)
    end if
    m_rInterface.SetMaxTricks(t_iMaxTricks)
    m_rInterface.SetTimePerTurn(t_iTimePerTurn)
    m_rInterface.NotifyGameStart(t_bIsNewGame)
  end if
end
on GameEnd this, a_iWinnerRef, a_rMsg
  this.ClearAllowedMoves()
  m_mp_iRef_rPiece = [:]
  if objectp(m_rInterface) then
    m_rInterface.NotifyGameEnd(a_iWinnerRef)
    removeObject(m_rInterface.getID())
    m_rInterface = VOID
  end if
end
on GameEvent this, a_iEventType, a_rMsg
  case a_iEventType of
    0:
      this.UpdatePoints(a_rMsg.connection.GetIntFrom(), a_rMsg.connection.GetIntFrom())
    1:
      t_bContinuedTurn = a_rMsg.connection.GetIntFrom() = 1
      t_iPieces = a_rMsg.connection.GetIntFrom()
      t_mp_iPiece_ar_iTiles = [:]
      repeat with i = 1 to t_iPieces
        t_iPiece = a_rMsg.connection.GetIntFrom()
        t_iMoves = a_rMsg.connection.GetIntFrom()
        t_ar_iTiles = []
        t_mp_iPiece_ar_iTiles.setaProp(t_iPiece, t_ar_iTiles)
        repeat with j = 1 to t_iMoves
          t_ar_iTiles.add(a_rMsg.connection.GetIntFrom())
        end repeat
      end repeat
      this.UpdateAllowedMoves(t_mp_iPiece_ar_iTiles, 1, t_bContinuedTurn)
    2:
      t_iPiece = a_rMsg.connection.GetIntFrom()
      t_iState = a_rMsg.connection.GetIntFrom()
      t_rPiece = m_mp_iRef_rPiece.getaProp(t_iPiece)
      if objectp(t_rPiece) then
        t_rPiece.GetFactor().SetPieceState(t_iState)
      else
        error(this, "Game piece" && t_iPiece && "not found, can't set state!", #GameEvent)
      end if
    3:
      t_iAvatarRef = a_rMsg.connection.GetIntFrom()
      t_iCapturedPieces = a_rMsg.connection.GetIntFrom()
      t_iSecondsRemaining = a_rMsg.connection.GetIntFrom()
      t_iMaxNumOfTricks = a_rMsg.connection.GetIntFrom()
      t_iTricksUsed = a_rMsg.connection.GetIntFrom()
      if objectp(m_rInterface) then
        m_rInterface.update(t_iAvatarRef, t_iCapturedPieces, t_iSecondsRemaining, t_iMaxNumOfTricks, t_iTricksUsed)
      end if
    4:
      t_bContinuedTurn = a_rMsg.connection.GetIntFrom() = 1
      t_iPieces = a_rMsg.connection.GetIntFrom()
      t_mp_iPiece_ar_iTiles = [:]
      repeat with i = 1 to t_iPieces
        t_iPiece = a_rMsg.connection.GetIntFrom()
        t_iMoves = a_rMsg.connection.GetIntFrom()
        t_ar_iTiles = []
        t_mp_iPiece_ar_iTiles.setaProp(t_iPiece, t_ar_iTiles)
        repeat with j = 1 to t_iMoves
          t_ar_iTiles.add(a_rMsg.connection.GetIntFrom())
        end repeat
      end repeat
      this.UpdateAllowedMoves(t_mp_iPiece_ar_iTiles, 0, t_bContinuedTurn)
    5:
      t_iPlayer = a_rMsg.connection.GetIntFrom()
      t_iTrickNum = a_rMsg.connection.GetIntFrom()
      t_iPieces = a_rMsg.connection.GetIntFrom()
      t_ar_rPieces = []
      repeat with i = 1 to t_iPieces
        t_iPiece = a_rMsg.connection.GetIntFrom()
        t_rPiece = m_mp_iRef_rPiece.getaProp(t_iPiece)
        if objectp(t_rPiece) then
          t_ar_rPieces.add(t_rPiece.GetFactor())
        end if
      end repeat
      t_iParams = a_rMsg.connection.GetIntFrom()
      t_ar_iParams = []
      repeat with i = 1 to t_iParams
        t_ar_iParams.add(a_rMsg.connection.GetIntFrom())
      end repeat
      call(#PlayTrick, t_ar_rPieces, t_iTrickNum, t_ar_iParams)
      t_sAnim = getVariable("checkers.trick.anim.pin")
      if stringp(t_sAnim) and t_sAnim <> EMPTY then
        if this.GetPlayerIndexByAvatarRef(t_iPlayer) = 1 then
          t_rNode = m_rRoomContext.Search("NAME", "blue_magic")
        else
          t_rNode = m_rRoomContext.Search("NAME", "red_magic")
        end if
        case t_iTrickNum of
          1:
            t_sIcon = "item_2355"
          2:
            t_sIcon = "item_2356"
          3:
            t_sIcon = "item_2357"
          4:
            t_sIcon = "item_2358"
          5:
            t_sIcon = "item_2359"
          otherwise:
            t_sIcon = "null"

        end case
        t_vPos = t_rNode.GetScrPos()
        t_rAnim = createObject(getUniqueID(), "CCheckersSpriteAnimPlayer")
        t_rAnim.LoadAnimData(value(getMember(t_sAnim).text))
        t_rAnim.SetSprite(t_rNode.GetVisual().getSprite())
        t_rAnim.SetMemberList([t_sIcon])
        t_rAnim.SetSelfDestruct(1)
        t_rAnim.start()
      end if
    6:
      m_iCurrentTrick = a_rMsg.connection.GetIntFrom()
      t_iNumPieces = a_rMsg.connection.GetIntFrom()
      registerMessage("room_tile_selection", this.getID(), #_TileSelectedCbk)
      if objectp(m_rInterface) then
        m_rInterface.showmessage(getText("checkers.trick.select.piece"))
      end if
    7:
      t_iTrickType = a_rMsg.connection.GetIntFrom()
      t = createDialogWindow(this.getID(), getUniqueID(), 1, 0)
      t.setText(getText("checkers.trick.failed.title"), getText("checkers.trick.failed"), "Ok", "foo4")
      t.show()
    8:
      t_iItemRef = a_rMsg.connection.GetIntFrom()
      t_rPiece = m_rRoomContext._AccessIndexed(t_iItemRef, "element")
      if t_rPiece.GetParam("CHECKERS_GAME_PIECE") then
        m_mp_iRef_rPiece.setaProp(t_iItemRef, t_rPiece)
        t_rPiece.GetFactor().SetGameEngine(this)
        t_rPiece.GetFactor().SetAllowedTiles([])
      else
        error(this, "Referred object is not a game piece!", #GameEvent)
      end if
    9:
      t_iAvatar = a_rMsg.connection.GetIntFrom()
      t_iPiece = a_rMsg.connection.GetIntFrom()
      t_iTrickType = a_rMsg.connection.GetIntFrom()
      t_rPiece = m_rRoomContext._AccessIndexed(t_iPiece, "element")
      if objectp(t_rPiece) then
        t_rPiece.GetFactor().TrickAssigned(t_iTrickType)
      end if
    10:
      t_iAvatar = a_rMsg.connection.GetIntFrom()
    11:
      t_iAvatar = a_rMsg.connection.GetIntFrom()
    12:
      t_iMaxTricks = a_rMsg.connection.GetIntFrom()
      if objectp(m_rInterface) then
        m_rInterface.MaxTricksUsedWarning(t_iMaxTricks)
      end if
    13:
      t_iAvatar = a_rMsg.connection.GetIntFrom()
      if objectp(m_rInterface) then
        m_rInterface.IdleWarning()
      end if
    14:
      t_iAvatar = a_rMsg.connection.GetIntFrom()
      if objectp(m_rInterface) then
        m_rInterface.IdleWarningCancel()
      end if
    15:
      t_iAvatar = a_rMsg.connection.GetIntFrom()
      t_iPiece = a_rMsg.connection.GetIntFrom()
      t_iMoveType = a_rMsg.connection.GetIntFrom()
      t_iIndex = this.GetPlayerIndexByAvatarRef(t_iAvatar)
      if t_iIndex = m_iOwnPlayer then
        case t_iMoveType of
          1:
            m_rInterface.showmessage(getText("checkers.you.moved"))
          2:
            m_rInterface.showmessage(getText("checkers.you.jumped"))
          3:
            m_rInterface.showmessage(getText("checkers.you.jumped.again"))
          4:
            m_rInterface.showmessage(getText("checkers.your.turn.again"))

        end case
      else
        case t_iMoveType of
          1:
            m_rInterface.showmessage(getText("checkers.other.moved"))
          2:
            m_rInterface.showmessage(getText("checkers.other.jumped"))
          3:
            m_rInterface.showmessage(getText("checkers.other.jumped.again"))
          4:
            m_rInterface.showmessage(getText("checkers.other.jumped.again"))

        end case
      end if
    16:
      t_iAvatar = a_rMsg.connection.GetIntFrom()
      if objectp(m_rInterface) then
        m_rInterface.IdleWarningCancel()
      end if
    17:
      t_iPiece = a_rMsg.connection.GetIntFrom()
      t_iTrickType = a_rMsg.connection.GetIntFrom()
      t_rPiece = m_rRoomContext._AccessIndexed(t_iPiece, "element")
      if objectp(t_rPiece) then
        t_rPiece.GetFactor().TrickConsumed(t_iTrickType)
      end if
    18:
      t_iPiece = a_rMsg.connection.GetIntFrom()
      t_iTrickType = a_rMsg.connection.GetIntFrom()
      if objectp(m_rInterface) then
        m_rInterface.showmessage(getText("checkers.trick.not.allowed"))
      end if
    otherwise:
      error(this, "Unknown game event" && a_iEventType, #GameEvent)

  end case
end
on NextTurn this, a_iAvatarRef, a_rMsg
  this.HideAllowedMoves()
  this.ClearAllowedMoves()
  if objectp(m_rInterface) then
    m_rInterface.ShowTurn(a_iAvatarRef)
    t_iWhosTurn = this.GetPlayerIndexByAvatarRef(a_iAvatarRef)
    if m_iOwnPlayer = t_iWhosTurn then
      if m_iWhosTurn = t_iWhosTurn then
        m_rInterface.showmessage(getText("checkers.your.turn.again"))
      else
        m_rInterface.showmessage(getText("checkers.your.turn"))
      end if
    else
      m_rInterface.showmessage(getText("checkers.others.turn"))
    end if
  end if
  m_iWhosTurn = t_iWhosTurn
end
on UpdatePoints this, a_iAvatarRef, a_iPoints
  m_rPlayers.getaProp(a_iAvatarRef).setaProp(#points, a_iPoints)
end
on UpdateAllowedMoves this, a_mp_iPiece_ar_iTiles, a_bClearPrevious, a_bContinuedTurn
  if a_bClearPrevious then
    this.ClearAllowedMoves()
  end if
  t_iCount = m_mp_iRef_rPiece.count
  repeat with i = 1 to t_iCount
    t_rPiece = m_mp_iRef_rPiece[i]
    t_iRef = integer(t_rPiece.GetParam("REF"))
    t_ar_iTiles = a_mp_iPiece_ar_iTiles.getaProp(t_iRef)
    if voidp(t_ar_iTiles) then
      t_ar_iTiles = []
    end if
    t_rPiece.GetFactor().SetAllowedTiles(t_ar_iTiles)
  end repeat
  if objectp(m_rInterface) then
    m_rInterface.UpdateAllowedMoves(a_mp_iPiece_ar_iTiles, a_bClearPrevious, a_bContinuedTurn)
  end if
end
on ShowAllowedMoves this, a_rPiece
  this.HideAllowedMoves()
  t_rContext = getThread(#room).component._AccessRoom()
  t_ar_iTiles = a_rPiece.GetAllowedTiles()
  t_iCount = t_ar_iTiles.count
  repeat with i = 1 to t_iCount
    t_rTile = t_rContext._AccessIndexed(t_ar_iTiles[i], "tile")
    if voidp(t_rTile) then
      error(this, "Tile not found:" && t_ar_iTiles[i], #ShowAllowedMoves)
      next repeat
    end if
    if m_ar_rTileIndicatorPool.count then
      t_rObj = m_ar_rTileIndicatorPool[1]
      m_ar_rTileIndicatorPool.deleteAt(1)
    else
      t_rObj = createObject(getUniqueID(), "CCheckersGameAllowedTileIndicator")
      t_rObj.SetGameEngine(this)
    end if
    m_ar_rTileIndicators.add(t_rObj)
    t_rObj.ShowPosition(t_rTile, a_rPiece)
  end repeat
  if t_iCount then
    m_rInterface.showmessage(getText("checkers.piece.selected"))
  end if
end
on HideAllowedMoves this
  if listp(m_ar_rTileIndicators) then
    repeat with t_rObj in m_ar_rTileIndicators
      t_rObj.ShowPosition(VOID)
      m_ar_rTileIndicatorPool.add(t_rObj)
    end repeat
  end if
  m_ar_rTileIndicators = []
end
on ClearAllowedMoves this
  this.HideAllowedMoves()
  t_iCount = m_mp_iRef_rPiece.count
  repeat with t_rPiece in m_mp_iRef_rPiece
    t_rPiece.GetFactor().SetAllowedTiles([])
  end repeat
end
on GetPieceByRef this, a_iRef
  return m_mp_iRef_rPiece.getaProp(a_iRef)
end
on MovePiece this, a_rPiece, a_rTile
  if objectp(a_rPiece) then
    t_iPiece = integer(a_rPiece.getObject().GetParam("REF"))
    t_iTile = integer(a_rTile.getObject().GetParam("REF"))
    getConnection("VMK").send(950, [#integer: m_iGameID, #integer: 0, #integer: 2, #integer: t_iPiece, #integer: t_iTile])
  else
    error(this, "Given piece object is VOID!", #MovePiece)
  end if
end
on PieceRemoved this, a_rPiece
  if objectp(a_rPiece) then
    t_iPiece = integer(a_rPiece.getObject().GetParam("REF"))
    m_mp_iRef_rPiece.deleteProp(t_iPiece)
  else
    error(this, "Given piece object is VOID!", #PieceRemoved)
  end if
end
on GetPlayerDataByIndex this, a_iIndex
  repeat with t_rPlayer in m_rPlayers
    if t_rPlayer.index = a_iIndex then
      return t_rPlayer
      exit repeat
    end if
  end repeat
  return VOID
end
on GetPlayerIndexByAvatarRef this, a_iAvatarRef
  t_iCount = m_rPlayers.count
  repeat with i = 1 to t_iCount
    if m_rPlayers.getPropAt(i) = a_iAvatarRef then
      return the index of m_rPlayers[i]
      exit repeat
    end if
  end repeat
  return 0
end
on IsMyTurn this
  return m_iWhosTurn = m_iOwnPlayer and m_iOwnPlayer <> 0
end
on GetWhosTurn this
  return m_iWhosTurn
end
on GetRoomContext this
  return m_rRoomContext
end
on _TileSelectedCbk this, a_rTile
  t_iChildren = a_rTile.GetCount()
  if t_iChildren > 0 then
    getConnection("VMK").send(950, [#integer: m_iGameID, #integer: 2, #integer: 3, #integer: m_iCurrentTrick, #integer: 1, #integer: integer(a_rTile[1].GetParam("REF"))])
    unregisterMessage("room_tile_selection", this.getID())
  end if
end