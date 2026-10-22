-- Script
property m_pImage
property m_fontConfig
property m_BitmapFont
property m_Blank

on construct me
  m_BitmapFont = [:]
  m_fontConfig = [#width: 10, #height: 10, #stepV: 4, #stepH: 2]
  m_pImage = image(0, 0, 32)
  m_Blank = image(0, 0, 32)
  return 1
end
on deconstruct me
end
on Init me, t_sFontName
  m_fontConfig = getVariableValue(t_sFontName & ".config")
  m_BitmapFont = me.createFontFromBitmap(t_sFontName)
  m_Blank = image(m_fontConfig.width, m_fontConfig.height, 32)
  m_Blank.fill(m_Blank.rect, [#color: rgb("#000000")])
end
on getChar me, t_char
  if not voidp(m_BitmapFont.getaProp(t_char)) then
    return m_BitmapFont[t_char]
  end if
  return m_Blank
end
on createFontFromBitmap me, mbrName
  t_fontMem = member(getmemnum(mbrName))
  t_BitmapFont = [:]
  if t_fontMem <> 0 then
    if m_fontConfig <> 0 then
      t_fontImage = t_fontMem.image
      fontHeight = t_fontImage.height
      m_fontConfig.height = fontHeight
      t_offsetX = 0
      t_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:!?"
      repeat with i = 1 to t_chars.char.count
        t_char = t_chars.char[i]
        if not voidp(m_fontConfig.getaProp(t_char)) then
          t_width = m_fontConfig[t_char]
        else
          t_width = m_fontConfig.width
        end if
        t_bitmapChar = image(t_width, fontHeight, 32)
        t_bitmapChar.copyPixels(t_fontImage, t_bitmapChar.rect, t_bitmapChar.rect + rect(t_offsetX, 0, t_offsetX, 0))
        t_BitmapFont[t_char] = t_bitmapChar
        t_offsetX = t_offsetX + t_width
      end repeat
    end if
  end if
  return t_BitmapFont
end