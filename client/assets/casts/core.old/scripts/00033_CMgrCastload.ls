-- Script
property pWaitList
property pTaskList
property pAvailableDynCasts
property pPermanentLevelList
property pLatestTaskID
property pCurrentDownLoads
property pLoadedCasts
property pTempWaitList
property pCastLibCount
property pSysCastNum
property pBinCastNum
property pNullCastName
property pFileExtension

on construct this
  if the runMode = "Author" then
    pFileExtension = ".cst"
  else
    pFileExtension = ".cct"
  end if
  pLoadedCasts = [:]
  pTempWaitList = []
  pCastLibCount = 0
  pNullCastName = "empty"
  pSysCastNum = castLib("core").number
  pBinCastNum = castLib(getVariable("dynamic.bin.cast")).number
  return 1
end
on startCastLoad this, tCasts, tPermanentFlag, tAdd
  if voidp(tPermanentFlag) then
    tPermanentFlag = 0
  end if
  pTempWaitList = []
  tCastList = []
  case tCasts.ilk of
    #propList:
      repeat with f = 1 to tCasts.count
        tPermanentLevel = tCasts.getPropAt(f)
        tCastName = tCasts[f]
        tCastList.add(tCastName)
        this.addOneCastToWaitList(tCastName, tPermanentLevel)
      end repeat
    #list:
      repeat with tCastName in tCasts
        tCastList.add(tCastName)
        this.addOneCastToWaitList(tCastName, tPermanentFlag)
      end repeat
    otherwise:
      tCasts = list(tCasts)
      repeat with tCastName in tCasts
        tCastList.add(tCastName)
        this.addOneCastToWaitList(tCastName, tPermanentFlag)
      end repeat

  end case
  if count(tCasts) = 0 then
    return 0
  end if
  if voidp(tAdd) then
    tAdd = 0
  end if
  tID = getUniqueID()
  pLatestTaskID = tID
  if tAdd = 0 then
    this.removeTemporaryCast(tCastList)
  end if
  if pTempWaitList.count > 0 then
    pWaitList[tID] = pTempWaitList.duplicate()
  end if
  if pWaitList.count = 0 then
    tStatus = #ready
    tPercent = 1.0
  else
    tStatus = #LOADING
    tPercent = 0
  end if
  pTaskList[tID] = createObject(#temp, GetClsVariable("castload.task.class"))
  tProps = [:]
  tProps[#id] = tID
  tProps[#status] = tStatus
  tProps[#Percent] = tPercent
  tProps[#sofar] = 0
  tProps[#casts] = pTempWaitList.duplicate()
  tProps[#callback] = VOID
  pTaskList[tID].Define(tProps)
  repeat with i = 1 to getIntVariable("net.operation.count", 2)
    this.AddNextpreloadNetThing()
  end repeat
  return tID
end
on registerCallback this, tID, tMethod, tClientID, tArgument
  if voidp(pTaskList.findPos(tID)) then
    return 0
  else
    return call(#addCallBack, pTaskList[tID], tID, tMethod, tClientID, tArgument)
  end if
end
on resetCastLibs this, tClean, tForced
  if tClean <> 1 then
    tClean = 0
  end if
  tTempList = []
  if the runMode = "Author" and tForced <> 1 then
    f = 1
    repeat while 1
      if variableExists("cast.dev." & f) then
        tTempList.add(getVariable("cast.dev." & f))
      else
        exit repeat
      end if
      f = f + 1
    end repeat
  end if
  pCastLibCount = the number of castLibs
  tEmptyCastNum = 1
  repeat with tCastNum = 2 to pCastLibCount
    if tCastNum <> pSysCastNum and tCastNum <> pBinCastNum then
      tCastName = castLib(tCastNum).name
      if tTempList.findPos(tCastName) = 0 then
        if tClean then
          getThreadManager().closeThread(tCastNum)
        end if
        if tClean then
          getResourceManager().unregisterMembers(tCastNum)
        end if
        castLib(tCastNum).name = pNullCastName && tEmptyCastNum
        castLib(tCastNum).fileName = the moviePath & pNullCastName & pFileExtension
        tEmptyCastNum = tEmptyCastNum + 1
        next repeat
      end if
      pLoadedCasts[tCastName] = string(tCastNum)
    end if
  end repeat
  return this.InitPreloader()
end
on getLoadPercent this, tID
  if voidp(tID) then
    tID = pLatestTaskID
  end if
  if not voidp(pTaskList[tID]) then
    if pTaskList[tID].getTaskState() = #ready then
      return 1.0
    else
      return pTaskList[tID].getTaskPercent()
    end if
  else
    return 1.0
  end if
end
on FindCastNumber this, tCast
  repeat with j = 1 to the number of castLibs
    tFileName = castLib(j).fileName
    tFileExtension = tFileName.char[length(tFileName) - 2..length(tFileName)]
    if castLib(j).name <> "Internal" and tFileExtension <> "dcr" and tFileExtension <> "dir" then
      if castLib(j).name = tCast then
        return the number of castLib(tCast)
        exit repeat
      end if
    end if
  end repeat
  return 0
end
on RemoveCastLib this, a_sCastName
  pCastLibCount = the number of castLibs
  t_iEmptyCstNum = 1
  repeat with t_iCstNum = 2 to pCastLibCount
    if castLib(t_iCstNum).name = a_sCastName then
      this.ResetOneDynamicCast(t_iCstNum)
    end if
    t_iEmptyCstNum = t_iEmptyCstNum + 1
  end repeat
end
on exists this, tCastName
  if tCastName = "internal" then
    return 1
  end if
  if voidp(pLoadedCasts[tCastName]) then
    return 0
  else
    return 1
  end if
end
on print this
  repeat with i = 1 to the number of castLibs
    put castLib(i).name
  end repeat
  repeat with tObj in pCurrentDownLoads
    put tObj[#pFile] && tObj[#pPercent]
  end repeat
end
on prepare this
  if count(pTaskList) > 0 then
    this.AddNextpreloadNetThing()
    call(#resetPercentCounter, pTaskList)
    call(#update, pCurrentDownLoads)
  end if
end
on InitPreloader this
  pWaitList = [:]
  pTaskList = [:]
  pAvailableDynCasts = [:]
  pPermanentLevelList = [:]
  pCurrentDownLoads = [:]
  pLatestTaskID = EMPTY
  repeat with f = 1 to the number of castLibs
    tCastNumber = this.FindCastNumber(pNullCastName && f)
    if tCastNumber > 0 then
      pAvailableDynCasts.addProp(pNullCastName && f, tCastNumber)
    end if
  end repeat
  return 1
end
on AddNextpreloadNetThing this
  if pCurrentDownLoads.count < getIntVariable("net.operation.count", 2) then
    if pWaitList.count > 0 then
      if count(pWaitList[1]) > 0 then
        tFile = pWaitList[1][1]
        tURL = the moviePath & tFile & pFileExtension
        tID = pWaitList.getPropAt(1)
        pWaitList[1].deleteAt(1)
        if count(pWaitList[1]) = 0 then
          pWaitList.deleteProp(pWaitList.getPropAt(1))
        end if
        pCurrentDownLoads[tFile] = createObject(#temp, GetClsVariable("castload.instance.class"))
        pCurrentDownLoads[tFile].Define(tFile, tURL, tID)
        pTaskList[tID].changeLoadingCount(1)
        receivePrepare(this.getID())
        return 1
      end if
    end if
  end if
  return 0
end
on DoneCurrentDownLoad this, tFile, tURL, tID, tstate
  if tstate <> #error then
    tCastNumber = this.getAvailableEmptyCast()
    if tCastNumber > 0 then
      tCastName = tFile
      this.setImportedCast(tCastNumber, tCastName, tURL)
    end if
  end if
  pTaskList[tID].OneCastDone(tFile)
  pTaskList[tID].changeLoadingCount(-1)
  this.removeCastLoadTask(tID)
  if voidp(pCurrentDownLoads[tFile]) then
    return error(this, "CastLoad task was lost!" && tFile, #DoneCurrentDownLoad)
  end if
  pCurrentDownLoads[tFile].deconstruct()
  this.delay(50, #removeCastLoadInstance, tFile)
  return 1
end
on removeCastLoadInstance this, tFile
  if tFile.ilk <> #string then
    return 0
  end if
  if voidp(pCurrentDownLoads[tFile]) then
    return error(this, "CastLoad instance was lost!" && tFile, #removeCastLoadInstance)
  else
    return pCurrentDownLoads.deleteProp(tFile)
  end if
end
on removeCastLoadTask this, tID
  if pTaskList[tID].getTaskState() = #ready then
    pTaskList[tID].DoCallBack()
    pTaskList[tID].deconstruct()
    pTaskList.deleteProp(tID)
  end if
end
on TellStreamState this, tFileName, tstate, tPercent, tID
  call(#UpdateTaskPercent, pTaskList[tID], tPercent, tFileName)
end
on setImportedCast this, tCastNum, tCastName, tFileName
  tCastLib = castLib(tCastNum)
  if tCastLib.name contains pNullCastName then
    tCastLib.fileName = tFileName
    tCastLib.name = tCastName
    pPermanentLevelList[tCastName][2] = tCastNum
    getResourceManager().preIndexMembers(tCastNum)
    pLoadedCasts[tCastName] = string(tCastNum)
  end if
end
on getAvailableEmptyCast this
  if pAvailableDynCasts.count > 0 then
    tCastNum = pAvailableDynCasts.getLast()
    pAvailableDynCasts.deleteAt(pAvailableDynCasts.count)
    return tCastNum
  else
    SystemAlert(this, "Out of free cast entries! CastLoad failed.")
    return 0
  end if
end
on removeTemporaryCast this, tNewLoadListOfcasts
  tTempList = pPermanentLevelList.duplicate()
  repeat with f = 1 to tTempList.count
    tPermanent = tTempList[f][1]
    tCstNumber = tTempList[f][2]
    if tPermanent = 0 and tCstNumber > 0 then
      tCastName = tTempList.getPropAt(f)
      if not tNewLoadListOfcasts.getOne(tCastName) then
        pPermanentLevelList.deleteProp(tCastName)
        this.ResetOneDynamicCast(tCstNumber)
        if pCastLibCount <> the number of castLibs then
          pCastLibCount = the number of castLibs
          tError = "CastLib count was changed!!!" & RETURN
          tError = tError & "CastLib with problems:" && castLib(pCastLibCount).name
          error(this, tError, #removeTemporaryCast)
        end if
      end if
    end if
  end repeat
end
on addOneCastToWaitList this, tCastName, tPermanentOrNot
  if not this.FindCastNumber(tCastName) and not pWaitList.getOne(tCastName) then
    pTempWaitList.add(tCastName)
    pPermanentLevelList.addProp(tCastName, [tPermanentOrNot, 0])
  else
    if voidp(pLoadedCasts[tCastName]) then
      pLoadedCasts[tCastName] = string(this.FindCastNumber(tCastName))
    end if
  end if
end
on ResetOneDynamicCast this, tCastNum
  if pLoadedCasts.getOne(string(tCastNum)) <> 0 then
    pLoadedCasts.deleteProp(pLoadedCasts.getOne(string(tCastNum)))
  else
    error(this, "Couldn't remove cast:" && tCastNum, #ResetOneDynamicCast)
  end if
  getThreadManager().closeThread(tCastNum)
  getResourceManager().unregisterMembers(tCastNum)
  getSpriteManager().unregisterMembers(tCastNum)
  castLib(tCastNum).name = pNullCastName && tCastNum - 2
  castLib(pNullCastName && tCastNum - 2).fileName = the moviePath & pNullCastName & pFileExtension
  pAvailableDynCasts.addProp(pNullCastName & tCastNum - 2, tCastNum)
  return 1
end
on solveNetErrorMsg this, tErrorCode
  case tErrorCode of
    EMPTY:
      return "Unknown error."
    "OK":
      return "OK"
    -128:
      return "Operation was cancelled."
    0:
      return "OK"
    4:
      return "Bad MOA Class. Network Xtras may be improperly installed."
    5:
      return "Bad MOA Interface. Network Xtras may be improperly installed."
    6:
      return "General transfer error."
    20:
      return "Internal error."
    900:
      return "Failed attempt to write to locked media."
    903:
      return "Disk is full."
    905:
      return "Bad URL."
    4144:
      return "Failed network operation."
    4145:
      return "Failed network operation."
    4146:
      return "Connection could not be established with the remote host."
    4147:
      return "Failed network operation."
    4148:
      return "Failed network operation."
    4149:
      return "Data supplied by the server was in an unexpected format."
    4150:
      return "Unexpected early closing of connection."
    4151:
      return "Failed network operation."
    4152:
      return "Data returned is truncated."
    4153:
      return "Failed network operation."
    4154:
      return "Operation could not be completed due to timeout."
    4155:
      return "Not enough memory available to complete the transaction."
    4156:
      return "Protocol reply to request indicates an error in the reply."
    4157:
      return "Transaction failed to be authenticated."
    4159:
      return "Invalid URL."
    4160:
      return "Failed network operation."
    4161:
      return "Failed network operation."
    4162:
      return "Failed network operation."
    4163:
      return "Failed network operation."
    4164:
      return "Could not create a socket"
    4165:
      return "Requested Object could not be found (URL may be incorrect)."
    4166:
      return "Generic proxy failure."
    4167:
      return "Transfer was intentionally interrupted by client."
    4168:
      return "Failed network operation."
    4242:
      return "Download stopped by netAbort(url)."
    4836:
      return "Cache download stopped for an unknown reason."

  end case
  return "Other network error:" && tErrorCode
end