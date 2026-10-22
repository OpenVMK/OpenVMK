-- Script
property m_rWindow
property m_rComponentsPage
property m_iActiveTaskID
property m_iCurrentPhotoID

on construct me
  m_iCurrentPhotoID = -1
  m_iActiveTaskID = -1
  m_rWindow = VOID
  t_ar_photos = getThread(#PhotoCatalog).getComponent().GetPhotos()
  if t_ar_photos.count = 0 then
    getThread(#PhotoCatalog).getHandler().RequestPhotoIndex()
  end if
  registerMessage(#photo_catalog_redraw, me.getID(), #reDraw)
  return 1
end
on deconstruct me
  unregisterMessage(#photo_catalog_redraw, me.getID())
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  if objectp(m_rComponentsPage) then
    removeObject(m_rComponentsPage.getID())
  end if
  if getObject("QuestDialogManagerAddTask") <> 0 then
    removeObject("QuestDialogManagerAddTask")
  end if
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_create_step_1.window")
  me.changeImageInElement(m_rWindow, "quest.main.label", member("quest.label.create"))
  if not objectp(m_rComponentsPage) then
    me.createComponentWindow()
  end if
  me.setField(m_rWindow, "quest.main.hd", getText("quest.step1.title"))
  me.setButtonState(m_rWindow, "quest.previousstep.button", 0)
  me.setButtonState(m_rWindow, "quest.start.button", 0)
  me.hidePageTabs()
  me.reDraw()
  updateStage()
  return t_bSuccess
end
on setFocus me
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
    if a_kAlteredCategory = #step1 then
    end if
  end if
end
on reDraw me
  tempMember = getMember("tempImg")
  tPic = getThread(#PhotoCatalog).getComponent().getPhoto(m_iCurrentPhotoID)
  if not voidp(tPic) then
    m_rWindow.getElement("fto.view").show()
    tPhotoMedia = tPic.pic
    if voidp(tPhotoMedia) then
      getThread(#PhotoCatalog).getComponent().RequestCatalogPhoto(m_iCurrentPhotoID)
      m_rWindow.getElement("fto.view").feedImage(getMember("loaderImg").image)
    else
      tempMember.media = tPhotoMedia.image
      tempMember.palette = getMember("sepia_palette_catalog")
      m_rWindow.getElement("fto.view").feedImage(tempMember.image)
    end if
  else
    m_rWindow.getElement("fto.view").hide()
  end if
end
on showTaskInfo me, a_iActiveTaskID, a_bForceUpdate
  t_rOwner = me.getManager().GetOwner()
  t_sTaskHint = EMPTY
  t_iTaskTime = -1
  m_iCurrentPhotoID = -1
  if a_iActiveTaskID > 0 then
    m_iActiveTaskID = a_iActiveTaskID
    if objectp(t_rOwner) then
      t_ar_data = t_rOwner.getData()
      t_ar_tasks = t_ar_data[#task_array]
      if listp(t_ar_tasks) then
        if t_ar_tasks.count >= m_iActiveTaskID then
          t_ar_taskData = t_ar_tasks[m_iActiveTaskID]
          t_sTaskHint = t_ar_taskData[#desc]
          t_iTaskTime = t_ar_taskData[#timeLimitInSecs]
          m_iCurrentPhotoID = t_ar_taskData[#photoId]
        end if
      end if
    end if
  end if
  me.setField(m_rWindow, "quest.taskhint.text", t_sTaskHint)
  if t_iTaskTime > 0 then
    me.setField(m_rWindow, "quest.notimelimit.info", seconds2time(t_iTaskTime))
  else
    me.setField(m_rWindow, "quest.notimelimit.info", getText("quest.notimelimit.info"))
  end if
  me.reDraw()
  updateStage()
end
on updateTaskInfo me
  me.showTaskInfo(m_iActiveTaskID, 1)
end
on hidePageTabs me
  me.elemVisibility("quest.tab.tasks.active", 1)
  me.elemVisibility("quest.tab.prizes.active", 0)
  me.elemVisibility("quest.tab.settings.active", 0)
end
on elemVisibility me, a_sElemID, a_bVisible
  t_rElem = m_rWindow.getElement(a_sElemID)
  if t_rElem <> 0 then
    if a_bVisible then
      t_rElem.show()
    else
      t_rElem.hide()
    end if
  end if
end
on createComponentWindow me
  t_rClientElement = m_rWindow.getElement("quest.tasklist")
  m_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
  m_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  m_rComponentsPage.setColor(rgb("#001F56"))
  t_rComponent = m_rComponentsPage.addComponent("component.questengine.step1.addTask.xml")
  t_rImg = m_rComponentsPage.render()
  t_rClientElement.feedImage(t_rImg)
end
on setTestingStatus me, a_bStatus
  if a_bStatus then
    me.setButtonState(m_rWindow, "quest.start.button", 1)
  else
    me.setButtonState(m_rWindow, "quest.start.button", 0)
  end if
end
on AddTask me, t_ar_data
  if objectp(m_rComponentsPage) then
    t_rClientElement = m_rWindow.getElement("quest.tasklist")
    t_rComponent = m_rComponentsPage.addComponent("component.questengine.step1.taskDesc.xml", 1)
    t_rLayout = t_rComponent.GetLayout(1)
    if objectp(t_rLayout) then
      t_rLayout.setText(getText("quest.taskname." & t_ar_data.taskType))
    end if
    t_rImg = m_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
end
on TaskAdded me, t_ar_data
  if objectp(m_rComponentsPage) then
    t_rClientElement = m_rWindow.getElement("quest.tasklist")
    t_rComponent = m_rComponentsPage.addComponent("component.questengine.step1.taskDesc.xml", 1)
    t_rLayout = t_rComponent.GetLayout(1)
    if objectp(t_rLayout) then
      t_rLayout.setText(getText("quest.taskname." & t_ar_data.taskType))
    end if
    t_rImg = m_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
  me.UpdateScrollBar()
end
on TaskDeleted me, t_ar_data
  if objectp(m_rComponentsPage) then
    t_rClientElement = m_rWindow.getElement("quest.tasklist")
    m_rComponentsPage.deleteComponentAt(t_ar_data[#taskNumber] + 1)
    t_rImg = m_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
  me.showTaskInfo(-1)
end
on TaskMoved me, t_ar_data
  if objectp(m_rComponentsPage) then
    t_rClientElement = m_rWindow.getElement("quest.tasklist")
    t_rComponent = m_rComponentsPage.getComponentAt(t_ar_data[#taskNumber] + 1)
    if objectp(t_rComponent) then
      if t_ar_data[#up] then
        m_rComponentsPage.moveComponent(t_rComponent, -1)
      else
        m_rComponentsPage.moveComponent(t_rComponent, 1)
      end if
    end if
    t_rImg = m_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
end
on QuestCleared me, t_ar_data
  if t_ar_data[#tasksCleared] then
    t_sElemName = "quest.tasklist"
    t_rComponentPage = m_rComponentsPage
    t_rClientElement = m_rWindow.getElement(t_sElemName)
    if objectp(t_rComponentPage) then
      t_rComponentPage.deleteAllComponents(1)
      t_rImg = t_rComponentPage.render()
      t_rClientElement.feedImage(t_rImg)
    end if
    me.showTaskInfo(-1)
  end if
end
on saveCurrentDataToOwner me
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_rOwner = t_rManager.GetOwner()
  end if
  if objectp(t_rOwner) then
  end if
end
on UpdateScrollBar me
  t_offset = m_rComponentsPage.getCurrentOffset()
  tScrollbar = m_rWindow.getElement("quest.scrollbar")
  call(#setScrollOffset, tScrollbar, t_offset)
end
on TaskDescUpdated me
  me.updateTaskInfo()
end
on startEditingTask me, a_iActiveTaskID
  t_rOwner = me.getManager().GetOwner()
  if a_iActiveTaskID > 0 then
    m_iActiveTaskID = a_iActiveTaskID
    if objectp(t_rOwner) then
      t_ar_data = t_rOwner.getData()[#task_array][m_iActiveTaskID]
      t_ar_data[#questTemplateId] = t_rOwner.getData()[#questTemplateId]
      t_ar_data[#activeTaskRank] = m_iActiveTaskID - 1
      t_ar_subtasks = []
      t_bDefinitionOK = 1
      case t_ar_data[#taskType] of
        1:
          t_ar_subtasks = ["visitnpc"]
        2:
          t_ar_subtasks = []
        3:
          t_ar_subtasks = ["roomvisit"]
        4:
          t_ar_subtasks = ["minigame"]
        5:
          t_ar_subtasks = ["magics"]
        6:
          t_ar_subtasks = []
          t_bDefinitionOK = 0
        7:
          t_ar_subtasks = ["sayword"]
        8:
          t_ar_subtasks = ["spendcredits"]
        9:
          t_ar_subtasks = ["earncredits"]
        10:
          t_ar_subtasks = []
          t_bDefinitionOK = 0
        11:
          t_ar_subtasks = []
          t_bDefinitionOK = 0
        12:
          t_ar_subtasks = ["emote"]
        13:
          t_ar_subtasks = []
          t_bDefinitionOK = 0
        14:
          t_ar_subtasks = []
          t_bDefinitionOK = 0
        15:
          t_ar_subtasks = ["acquireitem"]
        16:
          t_ar_subtasks = []
          t_bDefinitionOK = 0
        17:
          t_ar_subtasks = ["multichoicetask"]
        18:
          t_ar_subtasks = ["collect"]
        19:
          t_ar_subtasks = []
        otherwise:
          put "Unknown task, can not edit:" && t_ar_data
          t_ar_subtasks = []
          t_bDefinitionOK = 0

      end case
      if not t_bDefinitionOK then
        t_txt = getText("quest.alert.updatetask.missing")
        t_title = getText("quest.alert.title")
        t_btn1 = getText("quest.alert.ok")
        t = createDialogWindow(me.getID(), "quest.alert.updatetask", 1, 1)
        t.setText(t_txt, t_title, t_btn1)
        t.show()
      else
        if t_ar_data[#taskType] = 2 then
          CreateQuestNotification("QuestPlaceItemUpdate", getThread(#QuestEngine).getComponent(), ["placeitem"], "floating", t_ar_data)
          t_ar_cmd = [t_ar_data[#questTemplateId], 0, t_ar_data[#taskType], m_iActiveTaskID - 1]
          getThread(#QuestEngine).getHandler().PrepareTask(t_ar_cmd)
          t_rOwner.hide()
        else
          if t_ar_data[#taskType] = 19 then
            CreateQuestNotification("QuestPlaceMultiUpdate", getThread(#QuestEngine).getComponent(), ["placemulti"], "floating", t_ar_data)
            t_ar_cmd = [t_ar_data[#questTemplateId], 0, t_ar_data[#taskType], m_iActiveTaskID - 1]
            getThread(#QuestEngine).getHandler().PrepareTask(t_ar_cmd)
            t_rOwner.hide()
          else
            CreateQuestNotification("QuestNotificationUpdateTask", me, t_ar_subtasks, "maker", t_ar_data)
          end if
        end if
      end if
    end if
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_rOwner = t_rManager.GetOwner()
  end if
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.tasklist":
        t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        executeMessage("PlayInterfaceSound", "UI-click")
        m_rComponentsPage.EventProc(a_vParam, t_ar_event)
        if t_ar_event.found then
          t_ar_questData = me.getManager().GetOwner().getData()
          t_rClientElement = tWndObj.getElement(a_sElemID)
          case t_ar_event.event of
            "quest.renametask":
              t_iActiveTaskID = m_rComponentsPage.getComponentID(t_ar_event.route.component)
              if not voidp(t_iActiveTaskID) then
                if t_iActiveTaskID < m_rComponentsPage.GetComponents().count then
                  me.showTaskInfo(t_iActiveTaskID, 1)
                  if the doubleClick then
                    me.startEditingTask(t_iActiveTaskID)
                  end if
                end if
              end if
            "quest.delete":
              t_ID = m_rComponentsPage.getComponentID(t_ar_event.route.component) - 1
              getThread(#QuestEngine).getHandler().DeleteTask([t_ar_questData[#questTemplateId], t_ID])
            "quest.newtask":
              if getObject("QuestDialogManagerAddTask") <> 0 then
                removeObject("QuestDialogManagerAddTask")
              end if
              t = createObject("QuestDialogManagerAddTask", "CQuestWindowManager")
              t.getInterface().SetType("maker")
              t.SetOwner(me)
              t.populate(["addtask"])
              t.Activate()
            "quest.taskhint":
              m_iActiveTaskID = m_rComponentsPage.getComponentID(t_ar_event.route.component)
              t_ar_task = t_rOwner.getData()[#task_array][m_iActiveTaskID]
              CreateQuestNotification("QuestNotificationStep1TaskHint", me, ["writehint"], "maker", t_ar_task)
            "quest.timelimit":
              m_iActiveTaskID = m_rComponentsPage.getComponentID(t_ar_event.route.component)
              t_ar_task = t_rOwner.getData()[#task_array][m_iActiveTaskID]
              CreateQuestNotification("QuestNotificationStep1TaskTimeLimit", me, ["addtasktime"], "maker", t_ar_task)
            "quest.moveup":
              t_ID = m_rComponentsPage.getComponentID(t_ar_event.route.component) - 1
              getThread(#QuestEngine).getHandler().MoveTask([t_ar_questData[#questTemplateId], t_ID, 1])
            "quest.movedown":
              t_ID = m_rComponentsPage.getComponentID(t_ar_event.route.component) - 1
              getThread(#QuestEngine).getHandler().MoveTask([t_ar_questData[#questTemplateId], t_ID, 0])
            otherwise:
              put "[Questengine.event]" && t_ar_event.event

          end case
          t_rClientElement = m_rWindow.getElement(a_sElemID)
          t_rImg = m_rComponentsPage.render()
          t_rClientElement.feedImage(t_rImg)
        end if
      "quest.addtimelimit":
        if m_iActiveTaskID > 0 then
          t_ar_task = t_rOwner.getData()[#task_array][m_iActiveTaskID]
          CreateQuestNotification("QuestNotificationStep1TaskTimeLimit", me, ["addtasktime"], "maker", t_ar_task)
        else
          put "Select task first"
        end if
      "quest.edithint":
        if m_iActiveTaskID > 0 then
          t_ar_task = t_rOwner.getData()[#task_array][m_iActiveTaskID]
          CreateQuestNotification("QuestNotificationStep1TaskHint", me, ["writehint"], "maker", t_ar_task)
        else
          put "Select task first"
        end if
      "quest.cleartasks.button":
        t_txt = getText("quest.confirmation.cleartasks")
        t_title = getText("quest.alert.title")
        t_btn1 = getText("quest.alert.cancel")
        t_btn2 = getText("quest.alert.ok")
        t = createDialogWindow(me.getID(), "quest.confirmation.cleartasks", 2, 1)
        t.setText(t_txt, t_title, t_btn1, t_btn2)
        t.show()
      "quest.nextstep.button", "quest.tab.prizes.passive", "quest.tab.settings.passive":
        me.saveCurrentDataToOwner()
        if objectp(t_rManager) then
          t_rManager.resolveSubtask()
          if a_sElemID = "quest.tab.settings.passive" then
            t_rManager.resolveSubtask()
          end if
          t_rManager.Activate()
        end if
      "close":
        removeObject(t_rOwner.getID())
      "quest.continuelater.button":
        me.saveCurrentDataToOwner()
        if objectp(t_rOwner) then
          t_ar_results = [:]
          t_ar_results[#testQuest] = 0
          t_ar_results[#releaseQuest] = 0
          t_iTargetHandler = #QuestDialogBroadcastEvent
          if t_rOwner.handlers().getOne(t_iTargetHandler) > 0 then
            call(t_iTargetHandler, t_rOwner, me.getID(), t_ar_results)
          end if
          removeObject(t_rOwner.getID())
        end if
      "quest.start.button":
        t_bTestingRequired = 1
        if objectp(t_rOwner) then
          t_bTestingRequired = t_rOwner.GetTestingRequired()
        end if
        if t_bTestingRequired then
          t_txt = getText("quest.dialog.testconfirmation")
        else
          t_txt = getText("quest.dialog.test.notrequired")
        end if
        t_title = getText("quest.alert.title")
        t_btn1 = getText("quest.alert.cancel")
        t_btn2 = getText("quest.alert.ok")
        t = createDialogWindow(me.getID(), "quest.dialog.testconfirmation", 2, 1)
        t.setText(t_txt, t_title, t_btn1, t_btn2)
        t.show()
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.step1", getText("help.quest", "help.quest")))
      otherwise:
        put "Unknown qe-elem:" && a_sElemID

    end case
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  t_rManager = me.getManager()
  t_rOwner = t_rManager.GetOwner()
  case t_dialogName of
    "quest.dialog.testconfirmation":
      case t_dialogEvent of
        #dialogOK:
          t_ar_data = [:]
          t_ar_data[#StartQuest] = 1
          t_ar_data[#releaseQuest] = 0
          if objectp(t_rManager) then
            t_rManager.appendSubResult(t_ar_data)
            t_rManager.resolveSubtask()
            t_rManager.resolveSubtask()
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
        #dialogCancel:

      end case
    "quest.confirmation.cleartasks":
      case t_dialogEvent of
        #dialogOK:
          t_ar_questData = me.getManager().GetOwner().getData()
          getThread(#QuestEngine).getHandler().ClearQuest([t_ar_questData[#questTemplateId], 1, 0, 0])
        #dialogCancel:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on QuestDialogBroadcastEvent me, t_iManagerID, t_ar_results
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_rOwner = t_rManager.GetOwner()
  end if
  t_ar_questData = t_rOwner.getData()
  case t_iManagerID of
    "QuestDialogManagerAddTask":
      if t_ar_results[#task] contains "addtask." then
        t_oldDelim = the itemDelimiter
        the itemDelimiter = "."
        t_iTaskID = integer(t_ar_results[#task].item[2])
        the itemDelimiter = t_oldDelim
        t_ar_cmd = [t_ar_questData[#questTemplateId], t_iTaskID, t_ar_results[#photo], t_ar_results[#hint]]
        case t_ar_results[#task] of
          "addtask.1":
            t_ar_cmd.append(t_ar_results[#npc])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.2":
            t_ar_data = [:]
            t_ar_data[#taskType] = 2
            t_ar_data[#questTemplateId] = t_ar_questData[#questTemplateId]
            t_ar_data[#activeTaskRank] = 1
            t_ar_data[#required] = 0
            t_ar_data[#item_count] = 0
            t_ar_data[#item_array] = []
            CreateQuestNotification("QuestPlaceItem", getThread(#QuestEngine).getComponent(), ["placeitem", "writehint"], "floating", t_ar_data)
            t_rOwner.hide()
          "addtask.3":
            t_ar_cmd.append(t_ar_results[#room])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.4":
            t_ar_cmd.append(t_ar_results[#GameID])
            t_ar_cmd.append(t_ar_results[#score])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.5":
            t_ar_cmd.append(t_ar_results[#magicEffectCode])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.6":
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.7":
            t_ar_cmd.append(t_ar_results[#phrase])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.8":
            t_ar_cmd.append(t_ar_results[#amount])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.9":
            t_ar_cmd.append(t_ar_results[#amount])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.10":
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.11":
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.12":
            t_ar_cmd.append(t_ar_results[#emoticon])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.13":
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.14":
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.15":
            t_ar_cmd.append(t_ar_results[#itemCode])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.16":
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.17":
            t_ar_cmd.append(t_ar_results[#correctAnswerID])
            t_ar_cmd.append(t_ar_results[#answers])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.18":
            t_ar_cmd.append(t_ar_results[#itemCode])
            t_ar_cmd.append(t_ar_results[#amount])
            getThread(#QuestEngine).getHandler().AddTask(t_ar_cmd)
          "addtask.19":
            t_ar_data = [:]
            t_ar_data[#taskType] = 2
            t_ar_data[#questTemplateId] = t_ar_questData[#questTemplateId]
            t_ar_data[#activeTaskRank] = 1
            t_ar_data[#required] = 0
            t_ar_data[#item_count] = 0
            t_ar_data[#item_array] = []
            CreateQuestNotification("QuestPlaceMulti", getThread(#QuestEngine).getComponent(), ["placemulti", "writehint"], "floating", t_ar_data)
            t_rOwner.hide()
          otherwise:
            put "Quest Step1, problem with subtask" && t_ar_results[#task]

        end case
      end if
    "QuestNotificationStep1TaskHint":
      t_ar_cmd = [t_ar_questData[#questTemplateId], m_iActiveTaskID - 1, t_ar_results[#photo], t_ar_results[#hint]]
      getThread(#QuestEngine).getHandler().UpdateTaskDesc(t_ar_cmd)
    "QuestNotificationStep1TaskTimeLimit":
      t_ar_cmd = [t_ar_questData[#questTemplateId], m_iActiveTaskID - 1, t_ar_results[#timeLimitInSecs]]
      getThread(#QuestEngine).getHandler().UpdateTaskTimeLimit(t_ar_cmd)
    "QuestNotificationUpdateTask":
      t_ar_cmd = [t_ar_questData[#questTemplateId], t_ar_results[#taskType], m_iActiveTaskID - 1]
      case t_ar_results[#taskType] of
        1:
          t_ar_cmd.append(t_ar_results[#npc])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        2:
          put "TO DO"
        3:
          t_ar_cmd.append(t_ar_results[#room])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        4:
          t_ar_cmd.append(t_ar_results[#GameID])
          t_ar_cmd.append(t_ar_results[#score])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        5:
          t_ar_cmd.append(t_ar_results[#magicEffectCode])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        6:
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        7:
          t_ar_cmd.append(t_ar_results[#phrase])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        8:
          t_ar_cmd.append(t_ar_results[#amount])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        9:
          t_ar_cmd.append(t_ar_results[#amount])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        10:
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        11:
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        12:
          t_ar_cmd.append(t_ar_results[#emoticon])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        13:
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        14:
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        15:
          t_ar_cmd.append(t_ar_results[#itemCode])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        16:
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        17:
          t_ar_cmd.append(t_ar_results[#correctAnswerID])
          t_ar_cmd.append(t_ar_results[#answers])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        18:
          t_ar_cmd.append(t_ar_results[#itemCode])
          t_ar_cmd.append(t_ar_results[#amount])
          getThread(#QuestEngine).getHandler().UpdateTask(t_ar_cmd)
        19:
          put "Just hide the Multi-window?"
        otherwise:
          put "Quest Step1, problem with UPDATING subtask" && t_ar_results[#taskType] && t_ar_results

      end case
    otherwise:
      put "Quest Step1: Unknown manager" && t_iManagerID && t_ar_results

  end case
end