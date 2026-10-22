-- Behavior
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on callForHelp me, categoryId, t_ar_cWords, harasserName
  if stringp(t_ar_cWords) then
    t_ar_cWords = ParseCannedText(t_ar_cWords)
  end if
  tCannedBlock = TransformCannedToMsg(t_ar_cWords)
  tMsg = [#int: categoryId]
  repeat with i = 1 to tCannedBlock.count
    tKey = tCannedBlock.getPropAt(i)
    tvalue = tCannedBlock[i]
    tMsg.addProp(tKey, tvalue)
  end repeat
  tMsg.addProp(#str, harasserName)
  put "CFH" && tMsg
  getConnection("VMK").send("CallForHelp", tMsg)
end
on callForHelpOLD me, categoryId, message, harasserName
  tMsg = [#int: categoryId, #str: message, #str: harasserName]
  getConnection("VMK").send("CallForHelp", tMsg)
end
on HelpReceivedOK me, tMsg
  t_pHelpDialog = createDialogWindow(me.getID(), "hlp.dialog.cfh.sent", 1, 1)
  t_pHelpDialog.show()
  t_pHelpDialog.setText(getText("hlp.dialog.cfh.sent.text"), getText("hlp.dialog.cfh.sent.title"), getText("hlp.dialog.cfh.sent.btn"))
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2215, #HelpReceivedOK)
  tCmds = [:]
  tCmds.setaProp("CallForHelp", 210)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end