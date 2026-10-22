-- Script
property m_rWindow
property m_sWindowName
property m_rCurrentView
property m_bVisible
property m_rAddressbookList
property m_rPulser
property m_iMessengerState
property m_sCurrentView

on construct me
  m_bVisible = 0
  m_sWindowName = "Messenger.Window"
  m_rPulser = VOID
  m_iMessengerState = #normal
  m_sCurrentView = "friendlist"
  registerMessage(#MinigameState, me.getID(), #MinigameMessage)
  registerMessage(#room_ready, me.getID(), #checkMessengerState)
  registerMessage(#room_leave, me.getID(), #hideMessenger)
  registerMessage(#ui_messenger, me.getID(), #showHide)
  return 1
end
on deconstruct me
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
  end if
  if objectp(m_rCurrentView) then
    removeObject(m_rCurrentView.getID())
  end if
  if objectp(m_rAddressbookList) then
    removeObject(m_rAddressbookList.getID())
  end if
  if objectp(m_rPulser) then
    removeObject(m_rPulser.getID())
  end if
  m_rWindow = VOID
  m_rCurrentView = VOID
  m_rAddressbookList = VOID
  unregisterMessage(#MinigameState, me.getID())
  unregisterMessage(#room_ready, me.getID())
  unregisterMessage(#room_leave, me.getID())
  return 1
end
on MinigameMessage me, i_iGameState
  case i_iGameState of
    #idle:
      case m_iMessengerState of
        #hidden:
          m_iMessengerState = #normal
        #waiting:
          m_iMessengerState = #released

      end case
    #running:
      if m_bVisible then
        me.hide()
      end if
      m_iMessengerState = #hidden
    otherwise:
      put "Messenger received unknown Minigame state"

  end case
end
on checkMessengerState me
  case m_iMessengerState of
    #released:
      m_iMessengerState = #normal
      if not m_bVisible then
        me.show()
        me.changeView("messagesnew")
      end if

  end case
end
on GetState me
  return m_iMessengerState
end
on setState me, a_iState
  m_iMessengerState = a_iState
end
on hideMessenger me
  if m_bVisible then
    me.hide()
  end if
end
on IsVisible me
  return m_bVisible
end
on showHide me
  m_bVisible = not m_bVisible
  if m_bVisible then
    me.show()
  else
    me.hide()
  end if
end
on show me
  m_bVisible = 1
  if not objectp(m_rWindow) then
    me.Init()
  end if
  m_rWindow.show()
  if objectp(m_rCurrentView) then
    t_sView = m_rCurrentView.getID()
    if t_sView <> m_sCurrentView then
      me.changeView(m_sCurrentView)
    else
      case t_sView of
        "friendlist", "friendinfo", "friendrequest":
          me.getComponent().startPolling()
        otherwise:
          me.getComponent().stopPolling()

      end case
    end if
  else
    me.changeView(m_sCurrentView)
  end if
  m_rCurrentView.updateContent()
  me.setIconPulse(0)
end
on hide me
  m_bVisible = 0
  if m_sCurrentView = "friendinfo" then
    m_rAddressbookList.inActivate()
    me.changeView("friendlist")
  end if
  if objectp(m_rWindow) then
    m_rWindow.hide()
  end if
  me.getComponent().stopPolling()
  me.setIconPulse(0)
end
on changeView me, a_sView
  if not objectp(m_rWindow) then
    put "ERROR, initializing messenger, init in wrong order"
    exit
  end if
  if not m_bVisible then
    if objectp(m_rCurrentView) then
      removeObject(m_rCurrentView.getID())
      m_rCurrentView = VOID
    end if
    put "Change to new view when messenger is opened!" && m_sCurrentView
    m_sCurrentView = a_sView
  else
    if objectp(m_rCurrentView) then
      removeObject(m_rCurrentView.getID())
      m_rCurrentView = VOID
    end if
    t_sCls = "vmk.messenger." & a_sView
    m_rCurrentView = createObject(a_sView, GetClsVariable(t_sCls))
    m_rCurrentView.merge(m_rWindow)
    me.toggleTabs(a_sView)
    m_sCurrentView = a_sView
  end if
end
on toggleTabs me, a_sView
  if objectp(m_rCurrentView) then
    t_messages = m_rWindow.getElement("mes.tab.messages.active")
    t_friends = m_rWindow.getElement("mes.tab.friends.active")
    case a_sView of
      "friendlist", "friendinfo", "friendrequest":
        t_messages.hide()
        t_friends.show()
        me.getComponent().startPolling()
      "messagesnone", "messagesnew", "messagescompose":
        t_messages.show()
        t_friends.hide()
        me.getComponent().stopPolling()

    end case
  end if
end
on Init me
  me.CreateMessengerWindow()
  if not objectp(m_rAddressbookList) then
    me.CreateAddressbookList()
  end if
end
on reset me
end
on CreateMessengerWindow me
  t_bWindowOk = createWindow(m_sWindowName)
  if t_bWindowOk then
    m_rWindow = getWindow(m_sWindowName)
    m_rWindow.merge("vmk_mes.window")
    m_rWindow.registerClient(me.getID())
    m_rWindow.registerProcedure(#_EventProc, me.getID(), #mouseUp)
    m_rWindow.registerProcedure(#_EventProc, me.getID(), #keyDown)
    m_rWindow.registerProcedure(#_EventProc, me.getID(), #keyUp)
    m_rWindow.center()
    m_rWindow.show()
  end if
end
on CreateAddressbookList me
  m_rAddressbookList = createObject(getUniqueID(), "CUIComponentPage")
  m_rAddressbookList.setColor(rgb("#001f55"))
  m_rAddressbookList.setSize(267, 200)
  repeat with t_ar_entry in me.getComponent().GetAddressBook()
    me.addAddressbookEntry(t_ar_entry)
  end repeat
  m_rAddressbookList.setSortingOrder(#key)
end
on GetAddressBook me
  if not objectp(m_rAddressbookList) then
    me.CreateAddressbookList()
  end if
  return m_rAddressbookList
end
on removeAddressbookEntry me, a_ar_entry
  if not objectp(m_rAddressbookList) then
    me.CreateAddressbookList()
  end if
  repeat with t_rEntry in m_rAddressbookList.GetComponents()
    if t_rEntry.GetLayout(1).GetNode() = a_ar_entry then
      m_rAddressbookList.deleteComponent(t_rEntry)
      return 1
    end if
  end repeat
  return 0
end
on addAddressbookEntry me, a_ar_entry
  if not objectp(m_rAddressbookList) then
    me.CreateAddressbookList()
  end if
  t_rComponent = m_rAddressbookList.addComponent("component.addressbook.xml")
  t_rComponent.GetLayout(1).setNode(a_ar_entry)
  me.updateAddressbookEntry(a_ar_entry)
end
on updateAddressbookEntry me, a_ar_entry
  if not objectp(m_rAddressbookList) then
    me.CreateAddressbookList()
  end if
  repeat with t_rEntry in m_rAddressbookList.GetComponents()
    if t_rEntry.GetLayout(1).GetNode() = a_ar_entry then
      if a_ar_entry.online then
        t_rEntry.GetLayout(1).setColor(rgb("#00D524"))
        t_rEntry.GetLayout(1).setText(a_ar_entry.buddyname && "(" & a_ar_entry.usersRoom & ")")
      else
        t_rEntry.GetLayout(1).setColor(rgb("#275692"))
        t_rEntry.GetLayout(1).setText(a_ar_entry.buddyname)
      end if
      t_rEntry.GetLayout(1).setSortKey(2 - a_ar_entry.online & a_ar_entry.buddyname)
      m_rAddressbookList.requireSorting()
      return 1
    end if
  end repeat
  return 0
end
on updateCurrentView me
  if objectp(m_rCurrentView) then
    m_rCurrentView.updateContent()
  end if
end
on setIconPulse me, a_bState
  if voidp(m_rPulser) then
    m_rPulser = createObject("Messenger Icon Pulser", "CMessengerIconPulser")
  end if
  if a_bState then
    if not m_bVisible then
      m_rPulser.Activate()
    end if
  else
    m_rPulser.deactivate()
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_rParam
  case a_sElemID of
    "close":
      executeMessage("PlayInterfaceSound", "close-popup")
      me.showHide()
    "help":
      executeMessage("PlayInterfaceSound", "UI-click")
      executeMessage(#open_help_page, "help.messaging.guide")
    "mes.tab.friends.passive":
      executeMessage("PlayInterfaceSound", "popup-tab-change")
      me.changeView("friendlist")
    "mes.tab.messages.passive":
      executeMessage("PlayInterfaceSound", "popup-tab-change")
      me.changeView("messagesnew")

  end case
  return m_rCurrentView._EventProc(a_kEvent, a_sElemID, a_rParam)
end