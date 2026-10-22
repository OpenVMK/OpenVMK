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
  t_bSuccess = m_rWindow.merge("vmk_quest_setduration.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.selectduration"))
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
  t_ar_elements.append([#element: "quest.duration1", #description: EMPTY, #value: 60])
  t_ar_elements.append([#element: "quest.duration2", #description: EMPTY, #value: 60 * 15])
  t_ar_elements.append([#element: "quest.duration3", #description: EMPTY, #value: 60 * 30])
  t_ar_elements.append([#element: "quest.duration4", #description: EMPTY, #value: 60 * 60])
  t_ar_elements.append([#element: "quest.duration5", #description: EMPTY, #value: 60 * 60 * 2])
  t_ar_elements.append([#element: "quest.duration6", #description: EMPTY, #value: 60 * 60 * 3])
  t_ar_elements.append([#element: "quest.duration7", #description: EMPTY, #value: 60 * 60 * 8])
  t_ar_elements.append([#element: "quest.duration8", #description: EMPTY, #value: 60 * 60 * 16])
  m_rRadioButton.addElements(t_ar_elements)
  m_rRadioButton.setParentWindow(m_rWindow)
  m_rRadioButton.clickElement("quest.duration1")
  m_rRadioButton.updateMenu()
end
on rawData me, t_ar_data
  case t_ar_data[#duration] of
    60:
      t_sElemID = "quest.duration1"
    60 * 15:
      t_sElemID = "quest.duration2"
    60 * 30:
      t_sElemID = "quest.duration3"
    60 * 60:
      t_sElemID = "quest.duration4"
    60 * 60 * 2:
      t_sElemID = "quest.duration5"
    60 * 60 * 3:
      t_sElemID = "quest.duration6"
    60 * 60 * 8:
      t_sElemID = "quest.duration7"
    60 * 60 * 16:
      t_sElemID = "quest.duration8"
    otherwise:
      t_sElemID = "quest.duration1"

  end case
  m_rRadioButton.clickElement(t_sElemID)
  m_rRadioButton.updateMenu()
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.duration1", "quest.duration2", "quest.duration3", "quest.duration4", "quest.duration5", "quest.duration6", "quest.duration7", "quest.duration8":
        m_rRadioButton.clickElement(a_sElemID)
        m_rRadioButton.updateMenu()
      "quest.duration1.hd", "quest.duration2.hd", "quest.duration3.hd", "quest.duration4.hd", "quest.duration5.hd", "quest.duration6.hd", "quest.duration7.hd", "quest.duration8.hd":
        m_rRadioButton.clickElement(replaceChunks(a_sElemID, ".hd", EMPTY))
        m_rRadioButton.updateMenu()
      "mes.accept.button":
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_ar_results = [:]
          t_ar_results[#duration] = m_rRadioButton.getValue()
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
        executeMessage(#open_help_page, getText("help.quest.duration", getText("help.quest", "help.quest")), 1)
      otherwise:
        put "Subtask.SelectDuration.event:" && a_sElemID

    end case
  end if
end