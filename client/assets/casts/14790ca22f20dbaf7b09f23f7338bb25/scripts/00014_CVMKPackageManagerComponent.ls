-- Script
property m_mp_sPack_mpData

on construct this
  registerMessage(#load_package, this.getID(), #LoadPackage)
  registerMessage(#unload_package, this.getID(), #UnloadPackage)
  m_mp_sPack_mpData = [:]
  return 1
end
on deconstruct this
  unregisterMessage(#load_package)
  unregisterMessage(#unload_package)
  m_mp_sPack_mpData = [:]
  return 1
end
on LoadPackage this, a_sPackageName
  if voidp(m_mp_sPack_mpData.getaProp(a_sPackageName)) then
    t_mpCastList = [:]
    if this.ParsePackage(a_sPackageName, t_mpCastList) then
      m_mp_sPack_mpData.setaProp(a_sPackageName, [#casts: t_mpCastList[#casts], #Init: t_mpCastList[#Init], #state: #LOADING, #timer: VOID])
      tLoadID = startCastLoad(t_mpCastList[#casts], 0, 1)
      this.interface.ShowLoadingWindow()
      t_param = [#loadId: tLoadID, #package: a_sPackageName]
      return registerCastloadCallback(tLoadID, #CastLoadCallback, this.getID(), t_param)
    else
      return error(this, "Package was undefined : " & a_sPackageName, #LoadPackage)
    end if
  else
    if m_mp_sPack_mpData[a_sPackageName].state = #unloading then
      removeTimeout(m_mp_sPack_mpData[a_sPackageName].timer)
      m_mp_sPack_mpData[a_sPackageName].state = #loaded
      exit
    end if
  end if
end
on DelayedUnloadPackage this, a_sPackageName, a_iDelayTime
  if not voidp(m_mp_sPack_mpData.getaProp(a_sPackageName)) then
    if not (m_mp_sPack_mpData[a_sPackageName].state = #unloading) then
      t_sUnloadTimer = "PackageUnload" & getUniqueID()
      m_mp_sPack_mpData[a_sPackageName].state = #unloading
      m_mp_sPack_mpData[a_sPackageName].timer = t_sUnloadTimer
      createTimeout(t_sUnloadTimer, a_iDelayTime, #UnloadPackage, this.getID(), a_sPackageName, 1)
    else
      put "Package " & a_sPackageName & " already unloading!"
    end if
  else
    put "Tried to unload package not in memory :" & a_sPackageName
  end if
end
on UnloadPackage this, a_sPackageName
  if not voidp(m_mp_sPack_mpData.getaProp(a_sPackageName)) then
    repeat with tCast in m_mp_sPack_mpData[a_sPackageName][#casts]
      RemoveCastLib(tCast)
    end repeat
    m_mp_sPack_mpData.deleteProp(a_sPackageName)
  end if
end
on IsPackageLoaded this, a_sPackageName
  return the state of m_mp_sPack_mpData[a_sPackageName] = #loaded
end
on ParsePackage this, a_sPackageName, o_mpPackageDetails
  o_mpPackageDetails.setaProp(#Init, VOID)
  o_mpPackageDetails.setaProp(#casts, [])
  t_sVariable = "package." & a_sPackageName & ".cast.init"
  if variableExists(t_sVariable) then
    t_sCast = getVariable(t_sVariable)
    o_mpPackageDetails[#Init] = t_sCast
    o_mpPackageDetails[#casts].append(t_sCast)
  end if
  i = 1
  repeat while 1
    t_sVariable = "package." & a_sPackageName & ".cast." & i
    if not variableExists(t_sVariable) then
      exit repeat
    else
      t_sCast = getVariable(t_sVariable)
      o_mpPackageDetails[#casts].append(t_sCast)
    end if
    i = i + 1
  end repeat
  if o_mpPackageDetails[#Init] = VOID and o_mpPackageDetails[#casts].count = 0 then
    return 0
  else
    return 1
  end if
end
on CastLoadCallback this, a_mpParam
  if m_mp_sPack_mpData[a_mpParam[#package]].Init <> VOID then
    t_sCastName = m_mp_sPack_mpData[a_mpParam[#package]].Init
    m_mp_sPack_mpData[a_mpParam[#package]].Init = VOID
    RemoveCastLib(t_sCastName)
    m_mp_sPack_mpData[a_mpParam[#package]][#casts].deleteOne(t_sCastName)
  end if
  this.interface.RemoveLoadingWindow()
  m_mp_sPack_mpData[a_mpParam[#package]].state = #loaded
end