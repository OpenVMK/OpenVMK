-- Movie Script
property m_pDataSet
property m_ID
property m_pTransformMtx
property m_pWorldTransformMtx
property m_bWorldTransformValid
property m_pParent
property m_ar_Children
property m_matrixSrc

on construct me
  m_matrixSrc = script("Matrix Class")
end
on deconstruct me
end
on initObject me, p_pDataSet, p_pTransformMtx, p_pParent, p_lChildren
  m_pTransformMtx = new(m_matrixSrc, 4, 4)
  m_pTransformMtx.loadIdentity()
  m_pWorldTransformMtx = m_pTransformMtx.duplicate()
  m_bWorldTransformValid = 1
  m_pDataSet = []
  m_pParent = VOID
  m_ar_Children = []
  if p_pDataSet <> VOID then
    m_pDataSet = p_pDataSet
  end if
  if p_pTransformMtx <> VOID then
    m_pTransformMtx = p_pTransformMtx
  end if
  if p_pParent <> VOID then
    m_pParent = p_pParent
  end if
  if p_lChildren <> VOID then
    m_ar_Children = p_lChildren
  end if
end
on transform me, p_matrix, p_ar_Output
  repeat with i = 1 to m_pDataSet.count()
    p_ar_Output.append(p_matrix.transform(m_pDataSet[i]))
  end repeat
end
on transformMeAndChildren me, p_mp_Output, p_pMatrixStack
  t_newMatrixStack = p_pMatrixStack.duplicate()
  m_pTransformMtx.multiply(p_pMatrixStack, t_newMatrixStack)
  m_pWorldTransformMtx = t_newMatrixStack
  m_bWorldTransformValid = 1
  p_mp_Output[me.getID()] = []
  me.transform(t_newMatrixStack, p_mp_Output[me.getID()])
  if m_ar_Children.count() > 0 then
    call(#transformMeAndChildren, m_ar_Children, p_mp_Output, t_newMatrixStack)
  end if
end
on AlignForward me, i_vNewFwd
  tFwd = i_vNewFwd.duplicate()
  tFwd.normalize()
  m_pTransformMtx.setForward(tFwd)
  m_pTransformMtx.orthonormalize(#forward)
  m_bWorldTransformValid = 0
end
on AlignRight me, i_vNewRight
  tRight = i_vNewRight.duplicate()
  tRight.normalize()
  m_pTransformMtx.setRight(tRight)
  m_pTransformMtx.orthonormalize(#right)
  m_bWorldTransformValid = 0
end
on AlignUp me, i_vNewUp
  tUp = i_vNewUp.duplicate()
  tUp.normalize()
  m_pTransformMtx.setup(tUp)
  m_pTransformMtx.orthonormalize(#up)
  m_bWorldTransformValid = 0
end
on setData me, p_pDataSet
  if not ilk(p_pDataSet, #linearList) then
    put "3D Object Class : setData() : incorrect data type"
    return 0
  end if
  m_pDataSet = p_pDataSet
  return 1
end
on setPosition me, p_position
  m_pTransformMtx.setRow(4, [p_position.x, p_position.y, p_position.z, 1])
end
on setScale me, p_scale
  m_pTransformMtx.vData[1][1] = p_scale.x
  m_pTransformMtx.vData[2][2] = p_scale.y
  m_pTransformMtx.vData[3][3] = p_scale.z
  m_bWorldTransformValid = 0
end
on setTransform me, p_pTransformMtx
  if not p_pTransformMtx then
    put " 3D Object Class : setTransform() : invalid input"
    return 0
  end if
  m_pTransformMtx = p_pTransformMtx
  m_bWorldTransformValid = 0
  return 1
end
on setParent me, p_pObject
  if not p_pObject then
    put " 3D Object Class : setParent() : invalid input"
    return 0
  end if
  m_pParent = p_pObject
  m_pParent.addChild(me)
  m_bWorldTransformValid = 0
  return 1
end
on removeMeFromHierarchy me
  if m_pParent then
    m_pParent.removeChild(me)
    repeat with i = 1 to m_ar_Children.count()
      m_pParent.addChild(m_ar_Children[i])
    end repeat
  end if
  m_bWorldTransformValid = 0
end
on unParent me
  if m_pParent then
    m_pParent.removeChild(me)
  end if
  m_parent = VOID
  m_bWorldTransformValid = 0
  return 1
end
on addChild me, p_pObject
  if not p_pObject then
    put " 3D Object Class : addChild() : invalid input"
    return 0
  end if
  m_ar_Children.append(p_pObject)
end
on removeChild me, p_pObject
  if not p_pObject then
    put " 3D Object Class : removeChild() : invalid input"
    return 0
  end if
  m_ar_Children.deleteOne(p_pObject)
end
on getToWorldMatrix me
  if m_bWorldTransformValid then
    return m_pWorldTransformMtx
  else
    tParents = []
    tPNode = me.getParent()
    repeat while not voidp(tPNode)
      tParents.addAt(1, tPNode)
      tPNode = tPNode.getParent()
    end repeat
    tNewMatrix = new(m_matrixSrc, 4, 4)
    tNewMatrix.loadIdentity()
    repeat with tNode in tParents
      tNewMatrix.multiply(tNode.getTransform(), tNewMatrix)
    end repeat
    tNewMatrix.multiply(m_pTransformMtx, tNewMatrix)
    m_pWorldTransformMtx = tNewMatrix
    m_bWorldTransformValid = 1
    return m_pWorldTransformMtx
  end if
end
on getWorldTransformValid me
  return m_bWorldTransformValid
end
on GetData me
  return m_pDataSet
end
on getTransform me
  return m_pTransformMtx
end
on getPosition me
  return vector(m_pTransformMtx.vData[4][1], m_pTransformMtx.vData[4][2], m_pTransformMtx.vData[4][3])
end
on getParent me
  return m_pParent
end
on getChildren me
  return m_ar_Children
end