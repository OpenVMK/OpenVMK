-- Script
property m_rWindow
property m_ar_components
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
  t_bSuccess = m_rWindow.merge("vmk_quest_ingame_taskcompleted.window")
  me.setButtonTxt(m_rWindow, "quest.continue", getText("quest.task.proceed"))
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
  put "Fill blanks (Task Completed)"
  t_sTask = "Task" && t_ar_data[#taskNumber] + 1 & "/" & t_ar_data[#totalTaskCount]
  me.setField(m_rWindow, "quest.dialog.hd", t_ar_data[#questName] & ", " & t_sTask)
  me.setField(m_rWindow, "quest.taskresults.hd", getText("quest.dialog.hd.taskcompleted"))
  createTimeout(getUniqueID(), 100, #updateTimer, me.getID(), [#elem: "quest.timetotal", #time: t_ar_data[#questDurationInSecs], #amount: 1], 1)
  t_iTaskType = t_ar_data[#taskType]
  t_sTaskResults = getText("quest.task.completed." & t_iTaskType, getText("quest.task.completed"))
  t_sReplaceText = t_ar_data[#taskNumber] + 1 & "/" & t_ar_data[#totalTaskCount]
  t_sTaskResults = replaceChunks(t_sTaskResults, "%tasknumber%", t_sReplaceText)
  if t_ar_data[#solvedImmediately] then
    t_sTaskResults = t_sTaskResults & RETURN & getText("quest.task.completed.immediately")
  end if
  me.setField(m_rWindow, "quest.taskresults.text", t_sTaskResults)
  m_ar_data = t_ar_data
end
on updateTimer me, t_ar_data
  t_sElem = t_ar_data[#elem]
  t_iTime = t_ar_data[#time]
  t_iAmount = t_ar_data[#amount]
  t_Elem = m_rWindow.getElement(t_sElem)
  if t_Elem <> 0 then
    t_Elem.setText(seconds2time(t_iTime))
  end if
  t_iNewTime = t_iTime + t_iAmount
  if t_iNewTime >= 0 then
    createTimeout(getUniqueID(), 1000, #updateTimer, me.getID(), [#elem: t_sElem, #time: t_iNewTime, #amount: t_iAmount], 1)
  else
    t_rManager = me.getManager()
    if objectp(t_rManager) then
      removeObject(t_rManager.getID())
    end if
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.info":
        t_ID = m_ar_data[#questTemplateId]
        getThread(#QuestEngine).getHandler().GetQuestInstanceData([t_ID])
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "quest.quit":
        getThread(#QuestEngine).getHandler().QuitQuest()
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "mes.accept.button":
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "quest.continue":
        getThread(#QuestEngine).getHandler().ProceedToNextTask([])
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "close":
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.taskcomplete", getText("help.quest", "help.quest")))
      otherwise:
        put "InQuest.dialog.TaskCompleted.event:" && a_sElemID

    end case
  end if
end