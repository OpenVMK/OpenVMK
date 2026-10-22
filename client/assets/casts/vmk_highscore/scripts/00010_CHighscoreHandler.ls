-- Behavior
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2660, #HighScoreWithRank)
  tMsgs.setaProp(2662, #HighScoreWithRankHM)
  tCmds = [:]
  tCmds.setaProp("GET_HIGH_SCORES", 660)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end
on HighScoreWithRank me, tMsg
  tMyRank = tMsg.connection.GetIntFrom()
  tCount = tMsg.connection.GetIntFrom()
  t_mp_scoretable = [:]
  repeat with i = 1 to tCount
    tRank = tMsg.connection.GetIntFrom()
    tScore = tMsg.connection.GetIntFrom()
    tName = tMsg.connection.GetStrFrom()
    t_mp_scoretable.addProp(tRank, [#score: tScore, #name: tName])
  end repeat
  me.getComponent().SetHighScores(t_mp_scoretable)
end
on HighScoreWithRankHM me, tMsg
  t_iGameID = tMsg.connection.GetIntFrom()
  t_iScoreType = tMsg.connection.GetIntFrom()
  tCount = tMsg.connection.GetIntFrom()
  t_mp_scoretable = [:]
  repeat with i = 1 to tCount
    tRank = tMsg.connection.GetIntFrom()
    tScore = tMsg.connection.GetIntFrom()
    tName = tMsg.connection.GetStrFrom()
    t_mp_scoretable.addProp(tRank, [#score: tScore, #name: tName])
  end repeat
  me.getComponent().SetHighScores(t_mp_scoretable, 1)
end