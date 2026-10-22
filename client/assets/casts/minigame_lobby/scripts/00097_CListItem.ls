-- Script
property m_pImage
property m_sWriterID
property m_tText
property m_bSelected

on construct me
  m_bSelected = 0
  m_pImage = VOID
  m_sWriterID = "ListItem:" & the milliSeconds
  tPlain = getStructVariable("struct.font.plain")
  tBold = getStructVariable("struct.font.bold")
  tLink = getStructVariable("struct.font.link")
  tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb("#080808"), #bgColor: rgb("#EEEEEE"), #fixedLineSpace: 15]
  createWriter(m_sWriterID, tMetrics)
end
on deconstruct me
  removeWriter(m_sWriterID)
end
on render me
  tWriter = getWriter(m_sWriterID)
  m_pImage = tWriter.render(m_tText)
  if m_bSelected then
    tFillImage = image(m_pImage.width, m_pImage.height, m_pImage.depth)
    tFillImage.fill(tFillImage.rect, [#shapeType: #rect, #color: rgb("#000050")])
    m_pImage.copyPixels(tFillImage, m_pImage.rect, tFillImage.rect, [#ink: 1, #blendLevel: 50])
  end if
end
on setText me, i_sText
  m_tText = i_sText
  me.render()
end
on select me, i_bVal
  m_bSelected = i_bVal
end
on getText me
  return m_tText
end
on getImage me
  return m_pImage
end
on GetSelected me
  return m_bSelected
end