-- Script
property m_sWindowTitle
property m_sTutorialTitle
property m_currentView
property m_iClientID
property m_bModal
property m_iType
property m_pTexts
property m_bShowMore
property m_sHelpLink
property m_iNavCode
property m_bTutorialCheckBox

on construct me
  m_currentView = "vmk_tutorial.window"
  m_sTutorialTitle = "TutorialWindow"
  m_sWindowTitle = m_sTutorialTitle & "_window"
  m_iType = 2
  m_bModal = 0
  m_bShowMore = 0
  m_sHelpLink = EMPTY
  m_iClientID = 0
  m_pTexts = [:]
  m_bTutorialCheckBox = not getObject(#session).get("tutorial")
  return 1
end
on deconstruct me
end
on Init me, t_iClientID, t_sDialogTitle, t_iType, t_bModal
  m_iClientID = t_iClientID
  m_sTutorialTitle = t_sDialogTitle
  m_sWindowTitle = m_sTutorialTitle & "_window"
  if not voidp(t_iType) then
    m_iType = max(min(3, t_iType), 1)
  end if
  if not voidp(t_bModal) then
    m_bModal = t_bModal
  end if
  case m_iType of
    1:
    2:
    3:
    4:
    otherwise:
      put "Tutorial Window: unknow type" && m_iType

  end case
end
on show me
  me.changeView(m_currentView)
end
on hide me
  if getWindow(m_sWindowTitle) <> 0 then
    removeWindow(m_sWindowTitle)
  end if
end
on UpdateView me
  me.changeView(m_currentView)
end
on changeView me, tView
  tWndObj = getWindow(m_sWindowTitle)
  tLastView = m_currentView
  if tWndObj = 0 then
    if m_bModal then
      t_window = createWindow(m_sWindowTitle, "vmk_tutorial.window", 0, 0, #modal)
    else
      t_window = createWindow(m_sWindowTitle, "vmk_tutorial.window")
    end if
    if not t_window then
      return error(me, "Failed to open Tutorial Window" && m_sTutorialTitle & "!!!", #changeView)
    else
      tWndObj = getWindow(m_sWindowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcMessenger, me.getID(), #mouseUp)
      tWndObj.registerProcedure(#eventProcMessenger, me.getID(), #mouseEnter)
      tWndObj.registerProcedure(#eventProcMessenger, me.getID(), #mouseLeave)
      tWndObj.center()
    end if
  end if
  if tLastView <> tView then
    tWndObj.unmerge()
    tWndObj.merge(tView)
    m_currentView = tView
  end if
  tWndObj.getElement("selector.jc").hide()
  tWndObj.getElement("selector.fw").hide()
  tWndObj.getElement("selector.potc").hide()
  tWndObj.getElement("selector.hm").hide()
  case m_currentView of
    "vmk_tutorial.window":
      me.updateInterface()
    otherwise:
      put "[TutorialWindow] #changeView, unknown view" && m_currentView

  end case
end
on eventProcMessenger me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWindowTitle)
  if tEvent = #mouseUp then
    passEvent = 1
    tObject = getObjectManager().get(m_iClientID)
    if tObject = 0 then
      passEvent = 0
    else
      if tObject.handlers().getOne(#tutorialWindowEvent) = 0 then
        passEvent = 0
      end if
    end if
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        if passEvent then
          call(#dialogWindowEvent, tObject, m_sTutorialTitle, "close")
        end if
        removeTutorialWindow(m_sTutorialTitle)
      "tutorial.more":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          call(#tutorialWindowEvent, tObject, m_sTutorialTitle, #tutorialMore, m_sHelpLink)
        end if
        removeTutorialWindow(m_sTutorialTitle)
      "tutorial.ok":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          call(#tutorialWindowEvent, tObject, m_sTutorialTitle, #tutorialOK, not m_bTutorialCheckBox)
        end if
        removeTutorialWindow(m_sTutorialTitle)
      "tutorial.off":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_bTutorialCheckBox = not m_bTutorialCheckBox
        if passEvent then
        end if
        me.setCheckBoxState()
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        if passEvent then
          call(#dialogWindowEvent, tObject, m_sTutorialTitle, "help")
        end if
        executeMessage(#ui_help)
      "selector.jc":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          call(#tutorialWindowEvent, tObject, m_sTutorialTitle, #link1)
        end if
        removeTutorialWindow(m_sTutorialTitle)
      "selector.fw":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          call(#tutorialWindowEvent, tObject, m_sTutorialTitle, #link2)
        end if
        removeTutorialWindow(m_sTutorialTitle)
      "selector.potc":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          call(#tutorialWindowEvent, tObject, m_sTutorialTitle, #link3)
        end if
        removeTutorialWindow(m_sTutorialTitle)
      "selector.hm":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          call(#tutorialWindowEvent, tObject, m_sTutorialTitle, #link4)
        end if
        removeTutorialWindow(m_sTutorialTitle)

    end case
  end if
  if tEvent = #mouseEnter and tElemID contains "shortcut." then
    tElemID = "selector" & chars(tElemID, ("shortcut.").length, tElemID.length)
    tHighLighter = tWndObj.getElement(tElemID)
    if objectp(tHighLighter) then
      tHighLighter.show()
    end if
  end if
  if tEvent = #mouseLeave and tElemID contains "selector." then
    tHighLighter = tWndObj.getElement(tElemID)
    if objectp(tHighLighter) then
      tHighLighter.hide()
    end if
  end if
end
on setCheckBoxState me
  tWndObj = getWindow(m_sWindowTitle)
  t_mem = getmemnum("button.checkbox." & m_bTutorialCheckBox)
  t_Elem = tWndObj.getElement("tutorial.off")
  if t_Elem <> 0 then
    if t_mem <> 0 then
      t_Img = member(t_mem).image.duplicate()
      t_Elem.feedImage(t_Img)
    end if
  end if
end
on setButtonState me, t_elemName, t_state
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement(t_elemName)
    if t_Elem <> 0 then
      case t_state of
        1:
          t_Elem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_Elem.Activate()
        0:
          t_Elem.setProperty(#cursor, #arrow)
          t_Elem.deactivate()

      end case
    end if
  end if
end
on updateInterface me
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement("tutorial.content.text")
    if t_Elem <> 0 then
      t_Elem.setText(m_pTexts.getaProp(#desc))
    end if
    t_Elem = tWndObj.getElement("tutorial.window.title")
    if t_Elem <> 0 then
      t_Elem.setText(m_pTexts.getaProp(#title))
    end if
    if m_bShowMore then
      me.setButtonState("tutorial.more", 1)
    else
      me.setButtonState("tutorial.more", 0)
    end if
    me.setCheckBoxState()
  end if
end
on setText me
  m_pTexts = [:]
  if the paramCount > 1 then
    m_pTexts[#desc] = param(2)
  end if
  if the paramCount > 2 then
    m_pTexts[#title] = param(3)
  end if
  if the paramCount > 3 then
    m_bShowMore = param(4)
  end if
  if the paramCount > 4 then
    m_sHelpLink = param(5)
  end if
  me.updateInterface()
end
on SetName me, tName
  m_sTutorialTitle = tName
end