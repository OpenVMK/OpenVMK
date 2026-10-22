-- Script
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2593, #HandleRoomEvent)
  t_rList.setaProp(2710, #handleNPCClicked)
  unregisterListener(t_sID, me.getID(), t_rList)
  me.regMsgList(0)
  return 1
end
on selectNPC me, npcRef
  tMsg = [#int: npcRef, #int: 0]
  getConnection("VMK").send(584, tMsg)
end
on handleNPCClicked me, tMsg
  tItemCode = tMsg.connection.GetIntFrom()
  tMessage = tMsg.connection.GetStrFrom()
  t = createNPCDialogWindow(me.getID(), "GatorWaiterNPCDialog", 1, 1)
  if t <> 0 then
    t_npcFoundMsg = getText("item.4009", "Gator Waiter") && "Found!"
    t.setText(tMessage, t_npcFoundMsg, "Gator_Waiter")
    t.show()
  end if
end
on _CreateElements this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iCount = t_rInput.GetIntFrom()
  repeat with i = 1 to t_iCount
    t_iRef = t_rInput.GetIntFrom()
    t_iTypeCode = t_rInput.GetIntFrom()
    t_iCategory = t_rInput.GetIntFrom()
    t_iPlaceRef = t_rInput.GetIntFrom()
    t_iAllowMove = t_rInput.GetIntFrom()
    t_iPrm = t_rInput.GetIntFrom()
    t_ar_iParams = []
    case t_iCategory of
      1, 5:
        t_iDir = t_rInput.GetIntFrom()
        t_iPrm = t_iPrm - 1
        if t_iPrm then
          t_iState = t_rInput.GetIntFrom()
          t_iPrm = t_iPrm - 1
        else
          t_iState = 0
        end if
        if t_iTypeCode = 4009 then
          return the interface of this.ControlGator(t_iDir, t_iState)
        end if
        if t_iPrm > 0 then
          t_ar_Params = []
          repeat with j = 1 to t_iPrm
            t_ar_Params.append(t_rInput.GetIntFrom())
          end repeat
        else
          t_ar_Params = VOID
        end if
      3:
        t_iPrm = t_iPrm - 3
        repeat with j = 1 to t_iPrm
          t_ar_iParams.add(t_rInput.GetIntFrom())
        end repeat
      6, 7:
        t_iDir = t_rInput.GetIntFrom()
        t_iPrm = t_iPrm - 1
        if t_iPrm then
          t_iState = t_rInput.GetIntFrom()
        else
          t_iState = 0
        end if
      otherwise:
        error(this, "Unsupported item category:" && t_iCategory, #_CreateElements)
        repeat with j = 1 to t_iPrm
          t_ar_iParams.add(t_rInput.GetIntFrom())
        end repeat

    end case
  end repeat
end
on elementUpdate this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iRef = t_rInput.GetIntFrom()
  t_iCategory = t_rInput.GetIntFrom()
  t_iPlaceRef = t_rInput.GetIntFrom()
  t_iAllowMove = t_rInput.GetIntFrom()
  t_iParamCnt = t_rInput.GetIntFrom()
  t_iNpcDir = t_rInput.GetIntFrom()
  t_iNpcAction = t_rInput.GetIntFrom()
  this.interface.ControlGator(t_iNpcDir, t_iNpcAction)
end
on regMsgList me, tBool
  t_sID = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2586, #_CreateElements)
  tMsgs.setaProp(2599, #elementUpdate)
  tMsgs.setaProp(2710, #handleNPCClicked)
  tCmds = [:]
  if tBool then
    registerListener(t_sID, me.getID(), tMsgs)
    registerCommands(t_sID, me.getID(), tCmds)
  else
    unregisterListener(t_sID, me.getID(), tMsgs)
    unregisterCommands(t_sID, me.getID(), tCmds)
  end if
end