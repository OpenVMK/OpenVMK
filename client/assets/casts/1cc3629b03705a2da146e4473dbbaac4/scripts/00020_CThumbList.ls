-- Movie Script
property m_Img
property m_width
property m_height
property m_margin
property m_dimHorz
property m_dimVert
property m_ar_items

on construct me
  m_Img = image(0, 0, 32)
  m_width = 0
  m_height = 0
  m_margin = 4
  m_dimHorz = 4
  m_dimVert = 3
  m_ar_items = []
  return 1
end
on deconstruct me
  return 1
end
on SetDimensions me, a_iWidth, a_iHeight
  m_width = a_iWidth
  m_height = a_iHeight
end
on clear me
  m_ar_items = []
end
on CalculateRects me
  tY = 0
  indx = 1
  repeat with y = 1 to m_dimVert
    tX = 0
    repeat with x = 1 to m_dimHorz
      if m_ar_items.count >= indx then
        tRect = rect(tX, tY, tX + 80, tY + 53)
        m_ar_items[indx].rect = tRect
        tX = tX + 80 + m_margin
      end if
      indx = indx + 1
    end repeat
    tY = tY + 53 + m_margin
  end repeat
end
on addItem me, a_iID, a_rImage
  m_ar_items.append([#id: a_iID, #image: a_rImage, #rect: rect(0, 0, 0, 0)])
  me.CalculateRects()
end
on render me
  tImg = image(m_width, m_height, 32)
  indx = 1
  repeat with y = 1 to m_dimVert
    repeat with x = 1 to m_dimHorz
      if m_ar_items.count >= indx then
        tSource = m_ar_items[indx].image
        tImg.copyPixels(tSource, m_ar_items[indx].rect, tSource.rect)
      end if
      indx = indx + 1
    end repeat
  end repeat
  m_Img = tImg
  return m_Img
end
on getImage me
  return m_Img
end
on getClickedID me, a_pLoc
  repeat with tItem in m_ar_items
    if inside(a_pLoc, tItem.rect) then
      return the id of tItem
    end if
  end repeat
  return VOID
end
on getMaxCount me
  return m_dimVert * m_dimHorz
end
on getNextID me, a_iCurrentID
  repeat with i = 1 to m_ar_items.count
    if m_ar_items[i].id = a_iCurrentID then
      if i < m_ar_items.count then
        return the id of m_ar_items[i + 1]
      end if
    end if
  end repeat
  return a_iCurrentID
end
on getPrevID me, a_iCurrentID
  repeat with i = 1 to m_ar_items.count
    if m_ar_items[i].id = a_iCurrentID then
      if i > 1 then
        return the id of m_ar_items[i - 1]
      end if
    end if
  end repeat
  return a_iCurrentID
end
on getLastID me
  return the id of m_ar_items[the count of m_ar_items]
end
on getFirstID me
  return the id of m_ar_items[1]
end