-- Script
property m_rWindow
property m_ar_components
property m_rRadioButton
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
  t_bSuccess = m_rWindow.merge("vmk_quest_top_authors.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
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
  put "Hall Of Fame" && t_ar_data
  me.setField(m_rWindow, "quest.dialog.hd", getText("quest.halloffame.title"))
  me.setButtonTxt(m_rWindow, "mes.accept.button", "OK")
  t_sMemName = "HELPITEM.node"
  t_iMemNum = createMember(t_sMemName, #text)
  t_rMem = member(t_iMemNum)
  t_rMem.font = "Arial"
  t_rMem.wordWrap = 0
  t_rMem.fontStyle = [#plain]
  t_rMem.fontSize = 12
  t_rMem.antialias = 0
  t_rMem.color = rgb(255, 255, 255)
  t_iW = m_rWindow.getElement("quest.top100authors").getProperty(#width)
  t_iH = m_rWindow.getElement("quest.top100authors").getProperty(#height)
  t_iH = max(t_iH, t_ar_data[#author_count] * 14)
  t_rImg = image(t_iW, t_iH, 32)
  t_rImg.fill(t_rImg.rect, [#shapeType: #rect, #color: rgb("#001F56")])
  i = 0
  repeat with t_ar_author in t_ar_data[#author_array]
    t_rMem.text = i + 1 & "." && t_ar_author[#avatarName]
    t_rImg.copyPixels(t_rMem.image, t_rMem.image.rect + rect(0, i * 14, 0, i * 14), t_rMem.image.rect)
    i = i + 1
  end repeat
  i = 0
  repeat with t_ar_author in t_ar_data[#author_array]
    t_rMem.text = t_ar_author[#rating].string
    t_rImg.copyPixels(t_rMem.image, t_rMem.image.rect + rect(200, i * 14, 200, i * 14), t_rMem.image.rect)
    i = i + 1
  end repeat
  m_rWindow.getElement("quest.top100authors").feedImage(t_rImg)
  removeMember(t_sMemName)
  m_ar_data = t_ar_data
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if a_kEvent = #mouseUp then
    case a_sElemID of
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
        executeMessage(#open_help_page, getText("help.quest.authorscore", getText("help.quest", "help.quest")))
      otherwise:
        put "InQuest.dialog.QuestCompleted.event:" && a_sElemID

    end case
  end if
end