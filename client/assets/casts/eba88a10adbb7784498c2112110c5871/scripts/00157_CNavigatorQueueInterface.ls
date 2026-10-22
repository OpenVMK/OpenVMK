-- Script
property m_sWindow
property m_fPercent
property m_iPeopleInQueue
property m_sPingTimeout

on construct me
  m_sWindow = me.getID() & ".window"
  m_fPercent = 0
  m_iPeopleInQueue = 0
  m_sPingTimeout = "QueuePing"
  return 1
end
on deconstruct me
  if windowExists(m_sWindow) then
    removeWindow(m_sWindow)
  end if
  me.hideLoadBar()
  m_iPeopleInQueue = 0
  return 1
end
on getLoadPercent me
  return m_fPercent
end
on ShowLoadBar me, a_sRoom, a_iRoomCode
  me.hideLoadBar()
  ShowCustomLoadingScreen(a_iRoomCode)
  if createWindow(m_sWindow, "vmk_roomqueue_guest.window", 0, 0) then
    t_rWnd = getWindow(m_sWindow)
    t_rWnd.center()
    t_rWnd.registerClient(me.getID())
    t_rWnd.registerProcedure(#_Events, me.getID(), #mouseUp)
    executeMessage("SetButtonStates", [#all: 0])
    if t_rWnd.elementExists("roomqueue.destination") then
      createObject("room_status_bar", "Loading Bar Class")
      t_rProps = [:]
      t_rProps.setaProp(#buffer, t_rWnd.getElement("bar").getProperty(#buffer).image)
      t_rProps.setaProp(#width, 200)
      t_rProps.setaProp(#height, 20)
      t_rProps.setaProp(#type, #other)
      getObject("room_status_bar").Define(me.getID(), t_rProps)
    end if
    executeMessage(#ui_Fastpass)
  end if
end
on hideLoadBar me
  getWindowManager().unlock()
  if not voidp(GetCustomLoadingScreenObject()) then
    RemoveCustomLoadingScreen()
  end if
  if objectExists("room_status_bar") then
    removeObject("room_status_bar")
  end if
  if windowExists(m_sWindow) then
    removeWindow(m_sWindow)
    executeMessage("SetButtonStates", [#all: 1])
  end if
  me.StopPinging()
end
on ShowQueue me, a_sRoom, a_iPos
  if a_iPos < 0 then
    me.hideLoadBar()
    m_iPeopleInQueue = 0
    return 1
  end if
  if m_iPeopleInQueue = 0 then
    m_fPercent = 0
    m_iPeopleInQueue = a_iPos + 1
  end if
  m_fPercent = (m_iPeopleInQueue - (a_iPos + 1)) * 1.0 / m_iPeopleInQueue
  t_iQueueLength = getVariable("queue.legnth", 5)
  t_bFastPass = objectExists("FastPassWindow")
  if voidp(GetCustomLoadingScreenObject()) then
    me.ShowLoadBar(a_sRoom, 0)
  end if
  if windowExists(m_sWindow) then
    t_rWnd = getWindow(m_sWindow)
    if m_iPeopleInQueue > t_iQueueLength and not t_bFastPass then
      t_rWnd.getElement("nav.fastpass.button").setProperty(#visible, 1)
    else
      t_rWnd.getElement("nav.fastpass.button").setProperty(#visible, 0)
    end if
    t_rWnd.getElement("roomqueue.destination").setText(a_sRoom)
    t_rWnd.getElement("fastpass.queue").setText(a_iPos + 1)
  end if
  me.StartPinging()
  getWindowManager().lock()
end
on FastPassRemoved me
  t_iQueueLength = getVariable("queue.legnth", 5)
  t_bFastPass = objectExists("FastPassWindow")
  if windowExists(m_sWindow) then
    t_rWnd = getWindow(m_sWindow)
    if m_iPeopleInQueue > t_iQueueLength and not t_bFastPass then
      t_rWnd.getElement("nav.fastpass.button").setProperty(#visible, 1)
    else
      t_rWnd.getElement("nav.fastpass.button").setProperty(#visible, 0)
    end if
  end if
end
on StartPinging me
  if not timeoutExists(m_sPingTimeout) then
    createTimeout(m_sPingTimeout, 300000, #_PingCallback, me.getID(), VOID, 0)
  end if
end
on StopPinging me
  if timeoutExists(m_sPingTimeout) then
    removeTimeout(m_sPingTimeout)
  end if
end
on _Events me, a_kEvt, a_sElm, a_vPrm, a_sWnd
  executeMessage(#ui_Fastpass)
  case a_sElm of
    "roomqueue.cancel":
      m_iPeopleInQueue = 0
      me.hideLoadBar()
      executeMessage("room_remove")
      t_sCon = getVariable("main.connection.id", "VMK")
      if connectionExists(t_sCon) then
        getConnection(t_sCon).send("CancelRoomQueue")
      end if
      me.StopPinging()
    "nav.fastpass.button":
      t_rDialog = createDialogWindow(me.getID(), "ConfirmFastPass", 2, 1)
      t_rDialog.show()
      t_rDialog.setText(getText("fastpass.confirm.text"), getText("fastpass.get.hd"), getText("nav.sellroom.no"), getText("nav.sellroom.yes"))

  end case
end
on _PingCallback me
  t_sCon = getVariable("main.connection.id", "VMK")
  if connectionExists(t_sCon) then
    getConnection(t_sCon).send("Ping")
  end if
end
on dialogWindowEvent me, a_sDialog, a_kEvent
  case a_sDialog of
    "ConfirmFastPass":
      if a_kEvent = #dialogOK then
        me.hideLoadBar()
        t_sCon = getVariable("main.connection.id", "VMK")
        if connectionExists(t_sCon) then
          getConnection(t_sCon).send("GetFastPass")
        end if
      end if

  end case
end