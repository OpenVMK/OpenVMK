-- Score Script
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on TreasureChestClicked me, itemRef
  tMsg = [#int: itemRef, #int: 0]
  getConnection("VMK").send(584, tMsg)
end
on openCatalogPage me, tMsg
  superCategory = tMsg.connection.GetIntFrom()
  executeMessage("showCatalogPage", superCategory)
end
on regMsgList me, tBool
  t_sID = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2593, #HandleRoomEvent)
  tCmds = [:]
  if tBool then
    registerListener(t_sID, me.getID(), tMsgs)
    registerCommands(t_sID, me.getID(), tCmds)
  else
    unregisterListener(t_sID, me.getID(), tMsgs)
    unregisterCommands(t_sID, me.getID(), tCmds)
  end if
end
on HandleRoomEvent me, i_rMsg
  tEventType = i_rMsg.connection.GetIntFrom()
  tNumParams = i_rMsg.connection.GetIntFrom()
  tIntParams = []
  repeat with i = 1 to tNumParams
    tIntParams.append(i_rMsg.connection.GetIntFrom())
  end repeat
  tNumParams = i_rMsg.connection.GetIntFrom()
  tStringParams = []
  repeat with i = 1 to tNumParams
    tStringParams.append(i_rMsg.connection.GetStrFrom())
  end repeat
  put "Play sound" && tEventType
  if tEventType = 25 then
    createTimeout(#splashSound_timeout, 300, #PlaySplash, me.getID(), VOID, 1)
  end if
end
on PlaySplash me
  executeMessage("PlayInterfaceSound", "PP-splash")
  removeTimeout(#splashSound_timeout)
end