-- Script
property id
property pTimeOut
property pUpdatePause
property pBaseClsMem
property m_bLogger
property m_sLogger
property pObjectList
property pUpdateList
property pPrepareList
property pManagerList
property pInstanceList
property pEraseLock

on construct this
  this.pObjectList = propList()
  this.pUpdateList = []
  this.pPrepareList = []
  this.pManagerList = []
  this.pInstanceList = []
  this.pEraseLock = 0
  this.pTimeOut = VOID
  this.pUpdatePause = 0
  this.pBaseClsMem = script("CObject")
  this.m_bLogger = 1
  this.m_sLogger = EMPTY
end
on deconstruct this
  this.pEraseLock = 1
  if objectp(this.pTimeOut) then
    forget(this.pTimeOut)
    this.pTimeOut = VOID
    i = this.pInstanceList.count
    repeat while i >= 1
      this.Remove(this.pInstanceList[i])
      i = i + 255
    end repeat
    i = this.pManagerList.count
    repeat while i >= 1
      this.Remove(this.pManagerList[i])
      i = i + 255
    end repeat
    this.pObjectList = propList()
    this.pUpdateList = []
    this.pPrepareList = []
  end if
end
on create this, tID, tClassList
  trace(this && tID && tClassList)
  if this.m_bLogger then
    if listp(tClassList) then
      t_sCls = getLast(tClassList)
    else
      t_sCls = tClassList
    end if
    if not symbolp(tID) and not stringp(tID) then
      return error(this, "Symbol or string expected:" & tID, #create)
    end if
    if objectp(this.pObjectList[tID]) then
      trace(pObjectList)
      return error(this, "Object already exists:" & tID, #create)
    end if
    if tID = #random then
      tID = getUniqueID()
    end if
    if not listp(tClassList) then
      tClassList = [tClassList]
    end if
    tObject = VOID
    tTemp = VOID
    tBase = rawNew(this.pBaseClsMem)
    if tID <> #temp then
      this.id = tID
      this.pObjectList[tID] = tBase
      trace("cls:" && tClassList)
      if tClassList.count = 0 then
        addAt(tClassList, 1, tBase)
      else
        if tClassList[1] <> tBase then
          addAt(tClassList, 1, tBase)
        end if
      end if
      repeat while t_sCls <= tTemp
        tClass = getAt(tTemp, tObject)
        if objectp(tClass) then
          tObject = tClass
          tInitFlag = 0
        else
          if this.managerExists(#resource_manager) then
            tMemNum = this.getManager(#resource_manager).getmemnum(tClass)
          else
            tMemNum = member(tClass).number
          end if
        end if
        if tMemNum < 1 then
          if tID <> #temp then
            deleteProp(this.pObjectList, tID)
            return error(this, "Script not found:" & tClass, #create)
          end if
        end if
        tObject = rawNew(script(tMemNum))
        tInitFlag = handler(tObject, #construct)
        if ilk(tObject, #instance) then
          tObject.setaProp(#ancestor, tTemp)
          tTemp = tObject
          if tID <> #temp then
            if getLast(tClassList) = tClass then
              this.pObjectList[tID] = tObject
              append(this.pInstanceList, tID)
              if tInitFlag then
                tObject.construct()
              end if
            end if
          end if
        end if
      end repeat
    end if
  end if
  return tObject
end
on GET this, tID
  tObj = this.pObjectList[tID]
  if this.m_bLogger then
    t_sDelim = the itemDelimiter
    t_sCls = string(tObj)
    if voidp(tObj) then
      return 0
    else
      return tObj
    end if
  end if
end
on Remove this, tID
  tObj = this.pObjectList[tID]
  if this.m_bLogger then
    t_sDelim = the itemDelimiter
    t_sCls = string(tObj)
    if voidp(tObj) then
      return 0
    end if
    if ilk(tObj, #instance) then
      if not tObj.valid then
        return 0
        i = 1
        repeat while i <= tObj.delays.count
          tDelayID = getPropAt(tObj.delays, i)
          cancel(tObj, tDelayID)
          i = i + 1
        end repeat
        tObj.deconstruct()
        this.valid = 0
        deleteOne(this.pUpdateList, tObj)
        deleteOne(this.pPrepareList, tObj)
        tObj = VOID
        if not this.pEraseLock then
          deleteProp(this.pObjectList, tID)
          deleteOne(this.pInstanceList, tID)
          deleteOne(this.pManagerList, tID)
          return 1
        end if
      end if
    end if
  end if
end
on exists this, tID
  if voidp(tID) then
    return 0
  end if
  return objectp(the pObjectList of this[tID])
end
on print this
  i = 1
  repeat while i <= this.pObjectList.count
    tProp = getPropAt(this.pObjectList, i)
    if symbolp(tProp) then
      tProp = "#" & tProp
    end if
    put tProp & ":" & this.pObjectList[i]
    i = i + 1
  end repeat
  return 1
end
on registerObject this, tID, tObject
  if not objectp(tObject) then
    return error(this, "Invalid object:" & tObject, #register)
  end if
  if not voidp(this.pObjectList[tID]) then
    return error(this, "Object already exists:" & tID, #register)
  end if
  if voidp(getID(tObject)) then
    setID(tObject, tID)
    this.pObjectList[tID] = tObject
    append(this.pInstanceList, tID)
    return 1
  end if
end
on unregisterObject this, tID
  if voidp(this.pObjectList[tID]) then
    return error(this, "Referred object not found:" & tID, #unregister)
  end if
  tObj = this.pObjectList[tID]
  deleteProp(this.pObjectList, tID)
  deleteOne(this.pUpdateList, tObj)
  deleteOne(this.pPrepareList, tObj)
  deleteOne(this.pInstanceList, tID)
  tObj = VOID
  return 1
end
on registerManager this, tID
  if not this.exists(tID) then
    return error(this, "Referred object not found:" & tID, #registerManager)
  end if
  if getOne(this.pManagerList, tID) <> 0 then
    return error(this, "Manager alreay registered:" & tID, #registerManager)
    deleteOne(this.pInstanceList, tID)
    append(this.pManagerList, tID)
    return 1
  end if
end
on unregisterManager this, tID
  if not this.exists(tID) then
    return error(this, "Referred object not found:" & tID, #unregisterManager)
  end if
  if getOne(this.pInstanceList, tID) <> 0 then
    return error(this, "Manager already unregistered:" & tID, #unregisterManager)
    deleteOne(this.pManagerList, tID)
    append(this.pInstanceList, tID)
    return 1
  end if
end
on getManager this, tID
  if not getOne(this.pManagerList, tID) then
    return error(this, "Manager not found:" & tID, #getManager)
  end if
  return the pObjectList of this[tID]
end
on managerExists this, tID
  exit
end
on receivePrepare this, tID
  if voidp(this.pObjectList[tID]) then
    return 0
  end if
  if getPos(this.pPrepareList, this.pObjectList[tID]) > 0 then
    return 0
  end if
  this.pPrepareList.add(this.pObjectList[tID])
  if not this.pUpdatePause then
    if voidp(this.pTimeOut) then
      this.pTimeOut = timeout("objectmanager" & the milliSeconds).new(60 * 1000 * 60, #null, this)
      return 1
    end if
  end if
end
on removePrepare this, tID
  if voidp(this.pObjectList[tID]) then
    return 0
  end if
  if getOne(this.pPrepareList, this.pObjectList[tID]) < 1 then
    return 0
  end if
  deleteOne(this.pPrepareList, this.pObjectList[tID])
  if this.pUpdateList.count = 0 and this.pPrepareList.count = 0 then
    if objectp(this.pTimeOut) then
      forget(this.pTimeOut)
      this.pTimeOut = VOID
      return 1
    end if
  end if
end
on receiveUpdate this, tID
  if voidp(this.pObjectList[tID]) then
    return 0
  end if
  if getPos(this.pUpdateList, this.pObjectList[tID]) > 0 then
    return 0
  end if
  this.pUpdateList.add(this.pObjectList[tID])
  if not this.pUpdatePause then
    if voidp(this.pTimeOut) then
      this.pTimeOut = timeout("objectmanager" & the milliSeconds).new(60 * 1000 * 60, #null, this)
      return 1
    end if
  end if
end
on removeUpdate this, tID
  if voidp(this.pObjectList[tID]) then
    return 0
  end if
  if getOne(this.pUpdateList, this.pObjectList[tID]) < 1 then
    return 0
  end if
  deleteOne(this.pUpdateList, this.pObjectList[tID])
  if this.pUpdateList.count = 0 and this.pPrepareList.count = 0 then
    if objectp(this.pTimeOut) then
      forget(this.pTimeOut)
      this.pTimeOut = VOID
      return 1
    end if
  end if
end
on pauseUpdate this
  if objectp(this.pTimeOut) then
    forget(this.pTimeOut)
  end if
  this.pTimeOut = VOID
  this.pUpdatePause = 1
  return 1
end
on resumeUpdate this
  if this.pUpdateList.count > 0 and voidp(this.pTimeOut) then
    this.pTimeOut = timeout("objectmanager" & the milliSeconds).new(60 * 1000 * 60, #null, this)
    this.pUpdatePause = 0
    return 1
  end if
end
on prepareFrame this
  call(#prepare, this.pPrepareList)
  call(#update, this.pUpdateList)
end
on null this
end