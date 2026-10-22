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
  t_bSuccess = m_rWindow.merge("vmk_quest_ingame_cancelled.window")
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
  put "Fill blanks (Quest Cancelled)"
  m_ar_data = t_ar_data
  me.setField(m_rWindow, "quest.dialog.hd", getText("quest.dialog.hd.questcancelled"))
  t_iReason = t_ar_data[#terminationReason]
  me.setField(m_rWindow, "quest.cancelled.info", getText("quest.cancelled.info." & t_iReason, getText("quest.cancelled.info")))
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
      "close":
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.questcancelled", getText("help.quest", "help.quest")))
      otherwise:
        put "InQuest.dialog.QuestCancelled.event:" && a_sElemID

    end case
  end if
end