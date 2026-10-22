-- Script
property pThreadList
property pVarMngrObj
property pIndexField
property pObjBaseCls

on construct this
  pThreadList = [:]
  pVarMngrObj = createObject(#temp, GetClsVariable("variable.manager.class"))
  pIndexField = getVariable("thread.index.field")
  pObjBaseCls = script(getmemnum("CObject"))
  return 1
end
on deconstruct this
  this.closeAll()
  pVarMngrObj = VOID
  pIndexField = VOID
  pObjBaseCls = VOID
  return 1
end
on create this, tID, tInitField
  return this.initThread(tInitField, tID)
end
on Remove this, tID
  return this.closeThread(tID)
end
on get this, tID
  tThreadObj = pThreadList[tID]
  if voidp(tThreadObj) then
    return 0
  else
    return tThreadObj
  end if
end
on exists this, tID
  return not voidp(pThreadList[tID])
end
on initThread this, tCastNumOrMemName, tID
  if stringp(tCastNumOrMemName) then
    tMemNum = getResourceManager().getmemnum(tCastNumOrMemName)
    if tMemNum = 0 then
      return error(this, "Thread index field not found:" && tCastNumOrMemName, #initThread)
    else
      tThreadField = tCastNumOrMemName
      tCastNum = member(tMemNum).castLibNum
    end if
  else
    if symbolp(tCastNumOrMemName) then
      tThreadField = pIndexField
      if the number of castLibs > 1 then
        repeat with i = 2 to the number of castLibs
          if member(tThreadField, i).number > 0 then
            pVarMngrObj.clear()
            pVarMngrObj.dump(member(tThreadField, i).number)
            if symbol(pVarMngrObj.get("thread.id")) = tCastNumOrMemName then
              return this.initThread(i, tID)
              exit repeat
            end if
          end if
        end repeat
      end if
    else
      if not integerp(tCastNumOrMemName) then
        return error(this, "Cast number expected:" && tCastNumOrMemName, #initThread)
      else
        if tCastNumOrMemName < 1 or tCastNumOrMemName > the number of castLibs then
          return error(this, "Cast doesn't exist:" && tCastNumOrMemName, #initThread)
        end if
      end if
      tThreadField = pIndexField
      tCastNum = tCastNumOrMemName
      if member(tThreadField, tCastNum).number < 1 then
        return 0
      end if
    end if
  end if
  pVarMngrObj.clear()
  pVarMngrObj.dump(member(tThreadField, tCastNum).number)
  if symbolp(tID) then
    tThreadID = tID
  else
    tThreadID = symbol(pVarMngrObj.get("thread.id"))
  end if
  if not symbolp(tThreadID) then
    return error(this, "Invalid thread ID:" && tThreadID, #initThread)
  end if
  if this.exists(tThreadID) then
    return 0
  end if
  tThreadObj = createObject(#temp, GetClsVariable("thread.instance.class"))
  tThreadObj.setID(tThreadID)
  if pVarMngrObj.exists("thread.class") then
    tClass = pVarMngrObj.get("thread.class")
    if tClass.char[1] = "[" then
      tClass = value(tClass)
    end if
    if not listp(tClass) then
      tClass = [tClass]
    end if
    tThreadObj = createObject(tThreadID, tThreadObj, tClass)
  end if
  repeat with tModule in [#interface, #component, #handler]
    tSymbol = symbol(tThreadID & "_" & tModule)
    if pVarMngrObj.exists(tModule & ".class") then
      tClass = pVarMngrObj.get(tModule & ".class")
      if tClass.char[1] = "[" then
        tClass = value(tClass)
      end if
      if not listp(tClass) then
        tClass = [tClass]
      end if
      tObject = this.buildThreadObj(tSymbol, tClass, tThreadObj)
      tThreadObj.setaProp(tModule, tObject)
    end if
  end repeat
  pThreadList[tThreadID] = tThreadObj
  return 1
end
on initAll this
  repeat with i = the number of castLibs down to 1
    this.initThread(i)
  end repeat
  return 1
end
on closeThread this, tCastNumOrID
  pVarMngrObj.clear()
  if integerp(tCastNumOrID) then
    if member(pIndexField, tCastNumOrID).number > 0 then
      pVarMngrObj.dump(member(pIndexField, tCastNumOrID).number)
      tID = symbol(pVarMngrObj.get("thread.id"))
    else
      return 0
    end if
  else
    if symbolp(tCastNumOrID) then
      tID = tCastNumOrID
    else
      return error(this, "Invalid argument:" && tCastNumOrID, #closeThread)
    end if
  end if
  tThread = pThreadList[tID]
  if voidp(tThread) then
    return error(this, "Thread not found:" && tID, #closeThread)
  end if
  tObjMgr = getObjectManager()
  if objectp(tThread.interface) then
    tObjMgr.Remove(tThread.interface.getID())
  end if
  if objectp(tThread.component) then
    tObjMgr.Remove(tThread.component.getID())
  end if
  if objectp(tThread.handler) then
    tObjMgr.Remove(tThread.handler.getID())
  end if
  tObjMgr.Remove(tThread.getID())
  pThreadList.deleteProp(tID)
  return 1
end
on closeAll this
  repeat with i = pThreadList.count down to 1
    this.closeThread(pThreadList.getPropAt(i))
  end repeat
  return 1
end
on print this
  repeat with i = 1 to pThreadList.count
    put pThreadList.getPropAt(i)
  end repeat
end
on buildThreadObj this, tID, tClassList, tThreadObj
  tObject = VOID
  tTemp = VOID
  tBase = pObjBaseCls.new()
  tBase.construct()
  tBase[#ancestor] = tThreadObj
  tBase.setID(tID)
  tResMgr = getResourceManager()
  tObjMgr = getObjectManager()
  tObjMgr.registerObject(tID, tBase)
  tClassList.addAt(1, tBase)
  repeat with tClass in tClassList
    if objectp(tClass) then
      tObject = tClass
      tInitFlag = 0
    else
      tMemNum = tResMgr.getmemnum(tClass)
      if tMemNum < 1 then
        tObjMgr.unregisterObject(tID)
        return error(this, "Script not found:" && tMemNum, #buildThreadObj)
      end if
      tObject = script(tMemNum).new()
      tInitFlag = tObject.handler(#construct)
    end if
    tObject[#ancestor] = tTemp
    tTemp = tObject
    tObjMgr.unregisterObject(tID)
    tObjMgr.registerObject(tID, tObject)
    if tInitFlag then
      tObject.construct()
    end if
  end repeat
  return tObject
end