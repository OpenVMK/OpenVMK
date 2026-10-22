-- Script
property m_rWindow
property m_ar_components
property m_iCurrentScore
property m_iScoreState
property m_ar_defaults

on construct me
  m_ar_defaults = [#min: 0, #max: 0, #accuracy: 5, #default: 0]
  m_iCurrenAmount = 0
  m_ar_defaults[#accuracy] = 5
  m_iScoreState = #inactive
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
  t_bSuccess = m_rWindow.merge("vmk_quest_minigame.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.minigame"))
  end if
  me.createComponentWindow(m_rWindow, m_ar_components, ["quest.gamelist": []])
  me.AddContentFromXML(m_rWindow, m_ar_components, "quest.content.selectminigame.xml")
  me.setAmount(0)
  t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
  t_rComponents = m_ar_components["quest.gamelist"]
  t_rComponents.EventProc(point(1, 1), t_ar_event)
  if t_ar_event.found then
    t_rClientElement = m_rWindow.getElement("quest.gamelist")
    t_rImg = t_rComponents.render()
    t_rClientElement.feedImage(t_rImg)
  end if
  me.updateDefaults()
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
on updateDefaults me
  t_rComponents = m_ar_components["quest.gamelist"]
  t_ID = integer(t_rComponents.GetActive().getEvent())
  if t_ID > 0 then
    m_ar_defaults[#min] = integer(getText("quest.minigame." & t_ID & ".min", 0))
    m_ar_defaults[#max] = integer(getText("quest.minigame." & t_ID & ".max", 100000))
    m_ar_defaults[#accuracy] = integer(getText("quest.minigame." & t_ID & ".accuracy", 5))
    m_ar_defaults[#default] = integer(getText("quest.minigame." & t_ID & ".default", 0))
  end if
  me.setAmount(m_ar_defaults[#default])
end
on rawData me, t_ar_data
  put "Update task: Minigame" && t_ar_data
  t_rComponents = m_ar_components["quest.gamelist"]
  t_rComponents.setActive(t_ar_data[#GameID])
  t_rClientElement = m_rWindow.getElement("quest.gamelist")
  t_rImg = t_rComponents.render()
  t_rClientElement.feedImage(t_rImg)
  me.updateDefaults()
  me.setAmount(t_ar_data[#score])
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
      "quest.scorelimit.up":
        m_iScoreState = #toprize
        createTimeout("updateScore", 50, #updateAmount, me.getID(), VOID, VOID)
      "quest.scorelimit.down":
        m_iScoreState = #fromprize
        createTimeout("updateScore", 50, #updateAmount, me.getID(), VOID, VOID)

    end case
  else
    if a_kEvent = #mouseUp then
      m_iScoreState = #inactive
      if timeoutExists("updateScore") then
        removeTimeout("updateScore")
      end if
      case a_sElemID of
        "quest.gamelist":
          t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
          executeMessage("PlayInterfaceSound", "UI-click")
          t_rComponent = m_ar_components[a_sElemID]
          t_rComponent.EventProc(a_vParam, t_ar_event)
          if t_ar_event.found then
            t_rClientElement = m_rWindow.getElement(a_sElemID)
            t_rImg = t_rComponent.render()
            t_rClientElement.feedImage(t_rImg)
            me.updateDefaults()
          end if
        "mes.accept.button":
          t_rComponent = m_ar_components["quest.gamelist"]
          t_rActiveTask = t_rComponent.GetActive()
          t_bDataOK = 0
          t_ar_results = [:]
          if m_iCurrentScore > 0 then
            if objectp(t_rActiveTask) then
              t_iID = integer(t_rActiveTask.getEvent())
              if t_iID > 0 then
                t_ar_results[#GameID] = t_iID
                t_ar_results[#score] = m_iCurrentScore
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
            t_txt = getText("quest.alert.select.minigame")
            t_title = getText("quest.alert.title")
            t_btn1 = getText("quest.alert.ok")
            t = createDialogWindow(me.getID(), "quest.alert.minigame", 1, 1)
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
          put "Subtask.Minigame.event:" && a_sElemID

      end case
    end if
  end if
end
on setCredits me, t_iCredits
  t_rElement = m_rWindow.getElement("quest.score.amount")
  if t_rElement <> 0 then
    t_rElement.setText(t_iCredits)
  end if
end
on setAmount me, t_iCredits
  t_rElement = m_rWindow.getElement("quest.score.amount")
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