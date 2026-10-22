-- Script
property m_mp_iRef_rItem
property m_sWriterID
property m_sWriter2Id

on construct this
  m_mp_iRef_rItem = []
  m_ar_SingleUsePins = VOID
  m_ar_MarkedSingleUsePins = VOID
  m_sWriterID = "VMKS Inventory Pin Level Writer"
  m_sWriter2Id = "VMKS Inventory Pin Level Writer DropShadow"
  tPlain = getStructVariable("struct.font.plain")
  tBold = getStructVariable("struct.font.bold")
  tLink = getStructVariable("struct.font.link")
  tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb(250, 250, 250), #bgColor: rgb(225, 255, 255), #fixedLineSpace: 15]
  createWriter(m_sWriterID, tMetrics)
  tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb(2, 2, 2), #bgColor: rgb(225, 255, 255), #fixedLineSpace: 15]
  createWriter(m_sWriter2Id, tMetrics)
  return 1
end
on deconstruct this
  m_mp_iRef_rItem = []
  if writerExists(m_sWriterID) then
    removeWriter(m_sWriterID)
  end if
  if writerExists(m_sWriter2Id) then
    removeWriter(m_sWriter2Id)
  end if
  return 1
end
on RenderText me, a_sText
  tWriter = getWriter(m_sWriterID)
  return tWriter.render(a_sText)
end
on RenderShadow me, a_sText
  tWriter = getWriter(m_sWriter2Id)
  return tWriter.render(a_sText)
end
on SelectByItemRef this, a_iRef
  repeat with i = 1 to this.m_mp_iRef_rItem.count
    if a_iRef = this.m_mp_iRef_rItem[i].ref then
      this.select(i)
      exit repeat
    end if
  end repeat
end
on RenderForeGround this, a_ar_items
  m_mp_iRef_rItem = a_ar_items
  t_iRowCount = this.m_iSlotCount / this.m_iSlotsPerRow + (this.m_iSlotCount mod this.m_iSlotsPerRow > 0)
  t_iMinRowCount = (this.m_rImgElement.getProperty(#height) - this.m_iMarginV - this.m_iMarginV) / this.m_rcItemSize.height
  if t_iRowCount < t_iMinRowCount then
    t_iRowCount = t_iMinRowCount
  end if
  t_iCurSlot = 0
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (this.m_rcItemSize.height + this.m_iMarginV + this.m_iMarginV) + this.m_iMarginV
    repeat with x = 1 to this.m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      if t_iCurSlot <= this.m_mp_iRef_rItem.count then
        t_rItem = this.m_mp_iRef_rItem[t_iCurSlot]
        t_rThumbImg = t_rItem.thumbnail
        t_iOffX = (x - 1) * (this.m_rcItemSize.width + this.m_iMarginH + this.m_iMarginH) + this.m_iMarginH
        t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
        if ilk(t_rItem.params, #propList) then
          if not voidp(t_rItem.params.getaProp("pl")) then
            t_rStar = this.RenderShadow(t_rItem.params["pl"])
            t_rRect = t_rStar.rect
            t_rcRightCorner = t_rcOff + [this.m_rcItemSize[3] + 6, this.m_rcItemSize[4] - 1, this.m_rcItemSize[3] + 6, this.m_rcItemSize[4] - 1]
            t_rcStarCorner = [-t_rRect[3], -t_rRect[4], -t_rRect[3], -t_rRect[4]]
            this.m_rBufferImg.copyPixels(t_rStar, t_rRect + t_rcRightCorner + t_rcStarCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
            t_rStar = this.RenderText(t_rItem.params["pl"])
            t_rRect = t_rStar.rect
            this.m_rBufferImg.copyPixels(t_rStar, t_rRect + t_rcRightCorner + t_rcStarCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
          end if
        end if
      end if
    end repeat
  end repeat
end