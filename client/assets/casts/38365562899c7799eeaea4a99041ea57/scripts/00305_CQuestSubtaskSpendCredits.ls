-- Script
property m_rWindow
property m_ar_components
property m_iCurrentAmount
property m_iCreditsState
property m_iPrizeStep

on construct me
  m_iCurrenAmount = 0
  m_iPrizeStep = 5
  m_iCreditsState = #inactive
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
  t_bSuccess = m_rWindow.merge("vmk_quest_credits_spend.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.spendcredits"))
  end if
  me.setAmount(0)
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
  put "Update task: Spend Credits" && t_ar_data
  me.setAmount(t_ar_data[#amount])
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#taskType] = t_ar_data[#taskType]
    t_rManager.appendSubResult(t_ar_results)
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  if a_kEvent = #mouseDown then
    case a_sElemID of
      "quest.credits.up":
        m_iCreditsState = #toprize
        createTimeout("updateAmount", 100, #updateAmount, me.getID(), VOID, VOID)
      "quest.credits.down":
        m_iCreditsState = #fromprize
        createTimeout("updateAmount", 100, #updateAmount, me.getID(), VOID, VOID)

    end case
  else
    if a_kEvent = #mouseUp then
      m_iCreditsState = #inactive
      if timeoutExists("updateAmount") then
        removeTimeout("updateAmount")
      end if
      case a_sElemID of
        "mes.accept.button":
          if m_iCurrentAmount > 0 then
            t_ar_results = [#amount: m_iCurrentAmount]
            t_rManager = me.getManager()
            if objectp(t_rManager) then
              t_rManager.appendSubResult(t_ar_results)
              t_rManager.resolveSubtask()
              t_rManager.Activate()
            end if
          else
            t_txt = getText("quest.alert.spendcredits.text")
            t_title = getText("quest.alert.title")
            t_btn1 = getText("quest.alert.ok")
            t = createDialogWindow(me.getID(), "quest.alert.spendcredits", 1, 1)
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
          put "Subtask.SpendCredits.event:" && a_sElemID

      end case
    end if
  end if
end
on setCredits me, t_iCredits
  t_rElement = m_rWindow.getElement("credits.spend")
  if t_rElement <> 0 then
    t_rElement.setText(t_iCredits)
  end if
end
on setAmount me, t_iCredits
  t_rElement = m_rWindow.getElement("credits.spend")
  if t_rElement <> 0 then
    t_rElement.setText(t_iCredits)
  end if
  m_iCurrentAmount = t_iCredits
end
on addToPrize me
  me.setAmount(m_iCurrentAmount + m_iPrizeStep)
end
on removeFromPrize me
  if m_iCurrentAmount - m_iPrizeStep >= 0 then
    me.setAmount(m_iCurrentAmount - m_iPrizeStep)
  else
    me.setAmount(0)
  end if
end
on updateAmount me
  case m_iCreditsState of
    #toprize:
      me.addToPrize()
    #fromprize:
      me.removeFromPrize()

  end case
end