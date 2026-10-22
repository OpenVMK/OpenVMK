-- Script
property m_mp_photos
property m_ar_cache

on construct me
  m_mp_photos = [:]
  return 1
end
on deconstruct me
  m_mp_photos = [:]
  return 1
end
on AddID me, a_iID
  m_mp_photos.addProp(a_iID, [#thumb: VOID, #pic: VOID, #Caption: VOID, #published: VOID])
end
on RequestQuestPhoto me, a_iID
  tPhoto = m_mp_photos.getaProp(a_iID)
  if voidp(tPhoto) then
    me.AddID(a_iID)
  end if
  getBinaryManager().retrieveQuestPhotoData(a_iID, me.getID())
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
    executeMessage(#photo_catalog_redraw)
  end if
end
on getPhoto me, a_iID
  return m_mp_photos.getaProp(a_iID)
end
on GetPhotos me
  return m_mp_photos
end