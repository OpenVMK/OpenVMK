-- Script
property m_sWndName
property m_rWindow
property m_rRadioButton
property m_mp_ItemData
property m_rGridRenderer
property m_mp_Tickets
property m_iRef
property m_rPrevBackImage
property m_mp_TicketInfo
property m_iTicketAmout

on construct me
  m_sWndName = "RoomTicketWnd"
  m_rWindow = VOID
  m_mp_ItemData = VOID
  m_mp_TicketInfo = [:]
  m_mp_Tickets = [:]
  m_iTicketAmout = 0
  m_rGridRenderer = createObject(getUniqueID(), "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  if memberExists("previewbox") then
    m_rPrevBackImage = getMember("previewbox").image.duplicate()
  else
    m_rPrevBackImage = image(100, 100, 32)
  end if
  me.regMsgList(1)
  return 1
end
on deconstruct me
  if windowExists(m_sWndName) then
    removeWindow(m_sWndName)
  end if
  if objectp(m_rGridRenderer) then
    removeObject(m_rGridRenderer.getID())
    m_rGridRenderer = VOID
  end if
  me.regMsgList(0)
end
on GetSelected this
  if objectp(m_rGridRenderer) then
    t_iSlot = m_rGridRenderer.GetSelected()
    if t_iSlot > 0 and t_iSlot <= m_mp_Tickets.count then
      return m_mp_Tickets[t_iSlot]
    end if
  end if
  return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
end
on show me
  if not objectp(m_rWindow) then
    createWindow(m_sWndName, "vmk_create_tickets.window", 0, 0)
    m_rWindow = getWindow(m_sWndName)
    m_rWindow.registerClient(me.getID())
    m_rWindow.registerProcedure(#EventProcTickets, me.getID(), #mouseDown)
    m_rWindow.center()
    me.createRadioButton()
    m_iTicketAmout = 0
    me.ChangeTicketAmount(1)
    t_mp_DataList = getThread("inventory").getComponent().GetInventory(1).GetItemListByCategory(#pins)
    if t_mp_DataList.count = 0 then
      getThread("inventory").component._LoadInventory()
    end if
    me.InventoryItemDetails()
  end if
end
on createRadioButton me
  if not objectp(m_rRadioButton) then
    m_rRadioButton = createObject(getUniqueID(), "CQuestRadioButton")
    t_ar_elements = []
    t_ar_elements.append([#element: "ticketpin.expiry1", #description: EMPTY, #value: 1])
    t_ar_elements.append([#element: "ticketpin.expiry2", #description: EMPTY, #value: 2])
    t_ar_elements.append([#element: "ticketpin.expiry3", #description: EMPTY, #value: 3])
    t_ar_elements.append([#element: "ticketpin.expiry4", #description: EMPTY, #value: 4])
    m_rRadioButton.addElements(t_ar_elements)
  end if
  m_rRadioButton.setParentWindow(m_rWindow)
  m_rRadioButton.clickElement("ticketpin.expiry1")
  m_rRadioButton.updateMenu()
end
on InventoryItemDetails me
  t_mp_sGroup_rItem = getThread("inventory").getComponent().GetInventory(1).GetItemListByCategory(#pins)
  t_mp_sGroup_rDetail = getThread("inventory").getComponent().GetInventory(1).GetItemDetailsByCategory(#pins)
  t_mp_iRef_rTicket = [:]
  repeat with i = 1 to t_mp_sGroup_rDetail.count
    t_rDetail = t_mp_sGroup_rDetail[i]
    if not voidp(t_rDetail["goodfor"]) then
      t_sGroup = t_mp_sGroup_rDetail.getPropAt(i)
      t_rGroup = t_mp_sGroup_rItem[t_sGroup]
      t_iRef = t_rGroup.ref
      t_mp_iRef_rTicket.addProp(t_iRef, t_rGroup)
    end if
  end repeat
  m_mp_Tickets = t_mp_iRef_rTicket
  if objectp(m_rWindow) then
    if listp(m_mp_Tickets) then
      me.ShowThumbs(m_mp_Tickets)
    end if
  end if
end
on ShowThumbs this, a_mp_sGroup_rItems
  if objectp(m_rWindow) then
    t_mp_iType_rThumb = [:]
    repeat with t_rItem in a_mp_sGroup_rItems
      t_mp_iType_rThumb.addProp(t_rItem[#code], VOID)
    end repeat
    executeMessage("GetPinThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_ThumbsReadyCbk])
  end if
end
on _ThumbsReadyCbk this, a_mp_iType_rThumb, a_rCallback
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    repeat with i = 1 to t_iCount
      t_ar_rThumbs.add([#thumbnail: a_mp_iType_rThumb[i], #blend: 100, #items: m_mp_Tickets[i][#items]])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("ticketpins.list"))
    this.ShowItemInfo()
    if a_mp_iType_rThumb.count = 0 then
      m_rWindow.getElement("ticketpins.sell.button").setProperty(#blend, 50)
    else
      m_rWindow.getElement("ticketpins.sell.button").setProperty(#blend, 100)
    end if
  end if
end
on ShowItemInfo this, a_vParam
  if objectp(m_rWindow) then
    m_rWindow.getElement("expiredate.info").setProperty(#visible, 0)
    m_rWindow.getElement("singleuse").setProperty(#visible, 0)
    if listp(m_mp_Tickets) then
      if not voidp(a_vParam) then
        m_rGridRenderer.MouseSelection(a_vParam)
        t_sItemId = this.GetSelected().code
      else
        t_sItemId = this.GetSelected().code
      end if
      if t_sItemId > -1 then
        if m_rWindow.elementExists("cat.item.info") then
          if textExists("product." & t_sItemId) then
            t_sTxt = getText("product." & t_sItemId)
          else
            t_sTxt = getText("item." & t_sItemId)
          end if
          m_rWindow.getElement("cat.item.info").setText(t_sTxt)
        end if
        if m_rWindow.elementExists("cat.item.prize") then
          t_sPrice = this.GetSelected().price
          t_sTxt = t_sPrice && getText("cat.credits")
          m_rWindow.getElement("cat.item.prize").setText(t_sTxt)
        end if
        t_iPos = this.GetSelected().findPos(#expirydate)
        if t_iPos > 0 then
          t_sExpireTime = getText("ticket.expires", "This expires in %days% day(s)")
          t_iExpiryDate = this.seconds2time(this.GetSelected().expirydate)
          t_sExpireTime = replaceChunks(t_sExpireTime, "%days%", t_iExpiryDate[#h] / 24)
          t_Img = getMember("icon.singleuse").image
          m_rWindow.getElement("singleuse").setProperty(#visible, 1)
          m_rWindow.getElement("expiredate.info").setProperty(#visible, 1)
          m_rWindow.getElement("singleuse").feedImage(t_Img)
          m_rWindow.getElement("expiredate.info").setText(t_sExpireTime)
        end if
      end if
      this.ShowSelected()
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
on _SellConfirmResponse this, a_rMsg
  t_mp_iCode_kCategory = [1: #items, 2: #clothes, 3: #posters, 4: #pins]
  t_bFromHK = a_rMsg.connection.GetIntFrom()
  t_bShowAlert = a_rMsg.connection.GetIntFrom()
  t_iPrc = a_rMsg.connection.GetIntFrom()
  t_iItemCount = a_rMsg.connection.GetIntFrom()
  t_iTyp = a_rMsg.connection.GetIntFrom()
  t_iRef = a_rMsg.connection.GetIntFrom()
  repeat with t_rTicket in m_mp_Tickets
    if t_rTicket.ref = t_iRef then
      if t_rTicket.items < 1 then
        m_mp_Tickets.deleteProp(t_iRef)
      end if
      exit repeat
    end if
  end repeat
  if objectp(m_rWindow) then
    this.ShowThumbs(m_mp_Tickets)
  end if
end
on ShowSelected this
  if objectp(m_rWindow) then
    t_iCode = this.GetSelected().code
    t_rInput = [:]
    t_rInput.setaProp(t_iCode, VOID)
    executeMessage("GetPinPreview", t_rInput, [#client: this.getID(), #method: #_PinPreviewReady])
    exit
    t_rPrev = t_rInput[1]
    if not voidp(t_rPrev) then
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
      t_rBack.copyPixels(t_rPrev, t_rcDest, t_rPrev.rect)
      m_rWindow.getElement("ticketpin.preview").feedImage(t_rBack)
    else
      t_rBack = getMember("previewbox.b").image.duplicate()
      m_rWindow.getElement("ticketpin.preview").feedImage(t_rBack)
    end if
  end if
end
on _PinPreviewReady this, a_mp_iType_rThumb
  if objectp(m_rWindow) then
    if a_mp_iType_rThumb.count then
      t_rBack = m_rPrevBackImage.duplicate()
      t_rPrev = a_mp_iType_rThumb[1]
      if voidp(t_rPrev) then
        t_rPrev = image(1, 1, 32)
      end if
      t_iOffX = (t_rBack.width - t_rPrev.width) / 2
      t_iOffY = (t_rBack.height - t_rPrev.height) / 2
      t_rBack.useAlpha = 0
      t_rBack.copyPixels(t_rPrev, t_rPrev.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], t_rPrev.rect, [#useFastQuads: 1])
    else
      t_rPrev = image(1, 1, 32)
    end if
    m_rWindow.getElement("ticketpin.preview").feedImage(t_rBack)
  end if
end
on ChangeTicketAmount me, a_iAmount
  m_iTicketAmout = m_iTicketAmout + a_iAmount
  if m_iTicketAmout < 1 then
    m_iTicketAmout = 1
  end if
  if m_iTicketAmout > 10 then
    m_iTicketAmout = 10
  end if
  if objectp(m_rWindow) then
    t_iPrice = integer(getText("room.ticket.price", 10))
    t_sTxt = m_iTicketAmout && getText("room.tickets") && t_iPrice * m_iTicketAmout && getText("room.tickets.credits")
    m_rWindow.getElement("tickets.amount").setText(t_sTxt)
  end if
end
on BuyTickets me
  t_iValue = m_rRadioButton.getValue()
  t_iAmount = m_iTicketAmout
  t_iPrice = integer(getText("room.ticket.price", 10))
  t_sMsg = getText("tickets.confirm.buy") & RETURN & t_iAmount && getText("room.tickets") && t_iPrice * m_iTicketAmout && getText("room.tickets.credits")
  t_wnd = createDialogWindow(me.getID(), "BuyTickets", 2, 1)
  t_wnd.show()
  t_sDialogHd = getText("tickets.buy.hd")
  t_sOk = getText("tickets.buy.ok")
  t_sCancel = getText("tickets.buy.cancel")
  t_wnd.setText(t_sMsg, t_sDialogHd, t_sCancel, t_sOk)
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent
  if t_dialogEvent = #dialogOK then
    t_iValue = m_rRadioButton.getValue()
    t_iAmount = m_iTicketAmout
    getConnection(getVariable("main.connection.id", "VMK")).send("CreateRoomTicket", [#int: t_iValue, #int: t_iAmount])
  end if
end
on EventProcTickets me, tEvent, tElemID, a_vParam
  tWndObj = getWindow("RoomTicketWnd")
  if objectp(tWndObj) then
    case tElemID of
      "ticketpins.sell.button":
        getConnection("VMK").send("SellItemRequest", [#int: me.GetSelected().ref])
      "close", "mes.accept.button":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sWndName)
        m_rWindow = VOID
        m_mp_TicketInfo = [:]
      "ticketpin.expiry1", "ticketpin.expiry2", "ticketpin.expiry3", "ticketpin.expiry4":
        m_rRadioButton.clickElement(tElemID)
        m_rRadioButton.updateMenu()
      "ticketpins.buy.button":
        me.BuyTickets()
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        executeMessage(#open_help_page, "help.tickets", 1)
      "ticketpins.list":
        me.ShowItemInfo(a_vParam)
      "tickets.amount.up":
        me.ChangeTicketAmount(1)
      "tickets.amount.down":
        me.ChangeTicketAmount(-1)

    end case
  end if
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2533, #InventoryItemDetails)
  tMsgs.setaProp(2538, #_SellConfirmResponse)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
end