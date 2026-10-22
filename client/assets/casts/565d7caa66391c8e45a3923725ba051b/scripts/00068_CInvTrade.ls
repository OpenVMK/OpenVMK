-- Script
property m_iPartnerRef
property m_sPartner
property m_rWindow
property m_kCategory
property m_rGridInvItems
property m_rGridOwnItems
property m_rGridHerItems
property m_bOwnConfirm
property m_bHerConfirm
property m_mp_iRef_rOwnItems
property m_mp_iRef_rHerItems
property m_mp_iRef_rInvItems
property m_mp_kType_mp_iRef_rItem
property m_bOppositeGender
property m_rObjTradConf
property m_mp_ItemsInTrade
property m_ar_NonTradableItems
property m_iLastTeleporterSelection
property m_bTradeAnyItem
property m_iRefJustPlaced
property m_mp_CannedField
property m_bLoadingHerThumbs
property m_bLoadingOwnThumbs
property m_bLoadingInvThumbs
property m_rHerGridLoadAnim
property m_rOwnGridLoadAnim
property m_rInvGridLoadAnim
property m_iHerGridRequest
property m_iOwnGridRequest
property m_iInvGridRequest
property m_iItemsPerPage
property m_iCurrentPage

on construct this
  executeMessage("SetButtonStates", [#all: 0])
  getThread("inventory").component._LoadInventory()
  m_iPartnerRef = -1
  m_sPartner = "???"
  m_kCategory = #items
  m_bOwnConfirm = 0
  m_bHerConfirm = 0
  m_iItemsPerPage = 10
  m_iCurrentPage = 1
  m_mp_kType_mp_iRef_rItem = [#items: [:], #pins: [:], #posters: [:], #clothes: [:]]
  m_mp_iRef_rOwnItems = [:]
  m_mp_iRef_rHerItems = [:]
  m_mp_iRef_rInvItems = m_mp_kType_mp_iRef_rItem[m_kCategory]
  m_mp_CannedField = 0
  m_mp_ChatBoard = 0
  m_bOppositeGender = 0
  m_rObjTradConf = createObject(getUniqueID(), "CInvPageConfirmTrade")
  m_mp_ItemsInTrade = [#items: [:], #pins: [:], #posters: [:], #clothes: [:]]
  m_iLastTeleporterSelection = VOID
  m_iRefJustPlaced = VOID
  m_rHerGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_rOwnGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_rInvGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_iHerGridRequest = 0
  m_iOwnGridRequest = 0
  m_iInvGridRequest = 0
  m_bLoadingHerThumbs = 1
  m_bLoadingOwnThumbs = 1
  m_bLoadingInvThumbs = 1
  registerMessage(#tradechat, this.getID(), #ReceivedChatMessage)
  executeMessage("hide_inventory")
  executeMessage("close_AvatarBuilder")
  executeMessage("close_profile")
  registerMessage("teleport_selected", this.getID(), #TeleportSelected)
  registerMessage("teleport_unselected", this.getID(), #TeleportUnSelected)
  t_sID = getUniqueID()
  if createWindow(t_sID, "vmk_tra.window", 0, 0, #modal) then
    m_rWindow = getWindow(t_sID)
    m_rWindow.center()
    m_rWindow.registerClient(this.getID())
    m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseUp)
    m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
    m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyUp)
    m_rGridInvItems = createObject("TradeItemsGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
    m_rGridOwnItems = createObject("OfferedItemsGrid", "CGenericThumbnailGrid")
    m_rGridHerItems = createObject("IncomingItemsGrid", "CGenericThumbnailGrid")
    m_ar_NonTradableItems = []
    if variableExists("nontradable") then
      m_ar_NonTradableItems = getVariableValue("nontradable")
    end if
    if getObject(#session).exists("permissions") then
      t_iPos = getObject(#session).get("permissions").findPos("11")
    end if
    if t_iPos > 0 then
      m_bTradeAnyItem = 1
    else
      m_bTradeAnyItem = 0
    end if
    this._SwitchPage(#items)
    this.status([#confirm: 0, #items: [:]], [#confirm: 0, #items: [:]])
    m_mp_CannedField = CreateCannedField(t_sID, "tra.chat.field", rgb("#000000"), rgb("#FF0000"))
    getObject(#session).set("IsTrading", 1)
    this.DefineItemInfo(VOID)
    getThread("inventory").component.GetInventory(1).RegisterItemListCallback(this, #_RefreshItemList)
    return 1
  else
    return error(this, "Trade window is fucked up.", #construct)
  end if
end
on deconstruct this
  unregisterMessage("teleport_selected", this.getID())
  unregisterMessage("teleport_unselected", this.getID())
  executeMessage("SetButtonStates", [#all: 1])
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
    m_rWindow = VOID
  end if
  if objectp(m_rGridInvItems) then
    removeObject(m_rGridInvItems.getID())
    m_rGridInvItems = VOID
  end if
  if objectp(m_rGridOwnItems) then
    removeObject(m_rGridOwnItems.getID())
    m_rGridOwnItems = VOID
  end if
  if objectp(m_rGridHerItems) then
    removeObject(m_rGridHerItems.getID())
    m_rGridHerItems = VOID
  end if
  if objectp(m_rHerGridLoadAnim) then
    removeObject(m_rHerGridLoadAnim.getID())
    m_rHerGridLoadAnim = VOID
  end if
  if objectp(m_rOwnGridLoadAnim) then
    removeObject(m_rOwnGridLoadAnim.getID())
    m_rOwnGridLoadAnim = VOID
  end if
  if objectp(m_rInvGridLoadAnim) then
    removeObject(m_rInvGridLoadAnim.getID())
    m_rInvGridLoadAnim = VOID
  end if
  m_mp_iRef_rOwnItems = VOID
  m_mp_iRef_rHerItems = VOID
  m_mp_kType_mp_iRef_rItem = VOID
  if objectp(m_rObjTradConf) then
    removeObject(m_rObjTradConf.getID())
    m_rObjTradConf = VOID
  end if
  getObject(#session).set("IsTrading", 0)
  getThread("inventory").component.GetInventory(1).UnregisterItemListCallback(this, #_RefreshItemList)
  return 1
end
on setButtonState this, t_sElemName, t_bState
  if objectp(m_rWindow) then
    tWndObj = getWindow(m_rWindow.getID())
  end if
  if tWndObj <> 0 then
    t_rElem = tWndObj.getElement(t_sElemName)
    if t_rElem <> 0 then
      case t_bState of
        1:
          t_rElem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_rElem.Activate()
        0:
          t_rElem.setProperty(#cursor, #arrow)
          t_rElem.deactivate()

      end case
    end if
  end if
end
on SetPartner this, a_iTraderRef, a_bOppositeGender
  t_rTrader = getThread(#room).component._AccessRoom()._AccessIndexed(a_iTraderRef, "avatar")
  t_sTraderName = EMPTY
  if objectp(t_rTrader) then
    t_sTraderName = t_rTrader.GetParam("NAME")
  end if
  m_sPartner = t_sTraderName
  m_iPartnerRef = a_iTraderRef
  if not voidp(a_bOppositeGender) then
    m_bOppositeGender = a_bOppositeGender
  end if
  if objectp(m_rWindow) then
    m_rWindow.getElement("tra.heaccepts.hd").setText(m_sPartner && getText("tra.heaccepts"))
    m_rWindow.getElement("tra.heoffers.hd").setText(replaceChunks(getText("tra.heoffers"), "\$", m_sPartner))
    t_bShowAskFriend = 1
    t_rMessenger = getThread("Messenger")
    t_sName = m_sPartner
    if t_rMessenger <> 0 then
      t_ar_rFriends = t_rMessenger.getComponent().getFriendNames()
      if t_ar_rFriends.getOne(t_sName) > 0 then
        t_bShowAskFriend = 0
      end if
    end if
    if t_bShowAskFriend then
      this.setButtonState("tra.askfriend.button", 1)
    else
      this.setButtonState("tra.askfriend.button", 0)
    end if
  end if
end
on ReceivedChatMessage this, a_sChatMessage
  if objectp(m_rWindow) then
    t_rElem = m_rWindow.getElement("tra.messages")
    if t_rElem <> 0 then
      t_sMessages = t_rElem.getText()
      t_sMsg = a_sChatMessage.name & ": " & a_sChatMessage.message & RETURN
      t_rElem.setText(t_sMessages & t_sMsg)
      this.updateChatScrollbar(t_rElem.pTextMem.rect.height)
    end if
  end if
end
on updateChatScrollbar me, tY
  if objectp(m_rWindow) then
    t_rScrollbar = m_rWindow.getElement("tra.scrollbar4")
    if t_rScrollbar <> 0 then
      call(#setScrollOffset, t_rScrollbar, tY)
    end if
  end if
end
on status this, a_rOwnSet, a_rHerSet
  m_bOwnConfirm = a_rOwnSet.confirm
  m_bHerConfirm = a_rHerSet.confirm
  t_rChkBox = getMember("button.checkbox." & m_bOwnConfirm)
  if ilk(t_rChkBox, #member) then
    m_rWindow.getElement("tra.youaccept").feedImage(t_rChkBox.image)
  end if
  t_rChkBox = getMember("button.checkbox." & m_bHerConfirm)
  if ilk(t_rChkBox, #member) then
    m_rWindow.getElement("tra.heaccepts").feedImage(t_rChkBox.image)
  end if
  m_mp_iRef_rOwnItems = a_rOwnSet.items
  m_mp_iRef_rHerItems = a_rHerSet.items
  m_rGridOwnItems.Unselect()
  m_rGridHerItems.Unselect()
  m_bLoadingOwnThumbs = 1
  m_rOwnGridLoadAnim.SetBufferElement(m_rWindow.getElement("tra.mystuff"))
  receiveUpdate(m_rOwnGridLoadAnim.getID())
  t_mp_iType_rThumb = [:]
  t_iCount = m_mp_iRef_rOwnItems.count
  repeat with i = 1 to t_iCount
    t_mp_iType_rThumb.addProp(m_mp_iRef_rOwnItems[i].code, VOID)
  end repeat
  m_iOwnGridRequest = m_iOwnGridRequest + 1
  executeMessage("GetMixedThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_RenderOwnItems, #param: m_rWindow.getElement("tra.mystuff"), #request: m_iOwnGridRequest])
  t_mp_iType_rThumb = [:]
  t_iCount = m_mp_iRef_rHerItems.count
  repeat with i = 1 to t_iCount
    t_mp_iType_rThumb.addProp(m_mp_iRef_rHerItems[i].code, VOID)
  end repeat
  m_bLoadingHerThumbs = 1
  m_rHerGridLoadAnim.SetBufferElement(m_rWindow.getElement("tra.herstuff"))
  receiveUpdate(m_rHerGridLoadAnim.getID())
  m_iHerGridRequest = m_iHerGridRequest + 1
  executeMessage("GetMixedThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_RenderHerItems, #param: m_rWindow.getElement("tra.herstuff"), #request: m_iHerGridRequest])
  if not voidp(m_iRefJustPlaced) then
    repeat with j = 1 to m_mp_iRef_rOwnItems.count
      if m_mp_iRef_rOwnItems.getPropAt(j) = m_iRefJustPlaced then
        m_rGridOwnItems.select(j)
        m_iRefJustPlaced = VOID
        exit repeat
      end if
    end repeat
  end if
  if not voidp(m_iRefJustPlaced) then
    nothing()
  end if
  m_mp_ItemsInTrade = [#items: [:], #pins: [:], #posters: [:], #clothes: [:]]
  repeat with t_rItem in m_mp_iRef_rOwnItems
    t_iRef = t_rItem.ref
    t_iCat = t_rItem.cat
    t_iCode = t_rItem.code
    case t_iCat of
      1:
        t_kType = #items
      2:
        t_kType = #clothes
      3:
        t_kType = #posters
      4:
        t_kType = #pins

    end case
    next repeat
    t_rItemsByType = m_mp_kType_mp_iRef_rItem.getaProp(t_kType)
    t_rItem.addProp(#state, #normal)
    m_mp_ItemsInTrade[t_kType].addProp(t_iRef, t_rItem)
    t_rItemsByType.deleteProp(t_iRef)
  end repeat
  repeat with t_rItem in m_mp_iRef_rHerItems
    t_rItem.addProp(#state, #normal)
  end repeat
  m_mp_kType_mp_iRef_rItem = getThread("inventory").component.GetInventory(1).GetAllItemLists()
  m_mp_iRef_rInvItems = m_mp_kType_mp_iRef_rItem.getaProp(m_kCategory)
  m_bLoadingInvThumbs = 1
  m_rInvGridLoadAnim.SetBufferElement(m_rWindow.getElement("tra.objects"))
  receiveUpdate(m_rInvGridLoadAnim.getID())
  t_mp_iType_rThumb = [:]
  t_iCount = m_mp_kType_mp_iRef_rItem.getaProp(m_kCategory).count
  if m_iCurrentPage > 1 then
    if (m_iCurrentPage - 1) * m_iItemsPerPage + 1 > t_iCount then
      m_iCurrentPage = 1
    end if
  else
    if m_iCurrentPage < 1 then
      m_iCurrentPage = 1
    end if
  end if
  t_iFirst = (m_iCurrentPage - 1) * m_iItemsPerPage + 1
  t_iLast = min(m_iCurrentPage * m_iItemsPerPage, t_iCount)
  repeat with i = t_iFirst to t_iLast
    t_mp_iType_rThumb.addProp(m_mp_kType_mp_iRef_rItem.getaProp(m_kCategory)[i].code, VOID)
  end repeat
  m_iInvGridRequest = m_iInvGridRequest + 1
  executeMessage("GetMixedThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_RenderInvItems, #category: m_kCategory, #request: m_iInvGridRequest])
  m_rWindow.getElement("inv.page.number").setText(m_iCurrentPage & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
  this.checkTeleporterSelection(m_rGridOwnItems, m_mp_iRef_rOwnItems, 0)
  this.checkTeleporterSelection(m_rGridHerItems, m_mp_iRef_rHerItems, 0)
  this.checkTeleporterSelection(m_rGridInvItems, m_mp_iRef_rInvItems, (m_iCurrentPage - 1) * m_iItemsPerPage)
  if m_bOwnConfirm and m_bHerConfirm then
    t_ImgMine = m_rWindow.getElement("tra.mystuff").getProperty(#image)
    t_ImgHers = m_rWindow.getElement("tra.herstuff").getProperty(#image)
    if not voidp(m_rObjTradConf) then
      m_rObjTradConf.Define(m_sPartner)
      m_rObjTradConf.Feedimages(t_ImgMine, t_ImgHers)
    end if
  end if
  if not voidp(m_rObjTradConf) then
    m_rObjTradConf.UpdateStates(m_bOwnConfirm, m_bHerConfirm)
  end if
end
on _RefreshItemList this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
  repeat with t_rItem in m_mp_iRef_rOwnItems
    t_iRef = t_rItem.ref
    t_iCat = t_rItem.cat
    t_iCode = t_rItem.code
    case t_iCat of
      1:
        t_kType = #items
      2:
        t_kType = #clothes
      3:
        t_kType = #posters
      4:
        t_kType = #pins

    end case
    next repeat
    t_rItemsByType = m_mp_kType_mp_iRef_rItem.getaProp(t_kType)
    t_rItemsByType.deleteProp(t_iRef)
    t_rItemsByType = a_mp_kType_mp_iRef_rItem.getaProp(t_kType)
    t_rItemsByType.deleteProp(t_iRef)
  end repeat
  if a_kAlteredCategory = m_kCategory then
    m_mp_iRef_rInvItems = m_mp_kType_mp_iRef_rItem.getaProp(m_kCategory)
    if objectp(m_rWindow) then
      m_bLoadingInvThumbs = 1
      m_rInvGridLoadAnim.SetBufferElement(m_rWindow.getElement("tra.objects"))
      receiveUpdate(m_rInvGridLoadAnim.getID())
      t_mp_iType_rThumb = [:]
      t_iCount = m_mp_iRef_rInvItems.count
      if m_iCurrentPage > 1 then
        if (m_iCurrentPage - 1) * m_iItemsPerPage + 1 > t_iCount then
          m_iCurrentPage = 1
        end if
      else
        if m_iCurrentPage < 1 then
          m_iCurrentPage = 1
        end if
      end if
      t_iFirst = (m_iCurrentPage - 1) * m_iItemsPerPage + 1
      t_iLast = min(m_iCurrentPage * m_iItemsPerPage, t_iCount)
      repeat with i = t_iFirst to t_iLast
        t_mp_iType_rThumb.addProp(m_mp_iRef_rInvItems[i].code, VOID)
      end repeat
      m_iInvGridRequest = m_iInvGridRequest + 1
      executeMessage("GetMixedThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_RenderInvItems, #category: m_kCategory, #request: m_iInvGridRequest])
      m_rWindow.getElement("inv.page.number").setText(m_iCurrentPage & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
    end if
  end if
end
on UpdateInventory this
  if listp(m_mp_ItemsInTrade) then
    return m_mp_ItemsInTrade
  end if
end
on _SwitchPage this, a_kNewPage
  m_kCategory = a_kNewPage
  m_rWindow.getElement("tra.tab.posters.active").hide()
  m_rWindow.getElement("tra.tab.clothes.active").hide()
  m_rWindow.getElement("tra.tab.pins.active").hide()
  m_rWindow.getElement("tra.tab.furniture.active").hide()
  case a_kNewPage of
    #items:
      m_rWindow.getElement("tra.tab.furniture.active").show()
      this._RefreshItemList(m_mp_kType_mp_iRef_rItem, #items)
    #pins:
      m_rWindow.getElement("tra.tab.pins.active").show()
      this._RefreshItemList(m_mp_kType_mp_iRef_rItem, #pins)
    #clothes:
      m_rWindow.getElement("tra.tab.clothes.active").show()
      this._RefreshItemList(m_mp_kType_mp_iRef_rItem, #clothes)
    #posters:
      m_rWindow.getElement("tra.tab.posters.active").show()
      this._RefreshItemList(m_mp_kType_mp_iRef_rItem, #posters)
    otherwise:
      error(this, "Fucked up trade page:" && a_kNewPage, #_SwitchPage)
      this._SwitchPage(#items)

  end case
end
on SendMessage this, t_ar_sWords
  getConnection(getVariable("main.connection.id", "VMK")).send(561, TransformCannedToMsg(t_ar_sWords, 1))
  return 1
end
on _EventProc this, a_kEvt, a_sElm, a_vPrm, a_sWnd
  if a_kEvt = #mouseUp then
    t_iMyRef = getObject(#session).get("room_own_avatar")
    case a_sElm of
      "tra.objects":
        if not m_bLoadingInvThumbs then
          m_rGridOwnItems.Unselect()
          m_rGridHerItems.Unselect()
          m_rGridInvItems.MouseSelection(a_vPrm)
          this.checkTeleporterSelection(m_rGridInvItems, m_mp_iRef_rInvItems, (m_iCurrentPage - 1) * m_iItemsPerPage)
          if the doubleClick then
            t_rItem = this.GetSelected(m_rGridInvItems, m_mp_iRef_rInvItems, (m_iCurrentPage - 1) * m_iItemsPerPage)
            if t_rItem.ref > -1 and m_bTradeAnyItem and m_ar_NonTradableItems.findPos(t_rItem.code) <> VOID then
              t = createDialogWindow(this.getID(), "TradeNonTradeable", 2, 1)
              t_rBtn1 = [#text: getText("nav.allrooms.no"), #eventID: #dialogCancel, #data: EMPTY]
              t_rBtn2 = [#text: getText("nav.allrooms.yes"), #eventID: #dialogOK, #data: [#int: 0, #int: 1, #int: t_rItem.ref]]
              t.show()
              t.setText(getText("inv.trade.non.tradeable"), getText("mods.alert"), t_rBtn1, t_rBtn2)
              exit
            end if
            if t_rItem.ref > -1 and m_ar_NonTradableItems.findPos(t_rItem.code) = VOID then
              getConnection("VMK").send(587, [#int: 0, #int: 1, #int: t_rItem.ref])
            end if
            m_rGridInvItems.Unselect()
            m_iRefJustPlaced = t_rItem.ref
          else
            t_rItem = this.GetSelected(m_rGridInvItems, m_mp_iRef_rInvItems, (m_iCurrentPage - 1) * m_iItemsPerPage)
            this.RequestItemInfo(t_rItem, t_iMyRef)
          end if
        end if
        return 1
      "tra.mystuff":
        if not m_bLoadingOwnThumbs then
          m_rGridInvItems.Unselect()
          m_rGridHerItems.Unselect()
          m_rGridOwnItems.MouseSelection(a_vPrm)
          this.checkTeleporterSelection(m_rGridOwnItems, m_mp_iRef_rOwnItems, 0)
          if the doubleClick then
            t_rItem = this.GetSelected(m_rGridOwnItems, m_mp_iRef_rOwnItems, 0)
            if t_rItem.ref > -1 then
              getConnection("VMK").send(587, [#int: 1, #int: 1, #int: t_rItem.ref])
              m_rGridOwnItems.Unselect()
              this.DefineItemInfo(VOID)
            end if
          end if
          t_rItem = this.GetSelected(m_rGridOwnItems, m_mp_iRef_rOwnItems, 0)
          if listp(t_rItem) then
            if t_rItem[#state] <> #invalid then
              t_iItemRef = integer(t_rItem[#ref])
              put "Request details" && [#int: t_iMyRef, #int: 2, #int: t_iItemRef]
              getConnection("VMK").send("RequestItemDetails", [#int: t_iMyRef, #int: 2, #int: t_iItemRef])
            end if
          end if
        end if
        return 1
      "tra.herstuff":
        if not m_bLoadingHerThumbs then
          m_rGridInvItems.Unselect()
          m_rGridOwnItems.Unselect()
          m_rGridHerItems.MouseSelection(a_vPrm)
          this.checkTeleporterSelection(m_rGridHerItems, m_mp_iRef_rHerItems, 0)
          t_rItem = this.GetSelected(m_rGridHerItems, m_mp_iRef_rHerItems, 0)
          if listp(t_rItem) then
            if t_rItem[#state] <> #invalid then
              t_iItemRef = integer(t_rItem[#ref])
              put "Request details" && [#int: m_iPartnerRef, #int: 2, #int: t_iItemRef]
              getConnection("VMK").send("RequestItemDetails", [#int: m_iPartnerRef, #int: 2, #int: t_iItemRef])
            end if
          end if
        end if
        return 1
      "tra.youaccept":
        if not m_bOwnConfirm and m_mp_iRef_rHerItems.count = 0 then
          t = createDialogWindow(this.getID(), "trade.dialog.empty.trade", 2, 1)
          t_sTitle = getText("tra.confirm.empty.dialog.title")
          t_sText = getText("tra.confirm.empty.dialog.text")
          t_rBtn1 = [#text: getText("tra.confirm.empty.dialog.btnCancel"), #eventID: #dialogCancel, #data: EMPTY]
          t_rBtn2 = [#text: getText("tra.confirm.empty.dialog.btnOK"), #eventID: #dialogOK, #data: EMPTY]
          t.setText(t_sText, t_sTitle, t_rBtn1, t_rBtn2)
          t.show()
          return 1
        else
          if m_bOwnConfirm > 0 then
            getConnection("VMK").send(586, [#int: 0])
          else
            getConnection("VMK").send(586, [#int: 1])
          end if
        end if
        t_rChkBox = getMember("button.checkbox." & not m_bOwnConfirm)
        if ilk(t_rChkBox, #member) then
          m_rWindow.getElement("tra.youaccept").feedImage(t_rChkBox.image)
        end if
      "tra.tab.posters.passive":
        this._SwitchPage(#posters)
      "tra.tab.clothes.passive":
        if m_bOppositeGender then
          t = createDialogWindow(this.getID(), "trade.dialog.oppositeGender", 1, 1)
          t.setText(getText("inv.trade.oppositeGender.dialog.text"), getText("inv.trade.oppositeGender.dialog.title"), getText("inv.trade.oppositeGender.dialog.OK"))
          t.show()
        end if
        this._SwitchPage(#clothes)
      "tra.tab.pins.passive":
        this._SwitchPage(#pins)
      "tra.tab.furniture.passive":
        this._SwitchPage(#items)
      "tra.askfriend.button":
        executeMessage("ask_friendship", m_sPartner)
      "tra.stoptrading.button":
        t = createDialogWindow(this.getID(), "tra.confirm.stop.dialog", 2, 1)
        t_sTitle = getText("tra.confirm.stop.dialog.title")
        t_sText = getText("tra.confirm.stop.dialog.text")
        t_rBtn1 = [#text: getText("tra.confirm.stop.dialog.btnCancel"), #eventID: #dialogCancel, #data: EMPTY]
        t_rBtn2 = [#text: getText("tra.confirm.stop.dialog.btnOK"), #eventID: #dialogOK, #data: EMPTY]
        t.setText(t_sText, t_sTitle, t_rBtn1, t_rBtn2)
        t.show()
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        t = createDialogWindow(this.getID(), "tra.confirm.stop.dialog", 2, 1)
        t_sTitle = getText("tra.confirm.stop.dialog.title")
        t_sText = getText("tra.confirm.stop.dialog.text")
        t_rBtn1 = [#text: getText("tra.confirm.stop.dialog.btnCancel"), #eventID: #dialogCancel, #data: EMPTY]
        t_rBtn2 = [#text: getText("tra.confirm.stop.dialog.btnOK"), #eventID: #dialogOK, #data: EMPTY]
        t.setText(t_sText, t_sTitle, t_rBtn1, t_rBtn2)
        t.show()
      "inv.grid.next":
        if m_mp_iRef_rInvItems.count > m_iCurrentPage * m_iItemsPerPage then
          m_iCurrentPage = m_iCurrentPage + 1
          m_bLoadingInvThumbs = 1
          m_rInvGridLoadAnim.SetBufferElement(m_rWindow.getElement("tra.objects"))
          receiveUpdate(m_rInvGridLoadAnim.getID())
          t_mp_iType_rThumb = [:]
          t_iCount = m_mp_iRef_rInvItems.count
          if m_iCurrentPage > 1 then
            if (m_iCurrentPage - 1) * m_iItemsPerPage + 1 > t_iCount then
              m_iCurrentPage = 1
            end if
          else
            if m_iCurrentPage < 1 then
              m_iCurrentPage = 1
            end if
          end if
          t_iFirst = (m_iCurrentPage - 1) * m_iItemsPerPage + 1
          t_iLast = min(m_iCurrentPage * m_iItemsPerPage, t_iCount)
          repeat with i = t_iFirst to t_iLast
            t_mp_iType_rThumb.addProp(m_mp_iRef_rInvItems[i].code, VOID)
          end repeat
          m_iInvGridRequest = m_iInvGridRequest + 1
          executeMessage("GetMixedThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_RenderInvItems, #category: m_kCategory, #request: m_iInvGridRequest])
          m_rWindow.getElement("inv.page.number").setText(m_iCurrentPage & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
          m_rGridOwnItems.Unselect()
          m_rGridHerItems.Unselect()
          m_rGridInvItems.select(1)
          t_rItem = this.GetSelected(m_rGridInvItems, m_mp_iRef_rInvItems, (m_iCurrentPage - 1) * m_iItemsPerPage)
          this.RequestItemInfo(t_rItem, t_iMyRef)
          this.checkTeleporterSelection(m_rGridInvItems, m_mp_iRef_rInvItems, (m_iCurrentPage - 1) * m_iItemsPerPage)
        end if
      "inv.grid.prev":
        if m_iCurrentPage > 1 then
          m_iCurrentPage = m_iCurrentPage - 1
          m_bLoadingInvThumbs = 1
          m_rInvGridLoadAnim.SetBufferElement(m_rWindow.getElement("tra.objects"))
          receiveUpdate(m_rInvGridLoadAnim.getID())
          t_mp_iType_rThumb = [:]
          t_iCount = m_mp_iRef_rInvItems.count
          if m_iCurrentPage > 1 then
            if (m_iCurrentPage - 1) * m_iItemsPerPage + 1 > t_iCount then
              m_iCurrentPage = 1
            end if
          else
            if m_iCurrentPage < 1 then
              m_iCurrentPage = 1
            end if
          end if
          t_iFirst = (m_iCurrentPage - 1) * m_iItemsPerPage + 1
          t_iLast = min(m_iCurrentPage * m_iItemsPerPage, t_iCount)
          repeat with i = t_iFirst to t_iLast
            t_mp_iType_rThumb.addProp(m_mp_iRef_rInvItems[i].code, VOID)
          end repeat
          m_iInvGridRequest = m_iInvGridRequest + 1
          executeMessage("GetMixedThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_RenderInvItems, #category: m_kCategory, #request: m_iInvGridRequest])
          m_rWindow.getElement("inv.page.number").setText(m_iCurrentPage & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
          m_rGridOwnItems.Unselect()
          m_rGridHerItems.Unselect()
          m_rGridInvItems.select(1)
          t_rItem = this.GetSelected(m_rGridInvItems, m_mp_iRef_rInvItems, (m_iCurrentPage - 1) * m_iItemsPerPage)
          this.RequestItemInfo(t_rItem, t_iMyRef)
          this.checkTeleporterSelection(m_rGridInvItems, m_mp_iRef_rInvItems, (m_iCurrentPage - 1) * m_iItemsPerPage)
        end if
      "help":
        executeMessage(#open_help_page, "help.stuff.trading")

    end case
  else
    if a_kEvt = #keyDown then
      t_iKeyCode = the keyCode
      if m_mp_CannedField <> 0 then
        case t_iKeyCode of
          36, 76:
            t_pass = m_mp_CannedField.CheckContent()
            if t_pass then
              this.SendMessage(m_mp_CannedField.m_ar_cWords)
              m_mp_CannedField.reset()
            end if
            return 1
          49:
            tElem = m_rWindow.getElement("tra.chat.field")
            tSelection = tElem.pMember.selection
            tCharcount = tElem.pMember.text.char.count
            if tCharcount > 0 then
              if tElem.pMember.text.char[tSelection[2]] = " " then
                return 1
              end if
              if tSelection[2] + 1 <= tCharcount then
                if tElem.pMember.text.char[tSelection[2] + 1] = " " then
                  return 1
                end if
              end if
            end if
            if m_mp_CannedField.CheckContent() then
              m_mp_CannedField.updateContent()
            end if
            pass()
          otherwise:
            m_mp_CannedField.updateContent()
            pass()

        end case
      end if
    else
      if a_kEvt = #keyUp then
        t_iKeyCode = the keyCode
        tElem = m_rWindow.getElement("tra.chat.field")
        if m_mp_CannedField <> 0 then
          case t_iKeyCode of
            36, 76:
              if tElem.getProperty(#sprite).member.text = RETURN then
                m_mp_CannedField.reset()
              end if
            49:
            otherwise:
              m_mp_CannedField.CheckWord()

          end case
        end if
      end if
    end if
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent, t_data
  case t_dialogName of
    "tra.confirm.stop.dialog":
      case t_dialogEvent of
        #dialogOK:
          getConnection("VMK").send(586, [#int: -1])
        #dialogCancel:

      end case
    "trade.dialog.empty.trade":
      case t_dialogEvent of
        #dialogCancel:
        #dialogOK:
          getConnection("VMK").send(586, [#int: 1])
          t_rChkBox = getMember("button.checkbox." & 1)
          if ilk(t_rChkBox, #member) then
            m_rWindow.getElement("tra.youaccept").feedImage(t_rChkBox.image)
          end if

      end case
    "TradeNonTradeable":
      case t_dialogEvent of
        #dialogOK:
          if listp(t_data) then
            getConnection("VMK").send(587, t_data)
          end if
        #dialogCancel:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on checkTeleporterSelection this, t_rGridRenderer, a_mp_iRef_rItems, a_iOffset
  t_iSelection = t_rGridRenderer.GetSelected() + a_iOffset
  t_rSelection = this.GetSelected(t_rGridRenderer, a_mp_iRef_rItems, a_iOffset)
  if t_rSelection.state <> #invalid then
    if not voidp(m_iLastTeleporterSelection) then
      executeMessage("teleport_unselected", m_iLastTeleporterSelection)
      m_iLastTeleporterSelection = VOID
    end if
    if not (t_rSelection.getaProp(#param) = 0) then
      t_rParams = t_rSelection.param
      if ilk(t_rParams, #list) then
        if t_rParams.count = 3 then
          if t_rParams[1] = 1 then
            executeMessage("teleport_selected", t_rParams[2])
            m_iLastTeleporterSelection = t_rParams[2]
          end if
        end if
      end if
    end if
    t_rGridRenderer.select(t_iSelection - a_iOffset)
  end if
end
on TeleportSelected this, a_iOtherID
  t_ar_rLists = [m_mp_iRef_rOwnItems, m_mp_iRef_rHerItems, m_mp_iRef_rInvItems]
  i = 0
  repeat with i = 1 to 3
    t_rList = t_ar_rLists[i]
    c = 1
    repeat with t_rItem in t_rList
      if not (t_rItem.getaProp(#param) = 0) then
        if ilk(t_rItem.param, #list) then
          if t_rItem.param.count = 3 then
            if t_rItem.param[1] = 1 then
              if t_rItem.param[3] = a_iOtherID then
                case i of
                  1:
                    m_rGridOwnItems.Highlight(c)
                  2:
                    m_rGridHerItems.Highlight(c)
                  3:
                    m_rGridInvItems.Highlight(c)

                end case
                exit
              end if
            end if
          end if
        end if
      end if
      c = c + 1
    end repeat
  end repeat
end
on TeleportUnSelected me, a_iOtherID
  m_rGridInvItems.Unhighlight()
  m_rGridOwnItems.Unhighlight()
  m_rGridHerItems.Unhighlight()
end
on DefineItemInfo this, a_ar_rProps
  if not listp(a_ar_rProps) then
    m_rWindow.getElement("iteminfo.tradeable.off").hide()
    m_rWindow.getElement("iteminfo.magicword.hd").hide()
    m_rWindow.getElement("iteminfo.owner.hd").hide()
    m_rWindow.getElement("iteminfo.type.hd").hide()
    m_rWindow.getElement("iteminfo.type").hide()
    m_rWindow.getElement("iteminfo.item").hide()
    m_rWindow.getElement("roominfog.owner").hide()
    m_rWindow.getElement("magics.word").hide()
    m_rWindow.getElement("expiredate.info").hide()
    this.changeImageInElement(m_rWindow, "singleuse", member("null"))
    this.ShowSelected(-1, VOID)
    return 0
  else
    m_rWindow.getElement("iteminfo.tradeable.off").show()
    m_rWindow.getElement("iteminfo.magicword.hd").show()
    m_rWindow.getElement("iteminfo.owner.hd").show()
    m_rWindow.getElement("iteminfo.type.hd").show()
    m_rWindow.getElement("iteminfo.type").show()
    m_rWindow.getElement("iteminfo.item").show()
    m_rWindow.getElement("roominfog.owner").show()
    m_rWindow.getElement("magics.word").show()
    m_rWindow.getElement("expiredate.info").show()
    this.setField(m_rWindow, "iteminfo.magicword.hd", getText("magics.word.hd", "Magic word:"))
    this.setField(m_rWindow, "iteminfo.type.hd", getText("iteminfo.type.hd", "Type"))
    this.setField(m_rWindow, "expiredate.info", EMPTY)
    this.setField(m_rWindow, "magics.word", EMPTY)
    this.changeImageInElement(m_rWindow, "singleuse", member("null"))
    this.setField(m_rWindow, "roominfog.owner", a_ar_rProps[#owner])
    if a_ar_rProps[#type] = 7 or a_ar_rProps[#type] = 8 then
      this.ShowSelected(a_ar_rProps[#code], a_ar_rProps.getaProp(#xtra).getaProp(#pinlevel))
    else
      this.ShowSelected(a_ar_rProps[#code], 0)
    end if
    this.setField(m_rWindow, "iteminfo.item", getText("item." & a_ar_rProps[#code]))
    t_sItemType = EMPTY
    t_bTradeable = 1
    if m_ar_NonTradableItems.findPos(a_ar_rProps[#code]) <> VOID then
      t_bTradeable = 0
    end if
    t_sExpireTime = getText("iteminfo.expires", "This expires in %days% day(s)")
    case a_ar_rProps[#type] of
      1:
        t_sItemType = getText("iteminfo.1.type", "Furniture")
      2:
        t_sItemType = getText("iteminfo.2.type", "Poster")
      3:
        t_sItemType = getText("iteminfo.3.type", "Unisex Clothing")
      4:
        t_sItemType = getText("iteminfo.4.type", "Male Clothing")
      5:
        t_sItemType = getText("iteminfo.5.type", "Female Clothing")
      6:
        t_sItemType = getText("iteminfo.6.type", "Normal Pin")
      7:
        t_sItemType = getText("iteminfo.7.type", "Magic Pin")
        this.setField(m_rWindow, "magics.word", a_ar_rProps[#xtra][#magiword])
      8:
        t_sItemType = getText("iteminfo.8.type", "Single Use Magic Pin")
        t_ar_Time = this.seconds2time(a_ar_rProps[#xtra][#timeToExpire])
        t_IDaysLeft = integer(t_ar_Time[#h]) / 24
        t_sExpireTime = replaceChunks(t_sExpireTime, "%days%", t_IDaysLeft)
        this.setField(m_rWindow, "expiredate.info", t_sExpireTime)
        this.setField(m_rWindow, "magics.word", a_ar_rProps[#xtra][#magiword])
        this.changeImageInElement(m_rWindow, "singleuse", member("icon.singleuse"))
      9:
        t_sItemType = getText("iteminfo.9.type", "Ticket Pin")
        t_ar_Time = this.seconds2time(a_ar_rProps[#xtra][#timeToExpire])
        t_IDaysLeft = integer(t_ar_Time[#h]) / 24
        t_sExpireTime = replaceChunks(t_sExpireTime, "%days%", t_IDaysLeft)
        this.setField(m_rWindow, "expiredate.info", t_sExpireTime)
        this.setField(m_rWindow, "iteminfo.type.hd", getText("iteminfo.goodfor.hd", "Good For:"))
        t_sItemType = a_ar_rProps[#xtra][#validForRooms]

    end case
    if a_ar_rProps[#type] <> 7 and a_ar_rProps[#type] <> 8 then
      this.setField(m_rWindow, "iteminfo.magicword.hd", EMPTY)
    end if
    t_sTradeable = getText("iteminfo.tradeable", "Tradeable")
    if not t_bTradeable or a_ar_rProps[#type] = 8 then
      t_sTradeable = getText("iteminfo.nontradeable", "Nontradeable")
    end if
    this.setField(m_rWindow, "iteminfo.tradeable.off", t_sTradeable)
    this.setField(m_rWindow, "iteminfo.type", t_sItemType)
    return 1
  end if
end
on GetSelected this, a_rGrid, a_mp_iRef_rItem, a_iOffset
  t_iSelected = a_rGrid.GetSelected() + a_iOffset
  if t_iSelected > 0 and t_iSelected <= a_mp_iRef_rItem.count then
    return a_mp_iRef_rItem[t_iSelected]
  end if
  return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
end
on ShowSelected this, t_iCode, t_iStars
  if t_iCode < 0 then
    m_rWindow.getElement("inv.preview").feedImage(getMember("previewbox").image.duplicate())
  else
    t_rInput = [:]
    t_rInput.setaProp(t_iCode, VOID)
    executeMessage("GetMixedPreview", t_rInput, [#client: this.getID(), #method: #_PreviewReadyCbk, #param: t_iStars])
  end if
end
on _PreviewReadyCbk this, a_mp_iRef_rImage, a_rCallback
  t_rPrev = a_mp_iRef_rImage[1]
  if voidp(t_rPrev) then
    t_rPrev = image(1, 1, 32)
  end if
  t_rBack = getMember("previewbox").image.duplicate()
  t_iOffX = (t_rBack.width - t_rPrev.width) / 2
  t_iOffY = (t_rBack.height - t_rPrev.height) / 2
  t_rcDest = t_rPrev.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
  if t_rcDest.bottom - t_rcDest.top > t_rBack.rect.bottom - t_rBack.rect.top or t_rcDest.right - t_rcDest.left > t_rBack.rect.right - t_rBack.rect.left then
    tHeightOverflow = t_rcDest.bottom - t_rcDest.top - (t_rBack.rect.bottom - t_rBack.rect.top)
    tWidthOverflow = t_rcDest.right - t_rcDest.left - (t_rBack.rect.right - t_rBack.rect.left)
    if tWidthOverflow > 0 then
      tScale = float(t_rBack.rect.right - t_rBack.rect.left) / float(t_rcDest.right - t_rcDest.left)
      tOffsetLeftCorner = [t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]
      t_rcDest = t_rcDest - tOffsetLeftCorner
      t_rcDest.top = integer(t_rcDest.top * tScale)
      t_rcDest.bottom = integer(t_rcDest.bottom * tScale)
      t_rcDest.left = integer(t_rcDest.left * tScale)
      t_rcDest.right = integer(t_rcDest.right * tScale)
    end if
    tHeightOverflow = t_rcDest.bottom - t_rcDest.top - (t_rBack.rect.bottom - t_rBack.rect.top)
    if tHeightOverflow > 0 then
      tScale = float(t_rBack.rect.bottom - t_rBack.rect.top) / float(t_rcDest.bottom - t_rcDest.top)
      tOffsetLeftCorner = [t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]
      t_rcDest = t_rcDest - tOffsetLeftCorner
      t_rcDest.top = integer(t_rcDest.top * tScale)
      t_rcDest.bottom = integer(t_rcDest.bottom * tScale)
      t_rcDest.left = integer(t_rcDest.left * tScale)
      t_rcDest.right = integer(t_rcDest.right * tScale)
    end if
    t_iDestMidX = t_rBack.width / 2
    t_iDestMidY = t_rBack.height / 2
    t_rcMove = [t_iDestMidX - t_rcDest.right / 2, t_iDestMidY - t_rcDest.bottom / 2, t_iDestMidX - t_rcDest.right / 2, t_iDestMidY - t_rcDest.bottom / 2]
    t_rcDest = t_rcDest + t_rcMove
  end if
  t_rBack.useAlpha = 0
  t_rBack.copyPixels(t_rPrev, t_rcDest, t_rPrev.rect, [#useFastQuads: 1])
  t_iStars = a_rCallback.getaProp(#param)
  if t_iStars then
    t_rStar = getMember("inv.pin.star.prev").image
    t_rRect = t_rStar.rect
    t_rcOff = [20, 115, 20, 115]
    repeat with s = 1 to t_iStars
      t_rBack.copyPixels(t_rStar, t_rRect + t_rcOff + [(s - 1) * (t_rRect.width + 2) + 3, 0, (s - 1) * (t_rRect.width + 2) + 3, 0], t_rRect, [#ink: 36, #useFastQuads: 1])
    end repeat
  end if
  m_rWindow.getElement("inv.preview").feedImage(t_rBack)
end
on RequestItemInfo this, t_ar_Item, t_iMyRef
  if listp(t_ar_Item) then
    if t_ar_Item[#state] <> #invalid then
      t_iItemRef = integer(t_ar_Item[#ref])
      put "Request details" && [#int: t_iMyRef, #int: 2, #int: t_iItemRef]
      getConnection("VMK").send("RequestItemDetails", [#int: t_iMyRef, #int: 2, #int: t_iItemRef])
    end if
  end if
end
on _RenderOwnItems this, a_mp_iType_rImage, a_rCallback
  if this.valid then
    if a_rCallback[#request] = m_iOwnGridRequest then
      m_rOwnGridLoadAnim.SetBufferElement(VOID)
      removeUpdate(m_rOwnGridLoadAnim.getID())
      m_bLoadingOwnThumbs = 0
      if objectp(m_rWindow) then
        t_ar_rThumbs = []
        t_iCount = a_mp_iType_rImage.count
        t_rStar = getMember("inv.pin.star.thumb").image
        t_rRect = t_rStar.rect
        repeat with i = 1 to t_iCount
          t_rThumb = a_mp_iType_rImage[i]
          t_rItem = m_mp_iRef_rOwnItems[i]
          t_iType = t_rItem.code
          case 1 of
            t_iType < 1001:
              t_kCategory = #item
            t_iType > 2000 and t_iType < 3001:
              t_kCategory = #pin
            t_iType > 3000 and t_iType < 4001:
              t_kCategory = #poster
            t_iType > 20000 and t_iType < 50000:
              t_kCategory = #cloth
            t_iType > 5000 and t_iType < 6000:
              t_kCategory = #room
            t_iType > 6000 and t_iType < 8000:
              t_kCategory = #pin
            t_iType > 12000 and t_iType < 13001:
              t_kCategory = #pin
            otherwise:
              error(this, "Unknow item category for item number" && t_iType & "!", #_RenderOwnItems)
              t_kCategory = #unknown

          end case
          if t_kCategory = #pin then
            t_vParam = t_rItem.getaProp(#param)
            if ilk(t_vParam, #integer) then
              if t_vParam > 0 then
                if not voidp(t_rThumb) then
                  t_rThumb = t_rThumb.duplicate()
                  repeat with s = 1 to t_vParam
                    t_rThumb.copyPixels(t_rStar, t_rRect + [(s - 1) * (t_rRect.width + 1) + 3, 31, (s - 1) * (t_rRect.width + 1) + 3, 31], t_rRect, [#ink: 36, #useFastQuads: 1])
                  end repeat
                end if
              end if
            end if
          end if
          t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: 100])
        end repeat
        m_rGridOwnItems.render(t_ar_rThumbs, m_rWindow.getElement("tra.mystuff"))
      end if
    end if
  end if
end
on _RenderHerItems this, a_mp_iType_rImage, a_rCallback
  if this.valid then
    if a_rCallback[#request] = m_iHerGridRequest then
      m_rHerGridLoadAnim.SetBufferElement(VOID)
      removeUpdate(m_rHerGridLoadAnim.getID())
      m_bLoadingHerThumbs = 0
      if objectp(m_rWindow) then
        t_ar_rThumbs = []
        t_iCount = a_mp_iType_rImage.count
        t_rStar = getMember("inv.pin.star.thumb").image
        t_rRect = t_rStar.rect
        repeat with i = 1 to t_iCount
          t_rThumb = a_mp_iType_rImage[i]
          t_rItem = m_mp_iRef_rHerItems[i]
          t_iType = t_rItem.code
          case 1 of
            t_iType < 1001:
              t_kCategory = #item
            t_iType > 2000 and t_iType < 3001:
              t_kCategory = #pin
            t_iType > 3000 and t_iType < 4001:
              t_kCategory = #poster
            t_iType > 20000 and t_iType < 50000:
              t_kCategory = #cloth
            t_iType > 5000 and t_iType < 6000:
              t_kCategory = #room
            t_iType > 6000 and t_iType < 8000:
              t_kCategory = #pin
            t_iType > 12000 and t_iType < 13001:
              t_kCategory = #pin
            otherwise:
              error(this, "Unknow item category for item number" && t_iType & "!", #_RenderHerItems)
              t_kCategory = #unknown

          end case
          if t_kCategory = #pin then
            t_vParam = t_rItem.getaProp(#param)
            if ilk(t_vParam, #integer) then
              if t_vParam > 0 then
                if not voidp(t_rThumb) then
                  t_rThumb = t_rThumb.duplicate()
                  repeat with s = 1 to t_vParam
                    t_rThumb.copyPixels(t_rStar, t_rRect + [(s - 1) * (t_rRect.width + 1) + 3, 31, (s - 1) * (t_rRect.width + 1) + 3, 31], t_rRect, [#ink: 36, #useFastQuads: 1])
                  end repeat
                end if
              end if
            end if
          end if
          t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: 100])
        end repeat
        m_rGridHerItems.render(t_ar_rThumbs, m_rWindow.getElement("tra.herstuff"))
      end if
    end if
  end if
end
on _RenderInvItems this, a_mp_iType_rImage, a_rCallback
  if this.valid then
    if a_rCallback[#request] = m_iInvGridRequest then
      m_rInvGridLoadAnim.SetBufferElement(VOID)
      removeUpdate(m_rInvGridLoadAnim.getID())
      m_bLoadingInvThumbs = 0
      if a_rCallback.getaProp(#category) = m_kCategory then
        if objectp(m_rWindow) then
          t_ar_rThumbs = []
          t_iOffset = (m_iCurrentPage - 1) * m_iItemsPerPage
          t_iCount = a_mp_iType_rImage.count
          if m_kCategory = #pins then
            t_rStar = getMember("inv.pin.star.thumb").image
            t_rRect = t_rStar.rect
            repeat with i = 1 to t_iCount
              t_rThumb = a_mp_iType_rImage[i]
              t_vParam = m_mp_iRef_rInvItems[t_iOffset + i].getaProp(#param)
              if ilk(t_vParam, #integer) then
                if t_vParam > 0 then
                  if not voidp(t_rThumb) then
                    t_rThumb = t_rThumb.duplicate()
                    repeat with s = 1 to t_vParam
                      t_rThumb.copyPixels(t_rStar, t_rRect + [(s - 1) * (t_rRect.width + 1) + 3, 31, (s - 1) * (t_rRect.width + 1) + 3, 31], t_rRect, [#ink: 36, #useFastQuads: 1])
                    end repeat
                  end if
                end if
              end if
              if m_ar_NonTradableItems.findPos(a_mp_iType_rImage.getPropAt(i)) then
                t_iBlend = 50
              else
                t_iBlend = 100
              end if
              t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: t_iBlend, #items: m_mp_iRef_rInvItems[t_iOffset + i][#items]])
            end repeat
          else
            if m_kCategory = #clothes then
              if m_bOppositeGender then
                repeat with i = 1 to t_iCount
                  t_iType = a_mp_iType_rImage.getPropAt(i)
                  if m_ar_NonTradableItems.findPos(t_iType) or t_iType < 40000 then
                    t_iBlend = 50
                  else
                    t_iBlend = 100
                  end if
                  t_ar_rThumbs.add([#thumbnail: a_mp_iType_rImage[i], #blend: t_iBlend, #items: m_mp_iRef_rInvItems[t_iOffset + i][#items]])
                end repeat
              else
                repeat with i = 1 to t_iCount
                  if m_ar_NonTradableItems.findPos(a_mp_iType_rImage.getPropAt(i)) then
                    t_iBlend = 50
                  else
                    t_iBlend = 100
                  end if
                  t_ar_rThumbs.add([#thumbnail: a_mp_iType_rImage[i], #blend: t_iBlend, #items: m_mp_iRef_rInvItems[t_iOffset + i][#items]])
                end repeat
              end if
            else
              repeat with i = 1 to t_iCount
                if m_ar_NonTradableItems.findPos(a_mp_iType_rImage.getPropAt(i)) then
                  t_iBlend = 50
                else
                  t_iBlend = 100
                end if
                t_ar_rThumbs.add([#thumbnail: a_mp_iType_rImage[i], #blend: t_iBlend, #items: m_mp_iRef_rInvItems[t_iOffset + i][#items]])
              end repeat
            end if
          end if
          m_rGridInvItems.render(t_ar_rThumbs, m_rWindow.getElement("tra.objects"))
        end if
      end if
    end if
  end if
end
on setField me, t_rWindow, t_sFieldName, t_sText
  if objectp(t_rWindow) then
    t_rTitleElem = t_rWindow.getElement(t_sFieldName)
    if t_rTitleElem <> 0 then
      t_rTitleElem.setText(t_sText)
    end if
  end if
end
on changeImageInElement me, tWndObj, tElemName, tmember
  if objectp(tWndObj) then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.ink = 36
        tSprite.member.image = tmember.image
        tSprite.member.regPoint = tmember.regPoint
        tSprite.width = tmember.width
        tSprite.height = tmember.height
      end if
    end if
  end if
end
on seconds2time me, a_iSeconds
  t_iSeconds = a_iSeconds mod 60
  t_iMinutes = a_iSeconds / 60 mod 60
  t_iHours = a_iSeconds / 3600
  t_iiSeconds = t_iSeconds
  t_iiMinutes = t_iMinutes
  t_iiHours = t_iHours
  if t_iSeconds < 10 then
    t_iiSeconds = "0" & t_iSeconds
  end if
  if t_iMinutes < 10 then
    t_iiMinutes = "0" & t_iMinutes
  end if
  if t_iHours < 10 then
    t_iiHours = "0" & t_iHours
  end if
  return [#h: t_iHours, #m: t_iMinutes, #s: t_iSeconds, #hh: t_iiHours, #mm: t_iiMinutes, #ss: t_iiSeconds]
end