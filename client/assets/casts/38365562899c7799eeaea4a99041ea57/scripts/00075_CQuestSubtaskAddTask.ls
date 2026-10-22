-- Script
property m_rWindow
property m_ar_components
property m_sInfoTarget

on construct me
  m_ar_components = [:]
  m_sInfoTarget = EMPTY
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
  t_bSuccess = m_rWindow.merge("vmk_quest_addtask.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.addtask"))
  end if
  me.createComponentWindow(m_rWindow, m_ar_components, ["quest.newtasks": []])
  m_ar_components["quest.newtasks"].setSortingOrder(#alphabetical)
  me.AddContentFromXML(m_rWindow, m_ar_components, "quest.content.addtask.xml")
  m_sInfoTarget = "quest.taskinfo.text"
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
  put "Fill blanks (Add Task)"
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.newtasks":
        t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        executeMessage("PlayInterfaceSound", "UI-click")
        t_rComponent = m_ar_components[a_sElemID]
        t_rComponent.EventProc(a_vParam, t_ar_event)
        if t_ar_event.found then
          t_rClientElement = m_rWindow.getElement(a_sElemID)
          t_rImg = t_rComponent.render()
          t_rClientElement.feedImage(t_rImg)
          t_rInfoElement = m_rWindow.getElement(m_sInfoTarget)
          if t_rInfoElement <> 0 then
            t_rNode = t_ar_event.route.layout.GetNode()
            if listp(t_rNode) then
              t_sInfoText = t_rNode["INFO"]
              t_rInfoElement.setText(getText(t_sInfoText))
              case t_ar_event.route.layout.getEvent() of
                "addtask.5":
                  t_bSend = 1
                  if getObject("MagicMenu") <> 0 then
                    t_rMagic = getObject("MagicMenu")
                    t_bSend = t_rMagic.m_mp_FxList.count = 0
                  end if
                  if t_bSend then
                    getConnection(getVariable("main.connection.id", "VMK")).send("QueryMagicFx")
                  end if

              end case
            end if
          end if
          if the doubleClick then
            me.proceedWithSelectedTask()
          end if
        end if
      "mes.accept.button":
        me.proceedWithSelectedTask()
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
        put "Subtask.AddTask.event:" && a_sElemID

    end case
  end if
end
on proceedWithSelectedTask me
  t_rComponent = m_ar_components["quest.newtasks"]
  t_rActiveTask = t_rComponent.GetActive()
  if objectp(t_rActiveTask) then
    t_ar_subtasks = []
    t_bDefinitionOK = 1
    case t_rActiveTask.getEvent() of
      "addtask.1":
        t_ar_subtasks = ["visitnpc", "writehint"]
      "addtask.2":
        t_ar_subtasks = []
      "addtask.3":
        t_ar_subtasks = ["roomvisit", "writehint"]
      "addtask.4":
        t_ar_subtasks = ["minigame", "writehint"]
      "addtask.5":
        t_ar_subtasks = ["magics", "writehint"]
      "addtask.6":
        t_ar_subtasks = ["writehint"]
      "addtask.7":
        t_ar_subtasks = ["sayword", "writehint"]
      "addtask.8":
        t_ar_subtasks = ["spendcredits", "writehint"]
      "addtask.9":
        t_ar_subtasks = ["earncredits", "writehint"]
      "addtask.10":
        t_ar_subtasks = ["writehint"]
      "addtask.11":
        t_ar_subtasks = ["writehint"]
      "addtask.12":
        t_ar_subtasks = ["emote", "writehint"]
      "addtask.13":
        t_ar_subtasks = ["writehint"]
      "addtask.14":
        t_ar_subtasks = ["writehint"]
      "addtask.15":
        t_ar_subtasks = ["acquireitem", "writehint"]
      "addtask.16":
        t_ar_subtasks = ["writehint"]
      "addtask.17":
        t_ar_subtasks = ["writequestion", "multichoicetask"]
      "addtask.18":
        t_ar_subtasks = ["collect", "writehint"]
      "addtask.19":
        t_ar_subtasks = []
      otherwise:
        put "[subtask.addtask.event]" && t_rActiveTask.getEvent()
        t_ar_subtasks = []
        t_bDefinitionOK = 0

    end case
    if not t_bDefinitionOK then
      t_txt = getText("quest.alert.definition.missing")
      t_title = getText("quest.alert.title")
      t_btn1 = getText("quest.alert.ok")
      t = createDialogWindow(me.getID(), "quest.alert.definition", 1, 1)
      t.setText(t_txt, t_title, t_btn1)
      t.show()
    else
      t_rManager = me.getManager()
      if objectp(t_rManager) then
        t_rManager.resolveSubtask()
        t_rManager.flushSubtasks()
        t_rManager.populate(t_ar_subtasks)
        t_rManager.appendSubResult([#task: t_rActiveTask.getEvent()])
        t_rManager.Activate()
      end if
    end if
  else
    t_txt = getText("quest.alert.select.task")
    t_title = getText("quest.alert.title")
    t_btn1 = getText("quest.alert.ok")
    t = createDialogWindow(me.getID(), "quest.alert.select.task", 1, 1)
    t.setText(t_txt, t_title, t_btn1)
    t.show()
  end if
end