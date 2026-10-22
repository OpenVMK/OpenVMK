-- Script
property m_objThumbCache

on construct this
  registerMessage("GetClothThumbnail", this.getID(), #GetThumbnails)
  registerMessage("GetClothPreview", this.getID(), #GetPreviews)
  m_objThumbCache = createObject("ClothesThumbCache", "CClothesPreviewCache")
  return 1
end
on deconstruct this
  unregisterMessage("GetClothThumbnail", this.getID())
  unregisterMessage("GetClothPreview", this.getID())
  if objectp(m_objThumbCache) then
    removeObject(m_objThumbCache.getID())
    m_objThumbCache = VOID
  end if
  return 1
end
on GetThumbnails me, a_mp_ItemList, a_rCallback
  t_Obj = createObject(getUniqueID(), "CClothesPreviewRenderer")
  t_Obj.Define(a_mp_ItemList, a_rCallback, "Thumb")
end
on GetPreviews me, a_mp_ItemList, a_rCallback
  t_Obj = createObject(getUniqueID(), "CClothesPreviewRenderer")
  t_Obj.Define(a_mp_ItemList, a_rCallback, "Preview")
end