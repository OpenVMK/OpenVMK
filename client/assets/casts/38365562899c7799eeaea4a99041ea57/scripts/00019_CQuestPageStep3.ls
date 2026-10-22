-- Script
property m_rWindow
property m_rComponentsPage
property m_rRadioButton
property m_ar_CannedFields

on construct me
  m_ar_CannedFields = [:]
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
  if objectp(m_rComponentsPage) then
    removeObject(m_rComponentsPage.getID())
  end if
  if objectp(m_rRadioButton) then
    removeObject(m_rRadioButton.getID())
  end if
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_create_step_3.window")
  me.createRadioButton()
  me.changeImageInElement(m_rWindow, "quest.main.label", member("quest.label.create"))
  me.setButtonState(m_rWindow, "quest.nextstep.button", 0)
  me.setButtonState(m_rWindow, "quest.start.button", 0)
  me.setField(m_rWindow, "quest.main.hd", getText("quest.step3.title"))
  t_ar_fields = ["quest.questname.input", "quest.description.input"]
  repeat with t_sFieldName in t_ar_fields
    t_rCannedField = createObject(#random, "CQuestCannedField")
    t_rCannedField.Init(m_rWindow, t_sFieldName)
    m_ar_CannedFields[t_sFieldName] = t_rCannedField
  end repeat
  createTimeout("setFocus", 500, #setFocus, me.getID(), VOID, 1)
  me.hidePageTabs()
  return t_bSuccess
end
on hidePageTabs me
  me.elemVisibility("quest.tab.tasks.active", 0)
  me.elemVisibility("quest.tab.prizes.active", 0)
  me.elemVisibility("quest.tab.settings.active", 1)
end
on setTestingStatus me, a_bStatus
  if a_bStatus then
    me.setButtonState(m_rWindow, "quest.start.button", 1)
  else
    me.setButtonState(m_rWindow, "quest.start.button", 0)
  end if
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
on setFocus me
  tElem = m_rWindow.getElement("quest.questname.input")
  if tElem <> 0 then
    tElem.setFocus(1)
    set the selStart to tElem.getText().length
    set the selEnd to tElem.getText().length
  end if
end
on setDescription me, a_sText
  t_sNewLine = numToChar(10)
  t_sReturn = numToChar(13)
  t_sDesc = replaceChunks(a_sText, t_sNewLine, t_sReturn)
  t_rElement = m_rWindow.getElement("quest.description.input")
  if t_rElement <> 0 then
    t_rElement.setText(t_sDesc)
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
    if a_kAlteredCategory = #step3 then
    end if
  end if
end
on createRadioButton me
  m_rRadioButton = createObject(getUniqueID(), "CQuestRadioButton")
  t_ar_data = []
  t_ar_data.append([#element: "quest.type1.button", #description: EMPTY, #value: 0])
  t_ar_data.append([#element: "quest.type2.button", #description: EMPTY, #value: 1])
  m_rRadioButton.addElements(t_ar_data)
  m_rRadioButton.setParentWindow(m_rWindow)
  m_rRadioButton.clickElement("quest.type1.button")
  m_rRadioButton.updateMenu()
end
on createComponentWindow me
  t_rClientElement = m_rWindow.getElement("quest.tasklist")
  m_rComponentsPage = createObject("ComponentPage", "CUIComponentPage")
  m_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  m_rComponentsPage.setColor(rgb("#001F56"))
  m_rComponentsPage.addComponent("component.questengine.03.xml")
  t_rImg = m_rComponentsPage.render()
  t_rClientElement.feedImage(t_rImg)
end
on setPrizingMode me, a_iMode
  case a_iMode of
    0:
      a_sElemID = "quest.type1.button"
    1:
      a_sElemID = "quest.type2.button"
    otherwise:
      a_sElemID = "quest.type1.button"

  end case
  m_rRadioButton.clickElement(a_sElemID)
  m_rRadioButton.updateMenu()
end
on SetName me, a_sText
  t_rElement = m_rWindow.getElement("quest.questname.input")
  if t_rElement <> 0 then
    t_rElement.setText(a_sText)
  end if
end
on setDuration me, a_iSeconds
  t_sTime = seconds2time(a_iSeconds)
  t_rElement = m_rWindow.getElement("quest.timetotal")
  if t_rElement <> 0 then
    t_rElement.setText(t_sTime)
  end if
end
on QuestCleared me, t_ar_data
  if t_ar_data[#propertiesCleared] then
  end if
end
on saveCurrentDataToOwner me
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_rOwner = t_rManager.GetOwner()
  end if
  if objectp(t_rOwner) then
    tElement = m_rWindow.getElement("quest.questname.input")
    t_sText = tElement.getText()
    tDescElement = m_rWindow.getElement("quest.description.input")
    t_sDesc = tDescElement.getText()
    t_ar_data = [:]
    t_ar_data[#questName] = t_sText
    t_ar_data[#description] = t_sDesc
    t_ar_data[#prizingMode] = m_rRadioButton.getValue()
    t_ar_data[#questDurationInSecs] = time2seconds(m_rWindow.getElement("quest.timetotal").getText())
    t_rOwner.setData(t_ar_data)
  end if
end
on checkCannedFields me
  t_iContentOK = 0
  repeat with t_rCannedField in m_ar_CannedFields
    t_iContentOK = t_iContentOK + t_rCannedField.CheckContent()
  end repeat
  return t_iContentOK = the count of m_ar_CannedFields
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  t_rOwner = t_rManager.GetOwner()
  if a_kEvent = #keyUp or a_kEvent = #keyDown then
    me.setTestingStatus(me.checkCannedFields())
    case a_sElemID of
      "quest.questname.input1", "quest.description.input2":
        return m_ar_CannedFields[a_sElemID]._EventProc(a_kEvent, a_sElemID, a_vParam)

    end case
  end if
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.previousstep.button", "quest.tab.prizes.passive", "quest.tab.tasks.passive":
        me.saveCurrentDataToOwner()
        if objectp(t_rManager) then
          t_rManager.cancelSubtask()
          if a_sElemID = "quest.tab.tasks.passive" then
            t_rManager.cancelSubtask()
          end if
          t_rManager.Activate()
        end if
      "quest.type1.button", "quest.type2.button":
        m_rRadioButton.clickElement(a_sElemID)
        m_rRadioButton.updateMenu()
      "quest.type1.hd", "quest.type2.hd":
        m_rRadioButton.clickElement(replaceChunks(a_sElemID, "hd", "button"))
        m_rRadioButton.updateMenu()
      "quest.start.button":
        if me.checkCannedFields() then
          me.saveCurrentDataToOwner()
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
        else
          t_txt = getText("quest.alert.questname.missing")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.questname", 1, 1)
          t.setText(t_txt, t_title, t_btn1)
          t.show()
        end if
      "quest.settime.button":
        t_sTime = m_rWindow.getElement("quest.timetotal").getText()
        CreateQuestNotification("QuestNotificationStep3SetTime", me, ["selectduration"], "maker", [#duration: time2seconds(t_sTime)])
      "close":
        removeObject(t_rOwner.getID())
      "quest.continuelater.button":
        me.saveCurrentDataToOwner()
        if me.checkCannedFields() then
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
        else
          t_txt = getText("quest.alert.description.missing")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.description", 1, 1)
          t.setText(t_txt, t_title, t_btn1)
          t.show()
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.step3", getText("help.quest", "help.quest")))
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
            t_rManager.Activate()
          end if
        #dialogCancel:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on QuestDialogBroadcastEvent me, t_iManagerID, t_ar_results
  t_rManager = me.getManager()
  case t_iManagerID of
    "QuestNotificationStartQuest":
      t_ar_data = [:]
      t_ar_data[#StartQuest] = t_ar_results[#testQuest]
      t_ar_data[#releaseQuest] = t_ar_results[#releaseQuest]
      if objectp(t_rManager) then
        t_rManager.appendSubResult(t_ar_data)
        t_rManager.resolveSubtask()
        t_rManager.Activate()
      end if
    "QuestNotificationStep3SetTime":
      me.setDuration(t_ar_results[#duration])
    otherwise:
      put "CQuestPageStep3. Unknown Quest Dialog" && t_iManagerID

  end case
end