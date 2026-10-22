-- Score Script
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2023, #InstanceInfo)
  tMsgs.setaProp(2645, #CreateFailed)
  tCmds = [:]
  tCmds.setaProp("GET_SPACE_INSTANCE_INFO_BY_TAG", 36)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end
on InstanceInfo me, tMsg
  me.getInterface().ClearInstanceList()
  tSpaceID = tMsg.connection.GetIntFrom()
  tCount = tMsg.connection.GetIntFrom()
  repeat with i = 1 to tCount
    tInstanceID = tMsg.connection.GetIntFrom()
    tUserPercentage = tMsg.connection.GetIntFrom()
    me.getInterface().AddInstance(tInstanceID, tUserPercentage)
  end repeat
  me.getInterface().RefreshGameRooms()
  me.getInterface().SetSpaceID(tSpaceID)
end
on CreateFailed me, tMsg
  me.getInterface().HidePrestart()
end