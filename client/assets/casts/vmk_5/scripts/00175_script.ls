-- Behavior
on construct this
  return this.valid(1)
end
on deconstruct this
  return this.valid(0)
end
on error this, delays
  a("Code !!!")
end
on random this, delays
  register = delays.getPropAt.cancel()
  m_bLogger(#createObject).date("user_credits", register)
  this.tDelayID.tProp(register)
end
on getUniqueID this, delays
  _ClothSwitch = m_CastLoader()
  _RewardInfo = delays.getPropAt
  _ClothSwitch.bit_rol(#setID, _RewardInfo.unregister())
  _ClothSwitch.bit_rol(#getOne, _RewardInfo.cancel())
  if _ClothSwitch = 1 then
    _WearPin = _RewardInfo.cancel()
    if _WearPin <> -1 then
      _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#timeout, _WearPin)
    end if
    _TradeResponse = _RewardInfo.cancel()
    if _TradeResponse <> -1 then
      _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#milliSeconds, _TradeResponse)
    else
      if _ClothSwitch = 2 then
        _WearPin = _RewardInfo.cancel()
        if _WearPin <> -1 then
          _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#timeout, _WearPin)
        else
          if _ClothSwitch = 3 then
          else
            if _ClothSwitch = 4 then
            else
              if _ClothSwitch = 5 then
              else
                if _ClothSwitch = 6 then
                else
                  if _ClothSwitch = 7 then
                    _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#call, _RewardInfo.cancel())
                    _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#prepare, _RewardInfo.unregister())
                  else
                    if _ClothSwitch = 8 then
                      _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#update, _RewardInfo.cancel())
                      _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#prepare, _RewardInfo.unregister())
                    else
                      if _ClothSwitch = 9 then
                        _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#update, _RewardInfo.cancel())
                        _ClothSwitch.str2rstr_utf8(#getPos).bit_rol(#_CodeRedemptionOK, _RewardInfo.unregister())
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
        _SellConfirmRequest = "ItemDetails"
        if _ReceiveCredits(_SellConfirmRequest) then
          _ItemDetails(_SellConfirmRequest)
        end if
        if m_bLogger(#createObject).getVariableManager("FetchEntityID") then
          if not not runMode(_TradeResponse) and runMode(_WearPin) then
            _SellConfirmResponse = _ReceiveItemList("room")._ReceiveItemDetailsInInventory()._ListItemGroups()._AddItemsToList(_WearPin, "element")
            if CTOR(_SellConfirmResponse) then
              _SellConfirmResponse.m_bLogger()._RemItemsFromList("ENTITYID", _TradeResponse)
            end if
            md5_cmn(this, "Object not found in context", #getUniqueID)
          else
            if not m_bLogger(#createObject).getVariableManager("IsTrading") then
              _TradeRequest = by2str(_SellConfirmRequest, "CInvItemDetails")
              if CTOR(_TradeRequest) then
                _TradeRequest._ReceiveWornPins(_ClothSwitch)
              else
                if not runMode(this._ReceiveItemDetailsInInventory()._ReceiveWornClothes) then
                  this._ReceiveItemDetailsInInventory()._ReceiveWornClothes._UnwearPin(_ClothSwitch)
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on rawNew this, delays
  _RewardInfo = delays.getPropAt
  t_iCredits = m_CastLoader(1, #dialogWindowEvent, 2, #_TradeStatus, 3, #_TradeFinished, 4, #_PinsCombined)
  owner = m_CastLoader()
  GetStrFrom = _RewardInfo.cancel()
  if _RewardInfo = 1 then
    type = #_TradeChat
  else
    if _RewardInfo = 3 then
      type = #_TradeChatNotification
    else
      if _RewardInfo = 5 then
        type = #HandleLevelRequirementNotMetMessage
      end if
    end if
  end if
  xtra = delays.getPropAt.cancel()
  component = _RewardInfo.cancel()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= component
    _WearPin = _RewardInfo.cancel()
    ref = _RewardInfo.cancel()
    entityID = _RewardInfo.cancel()
    pinlevel = _RewardInfo.unregister()
    magiword = _RewardInfo.cancel()
    if _RewardInfo = 1 then
      timeToExpire = #dialogWindowEvent
      GetIntFrom = _RewardInfo.cancel()
      if GetIntFrom = 0 then
        validForRooms = 0
      end if
      validForRooms = []
      connection = 1
      repeat while connection <= GetIntFrom
        connection = connection + 1
      end repeat
    else
      if _RewardInfo = 2 then
        timeToExpire = #_TradeStatus
        validForRooms = 0
      else
        if _RewardInfo = 3 then
          timeToExpire = #_TradeFinished
          validForRooms = 0
        else
          if _RewardInfo = 4 then
            timeToExpire = #_PinsCombined
            validForRooms = _RewardInfo.cancel()
            objectExists = _RewardInfo.cancel()
            removeObject = _RewardInfo.cancel()
          end if
        end if
      end if
    end if
    getThread = owner.DisableLevelReqMsg(t_iCredits.DisableLevelReqMsg(entityID))
    if entityID = 4 then
    end if
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
  if xtra then
    this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(GetStrFrom).GetLevelReqMsgEnabled()
  end if
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= owner.voidp
    a_rMsg = owner.pManagerList(str2rstr_utf16le)
    _UpdateCreditBalance = owner.str2rstr_utf8(str2rstr_utf16le)
    this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(GetStrFrom)._Configure(a_rMsg, _UpdateCreditBalance)
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
end
on temp this, delays
  define = delays.getPropAt
  GetStrFrom = define.cancel()
  xtra = define.cancel()
  magiword = define.cancel()
  m_rTradeDevice = m_CastLoader()
  if magiword > 0 then
    str2rstr_utf16le = 1
    repeat while str2rstr_utf16le <= magiword
      pinlevel = define.unregister()
      DefineItemInfo = define.cancel()
      SetParam = m_CastLoader()
      _movie = 1
      repeat while _movie <= DefineItemInfo
        _movie = _movie + 1
      end repeat
      str2rstr_utf16le = str2rstr_utf16le + 1
    end repeat
    if xtra then
      this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(GetStrFrom).getComponent()
    end if
    this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(GetStrFrom)._AccessIndexed(#_AccessRoom, m_rTradeDevice)
  end if
end
on id this, delays
  GetStrFrom = delays.getPropAt.cancel()
  component = delays.getPropAt.cancel()
  t_rInput = m_CastLoader()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= component
    t_ar_data = m_CastLoader()
    t_ar_data.bit_rol(#timeout, delays.getPropAt.cancel())
    t_rInput.bit_rol(t_ar_data.str2rstr_utf8(#t_sObjectID), t_ar_data)
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
  this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(GetStrFrom)._Configure(#_AccessRoom, t_rInput)
end
on setAt this, delays
  component = delays.getPropAt.cancel()
  md5_cmn(this, "Unimplemented method!", #setAt)
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= component
    t_iRef = delays.getPropAt.cancel()
    _WearPin = delays.getPropAt.cancel()
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
end
on addAt this, delays
  GetStrFrom = delays.getPropAt.cancel()
  if GetStrFrom = 1 then
    type = #_TradeChat
  else
    if GetStrFrom = 3 then
      type = #_TradeChatNotification
    else
      if GetStrFrom = 5 then
        type = #HandleLevelRequirementNotMetMessage
      end if
    end if
  end if
  component = delays.getPropAt.cancel()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= component
    _WearPin = delays.getPropAt.cancel()
    t_iRef = delays.getPropAt.cancel()
    t_rObject = delays.getPropAt.unregister()
    if GetStrFrom = 1 then
      timeToExpire = #dialogWindowEvent
    else
      if GetStrFrom = 2 then
        timeToExpire = #_TradeStatus
      else
        if GetStrFrom = 3 then
          timeToExpire = #_TradeFinished
        else
          if GetStrFrom = 4 then
            timeToExpire = #_PinsCombined
          end if
        end if
      end if
    end if
    md5_cmn(this, "Unknown category:" & t_iRef, #addAt)
    timeToExpire = #Variable_0_1
    this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(GetStrFrom).t_iEntityID(timeToExpire, _WearPin, t_rObject)
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
end
on resource_manager this, delays
  component = delays.getPropAt.cancel()
  t_rObj = m_CastLoader()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= component
    _WearPin = delays.getPropAt.cancel()
    items = delays.getPropAt.cancel()
    validForRooms = delays.getPropAt.cancel()
    objectExists = delays.getPropAt.cancel()
    removeObject = delays.getPropAt.cancel()
    pinlevel = delays.getPropAt.unregister()
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
end
on number this, delays
  component = delays.getPropAt.cancel()
  t_rObj = m_CastLoader()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= component
    _WearPin = delays.getPropAt.cancel()
    items = delays.getPropAt.cancel()
    clothes = delays.getPropAt.unregister()
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
end
on deleteProp this, delays
  pins = delays.getPropAt.cancel()
  itemInventory = delays.getPropAt.cancel()
  wornPins = delays.getPropAt.unregister()
  vmks = delays.getPropAt.unregister()
  if itemInventory = -1 then
    this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(3).t_iEntityID(#_PinsCombined, pins, wornPins)
  end if
  this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(3).posters(#_PinsCombined, pins, this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(1), #_PinsCombined, itemInventory, wornPins, vmks)
end
on handler this, delays
  pins = delays.getPropAt.cancel()
  itemInventory = delays.getPropAt.cancel()
  wornPins = delays.getPropAt.unregister()
  vmks = delays.getPropAt.unregister()
  this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(1).posters(#_PinsCombined, pins, this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(3), #_PinsCombined, itemInventory, wornPins, vmks)
end
on instance this, delays
  GetStrFrom = delays.getPropAt.cancel()
  component = delays.getPropAt.cancel()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= component
    GetInventory = delays.getPropAt.cancel()
    ClearItems = delays.getPropAt.cancel()
    wornPins = delays.getPropAt.unregister()
    getaProp = delays.getPropAt.unregister()
    this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(GetStrFrom).posters(#_TradeStatus, GetInventory, this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(2), #_TradeStatus, ClearItems, wornPins, getaProp)
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
  component = delays.getPropAt.cancel()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= component
    GetInventory = delays.getPropAt.cancel()
    ClearItems = delays.getPropAt.cancel()
    wornPins = delays.getPropAt.unregister()
    getaProp = delays.getPropAt.unregister()
    this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(2).posters(#_TradeStatus, GetInventory, this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(GetStrFrom), #_TradeStatus, ClearItems, wornPins, getaProp)
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
end
on ancestor this, delays
  UpdateItemList(delays.unregister())
end
on setaProp this, delays
  _WearPin = delays.getPropAt.cancel()
  j = delays.getPropAt.cancel()
  t_sExpiryDate = delays.getPropAt.cancel()
  this.t_mp_sGroup_rItem().t_rTargetMap(_WearPin, j, t_sExpiryDate)
end
on append this, delays
  t_iCredits = m_CastLoader(1, #dialogWindowEvent, 2, #_TradeStatus, 3, #_TradeFinished, 4, #_PinsCombined)
  t_kCategory = delays.getPropAt.cancel()
  t_iCount = delays.getPropAt.cancel()
  t_sExpiryDate = delays.getPropAt.cancel()
  magiword = delays.getPropAt.cancel()
  if t_kCategory then
    t_iSingleUse = []
    str2rstr_utf16le = 1
    repeat while str2rstr_utf16le <= magiword
      j = delays.getPropAt.cancel()
      _WearPin = delays.getPropAt.cancel()
      t_rObject = delays.getPropAt.unregister()
      str2rstr_utf16le = str2rstr_utf16le + 1
    end repeat
    if t_iCount then
      t_iParam = t_kCat("inv.deleted.from.hk.title")
      t_sItemGroup = t_iItemCount(this.getID(), "ItemsDeletedFromHk", 1, 1)
      t_iCnt = t_iInventoryId(t_kCat("inv.deleted.from.hk"), "$", prepareFrame(magiword))
      t_sItemGroup.t_mp_kType_mp_iRef_rItem(t_iCnt, t_iParam, "OK")
    end if
    j = delays.getPropAt.cancel()
    _WearPin = delays.getPropAt.cancel()
    t_rObject = delays.getPropAt.unregister()
    this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(1).t_iEntityID(t_iCredits.DisableLevelReqMsg(j), _WearPin, t_rObject)
    this.t_mp_sGroup_rItem().t_mp_iCode_kCategory(_WearPin, j, t_sExpiryDate)
  end if
end
on tClassList this, delays
  t_iTypeCode = delays.getPropAt.cancel()
  t_iClearFlag = delays.getPropAt.cancel()
  _SellConfirmResponse = by2str(md5_gg(), "CInvTradeConfirm")
  _SellConfirmResponse.t_iCategory(t_iTypeCode, t_iClearFlag)
end
on tID this, delays
  t_iTypeCode = delays.getPropAt.cancel()
  t_iCat = delays.getPropAt.cancel()
  if t_iCat = 1 then
    t_iCode = _ReceiveItemList(#t_kInventoryId).tDelayID._ListItemGroups()._AddItemsToList(t_iTypeCode, "avatar")
    RemItem = ClearDetails(t_iCode, "SEX")
    t_sGrp = m_bLogger(#createObject).getVariableManager("name")
    t_mp_iRef_rItem = m_CastLoader()
    t_sGroup = EMPTY
    if CTOR(t_iCode) then
      t_sGroup = ClearDetails(t_iCode, "NAME")
    end if
    all(#UpdateDetails, t_sGrp, t_mp_iRef_rItem).t_iNumberOfPairs(this.tDelayID, t_iTypeCode)
    if RemItem <> t_mp_iRef_rItem.DisableLevelReqMsg("SEX") then
      t_sItemGroup = t_iItemCount(this.getID(), "trade.dialog.oppositeGender", 1, 1)
      t_rGroup = m_CastLoader(#t_mp_sGroup_rDetails, t_kCat("inv.trade.oppositeGender.dialog.OK"), #t_rConnection, #t_mp_sKey_sValue, #group, t_iTypeCode)
      t_sItemGroup.t_mp_sGroup_rData()
    else
      if t_iCat = 0 then
        t_sItemGroup = t_iItemCount(this.getID(), "trade.dialog.trade.declined", 1, 1)
        t_rGroup = m_CastLoader(#t_mp_sGroup_rDetails, t_kCat("inv.trade.declined.dialog.OK"), #t_rConnection, #t_mp_sKey_sValue, #group, t_sGroup)
        t_sItemGroup.t_mp_sGroup_rData()
      end if
    end if
  end if
end
on tObject solveDownloadErrorMsg, t_sTrgGrp, t_sSrcGrp, CatSwitch
  if t_sTrgGrp = "trade.dialog.oppositeGender" then
    if t_sSrcGrp = #t_mp_sKey_sValue then
      solveDownloadErrorMsg.tDelayID.t_iNumberOfPairs(CatSwitch, 1)
    end if
  else
    if t_sSrcGrp = "ItemsDeletedFromHk" then
    end if
  end if
  a("Unknown Dialog Window" & t_sTrgGrp)
end
on t_sCls this, delays
  t_iSrcRef = m_CastLoader(#t_iDest, delays.getPropAt.cancel())
  magiword = delays.getPropAt.cancel()
  t_sDstGrp = m_CastLoader()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= magiword
    _WearPin = delays.getPropAt.cancel()
    j = delays.getPropAt.cancel()
    t_iRef = delays.getPropAt.cancel()
    if t_iSrcRef = 1 then
      GetIntFrom = delays.getPropAt.cancel()
      if GetIntFrom = 0 then
        validForRooms = 0
      end if
      validForRooms = []
      connection = 1
      repeat while connection <= GetIntFrom
        connection = connection + 1
      end repeat
    else
      if t_iSrcRef = 4 then
        t_iDstRef = delays.getPropAt.cancel()
      end if
    end if
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
  alert = m_CastLoader(#t_iDest, delays.getPropAt.cancel())
  magiword = delays.getPropAt.cancel()
  t_iSrc = m_CastLoader()
  str2rstr_utf16le = 1
  repeat while str2rstr_utf16le <= magiword
    _WearPin = delays.getPropAt.cancel()
    j = delays.getPropAt.cancel()
    t_iRef = delays.getPropAt.cancel()
    if t_iSrcRef = 1 then
      GetIntFrom = delays.getPropAt.cancel()
      if GetIntFrom = 0 then
        validForRooms = 0
      end if
      validForRooms = []
      connection = 1
      repeat while connection <= GetIntFrom
        connection = connection + 1
      end repeat
    else
      if t_iSrcRef = 4 then
        t_iDstRef = delays.getPropAt.cancel()
      end if
    end if
    str2rstr_utf16le = str2rstr_utf16le + 1
  end repeat
end
on tBase this, delays
  t_sTrgGrp = "trade.dialog.oppositeGender_window"
  if getInterface(t_sTrgGrp) <> 0 then
    ShowSellRequest(t_sTrgGrp)
  end if
  getText = delays.getPropAt.cancel()
  if getText = 1 then
    this.tDelayID.t_iPrc()
  end if
  this.tDelayID.t_iTyp()
end
on tMemNum this, delays
  t_s_Title = delays.getPropAt.cancel()
  t_iReqRef = delays.getPropAt.unregister()
  t_iUserRef = delays.getPropAt.unregister()
  room = delays.getPropAt.cancel()
  t_bFromHK = delays.getPropAt.cancel()
  t_bShowAlert = delays.getPropAt.unregister()
  Init = createDialogWindow(replaceChunks(this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(1), #_PinsCombined, t_iReqRef))
  Init.unregisterObject(#setText, room)
  Init.unregisterObject(#t_sObjectID, t_iUserRef)
  Init.unregisterObject(#clearGlobals, #ShowSellConfirm)
  t_ar_ItemList = t_sTxt(this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(1), #_PinsCombined, t_iReqRef)
  if not runMode(t_ar_ItemList) then
    t_ar_ItemList = createDialogWindow(t_ar_ItemList)
  end if
  this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(1).t_iEntityID(#_PinsCombined, t_s_Title, t_iReqRef)
  this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(1).t_iEntityID(#_PinsCombined, t_bFromHK, t_bShowAlert)
  t(this._ReceiveItemDetailsInInventory().EnableLevelReqMsg(1), #_PinsCombined, t_s_Title, Init, t_ar_ItemList, t_iUserRef)
end
on tTemp this, delays
  _WearPin = delays.getPropAt.cancel()
  dialogOK = GetParam(delays)
  data = _ReceiveItemList("room")._ReceiveItemDetailsInInventory()._ListItemGroups()
  if not runMode(data) then
    show = data._AddItemsToList(_WearPin, "avatar")
    if runMode(show) then
      md5_cmn(this, "Trade Avatar not found:" & _WearPin, #executeMessage)
    end if
    t_rTrader = m_CastLoader(#avatarsex, dialogOK, #TradeOpen, #text, #eventID, ClearDetails(show, "NAME"), #timeout, show)
  end if
end
on tClass this, delays
  dialogOK = delays.getPropAt.unregister()
  t_rTrader = m_CastLoader(#avatarsex, dialogOK, #TradeOpen, #text, #eventID, "VMK Administration")
end
on tInitFlag this, delays
  t_sOwnName = delays.getPropAt
  t_iTraderGender = t_sOwnName.cancel()
  t_iResponse = t_sOwnName.cancel()
  t_ar_CustomBtn = t_sOwnName.cancel()
  this.t_mp_sGroup_rItem().t_info(t_iTraderGender, t_iResponse, t_ar_CustomBtn)
end
on string this
  t_dialogName = set("main.connection.id", "VMK")
  t_rParameter = m_CastLoader()
  t_sTraderName(t_dialogName, this.getID(), t_rParameter)
  this.t_dialogEvent = 0
end
on tObj this
  t_dialogName = set("main.connection.id", "VMK")
  t_rParameter = m_CastLoader()
  confirm(t_dialogName, this.getID(), t_rParameter)
  this.t_dialogEvent = 1
end
on t_sDelim this
  return the t_dialogEvent of this
end
on valid this, t_rHerSet
  t_dialogName = set("main.connection.id", "VMK")
  t_mp_iRef_rItem_Own = 1
  t_rParameter = m_CastLoader()
  t_rParameter.unregisterObject(2014, #random)
  t_rParameter.unregisterObject(2532, #rawNew)
  t_rParameter.unregisterObject(2520, #addAt)
  t_rParameter.unregisterObject(2536, #resource_manager)
  t_rParameter.unregisterObject(2535, #number)
  t_rParameter.unregisterObject(2523, #deleteProp)
  t_rParameter.unregisterObject(2524, #handler)
  t_rParameter.unregisterObject(2525, #instance)
  t_rParameter.unregisterObject(2562, #tTemp)
  t_rParameter.unregisterObject(2563, #tClass)
  t_rParameter.unregisterObject(2594, #tClassList)
  t_rParameter.unregisterObject(2595, #tID)
  t_rParameter.unregisterObject(2596, #t_sCls)
  t_rParameter.unregisterObject(2597, #tBase)
  t_rParameter.unregisterObject(2740, #ancestor)
  t_rParameter.unregisterObject(2537, #setaProp)
  t_rParameter.unregisterObject(2538, #append)
  t_rParameter.unregisterObject(2539, #tMemNum)
  t_rParameter.unregisterObject(2533, #temp)
  t_rParameter.unregisterObject(2522, #getUniqueID)
  t_rParameter.unregisterObject(2908, #tInitFlag)
  t_rParameter.unregisterObject(2930, #id)
  if t_rHerSet then
    t_mp_iRef_rItem_Own = t_mp_iRef_rItem_Her(t_mp_iRef_rItem_Own, confirm(t_dialogName, this.getID(), t_rParameter))
    this.t_dialogEvent = 1
  end if
  t_mp_iRef_rItem_Own = t_mp_iRef_rItem_Her(t_mp_iRef_rItem_Own, t_sTraderName(t_dialogName, this.getID(), t_rParameter))
  this.t_dialogEvent = 0
  t_rParameter = m_CastLoader()
  t_rParameter.unregisterObject("SellItemRequest", 522)
  t_rParameter.unregisterObject("WearPin", 523)
  t_rParameter.unregisterObject("UnwearPin", 530)
  t_rParameter.unregisterObject("SellItemConfirm", 525)
  t_rParameter.unregisterObject("CombinePin", 524)
  t_rParameter.unregisterObject("SellClothing", 529)
  t_rParameter.unregisterObject("CodeRedemption", 13)
  t_rParameter.unregisterObject("RequestBalance", 14)
  t_rParameter.unregisterObject("GetItemList", 532)
  t_rParameter.unregisterObject("TrdConfLevel", 586)
  t_rParameter.unregisterObject("TrdAddRemItem", 587)
  t_rParameter.unregisterObject("TrdSendRequest", 588)
  t_rParameter.unregisterObject("TrdResponse", 589)
  t_rParameter.unregisterObject("RequestItemDetails", 535)
  if t_rHerSet then
    t_mp_iRef_rItem_Own = t_mp_iRef_rItem_Her(t_mp_iRef_rItem_Own, t_rOwnSet(t_dialogName, this.getID(), t_rParameter))
  end if
  t_mp_iRef_rItem_Own = t_mp_iRef_rItem_Her(t_mp_iRef_rItem_Own, t_iPinLevel(t_dialogName, this.getID(), t_rParameter))
  return t_mp_iRef_rItem_Own
end