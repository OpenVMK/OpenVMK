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
on _CreateObject me, i_sName, i_params
  if me.m_mp_objects.getaProp(i_params[#ref]) = VOID then
    tObject = me._MinigameCreateObject(i_sName, i_params)
    me.m_mp_objects.addProp(i_params[#ref], tObject)
    if me.m_mp_objects.count = 1 then
      me.m_mp_objects.sort()
    end if
    me.m_ar_ar_objByType[i_params[#type]].append(tObject)
  end if
end
on _CreateMyObject me, i_sName, i_params
  if me.m_mp_objects.getaProp(i_params[#ref]) = VOID then
    tObject = me._MinigameCreateObject(i_sName, i_params)
    me.m_mp_objects.addProp(i_params[#ref], tObject)
    if me.m_mp_objects.count = 1 then
      me.m_mp_objects.sort()
    end if
    me.m_ar_rMyObjects.append(tObject)
    me.m_ar_ar_objByType[i_params[#type]].append(tObject)
  end if
end
on _MinigameUpdateObject me, i_ref, i_params
  if not voidp(me.m_rRoomContext) then
    tObject = me.m_mp_objects.getaProp(i_ref)
    tObject.SetParam("Owner", i_params[#owner])
    tObject.SetParam("Team", i_params[#team])
    tObject.SetParam("WorldPosition", i_params[#worldpos])
    tObject.SetParam("Direction", i_params[#Dir])
    tObject.SetParam("GameParams", i_params[#extra].duplicate())
    tObject.GetFactor().UpdateParameters(i_params[#extra])
  end if
end
on _MinigameUpdateOrCreateObject me, i_ref, i_params
  if not voidp(me.m_rRoomContext) then
    tObject = me.m_mp_objects.getaProp(i_ref)
    if voidp(tObject) then
      me._CreateObject("MGO:" & i_params[#ref], i_params)
    else
      tObject.SetParam("Owner", i_params[#owner])
      tObject.SetParam("Team", i_params[#team])
      tObject.SetParam("WorldPosition", i_params[#worldpos])
      tObject.SetParam("Direction", i_params[#Dir])
      tObject.SetParam("GameParams", i_params[#extra].duplicate())
      tObject.GetFactor().UpdateParameters(i_params[#extra])
    end if
  end if
end
on _TestObjectListVsRefList me, i_ar_refList
  tRef = []
  repeat with tIsThere = 1 to me.m_mp_objects.count
    i = me.m_mp_objects.getPropAt(tIsThere)
    tListRef = 0
    repeat with t_ar_tobedeleted in i_ar_refList
      if t_ar_tobedeleted = i then
        tListRef = 1
      end if
    end repeat
    if not tListRef then
      tRef.append(i)
    end if
  end repeat
  repeat with i in tRef
    me._MinigameDeleteObject(i)
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
on _TestCollision me, i_rObject1, i_rObject2
  return the m_rCollision of me.testForObjectToObjectCollision(i_rObject1, i_rObject2)
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
on _MinigameCreateObject me, i_sName, i_params
  if not voidp(me.m_rRoomContext) then
    if me.m_iAllocationModel = #simple then
      tFactor = CreateXML()
      tFactor.open(getMember("empty.node.xml").text)
      tFactor.Search("type", "NODE")
      tFactor.SetParam("REF", i_params.ref)
      tFactor.SetParam("CLASS", me.m_mp_sObject.getaProp(i_params.type))
      me.m_rRoomContext._CreateIndexed(i_params.ref, me.m_mp_sObject.getaProp(i_params.type), tFactor)
      t_rXML = me.m_rRoomContext._AccessIndexed(i_params.ref, me.m_mp_sObject.getaProp(i_params.type))
    else
      if me.m_iAllocationModel = #pooled then
        t_rXML = me.m_rObjectPool.newObject(me.m_mp_sObject.getaProp(i_params.type))
      end if
    end if
    tNewObject = t_rXML.GetFactor()
    if voidp(t_rXML) then
      error(me, "FATAL ERROR : Minigame object create unsuccessful", #_MinigameCreateObject)
    else
      t_rXML.SetParam("Reference", i_params.ref)
      t_rXML.SetParam("Owner", i_params.owner)
      t_rXML.SetParam("Team", i_params.team)
      t_rXML.SetParam("WorldPosition", i_params.worldpos)
      t_rXML.SetParam("Direction", i_params.Dir)
      t_rXML.SetParam("ObjectCode", i_params.type)
      t_rXML.SetParam("GameParams", i_params.extra.duplicate())
      t_rXML.SetParam("BoundsType", #point)
      call(#SetConstants, [tNewObject])
    end if
    return t_rXML
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
on _SendMinigameAction me, i_iAction, i_ar_iData
  tMsg = propList()
  tMsg.addProp(#integer, integer(i_ar_iData.count + 1))
  tMsg.addProp(#integer, integer(i_iAction))
  repeat with tdata in i_ar_iData
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
  tt = the milliSeconds
  me.m_rHandler.SetSyncState(1)
  if i_iSubturn <= me.m_rCurrentTurn.GetNSubTurns() then
    tEvent = me.m_rCurrentTurn.GetSubTurn(i_iSubturn)
    repeat with t_ar_iData in tEvent
      t_ar_Events = t_ar_iData[1]
      t_iEvent = []
      if t_ar_iData.count > 1 then
        repeat with tIsThere = 2 to t_ar_iData.count
          t_iEvent.append(t_ar_iData[tIsThere])
        end repeat
      end if
      me.m_rHandler.OnEvent(t_ar_Events, t_iEvent)
    end repeat
  end if
  repeat with tObject in me.m_mp_objects
    tObject.GetFactor().move()
  end repeat
  me.m_MGEProcessAcc = me.m_MGEProcessAcc + (the milliSeconds - tt)
end
on update me
  tTurnsToDo = the milliSeconds
  me.m_MGEProcessAcc = 0
  if not voidp(me.m_rRoomContext) then
    dt = (tTurnsToDo - me.m_iLastMS) / 1000.0
    me.m_iLastMS = tTurnsToDo
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
      me.m_fTurnT = me.m_fTurnT + dt
      t = me.m_fTurnPulse / me.m_rCurrentTurn.GetNSubTurns()
      me.m_iSubTurnSpacing = t * (1.0 / me.m_iSpeedUp)
      t = me.m_iSubTurnSpacing
      tSubturnSpacing = integer(floor(me.m_fTurnT / t)) + 1
      if tSubturnSpacing > me.m_rCurrentTurn.GetNSubTurns() then
        tSubturnSpacing = me.m_rCurrentTurn.GetNSubTurns()
      end if
      if me.m_bDump then
        put "SubTurnSpacing :" && t && "ms, buffer size :" && me.m_ar_turnBuffer.count
      end if
      if tSubturnSpacing <> me.m_iLastSubturn then
        if tSubturnSpacing - 1 <> me.m_iLastSubturn then
          g_profMGEProcess = tSubturnSpacing - 1 - me.m_iLastSubturn
          repeat with tMissedCount = tSubturnSpacing - g_profMGEProcess to tSubturnSpacing - 1
            me.ProcessSubturn(tMissedCount)
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
      me.m_syncLostTime = me.m_syncLostTime + dt
    end if
    missedTurn = 1
    if dt > me.m_fTurnPulse then
      if me.m_bDump then
        put "MGEngine: frame rate too slow!!!"
      end if
      missedTurn = 0
    end if
    if me.turnDone() or not missedTurn then
      if not voidp(me.m_rCurrentTurn) then
        if tSubturnSpacing < me.m_rCurrentTurn.GetNSubTurns() then
          tFrameRateEnough = me.m_rCurrentTurn.GetNSubTurns() - tSubturnSpacing
          repeat with tMissedCount = me.m_rCurrentTurn.GetNSubTurns() - tFrameRateEnough + 1 to me.m_rCurrentTurn.GetNSubTurns()
            me.ProcessSubturn(tMissedCount)
          end repeat
        end if
      end if
      if not missedTurn then
        repeat with g_profMGEngine = 1 to me.m_ar_turnBuffer.count - 1
          me._AdvanceTurn()
          repeat with tSubturnSpacing = 1 to me.m_rCurrentTurn.GetNSubTurns()
            me.ProcessSubturn(tSubturnSpacing)
          end repeat
        end repeat
      end if
      me._AdvanceTurn()
    end if
  end if
  tTime = the milliSeconds - tTurnsToDo
  tSubturn = me.m_MGEProcessAcc
end
on turnDone me
  tPulse = me.m_fTurnPulse * (1.0 / me.m_iSpeedUp)
  return the m_fTurnT of me >= tPulse or voidp(the m_rCurrentTurn of me)
end
on _MinigameTestChecksum me, i_iChecksum
  if not voidp(me.m_rRoomContext) or me.m_bChecksumInvalid then
    tMyChecksum = me.calculateChecksum()
    if me.m_bDump then
      put "Checksum:" && tMyChecksum && "vs." && i_iChecksum
    end if
    if i_iChecksum <> tMyChecksum then
      put "MGEngine: Checksum mismatch"
      tDump = me.m_bDump
      me.m_bDump = 0
      if me.m_bDump then
        put "START"
        put "Turn was " & me.m_syncLostTime & " seconds late."
        me.PrintEvents(me.m_rCurrentTurn)
        me.calculateChecksum()
        put "END"
      end if
      me.m_bDump = tDump
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
    tDumpStr = me.m_rQuickRandom.IterateSeed(me.m_rCurrentTurn.GetNumber())
    if me.m_bDump then
      put "seed" && tDumpStr
      tIsThere = 1
    end if
    repeat with tInt in me.m_mp_objects
      counter = EMPTY
      checksum = 1
      tDumpStr = tDumpStr + tInt.GetParam("ObjectCode") * checksum
      if me.m_bDump then
        counter = counter & tInt.GetParam("ObjectCode")
      end if
      checksum = checksum + 1
      tDumpStr = tDumpStr + tInt.GetParam("Reference") * checksum
      if me.m_bDump then
        counter = counter & "," & tInt.GetParam("Reference")
      end if
      checksum = checksum + 1
      tDumpStr = tDumpStr + tInt.GetParam("Owner") * checksum
      if me.m_bDump then
        counter = counter & "," & tInt.GetParam("Owner")
      end if
      checksum = checksum + 1
      tDumpStr = tDumpStr + tInt.GetParam("Team") * checksum
      if me.m_bDump then
        counter = counter & "," & tInt.GetParam("Team")
      end if
      checksum = checksum + 1
      tGameParams = tInt.GetParam("WorldPosition")
      tDumpStr = tDumpStr + integer(tGameParams.x) * checksum
      if me.m_bDump then
        counter = counter & "," & integer(tGameParams.x)
      end if
      checksum = checksum + 1
      tDumpStr = tDumpStr + integer(tGameParams.y) * checksum
      if me.m_bDump then
        counter = counter & "," & integer(tGameParams.y)
      end if
      checksum = checksum + 1
      tDumpStr = tDumpStr + integer(tGameParams.z) * checksum
      if me.m_bDump then
        counter = counter & "," & integer(tGameParams.z)
      end if
      checksum = checksum + 1
      tDumpStr = tDumpStr + integer(tInt.GetParam("Direction")) * checksum
      if me.m_bDump then
        counter = counter & "," & integer(tInt.GetParam("Direction"))
      end if
      checksum = checksum + 1
      vPos = tInt.GetParam("GameParams")
      if not voidp(vPos) then
        repeat with Iterator in vPos
          tDumpStr = tDumpStr + integer(Iterator) * checksum
          if me.m_bDump then
            counter = counter & "," & integer(Iterator)
          end if
          checksum = checksum + 1
        end repeat
      end if
      if me.m_bDump then
        put "O" & tIsThere & "-CS:" & tDumpStr && "Parms:" & counter
        tIsThere = tIsThere + 1
      end if
    end repeat
    return tDumpStr
  end if
end
on PrintEvents me, i_turn
  repeat with tIsThere = 1 to i_turn.GetNSubTurns()
    tEvent = i_turn.GetSubTurn(tIsThere)
    repeat with t_ar_iData in tEvent
      put "SubTurn : " & tIsThere
      t_ar_Events = t_ar_iData[1]
      t_iEvent = []
      repeat with j = 2 to t_ar_iData.count
        t_iEvent.append(t_ar_iData[j])
      end repeat
      put "Event:" && t_ar_Events && "Data:" && t_iEvent
    end repeat
  end repeat
end
on _LoadStage me, i_sName, i_ar_params, i_iVersion
  me.m_rHandler.OnLoadStage(i_sName, i_ar_params, i_iVersion)
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