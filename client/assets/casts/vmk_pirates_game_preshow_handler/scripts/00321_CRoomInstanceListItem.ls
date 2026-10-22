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

on construct me
  m_Img = VOID
  m_sWriterPlainID = "RoomInstanceItem" & getUniqueID()
  m_sWriterBoldID = "RoomInstanceItem" & getUniqueID()
  m_iMargin = 0
  m_bState = 0
  m_bSpecial = 0
  m_iType = 2
  m_sLand = VOID
  me.ResolveImage()
  tPlain = getStructVariable("struct.font.plain")
  tBold = getStructVariable("struct.font.bold")
  tLink = getStructVariable("struct.font.link")
  tBold.color = rgb(255, 80, 80)
  createWriter(m_sWriterPlainID, tPlain)
  createWriter(m_sWriterBoldID, tBold)
end
on deconstruct me
  removeWriter(m_sWriterPlainID)
  removeWriter(m_sWriterBoldID)
end
on render me
  if m_bState then
    tWriter = getWriter(m_sWriterBoldID)
  else
    tWriter = getWriter(m_sWriterPlainID)
  end if
  t_pImage = tWriter.render(m_tText)
  t_Img = m_ImgBg.duplicate()
  t_Img.useAlpha = 0
  t_Img.copyPixels(t_pImage, rect(0, 0, t_pImage.width, t_pImage.height), t_pImage.rect)
  m_Img = t_Img
end
on ResolveImage me
  m_ImgBg = image(144, 20, 32)
end
on GetMargin me
  return m_iMargin
end
on setText me, i_sText
  m_tText = i_sText
  me.render()
end
on setState me, a_bState
  if voidp(a_bState) then
    m_bState = not m_bState
    me.ResolveImage()
    me.render()
  else
    m_bState = a_bState
    me.ResolveImage()
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