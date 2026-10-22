-- Score Script
property m_rXMLElement
property m_rXMLAvatar
property m_rXMLFloor

on construct this
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2601, #_GameStatusUpdate)
  t_rList.setaProp(2602, #_GameCreateObject)
  t_rList.setaProp(2603, #_GameUpdateObject)
  t_rList.setaProp(2604, #_GameDeleteObject)
  t_rList.setaProp(2605, #_GameObjectsList)
  t_rList.setaProp(2607, #_GameLoadStage)
  t_rList.setaProp(2609, #_GameFullStatusUpdate)
  t_rList.setaProp(2610, #_GameCreateMyObject)
  t_rList.setaProp(2611, #_GameStartStage)
  t_rList.setaProp(2612, #_GameEndStage)
  t_rList.setaProp(2613, #_GamePrepareRoom)
  t_rList.setaProp(2614, #_GameParticipantList)
  registerListener(t_sID, this.getID(), t_rList)
  t_rList = [:]
  t_rList.setaProp("action", 560)
  registerCommands(t_sID, this.getID(), t_rList)
  return 1
end
on deconstruct this
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2601, #_GameStatusUpdate)
  t_rList.setaProp(2602, #_GameCreateObject)
  t_rList.setaProp(2603, #_GameUpdateObject)
  t_rList.setaProp(2604, #_GameDeleteObject)
  t_rList.setaProp(2605, #_GameObjectsList)
  t_rList.setaProp(2607, #_GameLoadStage)
  t_rList.setaProp(2609, #_GameFullStatusUpdate)
  t_rList.setaProp(2610, #_GameCreateMyObject)
  t_rList.setaProp(2611, #_GameStartStage)
  t_rList.setaProp(2612, #_GameEndStage)
  t_rList.setaProp(2613, #_GamePrepareRoom)
  t_rList.setaProp(2614, #_GameParticipantList)
  unregisterListener(t_sID, this.getID(), t_rList)
  t_rList = [:]
  t_rList.setaProp("action", 560)
  unregisterCommands(t_sID, this.getID(), t_rList)
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
  tPos = intvector(t_xWorld, t_yWorld, t_zWorld)
  tParams = [:]
  tParams.setaProp(#ref, t_iRef)
  tParams.setaProp(#owner, t_iOwner)
  tParams.setaProp(#team, t_iTeam)
  tParams.setaProp(#worldpos, tPos)
  tParams.setaProp(#dir, t_iDir)
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
  tParams = [#ref: t_iRef, #owner: t_iOwner, #team: 3, t_iTeam: #worldpos, intvector(t_xWorld, t_yWorld, t_zWorld): #dir, t_iDir: #extra, t_iExtraParams: ]
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
  put "MGEngine: GameObject list contains" && t_iCountObjects && "objects."
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
    tPos = intvector(t_xWorld, t_yWorld, t_zWorld)
    tParams = [:]
    tParams.setaProp(#ref, t_iRef)
    tParams.setaProp(#owner, t_iOwner)
    tParams.setaProp(#team, t_iTeam)
    tParams.setaProp(#worldpos, tPos)
    tParams.setaProp(#dir, t_iDir)
    tParams.setaProp(#type, t_iType)
    tParams.setaProp(#extra, t_iExtraParams)
    this.getComponent()._CreateObject(t_iRef, tParams)
  end repeat
end
on _GameLoadStage this, a_rMsg
  t_rInput = a_rMsg.connection
  t_sStage = t_rInput.GetStrFrom()
  t_iVersion = t_rInput.GetIntFrom()
  this.getComponent()._LoadStage(t_sStage, t_iVersion)
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
    tPos = intvector(t_xWorld, t_yWorld, t_zWorld)
    tParams = [:]
    tParams.setaProp(#ref, t_iRef)
    tParams.setaProp(#owner, t_iOwner)
    tParams.setaProp(#team, t_iTeam)
    tParams.setaProp(#worldpos, tPos)
    tParams.setaProp(#dir, t_iDir)
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
  tPos = intvector(t_xWorld, t_yWorld, t_zWorld)
  tParams = [:]
  tParams.setaProp(#ref, t_iRef)
  tParams.setaProp(#owner, t_iOwner)
  tParams.setaProp(#team, t_iTeam)
  tParams.setaProp(#worldpos, tPos)
  tParams.setaProp(#dir, t_iDir)
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
  t_ar_params = []
  repeat with i = 1 to tParamCount
    t_ar_params.append(t_rInput.GetIntFrom())
  end repeat
  this.getComponent()._EndStage(tTimeToStart, t_ar_params)
end
on _GamePrepareRoom this, a_rMsg
  t_rInput = a_rMsg.connection
  tRoomCode = t_rInput.GetIntFrom()
  this.getComponent()._PrepareRoom(tRoomCode)
end
on _GameParticipantList this, a_rMsg
  t_rInput = a_rMsg.connection
  tCount = t_rInput.GetIntFrom()
  tList = [:]
  repeat with i = 1 to tCount
    tAvatarRef = t_rInput.GetIntFrom()
    tAvatarName = t_rInput.GetStrFrom()
    tList.addProp(tAvatarRef, tAvatarName)
  end repeat
  this.getComponent()._SetParticipantList(tList)
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