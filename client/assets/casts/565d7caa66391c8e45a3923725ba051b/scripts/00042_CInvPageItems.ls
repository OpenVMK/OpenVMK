-- Script
property m_rWindow
property m_iSelected
property m_rGridRenderer
property m_rPrevBackImage
property m_rGridLoadAnim
property m_bLoadingThumbs
property m_iLoadingRequest
property m_iItemsPerPage
property m_iCurrentPage
property m_mp_kType_mp_iRef_rItem
property m_iLastTeleporterSelection
property m_iFirst
property m_iLast

on construct this
  m_rWindow = VOID
  m_iSelected = -1
  m_iFirst = 0
  m_iLast = 0
  if memberExists("previewbox") then
    m_rPrevBackImage = getMember("previewbox").image.duplicate()
  else
    m_rPrevBackImage = image(100, 100, 32)
  end if
  m_rGridRenderer = createObject("InvFurniThumbGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  m_rGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_iItemsPerPage = 16
  m_iCurrentPage = 1
  m_bLoadingThumbs = 1
  m_iLoadingRequest = 0
  m_mp_kType_mp_iRef_rItem = VOID
  m_iLastTeleporterSelection = VOID
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  removeObject(m_rGridRenderer.getID())
  m_rGridRenderer = VOID
  removeObject(m_rGridLoadAnim.getID())
  m_rGridLoadAnim = VOID
  return 1
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  if m_rWindow.merge("vmk_inv_furniture.window") then
    if getObject(#session).get("RoomType") = #public then
      m_rWindow.getElement("inv.place.button").setProperty(#blend, 50)
    else
      m_rWindow.getElement("inv.place.button").setProperty(#blend, 100)
    end if
    return 1
  else
    return 0
  end if
end
on Purge this, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return VOID
  end if
end
on close this
  if this.m_bReady then
    if this.m_kCurPageName = #items then
      executeMessage("teleport_unselected", m_iLastTeleporterSelection)
    end if
    return the ancestor of this.close()
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
  if a_kAlteredCategory = #items then
    if objectp(m_rWindow) then
      t_mp_iRef_rItem = m_mp_kType_mp_iRef_rItem.getaProp(#items)
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
      m_iFirst = (m_iCurrentPage - 1) * m_iItemsPerPage + 1
      m_iLast = min(m_iCurrentPage * m_iItemsPerPage, t_iCount)
      t_mp_iType_rThumb = [:]
      repeat with i = m_iFirst to m_iLast
        t_mp_iType_rThumb.addProp(t_mp_iRef_rItem[i].code, VOID)
      end repeat
      m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("thumbs.grid.b"))
      receiveUpdate(m_rGridLoadAnim.getID())
      m_bLoadingThumbs = 1
      m_iLoadingRequest = m_iLoadingRequest + 1
      executeMessage("GetFurniThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_FurniThumbsReadyCbk, #request: m_iLoadingRequest])
      if getObject(#session).get("RoomType") = #public then
        m_rWindow.getElement("inv.place.button").setProperty(#blend, 50)
      else
        m_rWindow.getElement("inv.place.button").setProperty(#blend, 100)
      end if
      m_rWindow.getElement("inv.page.number").setText(m_iCurrentPage & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
    end if
  end if
end
on GetSelected this
  if objectp(m_rGridRenderer) then
    t_iSlot = m_rGridRenderer.GetSelected() + (m_iCurrentPage - 1) * m_iItemsPerPage
    if t_iSlot > 0 and t_iSlot <= m_mp_kType_mp_iRef_rItem[#items].count then
      return m_mp_kType_mp_iRef_rItem[#items][t_iSlot]
    end if
  end if
  return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
end
on ShowSelected this
  t_rItem = this.GetSelected()
  t_iCode = t_rItem.code
  if t_iCode < 0 then
    m_rWindow.getElement("inv.preview").feedImage(m_rPrevBackImage)
    m_rWindow.getElement("inv.furniture.info").setText(EMPTY)
  else
    t_rInput = [:]
    t_rInput.setaProp(t_iCode, VOID)
    executeMessage("GetFurniPreview", t_rInput, [#client: this.getID(), #method: #_FurniPreviewReadyCbk])
    m_rWindow.getElement("inv.furniture.info").setText(getText("item." & t_iCode, EMPTY))
    if getThread("inventory").getComponent().GetRedeemPrice(t_iCode) then
      t_iItemPrice = getThread("inventory").getComponent().GetRedeemPrice(t_iCode)
    else
      t_iItemPrice = -1
    end if
    m_rWindow.getElement("inv.sell.button").setProperty(#blend, 50 + (t_iItemPrice > -1) * 50)
    if getObject(#session).get("RoomType") = #public then
      m_rWindow.getElement("inv.place.button").setProperty(#blend, 50)
    else
      m_rWindow.getElement("inv.place.button").setProperty(#blend, 100)
    end if
    m_iSelected = t_rItem.ref
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "thumbs.grid.b":
      if not m_bLoadingThumbs then
        m_rGridRenderer.MouseSelection(a_vParam)
        this.checkTeleporterSelection()
        this.ShowSelected()
      end if
    "inv.sell.button":
      getConnection("VMK").send("SellItemRequest", [#int: this.GetSelected().ref])
    "inv.place.button":
      if m_iSelected > -1 then
        registerMessage("place_element_end", this.getID(), #_PlaceElementCbk)
        registerMessage("place_element_failed", this.getID(), #_PlaceElementCbk)
        executeMessage("place_element_start", this.GetSelected().code)
        executeMessage("hide_inventory")
      end if
    "inv.grid.next":
      if m_mp_kType_mp_iRef_rItem[#items].count > m_iCurrentPage * m_iItemsPerPage then
        m_iCurrentPage = m_iCurrentPage + 1
        this.update(m_mp_kType_mp_iRef_rItem, #items)
      end if
    "inv.grid.prev":
      if m_iCurrentPage > 1 then
        m_iCurrentPage = m_iCurrentPage - 1
        this.update(m_mp_kType_mp_iRef_rItem, #items)
      end if
    "help":
      executeMessage("ui_help", "help.inventory.items")

  end case
end
on _PlaceElementCbk this, a_iBelow, a_vePos
  unregisterMessage("place_element_end", this.getID())
  unregisterMessage("place_element_failed", this.getID())
  executeMessage("show_inventory")
  if integerp(a_iBelow) then
    t_rParams = [#int: this.GetSelected().ref, #int: a_iBelow, #int: integer(a_vePos.x), #int: integer(a_vePos.y), #int: integer(a_vePos.z)]
    getConnection("VMK").send("PlaceItem", t_rParams)
  end if
end
on _FurniThumbsReadyCbk this, a_mp_iType_rThumb, a_rCallback
  if this.valid then
    if m_iLoadingRequest = a_rCallback[#request] then
      if objectp(m_rGridLoadAnim) then
        m_rGridLoadAnim.SetBufferElement(VOID)
        removeUpdate(m_rGridLoadAnim.getID())
      end if
      m_bLoadingThumbs = 0
      if objectp(m_rWindow) then
        t_ar_rThumbs = []
        t_iCount = a_mp_iType_rThumb.count
        t_iOffset = (m_iCurrentPage - 1) * m_iItemsPerPage
        repeat with i = 1 to t_iCount
          t_rItem = m_mp_kType_mp_iRef_rItem[#items][t_iOffset + i]
          t_ar_rThumbs.add([#thumbnail: a_mp_iType_rThumb[i], #blend: 100, #items: t_rItem[#items], #group: t_rItem[#group]])
        end repeat
        m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("thumbs.grid.b"))
        if this.m_rWindow.pVisible then
          this.checkTeleporterSelection()
        end if
        this.ShowSelected()
      end if
    end if
  end if
end
on _FurniPreviewReadyCbk this, a_mp_iType_rThumb
  if objectp(m_rWindow) then
    t_rPrev = a_mp_iType_rThumb[1]
    if not voidp(t_rPrev) then
      t_iOffX = (m_rPrevBackImage.width - t_rPrev.width) / 2
      t_iOffY = (m_rPrevBackImage.height - t_rPrev.height) / 2
      t_rcDest = t_rPrev.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
      if t_rcDest.bottom - t_rcDest.top > m_rPrevBackImage.rect.bottom - m_rPrevBackImage.rect.top or t_rcDest.right - t_rcDest.left > m_rPrevBackImage.rect.right - m_rPrevBackImage.rect.left then
        t_iWidthOverflow = t_rcDest.right - t_rcDest.left - (m_rPrevBackImage.rect.right - m_rPrevBackImage.rect.left)
        if t_iWidthOverflow > 0 then
          tScale = float(m_rPrevBackImage.rect.right - m_rPrevBackImage.rect.left) / float(t_rcDest.right - t_rcDest.left)
          t_rOffsetLeftCorner = [t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]
          t_rcDest = t_rcDest - t_rOffsetLeftCorner
          t_rcDest.top = integer(t_rcDest.top * tScale)
          t_rcDest.bottom = integer(t_rcDest.bottom * tScale)
          t_rcDest.left = integer(t_rcDest.left * tScale)
          t_rcDest.right = integer(t_rcDest.right * tScale)
        end if
        t_iHeightOverflow = t_rcDest.bottom - t_rcDest.top - (m_rPrevBackImage.rect.bottom - m_rPrevBackImage.rect.top)
        if t_iHeightOverflow > 0 then
          tScale = float(m_rPrevBackImage.rect.bottom - m_rPrevBackImage.rect.top) / float(t_rcDest.bottom - t_rcDest.top)
          t_rOffsetLeftCorner = [t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]
          t_rcDest = t_rcDest - t_rOffsetLeftCorner
          t_rcDest.top = integer(t_rcDest.top * tScale)
          t_rcDest.bottom = integer(t_rcDest.bottom * tScale)
          t_rcDest.left = integer(t_rcDest.left * tScale)
          t_rcDest.right = integer(t_rcDest.right * tScale)
        end if
        t_iDestMidX = m_rPrevBackImage.width / 2
        t_iDestMidY = m_rPrevBackImage.height / 2
        t_rcMove = [t_iDestMidX - t_rcDest.right / 2, t_iDestMidY - t_rcDest.bottom / 2, t_iDestMidX - t_rcDest.right / 2, t_iDestMidY - t_rcDest.bottom / 2]
        t_rcDest = t_rcDest + t_rcMove
      end if
      t_rBack = m_rPrevBackImage.duplicate()
      t_rBack.useAlpha = 0
      t_rBack.copyPixels(t_rPrev, t_rcDest, t_rPrev.rect, [#useFastQuads: 1])
      m_rWindow.getElement("inv.preview").feedImage(t_rBack)
    end if
  end if
end
on checkTeleporterSelection this
  t_rSelection = this.GetSelected()
  if t_rSelection.state <> #invalid then
    if not voidp(m_iLastTeleporterSelection) then
      executeMessage("teleport_unselected", m_iLastTeleporterSelection)
      m_iLastTeleporterSelection = VOID
    end if
    if not (t_rSelection.getaProp(#param) = 0) then
      tParams = t_rSelection.param
      if ilk(tParams, #list) then
        if tParams.count = 3 then
          if tParams[1] = 1 then
            executeMessage("teleport_selected", tParams[2])
            m_iLastTeleporterSelection = tParams[2]
          end if
        end if
      end if
    end if
    m_rGridRenderer.select(m_rGridRenderer.GetSelected())
  end if
end
on GetFirstItemInGrid this
  return m_iFirst
end
on GetLastItemInGrid this
  return m_iLast
end