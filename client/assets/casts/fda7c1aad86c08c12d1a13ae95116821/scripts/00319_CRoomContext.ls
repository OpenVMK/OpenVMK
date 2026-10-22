-- Movie Script
property m_mp_sCls_mp_iRef_sKey

on construct this
  m_mp_sCls_mp_iRef_sKey = [:]
  executeMessage("room_context_created")
  return 1
end
on deconstruct this
  m_mp_sCls_mp_iRef_sKey = [:]
  executeMessage("room_context_removed")
  return 1
end
on GetContext this
  return this
end
on GetIterator this, a_sCls
  t_rMap = m_mp_sCls_mp_iRef_sKey.getaProp(a_sCls)
  if voidp(t_rMap) then
    t_rMap = [:]
    m_mp_sCls_mp_iRef_sKey.setaProp(a_sCls, t_rMap)
  end if
  t_rIterator = createObject(#temp, "CRoomObjectIterator")
  t_rIterator._FeedObjMap(this.m_rFactory, t_rMap)
  return t_rIterator
end
on GetObjByKey this, a_sKey
  return the m_rFactory of this.GetObjByKey(a_sKey)
end
on create this, a_sKey, a_rXML
  t_bBool = 0
  if callAncestor(#create, this, a_sKey, a_rXML) then
    t_bBool = 1
    t_iRef = integer(a_rXML.GetParam("REF"))
    if integerp(t_iRef) then
      t_sCls = a_rXML.GetParam("CLASS")
      t_rMap = m_mp_sCls_mp_iRef_sKey.getaProp(t_sCls)
      if voidp(t_rMap) then
        t_rMap = [:]
        m_mp_sCls_mp_iRef_sKey.addProp(t_sCls, t_rMap)
      end if
      t_rMap.setaProp(t_iRef, a_sKey)
    end if
  end if
  return t_bBool
end
on Remove this, a_sKey
  t_bBool = 0
  t_rObj = this.m_rFactory.GetObjByKey(a_sKey)
  if objectp(t_rObj) then
    t_sCls = t_rObj.GetParam("CLASS")
    t_iRef = integer(t_rObj.GetParam("REF"))
    if objectp(this.GetChild(a_sKey)) then
      if callAncestor(#Remove, this, a_sKey) then
        t_rMap = m_mp_sCls_mp_iRef_sKey.getaProp(t_sCls)
        if listp(t_rMap) then
          t_rMap.deleteProp(t_iRef)
        end if
        t_bBool = 1
      end if
    else
      t_bBool = t_rObj.GetOwner().Remove(a_sKey)
      if t_bBool then
        t_rMap = m_mp_sCls_mp_iRef_sKey.getaProp(t_sCls)
        if listp(t_rMap) then
          t_rMap.deleteProp(t_iRef)
        end if
      end if
    end if
  end if
  return t_bBool
end
on _CreateIndexed this, a_iRef, a_sCls, a_rXML
  if integer(a_rXML.GetParam("REF")) <> a_iRef then
    error(this, "Mismatching identifier!", #_CreateIndexed)
    a_rXML.SetParam("REF", string(a_iRef))
  end if
  if a_rXML.GetParam("CLASS") <> a_sCls then
    error(this, "Mismatching class!", #_CreateIndexed)
    a_rXML.SetParam("CLASS", a_sCls)
  end if
  return this.create(this.createKey(), a_rXML)
end
on _AccessIndexed this, a_iRef, a_sCls
  t_rMap = m_mp_sCls_mp_iRef_sKey.getaProp(a_sCls)
  if voidp(t_rMap) then
    return VOID
  else
    return the m_rFactory of this.GetObjByKey(t_rMap.getaProp(a_iRef))
  end if
end
on _RemoveIndexed this, a_iRef, a_sCls
  t_bBool = 0
  t_rMap = m_mp_sCls_mp_iRef_sKey.getaProp(a_sCls)
  if not listp(t_rMap) then
    return 0
  end if
  t_sKey = t_rMap.getaProp(a_iRef)
  if not stringp(t_sKey) then
    return 0
  end if
  return this.Remove(t_sKey)
end
on _UpdateIndexed this, a_mp_sCls_mp_iRef_sKey
  repeat with t_mp_iRef_sKey in m_mp_sCls_mp_iRef_sKey
    t_iCount = t_mp_iRef_sKey.count
    repeat with i = 1 to t_iCount
      t_mp_iRef_sKey.deleteAt(1)
    end repeat
  end repeat
  repeat with i = 1 to a_mp_sCls_mp_iRef_sKey.count
    t_sCls = a_mp_sCls_mp_iRef_sKey.getPropAt(i)
    t_rOut = a_mp_sCls_mp_iRef_sKey[i]
    if voidp(m_mp_sCls_mp_iRef_sKey.getaProp(t_sCls)) then
      t_rIn = [:]
      m_mp_sCls_mp_iRef_sKey.setaProp(t_sCls, t_rIn)
    else
      t_rIn = m_mp_sCls_mp_iRef_sKey.getaProp(t_sCls)
    end if
    t_iCount = t_rOut.count
    repeat with j = 1 to t_iCount
      t_rIn.addProp(t_rOut.getPropAt(j), t_rOut[j])
    end repeat
  end repeat
end
on _IndexObjects this
  m_mp_sCls_mp_iRef_sKey = [:]
  t_iCnt = this.GetCount()
  repeat with i = 1 to t_iCnt
    this._RecursiveListing(this[i])
  end repeat
  return 0
end
on _RecursiveListing this, a_rObj
  t_sKey = a_rObj.GetKey()
  t_iRef = integer(a_rObj.GetParam("REF"))
  t_sCls = a_rObj.GetParam("CLASS")
  if t_sCls = "exit" or t_sCls = "teleport" or t_sCls = "queue" or t_sCls = "sit" then
    t_sCls = "tile"
  end if
  if listp(m_mp_sCls_mp_iRef_sKey.getaProp(t_sCls)) then
    if objectp(m_mp_sCls_mp_iRef_sKey.getaProp(t_sCls).getaProp(t_sKey)) then
      return error(this, "Object already listed:" && QUOTE & t_sKey & QUOTE & "!", #_RecursiveListing)
    end if
  else
    m_mp_sCls_mp_iRef_sKey.setaProp(t_sCls, [:])
  end if
  m_mp_sCls_mp_iRef_sKey.getaProp(t_sCls).setaProp(t_iRef, t_sKey)
  t_iCount = a_rObj.GetCount()
  repeat with i = 1 to t_iCount
    if not this._RecursiveListing(a_rObj[i]) then
      return 0
    end if
  end repeat
  return 1
end
on _CreateRawObject this, a_iTypeCode, a_sCategory
  t_rMbr = getMember("room.object." & a_sCategory & ".xml")
  if t_rMbr.number > 1 then
    t_rXML = CreateXML(t_rMbr.text)
    t_rXML.Search("type", "NODE")
  else
    error(this, "Object definition XML not found:" && a_sCategory, #_CreateRawObject)
    return VOID
  end if
  t_rStruct = getThread(#room).component.m_rFurniMap.GetByTypeCode(a_iTypeCode)
  t_rXML.SetParam("REF", string(-1))
  t_rXML.SetParam("TYPE", string(a_iTypeCode))
  t_rXML.SetParam("X", string(1))
  t_rXML.SetParam("Y", string(1))
  t_rXML.SetParam("Z", string(1))
  t_rXML.SetParam("DIR", string(3))
  t_rXML.SetParam("STRUCT", t_rStruct)
  t_sKey = this.createKey()
  if this.create(t_sKey, t_rXML) then
    return this._Access(t_sKey)
  else
    return VOID
  end if
end
on _RemoveRawObject this, a_iTypeCode, a_sCategory
  this._RemoveIndexed(-1, a_sCategory)
end