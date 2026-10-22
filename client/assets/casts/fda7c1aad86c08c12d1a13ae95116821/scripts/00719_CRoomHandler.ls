-- Behavior
property m_rXMLElement
property m_rXMLPoster
property m_rXMLAvatar
property m_rXMLCollectable
property m_iIDMaker

on construct this
  m_rXMLElement = CreateXML(getMember("room.object.element.xml").text)
  m_rXMLElement.Search("type", "NODE")
  m_rXMLAvatar = CreateXML(getMember("room.object.avatar.xml").text)
  m_rXMLAvatar.Search("type", "NODE")
  m_rXMLPoster = CreateXML(getMember("room.object.poster.xml").text)
  m_rXMLPoster.Search("type", "NODE")
  m_rXMLCollectable = CreateXML(getMember("room.object.collectable.xml").text)
  m_rXMLCollectable.Search("type", "NODE")
  m_iIDMaker = 0
  return this._Config(1)
end
on deconstruct this
  m_rXMLElement = VOID
  m_rXMLAvatar = VOID
  m_rXMLPoster = VOID
  m_rXMLCollectable = VOID
  return this._Config(0)
end
on _EnterRoom this, a_rMsg
  t_iRoomCode = a_rMsg.connection.GetIntFrom()
  t_iRoomVer = a_rMsg.connection.GetIntFrom()
  t_sRoomText = a_rMsg.connection.GetStrFrom()
  t_iRoomRef = a_rMsg.connection.GetIntFrom()
  t_rLoader = getObject("RoomItemAssetManager")
  t_rLoader.FlushQueue()
  if variableExists("preload." & t_iRoomRef) then
    t_ar_iItems = getVariableValue("preload." & t_iRoomRef)
    if listp(t_ar_iItems) then
      repeat with t_iType in t_ar_iItems
        if not t_rLoader.IsItemReady(t_iType) then
          t_rLoader.LoadCastLibsForType(t_iType)
        end if
      end repeat
    else
      error(this, "List of preloaded items for room" && t_iRoomRef && "is corrupted!", #_EnterRoom)
    end if
  end if
  if variableExists("room.code." & t_iRoomCode) then
    t_sRoomName = getVariable("room.code." & t_iRoomCode)
  else
    error(this, "Room name not defined:" && t_iRoomCode, #_EnterRoom)
    t_sRoomName = string(t_iRoomCode)
  end if
  t_ar_sCasts = []
  if variableExists("room.cast." & t_iRoomCode & ".1") then
    i = 1
    repeat while 1
      t_ar_sCasts.add(getVariable("room.cast." & t_iRoomCode & "." & i))
      i = i + 1
      if not variableExists("room.cast." & t_iRoomCode & "." & i) then
        exit repeat
      end if
    end repeat
  else
    if variableExists("room.cast." & t_iRoomCode) then
      t_ar_sCasts = [getVariable("room.cast." & t_iRoomCode)]
    else
      error(this, "Room casts not defined:" && t_iRoomCode, #_EnterRoom)
      t_ar_sCasts = []
    end if
  end if
  t_rXML = CreateXML(getMember("room.files.xml").text)
  if t_rXML.Search("type", "FILES") then
    t_rXML.SetParam("ID", t_sRoomName)
    t_rXML.SetParam("CODE", t_iRoomCode)
    if t_rXML.Search("type", "CASTS") then
      if t_rXML.count() < t_ar_sCasts.count then
        repeat while 1
          t_rXML.SetChild(string(the milliSeconds), t_rXML[1].duplicate())
          if t_rXML.count() >= t_ar_sCasts.count then
            exit repeat
          end if
        end repeat
      end if
      repeat with i = 1 to t_ar_sCasts.count
        t_rXML[i].param.setaProp("URL", t_ar_sCasts[i])
      end repeat
    end if
  end if
  this.getComponent()._CreateRoom(t_rXML, t_iRoomVer, t_iRoomRef)
  this.getInterface().ShowLoadBar(t_sRoomText, t_iRoomCode)
end
on _LeaveRoom this, a_rMsg
  if a_rMsg.connection.GetIntFrom() <> 0 then
    this.component._RemoveRoom()
  end if
end
on _CreateFloors this, a_rMsg
  put "TODO / Create floor message!!!"
end
on _RemoveFloor this, a_rMsg
  put "TODO / Remove floor message!!!"
end
on _CreateAvatars this, a_rMsg
  t_rInput = a_rMsg.connection
  t_rContext = this.getComponent()._AccessRoom()
  if voidp(t_rContext) then
    return error(this, "Room context not available!", #_CreateAvatars)
  end if
  t_iCount = t_rInput.GetIntFrom()
  repeat with i = 1 to t_iCount
    t_sName = t_rInput.GetStrFrom()
    t_iSex = t_rInput.GetIntFrom()
    t_sDesc = t_rInput.GetStrFrom()
    t_ar_iFigure = []
    repeat with j = 1 to 12
      t_ar_iFigure.append(t_rInput.GetIntFrom())
    end repeat
    t_iPins = t_rInput.GetIntFrom()
    t_ar_ar_iPins = []
    repeat with j = 1 to t_iPins
      t_iCode = t_rInput.GetIntFrom()
      t_iLevel = t_rInput.GetIntFrom()
      t_iSingleUse = t_rInput.GetIntFrom()
      t_ar_ar_iPins.add([t_iCode, t_iLevel, t_iSingleUse])
    end repeat
    t_iIcons = t_rInput.GetIntFrom()
    t_ar_iIcons = []
    repeat with j = 1 to t_iIcons
      t_iCode = t_rInput.GetIntFrom()
      t_ar_iIcons.add(t_iCode)
    end repeat
    t_iRef = t_rInput.GetIntFrom()
    t_iTile = t_rInput.GetIntFrom()
    t_iStack = t_rInput.GetIntFrom()
    t_ar_iActions = []
    repeat with j = 1 to 12
      t_ar_iActions.add(t_rInput.GetIntFrom())
    end repeat
    t_sTradeState = string(t_ar_iActions[9])
    t_sFriendRequest = string(t_ar_iActions[12])
    t_rObj = t_rContext._AccessIndexed(t_iRef, "avatar")
    if objectp(t_rObj) then
      t_rObj.SetParam("NAME", t_sName)
      t_rObj.SetParam("SEX", string(t_iSex))
      t_rObj.SetParam("DESC", t_sDesc)
      t_rObj.SetParam("TRADE", t_sTradeState)
      t_rObj.SetParam("FRIEND", t_sFriendRequest)
    else
      m_rXMLAvatar.SetParam("REF", string(t_iRef))
      m_rXMLAvatar.SetParam("NAME", t_sName)
      m_rXMLAvatar.SetParam("SEX", string(t_iSex))
      m_rXMLAvatar.SetParam("DESC", t_sDesc)
      m_rXMLAvatar.SetParam("TRADE", t_sTradeState)
      m_rXMLAvatar.SetParam("FRIEND", t_sFriendRequest)
      if t_rContext._CreateIndexed(t_iRef, "avatar", m_rXMLAvatar) then
        t_rObj = t_rContext._AccessIndexed(t_iRef, "avatar")
      end if
    end if
    repeat with j = 1 to t_ar_ar_iPins.count
      t_rObj.SetParam("pin.type." & j, t_ar_ar_iPins[j][1])
      t_rObj.SetParam("pin.level." & j, t_ar_ar_iPins[j][2])
      t_rObj.SetParam("pin.singleuse." & j, t_ar_ar_iPins[j][3])
    end repeat
    repeat with k = j to 15
      t_rObj.RemParam("pin.type." & k)
      t_rObj.RemParam("pin.level." & k)
      t_rObj.RemParam("pin.singleuse." & k)
    end repeat
    repeat with j = 1 to t_ar_iIcons.count
      t_rObj.SetParam("icon.type." & j, t_ar_iIcons[j])
    end repeat
    repeat with k = j to 4
      t_rObj.RemParam("icon.type." & k)
    end repeat
    t_rTransfer = [#input: t_ar_iFigure, #Output: t_rObj.GetVisual().GetRenderer(), #avatar: t_rObj]
    executeMessage("CreateAvatar", t_rTransfer)
    if objectp(t_rTransfer.Output) then
      t_rObj = t_rContext._AccessIndexed(t_iRef, "avatar")
      t_rObj.GetVisual().SetRenderer(t_rTransfer.Output)
      t_rObj.GetVisual().Actions(t_ar_iActions)
      t_rObj.GetVisual().SetOutlook(t_ar_iFigure)
      if t_iTile = -1 then
        t_rObj.GetVisual().visible(0, 0)
        t_rObj.GetVisual().SetAvatarOnTile(0)
      end if
    end if
    t_rTile = t_rContext._AccessIndexed(t_iTile, "tile")
    if objectp(t_rTile) then
      if not t_rObj.GetFactor().SetToTileStack(t_rTile, t_iStack) then
        error(this, "Failed to set avatar into a tile!", #_CreateAvatars)
      end if
      next repeat
    end if
    error(this, "Referred tile not found:" && t_iTile, #_CreateAvatars)
  end repeat
end
on _ModifyAvatar this, a_rMsg
  t_rInput = a_rMsg.connection
  t_rContext = this.getComponent()._AccessRoom()
  if voidp(t_rContext) then
    return error(this, "Room context not available!", #_ModifyAvatar)
  end if
  t_iRef = t_rInput.GetIntFrom()
  t_rObj = t_rContext._AccessIndexed(t_iRef, "avatar")
  if objectp(t_rObj) then
    t_ar_iFigure = []
    repeat with j = 1 to 12
      t_ar_iFigure.append(t_rInput.GetIntFrom())
    end repeat
    t_rObj.GetVisual().SetOutlook(t_ar_iFigure)
    t_iRef = t_rInput.GetIntFrom()
    t_iTile = t_rInput.GetIntFrom()
    t_iStack = t_rInput.GetIntFrom()
    t_ar_iActions = []
    repeat with j = 1 to 12
      t_ar_iActions.add(t_rInput.GetIntFrom())
    end repeat
    t_rTransfer = [#input: t_ar_iFigure, #Output: t_rObj.GetVisual().GetRenderer(), #avatar: t_rObj]
    executeMessage("CreateAvatar", t_rTransfer)
    if objectp(t_rTransfer.Output) then
      t_rObj.GetVisual().SetRenderer(t_rTransfer.Output)
      t_rObj.GetVisual().Actions(t_ar_iActions)
    end if
  end if
end
on _RemoveAvatar this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_rTransfer = [#input: [], #Output: VOID, #avatar: t_iRef]
  executeMessage("RemoveAvatar", t_rTransfer)
  t_rContext = this.getComponent()._AccessRoom()
  if objectp(t_rContext) then
    t_rContext._RemoveIndexed(t_iRef, "avatar")
  else
    error(this, "Room context not available!", #_RemoveAvatar)
  end if
end
on _LocateAvatar this, a_rMsg
  t_rContext = this.getComponent()._AccessRoom()
  if voidp(t_rContext) then
    error(this, "Room context not available!", #_LocateAvatar)
  else
    t_iAvatar = a_rMsg.connection.GetIntFrom()
    t_rAvatar = t_rContext._AccessIndexed(t_iAvatar, "avatar")
    t_iTile = a_rMsg.connection.GetIntFrom()
    t_rTile = t_rContext._AccessIndexed(t_iTile, "tile")
    t_iStack = a_rMsg.connection.GetIntFrom()
    t_iheadDir = a_rMsg.connection.GetIntFrom()
    t_iBodyDir = a_rMsg.connection.GetIntFrom()
    case 1 of
      voidp(t_rAvatar):
        error(this, "Avatar not found:" && t_iAvatar, #_LocateAvatar)
      voidp(t_rTile):
        error(this, "Tile not found:" && t_iTile, #_LocateAvatar)
      otherwise:
        if not t_rAvatar.GetFactor().SetToTileStack(t_rTile, t_iStack) then
          error(this, "Failed to set avatar into a tile!", #_LocateAvatar)
        else
          if not t_rAvatar.GetVisual().GetAvatarOnTile() then
            t_rAvatar.GetVisual().SetAvatarOnTile(1)
            t_rRenderer = t_rAvatar.GetVisual().GetRenderer()
            t_rRenderer.Refresh(t_iheadDir, t_iBodyDir)
            t_rAvatar.GetVisual().visible(1, 1)
          end if
        end if

    end case
  end if
end
on _CreateElements this, a_rMsg
  t_rInput = a_rMsg.connection
  t_rLoader = getObject("RoomItemAssetManager")
  t_rContext = this.getComponent()._AccessRoom()
  if voidp(t_rContext) then
    return error(this, "Room context not available!", #_CreateElements)
  end if
  t_rFurniMap = this.component.m_rFurniMap
  t_iCount = t_rInput.GetIntFrom()
  repeat with i = 1 to t_iCount
    t_iRef = t_rInput.GetIntFrom()
    t_iTypeCode = t_rInput.GetIntFrom()
    t_iCategory = t_rInput.GetIntFrom()
    t_iPlaceRef = t_rInput.GetIntFrom()
    t_iAllowGuestMove = t_rInput.GetIntFrom()
    t_rStruct = t_rFurniMap.GetByTypeCode(t_iTypeCode)
    t_iPrm = t_rInput.GetIntFrom()
    t_ar_iParams = []
    case t_iCategory of
      1, 5:
        t_iDir = t_rInput.GetIntFrom()
        t_iPrm = t_iPrm - 1
        if t_iPrm then
          t_iState = t_rInput.GetIntFrom()
          t_iPrm = t_iPrm - 1
        else
          t_iState = 0
        end if
        if t_iPrm > 0 then
          t_ar_Params = []
          repeat with j = 1 to t_iPrm
            t_ar_Params.append(t_rInput.GetIntFrom())
          end repeat
        else
          t_ar_Params = VOID
        end if
        m_rXMLElement.SetParam("REF", string(t_iRef))
        m_rXMLElement.SetParam("TYPE", string(t_iTypeCode))
        m_rXMLElement.SetParam("DIR", string(t_iDir))
        m_rXMLElement.SetParam("STATE", string(t_iState))
        m_rXMLElement.SetParam("GUESTMOVE", string(t_iAllowGuestMove))
        m_rXMLElement.SetParam("STRUCT", t_rStruct)
        m_rXMLElement.SetParam("PARAMS", t_ar_Params)
        t_rTile = t_rContext._AccessIndexed(t_iPlaceRef, "tile")
        if objectp(t_rTile) then
          t_iStack = 0
          t_rCopy = t_rTile
          repeat while 1
            if t_rCopy.GetCount() > 0 then
              t_rCopy = t_rCopy[1]
              t_iStack = t_iStack + 1
              next repeat
            end if
            exit repeat
          end repeat
          if t_rContext._CreateIndexed(t_iRef, "element", m_rXMLElement) then
            t_rObject = t_rContext._AccessIndexed(t_iRef, "element")
            if t_rObject.GetFactor().SetToTileStack(t_rTile, t_iStack) then
              t_rLoader.LoadCastLibsForItem(t_rObject)
              t_rObject.GetFactor().setState(t_iState)
            else
              error(this, "Failed to set item into a tile!", #_CreateElements)
            end if
          end if
        else
          error(this, "Referred tile not found:" && t_iPlaceRef, #_CreateElements)
        end if
      3:
        t_iX = t_rInput.GetIntFrom()
        t_iY = t_rInput.GetIntFrom()
        t_iZ = t_rInput.GetIntFrom()
        t_iDir = 5
        t_iPrm = t_iPrm - 3
        repeat with j = 1 to t_iPrm
          t_ar_iParams.add(t_rInput.GetIntFrom())
        end repeat
        m_rXMLPoster.SetParam("REF", string(t_iRef))
        m_rXMLPoster.SetParam("TYPE", string(t_iTypeCode))
        m_rXMLPoster.SetParam("DIR", string(t_iDir))
        m_rXMLPoster.SetParam("GUESTMOVE", string(t_iAllowGuestMove))
        m_rXMLPoster.SetParam("STRUCT", t_rStruct)
        t_rWall = t_rContext._AccessIndexed(t_iPlaceRef, "wall")
        if objectp(t_rWall) then
          if t_rContext._CreateIndexed(t_iRef, "poster", m_rXMLPoster) then
            t_rContext._AccessIndexed(t_iRef, "poster").GetFactor().PlaceTo(t_rWall, vector(t_iX, t_iY, t_iZ))
          end if
        else
          error(this, "Referred wall not found:" && t_iPlaceRef, #_CreateElements)
        end if
      6, 7:
        t_iDir = t_rInput.GetIntFrom()
        t_iPrm = t_iPrm - 1
        if t_iPrm then
          t_iState = t_rInput.GetIntFrom()
        else
          t_iState = 0
        end if
        m_rXMLCollectable.SetParam("REF", string(t_iRef))
        m_rXMLCollectable.SetParam("TYPE", string(t_iTypeCode))
        m_rXMLCollectable.SetParam("DIR", "5")
        m_rXMLCollectable.SetParam("STATE", string(t_iState))
        m_rXMLCollectable.SetParam("STRUCT", t_rStruct)
        t_rTile = t_rContext._AccessIndexed(t_iPlaceRef, "tile")
        if objectp(t_rTile) then
          t_iStack = 0
          t_rCopy = t_rTile
          repeat while 1
            if t_rCopy.GetCount() > 0 then
              t_rCopy = t_rCopy[1]
              t_iStack = t_iStack + 1
              next repeat
            end if
            exit repeat
          end repeat
          if t_rContext._CreateIndexed(t_iRef, "collectable", m_rXMLCollectable) then
            t_rObject = t_rContext._AccessIndexed(t_iRef, "collectable")
            t_rFactor = t_rObject.GetFactor()
            if t_rFactor.SetToTileStack(t_rTile, t_iStack) then
              t_rLoader.LoadCastLibsForItem(t_rObject)
              t_rFactor.setState(t_iState)
              t_rFactor.PlaySound(#Appear)
            else
              error(this, "Failed to set item into a tile!", #_CreateElements)
            end if
          else
            error(this, "Failed to create collectable!", #_CreateElements)
          end if
        else
          error(this, "Referred tile not found:" && t_iPlaceRef, #_CreateElements)
        end if
      otherwise:
        error(this, "Unsupported item category:" && t_iCategory, #_CreateElements)
        repeat with j = 1 to t_iPrm
          t_ar_iParams.add(t_rInput.GetIntFrom())
        end repeat

    end case
  end repeat
end
on _RemoveElement this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  if not this.getComponent()._AccessRoom()._RemoveIndexed(t_iRef, "element") then
    if not this.getComponent()._AccessRoom()._RemoveIndexed(t_iRef, "poster") then
      t_rCollectable = this.getComponent()._AccessRoom()._AccessIndexed(t_iRef, "collectable")
      if voidp(t_rCollectable) then
        error(this, "Item not found:" && t_iRef, #_RemoveElement)
      else
        tItemState = t_rCollectable.getObject().GetParam("STATE")
        if value(tItemState) = 0 then
          t_rCollectable.GetVisual().DisAppear()
          m_iIDMaker = m_iIDMaker + 1
          createTimeout("SkeletorDeletor" & m_iIDMaker, 250, #__RemoveCollectable, this.getID(), t_iRef, 1)
          t_rCollectable.GetFactor().PlaySound(#DisAppear)
        else
          if value(tItemState) <> 0 then
            this.getComponent()._AccessRoom()._RemoveIndexed(t_iRef, "collectable")
          end if
        end if
      end if
    end if
  end if
end
on __RemoveCollectable this, t_iRef
  t_rRoom = this.getComponent()._AccessRoom()
  if objectp(t_rRoom) then
    t_rRoom._RemoveIndexed(t_iRef, "collectable")
  end if
end
on _RemovePoster this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  if not this.getComponent()._AccessRoom()._RemoveIndexed(t_iRef, "poster") then
    error(this, "Poster not found:" && t_iRef, #_RemovePoster)
  end if
end
on _StatusPulse this, a_rMsg
  t_iCount = a_rMsg.connection.GetIntFrom()
  t_rContext = this.getComponent()._AccessRoom()
  t_rInput = a_rMsg.connection
  if objectp(t_rContext) then
    repeat with i = 1 to t_iCount
      t_iRef = t_rInput.GetIntFrom()
      t_iTile = t_rInput.GetIntFrom()
      t_iStack = t_rInput.GetIntFrom()
      t_ar_iActions = []
      repeat with j = 1 to 12
        t_ar_iActions.add(t_rInput.GetIntFrom())
      end repeat
      t_sTradeState = string(t_ar_iActions[9])
      t_sFriendRequest = string(t_ar_iActions[12])
      t_rObj = t_rContext._AccessIndexed(t_iRef, "avatar")
      t_rObj.SetParam("TRADE", t_sTradeState)
      t_rObj.SetParam("FRIEND", t_sFriendRequest)
      t_rTile = t_rContext._AccessIndexed(t_iTile, "tile")
      if voidp(t_rTile) then
        error(this, "Tile not found:" && t_iTile, #_SatusPulse)
        next repeat
      end if
      t_rAvatar = t_rContext._AccessIndexed(t_iRef, "avatar")
      if objectp(t_rAvatar) then
        t_rAvatar.GetFactor().WalkToTile(t_rTile, t_iStack)
        t_rAvatar.GetVisual().Actions(t_ar_iActions)
        if not t_rAvatar.GetVisual().GetAvatarOnTile() then
          t_rAvatar.GetVisual().SetAvatarOnTile(1)
          t_rAvatar.GetVisual().visible(1, 1)
        end if
        next repeat
      end if
      error(this, "Avatar with given index not found:" && t_iRef, #_StatusPulse)
    end repeat
  end if
end
on _AvatarInfo this, a_rMsg
  t_iOwnRef = a_rMsg.connection.GetIntFrom()
  getObject(#session).set("room_own_avatar", t_iOwnRef)
end
on _UpdateElement this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iRef = t_rInput.GetIntFrom()
  t_iCategory = t_rInput.GetIntFrom()
  t_iPlaceRef = t_rInput.GetIntFrom()
  t_iAllowGuestMove = t_rInput.GetIntFrom()
  t_iParamCnt = t_rInput.GetIntFrom()
  t_rContext = this.getComponent()._AccessRoom()
  if objectp(t_rContext) then
    case t_iCategory of
      1, 5:
        t_iDir = t_rInput.GetIntFrom()
        t_rElem = t_rContext._AccessIndexed(t_iRef, "element")
        if objectp(t_rElem) then
          t_rElem.getObject().SetParam("GUESTMOVE", string(t_iAllowGuestMove))
          t_rTile = t_rContext._AccessIndexed(t_iPlaceRef, "tile")
          if objectp(t_rTile) then
            t_rElem.GetFactor().RemFromStack()
            t_rCopy = t_rTile
            t_iStack = 0
            repeat while 1
              if t_rCopy.GetCount() > 0 then
                t_rCopy = t_rCopy[1]
                t_iStack = t_iStack + 1
                next repeat
              end if
              exit repeat
            end repeat
            t_rElem.SetParam("DIR", string(t_iDir))
            if not t_rElem.GetFactor().SetToTileStack(t_rTile, t_iStack) then
              error(this, "Failed to set item into a tile!", #_UpdateElement)
            end if
            if not voidp(t_rElem.GetVisual()) then
              if t_rElem.GetVisual().IsSelected() then
                t_rElem.GetVisual().RemoveHighlighters()
                t_rElem.GetVisual().CreateHighlighters()
              end if
            end if
            if t_iParamCnt > 1 then
              t_iParamCnt = t_iParamCnt - 1
              t_ar_iParams = []
              repeat with j = 1 to t_iParamCnt
                t_ar_iParams.add(t_rInput.GetIntFrom())
              end repeat
              t_rElem.GetFactor().setState(t_ar_iParams[1])
            end if
          else
            error(this, "Tile not found:" && t_iPlaceRef, #_UpdateElement)
          end if
        else
          error(this, "Element not found:" && t_iRef, #_UpdateElement)
        end if
      3:
        t_rElem = t_rContext._AccessIndexed(t_iRef, "poster")
        if objectp(t_rElem) then
          t_rElem.getObject().SetParam("GUESTMOVE", string(t_iAllowGuestMove))
          t_rWall = t_rContext._AccessIndexed(t_iPlaceRef, "wall")
          if objectp(t_rWall) then
            t_iX = t_rInput.GetIntFrom()
            t_iY = t_rInput.GetIntFrom()
            t_iZ = t_rInput.GetIntFrom()
            t_rElem.GetFactor().PlaceTo(t_rWall, vector(t_iX, t_iY, t_iZ))
          else
            error(this, "Wall not found:" && t_iPlaceRef, #_UpdateElement)
          end if
        else
          error(this, "Poster not found:" && t_iRef, #_UpdateElement)
        end if
      6, 7:
        t_rElem = t_rContext._AccessIndexed(t_iRef, "collectable")
      otherwise:
        error(this, "Unsupported item category:" && t_iCategory, #_UpdateElement)

    end case
  end if
end
on _ElementStatus this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_iInt = a_rMsg.connection.GetIntFrom()
  t_rContext = this.getComponent()._AccessRoom()
  if objectp(t_rContext) then
    t_rElem = t_rContext._AccessIndexed(t_iRef, "element")
    if objectp(t_rElem) then
      t_rElem.GetFactor().setState(t_iInt)
    else
      t_rElem = t_rContext._AccessIndexed(t_iRef, "collectable")
      if objectp(t_rElem) then
        t_rElem.GetFactor().setState(t_iInt)
      end if
    end if
  end if
end
on _AvatarChat this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_sMsg = TransformCannedMsgToString(a_rMsg)
  t_rCon = this.component._AccessRoom()
  if not voidp(t_rCon) then
    t_rAvatar = t_rCon._AccessIndexed(t_iRef, "avatar")
    if voidp(t_rAvatar) then
      error(this, "Avatar not found:" && t_iRef, #_AvatarChat)
    else
      t_sName = t_rAvatar.GetParam("NAME")
      t_rColor = t_rAvatar.GetVisual().GetRenderer().GetShirtColor()
      t_veLoc = t_rAvatar.GetScrPos()
      executeMessage(#chat, [#message: t_sMsg, #mode: #say, #name: t_sName, #color: t_rColor, #loc: t_veLoc])
    end if
  end if
end
on _ElementChat this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_sMsg = a_rMsg.connection.GetStrFrom()
  t_sName = a_rMsg.connection.GetStrFrom()
  t_rCon = this.component._AccessRoom()
  if not voidp(t_rCon) then
    t_rElement = t_rCon._AccessIndexed(t_iRef, "element")
    if voidp(t_rElement) then
      error(this, "element not found:" && t_iRef, #_ElementChat)
    else
      if t_sName = EMPTY then
        t_sName = getText("item." & t_rElement.GetParam("TYPE"), "NPC")
      end if
      case t_rElement.GetParam("TYPE") & EMPTY of
        "4001":
          t_rColor = rgb("#7C4A1C")
        "4002":
          t_rColor = rgb("#7C4A1C")
        "4003":
          t_rColor = rgb("#004FE2")
        "4004":
          t_rColor = rgb("#BC0000")
        "4005":
          t_rColor = rgb("#B500BC")
        "4009":
          t_rColor = rgb(31, 65, 47)
        otherwise:
          t_rColor = rgb(random(255), random(255), random(255))

      end case
      t_veLoc = t_rElement.GetScrPos()
      executeMessage(#chat, [#message: t_sMsg, #mode: #say, #name: t_sName, #loc: t_veLoc, #color: t_rColor])
    end if
  end if
end
on _FailedToPlace this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_iMsg = a_rMsg.connection.GetIntFrom()
  case t_iMsg of
    0:
      t_sMsg = getText("error.failedtoplace.0")
    1:
      t_sMsg = getText("error.failedtoplace.1")
    otherwise:
      t_sMsg = getText("error.failedtoplace.0")

  end case
  t_rDialog = createDialogWindow(this.getID(), "Room.place.furni.failed", 1, 1)
  t_rDialog.show()
  t_rDialog.setText(t_sMsg, getText("room.placefurni.failed.title"), "OK")
end
on _AvatarSlogan this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_sTxt = TransformCannedMsgToString(a_rMsg)
  x = 0
  t_rCon = this.component._AccessRoom()
  if not voidp(t_rCon) then
    t_rAvatar = t_rCon._AccessIndexed(t_iRef, "avatar")
    t_rAvatar.SetParam("DESC", t_sTxt)
  end if
end
on _CancelRoomLoad this, a_rMsg
  this.component._CancelRoom()
end
on _ItemConfiguration this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iRef = t_rInput.GetIntFrom()
  t_iCount = t_rInput.GetIntFrom()
  t_ar_keypairs = [:]
  repeat with i = 1 to t_iCount
    t_sKey = t_rInput.GetStrFrom()
    t_sValue = t_rInput.GetStrFrom()
    t_ar_keypairs[t_sKey] = t_sValue
  end repeat
  t_rContext = this.getComponent()._AccessRoom()
  if objectp(t_rContext) then
    t_rElem = t_rContext._AccessIndexed(t_iRef, "element")
    if objectp(t_rElem) then
      t_rElem.GetFactor().ItemConfiguration(t_iRef, t_ar_keypairs)
    end if
  end if
end
on _CurrentItemConfiguration this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iRef = t_rInput.GetIntFrom()
  t_iCount = t_rInput.GetIntFrom()
  t_ar_keypairs = [:]
  repeat with i = 1 to t_iCount
    t_sKey = t_rInput.GetStrFrom()
    t_sValue = t_rInput.GetStrFrom()
    t_ar_keypairs[t_sKey] = t_sValue
  end repeat
  t_rContext = this.getComponent()._AccessRoom()
  if objectp(t_rContext) then
    t_rElem = t_rContext._AccessIndexed(t_iRef, "element")
    if objectp(t_rElem) then
      t_rElem.GetFactor().CurrentItemConfiguration(t_iRef, t_ar_keypairs)
    end if
  end if
end
on _ItemConfigurationUsed this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iRef = t_rInput.GetIntFrom()
  t_iStatus = t_rInput.GetIntFrom()
  t_iCount = t_rInput.GetIntFrom()
  t_ar_keypairs = [:]
  repeat with i = 1 to t_iCount
    t_sKey = t_rInput.GetStrFrom()
    t_sValue = t_rInput.GetStrFrom()
    t_ar_keypairs[t_sKey] = t_sValue
  end repeat
  t_rContext = this.getComponent()._AccessRoom()
  if objectp(t_rContext) then
    t_rElem = t_rContext._AccessIndexed(t_iRef, "element")
    if objectp(t_rElem) then
      t_rElem.GetFactor().ItemConfigurationUsed(t_iRef, t_iStatus, t_ar_keypairs)
    end if
  end if
end
on _Config this, a_bBool
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2590, #_EnterRoom)
  t_rList.setaProp(2591, #_LeaveRoom)
  t_rList.setaProp(2580, #_CreateFloors)
  t_rList.setaProp(2581, #_RemoveFloor)
  t_rList.setaProp(2582, #_CreateAvatars)
  t_rList.setaProp(2504, #_ModifyAvatar)
  t_rList.setaProp(2589, #_RemoveAvatar)
  t_rList.setaProp(2585, #_LocateAvatar)
  t_rList.setaProp(2586, #_CreateElements)
  t_rList.setaProp(2531, #_RemoveElement)
  t_rList.setaProp(2530, #_RemovePoster)
  t_rList.setaProp(2583, #_StatusPulse)
  t_rList.setaProp(2592, #_AvatarInfo)
  t_rList.setaProp(2599, #_UpdateElement)
  t_rList.setaProp(2588, #_ElementStatus)
  t_rList.setaProp(2560, #_AvatarChat)
  t_rList.setaProp(2598, #_ElementChat)
  t_rList.setaProp(2534, #_FailedToPlace)
  t_rList.setaProp(2506, #_AvatarSlogan)
  t_rList.setaProp(2042, #_CancelRoomLoad)
  t_rList.setaProp(2881, #_ItemConfiguration)
  t_rList.setaProp(2882, #_CurrentItemConfiguration)
  t_rList.setaProp(2883, #_ItemConfigurationUsed)
  if a_bBool then
    registerListener(t_sID, this.getID(), t_rList)
  else
    unregisterListener(t_sID, this.getID(), t_rList)
  end if
  t_rList = [:]
  t_rList.setaProp("PlaceItem", 520)
  t_rList.setaProp("PickItem", 521)
  t_rList.setaProp("RotateItem", 590)
  t_rList.setaProp("MoveItem", 591)
  t_rList.setaProp("start", 580)
  t_rList.setaProp("move", 581)
  t_rList.setaProp("chat", 585)
  t_rList.setaProp("say", 560)
  t_rList.setaProp("canned_say", 561)
  t_rList.setaProp("AskToBeFriend", 545)
  t_rList.setaProp("IgnoreUser", 592)
  t_rList.setaProp("PlacePoster", 531)
  t_rList.setaProp("MovePoster", 595)
  t_rList.setaProp("UseItem", 584)
  t_rList.setaProp("KickUser", 596)
  t_rList.setaProp("ConfigureItem", 810)
  t_rList.setaProp("UseItemConfiguration", 811)
  t_rList.setaProp("ChangeItemProperties", 813)
  t_rList.setaProp("ToggleItem", 815)
  if a_bBool then
    registerCommands(t_sID, this.getID(), t_rList)
  else
    unregisterCommands(t_sID, this.getID(), t_rList)
  end if
  return 1
end