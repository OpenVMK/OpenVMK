-- Script
property m_ar_iPending
property m_ar_iLoading
property m_rFurnitureMap
property m_mp_sCast_rProps
property m_mp_iType_rProps
property m_iMaxLoading
property t

on construct this
  m_mp_sCast_rProps = [:]
  m_mp_iType_rProps = [:]
  m_mp_sCast_rProps.sort()
  m_mp_iType_rProps.sort()
  m_rFurnitureMap = getThread(#room).component.m_rFurniMap
  m_iMaxLoading = 5
  m_ar_iPending = []
  m_ar_iLoading = []
  receiveUpdate(this.getID())
end
on deconstruct this
  removeUpdate(this.getID())
  m_mp_sCast_rProps = VOID
  m_mp_iType_rProps = VOID
  m_rFurnitureMap = VOID
  m_ar_iPending = VOID
  m_ar_iLoading = VOID
end
on update this
  if m_ar_iLoading.count < m_iMaxLoading then
    t_iCount = m_ar_iPending.count
    if t_iCount then
      repeat with i = t_iCount down to 1
        this.LoadCastLibsForType(m_ar_iPending[i])
      end repeat
    end if
  end if
end
on IsItemPending this, a_iItemTypeCode
  return m_ar_iPending.getOne(a_iItemTypeCode) > 0
end
on IsItemLoading this, a_iItemTypeCode
  t_rType = m_mp_iType_rProps.getaProp(integer(a_iItemTypeCode))
  if voidp(t_rType) then
    return m_ar_iPending.getOne(a_iItemTypeCode) > 0
  else
    return the status of t_rType = #LOADING
  end if
end
on IsItemReady this, a_iItemTypeCode
  t_rType = m_mp_iType_rProps.getaProp(integer(a_iItemTypeCode))
  if voidp(t_rType) then
    t_rStruct = m_rFurnitureMap.GetByTypeCode(a_iItemTypeCode)
    if voidp(t_rStruct) then
      error(this, "Item description not found in furnimap:" && a_iItemTypeCode & "!", #IsItemReady)
      return 1
    else
      return t_rStruct.param["CASTS"] = EMPTY or t_rStruct.param["CASTS"] = VOID
    end if
  else
    return the status of t_rType = #ready
  end if
end
on LoadCastLibsForItem this, a_rObject
  a_iTypeCode = integer(a_rObject.GetParam("TYPE"))
  t_rProps = m_mp_iType_rProps.getaProp(a_iTypeCode)
  if t_rProps = VOID then
    t_rProps = [#status: #pending, #items: [a_rObject], #casts: []]
    m_mp_iType_rProps.setaProp(a_iTypeCode, t_rProps)
    m_ar_iPending.addAt(1, a_iTypeCode)
  else
    if not t_rProps.items.getOne(a_rObject) then
      t_rProps.items.add(a_rObject)
    end if
    if t_rProps.status = #LOADING then
      return 1
    end if
  end if
  if m_ar_iLoading.count < m_iMaxLoading then
    m_ar_iPending.deleteOne(a_iTypeCode)
    m_ar_iLoading.append(a_iTypeCode)
    t_rProps.status = #LOADING
  else
    return 1
  end if
  t_rStruct = m_rFurnitureMap.GetByTypeCode(a_iTypeCode)
  t_sCasts = t_rStruct.param["CASTS"]
  if t_sCasts = VOID or t_sCasts = EMPTY then
    t_rProps.status = #ready
    this._TellItemsToPrepare([a_iTypeCode])
    return 1
  end if
  t_sDelim = the itemDelimiter
  the itemDelimiter = ","
  t_ar_sCasts = []
  repeat with i = 1 to t_sCasts.item.count
    t_sCast = t_sCasts.item[i].word[1]
    t_ar_sCasts.add(t_sCast)
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
      m_mp_iType_rProps.getaProp(a_iTypeCode).status = #ready
      this._TellItemsToPrepare([a_iTypeCode])
    end if
  end if
  return 1
end
on LoadCastLibsForType this, a_iTypeCode
  a_iTypeCode = a_iTypeCode.integer
  t_rProps = m_mp_iType_rProps.getaProp(a_iTypeCode)
  if t_rProps = VOID then
    t_rProps = [#status: #pending, #items: [], #casts: []]
    m_mp_iType_rProps.setaProp(a_iTypeCode, t_rProps)
    m_ar_iPending.addAt(1, a_iTypeCode)
  else
    if t_rProps.status = #pending then
      m_ar_iPending.deleteOne(a_iTypeCode)
      m_ar_iPending.addAt(1, a_iTypeCode)
    else
      return 1
    end if
  end if
  if m_ar_iLoading.count < m_iMaxLoading then
    m_ar_iPending.deleteOne(a_iTypeCode)
    m_ar_iLoading.append(a_iTypeCode)
    t_rProps.status = #LOADING
  else
    return 1
  end if
  t_rStruct = m_rFurnitureMap.GetByTypeCode(a_iTypeCode)
  t_sCasts = t_rStruct.param["CASTS"]
  if t_sCasts = VOID or t_sCasts = EMPTY then
    error(this, "Cast definition for item" && a_iTypeCode && "not found!", #LoadCastLibsForItem)
    t_rProps.status = #ready
    this._TellItemsToPrepare([a_iTypeCode])
    return 1
  end if
  t_sDelim = the itemDelimiter
  the itemDelimiter = ","
  t_ar_sCasts = []
  repeat with i = 1 to t_sCasts.item.count
    t_sCast = t_sCasts.item[i].word[1]
    t_ar_sCasts.add(t_sCast)
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
      m_mp_iType_rProps.getaProp(a_iTypeCode).status = #ready
      this._TellItemsToPrepare([a_iTypeCode])
    end if
  end if
  return 1
end
on GetQueueLength this
  return the count of m_ar_iPending + the count of m_ar_iLoading
end
on FlushQueue this
  repeat with t_iType in m_ar_iPending
    m_mp_iType_rProps.deleteProp(t_iType)
  end repeat
  m_ar_iPending = []
end
on _CastLoadCallback this, a_iItemCode
  a_iItemCode = integer(a_iItemCode)
  t_rType = m_mp_iType_rProps.getaProp(a_iItemCode)
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
            unregisterMember(t_rMember.name)
            t_iNew = createMember(t_rMember.name, t_rMember.type)
            t_rMember.duplicate(t_iNew)
          end if
        end repeat
        RemoveCastLib(t_sCast)
      end if
      t_rCastProps.status = #ready
      if t_rCastProps.depencies.count > 1 then
        repeat with t_iType in t_rCastProps.depencies
          if this._CheckDepenciesForType(t_iType) then
            m_mp_iType_rProps.getaProp(t_iType).status = #ready
            t_ar_iItemsToPrepare.add(t_iType)
          end if
        end repeat
        next repeat
      end if
      if this._CheckDepenciesForType(a_iItemCode) then
        t_rType.status = #ready
        t_ar_iItemsToPrepare.add(a_iItemCode)
      end if
    end if
  end repeat
  this._TellItemsToPrepare(t_ar_iItemsToPrepare)
  repeat while m_ar_iLoading.count < m_iMaxLoading
    if m_ar_iPending.count > 0 then
      t_iType = m_ar_iPending[1]
      m_ar_iPending.deleteAt(1)
      this.LoadCastLibsForType(t_iType)
      next repeat
    end if
    exit repeat
  end repeat
end
on _TellItemsToPrepare this, a_ar_iListOfItems
  repeat with t_iType in a_ar_iListOfItems
    m_ar_iLoading.deleteOne(t_iType)
    m_ar_iPending.deleteOne(t_iType)
    t_rType = m_mp_iType_rProps.getaProp(t_iType)
    if voidp(t_rType) then
      error(this, "Item type properties lost for type" && t_iType & "!", #_TellItemsToPrepare)
      next repeat
    end if
    call(#TellVisual, t_rType.items, #AssetsLoaded)
    t_rType.items = []
  end repeat
end
on _CheckDepenciesForType this, a_iTypeCode
  t_rType = m_mp_iType_rProps.getaProp(a_iTypeCode)
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