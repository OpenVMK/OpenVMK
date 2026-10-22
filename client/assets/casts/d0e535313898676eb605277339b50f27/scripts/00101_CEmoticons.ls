-- Script
property m_sWindowID
property m_rGrid
property m_bDanceState
property m_ar_EmotList
property m_bDanceBtnState

on construct this
  this.regMsgList(1)
  m_sWindowID = "EmoticonsWnd"
  m_ar_EmotList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  m_bDanceState = 0
  m_bDanceBtnState = 1
  m_rGrid = createObject(getUniqueID(), "CEmoticonGrid")
  registerMessage("ui_Emoticons", this.getID(), #showHideEmoticons)
  registerMessage("close_Emoticons", this.getID(), #_Close)
  registerMessage("room_tile_selection", this.getID(), #_Close)
  registerMessage("room_leave", this.getID(), #_ChangeDanceState)
  registerMessage("DisableDanceButton", this.getID(), #SetDanceButtonState)
  this.regMsgList(1)
  return 1
end
on deconstruct this
  removeObject(m_rGrid)
  unregisterMessage("ui_Emoticons", this.getID())
  unregisterMessage("close_Emoticons", this.getID())
  unregisterMessage("room_tile_selection", this.getID())
  unregisterMessage("room_leave", this.getID())
  this.regMsgList(0)
  return 1
end
on _Close this
  if windowExists(m_sWindowID) then
    removeWindow(m_sWindowID)
  end if
end
on _ChangeDanceState this
  m_bDanceState = 0
  this._Close()
end
on SetDanceButtonState this, a_bState
  if not m_bDanceBtnState and a_bState then
    m_bDanceState = 0
  end if
  m_bDanceBtnState = a_bState
end
on DisableDanceButton this
  if windowExists(m_sWindowID) then
    t_rWnd = getWindow(m_sWindowID)
    if t_rWnd.elementExists("emoticons.dance.button") then
      t_rWnd.getElement("emoticons.dance.button").deactivate()
    end if
  end if
end
on EnableDanceButton this
  if windowExists(m_sWindowID) then
    t_rWnd = getWindow(m_sWindowID)
    if t_rWnd.elementExists("emoticons.dance.button") then
      t_rWnd.getElement("emoticons.dance.button").Activate()
    end if
  end if
end
on showHideEmoticons this
  if windowExists(m_sWindowID) then
    tWndObj = getWindow(m_sWindowID)
    if tWndObj.getProperty(#visible) then
      this._Close()
    end if
  else
    executeMessage("close_Magic")
    executeMessage(#hide_roominfo)
    executeMessage(#hide_camera)
    createWindow(m_sWindowID, "vmk_popup.window")
    t_rWnd = getWindow(m_sWindowID)
    t_rWnd.merge("vmk_popup_emoticons.window")
    t_rWnd.moveTo(175, 474)
    t_rWnd.registerClient(this.getID())
    t_rWnd.registerProcedure(#eventProcEmoticons, this.getID(), #mouseUp)
    t_rWnd.registerProcedure(#eventProcEmoticons, this.getID(), #mouseDown)
    m_rGrid.render(m_ar_EmotList, t_rWnd.getElement("emoticons.grid"))
    if t_rWnd.elementExists("popup.hd") then
      t_sTxt = getText("emoticon.wnd.name")
      t_rWnd.getElement("popup.hd").setText(t_sTxt)
    end if
    if m_bDanceBtnState then
      this.EnableDanceButton()
    else
      this.DisableDanceButton()
    end if
  end if
end
on ShowEmotInfo this, a_vParam, a_bDoubleClick
  t_rWnd = getWindow(m_sWindowID)
  if not voidp(a_vParam) then
    m_rGrid.MouseSelection(a_vParam)
    t_iItemId = m_rGrid.GetSelected()
  else
    t_iItemId = 1
    m_rGrid.select(1)
  end if
  if a_bDoubleClick then
    if not voidp(t_iItemId) then
      getConnection(getVariable("main.connection.id", "VMK")).send("SendEmoticon", [#int: t_iItemId])
      this._Close()
    end if
  end if
end
on eventProcEmoticons this, tEvent, tElemID, tParam
  if tEvent = #mouseUp then
    case tElemID of
      "emoticons.grid":
        if the doubleClick then
          this.ShowEmotInfo(tParam, 1)
        else
          this.ShowEmotInfo(tParam, 0)
        end if
      "emoticons.wave.button":
        getConnection(getVariable("main.connection.id", "VMK")).send("StartAction", [#int: 1])
        this.showHideEmoticons()
        executeMessage("PlayInterfaceSound", "close-popup")
      "emoticons.dance.button":
        m_bDanceState = not m_bDanceState
        if m_bDanceBtnState then
          if m_bDanceState then
            getConnection(getVariable("main.connection.id", "VMK")).send("StartAction", [#int: 0])
          else
            getConnection(getVariable("main.connection.id", "VMK")).send("StopAction", [#int: 0])
          end if
        end if
        this.showHideEmoticons()
        executeMessage("PlayInterfaceSound", "close-popup")
      "help":
        executeMessage(#open_help_page, "help.chat.emotes")
      "close":
        this.showHideEmoticons()

    end case
    return 1
  end if
end
on regMsgList this, tBool
  tMsgs = [:]
  tCmds = [:]
  tCmds.setaProp("SendEmoticon", 585)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
end