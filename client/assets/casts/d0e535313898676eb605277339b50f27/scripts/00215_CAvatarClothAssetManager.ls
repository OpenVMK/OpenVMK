-- Script
property m_ar_iPending
property m_ar_iLoading
property m_rClothingMap
property m_mp_sCast_rProps
property m_mp_iCode_rProps
property m_iMaxLoading
property m_mp_sName_rStruct
property m_ar_rCallbacks

on construct this
  m_mp_sName_rStruct = [:]
  m_mp_sName_rStruct.sort()
  m_mp_sCast_rProps = [:]
  m_mp_sCast_rProps.sort()
  m_mp_iCode_rProps = [:]
  m_ar_rCallbacks = []
  m_rClothingMap = createObject(#temp, "CAvatarClothingMap")
  m_iMaxLoading = 1
  m_ar_iPending = []
  m_ar_iLoading = []
  receiveUpdate(this.getID())
end
on deconstruct this
  removeUpdate(this.getID())
  unregisterMessage("CreateAvatar", this.getID())
  m_rClothingSet = VOID
  m_ar_rCallbacks = VOID
  m_mp_sCast_rProps = VOID
  m_mp_sName_rStruct = VOID
  m_mp_iCode_rProps = VOID
  m_ar_iPending = VOID
  m_ar_iLoading = VOID
end
on update this
  if m_ar_iLoading.count < m_iMaxLoading then
    t_iCount = m_ar_iPending.count
    if t_iCount then
      repeat with i = t_iCount down to 1
        this.LoadCastLibsForCloth(VOID, m_ar_iPending[i])
      end repeat
    end if
  end if
end
on IsClothPending this, a_iClothTypeCode
  return m_ar_iPending.getOne(a_iClothTypeCode) > 0
end
on IsClothLoading this, a_iClothTypeCode
  t_rType = m_mp_iCode_rProps.getaProp(integer(a_iClothTypeCode))
  if voidp(t_rType) then
    return m_ar_iPending.getOne(a_iClothTypeCode) > 0
  else
    return the status of t_rType = #LOADING
  end if
end
on IsClothReady this, a_iClothTypeCode
  t_rType = m_mp_iCode_rProps.getaProp(integer(a_iClothTypeCode))
  if voidp(t_rType) then
    t_rStruct = m_rClothingMap.GetByTypeCode(a_iClothTypeCode)
    if voidp(t_rStruct) then
      error(this, "Cloth description not found in clothing map:" && a_iClothTypeCode & "!", #IsItemReady)
      return 1
    else
      return t_rStruct.param["CASTS"] = EMPTY or t_rStruct.param["CASTS"] = VOID
    end if
  else
    return the status of t_rType = #ready
  end if
end
on LoadCastLibsForCloth this, a_rObject, a_iTypeCode
  t_rProps = m_mp_iCode_rProps.getaProp(a_iTypeCode)
  if t_rProps = VOID then
    t_rProps = [#status: #pending, #items: [a_rObject], #casts: []]
    m_mp_iCode_rProps.setaProp(a_iTypeCode, t_rProps)
    m_ar_iPending.addAt(1, a_iTypeCode)
    if not voidp(a_rObject) then
      if not t_rProps.items.getOne(a_rObject) then
        t_rProps.items.add(a_rObject)
      end if
    end if
  else
    if not voidp(a_rObject) then
      if not t_rProps.items.getOne(a_rObject) then
        t_rProps.items.add(a_rObject)
      end if
    end if
    if t_rProps.status = #pending then
      m_ar_iPending.deleteOne(a_iTypeCode)
      m_ar_iPending.addAt(1, a_iTypeCode)
    else
      if t_rProps.status = #ready then
        this._TellItemsToPrepare([a_iTypeCode])
        return 1
      end if
    end if
  end if
  if m_ar_iLoading.count < m_iMaxLoading then
    m_ar_iPending.deleteOne(a_iTypeCode)
    m_ar_iLoading.append(a_iTypeCode)
    t_rProps.status = #LOADING
  else
    return 1
  end if
  t_rStruct = m_rClothingMap.GetByTypeCode(a_iTypeCode)
  t_ar_sCasts = t_rStruct.param["CASTS"]
  t_sDelim = the itemDelimiter
  the itemDelimiter = ","
  repeat with t_sCast in t_ar_sCasts
    t_rProps.casts.add(t_sCast)
  end repeat
  the itemDelimiter = t_sDelim
  i = 1
  repeat while 1
    if i > t_ar_sCasts.count then
      exit repeat
    end if
    t_sCast = t_ar_sCasts[i]
    if m_mp_sCast_rProps[t_sCast] = VOID then
      m_mp_sCast_rProps[t_sCast] = [#status: #LOADING, #depencies: [a_iTypeCode]]
      i = i + 1
      next repeat
    end if
    if not m_mp_sCast_rProps[t_sCast].depencies.getOne(a_iTypeCode) then
      m_mp_sCast_rProps[t_sCast].depencies.add(a_iTypeCode)
    end if
    t_ar_sCasts.deleteAt(i)
  end repeat
  if t_ar_sCasts.count then
    registerCastloadCallback(startCastLoad(t_ar_sCasts, 0, 1), #_CastLoadCallback, this.getID(), a_iTypeCode)
  else
    if this._CheckDepenciesForType(a_iTypeCode) then
      m_mp_iCode_rProps.getaProp(a_iTypeCode).status = #ready
      this._TellItemsToPrepare([a_iTypeCode])
    end if
  end if
  return 1
end
on SetCallbackMarker this, a_rObject, a_kMethod, a_vArgument
end
on GetQueueLength this
  return the count of m_ar_iPending + the count of m_ar_iLoading
end
on FlushQueue this
  repeat with t_iCloth in m_ar_iPending
    m_mp_iCode_rProps.deleteProp(t_iCloth)
  end repeat
  m_ar_iPending = []
end
on GetImageCache this
  return m_mp_sName_rStruct
end
on AddCastContentsToImageCache this, a_rCast
  if ilk(a_rCast) = #castLib then
    t_iCount = the number of castMembers of castLib the number of a_rCast
    repeat with j = 1 to t_iCount
      t_rMember = member(j, a_rCast.number)
      if t_rMember.type = #bitmap then
        t_rImage = t_rMember.image.duplicate()
        t_rPoint = t_rMember.regPoint
        t_rAlpha = t_rImage.extractAlpha()
        t_rStruct = [#image: t_rImage, #point: t_rPoint, #alpha: t_rAlpha]
        m_mp_sName_rStruct[t_rMember.name] = t_rStruct
      end if
    end repeat
  end if
end
on _CastLoadCallback this, a_iCloth
  t_rType = m_mp_iCode_rProps.getaProp(a_iCloth)
  t_ar_iItemsToPrepare = []
  repeat with t_sCast in t_rType.casts
    t_rCastProps = m_mp_sCast_rProps[t_sCast]
    if t_rCastProps.status <> #ready then
      if castExists(t_sCast) then
        t_rCast = castLib(t_sCast)
      else
        t_rCast = VOID
      end if
      if ilk(t_rCast) = #castLib then
        t_iCount = the number of castMembers of castLib t_sCast
        repeat with j = 1 to t_iCount
          t_rMember = member(j, t_rCast.number)
          if t_rMember.type <> #empty then
            t_rImage = t_rMember.image.duplicate()
            t_rPoint = t_rMember.regPoint
            t_rAlpha = t_rImage.extractAlpha()
            t_rStruct = [#image: t_rImage, #point: t_rPoint, #alpha: t_rAlpha]
            m_mp_sName_rStruct[t_rMember.name] = t_rStruct
          end if
        end repeat
        RemoveCastLib(t_sCast)
      end if
      t_rCastProps.status = #ready
      if t_rCastProps.depencies.count > 1 then
        repeat with t_iType in t_rCastProps.depencies
          if this._CheckDepenciesForType(t_iType) then
            m_mp_iCode_rProps.getaProp(t_iType).status = #ready
            t_ar_iItemsToPrepare.add(t_iType)
          end if
        end repeat
        next repeat
      end if
      if this._CheckDepenciesForType(a_iCloth) then
        t_rType.status = #ready
        t_ar_iItemsToPrepare.add(a_iCloth)
      end if
    end if
  end repeat
  this._TellItemsToPrepare(t_ar_iItemsToPrepare)
  repeat while m_ar_iLoading.count < m_iMaxLoading
    if m_ar_iPending.count > 0 then
      t_iType = m_ar_iPending[1]
      m_ar_iPending.deleteAt(1)
      this.LoadCastLibsForCloth(VOID, t_iType)
      next repeat
    end if
    exit repeat
  end repeat
end
on _TellItemsToPrepare this, a_ar_iListOfItems
  repeat with t_iCloth in a_ar_iListOfItems
    m_ar_iLoading.deleteOne(t_iCloth)
    m_ar_iPending.deleteOne(t_iCloth)
    t_rType = m_mp_iCode_rProps.getaProp(t_iCloth)
    if voidp(t_rType) then
      error(this, "Item type properties lost for type" && t_iCloth & "!", #_TellItemsToPrepare)
      next repeat
    end if
    call(#AssetsLoaded, t_rType.items, t_iCloth)
    t_rType.items = []
  end repeat
end
on _CheckDepenciesForType this, a_iCloth
  t_rType = m_mp_iCode_rProps.getaProp(a_iCloth)
  if not voidp(t_rType) then
    if t_rType.status = #ready then
      return 1
    end if
  end if
  repeat with t_sCast in t_rType.casts
    t_rProps = m_mp_sCast_rProps[t_sCast]
    if voidp(t_rProps) then
      return 0
    end if
    if t_rProps.status <> #ready then
      return 0
    end if
  end repeat
  return 1
end