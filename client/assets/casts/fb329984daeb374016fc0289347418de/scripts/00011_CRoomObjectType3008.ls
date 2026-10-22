-- Script
property m_view
property m_sObjID
property m_bReady

on construct me
  m_sObjID = "PosterPhotoViewer"
  m_view = VOID
  m_bReady = 0
  return callAncestor(#construct, me)
end
on deconstruct me
  if not voidp(m_view) then
    removeObject(m_view.getID())
  end if
  return callAncestor(#deconstruct, me)
end
on select me
  tRef = value(me.getObject().GetParam("REF"))
  if objectExists(m_sObjID) then
    removeObject(m_sObjID)
  end if
  m_view = createObject(m_sObjID, "CWallPhotoViewer")
  m_view.RequestPhotoID(tRef)
  callAncestor(#select, me)
end
on update this
  if not m_bReady then
    this._Init()
  end if
end
on _Init this
  t_rObj = this.getObject()
  t_rObj.GetVisual().setcursor([getMember("cursor.finger"), getMember("cursor.finger.mask")], [1])
  m_bReady = 1
end