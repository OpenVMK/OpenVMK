-- Behavior
property m_wWindowTitle
property m_sDialogTitle
property m_currentView
property m_iClientID
property m_bModal
property m_iType
property m_pTexts
property m_bSpecialEvents

on construct me
  m_currentView = "vmk_basic_2.window"
  m_sDialogTitle = "DialogWindow"
  m_wWindowTitle = m_sDialogTitle & "_window"
  m_iType = 2
  m_bModal = 0
  m_bSpecialEvents = 0
  m_iClientID = 0
  m_pTexts = [:]
  return 1
end
on deconstruct me
end
on Init me, t_iClientID, t_sDialogTitle, t_iType, t_bModal
  m_iClientID = t_iClientID
  m_sDialogTitle = t_sDialogTitle
  m_wWindowTitle = m_sDialogTitle & "_window"
  if not voidp(t_iType) then
    m_iType = max(min(3, t_iType), 1)
  end if
  if not voidp(t_bModal) then
    m_bModal = t_bModal
  end if
  case m_iType of
    1:
      m_currentView = "vmk_basic_1.window"
    2:
      m_currentView = "vmk_basic_2.window"
    3:
      m_currentView = "vmk_basic_3.window"
    4:
      m_currentView = "vmk_basic_4.window"
    otherwise:
      put "Dialog Window: unknow type" && m_iType

  end case
end
on show me
  me.changeView(m_currentView)
end
on hide me
  if getWindow(m_wWindowTitle) <> 0 then
    removeWindow(m_wWindowTitle)
  end if
end
on UpdateView me
  me.changeView(m_currentView)
end
on MoveDialogWindowPos me, a_iX, a_iY
  tWndObj = getWindow(m_wWindowTitle)
  if objectp(tWndObj) then
    tWndObj.moveTo(a_iX, a_iY)
  end if
end
on changeView me, tView
  tWndObj = getWindow(m_wWindowTitle)
  tLastView = m_currentView
  if tWndObj = 0 then
    if m_bModal then
      t_window = createWindow(m_wWindowTitle, "vmk_modal.window", 0, 0, #modal)
    else
      t_window = createWindow(m_wWindowTitle, "vmk_modal.window")
    end if
    if not t_window then
      return error(me, "Failed to open Dialog Window" && m_sDialogTitle & "!!!", #changeView)
    else
      tWndObj = getWindow(m_wWindowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcMessenger, me.getID(), #mouseUp)
      tWndObj.merge(m_currentView)
      tWndObj.center()
    end if
  end if
  if tLastView <> tView then
    tWndObj.unmerge()
    tWndObj.merge(tView)
    m_currentView = tView
  end if
  case m_currentView of
    "vmk_basic_1.window", "vmk_basic_2.window", "vmk_basic_3.window":
      me.updateInterface()
    otherwise:
      put "[DialogWindow] #changeView, unknown view" && m_currentView

  end case
end
on eventProcMessenger me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_wWindowTitle)
  if tEvent = #mouseUp then
    passEvent = 1
    tObject = getObjectManager().get(m_iClientID)
    if tObject = 0 then
      passEvent = 0
    else
      if tObject.handlers().getOne(#dialogWindowEvent) = 0 then
        put "[DialogWindow Notice] " & tObject & " Missing #dialogWindowEvent-handler"
        passEvent = 0
      end if
    end if
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        if passEvent then
          call(#dialogWindowEvent, tObject, m_sDialogTitle, "close")
        end if
        removeDialogWindow(m_sDialogTitle)
      "basic.dialog.button1", "basic.dialog1.button1":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          if m_bSpecialEvents then
            call(#dialogWindowEvent, tObject, m_sDialogTitle, m_pTexts[#btn1].getaProp(#eventID), m_pTexts[#btn1].getaProp(#data))
          else
            call(#dialogWindowEvent, tObject, m_sDialogTitle, #dialogCancel)
          end if
        end if
        removeDialogWindow(m_sDialogTitle)
      "basic.dialog.button2":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          if m_bSpecialEvents then
            call(#dialogWindowEvent, tObject, m_sDialogTitle, m_pTexts[#btn2].getaProp(#eventID), m_pTexts[#btn2].getaProp(#data))
          else
            call(#dialogWindowEvent, tObject, m_sDialogTitle, #dialogOK)
          end if
        end if
        removeDialogWindow(m_sDialogTitle)
      "basic.dialog.button3":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          if m_bSpecialEvents then
            call(#dialogWindowEvent, tObject, m_sDialogTitle, m_pTexts[#btn3].getaProp(#eventID), m_pTexts[#btn3].getaProp(#data))
          else
            call(#dialogWindowEvent, tObject, m_sDialogTitle, #dialogAlternative)
          end if
        end if
        removeDialogWindow(m_sDialogTitle)
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        executeMessage(#open_help_page, "help.dialog.windows")
        if passEvent then
          call(#dialogWindowEvent, tObject, m_sDialogTitle, "help")
        end if

    end case
  end if
end
on updateInterface me
  tWndObj = getWindow(m_wWindowTitle)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement("basic.content.text")
    if t_Elem <> 0 then
      t_Elem.setText(m_pTexts.getaProp(#desc))
    end if
    t_Elem = tWndObj.getElement("basic.window.title")
    if t_Elem <> 0 then
      t_Elem.setText(m_pTexts.getaProp(#title))
    end if
    case m_iType of
      1:
        btn1 = "basic.dialog1.button1"
      2:
        btn1 = "basic.dialog.button1"
        btn2 = "basic.dialog.button2"
      3:
        btn1 = "basic.dialog.button1"
        btn2 = "basic.dialog.button2"
        btn3 = "basic.dialog.button3"
      otherwise:
        btn1 = "basic.dialog.button1"
        btn2 = "basic.dialog.button2"
        btn3 = "basic.dialog.button3"

    end case
    me.setButtonText(btn1, m_pTexts.getaProp(#btn1))
    me.setButtonText(btn2, m_pTexts.getaProp(#btn2))
    me.setButtonText(btn3, m_pTexts.getaProp(#btn3))
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
    m_pTexts[#btn1] = param(4)
  end if
  if the paramCount > 4 then
    m_pTexts[#btn2] = param(5)
  end if
  if the paramCount > 5 then
    m_pTexts[#btn3] = param(6)
  end if
  me.updateInterface()
end
on setButtonText me, t_btnname, t_txt
  if listp(t_txt) then
    m_bSpecialEvents = 1
    t_txt = t_txt.text
  end if
  if not voidp(t_btnname) and not voidp(t_txt) then
    tWndObj = getWindow(m_wWindowTitle)
    if tWndObj <> 0 then
      tBtn = tWndObj.getElement(t_btnname)
      if tBtn <> 0 then
        tBtn.pButtonText = t_txt
        tBtn.pCachedImgs = [:]
        tBtn.changeState(#up)
      end if
    end if
  end if
end
on SetName me, tName
  m_sDialogTitle = tName
end
on setComponent me, t_component
  m_pComponent = t_component
end