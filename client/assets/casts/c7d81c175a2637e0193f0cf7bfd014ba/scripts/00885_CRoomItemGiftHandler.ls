-- Script
property m_mp_GiftObjects
property m_bSetmodal

on construct me
  m_mp_GiftObjects = [:]
  m_bSetmodal = 0
  registerMessage(#room_leave, me.getID(), #leaveRoom)
  me.regMsgList(1)
end
on deconstruct me
  unregisterMessage(#room_leave, me.getID(), #leaveRoom)
  me.regMsgList(0)
end
on SetGiftItem me, a_iRef, a_obj
  if m_mp_GiftObjects.findPos(string(a_iRef)) = 0 then
    m_mp_GiftObjects.addProp(a_iRef, a_obj)
  else
    m_mp_GiftObjects[string(a_iRef)] = a_obj
  end if
end
on SetModal me, a_bModal
  m_bSetmodal = a_bModal
end
on DisplayGiftMessage me, tMsg
  t_mp_GiftData = [:]
  t_mp_GiftData.addProp(#invId, tMsg.connection.GetIntFrom())
  t_iRef = tMsg.connection.GetIntFrom()
  t_mp_GiftData.addProp(#editable, tMsg.connection.GetIntFrom())
  t_mp_GiftData.addProp(#backgroundCode, tMsg.connection.GetIntFrom())
  t_mp_GiftData.addProp(#headline, tMsg.connection.GetStrFrom())
  t_mp_GiftData.addProp(#GiftText, tMsg.connection.GetStrFrom())
  t_mp_GiftData.addProp(#Sender, tMsg.connection.GetStrFrom())
  t_mp_GiftData.addProp(#date, tMsg.connection.GetStrFrom())
  t_iPos = m_mp_GiftObjects.findPos(string(t_iRef))
  if t_iPos > 0 then
    t_Obj = m_mp_GiftObjects[t_iPos]
  end if
  if objectExists("Gift" & t_iRef) then
    removeObject("Gift" & t_iRef)
    t_Obj = createObject("Gift" & t_iRef, "CGiftInterface")
  else
    t_Obj = createObject("Gift" & t_iRef, "CGiftInterface")
  end if
  if objectp(t_Obj) then
    t_Obj.createGiftDialog(t_iRef, t_mp_GiftData, m_bSetmodal)
  end if
end
on leaveRoom me
  m_mp_GiftObjects = [:]
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2931, #DisplayGiftMessage)
  tCmds = [:]
  tCmds.setaProp("WriteGiftMessage", 931)
  tCmds.setaProp("ReadGiftMessage", 932)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end