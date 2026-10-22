-- Script
property m_ImgBg
property m_Img
property m_sWriterPlainID
property m_tText
property m_pLinkedPage
property m_iMargin
property m_bState
property m_bSpecial
property m_iType
property m_sLand
property m_iWidth
property m_iTab1
property m_iTab2
property m_textColor

on construct me
  m_Img = VOID
  m_sWriterPlainID = "RoomInstanceItem" & getUniqueID()
  m_iMargin = 0
  m_bState = 0
  m_bSpecial = 0
  m_iType = 2
  m_sLand = VOID
  m_iWidth = 0
  m_iTab1 = 20
  m_iTab2 = 200
  m_textColor = rgb(0, 0, 0)
end
on deconstruct me
  removeWriter(m_sWriterPlainID)
end
on render me
  if not writerExists(m_sWriterPlainID) then
    tPlain = getStructVariable("struct.font.plain").duplicate()
    tPlain.color = m_textColor
    tPlain.setaProp(#bgColor, rgb(255, 255, 255))
    createWriter(m_sWriterPlainID, tPlain)
  end if
  tWriter = getWriter(m_sWriterPlainID)
  t_pImage = tWriter.render(m_tText)
  me.ResolveImage()
  t_Img = m_ImgBg
  t_Img.useAlpha = 0
  t_Img.copyPixels(t_pImage, rect(0, 0, t_pImage.width, t_pImage.height), t_pImage.rect)
  t_pImage = tWriter.render(m_pLinkedPage.name)
  t_Img.copyPixels(t_pImage, rect(m_iTab1, 0, t_pImage.width + m_iTab1, t_pImage.height), t_pImage.rect)
  t_pImage = tWriter.render(string(m_pLinkedPage.score))
  t_Img.copyPixels(t_pImage, rect(m_iTab2, 0, t_pImage.width + m_iTab2, t_pImage.height), t_pImage.rect)
  m_Img = t_Img
end
on ResolveImage me
  m_ImgBg = image(m_iWidth, 18, 32)
end
on GetMargin me
  return m_iMargin
end
on setText me, i_sText
  m_tText = i_sText
end
on setState me, a_bState
  if voidp(a_bState) then
    m_bState = not m_bState
    me.ResolveImage()
  else
    m_bState = a_bState
    me.ResolveImage()
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
end
on SetWidth me, a_iWidth
  m_iTab2 = a_iWidth - 30
  m_iTab2 = min(m_iTab2, 200)
  m_iWidth = a_iWidth
end
on setLink me, a_iLink
  m_pLinkedPage = a_iLink
end
on setColor me, a_rgbColor
  m_textColor = a_rgbColor
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