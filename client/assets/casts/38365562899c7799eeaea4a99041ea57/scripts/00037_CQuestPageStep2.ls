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
property m_sSelectedTab
property m_iSelected
property m_rGridRenderer
property m_rHiliterCol
property m_rBorderCol

on construct me
  m_rGridFurnishings = createObject(#random, "CQuestInvItemGrid")
  m_rGridPins = createObject(#random, "CQuestInvItemGrid")
  m_rGridPosters = createObject(#random, "CQuestInvItemGrid")
  m_rGridClothing = createObject(#random, "CQuestInvItemGrid")
  m_rGridRenderer = VOID
  m_iSelected = -1
  m_sSelectedTab = "furnishings"
  m_iAvailableCredits = 0
  m_iCurrentPrize = 0
  m_iPrizeStep = 50
  m_iCreditsState = #inactive
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  m_rHiliterCol = rgb(255, 204, 0)
  m_rBorderCol = rgb(80, 160, 216)
  return 1
end
on deconstruct me
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
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
    m_rWindow.getElement("quest.inventory").hide()
    m_rWindow.getElement("quest.scrollbar").hide()
  else
    m_rWindow.getElement("quest.inventory").show()
    m_rWindow.getElement("quest.scrollbar").show()
  end if
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
    case a_kAlteredCategory of
      #items:
        m_rGridRenderer = m_rGridFurnishings
        m_iSelected = -1
        m_rGridRenderer.render(a_mp_kType_mp_iRef_rItem, m_rWindow.getElement("quest.inventory"))
      #pins:
        m_rGridRenderer = m_rGridPins
        m_iSelected = -1
        m_rGridRenderer.render(a_mp_kType_mp_iRef_rItem, m_rWindow.getElement("quest.inventory"))
      #posters:
        m_rGridRenderer = m_rGridPosters
        m_iSelected = -1
        m_rGridRenderer.render(a_mp_kType_mp_iRef_rItem, m_rWindow.getElement("quest.inventory"))
      #clothes:
        m_rGridRenderer = m_rGridClothing
        m_iSelected = -1
        m_rGridRenderer.render(a_mp_kType_mp_iRef_rItem, m_rWindow.getElement("quest.inventory"))
      #step2, "step2":
        m_sSelectedTab = "furnishings"
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
  t = [:]
  if getThread("inventory").getComponent().GetItemsByCategory(t_iCategory, t) then
    me.update(t, t_iCategory)
  else
    put "Could not get clothes-data from inventory" && t_iCategory
  end if
end
on GetSelected me
  if objectp(m_rGridRenderer) then
    return m_rGridRenderer.GetSelected()
  else
    return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
  end if
end
on HideTabs me
  t_ar_tabs = ["furnishings", "pins", "posters", "clothing", "credits"]
  repeat with t_sTabName in t_ar_tabs
    m_rWindow.getElement("tab." & t_sTabName & ".active").hide()
  end repeat
  m_rWindow.getElement("tab." & m_sSelectedTab & ".active").show()
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
    repeat with t_sComponentName in t_ar_components
      t_rComponentsPage.addComponent(t_sComponentName)
    end repeat
    t_rImg = t_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
    m_ar_components[t_sElemName] = t_rComponentsPage
  end repeat
end
on updatePrizeRank me, t_ar_data, t_iRank
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
  executeMessage("GetItemThumbnail", t_mp_iType_rThumb)
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
        t_rTempImg = t_mp_iType_rThumb.getaProp(t_iCode)
        if objectp(t_rTempImg) then
          t_rIconImg.copyPixels(t_rTempImg, t_rTempImg.rect, t_rTempImg.rect, [#maskImage: t_rTempImg.extractAlpha(), #ink: 36, #useFastQuads: 1])
        end if
      end if
      t_rIconImg.draw(t_rIconImg.rect, [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
      t_rLayout.setIconImage(t_rIconImg)
      t_rLayout.setNode(t_ar_Item)
    end if
  end repeat
  t_rImg = t_rComponentPage.render()
  t_rClientElement.feedImage(t_rImg)
  me.updateCurrentCategory()
end
on PrizeCreditsAdded me, t_ar_data
  put "DONE?" && #PrizeCreditsAdded && t_ar_data
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
  t_rItem = m_rGridRenderer.GetSelected()
  t_iCode = t_rItem.code
  t_rBack = getMember("previewbox").image.duplicate()
  if t_iCode < 0 then
  end if
end
on addSelectedItem me
  t_ar_selected = me.GetSelected()
  t_ar_questData = me.getManager().GetOwner().getData()
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
        t_ar_questData = me.getManager().GetOwner().getData()
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
      t_ar_questData = me.getManager().GetOwner().getData()
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
        "quest.inventory":
          m_rGridRenderer.MouseSelection(a_vParam)
          if the doubleClick then
            me.addSelectedItem()
          end if
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
          t = [:]
          if getThread("inventory").getComponent().GetItemsByCategory(#items, t) then
            me.update(t, #items)
          else
            put "Could not get items-data from inventory"
          end if
        "tab.pins.passive":
          m_sSelectedTab = "pins"
          me.HideTabs()
          me.creditsState(0)
          t = [:]
          if getThread("inventory").getComponent().GetItemsByCategory(#pins, t) then
            me.update(t, #pins)
          else
            put "Could not get pins-data from inventory"
          end if
        "tab.posters.passive":
          m_sSelectedTab = "posters"
          me.HideTabs()
          t = [:]
          if getThread("inventory").getComponent().GetItemsByCategory(#posters, t) then
            me.update(t, #posters)
          else
            put "Could not get posters-data from inventory"
          end if
        "tab.clothing.passive":
          m_sSelectedTab = "clothing"
          me.HideTabs()
          me.creditsState(0)
          t = [:]
          if getThread("inventory").getComponent().GetItemsByCategory(#clothes, t) then
            me.update(t, #clothes)
          else
            put "Could not get clothes-data from inventory"
          end if
        "tab.credits.passive":
          m_sSelectedTab = "credits"
          me.HideTabs()
          me.creditsState(1)
        "quest.prizes":
          t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
          executeMessage("PlayInterfaceSound", "UI-click")
          t_rComponentPage = m_ar_components[a_sElemID]
          t_rComponentPage.EventProc(a_vParam, t_ar_event)
          if t_ar_event.found then
            t_rClientElement = tWndObj.getElement(a_sElemID)
            case t_ar_event.event of
              "quest.delete":
                t_ar_questData = me.getManager().GetOwner().getData()
                t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
                getThread(#QuestEngine).getHandler().ClearPrize([t_ar_questData[#questTemplateId], t_iRank])
              "quest.addprize":
                t_ar_questData = me.getManager().GetOwner().getData()
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
          t_ar_questData = me.getManager().GetOwner().getData()
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