-- Script
property m_MGEProcessAcc
property m_iAllocationModel
property m_rObjectPool
property m_rRoomContext
property m_mp_sObject
property m_sHandler
property m_rHandler
property m_rVelocityTable
property m_rQuickRandom
property m_rComponentToAngle
property m_rCollision
property m_mp_objects
property m_ar_ar_objByType
property m_iOwnerRef
property m_ar_rMyObjects
property m_mp_participants
property m_rCurrentTurn
property m_rNextTurn
property m_fTurnT
property m_fTurnPulse
property m_ar_turnBuffer
property m_bChecksumInvalid
property m_syncLostTime
property m_iSpeedUp
property m_iLastMS
property m_iLastSubturn
property m_iSubTurnSpacing
property m_bDump
global g_profMGEngine
global g_profMGEProcess

on construct me
  m_iAllocationModel = #simple
  m_rObjectPool = VOID
  m_rHandler = VOID
  m_mp_objects = [:]
  m_mp_objects.sort()
  m_sHandler = ["CMinigameHandlerPrototype"]
  m_mp_sObject = [:]
  m_ar_ar_objByType = []
  m_rRoomContext = VOID
  m_rCurrentTurn = VOID
  m_rNextTurn = VOID
  m_fTurnT = 0.0
  m_fTurnPulse = 0.3
  m_iLastMS = 0
  m_iLastSubturn = 0
  m_ar_turnBuffer = []
  m_bChecksumInvalid = 0
  m_syncLostTime = 0.0
  m_iSpeedUp = 1
  m_iSubTurnSpacing = 100.0
  m_iOwnerRef = 0
  m_ar_rMyObjects = []
  m_MGEProcessAcc = 0
  m_bDump = 0
  createObject("MGEVelocityTable", "CVelocityTbl")
  m_rVelocityTable = getObject("MGEVelocityTable")
  createObject("MGEQuickRandom", "CIterateSeed")
  m_rQuickRandom = getObject("MGEQuickRandom")
  createObject("MGEComponentToAngle", "CComponentToAngle")
  m_rComponentToAngle = getObject("MGEComponentToAngle")
  createObject("MGECollisionRoutine", "CCollision")
  m_rCollision = getObject("MGECollisionRoutine")
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
  if not voidp(m_rObjectPool) then
    removeObject(m_rObjectPool.getID())
  end if
  if not voidp(m_rHandler) then
    removeObject(m_rHandler.getID())
  end if
  repeat with pObject in m_mp_objects
    m_rRoomContext._RemoveIndexed(pObject.GetParam("Reference"))
  end repeat
  m_mp_objects = [:]
  removeObject(m_rVelocityTable.getID())
  removeObject(m_rQuickRandom.getID())
  removeObject(m_rComponentToAngle.getID())
  removeObject(m_rCollision.getID())
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
  m_rRoomContext = getObject(#room_component)._AccessRoom()
  m_fTurnT = 0.0
  m_iLastMS = the milliSeconds
  m_iLastSubturn = -1
  initIntVector()
end
on StopMinigameEngine me
  repeat with tObject in m_mp_objects
    m_rRoomContext._RemoveIndexed(tObject.GetParam("Reference"))
  end repeat
  m_mp_objects = [:]
  m_ar_rMyObjects = []
  m_rRoomContext = VOID
  m_fTurnT = 0.0
  m_iLastMS = the milliSeconds
  m_iLastSubturn = -1
  me._ClearCurrentTurn()
  me._ClearTurnBuffer()
end
on _SetMinigameHandler me, i_sClass
  m_sHandler = i_sClass
  createObject("MGEHandler", "CMinigameHandlerPrototype", m_sHandler)
  m_rHandler = getObject("MGEHandler")
  m_rHandler.SetSyncState(0)
end
on SetMinigameObject me, i_iObjectCode, i_sClass
  m_mp_sObject.setaProp(i_iObjectCode, i_sClass)
  m_ar_ar_objByType[i_iObjectCode] = []
end
on _CreateObject me, i_sName, i_params
  if m_mp_objects.getaProp(i_params[#ref]) = VOID then
    tObject = me._MinigameCreateObject(i_sName, i_params)
    m_mp_objects.addProp(i_params[#ref], tObject)
    if m_mp_objects.count = 1 then
      m_mp_objects.sort()
    end if
    m_ar_ar_objByType[i_params[#type]].append(tObject)
  end if
end
on _CreateMyObject me, i_sName, i_params
  if m_mp_objects.getaProp(i_params[#ref]) = VOID then
    tObject = me._MinigameCreateObject(i_sName, i_params)
    m_mp_objects.addProp(i_params[#ref], tObject)
    if m_mp_objects.count = 1 then
      m_mp_objects.sort()
    end if
    m_ar_rMyObjects.append(tObject)
    m_ar_ar_objByType[i_params[#type]].append(tObject)
  end if
end
on _MinigameUpdateObject me, i_ref, i_params
  if not voidp(m_rRoomContext) then
    tObject = m_mp_objects.getaProp(i_ref)
    tObject.SetParam("Owner", i_params[#owner])
    tObject.SetParam("Team", i_params[#team])
    tObject.SetParam("WorldPosition", i_params[#worldpos])
    tObject.SetParam("Direction", i_params[#Dir])
    tObject.SetParam("GameParams", i_params[#extra].duplicate())
    tObject.GetFactor().UpdateParameters(i_params[#extra])
  end if
end
on _MinigameUpdateOrCreateObject me, i_ref, i_params
  if not voidp(m_rRoomContext) then
    tObject = m_mp_objects.getaProp(i_ref)
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
  t_ar_tobedeleted = []
  repeat with i = 1 to m_mp_objects.count
    tRef = m_mp_objects.getPropAt(i)
    tIsThere = 0
    repeat with tListRef in i_ar_refList
      if tListRef = tRef then
        tIsThere = 1
      end if
    end repeat
    if not tIsThere then
      t_ar_tobedeleted.append(tRef)
    end if
  end repeat
  repeat with tRef in t_ar_tobedeleted
    me._MinigameDeleteObject(tRef)
  end repeat
end
on _MinigameJoin me
  if not voidp(m_rRoomContext) then
    m_rHandler.OnJoin()
  end if
end
on _MinigameLeave me
  if not voidp(m_rRoomContext) then
    m_rHandler.OnLeave()
  end if
end
on _MinigameStart me
  if not voidp(m_rRoomContext) then
    m_rHandler.onStart()
  end if
end
on _MinigameEnd me
  if not voidp(m_rRoomContext) then
    m_rHandler.onEnd()
  end if
end
on _PrepareRoom me, tRoomCode
  m_rHandler.OnPrepareRoom()
end
on _TestCollision me, i_rObject1, i_rObject2
  return m_rCollision.testForObjectToObjectCollision(i_rObject1, i_rObject2)
end
on _SetChecksumValid me
  m_bChecksumInvalid = 0
end
on _SetMinigameOwnerRef me, i_iRef
  m_iOwnerRef = i_iRef
end
on _SetSimpleAllocationModel me
  m_iAllocationModel = #simple
  if not voidp(m_rObjectPool) then
    removeObject(m_rObjectPool.getID())
    m_rObjectPool = VOID
  end if
end
on _SetPooledAllocationModel me
  if voidp(m_rObjectPool) then
    m_rObjectPool = createObject("MGEObjectPool", "CRoomObjectManager")
  end if
  m_iAllocationModel = #pooled
end
on _SetParticipantList me, a_mp_List
  m_mp_participants = a_mp_List.duplicate()
end
on _SetTurnPulse me, a_fPulse
  m_fTurnPulse = a_fPulse
end
on GetParticipantlist me
  return m_mp_participants
end
on GetMyObjects me
  return m_ar_rMyObjects
end
on GetAllObjects me
  return m_mp_objects
end
on GetObjectsByCode me, i_iX
  return m_ar_ar_objByType[i_iX]
end
on GetMGObject me, i_iRef
  return m_mp_objects.getaProp(i_iRef)
end
on GetMinigameHandler me
  return m_rHandler
end
on GetVelocityTable me
  return m_rVelocityTable
end
on GetQuickRandom me
  return m_rQuickRandom
end
on GetComponentToAngle me
  return m_rComponentToAngle
end
on GetTurnNumber me
  return m_rCurrentTurn.GetNumber()
end
on GetSubturnSpacing me
  return m_iSubTurnSpacing
end
on GetObjectPool me
  if m_iAllocationModel = #pooled then
    return m_rObjectPool
  else
    return VOID
  end if
end
on getSyncState me
  return m_rHandler.getSyncState()
end
on _MinigameDeleteObject me, i_iRef
  if not voidp(m_rRoomContext) then
    tObject = m_mp_objects.getaProp(i_iRef)
    if not voidp(tObject) then
      m_ar_ar_objByType[tObject.GetParam("ObjectCode")].deleteOne(tObject)
      m_ar_rMyObjects.deleteOne(tObject)
      if m_iAllocationModel = #simple then
        if not voidp(tObject) then
          m_rRoomContext._RemoveIndexed(tObject.GetParam("Reference"), m_mp_sObject.getaProp(tObject.GetParam("ObjectCode")))
          m_ar_rMyObjects.deleteOne(tObject)
        else
          error(me, "Object to be removed from room context was not in the list")
        end if
      else
        if m_iAllocationModel = #pooled then
          m_rObjectPool.FreeObject(tObject)
        end if
      end if
      m_mp_objects.deleteProp(i_iRef)
    else
      error(me, "Object to be removed from room context was not in the list")
    end if
  end if
end
on _MinigameCreateObject me, i_sName, i_params
  if not voidp(m_rRoomContext) then
    if m_iAllocationModel = #simple then
      t_rXML = CreateXML()
      t_rXML.open(getMember("empty.node.xml").text)
      t_rXML.Search("type", "NODE")
      t_rXML.SetParam("REF", i_params.ref)
      t_rXML.SetParam("CLASS", m_mp_sObject.getaProp(i_params.type))
      m_rRoomContext._CreateIndexed(i_params.ref, m_mp_sObject.getaProp(i_params.type), t_rXML)
      tNewObject = m_rRoomContext._AccessIndexed(i_params.ref, m_mp_sObject.getaProp(i_params.type))
    else
      if m_iAllocationModel = #pooled then
        tNewObject = m_rObjectPool.newObject(m_mp_sObject.getaProp(i_params.type))
      end if
    end if
    tFactor = tNewObject.GetFactor()
    if voidp(tNewObject) then
      error(me, "FATAL ERROR : Minigame object create unsuccessful", #_MinigameCreateObject)
    else
      tNewObject.SetParam("Reference", i_params.ref)
      tNewObject.SetParam("Owner", i_params.owner)
      tNewObject.SetParam("Team", i_params.team)
      tNewObject.SetParam("WorldPosition", i_params.worldpos)
      tNewObject.SetParam("Direction", i_params.Dir)
      tNewObject.SetParam("ObjectCode", i_params.type)
      tNewObject.SetParam("GameParams", i_params.extra.duplicate())
      tNewObject.SetParam("BoundsType", #point)
      call(#SetConstants, [tFactor])
    end if
    return tNewObject
  end if
end
on _TurnBufferState me
  if m_ar_turnBuffer.count > 1 then
    return #overfill
  end if
  if m_ar_turnBuffer.count = 1 then
    return #ready
  end if
  if m_ar_turnBuffer.count = 0 then
    return #empty
  end if
end
on _AdvanceTurn me
  me._ClearCurrentTurn()
  case me._TurnBufferState() of
    #ready, #overfill:
      m_rCurrentTurn = m_ar_turnBuffer[1]
      m_ar_turnBuffer.deleteAt(1)
      m_fTurnT = 0.0
    #empty:
      m_iSpeedUp = 1
      m_rCurrentTurn = VOID
      if m_bDump then
        put "MGEngine: No turns in buffer. Speedup off"
      end if

  end case
  m_iLastSubturn = 0
  m_fTurnT = 0.0
end
on _AddTurnToBuffer me, i_rTurn
  if voidp(m_rCurrentTurn) then
    if m_bDump then
      put "MGEngine: Turn sync gained after" && m_syncLostTime && "seconds."
    else
      if m_bDump then
        put "MGEngine: Extra turn in buffer"
      end if
    end if
  end if
  m_ar_turnBuffer.append(i_rTurn)
end
on _ClearTurnBuffer me
  repeat with tTurn in m_ar_turnBuffer
    if not voidp(tTurn) then
      removeObject(tTurn.getID())
    end if
  end repeat
  m_ar_turnBuffer = []
end
on _ClearCurrentTurn me
  if not voidp(m_rCurrentTurn) then
    removeObject(m_rCurrentTurn.getID())
  end if
  m_rCurrentTurn = VOID
end
on _SendMinigameAction me, i_iAction, i_ar_iData
  tMsg = [:]
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
  m_rHandler.SetSyncState(1)
  if i_iSubturn <= m_rCurrentTurn.GetNSubTurns() then
    t_ar_Events = m_rCurrentTurn.GetSubTurn(i_iSubturn)
    repeat with tEvent in t_ar_Events
      t_iEvent = tEvent[1]
      t_ar_iData = []
      if tEvent.count > 1 then
        repeat with i = 2 to tEvent.count
          t_ar_iData.append(tEvent[i])
        end repeat
      end if
      m_rHandler.OnEvent(t_iEvent, t_ar_iData)
    end repeat
  end if
  repeat with tObject in m_mp_objects
    tObject.GetFactor().move()
  end repeat
  m_MGEProcessAcc = m_MGEProcessAcc + (the milliSeconds - tt)
end
on update me
  tTime = the milliSeconds
  m_MGEProcessAcc = 0
  if not voidp(m_rRoomContext) then
    dt = (tTime - m_iLastMS) / 1000.0
    m_iLastMS = tTime
    if not voidp(m_rCurrentTurn) then
      if not m_rCurrentTurn.GetTested() then
        me._MinigameTestChecksum(m_rCurrentTurn.GetChecksum())
        m_rCurrentTurn.SetTested(1)
      end if
      m_syncLostTime = 0.0
      if me._TurnBufferState() = #overfill then
        m_iSpeedUp = m_ar_turnBuffer.count / 1.5
        if m_bDump then
          put "MGEngine: speedup on"
        end if
      end if
      m_fTurnT = m_fTurnT + dt
      tSubturnSpacing = m_fTurnPulse / m_rCurrentTurn.GetNSubTurns()
      m_iSubTurnSpacing = tSubturnSpacing * (1.0 / m_iSpeedUp)
      tSubturnSpacing = m_iSubTurnSpacing
      tSubturn = integer(floor(m_fTurnT / tSubturnSpacing)) + 1
      if tSubturn > m_rCurrentTurn.GetNSubTurns() then
        tSubturn = m_rCurrentTurn.GetNSubTurns()
      end if
      if m_bDump then
        put "SubTurnSpacing :" && tSubturnSpacing && "ms, buffer size :" && m_ar_turnBuffer.count
      end if
      if tSubturn <> m_iLastSubturn then
        if tSubturn - 1 <> m_iLastSubturn then
          tMissedCount = tSubturn - 1 - m_iLastSubturn
          repeat with missedTurn = tSubturn - tMissedCount to tSubturn - 1
            me.ProcessSubturn(missedTurn)
          end repeat
        end if
        if m_bDump then
          put "SubTurnN :" & tSubturn
        end if
        me.ProcessSubturn(tSubturn)
        m_iLastSubturn = tSubturn
      end if
    else
      m_rHandler.SetSyncState(0)
      m_syncLostTime = m_syncLostTime + dt
    end if
    tFrameRateEnough = 1
    if dt > m_fTurnPulse then
      if m_bDump then
        put "MGEngine: frame rate too slow!!!"
      end if
      tFrameRateEnough = 0
    end if
    if me.turnDone() or not tFrameRateEnough then
      if not voidp(m_rCurrentTurn) then
        if tSubturn < m_rCurrentTurn.GetNSubTurns() then
          tTurnsToDo = m_rCurrentTurn.GetNSubTurns() - tSubturn
          repeat with missedTurn = m_rCurrentTurn.GetNSubTurns() - tTurnsToDo + 1 to m_rCurrentTurn.GetNSubTurns()
            me.ProcessSubturn(missedTurn)
          end repeat
        end if
      end if
      if not tFrameRateEnough then
        repeat with t = 1 to m_ar_turnBuffer.count - 1
          me._AdvanceTurn()
          repeat with tSubturn = 1 to m_rCurrentTurn.GetNSubTurns()
            me.ProcessSubturn(tSubturn)
          end repeat
        end repeat
      end if
      me._AdvanceTurn()
    end if
  end if
  g_profMGEngine = the milliSeconds - tTime
  g_profMGEProcess = m_MGEProcessAcc
end
on turnDone me
  tPulse = m_fTurnPulse * (1.0 / m_iSpeedUp)
  return m_fTurnT >= tPulse or voidp(m_rCurrentTurn)
end
on _MinigameTestChecksum me, i_iChecksum
  if not voidp(m_rRoomContext) or m_bChecksumInvalid then
    tMyChecksum = me.calculateChecksum()
    if m_bDump then
      put "Checksum:" && tMyChecksum && "vs." && i_iChecksum
    end if
    if i_iChecksum <> tMyChecksum then
      put "MGEngine: Checksum mismatch"
      tDump = m_bDump
      m_bDump = 0
      if m_bDump then
        put "START"
        put "Turn was " & m_syncLostTime & " seconds late."
        me.PrintEvents(m_rCurrentTurn)
        me.calculateChecksum()
        put "END"
      end if
      m_bDump = tDump
      me._SendMinigameAction(3, [])
      m_bChecksumInvalid = 1
      m_rHandler.SetSyncState(0)
    end if
  end if
end
on calculateChecksum me
  if not voidp(m_rCurrentTurn) then
    if m_bDump then
      put "turn" && m_rCurrentTurn.GetNumber()
    end if
    checksum = m_rQuickRandom.IterateSeed(m_rCurrentTurn.GetNumber())
    if m_bDump then
      put "seed" && checksum
      i = 1
    end if
    repeat with Iterator in m_mp_objects
      tDumpStr = EMPTY
      counter = 1
      checksum = checksum + Iterator.GetParam("ObjectCode") * counter
      if m_bDump then
        tDumpStr = tDumpStr & Iterator.GetParam("ObjectCode")
      end if
      counter = counter + 1
      checksum = checksum + Iterator.GetParam("Reference") * counter
      if m_bDump then
        tDumpStr = tDumpStr & "," & Iterator.GetParam("Reference")
      end if
      counter = counter + 1
      checksum = checksum + Iterator.GetParam("Owner") * counter
      if m_bDump then
        tDumpStr = tDumpStr & "," & Iterator.GetParam("Owner")
      end if
      counter = counter + 1
      checksum = checksum + Iterator.GetParam("Team") * counter
      if m_bDump then
        tDumpStr = tDumpStr & "," & Iterator.GetParam("Team")
      end if
      counter = counter + 1
      vPos = Iterator.GetParam("WorldPosition")
      checksum = checksum + integer(vPos.x) * counter
      if m_bDump then
        tDumpStr = tDumpStr & "," & integer(vPos.x)
      end if
      counter = counter + 1
      checksum = checksum + integer(vPos.y) * counter
      if m_bDump then
        tDumpStr = tDumpStr & "," & integer(vPos.y)
      end if
      counter = counter + 1
      checksum = checksum + integer(vPos.z) * counter
      if m_bDump then
        tDumpStr = tDumpStr & "," & integer(vPos.z)
      end if
      counter = counter + 1
      checksum = checksum + integer(Iterator.GetParam("Direction")) * counter
      if m_bDump then
        tDumpStr = tDumpStr & "," & integer(Iterator.GetParam("Direction"))
      end if
      counter = counter + 1
      tGameParams = Iterator.GetParam("GameParams")
      if not voidp(tGameParams) then
        repeat with tInt in tGameParams
          checksum = checksum + integer(tInt) * counter
          if m_bDump then
            tDumpStr = tDumpStr & "," & integer(tInt)
          end if
          counter = counter + 1
        end repeat
      end if
      if m_bDump then
        put "O" & i & "-CS:" & checksum && "Parms:" & tDumpStr
        i = i + 1
      end if
    end repeat
    return checksum
  end if
end
on PrintEvents me, i_turn
  repeat with i = 1 to i_turn.GetNSubTurns()
    t_ar_Events = i_turn.GetSubTurn(i)
    repeat with tEvent in t_ar_Events
      put "SubTurn : " & i
      t_iEvent = tEvent[1]
      t_ar_iData = []
      repeat with j = 2 to tEvent.count
        t_ar_iData.append(tEvent[j])
      end repeat
      put "Event:" && t_iEvent && "Data:" && t_ar_iData
    end repeat
  end repeat
end
on _LoadStage me, i_sName, i_iVersion, i_ar_params
  m_rHandler.OnLoadStage(i_sName, i_iVersion, i_ar_params)
end
on _StartStage me, i_iTimeToStart
  m_rHandler.OnStartStage(i_iTimeToStart)
end
on _EndStage me, i_iTimeToStart, i_ar_params
  m_rHandler.OnEndStage(i_iTimeToStart, i_ar_params)
end
on _GameInfoUpdate me, a_rInput
  m_rHandler.OnGameInfoUpdate(a_rInput)
end