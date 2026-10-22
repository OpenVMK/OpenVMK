-- Script
property m_rImgElement
property m_rHiliterCol
property m_rBorderCol
property m_iSelected
property m_rBufferImg
property m_rcItemSize
property m_iMarginH
property m_iMarginV
property m_iSlotsPerRow
property m_mp_iRef_rItem
property m_kCategory
property m_rRenderer

on construct this
  m_iMarginH = 1
  m_iMarginV = 1
  m_rcItemSize = rect(0, 0, 22, 22)
  m_iSlotsPerRow = 11
  m_mp_iRef_rItem = [:]
  m_rBufferImg = VOID
  m_iSelected = 1
  m_rImgElement = VOID
  m_rHiliterCol = rgb(255, 204, 0)
  m_rBorderCol = rgb(80, 160, 216)
  m_kCategory = VOID
  if objectExists("ItemRenderer") then
    m_rRenderer = getObject("ItemRenderer")
  else
    m_rRenderer = createObject("ItemRenderer", "CTestItemThumbRenderer")
  end if
  return 1
end
on deconstruct this
  m_rBufferImg = VOID
  m_rImgElement = VOID
  m_mp_iRef_rItem = VOID
  return 1
end
on GetSelected this
  if m_mp_iRef_rItem.count < m_iSelected then
    return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
  else
    return m_mp_iRef_rItem[m_iSelected]
  end if
end
on SetItemState this, a_iRef, a_kState
end
on MouseSelection this, a_ptLoc
  t_iRow = a_ptLoc.locV / (m_rcItemSize.height + 2 * m_iMarginV) + 1
  t_iSlot = a_ptLoc.locH / (m_rcItemSize.width + 2 * m_iMarginH) + 1
  this.select((t_iRow - 1) * m_iSlotsPerRow + t_iSlot)
end
on select this, a_iSelected
  t_rBuffer = m_rImgElement.getProperty(#image)
  t_iItemCount = m_mp_iRef_rItem.count
  if t_iItemCount > 0 then
    if t_iItemCount >= m_iSelected then
      t_iRow = (m_iSelected - 1) / m_iSlotsPerRow + 1
      t_iSlot = (m_iSelected - 1) mod m_iSlotsPerRow + 1
      t_iOffX = (t_iSlot - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      t_iOffY = (t_iRow - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
      t_rBuffer.draw(m_rcItemSize + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
    end if
    m_iSelected = a_iSelected
    if m_iSelected > t_iItemCount then
      m_iSelected = t_iItemCount
    end if
    if m_iSelected > 0 then
      t_iRow = (m_iSelected - 1) / m_iSlotsPerRow + 1
      t_iSlot = (m_iSelected - 1) mod m_iSlotsPerRow + 1
      t_iOffX = (t_iSlot - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      t_iOffY = (t_iRow - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
      t_rBuffer.draw(m_rcItemSize + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], [#color: m_rHiliterCol, #shapeType: #rect, #lineSize: 2])
    end if
  end if
  m_rImgElement.setProperty(#image, t_rBuffer)
  return 1
end
on render this, a_mp_iRef_rItem, a_rImgElem
  m_mp_iRef_rItem = a_mp_iRef_rItem
  m_rImgElement = a_rImgElem
  t_iItemCount = m_mp_iRef_rItem.count
  t_iRowCount = t_iItemCount / m_iSlotsPerRow + 1
  t_iRowCount = max(t_iRowCount, 4)
  t_iCurWidth = m_iSlotsPerRow * (m_rcItemSize.width + (m_iMarginH + m_iMarginH))
  t_iCurHeight = t_iRowCount * (m_rcItemSize.height + (m_iMarginV + m_iMarginV))
  t_iMinWidth = a_rImgElem.getProperty(#width)
  t_iMinHeight = a_rImgElem.getProperty(#height)
  m_rBufferImg = image(max(t_iCurWidth, t_iMinWidth), max(t_iCurHeight, t_iMinHeight), 32)
  m_rBufferImg.fill(m_rBufferImg.rect, rgb("001F55"))
  t_iCurSlot = 0
  t_rFill = image(22, 22, 32)
  t_rFill.fill(t_rFill.rect, rgb(39, 86, 146))
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
    repeat with x = 1 to m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      t_iOffX = (x - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
      m_rBufferImg.copyPixels(t_rFill, m_rcItemSize + t_rcOff, m_rcItemSize, [#ink: 0])
    end repeat
  end repeat
  t_mp_iType_rThumb = [:]
  repeat with i = 1 to m_mp_iRef_rItem.count
    if memberExists("emoticon_tn_" & m_mp_iRef_rItem[i]) then
      t_Img = getMember("emoticon_tn_" & m_mp_iRef_rItem[i]).image.duplicate()
      t_mp_iType_rThumb.addProp(m_mp_iRef_rItem[i], t_Img)
    end if
  end repeat
  t_iCurSlot = 0
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
    repeat with x = 1 to m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      if t_iCurSlot > a_mp_iRef_rItem.count then
        exit repeat
      end if
      t_rItem = m_mp_iRef_rItem[t_iCurSlot]
      t_rThumbImg = t_mp_iType_rThumb.getaProp(t_rItem)
      t_iOffX = (x - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      m_rBufferImg.copyPixels(t_rThumbImg, m_rcItemSize + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], m_rcItemSize, [#ink: 36])
      m_rBufferImg.draw(m_rcItemSize + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
    end repeat
  end repeat
  m_rImgElement.feedImage(m_rBufferImg)
  return this.select(m_iSelected)
end