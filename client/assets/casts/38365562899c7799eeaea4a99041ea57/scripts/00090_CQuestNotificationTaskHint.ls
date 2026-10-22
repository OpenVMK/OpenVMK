-- Script
property m_rWindow
property m_ar_components
property m_ar_data
property m_iCurrentID

on construct me
  m_iCurrentID = -1
  m_ar_data = [:]
  m_ar_data = [:]
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  registerMessage(#photo_catalog_redraw, me.getID(), #reDraw)
  return 1
end
on deconstruct me
  unregisterMessage(#photo_catalog_redraw, me.getID())
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
  t_bSuccess = m_rWindow.merge("vmk_quest_ingame_hint.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.taskhint"))
  end if
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
on reDraw me
  if m_iCurrentID > 0 then
    tempMember = getMember("tempImg")
    tPic = getThread(#QuestEngine).getInterface().getPhoto(m_iCurrentID)
    if not voidp(tPic) then
      m_rWindow.getElement("fto.view").show()
      tPhotoMedia = tPic.pic
      if voidp(tPhotoMedia) then
        getThread(#QuestEngine).getInterface().RequestQuestPhoto(m_iCurrentID)
        m_rWindow.getElement("fto.view").feedImage(getMember("loaderImg").image)
      else
        tempMember.media = tPhotoMedia.image
        tempMember.palette = getMember("sepia_palette_catalog")
        m_rWindow.getElement("fto.view").feedImage(tempMember.image)
      end if
    else
      getThread(#QuestEngine).getInterface().RequestQuestPhoto(m_iCurrentID)
      m_rWindow.getElement("fto.view").hide()
    end if
  end if
end
on rawData me, t_ar_data
  put "Fill blanks (CurrentTaskData)"
  m_ar_data = t_ar_data
  m_iCurrentID = t_ar_data[#photoId]
  t_sTask = "Task" && t_ar_data[#taskNumber] + 1 & "/" & t_ar_data[#totalTaskCount]
  me.setField(m_rWindow, "quest.dialog.hd", t_ar_data[#questName] & ", " & t_sTask)
  me.setField(m_rWindow, "quest.taskhint.text", t_ar_data[#description])
  if t_ar_data[#remainingTaskDurationInSecs] < 0 then
    me.setField(m_rWindow, "quest.timelimit", getText("quest.task.notimelimit"))
  else
    createTimeout(getUniqueID(), 100, #updateTimer, me.getID(), [#elem: "quest.timelimit", #time: t_ar_data[#remainingTaskDurationInSecs], #amount: -1], 1)
  end if
  createTimeout(getUniqueID(), 100, #updateTimer, me.getID(), [#elem: "quest.timetotal", #time: t_ar_data[#questDurationInSecs], #amount: 1], 1)
  me.reDraw()
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
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "close", "mes.accept.button":
        if objectp(t_rManager) then
          removeObject(t_rManager.getID())
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.taskhint", getText("help.quest", "help.quest")))
      otherwise:
        put "InQuest.dialog.TaskHint.event:" && a_sElemID

    end case
  end if
end