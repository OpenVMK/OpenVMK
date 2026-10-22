-- Behavior
on construct this
  this.regMsgList(1)
  return 1
end
on deconstruct this
  return 1
end
on CameraStatus me, tMsg
  tHasCamera = tMsg.connection.GetIntFrom()
  if tHasCamera = 1 then
    getObject(#session).set("HasCamera", 1)
    me.getInterface().getMessageBar().ShowCameraIcon()
  else
    me.getInterface().getMessageBar().hideCameraIcon()
  end if
end
on ChatAvatarMuted me, tMsg
  tMuteTime = tMsg.connection.GetIntFrom()
  me.getInterface().getMessageBar().Mute(tMuteTime)
end
on regMsgList me, tBool
  tConnection = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2762, #CameraStatus)
  tMsgs.setaProp(2561, #ChatAvatarMuted)
  tCmds = [:]
  tCmds.setaProp("QUERY_CAMERA", 767)
  if tBool then
    registerListener(tConnection, me.getID(), tMsgs)
    registerCommands(tConnection, me.getID(), tCmds)
  else
    unregisterListener(tConnection, me.getID(), tMsgs)
    unregisterCommands(tConnection, me.getID(), tCmds)
  end if
end