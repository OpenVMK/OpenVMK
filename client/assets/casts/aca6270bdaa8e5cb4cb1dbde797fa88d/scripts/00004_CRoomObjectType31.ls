-- Script
property m_albumview
property m_bReady

on construct me
  put "Photoalbum object created"
  m_albumview = VOID
  m_bReady = 0
  return callAncestor(#construct, me)
end
on deconstruct me
  put "Photoalbum object removed"
  if not voidp(m_albumview) then
    removeObject(m_albumview.getID())
  end if
  return callAncestor(#deconstruct, me)
end
on select me
  put "Photoalbum opened"
  m_albumview = createObject(#random, "CPhotoAlbumViewer")
  callAncestor(#select, me)
end
on update this
  if not m_bReady then
    this._Init()
  end if
end
on _Init this
  t_rObj = this.getObject()
  t_rObj.GetVisual().SetBlockVisualCursors([getMember("cursor.finger"), getMember("cursor.finger.mask")], [[1]])
  m_bReady = 1
end