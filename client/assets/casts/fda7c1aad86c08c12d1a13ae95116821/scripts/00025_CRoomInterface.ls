-- Script
property m_rContext
property m_sWindow

on construct this
  m_rContext = VOID
  m_sWindow = this.getID() && "Window"
  registerMessage("room_ready", this.getID(), #_Open)
  registerMessage("room_leave", this.getID(), #_Close)
  registerMessage("room_tile_selection", this.getID(), #_TileSelection)
  return 1
end
on deconstruct this
  unregisterMessage("room_ready", this.getID())
  unregisterMessage("room_leave", this.getID())
  unregisterMessage("room_tile_selection", this.getID())
  m_rContext = VOID
  if windowExists(m_sWindow) then
    removeWindow(m_sWindow)
  end if
  this.hideLoadBar()
  return 1
end
on ShowLoadBar this, a_sRoom, a_iRoomCode
  getThread("navigator").getInterface().HideNavigator()
  executeMessage(#ui_StopWelcomeSound)
  this.hideLoadBar()
  executeMessage(#ui_Fastpass)
  if getObject(#session).exists("minigame") then
    t_sCurrentGame = getObject(#session).get("minigame")
  else
    t_sCurrentGame = EMPTY
  end if
  if t_sCurrentGame = "vmks" then
    a_sRoom = getText("vmks.room.name.generic", "VMKS Room")
  end if
  ShowCustomLoadingScreen(a_iRoomCode)
  if createWindow("room_load_wnd", "vmk_roomqueue.window", 0, 0) then
    executeMessage("SetButtonStates", [#all: 0])
    t_rWnd = getWindow("room_load_wnd")
    t_rWnd.center()
    t_rWnd.registerClient(this.getID())
    t_rWnd.registerProcedure(#_Events, this.getID(), #mouseUp)
    executeMessage(#ui_Fastpass)
    if t_rWnd.elementExists("roomqueue.destination") then
      t_rWnd.getElement("roomqueue.cancel").hide()
      t_rWnd.getElement("roomqueue.destination").setText(a_sRoom)
      createObject("room_status_bar", "Loading Bar Class")
      t_rProps = [:]
      t_rProps.setaProp(#buffer, t_rWnd.getElement("bar").getProperty(#buffer).image)
      t_rProps.setaProp(#width, 200)
      t_rProps.setaProp(#height, 20)
      t_rProps.setaProp(#type, #other)
      getObject("room_status_bar").Define(this.getComponent().getID(), t_rProps)
      getWindowManager().lock()
    end if
    executeMessage(#ui_Fastpass)
  end if
end
on hideLoadBar this
  getWindowManager().unlock()
  if objectExists("room_status_bar") then
    removeObject("room_status_bar")
  end if
  if windowExists("room_load_wnd") then
    removeWindow("room_load_wnd")
  end if
  if not voidp(GetCustomLoadingScreenObject()) then
    RemoveCustomLoadingScreen()
  end if
  executeMessage("SetButtonStates", [#all: 1])
end
on _Open this, a_rContext
  m_rContext = a_rContext
  if not createObject("room_chat_out", "CRoomChatOutputMgr") then
    error(this, "Failed to construct chat output!", #construct)
  end if
  if not windowExists(m_sWindow) then
    if createWindow(m_sWindow) then
      t_rWnd = getWindow(m_sWindow)
      t_rWnd.registerClient(this.getID())
      t_rWnd.registerProcedure(#_Events, this.getID(), #mouseUp)
      t_rWnd.registerProcedure(#_Events, this.getID(), #keyUp)
    end if
  end if
end
on _Close this
  if objectExists("room_chat_out") then
    removeObject("room_chat_out")
  end if
  if objectExists("room_hiliter") then
    removeObject("room_hiliter")
  end if
  if windowExists(m_sWindow) then
    removeWindow(m_sWindow)
  end if
  this.hideLoadBar()
  m_rContext = VOID
end
on _Events this, a_kEvt, a_sElm, a_vPrm, a_sWnd
  executeMessage(#ui_Fastpass)
  case a_sElm of
    "roomqueue.cancel":
      this.hideLoadBar()
      this.component._RemoveRoom()
      t_sConnection = getVariable("main.connection.id", "VMK")
      if connectionExists(t_sConnection) then
        getConnection(t_sConnection).send("CancelRoomQueue")
      end if

  end case
end
on _TileSelection this, a_rTile
  t_sConnection = getVariable("main.connection.id", "VMK")
  if connectionExists(t_sConnection) then
    getConnection(t_sConnection).send("move", [#integer: integer(a_rTile.GetParam("REF"))])
  end if
end