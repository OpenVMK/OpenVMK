-- Script
property m_rWindowElement
property m_rHiliterCol
property m_iDelay
property m_iTimer
property m_pOffset
property m_rTargetRect
property m_rActiveImage
property m_rNormalImage
property m_rCurrentImage
property m_bBlinking
property m_bToggle

on construct me
  m_rWindowElement = VOID
  m_rHiliterCol = rgb(255, 204, 0)
  m_iDelay = 12
  m_rTargetRect = rect(0, 0, 0, 0)
  m_rActiveImage = image(0, 0, 32)
  m_rNormalImage = image(0, 0, 32)
  m_bToggle = 0
  m_bBlinking = 0
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  m_rWindowElement = VOID
  m_rHiliterCol = VOID
  m_iDelay = VOID
  m_rTargetRect = VOID
  m_rActiveImage = VOID
  m_rNormalImage = VOID
  m_bToggle = VOID
  m_bBlinking = VOID
  removeUpdate(me.getID())
  return 1
end
on Init me, a_rImgElem, a_rActiveImage, t_pOffset
  m_rWindowElement = a_rImgElem
  t_rElementImage = m_rWindowElement.getProperty(#image)
  m_rActiveImage = a_rActiveImage
  m_rNormalImage = a_rActiveImage.duplicate()
  m_rTargetRect = m_rActiveImage.rect + rect(t_pOffset, t_pOffset)
  m_rNormalImage.copyPixels(t_rElementImage, m_rNormalImage.rect, m_rTargetRect)
  m_bBlinking = 1
end
on blink me
  if m_bToggle then
    t_rBlinkImage = m_rActiveImage
  else
    t_rBlinkImage = m_rNormalImage
  end if
  t_rElementImage = m_rWindowElement.getProperty(#image)
  t_rElementImage.copyPixels(t_rBlinkImage, m_rTargetRect, t_rBlinkImage.rect)
  m_rWindowElement.setProperty(#image, t_rElementImage)
end
on reset me
  m_bBlinking = 0
  if voidp(m_rWindowElement) then
    exit
  end if
  m_bToggle = 0
  me.blink()
end
on update me
  if voidp(m_rWindowElement) then
    m_bBlinking = 0
  end if
  if m_iTimer = 1 and m_bBlinking then
    m_bToggle = not m_bToggle
    me.blink()
  end if
  m_iTimer = m_iTimer + 1
  if m_iTimer > m_iDelay then
    m_iTimer = 1
  end if
end