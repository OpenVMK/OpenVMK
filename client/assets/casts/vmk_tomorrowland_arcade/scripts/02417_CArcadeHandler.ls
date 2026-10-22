-- Parent Script
property m_iUpdateCounter

on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on startFriendListUpdate me
  m_iUpdateCounter = 0
  createTimeout(#pinger, 5 * 60 * 1000, #PingerTimeOutUpdate, me.getID(), VOID, 0)
end
on RemovePingerUpdate me
  removeTimeout(#pinger)
end
on PingerTimeOutUpdate me
  m_iUpdateCounter = m_iUpdateCounter + 1
  if m_iUpdateCounter < 200 then
    getConnection("VMK").send(12)
  else
    me.RemovePingerUpdate()
  end if
end
on OpenArcade me
  me.interface.showHideArcade()
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2820, #OpenArcade)
  tCmds = [:]
  tCmds.setaProp("LeaveArcade", 800)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end