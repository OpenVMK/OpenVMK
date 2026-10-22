-- Script
property m_image

on construct me
  m_image = VOID
  return 1
end
on deconstruct me
  return 1
end
on CreateImage me, i_cMemberName, i_rCollisionMap
  tmember = getMember(i_cMemberName)
  m_image = image((the stage).image.width, (the stage).image.height, 24)
  repeat with y = 1 to m_image.height
    repeat with x = 1 to m_image.width
      tVal = i_rCollisionMap.TestPointToCMap(InverseAxonometricPosition(point(x, y)))
      tColor = rgb(50 * tVal, 50 * tVal, 0)
      m_image.setPixel(x, y, tColor)
    end repeat
  end repeat
  tmember.image = m_image
end