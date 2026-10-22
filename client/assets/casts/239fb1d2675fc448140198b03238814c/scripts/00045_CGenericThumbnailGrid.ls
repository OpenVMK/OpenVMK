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
property m_iSlotCount
property m_iHighlighted
property m_rSecondaryCol
property m_rSolidCol
property m_rGridBgCol
property m_sBlinkTimer
property m_bBlinkNext
property m_kSlotShapeType
property m_iSlotLineWidth
property m_rcThumbOffset
property m_ar_rLinkedGrids

on construct this
  m_iMarginH = 2
  m_iMarginV = 2
  m_rcItemSize = rect(0, 0, 40, 40)
  m_iSlotsPerRow = 6
  m_rBufferImg = VOID
  m_iSelected = 1
  m_iHighlighted = 0
  m_rImgElement = VOID
  m_rHiliterCol = rgb(255, 204, 0)
  m_rBorderCol = rgb(80, 160, 216)
  m_rSecondaryCol = rgb(190, 190, 255)
  m_rSolidCol = rgb(39, 86, 146)
  m_rGridBgCol = rgb(39, 86, 146)
  m_sBlinkTimer = "Highlight Blink Timer" && this.getID()
  m_iSlotCount = 0
  m_kSlotShapeType = #rect
  m_iSlotLineWidth = 2
  m_rcThumbOffset = rect(0, 0, 0, 0)
  m_ar_rLinkedGrids = []
  return 1
end
on deconstruct this
  if timeoutExists(m_sBlinkTimer) then
    removeTimeout(m_sBlinkTimer)
  end if
  m_rBufferImg = VOID
  m_rImgElement = VOID
  m_iSlotCount = 0
  m_ar_rLinkedGrids = []
  return 1
end
on SetMarginWidth this, a_iWidth
  m_iMarginH = a_iWidth
end
on SetMarginHeight this, a_iHeight
  m_iMarginV = a_iHeight
end
on SetBorderColor this, a_rColor
  m_rBorderCol = a_rColor
end
on SetHiglightColor this, a_rColor
  m_rHiliterCol = a_rColor
end
on SetSolidColor this, a_rColor
  m_rSolidCol = a_rColor
end
on SetGridBgColor this, a_rColor
  m_rGridBgCol = a_rColor
end
on SetSlotShapeType this, a_kShape
  m_kSlotShapeType = a_kShape
end
on SetSlotLineWidth this, a_iWidth
  m_iSlotLineWidth = a_iWidth
end
on SetThumbOffset this, a_iX, a_iY
  m_rcThumbOffset = rect(a_iX, a_iY, a_iX, a_iY)
end
on UnifySelectionWithGrid this, a_rGrid
  m_ar_rLinkedGrids.append(a_rGrid)
end
on SeparateSelectionWithGrid this, a_rGrid
  m_ar_rLinkedGrids.deleteOne(a_rGrid)
end
on GetSelected this
  return m_iSelected
end
on GetSlotCount this
  return m_iSlotCount
end
on SetItemState this, a_iRef, a_kState
  error(this, "Unimplemented method!", #SetItemState)
end
on MouseSelection this, a_ptLoc
  if m_iSlotCount > 0 then
    t_iRow = a_ptLoc.locV / (m_rcItemSize.height + 2 * m_iMarginV) + 1
    t_iSlot = a_ptLoc.locH / (m_rcItemSize.width + 2 * m_iMarginH) + 1
    this.select((t_iRow - 1) * m_iSlotsPerRow + t_iSlot)
  end if
end
on Highlight this, a_iSelected
  m_sBlinkTimer = "Highlight Blink Timer" && this.getID()
  if timeoutExists(m_sBlinkTimer) then
    removeTimeout(m_sBlinkTimer)
  end if
  this.DrawHighlight(a_iSelected)
  createTimeout(m_sBlinkTimer, 500, #blinkHighlights, this.getID(), VOID, 0)
  m_bBlinkNext = 0
  m_iHighlighted = a_iSelected
end
on blinkHighlights this
  if m_bBlinkNext then
    this.DrawHighlight(m_iHighlighted)
  else
    this.DrawUnhighlight()
  end if
  m_bBlinkNext = not m_bBlinkNext
end
on DrawRectInBuffer this, a_rBuffer, a_iSelection, a_rBorderCol
  if a_iSelection > 0 then
    if a_iSelection > m_iSlotCount then
      a_iSelection = m_iSlotCount
    end if
    t_iRow = (a_iSelection - 1) / m_iSlotsPerRow + 1
    t_iSlot = (a_iSelection - 1) mod m_iSlotsPerRow + 1
    t_iOffX = (t_iSlot - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
    t_iOffY = (t_iRow - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
    t_rDestRect = m_rcItemSize + [-1, -1, 1, 1] + [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
    a_rBuffer.draw(t_rDestRect, [#color: a_rBorderCol, #shapeType: m_kSlotShapeType, #lineSize: m_iSlotLineWidth])
  end if
end
on DrawHighlight this, a_iSelected
  if not voidp(m_rImgElement) then
    t_rBuffer = m_rImgElement.getProperty(#image)
    if a_iSelected < 0 then
      a_iSelected = 0
    end if
    if m_iSlotCount > 0 then
      this.DrawRectInBuffer(t_rBuffer, m_iHighlighted, m_rBorderCol)
      m_iHighlighted = a_iSelected
      if m_iHighlighted > 0 then
        this.DrawRectInBuffer(t_rBuffer, m_iHighlighted, m_rSecondaryCol)
      end if
    end if
    m_rImgElement.setProperty(#image, t_rBuffer)
  end if
  return 1
end
on select this, a_iSelected
  repeat with t_rGrid in m_ar_rLinkedGrids
    t_rGrid.Unselect()
  end repeat
  if voidp(m_rImgElement) then
    return 0
  end if
  t_rBuffer = m_rImgElement.getProperty(#image)
  if a_iSelected < 1 then
    a_iSelected = 1
  end if
  if m_iSlotCount > 0 then
    if m_iSlotCount >= m_iSelected and m_iSelected > 0 then
      this.DrawRectInBuffer(t_rBuffer, m_iSelected, m_rBorderCol)
    end if
    m_iSelected = a_iSelected
    if m_iSelected > m_iSlotCount then
      return this.Unselect()
    end if
    if m_iSelected > 0 then
      this.DrawRectInBuffer(t_rBuffer, m_iSelected, m_rHiliterCol)
    end if
  end if
  m_rImgElement.setProperty(#image, t_rBuffer)
  return 1
end
on Unselect this
  if not voidp(m_rImgElement) then
    t_rBuffer = m_rImgElement.getProperty(#image)
    if m_iSlotCount > 0 then
      if m_iSlotCount >= m_iSelected and m_iSelected > 0 then
        this.DrawRectInBuffer(t_rBuffer, m_iSelected, m_rBorderCol)
        m_rImgElement.setProperty(#image, t_rBuffer)
        m_iSelected = 0
      end if
    end if
  else
    m_iSelected = 0
  end if
end
on Unhighlight this
  if timeoutExists(m_sBlinkTimer) then
    removeTimeout(m_sBlinkTimer)
  end if
  this.DrawUnhighlight()
end
on DrawUnhighlight this
  if not voidp(m_rImgElement) then
    t_rBuffer = m_rImgElement.getProperty(#image)
    if m_iSlotCount >= m_iHighlighted and m_iHighlighted > 0 then
      this.DrawRectInBuffer(t_rBuffer, m_iHighlighted, m_rBorderCol)
      m_rImgElement.setProperty(#image, t_rBuffer)
    end if
  end if
end
on render this, a_ar_rThumbs, a_rImgElem
  m_rImgElement = a_rImgElem
  m_iSlotCount = a_ar_rThumbs.count
  t_iRowCount = m_iSlotCount / m_iSlotsPerRow + (m_iSlotCount mod m_iSlotsPerRow > 0)
  t_iMinRowCount = (m_rImgElement.getProperty(#height) - m_iMarginV - m_iMarginV) / m_rcItemSize.height
  if t_iRowCount < t_iMinRowCount then
    t_iRowCount = t_iMinRowCount
  end if
  t_iCurWidth = m_iSlotsPerRow * (m_rcItemSize.width + (m_iMarginH + m_iMarginH))
  t_iCurHeight = t_iRowCount * (m_rcItemSize.height + (m_iMarginV + m_iMarginV))
  t_iMinWidth = m_rImgElement.getProperty(#width)
  t_iMinHeight = m_rImgElement.getProperty(#height)
  m_rBufferImg = image(max(t_iCurWidth, t_iMinWidth), max(t_iCurHeight, t_iMinHeight), 32)
  m_iSlotsPerRow = m_rImgElement.getProperty(#width) / (m_rcItemSize.width + m_iMarginH)
  m_rBufferImg.fill(m_rBufferImg.rect, m_rGridBgCol)
  this.RenderBackground()
  t_iCurSlot = 0
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
    repeat with x = 1 to m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      if t_iCurSlot <= m_iSlotCount then
        t_rItem = a_ar_rThumbs[t_iCurSlot]
        t_rThumb = t_rItem[#thumbnail]
        t_iBlend = t_rItem[#blend]
        if not voidp(t_rThumb) then
          t_iOffX = (x - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
          t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
          t_rcTarget = this.centerInRect(t_rThumb.rect, m_rcItemSize + t_rcOff) + m_rcThumbOffset
          t_rThumb.useAlpha = 1
          m_rBufferImg.copyPixels(t_rThumb, t_rcTarget, m_rcItemSize, [#ink: 36, #blend: t_iBlend, #useFastQuads: 1])
        end if
        next repeat
      end if
    end repeat
  end repeat
  this.RenderForeGround(a_ar_rThumbs)
  m_rImgElement.feedImage(m_rBufferImg)
  return this.select(m_iSelected)
end
on RenderBackground this
  t_iRowCount = m_iSlotCount / m_iSlotsPerRow + (m_iSlotCount mod m_iSlotsPerRow > 0)
  t_iMinRowCount = (m_rImgElement.getProperty(#height) - m_iMarginV - m_iMarginV) / m_rcItemSize.height
  if t_iRowCount < t_iMinRowCount then
    t_iRowCount = t_iMinRowCount
  end if
  m_rBufferImg.fill(m_rBufferImg.rect, m_rSolidCol)
  t_iCurSlot = 0
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
    repeat with x = 1 to m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      t_iOffX = (x - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
      m_rBufferImg.draw(m_rcItemSize + [-1, -1, 1, 1] + t_rcOff, [#color: m_rBorderCol, #shapeType: m_kSlotShapeType, #lineSize: m_iSlotLineWidth])
    end repeat
  end repeat
end
on RenderForeGround this, a_ar_items
end
on centerInRect this, a_rcSrc, a_rcTarget
  t_iXdiff = (a_rcTarget.width - a_rcSrc.width) / 2
  t_iYdiff = (a_rcTarget.height - a_rcSrc.height) / 2
  if t_iXdiff >= 0 and t_iYdiff > 0 then
    return a_rcTarget + [t_iXdiff, t_iYdiff, t_iXdiff, t_iYdiff]
  else
    return a_rcTarget
  end if
end