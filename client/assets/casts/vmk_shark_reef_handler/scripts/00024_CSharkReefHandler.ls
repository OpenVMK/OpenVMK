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
  me.getComponent().ShowSplash(t_iAnimRef)
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