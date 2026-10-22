-- Score Script
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2702, #openCatalogPage)
  unregisterListener(t_sID, me.getID(), t_rList)
  return 1
end
on cashRegisterClicked
  getConnection("VMK").send(701, [#int: 0])
end
on openCatalogPage me, tMsg
  superCategory = tMsg.connection.GetIntFrom()
  subCategory = tMsg.connection.GetIntFrom()
  executeMessage("showCatalogPage", superCategory, subCategory)
end
on regMsgList me, tBool
  t_sID = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2702, #openCatalogPage)
  tCmds = [:]
  if tBool then
    registerListener(t_sID, me.getID(), tMsgs)
    registerCommands(t_sID, me.getID(), tCmds)
  else
    unregisterListener(t_sID, me.getID(), tMsgs)
    unregisterCommands(t_sID, me.getID(), tCmds)
  end if
end