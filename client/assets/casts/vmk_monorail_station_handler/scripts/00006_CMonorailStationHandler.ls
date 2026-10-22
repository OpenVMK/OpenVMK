-- Script
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on MonorailEvent me, a_rMsg
  executeMessage(#MonorailStatus, a_rMsg.connection.GetIntFrom())
end
on NextMonorailStop me, a_rMsg
  put "Server sent next Monorail stop"
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2730, #MonorailEvent)
  tMsgs.setaProp(2731, #NextMonorailStop)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
end