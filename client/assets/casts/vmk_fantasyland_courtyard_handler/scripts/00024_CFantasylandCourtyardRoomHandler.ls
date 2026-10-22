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
  put "Animation State" && t_iAnimRef && t_iState
  case t_iState of
    0:
      me.getComponent().SwordIdle(t_iAnimRef)
    1:
      me.getComponent().SwordSuccess(t_iAnimRef)
      executeMessage("PlayFxSound", "VMK-swordfromstone-v1")
    2:
      me.getComponent().SwordFailure(t_iAnimRef)
    otherwise:
      error(me, "Unknown animation state", #AnimationState)

  end case
end
on AnimationList me, tMsg
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2791, #AnimationList)
  tMsgs.setaProp(2792, #AnimationState)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
end