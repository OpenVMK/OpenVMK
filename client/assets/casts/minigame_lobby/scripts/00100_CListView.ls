-- Script
property m_pImage
property m_ar_pItems
property m_iWidth
property m_iItemHeight
property m_fillColor

on construct me
  m_pImage = VOID
  m_ar_pItems = []
  m_iWidth = 0
  m_iItemHeight = 0
  m_fillColor = rgb("#EEEEEE")
end
on deconstruct me
  repeat with tItem in m_ar_pItems
    removeObject(tItem.getID())
  end repeat
  m_ar_pItems = []
end
on render me
  m_pImage = image(m_iWidth, m_iItemHeight * m_ar_pItems.count, 8)
  m_pImage.fill(m_pImage.rect, [#shapeType: #rect, #color: m_fillColor])
  call(#render, m_ar_pItems)
  i = 0
  repeat with tItem in m_ar_pItems
    tImage = tItem.getImage()
    tdestrect = rect(0, i * m_iItemHeight, tImage.rect.right, i * m_iItemHeight + tImage.rect.bottom)
    m_pImage.copyPixels(tImage, tdestrect, tImage.rect)
    i = i + 1
  end repeat
  return m_pImage
end
on clear me
  repeat with tItem in m_ar_pItems
    removeObject(tItem.getID())
  end repeat
  m_ar_pItems = []
end
on createItem me, i_sText
  tNewItem = createObject(#random, "CListItem")
  if not voidp(tNewItem) then
    tNewItem.setText(i_sText)
    m_ar_pItems.append(tNewItem)
  else
    error("Failed to create List Item", #createItem)
  end if
end
on selectItem me, i_iIndex, i_bVal
  if i_iIndex > 0 and i_iIndex <= m_ar_pItems.count then
    m_ar_pItems[i_iIndex].select(i_bVal)
  end if
end
on unselectAll me
  repeat with tItem in m_ar_pItems
    tItem.select(0)
  end repeat
end
on setItems me, i_ar_pItems
  m_ar_pItems = i_ar_pItems
end
on SetItemWidth me, i_iWidth
  m_iWidth = i_iWidth
end
on SetItemHeight me, i_iHeight
  m_iItemHeight = i_iHeight
end
on getItemClickedOn me, i_clickPos
  tLine = i_clickPos.locV / m_iItemHeight + 1
  return m_ar_pItems[tLine]
end
on getItemIndexClickedOn me, i_clickPos
  return the locV of i_clickPos / m_iItemHeight + 1
end
on getSelection me
  tOut = []
  repeat with i = 1 to m_ar_pItems.count
    if m_ar_pItems.GetSelected() then
      tOut.append(i)
    end if
  end repeat
  return tOut
end
on getItems me
  return m_ar_pItems
end
on getImage me
  return m_pImage
end