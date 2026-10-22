-- Script
property m_lObjectPile

on construct me
  m_lObjectPile = []
end
on deconstruct me
end
on newObject me, p_ID, p_pDataSet, p_pTransformMtx, p_pParent, p_lChildren
  t_ID = "3DObject:" & the milliSeconds
  if p_ID <> VOID then
    t_ID = p_ID
  end if
  t_object = createObject(t_ID, "3D Object Class")
  t_object.initObject(p_pDataSet, p_pTransformMtx, p_pParent, p_lChildren)
  m_lObjectPile.append(t_object)
  return t_object
end
on deleteObject me, p_ID
  t_object = getObject(p_ID)
  if t_object then
    t_object.removeMeFromHierarchy()
    m_lObjectPile.deleteOne(t_object)
  end if
  removeObject(p_ID)
end
on copyObject me, p_newID, p_source
  if not p_source then
    put "Object Manager Class : copyObject() : invalid input"
    return VOID
  end if
  t_ID = "3DObject:" & the milliSeconds
  if p_newID then
    t_ID = p_newID
  end if
  t_object = createObject(t_ID, "3D Object Class")
  t_object.initObject(p_source.GetData(), p_source.getTransform(), p_source.getParent(), p_source.getChildren())
  m_lObjectPile.append(t_object)
  return t_object
end
on getObjectPile me
  return m_lObjectPile
end