-- Score Script
on construct this
  this.regMsgList(1)
  return 1
end
on deconstruct this
  this.regMsgList(0)
  return 1
end
on ReceiveModConversation this, a_mpMsg
  t_mp_data = [:]
  t_mp_data.addProp(#id, a_mpMsg.connection.GetIntFrom())
  t_mp_data.addProp(#name, a_mpMsg.connection.GetStrFrom())
  t_mp_data.addProp(#message, a_mpMsg.connection.GetStrFrom())
  t_mp_data.addProp(#Response, a_mpMsg.connection.GetIntFrom())
  this.interface.ManageModWindows("mod_message", t_mp_data)
end
on CallClosed this, a_mpMsg
end
on CallAssignedToModerator this, a_mpMsg
end
on PublicRoomInfo this, a_mpMsg
  t_mp_RoomInfo = [:]
  t_mp_RoomInfo.addProp("tag", a_mpMsg.connection.GetIntFrom())
  t_mp_RoomInfo.addProp("instance", a_mpMsg.connection.GetIntFrom())
end
on GuestRoomInfo this, a_mpMsg
end
on ForcedNameChange this, a_mpMsg
end
on ModerationConfirmation this, a_mpMsg
  tCode = a_mpMsg.connection.GetIntFrom()
  t = createDialogWindow(this.getID(), "ModerationConfirmationDialog", 1, 0)
  t.show()
  t_sTxt = getText("mods.confirmationdlg.text." & tCode)
  t_sTitle = getText("mods.confirmationdlg.title")
  t.setText(t_sTxt, t_sTitle, getText("mods.confirmationdlg.btnOK"))
end
on regMsgList this, tBool
  tMsgs = [:]
  tMsgs.setaProp(2211, #CallAssignedToModerator)
  tMsgs.setaProp(2213, #ReceiveModConversation)
  tMsgs.setaProp(2214, #CallClosed)
  tMsgs.setaProp(2230, #ModerationConfirmation)
  tMsgs.setaProp(2584, #PublicRoomInfo)
  tMsgs.setaProp(2587, #GuestRoomInfo)
  tCmds = [:]
  tCmds.setaProp("initializeorwell", 200)
  tCmds.setaProp("SendMessageToModerator", 215)
  tCmds.setaProp("SendAlertToUser", 240)
  tCmds.setaProp("SendAlertToRoom", 244)
  tCmds.setaProp("KickUsers", 242)
  tCmds.setaProp("KickRoom", 246)
  tCmds.setaProp("BanUser", 243)
  tCmds.setaProp("BanRoom", 247)
  tCmds.setaProp("MuteUser", 241)
  tCmds.setaProp("UnmuteUser", 252)
  tCmds.setaProp("MuteRoom", 245)
  tCmds.setaProp("UnmuteRoom", 253)
  tCmds.setaProp("ForceNameChange", 792)
  tCmds.setaProp("AlertQueue", 814)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
end