-- Score Script
property m_kState
property m_mp_CatalogIndex
property m_mp_ProductList
property m_mp_RegData
property m_ar_SetContents
property m_mp_ServerData
property m_ar_HatList
property m_sNetID

on construct this
  m_mp_CatalogIndex = VOID
  m_mp_ProductList = VOID
  m_mp_RegData = [:]
  m_mp_ServerData = [:]
  m_ar_HatList = VOID
  return 1
end
on deconstruct this
  m_mp_kType_mp_iRef_rItem = VOID
  return 1
end
on GatherData this, a_sDataType, a_mp_Data
  if m_mp_ServerData.findPos(a_sDataType) then
    m_mp_ServerData[a_sDataType] = a_mp_Data
  else
    m_mp_ServerData.addProp(a_sDataType, a_mp_Data)
  end if
end
on _UpdateRegData this, a_mp_ProductList, a_sListType
  t_iPos = m_mp_RegData.findPos(a_sListType)
  if voidp(t_iPos) then
    m_mp_RegData.addProp(a_sListType, a_mp_ProductList)
  else
    m_mp_RegData[a_sListType] = a_mp_ProductList
  end if
  this.interface._RefreshRegList(m_mp_RegData, a_sListType)
end
on parseAvailableSets this, a_Ar_Data, a_sSex
  if listp(a_Ar_Data) then
    t_ar_availableSets1 = a_Ar_Data
    t_ar_availableSets = [:]
    if m_mp_RegData.findPos("AvailableSets") then
      m_mp_RegData["AvailableSets"].addProp(a_sSex, t_ar_availableSets)
    else
      m_mp_RegData.addProp("AvailableSets", [:])
      m_mp_RegData["AvailableSets"].addProp(a_sSex, t_ar_availableSets)
    end if
  else
    return error(this, "Available set list is corrupted: " && a_Ar_Data, #parseAvailableSets)
  end if
end
on SetHatList this, t_ar_HatList
  m_ar_HatList = t_ar_HatList
end
on GetHatList this, a_iHairID
  if stringp(a_iHairID) then
    a_iHairID = value(a_iHairID)
  end if
  if not voidp(m_ar_HatList) then
    if m_ar_HatList.findPos(a_iHairID) = VOID then
      return 1
    else
      return 0
    end if
  else
    return 0
  end if
end