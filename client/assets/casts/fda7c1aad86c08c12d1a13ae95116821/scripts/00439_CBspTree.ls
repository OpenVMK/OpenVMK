-- Script
property m_pRoot
property m_iAxisMax

on construct me
  m_pRoot = VOID
  m_iAxisMax = 0
  return 1
end
on deconstruct me
  if not voidp(m_pRoot) then
    m_pRoot.deconstruct()
  end if
  m_pRoot = VOID
  return 1
end
on Search me, a_ar_coordinate
  if not voidp(m_pRoot) then
    if not m_pRoot.inside(a_ar_coordinate) then
      return VOID
    end if
    tSNod = m_pRoot
    repeat while not tSNod.isleaf
      tIsInside = 0
      repeat with tChild in tSNod.children
        if tChild.inside(a_ar_coordinate) then
          tIsInside = 1
          tSNod = tChild
          exit repeat
        end if
      end repeat
      if not tIsInside then
        exit repeat
      end if
    end repeat
    return the obj of tSNod
  end if
  return VOID
end
on GetRoot me
  return m_pRoot
end
on setup_init me
  tSetupArray = []
  return tSetupArray
end
on setup_addnode me, a_ar_setup, a_ar_limits, a_pObject
  tNu = createObject(#random, "CBspTreeNode")
  tNu.dimensions = a_ar_limits
  tNu.obj = a_pObject
  tNu.isleaf = 1
  a_ar_setup.append(tNu)
  if m_iAxisMax < a_ar_limits.count / 2 then
    m_iAxisMax = a_ar_limits.count / 2
  end if
end
on setup_prepare me, a_ar_setup
  m_pRoot = createObject(#random, "CBspTreeNode")
  m_pRoot.dimensions = getMaxDimensions(a_ar_setup, m_iAxisMax)
  repeat with tNode in a_ar_setup
    m_pRoot.children.append(tNode)
  end repeat
  repeat with t_Obj in a_ar_setup
    removeObject(t_Obj.getID())
  end repeat
  a_ar_setup = []
  m_pRoot.subdivide(1)
end
on setup_import me, a_rXML
  m_pRoot = createObject(#temp, "CBspTreeNode")
  m_pRoot.dimensions = value(a_rXML.GetParam("DIM"))
  repeat with i = 1 to a_rXML.count()
    me.setup_import_node(m_pRoot, a_rXML[i])
  end repeat
end
on setup_import_node me, a_rTreeNode, a_mpXmlNode
  t_rThisNode = createObject(#temp, "CBspTreeNode")
  t_rThisNode.dimensions = value(a_mpXmlNode.param.getaProp("DIM"))
  t_sObjRef = a_mpXmlNode.param.getaProp("OBJREF")
  if not voidp(t_sObjRef) then
    t_rContext = getThread("room").getComponent()._AccessRoom()
    t_rThisNode.obj = t_rContext.Search("REF", t_sObjRef, 1)
    repeat while t_rThisNode.obj.GetParam("CLASS") = "floor"
      if t_rThisNode.obj.count < 1 then
        error(me, "Could not resolve tile for object reference " & t_sObjRef, #setup_import_node)
        exit repeat
      end if
      t_rThisNode.obj = t_rThisNode.obj[1].Search("REF", t_sObjRef, 1)
      if not objectp(t_rThisNode.obj) then
        exit repeat
      end if
    end repeat
    t_rThisNode.isleaf = 1
  end if
  a_rTreeNode.children.append(t_rThisNode)
  repeat with i = 1 to a_mpXmlNode.child.count
    me.setup_import_node(t_rThisNode, a_mpXmlNode.child[i])
  end repeat
end
on count_node me, a_node, a_counter
  repeat with tChild in a_node.children
    a_counter = me.count_node(tChild, a_counter)
  end repeat
  a_counter = a_counter + 1
  return a_counter
end