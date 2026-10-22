-- Script
property m_rTile
property m_iStack
property m_ar_sKey
property m_bteleport
property m_sDelegate

on construct this
  m_rTile = VOID
  m_iStack = 0
  m_ar_sKey = []
  m_bteleport = 0
  m_sDelegate = VOID
  return 1
end
on deconstruct this
  if m_bteleport then
    removeObject(m_sDelegate)
    m_sDelegate = VOID
  end if
  t_rObj = this.getObject()
  if t_rObj.GetCount() = 0 then
    this.RemFromStack()
  end if
  repeat with t_sKey in m_ar_sKey
    t_rBlock = t_rObj.GetChild(t_sKey)
    if objectp(t_rBlock) then
      t_rObj.Remove(t_rBlock.GetKey())
      next repeat
    end if
    t_rContext = t_rObj.GetContext()
    t_rBlock = t_rObj.GetContext().GetObjByKey(t_sKey)
    if objectp(t_rBlock) then
      t_rBlock.GetOwner().Remove(t_sKey)
      next repeat
    end if
  end repeat
  m_rTile = VOID
  m_iStack = 0
  m_ar_sKey = []
  return 1
end
on SetToTileStack this, a_rTile, a_iStack
  t_rTile = a_rTile
  repeat while 1
    if voidp(t_rTile) then
      error(this, "Failed to find tile!", #SetToTileStack)
      exit repeat
    end if
    if t_rTile.GetOwner().GetParam("CLASS") = "floor" then
      exit repeat
      next repeat
    end if
    t_rTile = t_rTile.GetOwner()
  end repeat
  if this._TestComposition(t_rTile, a_iStack) then
    this.getObject().SetAbsPos(t_rTile.GetAbsPos())
    m_rTile = t_rTile
    m_iStack = a_iStack
    this._ComposeBlocks()
  else
    return 0
  end if
  if not m_bteleport then
    t_ar_rBlocks = this.getObject().GetFactor().GetBlocks()
    repeat with t_rBlock in t_ar_rBlocks
      if t_rBlock.GetParam("ACT") = 1 then
        m_bteleport = 1
        m_sDelegate = getUniqueID()
        t_rDelegate = createObject(m_sDelegate, "CFurniPairedItemDelegate")
        t_rDelegate.SetClientItem(this.getObject())
        exit repeat
      end if
    end repeat
  end if
  return 1
end
on RemFromStack this
  t_rContext = this.getObject().GetContext()
  repeat with t_sKey in m_ar_sKey
    t_rBlock = t_rContext.GetObjByKey(t_sKey)
    if objectp(t_rBlock) then
      if t_rBlock.GetCount() > 0 then
        t_rAbove = t_rBlock[1]
        t_rBelow = t_rBlock.GetOwner()
        t_rBlock.RemChild(t_rAbove.GetKey())
        t_rAbove.SetOwner(t_rBelow)
        t_rBelow.SetChild(t_rAbove.GetKey(), t_rAbove)
      end if
      t_rBlock.GetOwner().RemChild(t_rBlock.GetKey())
      this.getObject().SetChild(t_rBlock.GetKey(), t_rBlock)
      t_rBlock.SetOwner(this.getObject())
    end if
  end repeat
end
on GetTheTileStack this
  return m_rTile
  t_rUnknown = this.getObject().GetOwner()
  repeat while 1
    if objectp(t_rUnknown) then
      t_sCls = t_rUnknown.GetParam("CLASS")
      if t_sCls = "tile" or t_sCls = "exit" or t_sCls = "teleport" or t_sCls = "queue" or t_sCls = "sit" then
        return t_rUnknown
      else
        t_rUnknown = t_rUnknown.GetOwner()
      end if
      next repeat
    end if
    return VOID
  end repeat
end
on CanBeMoved this
  t_rContext = this.getObject().GetContext()
  repeat with t_sKey in m_ar_sKey
    t_rBlock = t_rContext.GetObjByKey(t_sKey)
    if objectp(t_rBlock) then
      t_iCount = t_rBlock.GetCount()
      if t_iCount > 0 then
        repeat with i = 1 to t_iCount
          t_rAbove = t_rBlock[i]
          if t_rAbove.GetParam("CLASS") <> "avatar" and not (m_ar_sKey.getPos(t_rAbove.GetKey()) <> 0) then
            return 0
            exit repeat
          end if
        end repeat
      end if
    end if
  end repeat
  return 1
end
on GetBlocks this
  t_ar_rBlock = []
  t_rContext = this.getObject().GetContext()
  repeat with t_sKey in m_ar_sKey
    t_ar_rBlock.add(t_rContext.GetObjByKey(t_sKey))
  end repeat
  return t_ar_rBlock
end
on setState this, a_iState
end
on select this
  if m_bteleport then
    t_ar_vParams = this.getObject().GetParam("PARAMS")
    if ilk(t_ar_vParams, #list) then
      executeMessage("teleport_selected", t_ar_vParams[2])
    end if
  end if
end
on Unselect this
  if m_bteleport then
    t_ar_vParams = this.getObject().GetParam("PARAMS")
    if ilk(t_ar_vParams, #list) then
      executeMessage("teleport_unselected", t_ar_vParams[2])
    end if
  end if
end
on ItemConfiguration this, t_iRef, a_ar_Configuration
end
on CurrentItemConfiguration this, t_iRef, a_ar_Configuration
end
on ItemConfigurationUsed this, t_iRef, t_iStatus, a_ar_Params
end
on _ComposeBlocks this
  t_bReturn = 1
  t_rContext = this.getObject().GetContext()
  t_rObj = this.getObject()
  t_rStruct = t_rObj.GetParam("STRUCT")
  t_iDir = integer(t_rObj.GetParam("DIR"))
  repeat with t_rDir in t_rStruct.child
    if integer(t_rDir.param["NUM"]) = t_iDir then
      t_rBlocks = t_rDir.child
      exit repeat
    end if
  end repeat
  if voidp(t_rBlocks) then
    return 1
  end if
  t_rXML = CreateXML(getMember("room.object.block.xml").text)
  t_rXML.Search("type", "NODE")
  t_rXML.SetParam("ELEMENT_TYPE", t_rObj.GetParam("TYPE"))
  t_iTileSize = integer(this.getObject().GetContext().GetParam("TILESIZE"))
  t_ar_rBlocks = []
  repeat with t_sKey in m_ar_sKey
    t_rBlock = t_rContext.GetObjByKey(t_sKey)
    if objectp(t_rBlock) then
      t_rBlock.GetFactor().SetToTileStack(t_rObj, 0)
      t_ar_rBlocks.add(t_rBlock)
    end if
  end repeat
  m_ar_sKey = []
  t_rFloor = m_rTile
  repeat while 1
    if t_rFloor.GetParam("CLASS") = "floor" then
      exit repeat
      next repeat
    end if
    t_rFloor = t_rFloor.GetOwner()
  end repeat
  repeat with t_rBlock in t_rBlocks
    t_iX = m_rTile.GetRelPos().x + integer(t_rBlock.param["X"]) * t_iTileSize
    t_iY = m_rTile.GetRelPos().y + integer(t_rBlock.param["Y"]) * t_iTileSize
    t_rTile = t_rFloor.GetFactor().GetTileByRelLoc(t_iX, t_iY)
    t_iStack = 0
    if voidp(t_rTile) then
      t_bReturn = 0
      t_rTile = this.GetTheTileStack()
      error(this, "Failed to find tile for block!", #_ComposeBlocks)
    else
      t_rCopy = t_rTile
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      if t_rCopy.GetParam("CLASS") = "avatar" then
        t_rCopy = t_rCopy.GetOwner()
        t_iStack = t_iStack - 1
      end if
    end if
    if t_ar_rBlocks.count > 0 then
      t_rOld = t_ar_rBlocks[1]
      t_ar_rBlocks.deleteAt(1)
      t_rOld.SetParam("REF", t_rObj.GetParam("REF"))
      t_rOld.SetParam("NAME", t_rBlock.param["NAME"])
      t_rOld.SetParam("HGT", t_rBlock.param["HGT"])
      t_rOld.SetParam("X", "0")
      t_rOld.SetParam("Y", "0")
      t_rOld.SetParam("Z", "0")
      t_rOld.SetParam("SPRITES", t_rBlock.child)
      t_rOld.SetParam("SIT", t_rBlock.param["SIT"])
      t_rOld.SetParam("WLK", t_rBlock.param["WLK"])
      t_rOld.SetParam("STK", t_rBlock.param["STK"])
      t_rOld.SetParam("TILESIZE", t_rStruct.param["TILESIZE"])
      if not voidp(t_rBlock.param["ACT"]) then
        t_rOld.SetParam("ACT", t_rBlock.param["ACT"])
      end if
      if not voidp(t_rBlock.param["ZTRANS"]) then
        t_rOld.SetParam("ZTRANS", t_rBlock.param["ZTRANS"])
      end if
      if not voidp(t_rBlock.param["NOCLK"]) then
        t_rOld.SetParam("NOCLK", t_rBlock.param["NOCLK"])
      end if
      m_ar_sKey.append(t_rOld.GetKey())
      t_rOld.GetFactor().SetToTileStack(t_rTile, t_iStack)
      next repeat
    end if
    t_rXML.SetParam("REF", t_rObj.GetParam("REF"))
    t_rXML.SetParam("NAME", t_rBlock.param["NAME"])
    t_rXML.SetParam("HGT", t_rBlock.param["HGT"])
    t_rXML.SetParam("X", "0")
    t_rXML.SetParam("Y", "0")
    t_rXML.SetParam("Z", "0")
    t_rXML.SetParam("SPRITES", t_rBlock.child)
    t_rXML.SetParam("SIT", t_rBlock.param["SIT"])
    t_rXML.SetParam("WLK", t_rBlock.param["WLK"])
    t_rXML.SetParam("STK", t_rBlock.param["STK"])
    t_rXML.SetParam("TILESIZE", t_rStruct.param["TILESIZE"])
    if not voidp(t_rBlock.param["ACT"]) then
      t_rXML.SetParam("ACT", t_rBlock.param["ACT"])
    end if
    if not voidp(t_rBlock.param["ZTRANS"]) then
      t_rXML.SetParam("ZTRANS", t_rBlock.param["ZTRANS"])
    end if
    if not voidp(t_rBlock.param["NOCLK"]) then
      t_rXML.SetParam("NOCLK", t_rBlock.param["NOCLK"])
    end if
    t_sKey = t_rObj.createKey()
    if t_rObj.create(t_sKey, t_rXML) then
      t_rNew = t_rObj.Access(t_sKey)
      m_ar_sKey.append(t_sKey)
      t_rNew.GetFactor().SetToTileStack(t_rTile, t_iStack)
      next repeat
    end if
    t_bReturn = 0
    error(this, "Failed to create furni block!", #_ComposeBlocks)
  end repeat
  if t_ar_rBlocks.count > 0 then
    repeat with t_rBlock in t_ar_rBlocks
      t_rObj.GetContext().Remove(t_rBlock.GetKey())
    end repeat
    t_ar_rBlocks = []
  end if
  return t_bReturn
end
on _TestComposition this, a_rTile, a_iStack
  t_rContext = this.getObject().GetContext()
  t_rObj = this.getObject()
  t_rStruct = t_rObj.GetParam("STRUCT")
  t_iDir = integer(t_rObj.GetParam("DIR"))
  repeat with t_rDir in t_rStruct.child
    if integer(t_rDir.param["NUM"]) = t_iDir then
      t_rBlocks = t_rDir.child
      exit repeat
    end if
  end repeat
  if voidp(t_rBlocks) then
    return 1
  end if
  t_iTileSize = integer(this.getObject().GetContext().GetParam("TILESIZE"))
  if voidp(a_rTile) then
    return 0
  end if
  t_rFloor = a_rTile
  t_iLoopBreaker = 1
  repeat while 1
    if t_rFloor.GetParam("CLASS") = "floor" then
      exit repeat
    else
      t_rFloor = t_rFloor.GetOwner()
    end if
    t_iLoopBreaker = t_iLoopBreaker + 1
    if t_iLoopBreaker > 100 then
      error(this, "ROOM DATABASE CORRUPTED: Infinite loop in find floor object!", #_TestComposition)
      return 0
    end if
  end repeat
  repeat with t_rBlock in t_rBlocks
    t_iX = a_rTile.GetRelPos().x + integer(t_rBlock.param["X"]) * t_iTileSize
    t_iY = a_rTile.GetRelPos().y + integer(t_rBlock.param["Y"]) * t_iTileSize
    t_rTile = t_rFloor.GetFactor().GetTileByRelLoc(t_iX, t_iY)
    if voidp(t_rTile) then
      return 0
    end if
  end repeat
  return 1
end
on TeleportSelected this, a_iOtherID
  t_ar_vParams = this.getObject().GetParam("PARAMS")
  if ilk(t_ar_vParams, #list) then
    if a_iOtherID = t_ar_vParams[3] then
      this.getObject().GetVisual().SetCustomHighlighters(1, #teleportpair)
    end if
  end if
end
on TeleportUnSelected this, a_iOtherID
  t_ar_vParams = this.getObject().GetParam("PARAMS")
  if ilk(t_ar_vParams, #list) then
    if a_iOtherID = t_ar_vParams[3] then
      this.getObject().GetVisual().SetCustomHighlighters(0)
    end if
  end if
end
on GetKeys this
  return m_ar_sKey
end