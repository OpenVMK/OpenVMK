-- Script
on construct this
  this.regMsgList(1)
end
on deconstruct this
  this.regMsgList(0)
end
on HandleLoadPackage this, tMsg
  t_sPackageName = tMsg.connection.GetStrFrom()
  this.component.LoadPackage(t_sPackageName)
end
on HandleUnloadPackage this, tMsg
  t_sPackageName = tMsg.connection.GetStrFrom()
  this.component.DelayedUnloadPackage(t_sPackageName, 10000)
end
on regMsgList this, tBool
  tMsgs = [:]
  tMsgs.setaProp(2910, #HandleLoadPackage)
  tMsgs.setaProp(2911, #HandleUnloadPackage)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
  end if
end