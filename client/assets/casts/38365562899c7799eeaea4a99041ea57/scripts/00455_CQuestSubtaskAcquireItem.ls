-- Script
property m_rWindow
property m_ar_components
property m_sSelectedTab
property m_rGridFurnishings
property m_rGridPins
property m_rGridPosters
property m_rGridClothing
property m_rGridRenderer
property m_iSelected
property m_iCurPageName
property m_mp_kType_mp_iRef_rItem
property m_rGridLoadAnim
property m_iPageNumber
property m_iItemsPerPage

on construct me
  m_rGridFurnishings = createObject(#random, "CGenericThumbnailGrid")
  m_rGridPins = createObject(#random, "CGenericThumbnailGrid")
  m_rGridPosters = createObject(#random, "CGenericThumbnailGrid")
  m_rGridClothing = createObject(#random, "CGenericThumbnailGrid")
  m_rGridRenderer = VOID
  m_iSelected = -1
  m_rGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_mp_kType_mp_iRef_rItem = [:]
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  m_sSelectedTab = "furniture"
  m_iPageNumber = 1
  m_iItemsPerPage = 28
  return 1
end
on deconstruct me
  if objectp(m_rGridFurnishings) then
    removeObject(m_rGridFurnishings.getID())
    m_rGridFurnishings = VOID
  end if
  if objectp(m_rGridPins) then
    removeObject(m_rGridPins.getID())
    m_rGridPins = VOID
  end if
  if objectp(m_rGridPosters) then
    removeObject(m_rGridPosters.getID())
    m_rGridPosters = VOID
  end if
  if objectp(m_rGridClothing) then
    removeObject(m_rGridClothing.getID())
    m_rGridClothing = VOID
  end if
  if objectp(m_rGridRenderer) then
    removeObject(m_rGridRenderer.getID())
    m_rGridRenderer = VOID
  end if
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  if objectp(m_rGridLoadAnim) then
    removeObject(m_rGridLoadAnim.getID())
    m_rGridLoadAnim = VOID
  end if
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on merge me, a_rWindow
  a_rWindow.unmerge()
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_acquire_item.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  m_iPageNumber = 1
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.task16"))
  end if
  me.HideTabs()
  return t_bSuccess
end
on Purge me, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    t_bSuccess = a_rWindow.unmerge()
    a_rWindow.merge("vmk_quest_dialog.window")
    return t_bSuccess
  else
    return 1
  end if
end
on update me, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    m_iCurPageName = a_kAlteredCategory
    m_mp_kType_mp_iRef_rItem[a_kAlteredCategory] = a_mp_kType_mp_iRef_rItem
    t_iCount = a_mp_kType_mp_iRef_rItem.count
    if m_iPageNumber > 1 then
      if (m_iPageNumber - 1) * m_iItemsPerPage + 1 > t_iCount then
        m_iPageNumber = 1
      end if
    else
      if m_iPageNumber < 1 then
        m_iPageNumber = 1
      end if
    end if
    m_rWindow.getElement("quest.inventory.page").setText(m_iPageNumber & "/" & max(t_iCount / m_iItemsPerPage + (t_iCount mod m_iItemsPerPage > 0), 1))
    t_iFirst = (m_iPageNumber - 1) * m_iItemsPerPage + 1
    t_iLast = min(m_iPageNumber * m_iItemsPerPage, t_iCount)
    case a_kAlteredCategory of
      #items:
        m_rGridRenderer = m_rGridFurnishings
        m_iSelected = -1
        t_mp_iType_rThumb = [:]
        repeat with i = t_iFirst to t_iLast
          t_mp_iType_rThumb.addProp(a_mp_kType_mp_iRef_rItem[i].code, VOID)
        end repeat
        if t_mp_iType_rThumb.count > 0 then
          m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("tra.objects"))
          receiveUpdate(m_rGridLoadAnim.getID())
        end if
        executeMessage("GetFurniThumbnail", t_mp_iType_rThumb, [#client: me.getID(), #method: #_FurniThumbsReadyCbk])
      #pins:
        m_rGridRenderer = m_rGridPins
        m_iSelected = -1
        t_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
        t_mp_iType_rThumb = [:]
        if t_iCount > 0 then
          repeat with i = t_iFirst to t_iLast
            t_rItem = t_mp_iRef_rItem[i]
            t_mp_iType_rThumb.addProp(t_rItem.code, VOID)
          end repeat
        end if
        executeMessage("GetPinThumbnail", t_mp_iType_rThumb, [#client: me.getID(), #method: #_PinThumbsReadyCbk])
      #posters:
        m_rGridRenderer = m_rGridPosters
        m_iSelected = -1
        t_mp_iType_rThumb = [:]
        repeat with i = t_iFirst to t_iLast
          t_mp_iType_rThumb.addProp(a_mp_kType_mp_iRef_rItem[i].code, VOID)
        end repeat
        executeMessage("GetPosterThumbnail", t_mp_iType_rThumb, [#client: me.getID(), #method: #_PosterThumbsReadyCbk])
      #clothes:
        m_rGridRenderer = m_rGridClothing
        m_iSelected = -1
        t_mp_ThumbData = [:]
        t_mp_data = a_mp_kType_mp_iRef_rItem
        repeat with e = t_iFirst to t_iLast
          t_mp_ThumbData.addProp(t_mp_data[e].code, VOID)
        end repeat
        if t_mp_ThumbData.count > 0 then
          m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("tra.objects"))
          receiveUpdate(m_rGridLoadAnim.getID())
        end if
        executeMessage("GetClothThumbnail", t_mp_ThumbData, [#client: me.getID(), #method: #ClothesThumbsLoaded])
      #step2, "step2", "acquireitem":
        m_sSelectedTab = "furniture"
        me.HideTabs()
        t = getThread("inventory").component.GetInventory(1).GetItemListByCategory(#items)
        if not voidp(t) then
          me.update(t, #items)
        else
          put "Could not get items-data from inventory"
        end if
      otherwise:
        put "Unknown category updated in step2:" && a_kAlteredCategory

    end case
  end if
end
on updateCurrentCategory me
  case m_sSelectedTab of
    "furniture":
      t_iCategory = #items
    "pins":
      t_iCategory = #pins
    "posters":
      t_iCategory = #posters
    "clothes":
      t_iCategory = #clothes
    otherwise:
      t_iCategory = #items

  end case
  t = getThread("inventory").component.GetInventory(1).GetItemListByCategory(t_iCategory)
  if not voidp(t) then
    me.update(t, t_iCategory)
  else
    put "Could not get clothes-data from inventory" && t_iCategory
  end if
end
on ClothesThumbsLoaded this, a_mpItemList
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  if objectp(m_rWindow) and listp(a_mpItemList) then
    t_mp_ItemInfo = [:]
    repeat with i = 1 to a_mpItemList.count
      t_iID = string(a_mpItemList.getPropAt(i))
      t_Img = a_mpItemList[i]
      if voidp(t_Img) then
        if objectExists("ClothesThumbCache") then
          t_mp_data = getObject("ClothesThumbCache").GetCachedItem(t_iID)
          if listp(t_mp_data) then
            if t_mp_data.findPos(#thumb) > 0 then
              t_Img = t_mp_data.thumb
            end if
          end if
        end if
      end if
      t_mp_ItemInfo.addProp(t_iID, [#thumbnail: t_Img, #blend: 100])
    end repeat
    m_rGridRenderer.render(t_mp_ItemInfo, m_rWindow.getElement("tra.objects"))
  end if
end
on _FurniThumbsReadyCbk this, a_mp_iType_rThumb
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    repeat with i = 1 to t_iCount
      t_ar_rThumbs.add([#thumbnail: a_mp_iType_rThumb[i], #blend: 100])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("tra.objects"))
  end if
end
on _PosterThumbsReadyCbk this, a_mp_iType_rThumb
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    repeat with i = 1 to t_iCount
      t_ar_rThumbs.add([#thumbnail: a_mp_iType_rThumb[i], #blend: 100])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("tra.objects"))
    this.ShowSelected()
  end if
end
on _PinThumbsReadyCbk this, a_mp_iType_rThumb
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
      t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: 100])
    end repeat
    m_rGridRenderer.render(t_ar_rThumbs, m_rWindow.getElement("tra.objects"))
    this.ShowSelected()
  end if
end
on GetSelected this
  if objectp(m_rGridRenderer) then
    t_mp_data = m_mp_kType_mp_iRef_rItem[m_iCurPageName]
    t_iSlot = m_rGridRenderer.GetSelected()
    if listp(t_mp_data) then
      if t_iSlot > 0 and t_iSlot <= t_mp_data.count then
        t_mp_DataList = t_mp_data[t_iSlot]
        return t_mp_DataList
      end if
    end if
  end if
  return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
end
on ShowSelected me
  t_rItem = me.GetSelected()
  t_iCode = t_rItem.code
  t_rBack = getMember("previewbox").image.duplicate()
  if t_iCode < 0 then
  end if
end
on HideTabs me
  t_ar_tabs = ["furniture", "pins", "clothes", "posters"]
  repeat with t_sTabName in t_ar_tabs
    m_rWindow.getElement("tra.tab." & t_sTabName & ".active").hide()
  end repeat
  m_rWindow.getElement("tra.tab." & m_sSelectedTab & ".active").show()
end
on rawData me, t_ar_data
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#taskType] = t_ar_data[#taskType]
    t_rManager.appendSubResult(t_ar_results)
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "tra.objects":
        m_rGridRenderer.MouseSelection(a_vParam)
        if the doubleClick then
          put "select an move on"
        end if
      "tra.tab.furniture.passive":
        m_sSelectedTab = "furniture"
        me.HideTabs()
        t = getThread("inventory").component.GetInventory(1).GetItemListByCategory(#items)
        if not voidp(t) then
          me.update(t, #items)
        else
          put "Could not get items-data from inventory"
        end if
      "tra.tab.pins.passive":
        m_sSelectedTab = "pins"
        me.HideTabs()
        t = getThread("inventory").component.GetInventory(1).GetItemListByCategory(#pins)
        if not voidp(t) then
          me.update(t, #pins)
        else
          put "Could not get pins-data from inventory"
        end if
      "tra.tab.clothes.passive":
        m_sSelectedTab = "clothes"
        me.HideTabs()
        t = getThread("inventory").component.GetInventory(1).GetItemListByCategory(#clothes)
        if not voidp(t) then
          me.update(t, #clothes)
        else
          put "Could not get clothes-data from inventory"
        end if
      "tra.tab.posters.passive":
        m_sSelectedTab = "posters"
        me.HideTabs()
        t = getThread("inventory").component.GetInventory(1).GetItemListByCategory(#posters)
        if not voidp(t) then
          me.update(t, #posters)
        else
          put "Could not get posters-data from inventory"
        end if
      "quest.magics":
      "mes.accept.button":
        t_bDataOK = 0
        t_rSelected = me.GetSelected()
        if not voidp(t_rSelected) then
          t_iCode = me.GetSelected()[#code]
          if t_iCode > 0 then
            t_ar_results = [:]
            t_ar_results[#itemCode] = t_iCode
            if objectp(t_rManager) then
              t_rManager.appendSubResult(t_ar_results)
              t_rManager.resolveSubtask()
              t_rManager.Activate()
            end if
            t_bDataOK = 1
          end if
        end if
        if not t_bDataOK then
          t_txt = getText("quest.alert.acquireitem.missing")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.acquireitem", 1, 1)
          t.setText(t_txt, t_title, t_btn1)
          t.show()
        end if
      "close", "quest.quit", "mes.deny.button":
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_rManager.cancelSubtask()
          t_rManager.Activate()
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.addtask", getText("help.quest", "help.quest")), 1)
      "quest.inventory.nextpage.button":
        m_iPageNumber = m_iPageNumber + 1
        me.update(m_mp_kType_mp_iRef_rItem[m_iCurPageName], m_iCurPageName)
      "quest.inventory.prevpage.button":
        if m_iPageNumber > 1 then
          m_iPageNumber = m_iPageNumber - 1
        end if
        me.update(m_mp_kType_mp_iRef_rItem[m_iCurPageName], m_iCurPageName)
      otherwise:
        put "Subtask.Magics.event:" && a_sElemID

    end case
  end if
end