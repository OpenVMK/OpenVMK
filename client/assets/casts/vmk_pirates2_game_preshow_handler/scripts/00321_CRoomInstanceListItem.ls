-- Movie Script
property m_ImgBg
property m_Img
property m_sWriterPlainID
property m_sWriterBoldID
property m_tText
property m_pLinkedPage
property m_iMargin
property m_bState
property m_bSpecial
property m_iType
property m_sLand
property m_imgUnselected
property m_imgSelected

on construct me
  m_Img = VOID
  m_sWriterPlainID = "RoomInstanceItem" & getUniqueID()
  m_sWriterBoldID = "RoomInstanceItem" & getUniqueID()
  m_iMargin = 0
  m_bState = 0
  m_bSpecial = 0
  m_iType = 2
  m_sLand = VOID
  m_tText = EMPTY
  tPlain = getStructVariable("struct.font.plain")
  tBold = getStructVariable("struct.font.bold")
  tLink = getStructVariable("struct.font.link")
  tBold.color = rgb(255, 80, 80)
  createWriter(m_sWriterPlainID, tPlain)
  createWriter(m_sWriterBoldID, tBold)
  me.ResolveImage()
end
on deconstruct me
  removeWriter(m_sWriterPlainID)
  removeWriter(m_sWriterBoldID)
end
on render me
  if m_bState then
    m_Img = m_imgSelected
  else
    m_Img = m_imgUnselected
  end if
end
on ResolveImage me
  m_ImgBg = image(164, 20, 32)
  tWriter = getWriter(m_sWriterBoldID)
  t_pImage = tWriter.render(m_tText)
  t_Img = m_ImgBg.duplicate()
  t_Img.useAlpha = 0
  t_Img.copyPixels(t_pImage, rect(0, 0, t_pImage.width, t_pImage.height), t_pImage.rect)
  m_imgSelected = t_Img
  tWriter = getWriter(m_sWriterPlainID)
  t_pImage = tWriter.render(m_tText)
  t_Img = m_ImgBg.duplicate()
  t_Img.useAlpha = 0
  t_Img.copyPixels(t_pImage, rect(0, 0, t_pImage.width, t_pImage.height), t_pImage.rect)
  m_imgUnselected = t_Img
end
on GetMargin me
  return m_iMargin
end
on setText me, i_sText
  m_tText = i_sText
  me.ResolveImage()
  me.render()
end
on setState me, a_bState
  if voidp(a_bState) then
    m_bState = not m_bState
    me.render()
  else
    m_bState = a_bState
    me.render()
  end if
  return 1
end
on GetState me
  return m_bState
end
on setLand me, a_sLand
  m_sLand = a_sLand
end
on setSpecial me, a_bSpecial
  m_bSpecial = a_bSpecial
  me.render()
end
on setLink me, a_iLink
  m_pLinkedPage = a_iLink
end
on GetType me
  return m_iType
end
on getText me
  return m_tText
end
on getLink me
  return m_pLinkedPage
end
on getImage me
  return m_Img
end
on getLand me
  return m_sLand
end