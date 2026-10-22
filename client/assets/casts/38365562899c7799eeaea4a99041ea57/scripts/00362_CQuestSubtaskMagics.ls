-- Script
property m_rWindow
property m_ar_components
property m_rGrid

on construct me
  m_rGrid = createObject(getUniqueID(), "CQuestMagicGrid")
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
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
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_magics.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.magics"))
  end if
  m_rGrid.render([], m_rWindow.getElement("quest.magics"))
  me.cachedData([])
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
on cachedData me, t_ar_data
  t_ar_magics = getAvailableMagics()
  m_rGrid.render(t_ar_magics, m_rWindow.getElement("quest.magics"))
end
on rawData me, t_ar_data
  put "Update task: Magics" && t_ar_data
  me.cachedData([])
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
      "quest.magics":
        m_rGrid.MouseSelection(a_vParam)
      "mes.accept.button":
        t_bDataOK = 0
        t_rSelected = m_rGrid.GetSelected()
        if not voidp(t_rSelected) then
          t_ar_results = [:]
          t_ar_results[#magicEffectCode] = m_rGrid.GetSelected()[#id]
          if objectp(t_rManager) then
            t_rManager.appendSubResult(t_ar_results)
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
          t_bDataOK = 1
        end if
        if not t_bDataOK then
          t_txt = getText("quest.alert.magic.missing")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.magic", 1, 1)
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