-- Behavior
property m_windowTitle
property m_sWhoEntersWindow
property m_currentView
property m_dialogName
property m_sRoomName
property m_sRoomDesc
property m_rRoomNameField
property m_rRoomDescField
property m_sRoomNameOld
property m_sRoomDescOld
property m_obj_TicketWindow
property m_iTempEntryState

on construct me
  m_windowTitle = "Room Info Window"
  m_currentView = "vmk_popup_roominfop.window"
  m_sWhoEntersWindow = "WhoEntersWindow"
  m_dialogName = EMPTY
  getObject(#session).set("room_furnish_mode", 1)
  m_rRoomNameField = 0
  m_rRoomDescField = 0
  m_sRoomNameOld = EMPTY
  m_sRoomDescOld = EMPTY
  m_iTempEntryState = VOID
  m_obj_TicketWindow = VOID
  registerMessage("room_leave", me.getID(), #RemoveRoomInfo)
  return 1
end
on deconstruct me
  m_obj_TicketWindow = VOID
  unregisterMessage("room_leave", me.getID())
end
on show me
  me.changeView(m_currentView)
end
on hide me
  removeWindow(m_windowTitle)
end
on RemoveRoomInfo me
  if windowExists(m_windowTitle) then
    removeWindow(m_windowTitle)
  end if
  if windowExists(m_sWhoEntersWindow) then
    removeWindow(m_sWhoEntersWindow)
  end if
  if objectp(m_obj_TicketWindow) then
    removeObject(m_obj_TicketWindow.getID())
    m_obj_TicketWindow = VOID
  end if
end
on SetName me, tName
  m_dialogName = tName
end
on UpdateView me
  me.changeView(m_currentView)
end
on changeView me, tView
  tWndObj = getWindow(m_windowTitle)
  tLastView = m_currentView
  if not me.getComponent().getRoomDesc().getaProp(#control) then
    m_currentView = "vmk_popup_roominfo_visitor.window"
    if tView = "vmk_popup_roominfog.window" then
      tView = "vmk_popup_roominfo_visitor.window"
    end if
  end if
  if tWndObj = 0 then
    if not createWindow(m_windowTitle, "vmk_popup.window") then
      return error(me, "Failed to open Room Info dialog!!!", #changeView)
    else
      tWndObj = getWindow(m_windowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#EventProc, me.getID(), #mouseUp)
      tWndObj.merge(m_currentView)
      tWndObj.center()
    end if
  end if
  tWndObj.moveTo(0, 575 - tWndObj.getProperty(#height))
  tWndObj.unmerge()
  tWndObj.merge(tView)
  m_currentView = tView
  case m_currentView of
    "vmk_popup_roominfo_visitor.window":
      t_desc = me.getComponent().getRoomDesc()
      tWndObj.getElement("popup.hd").setText(t_desc.name)
      tWndObj.getElement("roominfog.owner").setText(t_desc.getaProp(#owner))
      tWndObj.getElement("roominfog.info").setText(t_desc.desc)
      m_sRoomName = t_desc.name
      m_sRoomDesc = t_desc.desc
      if t_desc.getaProp(#owner) = getObject(#session).get("name") then
        t_iBlend = 0
        me.setButtonState("roominfo.report.button", 0)
      else
        t_iBlend = 100
        me.setButtonState("roominfo.report.button", 1)
      end if
    "vmk_popup_roominfop.window":
      t_desc = me.getComponent().getRoomDesc()
      tWndObj.getElement("popup.hd").setText(t_desc.name)
      tWndObj.getElement("roominfop.instance").setText(t_desc.instance)
      tWndObj.getElement("roominfop.info").setText(t_desc.desc)
    "vmk_popup_roominfog.window":
      t_desc = me.getComponent().getRoomDesc()
      tWndObj.getElement("popup.hd").setText(t_desc.name)
      tWndObj.getElement("roominfog.owner").setText(t_desc.getaProp(#owner))
      tWndObj.getElement("roominfog.info").setText(t_desc.desc)
      m_sRoomName = t_desc.name
      m_sRoomDesc = t_desc.desc
      if t_desc.getaProp(#owner) = getObject(#session).get("name") then
        t_iBlend = 0
        me.setButtonState("roominfo.report.button", 0)
      else
        t_iBlend = 100
        me.setButtonState("roominfo.report.button", 1)
      end if
      tElem = tWndObj.getElement("roominfo.report.button")
      if tElem <> 0 then
        tElem.setProperty(#blend, t_iBlend)
      end if
      if t_desc.getaProp(#control) then
        t_iBlend = 100
        me.setButtonState("roominfog.furnishingmode.button", 1)
        me.setButtonState("roominfog.editinfo.button", 1)
      end if
      t_ar_ElemList = ["furnishing.checkbox.text", "friendsonly.checkbox.text", "furnishingmode.off", "roominfog.editinfo.button"]
      repeat with i = 1 to t_ar_ElemList.count
        tElem = tWndObj.getElement(t_ar_ElemList[i])
        if tElem <> 0 then
          tElem.setProperty(#blend, t_iBlend)
        end if
      end repeat
      me.setCheckBoxState("furnishingmode.off", getObject(#session).get("room_furnish_mode"), t_iBlend)
      tFriendsOnly = me.component.getFriendsOnly()
      tText = getText("roominfog.allow.hd") & RETURN & me.GetEntryStateDescription(tFriendsOnly)
      tWndObj.getElement("roominfog.allow.hd").setText(tText)

  end case
end
on SaveOriginalData me, a_sName, a_sDesc
  m_sRoomNameOld = a_sName
  m_sRoomDescOld = a_sDesc
end
on RestorePrivateName me
  if windowExists(m_windowTitle) then
    t_rWindow = getWindow(m_windowTitle)
    t_nameField = t_rWindow.getElement("popup.hd")
    t_nameField.setText(m_sRoomNameOld)
    t_DescField = t_rWindow.getElement("roominfog.info")
    t_DescField.setText(m_sRoomDescOld)
  end if
  m_sRoomName = m_sRoomNameOld
  m_sRoomDesc = m_sRoomDescOld
end
on EventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_windowTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        me.getComponent().showHide()
      "roominfo.report.button":
        t_desc = me.getComponent().getRoomDesc()
        executeMessage(#call_for_help_report, t_desc.getaProp(#owner))
      "roominfog.editinfo.button":
        me.CreateRoomNameWindow()
      "roominfog.whoenters.button":
        me._OpenWhoEntersWindow()
      "roominfog.furnishingmode.button", "furnishingmode.off", "furnishing.checkbox.text":
        if tWndObj.getElement(tElemID).getProperty(#blend) > 0 then
          if me.getComponent().getRoomDesc().getaProp(#control) then
            t_bFurnish = getObject(#session).get("room_furnish_mode")
            getObject(#session).set("room_furnish_mode", not t_bFurnish)
            executeMessage("room_furnish_mode", not t_bFurnish)
            me.setCheckBoxState("furnishingmode.off", getObject(#session).get("room_furnish_mode"))
          end if
        end if
      "roominfog.clearroom.button":
        me.getHandler().sendClearRoomRequest()
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        executeMessage(#open_help_page, "help.rooms.change", 1)
      "roominfog.createtickets.button":
        me._OpenTicketWindow()

    end case
  end if
end
on setButtonState me, t_elemName, t_state
  tWndObj = getWindow(m_windowTitle)
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
on setCheckBoxState me, t_sElemName, t_bFurnish, i_iBlend
  tWndObj = getWindow(m_windowTitle)
  if t_bFurnish then
    t_mem = getmemnum("button.checkbox.1")
  else
    t_mem = getmemnum("button.checkbox.0")
  end if
  t_Elem = tWndObj.getElement(t_sElemName)
  if t_Elem <> 0 then
    if t_mem <> 0 then
      t_Img = member(t_mem).image.duplicate()
      t_Elem.feedImage(t_Img)
      if not voidp(i_iBlend) then
        tSprite = t_Elem.getProperty(#sprite)
        if tSprite <> 0 then
          tSprite.blend = i_iBlend
        end if
      end if
    end if
  end if
end
on setButtonText me, t_btnname, t_txt
  tWndObj = getWindow(m_windowTitle)
  tBtn = tWndObj.getElement(t_btnname)
  if tBtn <> 0 then
    tBtn.pButtonText = t_txt
    tBtn.pCachedImgs = [:]
    tBtn.changeState(#up)
  end if
end
on InitDialogWithText me
  tWndObj = getWindow(m_windowTitle)
  txt_content = EMPTY
  txt_title = EMPTY
  txt_btn1 = EMPTY
  txt_btn2 = EMPTY
  if the paramCount > 1 then
    txt_content = param(2)
  end if
  if the paramCount > 2 then
    txt_title = param(3)
  end if
  if the paramCount > 3 then
    txt_btn1 = param(4)
  end if
  if the paramCount > 4 then
    txt_btn2 = param(5)
  end if
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement("basic.content.text")
    if t_Elem <> 0 then
      t_Elem.setText(txt_content)
    end if
    t_Elem = tWndObj.getElement("basic.window.title")
    if t_Elem <> 0 then
      t_Elem.setText(txt_title)
    end if
    me.setButtonText("basic.dialog.button1", txt_btn1)
    me.setButtonText("basic.dialog.button2", txt_btn2)
  end if
end
on CreateRoomNameWindow this
  t_sWndName = "RoomNameWnd"
  if not createWindow(t_sWndName, "vmk_modal.window", 0, 0, #modal) then
    return error(this, "Failed to create room name window!!!", #CreateRoomNameWindow)
  else
    t_rWindow = getWindow(t_sWndName)
    t_rWindow.merge("vmk_edit_roominfo.window")
    t_rWindow.registerClient(this.getID())
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseDown)
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #keyUp)
    t_nameField = t_rWindow.getElement("reg.roomname.input")
    t_nameField.setText(m_sRoomName)
    t_DescField = t_rWindow.getElement("reg.roomdescription.input")
    t_DescField.setText(m_sRoomDesc)
    t_Elem = t_rWindow.getElement("basic.window.title")
    if t_Elem <> 0 then
      t_Elem.setText(getText("edit.rooms.title"))
    end if
  end if
  m_rRoomNameField = CreateCannedField(t_sWndName, "reg.roomname.input")
  m_rRoomDescField = CreateCannedField(t_sWndName, "reg.roomdescription.input")
  m_rRoomDescField.setAllowEmpty(1)
  m_rRoomNameField.setAllowFreeWords(0)
  m_rRoomDescField.setAllowFreeWords(0)
  m_rRoomNameField.setAllowFriendNames(0)
  m_rRoomDescField.setAllowFriendNames(0)
  m_rRoomNameField.setAllowOwnName(1)
  m_rRoomDescField.setAllowOwnName(1)
end
on CreateRoomCreatedWindow this, a_mp_RoomData
  m_iMyRoomID = a_mp_RoomData.id
  t_sWndName = "RoomNameWnd"
  if not createWindow(t_sWndName, "vmk_modal.window", 0, 0, #modal) then
    return error(this, "Failed to create room name window!!!", #CreateRoomCreatedWindow)
  else
    t_rWindow = getWindow(t_sWndName)
    t_rWindow.merge("vmk_cat_rooms_step2.window")
    t_rWindow.registerClient(this.getID())
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseDown)
  end if
end
on _OpenTicketWindow this
  if objectp(m_obj_TicketWindow) then
    m_obj_TicketWindow.show()
  else
    m_obj_TicketWindow = createObject("roomTicket", "CRoomInfoTicketWindow")
    m_obj_TicketWindow.show()
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  t_rWindow = getWindow("RoomNameWnd")
  if a_kEvent = #mouseDown then
    case a_sElem of
      "edit.cancel.button":
        t_rWindow.close()
      "cat.rooms.nextstep.button":
        this._NextStep()
      "cat.rooms.goto.button":
        this._GoToNewRoom()

    end case
  end if
  if a_kEvent = #keyDown then
    t_rWindow = getWindow("RoomNameWnd")
    if a_sElem = "reg.roomname.input" then
      case the keyCode of
        123, 124, 125, 126:
          m_rRoomNameField.updateContent()
          pass()
        117, 51:
          m_rRoomNameField.updateContent()
          pass()
        76:
          return 1
        36:
          t_pass = m_rRoomNameField.CheckContent()
          if t_pass then
            m_bRoomNAmeOK = 1
          end if
          return 1
        49:
          tElem = t_rWindow.getElement(a_sElem)
          tSelection = tElem.pMember.selection
          tCharcount = tElem.pMember.text.char.count
          if tCharcount > 0 then
            if tElem.pMember.text.char[tSelection[2]] = " " then
              return 1
            end if
            if tSelection[2] + 1 <= tCharcount then
              if tElem.pMember.text.char[tSelection[2] + 1] = " " then
                return 1
              end if
            end if
          end if
          t_pass = m_rRoomNameField.CheckContent()
          if t_pass then
            m_rRoomNameField.updateContent()
          end if
        otherwise:
          if not m_rRoomNameField.updateContent() then
            return 1
          end if
          tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\#;" & QUOTE
          tAscii = charToNum(the key)
          t_allow = 0
          if tAscii > 31 and tAscii < 128 then
            if tValidKeys contains the key or tValidKeys = EMPTY then
              t_allow = 1
            end if
          end if
          if not t_allow then
            return 1
          end if

      end case
      t_iMaxlength = 30
      tElem = t_rWindow.getElement(a_sElem)
      if tElem <> 0 then
        if tElem.pMember.text.char.count > t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.roomname.toolong")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        end if
      end if
    end if
    t_iMaxlength = 255
    if a_sElem = "reg.roomdescription.input" then
      tElem = t_rWindow.getElement(a_sElem)
      if tElem <> 0 then
        if the keyCode = 49 then
          tSelection = tElem.pMember.selection
          tCharcount = tElem.pMember.text.char.count
          if tCharcount > 0 then
            if tElem.pMember.text.char[tSelection[2]] = " " then
              return 1
            end if
            if tSelection[2] + 1 <= tCharcount then
              if tElem.pMember.text.char[tSelection[2] + 1] = " " then
                return 1
              end if
            end if
          end if
        end if
        if the keyCode = 76 then
          return 1
        end if
        if tElem.pMember.text.char.count > t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.roomdesc.toolong")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        end if
      end if
    end if
  else
    if a_kEvent = #keyUp then
      if a_sElem = "reg.roomname.input" then
        if m_rRoomNameField <> 0 then
          case the keyCode of
            36, 49, 76:
            otherwise:
              m_rRoomNameField.CheckWord()

          end case
        end if
      end if
      if a_sElem = "reg.roomdescription.input" then
        if m_rRoomDescField <> 0 then
          case the keyCode of
            36, 49, 76:
            otherwise:
              m_rRoomDescField.CheckWord()

          end case
        end if
      end if
    end if
  end if
end
on _NextStep this
  t_error = 0
  t_sWndName = "RoomNameWnd"
  m_bRoomNAmeOK = m_rRoomNameField.CheckContent()
  m_bRoomDescOK = m_rRoomDescField.CheckContent()
  m_rDialogWindow = createDialogWindow(this.getID(), "RoomCreationError", 1, 1)
  if not m_bRoomNAmeOK then
    t_sTxt = getText("cat.check.name")
    m_rDialogWindow.show()
    m_rDialogWindow.setText(t_sTxt, "Room Creation Error", "OK")
  end if
  if not m_bRoomDescOK then
    t_sTxt = getText("cat.check.desc")
    m_rDialogWindow.show()
    m_rDialogWindow.setText(t_sTxt, "Room Creation Error", "OK")
  end if
  if m_bRoomNAmeOK and m_bRoomDescOK then
    t_rWindow = getWindow(t_sWndName)
    t_rElementName = t_rWindow.getElement("reg.roomname.input")
    t_rElementDesc = t_rWindow.getElement("reg.roomdescription.input")
    m_sRoomName = t_rElementName.getText()
    m_sRoomDesc = t_rElementDesc.getText()
    this.getComponent().setRoomName(m_sRoomName)
    this.getComponent().setRoomDesc(m_sRoomDesc)
    t_RoomNameCanned = m_rRoomNameField.GetContent()
    t_RoomDescCanned = m_rRoomDescField.GetContent()
    this.SendEditRoomInfo(t_RoomNameCanned, t_RoomDescCanned)
    t_rWindow.close()
  end if
  this.UpdateView()
end
on SendEditRoomInfo me, t_ar_roomName, t_ar_roomDesc
  tMsg = [:]
  tCannedBlock = TransformCannedToMsg(t_ar_roomName)
  repeat with i = 1 to tCannedBlock.count
    tKey = tCannedBlock.getPropAt(i)
    tvalue = tCannedBlock[i]
    tMsg.addProp(tKey, tvalue)
  end repeat
  tCannedBlock = TransformCannedToMsg(t_ar_roomDesc)
  repeat with i = 1 to tCannedBlock.count
    tKey = tCannedBlock.getPropAt(i)
    tvalue = tCannedBlock[i]
    tMsg.addProp(tKey, tvalue)
  end repeat
  getConnection("VMK").send(594, tMsg)
  createTimeout(#update_own_rooms_once, 1000, #updateOwnRoomInfo, me.getID(), VOID, 1)
  return 1
end
on updateOwnRoomInfo me
  tConnection = getConnection(getVariable("main.connection.id", "VMK"))
  if tConnection <> 0 then
    tConnection.send(24)
  end if
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent
  removeDialogWindow("RoomCreationError")
end
on GetEntryStateDescription this, a_iState
  case a_iState of
    0:
      return getText("everyone.entrystate")
    1:
      return getText("friendsonly.entrystate")
    2:
      return getText("ticketpeople.entrystate")
    3:
      return getText("almosteveryone.entrystate")
    4:
      return getText("owner.entrystate")

  end case
  return EMPTY
end
on _OpenWhoEntersWindow this
  t_sWndName = m_sWhoEntersWindow
  if not createWindow(t_sWndName, "vmk_basic.window", 350, 360) then
    return error(this, "Failed to create 'who enters' window!!!", #_OpenWhoEntersWindow)
  else
    t_rWindow = getWindow(t_sWndName)
    t_rWindow.merge("vmk_whoenters.window")
    t_rWindow.getElement("basic.window.title").setText(getText("whoenters.title", EMPTY))
    t_rWindow.registerClient(this.getID())
    t_rWindow.registerProcedure(#_WhoEntersEventProc, this.getID(), #mouseUp)
    m_iTempEntryState = this.getComponent().getFriendsOnly()
    this.UpdateChoises(m_iTempEntryState, t_sWndName)
  end if
end
on _CloseWhoEntersWindow this
  if windowExists(m_sWhoEntersWindow) then
    removeWindow(m_sWhoEntersWindow)
  end if
end
on _WhoEntersEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWhoEntersWindow)
  if tEvent = #mouseUp then
    case tElemID of
      "friendsonly.off", "friendsonly.checkbox.text":
        m_iTempEntryState = 1
      "everyone.off", "everyone.checkbox.text":
        m_iTempEntryState = 0
      "ticketpeople.off", "ticketpeople.checkbox.text":
        m_iTempEntryState = 2
      "owner.off", "owner.checkbox.text":
        m_iTempEntryState = 4
      "almosteveryone.off", "almosteveryone.checkbox.text":
        m_iTempEntryState = 3
      "mes.accept.button":
        me.getComponent().setFriendsOnly(m_iTempEntryState)
        me._CloseWhoEntersWindow()
      "close", "mes.deny.button":
        me._CloseWhoEntersWindow()

    end case
    me.UpdateChoises(m_iTempEntryState)
  end if
end
on UpdateChoises me, a_iState, a_sWindowTitle
  t_sWindowTitle = EMPTY
  if voidp(a_sWindowTitle) then
    t_sWindowTitle = m_sWhoEntersWindow
  else
    t_sWindowTitle = a_sWindowTitle
  end if
  if not windowExists(t_sWindowTitle) then
    return 0
  end if
  tWndObj = getWindow(t_sWindowTitle)
  if voidp(a_iState) then
    a_iState = me.component.getFriendsOnly()
  end if
  if objectp(tWndObj) then
    case a_iState of
      0:
        t_rElement = tWndObj.getElement("owner.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("friendsonly.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("ticketpeople.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("almosteveryone.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("everyone.off")
        t_Img = getMember("button.radiobutton.1").image
        t_rElement.feedImage(t_Img)
      1:
        t_rElement = tWndObj.getElement("owner.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("friendsonly.off")
        t_Img = getMember("button.radiobutton.1").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("ticketpeople.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("almosteveryone.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("everyone.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
      2:
        t_rElement = tWndObj.getElement("owner.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("friendsonly.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("ticketpeople.off")
        t_Img = getMember("button.radiobutton.1").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("almosteveryone.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("everyone.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
      3:
        t_rElement = tWndObj.getElement("owner.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("friendsonly.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("ticketpeople.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("almosteveryone.off")
        t_Img = getMember("button.radiobutton.1").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("everyone.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
      4:
        t_rElement = tWndObj.getElement("owner.off")
        t_Img = getMember("button.radiobutton.1").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("friendsonly.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("ticketpeople.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("almosteveryone.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)
        t_rElement = tWndObj.getElement("everyone.off")
        t_Img = getMember("button.radiobutton.0").image
        t_rElement.feedImage(t_Img)

    end case
  end if
end