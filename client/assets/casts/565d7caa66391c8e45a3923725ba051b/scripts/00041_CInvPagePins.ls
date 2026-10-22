-- Parent Script
property m_kMode
property m_kActive
property m_rWindow
property m_iSelected
property m_rGridRenderer
property m_rWornRenderer
property m_rPrevBackImage
property m_iLoadingRequest
property m_iItemsPerPage
property m_iCurrentPage
property m_mp_kType_mp_iRef_rItem
property m_sWriterID
property m_sWriter2Id

on construct this
  m_kMode = #select
  m_kActive = #pins
  m_rWindow = VOID
  m_iSelected = -1
  m_iItemsPerPage = 16
  m_iCurrentPage = 1
  m_iLoadingRequest = 0
  if objectExists("PinThumbGrid") then
    removeObject("PinThumbGrid")
  end if
  if objectExists("WornPinThumbGrid") then
    removeObject("WornPinThumbGrid")
  end if
  m_rGridRenderer = createObject("PinThumbGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  m_rWornRenderer = createObject("WornPinThumbGrid", "CGenericThumbnailGrid")
  m_mp_kType_mp_iRef_rItem = [#pins: [:]]
  if memberExists("previewbox") then
    m_rPrevBackImage = getMember("previewbox").image.duplicate()
  else
    m_rPrevBackImage = image(100, 100, 32)
  end if
  m_sWriterID = getUniqueID()
  m_sWriter2Id = getUniqueID()
  t_rPlain = getStructVariable("struct.font.plain")
  t_rMetrics = [#font: t_rPlain.getaProp(#font), #fontStyle: t_rPlain.getaProp(#fontStyle), #color: rgb(250, 250, 250), #bgColor: rgb(225, 255, 255), #fixedLineSpace: 15]
  createWriter(m_sWriterID, t_rMetrics)
  t_rMetrics = [#font: t_rPlain.getaProp(#font), #fontStyle: t_rPlain.getaProp(#fontStyle), #color: rgb(2, 2, 2), #bgColor: rgb(225, 255, 255), #fixedLineSpace: 15]
  createWriter(m_sWriter2Id, t_rMetrics)
  return 1
end
on deconstruct this
  repeat with tPin in m_mp_kType_mp_iRef_rItem[#pins]
    tPin.setaProp(#state, #normal)
  end repeat
  if writerExists(m_sWriterID) then
    removeWriter(m_sWriterID)
  end if
  if writerExists(m_sWriter2Id) then
    removeWriter(m_sWriter2Id)
  end if
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  if objectp(m_rGridRenderer) then
    removeObject(m_rGridRenderer.getID())
    m_rGridRenderer = VOID
  end if
  if objectp(m_rWornRenderer) then
    removeObject(m_rWornRenderer.getID())
    m_rWornRenderer = VOID
  end if
  m_mp_kType_mp_iRef_rItem = [:]
  return 1
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  m_kMode = #select
  if m_rWindow.merge("vmk_inv_pins.window") then
    m_rGridRenderer.render([:], m_rWindow.getElement("thumbs.grid.b"))
    m_rWornRenderer.render([:], m_rWindow.getElement("thumbs.grid.h"))
    m_rWindow.getElement("inv.cancelcombine.button").setProperty(#visible, 0)
    getThread("inventory").component.GetInventory(3).RegisterItemListCallback(this, #UpdateWornPins)
    return 1
  else
    return 0
  end if
end
on Purge this, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    getThread("inventory").component.GetInventory(3).UnregisterItemListCallback(this, #UpdateWornPins)
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on UpdateWornPins this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    case a_kAlteredCategory of
      #pins:
        t_mp_iRef_rItem = getThread("inventory").component.GetInventory(3).GetItemListByCategory(#pins)
        t_mp_iType_rThumb = [:]
        t_iCount = t_mp_iRef_rItem.count
        repeat with i = 1 to t_iCount
          t_mp_iType_rThumb.addProp(t_mp_iRef_rItem[i].code, VOID)
        end repeat
        executeMessage("GetPinThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_WornPinThumbsReadyCbk])
        if t_mp_iRef_rItem.count > 0 then
          m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 50)
        else
          m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 50)
        end if

    end case
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
  if objectp(m_rWindow) then
    case a_kAlteredCategory of
      #pins:
        t_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem.getaProp(#pins)
        t_iCount = t_mp_iRef_rItem.count
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
        t_mp_iType_rThumb = [:]
        repeat with i = t_iFirst to t_iLast
          t_mp_iType_rThumb.addProp(t_mp_iRef_rItem[i].code, VOID)
        end repeat
        m_iLoadingRequest = m_iLoadingRequest + 1
        executeMessage("GetPinThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_PinThumbsReadyCbk, #request: m_iLoadingRequest])
        m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 50)
        this._ActivateWornPinWindow(1)
        m_rWindow.getElement("inv.page.number").setText(m_iCurrentPage & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
        this.UpdateWornPins([:], #pins)

    end case
  end if
end
on GetSelected this
  if m_kActive = #pins then
    if objectp(m_rGridRenderer) then
      t_iSlot = m_rGridRenderer.GetSelected() + (m_iCurrentPage - 1) * m_iItemsPerPage
      if t_iSlot > 0 and t_iSlot <= m_mp_kType_mp_iRef_rItem.getaProp(#pins).count then
        return m_mp_kType_mp_iRef_rItem.getaProp(#pins)[t_iSlot]
      end if
    end if
  else
    if objectp(m_rWornRenderer) then
      t_iSlot = m_rWornRenderer.GetSelected()
      t_mp_wornPins = getThread("inventory").component.GetInventory(3).GetItemListByCategory(#pins)
      if t_iSlot > 0 and t_iSlot <= t_mp_wornPins.count then
        return t_mp_wornPins[t_iSlot]
      end if
    end if
  end if
  return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
end
on ShowSelected this
  t_rItem = this.GetSelected()
  t_iCode = t_rItem.code
  t_rBack = m_rPrevBackImage.duplicate()
  if t_iCode < 0 then
    m_rWindow.getElement("inv.preview").feedImage(t_rBack)
    m_rWindow.getElement("inv.pin.info").setText(EMPTY)
    m_rWindow.getElement("inv.wear.button").setProperty(#blend, 50)
    m_rWindow.getElement("inv.sell.button").setProperty(#blend, 50)
    m_rWindow.getElement("inv.combine.button").setProperty(#blend, 50)
  else
    t_rInput = [:]
    t_rInput.setaProp(t_iCode, VOID)
    executeMessage("GetPinPreview", t_rInput, [#client: this.getID(), #method: #_PinPreviewReady])
    t_mp_wornPins = getThread("inventory").component.GetInventory(3).GetItemListByCategory(#pins)
    if t_rItem.getaProp(#param) > 0 and m_kActive = #pins then
      m_rWindow.getElement("inv.combine.button").setProperty(#blend, 100)
    else
      m_rWindow.getElement("inv.combine.button").setProperty(#blend, 50)
    end if
    if t_mp_wornPins.count = 15 or m_kActive = #worn_pins then
      m_rWindow.getElement("inv.wear.button").setProperty(#blend, 50)
    else
      m_rWindow.getElement("inv.wear.button").setProperty(#blend, 100)
    end if
    m_rWindow.getElement("expiredate.info").setProperty(#visible, 1)
    m_rWindow.getElement("singleuse").setProperty(#visible, 0)
    if t_rItem.getaProp(#param) > 0 and (m_kActive = #pins or m_kActive = #worn_pins) then
      if integerp(t_rItem.getaProp(#param)) then
        m_rWindow.getElement("singleuse").setProperty(#visible, 1)
        m_rWindow.getElement("singleuse").feedImage(getMember("inv.pin.star.prev").image)
        m_rWindow.getElement("expiredate.info").setText(getText("magic.pin.info.text"))
      end if
    else
      m_rWindow.getElement("expiredate.info").setText(getText("normal.pin.info.text"))
    end if
    m_rWindow.getElement("fastpass").setProperty(#visible, 0)
    m_rWindow.getElement("fastpass.info").setProperty(#visible, 0)
    if t_rItem.getaProp(#singleuse) and (m_kActive = #pins or m_kActive = #worn_pins) then
      m_rWindow.getElement("inv.combine.button").setProperty(#blend, 50)
      m_rWindow.getElement("singleuse").setProperty(#visible, 1)
      m_rWindow.getElement("singleuse").feedImage(getMember("icon.singleuse").image)
      t_iExpiryDate = t_rItem.getaProp(#expirydate)
      if t_iExpiryDate <> -1 then
        t_iHours = t_iExpiryDate / 3600
        t_IDaysLeft = t_iHours / 24
        t_sTxt = getText("singleuse.expiry.info.text") & RETURN & t_IDaysLeft && getText("days.left.text")
        m_rWindow.getElement("expiredate.info").setText(t_sTxt)
        t_iRef = t_rItem.ref
        if m_kActive = #worn_pins then
          t_sCategory = #wornPins
        else
          t_sCategory = #itemInventory
        end if
        t_rDetails = getThread("inventory").getComponent().GetInventory(1).GetItemDetails(#pins, t_rItem.group)
        if not voidp(t_rDetails) then
          t_sTicketGoodFor = t_rDetails.getaProp("goodfor")
        else
          t_sTicketGoodFor = VOID
        end if
        if not voidp(t_sTicketGoodFor) then
          m_rWindow.getElement("fastpass").setProperty(#visible, 1)
          t_Img = getMember("icon.fastpass").image
          m_rWindow.getElement("fastpass").feedImage(t_Img)
          m_rWindow.getElement("inv.cancelcombine.button").setProperty(#visible, 0)
          m_rWindow.getElement("fastpass.info").setProperty(#visible, 1)
          t_sTxt = getText("tickets.goodfor") & RETURN & t_sTicketGoodFor & getText("room.tickets.for.room")
          m_rWindow.getElement("fastpass.info").setText(t_sTxt)
        else
          m_rWindow.getElement("fastpass").setProperty(#visible, 0)
          m_rWindow.getElement("fastpass.info").setProperty(#visible, 0)
        end if
      else
        t_sTxt = getText("singleuse.info.text")
        m_rWindow.getElement("expiredate.info").setText(t_sTxt)
      end if
    end if
  end if
  if m_kActive = #pins then
    if getThread("inventory").getComponent().GetRedeemPrice(t_iCode) then
      t_iItemPrice = getThread("inventory").getComponent().GetRedeemPrice(t_iCode)
    else
      t_iItemPrice = -1
    end if
    m_rWindow.getElement("inv.sell.button").setProperty(#blend, 50 + (t_iItemPrice > -1) * 50)
  else
    m_rWindow.getElement("inv.sell.button").setProperty(#blend, 50)
  end if
  m_rWindow.getElement("inv.pin.info").setText(getText("item." & t_iCode, EMPTY))
  m_iSelected = t_rItem.ref
end
on _ActivateWornPinWindow me, t_bState
  t_mp_wornPins = getThread("inventory").component.GetInventory(3).GetItemListByCategory(#pins)
  if t_bState then
    repeat with tPin in t_mp_wornPins
      tPin.setaProp(#state, #normal)
    end repeat
    m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 100)
  else
    repeat with tPin in t_mp_wornPins
      tPin.setaProp(#state, #invalid)
    end repeat
    m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 50)
  end if
  return 1
end
on _PinThumbsReadyCbk this, a_mp_iType_rThumb
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    t_rStar = getMember("inv.pin.star.thumb").image
    t_rRect = t_rStar.rect
    t_iOffset = (m_iCurrentPage - 1) * m_iItemsPerPage
    t_rDetails = getThread("inventory").component.GetInventory(1).GetItemDetailsByCategory(#pins)
    repeat with i = 1 to t_iCount
      t_rThumb = a_mp_iType_rThumb[i]
      t_rItem = m_mp_kType_mp_iRef_rItem[#pins][t_iOffset + i]
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
      t_rDetail = t_rDetails[t_rItem[#group]]
      if not voidp(t_rThumb) then
        if not voidp(t_rDetail) then
          if not voidp(t_rDetail["lvl"]) then
            t_rThumb = t_rThumb.duplicate()
            t_rThumb.useAlpha = 0
            t_sLevel = getText("vmks.thumb.lvl", "LVL") && t_rDetail["lvl"]
            t_rText = getWriter(m_sWriter2Id).render(t_sLevel)
            t_rRect = t_rText.rect
            t_rcItemSize = t_rThumb.rect
            t_rcOff = rect(0, 0, 0, 0)
            t_rcRightCorner = t_rcOff + [t_rcItemSize[3] + 7, t_rcItemSize[4], t_rcItemSize[3] + 7, t_rcItemSize[4]]
            t_rcTextCorner = [-t_rRect[3], -t_rRect[4], -t_rRect[3], -t_rRect[4]]
            t_rThumb.copyPixels(t_rText, t_rRect + t_rcRightCorner + t_rcTextCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
            t_rText = getWriter(m_sWriterID).render(t_sLevel)
            t_rRect = t_rText.rect
            t_rcTextCorner = t_rcTextCorner + [-1, -1, -1, -1]
            t_rThumb.copyPixels(t_rText, t_rRect + t_rcRightCorner + t_rcTextCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
          end if
        end if
      end if
      if t_rItem.state = #normal then
        t_iBlend = 100
      else
        t_iBlend = 50
      end if
      t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: t_iBlend, #items: t_rItem[#items], #group: t_rItem[#group]])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("thumbs.grid.b"))
    this.ShowSelected()
  end if
end
on _WornPinThumbsReadyCbk this, a_mp_iType_rThumb
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    t_rStar = getMember("inv.pin.star.thumb").image
    t_rRect = t_rStar.rect
    t_ar_rItems = getThread("inventory").component.GetInventory(3).GetItemListByCategory(#pins)
    t_ar_rDetails = getThread("inventory").component.GetInventory(3).GetItemDetailsByCategory(#pins)
    repeat with i = 1 to t_iCount
      t_rThumb = a_mp_iType_rThumb[i]
      t_rItem = t_ar_rItems[i]
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
      t_rDetail = t_ar_rDetails[t_rItem[#group]]
      if not voidp(t_rThumb) then
        if not voidp(t_rDetail) then
          if not voidp(t_rDetail["lvl"]) then
            t_rThumb = t_rThumb.duplicate()
            t_rThumb.useAlpha = 0
            t_sLevel = getText("vmks.thumb.lvl", "LVL") && t_rDetail["lvl"]
            t_rText = getWriter(m_sWriter2Id).render(t_sLevel)
            t_rRect = t_rText.rect
            t_rcItemSize = t_rThumb.rect
            t_rcOff = rect(0, 0, 0, 0)
            t_rcRightCorner = t_rcOff + [t_rcItemSize[3] + 7, t_rcItemSize[4], t_rcItemSize[3] + 7, t_rcItemSize[4]]
            t_rcTextCorner = [-t_rRect[3], -t_rRect[4], -t_rRect[3], -t_rRect[4]]
            t_rThumb.copyPixels(t_rText, t_rRect + t_rcRightCorner + t_rcTextCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
            t_rText = getWriter(m_sWriterID).render(t_sLevel)
            t_rRect = t_rText.rect
            t_rcTextCorner = t_rcTextCorner + [-1, -1, -1, -1]
            t_rThumb.copyPixels(t_rText, t_rRect + t_rcRightCorner + t_rcTextCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
          end if
        end if
      end if
      t_ar_rThumbs.add([#thumbnail: t_rThumb, #group: t_rItem[#group], #blend: 100])
    end repeat
    m_rWornRenderer.render(t_ar_rThumbs, m_rWindow.getElement("thumbs.grid.h"))
    this.ShowSelected()
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
    t_rSelected = this.GetSelected()
    if integerp(t_rSelected.getaProp(#param)) then
      t_rStar = getMember("inv.pin.star.prev").image
      t_rRect = t_rStar.rect
      t_rcOff = [20, 115, 20, 115]
      repeat with s = 1 to t_rSelected.getaProp(#param)
        t_rBack.copyPixels(t_rStar, t_rRect + t_rcOff + [(s - 1) * (t_rRect.width + 2) + 3, 0, (s - 1) * (t_rRect.width + 2) + 3, 0], t_rRect, [#ink: 36, #useFastQuads: 1])
      end repeat
    end if
    m_rWindow.getElement("inv.preview").feedImage(t_rBack)
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "thumbs.grid.b":
      m_rWornRenderer.Unselect()
      m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 50)
      m_kActive = #pins
      if the doubleClick then
        t_rSelected = this.GetSelected()
        if t_rSelected.state <> #invalid then
          getConnection("VMK").send("WearPin", [#int: t_rSelected.ref])
        end if
      end if
      case m_kMode of
        #select:
          m_rGridRenderer.MouseSelection(a_vParam)
          this.ShowSelected()
        #Combine:
          t_iOriginal = m_iSelected
          t_rOriginal = m_mp_kType_mp_iRef_rItem[#pins].getaProp(t_iOriginal)
          m_rGridRenderer.MouseSelection(a_vParam)
          t_rItem = this.GetSelected()
          m_rWindow.getElement("inv.cancelcombine.button").setProperty(#visible, 0)
          m_rWindow.getElement("inv.combine.button").setProperty(#visible, 1)
          m_rWindow.getElement("inv.wear.button").setProperty(#blend, 100)
          m_rWindow.getElement("inv.sell.button").setProperty(#blend, 100)
          if t_rItem.state = #normal then
            if t_iOriginal <> t_rItem.ref then
              t = createDialogWindow(this.getID(), "pins.combine.dialog", 2, 1)
              t_sTitle = getText("inv.pins.combine.dialog.title")
              t_sText = getText("inv.pins.combine.dialog.text")
              t_rBtn1 = [#text: getText("inv.pins.combine.dialog.btnCancel"), #eventID: #dialogCancel, #data: EMPTY]
              t_rBtn2 = [#text: getText("inv.pins.combine.dialog.btnOK"), #eventID: #dialogOK, #data: [#int: t_iOriginal, #int: t_rItem.ref]]
              t.setText(t_sText, t_sTitle, t_rBtn1, t_rBtn2)
              t.show()
              this._ActivateWornPinWindow(1)
            end if
          else
            t = createDialogWindow(this.getID(), "ErrorDialog", 1, 0)
            t.show()
            t_sTxt = getText("error.4525")
            t.setText(t_sTxt, "Error", "OK")
            this._ActivateWornPinWindow(1)
            repeat with tPin in m_mp_kType_mp_iRef_rItem[#pins]
              tPin.setaProp(#state, #normal)
            end repeat
            this.update(m_mp_kType_mp_iRef_rItem, #pins)
          end if
          this.ShowSelected()
          m_kMode = #select

      end case
    "thumbs.grid.h":
      m_kActive = #worn_pins
      m_rGridRenderer.Unselect()
      m_rWornRenderer.MouseSelection(a_vParam)
      this.ShowSelected()
      t_iSelected = m_rWornRenderer.GetSelected()
      t_rSelected = this.GetSelected()
      t_mp_wornPins = getThread("inventory").component.GetInventory(3).GetItemListByCategory(#pins)
      if t_iSelected > 0 and t_iSelected <= t_mp_wornPins.count then
        m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 100)
        if the doubleClick then
          getConnection("VMK").send("UnwearPin", [#int: t_rSelected.ref])
        end if
      else
        m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 50)
        m_rWindow.getElement("inv.combine.button").setProperty(#blend, 50)
      end if
    "inv.wear.button":
      t_rSelected = this.GetSelected()
      if t_rSelected.state <> #invalid then
        getConnection("VMK").send("WearPin", [#int: t_rSelected.ref])
      end if
    "inv.sell.button":
      t_rSelected = this.GetSelected()
      if t_rSelected.state <> #invalid then
        getConnection("VMK").send("SellItemRequest", [#int: t_rSelected.ref])
      end if
    "inv.takeoff.button":
      t_iSelected = m_rWornRenderer.GetSelected()
      t_mp_wornPins = getThread("inventory").component.GetInventory(3).GetItemListByCategory(#pins)
      if t_iSelected > 0 and t_iSelected <= t_mp_wornPins.count then
        getConnection("VMK").send("UnwearPin", [#int: t_mp_wornPins[t_iSelected].ref])
      end if
    "inv.combine.button":
      t_rItem = this.GetSelected()
      if t_rItem.param = 5 then
        t = createDialogWindow(this.getID(), "ErrorDialog", 1, 0)
        t.show()
        t.setText(getText("error.4527"), "Error", "OK")
        return 1
      end if
      m_kMode = #Combine
      m_rWindow.getElement("inv.pin.info").setText(getText("inv.select.combine"))
      m_rWindow.getElement("inv.cancelcombine.button").setProperty(#visible, 1)
      m_rWindow.getElement("inv.combine.button").setProperty(#visible, 0)
      m_rWindow.getElement("inv.wear.button").setProperty(#blend, 50)
      m_rWindow.getElement("inv.sell.button").setProperty(#blend, 50)
      repeat with tPin in m_mp_kType_mp_iRef_rItem[#pins]
        if tPin.getaProp(#code) <> t_rItem.getaProp(#code) then
          tPin.setaProp(#state, #invalid)
          next repeat
        end if
        if tPin.param + t_rItem.param > 5 then
          tPin.setaProp(#state, #invalid)
        end if
      end repeat
      this.update(m_mp_kType_mp_iRef_rItem, #pins)
      this._ActivateWornPinWindow(0)
    "inv.cancelcombine.button":
      m_rWindow.getElement("inv.cancelcombine.button").setProperty(#visible, 0)
      m_rWindow.getElement("inv.combine.button").setProperty(#visible, 1)
      m_rWindow.getElement("inv.takeoff.button").setProperty(#blend, 100)
      repeat with t_rPin in m_mp_kType_mp_iRef_rItem[#pins]
        t_rPin.setaProp(#state, #normal)
      end repeat
      this._ActivateWornPinWindow(1)
      this.ShowSelected()
      m_kMode = #select
      this.update(m_mp_kType_mp_iRef_rItem, #pins)
    "inv.grid.next":
      if m_mp_kType_mp_iRef_rItem[#pins].count > m_iCurrentPage * m_iItemsPerPage then
        m_iCurrentPage = m_iCurrentPage + 1
        this.update(m_mp_kType_mp_iRef_rItem, #pins)
      end if
    "inv.grid.prev":
      if m_iCurrentPage > 1 then
        m_iCurrentPage = m_iCurrentPage - 1
        this.update(m_mp_kType_mp_iRef_rItem, #pins)
      end if
    "help":
      executeMessage("ui_help", "help.inventory.pins")

  end case
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent, t_data
  case t_dialogName of
    "pins.combine.dialog":
      case t_dialogEvent of
        #dialogOK:
          getConnection("VMK").send("CombinePin", t_data)
        #dialogCancel:

      end case
      repeat with t_rPin in m_mp_kType_mp_iRef_rItem[#pins]
        t_rPin.setaProp(#state, #normal)
      end repeat
      this._ActivateWornPinWindow(1)
      m_kMode = #select
      this.update(m_mp_kType_mp_iRef_rItem, #pins)
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end