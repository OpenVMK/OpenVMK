-- Script
property m_rCountWriter
property m_rcThumbSize

on construct this
  t_rPlain = getStructVariable("struct.font.plain")
  t_rMetrics = [#font: t_rPlain.getaProp(#font), #fontStyle: t_rPlain.getaProp(#fontStyle), #color: rgb(250, 250, 250), #bgColor: rgb(255, 255, 255), #fixedLineSpace: 12, #wordWrap: 0, #rect: rect(0, 0, 12, 12)]
  t_sWriter = "GroupedThumbnailGrid" && the milliSeconds
  if createWriter(t_sWriter, t_rMetrics) then
    m_rCountWriter = getWriter(t_sWriter)
  end if
  m_rcThumbSize = rect(0, 0, 42, 42)
  this.m_rcItemSize = rect(0, 0, 62, 42)
  this.m_iMarginH = 1
  this.m_iMarginV = 1
  return 1
end
on deconstruct this
  removeWriter(m_rCountWriter.getID())
  m_rCountWriter = VOID
  callAncestor(#deconstruct, this)
end
on DrawRectInBuffer this, a_rBuffer, a_iSelection, a_rBorderCol
  if a_iSelection > 0 then
    if a_iSelection > this.m_iSlotCount then
      a_iSelection = this.m_iSlotCount
    end if
    t_iRow = (a_iSelection - 1) / this.m_iSlotsPerRow + 1
    t_iSlot = (a_iSelection - 1) mod this.m_iSlotsPerRow + 1
    t_iOffX = (t_iSlot - 1) * (this.m_rcItemSize.width + this.m_iMarginH + this.m_iMarginH) + this.m_iMarginH
    t_iOffY = (t_iRow - 1) * (this.m_rcItemSize.height + this.m_iMarginV + this.m_iMarginV) + this.m_iMarginV
    t_rDestRect = m_rcThumbSize + [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
    a_rBuffer.draw(t_rDestRect, [#color: a_rBorderCol, #shapeType: this.m_kSlotShapeType, #lineSize: this.m_iSlotLineWidth])
  end if
end
on render this, a_ar_rThumbs, a_rImgElem
  this.m_rImgElement = a_rImgElem
  this.m_iSlotCount = a_ar_rThumbs.count
  t_iRowCount = this.m_iSlotCount / this.m_iSlotsPerRow + (this.m_iSlotCount mod this.m_iSlotsPerRow > 0)
  t_iMinRowCount = (this.m_rImgElement.getProperty(#height) - this.m_iMarginV - this.m_iMarginV) / this.m_rcItemSize.height
  if t_iRowCount < t_iMinRowCount then
    t_iRowCount = t_iMinRowCount
  end if
  t_iCurWidth = this.m_iSlotsPerRow * (this.m_rcItemSize.width + (this.m_iMarginH + this.m_iMarginH))
  t_iCurHeight = t_iRowCount * (this.m_rcItemSize.height + (this.m_iMarginV + this.m_iMarginV))
  t_iMinWidth = this.m_rImgElement.getProperty(#width)
  t_iMinHeight = this.m_rImgElement.getProperty(#height)
  this.m_rBufferImg = image(max(t_iCurWidth, t_iMinWidth), max(t_iCurHeight, t_iMinHeight), 32)
  this.m_iSlotsPerRow = this.m_rImgElement.getProperty(#width) / (this.m_rcItemSize.width + this.m_iMarginH)
  this.RenderBackground()
  t_iCurSlot = 0
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (this.m_rcItemSize.height + this.m_iMarginV + this.m_iMarginV) + this.m_iMarginV
    repeat with x = 1 to this.m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      if t_iCurSlot <= this.m_iSlotCount then
        t_rItem = a_ar_rThumbs[t_iCurSlot]
        t_rThumb = t_rItem[#thumbnail]
        t_iBlend = t_rItem[#blend]
        t_iCount = t_rItem[#items]
        if not voidp(t_rThumb) then
          t_iOffX = (x - 1) * (this.m_rcItemSize.width + this.m_iMarginH + this.m_iMarginH) + this.m_iMarginH
          t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
          t_rcTarget = t_rThumb.rect + t_rcOff + [2, 2, 2, 2]
          this.m_rBufferImg.fill(t_rcTarget, this.m_rSolidCol)
          t_rThumb.useAlpha = 1
          this.m_rBufferImg.copyPixels(t_rThumb, t_rcTarget, t_rThumb.rect, [#ink: 36, #blend: t_iBlend, #useFastQuads: 1])
          t_rCount = m_rCountWriter.render(string(t_iCount))
          this.m_rBufferImg.copyPixels(t_rCount, t_rCount.rect + t_rcOff + [45, 28, 45, 28], t_rCount.rect)
        end if
        next repeat
      end if
    end repeat
  end repeat
  this.RenderForeGround(a_ar_rThumbs)
  this.m_rImgElement.feedImage(this.m_rBufferImg)
  return this.select(the m_iSelected of this)
end
on RenderBackground this
  t_iRowCount = this.m_iSlotCount / this.m_iSlotsPerRow + (this.m_iSlotCount mod this.m_iSlotsPerRow > 0)
  t_iMinRowCount = (this.m_rImgElement.getProperty(#height) - this.m_iMarginV - this.m_iMarginV) / this.m_rcItemSize.height
  if t_iRowCount < t_iMinRowCount then
    t_iRowCount = t_iMinRowCount
  end if
  this.m_rBufferImg.fill(this.m_rBufferImg.rect, this.m_rGridBgCol)
  t_iCurSlot = 0
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (this.m_rcItemSize.height + this.m_iMarginV + this.m_iMarginV) + this.m_iMarginV
    repeat with x = 1 to this.m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      t_iOffX = (x - 1) * (this.m_rcItemSize.width + this.m_iMarginH + this.m_iMarginH) + this.m_iMarginH
      t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
      t_rcRect = this.m_rcItemSize + t_rcOff - [0, 0, 2, 0]
      this.m_rBufferImg.fill(t_rcRect, [#color: this.m_rBorderCol, #shapeType: #rect])
      this.m_rBufferImg.draw(point(t_rcRect.right + 0, t_rcRect.top + 1), point(t_rcRect.right + 0, t_rcRect.bottom - 1), this.m_rBorderCol)
      this.m_rBufferImg.draw(point(t_rcRect.right + 1, t_rcRect.top + 2), point(t_rcRect.right + 1, t_rcRect.bottom - 2), this.m_rBorderCol)
    end repeat
  end repeat
end
on blinkHighlights this
  callAncestor(#blinkHighlights, this)
end