-- Script
property m_iMonorailStatus

on construct me
  registerMessage(#GoTrain, me.getID(), #GoToMonorailTrain)
  registerMessage(#GoSulake, me.getID(), #GoToMonorailSulake)
  registerMessage(#GoMusicMixer, me.getID(), #GoToMusicMixerGame)
  m_iMonorailStatus = 0
  me.regMsgList(1)
  return 1
end
on deconstruct me
  unregisterMessage(#GoTrain, me.getID())
  unregisterMessage(#GoSulake, me.getID())
  unregisterMessage(#GoMusicMixer, me.getID())
  me.regMsgList(0)
  return 1
end
on MonorailEvent me, a_rMsg
  executeMessage(#MonorailStatus, a_rMsg.connection.GetIntFrom())
  m_iMonorailStatus = a_rMsg.connection.GetIntFrom()
end
on GoToMonorailSulake me
  me.closeNavigator()
  getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: 25, #integer: -1])
end
on GoToMonorailTrain me
  me.closeNavigator()
  getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: 29, #integer: -1])
end
on GoToMusicMixerGame me
  me.closeNavigator()
  getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: 21, #integer: -1])
end
on closeNavigator me
  executeMessage(#ui_StopWelcomeSound)
  t_NavigatorWindow = "Navigator Window"
  if windowExists(t_NavigatorWindow) then
    tWndObj = getWindow(t_NavigatorWindow)
    if tWndObj.getProperty(#visible) then
      executeMessage(#ui_navigator)
    end if
  end if
end
on NameError me, tMsg
  t_iErrorCode = tMsg.connection.GetIntFrom()
  if t_iErrorCode = 4582 then
    me.interface.RestorePrivateName()
  end if
end
on PublicRoomInfoMessage me, tMsg
  t_ar_Msg = [:]
  t_ar_Msg[#roomTag] = tMsg.connection.GetIntFrom()
  t_ar_Msg[#instanceID] = tMsg.connection.GetIntFrom() + 1
  me.getComponent().setPublicInfo(t_ar_Msg)
  me.getComponent().setPublic()
  me.getComponent().enterRoom()
  getObject(#session).set("RoomType", #public)
  if getObject(#session).exists("permissions") then
    t_ar_PermissionList = getObject(#session).get("permissions")
    if listp(t_ar_PermissionList) then
      if t_ar_PermissionList.findPos(2) > 0 then
        getObject(#session).set("ControlRoom", 1)
      end if
    end if
  else
    getObject(#session).set("ControlRoom", 0)
  end if
end
on GuestRoomInfoMessage me, tMsg
  t_ar_Msg = [:]
  t_ar_Msg[#roomName] = TransformCannedMsgToString(tMsg)
  t_ar_Msg[#roomOwner] = tMsg.connection.GetStrFrom()
  t_ar_Msg[#roomDescription] = TransformCannedMsgToString(tMsg)
  t_ar_Msg[#controlRoom] = tMsg.connection.GetIntFrom()
  t_ar_Msg[#friendsOnly] = tMsg.connection.GetIntFrom()
  me.getComponent().setGuestInfo(t_ar_Msg)
  me.getComponent().setPrivate()
  me.interface.SaveOriginalData(t_ar_Msg[#roomName], t_ar_Msg[#roomDescription])
  getObject(#session).set("RoomType", #private)
  getObject(#session).set("ControlRoom", t_ar_Msg.controlRoom)
end
on GuestRoomInfoUpdate me, tMsg
  tRoomTag = tMsg.connection.GetIntFrom()
  tRoomName = tMsg.connection.GetStrFrom()
  tRoomDesc = tMsg.connection.GetStrFrom()
  t_iNewAccessibilityCode = tMsg.connection.GetIntFrom()
  me.getComponent().setRoomAccesCode(t_iNewAccessibilityCode)
  me.getComponent().setRoomName(tRoomName)
  me.getComponent().setRoomDesc(tRoomDesc)
end
on InventoryItemDetails me, tMsg
  t_rConnection = tMsg.connection
  t_iInventoryId = t_rConnection.GetIntFrom()
  t_iClearFlag = t_rConnection.GetIntFrom()
  t_iItemCount = t_rConnection.GetIntFrom()
  if t_iItemCount > 0 then
    t_mp_ItemData = [:]
    repeat with i = 1 to t_iItemCount
      t_sItemGroup = t_rConnection.GetStrFrom()
      t_iNumberOfValuePairs = t_rConnection.GetIntFrom()
      repeat with e = 1 to t_iNumberOfValuePairs
        t_mp_ValuePairs = [:]
        t_sValueName = t_rConnection.GetStrFrom()
        t_iValue = t_rConnection.GetStrFrom()
        t_mp_ValuePairs.addProp(t_sValueName, t_iValue)
        t_mp_ItemData.addProp(t_sItemGroup, t_mp_ValuePairs)
      end repeat
    end repeat
  end if
end
on sendClearRoomRequest me
  getConnection(getVariable("main.connection.id", "VMK")).send("ClearRoomItems", [#integer: 0])
end
on SendFriendsOnlyState me, a_iState
  getConnection(getVariable("main.connection.id", "VMK")).send(598, [#integer: a_iState])
end
on GuestRoomEntryStateUpdate me, tMsg
  tRoomEntryState = tMsg.connection.GetIntFrom()
  me.getComponent().setRoomEntryState(tRoomEntryState)
end
on ConfirmClearRoomRequest me, a_rMsg
  t_rDialog = createDialogWindow(me.getID(), "ConfirmClearRoom", 2, 1)
  t_rDialog.show()
  t_rDialog.setText(getText("roominfo.clearroom.desc"), getText("roominfo.clearroom.title"), getText("roominfo.clearroom.cancel"), getText("roominfo.clearroom.ok"))
end
on dialogWindowEvent me, a_sDialog, a_kEvent
  case a_sDialog of
    "ConfirmClearRoom":
      if a_kEvent = #dialogOK then
        getConnection(getVariable("main.connection.id", "VMK")).send("ClearRoomItems", [#integer: 1])
      else
        if a_kEvent = #dialogCancel then
        end if
      end if

  end case
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2584, #PublicRoomInfoMessage)
  tMsgs.setaProp(2587, #GuestRoomInfoMessage)
  tMsgs.setaProp(2730, #MonorailEvent)
  tMsgs.setaProp(2796, #GuestRoomInfoUpdate)
  tMsgs.setaProp(2884, #GuestRoomEntryStateUpdate)
  tMsgs.setaProp(2812, #ConfirmClearRoomRequest)
  tMsgs.setaProp(2000, #NameError)
  tCmds = [:]
  tCmds.setaProp("CreateRoomTicket", 533)
  tCmds.setaProp("RequestTicketInventory", 534)
  tCmds.setaProp("SendFriendsOnlyState", 598)
  tCmds.setaProp("ClearRoomItems", 812)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end