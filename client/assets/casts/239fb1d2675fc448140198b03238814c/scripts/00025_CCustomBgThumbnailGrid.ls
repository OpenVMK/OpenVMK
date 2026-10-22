-- Parent Script
property m_ar_graphics

on construct this
  m_ar_graphics = [#bg: VOID, #border: VOID, #hiliter: VOID, #secondary: VOID]
  return 1
end
on deconstruct this
  repeat with t_rGfx in m_ar_graphics
    t_rGfx = VOID
  end repeat
  m_ar_graphics = VOID
  return 1
end
on DefineGraphics this, a_sSlotBg, a_ar_borders
  if voidp(a_ar_borders) then
    t_ar_borders = [#border: a_sSlotBg & ".border", #hiliter: a_sSlotBg & ".hiliter", #secondary: a_sSlotBg & ".secondary"]
  else
    t_ar_borders = a_ar_borders
  end if
  m_ar_graphics[#bg] = getMember(a_sSlotBg).image
  repeat with i = 1 to count(t_ar_borders)
    t_kBorder = t_ar_borders.getPropAt(i)
    t_sMem = t_ar_borders[i]
    t_iMemNum = getmemnum(t_sMem)
    if t_iMemNum > 0 then
      m_ar_graphics[t_kBorder] = member(t_iMemNum).image
      next repeat
    end if
    put "Could not find border" && t_sMem
  end repeat
end
on DrawRectInBuffer this, a_rBuffer, a_iSelection, a_rBorderCol
  t_iRow = (a_iSelection - 1) / this.m_iSlotsPerRow + 1
  t_iSlot = (a_iSelection - 1) mod this.m_iSlotsPerRow + 1
  t_iOffX = (t_iSlot - 1) * (this.m_rcItemSize.width + this.m_iMarginH + this.m_iMarginH) + this.m_iMarginH
  t_iOffY = (t_iRow - 1) * (this.m_rcItemSize.height + this.m_iMarginV + this.m_iMarginV) + this.m_iMarginV
  case 1 of
    a_rBorderCol = this.m_rBorderCol:
      t_kBorder = #border
    a_rBorderCol = this.m_rHiliterCol:
      t_kBorder = #hiliter
    a_rBorderCol = this.m_rSecondaryCol:
      t_kBorder = #secondary

  end case
  t_rBorder = m_ar_graphics[t_kBorder]
  if objectp(t_rBorder) then
    t_iW = (m_ar_graphics[t_kBorder].width - m_ar_graphics[#bg].width) / 2
    t_iH = (m_ar_graphics[t_kBorder].height - m_ar_graphics[#bg].height) / 2
    t_rcOff = [t_iOffX + t_iW, t_iOffY + t_iH, t_iOffX + t_iW, t_iOffY + t_iH]
    this.m_rBufferImg.copyPixels(t_rBorder, t_rBorder.rect + t_rcOff, t_rBorder.rect)
  end if
end
on RenderBackground this
  t_iRowCount = this.m_iSlotCount / this.m_iSlotsPerRow + (this.m_iSlotCount mod this.m_iSlotsPerRow > 0)
  t_iMinRowCount = (this.m_rImgElement.getProperty(#height) - this.m_iMarginV - this.m_iMarginV) / this.m_rcItemSize.height
  if t_iRowCount < t_iMinRowCount then
    t_iRowCount = t_iMinRowCount
  end if
  this.m_rBufferImg.fill(this.m_rBufferImg.rect, this.m_rSolidCol)
  t_iCurSlot = 0
  t_rBg = m_ar_graphics[#bg]
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (this.m_rcItemSize.height + this.m_iMarginV + this.m_iMarginV) + this.m_iMarginV
    repeat with x = 1 to this.m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      t_iOffX = (x - 1) * (this.m_rcItemSize.width + this.m_iMarginH + this.m_iMarginH) + this.m_iMarginH
      t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
      t_rBg.useAlpha = 0
      this.m_rBufferImg.copyPixels(t_rBg, t_rBg.rect + t_rcOff, t_rBg.rect)
    end repeat
  end repeat
end