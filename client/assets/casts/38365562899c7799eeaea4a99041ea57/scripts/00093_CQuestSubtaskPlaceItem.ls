-- Script
property m_rWindow
property m_ar_components
property m_ar_data
property m_rSprite
property m_rGrid

on construct me
  m_rSprite = VOID
  m_rGrid = createObject(getUniqueID(), "CQuestPlaceItemGrid")
  m_ar_components = [:]
  m_ar_data = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  return 1
end
on deconstruct me
  removeObject(m_rGrid)
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  if objectp(m_rSprite) then
    releaseSprite(m_rSprite.spriteNum)
  end if
  getThread(#QuestEngine).getComponent().HideFindableItem([])
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_placeitem.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.placeitem"))
  end if
  t_ar_items = [:]
  t_ar_items["1"] = [#ItemId: 383, #icon: "icon.skull"]
  t_ar_items["2"] = [#ItemId: 384, #icon: "icon.atom"]
  t_ar_items["3"] = [#ItemId: 385, #icon: "icon.diamond"]
  t_ar_items["4"] = [#ItemId: 386, #icon: "icon.horseshoe"]
  t_ar_items["5"] = [#ItemId: 387, #icon: "icon.cloverleaf"]
  t_ar_items["6"] = [#ItemId: 400, #icon: "icon.mickey"]
  m_rGrid.render(t_ar_items, m_rWindow.getElement("quest.itemlist"))
  me.setField(m_rWindow, "quest.placewhat", getText("quest.placewhat.383"))
  me.setButtonState(m_rWindow, "quest.place.continue", 0)
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = t_rManager.getResults()
    if listp(t_ar_results) then
      repeat with i = 1 to t_ar_results.count
        t_iProp = t_ar_results.getPropAt(i)
        t_iValue = t_ar_results[i]
        put "Data From Manager " && t_iProp && t_iValue
        m_ar_data[t_iProp] = t_iValue
      end repeat
    end if
  end if
  return t_bSuccess
end
on Purge me, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on update me, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    if a_kAlteredCategory = #step2 then
    end if
  end if
end
on setItemList me, t_ar_items
  m_ar_items = t_ar_items[#item_array]
end
on rawData me, t_ar_data
  put "Update Task Place Item" && t_ar_data
  m_ar_data = t_ar_data
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#taskType] = t_ar_data[#taskType]
    t_ar_results[#questTemplateId] = t_ar_data[#questTemplateId]
    t_ar_results[#activeTaskRank] = t_ar_data[#activeTaskRank]
    t_rManager.appendSubResult(t_ar_results)
  end if
end
on placeItem me, t_iItemCode
  t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(getObject(#session).get("room_own_avatar"), "avatar")
  if objectp(t_rObj) then
    t_rTile = GetTileAtPos(t_rObj.GetAbsPos())
    if objectp(t_rTile) then
      t_sClass = t_rTile.GetParam("CLASS")
      if not (t_sClass = "EXIT") then
        t_iTileRef = value(t_rTile.GetParam("REF"))
        getThread(#QuestEngine).getComponent().ViewFindableItems([#item_count: 1, #item_array: [[#tileReference: t_iTileRef, #findableItemCode: t_iItemCode]]])
        executeMessage("PlayInterfaceSound", "QE_item_placed")
        me.setButtonState(m_rWindow, "quest.place.continue", 1)
        return t_iTileRef
      else
        t_txt = getText("quest.alert.placeitem")
        t_title = getText("quest.alert.title")
        t_btn1 = getText("quest.alert.ok")
        t = createDialogWindow(me.getID(), "quest.alert.placeitem", 1, 1)
        t.setText(t_txt, t_title, t_btn1)
        t.show()
      end if
    end if
  end if
  return -1
end
on appendResults me
  t_rManager = me.getManager()
  t_bDataOK = 0
  t_rSelected = m_rGrid.GetSelected()
  if not voidp(t_rSelected) then
    t_ar_results = [:]
    t_iData = t_rSelected[#ItemId]
    t_iTileRef = me.placeItem(t_iData)
    t_ar_results[#findableItemCode] = t_iData
    t_ar_results[#questTemplateId] = m_ar_data[#questTemplateId]
    t_ar_results[#tileReference] = t_iTileRef
    if objectp(t_rManager) then
      t_rManager.appendSubResult(t_ar_results)
    end if
    t_bDataOK = 1
  end if
  if not t_bDataOK then
    t_txt = getText("quest.alert.select.item")
    t_title = getText("quest.alert.title")
    t_btn1 = getText("quest.alert.ok")
    t = createDialogWindow(me.getID(), "quest.alert.item", 1, 1)
    t.setText(t_txt, t_title, t_btn1)
    t.show()
  end if
  return t_bDataOK
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_rOwner = t_rManager.GetOwner()
  end if
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.itemlist":
        m_rGrid.MouseSelection(a_vParam)
        t_rSelected = m_rGrid.GetSelected()
        if not voidp(t_rSelected) then
          t_iData = t_rSelected[#ItemId]
          me.setField(m_rWindow, "quest.placewhat", getText("quest.placewhat." & t_iData))
        end if
      "quest.placeitem.button", "mes.accept.button":
        me.appendResults()
        if the doubleClick then
          if objectp(t_rManager) then
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
        end if
      "quest.place.continue":
        if objectp(t_rManager) then
          t_rManager.resolveSubtask()
          t_rManager.Activate()
        end if
      "close", "quest.quit", "mes.deny.button":
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_rManager.cancelSubtask()
          t_rManager.Activate()
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.placeitem", getText("help.quest", "help.quest")), 1)
      otherwise:
        put "Subtask.PlaceItem.event:" && a_sElemID

    end case
  end if
end