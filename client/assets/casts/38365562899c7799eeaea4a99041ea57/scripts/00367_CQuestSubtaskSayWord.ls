-- Script
property m_rWindow
property m_ar_components
property m_ar_CannedFields

on construct me
  m_ar_CannedFields = [:]
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  return 1
end
on deconstruct me
  repeat with t_rCannedField in m_ar_CannedFields
    removeObject(t_rCannedField.getID())
  end repeat
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
  t_bSuccess = m_rWindow.merge("vmk_quest_sayword.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.sayword"))
  end if
  t_ar_fields = ["quest.sayword.input"]
  repeat with t_sFieldName in t_ar_fields
    t_rCannedField = createObject(#random, "CQuestCannedField")
    t_rCannedField.Init(m_rWindow, t_sFieldName)
    t_rCannedField.setWordLimit(4)
    m_ar_CannedFields[t_sFieldName] = t_rCannedField
  end repeat
  createTimeout("setFocus", 500, #setFocus, me.getID(), VOID, 1)
  return t_bSuccess
end
on setFocus me
  tElem = m_rWindow.getElement("quest.sayword.input")
  if tElem <> 0 then
    tElem.setFocus(1)
    set the selStart to tElem.getText().length
    set the selEnd to tElem.getText().length
  end if
end
on rawData me, t_ar_data
  put "Update task: Say Word" && t_ar_data
  me.setField(m_rWindow, "quest.sayword.input", t_ar_data[#phrase])
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#taskType] = t_ar_data[#taskType]
    t_rManager.appendSubResult(t_ar_results)
  end if
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
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  if a_kEvent = #keyUp or a_kEvent = #keyDown then
    t_sCannedFieldName = m_ar_CannedFields.getPropAt(1)
    case a_sElemID of
      t_sCannedFieldName:
        return m_ar_CannedFields[1]._EventProc(a_kEvent, a_sElemID, a_vParam)

    end case
  end if
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "mes.accept.button":
        t_bDataOK = 0
        tElement = m_rWindow.getElement("quest.sayword.input")
        if tElement <> 0 then
          t_sText = tElement.getText()
          t_ar_results = [:]
          if m_ar_CannedFields[1].CheckContent() then
            if t_sText.word.count < 5 then
              t_ar_text = ParseCannedField(tElement, [])
              t_ar_results[#phrase] = t_ar_text
              t_rManager = me.getManager()
              if objectp(t_rManager) then
                t_rManager.appendSubResult(t_ar_results)
                t_rManager.resolveSubtask()
                t_rManager.Activate()
              end if
              t_bDataOK = 1
            end if
          end if
        end if
        if not t_bDataOK then
          t_txt = getText("quest.alert.sayword.missing")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.sayword", 1, 1)
          t.setText(t_txt, t_title, t_btn1)
          t.show()
        end if
      "quest.quit", "close", "mes.deny.button":
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_rManager.cancelSubtask()
          t_rManager.Activate()
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.addtask", getText("help.quest", "help.quest")), 1)
      otherwise:
        put "Subtask.SayWord.event:" && a_sElemID

    end case
  end if
end