-- Script
property m_rWindow
property m_ar_components
property m_ar_data
property m_rHiliterCol
property m_rBorderCol
property m_rGridLoadAnim

on construct me
  m_rHiliterCol = rgb(255, 204, 0)
  m_rBorderCol = rgb(80, 160, 216)
  m_rGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_ar_data = [:]
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  return 1
end
on deconstruct me
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  if objectp(m_rGridLoadAnim) then
    removeObject(m_rGridLoadAnim.getID())
    m_rGridLoadAnim = VOID
  end if
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_test.window")
  me.changeImageInElement(m_rWindow, "quest.main.label", member("quest.label.start"))
  me.createComponentWindow(m_rWindow, m_ar_components, ["quest.tasklist": [], "quest.prizes": []])
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
  me.setField(m_rWindow, "quest.main.hd", t_ar_data[#questName])
  me.setField(m_rWindow, "quest.info", t_ar_data[#description])
  repeat with i = 1 to t_ar_data[#prize_array].count
    t_ar_prizeData = t_ar_data[#prize_array][i]
    me.updatePrizeRank(t_ar_prizeData, i)
  end repeat
  repeat with t_ar_task in t_ar_data[#task_array]
    me.add_task(t_ar_task)
  end repeat
  m_rWindow.getElement("quest.tasklist").feedImage(m_ar_components["quest.tasklist"].render())
  case t_ar_data[#status] of
    3:
      me.setButtonState(m_rWindow, "quest.continuelater.button", 0)
      me.setButtonState(m_rWindow, "quest.test.button", 0)
    otherwise:
      me.setButtonState(m_rWindow, "quest.release.button", 0)
      me.setButtonState(m_rWindow, "quest.releaselater.button", 0)

  end case
  case t_ar_data[#prizingMode] of
    0:
      me.setField(m_rWindow, "quest.type.text", getText("quest.type." & t_ar_data[#prizingMode]))
    1:
      t_iTimeInMins = t_ar_data[#questDurationInSecs] / 60
      t_sText = replaceChunks(getText("quest.type.1"), "%time%", t_iTimeInMins)
      me.setField(m_rWindow, "quest.type.text", t_sText)
    otherwise:
      me.setField(m_rWindow, "quest.type.text", getText("quest.type.0"))

  end case
  t_iTotalItemCount = 0
  t_iTotalCreditsCount = 0
  repeat with i = 1 to t_ar_data[#prize_array].count
    t_ar_prizeData = t_ar_data[#prize_array][i]
    t_iTotalItemCount = t_iTotalItemCount + t_ar_prizeData[#item_array].count
    t_iTotalCreditsCount = t_iTotalCreditsCount + t_ar_prizeData[#credits]
  end repeat
  t_sText = replaceChunks(getText("quest.prizeoffer.info"), "%credits%", t_iTotalCreditsCount)
  t_sText = replaceChunks(t_sText, "%items%", t_iTotalItemCount)
  me.setField(m_rWindow, "quest.prizeoffer.info", t_sText)
end
on add_task me, t_ar_taskData
  t_rComponent = m_ar_components["quest.tasklist"].addComponent("component.quest.start.viewtask.xml")
  t_sText = getText("quest.taskname." & t_ar_taskData[#taskType])
  t_rComponent.GetLayout(1).setText(t_sText)
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.prizes":
        t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        t_rComponentPage = m_ar_components[a_sElemID]
        t_rComponentPage.EventProc(a_vParam, t_ar_event)
        if t_ar_event.found then
          t_rClientElement = tWndObj.getElement(a_sElemID)
          case t_ar_event.event of
            "quest.prizes.less":
              t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
              t_rOwner = me.getManager().GetOwner()
              if objectp(t_rOwner) then
                t_rOwner.MoveItemIndex(t_iRank, -1, 2)
              end if
              executeMessage("PlayInterfaceSound", "UI-click")
            "quest.prizes.more":
              t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
              t_rOwner = me.getManager().GetOwner()
              if objectp(t_rOwner) then
                t_rOwner.MoveItemIndex(t_iRank, 1, 2)
              end if
              executeMessage("PlayInterfaceSound", "UI-click")
            "quest.prizes.1", "quest.prizes.2":
              if the doubleClick then
                t_iShift = 0
                if t_ar_event.event = "quest.prizes.2" then
                  t_iShift = 1
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
                    getThread(#QuestEngine).getHandler().GetPrizeItemDetails([t_ID, t_ar_data[#taken_prize_count] + t_iRank, t_iItemIndex])
                  end if
                end if
              end if

          end case
        end if
      "mes.accept.button":
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "close", "mes.deny.button":
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "quest.test.button":
        getThread(#QuestEngine).getHandler().GetCurrentTaskData([])
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "quest.releaselater.button":
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "quest.release.button":
        t_ar_results = [:]
        t_ar_results[#testQuest] = 0
        t_ar_results[#releaseQuest] = 1
        if objectp(t_rManager) then
          t_rManager.appendSubResult(t_ar_results)
          t_rManager.resolveSubtask()
          t_rManager.Activate()
        end if
      "quest.edit.button":
        t_txt = getText("quest.dialog.editquestconfirmation")
        t_title = getText("quest.alert.title")
        t_btn1 = getText("quest.alert.cancel")
        t_btn2 = getText("quest.alert.ok")
        t = createDialogWindow(me.getID(), "quest.dialog.editquestconfirmation", 2, 1)
        t.setText(t_txt, t_title, t_btn1, t_btn2)
        t.show()
      "quest.continuelater.button":
        getThread(#QuestEngine).getHandler().StopQuestTesting([m_ar_data[#questTemplateId], 0])
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.start", getText("help.quest", "help.quest")))
      otherwise:
        put "Notification.dialog.StartQuest.event:" && a_sElemID

    end case
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  t_rManager = me.getManager()
  t_rOwner = t_rManager.GetOwner()
  case t_dialogName of
    "quest.dialog.editquestconfirmation":
      case t_dialogEvent of
        #dialogOK:
          getThread(#QuestEngine).getHandler().StopQuestTesting([m_ar_data[#questTemplateId], 1])
          if objectp(t_rManager) then
            removeObject(t_rManager.getID())
          end if
        #dialogCancel:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on updatePrizeRank me, t_ar_data, t_iRank, a_iTaken_prize_count
  t_sElemName = "quest.prizes"
  t_rComponentPage = m_ar_components[t_sElemName]
  t_rClientElement = m_rWindow.getElement("quest.prizes")
  t_rComponent = t_rComponentPage.getComponentAt(t_iRank, 0)
  if not objectp(t_rComponent) then
    t_rComponent = t_rComponentPage.addComponent("component.quest.join.prizes.xml", 0)
  end if
  i = t_iRank + a_iTaken_prize_count
  t_rComponent.GetLayout(1).setText(rank2text(i) & RETURN & getText("quest.prize"))
  t_rComponent.GetLayout(2).setText(string(t_ar_data[#credits]))
  t_mp_iType_rThumb = [:]
  repeat with t_rItem in t_ar_data[#item_array]
    t_mp_iType_rThumb.setaProp(t_rItem[#itemCode], VOID)
  end repeat
  if t_mp_iType_rThumb.count > 0 then
    m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("quest.prizes"))
    receiveUpdate(m_rGridLoadAnim.getID())
  end if
  executeMessage("GetMixedThumbnail", t_mp_iType_rThumb, [#client: me.getID(), #method: #_PrizePreviewReadyCbk, #rank: t_iRank, #data: t_ar_data])
  if t_mp_iType_rThumb.count = 0 then
    t_rComponent = t_rComponentPage.getComponentAt(t_iRank, 0)
    if not objectp(t_rComponent) then
      t_rComponent = t_rComponentPage.addComponent("component.quest.join.prizes.xml", 0)
    end if
    t_rThumbBg = image(40, 40, 32)
    t_rThumbBg.useAlpha = 1
    t_rLightBlue = rgb(39, 86, 146)
    t_rThumbBg.fill(t_rThumbBg.rect, [#shapeType: #rect, #color: t_rLightBlue])
    repeat with i = 1 to 2
      t_rLayout = t_rComponent.GetLayout(3 + i)
      if objectp(t_rLayout) then
        t_rIconImg = t_rThumbBg.duplicate()
        t_rIconImg.draw(t_rIconImg.rect, [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
        t_rLayout.setIconImage(t_rIconImg)
        t_rLayout.setNode([#itemReference: -1, #itemCode: -1])
      end if
    end repeat
    t_rImg = t_rComponentPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
end
on _PrizePreviewReadyCbk me, a_mp_iType_rImage, a_mp_Data
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  t_sElemName = "quest.prizes"
  t_rComponentPage = m_ar_components[t_sElemName]
  t_rClientElement = m_rWindow.getElement("quest.prizes")
  t_iRank = a_mp_Data.rank
  t_ar_data = a_mp_Data.data
  t_rComponent = t_rComponentPage.getComponentAt(t_iRank, 0)
  if not objectp(t_rComponent) then
    t_rComponent = t_rComponentPage.addComponent("component.quest.join.prizes.xml", 0)
  end if
  if voidp(t_ar_data[#item_index]) then
    t_ar_data[#item_index] = 1
  end if
  t_index = t_ar_data[#item_index]
  t_iMaxItemsPerRow = 2
  t_ar_items = array_slice(t_ar_data[#item_array], t_index, t_iMaxItemsPerRow)
  repeat while t_ar_items.count < t_iMaxItemsPerRow
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
  t_rImg = t_rComponentPage.render()
  t_rClientElement.feedImage(t_rImg)
end