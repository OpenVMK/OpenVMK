-- Script
property m_pBgImg
property m_pImage
property m_sWriterID
property m_sText
property m_bSelected
property m_bUpdate

on construct me
  m_bSelected = 0
  m_sWriterID = "Music Mixer Song List Item n:" & the milliSeconds
  me.ResolveImage()
  m_pImage = m_pBgImg.image.duplicate()
  tPlain = getStructVariable("struct.font.plain")
  tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb("#efefef"), #bgColor: rgb("#EEEEEE"), #fixedLineSpace: 15]
  createWriter(m_sWriterID, tMetrics)
  me.render()
  m_bUpdate = 1
end
on deconstruct me
  removeWriter(m_sWriterID)
end
on render me
  if m_bUpdate then
    me.ResolveImage()
    tWriter = getWriter(m_sWriterID)
    t_pImage = tWriter.render(m_sText)
    t_Img = m_pBgImg.image.duplicate()
    t_Img.useAlpha = 0
    t_Img.copyPixels(t_pImage, rect(5, 2, t_pImage.width + 5, t_pImage.height + 2), t_pImage.rect)
    m_pImage = t_Img
    m_bUpdate = 0
  end if
end
on ResolveImage me
  case m_bSelected of
    0:
      m_pBgImg = getMember("field.i.active")
    1:
      m_pBgImg = member(getmemnum("field.i.selected"))

  end case
end
on reset me
  m_bUpdate = 1
  m_bSelected = 0
  me.render()
end
on Activate me
  m_bUpdate = 1
  m_bSelected = 1
end
on deactivate me
  m_bUpdate = 1
  m_bSelected = 0
end
on setText me, i_Text
  m_sText = i_Text
end
on getImage me
  return m_pImage
end