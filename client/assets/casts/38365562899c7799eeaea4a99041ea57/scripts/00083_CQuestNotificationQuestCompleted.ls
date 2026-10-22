-- Script
property m_rWindow
property m_ar_components
property m_rRadioButton
property m_ar_data

on construct me
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
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_ingame_completed.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  me.createRadioButton()
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
on createRadioButton me
  m_rRadioButton = createObject(getUniqueID(), "CQuestRadioButton")
  t_ar_elements = []
  t_ar_elements.append([#element: "quest.rating1", #description: EMPTY, #value: 1])
  t_ar_elements.append([#element: "quest.rating2", #description: EMPTY, #value: 2])
  t_ar_elements.append([#element: "quest.rating3", #description: EMPTY, #value: 3])
  t_ar_elements.append([#element: "quest.rating4", #description: EMPTY, #value: 4])
  t_ar_elements.append([#element: "quest.rating5", #description: EMPTY, #value: 5])
  m_rRadioButton.addElements(t_ar_elements)
  m_rRadioButton.setParentWindow(m_rWindow)
  m_rRadioButton.clickElement("quest.rating1")
  m_rRadioButton.updateMenu()
end
on rawData me, t_ar_data
  me.setField(m_rWindow, "quest.dialog.hd", t_ar_data[#questName])
  me.setField(m_rWindow, "quest.taskresults.hd", getText("quest.questresults.congratulations"))
  me.setField(m_rWindow, "quest.timetotal", seconds2time(t_ar_data[#questDurationInSecs]))
  t_sPrizeResults = EMPTY
  if t_ar_data[#prizingMode] = 1 then
    t_sTaskResults = replaceChunks(getText("quest.questprize.timedquest"), "%timeleft%", seconds2time(t_ar_data[#remainingQuestDurationInSecs])) & " "
  else
    if t_ar_data[#item_array].count = 0 and t_ar_data[#credits] = 0 then
      t_sTaskResults = getText("quest.questprize.noprize")
    else
      t_sTaskResults = replaceChunks(getText("quest.questprize"), "%prize%", rank2text(t_ar_data[#rank])) & " "
      repeat with i = 1 to t_ar_data[#item_array].count
        t_sItem = "item." & t_ar_data[#item_array][i][#itemCode]
        t_sProduct = "product." & t_ar_data[#item_array][i][#itemCode]
        t_sName = getText(t_sItem, getText(t_sProduct))
        t_sPrizeResults = t_sPrizeResults & t_sName
        if i = t_ar_data[#item_array].count then
          t_sPrizeResults = t_sPrizeResults & " and "
          next repeat
        end if
        t_sPrizeResults = t_sPrizeResults & ", "
      end repeat
      t_sPrizeResults = t_sPrizeResults & t_ar_data[#credits] && "credits"
    end if
  end if
  me.setField(m_rWindow, "quest.questresults.text", t_sTaskResults & RETURN & t_sPrizeResults)
  m_ar_data = t_ar_data
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.rating1", "quest.rating2", "quest.rating3", "quest.rating4", "quest.rating5":
        m_rRadioButton.clickElement(a_sElemID)
        m_rRadioButton.updateMenu()
      "mes.accept.button":
        t_ID = m_ar_data[#questTemplateId]
        t_iAvatarQuestId = m_ar_data[#avatarQuestId]
        t_iRating = m_rRadioButton.getValue()
        getThread(#QuestEngine).getHandler().RateQuest([t_ID, t_iAvatarQuestId, t_iRating])
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "quest.info":
        t_ID = m_ar_data[#questTemplateId]
        getThread(#QuestEngine).getHandler().GetQuestInstanceData([t_ID])
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "close":
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.questcomplete", getText("help.quest", "help.quest")))
      otherwise:
        put "InQuest.dialog.QuestCompleted.event:" && a_sElemID

    end case
  end if
end