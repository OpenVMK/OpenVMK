-- Behavior
property ancestor
global g_rCore

on construct me
  member("CCannedText").scriptText = EMPTY
  the trace = 0
  the traceLoad = 0
  if not externalParamValue("sw3") = "58f5cd62-09e8-44b4-9091-116a16250498" then
    _player.debugPlaybackEnabled = 0
  end if
  script("CInit").m_CastLoader = []
  script("CInit").m_CastLoader[1] = script("CMonorailHandler2").new()
  script("CInit").m_CastLoader[2] = script("CMonorailHandler2").new()
  trace("postNew")
  if script("CInit").m_CastLoader[1].iveGotThePower() = 532643543 then
    script("CInit").m_CastLoader[1].mixTable(script("CInit").m_sSecretCode)
    script("CInit").m_CastLoader[2].mixTable(script("CInit").m_sSecretCode2)
    script("CInit").m_sSecretCode = []
    script("CInit").m_sSecretCode2 = []
  else
    member("CInit").scriptText = EMPTY
    member("CConnection").scriptText = EMPTY
    member("CMonorailHandler2").scriptText = EMPTY
    stopMovie()
  end if
  getObject(#variable_manager).set("furnituremap_url", "http://play.openvmk.com:8080/GetText/furnimaps/" & random(1234512345))
  me.regMsgList(0)
end
on deconstruct me
end
on handle_hello me, tMsg
  trace("Hello!! :)")
  g_rCore.GET("VMK").send("SSO_TICKET", [#str: externalParamValue("sw1")])
end
on handle_avatarsets me, tMsg
  if not g_rCore.GET(#AvatarFactory_handler).m_bAvailableSetsReady and not voidp(tMsg) then
    t_iLength = tMsg.connection.GetIntFrom()
    t_ar_iSetList = []
    repeat with i = 1 to t_iLength
      t_ar_iSetList.add(tMsg.connection.GetIntFrom())
    end repeat
  end if
  t_ar_iSetList.sort()
  if t_ar_iSetList.count > 0 then
    g_rCore.GET(#AvatarFactory_handler).m_bAvailableSetsReady = 1
    if objectExists("AvatarBuilderClothesLoader") then
      t_Obj = getObject("AvatarBuilderClothesLoader")
    else
      t_Obj = createObject("AvatarBuilderClothesLoader", "CAvatarClothesLoader")
      the trace = 1
      t_Obj.DefineAvailableSets(t_ar_iSetList)
      the trace = 0
      g_rCore.GET(#AvatarFactory_handler).m_ar_ParsedAvailbleSets = t_ar_iSetList
      g_rCore.GET(#AvatarFactory_handler).m_mp_Test = t_ar_iSetList
    end if
  end if
end
on handle_updatesignature me, tMsg
  t_iRef = tMsg.connection.GetIntFrom()
  t_sMission = tMsg.connection.GetStrFrom()
  t_rContext = getObject(#room_component)._AccessRoom()
  if objectp(t_rContext) then
    t_rUser = t_rContext._AccessIndexed(t_iRef, "avatar")
    if objectp(t_rUser) then
      t_rUser.SetParam("DESC", t_sMission)
    end if
  end if
end
on handle_tradechat this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_sMsg = a_rMsg.connection.GetStrFrom()
  t_rCon = getThread("room").getComponent()._AccessRoom()
  if not voidp(t_rCon) then
    t_rAvatar = t_rCon._AccessIndexed(t_iRef, "avatar")
    if voidp(t_rAvatar) then
      error(this, "Trade Avatar not found:" & t_iRef, #_AvatarChat)
    else
      t_chatMsg = propList(#message, t_sMsg, #mode, #say, #name, GetParam(t_rAvatar, "NAME"), #ref, t_rAvatar)
      executeMessage(#tradechat, t_chatMsg)
    end if
  end if
end
on handle_avatar me, tMsg
  trace("handle_avatar")
  mez = getObject(#room_handler)
  t_rLoader = getObject(#AvatarClothAssetManager)
  t_rContext = mez.getComponent()._AccessRoom()
  tID = tMsg.connection.GetIntFrom()
  tSex = tMsg.connection.GetIntFrom()
  tName = tMsg.connection.GetStrFrom()
  tMission = tMsg.connection.GetStrFrom()
  tTile = tMsg.connection.GetIntFrom()
  tTileStack = tMsg.connection.GetIntFrom()
  mez.m_rXMLAvatar.SetParam("REF", string(tID))
  mez.m_rXMLAvatar.SetParam("NAME", tName)
  mez.m_rXMLAvatar.SetParam("SEX", string(tSex))
  mez.m_rXMLAvatar.SetParam("DESC", tMission)
  trace("pre if")
  if t_rContext._CreateIndexed(tID, "avatar", mez.m_rXMLAvatar) then
    trace(">> Avatar Created")
    t_rAvatar = t_rContext._AccessIndexed(tID, "avatar")
    trace("badge")
    iBadgeCount = tMsg.connection.GetIntFrom()
    repeat with i = 1 to iBadgeCount
      t_rAvatar.SetParam("icon.type." & i, tMsg.connection.GetIntFrom())
    end repeat
    iPinCount = tMsg.connection.GetIntFrom()
    repeat with i = 1 to iPinCount
      t_rAvatar.SetParam("pin.singleuse." & i, tMsg.connection.GetIntFrom())
      t_rAvatar.SetParam("pin.type." & i, tMsg.connection.GetIntFrom())
      t_rAvatar.SetParam("pin.level." & i, tMsg.connection.GetIntFrom())
    end repeat
    trace("figure")
    t_aFigure = []
    repeat with i = 1 to 12
      t_aFigure[i] = tMsg.connection.GetIntFrom()
    end repeat
    t_aActions = []
    repeat with i = 1 to 12
      t_aActions[i] = tMsg.connection.GetIntFrom()
    end repeat
    trace("t_rTransfer")
    t_rTransfer = propList(#input, t_aFigure, #Output, t_rAvatar.GetVisual().GetRenderer(), #avatar, t_rAvatar)
    t_rTransfer.input = t_aFigure
    executeMessage("CreateAvatar", t_rTransfer)
    trace("postExecute")
    if objectp(t_rTransfer.Output) then
      trace("setremderer")
      t_rAvatar.GetVisual().SetRenderer(t_rTransfer.Output)
      trace("settotilestack")
      if t_rAvatar.GetFactor().SetToTileStack(t_rContext._AccessIndexed(tTile, "tile"), tTileStack) then
        trace("setoutlook")
        t_rAvatar.GetVisual().SetOutlook([])
      end if
      trace("actions")
      t_rAvatar.GetVisual().Actions(t_aActions)
      repeat with i = 1 to 12
        if i mod 2 then
          t_rLoader.LoadCastLibsForCloth(VOID, t_aFigure[i])
        end if
      end repeat
    end if
  end if
end
on handle_move me, tMsg
  t_iReference = tMsg.connection.GetIntFrom()
  t_iTile = tMsg.connection.GetIntFrom()
  t_iLast = tMsg.connection.GetIntFrom()
  t_iDirection = tMsg.connection.GetIntFrom()
  t_iStack = tMsg.connection.GetIntFrom()
  t_rContext = getObject(#room_component)._AccessRoom()
  t_rAvatar = t_rContext._AccessIndexed(t_iReference, "avatar")
  if objectp(t_rAvatar) then
    t_aActions = t_rAvatar.GetVisual().m_rRenderer.m_mp_AvatarData
    if t_iLast = 1 then
      t_aActions[6] = 1
      t_aActions[7] = 1
      t_aActions[8] = 1
    end if
    t_aActions[1] = t_iDirection
    t_aActions[2] = t_iDirection
    t_rAvatar.GetVisual().Actions(t_aActions)
    t_rAvatar.GetFactor().WalkToTile(t_rContext._AccessIndexed(t_iTile, "tile"), t_iStack)
  end if
end
on handle_pinupdate me, tMsg
  t_rContext = getObject(#room_component)._AccessRoom()
  t_rAvatar = t_rContext._AccessIndexed(tMsg.connection.GetIntFrom(), "avatar")
  if objectp(t_rAvatar) then
    iBadgeCount = tMsg.connection.GetIntFrom()
    repeat with i = 1 to iBadgeCount
      t_rAvatar.SetParam("icon.type." & i, tMsg.connection.GetIntFrom())
    end repeat
    iPinCount = tMsg.connection.GetIntFrom()
    repeat with i = 1 to iPinCount
      t_rAvatar.SetParam("pin.singleuse." & i, tMsg.connection.GetIntFrom())
      t_rAvatar.SetParam("pin.type." & i, tMsg.connection.GetIntFrom())
      t_rAvatar.SetParam("pin.level." & i, tMsg.connection.GetIntFrom())
    end repeat
  end if
end
on handle_updatesingle me, tMsg
  tAvatar = tMsg.connection.GetIntFrom()
  tID = tMsg.connection.GetIntFrom()
  tdata = tMsg.connection.GetIntFrom()
  t_rContext = getObject(#room_component)._AccessRoom()
  if objectp(t_rContext) then
    t_rAvatar = t_rContext._AccessIndexed(tAvatar, "avatar")
    if objectp(t_rAvatar) then
      t_aActions = t_rAvatar.GetVisual().m_rRenderer.m_mp_AvatarData
      if listp(t_aActions) then
        t_aActions[tID] = tdata
        t_rAvatar.GetVisual().Actions(t_aActions)
      else
        error(me, "Action list missing", #_UpdateSingle)
      end if
    else
      error(me, "Avatar not available", #_UpdateSingle)
    end if
  else
    error(me, "Room context not available!", #_UpdateSingle)
  end if
end
on handle_updatemultiple me, tMsg
  tAvatar = tMsg.connection.GetIntFrom()
  tCount = tMsg.connection.GetIntFrom()
  t_rContext = getObject(#room_component)._AccessRoom()
  if objectp(t_rContext) then
    t_rAvatar = t_rContext._AccessIndexed(tAvatar, "av|atar")
    if objectp(t_rAvatar) then
      t_aActions = t_rAvatar.GetVisual().m_rRenderer.m_mp_AvatarData
      if listp(t_aActions) then
        repeat with i = 1 to tCount
          tID = tMsg.connection.GetIntFrom()
          tdata = tMsg.connection.GetIntFrom()
          t_aActions[tID] = tdata
        end repeat
        t_rAvatar.GetVisual().Actions(t_aActions)
      else
        error(me, "Action list missing", #_UpdateSingle)
      end if
    else
      error(me, "Avatar not available", #_UpdateSingle)
    end if
  else
    error(me, "Room context not available!", #_UpdateSingle)
  end if
end
on handle_avatarchange me, tMsg
  mez = getObject(#room_handler)
  t_rContext = mez.getComponent()._AccessRoom()
  tID = tMsg.connection.GetIntFrom()
  t_rAvatar = t_rContext._AccessIndexed(tID, "avatar")
  t_aFigure = []
  repeat with i = 1 to 12
    t_aFigure[i] = tMsg.connection.GetIntFrom()
  end repeat
  t_rTransfer = propList(#input, t_aFigure, #Output, t_rAvatar.GetVisual().GetRenderer(), #avatar, t_rAvatar)
  t_rTransfer.input = t_aFigure
  executeMessage("CreateAvatar", t_rTransfer)
  if objectp(t_rTransfer.Output) then
    t_rAvatar.GetVisual().SetRenderer(t_rTransfer.Output)
  end if
end
on handle_avatarstatus this, a_rMsg
  t_rContext = getObject(#room_component)._AccessRoom()
  if voidp(t_rContext) then
    error(this, "Room context not available!", #_LocateAvatar)
  else
    t_iAvatar = a_rMsg.connection.GetIntFrom()
    t_rAvatar = t_rContext._AccessIndexed(t_iAvatar, "avatar")
    t_iTile = a_rMsg.connection.GetIntFrom()
    t_rTile = t_rContext._AccessIndexed(t_iTile, "tile")
    t_bIsWalking = a_rMsg.connection.GetIntFrom()
    t_iStack = a_rMsg.connection.GetIntFrom()
    t_ar_iActions = []
    repeat with i = 1 to 12
      t_ar_iActions[i] = a_rMsg.connection.GetIntFrom()
    end repeat
    t_rAvatar.GetVisual().Actions(t_ar_iActions)
    if t_bIsWalking = 1 then
      t_rAvatar.GetFactor().WalkToTile(t_rTile, t_iStack)
    else
      if t_bIsWalking = 2 then
        t_rAvatar.GetFactor().SetToTileStack(t_rTile, t_iStack)
      end if
    end if
  end if
end
on handle_usermove this, a_rMsg
  t_rContext = getObject(#room_component)._AccessRoom()
  if voidp(t_rContext) then
    error(this, "Room context not available!", #_LocateAvatar)
  else
    t_iAvatar = a_rMsg.connection.GetIntFrom()
    t_rAvatar = t_rContext._AccessIndexed(t_iAvatar, "avatar")
    t_iTile = a_rMsg.connection.GetIntFrom()
    t_rTile = t_rContext._AccessIndexed(t_iTile, "tile")
    t_bIsWalking = a_rMsg.connection.GetIntFrom()
    t_iStack = a_rMsg.connection.GetIntFrom()
    if a_rMsg.connection.GetIntFrom() = 1 then
      Actions = t_rAvatar.GetVisual().m_rRenderer.m_mp_AvatarData
    end if
    if t_bIsWalking then
      t_rAvatar.GetFactor().WalkToTile(t_rTile, t_iStack)
    else
      t_rAvatar.GetFactor().SetToTileStack(t_rTile, t_iStack)
    end if
  end if
end
on handle_chat this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_sMsg = a_rMsg.connection.GetStrFrom()
  t_rCon = getObject(#room_component)._AccessRoom()
  if not voidp(t_rCon) then
    t_rAvatar = t_rCon._AccessIndexed(t_iRef, "avatar")
    if voidp(t_rAvatar) then
      error(this, "Avatar not found:" && t_iRef, #_AvatarChat)
    else
      t_sName = t_rAvatar.GetParam("NAME")
      t_rColor = t_rAvatar.GetVisual().GetRenderer().GetShirtColor()
      t_veLoc = t_rAvatar.GetScrPos()
      executeMessage(#chat, propList(#message, t_sMsg, #mode, #say, #name, t_sName, #color, t_rColor, #loc, t_veLoc))
    end if
  end if
end
on handle_itemlist me, a_rMsg
  t_rInput = a_rMsg.connection
  t_mp_iCode_kCategory = propList(1, #items, 2, #clothes, 3, #posters, 4, #pins)
  t_mp_kType_mp_iRef_rItem = propList()
  t_mp_kType_mp_iRef_rItem.setaProp(#items, propList())
  t_mp_kType_mp_iRef_rItem.setaProp(#posters, propList())
  t_mp_kType_mp_iRef_rItem.setaProp(#clothes, propList())
  t_mp_kType_mp_iRef_rItem.setaProp(#pins, propList())
  t_iInventoryId = t_rInput.GetIntFrom()
  if t_iInventoryId = 1 then
    t_kInventoryId = #itemInventory
  else
    if t_iInventoryId = 3 then
      t_kInventoryId = #wornPins
    else
      if t_iInventoryId = 5 then
        t_kInventoryId = #vmks
      end if
    end if
  end if
  t_iClearFlag = a_rMsg.connection.GetIntFrom()
  t_iCount = t_rInput.GetIntFrom()
  repeat with i = 1 to t_iCount
    t_iRef = t_rInput.GetIntFrom()
    t_iTypeCode = t_rInput.GetIntFrom()
    t_iCategory = t_rInput.GetIntFrom()
    t_sItemGroup = t_rInput.GetStrFrom()
    t_iItemCount = t_rInput.GetIntFrom()
    if t_iCategory = 1 then
      t_kCat = #items
      t_iCnt = t_rInput.GetIntFrom()
      if t_iCnt = 0 then
        t_iParam = 0
      end if
      t_iParam = []
      repeat with j = 1 to t_iCnt
        t_iParam.append(t_rInput.GetIntFrom())
      end repeat
    else
      if t_iCategory = 2 then
        t_kCat = #clothes
        t_iParam = 0
      else
        if t_iCategory = 3 then
          t_kCat = #posters
          t_iParam = 0
        else
          if t_iCategory = 4 then
            t_kCat = #pins
            t_iParam = t_rInput.GetIntFrom()
            t_iSingleUse = t_rInput.GetIntFrom()
            t_sExpiryDate = t_rInput.GetIntFrom()
          end if
        end if
      end if
    end if
    t_rTargetMap = t_mp_kType_mp_iRef_rItem.getaProp(t_mp_iCode_kCategory.getaProp(t_iCategory))
    t_rTargetMap.setaProp(t_sItemGroup, propList(#group, t_sItemGroup, #items, t_iItemCount, #ref, t_iRef, #code, t_iTypeCode, #param, t_iParam, #state, #normal, #category, t_kCat))
    if t_iCategory = 4 then
      t_rTargetMap[t_sItemGroup].addProp(#singleuse, t_iSingleUse)
      t_rTargetMap[t_sItemGroup].addProp(#expirydate, t_sExpiryDate)
    end if
  end repeat
  trace(t_mp_kType_mp_iRef_rItem)
  if t_iClearFlag then
    getObject(#inventory_component).GetInventory(t_iInventoryId).ClearItems()
  end if
  repeat with i = 1 to t_mp_kType_mp_iRef_rItem.count
    t_kCategory = t_mp_kType_mp_iRef_rItem.getPropAt(i)
    t_mp_sGroup_rItem = t_mp_kType_mp_iRef_rItem[i]
    getObject(#inventory_component).GetInventory(t_iInventoryId).UpdateItemList(t_kCategory, t_mp_sGroup_rItem)
  end repeat
end
on handle_roominfo me, a_rMsg
  t_rInput = a_rMsg.connection
  t_ar_Msg = propList()
  setAt(t_ar_Msg, #roomName, t_rInput.GetStrFrom())
  setAt(t_ar_Msg, #roomOwner, t_rInput.GetStrFrom())
  setAt(t_ar_Msg, #roomDescription, t_rInput.GetStrFrom())
  setAt(t_ar_Msg, #controlRoom, t_rInput.GetIntFrom())
  setAt(t_ar_Msg, #friendsOnly, t_rInput.GetIntFrom())
  getObject(#roominfo_component).setGuestInfo(t_ar_Msg)
  getObject(#roominfo_component).setPrivate()
  getObject(#roominfo_interface).SaveOriginalData(t_ar_Msg[#roomName], t_ar_Msg[#roomDescription])
  getObject(#session).set("RoomType", #private)
  getObject(#session).set("ControlRoom", t_ar_Msg.controlRoom)
end
on handle_ping me, a_rMsg
  getObject("VMK").send("PONG")
end
on handle_alert me, a_rMsg
  t = createDialogWindow(me.getID(), "alert.dialog", 1, 1)
  t.setText(a_rMsg.connection.GetStrFrom(), a_rMsg.connection.GetStrFrom(), a_rMsg.connection.GetStrFrom())
  t.show()
end
on handle_movesprites me, a_rMsg
  t_iSpriteCount = a_rMsg.connection.GetIntFrom()
  repeat with i = 1 to t_iSpriteCount
    t_sSpriteName = a_rMsg.connection.GetStrFrom()
    t_iX = a_rMsg.connection.GetIntFrom()
    t_iY = a_rMsg.connection.GetIntFrom()
    repeat with a = 1 to 1000
      if sprite(a).member.name contains t_sSpriteName then
        sprite(a).loc = point(t_iX, t_iY)
      end if
    end repeat
  end repeat
end
on handle_accepteula me, a_rMsg
  getObject(#registration_interface)._RefreshRegList(VOID, "NoEULA")
end
on handle_roomitems me, a_rMsg
  t_rInput = a_rMsg.connection
  t_rContext = getObject(#room_component)._AccessRoom()
  t_iCount = t_rInput.GetIntFrom()
  t_rLoader = getObject("RoomItemAssetManager")
  t_rFurniMap = getObject(#room_component).m_rFurniMap
  repeat with i = 1 to t_iCount
    t_iRef = t_rInput.GetIntFrom()
    t_iTypeCode = t_rInput.GetIntFrom()
    t_iCategory = t_rInput.GetIntFrom()
    t_iPlaceRef = t_rInput.GetIntFrom()
    t_iAllowGuestMove = t_rInput.GetIntFrom()
    t_iDir = t_rInput.GetIntFrom()
    t_rStruct = t_rFurniMap.GetByTypeCode(t_iTypeCode)
    t_iState = t_rInput.GetIntFrom()
    t_iStack = t_rInput.GetIntFrom()
    t_ar_iParams = []
    t_iParamCount = t_rInput.GetIntFrom()
    repeat with j = 1 to t_iParamCount
      t_ar_iParams.append(t_rInput.GetIntFrom())
    end repeat
    t_rCopy = t_rContext._AccessIndexed(t_iPlaceRef, "tile")
    t_iStack = 0
    repeat while t_rCopy > 0
      t_iStack = t_iStack + 1
      t_rCopy = t_rCopy[1]
    end repeat
    t_rXMLElement = getObject(#room_handler).m_rXMLElement
    t_rXMLElement.SetParam("REF", string(t_iRef))
    t_rXMLElement.SetParam("TYPE", string(t_iTypeCode))
    t_rXMLElement.SetParam("DIR", string(t_iDir))
    t_rXMLElement.SetParam("STATE", string(t_iState))
    t_rXMLElement.SetParam("GUESTMOVE", string(t_iAllowGuestMove))
    t_rXMLElement.SetParam("STRUCT", t_rStruct)
    t_rXMLElement.SetParam("PARAMS", t_ar_iParams)
    trace("FURNITURE TILE:" && t_iPlaceRef)
    t_rTile = t_rContext._AccessIndexed(t_iPlaceRef, "tile")
    if objectp(t_rTile) then
      if t_rContext._CreateIndexed(t_iRef, "element", t_rXMLElement) then
        t_rObject = t_rContext._AccessIndexed(t_iRef, "element")
        if t_rObject.GetFactor().SetToTileStack(t_rTile, t_iStack) then
          t_rLoader.LoadCastLibsForItem(t_rObject)
          t_rObject.GetFactor().setState(t_iState)
          trace("Set state:" && t_iState && t_iDir)
        else
          error(me, "Failed to set item into a tile!", #handle_roomitems)
        end if
      else
        error(me, "Failed to create item!", #handle_roomitems)
      end if
      next repeat
    end if
    error(me, "Tile does not exist!", #handle_roomitems)
  end repeat
  trace("repeat finished")
end
on handle_removeitem me, a_rMsg
  t_rInput = a_rMsg.connection
  t_rContext = getObject(#room_component)._AccessRoom()
  t_iRef = t_rInput.GetIntFrom()
  t_rContext._RemoveIndexed(t_iRef, "element")
end
on handle_moveitem me, a_rMsg
  t_rInput = a_rMsg.connection
  t_rContext = getObject(#room_component)._AccessRoom()
  t_iRef = t_rInput.GetIntFrom()
  t_rObject = t_rContext._AccessIndexed(t_iRef, "element")
  if objectp(t_rObject) then
    t_rTile = t_rContext._AccessIndexed(t_rInput.GetIntFrom(), "tile")
    t_rObject.GetFactor().SetToTileStack(t_rTile, t_rInput.GetIntFrom())
  else
    error("Unable to remove item: item doesn't exist!", #handle_moveitem)
  end if
end
on handle_itemstate me, a_rMsg
  t_rInput = a_rMsg.connection
  t_iRef = t_rInput.GetIntFrom()
  t_iState = t_rInput.GetIntFrom()
  t_rElement = getObject(#room_component)._AccessRoom()._AccessIndexed(t_iRef, "element")
  t_rElement.GetFactor().setState(t_iState)
end
on handle_rotateitem me, a_rMsg
  t_rInput = a_rMsg.connection
  t_iRef = t_rInput.GetIntFrom()
  t_iRotation = t_rInput.GetIntFrom()
  t_rObject = getObject(#room_component)._AccessRoom()
  if objectp(t_rObject) then
    t_rElement = t_rObject._AccessIndexed(t_iRef, "element")
    if objectp(t_rElement) then
      t_rElement.SetParam("DIR", string(t_iRotation))
      t_rElement.GetFactor()._ComposeBlocks()
      if not voidp(GetVisual(t_rElement)) then
        if IsSelected(GetVisual(t_rElement)) then
          RemoveHighlighters(GetVisual(t_rElement))
          CreateHighlighters(GetVisual(t_rElement))
        end if
      end if
    else
      error("Unable to access element!", #rotateitem)
    end if
  else
    error("Unable to access room!", #rotateitem)
  end if
end
on handle_editmode me, a_rMsg
  getObject(#session).set("RoomType", #private)
  getObject(#session).set("ControlRoom", 1)
end
on handle_falsechat this, a_rMsg
  t_sMsg = a_rMsg.connection.GetStrFrom()
  t_rCon = getObject(#room_component)._AccessRoom()
  t_sName = a_rMsg.connection.GetStrFrom()
  t_rColor = rgb(253, 215, 228)
  t_veLoc = vector(400.0, 410.0, -4997800.0)
  executeMessage(#chat, propList(#message, t_sMsg, #mode, #say, #name, t_sName, #color, t_rColor, #loc, t_veLoc))
end
on handle_sendregusername me, tMsg
  t_sName = getObject(#registration_interface).m_rCurPageObj.m_rCurPageObj.m_rWindow.getElement("reg.username.input").getText()
  if t_sName = EMPTY then
    t_sName = getObject(#registration_interface).m_rCurPageObj.m_rCurPageObj.m_sActiveName
  end if
  if t_sName = EMPTY then
    exit
  end if
  getObject("VMK").send("RegUsername", propList(#str, t_sName))
end
on handle_userdata this, a_rMsg
  t_sUsername = a_rMsg.connection.GetStrFrom()
  getObject(#session).set("name", t_sUsername)
  getObject(#session).set("IsTrading", 0)
  getObject(#session).set("traderequests", 1)
  executeMessage(#ui_show)
end
on handle_generalalert this, a_arMsg
  t_sMsg = a_arMsg.connection.GetStrFrom()
  t_sTxt = a_arMsg.connection.GetStrFrom()
  t = createDialogWindow(this.getID(), "AdminMessage", 1, 1)
  t.show()
  t.setText(t_sMsg, t_sTxt, "OK")
end
on handle_redirect me, tMsg
  gotoNetPage("http://204.12.248.90/" & tMsg.connection.GetStrFrom())
end
on handle_disconnect me, tMsg
  gotoNetPage("http://204.12.248.90/disconnected.html")
end
on handle_reloadfurnimaps me, tMsg
  getObject(#variable_manager).set("furnituremap_url", "http://play.openvmk.com:8080/GetText/furnimaps/" & random(1234512345))
  getThread("room").getComponent().m_rFurniMap._LoadMapFile()
end
on regMsgList me, tBool
  tMsgs = propList()
  setaProp(tMsgs, 2002, #handle_hello)
  setaProp(tMsgs, -1, #handle_disconnect)
  setaProp(tMsgs, 42, #handle_avatarsets)
  setaProp(tMsgs, 43, #handle_avatar)
  setaProp(tMsgs, 44, #handle_avatarstatus)
  setaProp(tMsgs, 45, #handle_chat)
  setaProp(tMsgs, 46, #handle_avatarchange)
  setaProp(tMsgs, 47, #handle_ping)
  setaProp(tMsgs, 48, #handle_alert)
  setaProp(tMsgs, 49, #handle_movesprites)
  setaProp(tMsgs, 50, #handle_accepteula)
  setaProp(tMsgs, 51, #handle_itemlist)
  setaProp(tMsgs, 52, #handle_roominfo)
  setaProp(tMsgs, 53, #handle_roomitems)
  setaProp(tMsgs, 54, #handle_removeitem)
  setaProp(tMsgs, 55, #handle_moveitem)
  setaProp(tMsgs, 56, #handle_itemstate)
  setaProp(tMsgs, 57, #handle_rotateitem)
  setaProp(tMsgs, 58, #handle_editmode)
  setaProp(tMsgs, 59, #handle_falsechat)
  setaProp(tMsgs, 60, #handle_sendregusername)
  setaProp(tMsgs, 61, #handle_userdata)
  setaProp(tMsgs, 62, #handle_generalalert)
  setaProp(tMsgs, 63, #handle_pinupdate)
  setaProp(tMsgs, 64, #handle_usermove)
  setaProp(tMsgs, 65, #handle_updatesingle)
  setaProp(tMsgs, 66, #handle_updatemultiple)
  setaProp(tMsgs, 67, #handle_move)
  setaProp(tMsgs, 68, #handle_redirect)
  setaProp(tMsgs, 69, #handle_updatesignature)
  setaProp(tMsgs, 70, #handle_tradechat)
  setaProp(tMsgs, 71, #handle_reloadfurnimaps)
  tCmds = propList()
  setaProp(tCmds, "SSO_TICKET", 1232)
  setaProp(tCmds, "NewChat", 1233)
  setaProp(tCmds, "PONG", 1234)
  setaProp(tCmds, "RegUsername", 1235)
  if 1 > tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end