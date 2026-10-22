-- Script
property m_rWindow
property m_iSelected
property m_rGridRenderer
property m_iLoadingRequest
property m_iItemsPerPage
property m_iCurrentPage
property m_mp_kType_mp_iRef_rItem

on construct this
  m_rWindow = VOID
  m_iSelected = -1
  m_mp_kType_mp_iRef_rItem = VOID
  m_iItemsPerPage = 16
  m_iCurrentPage = 1
  m_bLoadingThumbs = 1
  m_iLoadingRequest = 0
  m_rGridRenderer = createObject("PosterThumbGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  removeObject(m_rGridRenderer.getID())
  m_rGridRenderer = VOID
  return 1
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  if m_rWindow.merge("vmk_inv_posters.window") then
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
  m_rWindow = VOID
  return a_rWindow.unmerge()
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
  if a_kAlteredCategory = #posters then
    if objectp(m_rWindow) then
      t_mp_iRef_rItem = m_mp_kType_mp_iRef_rItem.getaProp(#posters)
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
      m_bLoadingThumbs = 1
      m_iLoadingRequest = m_iLoadingRequest + 1
      executeMessage("GetPosterThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_PosterThumbsReadyCbk, #request: m_iLoadingRequest])
      m_rWindow.getElement("inv.page.number").setText(m_iCurrentPage & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
    end if
  end if
end
on _PosterThumbsReadyCbk this, a_mp_iType_rThumb
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    t_iOffset = (m_iCurrentPage - 1) * m_iItemsPerPage
    repeat with i = 1 to t_iCount
      t_rThumb = a_mp_iType_rThumb[i]
      t_rItem = m_mp_kType_mp_iRef_rItem[#posters][t_iOffset + i]
      t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: 100, #items: t_rItem[#items], #group: t_rItem[#group]])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("thumbs.grid.b"))
    this.ShowSelected()
  end if
end
on GetSelected this
  if objectp(m_rGridRenderer) then
    t_iSlot = m_rGridRenderer.GetSelected() + (m_iCurrentPage - 1) * m_iItemsPerPage
    if t_iSlot > 0 and t_iSlot <= m_mp_kType_mp_iRef_rItem[#posters].count then
      return m_mp_kType_mp_iRef_rItem[#posters][t_iSlot]
    end if
  end if
  return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
end
on ShowSelected this
  t_rItem = this.GetSelected()
  t_iCode = t_rItem.code
  if t_iCode < 0 then
    m_rWindow.getElement("inv.preview").feedImage(getMember("previewbox").image.duplicate())
    m_rWindow.getElement("inv.posters.info").setText(EMPTY)
  else
    t_rInput = [:]
    t_rInput.setaProp(t_iCode, VOID)
    executeMessage("GetPosterPreview", t_rInput, [#client: this.getID(), #method: #_PosterPreviewReadyCbk])
    m_rWindow.getElement("inv.posters.info").setText(getText("item." & t_iCode, EMPTY))
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
on _PosterPreviewReadyCbk this, a_iRef_rImage
  t_rPrev = a_iRef_rImage[1]
  if not voidp(t_rPrev) then
    t_rBack = getMember("previewbox").image.duplicate()
    t_iOffX = (t_rBack.width - t_rPrev.width) / 2
    t_iOffY = (t_rBack.height - t_rPrev.height) / 2
    t_rBack.useAlpha = 0
    t_rBack.copyPixels(t_rPrev, t_rPrev.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], t_rPrev.rect, [#useFastQuads: 1])
    m_rWindow.getElement("inv.preview").feedImage(t_rBack)
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "thumbs.grid.b":
      m_rGridRenderer.MouseSelection(a_vParam)
      this.ShowSelected()
    "inv.sell.button":
      getConnection("VMK").send("SellItemRequest", [#int: this.GetSelected().ref])
    "inv.place.button":
      if m_iSelected > -1 then
        registerMessage("place_poster_end", this.getID(), #_PlacePosterCbk)
        registerMessage("place_poster_failed", this.getID(), #_PlacePosterCbk)
        executeMessage("place_poster_start", this.GetSelected().code)
        executeMessage("hide_inventory")
      end if
    "inv.grid.next":
      if m_mp_kType_mp_iRef_rItem[#posters].count > m_iCurrentPage * m_iItemsPerPage then
        m_iCurrentPage = m_iCurrentPage + 1
        this.update(m_mp_kType_mp_iRef_rItem, #posters)
      end if
    "inv.grid.prev":
      if m_iCurrentPage > 1 then
        m_iCurrentPage = m_iCurrentPage - 1
        this.update(m_mp_kType_mp_iRef_rItem, #posters)
      end if
    "help":
      executeMessage("ui_help", "help.inventory.posters")

  end case
end
on _PlacePosterCbk this, a_iBelow, a_vePos
  unregisterMessage("place_poster_end", this.getID())
  unregisterMessage("place_poster_failed", this.getID())
  executeMessage("show_inventory")
  if integerp(a_iBelow) then
    t_rParams = [#int: this.GetSelected().ref, #int: a_iBelow, #int: integer(a_vePos.x), #int: integer(a_vePos.y), #int: integer(a_vePos.z)]
    getConnection("VMK").send("PlacePoster", t_rParams)
  end if
end