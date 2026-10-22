-- Script
property m_sClientID
property m_pImage
property m_pBgImg
property m_BitmapFont
property m_iAngle
property m_pOffset

on construct me
  m_pImage = image(0, 0, 32)
  m_sClientID = EMPTY
  m_pBgImg = 0
  m_BitmapFont = 0
  me.setAngle(60)
  m_pOffset = point(0, 0)
  me.clearArea()
  return 1
end
on deconstruct me
  t_sName = me.getID() & ".bitmapfont"
  if getObject(t_sName) <> 0 then
    removeObject(t_sName)
  end if
end
on Init me, t_sClientID, t_sFontName, t_iWidth, t_iHeight
  m_sClientID = t_sClientID
  m_pImage = image(t_iWidth, t_iHeight, 32)
  m_BitmapFont = createObject(me.getID() & ".bitmapfont", "CBitmapFont")
  m_BitmapFont.Init(t_sFontName)
  me.clearArea()
end
on SetOffset me, t_point
  if t_point.ilk = #point then
    m_pOffset = t_point
  end if
end
on passEvent me, tObject
  if tObject = 0 then
    return 0
  else
    if tObject.handlers().getOne(#scrollerUpdate) = 0 then
      return 0
    end if
  end if
  return 1
end
on render me, t_sText
  me.updateDisplay(t_sText)
  tObject = getObjectManager().get(m_sClientID)
  if me.passEvent(tObject) then
    call(#scrollerUpdate, tObject, m_pImage)
  end if
end
on updateDisplay me, i_Text
  me.clearArea()
  t_offsetX = 0
  t_offsetY = 0
  repeat with i = 1 to i_Text.char.count
    t_char = i_Text.char[i]
    t_Img = m_BitmapFont.getChar(t_char)
    t_offsetY = t_offsetX * cos(m_iAngle)
    t_totalOffset = rect(t_offsetX, t_offsetY, t_offsetX, t_offsetY) + rect(m_pOffset, m_pOffset)
    m_pImage.copyPixels(t_Img, t_Img.rect + t_totalOffset, t_Img.rect)
    t_offsetX = t_offsetX + t_Img.width
  end repeat
end
on clearArea me, i_angle
  m_pImage.fill(m_pImage.rect, [#color: rgb("#000000")])
end
on setAngle me, i_angle
  if voidp(i_angle) then
    m_iAngle = 60 * PI / 180.0
  else
    m_iAngle = i_angle * PI / 180.0
  end if
end
on getImage me
  return m_pImage
end