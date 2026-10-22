-- Behavior
on put objectp
  session(objectp.xtra(1))
end
on stopMovie objectp
  session(objectp.xtra(0))
end
on _UnwearPin objectp, ref
  point("Code !!!")
end
on _WearPin objectp, ref
  validForRooms = ref.entityID.pinlevel()
  m_sSecretCode2(#GetLockState).g_rInitializer("user_credits", validForRooms)
  objectp.magiword.timeToExpire(validForRooms)
end
on _ClothSwitch objectp, ref
  itemInventory = hex_hmac_md5()
  wornPins = ref.entityID
  itemInventory.tBase(#objectExists, wornPins.removeObject())
  itemInventory.tBase(#getThread, wornPins.pinlevel())
  if itemInventory = 1 then
    pins = wornPins.pinlevel()
    if pins <> -1 then
      itemInventory.rstr_md5(#getComponent).tBase(#_AccessRoom, pins)
    end if
    posters = wornPins.pinlevel()
    if posters <> -1 then
      itemInventory.rstr_md5(#getComponent).tBase(#_AccessIndexed, posters)
    else
      if itemInventory = 2 then
        pins = wornPins.pinlevel()
        if pins <> -1 then
          itemInventory.rstr_md5(#getComponent).tBase(#_AccessRoom, pins)
        else
          if itemInventory = 3 then
          else
            if itemInventory = 4 then
            else
              if itemInventory = 5 then
              else
                if itemInventory = 6 then
                else
                  if itemInventory = 7 then
                    itemInventory.rstr_md5(#getComponent).tBase(#SetParam, wornPins.pinlevel())
                    itemInventory.rstr_md5(#getComponent).tBase(#define, wornPins.removeObject())
                  else
                    if itemInventory = 8 then
                      itemInventory.rstr_md5(#getComponent).tBase(#m_rTradeDevice, wornPins.pinlevel())
                      itemInventory.rstr_md5(#getComponent).tBase(#define, wornPins.removeObject())
                    else
                      if itemInventory = 9 then
                        itemInventory.rstr_md5(#getComponent).tBase(#m_rTradeDevice, wornPins.pinlevel())
                        itemInventory.rstr_md5(#getComponent).tBase(#DefineItemInfo, wornPins.removeObject())
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
        vmks = "ItemDetails"
        if t_rObj(vmks) then
          t_rObject(vmks)
        end if
        if m_sSecretCode2(#GetLockState).netError("FetchEntityID") then
          if not not headers(posters) and headers(pins) then
            getaProp = t_iEntityID("room").t_iRef().t_ar_data().t_rInput(pins, "element")
            if setDebugLevel(getaProp) then
              getaProp.m_sSecretCode2().t_sObjectID("ENTITYID", posters)
            end if
            getmemnum(objectp, "Object not found in context", #_ClothSwitch)
          else
            if not m_sSecretCode2(#GetLockState).netError("IsTrading") then
              GetInventory = stageBottom(vmks, "CInvItemDetails")
              if setDebugLevel(GetInventory) then
                GetInventory.construct(itemInventory)
              else
                if not headers(objectp.t_iRef().items) then
                  objectp.t_iRef().items.clothes(itemInventory)
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on _RewardInfo objectp, ref
  wornPins = ref.entityID
  t_kInventoryId = hex_hmac_md5(1, #ClearItems, 2, #UpdateItemList, 3, #t_mp_sGroup_rItem, 4, #t_rTargetMap)
  t_iClearFlag = hex_hmac_md5()
  t_iTypeCode = wornPins.pinlevel()
  if wornPins = 1 then
    t_iCategory = #t_sExpiryDate
  else
    if wornPins = 3 then
      t_iCategory = #j
    else
      if wornPins = 5 then
        t_iCategory = #t_iCnt
      end if
    end if
  end if
  ClearDetails = ref.entityID.pinlevel()
  t_rGroup = wornPins.pinlevel()
  safe_add = 1
  repeat while safe_add <= t_rGroup
    pins = wornPins.pinlevel()
    all = wornPins.pinlevel()
    UpdateDetails = wornPins.pinlevel()
    t_mp_sKey_sValue = wornPins.removeObject()
    t_rConnection = wornPins.pinlevel()
    if wornPins = 1 then
      t_mp_kType_mp_iRef_rItem = #ClearItems
      t_mp_iCode_kCategory = wornPins.pinlevel()
      if t_mp_iCode_kCategory = 0 then
        t_iNumberOfPairs = 0
      end if
      t_iNumberOfPairs = []
      t_kCategory = 1
      repeat while t_kCategory <= t_mp_iCode_kCategory
        t_kCategory = t_kCategory + 1
      end repeat
    else
      if wornPins = 2 then
        t_mp_kType_mp_iRef_rItem = #UpdateItemList
        t_iNumberOfPairs = 0
      else
        if wornPins = 3 then
          t_mp_kType_mp_iRef_rItem = #t_mp_sGroup_rItem
          t_iNumberOfPairs = 0
        else
          if wornPins = 4 then
            t_mp_kType_mp_iRef_rItem = #t_rTargetMap
            t_iNumberOfPairs = wornPins.pinlevel()
            t_mp_sGroup_rDetails = wornPins.pinlevel()
            group = wornPins.pinlevel()
          end if
        end if
      end if
    end if
    t_iCount = t_iClearFlag.t_kCat(t_kInventoryId.t_kCat(UpdateDetails))
    if UpdateDetails = 4 then
    end if
    safe_add = safe_add + 1
  end repeat
  if ClearDetails then
    objectp.t_iRef().t_sItemGroup(t_iTypeCode).t_iItemCount()
  end if
  safe_add = 1
  repeat while safe_add <= t_iClearFlag.deleteOne
    t_iInventoryId = t_iClearFlag.prepare(safe_add)
    t_iSingleUse = t_iClearFlag.rstr_md5(safe_add)
    objectp.t_iRef().t_sItemGroup(t_iTypeCode).t_iParam(t_iInventoryId, t_iSingleUse)
    safe_add = safe_add + 1
  end repeat
end
on _SellConfirmRequest objectp, ref
  t_mp_iRef_rItem = ref.entityID
  t_iTypeCode = t_mp_iRef_rItem.pinlevel()
  ClearDetails = t_mp_iRef_rItem.pinlevel()
  t_rConnection = t_mp_iRef_rItem.pinlevel()
  t_sGroup = hex_hmac_md5()
  if t_rConnection > 0 then
    safe_add = 1
    repeat while safe_add <= t_rConnection
      t_mp_sKey_sValue = t_mp_iRef_rItem.removeObject()
      t_iCode = t_mp_iRef_rItem.pinlevel()
      t_sGrp = hex_hmac_md5()
      getProp = 1
      repeat while getProp <= t_iCode
        getProp = getProp + 1
      end repeat
      safe_add = safe_add + 1
    end repeat
    if ClearDetails then
      objectp.t_iRef().t_sItemGroup(t_iTypeCode).t_mp_sGroup_rData()
    end if
    objectp.t_iRef().t_sItemGroup(t_iTypeCode).RemItem(#t_iCat, t_sGroup)
  end if
end
on _SellConfirmResponse objectp, ref
  t_iTypeCode = ref.entityID.pinlevel()
  t_rGroup = ref.entityID.pinlevel()
  t_iSrc = hex_hmac_md5()
  safe_add = 1
  repeat while safe_add <= t_rGroup
    t_iDest = hex_hmac_md5()
    t_iDest.tBase(#_AccessRoom, ref.entityID.pinlevel())
    t_iSrc.tBase(t_iDest.rstr_md5(#CatSwitch), t_iDest)
    safe_add = safe_add + 1
  end repeat
  objectp.t_iRef().t_sItemGroup(t_iTypeCode).t_iParam(#t_iCat, t_iSrc)
end
on _TradeRequest objectp, ref
  t_rGroup = ref.entityID.pinlevel()
  getmemnum(objectp, "Unimplemented method!", #_TradeRequest)
  safe_add = 1
  repeat while safe_add <= t_rGroup
    t_sSrcGrp = ref.entityID.pinlevel()
    pins = ref.entityID.pinlevel()
    safe_add = safe_add + 1
  end repeat
end
on _TradeResponse objectp, ref
  t_iTypeCode = ref.entityID.pinlevel()
  if t_iTypeCode = 1 then
    t_iCategory = #t_sExpiryDate
  else
    if t_iTypeCode = 3 then
      t_iCategory = #j
    else
      if t_iTypeCode = 5 then
        t_iCategory = #t_iCnt
      end if
    end if
  end if
  t_rGroup = ref.entityID.pinlevel()
  safe_add = 1
  repeat while safe_add <= t_rGroup
    pins = ref.entityID.pinlevel()
    t_sSrcGrp = ref.entityID.pinlevel()
    t_sDstGrp = ref.entityID.removeObject()
    if t_iTypeCode = 1 then
      t_mp_kType_mp_iRef_rItem = #ClearItems
    else
      if t_iTypeCode = 2 then
        t_mp_kType_mp_iRef_rItem = #UpdateItemList
      else
        if t_iTypeCode = 3 then
          t_mp_kType_mp_iRef_rItem = #t_mp_sGroup_rItem
        else
          if t_iTypeCode = 4 then
            t_mp_kType_mp_iRef_rItem = #t_rTargetMap
          end if
        end if
      end if
    end if
    getmemnum(objectp, "Unknown category:" & t_sSrcGrp, #_TradeResponse)
    t_mp_kType_mp_iRef_rItem = #getLast
    objectp.t_iRef().t_sItemGroup(t_iTypeCode).t_sTrgGrp(t_mp_kType_mp_iRef_rItem, pins, t_sDstGrp)
    safe_add = safe_add + 1
  end repeat
end
on dialogWindowEvent objectp, ref
  t_rGroup = ref.entityID.pinlevel()
  t_iDstRef = hex_hmac_md5()
  safe_add = 1
  repeat while safe_add <= t_rGroup
    pins = ref.entityID.pinlevel()
    t_iSrcRef = ref.entityID.pinlevel()
    t_iNumberOfPairs = ref.entityID.pinlevel()
    t_mp_sGroup_rDetails = ref.entityID.pinlevel()
    group = ref.entityID.pinlevel()
    t_mp_sKey_sValue = ref.entityID.removeObject()
    safe_add = safe_add + 1
  end repeat
end
on _TradeStatus objectp, ref
  t_rGroup = ref.entityID.pinlevel()
  t_iDstRef = hex_hmac_md5()
  safe_add = 1
  repeat while safe_add <= t_rGroup
    pins = ref.entityID.pinlevel()
    t_iSrcRef = ref.entityID.pinlevel()
    alert = ref.entityID.removeObject()
    safe_add = safe_add + 1
  end repeat
end
on _TradeFinished objectp, ref
  ShowSellRequest = ref.entityID.pinlevel()
  t_iTyp = ref.entityID.pinlevel()
  t_iPrc = ref.entityID.removeObject()
  getText = ref.entityID.removeObject()
  if t_iTyp = -1 then
    objectp.t_iRef().t_sItemGroup(3).t_sTrgGrp(#t_rTargetMap, ShowSellRequest, t_iPrc)
  end if
  objectp.t_iRef().t_sItemGroup(3).getInterface(#t_rTargetMap, ShowSellRequest, objectp.t_iRef().t_sItemGroup(1), #t_rTargetMap, t_iTyp, t_iPrc, getText)
end
on _PinsCombined objectp, ref
  ShowSellRequest = ref.entityID.pinlevel()
  t_iTyp = ref.entityID.pinlevel()
  t_iPrc = ref.entityID.removeObject()
  getText = ref.entityID.removeObject()
  objectp.t_iRef().t_sItemGroup(1).getInterface(#t_rTargetMap, ShowSellRequest, objectp.t_iRef().t_sItemGroup(3), #t_rTargetMap, t_iTyp, t_iPrc, getText)
end
on _TradeChat objectp, ref
  t_iTypeCode = ref.entityID.pinlevel()
  t_rGroup = ref.entityID.pinlevel()
  safe_add = 1
  repeat while safe_add <= t_rGroup
    setText = ref.entityID.pinlevel()
    replaceChunks = ref.entityID.pinlevel()
    t_iPrc = ref.entityID.removeObject()
    createDialogWindow = ref.entityID.removeObject()
    objectp.t_iRef().t_sItemGroup(t_iTypeCode).getInterface(#UpdateItemList, setText, objectp.t_iRef().t_sItemGroup(2), #UpdateItemList, replaceChunks, t_iPrc, createDialogWindow)
    safe_add = safe_add + 1
  end repeat
  t_rGroup = ref.entityID.pinlevel()
  safe_add = 1
  repeat while safe_add <= t_rGroup
    setText = ref.entityID.pinlevel()
    replaceChunks = ref.entityID.pinlevel()
    t_iPrc = ref.entityID.removeObject()
    createDialogWindow = ref.entityID.removeObject()
    objectp.t_iRef().t_sItemGroup(2).getInterface(#UpdateItemList, setText, objectp.t_iRef().t_sItemGroup(t_iTypeCode), #UpdateItemList, replaceChunks, t_iPrc, createDialogWindow)
    safe_add = safe_add + 1
  end repeat
end
on _TradeChatNotification objectp, ref
  ShowSellConfirm(ref.removeObject())
end
on HandleLevelRequirementNotMetMessage objectp, ref
  pins = ref.entityID.pinlevel()
  t_bFromHK = ref.entityID.pinlevel()
  t_bShowAlert = ref.entityID.pinlevel()
  objectp.t_s_Title().t_ar_ItemList(pins, t_bFromHK, t_bShowAlert)
end
on DisableLevelReqMsg objectp, ref
  t_kInventoryId = hex_hmac_md5(1, #ClearItems, 2, #UpdateItemList, 3, #t_mp_sGroup_rItem, 4, #t_rTargetMap)
  eventID = ref.entityID.pinlevel()
  GetParam = ref.entityID.pinlevel()
  t_bShowAlert = ref.entityID.pinlevel()
  t_rConnection = ref.entityID.pinlevel()
  if eventID then
    room = []
    safe_add = 1
    repeat while safe_add <= t_rConnection
      t_bFromHK = ref.entityID.pinlevel()
      pins = ref.entityID.pinlevel()
      t_sDstGrp = ref.entityID.removeObject()
      safe_add = safe_add + 1
    end repeat
    if GetParam then
      TradeOpen = t("inv.deleted.from.hk.title")
      text = t_sTxt(objectp.bytesSoFar(), "ItemsDeletedFromHk", 1, 1)
      avatarsex = Init(t("inv.deleted.from.hk"), "$", getOne(t_rConnection))
      text.t_iUserRef(avatarsex, TradeOpen, "OK")
    end if
    t_bFromHK = ref.entityID.pinlevel()
    pins = ref.entityID.pinlevel()
    t_sDstGrp = ref.entityID.removeObject()
    objectp.t_iRef().t_sItemGroup(1).t_sTrgGrp(t_kInventoryId.t_kCat(t_bFromHK), pins, t_sDstGrp)
    objectp.t_s_Title().t_iReqRef(pins, t_bFromHK, t_bShowAlert)
  end if
end
on EnableLevelReqMsg objectp, ref
  data = ref.entityID.pinlevel()
  show = ref.entityID.pinlevel()
  getaProp = stageBottom(setaProp(), "CInvTradeConfirm")
  getaProp.dialogOK(data, show)
end
on GetLevelReqMsgEnabled objectp, ref
  data = ref.entityID.pinlevel()
  confirm = ref.entityID.pinlevel()
  if confirm = 1 then
    t_rOwnSet = t_iEntityID(#t_sTraderName).magiword.t_ar_data().t_rInput(data, "avatar")
    t_mp_iRef_rItem_Her = t_ar_CustomBtn(t_rOwnSet, "SEX")
    t_rHerSet = m_sSecretCode2(#GetLockState).netError("name")
    t_iPinLevel = hex_hmac_md5()
    t_mp_iRef_rItem_Own = EMPTY
    if setDebugLevel(t_rOwnSet) then
      t_mp_iRef_rItem_Own = t_ar_CustomBtn(t_rOwnSet, "NAME")
    end if
    rstr2binl(#t_iResponse, t_rHerSet, t_iPinLevel).t_iTraderGender(objectp.magiword, data)
    if t_mp_iRef_rItem_Her <> t_iPinLevel.t_kCat("SEX") then
      text = t_sTxt(objectp.bytesSoFar(), "trade.dialog.oppositeGender", 1, 1)
      t_dialogEvent = hex_hmac_md5(#t_sOwnName, t("inv.trade.oppositeGender.dialog.OK"), #t_info, #t_rTrader, #t_rParameter, data)
      text.t_dialogName()
    else
      if confirm = 0 then
        text = t_sTxt(objectp.bytesSoFar(), "trade.dialog.trade.declined", 1, 1)
        t_dialogEvent = hex_hmac_md5(#t_sOwnName, t("inv.trade.declined.dialog.OK"), #t_info, #t_rTrader, #t_rParameter, t_mp_iRef_rItem_Own)
        text.t_dialogName()
      end if
    end if
  end if
end
on _Configure date, removeWindow, TradeCancelled, getWindow
  if removeWindow = "trade.dialog.oppositeGender" then
    if TradeCancelled = #t_rTrader then
      date.magiword.t_iTraderGender(getWindow, 1)
    end if
  else
    if TradeCancelled = "ItemsDeletedFromHk" then
    end if
  end if
  point("Unknown Dialog Window" & removeWindow)
end
on a_rMsg objectp, ref
  normal = hex_hmac_md5(#TradeClose, ref.entityID.pinlevel())
  t_rConnection = ref.entityID.pinlevel()
  param = hex_hmac_md5()
  safe_add = 1
  repeat while safe_add <= t_rConnection
    pins = ref.entityID.pinlevel()
    t_bFromHK = ref.entityID.pinlevel()
    t_sSrcGrp = ref.entityID.pinlevel()
    if normal = 1 then
      t_mp_iCode_kCategory = ref.entityID.pinlevel()
      if t_mp_iCode_kCategory = 0 then
        t_iNumberOfPairs = 0
      end if
      t_iNumberOfPairs = []
      t_kCategory = 1
      repeat while t_kCategory <= t_mp_iCode_kCategory
        t_kCategory = t_kCategory + 1
      end repeat
    else
      if normal = 4 then
        GetItem = ref.entityID.pinlevel()
      end if
    end if
    safe_add = safe_add + 1
  end repeat
  duplicate = hex_hmac_md5(#TradeClose, ref.entityID.pinlevel())
  t_rConnection = ref.entityID.pinlevel()
  t_iStatus = hex_hmac_md5()
  safe_add = 1
  repeat while safe_add <= t_rConnection
    pins = ref.entityID.pinlevel()
    t_bFromHK = ref.entityID.pinlevel()
    t_sSrcGrp = ref.entityID.pinlevel()
    if normal = 1 then
      t_mp_iCode_kCategory = ref.entityID.pinlevel()
      if t_mp_iCode_kCategory = 0 then
        t_iNumberOfPairs = 0
      end if
      t_iNumberOfPairs = []
      t_kCategory = 1
      repeat while t_kCategory <= t_mp_iCode_kCategory
        t_kCategory = t_kCategory + 1
      end repeat
    else
      if normal = 4 then
        GetItem = ref.entityID.pinlevel()
      end if
    end if
    safe_add = safe_add + 1
  end repeat
end
on connection objectp, ref
  removeWindow = "trade.dialog.oppositeGender_window"
  if GetItemDetails(removeWindow) <> 0 then
    addItem(removeWindow)
  end if
  t_rItem = ref.entityID.pinlevel()
  if t_rItem = 1 then
    objectp.magiword.t_rDetails()
  end if
  objectp.magiword.t_iUpdatedPinRef()
end
on GetIntFrom objectp, ref
  t_rAvatar = ref.entityID.pinlevel()
  _AvatarChat = ref.entityID.removeObject()
  message = ref.entityID.removeObject()
  mode = ref.entityID.pinlevel()
  say = ref.entityID.pinlevel()
  t_sMsg = ref.entityID.removeObject()
  t_chatMsg = t_sUpdatedPinOldGroup(t_sUpdatedPinNewGroup(objectp.t_iRef().t_sItemGroup(1), #t_rTargetMap, _AvatarChat))
  t_chatMsg.tObj(#t_iNewLevel, mode)
  t_chatMsg.tObj(#CatSwitch, message)
  t_chatMsg.tObj(#stage, #t_iRemovedPinRef)
  t_rCon = t_sRemovedPinGroup(objectp.t_iRef().t_sItemGroup(1), #t_rTargetMap, _AvatarChat)
  if not headers(t_rCon) then
    t_rCon = t_sUpdatedPinOldGroup(t_rCon)
  end if
  objectp.t_iRef().t_sItemGroup(1).t_sTrgGrp(#t_rTargetMap, t_rAvatar, _AvatarChat)
  objectp.t_iRef().t_sItemGroup(1).t_sTrgGrp(#t_rTargetMap, say, t_sMsg)
  TransformCannedMsgToString(objectp.t_iRef().t_sItemGroup(1), #t_rTargetMap, t_rAvatar, t_chatMsg, t_rCon, message)
end
on component objectp, ref
  pins = ref.entityID.pinlevel()
  m_bLevelReqMsgEnabled = ShowLevelRequiredScreen(ref)
  t_sID = t_iEntityID("room").t_iRef().t_ar_data()
  if not headers(t_sID) then
    t_rList = t_sID.t_rInput(pins, "avatar")
    if headers(t_rList) then
      getmemnum(objectp, "Trade Avatar not found:" & pins, #t_iItemCode)
    end if
    registerListener = hex_hmac_md5(#t_iRequiredLevel, m_bLevelReqMsgEnabled, #t_iAvatarLevel, #tConn, #unregisterListener, t_ar_CustomBtn(t_rList, "NAME"), #_AccessRoom, t_rList)
  end if
end
on _UpdateCreditBalance objectp, ref
  m_bLevelReqMsgEnabled = ref.entityID.removeObject()
  registerListener = hex_hmac_md5(#t_iRequiredLevel, m_bLevelReqMsgEnabled, #t_iAvatarLevel, #tConn, #unregisterListener, "VMK Administration")
end
on t_iCredits objectp, ref
  t_bReturn = ref.entityID
  registerCommands = t_bReturn.pinlevel()
  unregisterCommands = t_bReturn.pinlevel()
  a_bBool = t_bReturn.pinlevel()
  objectp.t_s_Title().bitAnd(registerCommands, unregisterCommands, a_bBool)
end
on owner objectp
  pURL = new("main.connection.id", "VMK")
  pGroupId = hex_hmac_md5()
  Activate(pURL, objectp.bytesSoFar(), pGroupId)
  objectp.pFile = 0
end
on GetStrFrom objectp
  pURL = new("main.connection.id", "VMK")
  pGroupId = hex_hmac_md5()
  ptryCount(pURL, objectp.bytesSoFar(), pGroupId)
  objectp.pFile = 1
end
on type objectp
  session(objectp.pFile)
end
on xtra objectp, netAbort
  pURL = new("main.connection.id", "VMK")
  pLoadTime = 1
  pGroupId = hex_hmac_md5()
  pGroupId.tObj(2014, #_WearPin)
  pGroupId.tObj(2532, #_RewardInfo)
  pGroupId.tObj(2520, #_TradeResponse)
  pGroupId.tObj(2536, #dialogWindowEvent)
  pGroupId.tObj(2535, #_TradeStatus)
  pGroupId.tObj(2523, #_TradeFinished)
  pGroupId.tObj(2524, #_PinsCombined)
  pGroupId.tObj(2525, #_TradeChat)
  pGroupId.tObj(2562, #component)
  pGroupId.tObj(2563, #_UpdateCreditBalance)
  pGroupId.tObj(2594, #EnableLevelReqMsg)
  pGroupId.tObj(2595, #GetLevelReqMsgEnabled)
  pGroupId.tObj(2596, #a_rMsg)
  pGroupId.tObj(2597, #connection)
  pGroupId.tObj(2740, #_TradeChatNotification)
  pGroupId.tObj(2537, #HandleLevelRequirementNotMetMessage)
  pGroupId.tObj(2538, #DisableLevelReqMsg)
  pGroupId.tObj(2539, #GetIntFrom)
  pGroupId.tObj(2533, #_SellConfirmRequest)
  pGroupId.tObj(2522, #_ClothSwitch)
  pGroupId.tObj(2908, #t_iCredits)
  pGroupId.tObj(2930, #_SellConfirmResponse)
  if netAbort then
    pLoadTime = tpreloadId(pLoadTime, ptryCount(pURL, objectp.bytesSoFar(), pGroupId))
    objectp.pFile = 1
  end if
  pLoadTime = tpreloadId(pLoadTime, Activate(pURL, objectp.bytesSoFar(), pGroupId))
  objectp.pFile = 0
  pGroupId = hex_hmac_md5()
  pGroupId.tObj("SellItemRequest", 522)
  pGroupId.tObj("WearPin", 523)
  pGroupId.tObj("UnwearPin", 530)
  pGroupId.tObj("SellItemConfirm", 525)
  pGroupId.tObj("CombinePin", 524)
  pGroupId.tObj("SellClothing", 529)
  pGroupId.tObj("CodeRedemption", 13)
  pGroupId.tObj("RequestBalance", 14)
  pGroupId.tObj("GetItemList", 532)
  pGroupId.tObj("TrdConfLevel", 586)
  pGroupId.tObj("TrdAddRemItem", 587)
  pGroupId.tObj("TrdSendRequest", 588)
  pGroupId.tObj("TrdResponse", 589)
  pGroupId.tObj("RequestItemDetails", 535)
  if netAbort then
    pLoadTime = tpreloadId(pLoadTime, tFile(pURL, objectp.bytesSoFar(), pGroupId))
  end if
  pLoadTime = tpreloadId(pLoadTime, pNetId(pURL, objectp.bytesSoFar(), pGroupId))
  session(pLoadTime)
end