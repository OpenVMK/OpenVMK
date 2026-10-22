-- Script
property m_bDataReceived
property m_rCurPageObj
property m_rItemListObj
property m_bCatalogOpen
property m_rWindow
property m_iPageToShow
property m_SubpageToShow
property m_sShopsMissingWriter

on construct this
  m_bDataReceived = 0
  m_rItemListObj = VOID
  m_iPageToShow = VOID
  m_rWindow = VOID
  m_SubpageToShow = VOID
  m_sShopsMissingWriter = "Catalog Shops Missing Writer"
  registerMessage(#Initialize, this.getID(), #AllCastsDone)
  registerMessage("room_leave", this.getID(), #CloseCatalog)
  registerMessage(#ui_catalog, this.getID(), #OpenCloseCatalog)
  registerMessage(#close_catalog, this.getID(), #CloseCatalog)
  registerMessage("showCatalogPage", this.getID(), #showDefinedCatalogPage)
  return 1
end
on deconstruct this
  if objectp(m_rCurPageObj) then
    removeObject(m_rCurPageObj.getID())
    m_rCurPageObj = VOID
  end if
  if writerExists(m_sShopsMissingWriter) then
    removeWriter(m_sShopsMissingWriter)
  end if
  unregisterMessage(#ui_catalog, this.getID())
  unregisterMessage(#close_catalog, this.getID())
  unregisterMessage("showCatalogPage", this.getID())
  unregisterMessage("room_leave", this.getID())
  return 1
end
on AllCastsDone this
  m_rCurPageObj = createObject(getUniqueID(), "CCtlgPageBase")
end
on DrawCatalogPage this, a_mpItemList
  m_rCurPageObj.update(a_mpItemList, "category")
end
on CatalogIndexReceived this, a_mpCatalogIndex
  if listp(a_mpCatalogIndex) then
    if not voidp(m_iPageToShow) and not voidp(m_SubpageToShow) then
      if m_SubpageToShow = -1 then
        m_rCurPageObj.update(a_mpCatalogIndex, "index", #specials)
      else
        m_rCurPageObj.update([m_iPageToShow, m_SubpageToShow], "PageToShow", VOID, a_mpCatalogIndex)
        m_iPageToShow = VOID
      end if
    else
      m_rCurPageObj.update(a_mpCatalogIndex, "index")
    end if
    m_rWindow = m_rCurPageObj.GetWindowObj()
    getConnection(getVariable("main.connection.id", "VMK")).send("RequestBalance")
  end if
end
on OpenCloseCatalog this
  if voidp(m_rWindow) then
    t_rObj = getThread(#room).component._AccessRoom()
    if objectp(t_rObj) then
      getConnection(getVariable("main.connection.id", "VMK")).send(15)
    else
      return 0
    end if
  else
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.CloseCatalog()
      m_rWindow = VOID
      m_iPageToShow = VOID
      m_SubpageToShow = VOID
    end if
  end if
end
on CloseCatalog this
  if objectp(m_rCurPageObj) then
    m_rCurPageObj.CloseCatalog()
    m_rWindow = VOID
    m_iPageToShow = VOID
    m_SubpageToShow = VOID
  end if
end
on showDefinedCatalogPage this, a_iPageToShow, a_iSubpage
  m_iPageToShow = a_iPageToShow
  m_SubpageToShow = a_iSubpage
  if voidp(m_rWindow) then
    this.OpenCloseCatalog()
  else
    this.CloseCatalog()
    this.OpenCloseCatalog()
  end if
end
on FeedShopsMissingTextImage this, a_rClientElement
  tWidth = a_rClientElement.getProperty(#width)
  tHeight = a_rClientElement.getProperty(#height)
  tRect = rect(0, 0, tWidth, tHeight)
  if not writerExists(m_sShopsMissingWriter) then
    tPlain = getStructVariable("struct.font.plain")
    tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb(250, 250, 250), #bgColor: rgb(255, 255, 255), #fixedLineSpace: 12, #wordWrap: 1, #rect: tRect]
    createWriter(m_sShopsMissingWriter, tMetrics)
  end if
  tImg = getWriter(m_sShopsMissingWriter).render(getText("cat.visitshops"))
  tTempImg = image(tRect.width, tRect.height, 32)
  tTempImg.fill(tRect, [#color: rgb("#001F56"), #shapeType: #rect])
  tTempImg.copyPixels(tImg, tRect, tRect, [#ink: 36])
  a_rClientElement.feedImage(tTempImg)
end
on _RefreshCredits this, a_iBalance
  if objectp(m_rCurPageObj) then
    m_rCurPageObj.update(a_iBalance, "credits")
  end if
end
on _SaveRoomList this, a_mpRoomList
  if objectp(m_rCurPageObj) then
    m_rCurPageObj.SaveRoomList(a_mpRoomList)
  end if
end
on _RefreshItemList this, a_mpItemList, a_kAlteredCategory
  if objectp(m_rWindow) and a_kAlteredCategory <> "balance" then
    m_rCurPageObj.update(a_mpItemList, a_kAlteredCategory)
    m_bDataReceived = 1
    m_iPageToShow = VOID
    m_SubpageToShow = VOID
  else
    if voidp(m_rWindow) and a_kAlteredCategory = "index" then
      this.CatalogIndexReceived(a_mpItemList)
    else
      if not voidp(m_rWindow) then
        m_rCurPageObj.update(a_mpItemList, a_kAlteredCategory)
      end if
    end if
  end if
end