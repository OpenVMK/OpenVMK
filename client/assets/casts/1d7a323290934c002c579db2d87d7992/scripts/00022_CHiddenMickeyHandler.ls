-- Behavior
property m_requestID

on construct me
  m_requestID = -1
  registerMessage(#saveHiddenMickey, me.getID(), #MickeyPictureSaved)
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
end
on RequestHiddenMickeyTest me, i_pCoordinates
  m_requestID = the milliSeconds
  getConnection(getVariable("main.connection.id", "VMK")).send(770, [#int: m_requestID, #int: i_pCoordinates.locH, #int: i_pCoordinates.locV])
end
on MickeyPictureSaved me, t_ID, t_rect
  getConnection(getVariable("main.connection.id", "VMK")).send(771, [#int: integer(t_ID), #int: t_rect.left, #int: t_rect.top])
end
on RequestHiddenMickeyStatus me
  getConnection(getVariable("main.connection.id", "VMK")).send(772)
end
on MickeyInPicture me, tMsg
  tRequestID = tMsg.connection.GetIntFrom()
  tNewMickeyFound = tMsg.connection.GetIntFrom()
  if tRequestID = m_requestID then
    executeMessage(#MickeyInPicture, tNewMickeyFound)
  end if
end
on HiddenMickeyQuestStatus me, tMsg
  tFoundMickeys = tMsg.connection.GetIntFrom()
  tTotalMickeys = tMsg.connection.GetIntFrom()
  me.getComponent().setQuestStatus(tFoundMickeys, tTotalMickeys)
  executeMessage(#HiddenMickeyQuestStatus, [#foundMickeys: tFoundMickeys, #totalMickeys: tTotalMickeys])
end
on SetActiveMickeyList me, tMsg
  tCount = tMsg.connection.GetIntFrom()
  t_arList = []
  t_arColors = []
  repeat with i = 1 to tCount
    t_arList.append(tMsg.connection.GetIntFrom())
    t_arColors.append(tMsg.connection.GetIntFrom())
  end repeat
  me.getInterface().SetActiveMickeyList(t_arList, t_arColors)
end
on LoginResult me, tMsg
  tResult = tMsg.connection.GetIntFrom()
  case tResult of
    0:
      put "HiddenMickey.LoginSuccessfull"
    1:
    3:
    5:
    otherwise:
      put "HiddenMickey.UnknownLoginresult"

  end case
end
on LoginData me, tMsg
  tName = tMsg.connection.GetStrFrom()
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2510, #LoginData)
  tMsgs.setaProp(2770, #MickeyInPicture)
  tMsgs.setaProp(2771, #HiddenMickeyQuestStatus)
  tMsgs.setaProp(2773, #SetActiveMickeyList)
  tCmds = [:]
  tCmds.setaProp("CHECK_MICKEY_PICTURE", 770)
  tCmds.setaProp("SAVE_MICKEY_PICTURE", 771)
  tCmds.setaProp("REQUEST_QUEST_STATUS", 772)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end