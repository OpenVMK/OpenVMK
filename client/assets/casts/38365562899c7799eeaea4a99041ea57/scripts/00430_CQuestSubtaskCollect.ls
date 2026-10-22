-- Script
property m_rWindow
property m_ar_components
property m_ar_data
property m_rSprite
property m_rRadioButton
property m_iCurrentScore
property m_iScoreState
property m_ar_defaults

on construct me
  m_ar_defaults = [#min: 1, #max: 15, #accuracy: 1, #default: 1]
  m_iCurrenAmount = 1
  m_ar_defaults[#accuracy] = 1
  m_iScoreState = #inactive
  m_rSprite = VOID
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  return 1
end
on deconstruct me
  if objectp(m_rRadioButton) then
    removeObject(m_rRadioButton)
  end if
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  if objectp(m_rSprite) then
    releaseSprite(m_rSprite.spriteNum)
  end if
  getThread(#QuestEngine).getComponent().HideFindableItem([])
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_collect.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.18"))
  end if
  me.createRadioButton()
  me.setAmount(m_ar_defaults[#default])
  return t_bSuccess
end
on createRadioButton me
  m_rRadioButton = createObject(getUniqueID(), "CQuestRadioButton")
  t_ar_elements = []
  t_ar_elements.append([#element: "quest.collect1", #description: EMPTY, #value: 394])
  t_ar_elements.append([#element: "quest.collect2", #description: EMPTY, #value: 388])
  t_ar_elements.append([#element: "quest.collect3", #description: EMPTY, #value: 382])
  m_rRadioButton.addElements(t_ar_elements)
  m_rRadioButton.setParentWindow(m_rWindow)
  m_rRadioButton.clickElement("quest.collect1")
  m_rRadioButton.updateMenu()
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
  put "Update Collect Collectable" && t_ar_data
  m_ar_data = t_ar_data
  a_sElemID = "quest.collect1"
  case t_ar_data[#itemCode] of
    394:
      a_sElemID = "quest.collect1"
    388:
      a_sElemID = "quest.collect2"
    382:
      a_sElemID = "quest.collect3"

  end case
  m_rRadioButton.clickElement(a_sElemID)
  m_rRadioButton.updateMenu()
  me.setAmount(t_ar_data[#amount])
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#taskType] = t_ar_data[#taskType]
    t_rManager.appendSubResult(t_ar_results)
  end if
end
on appendResults me
  t_rManager = me.getManager()
  t_bDataOK = 0
  return t_bDataOK
end
on saveData me
  t_rManager = me.getManager()
  t_rOwner = t_rManager.GetOwner()
  t_iChosenAnswer = m_rRadioButton.getValue()
  put "Collectable choices" && t_iChosenAnswer && m_iCurrentScore
  if m_iCurrentScore = 0 then
    return 0
  end if
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#itemCode] = t_iChosenAnswer
    t_ar_results[#amount] = m_iCurrentScore
    t_rManager.appendSubResult(t_ar_results)
    return 1
  end if
  return 0
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_rOwner = t_rManager.GetOwner()
  end if
  if a_kEvent = #mouseDown then
    case a_sElemID of
      "quest.collectlimit.up":
        m_iScoreState = #toprize
        me.updateAmount()
        createTimeout("updateScore", 100, #updateAmount, me.getID(), VOID, VOID)
      "quest.collectlimit.down":
        m_iScoreState = #fromprize
        me.updateAmount()
        createTimeout("updateScore", 100, #updateAmount, me.getID(), VOID, VOID)

    end case
  else
    if a_kEvent = #mouseUp then
      m_iScoreState = #inactive
      if timeoutExists("updateScore") then
        removeTimeout("updateScore")
      end if
      case a_sElemID of
        "mes.accept.button":
          t_bDataOK = me.saveData()
          if t_bDataOK then
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          else
            t_txt = getText("quest.alert.collect.missing")
            t_title = getText("quest.alert.title")
            t_btn1 = getText("quest.alert.ok")
            t = createDialogWindow(me.getID(), "quest.alert.collect", 1, 1)
            t.setText(t_txt, t_title, t_btn1)
            t.show()
          end if
        "close", "quest.quit", "mes.deny.button":
          t_rManager = me.getManager()
          if objectp(t_rManager) then
            t_rManager.cancelSubtask()
            t_rManager.Activate()
          end if
        "quest.collect1", "quest.collect2", "quest.collect3":
          m_rRadioButton.clickElement(a_sElemID)
          m_rRadioButton.updateMenu()
        "quest.item1.hd", "quest.item2.hd", "quest.item3.hd":
          t_sRadioID = replaceChunks(a_sElemID, ".hd", EMPTY)
          t_sRadioID = replaceChunks(t_sRadioID, "item", "collect")
          m_rRadioButton.clickElement(t_sRadioID)
          m_rRadioButton.updateMenu()
        "icons", "icons2", "icons3":
          t_sRadioID = replaceChunks(a_sElemID, "icons", "quest.collect")
          if t_sRadioID = "quest.collect" then
            t_sRadioID = t_sRadioID & "1"
          end if
          m_rRadioButton.clickElement(t_sRadioID)
          m_rRadioButton.updateMenu()
        "help":
          executeMessage("PlayInterfaceSound", "UI-click")
          executeMessage(#open_help_page, getText("help.quest.collectables", getText("help.quest", "help.quest")), 1)
        otherwise:
          put "Subtask.Collect.event:" && a_sElemID

      end case
    end if
  end if
end
on setCredits me, t_iCredits
  t_rElement = m_rWindow.getElement("quest.collect.amount")
  if t_rElement <> 0 then
    t_rElement.setText(t_iCredits)
  end if
end
on setAmount me, t_iCredits
  t_rElement = m_rWindow.getElement("quest.collect.amount")
  if t_rElement <> 0 then
    t_rElement.setText(t_iCredits)
  end if
  m_iCurrentScore = t_iCredits
end
on addToPrize me
  if m_iCurrentScore + m_ar_defaults[#accuracy] <= m_ar_defaults[#max] then
    me.setAmount(m_iCurrentScore + m_ar_defaults[#accuracy])
  else
    me.setAmount(m_ar_defaults[#max])
  end if
end
on removeFromPrize me
  if m_iCurrentScore - m_ar_defaults[#accuracy] >= m_ar_defaults[#min] then
    me.setAmount(m_iCurrentScore - m_ar_defaults[#accuracy])
  else
    me.setAmount(m_ar_defaults[#min])
  end if
end
on updateAmount me
  case m_iScoreState of
    #toprize:
      me.addToPrize()
    #fromprize:
      me.removeFromPrize()

  end case
end