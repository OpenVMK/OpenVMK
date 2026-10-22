-- Score Script
property m_rQuestTemplate
property m_rQuestInstance
property m_ar_QuestItemSprites
property m_ar_cache
property m_ar_items

on construct me
  m_ar_cache = [:]
  m_ar_QuestItemSprites = []
  registerMessage(#room_leave, me.getID(), #HideFindableItem)
  registerMessage("ui_questengine", me.getID(), #requestQuestEngineData)
  return 1
end
on deconstruct me
  if objectp(m_rQuestTemplate) then
    removeObject(m_rQuestTemplate.getID())
  end if
  if objectp(m_rQuestInstance) then
    removeObject(m_rQuestInstance.getID())
  end if
  me.HideFindableItem()
end
on QuestDialogBroadcastEvent me, t_iManagerID, t_ar_results
  put "QuestEngineComponent.QuestDialogBroadcastEvent: " && t_iManagerID && t_ar_results
  case t_iManagerID of
    "QuestPlaceItem":
      t_ar_cmd = [t_ar_results[#questTemplateId], 2, t_ar_results[#photo], t_ar_results[#hint], t_ar_results[#tileReference], t_ar_results[#findableItemCode]]
      me.getHandler().AddTask(t_ar_cmd)
      t_ID = t_ar_results[#questTemplateId]
      me.getHandler().GotoQuestEngineItem([t_ID])
    "QuestPlaceItemUpdate":
      t_ar_cmd = [t_ar_results[#questTemplateId], 2, t_ar_results[#activeTaskRank], t_ar_results[#tileReference], t_ar_results[#findableItemCode]]
      getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
      t_ID = t_ar_results[#questTemplateId]
      me.getHandler().GotoQuestEngineItem([t_ID])
    "QuestPlaceMulti":
      t_ar_cmd = [t_ar_results[#questTemplateId], 19, t_ar_results[#photo], t_ar_results[#hint], t_ar_results[#required], t_ar_results[#itemsData]]
      me.getHandler().AddTask(t_ar_cmd)
      t_ID = t_ar_results[#questTemplateId]
      me.getHandler().GotoQuestEngineItem([t_ID])
    "QuestPlaceMultiUpdate":
      t_ar_cmd = [t_ar_results[#questTemplateId], 19, t_ar_results[#activeTaskRank], t_ar_results[#required], t_ar_results[#itemsData]]
      getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
      t_ID = t_ar_results[#questTemplateId]
      me.getHandler().GotoQuestEngineItem([t_ID])
    otherwise:
      put "Quest.Component.QuestDialogBroadCastEvent.Unknown manager" && t_iManagerID

  end case
end
on initAvatar me, t_bAgain
  t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(getObject(#session).get("room_own_avatar"), "avatar")
  if objectp(t_rObj) then
    m_rAvatar = t_rObj.GetVisual()
  end if
end
on getCachedData me, a_iTaskType, a_sCallbackID, a_bClientData
  t_ar_cachedata = m_ar_cache[a_iTaskType.string]
  if voidp(t_ar_cachedata) then
    t_ar_cachedata = me.createEmptyCacheItem(a_iTaskType)
  end if
  t_ar_cachedata[#callback] = a_sCallbackID
  if voidp(t_ar_cachedata[#data]) then
    if not a_bClientData then
      me.getHandler().PrepareTask([0, 1, a_iTaskType, 0])
    else
    end if
  else
    me.notifyCacheObject(a_iTaskType)
  end if
end
on TaskPrepareData me, t_ar_data
  t_iTaskType = t_ar_data[#taskType]
  t_ar_cachedata = m_ar_cache[t_iTaskType.string]
  if voidp(t_ar_cachedata) then
    t_ar_cachedata = me.createEmptyCacheItem(t_iTaskType)
  end if
  t_ar_cachedata[#data] = t_ar_data[#item_array]
  me.notifyCacheObject(t_iTaskType)
end
on notifyCacheObject me, t_iTaskType
  t_ar_cachedata = m_ar_cache[t_iTaskType.string]
  if voidp(t_ar_cachedata) then
    put "No such cache-entry" && t_iTaskType
    return 0
  end if
  if voidp(t_ar_cachedata[#data]) then
    put "No data for entry" && t_iTaskType && t_ar_cachedata
    return 0
  end if
  if voidp(t_ar_cachedata[#callback]) then
    put "No callback-item for entry" && t_iTaskType && t_ar_cachedata
    return 0
  end if
  t_rCallback = getObject(t_ar_cachedata[#callback])
  if t_rCallback <> 0 then
    call(#cachedData, [t_rCallback], t_ar_cachedata[#data])
  end if
end
on registerCacheCallback me, t_iTaskType, t_sObjectID
end
on createEmptyCacheItem me, t_iTaskType
  t_ar_cachedata = [#callback: VOID, #data: VOID]
  m_ar_cache[t_iTaskType.string] = t_ar_cachedata
  return t_ar_cachedata
end
on requestQuestEngineData me
  me.getHandler().GetCurrentTaskData([])
end
on GetCurrentQuest me
  return m_rQuestTemplate
end
on QuestTemplateData me, t_ar_data
  if objectp(m_rQuestTemplate) then
    removeObject(m_rQuestTemplate.getID())
  end if
  m_rQuestTemplate = createObject(getUniqueID(), "CQuestTemplateDataContainer")
  m_rQuestTemplate.QuestTemplateData(t_ar_data)
end
on QuestInstanceData me, t_ar_data
  if objectp(m_rQuestInstance) then
    removeObject(m_rQuestInstance.getID())
  end if
  m_rQuestInstance = createObject(getUniqueID(), "CQuestInstanceDataContainer")
  m_rQuestInstance.QuestInstanceData(t_ar_data)
  executeMessage("PlayInterfaceSound", "QE_quest_launched")
end
on CurrentTaskData me, t_ar_data
  if t_ar_data[#option_count] > 0 then
    CreateQuestNotification("QuestNotificationMultipleChoice", me, ["multiplechoice"], "floating", t_ar_data)
  else
    CreateQuestNotification("QuestNotificationTaskHint", me, ["taskhint"], "floating", t_ar_data)
  end if
end
on TaskNotification me, t_ar_data
  if t_ar_data[#failed] then
    CreateQuestNotification("QuestNotificationTaskFailed", me, ["taskfailed"], "floating", t_ar_data)
    executeMessage("PlayInterfaceSound", "QE_task_failed")
    me.removeHints()
    me.HideFindableItem()
  else
    CreateQuestNotification("QuestNotificationTaskCompleted", me, ["taskcompleted"], "floating", t_ar_data)
    executeMessage("PlayInterfaceSound", "QE_task_completed")
    me.removeHints()
    me.HideFindableItem()
  end if
end
on QuestCompleted me, t_ar_data
  CreateQuestNotification("QuestNotificationQuestCompleted", me, ["questcompleted"], "floating", t_ar_data)
  executeMessage("PlayInterfaceSound", "QE_quest_completed")
  me.HideFindableItem()
end
on QuestTerminated me, t_ar_data
  CreateQuestNotification("QuestNotificationQuestTerminated", me, ["questcancelled"], "floating", t_ar_data)
  executeMessage("PlayInterfaceSound", "QE_quest_cancelled")
  me.HideFindableItem()
end
on QuestPrizeData me, t_ar_data
  CreateQuestNotification("QuestNotificationPrizeData", me, ["questprizedata"], "floating", t_ar_data)
end
on PrizeItemAdded me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.PrizeItemAdded(t_ar_data)
  end if
end
on PrizeCreditsAdded me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.PrizeCreditsAdded(t_ar_data)
  end if
end
on PrizeItemRemoved me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.PrizeItemRemoved(t_ar_data)
  end if
end
on TaskAdded me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.TaskAdded(t_ar_data)
  end if
end
on TaskUpdated me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.TaskUpdated(t_ar_data)
  end if
end
on TaskDeleted me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.TaskDeleted(t_ar_data)
  end if
end
on TaskMoved me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.TaskMoved(t_ar_data)
  end if
end
on TaskDescUpdated me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.TaskDescUpdated(t_ar_data)
  end if
end
on PrizeCreditsRemoved me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.PrizeCreditsRemoved(t_ar_data)
  end if
end
on CannedTextParsingFailed me, t_ar_data
end
on QuestSaved me, t_ar_data
end
on ShowFindableItem me, t_ar_data
  m_ar_items = VOID
  t_rCurrentPage = VOID
  if objectp(getObject("QuestPlaceItemUpdate")) then
    t_rCurrentPage = getObject("QuestPlaceItemUpdate").getInterface().GetBase().getPage()
  else
    if objectp(getObject("QuestPlaceMultiUpdate")) then
      t_rCurrentPage = getObject("QuestPlaceMultiUpdate").getInterface().GetBase().getPage()
    else
      m_ar_items = t_ar_data
    end if
  end if
  if objectp(t_rCurrentPage) then
    t_rCurrentPage.setItemList(t_ar_data)
  end if
  me.ViewFindableItems(t_ar_data)
end
on ViewFindableItems me, t_ar_data
  me.HideFindableItem()
  repeat with i = 1 to t_ar_data[#item_count]
    t_rSprite = me.initQuestItemSprite()
    t_iTileReference = t_ar_data[#item_array][i][#tileReference]
    t_iFindableItemCode = t_ar_data[#item_array][i][#findableItemCode]
    t_rContext = getThread("room").getComponent()._AccessRoom()
    t_rTile = t_rContext._AccessIndexed(t_iTileReference, "tile")
    if objectp(t_rTile) then
      t_sMemName = "item_" & t_iFindableItemCode & "_0_0_3_1_0"
      t_rMem = getMember(t_sMemName)
      if t_rMem = 0 then
        put "Error, could not find member" && t_sMemName
        exit
      end if
      t_rSprite.member = member(t_sMemName)
      t_vPos = t_rTile.GetScrPos()
      t_rSprite.locH = t_vPos.x
      t_rSprite.locV = t_vPos.y
      t_rSprite.locZ = t_vPos.z
      t_rSprite.width = t_rMem.width
      t_rSprite.height = t_rMem.height
    end if
  end repeat
end
on hideFoundItem me, t_ar_data
  if listp(m_ar_items) then
    t_iTileRef = value(t_ar_data[#tileReference])
    if t_iTileRef = -1 then
      t_ar_items = []
      m_ar_items = [#item_count: t_ar_items.count, #item_array: t_ar_items]
    else
      t_ar_items = m_ar_items[#item_array]
      t_bfound = 0
      i = 0
      repeat with i = 1 to t_ar_items.count
        t_ar_Item = t_ar_items[i]
        if t_ar_Item[#tileReference] = t_iTileRef then
          t_bfound = 1
          exit repeat
        end if
      end repeat
      if t_bfound then
        executeMessage("PlayInterfaceSound", "QE_item_placed")
        t_ar_items.deleteAt(i)
      else
        put "Could not find an item at this position, please walk to an item"
      end if
    end if
    m_ar_items = [#item_count: t_ar_items.count, #item_array: t_ar_items]
    me.ViewFindableItems(m_ar_items)
  end if
end
on HideFindableItem me, t_ar_data
  if listp(t_ar_data) then
    me.hideFoundItem(t_ar_data)
  else
    repeat with t_rSprite in m_ar_QuestItemSprites
      releaseSprite(t_rSprite.spriteNum)
    end repeat
    m_ar_QuestItemSprites = []
  end if
end
on QuestCleared me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.QuestCleared(t_ar_data)
  end if
end
on TaskTimeLimitSet me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.TaskTimeLimitSet(t_ar_data)
  end if
end
on QuestTestSuccess me, t_ar_data
  CreateQuestNotification("QuestNotificationTestingCompleted", me, ["testingcompleted"], "floating", t_ar_data)
  executeMessage("PlayInterfaceSound", "QE_quest_completed")
  me.removeHints()
end
on PrizeCleared me, t_ar_data
  if objectp(m_rQuestTemplate) then
    m_rQuestTemplate.PrizeCleared(t_ar_data)
  end if
end
on QuestAuthorHallOfFame me, t_ar_data
  CreateQuestNotification("QuestNotificationHallOfFame", me, ["halloffame"], "floating", t_ar_data)
end
on initQuestItemSprite me
  t_rSprite = sprite(reserveSprite())
  t_rSprite.member = VOID
  t_rSprite.ink = 0
  t_rSprite.blend = 100
  t_rSprite.locV = 0
  t_rSprite.locZ = 0
  t_rSprite.flipH = 0
  m_ar_QuestItemSprites.append(t_rSprite)
  return t_rSprite
end
on removeHints me
  if getObject("QuestNotificationTaskHint") <> 0 then
    removeObject("QuestNotificationTaskHint")
  end if
  if getObject("QuestNotificationMultipleChoice") <> 0 then
    removeObject("QuestNotificationMultipleChoice")
  end if
end