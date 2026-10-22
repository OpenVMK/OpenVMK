-- Script
property m_rWindow
property m_iSelected
property m_rGridRenderer
property m_ar_iClothsToBeLoaded
property m_mp_kType_mp_iRef_rItem
property m_rClothAssetManager
property m_rClothPreviewRenderer
property m_rGridLoadAnimator
property m_bLoadingThumbs
property m_iLoadingRequest
property m_iItemsPerPage
property m_iCurrentPage
property m_sWriterID
property m_sWriter2Id

on construct this
  m_rWindow = VOID
  m_iSelected = -1
  m_iItemsPerPage = 12
  m_iCurrentPage = 1
  m_bLoadingThumbs = 1
  m_iLoadingRequest = 0
  m_rGridRenderer = createObject("InvClothesThumbGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  m_rClothAssetManager = getThread(#AvatarFactory).component.GetClothAssetManager()
  m_rClothPreviewRenderer = createObject("ClothesPreviewsRenderer", "CGenericThumbnailGrid")
  m_rGridLoadAnimator = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_ar_iClothsToBeLoaded = []
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
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  if writerExists(m_sWriterID) then
    removeWriter(m_sWriterID)
  end if
  if writerExists(m_sWriter2Id) then
    removeWriter(m_sWriter2Id)
  end if
  if objectp(m_rClothPreviewRenderer) then
    removeObject(m_rClothPreviewRenderer.getID())
    m_rClothPreviewRenderer = VOID
  end if
  removeObject(m_rGridLoadAnimator.getID())
  m_rGridLoadAnimator = VOID
  removeObject(m_rGridRenderer.getID())
  m_rGridRenderer = VOID
  m_mp_kType_mp_iRef_rItem = VOID
  m_ar_iClothsToBeLoaded = VOID
  m_rClothAssetManager = VOID
  return 1
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  if m_rWindow.merge("vmk_inv_clothes.window") then
    getThread("inventory").component.GetInventory(2).RegisterItemListCallback(this, #UpdateWornClothes)
    return 1
  else
    return 0
  end if
end
on Purge this, a_rWindow
  m_rWindow = VOID
  getThread("inventory").component.GetInventory(2).UnregisterItemListCallback(this, #UpdateWornClothes)
  return a_rWindow.unmerge()
end
on UpdateWornClothes this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    if a_kAlteredCategory = #clothes then
      t_iCount = a_mp_kType_mp_iRef_rItem[#clothes].count
      if t_iCount > 0 then
        t_iCode = a_mp_kType_mp_iRef_rItem[#clothes][1].code
        m_rWindow.getElement("inv.clothes.onavatar1").setText(getText("item." & t_iCode))
      else
        m_rWindow.getElement("inv.clothes.onavatar1").setText(EMPTY)
      end if
      if t_iCount > 1 then
        t_iCode = a_mp_kType_mp_iRef_rItem[#clothes][2].code
        m_rWindow.getElement("inv.clothes.onavatar2").setText(getText("item." & t_iCode))
      else
        m_rWindow.getElement("inv.clothes.onavatar2").setText(EMPTY)
      end if
      if t_iCount > 2 then
        t_iCode = a_mp_kType_mp_iRef_rItem[#clothes][3].code
        m_rWindow.getElement("inv.clothes.onavatar3").setText(getText("item." & t_iCode))
      else
        m_rWindow.getElement("inv.clothes.onavatar3").setText(EMPTY)
      end if
      if t_iCount > 3 then
        t_iCode = a_mp_kType_mp_iRef_rItem[#clothes][4].code
        m_rWindow.getElement("inv.clothes.onavatar4").setText(getText("item." & t_iCode))
      else
        m_rWindow.getElement("inv.clothes.onavatar4").setText(EMPTY)
      end if
    end if
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
    if a_kAlteredCategory = #clothes then
      if objectp(m_rWindow) then
        t_mp_iRef_rCloth = a_mp_kType_mp_iRef_rItem.getaProp(#clothes)
        t_iCount = t_mp_iRef_rCloth.count
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
          t_mp_iType_rThumb.addProp(t_mp_iRef_rCloth[i].code, VOID)
        end repeat
        m_rGridLoadAnimator.SetBufferElement(m_rWindow.getElement("thumbs.grid.b"))
        receiveUpdate(m_rGridLoadAnimator.getID())
        m_bLoadingThumbs = 1
        m_iLoadingRequest = m_iLoadingRequest + 1
        executeMessage("GetClothThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #ThumbsLoaded, #request: m_iLoadingRequest])
        m_rWindow.getElement("inv.page.number").setText(m_iCurrentPage & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
      end if
    end if
  end if
end
on ThumbsLoaded this, a_mp_iType_rThumb, a_rCallback
  if this.valid then
    if m_iLoadingRequest = a_rCallback[#request] then
      if objectp(m_rGridLoadAnimator) then
        m_rGridLoadAnimator.SetBufferElement(VOID)
        removeUpdate(m_rGridLoadAnimator.getID())
      end if
      m_bLoadingThumbs = 0
      if objectp(m_rWindow) and listp(a_mp_iType_rThumb) then
        t_ar_rThumbs = []
        t_iCount = a_mp_iType_rThumb.count
        t_iOffset = (m_iCurrentPage - 1) * m_iItemsPerPage
        t_ar_rItems = getThread("inventory").component.GetInventory(1).GetItemListByCategory(#clothes)
        t_ar_rDetails = getThread("inventory").component.GetInventory(1).GetItemDetailsByCategory(#clothes)
        repeat with i = 1 to t_iCount
          t_iID = string(a_mp_iType_rThumb.getPropAt(i))
          t_rThumb = a_mp_iType_rThumb[i]
          if voidp(t_rThumb) then
            if objectExists("ClothesThumbCache") then
              t_mp_rData = getObject("ClothesThumbCache").GetCachedItem(t_iID)
              if listp(t_mp_rData) then
                if t_mp_rData.findPos(#thumb) > 0 then
                  t_rThumb = t_mp_rData.thumb
                end if
              end if
            end if
          end if
          t_rItem = t_ar_rItems[i]
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
          t_rItem = m_mp_kType_mp_iRef_rItem[#clothes][t_iOffset + i]
          t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: 100, #items: t_rItem[#items], #group: t_rItem[#group]])
        end repeat
        m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("thumbs.grid.b"))
        this.ShowSelected()
      end if
    end if
  end if
end
on GetSelected this
  if objectp(m_rGridRenderer) then
    t_iSlot = m_rGridRenderer.GetSelected() + (m_iCurrentPage - 1) * m_iItemsPerPage
    if t_iSlot > 0 and t_iSlot <= m_mp_kType_mp_iRef_rItem[#clothes].count then
      return m_mp_kType_mp_iRef_rItem[#clothes][t_iSlot]
    end if
  end if
  return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
end
on ShowSelected this
  t_rItem = this.GetSelected()
  t_iCode = t_rItem.code
  t_rBack = getMember("previewbox").image.duplicate()
  if t_iCode < 0 then
    m_rWindow.getElement("inv.preview").feedImage(t_rBack)
    m_rWindow.getElement("inv.clothes.info").setText(EMPTY)
  else
    t_rInput = [:]
    t_rInput.setaProp(t_iCode, VOID)
    executeMessage("GetClothPreview", t_rInput, [#client: this.getID(), #method: #ShowSelectedImage])
  end if
end
on ShowSelectedImage this, a_mp_Data
  t_rPrev = a_mp_Data[1]
  t_rItem = this.GetSelected()
  t_iCode = t_rItem.code
  t_rBack = getMember("previewbox").image.duplicate()
  if ilk(t_rPrev) = #image then
    t_iOffX = (t_rBack.width - t_rPrev.width) / 2
    t_iOffY = (t_rBack.height - t_rPrev.height) / 2
    t_rBack.useAlpha = 0
    t_rBack.copyPixels(t_rPrev, t_rPrev.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], t_rPrev.rect, [#useFastQuads: 1])
    m_rWindow.getElement("inv.preview").feedImage(t_rBack)
  end if
  m_rWindow.getElement("inv.clothes.info").setText(getText("item." & t_iCode, EMPTY))
  if getThread("inventory").getComponent().GetRedeemPrice(t_iCode) then
    t_iItemPrice = getThread("inventory").getComponent().GetRedeemPrice(t_iCode)
  else
    t_iItemPrice = -1
  end if
  m_rWindow.getElement("inv.sell.button").setProperty(#blend, 50 + (t_iItemPrice > -1) * 50)
  m_iSelected = t_rItem.ref
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "thumbs.grid.b":
      if not m_bLoadingThumbs then
        m_rGridRenderer.MouseSelection(a_vParam)
        this.ShowSelected()
      end if
    "inv.sell.button":
      getConnection("VMK").send("SellItemRequest", [#int: this.GetSelected().ref])
    "inv.customize.button":
      executeMessage("ui_AvatarBuilder")
    "inv.grid.next":
      if m_mp_kType_mp_iRef_rItem[#clothes].count > m_iCurrentPage * m_iItemsPerPage then
        m_iCurrentPage = m_iCurrentPage + 1
        this.update(m_mp_kType_mp_iRef_rItem, #clothes)
      end if
    "inv.grid.prev":
      if m_iCurrentPage > 1 then
        m_iCurrentPage = m_iCurrentPage - 1
        this.update(m_mp_kType_mp_iRef_rItem, #clothes)
      end if
    "help":
      executeMessage("ui_help", "help.inventory.clothes")

  end case
end
on AssetsLoaded this, a_iCloth
  if objectp(m_rWindow) then
    m_ar_iClothsToBeLoaded.deleteOne(a_iCloth)
    if m_ar_iClothsToBeLoaded.count = 0 then
      m_rGridRenderer.render(m_mp_kType_mp_iRef_rItem.getaProp(#clothes), m_rWindow.getElement("thumbs.grid.b"))
    end if
  end if
end