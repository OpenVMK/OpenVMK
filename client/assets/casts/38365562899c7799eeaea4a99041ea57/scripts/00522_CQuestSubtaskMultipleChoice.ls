-- Script
property m_rWindow
property m_ar_components
property m_ar_CannedFields
property m_rRadioButton

on construct me
  m_ar_CannedFields = [:]
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  return 1
end
on deconstruct me
  if objectp(m_rRadioButton) then
    removeObject(m_rRadioButton)
  end if
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
  t_bSuccess = m_rWindow.merge("vmk_quest_multichoice.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.multichoice"))
  end if
  t_ar_fields = ["quest.answer.input1", "quest.answer.input2", "quest.answer.input3", "quest.answer.input4", "quest.answer.input5"]
  repeat with t_sFieldName in t_ar_fields
    t_rCannedField = createObject(#random, "CQuestCannedField")
    t_rCannedField.Init(m_rWindow, t_sFieldName, 1)
    t_rCannedField.setWordLimit(4)
    m_ar_CannedFields[t_sFieldName] = t_rCannedField
  end repeat
  a_rWindow.registerProcedure(#_EventProc, me.getID(), #keyDown)
  a_rWindow.registerProcedure(#_EventProc, me.getID(), #keyUp)
  createTimeout("setFocus", 500, #setFocus, me.getID(), VOID, 1)
  me.createRadioButton()
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = t_rManager.getResults()
    if listp(t_ar_results[#answers]) then
      repeat with i = 1 to t_ar_results[#answers].count
        t_rAnswer = t_ar_results[#answers][i]
        t_sAnswer = EMPTY
        if listp(t_rAnswer) then
          t_sAnswer = TransformCannedToString(t_rAnswer)
        else
          if stringp(t_rAnswer) then
            t_sAnswer = t_rAnswer
          end if
        end if
        me.setField(m_rWindow, "quest.answer.input" & i, t_sAnswer)
      end repeat
    end if
    t_iCorrectAnswerID = t_ar_results[#correctAnswerID]
    if integerp(t_iCorrectAnswerID) then
      m_rRadioButton.clickElement("quest.answer" & t_iCorrectAnswerID)
      m_rRadioButton.updateMenu()
    end if
  end if
  return t_bSuccess
end
on setFocus me
  tElem = m_rWindow.getElement("quest.answer.input1")
  if tElem <> 0 then
    tElem.setFocus(1)
    set the selStart to tElem.getText().length
    set the selEnd to tElem.getText().length
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
on createRadioButton me
  m_rRadioButton = createObject(getUniqueID(), "CQuestRadioButton")
  t_ar_elements = []
  t_ar_elements.append([#element: "quest.answer1", #description: EMPTY, #value: 1])
  t_ar_elements.append([#element: "quest.answer2", #description: EMPTY, #value: 2])
  t_ar_elements.append([#element: "quest.answer3", #description: EMPTY, #value: 3])
  t_ar_elements.append([#element: "quest.answer4", #description: EMPTY, #value: 4])
  t_ar_elements.append([#element: "quest.answer5", #description: EMPTY, #value: 5])
  m_rRadioButton.addElements(t_ar_elements)
  m_rRadioButton.setParentWindow(m_rWindow)
  m_rRadioButton.clickElement("quest.answer1")
  m_rRadioButton.updateMenu()
end
on saveData me, a_bDiscardErrors
  t_rManager = me.getManager()
  t_rOwner = t_rManager.GetOwner()
  t_ar_fields = ["quest.answer.input1", "quest.answer.input2", "quest.answer.input3", "quest.answer.input4", "quest.answer.input5"]
  t_iChosenAnswer = m_rRadioButton.getValue()
  t_Elem = m_rWindow.getElement(t_ar_fields[t_iChosenAnswer])
  if t_Elem.getText().length = 0 then
    put "Multiple Choice - Chosen Answer is Empty" && t_iChosenAnswer
    return 0
  end if
  t_iLastAnswer = 0
  repeat with t_sFieldName in t_ar_fields
    t_Elem = m_rWindow.getElement(t_sFieldName)
    if t_Elem.getText().length > 0 then
      t_iLastAnswer = t_iLastAnswer + 1
      next repeat
    end if
    exit repeat
  end repeat
  if t_iLastAnswer < 2 then
    put "Not enough answers, 2 required!!"
    return 0
  end if
  t_iContentOK = 0
  repeat with t_rCannedField in m_ar_CannedFields
    t_iContentOK = t_iContentOK + t_rCannedField.CheckContent()
  end repeat
  if t_iContentOK < t_iLastAnswer then
    put "Multiple Choice - Field Contain unallowed content" && t_iContentOK && m_ar_CannedFields.count && t_iLastAnswer
    return 0
  end if
  t_ar_answers = []
  repeat with i = 1 to t_iLastAnswer
    tElement = m_rWindow.getElement(t_ar_fields[i])
    t_ar_answers.append(ParseCannedField(tElement, []))
  end repeat
  if t_ar_answers.count < 2 then
    return 0
  end if
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#correctAnswerID] = t_iChosenAnswer
    t_ar_results[#answers] = t_ar_answers
    t_rManager.appendSubResult(t_ar_results)
    return 1
  end if
  return 0
end
on rawData me, t_ar_data
  put "Update task: Multiple Choice" && t_ar_data
  if listp(t_ar_data[#answers]) then
    repeat with i = 1 to t_ar_data[#answers].count
      t_rAnswer = t_ar_data[#answers][i]
      t_sAnswer = EMPTY
      if listp(t_rAnswer) then
        t_sAnswer = TransformCannedToString(t_rAnswer)
      else
        if stringp(t_rAnswer) then
          t_sAnswer = t_rAnswer
        end if
      end if
      me.setField(m_rWindow, "quest.answer.input" & i, t_sAnswer)
    end repeat
  end if
  t_iCorrectAnswerID = t_ar_data[#correctAnswerID]
  if integerp(t_iCorrectAnswerID) then
    m_rRadioButton.clickElement("quest.answer" & t_iCorrectAnswerID)
    m_rRadioButton.updateMenu()
  end if
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
  t_rOwner = t_rManager.GetOwner()
  if a_kEvent = #keyUp or a_kEvent = #keyDown then
    case a_sElemID of
      "quest.answer.input1", "quest.answer.input2", "quest.answer.input3", "quest.answer.input4", "quest.answer.input5":
        return m_ar_CannedFields[a_sElemID]._EventProc(a_kEvent, a_sElemID, a_vParam)

    end case
  end if
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "mes.accept.button":
        t_bDataOK = me.saveData()
        if t_bDataOK then
          t_rManager.resolveSubtask()
          t_rManager.Activate()
        else
          t_txt = getText("quest.alert.multichoice.missing")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.multichoice", 1, 1)
          t.setText(t_txt, t_title, t_btn1)
          t.show()
        end if
      "quest.answer1", "quest.answer2", "quest.answer3", "quest.answer4", "quest.answer5":
        m_rRadioButton.clickElement(a_sElemID)
        m_rRadioButton.updateMenu()
      "mes.deny.button":
        me.saveData(1)
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_rManager.cancelSubtask()
          t_rManager.Activate()
        end if
      "quest.quit", "close":
        me.saveData(1)
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