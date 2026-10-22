-- Script
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on EnterPodium me, a_mp_Data
  t_iAvatarRef = a_mp_Data.connection.GetIntFrom()
  return the component of me.ShowScreen(t_iAvatarRef)
end
on ExitPodium me
  return the interface of me.ExitPodium()
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2840, #EnterPodium)
  tMsgs.setaProp(2841, #ExitPodium)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
end