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
  tAnimRef = tMsg.connection.GetIntFrom()
  tstate = tMsg.connection.GetIntFrom()
  case tstate of
    0:
      me.getComponent().idle()
    1:
      me.getComponent().PreLaunch()
    2:
      me.getComponent().Depart()
    3:
      me.getComponent().Arrived()
    otherwise:
      error(me, "Unknown animation state", #AnimationState)

  end case
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2792, #AnimationState)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
end