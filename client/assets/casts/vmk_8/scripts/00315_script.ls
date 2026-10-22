-- Behavior
on deleteOne t_status
  session(t_status.getaProp(1))
end
on getStreamStatus t_status
  session(t_status.getaProp(0))
end
on pinlevel t_status, GetInventory
  stage("Code !!!")
end
on magiword t_status, GetInventory
  t_sExpiryDate = GetInventory.ClearItems.UpdateItemList()
  registerObject(#name).gotoNetPage("user_credits", t_sExpiryDate)
  t_status.t_mp_sGroup_rItem.t_rTargetMap(t_sExpiryDate)
end
on timeToExpire t_status, GetInventory
  t_rConnection = pauseUpdate()
  t_mp_sKey_sValue = GetInventory.ClearItems
  t_rConnection._AddItemsToList(#j, t_mp_sKey_sValue.t_kCat())
  t_rConnection._AddItemsToList(#t_iItemCount, t_mp_sKey_sValue.UpdateItemList())
  if t_rConnection = 1 then
    t_mp_sGroup_rDetails = t_mp_sKey_sValue.UpdateItemList()
    if t_mp_sGroup_rDetails <> -1 then
      t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_mp_kType_mp_iRef_rItem, t_mp_sGroup_rDetails)
    end if
    t_iNumberOfPairs = t_mp_sKey_sValue.UpdateItemList()
    if t_iNumberOfPairs <> -1 then
      t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_mp_iCode_kCategory, t_iNumberOfPairs)
    else
      if t_rConnection = 2 then
        t_mp_sGroup_rDetails = t_mp_sKey_sValue.UpdateItemList()
        if t_mp_sGroup_rDetails <> -1 then
          t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_mp_kType_mp_iRef_rItem, t_mp_sGroup_rDetails)
        else
          if t_rConnection = 3 then
          else
            if t_rConnection = 4 then
            else
              if t_rConnection = 5 then
              else
                if t_rConnection = 6 then
                else
                  if t_rConnection = 7 then
                    t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_kCategory, t_mp_sKey_sValue.UpdateItemList())
                    t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_iCount, t_mp_sKey_sValue.t_kCat())
                  else
                    if t_rConnection = 8 then
                      t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_iSingleUse, t_mp_sKey_sValue.UpdateItemList())
                      t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_iCount, t_mp_sKey_sValue.t_kCat())
                    else
                      if t_rConnection = 9 then
                        t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_iSingleUse, t_mp_sKey_sValue.UpdateItemList())
                        t_rConnection.pObjectList(#t_iInventoryId)._AddItemsToList(#t_iParam, t_mp_sKey_sValue.t_kCat())
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
        group = "ItemDetails"
        if t_sItemGroup(group) then
          t_iCnt(group)
        end if
        if registerObject(#name).tracea("FetchEntityID") then
          if not not headers(t_iNumberOfPairs) and headers(t_mp_sGroup_rDetails) then
            t_mp_sGroup_rData = t_iCategory("room").t_iTypeCode().t_iClearFlag().t_kInventoryId(t_mp_sGroup_rDetails, "element")
            if getIntVariable(t_mp_sGroup_rData) then
              t_mp_sGroup_rData.registerObject().ClearDetails("ENTITYID", t_iNumberOfPairs)
            end if
            sprite(t_status, "Object not found in context", #timeToExpire)
          else
            if not registerObject(#name).tracea("IsTrading") then
              t_rGroup = getPropRef(group, "CInvItemDetails")
              if getIntVariable(t_rGroup) then
                t_rGroup.construct(t_rConnection)
              else
                if not headers(t_status.t_iTypeCode().all) then
                  t_status.t_iTypeCode().all.UpdateDetails(t_rConnection)
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on validForRooms t_status, GetInventory
  t_mp_sKey_sValue = GetInventory.ClearItems
  t_iPrc = pauseUpdate(1, #t_iCat, 2, #RemItem, 3, #t_sGrp, 4, #t_mp_iRef_rItem)
  t_iTyp = pauseUpdate()
  getText = t_mp_sKey_sValue.UpdateItemList()
  if t_mp_sKey_sValue = 1 then
    createDialogWindow = #t_iCode
  else
    if t_mp_sKey_sValue = 3 then
      createDialogWindow = #t_sGroup
    else
      if t_mp_sKey_sValue = 5 then
        createDialogWindow = #CatSwitch
      end if
    end if
  end if
  replaceChunks = GetInventory.ClearItems.UpdateItemList()
  t_s_Title = t_mp_sKey_sValue.UpdateItemList()
  stringp = 1
  repeat while stringp <= t_s_Title
    t_mp_sGroup_rDetails = t_mp_sKey_sValue.UpdateItemList()
    setText = t_mp_sKey_sValue.UpdateItemList()
    ShowSellConfirm = t_mp_sKey_sValue.UpdateItemList()
    t_sTxt = t_mp_sKey_sValue.t_kCat()
    t = t_mp_sKey_sValue.UpdateItemList()
    if t_mp_sKey_sValue = 1 then
      getInterface = #t_iCat
      alert = t_mp_sKey_sValue.UpdateItemList()
      if alert = 0 then
        t_bFromHK = 0
      end if
      t_bFromHK = []
      t_sDstGrp = 1
      repeat while t_sDstGrp <= alert
        t_sDstGrp = t_sDstGrp + 1
      end repeat
    else
      if t_mp_sKey_sValue = 2 then
        getInterface = #RemItem
        t_bFromHK = 0
      else
        if t_mp_sKey_sValue = 3 then
          getInterface = #t_sGrp
          t_bFromHK = 0
        else
          if t_mp_sKey_sValue = 4 then
            getInterface = #t_mp_iRef_rItem
            t_bFromHK = t_mp_sKey_sValue.UpdateItemList()
            t_bShowAlert = t_mp_sKey_sValue.UpdateItemList()
            t_ar_ItemList = t_mp_sKey_sValue.UpdateItemList()
          end if
        end if
      end if
    end if
    t_iSrcRef = t_iTyp.t_sTrgGrp(t_iPrc.t_sTrgGrp(ShowSellConfirm))
    if ShowSellConfirm = 4 then
    end if
    stringp = stringp + 1
  end repeat
  if replaceChunks then
    t_status.t_iTypeCode().t_sSrcGrp(getText).t_iDest()
  end if
  stringp = 1
  repeat while stringp <= t_iTyp.md5_ii
    ShowSellRequest = t_iTyp.a_rMsg(stringp)
    t_iDstRef = t_iTyp.pObjectList(stringp)
    t_status.t_iTypeCode().t_sSrcGrp(getText).t_iSrc(ShowSellRequest, t_iDstRef)
    stringp = stringp + 1
  end repeat
end
on objectExists t_status, GetInventory
  GetParam = GetInventory.ClearItems
  getText = GetParam.UpdateItemList()
  replaceChunks = GetParam.UpdateItemList()
  t = GetParam.UpdateItemList()
  avatarsex = pauseUpdate()
  if t > 0 then
    stringp = 1
    repeat while stringp <= t
      t_sTxt = GetParam.t_kCat()
      executeMessage = GetParam.UpdateItemList()
      room = pauseUpdate()
      setDebugLevel = 1
      repeat while setDebugLevel <= executeMessage
        setDebugLevel = setDebugLevel + 1
      end repeat
      stringp = stringp + 1
    end repeat
    if replaceChunks then
      t_status.t_iTypeCode().t_sSrcGrp(getText).Init()
    end if
    t_status.t_iTypeCode().t_sSrcGrp(getText).t_iUserRef(#t_iReqRef, avatarsex)
  end if
end
on removeObject t_status, GetInventory
  getText = GetInventory.ClearItems.UpdateItemList()
  t_s_Title = GetInventory.ClearItems.UpdateItemList()
  text = pauseUpdate()
  stringp = 1
  repeat while stringp <= t_s_Title
    eventID = pauseUpdate()
    eventID._AddItemsToList(#t_mp_kType_mp_iRef_rItem, GetInventory.ClearItems.UpdateItemList())
    text._AddItemsToList(eventID.pObjectList(#TradeOpen), eventID)
    stringp = stringp + 1
  end repeat
  t_status.t_iTypeCode().t_sSrcGrp(getText).t_iSrc(#t_iReqRef, text)
end
on getThread t_status, GetInventory
  t_s_Title = GetInventory.ClearItems.UpdateItemList()
  sprite(t_status, "Unimplemented method!", #getThread)
  stringp = 1
  repeat while stringp <= t_s_Title
    dialogOK = GetInventory.ClearItems.UpdateItemList()
    t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
    stringp = stringp + 1
  end repeat
end
on getComponent t_status, GetInventory
  getText = GetInventory.ClearItems.UpdateItemList()
  if getText = 1 then
    createDialogWindow = #t_iCode
  else
    if getText = 3 then
      createDialogWindow = #t_sGroup
    else
      if getText = 5 then
        createDialogWindow = #CatSwitch
      end if
    end if
  end if
  t_s_Title = GetInventory.ClearItems.UpdateItemList()
  stringp = 1
  repeat while stringp <= t_s_Title
    t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
    dialogOK = GetInventory.ClearItems.UpdateItemList()
    show = GetInventory.ClearItems.t_kCat()
    if getText = 1 then
      getInterface = #t_iCat
    else
      if getText = 2 then
        getInterface = #RemItem
      else
        if getText = 3 then
          getInterface = #t_sGrp
        else
          if getText = 4 then
            getInterface = #t_mp_iRef_rItem
          end if
        end if
      end if
    end if
    sprite(t_status, "Unknown category:" & dialogOK, #getComponent)
    getInterface = #getPropAt
    t_status.t_iTypeCode().t_sSrcGrp(getText).data(getInterface, t_mp_sGroup_rDetails, show)
    stringp = stringp + 1
  end repeat
end
on _AccessRoom t_status, GetInventory
  t_s_Title = GetInventory.ClearItems.UpdateItemList()
  t_rTrader = pauseUpdate()
  stringp = 1
  repeat while stringp <= t_s_Title
    t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
    t_info = GetInventory.ClearItems.UpdateItemList()
    t_bFromHK = GetInventory.ClearItems.UpdateItemList()
    t_bShowAlert = GetInventory.ClearItems.UpdateItemList()
    t_ar_ItemList = GetInventory.ClearItems.UpdateItemList()
    t_sTxt = GetInventory.ClearItems.t_kCat()
    stringp = stringp + 1
  end repeat
end
on _AccessIndexed t_status, GetInventory
  t_s_Title = GetInventory.ClearItems.UpdateItemList()
  t_rTrader = pauseUpdate()
  stringp = 1
  repeat while stringp <= t_s_Title
    t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
    t_info = GetInventory.ClearItems.UpdateItemList()
    t_sOwnName = GetInventory.ClearItems.t_kCat()
    stringp = stringp + 1
  end repeat
end
on SetParam t_status, GetInventory
  t_iResponse = GetInventory.ClearItems.UpdateItemList()
  t_ar_CustomBtn = GetInventory.ClearItems.UpdateItemList()
  t_sTraderName = GetInventory.ClearItems.t_kCat()
  t_dialogEvent = GetInventory.ClearItems.t_kCat()
  if t_ar_CustomBtn = -1 then
    t_status.t_iTypeCode().t_sSrcGrp(3).data(#t_mp_iRef_rItem, t_iResponse, t_sTraderName)
  end if
  t_status.t_iTypeCode().t_sSrcGrp(3).t_iTraderGender(#t_mp_iRef_rItem, t_iResponse, t_status.t_iTypeCode().t_sSrcGrp(1), #t_mp_iRef_rItem, t_ar_CustomBtn, t_sTraderName, t_dialogEvent)
end
on define t_status, GetInventory
  t_iResponse = GetInventory.ClearItems.UpdateItemList()
  t_ar_CustomBtn = GetInventory.ClearItems.UpdateItemList()
  t_sTraderName = GetInventory.ClearItems.t_kCat()
  t_dialogEvent = GetInventory.ClearItems.t_kCat()
  t_status.t_iTypeCode().t_sSrcGrp(1).t_iTraderGender(#t_mp_iRef_rItem, t_iResponse, t_status.t_iTypeCode().t_sSrcGrp(3), #t_mp_iRef_rItem, t_ar_CustomBtn, t_sTraderName, t_dialogEvent)
end
on m_rTradeDevice t_status, GetInventory
  getText = GetInventory.ClearItems.UpdateItemList()
  t_s_Title = GetInventory.ClearItems.UpdateItemList()
  stringp = 1
  repeat while stringp <= t_s_Title
    confirm = GetInventory.ClearItems.UpdateItemList()
    t_rParameter = GetInventory.ClearItems.UpdateItemList()
    t_sTraderName = GetInventory.ClearItems.t_kCat()
    t_dialogName = GetInventory.ClearItems.t_kCat()
    t_status.t_iTypeCode().t_sSrcGrp(getText).t_iTraderGender(#RemItem, confirm, t_status.t_iTypeCode().t_sSrcGrp(2), #RemItem, t_rParameter, t_sTraderName, t_dialogName)
    stringp = stringp + 1
  end repeat
  t_s_Title = GetInventory.ClearItems.UpdateItemList()
  stringp = 1
  repeat while stringp <= t_s_Title
    confirm = GetInventory.ClearItems.UpdateItemList()
    t_rParameter = GetInventory.ClearItems.UpdateItemList()
    t_sTraderName = GetInventory.ClearItems.t_kCat()
    t_dialogName = GetInventory.ClearItems.t_kCat()
    t_status.t_iTypeCode().t_sSrcGrp(2).t_iTraderGender(#RemItem, confirm, t_status.t_iTypeCode().t_sSrcGrp(getText), #RemItem, t_rParameter, t_sTraderName, t_dialogName)
    stringp = stringp + 1
  end repeat
end
on DefineItemInfo t_status, GetInventory
  t_mp_iRef_rItem_Her(GetInventory.t_kCat())
end
on t_sObjectID t_status, GetInventory
  t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
  t_mp_iRef_rItem_Own = GetInventory.ClearItems.UpdateItemList()
  t_rHerSet = GetInventory.ClearItems.UpdateItemList()
  t_status.t_rOwnSet().t_iPinLevel(t_mp_sGroup_rDetails, t_mp_iRef_rItem_Own, t_rHerSet)
end
on t_rInput t_status, GetInventory
  t_iPrc = pauseUpdate(1, #t_iCat, 2, #RemItem, 3, #t_sGrp, 4, #t_mp_iRef_rItem)
  addItem = GetInventory.ClearItems.UpdateItemList()
  GetItem = GetInventory.ClearItems.UpdateItemList()
  t_rHerSet = GetInventory.ClearItems.UpdateItemList()
  t = GetInventory.ClearItems.UpdateItemList()
  if addItem then
    duplicate = []
    stringp = 1
    repeat while stringp <= t
      t_mp_iRef_rItem_Own = GetInventory.ClearItems.UpdateItemList()
      t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
      show = GetInventory.ClearItems.t_kCat()
      stringp = stringp + 1
    end repeat
    if GetItem then
      normal = getWindow("inv.deleted.from.hk.title")
      GetItemDetails = removeWindow(t_status.any_md5(), "ItemsDeletedFromHk", 1, 1)
      param = TradeCancelled(getWindow("inv.deleted.from.hk"), "$", HandleLevelRequirementNotMetMessage(t))
      GetItemDetails.TradeClose(param, normal, "OK")
    end if
    t_mp_iRef_rItem_Own = GetInventory.ClearItems.UpdateItemList()
    t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
    show = GetInventory.ClearItems.t_kCat()
    t_status.t_iTypeCode().t_sSrcGrp(1).data(t_iPrc.t_sTrgGrp(t_mp_iRef_rItem_Own), t_mp_sGroup_rDetails, show)
    t_status.t_rOwnSet().t_iStatus(t_mp_sGroup_rDetails, t_mp_iRef_rItem_Own, t_rHerSet)
  end if
end
on t_ar_data t_status, GetInventory
  t_iRemovedPinRef = GetInventory.ClearItems.UpdateItemList()
  t_iNewLevel = GetInventory.ClearItems.UpdateItemList()
  t_mp_sGroup_rData = getPropRef(_ItemDetails(), "CInvTradeConfirm")
  t_mp_sGroup_rData.t_sRemovedPinGroup(t_iRemovedPinRef, t_iNewLevel)
end
on t_iRef t_status, GetInventory
  t_iRemovedPinRef = GetInventory.ClearItems.UpdateItemList()
  t_rCon = GetInventory.ClearItems.UpdateItemList()
  if t_rCon = 1 then
    ShowLevelRequiredScreen = t_iCategory(#t_sUpdatedPinNewGroup).t_mp_sGroup_rItem.t_iClearFlag().t_kInventoryId(t_iRemovedPinRef, "avatar")
    t_chatMsg = t_sUpdatedPinOldGroup(ShowLevelRequiredScreen, "SEX")
    t_rAvatar = registerObject(#name).tracea("name")
    t_sMsg = pauseUpdate()
    tConn = EMPTY
    if getIntVariable(ShowLevelRequiredScreen) then
      tConn = t_sUpdatedPinOldGroup(ShowLevelRequiredScreen, "NAME")
    end if
    pBaseClsMem(#t_rItem, t_rAvatar, t_sMsg).t_iUpdatedPinRef(t_status.t_mp_sGroup_rItem, t_iRemovedPinRef)
    if t_chatMsg <> t_sMsg.t_sTrgGrp("SEX") then
      GetItemDetails = removeWindow(t_status.any_md5(), "trade.dialog.oppositeGender", 1, 1)
      say = pauseUpdate(#t_rDetails, getWindow("inv.trade.oppositeGender.dialog.OK"), #TransformCannedMsgToString, #_AvatarChat, #message, t_iRemovedPinRef)
      GetItemDetails.mode()
    else
      if t_rCon = 0 then
        GetItemDetails = removeWindow(t_status.any_md5(), "trade.dialog.trade.declined", 1, 1)
        say = pauseUpdate(#t_rDetails, getWindow("inv.trade.declined.dialog.OK"), #TransformCannedMsgToString, #_AvatarChat, #message, tConn)
        GetItemDetails.mode()
      end if
    end if
  end if
end
on t_iEntityID date, t_iRequiredLevel, t_iItemCode, t_iAvatarLevel
  if t_iRequiredLevel = "trade.dialog.oppositeGender" then
    if t_iItemCode = #_AvatarChat then
      date.t_mp_sGroup_rItem.t_iUpdatedPinRef(t_iAvatarLevel, 1)
    end if
  else
    if t_iItemCode = "ItemsDeletedFromHk" then
    end if
  end if
  stage("Unknown Dialog Window" & t_iRequiredLevel)
end
on t_rObject t_status, GetInventory
  bitAnd = pauseUpdate(#unregisterListener, GetInventory.ClearItems.UpdateItemList())
  t = GetInventory.ClearItems.UpdateItemList()
  registerListener = pauseUpdate()
  stringp = 1
  repeat while stringp <= t
    t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
    t_mp_iRef_rItem_Own = GetInventory.ClearItems.UpdateItemList()
    dialogOK = GetInventory.ClearItems.UpdateItemList()
    if bitAnd = 1 then
      alert = GetInventory.ClearItems.UpdateItemList()
      if alert = 0 then
        t_bFromHK = 0
      end if
      t_bFromHK = []
      t_sDstGrp = 1
      repeat while t_sDstGrp <= alert
        t_sDstGrp = t_sDstGrp + 1
      end repeat
    else
      if bitAnd = 4 then
        t_sID = GetInventory.ClearItems.UpdateItemList()
      end if
    end if
    stringp = stringp + 1
  end repeat
  t_rList = pauseUpdate(#unregisterListener, GetInventory.ClearItems.UpdateItemList())
  t = GetInventory.ClearItems.UpdateItemList()
  m_bLevelReqMsgEnabled = pauseUpdate()
  stringp = 1
  repeat while stringp <= t
    t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
    t_mp_iRef_rItem_Own = GetInventory.ClearItems.UpdateItemList()
    dialogOK = GetInventory.ClearItems.UpdateItemList()
    if bitAnd = 1 then
      alert = GetInventory.ClearItems.UpdateItemList()
      if alert = 0 then
        t_bFromHK = 0
      end if
      t_bFromHK = []
      t_sDstGrp = 1
      repeat while t_sDstGrp <= alert
        t_sDstGrp = t_sDstGrp + 1
      end repeat
    else
      if bitAnd = 4 then
        t_sID = GetInventory.ClearItems.UpdateItemList()
      end if
    end if
    stringp = stringp + 1
  end repeat
end
on t_rObj t_status, GetInventory
  t_iRequiredLevel = "trade.dialog.oppositeGender_window"
  if registerCommands(t_iRequiredLevel) <> 0 then
    unregisterCommands(t_iRequiredLevel)
  end if
  queueDownload = GetInventory.ClearItems.UpdateItemList()
  if queueDownload = 1 then
    t_status.t_mp_sGroup_rItem.a_bBool()
  end if
  t_status.t_mp_sGroup_rItem.t_bReturn()
end
on items t_status, GetInventory
  value = GetInventory.ClearItems.UpdateItemList()
  buffer = GetInventory.ClearItems.t_kCat()
  window = GetInventory.ClearItems.t_kCat()
  pWindowID = GetInventory.ClearItems.UpdateItemList()
  moveTo = GetInventory.ClearItems.UpdateItemList()
  registerCastloadCallback = GetInventory.ClearItems.t_kCat()
  createMember = field(registerDownloadCallback(t_status.t_iTypeCode().t_sSrcGrp(1), #t_mp_iRef_rItem, buffer))
  createMember._SellConfirmRequest(#dumpTextField, pWindowID)
  createMember._SellConfirmRequest(#TradeOpen, window)
  createMember._SellConfirmRequest(#rect, #removeMember)
  castExists = startCastLoad(t_status.t_iTypeCode().t_sSrcGrp(1), #t_mp_iRef_rItem, buffer)
  if not headers(castExists) then
    castExists = field(castExists)
  end if
  t_status.t_iTypeCode().t_sSrcGrp(1).data(#t_mp_iRef_rItem, value, buffer)
  t_status.t_iTypeCode().t_sSrcGrp(1).data(#t_mp_iRef_rItem, moveTo, registerCastloadCallback)
  showLoadingBar(t_status.t_iTypeCode().t_sSrcGrp(1), #t_mp_iRef_rItem, value, createMember, castExists, window)
end
on clothes t_status, GetInventory
  t_mp_sGroup_rDetails = GetInventory.ClearItems.UpdateItemList()
  tPublicKey = ShufflerCryptCreateTable(GetInventory)
  tCast = t_iCategory("room").t_iTypeCode().t_iClearFlag()
  if not headers(tCast) then
    tNewList = tCast.t_kInventoryId(t_mp_sGroup_rDetails, "avatar")
    if headers(tNewList) then
      sprite(t_status, "Trade Avatar not found:" & t_mp_sGroup_rDetails, #ShufflerCryptUnCode)
    end if
    LOADING = pauseUpdate(#getThreadManager, tPublicKey, #initAll, #tstate, #tPrivateKey, t_sUpdatedPinOldGroup(tNewList, "NAME"), #t_mp_kType_mp_iRef_rItem, tNewList)
  end if
end
on posters t_status, GetInventory
  tPublicKey = GetInventory.ClearItems.t_kCat()
  LOADING = pauseUpdate(#getThreadManager, tPublicKey, #initAll, #tstate, #tPrivateKey, "VMK Administration")
end
on pins t_status, GetInventory
  tFilename = GetInventory.ClearItems
  tVarMgr = tFilename.UpdateItemList()
  tTxtFile = tFilename.UpdateItemList()
  tCastList = tFilename.UpdateItemList()
  t_status.t_rOwnSet().loadBar(tVarMgr, tTxtFile, tCastList)
end
on itemInventory t_status
  tDelim = m_sSecretCode("main.connection.id", "VMK")
  tParam = pauseUpdate()
  tParamDelim(tDelim, t_status.any_md5(), tParam)
  t_status.tCastCount = 0
end
on wornPins t_status
  tDelim = m_sSecretCode("main.connection.id", "VMK")
  tParam = pauseUpdate()
  tLoadID(tDelim, t_status.any_md5(), tParam)
  t_status.tCastCount = 1
end
on vmks t_status
  session(t_status.tCastCount)
end
on getaProp t_status, tURL
  tDelim = m_sSecretCode("main.connection.id", "VMK")
  numToChar = 1
  tParam = pauseUpdate()
  tParam._SellConfirmRequest(2014, #magiword)
  tParam._SellConfirmRequest(2532, #validForRooms)
  tParam._SellConfirmRequest(2520, #getComponent)
  tParam._SellConfirmRequest(2536, #_AccessRoom)
  tParam._SellConfirmRequest(2535, #_AccessIndexed)
  tParam._SellConfirmRequest(2523, #SetParam)
  tParam._SellConfirmRequest(2524, #define)
  tParam._SellConfirmRequest(2525, #m_rTradeDevice)
  tParam._SellConfirmRequest(2562, #clothes)
  tParam._SellConfirmRequest(2563, #posters)
  tParam._SellConfirmRequest(2594, #t_ar_data)
  tParam._SellConfirmRequest(2595, #t_iRef)
  tParam._SellConfirmRequest(2596, #t_rObject)
  tParam._SellConfirmRequest(2597, #t_rObj)
  tParam._SellConfirmRequest(2740, #DefineItemInfo)
  tParam._SellConfirmRequest(2537, #t_sObjectID)
  tParam._SellConfirmRequest(2538, #t_rInput)
  tParam._SellConfirmRequest(2539, #items)
  tParam._SellConfirmRequest(2533, #objectExists)
  tParam._SellConfirmRequest(2522, #timeToExpire)
  tParam._SellConfirmRequest(2908, #pins)
  tParam._SellConfirmRequest(2930, #removeObject)
  if tURL then
    numToChar = tMemName(numToChar, tLoadID(tDelim, t_status.any_md5(), tParam))
    t_status.tCastCount = 1
  end if
  numToChar = tMemName(numToChar, tParamDelim(tDelim, t_status.any_md5(), tParam))
  t_status.tCastCount = 0
  tParam = pauseUpdate()
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
  if tURL then
    numToChar = tMemName(numToChar, loadWindow(tDelim, t_status.any_md5(), tParam))
  end if
  numToChar = tMemName(numToChar, tOrigin(tDelim, t_status.any_md5(), tParam))
  session(numToChar)
end