-- Behavior
on construct t_iMagicFX
  t_iMagicFX.regMsgList(1)
end
on deconstruct t_iMagicFX
end
on handle_setmagic t_iMagicFX, t_rMsg
  t_rCon = t_rMsg.connection
  t_aParams = t_rCon.GetIntFrom()
  this = t_rCon.GetIntFrom()
  t_iAvatar = []
  t_iParamCount = t_rCon.GetIntFrom()
  if t_iParamCount > 0 then
    repeat with i = 1 to t_iParamCount
      t_iAvatar.add(t_rCon.GetIntFrom())
    end repeat
  end if
  t_iMagicFX.getComponent().ActivateMysticsEffect(t_aParams, this, t_iAvatar)
end
on regMsgList t_iMagicFX, tBool
  tCmds = [:]
  tCmds.setaProp(3200, #handle_setmagic)
  tMsgs = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), t_iMagicFX.getID(), tCmds)
    registerCommands(getVariable("main.connection.id", "VMK"), t_iMagicFX.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), t_iMagicFX.getID(), tCmds)
    unregisterCommands(getVariable("main.connection.id", "VMK"), t_iMagicFX.getID(), tMsgs)
  end if
end