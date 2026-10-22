-- Movie Script
property m_ImgBg
property m_Img
property m_sWriterID
property m_tText
property m_pLinkedPage
property m_iMargin
property m_bState
property m_bSpecial
property m_iType
property m_sLand
property m_iWidth
property m_iHeight
property m_bNeedUpdate

on construct me
  m_bNeedUpdate = 1
  m_Img = VOID
  m_sWriterID = "HMDetailsListWriter" & getUniqueID()
  m_iMargin = 0
  m_bState = 0
  m_bSpecial = 0
  m_iType = 2
  m_sLand = VOID
  m_iWidth = 0
  m_iHeight = 0
  me.ResolveImage()
  tPlain = getStructVariable("struct.font.plain")
  tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb("#EEEEEE"), #bgColor: rgb("#FFFFFF"), #fixedLineSpace: 12]
  createWriter(m_sWriterID, tMetrics)
end
on deconstruct me
  removeWriter(m_sWriterID)
end
on render me
  if m_bNeedUpdate then
    tWriter = getWriter(m_sWriterID)
    t_pImage = tWriter.render(m_tText)
    t_Img = m_ImgBg.duplicate()
    t_Img.useAlpha = 0
    t_Img.copyPixels(t_pImage, rect(5, 2, t_pImage.width + 5, t_pImage.height + 2), t_pImage.rect)
    m_Img = t_Img
  end if
end
on ResolveImage me
  m_bSpecial = 0
  if not m_bState then
    m_ImgBg = image(m_iWidth, m_iHeight, 32)
    m_ImgBg.fill(m_ImgBg.rect, [#shapeType: #rect, #color: rgb("#001F55")])
  else
    m_ImgBg = image(m_iWidth, m_iHeight, 32)
    m_ImgBg.fill(m_ImgBg.rect, [#shapeType: #rect, #color: rgb("#038BBD")])
  end if
end
on GetMargin me
  return m_iMargin
end
on setText me, i_sText
  m_tText = i_sText
  me.render()
end
on setState me, a_bState
  if m_bState or a_bState then
    m_bNeedUpdate = 1
  else
    m_bNeedUpdate = 0
  end if
  if voidp(a_bState) then
    m_bState = not m_bState
  else
    m_bState = a_bState
  end if
  me.ResolveImage()
  return 1
end
on GetState me
  return m_bState
end
on SetWidth me, a_iWidth
  m_iWidth = a_iWidth
end
on SetHeight me, a_iHeight
  m_iHeight = a_iHeight
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