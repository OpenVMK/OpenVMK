-- Movie Script
property m_sWriterID
property m_tText
property m_pLink

on construct me
  m_sWriterID = "Scroller Write n:" & the milliSeconds
  tPlain = getStructVariable("struct.font.plain")
  createWriter(m_sWriterID, tPlain)
end
on deconstruct me
  removeWriter(m_sWriterID)
end
on render me, t_sText
  tWriter = getWriter(m_sWriterID)
  t_pImage = tWriter.render(t_sText)
  (the stage).image.fill(t_pImage.rect + rect(0, 0, 20, 5), [#color: rgb("#000000")])
  (the stage).image.copyPixels(t_pImage, rect(5, 2, t_pImage.width + 5, t_pImage.height + 2), t_pImage.rect)
end