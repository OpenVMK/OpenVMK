-- Script
property m_iIndex
property m_iLength
property m_rBuffer
property m_iBufferWidth
property m_iBufferHeight
property m_rElement
property m_ar_rImage
property m_iUpdateFrequency
property m_iLastMilliSeconds

on construct this
  m_iIndex = 0
  m_iLength = 0
  this.SetBufferElement(VOID)
  t_ar_rImages = []
  repeat with i = 1 to 8
    t_ar_rImages.add(getMember("thumbload_" & i).image)
  end repeat
  this.LoadAnimation(t_ar_rImages)
  return 1
end
on deconstruct this
  removeUpdate(this.getID())
  m_iIndex = 0
  m_iLength = 0
  m_rBuffer = VOID
  m_ar_rImage = []
  m_rElement = VOID
  return 1
end
on LoadAnimation this, a_ar_rImage
  m_iIndex = 0
  m_iLength = a_ar_rImage.count
  m_ar_rImage = a_ar_rImage
end
on SetBufferElement this, a_rElement
  m_rElement = a_rElement
  if voidp(m_rElement) then
    m_iBufferWidth = 0
    m_iBufferHeight = 0
  else
    m_iBufferWidth = a_rElement.getProperty(#width)
    m_iBufferHeight = a_rElement.getProperty(#height)
  end if
  m_rBuffer = image(m_iBufferWidth, m_iBufferHeight, 32)
end
on update this
  m_iIndex = m_iIndex + 1
  t_rFrame = m_ar_rImage[m_iIndex]
  t_rcTarget = rect(m_rBuffer.width / 2 - t_rFrame.width / 2, m_rBuffer.height / 2 - t_rFrame.height / 2, m_rBuffer.width / 2 + t_rFrame.width / 2, m_rBuffer.height / 2 + t_rFrame.height / 2)
  m_rBuffer.copyPixels(t_rFrame, t_rcTarget, t_rFrame.rect)
  if m_rElement <> VOID then
    m_rElement.feedImage(m_rBuffer)
  end if
  if m_iIndex = m_iLength then
    m_iIndex = 0
  end if
end