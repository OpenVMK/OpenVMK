-- Score Script
property m_binaryMgr
property m_mp_photos
property m_bAlbumFull

on construct me
  m_binaryMgr = getBinaryManager()
  m_mp_photos = [:]
  m_bAlbumFull = 0
  return 1
end
on deconstruct me
  return 1
end
on SetIDList me, a_ar_IDs
  t_ar_removeList = []
  repeat with i = 1 to m_mp_photos.count
    tID = m_mp_photos.getPropAt(i)
    if a_ar_IDs.getPos(tID) = 0 then
      t_ar_removeList.append(tID)
    end if
  end repeat
  repeat with tID in t_ar_removeList
    m_mp_photos.deleteProp(tID)
  end repeat
  repeat with tID in a_ar_IDs
    if voidp(m_mp_photos.getaProp(tID)) then
      m_mp_photos.addProp(tID, [#thumb: VOID, #pic: VOID, #Caption: VOID, #published: VOID])
      me.RequestThumbnail(tID)
    end if
  end repeat
end
on AddID me, a_iID
  m_mp_photos.addProp(a_iID, [#thumb: VOID, #pic: VOID, #Caption: VOID, #published: VOID])
  getBinaryManager().retrieveThumbnailData(a_iID, me.getID())
end
on SetAlbumFull me, a_bState
  m_bAlbumFull = a_bState
end
on IsAlbumFull me
  return m_bAlbumFull
end
on RequestThumbnail me, a_iID
  getBinaryManager().retrieveThumbnailData(a_iID, me.getID())
end
on RequestCatalogPhoto me, a_iID
  getBinaryManager().retrieveCatalogPhotoData(a_iID, me.getID())
end
on thumbnailInfo me, tdata, a_iID
end
on thumbnailData me, tdata, a_iID
  tPhoto = m_mp_photos.getaProp(a_iID)
  if not voidp(tPhoto) then
    tPhoto.thumb = tdata
    me.getInterface().reDraw()
  end if
end
on catalogPhotoInfo me, tdata, a_iID
  tPublished = tdata.content.word[2]
  tCaption = tdata.content.word[3..tdata.content.word.count]
  tPhoto = m_mp_photos.getaProp(a_iID)
  if not voidp(tPhoto) then
    tPhoto.Caption = tCaption
    tPhoto.published = tPublished
  end if
end
on catalogPhotoData me, tdata, a_iID
  tPhoto = m_mp_photos.getaProp(a_iID)
  if not voidp(tPhoto) then
    tPhoto.pic = tdata
    me.getInterface().reDraw()
  end if
end
on removePhotoID me, a_iID
  m_mp_photos.deleteProp(a_iID)
  me.getInterface().reDraw()
end
on getPhoto me, a_iID
  return m_mp_photos.getaProp(a_iID)
end
on GetPhotos me
  return m_mp_photos
end
on DeletePhoto me, a_iID
  me.getHandler().DeletePhoto(a_iID)
  me.removePhotoID(a_iID)
end
on ChangeCaption me, a_iID, a_mp_cannedText
  me.getHandler().ChangeCaption(a_iID, a_mp_cannedText)
end
on ForcePhotoCaption me, a_iID, a_sText
  m_mp_photos.getaProp(a_iID).Caption = a_sText
end