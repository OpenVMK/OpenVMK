-- Script
property m_rWindow
property m_ar_components

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
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_roomvisit.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.roomvisit"))
  end if
  me.createComponentWindow(m_rWindow, m_ar_components, ["quest.roomlist": []])
  me.AddContentFromXML(m_rWindow, m_ar_components, "quest.content.roomvisit.xml")
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
  put "Update task: Room Visit" && t_ar_data
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#taskType] = t_ar_data[#taskType]
    t_rManager.appendSubResult(t_ar_results)
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.roomlist":
        t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        executeMessage("PlayInterfaceSound", "UI-click")
        t_rComponent = m_ar_components[a_sElemID]
        t_rComponent.EventProc(a_vParam, t_ar_event)
        if t_ar_event.found then
          case t_ar_event.event of
            "land.adventureland", "land.frontierland", "land.fantasyland", "land.tomorrowland", "land.mainstreet", "land.ownrooms":
              t_ar_event.route.component.toggleShowChildren()

          end case
          t_rClientElement = m_rWindow.getElement(a_sElemID)
          t_rImg = t_rComponent.render()
          t_rClientElement.feedImage(t_rImg)
        end if
      "mes.accept.button":
        t_rComponent = m_ar_components["quest.roomlist"]
        t_rActiveTask = t_rComponent.GetActive()
        t_bDataOK = 0
        t_ar_results = [:]
        if objectp(t_rActiveTask) then
          t_sEvent = t_rActiveTask.getEvent()
          if t_sEvent contains "room." then
            t_oldDelim = the itemDelimiter
            the itemDelimiter = "."
            t_iRoomTag = integer(t_sEvent.item[2])
            the itemDelimiter = t_oldDelim
            t_ar_results[#room] = t_iRoomTag
            t_rManager = me.getManager()
            if objectp(t_rManager) then
              t_rManager.appendSubResult(t_ar_results)
              t_rManager.resolveSubtask()
              t_rManager.Activate()
            end if
            t_bDataOK = 1
          end if
        end if
        if not t_bDataOK then
          t_txt = getText("quest.alert.select.room")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.room", 1, 1)
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
        put "Subtask.RoomVisit.event:" && a_sElemID

    end case
  end if
end