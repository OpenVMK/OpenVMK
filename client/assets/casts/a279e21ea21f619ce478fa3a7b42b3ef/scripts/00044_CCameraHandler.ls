-- Behavior
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on RequestFilmAmount me
  getConnection(getVariable("main.connection.id", "VMK")).send(760)
end
on FilmCounter me, tMsg
  tCount = tMsg.connection.GetIntFrom()
  put "Film Amount :" && tCount
  me.getComponent().setFilmAmount(tCount)
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2760, #FilmCounter)
  tCmds = [:]
  tCmds.setaProp("QUERY_FILM_COUNTER", 760)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end