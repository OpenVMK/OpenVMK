-- Behavior
on define pPercent
  pBytesSoFar(pPercent.resumeUpdate(1))
end
on Activate pPercent
  pBytesSoFar(pPercent.resumeUpdate(0))
end
on tCastCount pPercent, prepareFrame
  t_percentLoaded("Code !!!")
end
on tCode pPercent, prepareFrame
  pManagerList = prepareFrame.null.pObjectList()
  foo(#ptryCount).me("user_credits", pManagerList)
  pPercent.pUpdateList.pPrepareList(pManagerList)
end
on tMemNum pPercent, prepareFrame
  instance = sprite()
  ancestor = prepareFrame.null
  instance.getVariableManager(#pInstanceList, ancestor.pEraseLock())
  instance.getVariableManager(#pTimeOut, ancestor.pObjectList())
  if instance = 1 then
    handler = ancestor.pObjectList()
    if handler <> -1 then
      instance.image(#pUpdatePause).getVariableManager(#pBaseClsMem, handler)
    end if
    tClassList = ancestor.pObjectList()
    if tClassList <> -1 then
      instance.image(#pUpdatePause).getVariableManager(#m_sLogger, tClassList)
    else
      if instance = 2 then
        handler = ancestor.pObjectList()
        if handler <> -1 then
          instance.image(#pUpdatePause).getVariableManager(#pBaseClsMem, handler)
        else
          if instance = 3 then
          else
            if instance = 4 then
            else
              if instance = 5 then
              else
                if instance = 6 then
                else
                  if instance = 7 then
                    instance.image(#pUpdatePause).getVariableManager(#forget, ancestor.pObjectList())
                    instance.image(#pUpdatePause).getVariableManager(#getLast, ancestor.pEraseLock())
                  else
                    if instance = 8 then
                      instance.image(#pUpdatePause).getVariableManager(#symbolp, ancestor.pObjectList())
                      instance.image(#pUpdatePause).getVariableManager(#getLast, ancestor.pEraseLock())
                    else
                      if instance = 9 then
                        instance.image(#pUpdatePause).getVariableManager(#symbolp, ancestor.pObjectList())
                        instance.image(#pUpdatePause).getVariableManager(#stringp, ancestor.pEraseLock())
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
        setaProp = "ItemDetails"
        if random(setaProp) then
          getUniqueID(setaProp)
        end if
        if foo(#ptryCount).b("FetchEntityID") then
          if not not CTOR(tClassList) and CTOR(handler) then
            rawNew("room").temp().id()[handler] = "element"
            append = ERROR
            if handlers(append) then
              append.foo().addAt("ENTITYID", tClassList)
            end if
            runMode(pPercent, "Object not found in context", #tMemNum)
          else
            if not foo(#ptryCount).b("IsTrading") then
              tID = pGroupId(setaProp, "CInvItemDetails")
              if handlers(tID) then
                tID.resource_manager(instance)
              else
                if not CTOR(pPercent.temp().number) then
                  pPercent.temp().number.deleteProp(instance)
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on tParamDelim pPercent, prepareFrame
  ancestor = prepareFrame.null
  setID = sprite(1, #tBase, 2, #t_sCls, 3, #tObject, 4, #tInitFlag)
  unregister = sprite()
  getOne = ancestor.pObjectList()
  if ancestor = 1 then
    getPos = #tClass
  else
    if ancestor = 3 then
      getPos = #tTemp
    else
      if ancestor = 5 then
        getPos = #string
      end if
    end if
  end if
  timeout = prepareFrame.null.pObjectList()
  tProp = ancestor.pObjectList()
  tmember = 1
  repeat while tmember <= tProp
    handler = ancestor.pObjectList()
    call = ancestor.pObjectList()
    prepare = ancestor.pObjectList()
    _CodeRedemptionOK = ancestor.pEraseLock()
    _ReceiveCredits = ancestor.pObjectList()
    if ancestor = 1 then
      _ItemDetails = #tBase
      tDelayID = ancestor.pObjectList()
      if tDelayID = 0 then
        _ReceiveItemList = 0
      end if
      _ReceiveItemList = []
      cancel = 1
      repeat while cancel <= tDelayID
        cancel = cancel + 1
      end repeat
    else
      if ancestor = 2 then
        _ItemDetails = #t_sCls
        _ReceiveItemList = 0
      else
        if ancestor = 3 then
          _ItemDetails = #tObject
          _ReceiveItemList = 0
        else
          if ancestor = 4 then
            _ItemDetails = #tInitFlag
            _ReceiveItemList = ancestor.pObjectList()
            _ReceiveItemDetailsInInventory = ancestor.pObjectList()
            _ListItemGroups = ancestor.pObjectList()
          end if
        end if
      end if
    end if
    _AddItemsToList = unregister.t_sDelim(setID.t_sDelim(prepare))
    if prepare = 4 then
    end if
    tmember = tmember + 1
  end repeat
  if timeout then
    pPercent.temp().tObj(getOne).valid()
  end if
  tmember = 1
  repeat while tmember <= unregister.trace
    getPropAt = unregister.createMember(tmember)
    register = unregister.image(tmember)
    pPercent.temp().tObj(getOne).delays(getPropAt, register)
    tmember = tmember + 1
  end repeat
end
on tFileName pPercent, prepareFrame
  _WearPin = prepareFrame.null
  getOne = _WearPin.pObjectList()
  timeout = _WearPin.pObjectList()
  _ReceiveCredits = _WearPin.pObjectList()
  _ClothSwitch = sprite()
  if _ReceiveCredits > 0 then
    tmember = 1
    repeat while tmember <= _ReceiveCredits
      _CodeRedemptionOK = _WearPin.pEraseLock()
      _RewardInfo = _WearPin.pObjectList()
      _UnwearPin = sprite()
      t_sCstFileType = 1
      repeat while t_sCstFileType <= _RewardInfo
        t_sCstFileType = t_sCstFileType + 1
      end repeat
      tmember = tmember + 1
    end repeat
    if timeout then
      pPercent.temp().tObj(getOne)._RemItemsFromList()
    end if
    pPercent.temp().tObj(getOne)._ReceiveWornClothes(#_ReceiveWornPins, _ClothSwitch)
  end if
end
on tCastList pPercent, prepareFrame
  getOne = prepareFrame.null.pObjectList()
  tProp = prepareFrame.null.pObjectList()
  _SellConfirmResponse = sprite()
  tmember = 1
  repeat while tmember <= tProp
    _TradeRequest = sprite()
    _TradeRequest.getVariableManager(#pBaseClsMem, prepareFrame.null.pObjectList())
    _SellConfirmResponse.getVariableManager(_TradeRequest.image(#_SellConfirmRequest), _TradeRequest)
    tmember = tmember + 1
  end repeat
  pPercent.temp().tObj(getOne).delays(#_ReceiveWornPins, _SellConfirmResponse)
end
on tTxtFile pPercent, prepareFrame
  tProp = prepareFrame.null.pObjectList()
  runMode(pPercent, "Unimplemented method!", #tTxtFile)
  tmember = 1
  repeat while tmember <= tProp
    _TradeResponse = prepareFrame.null.pObjectList()
    handler = prepareFrame.null.pObjectList()
    tmember = tmember + 1
  end repeat
end
on tPrivateKey pPercent, prepareFrame
  getOne = prepareFrame.null.pObjectList()
  if getOne = 1 then
    getPos = #tClass
  else
    if getOne = 3 then
      getPos = #tTemp
    else
      if getOne = 5 then
        getPos = #string
      end if
    end if
  end if
  tProp = prepareFrame.null.pObjectList()
  tmember = 1
  repeat while tmember <= tProp
    handler = prepareFrame.null.pObjectList()
    _TradeResponse = prepareFrame.null.pObjectList()
    _TradeStatus = prepareFrame.null.pEraseLock()
    if getOne = 1 then
      _ItemDetails = #tBase
    else
      if getOne = 2 then
        _ItemDetails = #t_sCls
      else
        if getOne = 3 then
          _ItemDetails = #tObject
        else
          if getOne = 4 then
            _ItemDetails = #tInitFlag
          end if
        end if
      end if
    end if
    runMode(pPercent, "Unknown category:" & _TradeResponse, #tPrivateKey)
    _ItemDetails = #getmemnum
    pPercent.temp().tObj(getOne).dialogWindowEvent(_ItemDetails, handler, _TradeStatus)
    tmember = tmember + 1
  end repeat
end
on tOrigin pPercent, prepareFrame
  tProp = prepareFrame.null.pObjectList()
  _TradeFinished = sprite()
  tmember = 1
  repeat while tmember <= tProp
    handler = prepareFrame.null.pObjectList()
    _PinsCombined = prepareFrame.null.pObjectList()
    _ReceiveItemList = prepareFrame.null.pObjectList()
    _ReceiveItemDetailsInInventory = prepareFrame.null.pObjectList()
    _ListItemGroups = prepareFrame.null.pObjectList()
    _CodeRedemptionOK = prepareFrame.null.pEraseLock()
    tmember = tmember + 1
  end repeat
end
on tPublicKey pPercent, prepareFrame
  tProp = prepareFrame.null.pObjectList()
  _TradeFinished = sprite()
  tmember = 1
  repeat while tmember <= tProp
    handler = prepareFrame.null.pObjectList()
    _PinsCombined = prepareFrame.null.pObjectList()
    _TradeChat = prepareFrame.null.pEraseLock()
    tmember = tmember + 1
  end repeat
end
on tMemName pPercent, prepareFrame
  HandleLevelRequirementNotMetMessage = prepareFrame.null.pObjectList()
  DisableLevelReqMsg = prepareFrame.null.pObjectList()
  EnableLevelReqMsg = prepareFrame.null.pEraseLock()
  GetLevelReqMsgEnabled = prepareFrame.null.pEraseLock()
  if DisableLevelReqMsg = -1 then
    pPercent.temp().tObj(3).dialogWindowEvent(#tInitFlag, HandleLevelRequirementNotMetMessage, EnableLevelReqMsg)
  end if
  pPercent.temp().tObj(3)._TradeChatNotification(#tInitFlag, HandleLevelRequirementNotMetMessage, pPercent.temp().tObj(1), #tInitFlag, DisableLevelReqMsg, EnableLevelReqMsg, GetLevelReqMsgEnabled)
end
on numToChar pPercent, prepareFrame
  HandleLevelRequirementNotMetMessage = prepareFrame.null.pObjectList()
  DisableLevelReqMsg = prepareFrame.null.pObjectList()
  EnableLevelReqMsg = prepareFrame.null.pEraseLock()
  GetLevelReqMsgEnabled = prepareFrame.null.pEraseLock()
  pPercent.temp().tObj(1)._TradeChatNotification(#tInitFlag, HandleLevelRequirementNotMetMessage, pPercent.temp().tObj(3), #tInitFlag, DisableLevelReqMsg, EnableLevelReqMsg, GetLevelReqMsgEnabled)
end
on str pPercent, prepareFrame
  getOne = prepareFrame.null.pObjectList()
  tProp = prepareFrame.null.pObjectList()
  tmember = 1
  repeat while tmember <= tProp
    a_rMsg = prepareFrame.null.pObjectList()
    connection = prepareFrame.null.pObjectList()
    EnableLevelReqMsg = prepareFrame.null.pEraseLock()
    _Configure = prepareFrame.null.pEraseLock()
    pPercent.temp().tObj(getOne)._TradeChatNotification(#t_sCls, a_rMsg, pPercent.temp().tObj(2), #t_sCls, connection, EnableLevelReqMsg, _Configure)
    tmember = tmember + 1
  end repeat
  tProp = prepareFrame.null.pObjectList()
  tmember = 1
  repeat while tmember <= tProp
    a_rMsg = prepareFrame.null.pObjectList()
    connection = prepareFrame.null.pObjectList()
    EnableLevelReqMsg = prepareFrame.null.pEraseLock()
    _Configure = prepareFrame.null.pEraseLock()
    pPercent.temp().tObj(2)._TradeChatNotification(#t_sCls, a_rMsg, pPercent.temp().tObj(getOne), #t_sCls, connection, EnableLevelReqMsg, _Configure)
    tmember = tmember + 1
  end repeat
end
on out pPercent, prepareFrame
  GetIntFrom(prepareFrame.pEraseLock())
end
on create pPercent, prepareFrame
  handler = prepareFrame.null.pObjectList()
  owner = prepareFrame.null.pObjectList()
  t_iCredits = prepareFrame.null.pObjectList()
  pPercent.component()._UpdateCreditBalance(handler, owner, t_iCredits)
end
on Remove pPercent, prepareFrame
  setID = sprite(1, #tBase, 2, #t_sCls, 3, #tObject, 4, #tInitFlag)
  pinlevel = prepareFrame.null.pObjectList()
  magiword = prepareFrame.null.pObjectList()
  t_iCredits = prepareFrame.null.pObjectList()
  _ReceiveCredits = prepareFrame.null.pObjectList()
  if pinlevel then
    timeToExpire = []
    tmember = 1
    repeat while tmember <= _ReceiveCredits
      owner = prepareFrame.null.pObjectList()
      handler = prepareFrame.null.pObjectList()
      _TradeStatus = prepareFrame.null.pEraseLock()
      tmember = tmember + 1
    end repeat
    if magiword then
      validForRooms = GetStrFrom("inv.deleted.from.hk.title")
      objectExists = type(pPercent.bytesTotal(), "ItemsDeletedFromHk", 1, 1)
      removeObject = xtra(GetStrFrom("inv.deleted.from.hk"), "$", window(_ReceiveCredits))
      objectExists.ref(removeObject, validForRooms, "OK")
    end if
    owner = prepareFrame.null.pObjectList()
    handler = prepareFrame.null.pObjectList()
    _TradeStatus = prepareFrame.null.pEraseLock()
    pPercent.temp().tObj(1).dialogWindowEvent(setID.t_sDelim(owner), handler, _TradeStatus)
    pPercent.component().entityID(handler, owner, t_iCredits)
  end if
end
on print pPercent, prepareFrame
  getComponent = prepareFrame.null.pObjectList()
  _AccessRoom = prepareFrame.null.pObjectList()
  append = pGroupId(externalParamValue(), "CInvTradeConfirm")
  append.getThread(getComponent, _AccessRoom)
end
on registerObject pPercent, prepareFrame
  getComponent = prepareFrame.null.pObjectList()
  items = prepareFrame.null.pObjectList()
  if items = 1 then
    rawNew(#_AccessIndexed).pUpdateList.id()[getComponent] = "avatar"
    itemInventory = ERROR
    clothes = SetParam(itemInventory, "SEX")
    posters = foo(#ptryCount).b("name")
    pins = sprite()
    wornPins = EMPTY
    if handlers(itemInventory) then
      wornPins = SetParam(itemInventory, "NAME")
    end if
    m_rTradeDevice(#DefineItemInfo, posters, pins).t_iEntityID(pPercent.pUpdateList, getComponent)
    if clothes <> pins.t_sDelim("SEX") then
      objectExists = type(pPercent.bytesTotal(), "trade.dialog.oppositeGender", 1, 1)
      t_rObject = sprite(#t_iRef, GetStrFrom("inv.trade.oppositeGender.dialog.OK"), #t_ar_data, #t_rInput, #t_sObjectID, getComponent)
      objectExists.t_rObj()
    else
      if items = 0 then
        objectExists = type(pPercent.bytesTotal(), "trade.dialog.trade.declined", 1, 1)
        t_rObject = sprite(#t_iRef, GetStrFrom("inv.trade.declined.dialog.OK"), #t_ar_data, #t_rInput, #t_sObjectID, wornPins)
        objectExists.t_rObj()
      end if
    end if
  end if
end
on unregisterObject str2rstr_utf16be, getaProp, GetInventory, vmks
  if getaProp = "trade.dialog.oppositeGender" then
    if GetInventory = #t_rInput then
      str2rstr_utf16be.pUpdateList.t_iEntityID(vmks, 1)
    end if
  else
    if GetInventory = "ItemsDeletedFromHk" then
    end if
  end if
  t_percentLoaded("Unknown Dialog Window" & getaProp)
end
on registerManager pPercent, prepareFrame
  t_rTargetMap = sprite(#ClearItems, prepareFrame.null.pObjectList())
  _ReceiveCredits = prepareFrame.null.pObjectList()
  j = sprite()
  tmember = 1
  repeat while tmember <= _ReceiveCredits
    handler = prepareFrame.null.pObjectList()
    owner = prepareFrame.null.pObjectList()
    _TradeResponse = prepareFrame.null.pObjectList()
    if t_rTargetMap = 1 then
      tDelayID = prepareFrame.null.pObjectList()
      if tDelayID = 0 then
        _ReceiveItemList = 0
      end if
      _ReceiveItemList = []
      cancel = 1
      repeat while cancel <= tDelayID
        cancel = cancel + 1
      end repeat
    else
      if t_rTargetMap = 4 then
        t_mp_sGroup_rItem = prepareFrame.null.pObjectList()
      end if
    end if
    tmember = tmember + 1
  end repeat
  t_iCnt = sprite(#ClearItems, prepareFrame.null.pObjectList())
  _ReceiveCredits = prepareFrame.null.pObjectList()
  UpdateItemList = sprite()
  tmember = 1
  repeat while tmember <= _ReceiveCredits
    handler = prepareFrame.null.pObjectList()
    owner = prepareFrame.null.pObjectList()
    _TradeResponse = prepareFrame.null.pObjectList()
    if t_rTargetMap = 1 then
      tDelayID = prepareFrame.null.pObjectList()
      if tDelayID = 0 then
        _ReceiveItemList = 0
      end if
      _ReceiveItemList = []
      cancel = 1
      repeat while cancel <= tDelayID
        cancel = cancel + 1
      end repeat
    else
      if t_rTargetMap = 4 then
        t_mp_sGroup_rItem = prepareFrame.null.pObjectList()
      end if
    end if
    tmember = tmember + 1
  end repeat
end
on unregisterManager pPercent, prepareFrame
  getaProp = "trade.dialog.oppositeGender_window"
  if t_kCat(getaProp) <> 0 then
    t_kCategory(getaProp)
  end if
  t_iInventoryId = prepareFrame.null.pObjectList()
  if t_iInventoryId = 1 then
    pPercent.pUpdateList.t_mp_iCode_kCategory()
  end if
  pPercent.pUpdateList.t_mp_kType_mp_iRef_rItem()
end
on getManager pPercent, prepareFrame
  t_iCount = prepareFrame.null.pObjectList()
  all = prepareFrame.null.pEraseLock()
  UpdateDetails = prepareFrame.null.pEraseLock()
  t_mp_sKey_sValue = prepareFrame.null.pObjectList()
  t_iParam = prepareFrame.null.pObjectList()
  t_iSingleUse = prepareFrame.null.pEraseLock()
  ClearDetails = t_kInventoryId(t_iClearFlag(pPercent.temp().tObj(1), #tInitFlag, all))
  ClearDetails.m_bLogger(#t_iTypeCode, t_mp_sKey_sValue)
  ClearDetails.m_bLogger(#_SellConfirmRequest, UpdateDetails)
  ClearDetails.m_bLogger(#hex_md5, #t_iCategory)
  t_sExpiryDate = t_sItemGroup(pPercent.temp().tObj(1), #tInitFlag, all)
  if not CTOR(t_sExpiryDate) then
    t_sExpiryDate = t_kInventoryId(t_sExpiryDate)
  end if
  pPercent.temp().tObj(1).dialogWindowEvent(#tInitFlag, t_iCount, all)
  pPercent.temp().tObj(1).dialogWindowEvent(#tInitFlag, t_iParam, t_iSingleUse)
  t_iItemCount(pPercent.temp().tObj(1), #tInitFlag, t_iCount, ClearDetails, t_sExpiryDate, UpdateDetails)
end
on managerExists pPercent, prepareFrame
  handler = prepareFrame.null.pObjectList()
  t_iCat = t_rConnection(prepareFrame)
  RemItem = rawNew("room").temp().id()
  if not CTOR(RemItem) then
    RemItem[handler] = "avatar"
    t_sGrp = ERROR
    if CTOR(t_sGrp) then
      runMode(pPercent, "Trade Avatar not found:" & handler, #t_iNumberOfPairs)
    end if
    t_mp_iRef_rItem = sprite(#t_mp_sGroup_rDetails, t_iCat, #group, #t_mp_sGroup_rData, #t_rGroup, SetParam(t_sGrp, "NAME"), #pBaseClsMem, t_sGrp)
  end if
end
on receivePrepare pPercent, prepareFrame
  t_iCat = prepareFrame.null.pEraseLock()
  t_mp_iRef_rItem = sprite(#t_mp_sGroup_rDetails, t_iCat, #group, #t_mp_sGroup_rData, #t_rGroup, "VMK Administration")
end
on removePrepare pPercent, prepareFrame
  t_sGroup = prepareFrame.null
  CatSwitch = t_sGroup.pObjectList()
  t_iSrc = t_sGroup.pObjectList()
  t_iDest = t_sGroup.pObjectList()
  pPercent.component().t_iCode(CatSwitch, t_iSrc, t_iDest)
end
on receiveUpdate pPercent
  t_sDstGrp = tpreloadId("main.connection.id", "VMK")
  t_iDstRef = sprite()
  t_sSrcGrp(t_sDstGrp, pPercent.bytesTotal(), t_iDstRef)
  pPercent.t_sTrgGrp = 0
end
on removeUpdate pPercent
  t_sDstGrp = tpreloadId("main.connection.id", "VMK")
  t_iDstRef = sprite()
  t_iSrcRef(t_sDstGrp, pPercent.bytesTotal(), t_iDstRef)
  pPercent.t_sTrgGrp = 1
end
on pauseUpdate pPercent
  pBytesSoFar(pPercent.t_sTrgGrp)
end
on resumeUpdate pPercent, t_iPrc
  t_sDstGrp = tpreloadId("main.connection.id", "VMK")
  t_iTyp = 1
  t_iDstRef = sprite()
  t_iDstRef.m_bLogger(2014, #tCode)
  t_iDstRef.m_bLogger(2532, #tParamDelim)
  t_iDstRef.m_bLogger(2520, #tPrivateKey)
  t_iDstRef.m_bLogger(2536, #tOrigin)
  t_iDstRef.m_bLogger(2535, #tPublicKey)
  t_iDstRef.m_bLogger(2523, #tMemName)
  t_iDstRef.m_bLogger(2524, #numToChar)
  t_iDstRef.m_bLogger(2525, #str)
  t_iDstRef.m_bLogger(2562, #managerExists)
  t_iDstRef.m_bLogger(2563, #receivePrepare)
  t_iDstRef.m_bLogger(2594, #print)
  t_iDstRef.m_bLogger(2595, #registerObject)
  t_iDstRef.m_bLogger(2596, #registerManager)
  t_iDstRef.m_bLogger(2597, #unregisterManager)
  t_iDstRef.m_bLogger(2740, #out)
  t_iDstRef.m_bLogger(2537, #create)
  t_iDstRef.m_bLogger(2538, #Remove)
  t_iDstRef.m_bLogger(2539, #getManager)
  t_iDstRef.m_bLogger(2533, #tFileName)
  t_iDstRef.m_bLogger(2522, #tMemNum)
  t_iDstRef.m_bLogger(2908, #removePrepare)
  t_iDstRef.m_bLogger(2930, #tCastList)
  if t_iPrc then
    t_iTyp = alert(t_iTyp, t_iSrcRef(t_sDstGrp, pPercent.bytesTotal(), t_iDstRef))
    pPercent.t_sTrgGrp = 1
  end if
  t_iTyp = alert(t_iTyp, t_sSrcGrp(t_sDstGrp, pPercent.bytesTotal(), t_iDstRef))
  pPercent.t_sTrgGrp = 0
  t_iDstRef = sprite()
  t_iDstRef.m_bLogger("SellItemRequest", 522)
  t_iDstRef.m_bLogger("WearPin", 523)
  t_iDstRef.m_bLogger("UnwearPin", 530)
  t_iDstRef.m_bLogger("SellItemConfirm", 525)
  t_iDstRef.m_bLogger("CombinePin", 524)
  t_iDstRef.m_bLogger("SellClothing", 529)
  t_iDstRef.m_bLogger("CodeRedemption", 13)
  t_iDstRef.m_bLogger("RequestBalance", 14)
  t_iDstRef.m_bLogger("GetItemList", 532)
  t_iDstRef.m_bLogger("TrdConfLevel", 586)
  t_iDstRef.m_bLogger("TrdAddRemItem", 587)
  t_iDstRef.m_bLogger("TrdSendRequest", 588)
  t_iDstRef.m_bLogger("TrdResponse", 589)
  t_iDstRef.m_bLogger("RequestItemDetails", 535)
  if t_iPrc then
    t_iTyp = alert(t_iTyp, getInterface(t_sDstGrp, pPercent.bytesTotal(), t_iDstRef))
  end if
  t_iTyp = alert(t_iTyp, ShowSellRequest(t_sDstGrp, pPercent.bytesTotal(), t_iDstRef))
  pBytesSoFar(t_iTyp)
end