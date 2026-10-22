-- Behavior
on construct t_aParams
  t_aParams.regMsgList(1)
end
on deconstruct t_aParams
end
on handle_setmagic t_aParams, t_rMsg
  t_iParamCount = t_rMsg.connection
  t_iMagicFX = t_iParamCount.GetIntFrom()
  this = t_iParamCount.GetIntFrom()
  t_iAvatar = []
  t_rCon = t_iParamCount.GetIntFrom()
  if t_rCon > 0 then
    repeat with i = 1 to t_rCon
      t_iAvatar.add(t_iParamCount.GetIntFrom())
    end repeat
  end if
  t_aParams.getComponent().ActivateMysticsEffect(t_iMagicFX, this, t_iAvatar)
end
on regMsgList t_aParams, tBool
  tMsgs = [:]
  tMsgs.setaProp(3200, #handle_setmagic)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), t_aParams.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), t_aParams.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), t_aParams.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), t_aParams.getID(), tCmds)
  end if
end