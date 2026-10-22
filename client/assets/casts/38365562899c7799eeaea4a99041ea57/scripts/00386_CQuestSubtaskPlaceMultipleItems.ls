-- Script
property m_rWindow
property m_ar_components
property m_ar_data
property m_rSprite
property m_rGrid
property m_ar_items
property m_iMaxLimit
property m_iCurrentScore
property m_iScoreState
property m_ar_defaults
property m_iLeaveRoomCount

on construct me
  m_ar_defaults = [#min: 1, #max: 1, #accuracy: 1, #default: 1]
  m_iCurrentScore = 1
  m_ar_defaults[#accuracy] = 1
  m_iScoreState = #inactive
  m_iMaxLimit = 15
  m_rSprite = VOID
  m_ar_items = []
  m_ar_data = [:]
  m_rGrid = createObject(getUniqueID(), "CQuestPlaceItemGrid")
  registerMessage(#room_leave, me.getID(), #leaveRoom)
  m_iLeaveRoomCount = 0
  m_ar_components = [:]
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
on leaveRoom me
  m_iLeaveRoomCount = m_iLeaveRoomCount + 1
  if m_iLeaveRoomCount > 1 then
    me.ClearAll()
  end if
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_place_multi.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.placemulti"))
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
  me.setAmount(m_ar_defaults[#default])
  me.setField(m_rWindow, "quest.items.dropped", m_ar_items.count.string)
  me.setButtonTxt(m_rWindow, "quest.pickup.button", getText("quest.pickup", getText("quest.pickup.button", "PICK UP")))
  t_rManager = me.getManager()
  t_ar_data = [:]
  if objectp(t_rManager) then
    t_ar_results = t_rManager.getResults()
    if listp(t_ar_results) then
      repeat with i = 1 to t_ar_results.count
        t_iProp = t_ar_results.getPropAt(i)
        t_iValue = t_ar_results[i]
        if t_iProp = #itemsData then
          t_ar_data[#item_count] = t_iValue.count
          t_ar_data[#item_array] = t_iValue
          next repeat
        end if
        t_ar_data[t_iProp] = t_iValue
      end repeat
      if t_ar_data.count > 0 then
        me.rawData(t_ar_data)
      end if
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
on rawData me, t_ar_data
  m_ar_data = t_ar_data
  m_ar_items = t_ar_data[#item_array]
  m_ar_defaults[#max] = t_ar_data[#item_array].count
  me.setAmount(t_ar_data[#required])
  t_ar_ItemData = [#item_count: m_ar_items.count, #item_array: m_ar_items]
  getThread(#QuestEngine).getComponent().ViewFindableItems(t_ar_ItemData)
  if m_ar_items.count > 0 then
    me.setButtonState(m_rWindow, "quest.place.continue", 1)
  else
    me.setButtonState(m_rWindow, "quest.place.continue", 0)
  end if
  me.setField(m_rWindow, "quest.items.dropped", t_ar_data[#item_count].string)
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#taskType] = t_ar_data[#taskType]
    t_ar_results[#questTemplateId] = t_ar_data[#questTemplateId]
    t_ar_results[#activeTaskRank] = t_ar_data[#activeTaskRank]
    t_rManager.appendSubResult(t_ar_results)
  end if
end
on setItemList me, t_ar_items
  m_ar_items = t_ar_items[#item_array]
end
on pickUpItem me
  t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(getObject(#session).get("room_own_avatar"), "avatar")
  if objectp(t_rObj) then
    t_rTile = GetTileAtPos(t_rObj.GetAbsPos())
    if objectp(t_rTile) then
      t_sClass = t_rTile.GetParam("CLASS")
      if not (t_sClass = "EXIT") then
        t_iTileRef = value(t_rTile.GetParam("REF"))
        t_bfound = 0
        i = 0
        repeat with i = 1 to m_ar_items.count
          t_ar_Item = m_ar_items[i]
          if t_ar_Item[#tileReference] = t_iTileRef then
            t_bfound = 1
            exit repeat
          end if
        end repeat
        if t_bfound then
          m_ar_items.deleteAt(i)
        else
          put "Could not find an item at this position, please walk to an item"
        end if
        t_ar_ItemData = [#item_count: m_ar_items.count, #item_array: m_ar_items]
        getThread(#QuestEngine).getComponent().ViewFindableItems(t_ar_ItemData)
        if m_ar_items.count > 0 then
          me.setButtonState(m_rWindow, "quest.place.continue", 1)
        else
          me.setButtonState(m_rWindow, "quest.place.continue", 0)
        end if
        me.setField(m_rWindow, "quest.items.dropped", m_ar_items.count.string)
        m_ar_defaults[#max] = min(m_ar_defaults[#max], m_ar_items.count)
        m_iCurrentScore = min(m_iCurrentScore, m_ar_defaults[#max])
        me.setAmount(m_iCurrentScore)
        return 1
      else
        t_txt = getText("quest.alert.placemulti")
        t_title = getText("quest.alert.title")
        t_btn1 = getText("quest.alert.ok")
        t = createDialogWindow(me.getID(), "quest.alert.placeitem", 1, 1)
        t.setText(t_txt, t_title, t_btn1)
        t.show()
      end if
    end if
  end if
  return 0
end
on placeItem me, t_iItemCode
  if m_ar_items.count < m_iMaxLimit then
    t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(getObject(#session).get("room_own_avatar"), "avatar")
    if objectp(t_rObj) then
      t_rTile = GetTileAtPos(t_rObj.GetAbsPos())
      if objectp(t_rTile) then
        t_sClass = t_rTile.GetParam("CLASS")
        if not (t_sClass = "EXIT") then
          t_iTileRef = value(t_rTile.GetParam("REF"))
          repeat with t_rItem in m_ar_items
            if t_rItem[#tileReference] = t_iTileRef then
              t_txt = getText("quest.alert.placemultiexist")
              t_title = getText("quest.alert.title")
              t_btn1 = getText("quest.alert.ok")
              t = createDialogWindow(me.getID(), "quest.alert.placemultiexist", 1, 1)
              t.setText(t_txt, t_title, t_btn1)
              t.show()
              return -1
            end if
          end repeat
          m_ar_items.append([#tileReference: t_iTileRef, #findableItemCode: t_iItemCode])
          t_ar_ItemData = [#item_count: m_ar_items.count, #item_array: m_ar_items]
          getThread(#QuestEngine).getComponent().ViewFindableItems(t_ar_ItemData)
          executeMessage("PlayInterfaceSound", "QE_item_placed")
          me.setButtonState(m_rWindow, "quest.place.continue", 1)
          me.setField(m_rWindow, "quest.items.dropped", m_ar_items.count.string)
          m_ar_defaults[#max] = m_ar_items.count
          return t_iTileRef
        else
          t_txt = getText("quest.alert.placemulti")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.placeitem", 1, 1)
          t.setText(t_txt, t_title, t_btn1)
          t.show()
        end if
      end if
    end if
  else
    t_txt = getText("quest.alert.placemulti.maxlimit")
    t_title = getText("quest.alert.title")
    t_btn1 = getText("quest.alert.ok")
    t = createDialogWindow(me.getID(), "quest.alert.placemulti.maxlimit", 1, 1)
    t.setText(t_txt, t_title, t_btn1)
    t.show()
  end if
  return -1
end
on ClearAll me
  m_ar_items = []
  t_ar_ItemData = [#item_count: m_ar_items.count, #item_array: m_ar_items]
  getThread(#QuestEngine).getComponent().ViewFindableItems(t_ar_ItemData)
  me.setButtonState(m_rWindow, "quest.place.continue", 0)
  me.setField(m_rWindow, "quest.items.dropped", m_ar_items.count.string)
  m_ar_defaults[#max] = 1
  m_iCurrentScore = 1
  me.setAmount(m_iCurrentScore)
end
on addItem me
  t_bDataOK = 0
  t_rSelected = m_rGrid.GetSelected()
  if not voidp(t_rSelected) then
    t_ar_results = [:]
    t_iData = t_rSelected[#ItemId]
    me.placeItem(t_iData)
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
on appendResults me
  t_rManager = me.getManager()
  t_ar_results = [:]
  t_ar_results[#questTemplateId] = m_ar_data[#questTemplateId]
  t_ar_results[#itemsData] = m_ar_items
  t_ar_results[#required] = m_iCurrentScore
  put "Append.results: Current score" && m_iCurrentScore
  if objectp(t_rManager) then
    t_rManager.appendSubResult(t_ar_results)
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_rOwner = t_rManager.GetOwner()
  end if
  if a_kEvent = #mouseDown then
    case a_sElemID of
      "quest.itemlimit.up":
        m_iScoreState = #toprize
        me.updateAmount()
        createTimeout("updateScore", 100, #updateAmount, me.getID(), VOID, VOID)
      "quest.itemlimit.down":
        m_iScoreState = #fromprize
        me.updateAmount()
        createTimeout("updateScore", 100, #updateAmount, me.getID(), VOID, VOID)

    end case
  else
    if a_kEvent = #mouseUp then
      m_iScoreState = #inactive
      if timeoutExists("updateScore") then
        removeTimeout("updateScore")
      end if
      case a_sElemID of
        "quest.itemlist":
          m_rGrid.MouseSelection(a_vParam)
          t_rSelected = m_rGrid.GetSelected()
          if not voidp(t_rSelected) then
            t_iData = t_rSelected[#ItemId]
            me.setField(m_rWindow, "quest.placewhat", getText("quest.placewhat." & t_iData))
          end if
        "quest.pickup.button":
          me.pickUpItem()
        "quest.clearitems.button":
          me.ClearAll()
        "quest.placeitem.button":
          me.addItem()
          me.appendResults()
        "mes.accept.button":
          me.appendResults()
        "quest.place.continue":
          me.appendResults()
          me.ClearAll()
          if objectp(t_rManager) then
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
        "close", "quest.quit", "mes.deny.button":
          me.ClearAll()
          t_rManager = me.getManager()
          if objectp(t_rManager) then
            t_rManager.cancelSubtask()
            t_rManager.Activate()
          end if
        "help":
          executeMessage("PlayInterfaceSound", "UI-click")
          executeMessage(#open_help_page, getText("help.quest.findmultiple", getText("help.quest", "help.quest")), 1)

      end case
    end if
  end if
end
on setCredits me, t_iCredits
  t_rElement = m_rWindow.getElement("quest.items.needed")
  if t_rElement <> 0 then
    t_rElement.setText(t_iCredits)
  end if
end
on setAmount me, t_iCredits
  if objectp(m_rWindow) then
    t_rElement = m_rWindow.getElement("quest.items.needed")
    if t_rElement <> 0 then
      t_rElement.setText(t_iCredits)
    end if
  end if
  m_iCurrentScore = t_iCredits
end
on addToPrize me
  if m_iCurrentScore + m_ar_defaults[#accuracy] <= m_ar_defaults[#max] then
    me.setAmount(m_iCurrentScore + m_ar_defaults[#accuracy])
  else
    me.setAmount(m_ar_defaults[#max])
  end if
end
on removeFromPrize me
  if m_iCurrentScore - m_ar_defaults[#accuracy] >= m_ar_defaults[#min] then
    me.setAmount(m_iCurrentScore - m_ar_defaults[#accuracy])
  else
    me.setAmount(m_ar_defaults[#min])
  end if
end
on updateAmount me
  case m_iScoreState of
    #toprize:
      me.addToPrize()
    #fromprize:
      me.removeFromPrize()

  end case
end