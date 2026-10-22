-- Behavior
on construct me
  t_sID = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2505, #HandleAvatarInfo)
  tCmds = [:]
  tCmds.setaProp("REQUESTDATA", 505)
  registerListener(t_sID, me.getID(), tMsgs)
  registerCommands(t_sID, me.getID(), tCmds)
  return 1
end
on deconstruct me
  t_sID = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2505, #HandleAvatarInfo)
  tCmds = [:]
  tCmds.setaProp("REQUESTDATA", 505)
  unregisterListener(t_sID, me.getID(), tMsgs)
  unregisterCommands(t_sID, me.getID(), tCmds)
  return 1
end
on HandleAvatarInfo me, tMsg
  t_sName = tMsg.connection.GetStrFrom()
  t_iSex = tMsg.connection.GetIntFrom()
  t_sSlogan = tMsg.connection.GetStrFrom()
  t_ar_FigData = []
  repeat while tMsg.connection.pMsgStruct.content.length > 0
    t_iData = tMsg.connection.GetIntFrom()
    t_ar_FigData.add(t_iData)
  end repeat
  me.getComponent().SetAvatarFigure(t_ar_FigData)
end