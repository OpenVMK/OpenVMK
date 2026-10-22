-- Script
property m_bLevelReqMsgEnabled

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
  t_ar_data = [:]
  t_rInput = a_rMsg.connection
  t_ar_data[#code] = t_rInput.GetIntFrom()
  t_ar_data[#owner] = t_rInput.GetStrFrom()
  t_ar_data[#type] = t_rInput.GetIntFrom()
  t_ar_data[#xtra] = [:]
  case t_ar_data[#type] of
    1:
      t_iRef = t_rInput.GetIntFrom()
      if t_iRef <> -1 then
        t_ar_data[#xtra][#ref] = t_iRef
      end if
      t_iEntityID = t_rInput.GetIntFrom()
      if t_iEntityID <> -1 then
        t_ar_data[#xtra][#entityID] = t_iEntityID
      end if
    2:
      t_iRef = t_rInput.GetIntFrom()
      if t_iRef <> -1 then
        t_ar_data[#xtra][#ref] = t_iRef
      end if
    3:
    4:
    5:
    6:
    7:
      t_ar_data[#xtra][#pinlevel] = t_rInput.GetIntFrom()
      t_ar_data[#xtra][#magiword] = t_rInput.GetStrFrom()
    8:
      t_ar_data[#xtra][#timeToExpire] = t_rInput.GetIntFrom()
      t_ar_data[#xtra][#magiword] = t_rInput.GetStrFrom()
    9:
      t_ar_data[#xtra][#timeToExpire] = t_rInput.GetIntFrom()
      t_ar_data[#xtra][#validForRooms] = t_rInput.GetStrFrom()

  end case
  t_sObjectID = "ItemDetails"
  if objectExists(t_sObjectID) then
    removeObject(t_sObjectID)
  end if
  if getObject(#session).get("FetchEntityID") then
    if not voidp(t_iEntityID) and not voidp(t_iRef) then
      t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(t_iRef, "element")
      if objectp(t_rObj) then
        t_rObj.getObject().SetParam("ENTITYID", t_iEntityID)
      else
        error(this, "Object not found in context", #_ItemDetails)
      end if
    end if
  else
    if not getObject(#session).get("IsTrading") then
      t_rObject = createObject(t_sObjectID, "CInvItemDetails")
      if objectp(t_rObject) then
        t_rObject.Define(t_ar_data)
      end if
    else
      if not voidp(this.getComponent().m_rTradeDevice) then
        this.getComponent().m_rTradeDevice.DefineItemInfo(t_ar_data)
      end if
    end if
  end if
end
on _ReceiveItemList this, a_rMsg
  t_rInput = a_rMsg.connection
  t_mp_iCode_kCategory = [1: #items, 2: #clothes, 3: #posters, 4: #pins]
  t_mp_kType_mp_iRef_rItem = [:]
  t_mp_kType_mp_iRef_rItem.setaProp(#items, [:])
  t_mp_kType_mp_iRef_rItem.setaProp(#posters, [:])
  t_mp_kType_mp_iRef_rItem.setaProp(#clothes, [:])
  t_mp_kType_mp_iRef_rItem.setaProp(#pins, [:])
  t_iInventoryId = t_rInput.GetIntFrom()
  case t_iInventoryId of
    1:
      t_kInventoryId = #itemInventory
    3:
      t_kInventoryId = #wornPins
    5:
      t_kInventoryId = #vmks

  end case
  t_iClearFlag = a_rMsg.connection.GetIntFrom()
  t_iCount = t_rInput.GetIntFrom()
  repeat with i = 1 to t_iCount
    t_iRef = t_rInput.GetIntFrom()
    t_iTypeCode = t_rInput.GetIntFrom()
    t_iCategory = t_rInput.GetIntFrom()
    t_sItemGroup = t_rInput.GetStrFrom()
    t_iItemCount = t_rInput.GetIntFrom()
    case t_iCategory of
      1:
        t_kCat = #items
        t_iCnt = t_rInput.GetIntFrom()
        if t_iCnt = 0 then
          t_iParam = 0
        else
          t_iParam = []
        end if
        repeat with j = 1 to t_iCnt
          t_iParam.append(t_rInput.GetIntFrom())
        end repeat
      2:
        t_kCat = #clothes
        t_iParam = 0
      3:
        t_kCat = #posters
        t_iParam = 0
      4:
        t_kCat = #pins
        t_iParam = t_rInput.GetIntFrom()
        t_iSingleUse = t_rInput.GetIntFrom()
        t_sExpiryDate = t_rInput.GetIntFrom()

    end case
    t_rTargetMap = t_mp_kType_mp_iRef_rItem.getaProp(t_mp_iCode_kCategory.getaProp(t_iCategory))
    t_rTargetMap.setaProp(t_sItemGroup, [#group: t_sItemGroup, #items: t_iItemCount, #ref: t_iRef, #code: t_iTypeCode, #param: t_iParam, #state: #normal, #category: t_kCat])
    if t_iCategory = 4 then
      t_rTargetMap[t_sItemGroup].addProp(#singleuse, t_iSingleUse)
      t_rTargetMap[t_sItemGroup].addProp(#expirydate, t_sExpiryDate)
    end if
  end repeat
  if t_iClearFlag then
    this.getComponent().GetInventory(t_iInventoryId).ClearItems()
  end if
  repeat with i = 1 to t_mp_kType_mp_iRef_rItem.count
    t_kCategory = t_mp_kType_mp_iRef_rItem.getPropAt(i)
    t_mp_sGroup_rItem = t_mp_kType_mp_iRef_rItem[i]
    this.getComponent().GetInventory(t_iInventoryId).UpdateItemList(t_kCategory, t_mp_sGroup_rItem)
  end repeat
end
on _ReceiveItemDetailsInInventory this, a_rMsg
  t_rConnection = a_rMsg.connection
  t_iInventoryId = t_rConnection.GetIntFrom()
  t_iClearFlag = t_rConnection.GetIntFrom()
  t_iItemCount = t_rConnection.GetIntFrom()
  t_mp_sGroup_rDetails = [:]
  if t_iItemCount > 0 then
    repeat with i = 1 to t_iItemCount
      t_sItemGroup = t_rConnection.GetStrFrom()
      t_iNumberOfPairs = t_rConnection.GetIntFrom()
      t_mp_sKey_sValue = [:]
      repeat with e = 1 to t_iNumberOfPairs
        t_mp_sKey_sValue.addProp(t_rConnection.GetStrFrom(), t_rConnection.GetStrFrom())
      end repeat
      t_mp_sGroup_rDetails.addProp(t_sItemGroup, t_mp_sKey_sValue)
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
  t_mp_sGroup_rData = [:]
  repeat with i = 1 to t_iCount
    t_rGroup = [:]
    t_rGroup[#group] = a_rMsg.connection.GetStrFrom()
    t_rGroup[#items] = a_rMsg.connection.GetIntFrom()
    t_rGroup[#ref] = a_rMsg.connection.GetIntFrom()
    t_mp_sGroup_rData[t_rGroup[#group]] = t_rGroup
  end repeat
  this.getComponent().GetInventory(t_iInventoryId).UpdateItemList(#all, t_mp_sGroup_rData)
end
on _AddItemsToList this, a_rMsg
  t_iCount = a_rMsg.connection.GetIntFrom()
  error(this, "Unimplemented method!", #_AddItemsToList)
  repeat with i = 1 to t_iCount
    t_iCat = a_rMsg.connection.GetIntFrom()
    t_iRef = a_rMsg.connection.GetIntFrom()
  end repeat
end
on _RemItemsFromList this, a_rMsg
  t_iInventoryId = a_rMsg.connection.GetIntFrom()
  case t_iInventoryId of
    1:
      t_kInventoryId = #itemInventory
    3:
      t_kInventoryId = #wornPins
    5:
      t_kInventoryId = #vmks

  end case
  t_iCount = a_rMsg.connection.GetIntFrom()
  repeat with i = 1 to t_iCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iCat = a_rMsg.connection.GetIntFrom()
    t_sGrp = a_rMsg.connection.GetStrFrom()
    case t_iCat of
      1:
        t_kCat = #items
      2:
        t_kCat = #clothes
      3:
        t_kCat = #posters
      4:
        t_kCat = #pins
      otherwise:
        error(this, "Unknown category:" && t_iCat, #_RemItemsFromList)
        t_kCat = #null

    end case
    this.getComponent().GetInventory(t_iInventoryId).RemItem(t_kCat, t_iRef, t_sGrp)
  end repeat
end
on _ReceiveWornPins this, a_rMsg
  t_iCount = a_rMsg.connection.GetIntFrom()
  t_mp_iRef_rItem = [:]
  repeat with i = 1 to t_iCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iCode = a_rMsg.connection.GetIntFrom()
    t_iParam = a_rMsg.connection.GetIntFrom()
    t_iSingleUse = a_rMsg.connection.GetIntFrom()
    t_sExpiryDate = a_rMsg.connection.GetIntFrom()
    t_sItemGroup = a_rMsg.connection.GetStrFrom()
    t_mp_iRef_rItem.setaProp(t_sItemGroup, [#group: t_sItemGroup, #items: 1, #ref: t_iRef, #code: t_iCode, #param: t_iParam, #state: #normal, #singleuse: t_iSingleUse, #expirydate: t_sExpiryDate])
  end repeat
  this.getComponent().GetInventory(3).UpdateItemList(#pins, t_mp_iRef_rItem)
end
on _ReceiveWornClothes this, a_rMsg
  t_iCount = a_rMsg.connection.GetIntFrom()
  t_mp_iRef_rItem = [:]
  repeat with i = 1 to t_iCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iCode = a_rMsg.connection.GetIntFrom()
    t_sGroup = a_rMsg.connection.GetStrFrom()
    t_mp_iRef_rItem.setaProp(t_sGroup, [#ref: t_iRef, #group: t_sGroup, #items: 1, #code: t_iCode, #state: #normal])
  end repeat
  this.getComponent().GetInventory(2).UpdateItemList(#clothes, t_mp_iRef_rItem)
end
on _UnwearPin this, a_rMsg
  t_iSrc = a_rMsg.connection.GetIntFrom()
  t_iDest = a_rMsg.connection.GetIntFrom()
  t_sSrcGrp = a_rMsg.connection.GetStrFrom()
  t_sTrgGrp = a_rMsg.connection.GetStrFrom()
  if t_iDest = -1 then
    this.getComponent().GetInventory(3).RemItem(#pins, t_iSrc, t_sSrcGrp)
  else
    this.getComponent().GetInventory(3).CatSwitch(#pins, t_iSrc, this.getComponent().GetInventory(1), #pins, t_iDest, t_sSrcGrp, t_sTrgGrp)
  end if
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
  repeat with i = 1 to t_iCount
    t_iSrcRef = a_rMsg.connection.GetIntFrom()
    t_iDstRef = a_rMsg.connection.GetIntFrom()
    t_sSrcGrp = a_rMsg.connection.GetStrFrom()
    t_sDstGrp = a_rMsg.connection.GetStrFrom()
    this.getComponent().GetInventory(t_iInventoryId).CatSwitch(#clothes, t_iSrcRef, this.getComponent().GetInventory(2), #clothes, t_iDstRef, t_sSrcGrp, t_sDstGrp)
  end repeat
  t_iCount = a_rMsg.connection.GetIntFrom()
  repeat with i = 1 to t_iCount
    t_iSrcRef = a_rMsg.connection.GetIntFrom()
    t_iDstRef = a_rMsg.connection.GetIntFrom()
    t_sSrcGrp = a_rMsg.connection.GetStrFrom()
    t_sDstGrp = a_rMsg.connection.GetStrFrom()
    this.getComponent().GetInventory(2).CatSwitch(#clothes, t_iSrcRef, this.getComponent().GetInventory(t_iInventoryId), #clothes, t_iDstRef, t_sSrcGrp, t_sDstGrp)
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
  t_mp_iCode_kCategory = [1: #items, 2: #clothes, 3: #posters, 4: #pins]
  t_bFromHK = a_rMsg.connection.GetIntFrom()
  t_bShowAlert = a_rMsg.connection.GetIntFrom()
  t_iPrc = a_rMsg.connection.GetIntFrom()
  t_iItemCount = a_rMsg.connection.GetIntFrom()
  if t_bFromHK then
    t_ar_ItemList = []
    repeat with i = 1 to t_iItemCount
      t_iTyp = a_rMsg.connection.GetIntFrom()
      t_iRef = a_rMsg.connection.GetIntFrom()
      t_sGrp = a_rMsg.connection.GetStrFrom()
      this.getComponent().GetInventory(1).RemItem(t_mp_iCode_kCategory.getaProp(t_iTyp), t_iRef, t_sGrp)
    end repeat
    if t_bShowAlert then
      t_s_Title = getText("inv.deleted.from.hk.title")
      t = createDialogWindow(this.getID(), "ItemsDeletedFromHk", 1, 1)
      t.show()
      t_sTxt = replaceChunks(getText("inv.deleted.from.hk"), "$", string(t_iItemCount))
      t.setText(t_sTxt, t_s_Title, "OK")
    end if
  else
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
    t_iTraderGender = t_rTrader.GetParam("SEX")
    t_sOwnName = getObject(#session).get("name")
    t_info = [:]
    executeMessage(#avatarsex, t_sOwnName, t_info)
    t_sTraderName = EMPTY
    if objectp(t_rTrader) then
      t_sTraderName = t_rTrader.GetParam("NAME")
    end if
    this.component.TradeOpen(t_iUserRef, t_iTraderGender <> t_info["SEX"])
    if t_iTraderGender <> t_info.getaProp("SEX") then
      t = createDialogWindow(this.getID(), "trade.dialog.oppositeGender", 1, 1)
      t_ar_CustomBtn = [#text: getText("inv.trade.oppositeGender.dialog.OK"), #eventID: #dialogOK, #data: t_iUserRef]
      t.setText(getText("inv.trade.oppositeGender.dialog.text"), getText("inv.trade.oppositeGender.dialog.title"), t_ar_CustomBtn)
      t.show()
    end if
  else
    if t_iResponse = 0 then
      t = createDialogWindow(this.getID(), "trade.dialog.trade.declined", 1, 1)
      t_ar_CustomBtn = [#text: getText("inv.trade.declined.dialog.OK"), #eventID: #dialogOK, #data: t_sTraderName]
      t.setText(getText("inv.trade.declined.dialog.text"), getText("inv.trade.declined.dialog.title"), t_ar_CustomBtn)
      t.show()
    end if
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent, t_rParameter
  case t_dialogName of
    "trade.dialog.oppositeGender":
      case t_dialogEvent of
        #dialogOK:
          me.component.TradeOpen(t_rParameter, 1)

      end case
    "ItemsDeletedFromHk":
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on _TradeStatus this, a_rMsg
  t_rOwnSet = [#confirm: a_rMsg.connection.GetIntFrom()]
  t_iItemCount = a_rMsg.connection.GetIntFrom()
  t_mp_iRef_rItem_Own = [:]
  repeat with i = 1 to t_iItemCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iTyp = a_rMsg.connection.GetIntFrom()
    t_iCat = a_rMsg.connection.GetIntFrom()
    case t_iCat of
      1:
        t_iCnt = a_rMsg.connection.GetIntFrom()
        if t_iCnt = 0 then
          t_iParam = 0
        else
          t_iParam = []
        end if
        repeat with j = 1 to t_iCnt
          t_iParam.append(a_rMsg.connection.GetIntFrom())
        end repeat
        t_mp_iRef_rItem_Own.setaProp(t_iRef, [#ref: t_iRef, #code: t_iTyp, #cat: t_iCat, #param: t_iParam])
      4:
        t_iPinLevel = a_rMsg.connection.GetIntFrom()
        t_mp_iRef_rItem_Own.setaProp(t_iRef, [#ref: t_iRef, #code: t_iTyp, #cat: t_iCat, #param: t_iPinLevel])
      otherwise:
        t_mp_iRef_rItem_Own.setaProp(t_iRef, [#ref: t_iRef, #code: t_iTyp, #cat: t_iCat])

    end case
  end repeat
  t_rOwnSet.setaProp(#items, t_mp_iRef_rItem_Own)
  t_rHerSet = [#confirm: a_rMsg.connection.GetIntFrom()]
  t_iItemCount = a_rMsg.connection.GetIntFrom()
  t_mp_iRef_rItem_Her = [:]
  repeat with i = 1 to t_iItemCount
    t_iRef = a_rMsg.connection.GetIntFrom()
    t_iTyp = a_rMsg.connection.GetIntFrom()
    t_iCat = a_rMsg.connection.GetIntFrom()
    case t_iCat of
      1:
        t_iCnt = a_rMsg.connection.GetIntFrom()
        if t_iCnt = 0 then
          t_iParam = 0
        else
          t_iParam = []
        end if
        repeat with j = 1 to t_iCnt
          t_iParam.append(a_rMsg.connection.GetIntFrom())
        end repeat
        t_mp_iRef_rItem_Her.setaProp(t_iRef, [#ref: t_iRef, #code: t_iTyp, #page: t_iCat, #param: t_iParam])
      4:
        t_iPinLevel = a_rMsg.connection.GetIntFrom()
        t_mp_iRef_rItem_Her.setaProp(t_iRef, [#ref: t_iRef, #code: t_iTyp, #page: t_iCat, #param: t_iPinLevel])
      otherwise:
        t_mp_iRef_rItem_Her.setaProp(t_iRef, [#ref: t_iRef, #code: t_iTyp, #page: t_iCat])

    end case
  end repeat
  t_rHerSet.setaProp(#items, t_mp_iRef_rItem_Her)
  this.component.TradeStatus(t_rOwnSet, t_rHerSet)
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
  t_rItem = this.getComponent().GetInventory(1).GetItem(#pins, t_sUpdatedPinOldGroup).duplicate()
  t_rItem.setaProp(#param, t_iNewLevel)
  t_rItem.setaProp(#group, t_sUpdatedPinNewGroup)
  t_rItem.setaProp(#state, #normal)
  t_rDetails = this.getComponent().GetInventory(1).GetItemDetails(#pins, t_sUpdatedPinOldGroup)
  if not voidp(t_rDetails) then
    t_rDetails = t_rDetails.duplicate()
  end if
  this.getComponent().GetInventory(1).RemItem(#pins, t_iUpdatedPinRef, t_sUpdatedPinOldGroup)
  this.getComponent().GetInventory(1).RemItem(#pins, t_iRemovedPinRef, t_sRemovedPinGroup)
  this.getComponent().GetInventory(1).addItem(#pins, t_iUpdatedPinRef, t_rItem, t_rDetails, t_sUpdatedPinNewGroup)
end
on _TradeChat this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_sMsg = TransformCannedMsgToString(a_rMsg)
  t_rCon = getThread("room").getComponent()._AccessRoom()
  if not voidp(t_rCon) then
    t_rAvatar = t_rCon._AccessIndexed(t_iRef, "avatar")
    if voidp(t_rAvatar) then
      error(this, "Trade Avatar not found:" && t_iRef, #_AvatarChat)
    else
      t_chatMsg = [#message: t_sMsg, #mode: #say, #name: t_rAvatar.GetParam("NAME"), #ref: t_rAvatar]
      executeMessage(#tradechat, t_chatMsg)
    end if
  end if
end
on _TradeChatNotification this, a_rMsg
  t_sMsg = a_rMsg.connection.GetStrFrom()
  t_chatMsg = [#message: t_sMsg, #mode: #say, #name: "VMK Administration"]
  executeMessage(#tradechat, t_chatMsg)
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
  t_rList = [:]
  t_rList.setaProp(2908, #HandleLevelRequirementNotMetMessage)
  unregisterListener(t_sID, this.getID(), t_rList)
  m_bLevelReqMsgEnabled = 0
end
on EnableLevelReqMsg this
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2908, #HandleLevelRequirementNotMetMessage)
  registerListener(t_sID, this.getID(), t_rList)
  m_bLevelReqMsgEnabled = 1
end
on GetLevelReqMsgEnabled this
  return m_bLevelReqMsgEnabled
end
on _Configure this, a_bBool
  t_sID = getVariable("main.connection.id", "VMK")
  t_bReturn = 1
  t_rList = [:]
  t_rList.setaProp(2013, #_CodeRedemptionOK)
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
    m_bLevelReqMsgEnabled = 1
  else
    t_bReturn = bitAnd(t_bReturn, unregisterListener(t_sID, this.getID(), t_rList))
    m_bLevelReqMsgEnabled = 0
  end if
  t_rList = [:]
  t_rList.setaProp("PlaceItem", 520)
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
  else
    t_bReturn = bitAnd(t_bReturn, unregisterCommands(t_sID, this.getID(), t_rList))
  end if
  return t_bReturn
end