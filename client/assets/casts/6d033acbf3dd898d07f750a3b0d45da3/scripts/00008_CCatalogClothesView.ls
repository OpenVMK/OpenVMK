-- Parent Script
property m_rItemListObj
property m_rWndObj
property m_bListRendered
property m_iLand
property m_iBalance
property m_rGridRenderer
property m_fillColor
property m_mpCatalogData
property m_rPrevierRenderer
property m_iPos
property m_iId
property m_iDefinedPageToShow
property m_iDefinedSubPageToShow
property m_bEnoughCredits
property m_bGridRendered
property m_sActiveCategory
property m_sSelectedTab
property m_mpThumbCache
property m_rGridLoadAnim
property m_bLoadingThumbnails
property m_ar_components
property m_ar_ClothesToLoad
property m_objLoadingWindow
property m_iOffset

on construct this
  m_rItemListObj = VOID
  m_rWndObj = VOID
  m_iLand = 6
  m_iBalance = VOID
  m_iPos = VOID
  m_iId = VOID
  m_iDefinedPageToShow = VOID
  m_iDefinedSubPageToShow = VOID
  m_bEnoughCredits = VOID
  m_bGridRendered = 0
  m_sActiveCategory = VOID
  m_sSelectedTab = VOID
  m_mpThumbCache = VOID
  m_ar_ClothesToLoad = []
  m_ar_components = [:]
  m_mpCatalogData = [:]
  m_fillColor = rgb(0, 31, 85)
  m_rGridRenderer = createObject(getUniqueID(), "CGenericThumbnailGrid")
  m_rPrevierRenderer = createObject(getUniqueID(), "CGenericThumbnailGrid")
  m_objLoadingWindow = VOID
  m_iOffset = 0
  m_bLoadingThumbnails = 1
  m_rGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  return 1
end
on deconstruct this
  if objectp(m_rGridRenderer) then
    m_rGridRenderer.deconstruct()
    m_rGridRenderer = VOID
  end if
  if objectp(m_rPrevierRenderer) then
    m_rPrevierRenderer.deconstruct()
    m_rPrevierRenderer = VOID
  end if
  if objectp(m_rGridLoadAnim) then
    removeObject(m_rGridLoadAnim.getID())
    m_rGridLoadAnim = VOID
  end if
  m_iPageToShow = VOID
  unregisterMessage("showCatalogPage")
  return 1
end
on merge this, a_rWindow
  m_rWndObj = a_rWindow
  m_rWndObj.merge("vmk_cat_items.window")
  m_rWndObj.getElement("singleuse").setProperty(#visible, 0)
  m_rWndObj.getElement("singleuse1").setProperty(#visible, 0)
  m_rWndObj.getElement("pintype.hd").setProperty(#visible, 0)
  m_rWndObj.getElement("pin.expirydate").setProperty(#visible, 0)
  m_rWndObj.getElement("expires.hd").setProperty(#visible, 0)
  m_rWndObj.getElement("pintype.regular").setProperty(#visible, 0)
  if m_ar_components.count > 0 then
    t_rImg = m_ar_components["cat.list"].render()
    m_rWndObj.getElement("cat.list").feedImage(t_rImg)
  end if
  if m_mpThumbCache <> VOID then
    this.ThumbsLoaded(m_mpThumbCache)
    t_iCode = this.GetSelected().code
    t_rInput = [:]
    t_rInput.setaProp(t_iCode, VOID)
    t_mp_Data1 = [#client: this.getID(), #method: #ShowSelected]
    executeMessage("GetClothPreview", t_rInput, t_mp_Data1)
  end if
  this.ShowLandLogo()
  exit
end
on Purge this, a_rWindow
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  if objectp(m_rWndObj) then
    m_rWndObj = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on RenderingDone this
  return m_bGridRendered
end
on SetCategory this, a_sTab
  m_sActiveCategory = a_sTab
  m_sSelectedTab = a_sTab
end
on ShowThumbs this, a_mpItems
  m_rGridRenderer.render(a_mpItems, m_rWndObj, "thumbs.grid.b")
  m_bGridRendered = 1
end
on UpdateIndex this, a_mpItemList
  if m_ar_components.count = 0 then
    this.createComponentWindow(a_mpItemList)
  end if
  if listp(a_mpItemList) then
    t_bStateOn = 0
    repeat with h = 4 to a_mpItemList["Clothing"].count
      if a_mpItemList["Clothing"][h].state then
        t_bStateOn = 1
      end if
    end repeat
    this.ShowLandLogo()
    if not t_bStateOn then
      m_iDefinedPageToShow = a_mpItemList["Clothing"][4][#id]
      this._ChangeItemView(VOID, "list.page")
      m_ar_components["cat.list"].GetComponents()[1].showAsActive(1)
      t_rClientElement = m_rWndObj.getElement("cat.list")
      t_rImg = m_ar_components["cat.list"].render()
      t_rClientElement.feedImage(t_rImg)
    end if
  end if
  if m_rWndObj.elementExists("cat.items.preview") then
    t_rBack = getMember("previewbox.b").image.duplicate()
    m_rWndObj.getElement("cat.items.preview").feedImage(t_rBack)
  end if
end
on ShowLandLogo this
  if objectp(m_rWndObj) then
    if m_rWndObj.elementExists("land.logo") then
      t_ImgLogo = m_rWndObj.getElement("land.logo")
      if memberExists("logo.6") then
        t_Img = member(getmemnum("logo.6")).image.duplicate()
        if t_ImgLogo.getProperty(#image) <> t_Img and not voidp(t_Img) then
          t_ImgLogo.feedImage(t_Img)
        end if
      end if
    end if
  end if
end
on UpdatePreview this, a_mpItemList
  if listp(a_mpItemList) then
    t_iTotalPages = (a_mpItemList[1].count - 1) / 9 + 1
    t_iCurrentPage = m_iOffset / 9 + 1
    t_iFrom = (t_iCurrentPage - 1) * 9 + 1
    t_iTo = t_iCurrentPage * 9
    if t_iFrom < 1 then
      t_iFrom = 1
    end if
    if t_iTo > a_mpItemList[1].count then
      t_iTo = a_mpItemList[1].count
    end if
    t_mp_ThumbData = [:]
    t_mp_data = a_mpItemList[1]
    repeat with e = t_iFrom to t_iTo
      t_mp_ThumbData.addProp(t_mp_data[e].code, VOID)
    end repeat
    m_bLoadingThumbnails = 1
    m_rGridLoadAnim.SetBufferElement(m_rWndObj.getElement("thumbs.grid.b"))
    receiveUpdate(m_rGridLoadAnim.getID())
    t_mp_Data1 = [#client: this.getID(), #method: #ThumbsLoaded]
    executeMessage("GetClothThumbnail", t_mp_ThumbData, t_mp_Data1)
    t_iTotalPages = (a_mpItemList[1].count - 1) / 9 + 1
    t_iCurrentPage = m_iOffset / 9 + 1
    t_sText = getText("cat.page", EMPTY)
    t_sText = replaceChunks(t_sText, "%P", string(t_iCurrentPage))
    t_sText = replaceChunks(t_sText, "%C", string(t_iTotalPages))
    m_rWndObj.getElement("catalog.itemspage").setText(t_sText)
  end if
end
on ThumbsLoaded this, a_mpItemList
  if objectp(m_rWndObj) then
    if objectp(getWindow(m_rWndObj.getID())) then
      m_rGridLoadAnim.SetBufferElement(VOID)
      removeUpdate(m_rGridLoadAnim.getID())
      m_bLoadingThumbnails = 0
      if objectp(m_rWndObj) and listp(a_mpItemList) then
        m_bGridRendered = 0
        m_mpThumbCache = a_mpItemList.duplicate()
        t_mp_ItemInfo = [:]
        repeat with i = 1 to a_mpItemList.count
          t_mp_ItemInfo.addProp(a_mpItemList.getPropAt(i), [#thumbnail: a_mpItemList[i], #blend: 100])
        end repeat
        m_rGridRenderer.render(t_mp_ItemInfo, m_rWndObj.getElement("thumbs.grid.b"))
        m_bGridRendered = 1
        this.ShowItemInfo()
      end if
    end if
  end if
end
on ShowLoginLoadingScreen this
  if not objectp(m_objLoadingWindow) then
    t_sHdTxt = getText("settings.clothes.loading.hd")
    m_objLoadingWindow = createObject(getUniqueID(), "CLoadingWindow")
    t_mp_data = [#headline: t_sHdTxt, #showbutton: 0, #client: this.getID(), #modal: 1]
    if objectp(m_objLoadingWindow) then
      m_objLoadingWindow.DefineWindow(t_mp_data)
    end if
  end if
end
on createComponentWindow me, a_mpShopList, a_bAppend
  tWndObj = m_rWndObj
  if objectp(m_rWndObj) then
    t_ar_componentsPage = ["cat.list": ["component.CatalogShops.roomlist.xml", "component.CatalogShops.special.xml"]]
    i = 1
    t_sElemName = t_ar_componentsPage.getPropAt(i)
    t_ar_components = t_ar_componentsPage[i]
    t_rClientElement = tWndObj.getElement(t_sElemName)
    if not a_bAppend then
      t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
      t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
      t_rComponentsPage.setColor(rgb("#001F56"))
    else
      t_rComponentsPage = t_ar_componentsPage[t_sElemName]
    end if
    repeat with j = 1 to a_mpShopList.count
      t_sPropName = a_mpShopList.getPropAt(j)
      if t_sPropName contains "clothing" then
        repeat with a = 4 to a_mpShopList[j].count
          t_rComponent = t_rComponentsPage.addComponent(t_ar_componentsPage[1][1])
          t_rComponent.GetLayout(1).setText(a_mpShopList[j].getPropAt(a))
          t_rComponent.GetLayout(1).setNode(a_mpShopList[j][a])
          t_rComponent.setClickable(1)
        end repeat
      end if
    end repeat
    t_rImg = t_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
    m_ar_components[t_sElemName] = t_rComponentsPage
  end if
end
on UpdateBalance this
  m_iBalance = m_mpCatalogData["balance"]
  if not voidp(m_iBalance) then
    t_sTxt = string(m_iBalance) && getText("cat.credits")
    if m_rWndObj.elementExists("cat.credits.amount") then
      m_rWndObj.getElement("cat.credits.amount").setText(t_sTxt)
    end if
  end if
end
on update this, a_mpCatalogData, a_kAlteredCategory
  if a_kAlteredCategory = "PageToShow" then
    this.showDefinedCatalogPage(a_mpCatalogData)
    return 1
  end if
  m_mpCatalogData = a_mpCatalogData
  case a_kAlteredCategory of
    "index":
      this.UpdateIndex(a_mpCatalogData["index"])
    "category":
      this.UpdatePreview(a_mpCatalogData["category"])
    "balance":
      this.UpdateBalance()
    VOID:
      this.UpdateIndex(a_mpCatalogData["index"])
      this.UpdateBalance()

  end case
end
on showDefinedCatalogPage this, a_ar_CatData
  t_iCatId = a_ar_CatData[1]
  t_iSubCatId = a_ar_CatData[2]
  m_iDefinedPageToShow = t_iCatId
  m_iDefinedSubPageToShow = t_iSubCatId
end
on FindSubPageAndRequest this, a_iLand, a_mpItemList
  if not voidp(a_iLand) then
    repeat with h = 1 to a_mpItemList.count
      if a_mpItemList[h].id = a_iLand then
        a_mpItemList[h].state = 1
        repeat with s = 4 to a_mpItemList[h].count
          if a_mpItemList[h].getPropAt(s) contains m_sActiveCategory then
            m_iDefinedPageToShow = a_mpItemList[h][s].id
            getConnection(getVariable("main.connection.id", "VMK")).send(16, [#int: m_iDefinedPageToShow])
          end if
        end repeat
      end if
    end repeat
  end if
end
on _ChangeItemView this, a_Pnt, a_kEvent
  t_Img = VOID
  if a_kEvent = "list.page" then
    getConnection(getVariable("main.connection.id", "VMK")).send(16, [#int: m_iDefinedPageToShow])
  end if
  m_rGridRenderer.construct()
  if m_rWndObj.elementExists("cat.items.preview") then
    t_rBack = getMember("previewbox.b").image.duplicate()
    m_rWndObj.getElement("cat.items.preview").feedImage(t_rBack)
  end if
  if m_rWndObj.elementExists("cat.item.info") then
    m_rWndObj.getElement("cat.item.info").setText(EMPTY)
  end if
  this.ShowLandLogo()
  m_rWndObj.getElement("cat.item.prize").setText(EMPTY)
end
on GetSelected this
  if objectp(m_rGridRenderer) then
    t_mp_data = m_mpCatalogData["category"][1]
    t_iSlot = m_rGridRenderer.GetSelected()
    t_iPos = t_iSlot + m_iOffset
    if t_iPos > 0 and t_iPos <= t_mp_data.count then
      t_mp_DataList = t_mp_data[t_iPos]
      t_mp_DataList[#pos] = t_iPos
      return t_mp_DataList
    end if
  end if
  return [#categoryId: -1, #code: -1, #param: -1, #price: 0]
end
on ShowItemInfo this, a_vParam
  t_mpItemList = m_mpCatalogData["category"]
  m_rWndObj.getElement("singleuse").setProperty(#visible, 0)
  m_rWndObj.getElement("singleuse1").setProperty(#visible, 0)
  m_rWndObj.getElement("pintype.hd").setProperty(#visible, 0)
  m_rWndObj.getElement("pin.expirydate").setProperty(#visible, 0)
  m_rWndObj.getElement("expires.hd").setProperty(#visible, 0)
  m_rWndObj.getElement("pintype.regular").setProperty(#visible, 0)
  if listp(t_mpItemList) then
    t_sItemId = this.GetSelected().code
    if t_sItemId > -1 then
      if m_rWndObj.elementExists("cat.item.info") then
        if textExists("product." & t_sItemId) then
          t_sTxt = getText("product." & t_sItemId)
        else
          t_sTxt = getText("item." & t_sItemId)
        end if
        m_rWndObj.getElement("cat.item.info").setText(t_sTxt)
      end if
      if m_rWndObj.elementExists("cat.item.prize") then
        t_sPrice = this.GetSelected().price
        t_sTxt = t_sPrice && getText("cat.credits")
        m_rWndObj.getElement("cat.item.prize").setText(t_sTxt)
        if m_iBalance - t_sPrice >= 0 then
          m_bEnoughCredits = 1
        else
          m_bEnoughCredits = 0
        end if
      end if
      t_iPos = this.GetSelected().findPos(#param)
      if t_iPos > 0 then
        t_mp_Params = this.GetSelected().param
        t_iPos2 = t_mp_Params.findPos(#e)
        if t_iPos2 > 0 then
          t_sExpiryDate = t_mp_Params.e
          m_rWndObj.getElement("singleuse").setProperty(#visible, 1)
          m_rWndObj.getElement("singleuse1").setProperty(#visible, 1)
          m_rWndObj.getElement("pintype.hd").setProperty(#visible, 1)
          m_rWndObj.getElement("pin.expirydate").setProperty(#visible, 1)
          m_rWndObj.getElement("expires.hd").setProperty(#visible, 1)
          t_Img = getMember("icon.singleuse").image
          m_rWndObj.getElement("singleuse").feedImage(t_Img)
          m_rWndObj.getElement("pin.expirydate").setText(t_sExpiryDate)
        end if
      else
      end if
      t_iCode = this.GetSelected().code
      t_rInput = [:]
      t_rInput.setaProp(t_iCode, VOID)
      t_mp_Data1 = [#client: this.getID(), #method: #ShowSelected]
      executeMessage("GetClothPreview", t_rInput, t_mp_Data1)
    end if
  end if
end
on ShowSelected this, a_mp_Data
  t_rPrev = a_mp_Data[1]
  if not voidp(t_rPrev) then
    t_rBack = getMember("previewbox.b").image.duplicate()
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
    m_rWndObj.getElement("cat.items.preview").feedImage(t_rBack)
  else
    t_rBack = getMember("previewbox.b").image.duplicate()
    m_rWndObj.getElement("cat.items.preview").feedImage(t_rBack)
  end if
end
on BuyItems this
  m_iPos = this.GetSelected().code
  if m_iPos > 0 then
    m_iId = this.GetSelected().categoryId
    t_sPrice = this.GetSelected().price
    m_ImgBg = member(getmemnum("field.e.active"))
    if m_iBalance - t_sPrice >= 0 then
      m_bEnoughCredits = 1
    else
      m_bEnoughCredits = 0
    end if
    if m_bEnoughCredits = 0 then
      t_rDialogWnd = createDialogWindow(this.getID(), "NotEnoughCredits", 1, 1)
      t_rDialogWnd.show()
      t_sMsg = getText("cat.not.enough.credits")
      t_rDialogWnd.setText(t_sMsg, getText("cat.not.enough.credits.hd"), "OK")
      return 1
    end if
    if not DialogWindowExists("ConfirmBuy") then
      t_rDialogWnd2 = createDialogWindow(this.getID(), "ConfirmBuy", 2, 1)
    end if
    t_rDialogWnd2.show()
    if textExists("product." & m_iPos) then
      t_sTxt = getText("product." & m_iPos)
    else
      t_sTxt = getText("item." & m_iPos)
    end if
    t_sMsg = getText("cat.purchase.confirm") && t_sTxt
    t_sOk = getText("mes.accept")
    t_sCancel = getText("mes.deny")
    t_mp_Button1 = [#text: t_sCancel, #eventID: #dialogCancel]
    t_mp_Button2 = [#text: t_sOk, #eventID: #dialogOK]
    t_rDialogWnd2.setText(t_sMsg, getText("cat.purchase.confirm.hd"), t_mp_Button1, t_mp_Button2)
  end if
end
on dialogWindowEvent this, a_sDialogName, a_sDialogEvent
  if a_sDialogName = "ConfirmBuy" then
    case a_sDialogEvent of
      #dialogOK:
        if integerp(m_iPos) and integerp(m_iId) then
          getConnection(getVariable("main.connection.id", "VMK")).send(17, [#int: m_iPos, #int: m_iId])
          getConnection(getVariable("main.connection.id", "VMK")).send("RequestBalance")
        else
          put "No item defined"
        end if
      #dialogCancel:

    end case
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  if a_kEvent = #mouseUp then
    case a_sElem of
      "thumbs.grid.b":
        if not m_bLoadingThumbnails then
          m_iDefinedPageToShow = VOID
          m_iDefinedSubPageToShow = VOID
          m_rGridRenderer.MouseSelection(a_vParam)
          this.ShowItemInfo()
        end if
      "cat.list":
        m_iDefinedPageToShow = VOID
        m_iDefinedSubPageToShow = VOID
        m_ar_components["cat.list"].GetComponents()[1].showAsActive(0)
        t_mpEvent = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        executeMessage("PlayInterfaceSound", "UI-click")
        m_ar_components[a_sElem].EventProc(a_vParam, t_mpEvent)
        t_rClientElement = m_rWndObj.getElement(a_sElem)
        t_rImg = m_ar_components[a_sElem].render()
        t_rClientElement.feedImage(t_rImg)
        if t_mpEvent.found then
          case t_mpEvent.event of
            "list.page":
              m_iDefinedPageToShow = t_mpEvent.client.GetNode()[#id]
              m_sActiveCategory = m_sSelectedTab
            "list.special":

          end case
          m_iOffset = 0
        end if
        this._ChangeItemView(VOID, t_mpEvent.event)
        if m_rWndObj.elementExists("cat.scrollbar") then
          m_rWndObj.getElement("cat.scrollbar").setScrollOffset(0)
        end if
        executeMessage("PlayInterfaceSound", "UI-click")
      "cat.buy.button":
        this.BuyItems()
        executeMessage("PlayInterfaceSound", "UI-click")
      "cat.nextpage.button":
        if not voidp(m_mpCatalogData.getaProp("category")) then
          t_iOffset = m_iOffset + 9
          if t_iOffset >= m_mpCatalogData["category"][1].count then
            t_iOffset = t_iOffset - 9
          end if
          m_iOffset = t_iOffset
          this.UpdatePreview(m_mpCatalogData["category"])
        end if
      "cat.previouspage.button":
        if not voidp(m_mpCatalogData.getaProp("category")) then
          t_iOffset = m_iOffset - 9
          if t_iOffset < 0 then
            t_iOffset = 0
          end if
          m_iOffset = t_iOffset
          this.UpdatePreview(m_mpCatalogData["category"])
        end if

    end case
  end if
end