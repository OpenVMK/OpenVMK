-- Behavior
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on AnimationState me, tMsg
  t_iAnimRef = tMsg.connection.GetIntFrom()
  t_iState = tMsg.connection.GetIntFrom()
  case t_iState of
    0:
      me.getComponent().GateClosed()
    1:
      me.getComponent().GateOpen()
    otherwise:
      error(me, "Unknown animation state", #AnimationState)

  end case
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2792, #AnimationState)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
end