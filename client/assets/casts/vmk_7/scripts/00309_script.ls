-- Behavior
on moveToFront m_sSecretCode2
  sprite(m_sSecretCode2.ClearItems(1))
end
on actorList m_sSecretCode2
  sprite(m_sSecretCode2.ClearItems(0))
end
on timeToExpire m_sSecretCode2, UpdateItemList
  getVariable("Code !!!")
end
on validForRooms m_sSecretCode2, UpdateItemList
  t_kCat = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  void(#netDone).fileName("user_credits", t_kCat)
  m_sSecretCode2.t_sExpiryDate.j(t_kCat)
end
on objectExists m_sSecretCode2, UpdateItemList
  t_mp_sGroup_rData = externalParamValue()
  group = UpdateItemList.t_mp_sGroup_rItem
  t_mp_sGroup_rData._AddItemsToList(#t_iItemCount, group.t_iInventoryId())
  t_mp_sGroup_rData._AddItemsToList(#t_mp_kType_mp_iRef_rItem, group.t_rTargetMap())
  if t_mp_sGroup_rData = 1 then
    t_rGroup = group.t_rTargetMap()
    if t_rGroup <> -1 then
      t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_kCategory, t_rGroup)
    end if
    t_iCat = group.t_rTargetMap()
    if t_iCat <> -1 then
      t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_iCount, t_iCat)
    else
      if t_mp_sGroup_rData = 2 then
        t_rGroup = group.t_rTargetMap()
        if t_rGroup <> -1 then
          t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_kCategory, t_rGroup)
        else
          if t_mp_sGroup_rData = 3 then
          else
            if t_mp_sGroup_rData = 4 then
            else
              if t_mp_sGroup_rData = 5 then
              else
                if t_mp_sGroup_rData = 6 then
                else
                  if t_mp_sGroup_rData = 7 then
                    t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_iSingleUse, group.t_rTargetMap())
                    t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_iParam, group.t_iInventoryId())
                  else
                    if t_mp_sGroup_rData = 8 then
                      t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_sItemGroup, group.t_rTargetMap())
                      t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_iParam, group.t_iInventoryId())
                    else
                      if t_mp_sGroup_rData = 9 then
                        t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_sItemGroup, group.t_rTargetMap())
                        t_mp_sGroup_rData.pauseUpdate(#t_mp_iCode_kCategory)._AddItemsToList(#t_iCnt, group.t_iInventoryId())
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
        t_mp_sKey_sValue = "ItemDetails"
        if t_iCategory(t_mp_sKey_sValue) then
          t_iTypeCode(t_mp_sKey_sValue)
        end if
        if void(#netDone).enterFrame("FetchEntityID") then
          if not not width(t_iCat) and width(t_rGroup) then
            t_sGrp = t_iClearFlag("room").t_kInventoryId().ClearDetails().all(t_rGroup, "element")
            if locZ(t_sGrp) then
              t_sGrp.void().UpdateDetails("ENTITYID", t_iCat)
            end if
            pEraseLock(m_sSecretCode2, "Object not found in context", #objectExists)
          else
            if not void(#netDone).enterFrame("IsTrading") then
              RemItem = getStreamStatus(t_mp_sKey_sValue, "CInvItemDetails")
              if locZ(RemItem) then
                RemItem.t_iNumberOfPairs(t_mp_sGroup_rData)
              else
                if not width(m_sSecretCode2.t_kInventoryId().t_mp_sGroup_rDetails) then
                  m_sSecretCode2.t_kInventoryId().t_mp_sGroup_rDetails.t_rConnection(t_mp_sGroup_rData)
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on removeObject m_sSecretCode2, UpdateItemList
  group = UpdateItemList.t_mp_sGroup_rItem
  setText = externalParamValue(1, #t_mp_iRef_rItem, 2, #t_iCode, 3, #t_sGroup, 4, #CatSwitch)
  replaceChunks = externalParamValue()
  createDialogWindow = group.t_rTargetMap()
  if group = 1 then
    t_iUserRef = #t_sTrgGrp
  else
    if group = 3 then
      t_iUserRef = #t_sSrcGrp
    else
      if group = 5 then
        t_iUserRef = #t_iDest
      end if
    end if
  end if
  t_iReqRef = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_sTxt = group.t_rTargetMap()
  rawNew = 1
  repeat while rawNew <= t_sTxt
    t_rGroup = group.t_rTargetMap()
    Init = group.t_rTargetMap()
    t_s_Title = group.t_rTargetMap()
    t_bShowAlert = group.t_iInventoryId()
    getText = group.t_rTargetMap()
    if group = 1 then
      t_iTyp = #t_mp_iRef_rItem
      t_ar_ItemList = group.t_rTargetMap()
      if t_ar_ItemList = 0 then
        t_bFromHK = 0
      end if
      t_bFromHK = []
      t_iPrc = 1
      repeat while t_iPrc <= t_ar_ItemList
        t_iPrc = t_iPrc + 1
      end repeat
    else
      if group = 2 then
        t_iTyp = #t_iCode
        t_bFromHK = 0
      else
        if group = 3 then
          t_iTyp = #t_sGroup
          t_bFromHK = 0
        else
          if group = 4 then
            t_iTyp = #CatSwitch
            t_bFromHK = group.t_rTargetMap()
            t = group.t_rTargetMap()
            ShowSellRequest = group.t_rTargetMap()
          end if
        end if
      end if
    end if
    getInterface = replaceChunks.t_iSrc(setText.t_iSrc(t_s_Title))
    if t_s_Title = 4 then
    end if
    rawNew = rawNew + 1
  end repeat
  if t_iReqRef then
    m_sSecretCode2.t_kInventoryId().t_iDstRef(createDialogWindow).t_iSrcRef()
  end if
  rawNew = 1
  repeat while rawNew <= replaceChunks.binl2rstr
    ShowSellConfirm = replaceChunks.a_rMsg(rawNew)
    alert = replaceChunks.pauseUpdate(rawNew)
    m_sSecretCode2.t_kInventoryId().t_iDstRef(createDialogWindow).t_sDstGrp(ShowSellConfirm, alert)
    rawNew = rawNew + 1
  end repeat
end
on getThread m_sSecretCode2, UpdateItemList
  text = UpdateItemList.t_mp_sGroup_rItem
  createDialogWindow = text.t_rTargetMap()
  t_iReqRef = text.t_rTargetMap()
  getText = text.t_rTargetMap()
  TradeOpen = externalParamValue()
  if getText > 0 then
    rawNew = 1
    repeat while rawNew <= getText
      t_bShowAlert = text.t_iInventoryId()
      avatarsex = text.t_rTargetMap()
      eventID = externalParamValue()
      reserveSprite = 1
      repeat while reserveSprite <= avatarsex
        reserveSprite = reserveSprite + 1
      end repeat
      rawNew = rawNew + 1
    end repeat
    if t_iReqRef then
      m_sSecretCode2.t_kInventoryId().t_iDstRef(createDialogWindow).room()
    end if
    m_sSecretCode2.t_kInventoryId().t_iDstRef(createDialogWindow).executeMessage(#GetParam, TradeOpen)
  end if
end
on getComponent m_sSecretCode2, UpdateItemList
  createDialogWindow = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_sTxt = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  data = externalParamValue()
  rawNew = 1
  repeat while rawNew <= t_sTxt
    show = externalParamValue()
    show._AddItemsToList(#t_kCategory, UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap())
    data._AddItemsToList(show.pauseUpdate(#dialogOK), show)
    rawNew = rawNew + 1
  end repeat
  m_sSecretCode2.t_kInventoryId().t_iDstRef(createDialogWindow).t_sDstGrp(#GetParam, data)
end
on _AccessRoom m_sSecretCode2, UpdateItemList
  t_sTxt = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  pEraseLock(m_sSecretCode2, "Unimplemented method!", #_AccessRoom)
  rawNew = 1
  repeat while rawNew <= t_sTxt
    t_rTrader = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    rawNew = rawNew + 1
  end repeat
end
on _AccessIndexed m_sSecretCode2, UpdateItemList
  createDialogWindow = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  if createDialogWindow = 1 then
    t_iUserRef = #t_sTrgGrp
  else
    if createDialogWindow = 3 then
      t_iUserRef = #t_sSrcGrp
    else
      if createDialogWindow = 5 then
        t_iUserRef = #t_iDest
      end if
    end if
  end if
  t_sTxt = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  rawNew = 1
  repeat while rawNew <= t_sTxt
    t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_rTrader = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_sOwnName = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
    if createDialogWindow = 1 then
      t_iTyp = #t_mp_iRef_rItem
    else
      if createDialogWindow = 2 then
        t_iTyp = #t_iCode
      else
        if createDialogWindow = 3 then
          t_iTyp = #t_sGroup
        else
          if createDialogWindow = 4 then
            t_iTyp = #CatSwitch
          end if
        end if
      end if
    end if
    pEraseLock(m_sSecretCode2, "Unknown category:" & t_rTrader, #_AccessIndexed)
    t_iTyp = #delays
    m_sSecretCode2.t_kInventoryId().t_iDstRef(createDialogWindow).t_info(t_iTyp, t_rGroup, t_sOwnName)
    rawNew = rawNew + 1
  end repeat
end
on SetParam m_sSecretCode2, UpdateItemList
  t_sTxt = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_iTraderGender = externalParamValue()
  rawNew = 1
  repeat while rawNew <= t_sTxt
    t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_iResponse = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_bFromHK = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    ShowSellRequest = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_bShowAlert = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
    rawNew = rawNew + 1
  end repeat
end
on define m_sSecretCode2, UpdateItemList
  t_sTxt = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_iTraderGender = externalParamValue()
  rawNew = 1
  repeat while rawNew <= t_sTxt
    t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_iResponse = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_ar_CustomBtn = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
    rawNew = rawNew + 1
  end repeat
end
on m_rTradeDevice m_sSecretCode2, UpdateItemList
  confirm = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_rParameter = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_dialogName = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
  t_dialogEvent = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
  if t_rParameter = -1 then
    m_sSecretCode2.t_kInventoryId().t_iDstRef(3).t_info(#CatSwitch, confirm, t_dialogName)
  end if
  m_sSecretCode2.t_kInventoryId().t_iDstRef(3).t_sTraderName(#CatSwitch, confirm, m_sSecretCode2.t_kInventoryId().t_iDstRef(1), #CatSwitch, t_rParameter, t_dialogName, t_dialogEvent)
end
on DefineItemInfo m_sSecretCode2, UpdateItemList
  confirm = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_rParameter = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_dialogName = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
  t_dialogEvent = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
  m_sSecretCode2.t_kInventoryId().t_iDstRef(1).t_sTraderName(#CatSwitch, confirm, m_sSecretCode2.t_kInventoryId().t_iDstRef(3), #CatSwitch, t_rParameter, t_dialogName, t_dialogEvent)
end
on t_sObjectID m_sSecretCode2, UpdateItemList
  createDialogWindow = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_sTxt = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  rawNew = 1
  repeat while rawNew <= t_sTxt
    t_rOwnSet = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_mp_iRef_rItem_Her = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_dialogName = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
    t_iPinLevel = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
    m_sSecretCode2.t_kInventoryId().t_iDstRef(createDialogWindow).t_sTraderName(#t_iCode, t_rOwnSet, m_sSecretCode2.t_kInventoryId().t_iDstRef(2), #t_iCode, t_mp_iRef_rItem_Her, t_dialogName, t_iPinLevel)
    rawNew = rawNew + 1
  end repeat
  t_sTxt = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  rawNew = 1
  repeat while rawNew <= t_sTxt
    t_rOwnSet = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_mp_iRef_rItem_Her = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_dialogName = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
    t_iPinLevel = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
    m_sSecretCode2.t_kInventoryId().t_iDstRef(2).t_sTraderName(#t_iCode, t_rOwnSet, m_sSecretCode2.t_kInventoryId().t_iDstRef(createDialogWindow), #t_iCode, t_mp_iRef_rItem_Her, t_dialogName, t_iPinLevel)
    rawNew = rawNew + 1
  end repeat
end
on t_rInput m_sSecretCode2, UpdateItemList
  t_rHerSet(UpdateItemList.t_iInventoryId())
end
on t_ar_data m_sSecretCode2, UpdateItemList
  t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  TradeCancelled = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  removeWindow = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  m_sSecretCode2.t_mp_iRef_rItem_Own().getWindow(t_rGroup, TradeCancelled, removeWindow)
end
on t_iRef m_sSecretCode2, UpdateItemList
  setText = externalParamValue(1, #t_mp_iRef_rItem, 2, #t_iCode, 3, #t_sGroup, 4, #CatSwitch)
  addItem = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_sRemovedPinGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  removeWindow = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  getText = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  if addItem then
    t_iRemovedPinRef = []
    rawNew = 1
    repeat while rawNew <= getText
      TradeCancelled = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
      t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
      t_sOwnName = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
      rawNew = rawNew + 1
    end repeat
    if t_sRemovedPinGroup then
      t_iNewLevel = TradeClose("inv.deleted.from.hk.title")
      GetItemDetails = t_iStatus(m_sSecretCode2.t_status(), "ItemsDeletedFromHk", 1, 1)
      normal = duplicate(TradeClose("inv.deleted.from.hk"), "$", HandleLevelRequirementNotMetMessage(getText))
      GetItemDetails.GetItem(normal, t_iNewLevel, "OK")
    end if
    TradeCancelled = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_sOwnName = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
    m_sSecretCode2.t_kInventoryId().t_iDstRef(1).t_info(setText.t_iSrc(TradeCancelled), t_rGroup, t_sOwnName)
    m_sSecretCode2.t_mp_iRef_rItem_Own().param(t_rGroup, TradeCancelled, removeWindow)
  end if
end
on t_iEntityID m_sSecretCode2, UpdateItemList
  t_rItem = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_sUpdatedPinOldGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_sGrp = getStreamStatus(_ItemDetails(), "CInvTradeConfirm")
  t_sGrp.t_sUpdatedPinNewGroup(t_rItem, t_sUpdatedPinOldGroup)
end
on t_rObject m_sSecretCode2, UpdateItemList
  t_rItem = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  t_iAvatarLevel = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  if t_iAvatarLevel = 1 then
    t_rAvatar = t_iClearFlag(#t_iUpdatedPinRef).t_sExpiryDate.ClearDetails().all(t_rItem, "avatar")
    tConn = t_rDetails(t_rAvatar, "SEX")
    ShowLevelRequiredScreen = void(#netDone).enterFrame("name")
    t_sMsg = externalParamValue()
    t_iItemCode = EMPTY
    if locZ(t_rAvatar) then
      t_iItemCode = t_rDetails(t_rAvatar, "NAME")
    end if
    pInstanceList(#TransformCannedMsgToString, ShowLevelRequiredScreen, t_sMsg)._AvatarChat(m_sSecretCode2.t_sExpiryDate, t_rItem)
    if tConn <> t_sMsg.t_iSrc("SEX") then
      GetItemDetails = t_iStatus(m_sSecretCode2.t_status(), "trade.dialog.oppositeGender", 1, 1)
      t_iRequiredLevel = externalParamValue(#message, TradeClose("inv.trade.oppositeGender.dialog.OK"), #mode, #say, #t_rCon, t_rItem)
      GetItemDetails.t_chatMsg()
    else
      if t_iAvatarLevel = 0 then
        GetItemDetails = t_iStatus(m_sSecretCode2.t_status(), "trade.dialog.trade.declined", 1, 1)
        t_iRequiredLevel = externalParamValue(#message, TradeClose("inv.trade.declined.dialog.OK"), #mode, #say, #t_rCon, t_iItemCode)
        GetItemDetails.t_chatMsg()
      end if
    end if
  end if
end
on t_rObj puppetTempo, m_bLevelReqMsgEnabled, unregisterListener, t_rList
  if m_bLevelReqMsgEnabled = "trade.dialog.oppositeGender" then
    if unregisterListener = #say then
      puppetTempo.t_sExpiryDate._AvatarChat(t_rList, 1)
    end if
  else
    if unregisterListener = "ItemsDeletedFromHk" then
    end if
  end if
  getVariable("Unknown Dialog Window" & m_bLevelReqMsgEnabled)
end
on items m_sSecretCode2, UpdateItemList
  bitAnd = externalParamValue(#t_sID, UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap())
  getText = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  a_bBool = externalParamValue()
  rawNew = 1
  repeat while rawNew <= getText
    t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    TradeCancelled = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_rTrader = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    if bitAnd = 1 then
      t_ar_ItemList = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
      if t_ar_ItemList = 0 then
        t_bFromHK = 0
      end if
      t_bFromHK = []
      t_iPrc = 1
      repeat while t_iPrc <= t_ar_ItemList
        t_iPrc = t_iPrc + 1
      end repeat
    else
      if bitAnd = 4 then
        registerCommands = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
      end if
    end if
    rawNew = rawNew + 1
  end repeat
  unregisterCommands = externalParamValue(#t_sID, UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap())
  getText = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  registerListener = externalParamValue()
  rawNew = 1
  repeat while rawNew <= getText
    t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    TradeCancelled = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    t_rTrader = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
    if bitAnd = 1 then
      t_ar_ItemList = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
      if t_ar_ItemList = 0 then
        t_bFromHK = 0
      end if
      t_bFromHK = []
      t_iPrc = 1
      repeat while t_iPrc <= t_ar_ItemList
        t_iPrc = t_iPrc + 1
      end repeat
    else
      if bitAnd = 4 then
        registerCommands = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
      end if
    end if
    rawNew = rawNew + 1
  end repeat
end
on clothes m_sSecretCode2, UpdateItemList
  m_bLevelReqMsgEnabled = "trade.dialog.oppositeGender_window"
  if receivePrepare(m_bLevelReqMsgEnabled) <> 0 then
    t_bReturn(m_bLevelReqMsgEnabled)
  end if
  registerDownloadCallback = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  if registerDownloadCallback = 1 then
    m_sSecretCode2.t_sExpiryDate.queueDownload()
  end if
  m_sSecretCode2.t_sExpiryDate.field()
end
on posters m_sSecretCode2, UpdateItemList
  ShufflerCryptCreateTable = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  value = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
  castExists = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
  registerCastloadCallback = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  moveTo = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  pWindowID = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
  createMember = dumpTextField(removeMember(m_sSecretCode2.t_kInventoryId().t_iDstRef(1), #CatSwitch, value))
  createMember._SellConfirmRequest(#startCastLoad, registerCastloadCallback)
  createMember._SellConfirmRequest(#dialogOK, castExists)
  createMember._SellConfirmRequest(#tmember, #showLoadingBar)
  ShufflerCryptUnCode = buffer(m_sSecretCode2.t_kInventoryId().t_iDstRef(1), #CatSwitch, value)
  if not width(ShufflerCryptUnCode) then
    ShufflerCryptUnCode = dumpTextField(ShufflerCryptUnCode)
  end if
  m_sSecretCode2.t_kInventoryId().t_iDstRef(1).t_info(#CatSwitch, ShufflerCryptCreateTable, value)
  m_sSecretCode2.t_kInventoryId().t_iDstRef(1).t_info(#CatSwitch, moveTo, pWindowID)
  window(m_sSecretCode2.t_kInventoryId().t_iDstRef(1), #CatSwitch, ShufflerCryptCreateTable, createMember, ShufflerCryptUnCode, castExists)
end
on pins m_sSecretCode2, UpdateItemList
  t_rGroup = UpdateItemList.t_mp_sGroup_rItem.t_rTargetMap()
  loadBar = getThreadManager(UpdateItemList)
  tCast = t_iClearFlag("room").t_kInventoryId().ClearDetails()
  if not width(tCast) then
    LOADING = tCast.all(t_rGroup, "avatar")
    if width(LOADING) then
      pEraseLock(m_sSecretCode2, "Trade Avatar not found:" & t_rGroup, #initAll)
    end if
    tNewList = externalParamValue(#tstate, loadBar, #tPrivateKey, #tPublicKey, #alertHook, t_rDetails(LOADING, "NAME"), #t_kCategory, LOADING)
  end if
end
on itemInventory m_sSecretCode2, UpdateItemList
  loadBar = UpdateItemList.t_mp_sGroup_rItem.t_iInventoryId()
  tNewList = externalParamValue(#tstate, loadBar, #tPrivateKey, #tPublicKey, #alertHook, "VMK Administration")
end
on wornPins m_sSecretCode2, UpdateItemList
  tTxtFile = UpdateItemList.t_mp_sGroup_rItem
  tParamDelim = tTxtFile.t_rTargetMap()
  tFilename = tTxtFile.t_rTargetMap()
  tCastList = tTxtFile.t_rTargetMap()
  m_sSecretCode2.t_mp_iRef_rItem_Own().tVarMgr(tParamDelim, tFilename, tCastList)
end
on vmks m_sSecretCode2
  tLoadID = getPropRef("main.connection.id", "VMK")
  tParam = externalParamValue()
  tCastCount(tLoadID, m_sSecretCode2.t_status(), tParam)
  m_sSecretCode2.tDelim = 0
end
on getaProp m_sSecretCode2
  tLoadID = getPropRef("main.connection.id", "VMK")
  tParam = externalParamValue()
  tMemName(tLoadID, m_sSecretCode2.t_status(), tParam)
  m_sSecretCode2.tDelim = 1
end
on GetInventory m_sSecretCode2
  sprite(m_sSecretCode2.tDelim)
end
on ClearItems m_sSecretCode2, numToChar
  tLoadID = getPropRef("main.connection.id", "VMK")
  out = 1
  tParam = externalParamValue()
  tParam._SellConfirmRequest(2014, #validForRooms)
  tParam._SellConfirmRequest(2532, #removeObject)
  tParam._SellConfirmRequest(2520, #_AccessIndexed)
  tParam._SellConfirmRequest(2536, #SetParam)
  tParam._SellConfirmRequest(2535, #define)
  tParam._SellConfirmRequest(2523, #m_rTradeDevice)
  tParam._SellConfirmRequest(2524, #DefineItemInfo)
  tParam._SellConfirmRequest(2525, #t_sObjectID)
  tParam._SellConfirmRequest(2562, #pins)
  tParam._SellConfirmRequest(2563, #itemInventory)
  tParam._SellConfirmRequest(2594, #t_iEntityID)
  tParam._SellConfirmRequest(2595, #t_rObject)
  tParam._SellConfirmRequest(2596, #items)
  tParam._SellConfirmRequest(2597, #clothes)
  tParam._SellConfirmRequest(2740, #t_rInput)
  tParam._SellConfirmRequest(2537, #t_ar_data)
  tParam._SellConfirmRequest(2538, #t_iRef)
  tParam._SellConfirmRequest(2539, #posters)
  tParam._SellConfirmRequest(2533, #getThread)
  tParam._SellConfirmRequest(2522, #objectExists)
  tParam._SellConfirmRequest(2908, #wornPins)
  tParam._SellConfirmRequest(2930, #getComponent)
  if numToChar then
    out = loadWindow(out, tMemName(tLoadID, m_sSecretCode2.t_status(), tParam))
    m_sSecretCode2.tDelim = 1
  end if
  out = loadWindow(out, tCastCount(tLoadID, m_sSecretCode2.t_status(), tParam))
  m_sSecretCode2.tDelim = 0
  tParam = externalParamValue()
  tParam._SellConfirmRequest("SellItemRequest", 522)
  tParam._SellConfirmRequest("WearPin", 523)
  tParam._SellConfirmRequest("UnwearPin", 530)
  tParam._SellConfirmRequest("SellItemConfirm", 525)
  tParam._SellConfirmRequest("CombinePin", 524)
  tParam._SellConfirmRequest("SellClothing", 529)
  tParam._SellConfirmRequest("CodeRedemption", 13)
  tParam._SellConfirmRequest("RequestBalance", 14)
  tParam._SellConfirmRequest("GetItemList", 532)
  tParam._SellConfirmRequest("TrdConfLevel", 586)
  tParam._SellConfirmRequest("TrdAddRemItem", 587)
  tParam._SellConfirmRequest("TrdSendRequest", 588)
  tParam._SellConfirmRequest("TrdResponse", 589)
  tParam._SellConfirmRequest("RequestItemDetails", 535)
  if numToChar then
    out = loadWindow(out, tOrigin(tLoadID, m_sSecretCode2.t_status(), tParam))
  end if
  out = loadWindow(out, tURL(tLoadID, m_sSecretCode2.t_status(), tParam))
  sprite(out)
end