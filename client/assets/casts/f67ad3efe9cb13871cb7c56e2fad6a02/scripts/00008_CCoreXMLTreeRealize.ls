-- Script
property m_sKey
property m_sType
property m_sValue
property m_rParams
property m_rParent
property m_rChilds
property m_rFactory
property m_rProtoCls

on construct this
  m_sKey = EMPTY
  m_sType = EMPTY
  m_sValue = EMPTY
  m_rParams = [:]
  m_rParams.sort()
  m_rParent = VOID
  m_rChilds = [:]
  m_rChilds.sort()
  m_rFactory = VOID
  m_rProtoCls = GetClsVariable("core.xml.tree.realize")
  return 1
end
on deconstruct this
  repeat while 1
    if m_rChilds.count = 0 then
      exit repeat
    end if
    this.remove(m_rChilds.getPropAt(1))
  end repeat
  m_sValue = EMPTY
  m_rParams = [:]
  m_rParent = VOID
  m_rChilds = [:]
  m_rFactory = VOID
  m_rProtoCls = VOID
  return 1
end
on create this, a_sKey, a_rXML
  if not voidp(m_rChilds.getaProp(a_sKey)) then
    return error(this, "Object with given Key exists:" && QUOTE & a_sKey & QUOTE, #create)
  end if
  t_rObj = createObject(#temp, m_rProtoCls)
  t_rObj.Setkey(a_sKey)
  if objectp(t_rObj) then
    t_rNode = a_rXML.GetNode()
    t_rObj.m_sType = t_rNode.type
    t_rObj.m_sValue = t_rNode.value
    t_rObj.m_rParent = this
    t_rObj.m_rFactory = m_rFactory
    t_rObj = m_rFactory._BuildObj(t_rObj, a_rXML)
  end if
  if objectp(t_rObj) then
    m_rChilds.setaProp(a_sKey, t_rObj)
    return 1
  else
    return error(this, "Failed to create object:" && QUOTE & a_sKey & QUOTE, #create)
  end if
end
on remove this, a_sKey
  t_rObj = m_rChilds.getaProp(a_sKey)
  if voidp(t_rObj) then
    return error(this, "Object with given key not found:" && QUOTE & a_sKey & QUOTE, #remove)
  end if
  m_rFactory._ClearObj(t_rObj)
  m_rChilds.deleteProp(a_sKey)
  return 1
end
on Access this, a_sKey
  return m_rChilds.getaProp(a_sKey)
end
on exists this, a_sKey
  return not voidp(m_rChilds.getaProp(a_sKey))
end
on Output this, a_sTabs
  t_sDelim = the itemDelimiter
  the itemDelimiter = QUOTE
  t_sClass = item 2 to string(this).item.count - 1 of string(this)
  the itemDelimiter = t_sDelim
  if m_rChilds.count = 0 then
    put a_sTabs & "<" & m_sType && "KEY=" & QUOTE & this.GetKey() & QUOTE && "CLASS=" & QUOTE & t_sClass & QUOTE && "/>"
  else
    put a_sTabs & "<" & m_sType && "KEY=" & QUOTE & this.GetKey() & QUOTE && "CLASS=" & QUOTE & t_sClass & QUOTE & ">"
    call(#Output, m_rChilds, a_sTabs & TAB)
    put a_sTabs & "</" & m_sType & ">"
  end if
end
on prepare this
  call(#prepare, m_rChilds)
end
on update this
  call(#update, m_rChilds)
end
on Search this, a_sCritery, a_sValue
  if m_rParams.getaProp(a_sCritery) = a_sValue then
    return this
  else
    repeat with t_rChild in m_rChilds
      t_rResult = t_rChild.Search(a_sCritery, a_sValue)
      if objectp(t_rResult) then
        exit repeat
      end if
    end repeat
  end if
  return t_rResult
end
on Setkey this, a_sKey
  if m_sKey <> EMPTY then
    error(this, "Attempted to reset node key!", #Setkey)
  else
    m_sKey = a_sKey
  end if
end
on GetKey this
  return m_sKey
end
on GetNode this
  t_rNode = [:]
  t_rNode.setaProp(#type, m_sType)
  t_rNode.setaProp(#value, m_sValue)
  t_rNode.setaProp(#param, m_rParams.duplicate())
  t_rNode.setaProp(#child, [:])
  repeat with t_rChild in m_rChilds
    t_rTmp = t_rChild.GetNode()
    t_sID = t_rTmp.param.getaProp("ID")
    if voidp(t_sID) then
      t_sID = EMPTY
    end if
    t_rNode.child.addProp(t_sID, t_rTmp)
  end repeat
  return t_rNode
end
on SetType this, a_sType
  m_sType = a_sType
end
on GetType this
  return m_sType
end
on GetRoot this
  return m_rParent.GetRoot()
end
on SetOwner this, a_rObj
  m_rParent = a_rObj
end
on GetOwner this
  return m_rParent
end
on RemOwner this
  m_rParent = VOID
end
on SetChild this, a_sKey, a_rObj
  m_rChilds.setaProp(a_sKey, a_rObj)
end
on GetChild this, a_sKey
  return m_rChilds.getaProp(a_sKey)
end
on RemChild this, a_sKey
  m_rChilds.deleteProp(a_sKey)
end
on SetValue this, a_sValue
  m_sValue = a_sValue
end
on getValue this
  return m_sValue
end
on RemValue this
  m_sValue = EMPTY
end
on SetParam this, a_sKey, a_sValue
  m_rParams.setaProp(a_sKey, a_sValue)
end
on GetParam this, a_sKey
  return m_rParams.getaProp(a_sKey)
end
on RemParam this, a_sKey
  m_rParams.deleteProp(a_sKey)
end
on toString this, a_iIndent
  if voidp(a_iIndent) then
    a_iIndent = 0
  end if
  t_sIndent = EMPTY
  repeat with i = 1 to a_iIndent
    put TAB after t_sIndent
  end repeat
  t_sTag = t_sIndent & "<" & m_sType
  repeat with i = 1 to m_rParams.count
    put SPACE & m_rParams.getPropAt(i) & "=" & QUOTE & m_rParams[i] & QUOTE after t_sTag
  end repeat
  if m_rChilds.count = 0 then
    if m_sValue = EMPTY then
      put SPACE & "/>" after t_sTag
    else
      put ">" & RETURN after t_sTag
      put t_sIndent & TAB & m_sValue & RETURN after t_sTag
      put t_sIndent & "</" & m_sType & ">" after t_sTag
    end if
  else
    put ">" & RETURN after t_sTag
    if m_sValue <> EMPTY then
      put t_sIndent & TAB & m_sValue & RETURN after t_sTag
    end if
    repeat with t_rChild in m_rChilds
      put t_rChild.toString(a_iIndent + 1) & RETURN after t_sTag
    end repeat
    put t_sIndent & "</" & m_sType & ">" after t_sTag
  end if
  return t_sTag
end
on createKey this
  return m_rFactory.createKey()
end
on GetCount this
  return the count of m_rChilds
end
on getAt this, a_vIndexOrKey
  return m_rChilds[a_vIndexOrKey]
end