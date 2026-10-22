-- Movie Script
property m_rRoot
property m_rNull
property m_rRef
property m_rPrs

on open this, a_sXML
  try()
  m_rRoot = m_rPrs.ParseXML(EMPTY, a_sXML)
  if catch("Invalid document string") then
    this.close()
    return error(this, "Given XML document is invalid!", #open)
  else
    m_rRef = m_rRoot
    return 1
  end if
end
on close this
  m_rRoot = [#type: "xml", #value: EMPTY, #param: [:], #child: [:]]
  m_rNull = [#type: EMPTY, #value: EMPTY, #param: [:], #child: [:]]
  m_rRef = m_rRoot
  return 1
end
on copy this, a_rXML
  if listp(a_rXML) then
    t_rSrc = a_rXML
  else
    t_rSrc = a_rXML.GetNode()
  end if
  m_rRef.child.addProp(t_rSrc.param.getaProp("ID"), t_rSrc.duplicate())
end
on Search this, a_sAttr, a_sValue, a_bWrap
  if not stringp(a_sAttr) or not stringp(a_sValue) then
    return 0
  end if
  case a_sAttr of
    "VALUE", "value", #value:
      t_sValue = m_rRef.value
    "TYPE", "type", #type:
      t_sValue = m_rRef.type
    "ID", "id", #id:
      t_rChild = m_rRef.child
      t_iCount = t_rChild.count
      repeat with i = 1 to t_iCount
        if t_rChild.getPropAt(i) = a_sValue then
          m_rRef = t_rChild[i]
          return 1
        end if
      end repeat
    otherwise:
      t_sValue = m_rRef.param.getaProp(a_sAttr)

  end case
  if t_sValue = a_sValue then
    return 1
  end if
  t_rTemp = m_rRef
  repeat with t_rChild in m_rRef.child
    m_rRef = t_rChild
    if this.Search(a_sAttr, a_sValue) then
      return 1
    end if
  end repeat
  if a_bWrap = 1 then
    m_rRef = m_rRoot
    return this.Search(a_sAttr, a_sValue, 0)
  end if
  m_rRef = t_rTemp
  return 0
end
on GetRoot this
  m_rRef = m_rRoot
  return m_rRoot
end
on GetNode this
  return m_rRef
end
on GetNull this
  return m_rNull.duplicate()
end
on SetOwner this, a_rNode
end
on GetOwner this
end
on RemOwner this
end
on SetChild this, a_sID, a_rNode
  m_rRef.child.setaProp(a_sID, a_rNode)
end
on GetChild this, a_sID
  t_rNode = m_rRef.child.getaProp(a_sID)
  if voidp(t_rNode) then
    return m_rNull.duplicate()
  else
    return t_rNode
  end if
end
on RemChild this, a_sID
  m_rRef.child.deleteProp(a_sID)
end
on SetValue this, a_sValue
  m_rRef.value = a_sValue
end
on getValue this
  return the value of m_rRef
end
on RemValue this
  m_rRef.value = EMPTY
end
on SetParam this, a_sKey, a_sValue
  m_rRef.param.setaProp(a_sKey, a_sValue)
end
on GetParam this, a_sKey
  t_sValue = m_rRef.param.getaProp(a_sKey)
  if voidp(t_sValue) then
    return EMPTY
  else
    return t_sValue
  end if
end
on RemParam this, a_sKey
  m_rRef.param.deleteProp(a_sKey)
end
on count this
  return the count of the child of m_rRef
end
on getAt this, a_vIndex
  if integerp(a_vIndex) then
    return the child of m_rRef[a_vIndex]
  else
    if this.Search("type", a_vIndex) then
      return m_rRef
    else
      return m_rNull.duplicate()
    end if
  end if
end