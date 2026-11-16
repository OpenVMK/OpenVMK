-- Script
property m_rWindow
property m_ar_components
property m_iActiveTab
property m_iCreditsState
property m_iPrizeStep
property m_iAvailableCredits
property m_iCurrentPrize
property m_rGridFurnishings
property m_rGridPins
property m_rGridPosters
property m_rGridClothing
property m_iGridItemsPerPage
property m_iGridOffsetFurni
property m_iGridOffsetPins
property m_iGridOffsetPosters
property m_iGridOffsetClothing
property m_sSelectedTab
property m_iSelected
property m_rGridRenderer
property m_rHiliterCol
property m_rBorderCol
property m_iLastTeleporterSelection
property m_iCurPageName
property m_mp_kType_mp_iRef_rItem
property m_rGridLoadAnim
property m_rGridLoadAnim2
property m_iPrizeRankLoadCalls
property m_ar_GiftItems
property m_iFirst
property m_iLast

on construct me
  m_rGridFurnishings = createObject(#random, "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  m_rGridPins = createObject(#random, "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  m_rGridPosters = createObject(#random, "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  m_rGridClothing = createObject(#random, "CGenericThumbnailGrid", "CGroupedThumbnailGrid")
  m_rGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_rGridLoadAnim2 = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_rGridRenderer = VOID
  m_iSelected = -1
  m_iFirst = 0
  m_iLast = 0
  m_rGridFurnishings.SetGridBgColor(rgb("#001F56"))
  m_rGridPins.SetGridBgColor(rgb("#001F56"))
  m_rGridPosters.SetGridBgColor(rgb("#001F56"))
  m_rGridClothing.SetGridBgColor(rgb("#001F56"))
  m_sSelectedTab = getThread("QuestEngine").getInterface().GetStep2SelectedTab()
  m_iAvailableCredits = 0
  m_iCurrentPrize = 0
  m_iPrizeStep = 50
  m_iPrizeRankLoadCalls = 0
  m_iCreditsState = #inactive
  m_ar_components = [:]
  m_mp_kType_mp_iRef_rItem = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  m_rHiliterCol = rgb(255, 204, 0)
  m_rBorderCol = rgb(80, 160, 216)
  m_iGridItemsPerPage = 20
  m_iGridOffsetFurni = 0
  m_iGridOffsetPins = 0
  m_iGridOffsetPosters = 0
  m_iGridOffsetClothing = 0
  m_ar_GiftItems = getVariableValue("GiftItems")
  return 1
end
on deconstruct me
  getThread("QuestEngine").getInterface().SetStep2SelectedTab(m_sSelectedTab)
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  if objectp(m_rGridLoadAnim) then
    removeObject(m_rGridLoadAnim.getID())
    m_rGridLoadAnim = VOID
  end if
  if objectp(m_rGridLoadAnim2) then
    removeObject(m_rGridLoadAnim2.getID())
    m_rGridLoadAnim2 = VOID
  end if
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  removeObject(m_rGridFurnishings.getID())
  removeObject(m_rGridPins.getID())
  removeObject(m_rGridPosters.getID())
  removeObject(m_rGridClothing.getID())
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_create_step_2.window")
  me.HideTabs()
  me.createComponentWindow()
  me.changeImageInElement(m_rWindow, "quest.main.label", member("quest.label.create"))
  me.setButtonState(m_rWindow, "quest.start.button", 0)
  me.setField(m_rWindow, "quest.main.hd", getText("quest.step2.title"))
  me.hidePageTabs()
  me.creditsState(0)
  m_iCurPageName = #items
  getThread("inventory").component.GetInventory(1).RegisterItemListCallback(me, #update)
  return t_bSuccess
end
on hidePageTabs me
  me.elemVisibility("quest.tab.tasks.active", 0)
  me.elemVisibility("quest.tab.prizes.active", 1)
  me.elemVisibility("quest.tab.settings.active", 0)
end
on elemVisibility me, a_sElemID, a_bVisible
  t_rElem = m_rWindow.getElement(a_sElemID)
  if t_rElem <> 0 then
    if a_bVisible then
      t_rElem.show()
    else
      t_rElem.hide()
    end if
  end if
end
on creditsState me, a_bEnable
  t_ar_ElemList = ["quest.creditsprize.hd", "quest.credits.prize", "bg2", "quest.credits.toprize", "quest.credits.fromprize", "quest.prizecredits.hd", "quest.yourcredits.hd", "quest.credits.your", "bg", "back_stana", "jokuvaa"]
  repeat with t_sElem in t_ar_ElemList
    me.showHideElem(m_rWindow, t_sElem, a_bEnable)
  end repeat
  if a_bEnable then
    me.setCredits(m_iAvailableCredits)
    me.setPrize(m_iCurrentPrize)
  end if
  me.showHideElem(m_rWindow, "quest.inventory", not a_bEnable)
  me.showHideElem(m_rWindow, "quest.scrollbar", not a_bEnable)
  me.showHideElem(m_rWindow, "quest.inventory.nextpage.button", not a_bEnable)
  me.showHideElem(m_rWindow, "quest.inventory.prevpage.button", not a_bEnable)
  me.showHideElem(m_rWindow, "quest.inventory.page", not a_bEnable)
end
on Purge me, a_rWindow
  getThread("inventory").component.GetInventory(1).UnregisterItemListCallback(me, #update)
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on update me, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    if m_iCurPageName = #items then
    end if
    m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
    if a_kAlteredCategory <> "step2" then
      t_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem[a_kAlteredCategory]
    end if
    case a_kAlteredCategory of
      #items:
        if m_sSelectedTab <> "furnishings" then
          exit
        end if
        m_rGridRenderer = m_rGridFurnishings
        m_iSelected = -1
        t_mp_iType_rThumb = [:]
        t_iCount = t_mp_kType_mp_iRef_rItem.count
        t_iPageCount = t_iCount / m_iGridItemsPerPage + 1
        t_iLastItem = t_iCount
        if t_iLastItem > m_iGridOffsetFurni + m_iGridItemsPerPage then
          t_iLastItem = m_iGridOffsetFurni + m_iGridItemsPerPage
        end if
        t_ar_iNumbers = []
        repeat with i = m_iGridOffsetFurni + 1 to t_iLastItem
          t_ar_iNumbers.add(t_mp_kType_mp_iRef_rItem[i].items)
          t_mp_iType_rThumb.addProp(t_mp_kType_mp_iRef_rItem[i].code, VOID)
        end repeat
        m_iFirst = m_iGridOffsetFurni + 1
        m_iLast = t_iLastItem
        if t_mp_iType_rThumb.count > 0 then
          m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("quest.inventory"))
          receiveUpdate(m_rGridLoadAnim.getID())
        end if
        executeMessage("GetFurniThumbnail", t_mp_iType_rThumb, [#client: me.getID(), #method: #_FurniThumbsReadyCbk, #items: t_ar_iNumbers])
        me.checkTeleporterSelection()
        m_rWindow.getElement("quest.inventory.page").setText(string(m_iGridOffsetFurni / 16 + 1) & " / " & string(t_iPageCount))
      #pins:
        if m_sSelectedTab <> "pins" then
          exit
        end if
        m_rGridRenderer = m_rGridPins
        m_iSelected = -1
        t_mp_iRef_rItem = t_mp_kType_mp_iRef_rItem
        t_mp_iType_rThumb = [:]
        t_iCount = t_mp_iRef_rItem.count
        if t_iCount then
          t_iPageCount = t_iCount / m_iGridItemsPerPage + 1
          t_iLastItem = t_iCount
          if t_iLastItem > m_iGridOffsetPins + m_iGridItemsPerPage then
            t_iLastItem = m_iGridOffsetPins + m_iGridItemsPerPage
          end if
          m_iFirst = m_iGridOffsetPins + 1
          m_iLast = t_iLastItem
          t_ar_iNumbers = []
          repeat with i = m_iGridOffsetPins + 1 to t_iLastItem
            t_rItem = t_mp_iRef_rItem[i]
            t_ar_iNumbers.add(t_rItem.items)
            t_mp_iType_rThumb.addProp(t_rItem.code, VOID)
          end repeat
          if t_mp_iType_rThumb.count > 0 then
            m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("quest.inventory"))
            receiveUpdate(m_rGridLoadAnim.getID())
          end if
          executeMessage("GetPinThumbnail", t_mp_iType_rThumb, [#client: me.getID(), #method: #_PinThumbsReadyCbk, #items: t_ar_iNumbers])
          m_rWindow.getElement("quest.inventory.page").setText(string(m_iGridOffsetPins / 16 + 1) & " / " & string(t_iPageCount))
        end if
      #posters:
        if m_sSelectedTab <> "posters" then
          exit
        end if
        m_rGridRenderer = m_rGridPosters
        m_iSelected = -1
        t_mp_iType_rThumb = [:]
        t_iCount = t_mp_kType_mp_iRef_rItem.count
        t_iPageCount = t_iCount / m_iGridItemsPerPage + 1
        t_iLastItem = t_iCount
        if t_iLastItem > m_iGridOffsetPosters + m_iGridItemsPerPage then
          t_iLastItem = m_iGridOffsetPosters + m_iGridItemsPerPage
        end if
        m_iFirst = m_iGridOffsetPosters + 1
        m_iLast = t_iLastItem
        t_ar_iNumbers = []
        repeat with i = m_iGridOffsetPosters + 1 to t_iLastItem
          t_ar_iNumbers.add(t_mp_kType_mp_iRef_rItem[i].items)
          t_mp_iType_rThumb.addProp(t_mp_kType_mp_iRef_rItem[i].code, VOID)
        end repeat
        if t_mp_iType_rThumb.count > 0 then
          m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("quest.inventory"))
          receiveUpdate(m_rGridLoadAnim.getID())
        end if
        executeMessage("GetPosterThumbnail", t_mp_iType_rThumb, [#client: me.getID(), #method: #_PosterThumbsReadyCbk, #items: t_ar_iNumbers])
        m_rWindow.getElement("quest.inventory.page").setText(string(m_iGridOffsetPosters / 16 + 1) & " / " & string(t_iPageCount))
      #clothes:
        if m_sSelectedTab <> "clothing" then
          exit
        end if
        m_rGridRenderer = m_rGridClothing
        m_iSelected = -1
        t_mp_ThumbData = [:]
        t_mp_data = t_mp_kType_mp_iRef_rItem
        t_iCount = t_mp_data.count
        t_iPageCount = t_iCount / m_iGridItemsPerPage + 1
        t_iLastItem = t_iCount
        if t_iLastItem > m_iGridOffsetClothing + m_iGridItemsPerPage then
          t_iLastItem = m_iGridOffsetClothing + m_iGridItemsPerPage
        end if
        m_iFirst = m_iGridOffsetClothing + 1
        m_iLast = t_iLastItem
        t_ar_iNumbers = []
        repeat with e = m_iGridOffsetClothing + 1 to t_iLastItem
          t_ar_iNumbers.add(t_mp_data[e].items)
          t_mp_ThumbData.addProp(t_mp_data[e].code, VOID)
        end repeat
        if t_mp_ThumbData.count > 0 then
          m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("quest.inventory"))
          receiveUpdate(m_rGridLoadAnim.getID())
        end if
        t_mp_Data1 = [#client: me.getID(), #method: #ClothesThumbsLoaded, #items: t_ar_iNumbers]
        executeMessage("GetClothThumbnail", t_mp_ThumbData, t_mp_Data1)
        m_rWindow.getElement("quest.inventory.page").setText(string(m_iGridOffsetClothing / 16 + 1) & " / " & string(t_iPageCount))
      #step2, "step2":
        m_sSelectedTab = getThread("QuestEngine").getInterface().GetStep2SelectedTab()
        me.HideTabs()
        if not (m_sSelectedTab = "credits") then
          t = getThread("inventory").component.GetInventory(1).GetAllItemLists()
          if not voidp(t) then
            if t.count > 0 then
              m_iCurPageName = #items
              me.update(t, #items)
            else
              me.delay(1000, #RecycleUpdate, [a_mp_kType_mp_iRef_rItem, a_kAlteredCategory])
              exit
            end if
          else
            put "Could not get items-data from inventory"
          end if
        else
          me.creditsState(1)
        end if
      otherwise:
        put "Unknown category updated in step2:" && a_kAlteredCategory

    end case
  end if
end
on RecycleUpdate this, a_mpArguments
  this.update(a_mpArguments[1], a_mpArguments[2])
end
on ClothesThumbsLoaded this, a_mpItemList, a_rCallback
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  if objectp(m_rWindow) and listp(a_mpItemList) then
    t_mp_ItemInfo = [:]
    repeat with i = 1 to a_mpItemList.count
      t_iID = string(a_mpItemList.getPropAt(i))
      t_rImg = a_mpItemList[i]
      if voidp(t_rImg) then
        if objectExists("ClothesThumbCache") then
          t_mp_data = getObject("ClothesThumbCache").GetCachedItem(t_iID)
          if listp(t_mp_data) then
            if t_mp_data.findPos(#thumb) > 0 then
              t_rImg = t_mp_data.thumb
            end if
          end if
        end if
      end if
      t_mp_ItemInfo.addProp(t_iID, [#thumbnail: t_rImg, #blend: 100, #items: a_rCallback.items[i]])
    end repeat
    m_rGridRenderer.render(t_mp_ItemInfo, m_rWindow.getElement("quest.inventory"))
  end if
end
on _FurniThumbsReadyCbk this, a_mp_iType_rThumb, a_rCallback
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    repeat with i = 1 to t_iCount
      t_ar_rThumbs.add([#thumbnail: a_mp_iType_rThumb[i], #blend: 100, #items: a_rCallback.items[i]])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("quest.inventory"))
    if this.m_rWindow.pVisible then
      this.checkTeleporterSelection()
    end if
  end if
end
on _PosterThumbsReadyCbk this, a_mp_iType_rThumb, a_rCallback
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    repeat with i = 1 to t_iCount
      t_ar_rThumbs.add([#thumbnail: a_mp_iType_rThumb[i], #blend: 100, #items: a_rCallback.items[i]])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("quest.inventory"))
    this.ShowSelected()
  end if
end
on _PinThumbsReadyCbk this, a_mp_iType_rThumb, a_rCallback
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    repeat with i = 1 to t_iCount
      t_rThumb = a_mp_iType_rThumb[i]
      t_rItem = m_mp_kType_mp_iRef_rItem[#pins][i]
      t_vParam = t_rItem.getaProp(#param)
      if ilk(t_vParam, #integer) then
        if t_vParam > 0 then
          t_rStar = getMember("inv.pin.star.thumb").image
          t_rRect = t_rStar.rect
          if voidp(t_rThumb) then
            t_rThumb = image(1, 1, 32)
          else
            t_rThumb = t_rThumb.duplicate()
          end if
          repeat with s = 1 to t_vParam
            t_rThumb.copyPixels(t_rStar, t_rRect + [(s - 1) * (t_rRect.width + 1) + 3, 31, (s - 1) * (t_rRect.width + 1) + 3, 31], t_rRect, [#ink: 36, #useFastQuads: 1])
          end repeat
        end if
      end if
      t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: 100, #items: a_rCallback.items[i]])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("quest.inventory"))
    this.ShowSelected()
  end if
end
on updateCurrentCategory me
  case m_sSelectedTab of
    "furnishings":
      t_iCategory = #items
    "pins":
      t_iCategory = #pins
    "posters":
      t_iCategory = #posters
    "clothing":
      t_iCategory = #clothes
    otherwise:
      t_iCategory = #items

  end case
  t = getThread("inventory").component.GetInventory(1).GetAllItemLists()
  if not voidp(t) then
    me.update(t, t_iCategory)
  else
    put "Could not get clothes-data from inventory" && t_iCategory
  end if
end
on GetSelected this
  t_iOffset = 0
  case m_iCurPageName of
    #items:
      t_iOffset = m_iGridOffsetFurni
    #pins:
      t_iOffset = m_iGridOffsetPins
    #posters:
      t_iOffset = m_iGridOffsetPosters
    #clothes:
      t_iOffset = m_iGridOffsetClothing

  end case
  if objectp(m_rGridRenderer) then
    t_mp_data = m_mp_kType_mp_iRef_rItem[m_iCurPageName]
    t_iSlot = m_rGridRenderer.GetSelected() + t_iOffset
    if listp(t_mp_data) then
      if t_iSlot > 0 and t_iSlot <= t_mp_data.count then
        t_mp_DataList = t_mp_data[t_iSlot]
        return t_mp_DataList
      end if
    end if
  end if
  return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
end
on HideTabs me
  t_ar_tabs = ["furnishings", "pins", "posters", "clothing", "credits"]
  repeat with t_sTabName in t_ar_tabs
    m_rWindow.getElement("tab." & t_sTabName & ".active").hide()
  end repeat
  m_rWindow.getElement("tab." & m_sSelectedTab & ".active").show()
  m_rWindow.getElement("vmk.viewgift.button").setProperty(#visible, 0)
end
on setTestingStatus me, a_bStatus
  if a_bStatus then
    me.setButtonState(m_rWindow, "quest.start.button", 1)
  else
    me.setButtonState(m_rWindow, "quest.start.button", 0)
  end if
end
on createComponentWindow me
  t_ar_componentsPage = ["quest.prizes": ["component.questengine.step2.addPrize.xml"]]
  repeat with i = 1 to t_ar_componentsPage.count
    t_sElemName = t_ar_componentsPage.getPropAt(i)
    t_ar_components = t_ar_componentsPage[i]
    t_rClientElement = m_rWindow.getElement(t_sElemName)
    t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
    t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
    t_rComponentsPage.setColor(rgb("#001F56"))
    t_rComponentsPage.setClientElement(t_rClientElement)
    repeat with t_sComponentName in t_ar_components
      t_rComponentsPage.addComponent(t_sComponentName)
    end repeat
    t_rImg = t_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
    m_ar_components[t_sElemName] = t_rComponentsPage
  end repeat
end
on updatePrizeRank me, t_ar_data, t_iRank, a_bDontUpate
  t = the milliSeconds
  t_iMaxItemsPerRow = 3
  t_sElemName = "quest.prizes"
  t_rComponentPage = m_ar_components[t_sElemName]
  t_rClientElement = m_rWindow.getElement("quest.prizes")
  t_rComponent = t_rComponentPage.getComponentAt(t_iRank, 1)
  if not objectp(t_rComponent) then
    t_rComponent = t_rComponentPage.addComponent("component.questengine.step2.prizeDesc.xml", 1, 1)
  end if
  i = t_iRank
  t_rComponent.GetLayout(1).setText(rank2text(i) & RETURN & getText("quest.prize"))
  t_rComponent.GetLayout(2).setText(string(t_ar_data[#credits]))
  t_mp_iType_rThumb = [:]
  repeat with t_rItem in t_ar_data[#item_array]
    t_mp_iType_rThumb.setaProp(t_rItem[#itemCode], VOID)
  end repeat
  if t_mp_iType_rThumb.count > 0 then
    m_iPrizeRankLoadCalls = m_iPrizeRankLoadCalls + 1
    if m_iPrizeRankLoadCalls = 1 then
      m_rGridLoadAnim2.SetBufferElement(m_rWindow.getElement("quest.prizes"))
      receiveUpdate(m_rGridLoadAnim2.getID())
    end if
  end if
  executeMessage("GetMixedThumbnail", t_mp_iType_rThumb, [#client: me.getID(), #method: #_PrizePreviewReadyCbk, #rank: t_iRank, #data: t_ar_data])
end
on renderPrizes me
  t_sElemName = "quest.prizes"
  t_rComponentPage = m_ar_components[t_sElemName]
  t_rClientElement = m_rWindow.getElement(t_sElemName)
  t_rClientElement.feedImage(t_rComponentPage.render())
  me.updateCurrentCategory()
end
on _PrizePreviewReadyCbk me, a_mp_iType_rImage, a_mp_Data
  m_iPrizeRankLoadCalls = m_iPrizeRankLoadCalls - 1
  if m_iPrizeRankLoadCalls < 1 then
    m_rGridLoadAnim2.SetBufferElement(VOID)
    removeUpdate(m_rGridLoadAnim2.getID())
  end if
  t_iRank = a_mp_Data.rank
  t_ar_data = a_mp_Data.data
  t_iMaxItemsPerRow = 3
  t_sElemName = "quest.prizes"
  t_rComponentPage = m_ar_components[t_sElemName]
  t_rClientElement = m_rWindow.getElement("quest.prizes")
  t_rComponent = t_rComponentPage.getComponentAt(t_iRank, 1)
  if not objectp(t_rComponent) then
    t_rComponent = t_rComponentPage.addComponent("component.questengine.step2.prizeDesc.xml", 1, 1)
  end if
  i = t_iRank
  t_rComponent.GetLayout(1).setText(rank2text(i) & RETURN & getText("quest.prize"))
  t_rComponent.GetLayout(2).setText(string(t_ar_data[#credits]))
  if voidp(t_ar_data[#item_index]) then
    t_ar_data[#item_index] = 1
  end if
  t_index = t_ar_data[#item_index]
  t_index = min(t_index, t_ar_data[#item_array].count)
  t_ar_data[#item_index] = t_index
  t_ar_items = array_slice(t_ar_data[#item_array], t_index, t_iMaxItemsPerRow)
  repeat while t_ar_items.count < 3
    t_ar_items.append([#itemReference: -1, #itemCode: -1])
  end repeat
  t_rThumbBg = image(40, 40, 32)
  t_rThumbBg.useAlpha = 1
  t_rLightBlue = rgb(39, 86, 146)
  t_rDarkBLue = rgb("#001F56")
  t_rThumbBg.fill(t_rThumbBg.rect, [#shapeType: #rect, #color: t_rLightBlue])
  repeat with i = 1 to t_ar_items.count
    t_ar_Item = t_ar_items[i]
    t_iCode = t_ar_Item[#itemCode]
    t_rLayout = t_rComponent.GetLayout(3 + i)
    if objectp(t_rLayout) then
      t_rIconImg = t_rThumbBg.duplicate()
      if t_iCode > -1 then
        t_rTempImg = a_mp_iType_rImage.getaProp(t_iCode)
        if objectp(t_rTempImg) then
          t_rIconImg.copyPixels(t_rTempImg, t_rTempImg.rect, t_rTempImg.rect, [#maskImage: t_rTempImg.extractAlpha(), #ink: 36, #useFastQuads: 1])
        end if
      end if
      t_rIconImg.draw(t_rIconImg.rect, [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
      t_rLayout.setIconImage(t_rIconImg)
      t_rLayout.setNode(t_ar_Item)
    end if
  end repeat
  if m_iPrizeRankLoadCalls < 1 then
    t_rImg = t_rComponentPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
end
on PrizeCreditsAdded me, t_ar_data
  t_sElemName = "quest.prizes"
  t_rComponentPage = m_ar_components[t_sElemName]
  t_rClientElement = m_rWindow.getElement(t_sElemName)
  if objectp(t_rComponentPage) then
    t_iRank = t_ar_data[#rank] + 1
    t_rComponent = t_rComponentPage.getComponentAt(t_iRank, 1)
    if not objectp(t_rComponent) then
      t_ar_data = [#credits: 0, #item_index: 1, #item_count: 0, #item_array: []]
      me.updatePrizeRank(t_ar_data, t_rComponentPage.GetComponents().count)
      return 0
    end if
    t_rLayout = t_rComponent.GetLayout(2)
    if objectp(t_rLayout) then
      t_rLayout.setText(string(t_ar_data[#credits]))
      m_iCurrentPrize = 0
      me.setPrize(0)
      t_rImg = t_rComponentPage.render()
      t_rClientElement.feedImage(t_rImg)
    else
      put "Could not find cell"
    end if
  else
    put "Could not find component"
  end if
end
on PrizeCreditsRemoved me
  put "Did I just delete me then....?"
end
on QuestCleared me, t_ar_data
  if t_ar_data[#prizesCleared] then
    t_sElemName = "quest.prizes"
    t_rComponentPage = m_ar_components[t_sElemName]
    t_rClientElement = m_rWindow.getElement(t_sElemName)
    if objectp(t_rComponentPage) then
      t_rComponentPage.deleteAllComponents(1)
      t_rImg = t_rComponentPage.render()
      t_rClientElement.feedImage(t_rImg)
    end if
  end if
end
on updateRanks me
  t_rClientElement = m_rWindow.getElement("quest.prizes")
  t_rComponentPage = m_ar_components["quest.prizes"]
  t_ar_components = t_rComponentPage.GetComponents()
  repeat with i = 1 to t_ar_components.count - 1
    t_rComponent = t_ar_components[i]
    t_rComponent.GetLayout(1).setText(rank2text(i) & RETURN & getText("quest.prize"))
  end repeat
  t_rImg = t_rComponentPage.render()
  t_rClientElement.feedImage(t_rImg)
end
on PrizeCleared me, t_ar_data
  t_rClientElement = m_rWindow.getElement("quest.prizes")
  t_rComponentPage = m_ar_components["quest.prizes"]
  t_rComponentPage.deleteComponentAt(t_ar_data[#rank] + 1)
  t_rImg = t_rComponentPage.render()
  t_rClientElement.feedImage(t_rImg)
  me.updateCurrentCategory()
end
on ShowSelected me
  t_rItem = me.GetSelected()
  t_iCode = t_rItem.code
  t_rBack = getMember("previewbox").image.duplicate()
  if t_iCode < 0 then
  end if
end
on addSelectedItem me
  t_ar_selected = me.GetSelected()
  t_ar_questData = me.getManager().GetOwner().GetData()
  t_rComponentPage = m_ar_components["quest.prizes"]
  if objectp(t_rComponentPage) then
    t_rActiveComponent = t_rComponentPage.GetActiveComponent()
    if objectp(t_rActiveComponent) then
      t_rLayout = t_rActiveComponent.GetLayout(2)
      if objectp(t_rLayout) then
        t_iRank = t_rComponentPage.getComponentID(t_rActiveComponent) - 1
        getThread(#QuestEngine).getHandler().AddPrizeItem([t_ar_questData[#questTemplateId], t_iRank, t_ar_selected[#ref]])
      else
        put "Choose a prize first"
      end if
    end if
  end if
end
on addCreditsToSelectedPrize me
  t_rComponentPage = m_ar_components["quest.prizes"]
  if objectp(t_rComponentPage) then
    t_rActiveComponent = t_rComponentPage.GetActiveComponent()
    if objectp(t_rActiveComponent) then
      t_rLayout = t_rActiveComponent.GetLayout(2)
      if objectp(t_rLayout) then
        t_ar_questData = me.getManager().GetOwner().GetData()
        t_iRank = t_rComponentPage.getComponentID(t_rActiveComponent) - 1
        if m_iCurrentPrize > 0 then
          getThread(#QuestEngine).getHandler().AddPrizeCredits([t_ar_questData[#questTemplateId], t_iRank, m_iCurrentPrize])
        end if
      else
        put "Choose a prize first"
      end if
    end if
  end if
end
on removeSelectedItemFromPrize me
  t_rComponentPage = m_ar_components["quest.prizes"]
  if objectp(t_rComponentPage) then
    t_rActiveLayout = t_rComponentPage.GetActive()
    if objectp(t_rActiveLayout) then
      t_sEvent = t_rActiveLayout.getEvent()
      t_iRank = t_rComponentPage.getComponentID(t_rComponentPage.GetActiveComponent()) - 1
      t_ar_questData = me.getManager().GetOwner().GetData()
      case t_sEvent of
        "quest.step2.credits":
          getThread(#QuestEngine).getHandler().RemovePrizeCredits([t_ar_questData[#questTemplateId], t_iRank])
        "quest.step2.icon1", "quest.step2.icon2", "quest.step2.icon3":
          t_ar_data = t_rActiveLayout.GetNode()
          if t_ar_data[#itemCode] > -1 then
            getThread(#QuestEngine).getHandler().RemovePrizeItem([t_ar_questData[#questTemplateId], t_iRank, t_ar_data[#itemReference]])
          end if

      end case
    end if
  end if
end
on HandleGiftButton this
  t_rItem = this.GetSelected()
  t_iCode = t_rItem.code
  if m_sSelectedTab = "furnishings" then
    if m_ar_GiftItems.findPos(t_iCode) > 0 then
      m_rWindow.getElement("vmk.viewgift.button").setProperty(#visible, 1)
    end if
  end if
end
on ShowGiftInfo this
  t_rItem = this.GetSelected()
  t_iCode = -1
  if listp(t_rItem) then
    t_iCode1 = t_rItem.code
    if m_ar_GiftItems.findPos(t_iCode1) > 0 then
      t_iCode = t_iCode1
    else
      t_rItem = this.GetSelected()
      t_iCode2 = t_rItem.code
      if m_ar_GiftItems.findPos(t_iCode2) > 0 then
        t_iCode = t_iCode2
      end if
    end if
    if t_iCode > -1 then
      t_Obj = createObject(#temp, "CRoomItemGift")
      if objectp(t_Obj) then
        t_Obj.OpenFromInventory(t_rItem.ref)
      end if
    end if
  end if
end
on checkTeleporterSelection me
  tSelection = me.GetSelected()
  if tSelection.state <> #invalid then
    if not voidp(m_iLastTeleporterSelection) then
      me.TeleportUnSelected(m_iLastTeleporterSelection)
      m_iLastTeleporterSelection = VOID
    end if
    if not (tSelection.getaProp(#param) = 0) then
      tParams = tSelection.param
      if ilk(tParams, #list) then
        if tParams.count = 3 then
          if tParams[1] = 1 then
            me.TeleportSelected(tParams[2])
            m_iLastTeleporterSelection = tParams[2]
          end if
        end if
      end if
    end if
    m_rGridRenderer.select(m_rGridRenderer.m_iSelected)
  end if
end
on TeleportSelected me, a_iOtherID
  tHighLightN = VOID
  if m_iCurPageName = #items then
    t_ar_rItems = m_mp_kType_mp_iRef_rItem.getaProp(#items)
    c = 1
    repeat with i = m_iFirst to m_iLast
      t_rItem = t_ar_rItems[i]
      if not (t_rItem.getaProp(#param) = 0) then
        if ilk(t_rItem.param, #list) then
          if t_rItem.param.count = 3 then
            if t_rItem.param[1] = 1 then
              if t_rItem.param[3] = a_iOtherID then
                m_rGridRenderer.Highlight(c)
                exit repeat
              end if
            end if
          end if
        end if
      end if
      c = c + 1
    end repeat
  end if
  m_ar_components["quest.prizes"].blinkLayout(a_iOtherID, #teleportpair)
end
on TeleportUnSelected me, a_iOtherID
  exit
  if m_iCurPageName = #items then
    m_rGridRenderer.Unhighlight()
  end if
  m_ar_components["quest.prizes"].resetBlinker()
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  t_rOwner = t_rManager.GetOwner()
  if a_kEvent = #mouseDown then
    case a_sElemID of
      "quest.credits.toprize":
        m_iCreditsState = #toprize
        createTimeout("updatePrize", 100, #updatePrize, me.getID(), VOID, VOID)
      "quest.credits.fromprize":
        m_iCreditsState = #fromprize
        createTimeout("updatePrize", 100, #updatePrize, me.getID(), VOID, VOID)

    end case
  else
    if a_kEvent = #mouseUp then
      m_iCreditsState = #inactive
      if timeoutExists("updatePrize") then
        removeTimeout("updatePrize")
      end if
      case a_sElemID of
        "vmk.viewgift.button":
          me.ShowGiftInfo()
        "quest.inventory":
          m_rGridRenderer.MouseSelection(a_vParam)
          me.checkTeleporterSelection()
          if the doubleClick then
            me.addSelectedItem()
          end if
          t_rActive = m_ar_components["quest.prizes"].GetActive()
          if objectp(t_rActive) then
            t_rActive.inActivate()
          end if
          m_ar_components["quest.prizes"].render()
          m_rWindow.getElement("vmk.viewgift.button").setProperty(#visible, 0)
          me.HandleGiftButton()
        "quest.selectprize.button":
          if m_sSelectedTab = "credits" then
            me.addCreditsToSelectedPrize()
          else
            me.addSelectedItem()
          end if
        "quest.removeprize.button":
          me.removeSelectedItemFromPrize()
        "tab.furnishings.passive":
          m_sSelectedTab = "furnishings"
          me.HideTabs()
          me.creditsState(0)
          m_iCurPageName = #items
          t = getThread("inventory").component.GetInventory(1).GetAllItemLists()
          if not voidp(t) then
            me.update(t, #items)
          else
            put "Could not get items-data from inventory"
          end if
        "tab.pins.passive":
          m_sSelectedTab = "pins"
          me.HideTabs()
          me.creditsState(0)
          m_iCurPageName = #pins
          t = getThread("inventory").component.GetInventory(1).GetAllItemLists()
          if not voidp(t) then
            me.update(t, #pins)
          else
            put "Could not get pins-data from inventory"
          end if
        "tab.posters.passive":
          m_sSelectedTab = "posters"
          me.HideTabs()
          m_iCurPageName = #posters
          t = getThread("inventory").component.GetInventory(1).GetAllItemLists()
          if not voidp(t) then
            me.update(t, #posters)
          else
            put "Could not get posters-data from inventory"
          end if
        "tab.clothing.passive":
          m_sSelectedTab = "clothing"
          me.HideTabs()
          me.creditsState(0)
          m_iCurPageName = #clothes
          t = getThread("inventory").component.GetInventory(1).GetAllItemLists()
          if not voidp(t) then
            me.update(t, #clothes)
          else
            put "Could not get clothes-data from inventory"
          end if
        "tab.credits.passive":
          m_sSelectedTab = "credits"
          me.HideTabs()
          me.creditsState(1)
          m_iCurPageName = #credits
        "quest.prizes":
          t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
          executeMessage("PlayInterfaceSound", "UI-click")
          t_rComponentPage = m_ar_components[a_sElemID]
          t_rComponentPage.EventProc(a_vParam, t_ar_event)
          m_rWindow.getElement("vmk.viewgift.button").setProperty(#visible, 0)
          if t_ar_event.found then
            t_rClientElement = tWndObj.getElement(a_sElemID)
            case t_ar_event.event of
              "quest.delete":
                t_ar_questData = me.getManager().GetOwner().GetData()
                t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
                getThread(#QuestEngine).getHandler().ClearPrize([t_ar_questData[#questTemplateId], t_iRank])
              "quest.addprize":
                t_ar_questData = me.getManager().GetOwner().GetData()
                t_iRank = t_rComponentPage.GetComponents().count - 1
                getThread(#QuestEngine).getHandler().AddPrizeCredits([t_ar_questData[#questTemplateId], t_iRank, 0])
              "quest.step2.credits":
                t_rComponentPage.GetActive().showBorder()
                if the doubleClick then
                  me.removeSelectedItemFromPrize()
                end if
              "quest.step2.icon1", "quest.step2.icon2", "quest.step2.icon3":
                t_rComponentPage.GetActive().showBorder()
                if the doubleClick then
                  me.removeSelectedItemFromPrize()
                end if
                if the doubleClick then
                  t_iShift = 0
                  if t_ar_event.event = "quest.step2.icon2" then
                    t_iShift = 1
                  end if
                  if t_ar_event.event = "quest.step2.icon3" then
                    t_iShift = 2
                  end if
                  t_rActiveLayout = t_rComponentPage.GetActive()
                  t_rNode = [#itemCode: -1]
                  if objectp(t_rActiveLayout) then
                    t_rNode = t_rActiveLayout.GetNode()
                  end if
                  if t_rNode.itemCode > 0 then
                    t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
                    t_rOwner = me.getManager().GetOwner()
                    t_iItemIndex = t_rOwner.m_ar_data.prize_array[t_iRank + 1].item_index + t_iShift - 1
                    t_ar_data = me.getManager().GetOwner().GetData()
                    if listp(t_ar_data) then
                      t_ID = t_ar_data[#questTemplateId]
                    end if
                  end if
                end if
                if not (m_sSelectedTab = "credits") then
                  m_rGridRenderer.Unhighlight()
                  m_rGridRenderer.Unselect()
                end if
                t_rActiveLayout = t_rComponentPage.GetActive()
                t_rNode = [#itemCode: -1]
                if objectp(t_rActiveLayout) then
                  t_rNode = t_rActiveLayout.GetNode()
                  if not voidp(t_rNode.getaProp(#itemSubCategory)) then
                    if t_rNode[#itemSubCategory] = 1 then
                      me.TeleportSelected(t_rNode[#teleportID])
                    end if
                  end if
                end if
              "quest.step2.less":
                t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
                t_rOwner = me.getManager().GetOwner()
                if objectp(t_rOwner) then
                  t_rOwner.MoveItemIndex(t_iRank, -1)
                end if
              "quest.step2.more":
                t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
                t_rOwner = me.getManager().GetOwner()
                if objectp(t_rOwner) then
                  t_rOwner.MoveItemIndex(t_iRank, 1)
                end if
              otherwise:
                put "[Questengine.event]" && t_ar_event.event

            end case
            t_rClientElement = m_rWindow.getElement(a_sElemID)
            t_rImg = t_rComponentPage.render()
            t_rClientElement.feedImage(t_rImg)
          end if
        "quest.previousstep.button", "quest.tab.tasks.passive":
          t_rManager = me.getManager()
          if objectp(t_rManager) then
            t_rManager.cancelSubtask()
            t_rManager.Activate()
          end if
        "quest.nextstep.button", "quest.tab.settings.passive":
          t_rManager = me.getManager()
          if objectp(t_rManager) then
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
        "close":
          removeObject(t_rOwner.getID())
        "quest.continuelater.button":
          if objectp(t_rOwner) then
            t_ar_results = [:]
            t_ar_results[#testQuest] = 0
            t_ar_results[#releaseQuest] = 0
            t_iTargetHandler = #QuestDialogBroadcastEvent
            if t_rOwner.handlers().getOne(t_iTargetHandler) > 0 then
              call(t_iTargetHandler, t_rOwner, me.getID(), t_ar_results)
            end if
            removeObject(t_rOwner.getID())
          end if
        "quest.clearprizes.button":
          t_txt = getText("quest.confirmation.clearprizes")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.cancel")
          t_btn2 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.confirmation.clearprizes", 2, 1)
          t.setText(t_txt, t_title, t_btn1, t_btn2)
          t.show()
        "quest.credits.prize", "bg2":
          if the doubleClick then
            me.addCreditsToSelectedPrize()
          end if
        "quest.start.button":
          t_bTestingRequired = 1
          if objectp(t_rOwner) then
            t_bTestingRequired = t_rOwner.GetTestingRequired()
          end if
          if t_bTestingRequired then
            t_txt = getText("quest.dialog.testconfirmation")
          else
            t_txt = getText("quest.dialog.test.notrequired")
          end if
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.cancel")
          t_btn2 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.dialog.testconfirmation", 2, 1)
          t.setText(t_txt, t_title, t_btn1, t_btn2)
          t.show()
        "quest.inventory.nextpage.button":
          case m_iCurPageName of
            #items:
              if m_mp_kType_mp_iRef_rItem[#items].count > m_iGridOffsetFurni + 16 then
                m_iGridOffsetFurni = m_iGridOffsetFurni + 16
              end if
            #pins:
              if m_mp_kType_mp_iRef_rItem[#pins].count > m_iGridOffsetPins + 16 then
                m_iGridOffsetPins = m_iGridOffsetPins + 16
              end if
            #posters:
              if m_mp_kType_mp_iRef_rItem[#posters].count > m_iGridOffsetPosters + 16 then
                m_iGridOffsetPosters = m_iGridOffsetPosters + 16
              end if
            #clothes:
              if m_mp_kType_mp_iRef_rItem[#clothes].count > m_iGridOffsetClothing + 16 then
                m_iGridOffsetClothing = m_iGridOffsetClothing + 16
              end if

          end case
          me.updateCurrentCategory()
        "quest.inventory.prevpage.button":
          case m_iCurPageName of
            #items:
              if m_iGridOffsetFurni >= 16 then
                m_iGridOffsetFurni = m_iGridOffsetFurni - 16
              end if
            #pins:
              if m_iGridOffsetPins >= 16 then
                m_iGridOffsetPins = m_iGridOffsetPins - 16
              end if
            #posters:
              if m_iGridOffsetPosters >= 16 then
                m_iGridOffsetPosters = m_iGridOffsetPosters - 16
              end if
            #clothes:
              if m_iGridOffsetClothing >= 16 then
                m_iGridOffsetClothing = m_iGridOffsetClothing - 16
              end if

          end case
          me.updateCurrentCategory()
        "help":
          executeMessage("PlayInterfaceSound", "UI-click")
          executeMessage(#open_help_page, getText("help.quest.step2", getText("help.quest", "help.quest")))
        otherwise:
          put "Unknown qe-elem:" && a_sElemID

      end case
    end if
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  t_rManager = me.getManager()
  t_rOwner = t_rManager.GetOwner()
  case t_dialogName of
    "quest.dialog.testconfirmation":
      case t_dialogEvent of
        #dialogOK:
          t_ar_data = [:]
          t_ar_data[#StartQuest] = 1
          t_ar_data[#releaseQuest] = 0
          if objectp(t_rManager) then
            t_rManager.appendSubResult(t_ar_data)
            t_rManager.resolveSubtask()
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
        #dialogCancel:

      end case
    "quest.confirmation.clearprizes":
      case t_dialogEvent of
        #dialogOK:
          t_ar_questData = me.getManager().GetOwner().GetData()
          getThread(#QuestEngine).getHandler().ClearQuest([t_ar_questData[#questTemplateId], 0, 1, 0])
        #dialogCancel:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on setCredits me, t_iCredits
  t_rElement = m_rWindow.getElement("quest.credits.your")
  if t_rElement <> 0 then
    t_rElement.setText(t_iCredits)
  end if
  m_iAvailableCredits = t_iCredits
end
on setPrize me, t_iCredits
  t_rElement = m_rWindow.getElement("quest.credits.prize")
  if t_rElement <> 0 then
    t_rElement.setText(t_iCredits)
  end if
  m_iCurrentPrize = t_iCredits
end
on addToPrize me
  if m_iAvailableCredits - m_iPrizeStep >= 0 then
    me.setCredits(m_iAvailableCredits - m_iPrizeStep)
    me.setPrize(m_iCurrentPrize + m_iPrizeStep)
  end if
end
on removeFromPrize me
  if m_iCurrentPrize - m_iPrizeStep >= 0 then
    me.setCredits(m_iAvailableCredits + m_iPrizeStep)
    me.setPrize(m_iCurrentPrize - m_iPrizeStep)
  end if
end
on updatePrize me
  case m_iCreditsState of
    #toprize:
      me.addToPrize()
    #fromprize:
      me.removeFromPrize()

  end case
end