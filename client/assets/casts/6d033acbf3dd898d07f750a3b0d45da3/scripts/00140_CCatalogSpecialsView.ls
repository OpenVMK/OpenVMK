-- Script
property m_rItemListObj
property m_rWndObj
property m_bListRendered
property m_iLand
property m_iBalance
property m_fillColor
property m_mpCatalogData
property m_rPrevierRenderer
property m_iPos
property m_iId
property m_iDefinedPageToShow
property m_iDefinedSubPageToShow
property m_bEnoughCredits
property m_sActiveCategory
property m_sSelectedTab
property m_sSpecialCategory
property m_ar_components
property m_rGridRenderer
property m_bGridRendered
property m_iGridItemCount
property m_iGridItemOffset
property m_rGridLoadAnim
property m_iShopsFound
property m_arHidableInterface
property m_sThumbRenderMessage
property m_sPrevRenderMEssage
property m_bLoadingThumbnails

on construct this
  m_rItemListObj = VOID
  m_rWndObj = VOID
  m_iLand = VOID
  m_iBalance = VOID
  m_iPos = VOID
  m_iId = VOID
  m_iDefinedPageToShow = VOID
  m_iDefinedSubPageToShow = VOID
  m_bEnoughCredits = VOID
  m_bGridRendered = 0
  m_sActiveCategory = VOID
  m_sSelectedTab = VOID
  m_sSpecialCategory = "Specials!"
  m_iGridItemCount = 0
  m_iGridItemOffset = 0
  m_bLoadingThumbnails = 1
  m_sThumbRenderMessage = "GetMixedThumbnail"
  m_sPrevRenderMEssage = "GetMixedPreview"
  m_iShopsFound = 0
  m_ar_components = [:]
  m_mpCatalogData = [:]
  m_fillColor = rgb(0, 31, 85)
  m_arHidableInterface = ["thumbs.grid.b", "cat.buy.button", "cat.nextpage.button", "cat.previouspage.button", "cat.item.info", "cat.item.prize", "cat.items.preview", "land.logo", "cat.credits.amounthd", "catalog.itemspage", "cat.credits.amount", "field.credits", "previewbg"]
  m_rGridRenderer = createObject(getUniqueID(), "CGenericThumbnailGrid")
  m_rGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  return 1
end
on deconstruct this
  if objectp(m_rGridRenderer) then
    removeObject(m_rGridRenderer.getID())
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
on ShowPageInterFace
  if objectp(m_rWndObj) then
    repeat with t_sItemName in m_arHidableInterface
      if m_rWndObj.elementExists(t_sItemName) then
        m_rWndObj.getElement(t_sItemName).show()
      end if
    end repeat
  end if
end
on HidePageInterface
  if objectp(m_rWndObj) then
    repeat with t_sItemName in m_arHidableInterface
      if m_rWndObj.elementExists(t_sItemName) then
        m_rWndObj.getElement(t_sItemName).hide()
      end if
    end repeat
  end if
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
  m_sSpecialCategory = "Specials!"
  exit
end
on Purge this, a_rWindow
  m_iDefinedPageToShow = VOID
  m_iDefinedSubPageToShow = VOID
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  if objectp(m_rWndObj) then
    m_rWndObj = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on SetCategory this, a_sTab
  m_sActiveCategory = a_sTab
  m_sSelectedTab = a_sTab
end
on ShowThumbs this, a_mp_rItems
  m_iGridItemCount = a_mp_rItems.count
  t_mp_iType_rThumb = [:]
  t_iOffset = m_iGridItemOffset + 1
  t_iLast = min(t_iOffset + 9, a_mp_rItems.count)
  repeat with i = t_iOffset to t_iLast
    t_mp_iType_rThumb.addProp(a_mp_rItems[i].code, VOID)
  end repeat
  m_bLoadingThumbnails = 1
  m_rGridLoadAnim.SetBufferElement(m_rWndObj.getElement("thumbs.grid.b"))
  receiveUpdate(m_rGridLoadAnim.getID())
  executeMessage(m_sThumbRenderMessage, t_mp_iType_rThumb, [#client: this.getID(), #method: #_ThumbsRenderedCbk])
end
on _ThumbsRenderedCbk this, a_mp_iCode_rThumb
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  m_bLoadingThumbnails = 0
  if objectp(m_rWndObj) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iCode_rThumb.count
    m_mpThumbCache = a_mp_iCode_rThumb.duplicate()
    repeat with t_rThumb in a_mp_iCode_rThumb
      t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: 100])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWndObj.getElement("thumbs.grid.b"))
    m_bGridRendered = 1
    t_iTotalPages = (m_iGridItemCount - 1) / 9 + 1
    t_iCurrentPage = m_iGridItemOffset / 9 + 1
    t_sText = getText("cat.page", EMPTY)
    t_sText = replaceChunks(t_sText, "%P", string(t_iCurrentPage))
    t_sText = replaceChunks(t_sText, "%C", string(t_iTotalPages))
    m_rWndObj.getElement("catalog.itemspage").setText(t_sText)
  end if
end
on GetSelected this
  t_iSelected = m_rGridRenderer.GetSelected() + m_iGridItemOffset
  if t_iSelected > 0 and t_iSelected <= m_mpCatalogData["category"][1].count then
    return m_mpCatalogData["category"][1][t_iSelected]
  else
    return [#code: -1, #price: -1, #categoryId: -1]
  end if
end
on FindComponentWithId this, a_iID
  repeat with t_rComponent in m_ar_components["cat.list"].GetComponents()
    if t_rComponent.GetLayout(1).GetNode()["Specials!"][#id] = a_iID then
      return t_rComponent
    end if
  end repeat
  return VOID
end
on UpdateIndex this, a_mpItemList
  if m_ar_components.count = 0 then
    this.createComponentWindow(a_mpItemList)
  end if
  t_bStateOn = 0
  if listp(a_mpItemList) then
    if m_iDefinedPageToShow <> VOID then
      m_iLand = m_iDefinedPageToShow
      t_rComponent = this.FindComponentWithId(m_iLand)
      if not voidp(t_rComponent) then
        m_ar_components["cat.list"].setActiveComponent(t_rComponent)
        t_rComponent.showAsActive(1)
        t_bStateOn = 1
      end if
    else
      repeat with h = 1 to a_mpItemList.count
        repeat with t = 4 to a_mpItemList[h].count
          if a_mpItemList[h].getPropAt(t) contains "Specials!" then
            t_rComponent = this.FindComponentWithId(a_mpItemList[h][t].id)
            if not voidp(t_rComponent) then
              t_rComponent.showAsActive(1)
              t_bStateOn = 1
            end if
          end if
        end repeat
      end repeat
    end if
    if not t_bStateOn then
      repeat with i = 1 to a_mpItemList.count
        if not (a_mpItemList.getPropAt(i) contains "clothing" or a_mpItemList.getPropAt(i) contains "rooms") then
          t_rComponent = this.FindComponentWithId(a_mpItemList[i][#id])
          if not voidp(t_rComponent) then
            m_iLand = a_mpItemList[i][#id]
            exit repeat
          end if
        end if
      end repeat
    end if
    t_rClientElement = m_rWndObj.getElement("cat.list")
    if m_iShopsFound > 0 then
      t_rImg = m_ar_components["cat.list"].render()
      t_rClientElement.feedImage(t_rImg)
      this.ShowPageInterFace()
    else
      getThread("Catalog").getInterface().FeedShopsMissingTextImage(t_rClientElement)
      this.HidePageInterface()
    end if
    this.FindSubPageAndRequest(m_iLand, a_mpItemList, m_sSpecialCategory)
    if m_iShopsFound > 0 then
      this.ShowLandLogo()
    end if
  end if
  if m_rWndObj.elementExists("cat.items.preview") and m_iShopsFound > 0 then
    t_rBack = getMember("previewbox.b").image.duplicate()
    m_rWndObj.getElement("cat.items.preview").feedImage(t_rBack)
  end if
end
on ShowLandLogo this
  if objectp(m_rWndObj) then
    if m_rWndObj.elementExists("land.logo") then
      t_ImgLogo = m_rWndObj.getElement("land.logo")
      t_ImgLogo.show()
      t_iLand = m_iLand
      if t_iLand = 7 then
        t_iLand = 6
      end if
      if voidp(t_iLand) then
        t_ImgLogo.hide()
      else
        t_ImgLogo.show()
        if memberExists("logo." & t_iLand) then
          t_Img = member(getmemnum("logo." & t_iLand)).image.duplicate()
          if t_ImgLogo.getProperty(#image) <> t_Img and not voidp(t_Img) then
            t_ImgLogo.feedImage(t_Img)
          end if
        end if
      end if
    end if
  end if
end
on UpdatePreview this, a_mpItemList
  if listp(a_mpItemList) then
    if objectp(m_rWndObj) then
      m_bGridRendered = 0
      this.ShowThumbs(a_mpItemList[1])
      this.ShowItemInfo()
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
    m_iShopsFound = 0
    repeat with j = 1 to a_mpShopList.count
      t_sPropName = a_mpShopList.getPropAt(j)
      if not (t_sPropName contains "clothing") and not (t_sPropName contains "rooms") then
        t_sSpecialsFound = 0
        repeat with k = 4 to a_mpShopList[j].count
          if a_mpShopList[j].getPropAt(k) contains "specials" then
            t_sSpecialsFound = 1
          end if
        end repeat
        if t_sSpecialsFound then
          t_rComponent = t_rComponentsPage.addComponent(t_ar_componentsPage[1][1])
          t_rComponent.GetLayout(1).setText(t_sPropName)
          t_rComponent.GetLayout(1).setNode(a_mpShopList[j])
          t_rComponent.setClickable(1)
          m_iShopsFound = m_iShopsFound + 1
        end if
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
  else
    getConnection(getVariable("main.connection.id", "VMK")).send("RequestBalance")
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
      m_mpCatalogData["category"] = [1: [:]]
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
on FindSubPageAndRequest this, a_iLand, a_mpItemList, a_sSpecialCategory
  if not voidp(m_iDefinedSubPageToShow) and not voidp(m_iDefinedPageToShow) then
    getConnection(getVariable("main.connection.id", "VMK")).send(16, [#int: m_iDefinedSubPageToShow])
    t_bFoundSomething = 1
    repeat with h = 1 to a_mpItemList.count
      if a_mpItemList[h].id = a_iLand or not voidp(a_sSpecialCategory) then
        a_mpItemList[h].state = 1
      end if
    end repeat
  else
    repeat with h = 1 to a_mpItemList.count
      if a_mpItemList[h].id = a_iLand or not voidp(a_sSpecialCategory) then
        a_mpItemList[h].state = 1
        repeat with s = 4 to a_mpItemList[h].count
          t_sPropName = a_mpItemList[h].getPropAt(s)
          if voidp(m_sSpecialCategory) then
            if t_sPropName contains m_sActiveCategory then
              m_iDefinedPageToShow = a_iLand
              m_iDefinedSubPageToShow = a_mpItemList[h][s].id
              getConnection(getVariable("main.connection.id", "VMK")).send(16, [#int: m_iDefinedSubPageToShow])
              t_bFoundSomething = 1
            end if
            next repeat
          end if
          a_mpItemList[h].state = 0
          if t_sPropName = a_sSpecialCategory then
            a_mpItemList[h].state = 1
            m_iDefinedPageToShow = a_iLand
            m_iDefinedSubPageToShow = a_mpItemList[h][s].id
            getConnection(getVariable("main.connection.id", "VMK")).send(16, [#int: m_iDefinedSubPageToShow])
            t_bFoundSomething = 1
          end if
        end repeat
        next repeat
      end if
      a_mpItemList[h].state = 0
    end repeat
  end if
  if not t_bFoundSomething then
    m_mpCatalogData["category"] = [EMPTY: [:]]
    this.ShowThumbs([:])
  end if
end
on RenderCatalogList this
end
on _ChangeItemView this, a_Pnt, a_kEvent
  m_iGridItemOffset = 0
  this.showDefinedCatalogPage([m_iDefinedPageToShow, m_iDefinedSubPageToShow])
  if a_kEvent = "list.page" then
  end if
  this.FindSubPageAndRequest(m_iLand, m_mpCatalogData["index"])
  if m_rWndObj.elementExists("cat.items.preview") and m_iShopsFound > 0 then
    t_rBack = getMember("previewbox.b").image.duplicate()
    m_rWndObj.getElement("cat.items.preview").feedImage(t_rBack)
  end if
  if m_rWndObj.elementExists("cat.item.info") then
    m_rWndObj.getElement("cat.item.info").setText(EMPTY)
  end if
  if objectp(m_rWndObj) then
    if m_rWndObj.elementExists("land.logo") then
      t_rImgLogo = m_rWndObj.getElement("land.logo")
      t_iLand = m_iLand
      if t_iLand = 7 then
        t_iLand = 6
      end if
      t_rImg = member(getmemnum("logo." & t_iLand)).image
      if t_rImgLogo.getProperty(#image) <> t_rImg and not voidp(t_rImg) then
        t_rImgLogo.feedImage(t_rImg)
      end if
    end if
  end if
  m_rWndObj.getElement("cat.item.prize").setText(EMPTY)
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
    if not voidp(a_vParam) then
      m_rGridRenderer.MouseSelection(a_vParam)
    end if
    t_rSelected = this.GetSelected()
    t_sItemId = t_rSelected.code
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
        t_sPrice = t_rSelected.price
        t_sTxt = t_sPrice && getText("cat.credits")
        m_rWndObj.getElement("cat.item.prize").setText(t_sTxt)
        if m_iBalance - t_sPrice >= 0 then
          m_bEnoughCredits = 1
        else
          m_bEnoughCredits = 0
        end if
      end if
      t_iPos = t_rSelected.findPos(#param)
      if t_iPos > 0 then
        t_mp_Params = t_rSelected.param
        t_iPos2 = t_mp_Params.findPos(#e)
        if t_iPos2 > 0 then
          t_sExpiryDate = t_mp_Params.e
          m_rWndObj.getElement("singleuse").setProperty(#visible, 1)
          m_rWndObj.getElement("singleuse1").setProperty(#visible, 1)
          m_rWndObj.getElement("pintype.hd").setProperty(#visible, 1)
          m_rWndObj.getElement("pin.expirydate").setProperty(#visible, 1)
          m_rWndObj.getElement("expires.hd").setProperty(#visible, 1)
          t_rImg = getMember("icon.singleuse").image
          m_rWndObj.getElement("singleuse").feedImage(t_rImg)
          m_rWndObj.getElement("pin.expirydate").setText(t_sExpiryDate)
        end if
      else
      end if
      this.ShowSelected()
    end if
  end if
end
on ShowSelected this
  t_iCode = this.GetSelected().code
  t_rInput = [:]
  t_rInput.setaProp(t_iCode, VOID)
  executeMessage(m_sPrevRenderMEssage, t_rInput, [#client: this.getID(), #method: #_PreviewReadyCbk])
end
on _PreviewReadyCbk this, a_iCode_rThumb
  if objectp(m_rWndObj) then
    t_rPrev = a_iCode_rThumb[1]
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
      if m_iShopsFound > 0 then
        m_rWndObj.getElement("cat.items.preview").feedImage(t_rBack)
      end if
    else
      t_rBack = getMember("previewbox.b").image.duplicate()
      if m_iShopsFound > 0 then
        m_rWndObj.getElement("cat.items.preview").feedImage(t_rBack)
      end if
    end if
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
        m_iDefinedPageToShow = VOID
        m_iDefinedSubPageToShow = VOID
        this.ShowItemInfo(a_vParam)
      "cat.list":
        m_iDefinedPageToShow = VOID
        m_iDefinedSubPageToShow = VOID
        t_mpEvent = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        executeMessage("PlayInterfaceSound", "UI-click")
        m_ar_components[a_sElem].EventProc(a_vParam, t_mpEvent)
        t_rClientElement = m_rWndObj.getElement(a_sElem)
        if m_iShopsFound > 0 then
          t_rImg = m_ar_components[a_sElem].render()
          t_rClientElement.feedImage(t_rImg)
        else
          getThread("Catalog").getInterface().FeedShopsMissingTextImage(t_rClientElement)
        end if
        if t_mpEvent.found then
          case t_mpEvent.event of
            "list.page":
              m_iDefinedPageToShow = t_mpEvent.client.GetNode()[#id]
              m_iDefinedSubPageToShow = t_mpEvent.client.GetNode().getaProp("Specials!")[#id]
              m_iLand = t_mpEvent.client.GetNode()[#id]
              m_sActiveCategory = m_sSelectedTab
              m_sSpecialCategory = "Specials!"

          end case
        end if
        m_iGridItemOffset = 0
        m_rGridRenderer.select(1)
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
          m_iGridItemOffset = m_iGridItemOffset + 9
          if m_iGridItemOffset >= m_mpCatalogData["category"][1].count then
            m_iGridItemOffset = m_iGridItemOffset - 9
          end if
          m_rGridRenderer.Unselect()
          this.ShowThumbs(m_mpCatalogData["category"][1])
        end if
      "cat.previouspage.button":
        if not voidp(m_mpCatalogData.getaProp("category")) then
          m_iGridItemOffset = m_iGridItemOffset - 9
          if m_iGridItemOffset < 0 then
            m_iGridItemOffset = 0
          end if
          m_rGridRenderer.Unselect()
          this.ShowThumbs(m_mpCatalogData["category"][1])
        end if

    end case
  end if
end