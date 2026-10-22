-- Score Script
property m_rXMLElement
property m_rXMLAvatar
property m_rXMLFloor

on construct this
  this.regMsgList(1)
  return 1
end
on deconstruct this
  this.regMsgList(0)
  return 1
end
on _GameStatusUpdate this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iTurn = t_rInput.GetIntFrom()
  t_iChecksum = t_rInput.GetIntFrom()
  t_iNTurns = t_rInput.GetIntFrom()
  if memberExists("CTurnContainer") then
    t_turn = createObject(#random, "CTurnContainer")
    t_turn.SetNumber(t_iTurn)
    t_turn.SetChecksum(t_iChecksum)
    repeat with i = 1 to t_iNTurns
      t_iNEvents = t_rInput.GetIntFrom()
      repeat with j = 1 to t_iNEvents
        t_iCount = t_rInput.GetIntFrom()
        t_ar_event = []
        repeat with n = 1 to t_iCount
          t_ar_event.append(t_rInput.GetIntFrom())
        end repeat
        t_turn.AddElement(i, t_ar_event.duplicate())
      end repeat
      if t_iNEvents = 0 then
        t_turn.AddElement(i, VOID)
      end if
    end repeat
    this.getComponent()._AddTurnToBuffer(t_turn)
  end if
end
on _GameCreateObject this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iCount = t_rInput.GetIntFrom()
  t_iType = t_rInput.GetIntFrom()
  t_iRef = t_rInput.GetIntFrom()
  t_iOwner = t_rInput.GetIntFrom()
  t_iTeam = t_rInput.GetIntFrom()
  t_xWorld = t_rInput.GetIntFrom()
  t_yWorld = t_rInput.GetIntFrom()
  t_zWorld = t_rInput.GetIntFrom()
  t_iDir = t_rInput.GetIntFrom()
  t_iExtraParams = []
  if t_iCount > 8 then
    repeat with i = 9 to t_iCount
      t_iExtraParams.append(t_rInput.GetIntFrom())
    end repeat
  end if
  t_rPos = intvector(t_xWorld, t_yWorld, t_zWorld)
  tParams = [:]
  tParams.setaProp(#ref, t_iRef)
  tParams.setaProp(#owner, t_iOwner)
  tParams.setaProp(#team, t_iTeam)
  tParams.setaProp(#worldpos, t_rPos)
  tParams.setaProp(#Dir, t_iDir)
  tParams.setaProp(#type, t_iType)
  tParams.setaProp(#extra, t_iExtraParams)
  this.getComponent()._CreateObject(t_iRef, tParams)
end
on _GameUpdateObject this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iCount = t_rInput.GetIntFrom()
  t_iType = t_rInput.GetIntFrom()
  t_iRef = t_rInput.GetIntFrom()
  t_iOwner = t_rInput.GetIntFrom()
  t_iTeam = t_rInput.GetIntFrom()
  t_xWorld = t_rInput.GetIntFrom()
  t_yWorld = t_rInput.GetIntFrom()
  t_zWorld = t_rInput.GetIntFrom()
  t_iDir = t_rInput.GetIntFrom()
  t_iExtraParams = []
  if t_iCount > 8 then
    repeat with i = 9 to t_iCount
      t_iExtraParams.append(t_rInput.GetIntFrom())
    end repeat
  end if
  tParams = [#ref: t_iRef, #owner: t_iOwner, #team: 3, t_iTeam: #worldpos, intvector(t_xWorld, t_yWorld, t_zWorld): #Dir, t_iDir: #extra, t_iExtraParams: ]
  this.getComponent()._MinigameUpdateObject(t_iRef, tParams)
end
on _GameDeleteObject this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iRef = t_rInput.GetIntFrom()
  this.getComponent()._MinigameDeleteObject(t_iRef)
end
on _GameObjectsList this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iCountObjects = t_rInput.GetIntFrom()
  repeat with i = 1 to t_iCountObjects
    t_iCount = t_rInput.GetIntFrom()
    t_iType = t_rInput.GetIntFrom()
    t_iRef = t_rInput.GetIntFrom()
    t_iOwner = t_rInput.GetIntFrom()
    t_iTeam = t_rInput.GetIntFrom()
    t_xWorld = t_rInput.GetIntFrom()
    t_yWorld = t_rInput.GetIntFrom()
    t_zWorld = t_rInput.GetIntFrom()
    t_iDir = t_rInput.GetIntFrom()
    t_iExtraParams = []
    if t_iCount > 8 then
      repeat with j = 9 to t_iCount
        t_iExtraParams.append(t_rInput.GetIntFrom())
      end repeat
    end if
    t_rPos = intvector(t_xWorld, t_yWorld, t_zWorld)
    tParams = [:]
    tParams.setaProp(#ref, t_iRef)
    tParams.setaProp(#owner, t_iOwner)
    tParams.setaProp(#team, t_iTeam)
    tParams.setaProp(#worldpos, t_rPos)
    tParams.setaProp(#Dir, t_iDir)
    tParams.setaProp(#type, t_iType)
    tParams.setaProp(#extra, t_iExtraParams)
    this.getComponent()._CreateObject(t_iRef, tParams)
  end repeat
end
on _GameLoadStage this, a_rMsg
  t_rInput = a_rMsg.connection
  t_sStage = t_rInput.GetStrFrom()
  t_iVersion = t_rInput.GetIntFrom()
  t_iParamCount = t_rInput.GetIntFrom()
  t_ar_Params = [:]
  repeat with j = 1 to t_iParamCount
    t_sKey = t_rInput.GetStrFrom()
    t_sValue = t_rInput.GetStrFrom()
    case t_sKey of
      "intarray":
        t_ar_intarray = []
        repeat with i = 1 to integer(t_sValue)
          t_ar_intarray.append(t_rInput.GetIntFrom())
        end repeat
        t_ar_Params.addProp(t_sKey, t_ar_intarray)
      otherwise:
        t_ar_Params.addProp(t_sKey, t_sValue)

    end case
  end repeat
  this.getComponent()._LoadStage(t_sStage, t_iVersion, t_ar_Params)
end
on _GameFullStatusUpdate this, a_rMsg
  t_ar_refList = []
  t_rInput = a_rMsg.connection
  t_iObjectCount = t_rInput.GetIntFrom()
  repeat with o = 1 to t_iObjectCount
    t_rInput = a_rMsg.connection
    t_iCount = t_rInput.GetIntFrom()
    t_iType = t_rInput.GetIntFrom()
    t_iRef = t_rInput.GetIntFrom()
    t_iOwner = t_rInput.GetIntFrom()
    t_iTeam = t_rInput.GetIntFrom()
    t_xWorld = t_rInput.GetIntFrom()
    t_yWorld = t_rInput.GetIntFrom()
    t_zWorld = t_rInput.GetIntFrom()
    t_iDir = t_rInput.GetIntFrom()
    t_iExtraParams = []
    if t_iCount > 8 then
      repeat with i = 9 to t_iCount
        t_iExtraParams.append(t_rInput.GetIntFrom())
      end repeat
    end if
    t_rPos = intvector(t_xWorld, t_yWorld, t_zWorld)
    tParams = [:]
    tParams.setaProp(#ref, t_iRef)
    tParams.setaProp(#owner, t_iOwner)
    tParams.setaProp(#team, t_iTeam)
    tParams.setaProp(#worldpos, t_rPos)
    tParams.setaProp(#Dir, t_iDir)
    tParams.setaProp(#type, t_iType)
    tParams.setaProp(#extra, t_iExtraParams)
    this.getComponent()._MinigameUpdateOrCreateObject(t_iRef, tParams)
    t_ar_refList.append(t_iRef)
  end repeat
  this.getComponent()._TestObjectListVsRefList(t_ar_refList)
  this.getComponent()._SetChecksumValid()
  this.getComponent()._ClearTurnBuffer()
  this.getComponent()._ClearCurrentTurn()
  t_iTurn = t_rInput.GetIntFrom()
  t_iChecksum = t_rInput.GetIntFrom()
  t_iNTurns = t_rInput.GetIntFrom()
  t_turn = createObject(#random, "CTurnContainer")
  t_turn.SetNumber(t_iTurn)
  t_turn.SetChecksum(t_iChecksum)
  repeat with i = 1 to t_iNTurns
    t_iNEvents = t_rInput.GetIntFrom()
    repeat with j = 1 to t_iNEvents
      t_iCount = t_rInput.GetIntFrom()
      t_ar_event = []
      repeat with n = 1 to t_iCount
        t_ar_event.append(t_rInput.GetIntFrom())
      end repeat
      t_turn.AddElement(i, t_ar_event.duplicate())
    end repeat
    if t_iNEvents = 0 then
      t_turn.AddElement(i, VOID)
    end if
  end repeat
  this.getComponent()._AddTurnToBuffer(t_turn)
end
on _GameCreateMyObject this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iCount = t_rInput.GetIntFrom()
  t_iType = t_rInput.GetIntFrom()
  t_iRef = t_rInput.GetIntFrom()
  t_iOwner = t_rInput.GetIntFrom()
  t_iTeam = t_rInput.GetIntFrom()
  t_xWorld = t_rInput.GetIntFrom()
  t_yWorld = t_rInput.GetIntFrom()
  t_zWorld = t_rInput.GetIntFrom()
  t_iDir = t_rInput.GetIntFrom()
  t_iExtraParams = []
  if t_iCount > 8 then
    repeat with i = 9 to t_iCount
      t_iExtraParams.append(t_rInput.GetIntFrom())
    end repeat
  end if
  t_rPos = intvector(t_xWorld, t_yWorld, t_zWorld)
  tParams = [:]
  tParams.setaProp(#ref, t_iRef)
  tParams.setaProp(#owner, t_iOwner)
  tParams.setaProp(#team, t_iTeam)
  tParams.setaProp(#worldpos, t_rPos)
  tParams.setaProp(#Dir, t_iDir)
  tParams.setaProp(#type, t_iType)
  tParams.setaProp(#extra, t_iExtraParams)
  this.getComponent()._CreateMyObject(t_iRef, tParams)
end
on _GameStartStage this, a_rMsg
  t_rInput = a_rMsg.connection
  tTimeToStart = t_rInput.GetIntFrom()
  this.getComponent()._StartStage(tTimeToStart)
end
on _GameEndStage this, a_rMsg
  t_rInput = a_rMsg.connection
  tTimeToStart = t_rInput.GetIntFrom()
  tParamCount = t_rInput.GetIntFrom()
  t_ar_Params = []
  repeat with i = 1 to tParamCount
    t_ar_Params.append(t_rInput.GetIntFrom())
  end repeat
  this.getComponent()._EndStage(tTimeToStart, t_ar_Params)
end
on _GamePrepareRoom this, a_rMsg
  t_rInput = a_rMsg.connection
  tRoomCode = t_rInput.GetIntFrom()
  this.getComponent()._PrepareRoom(tRoomCode)
end
on _GameParticipantList this, a_rMsg
  t_rInput = a_rMsg.connection
  t_iCount = t_rInput.GetIntFrom()
  tList = [:]
  repeat with i = 1 to t_iCount
    tAvatarRef = t_rInput.GetIntFrom()
    tAvatarName = t_rInput.GetStrFrom()
    t_AvatarFigureList = []
    if getThread("fireworks") <> 0 then
      t_iFigureListCount = t_rInput.GetIntFrom()
      repeat with j = 1 to t_iFigureListCount
        t_iFigureData = t_rInput.GetIntFrom()
        t_AvatarFigureList.append(t_iFigureData)
      end repeat
    end if
    tList.addProp(tAvatarRef, [#name: tAvatarName, #figuredata: t_AvatarFigureList])
  end repeat
  this.getComponent()._SetParticipantList(tList)
end
on _GameInfoUpdate this, a_rMsg
  t_rInput = a_rMsg.connection
  this.getComponent()._GameInfoUpdate(t_rInput)
end
on _SendAction this, a_mp_Msg
  tConnection = getConnection(getVariable("main.connection.id", "VMK"))
  if tConnection <> 0 then
    tConnection.send(601, a_mp_Msg)
  end if
end
on _SendStageLoaded this
  tConnection = getConnection(getVariable("main.connection.id", "VMK"))
  if tConnection <> 0 then
    tConnection.send(602)
  end if
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2601, #_GameStatusUpdate)
  tMsgs.setaProp(2602, #_GameCreateObject)
  tMsgs.setaProp(2603, #_GameUpdateObject)
  tMsgs.setaProp(2604, #_GameDeleteObject)
  tMsgs.setaProp(2605, #_GameObjectsList)
  tMsgs.setaProp(2607, #_GameLoadStage)
  tMsgs.setaProp(2609, #_GameFullStatusUpdate)
  tMsgs.setaProp(2610, #_GameCreateMyObject)
  tMsgs.setaProp(2611, #_GameStartStage)
  tMsgs.setaProp(2612, #_GameEndStage)
  tMsgs.setaProp(2613, #_GamePrepareRoom)
  tMsgs.setaProp(2614, #_GameParticipantList)
  tMsgs.setaProp(2615, #_GameInfoUpdate)
  tCmds = [:]
  tCmds.setaProp("action", 560)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end