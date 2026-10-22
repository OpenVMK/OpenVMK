-- Script
property m_iSourceKey
property m_rTagDefMap
property m_mp_sKey_rObj

on construct this
  m_iSourceKey = the milliSeconds / 4
  m_rTagDefMap = [:]
  m_mp_sKey_rObj = [:]
  this.m_rFactory = this
  this.m_sType = "factory"
  return 1
end
on deconstruct this
  m_iSourceKey = 0
  m_rTagDefMap = VOID
  m_mp_sKey_rObj = [:]
  return 1
end
on GetObjByKey this, a_sKey
  return m_mp_sKey_rObj.getaProp(a_sKey)
end
on createKey this
  t_sUniqueKey = "#" & m_iSourceKey
  m_iSourceKey = m_iSourceKey + 1
  return t_sUniqueKey
end
on GetRoot this
  t_rRoot = this.GetNode()
  if t_rRoot.child.count = 1 then
    return the child of t_rRoot[1]
  else
    return t_rRoot
  end if
end
on LoadTagDef this, a_rXML
  if a_rXML.Search("type", "TAGS") then
    t_rNode = a_rXML.GetNode()
    t_iCount = t_rNode.child.count
    repeat with i = 1 to t_iCount
      t_rChild = t_rNode.child[i]
      t_sName = t_rChild.param.getaProp("NAME")
      t_sType = t_rChild.param.getaProp("TYPE")
      t_sClass = t_rChild.param.getaProp("CLASS")
      m_rTagDefMap.setaProp(t_sName, [#name: t_sName, #type: t_sType, #class: t_sClass])
    end repeat
    return 1
  else
    return error(this, "Missing data in document!", #LoadTagDef)
  end if
end
on ClearTagDef this
  m_rTagDefMap = [:]
  return 1
end
on _BuildObj this, a_rProto, a_rXML
  t_rNode = a_rXML.GetNode()
  t_rType = m_rTagDefMap.getaProp(t_rNode.type)
  if voidp(t_rType) then
    t_rType = [#name: t_rNode.type, #type: "instance", #class: EMPTY]
  end if
  t_rClass = VOID
  t_sClsKey = t_rType.class
  if t_sClsKey <> EMPTY then
    t_rClass = GetClsVariable(t_sClsKey)
    if t_rClass = 0 then
      error(this, "Undefined class:" && QUOTE & t_sClsKey & QUOTE, #_BuildObj)
      return a_rProto
    end if
  end if
  t_iCount = t_rNode.param.count
  repeat with i = 1 to t_iCount
    t_sKey = t_rNode.param.getPropAt(i)
    t_sValue = t_rNode.param[i]
    a_rProto.SetParam(t_sKey, t_sValue)
  end repeat
  t_ar_rChild = []
  t_iCount = t_rNode.child.count
  repeat with i = 1 to t_iCount
    t_rChild = t_rNode.child[i]
    t_rType = m_rTagDefMap.getaProp(t_rChild.type)
    if voidp(t_rType) then
      t_sType = "instance"
    else
      t_sType = t_rType.type
    end if
    case t_sType of
      "instance", VOID:
        t_ar_rChild.add(t_rChild)
      "container":
        repeat with t_rSibling in t_rChild.child
          t_ar_rChild.add(t_rSibling)
        end repeat
      "parameter":
        error(this, "TODO: Parameters supported incorrectly!", #_BuildObj)
        repeat with j = 1 to t_rChild.param.count
          t_sKey = t_rChild.param.getPropAt(j)
          t_sValue = t_rChild.param[j]
          a_rProto.SetParam(t_sKey, t_sValue)
        end repeat
      "discard":
      otherwise:
        error(this, "Invalid tag type:" && QUOTE & t_sType & QUOTE, #_BuildObj)

    end case
  end repeat
  t_rObj = a_rProto
  if listp(t_rClass) then
    t_rObj = VOID
    t_rTemp = a_rProto
    t_bInit = 0
    repeat with t_sCls in t_rClass
      t_iMemNum = getmemnum(t_sCls)
      if t_iMemNum < 1 then
        return error(this, "Script not found:" && t_sCls, #_BuildObj)
      end if
      t_rObj = script(t_iMemNum).rawNew()
      t_bInit = t_rObj.handler(#construct)
      t_rObj.setaProp(#ancestor, t_rTemp)
      t_rTemp = t_rObj
      if t_bInit then
        t_rObj.construct()
      end if
    end repeat
  end if
  if t_ar_rChild.count > 0 then
    t_rXML = CreateXML()
    t_iCount = t_ar_rChild.count
    repeat with i = 1 to t_iCount
      t_rChild = t_ar_rChild[i]
      t_rXML.copy(t_rChild)
      t_sKey = this.createKey()
      if t_rXML.Search("type", t_rChild.type) then
        t_rObj.create(t_sKey, t_rXML)
      end if
      t_rXML.close()
    end repeat
  end if
  m_mp_sKey_rObj.setaProp(t_rObj.GetKey(), t_rObj)
  return t_rObj
end
on _ClearObj this, a_rObj
  t_sKey = a_rObj.GetKey()
  t_rObj = a_rObj
  repeat while 1
    t_rTmp = t_rObj.getaProp(#ancestor)
    t_rObj.setaProp(#ancestor, VOID)
    t_bFlg = t_rObj.handler(#deconstruct)
    t_rObj.setaProp(#ancestor, t_rTmp)
    if t_bFlg then
      t_rObj.deconstruct()
    end if
    t_rObj = t_rObj.getaProp(#ancestor)
    if voidp(t_rObj) then
      exit repeat
    end if
  end repeat
  m_mp_sKey_rObj.deleteProp(t_sKey)
end