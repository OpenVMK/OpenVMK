-- Movie Script
property m_ar_data
property m_rInterface
property m_sCurrentPage

on construct me
  if not getThread("inventory").getComponent().getInventoryLoaded() then
    getThread("inventory").getComponent()._LoadInventory()
  end if
  m_rInterface = createObject(getUniqueID(), "CQuestWindowManager")
  m_rInterface.SetOwner(me)
  m_sCurrentPage = EMPTY
  m_ar_data = [:]
  getWindow("MessageBar").getElement("chat.field").setFocus(0)
  return 1
end
on deconstruct me
  getWindow("MessageBar").getElement("chat.field").setFocus(1)
  if objectp(m_rInterface) then
    removeObject(m_rInterface.getID())
  end if
  return 1
end
on getInterface me
  return m_rInterface
end
on GetTestingRequired me
  if voidp(m_ar_data[#testingRequired]) then
    return 1
  end if
  return m_ar_data[#testingRequired]
end
on getData me
  return m_ar_data
end
on hide me
  m_rInterface.hide()
end
on show me
  m_rInterface.show()
end
on ChangePageEvent me, t_iManagerID, t_sPageName
  put "Quest Template Change Page Event Received" && t_iManagerID && t_sPageName
  m_sCurrentPage = t_sPageName
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  case t_sPageName of
    "step1":
      if objectp(t_rCurrentPage) then
        repeat with t_ar_taskData in m_ar_data[#task_array]
          t_rCurrentPage.AddTask(t_ar_taskData)
        end repeat
        me.checkTestingStatus()
      end if
    "step2":
      if not getThread("inventory").getComponent().getInventoryLoaded() then
        put "ERROR, inventory has not been loaded"
        getThread("inventory").getComponent()._LoadInventory()
      end if
      if objectp(t_rCurrentPage) then
        t_rCurrentPage.setCredits(getObject(#session).get("user_credits"))
        t_rCurrentPage.setPrize(0)
        repeat with i = 1 to m_ar_data[#prize_array].count
          t_ar_prizeData = m_ar_data[#prize_array][i]
          t_rCurrentPage.updatePrizeRank(t_ar_prizeData, i)
        end repeat
        me.checkTestingStatus()
      end if
      if m_ar_data[#prize_array].count = 0 then
        getThread(#QuestEngine).getHandler().AddPrizeCredits([m_ar_data[#questTemplateId], 0, 0])
      end if
    "step3":
      if objectp(t_rCurrentPage) then
        t_rCurrentPage.setPrizingMode(m_ar_data[#prizingMode])
        t_rCurrentPage.SetName(m_ar_data[#questName])
        t_rCurrentPage.setDuration(m_ar_data[#questDurationInSecs])
        t_rCurrentPage.setDescription(m_ar_data[#description])
        me.checkTestingStatus()
      end if
    "startquest":
      if objectp(t_rCurrentPage) then
        t_rCurrentPage.rawData(m_ar_data)
      end if
    otherwise:
      put "Unknown page"

  end case
end
on checkTestingStatus me
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_bTestStatus = 0
  if m_ar_data[#status] > 1 then
    t_bTestStatus = 1
  else
    if m_ar_data[#description].length > 0 and m_ar_data[#questName].length > 0 and m_ar_data[#task_array].count > 0 and m_ar_data[#prize_array].count > 0 then
      t_iCredits = 0
      t_iPrizeCount = 0
      repeat with t_ar_prize in m_ar_data[#prize_array]
        t_iCredits = t_iCredits + t_ar_prize[#credits]
        t_iPrizeCount = t_iPrizeCount + t_ar_prize[#item_array].count
      end repeat
      if t_iCredits > 0 or t_iPrizeCount > 0 then
        t_bTestStatus = 1
      end if
    end if
  end if
  if objectp(t_rCurrentPage) then
    case m_sCurrentPage of
      "step1", "step2", "step3":
        t_rCurrentPage.setTestingStatus(t_bTestStatus)
      otherwise:
        put "Unknown page"

    end case
  end if
end
on QuestDialogBroadcastEvent me, t_iManagerID, t_ar_results
  put "QuestTemplate.DataContainer->BroadCastEvent results:" && t_iManagerID && t_ar_results
  if t_ar_results[#releaseQuest] then
    t_ar_cmd = []
    t_ar_cmd.append(m_ar_data[#questTemplateId])
    getThread(#QuestEngine).getHandler().PublishQuest(t_ar_cmd)
  else
    if t_ar_results[#StartQuest] then
    end if
    t_ar_cmd = []
    t_ar_cmd.append(m_ar_data[#questTemplateId])
    t_ar_cmd.append(t_ar_results[#StartQuest])
    t_ar_cmd.append(m_ar_data[#prizingMode])
    t_ar_cmd.append(m_ar_data[#questDurationInSecs])
    t_ar_cmd.append(ParseCannedText(m_ar_data[#questName], []))
    t_ar_cmd.append(ParseCannedText(m_ar_data[#description], []))
    getThread(#QuestEngine).getHandler().SaveQuest(t_ar_cmd)
  end if
end
on setData me, t_ar_data
  repeat with i = 1 to t_ar_data.count
    t_iProp = t_ar_data.getPropAt(i)
    t_rValue = t_ar_data[i]
    case t_iProp of
      #questDurationInSecs:
        m_ar_data[#questDurationInSecs] = t_rValue
      #prizingMode:
        m_ar_data[#prizingMode] = t_rValue
      #description:
        m_ar_data[#description] = t_rValue
      #questName:
        m_ar_data[#questName] = t_rValue
      otherwise:
        put "Unimplemented value"

    end case
  end repeat
end
on QuestTemplateData me, t_ar_data
  if listp(t_ar_data) then
    m_ar_data = t_ar_data
  end if
  case t_ar_data[#status] of
    1:
      m_rInterface.getInterface().SetType("steps")
      m_rInterface.populate(["step1", "step2", "step3"])
    2:
      m_rInterface.getInterface().SetType("normal")
      m_rInterface.populate(["startquest"])
    3:
      m_rInterface.getInterface().SetType("normal")
      m_rInterface.populate(["startquest"])
    otherwise:
      m_rInterface.getInterface().SetType("steps")
      m_rInterface.populate(["step1", "step2", "step3"])

  end case
  m_rInterface.Activate()
end
on TaskAdded me, t_ar_data
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.TaskAdded(t_ar_data)
  t_ar_taskData = [#taskType: t_ar_data[#taskType], #desc: t_ar_data[#description], #photoId: t_ar_data[#photoId], #timeLimitInSecs: 0]
  t_ar_data.deleteProp(#taskNumber)
  t_ar_data.deleteProp(#taskType)
  t_ar_data.deleteProp(#photoId)
  t_ar_data.deleteProp(#description)
  repeat with i = 1 to t_ar_data.count
    t_sProp = t_ar_data.getPropAt(i)
    t_iValue = t_ar_data[i]
    t_ar_taskData.addProp(t_sProp, t_iValue)
  end repeat
  m_ar_data[#task_array].append(t_ar_taskData)
  m_ar_data[#testingRequired] = 1
  me.checkTestingStatus()
end
on TaskUpdated me, t_ar_data
  t_iTaskIndex = t_ar_data[#taskNumber] + 1
  if t_iTaskIndex <= m_ar_data[#task_array].count then
    t_ar_data.deleteProp(#taskNumber)
    t_ar_data.deleteProp(#taskType)
    repeat with i = 1 to t_ar_data.count
      t_sProp = t_ar_data.getPropAt(i)
      t_iValue = t_ar_data[i]
      m_ar_data[#task_array][t_iTaskIndex][t_sProp] = t_iValue
    end repeat
  end if
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.updateTaskInfo()
  m_ar_data[#testingRequired] = 1
  me.checkTestingStatus()
end
on TaskDescUpdated me, t_ar_data
  t_ID = t_ar_data[#taskNumber] + 1
  m_ar_data[#task_array][t_ID][#desc] = t_ar_data[#newDesc]
  m_ar_data[#task_array][t_ID][#photoId] = t_ar_data[#photoId]
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.updateTaskInfo()
  m_ar_data[#testingRequired] = 1
  me.checkTestingStatus()
end
on TaskTimeLimitSet me, t_ar_data
  t_ID = t_ar_data[#taskNumber] + 1
  m_ar_data[#task_array][t_ID][#timeLimitInSecs] = t_ar_data[#timeLimitInSecs]
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.updateTaskInfo()
  m_ar_data[#testingRequired] = 1
  me.checkTestingStatus()
end
on TaskDeleted me, t_ar_data
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.TaskDeleted(t_ar_data)
  m_ar_data[#task_array].deleteAt(t_ar_data[#taskNumber] + 1)
  me.checkTestingStatus()
end
on TaskMoved me, t_ar_data
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.TaskMoved(t_ar_data)
  if t_ar_data[#up] then
    t_iDirection = -1
  else
    t_iDirection = 1
  end if
  m_ar_data[#testingRequired] = 1
  t_iPos = t_ar_data[#taskNumber] + 1
  if t_iPos > 0 then
    t_iNewPos = t_iPos + t_iDirection
    if t_iNewPos > 0 and t_iNewPos <= m_ar_data[#task_array].count then
      t_rTask = m_ar_data[#task_array][t_iPos]
      m_ar_data[#task_array].deleteAt(t_iPos)
      m_ar_data[#task_array].addAt(t_iNewPos, t_rTask)
    end if
  end if
end
on TaskPhotoSet me, t_ar_data
end
on MoveItemIndex me, t_iRank, t_iDirection, t_iMaxItems
  if voidp(t_iMaxItems) then
    t_iMaxItems = 3
  end if
  t_iPrizeRank = t_iRank + 1
  if t_iPrizeRank > m_ar_data[#prize_array].count then
    put "Prize rank is out of boundaries" && t_iPrizeRank
    return 0
  end if
  t_iItemCount = m_ar_data[#prize_array][t_iPrizeRank][#item_array].count
  if t_iItemCount < t_iMaxItems then
    t_iNewIndex = 1
  else
    t_iOldIndex = m_ar_data[#prize_array][t_iPrizeRank][#item_index]
    t_iNewIndex = t_iOldIndex + t_iDirection
  end if
  if t_iNewIndex < 1 then
    t_iNewIndex = 1
  end if
  if t_iNewIndex > t_iItemCount - (t_iMaxItems - 1) then
    t_iNewIndex = t_iItemCount - (t_iMaxItems - 1)
  end if
  m_ar_data[#prize_array][t_iPrizeRank][#item_index] = t_iNewIndex
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.updatePrizeRank(m_ar_data[#prize_array][t_iPrizeRank], t_iPrizeRank)
end
on PrizeItemAdded me, t_ar_data
  t_iPrizeRank = t_ar_data[#rank] + 1
  if t_iPrizeRank > m_ar_data[#prize_array].count + 1 then
    put "Prize rank is out of boundaries" && t_iPrizeRank
    return 0
  end if
  if t_iPrizeRank = m_ar_data[#prize_array].count + 1 then
    t_ar_prizeArray = [#credits: 0, #item_count: 1, #item_array: []]
    m_ar_data[#prize_array].append(t_ar_prizeArray)
  end if
  t_ar_newItem = [:]
  t_ar_newItem[#itemReference] = t_ar_data[#itemReference]
  t_ar_newItem[#itemCode] = t_ar_data[#itemCode]
  m_ar_data[#prize_array][t_iPrizeRank][#item_array].append(t_ar_newItem)
  t_iPrizeCount = m_ar_data[#prize_array][t_iPrizeRank][#item_array].count
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.updatePrizeRank(m_ar_data[#prize_array][t_iPrizeRank], t_iPrizeRank)
  put "Stop and show what's going on..."
  me.checkTestingStatus()
end
on PrizeItemRemoved me, t_ar_data
  put "Manager.PrizeItemRemoved TODO" && t_ar_data
  t_iPrizeRank = t_ar_data[#rank] + 1
  t_ar_items = m_ar_data[#prize_array][t_iPrizeRank][#item_array]
  repeat with i = 1 to t_ar_items.count
    t_rItem = t_ar_items[i]
    if t_rItem[#itemReference] = t_ar_data[#itemReference] then
      m_ar_data[#prize_array][t_iPrizeRank][#item_array].deleteAt(i)
      exit repeat
    end if
  end repeat
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.updatePrizeRank(m_ar_data[#prize_array][t_iPrizeRank], t_iPrizeRank)
  me.checkTestingStatus()
end
on PrizeCreditsAdded me, t_ar_data
  t_iPrizeRank = t_ar_data[#rank] + 1
  if t_iPrizeRank > m_ar_data[#prize_array].count + 1 then
    put "Prize rank out of boundaries..."
    return 0
  end if
  if t_iPrizeRank = m_ar_data[#prize_array].count + 1 then
    t_ar_prizeArray = [#credits: 0, #item_count: 0, #item_array: []]
    m_ar_data[#prize_array].append(t_ar_prizeArray)
  end if
  m_ar_data[#prize_array][t_iPrizeRank][#credits] = t_ar_data[#credits]
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.PrizeCreditsAdded(t_ar_data)
  me.checkTestingStatus()
end
on PrizeCreditsRemoved me, t_ar_data
  t_iPrizeRank = t_ar_data[#rank] + 1
  m_ar_data[#prize_array][t_iPrizeRank][#credits] = 0
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.updatePrizeRank(m_ar_data[#prize_array][t_iPrizeRank], t_iPrizeRank)
  createTimeout(getUniqueID(), 500, #updateCredits, me.getID(), VOID, 1)
  me.checkTestingStatus()
end
on updateCredits me
  put "OK, so update the prizes then??" && m_sCurrentPage && getObject(#session).get("user_credits")
  if m_sCurrentPage = "step2" then
    t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
    t_rCurrentPage.setCredits(getObject(#session).get("user_credits"))
  end if
end
on QuestCleared me, t_ar_data
  if t_ar_data[#tasksCleared] then
    m_ar_data[#task_count] = 0
    m_ar_data[#task_array] = []
  end if
  if t_ar_data[#prizesCleared] then
    m_ar_data[#prize_count] = 0
    m_ar_data[#prize_array] = []
  end if
  if t_ar_data[#propertiesCleared] then
    m_ar_data[#questName] = EMPTY
    m_ar_data[#description] = EMPTY
    m_ar_data[#prizingMode] = 0
    m_ar_data[#questDurationInSecs] = 0
  end if
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.QuestCleared(t_ar_data)
  if m_sCurrentPage = "step2" then
    t_rCurrentPage.updateCurrentCategory()
  end if
  createTimeout(getUniqueID(), 500, #updateCredits, me.getID(), VOID, 1)
  m_ar_data[#testingRequired] = 1
  me.checkTestingStatus()
end
on PrizeCleared me, t_ar_data
  put "TODO PrizeCleared!!! Should all prizes be updated....?? Or just delete one and update others....?"
  m_ar_data[#prize_array].deleteAt(t_ar_data[#rank] + 1)
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.PrizeCleared(t_ar_data)
  t_rCurrentPage.updateRanks()
  if m_sCurrentPage = "step2" then
    t_rCurrentPage.updateCurrentCategory()
  end if
  createTimeout(getUniqueID(), 500, #updateCredits, me.getID(), VOID, 1)
  me.checkTestingStatus()
end