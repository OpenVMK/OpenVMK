-- Script
property m_mp_objects
property m_sHandler
property m_mp_sObject
property m_ar_ar_objByType
property m_rRoomContext
property m_rCurrentTurn
property m_rNextTurn
property m_fTurnT
property m_fTurnPulse
property m_mp_participants
property m_iLastSubturn
property m_ar_turnBuffer
property m_bChecksumInvalid
property m_syncLostTime
property m_iSpeedUp
property m_iSubTurnSpacing
property m_iOwnerRef
property m_ar_rMyObjects
property m_MGEProcessAcc
property m_bDump
property m_rVelocityTable
property m_rQuickRandom
property m_rComponentToAngle
property m_rCollision
property m_iAllocationModel
property m_rObjectPool
property m_rHandler
property m_iLastMS

on construct me
  me.m_iAllocationModel = #simple
  me.m_rObjectPool = VOID
  me.m_rHandler = VOID
  me.m_mp_objects = propList()
  me.m_mp_objects.sort()
  me.m_sHandler = ["CMinigameHandlerPrototype"]
  me.m_mp_sObject = propList()
  me.m_ar_ar_objByType = []
  me.m_rRoomContext = VOID
  me.m_rCurrentTurn = VOID
  me.m_rNextTurn = VOID
  me.m_fTurnT = 0.0
  me.m_fTurnPulse = "??33333"
  me.m_iLastMS = 0
  me.m_iLastSubturn = 0
  me.m_ar_turnBuffer = []
  me.m_bChecksumInvalid = 0
  me.m_syncLostTime = 0.0
  me.m_iSpeedUp = 1
  me.m_iSubTurnSpacing = 100.0
  me.m_iOwnerRef = 0
  me.m_ar_rMyObjects = []
  me.m_MGEProcessAcc = 0
  me.m_bDump = 0
  createObject("MGEVelocityTable", "CVelocityTbl")
  me.m_rVelocityTable = getObject("MGEVelocityTable")
  createObject("MGEQuickRandom", "CIterateSeed")
  me.m_rQuickRandom = getObject("MGEQuickRandom")
  createObject("MGEComponentToAngle", "CComponentToAngle")
  me.m_rComponentToAngle = getObject("MGEComponentToAngle")
  createObject("MGECollisionRoutine", "CCollision")
  me.m_rCollision = getObject("MGECollisionRoutine")
  registerMessage(#SetMinigameHandler, me.getID(), #_SetMinigameHandler)
  registerMessage(#RegisterMinigameObject, me.getID(), #SetMinigameObject)
  registerMessage(#SendMinigameAction, me.getID(), #_SendMinigameAction)
  registerMessage(#SetMinigameOwnerRef, me.getID(), #_SetMinigameOwnerRef)
  registerMessage(#StartMinigameEngine, me.getID(), #StartMinigameEngine)
  registerMessage(#StopMinigameEngine, me.getID(), #StopMinigameEngine)
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  if not voidp(me.m_rObjectPool) then
    removeObject(me.m_rObjectPool.getID())
  end if
  if not voidp(me.m_rHandler) then
    removeObject(me.m_rHandler.getID())
  end if
  repeat with pObject in me.m_mp_objects
    me.m_rRoomContext._RemoveIndexed(pObject.GetParam("Reference"))
  end repeat
  me.m_mp_objects = propList()
  removeObject(me.m_rVelocityTable.getID())
  removeObject(me.m_rQuickRandom.getID())
  removeObject(me.m_rComponentToAngle.getID())
  removeObject(me.m_rCollision.getID())
  unregisterMessage(#RegisterMinigameHandler, me.getID())
  unregisterMessage(#RegisterMinigameObject, me.getID())
  unregisterMessage(#SendMinigameAction, me.getID())
  unregisterMessage(#SetMinigameOwnerRef, me.getID())
  unregisterMessage(#StartMinigameEngine, me.getID())
  unregisterMessage(#StopMinigameEngine, me.getID())
  removeUpdate(me.getID())
  return 1
end
on StartMinigameEngine me
  me.m_rRoomContext = getObject(#room_component)._AccessRoom()
  me.m_fTurnT = 0.0
  me.m_iLastMS = the milliSeconds
  me.m_iLastSubturn = -1
  initIntVector()
end
on StopMinigameEngine me
  repeat with tObject in me.m_mp_objects
    me.m_rRoomContext._RemoveIndexed(tObject.GetParam("Reference"))
  end repeat
  me.m_mp_objects = propList()
  me.m_ar_rMyObjects = []
  me.m_rRoomContext = VOID
  me.m_fTurnT = 0.0
  me.m_iLastMS = the milliSeconds
  me.m_iLastSubturn = -1
  me._ClearCurrentTurn()
  me._ClearTurnBuffer()
end
on _SetMinigameHandler me, i_sClass
  me.m_sHandler = i_sClass
  createObject("MGEHandler", "CMinigameHandlerPrototype", me.m_sHandler)
  me.m_rHandler = getObject("MGEHandler")
  me.m_rHandler.SetSyncState(1)
end
on SetMinigameObject me, i_iObjectCode, i_sClass
  me.m_mp_sObject.setaProp(i_iObjectCode, i_sClass)
  me.m_ar_ar_objByType[i_iObjectCode] = []
end
on _CreateObject me, i_params, i_sName
  if me.m_mp_objects.getaProp(i_sName[#ref]) = VOID then
    tObject = me._MinigameCreateObject(i_params, i_sName)
    me.m_mp_objects.addProp(i_sName[#ref], tObject)
    if me.m_mp_objects.count = 1 then
      me.m_mp_objects.sort()
    end if
    me.m_ar_ar_objByType[i_sName[#type]].append(tObject)
  end if
end
on _CreateMyObject me, i_params, i_sName
  if me.m_mp_objects.getaProp(i_sName[#ref]) = VOID then
    tObject = me._MinigameCreateObject(i_params, i_sName)
    me.m_mp_objects.addProp(i_sName[#ref], tObject)
    if me.m_mp_objects.count = 1 then
      me.m_mp_objects.sort()
    end if
    me.m_ar_rMyObjects.append(tObject)
    me.m_ar_ar_objByType[i_sName[#type]].append(tObject)
  end if
end
on _MinigameUpdateObject me, i_ref, i_sName
  if not voidp(me.m_rRoomContext) then
    tObject = me.m_mp_objects.getaProp(i_ref)
    tObject.SetParam("Owner", i_sName[#owner])
    tObject.SetParam("Team", i_sName[#team])
    tObject.SetParam("WorldPosition", i_sName[#worldpos])
    tObject.SetParam("Direction", i_sName[#Dir])
    tObject.SetParam("GameParams", i_sName[#extra].duplicate())
    tObject.GetFactor().UpdateParameters(i_sName[#extra])
  end if
end
on _MinigameUpdateOrCreateObject me, i_ref, i_sName
  if not voidp(me.m_rRoomContext) then
    tObject = me.m_mp_objects.getaProp(i_ref)
    if voidp(tObject) then
      me._CreateObject("MGO:" & i_sName[#ref], i_sName)
    else
      tObject.SetParam("Owner", i_sName[#owner])
      tObject.SetParam("Team", i_sName[#team])
      tObject.SetParam("WorldPosition", i_sName[#worldpos])
      tObject.SetParam("Direction", i_sName[#Dir])
      tObject.SetParam("GameParams", i_sName[#extra].duplicate())
      tObject.GetFactor().UpdateParameters(i_sName[#extra])
    end if
  end if
end
on _TestObjectListVsRefList me, i_ar_refList
  i = []
  repeat with tRef = 1 to me.m_mp_objects.count
    tListRef = me.m_mp_objects.getPropAt(tRef)
    tIsThere = 0
    repeat with t_ar_tobedeleted in i_ar_refList
      if t_ar_tobedeleted = tListRef then
        tIsThere = 1
      end if
    end repeat
    if not tIsThere then
      i.append(tListRef)
    end if
  end repeat
  repeat with tListRef in i
    me._MinigameDeleteObject(tListRef)
  end repeat
end
on _MinigameJoin me
  if not voidp(me.m_rRoomContext) then
    me.m_rHandler.OnJoin()
  end if
end
on _MinigameLeave me
  if not voidp(me.m_rRoomContext) then
    me.m_rHandler.OnLeave()
  end if
end
on _MinigameStart me
  if not voidp(me.m_rRoomContext) then
    me.m_rHandler.onStart()
  end if
end
on _MinigameEnd me
  if not voidp(me.m_rRoomContext) then
    me.m_rHandler.onEnd()
  end if
end
on _PrepareRoom me, tRoomCode
  me.m_rHandler.OnPrepareRoom()
end
on _TestCollision me, i_rObject2, i_rObject1
  return the m_rCollision of me.testForObjectToObjectCollision(i_rObject2, i_rObject1)
end
on _SetChecksumValid me
  me.m_bChecksumInvalid = 0
end
on _SetMinigameOwnerRef me, i_iRef
  me.m_iOwnerRef = i_iRef
end
on _SetSimpleAllocationModel me
  me.m_iAllocationModel = #simple
  if not voidp(me.m_rObjectPool) then
    removeObject(me.m_rObjectPool.getID())
    me.m_rObjectPool = VOID
  end if
end
on _SetPooledAllocationModel me
  if voidp(me.m_rObjectPool) then
    me.m_rObjectPool = createObject("MGEObjectPool", "CRoomObjectManager")
  end if
  me.m_iAllocationModel = #pooled
end
on _SetParticipantList me, a_mp_List
  me.m_mp_participants = a_mp_List.duplicate()
end
on _SetTurnPulse me, a_fPulse
  me.m_fTurnPulse = a_fPulse
end
on GetParticipantlist me
  return the m_mp_participants of me
end
on GetMyObjects me
  return the m_ar_rMyObjects of me
end
on GetAllObjects me
  return the m_mp_objects of me
end
on GetObjectsByCode me, i_iX
  return the m_ar_ar_objByType of me[i_iX]
end
on GetMGObject me, i_iRef
  return the m_mp_objects of me.getaProp(i_iRef)
end
on GetMinigameHandler me
  return the m_rHandler of me
end
on GetVelocityTable me
  return the m_rVelocityTable of me
end
on GetQuickRandom me
  return the m_rQuickRandom of me
end
on GetComponentToAngle me
  return the m_rComponentToAngle of me
end
on GetTurnNumber me
  return the m_rCurrentTurn of me.GetNumber()
end
on GetSubturnSpacing me
  return 1.5349999666214
end
on GetObjectPool me
  if me.m_iAllocationModel = #pooled then
    return the m_rObjectPool of me
  else
    return VOID
  end if
end
on getSyncState me
  return 1
end
on _MinigameDeleteObject me, i_iRef
  if not voidp(me.m_rRoomContext) then
    tObject = me.m_mp_objects.getaProp(i_iRef)
    if not voidp(tObject) then
      me.m_ar_ar_objByType[tObject.GetParam("ObjectCode")].deleteOne(tObject)
      me.m_ar_rMyObjects.deleteOne(tObject)
      if me.m_iAllocationModel = #simple then
        if not voidp(tObject) then
          me.m_rRoomContext._RemoveIndexed(tObject.GetParam("Reference"), me.m_mp_sObject.getaProp(tObject.GetParam("ObjectCode")))
          me.m_ar_rMyObjects.deleteOne(tObject)
        else
          error(me, "Object to be removed from room context was not in the list")
        end if
      else
        if me.m_iAllocationModel = #pooled then
          me.m_rObjectPool.FreeObject(tObject)
        end if
      end if
      me.m_mp_objects.deleteProp(i_iRef)
    else
      error(me, "Object to be removed from room context was not in the list")
    end if
  end if
end
on _MinigameCreateObject me, i_params, i_sName
  if not voidp(me.m_rRoomContext) then
    if me.m_iAllocationModel = #simple then
      t_rXML = CreateXML()
      t_rXML.open(getMember("empty.node.xml").text)
      t_rXML.Search("type", "NODE")
      t_rXML.SetParam("REF", i_sName.ref)
      t_rXML.SetParam("CLASS", me.m_mp_sObject.getaProp(i_sName.type))
      me.m_rRoomContext._CreateIndexed(i_sName.ref, me.m_mp_sObject.getaProp(i_sName.type), t_rXML)
      tFactor = me.m_rRoomContext._AccessIndexed(i_sName.ref, me.m_mp_sObject.getaProp(i_sName.type))
    else
      if me.m_iAllocationModel = #pooled then
        tFactor = me.m_rObjectPool.newObject(me.m_mp_sObject.getaProp(i_sName.type))
      end if
    end if
    tNewObject = tFactor.GetFactor()
    if voidp(tFactor) then
      error(me, "FATAL ERROR : Minigame object create unsuccessful", #_MinigameCreateObject)
    else
      tFactor.SetParam("Reference", i_sName.ref)
      tFactor.SetParam("Owner", i_sName.owner)
      tFactor.SetParam("Team", i_sName.team)
      tFactor.SetParam("WorldPosition", i_sName.worldpos)
      tFactor.SetParam("Direction", i_sName.Dir)
      tFactor.SetParam("ObjectCode", i_sName.type)
      tFactor.SetParam("GameParams", i_sName.extra.duplicate())
      tFactor.SetParam("BoundsType", #point)
      call(#SetConstants, [tNewObject])
    end if
    return tFactor
  end if
end
on _TurnBufferState me
  if me.m_ar_turnBuffer.count > 1 then
    return #overfill
  end if
  if me.m_ar_turnBuffer.count = 1 then
    return #ready
  end if
  if me.m_ar_turnBuffer.count = 0 then
    return #empty
  end if
end
on _AdvanceTurn me
  me._ClearCurrentTurn()
  if me._TurnBufferState() <> #ready then
    if me._TurnBufferState() = #overfill then
      me.m_rCurrentTurn = me.m_ar_turnBuffer[1]
      me.m_ar_turnBuffer.deleteAt(1)
      me.m_fTurnT = 0.0
    else
      if me._TurnBufferState() = #empty then
        me.m_iSpeedUp = 1
        me.m_rCurrentTurn = VOID
        if me.m_bDump then
          put "MGEngine: No turns in buffer. Speedup off"
        end if
      end if
    end if
  end if
  me.m_iLastSubturn = 0
  me.m_fTurnT = 0.0
end
on _AddTurnToBuffer me, i_rTurn
  if voidp(me.m_rCurrentTurn) then
    if me.m_bDump then
      put "MGEngine: Turn sync gained after" && me.m_syncLostTime && "seconds."
    else
      if me.m_bDump then
        put "MGEngine: Extra turn in buffer"
      end if
    end if
  end if
  me.m_ar_turnBuffer.append(i_rTurn)
end
on _ClearTurnBuffer me
  repeat with tTurn in me.m_ar_turnBuffer
    if not voidp(tTurn) then
      removeObject(tTurn.getID())
    end if
  end repeat
  me.m_ar_turnBuffer = []
end
on _ClearCurrentTurn me
  if not voidp(me.m_rCurrentTurn) then
    removeObject(me.m_rCurrentTurn.getID())
  end if
  me.m_rCurrentTurn = VOID
end
on _SendMinigameAction me, i_ar_iData, i_iAction
  tMsg = propList()
  tMsg.addProp(#integer, integer(i_iAction.count + 1))
  tMsg.addProp(#integer, integer(i_ar_iData))
  repeat with tdata in i_iAction
    tMsg.addProp(#integer, integer(tdata))
  end repeat
  me.getHandler()._SendAction(tMsg)
end
on floor i_fVal
  tInteger = integer(i_fVal)
  if tInteger > i_fVal then
    return float(tInteger - 1)
  else
    return float(tInteger)
  end if
end
on ProcessSubturn me, i_iSubturn
  t_ar_iData = the milliSeconds
  me.m_rHandler.SetSyncState(1)
  if i_iSubturn <= me.m_rCurrentTurn.GetNSubTurns() then
    t_ar_Events = me.m_rCurrentTurn.GetSubTurn(i_iSubturn)
    repeat with tEvent in t_ar_Events
      t_iEvent = tEvent[1]
      tt = []
      if tEvent.count > 1 then
        repeat with tRef = 2 to tEvent.count
          tt.append(tEvent[tRef])
        end repeat
      end if
      me.m_rHandler.OnEvent(t_iEvent, tt)
    end repeat
  end if
  repeat with tObject in me.m_mp_objects
    tObject.GetFactor().move()
  end repeat
  me.m_MGEProcessAcc = me.m_MGEProcessAcc + (the milliSeconds - t_ar_iData)
end
on update me
  g_profMGEProcess = the milliSeconds
  me.m_MGEProcessAcc = 0
  if not voidp(me.m_rRoomContext) then
    g_profMGEngine = (g_profMGEProcess - me.m_iLastMS) / 1000.0
    me.m_iLastMS = g_profMGEProcess
    if not voidp(me.m_rCurrentTurn) then
      if not me.m_rCurrentTurn.GetTested() then
        me._MinigameTestChecksum(me.m_rCurrentTurn.GetChecksum())
        me.m_rCurrentTurn.SetTested(1)
      end if
      me.m_syncLostTime = 0.0
      if me._TurnBufferState() = #overfill then
        me.m_iSpeedUp = me.m_ar_turnBuffer.count / 1.5
        if me.m_bDump then
          put "MGEngine: speedup on"
        end if
      end if
      me.m_fTurnT = me.m_fTurnT + g_profMGEngine
      tSubturn = me.m_fTurnPulse / me.m_rCurrentTurn.GetNSubTurns()
      me.m_iSubTurnSpacing = tSubturn * (1.0 / me.m_iSpeedUp)
      tSubturn = me.m_iSubTurnSpacing
      tSubturnSpacing = integer(floor(me.m_fTurnT / tSubturn)) + 1
      if tSubturnSpacing > me.m_rCurrentTurn.GetNSubTurns() then
        tSubturnSpacing = me.m_rCurrentTurn.GetNSubTurns()
      end if
      if me.m_bDump then
        put "SubTurnSpacing :" && tSubturn && "ms, buffer size :" && me.m_ar_turnBuffer.count
      end if
      if tSubturnSpacing <> me.m_iLastSubturn then
        if tSubturnSpacing - 1 <> me.m_iLastSubturn then
          tTurnsToDo = tSubturnSpacing - 1 - me.m_iLastSubturn
          repeat with tFrameRateEnough = tSubturnSpacing - tTurnsToDo to tSubturnSpacing - 1
            me.ProcessSubturn(tFrameRateEnough)
          end repeat
        end if
        if me.m_bDump then
          put "SubTurnN :" & tSubturnSpacing
        end if
        me.ProcessSubturn(tSubturnSpacing)
        me.m_iLastSubturn = tSubturnSpacing
      end if
    else
      me.m_rHandler.SetSyncState(1)
      me.m_syncLostTime = me.m_syncLostTime + g_profMGEngine
    end if
    missedTurn = 1
    if g_profMGEngine > me.m_fTurnPulse then
      if me.m_bDump then
        put "MGEngine: frame rate too slow!!!"
      end if
      missedTurn = 0
    end if
    if me.turnDone() or not missedTurn then
      if not voidp(me.m_rCurrentTurn) then
        if tSubturnSpacing < me.m_rCurrentTurn.GetNSubTurns() then
          tMissedCount = me.m_rCurrentTurn.GetNSubTurns() - tSubturnSpacing
          repeat with tFrameRateEnough = me.m_rCurrentTurn.GetNSubTurns() - tMissedCount + 1 to me.m_rCurrentTurn.GetNSubTurns()
            me.ProcessSubturn(tFrameRateEnough)
          end repeat
        end if
      end if
      if not missedTurn then
        repeat with tTime = 1 to me.m_ar_turnBuffer.count - 1
          me._AdvanceTurn()
          repeat with tSubturnSpacing = 1 to me.m_rCurrentTurn.GetNSubTurns()
            me.ProcessSubturn(tSubturnSpacing)
          end repeat
        end repeat
      end if
      me._AdvanceTurn()
    end if
  end if
  t = the milliSeconds - g_profMGEProcess
  dt = me.m_MGEProcessAcc
end
on turnDone me
  tPulse = me.m_fTurnPulse * (1.0 / me.m_iSpeedUp)
  return the m_fTurnT of me >= tPulse or voidp(the m_rCurrentTurn of me)
end
on _MinigameTestChecksum me, i_iChecksum
  if not voidp(me.m_rRoomContext) or me.m_bChecksumInvalid then
    tDump = me.calculateChecksum()
    if me.m_bDump then
      put "Checksum:" && tDump && "vs." && i_iChecksum
    end if
    if i_iChecksum <> tDump then
      put "MGEngine: Checksum mismatch"
      tMyChecksum = me.m_bDump
      me.m_bDump = 0
      if me.m_bDump then
        put "START"
        put "Turn was " & me.m_syncLostTime & " seconds late."
        me.PrintEvents(me.m_rCurrentTurn)
        me.calculateChecksum()
        put "END"
      end if
      me.m_bDump = tMyChecksum
      me._SendMinigameAction(3, [])
      me.m_bChecksumInvalid = 1
      me.m_rHandler.SetSyncState(1)
    end if
  end if
end
on calculateChecksum me
  if not voidp(me.m_rCurrentTurn) then
    if me.m_bDump then
      put "turn" && me.m_rCurrentTurn.GetNumber()
    end if
    checksum = me.m_rQuickRandom.IterateSeed(me.m_rCurrentTurn.GetNumber())
    if me.m_bDump then
      put "seed" && checksum
      tRef = 1
    end if
    repeat with vPos in me.m_mp_objects
      counter = EMPTY
      tDumpStr = 1
      checksum = checksum + vPos.GetParam("ObjectCode") * tDumpStr
      if me.m_bDump then
        counter = counter & vPos.GetParam("ObjectCode")
      end if
      tDumpStr = tDumpStr + 1
      checksum = checksum + vPos.GetParam("Reference") * tDumpStr
      if me.m_bDump then
        counter = counter & "," & vPos.GetParam("Reference")
      end if
      tDumpStr = tDumpStr + 1
      checksum = checksum + vPos.GetParam("Owner") * tDumpStr
      if me.m_bDump then
        counter = counter & "," & vPos.GetParam("Owner")
      end if
      tDumpStr = tDumpStr + 1
      checksum = checksum + vPos.GetParam("Team") * tDumpStr
      if me.m_bDump then
        counter = counter & "," & vPos.GetParam("Team")
      end if
      tDumpStr = tDumpStr + 1
      Iterator = vPos.GetParam("WorldPosition")
      checksum = checksum + integer(Iterator.x) * tDumpStr
      if me.m_bDump then
        counter = counter & "," & integer(Iterator.x)
      end if
      tDumpStr = tDumpStr + 1
      checksum = checksum + integer(Iterator.y) * tDumpStr
      if me.m_bDump then
        counter = counter & "," & integer(Iterator.y)
      end if
      tDumpStr = tDumpStr + 1
      checksum = checksum + integer(Iterator.z) * tDumpStr
      if me.m_bDump then
        counter = counter & "," & integer(Iterator.z)
      end if
      tDumpStr = tDumpStr + 1
      checksum = checksum + integer(vPos.GetParam("Direction")) * tDumpStr
      if me.m_bDump then
        counter = counter & "," & integer(vPos.GetParam("Direction"))
      end if
      tDumpStr = tDumpStr + 1
      tInt = vPos.GetParam("GameParams")
      if not voidp(tInt) then
        repeat with tGameParams in tInt
          checksum = checksum + integer(tGameParams) * tDumpStr
          if me.m_bDump then
            counter = counter & "," & integer(tGameParams)
          end if
          tDumpStr = tDumpStr + 1
        end repeat
      end if
      if me.m_bDump then
        put "O" & tRef & "-CS:" & checksum && "Parms:" & counter
        tRef = tRef + 1
      end if
    end repeat
    return checksum
  end if
end
on PrintEvents me, i_turn
  repeat with tRef = 1 to i_turn.GetNSubTurns()
    t_ar_Events = i_turn.GetSubTurn(tRef)
    repeat with tEvent in t_ar_Events
      put "SubTurn : " & tRef
      t_iEvent = tEvent[1]
      tt = []
      repeat with j = 2 to tEvent.count
        tt.append(tEvent[j])
      end repeat
      put "Event:" && t_iEvent && "Data:" && tt
    end repeat
  end repeat
end
on _LoadStage me, i_params, i_ar_params, i_iVersion
  me.m_rHandler.OnLoadStage(i_params, i_ar_params, i_iVersion)
end
on _StartStage me, i_iTimeToStart
  me.m_rHandler.OnStartStage(i_iTimeToStart)
end
on _EndStage me, i_iTimeToStart, i_iVersion
  me.m_rHandler.OnEndStage(i_iTimeToStart, i_iVersion)
end
on _GameInfoUpdate me, a_rInput
  me.m_rHandler.OnGameInfoUpdate(a_rInput)
end