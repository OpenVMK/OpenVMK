-- Script
property m_rWindow
property m_ar_components
property m_rRadioButton

on construct me
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  return 1
end
on deconstruct me
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  if objectp(m_rRadioButton) then
    removeObject(m_rRadioButton.getID())
  end if
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_addtasktime.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.addtasktime"))
  end if
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
  t_ar_elements.append([#element: "quest.tasktime1", #description: EMPTY, #value: 5])
  t_ar_elements.append([#element: "quest.tasktime2", #description: EMPTY, #value: 15])
  t_ar_elements.append([#element: "quest.tasktime3", #description: EMPTY, #value: 30])
  t_ar_elements.append([#element: "quest.tasktime4", #description: EMPTY, #value: 60])
  t_ar_elements.append([#element: "quest.tasktime5", #description: EMPTY, #value: 120])
  t_ar_elements.append([#element: "quest.tasktime6", #description: EMPTY, #value: 300])
  t_ar_elements.append([#element: "quest.tasktime7", #description: EMPTY, #value: 600])
  t_ar_elements.append([#element: "quest.tasktime8", #description: EMPTY, #value: 900])
  t_ar_elements.append([#element: "quest.notimelimit", #description: EMPTY, #value: 0, #type: #rect])
  m_rRadioButton.addElements(t_ar_elements)
  m_rRadioButton.setParentWindow(m_rWindow)
  m_rRadioButton.clickElement("quest.task.notimelimit")
  m_rRadioButton.updateMenu()
end
on rawData me, t_ar_data
  case t_ar_data[#timeLimitInSecs] of
    5:
      t_sElemID = "quest.tasktime1"
    15:
      t_sElemID = "quest.tasktime2"
    30:
      t_sElemID = "quest.tasktime3"
    60:
      t_sElemID = "quest.tasktime4"
    120:
      t_sElemID = "quest.tasktime5"
    300:
      t_sElemID = "quest.tasktime6"
    600:
      t_sElemID = "quest.tasktime7"
    900:
      t_sElemID = "quest.tasktime8"
    otherwise:
      t_sElemID = "quest.notimelimit"

  end case
  m_rRadioButton.clickElement(t_sElemID)
  m_rRadioButton.updateMenu()
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.notimelimit", "quest.tasktime1", "quest.tasktime2", "quest.tasktime3", "quest.tasktime4", "quest.tasktime5", "quest.tasktime6", "quest.tasktime7", "quest.tasktime8":
        m_rRadioButton.clickElement(a_sElemID)
        m_rRadioButton.updateMenu()
      "quest.notimelimit.hd", "quest.tasktime1.hd", "quest.tasktime2.hd", "quest.tasktime3.hd", "quest.tasktime4.hd", "quest.tasktime5.hd", "quest.tasktime6.hd", "quest.tasktime7.hd", "quest.tasktime8.hd":
        m_rRadioButton.clickElement(replaceChunks(a_sElemID, ".hd", EMPTY))
        m_rRadioButton.updateMenu()
      "mes.accept.button":
        if objectp(t_rManager) then
          t_ar_results = [:]
          t_ar_results[#timeLimitInSecs] = m_rRadioButton.getValue()
          t_rManager.appendSubResult(t_ar_results)
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
        executeMessage(#open_help_page, getText("help.quest.addtask", getText("help.quest", "help.quest")), 1)
      otherwise:
        put "Subtask.AddTaskTime.event:" && a_sElemID

    end case
  end if
end