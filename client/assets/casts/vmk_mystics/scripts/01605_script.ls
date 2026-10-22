-- Behavior
on construct this
  this.regMsgList(1)
end
on deconstruct this
end
on handle_setmagic this, t_rMsg
  t_rCon = t_rMsg.connection
  t_iAvatar = t_rCon.GetIntFrom()
  t_iMagicFX = t_rCon.GetIntFrom()
  t_aParams = []
  t_iParamCount = t_rCon.GetIntFrom()
  if t_iParamCount > 0 then
    repeat with i = 1 to t_iParamCount
      t_aParams.add(t_rCon.GetIntFrom())
    end repeat
  end if
  this.getComponent().ActivateMysticsEffect(t_iAvatar, t_iMagicFX, t_aParams)
end
on regMsgList this, tBool
  tMsgs = [:]
  tMsgs.setaProp(3200, #handle_setmagic)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
end