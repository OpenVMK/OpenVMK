-- Score Script
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on GetSoundSettings me, tMsg
  if objectExists(#session) then
    getObject(#session).set("fx", tMsg.connection.GetIntFrom())
    getObject(#session).set("music", tMsg.connection.GetIntFrom())
    getObject(#session).set("ui", tMsg.connection.GetIntFrom())
    getObject(#session).set("volume", tMsg.connection.GetIntFrom())
    t_iTutorialState = tMsg.connection.GetIntFrom()
    getObject(#session).set("tutorial", t_iTutorialState)
    t_iTradeState = tMsg.connection.GetIntFrom()
    getObject(#session).set("traderequests", t_iTradeState)
    executeMessage(#set_tutorials_state, t_iTutorialState)
    executeMessage("ResetRoomSound")
    executeMessage("ResetFXChannels")
  end if
end
on SetSoundSettings me
  t_bFx = integer(getObject(#session).get("fx"))
  t_bMusic = integer(getObject(#session).get("music"))
  t_bUi = integer(getObject(#session).get("ui"))
  t_bVol = integer(getObject(#session).get("volume"))
  t_bTut = integer(getObject(#session).get("tutorial"))
  t_bTrade = integer(getObject(#session).get("traderequests"))
  t = [#int: t_bFx, #int: t_bMusic, #int: t_bUi, #int: t_bVol, #int: t_bTut, #int: t_bTrade]
  getConnection(getVariable("main.connection.id", "VMK")).send(780, t)
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2780, #GetSoundSettings)
  tCmds = [:]
  tCmds.setaProp("SetSoundPrefs", 780)
  tCmds.setaProp("GetSoundPrefs", 781)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end