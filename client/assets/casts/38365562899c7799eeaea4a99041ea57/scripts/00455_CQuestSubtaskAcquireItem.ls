-- Script
property m_rWindow
property m_ar_components
property m_sSelectedTab
property m_rGridFurnishings
property m_rGridPins
property m_rGridPosters
property m_rGridClothing
property m_rGrid
property m_iSelected

on construct me
  m_rGridFurnishings = createObject(#random, "CQuestInvItemGrid")
  m_rGridPins = createObject(#random, "CQuestInvItemGrid")
  m_rGridPosters = createObject(#random, "CQuestInvItemGrid")
  m_rGridClothing = createObject(#random, "CQuestInvItemGrid")
  m_rGrid = VOID
  m_iSelected = -1
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  m_sSelectedTab = "furniture"
  return 1
end
on deconstruct me
  removeObject(m_rGrid)
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
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
    case a_kAlteredCategory of
      #items:
        m_rGrid = m_rGridFurnishings
        m_iSelected = -1
        m_rGrid.render(a_mp_kType_mp_iRef_rItem, m_rWindow.getElement("tra.objects"))
      #pins:
        m_rGrid = m_rGridPins
        m_iSelected = -1
        m_rGrid.render(a_mp_kType_mp_iRef_rItem, m_rWindow.getElement("tra.objects"))
      #posters:
        m_rGrid = m_rGridPosters
        m_iSelected = -1
        m_rGrid.render(a_mp_kType_mp_iRef_rItem, m_rWindow.getElement("tra.objects"))
      #clothes:
        m_rGrid = m_rGridClothing
        m_iSelected = -1
        m_rGrid.render(a_mp_kType_mp_iRef_rItem, m_rWindow.getElement("tra.objects"))
      #step2, "step2", "acquireitem":
        m_sSelectedTab = "furniture"
        me.HideTabs()
        t = [:]
        if getThread("inventory").getComponent().GetItemsByCategory(#items, t) then
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
  t = [:]
  if getThread("inventory").getComponent().GetItemsByCategory(t_iCategory, t) then
    me.update(t, t_iCategory)
  else
    put "Could not get clothes-data from inventory" && t_iCategory
  end if
end
on GetSelected me
  if objectp(m_rGrid) then
    return m_rGrid.GetSelected()
  else
    return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
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
  put "Update task: Acquire Item" && t_ar_data
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
        m_rGrid.MouseSelection(a_vParam)
        if the doubleClick then
          put "select an move on"
        end if
      "tra.tab.furniture.passive":
        m_sSelectedTab = "furniture"
        me.HideTabs()
        t = [:]
        if getThread("inventory").getComponent().GetItemsByCategory(#items, t) then
          me.update(t, #items)
        else
          put "Could not get items-data from inventory"
        end if
      "tra.tab.pins.passive":
        m_sSelectedTab = "pins"
        me.HideTabs()
        t = [:]
        if getThread("inventory").getComponent().GetItemsByCategory(#pins, t) then
          me.update(t, #pins)
        else
          put "Could not get pins-data from inventory"
        end if
      "tra.tab.clothes.passive":
        m_sSelectedTab = "clothes"
        me.HideTabs()
        t = [:]
        if getThread("inventory").getComponent().GetItemsByCategory(#clothes, t) then
          me.update(t, #clothes)
        else
          put "Could not get clothes-data from inventory"
        end if
      "tra.tab.posters.passive":
        m_sSelectedTab = "posters"
        me.HideTabs()
        t = [:]
        if getThread("inventory").getComponent().GetItemsByCategory(#posters, t) then
          me.update(t, #posters)
        else
          put "Could not get posters-data from inventory"
        end if
      "quest.magics":
      "mes.accept.button":
        t_bDataOK = 0
        t_rSelected = m_rGrid.GetSelected()
        if not voidp(t_rSelected) then
          t_ar_results = [:]
          t_ar_results[#itemCode] = m_rGrid.GetSelected()[#code]
          if objectp(t_rManager) then
            t_rManager.appendSubResult(t_ar_results)
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
          t_bDataOK = 1
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
      otherwise:
        put "Subtask.Magics.event:" && a_sElemID

    end case
  end if
end