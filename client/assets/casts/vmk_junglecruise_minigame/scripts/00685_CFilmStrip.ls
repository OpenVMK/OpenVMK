-- Script
property m_mp_constants
property m_ar_framemembers
property m_filmMember
property m_pixelOffset
property m_frameOffset
property m_totalFrames
property m_ar_thumbnails
property m_rThumbnailBG
property m_thumbNailStrip
property m_iVisibleFrames

on construct me
  t_filmMember = getMember("filmstrip")
  if t_filmMember <> 0 then
    m_filmMember = t_filmMember.image.duplicate()
  else
    m_filmMember = image(45, 36, 32)
  end if
  m_mp_constants = [:]
  m_mp_constants.setaProp("FrameSize", point(30, 20))
  m_mp_constants.setaProp("FrameSpacing", point(m_filmMember.width - 31, 8))
  m_mp_constants.setaProp("ScrollTrigger", 400)
  m_mp_constants.setaProp("ScrollSpeed", 2)
  m_ar_framemembers = []
  m_pixelOffset = 0
  m_frameOffset = 0
  m_totalFrames = 0
  m_iVisibleFrames = 11
  m_ar_thumbnails = []
  m_rThumbnailBG = image(m_filmMember.width * (m_iVisibleFrames + 1), m_filmMember.width, 32)
  tImg = getMember("jc.ui.bg").image.duplicate()
  tInset = point(151, 0)
  m_rThumbnailBG.copyPixels(tImg, tImg.rect, tImg.rect + rect(tInset, tInset))
  tImg = m_filmMember.duplicate()
  repeat with i = 0 to m_iVisibleFrames
    tX = tImg.width * i
    tOffset = point(tX, 0)
    m_rThumbnailBG.copyPixels(tImg, tImg.rect + rect(tOffset, tOffset), tImg.rect, [#ink: 39, #blendLevel: 150])
  end repeat
  m_thumbNailStrip = m_rThumbnailBG.duplicate()
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  repeat with tmember in m_ar_framemembers
    removeMember(tmember.name)
  end repeat
  return 1
end
on AddFrame me, i_image
  m_frameOffset = m_frameOffset + 1
  createMember("JCFilmFrame:" & m_frameOffset, #bitmap)
  m_ar_framemembers.append(getMember("JCFilmFrame:" & m_frameOffset))
  m_ar_framemembers[m_ar_framemembers.count].image = i_image.duplicate()
  m_ar_framemembers[m_ar_framemembers.count].regPoint = point(0, 0)
  tWidth = m_mp_constants["FrameSize"].locH
  tHeight = m_mp_constants["FrameSize"].locV
  tThumbNail = image(tWidth, tHeight, 32)
  tRect = rect(0, 0, tWidth, tHeight)
  tThumbNail.copyPixels(i_image, tRect, i_image.rect)
  m_ar_thumbnails.append(tThumbNail)
  m_thumbNailStrip = m_rThumbnailBG.duplicate()
  i_index = max(1, m_ar_thumbnails.count - m_iVisibleFrames + 1)
  repeat with i = i_index to m_ar_thumbnails.count
    thumb = m_ar_thumbnails[i]
    t_frameOffset = max(0, i - i_index)
    tX = t_frameOffset * m_filmMember.width + m_mp_constants["FrameSpacing"].locH - m_pixelOffset
    tY = m_mp_constants["FrameSpacing"].locV
    tRect = rect(tX, tY, tX + tWidth, tY + tHeight)
    m_thumbNailStrip.copyPixels(thumb, tRect, thumb.rect)
  end repeat
end
on GetThumbnails me
  return m_thumbNailStrip
end
on setFilmAmount me, i_iAmount
  m_totalFrames = i_iAmount
end
on AddFilm me, i_iAmount
  me.setFilmAmount(m_totalFrames + i_iAmount)
end
on update me
end
on GetHideables me
  t_ar_hideables = []
  return t_ar_hideables
end