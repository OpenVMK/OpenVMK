-- Behavior
on construct this
  return this._Configure(1)
end
on deconstruct this
  return this._Configure(0)
end
on _CodeRedemptionOK this, a_rMsg
  put "Code !!!"
end
on _ReceiveCredits this, a_rMsg
  t_iCredits = a_rMsg.connection.GetIntFrom()
  getObject(#session).set("user_credits", t_iCredits)
  this.component._UpdateCreditBalance(t_iCredits)
end
on _ItemDetails this, a_rMsg
  t_ar_data = propList()
  t_rInput = a_rMsg.connection
  t_ar_data[#owner] = t_rInput.GetStrFrom()
  t_ar_data[#type] = t_rInput.GetIntFrom()
  if t_ar_data = 1 then
    t_iRef = t_rInput.GetIntFrom()
    if t_iRef <> -1 then
      t_ar_data[#xtra][#ref] = t_iRef
    end if
    t_iEntityID = t_rInput.GetIntFrom()
    if t_iEntityID <> -1 then
      t_ar_data[#xtra][#entityID] = t_iEntityID
    else
      if t_ar_data = 2 then
        t_iRef = t_rInput.GetIntFrom()
        if t_iRef <> -1 then
          t_ar_data[#xtra][#ref] = t_iRef
        else
          if t_ar_data = 3 then
          else
            if t_ar_data = 4 then
            else
              if t_ar_data = 5 then
              else
                if t_ar_data = 6 then
                else
                  if t_ar_data = 7 then
                    t_ar_data[#xtra][#pinlevel] = t_rInput.GetIntFrom()
                    t_ar_data[#xtra][#magiword] = t_rInput.GetStrFrom()
                  else
                    if t_ar_data = 8 then
                      t_ar_data[#xtra][#timeToExpire] = t_rInput.GetIntFrom()
                      t_ar_data[#xtra][#magiword] = t_rInput.GetStrFrom()
                    else
                      if t_ar_data = 9 then
                        t_ar_data[#xtra][#timeToExpire] = t_rInput.GetIntFrom()
                        t_ar_data[#xtra][#validForRooms] = t_rInput.GetStrFrom()
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
        t_sObjectID = "ItemDetails"
        if objectExists(t_sObjectID) then
          removeObject(t_sObjectID)
        end if
        if getObject(#session).GET("FetchEntityID") then
          if not not voidp(t_iEntityID) and voidp(t_iRef) then
            t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(t_iRef, "element")
            if objectp(t_rObj) then
              t_rObj.getObject().SetParam("ENTITYID", t_iEntityID)
            end if
            error(this, "Object not found in context", #_ItemDetails)
          else
            if not getObject(#session).GET("IsTrading") then
              t_rObject = createObject(t_sObjectID, "CInvItemDetails")
              if objectp(t_rObject) then
                t_rObject.define(t_ar_data)
              else
                if not voidp(this.getComponent().m_rTradeDevice) then
                  this.getComponent().m_rTradeDevice.DefineItemInfo(t_ar_data)
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on _ReceiveItemList this, a_rMsg
  t_rInput = a_rMsg.connection
  t_mp_iCode_kCategory = propList(1, #items, 2, #clothes, 3, #posters, 4, #pins)
  t_mp_kType_mp_iRef_rItem = propList()
  t_iInventoryId = t_rInput.GetIntFrom()
  if t_rInput = 1 then
    t_kInventoryId = #itemInventory
  else
    if t_rInput = 3 then
      t_kInventoryId = #wornPins
    else
      if t_rInput = 5 then
        t_kInventoryId = #vmks
      end if
    end if
  end if
  t_iClearFlag = a_rMsg.connection.GetIntFrom()
  t_iCount = t_rInput.GetIntFrom()
  i = 1
  repeat while i <= t_iCount
    t_iRef = t_rInput.GetIntFrom()
    t_iTypeCode = t_rInput.GetIntFrom()
    t_iCategory = t_rInput.GetIntFrom()
    t_sItemGroup = t_rInput.GetStrFrom()
    t_iItemCount = t_rInput.GetIntFrom()
    if t_rInput = 1 then
      t_kCat = #items
      t_iCnt = t_rInput.GetIntFrom()
      if t_iCnt = 0 then
        t_iParam = 0
      end if
      t_iParam = []
      j = 1
      repeat while j <= t_iCnt
        j = j + 1
      end repeat
    else
      if t_rInput = 2 then
        t_kCat = #clothes
        t_iParam = 0
      else
        if t_rInput = 3 then
          t_kCat = #posters
          t_iParam = 0
        else
          if t_rInput = 4 then
            t_kCat = #pins
            t_iParam = t_rInput.GetIntFrom()
            t_iSingleUse = t_rInput.GetIntFrom()
            t_sExpiryDate = t_rInput.GetIntFrom()
          end if
        end if
      end if
    end if
    t_rTargetMap = t_mp_kType_mp_iRef_rItem.getaProp(t_mp_iCode_kCategory.getaProp(t_iCategory))
    if t_iCategory = 4 then
    end if
    i = i + 1
  end repeat
  if t_iClearFlag then
    this.getComponent().GetInventory(t_iInventoryId).ClearItems()
  end if
  i = 1
  repeat while i <= t_mp_kType_mp_iRef_rItem.count
    t_kCategory = t_mp_kType_mp_iRef_rItem.getPropAt(i)
    t_mp_sGroup_rItem = t_mp_kType_mp_iRef_rItem[i]
    this.getComponent().GetInventory(t_iInventoryId).UpdateItemList(t_kCategory, t_mp_sGroup_rItem)
    i = i + 1
  end repeat
end
on _ReceiveItemDetailsInInventory this, a_rMsg
  t_rConnection = a_rMsg.connection
  t_iInventoryId = t_rConnection.GetIntFrom()
  t_iClearFlag = t_rConnection.GetIntFrom()
  t_iItemCount = t_rConnection.GetIntFrom()
  t_mp_sGroup_rDetails = propList()
  if t_iItemCount > 0 then
    i = 1
    repeat while i <= t_iItemCount
      t_sItemGroup = t_rConnection.GetStrFrom()
      t_iNumberOfPairs = t_rConnection.GetIntFrom()
      t_mp_sKey_sValue = propList()
      e = 1
      repeat while e <= t_iNumberOfPairs
        e = e + 1
      end repeat
      i = i + 1
    end repeat
    if t_iClearFlag then
      this.getComponent().GetInventory(t_iInventoryId).ClearDetails()
    end if
    this.getComponent().GetInventory(t_iInventoryId).UpdateDetails(#all, t_mp_sGroup_rDetails)
  end if
end
on _ListItemGroups this, a_rMsg
  t_iInventoryId = a_rMsg.connection.GetIntFrom()
  t_iCount = a_rMsg.connection.GetIntFrom()
  t_mp_sGroup_rData = propList()
  i = 1
  repeat while i <= t_iCount
    t_rGroup = propList()
    t_rGroup[#ref] = a_rMsg.connection.GetIntFrom()
    t_mp_sGroup_rData[t_rGroup[#group]] = t_rGroup
    i = i + 1
  end repeat
  this.getComponent().GetInventory(t_iInventoryId).UpdateItemList(#all, t_mp_sGroup_rData)
end
on _AddItemsToList this, a_rMsg
  t_iCount = a_rMsg.connection.GetIntFrom()
  error(this, "Unimplemented method!", #_AddItemsToList)
  i = 1
  repeat while i <= t_iCount
    t_iCat = a_rMsg.connection.GetIntFrom()
    t_iRef = a_rMsg.connection.GetIntFrom()
    i = i + 1
  end repeat
end
on _RemItemsFromList this, a_rMsg
  t_iInventoryId = a_rMsg.connection.GetIntFrom()
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
  t_iCount = a_rMsg.connection.GetIntFrom()
  i = 1
  repeat while i <= t_iCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iCat = a_rMsg.connection.GetIntFrom()
    t_sGrp = a_rMsg.connection.GetStrFrom()
    if t_iInventoryId = 1 then
      t_kCat = #items
    else
      if t_iInventoryId = 2 then
        t_kCat = #clothes
      else
        if t_iInventoryId = 3 then
          t_kCat = #posters
        else
          if t_iInventoryId = 4 then
            t_kCat = #pins
          end if
        end if
      end if
    end if
    error(this, "Unknown category:" & t_iCat, #_RemItemsFromList)
    t_kCat = #null
    this.getComponent().GetInventory(t_iInventoryId).RemItem(t_kCat, t_iRef, t_sGrp)
    i = i + 1
  end repeat
end
on _ReceiveWornPins this, a_rMsg
  t_iCount = a_rMsg.connection.GetIntFrom()
  t_mp_iRef_rItem = propList()
  i = 1
  repeat while i <= t_iCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iCode = a_rMsg.connection.GetIntFrom()
    t_iParam = a_rMsg.connection.GetIntFrom()
    t_iSingleUse = a_rMsg.connection.GetIntFrom()
    t_sExpiryDate = a_rMsg.connection.GetIntFrom()
    t_sItemGroup = a_rMsg.connection.GetStrFrom()
    i = i + 1
  end repeat
end
on _ReceiveWornClothes this, a_rMsg
  t_iCount = a_rMsg.connection.GetIntFrom()
  t_mp_iRef_rItem = propList()
  i = 1
  repeat while i <= t_iCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iCode = a_rMsg.connection.GetIntFrom()
    t_sGroup = a_rMsg.connection.GetStrFrom()
    i = i + 1
  end repeat
end
on _UnwearPin this, a_rMsg
  t_iSrc = a_rMsg.connection.GetIntFrom()
  t_iDest = a_rMsg.connection.GetIntFrom()
  t_sSrcGrp = a_rMsg.connection.GetStrFrom()
  t_sTrgGrp = a_rMsg.connection.GetStrFrom()
  if t_iDest = -1 then
    this.getComponent().GetInventory(3).RemItem(#pins, t_iSrc, t_sSrcGrp)
  end if
  this.getComponent().GetInventory(3).CatSwitch(#pins, t_iSrc, this.getComponent().GetInventory(1), #pins, t_iDest, t_sSrcGrp, t_sTrgGrp)
end
on _WearPin this, a_rMsg
  t_iSrc = a_rMsg.connection.GetIntFrom()
  t_iDest = a_rMsg.connection.GetIntFrom()
  t_sSrcGrp = a_rMsg.connection.GetStrFrom()
  t_sTrgGrp = a_rMsg.connection.GetStrFrom()
  this.getComponent().GetInventory(1).CatSwitch(#pins, t_iSrc, this.getComponent().GetInventory(3), #pins, t_iDest, t_sSrcGrp, t_sTrgGrp)
end
on _ClothSwitch this, a_rMsg
  t_iInventoryId = a_rMsg.connection.GetIntFrom()
  t_iCount = a_rMsg.connection.GetIntFrom()
  i = 1
  repeat while i <= t_iCount
    t_iSrcRef = a_rMsg.connection.GetIntFrom()
    t_iDstRef = a_rMsg.connection.GetIntFrom()
    t_sSrcGrp = a_rMsg.connection.GetStrFrom()
    t_sDstGrp = a_rMsg.connection.GetStrFrom()
    this.getComponent().GetInventory(t_iInventoryId).CatSwitch(#clothes, t_iSrcRef, this.getComponent().GetInventory(2), #clothes, t_iDstRef, t_sSrcGrp, t_sDstGrp)
    i = i + 1
  end repeat
  t_iCount = a_rMsg.connection.GetIntFrom()
  i = 1
  repeat while i <= t_iCount
    t_iSrcRef = a_rMsg.connection.GetIntFrom()
    t_iDstRef = a_rMsg.connection.GetIntFrom()
    t_sSrcGrp = a_rMsg.connection.GetStrFrom()
    t_sDstGrp = a_rMsg.connection.GetStrFrom()
    this.getComponent().GetInventory(2).CatSwitch(#clothes, t_iSrcRef, this.getComponent().GetInventory(t_iInventoryId), #clothes, t_iDstRef, t_sSrcGrp, t_sDstGrp)
    i = i + 1
  end repeat
end
on _RewardInfo this, a_rMsg
  alert(a_rMsg.GetStrFrom())
end
on _SellConfirmRequest this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_iTyp = a_rMsg.connection.GetIntFrom()
  t_iPrc = a_rMsg.connection.GetIntFrom()
  this.getInterface().ShowSellRequest(t_iRef, t_iTyp, t_iPrc)
end
on _SellConfirmResponse this, a_rMsg
  t_mp_iCode_kCategory = propList(1, #items, 2, #clothes, 3, #posters, 4, #pins)
  t_bFromHK = a_rMsg.connection.GetIntFrom()
  t_bShowAlert = a_rMsg.connection.GetIntFrom()
  t_iPrc = a_rMsg.connection.GetIntFrom()
  t_iItemCount = a_rMsg.connection.GetIntFrom()
  if t_bFromHK then
    t_ar_ItemList = []
    i = 1
    repeat while i <= t_iItemCount
      t_iTyp = a_rMsg.connection.GetIntFrom()
      t_iRef = a_rMsg.connection.GetIntFrom()
      t_sGrp = a_rMsg.connection.GetStrFrom()
      i = i + 1
    end repeat
    if t_bShowAlert then
      t_s_Title = getText("inv.deleted.from.hk.title")
      t = createDialogWindow(this.getID(), "ItemsDeletedFromHk", 1, 1)
      t_sTxt = replaceChunks(getText("inv.deleted.from.hk"), "$", string(t_iItemCount))
      t.setText(t_sTxt, t_s_Title, "OK")
    end if
    t_iTyp = a_rMsg.connection.GetIntFrom()
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_sGrp = a_rMsg.connection.GetStrFrom()
    this.getComponent().GetInventory(1).RemItem(t_mp_iCode_kCategory.getaProp(t_iTyp), t_iRef, t_sGrp)
    this.getInterface().ShowSellConfirm(t_iRef, t_iTyp, t_iPrc)
  end if
end
on _TradeRequest this, a_rMsg
  t_iUserRef = a_rMsg.connection.GetIntFrom()
  t_iReqRef = a_rMsg.connection.GetIntFrom()
  t_rObj = createObject(getUniqueID(), "CInvTradeConfirm")
  t_rObj.Init(t_iUserRef, t_iReqRef)
end
on _TradeResponse this, a_rMsg
  t_iUserRef = a_rMsg.connection.GetIntFrom()
  t_iResponse = a_rMsg.connection.GetIntFrom()
  if t_iResponse = 1 then
    t_rTrader = getThread(#room).component._AccessRoom()._AccessIndexed(t_iUserRef, "avatar")
    t_iTraderGender = GetParam(t_rTrader, "SEX")
    t_sOwnName = getObject(#session).GET("name")
    t_info = propList()
    t_sTraderName = EMPTY
    if objectp(t_rTrader) then
      t_sTraderName = GetParam(t_rTrader, "NAME")
    end if
    executeMessage(#avatarsex, t_sOwnName, t_info).TradeOpen(this.component, t_iUserRef)
    if t_iTraderGender <> t_info.getaProp("SEX") then
      t = createDialogWindow(this.getID(), "trade.dialog.oppositeGender", 1, 1)
      t_ar_CustomBtn = propList(#text, getText("inv.trade.oppositeGender.dialog.OK"), #eventID, #dialogOK, #data, t_iUserRef)
      t.show()
    else
      if t_iResponse = 0 then
        t = createDialogWindow(this.getID(), "trade.dialog.trade.declined", 1, 1)
        t_ar_CustomBtn = propList(#text, getText("inv.trade.declined.dialog.OK"), #eventID, #dialogOK, #data, t_sTraderName)
        t.show()
      end if
    end if
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent, t_rParameter
  if t_dialogName = "trade.dialog.oppositeGender" then
    if t_dialogEvent = #dialogOK then
      me.component.TradeOpen(t_rParameter, 1)
    end if
  else
    if t_dialogEvent = "ItemsDeletedFromHk" then
    end if
  end if
  put "Unknown Dialog Window" & t_dialogName
end
on _TradeStatus this, a_rMsg
  t_rOwnSet = propList(#confirm, a_rMsg.connection.GetIntFrom())
  t_iItemCount = a_rMsg.connection.GetIntFrom()
  t_mp_iRef_rItem_Own = propList()
  i = 1
  repeat while i <= t_iItemCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iTyp = a_rMsg.connection.GetIntFrom()
    t_iCat = a_rMsg.connection.GetIntFrom()
    if t_rOwnSet = 1 then
      t_iCnt = a_rMsg.connection.GetIntFrom()
      if t_iCnt = 0 then
        t_iParam = 0
      end if
      t_iParam = []
      j = 1
      repeat while j <= t_iCnt
        j = j + 1
      end repeat
    else
      if t_rOwnSet = 4 then
        t_iPinLevel = a_rMsg.connection.GetIntFrom()
      end if
    end if
    i = i + 1
  end repeat
  t_rHerSet = propList(#confirm, a_rMsg.connection.GetIntFrom())
  t_iItemCount = a_rMsg.connection.GetIntFrom()
  t_mp_iRef_rItem_Her = propList()
  i = 1
  repeat while i <= t_iItemCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iTyp = a_rMsg.connection.GetIntFrom()
    t_iCat = a_rMsg.connection.GetIntFrom()
    if t_rOwnSet = 1 then
      t_iCnt = a_rMsg.connection.GetIntFrom()
      if t_iCnt = 0 then
        t_iParam = 0
      end if
      t_iParam = []
      j = 1
      repeat while j <= t_iCnt
        j = j + 1
      end repeat
    else
      if t_rOwnSet = 4 then
        t_iPinLevel = a_rMsg.connection.GetIntFrom()
      end if
    end if
    i = i + 1
  end repeat
end
on _TradeFinished this, a_rMsg
  t_dialogName = "trade.dialog.oppositeGender_window"
  if getWindow(t_dialogName) <> 0 then
    removeWindow(t_dialogName)
  end if
  t_iStatus = a_rMsg.connection.GetIntFrom()
  if t_iStatus = 1 then
    this.component.TradeCancelled()
  end if
  this.component.TradeClose()
end
on _PinsCombined this, a_rMsg
  t_iUpdatedPinRef = a_rMsg.connection.GetIntFrom()
  t_sUpdatedPinOldGroup = a_rMsg.connection.GetStrFrom()
  t_sUpdatedPinNewGroup = a_rMsg.connection.GetStrFrom()
  t_iNewLevel = a_rMsg.connection.GetIntFrom()
  t_iRemovedPinRef = a_rMsg.connection.GetIntFrom()
  t_sRemovedPinGroup = a_rMsg.connection.GetStrFrom()
  t_rItem = duplicate(GetItem(this.getComponent().GetInventory(1), #pins, t_sUpdatedPinOldGroup))
  t_rItem.setaProp(#param, t_iNewLevel)
  t_rItem.setaProp(#group, t_sUpdatedPinNewGroup)
  t_rItem.setaProp(#state, #normal)
  t_rDetails = GetItemDetails(this.getComponent().GetInventory(1), #pins, t_sUpdatedPinOldGroup)
  if not voidp(t_rDetails) then
    t_rDetails = duplicate(t_rDetails)
  end if
  this.getComponent().GetInventory(1).RemItem(#pins, t_iUpdatedPinRef, t_sUpdatedPinOldGroup)
  this.getComponent().GetInventory(1).RemItem(#pins, t_iRemovedPinRef, t_sRemovedPinGroup)
  addItem(this.getComponent().GetInventory(1), #pins, t_iUpdatedPinRef, t_rItem, t_rDetails, t_sUpdatedPinNewGroup)
end
on _TradeChat this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_sMsg = TransformCannedMsgToString(a_rMsg)
  t_rCon = getThread("room").getComponent()._AccessRoom()
  if not voidp(t_rCon) then
    t_rAvatar = t_rCon._AccessIndexed(t_iRef, "avatar")
    if voidp(t_rAvatar) then
      error(this, "Trade Avatar not found:" & t_iRef, #_AvatarChat)
    end if
    t_chatMsg = propList(#message, t_sMsg, #mode, #say, #name, GetParam(t_rAvatar, "NAME"), #ref, t_rAvatar)
  end if
end
on _TradeChatNotification this, a_rMsg
  t_sMsg = a_rMsg.connection.GetStrFrom()
  t_chatMsg = propList(#message, t_sMsg, #mode, #say, #name, "VMK Administration")
end
on HandleLevelRequirementNotMetMessage this, a_rMsg
  tConn = a_rMsg.connection
  t_iItemCode = tConn.GetIntFrom()
  t_iRequiredLevel = tConn.GetIntFrom()
  t_iAvatarLevel = tConn.GetIntFrom()
  this.getInterface().ShowLevelRequiredScreen(t_iItemCode, t_iRequiredLevel, t_iAvatarLevel)
end
on DisableLevelReqMsg this
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = propList()
  unregisterListener(t_sID, this.getID(), t_rList)
  this.m_bLevelReqMsgEnabled = 0
end
on EnableLevelReqMsg this
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = propList()
  registerListener(t_sID, this.getID(), t_rList)
  this.m_bLevelReqMsgEnabled = 1
end
on GetLevelReqMsgEnabled this
  return the m_bLevelReqMsgEnabled of this
end
on _Configure this, a_bBool
  t_sID = getVariable("main.connection.id", "VMK")
  t_bReturn = 1
  t_rList = propList()
  t_rList.setaProp(2014, #_ReceiveCredits)
  t_rList.setaProp(2532, #_ReceiveItemList)
  t_rList.setaProp(2520, #_RemItemsFromList)
  t_rList.setaProp(2536, #_ReceiveWornPins)
  t_rList.setaProp(2535, #_ReceiveWornClothes)
  t_rList.setaProp(2523, #_UnwearPin)
  t_rList.setaProp(2524, #_WearPin)
  t_rList.setaProp(2525, #_ClothSwitch)
  t_rList.setaProp(2562, #_TradeChat)
  t_rList.setaProp(2563, #_TradeChatNotification)
  t_rList.setaProp(2594, #_TradeRequest)
  t_rList.setaProp(2595, #_TradeResponse)
  t_rList.setaProp(2596, #_TradeStatus)
  t_rList.setaProp(2597, #_TradeFinished)
  t_rList.setaProp(2740, #_RewardInfo)
  t_rList.setaProp(2537, #_SellConfirmRequest)
  t_rList.setaProp(2538, #_SellConfirmResponse)
  t_rList.setaProp(2539, #_PinsCombined)
  t_rList.setaProp(2533, #_ReceiveItemDetailsInInventory)
  t_rList.setaProp(2522, #_ItemDetails)
  t_rList.setaProp(2908, #HandleLevelRequirementNotMetMessage)
  t_rList.setaProp(2930, #_ListItemGroups)
  if a_bBool then
    t_bReturn = bitAnd(t_bReturn, registerListener(t_sID, this.getID(), t_rList))
    this.m_bLevelReqMsgEnabled = 1
  end if
  t_bReturn = bitAnd(t_bReturn, unregisterListener(t_sID, this.getID(), t_rList))
  this.m_bLevelReqMsgEnabled = 0
  t_rList = propList()
  t_rList.setaProp("SellItemRequest", 522)
  t_rList.setaProp("WearPin", 523)
  t_rList.setaProp("UnwearPin", 530)
  t_rList.setaProp("SellItemConfirm", 525)
  t_rList.setaProp("CombinePin", 524)
  t_rList.setaProp("SellClothing", 529)
  t_rList.setaProp("CodeRedemption", 13)
  t_rList.setaProp("RequestBalance", 14)
  t_rList.setaProp("GetItemList", 532)
  t_rList.setaProp("TrdConfLevel", 586)
  t_rList.setaProp("TrdAddRemItem", 587)
  t_rList.setaProp("TrdSendRequest", 588)
  t_rList.setaProp("TrdResponse", 589)
  t_rList.setaProp("RequestItemDetails", 535)
  if a_bBool then
    t_bReturn = bitAnd(t_bReturn, registerCommands(t_sID, this.getID(), t_rList))
  end if
  t_bReturn = bitAnd(t_bReturn, unregisterCommands(t_sID, this.getID(), t_rList))
  return t_bReturn
end