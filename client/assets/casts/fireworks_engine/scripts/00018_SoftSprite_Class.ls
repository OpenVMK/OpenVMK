-- Script
property m_pos
property m_image
property m_width
property m_height

on construct me
  m_pos = vector(0, 0, 0)
  m_image = VOID
  m_width = 0
  m_height = 0
end
on deconstruct me
end
on copyBlit me, i_posX, i_posY, o_buffer
  o_buffer.copyPixels(m_image, rect(i_posX, i_posY, i_posX + m_width, i_posY + m_height), m_image.rect, [#ink: 0])
end
on addPinBlit me, i_posX, i_posY, o_buffer
  o_buffer.copyPixels(m_image, rect(i_posX, i_posY, i_posX + m_width, i_posY + m_height), m_image.rect, [#ink: 33])
end
on transparentBlit me, i_posX, i_posY, i_transparency, o_buffer
  o_buffer.copyPixels(m_image, rect(i_posX, i_posY, i_posX + m_width, i_posY + m_height), m_image.rect, [#ink: 32, #blendLevel: i_transparency])
end
on inkBlit me, i_rect, i_ink, o_buffer
  o_buffer.copyPixels(m_image, i_rect, m_image.rect, i_ink)
end
on scaledCopyBlit me, i_rect, o_buffer
  o_buffer.copyPixels(m_image, i_rect, m_image.rect, [#ink: 0])
end
on scaledAddPinBlit me, i_rect, o_buffer
  o_buffer.copyPixels(m_image, i_rect, m_image.rect, [#ink: 33])
end
on scaledTransparentBlit me, i_rect, i_transparency, o_buffer
  o_buffer.copyPixels(m_image, i_rect, m_image.rect, [#ink: 32, #blendLevel: i_transparency])
end
on scaledInkBlit me, i_rect, i_ink, o_buffer
  o_buffer.copyPixels(m_image, i_rect, m_image.rect, i_ink)
end
on setImage me, i_image
  if not ilk(i_image, #image) then
    put "SoftSprite Class : setImage() : not a valid input image"
    return 0
  end if
  m_image = i_image
  m_width = m_image.width
  m_height = m_image.height
  return 1
end
on setCoordinates me, i_vector
  m_pos = i_vector
end
on getCoordinates me
  return m_pos
end
on getWidth me
  return m_width
end
on getHeight me
  return m_height
end