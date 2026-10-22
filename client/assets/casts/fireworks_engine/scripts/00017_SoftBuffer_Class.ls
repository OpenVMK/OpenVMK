-- Script
property m_pImage
property m_size
property m_clearType
property m_clearColor
property m_pClearImage
property m_clearParams

on construct me
  m_pImage = VOID
  m_pClearImage = VOID
  m_size = point(0, 0)
  m_clearType = #fill
  m_clearColor = color(0, 0, 0)
  m_clearParams = VOID
end
on deconstruct me
end
on clear me
  if not m_pImage then
    put "SoftBuffer Class : clear() : buffer image source not valid!"
    exit
  end if
  case m_clearType of
    #fill:
      m_pImage.fill(0, 0, m_pImage.width, m_pImage.height, [#color: m_clearColor])
    #copy:
      m_pImage.copyPixels(m_pClearImage, rect(0, 0, m_pImage.width, m_pImage.height), rect(0, 0, m_pClearImage.width, m_pClearImage.height), m_clearParams)

  end case
end
on setBuffer me, i_image
  if not ilk(i_image, #image) then
    put "SoftBuffer Class : setBuffer() : not a valid input image"
    return 0
  end if
  m_pImage = i_image
  return 1
end
on useOpaqueFillClear me, i_color
  m_clearType = #fill
  m_clearParams = VOID
  m_clearColor = i_color
end
on useTransparentFillClear me, i_color, i_transparency
  m_clearType = #copy
  m_clearColor = VOID
  m_pClearImage = image(m_pImage.width, m_pImage.height, m_pImage.depth)
  m_pClearImage.fill(0, 0, m_pImage.width, m_pImage.height, [#color: i_color])
  m_clearParams = [#useFastQuads: 1, #ink: 32, #blendLevel: i_transparency]
end
on useOpaqueCopyClear me, i_clearImage
  m_clearType = #copy
  m_pClearImage = i_clearImage
  m_clearParams = [#useFastQuads: 1, #ink: 0]
end
on useTransparentCopyClear me, i_clearImage, i_transparency
  m_clearType = #copy
  m_clearColor = VOID
  m_pClearImage = i_clearImage
  m_clearParams = [#useFastQuads: 1, #ink: 32, #blendLevel: i_transparency]
end
on getImage me
  return m_pImage
end