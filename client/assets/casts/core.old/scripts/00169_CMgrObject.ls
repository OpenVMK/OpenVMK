-- Script
property pObjectList
property pUpdateList
property pPrepareList
property pManagerList
property pInstanceList
property pEraseLock
property pTimeOut
property pUpdatePause
property pBaseClsMem
property m_bLogger
property m_sLogger

on construct this
  pObjectList = [:]
  pUpdateList = []
  pPrepareList = []
  pManagerList = []
  pInstanceList = []
  pEraseLock = 0
  pTimeOut = VOID
  pUpdatePause = 0
  pBaseClsMem = script("CObject")
  pObjectList.sort()
  pUpdateList.sort()
  m_bLogger = 0
  m_sLogger = EMPTY
  return 1
end
on deconstruct this
  pEraseLock = 1
  if objectp(pTimeOut) then
    pTimeOut.forget()
    pTimeOut = VOID
  end if
  repeat with i = pInstanceList.count down to 1
    this.Remove(pInstanceList[i])
  end repeat
  repeat with i = pManagerList.count down to 1
    this.Remove(pManagerList[i])
  end repeat
  pObjectList = [:]
  pUpdateList = []
  pPrepareList = []
  return 1
end
on create this, tID, tClassList
  if m_bLogger then
    if listp(tClassList) then
      t_sCls = tClassList.getLast()
    else
      t_sCls = tClassList
    end if
    put the long time && "Create" && QUOTE & tID & QUOTE && "/" && t_sCls & RETURN after m_sLogger
  end if
  if not symbolp(tID) and not stringp(tID) then
    return error(this, "Symbol or string expected:" && tID, #create)
  end if
  if objectp(pObjectList[tID]) then
    return error(this, "Object already exists:" && tID, #create)
  end if
  if tID = #random then
    tID = getUniqueID()
  end if
  if not listp(tClassList) then
    tClassList = [tClassList]
  end if
  tClassList = tClassList.duplicate()
  tObject = VOID
  tTemp = VOID
  tBase = pBaseClsMem.rawNew()
  tBase.construct()
  if tID <> #temp then
    tBase.id = tID
    pObjectList[tID] = tBase
  end if
  if tClassList.count = 0 then
    tClassList.addAt(1, tBase)
  else
    if tClassList[1] <> tBase then
      tClassList.addAt(1, tBase)
    end if
  end if
  repeat with tClass in tClassList
    if objectp(tClass) then
      tObject = tClass
      tInitFlag = 0
    else
      if this.managerExists(#resource_manager) then
        tMemNum = this.getManager(#resource_manager).getmemnum(tClass)
      else
        tMemNum = member(tClass).number
      end if
      if tMemNum < 1 then
        if tID <> #temp then
          pObjectList.deleteProp(tID)
        end if
        return error(this, "Script not found:" && tClass, #create)
      end if
      tObject = script(tMemNum).rawNew()
      tInitFlag = tObject.handler(#construct)
    end if
    if ilk(tObject, #instance) then
      tObject.setaProp(#ancestor, tTemp)
      tTemp = tObject
    end if
    if tID <> #temp then
      if tClassList.getLast() = tClass then
        pObjectList[tID] = tObject
        pInstanceList.append(tID)
      end if
    end if
    if tInitFlag then
      tObject.construct()
    end if
  end repeat
  return tObject
end
on get this, tID
  tObj = pObjectList[tID]
  if m_bLogger then
    t_sDelim = the itemDelimiter
    the itemDelimiter = QUOTE
    t_sCls = item 2 of string(tObj)
    the itemDelimiter = t_sDelim
    put the long time && "Access" && QUOTE & tID & QUOTE && "/" && t_sCls & RETURN after m_sLogger
  end if
  if voidp(tObj) then
    return 0
  else
    return tObj
  end if
end
on Remove this, tID
  tObj = pObjectList[tID]
  if m_bLogger then
    t_sDelim = the itemDelimiter
    the itemDelimiter = QUOTE
    t_sCls = item 2 of string(tObj)
    the itemDelimiter = t_sDelim
    put the long time && "Remove" && QUOTE & tID & QUOTE && "/" && t_sCls & RETURN after m_sLogger
  end if
  if voidp(tObj) then
    return 0
  end if
  if ilk(tObj, #instance) then
    if not tObj.valid then
      return 0
    end if
    repeat with i = 1 to tObj.delays.count
      tDelayID = tObj.delays.getPropAt(i)
      tObj.cancel(tDelayID)
    end repeat
    tObj.deconstruct()
    tObj.valid = 0
  end if
  pUpdateList.deleteOne(tObj)
  pPrepareList.deleteOne(tObj)
  tObj = VOID
  if not pEraseLock then
    pObjectList.deleteProp(tID)
    pInstanceList.deleteOne(tID)
    pManagerList.deleteOne(tID)
  end if
  return 1
end
on exists this, tID
  if voidp(tID) then
    return 0
  end if
  return objectp(pObjectList[tID])
end
on print this
  repeat with i = 1 to pObjectList.count
    tProp = pObjectList.getPropAt(i)
    if symbolp(tProp) then
      tProp = "#" & tProp
    end if
    put tProp && ":" && pObjectList[i]
  end repeat
  return 1
end
on registerObject this, tID, tObject
  if not objectp(tObject) then
    return error(this, "Invalid object:" && tObject, #register)
  end if
  if not voidp(pObjectList[tID]) then
    return error(this, "Object already exists:" && tID, #register)
  end if
  if voidp(tObject.getID()) then
    tObject.setID(tID)
  end if
  pObjectList[tID] = tObject
  pInstanceList.append(tID)
  return 1
end
on unregisterObject this, tID
  if voidp(pObjectList[tID]) then
    return error(this, "Referred object not found:" && tID, #unregister)
  end if
  tObj = pObjectList[tID]
  pObjectList.deleteProp(tID)
  pUpdateList.deleteOne(tObj)
  pPrepareList.deleteOne(tObj)
  pInstanceList.deleteOne(tID)
  tObj = VOID
  return 1
end
on registerManager this, tID
  if not this.exists(tID) then
    return error(this, "Referred object not found:" && tID, #registerManager)
  end if
  if pManagerList.getOne(tID) <> 0 then
    return error(this, "Manager alreay registered:" && tID, #registerManager)
  end if
  pInstanceList.deleteOne(tID)
  pManagerList.append(tID)
  return 1
end
on unregisterManager this, tID
  if not this.exists(tID) then
    return error(this, "Referred object not found:" && tID, #unregisterManager)
  end if
  if pInstanceList.getOne(tID) <> 0 then
    return error(this, "Manager already unregistered:" && tID, #unregisterManager)
  end if
  pManagerList.deleteOne(tID)
  pInstanceList.append(tID)
  return 1
end
on getManager this, tID
  if not pManagerList.getOne(tID) then
    return error(this, "Manager not found:" && tID, #getManager)
  end if
  return pObjectList[tID]
end
on managerExists this, tID
  return pManagerList.getOne(tID) <> 0
end
on receivePrepare this, tID
  if voidp(pObjectList[tID]) then
    return 0
  end if
  if pPrepareList.getPos(pObjectList[tID]) > 0 then
    return 0
  end if
  pPrepareList.add(pObjectList[tID])
  if not pUpdatePause then
    if voidp(pTimeOut) then
      pTimeOut = timeout("objectmanager" & the milliSeconds).new(60 * 1000 * 60, #null, this)
    end if
  end if
  return 1
end
on removePrepare this, tID
  if voidp(pObjectList[tID]) then
    return 0
  end if
  if pPrepareList.getOne(pObjectList[tID]) < 1 then
    return 0
  end if
  pPrepareList.deleteOne(pObjectList[tID])
  if pPrepareList.count = 0 and pUpdateList.count = 0 then
    if objectp(pTimeOut) then
      pTimeOut.forget()
      pTimeOut = VOID
    end if
  end if
  return 1
end
on receiveUpdate this, tID
  if voidp(pObjectList[tID]) then
    return 0
  end if
  if pUpdateList.getPos(pObjectList[tID]) > 0 then
    return 0
  end if
  pUpdateList.add(pObjectList[tID])
  if not pUpdatePause then
    if voidp(pTimeOut) then
      pTimeOut = timeout("objectmanager" & the milliSeconds).new(60 * 1000 * 60, #null, this)
    end if
  end if
  return 1
end
on removeUpdate this, tID
  if voidp(pObjectList[tID]) then
    return 0
  end if
  if pUpdateList.getOne(pObjectList[tID]) < 1 then
    return 0
  end if
  pUpdateList.deleteOne(pObjectList[tID])
  if pPrepareList.count = 0 and pUpdateList.count = 0 then
    if objectp(pTimeOut) then
      pTimeOut.forget()
      pTimeOut = VOID
    end if
  end if
  return 1
end
on pauseUpdate this
  if objectp(pTimeOut) then
    pTimeOut.forget()
    pTimeOut = VOID
  end if
  pUpdatePause = 1
  return 1
end
on resumeUpdate this
  if pUpdateList.count > 0 and voidp(pTimeOut) then
    pTimeOut = timeout("objectmanager" & the milliSeconds).new(60 * 1000 * 60, #null, this)
  end if
  pUpdatePause = 0
  return 1
end
on prepareFrame this
  call(#prepare, pPrepareList)
  call(#update, pUpdateList)
end
on null this
end