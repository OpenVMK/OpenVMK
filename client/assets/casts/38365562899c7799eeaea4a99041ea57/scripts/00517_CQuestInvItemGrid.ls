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
property m_rRenderer
property m_bTradeOpen
property m_ar_NonTradableItems

on construct this
  m_iMarginH = 2
  m_iMarginV = 2
  m_rcItemSize = rect(0, 0, 40, 40)
  m_iSlotsPerRow = 6
  m_mp_iRef_rItem = [:]
  m_rBufferImg = VOID
  m_iSelected = 1
  m_rImgElement = VOID
  m_rHiliterCol = rgb(255, 204, 0)
  m_rBorderCol = rgb(80, 160, 216)
  if objectExists("ItemRenderer") then
    m_rRenderer = getObject("ItemRenderer")
  else
    m_rRenderer = createObject("ItemRenderer", "CTestItemThumbRenderer")
  end if
  m_ar_NonTradableItems = []
  if variableExists("nontradable") then
    m_ar_NonTradableItems = getVariableValue("nontradable")
  end if
  m_bTradeOpen = 0
  return 1
end
on deconstruct this
  m_rBufferImg = VOID
  m_rImgElement = VOID
  m_mp_iRef_rItem = VOID
  m_rRenderer = VOID
  return 1
end
on TradeOpen this, a_bState
  m_bTradeOpen = a_bState
end
on GetSelected this
  if m_iSelected < 1 or m_mp_iRef_rItem.count < m_iSelected then
    return [#ref: -1, #code: -1, #param: -1, #state: #invalid]
  else
    return m_mp_iRef_rItem[m_iSelected]
  end if
end
on SetItemState this, a_iRef, a_kState
  error(this, "Unimplemented method!", #SetItemState)
end
on MouseSelection this, a_ptLoc
  t_iRow = a_ptLoc.locV / (m_rcItemSize.height + 2 * m_iMarginV) + 1
  t_iSlot = a_ptLoc.locH / (m_rcItemSize.width + 2 * m_iMarginH) + 1
  this.select((t_iRow - 1) * m_iSlotsPerRow + t_iSlot)
end
on select this, a_iSelected
  t_rBuffer = m_rImgElement.getProperty(#image)
  t_iItemCount = m_mp_iRef_rItem.count
  if a_iSelected < 0 then
    a_iSelected = 0
  end if
  if t_iItemCount > 0 then
    if t_iItemCount >= m_iSelected and m_iSelected > 0 then
      t_iRow = (m_iSelected - 1) / m_iSlotsPerRow + 1
      t_iSlot = (m_iSelected - 1) mod m_iSlotsPerRow + 1
      t_iOffX = (t_iSlot - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      t_iOffY = (t_iRow - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
      t_rBuffer.draw(m_rcItemSize + [-1, -1, 1, 1] + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
    end if
    m_iSelected = a_iSelected
    if m_iSelected > t_iItemCount then
      return this.Unselect()
    end if
    if m_iSelected > 0 then
      t_iRow = (m_iSelected - 1) / m_iSlotsPerRow + 1
      t_iSlot = (m_iSelected - 1) mod m_iSlotsPerRow + 1
      t_iOffX = (t_iSlot - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      t_iOffY = (t_iRow - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
      t_rBuffer.draw(m_rcItemSize + [-1, -1, 1, 1] + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], [#color: m_rHiliterCol, #shapeType: #rect, #lineSize: 2])
    end if
  end if
  m_rImgElement.setProperty(#image, t_rBuffer)
  return 1
end
on Unselect this
  t_rBuffer = m_rImgElement.getProperty(#image)
  t_iItemCount = m_mp_iRef_rItem.count
  if t_iItemCount > 0 then
    if t_iItemCount >= m_iSelected and m_iSelected > 0 then
      t_iRow = (m_iSelected - 1) / m_iSlotsPerRow + 1
      t_iSlot = (m_iSelected - 1) mod m_iSlotsPerRow + 1
      t_iOffX = (t_iSlot - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      t_iOffY = (t_iRow - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
      t_rBuffer.draw(m_rcItemSize + [-1, -1, 1, 1] + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
      m_rImgElement.setProperty(#image, t_rBuffer)
      m_iSelected = 0
    end if
  end if
end
on render this, a_mp_iRef_rItem, a_rImgElem
  m_mp_iRef_rItem = a_mp_iRef_rItem
  m_rImgElement = a_rImgElem
  t_iItemCount = m_mp_iRef_rItem.count
  t_iRowCount = t_iItemCount / m_iSlotsPerRow + (t_iItemCount mod m_iSlotsPerRow > 0)
  tMinRowCount = (m_rImgElement.getProperty(#height) - m_iMarginV - m_iMarginV) / m_rcItemSize.height
  if t_iRowCount < tMinRowCount then
    t_iRowCount = tMinRowCount
  end if
  t_iCurWidth = m_iSlotsPerRow * (m_rcItemSize.width + (m_iMarginH + m_iMarginH))
  t_iCurHeight = t_iRowCount * (m_rcItemSize.height + (m_iMarginV + m_iMarginV))
  t_iMinWidth = a_rImgElem.getProperty(#width)
  t_iMinHeight = a_rImgElem.getProperty(#height)
  m_rBufferImg = image(max(t_iCurWidth, t_iMinWidth), max(t_iCurHeight, t_iMinHeight), 32)
  m_iSlotsPerRow = a_rImgElem.getProperty(#width) / (m_rcItemSize.width + m_iMarginH)
  m_rBufferImg.fill(m_rBufferImg.rect, rgb("#001F55"))
  t_mp_iType_rThumb = [:]
  repeat with t_rItem in m_mp_iRef_rItem
    t_mp_iType_rThumb.setaProp(t_rItem.code, VOID)
  end repeat
  executeMessage("GetItemThumbnail", t_mp_iType_rThumb)
  t_iCurSlot = 0
  repeat with y = 1 to t_iRowCount
    t_iOffY = (y - 1) * (m_rcItemSize.height + m_iMarginV + m_iMarginV) + m_iMarginV
    repeat with x = 1 to m_iSlotsPerRow
      t_iCurSlot = t_iCurSlot + 1
      if t_iCurSlot <= a_mp_iRef_rItem.count then
        t_rItem = m_mp_iRef_rItem[t_iCurSlot]
        t_rThumbImg = t_mp_iType_rThumb.getaProp(t_rItem.code)
        if m_bTradeOpen and m_ar_NonTradableItems.findPos(t_rItem.code) <> VOID then
          t_iBlend = 50
        else
          if t_rItem.getaProp(#state) = #normal then
            t_iBlend = 100
          else
            t_iBlend = 50
          end if
        end if
        t_iOffX = (x - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
        t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
        m_rBufferImg.copyPixels(t_rThumbImg, m_rcItemSize + t_rcOff, m_rcItemSize, [#ink: 36, #blend: t_iBlend, #useFastQuads: 1])
        m_rBufferImg.draw(m_rcItemSize + [-1, -1, 1, 1] + t_rcOff, [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
        if t_rItem.getaProp(#param) > 0 and (t_rItem.code > 2000 and t_rItem.code < 3001 or t_rItem.code > 12000 and t_rItem.code < 13001) then
          t_rStar = getMember("inv.pin.star.thumb").image
          t_rRect = t_rStar.rect
          repeat with s = 1 to t_rItem.getaProp(#param)
            m_rBufferImg.copyPixels(t_rStar, t_rRect + t_rcOff + [(s - 1) * (t_rRect.width + 1) + 3, 31, (s - 1) * (t_rRect.width + 1) + 3, 31], t_rRect, [#ink: 36, #useFastQuads: 1])
          end repeat
        end if
        next repeat
      end if
      t_iOffX = (x - 1) * (m_rcItemSize.width + m_iMarginH + m_iMarginH) + m_iMarginH
      t_rcOff = [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
      m_rBufferImg.draw(m_rcItemSize + [-1, -1, 1, 1] + t_rcOff, [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
    end repeat
  end repeat
  m_rImgElement.feedImage(m_rBufferImg)
  return this.select(m_iSelected)
end