-- Parent Script
property m_sDefinition
property m_sMemname
property m_rMember
property m_rImg
property m_rColor
property m_rBgColor
property m_rActiveColor
property m_bMask
property m_iBlend
property m_iInk
property m_rGrid
property m_iWidth
property m_iHeight
property m_pPos
property m_sEvent
property m_sTxt
property m_sFont
property m_iFontSize
property m_sTxtAlignH
property m_sTxtAlignV
property m_sIcon
property m_rIcon
property m_sIconAlign
property m_bAntiAlias
property m_rRender
property m_bNeedUpdate
property m_bActive
property m_rNode
property m_bShowAsActive
property m_bShowBorder
property m_rHiliterCol
property m_rBorderCol
property m_bClickable
property m_rTextColor
property m_bSearchable
property m_rBlinker
property m_rParentComponent

on construct me
  m_bShowAsActive = 0
  m_bNeedUpdate = 1
  m_bActive = 0
  m_bShowBorder = 0
  m_sIcon = EMPTY
  m_sIconAlign = EMPTY
  m_sEvent = EMPTY
  m_sTxt = EMPTY
  m_sFont = EMPTY
  m_sTxtAlignH = EMPTY
  m_sTxtAlignV = EMPTY
  m_sIcon = EMPTY
  m_sIconAlign = EMPTY
  m_rHiliterCol = rgb(255, 204, 0)
  m_rBorderCol = rgb(80, 160, 216)
  m_bClickable = 1
  m_bSearchable = 0
  m_rBlinker = VOID
  m_rTextColor = VOID
  m_rParentComponent = VOID
  return 1
end
on deconstruct me
  if m_bSearchable then
    unregisterMessage(#SearchCellContainingData, me.getID())
  end if
  m_sDefinition = VOID
  m_sMemname = VOID
  m_rMember = VOID
  m_rImg = VOID
  m_rColor = VOID
  m_rBgColor = VOID
  m_rActiveColor = VOID
  m_bMask = VOID
  m_iBlend = VOID
  m_iInk = VOID
  m_rGrid = VOID
  m_iWidth = VOID
  m_iHeight = VOID
  m_pPos = VOID
  m_sEvent = VOID
  m_sTxt = VOID
  m_sFont = VOID
  m_iFontSize = VOID
  m_sTxtAlignH = VOID
  m_sTxtAlignV = VOID
  m_sIcon = VOID
  m_rIcon = VOID
  m_sIconAlign = VOID
  m_bAntiAlias = VOID
  m_rRender = VOID
  m_bNeedUpdate = VOID
  m_bActive = VOID
  m_rNode = VOID
  m_bShowAsActive = VOID
  m_bShowBorder = VOID
  m_rHiliterCol = VOID
  m_rBorderCol = VOID
  m_bClickable = VOID
  m_rTextColor = VOID
  return 1
end
on setParentComponent me, a_rComponent
  m_rParentComponent = a_rComponent
end
on GetParentComponent me
  return m_rParentComponent
end
on searchCellForData me, t_ar_searchData
  t_rdata = t_ar_searchData[#data]
  t_rCell = t_ar_searchData[#cell]
  if listp(m_rNode) then
    t_iPos = m_rNode.findPos(t_rCell)
    if t_iPos > 0 then
      if m_rNode[t_iPos] = t_rdata then
        t_ar_searchData[#found].append(me)
      end if
    end if
  end if
end
on setPos me, t_iX, t_iY
  m_pPos = point(t_iX, t_iY)
  m_bNeedUpdate = 1
end
on showAsActive me, a_bShowAsActive
  if voidp(a_bShowAsActive) then
    a_bShowAsActive = 0
  end if
  m_bShowAsActive = a_bShowAsActive
  m_bNeedUpdate = 1
  if not a_bShowAsActive then
    m_bActive = 0
  end if
end
on setSearchable me, a_bSearchable
  m_bSearchable = a_bSearchable
  if m_bSearchable then
    registerMessage(#SearchCellContainingData, me.getID(), #searchCellForData)
  end if
end
on setBlinker me, a_sBlinker
  if a_sBlinker = EMPTY then
    exit
  end if
  t_rMem = getMember(a_sBlinker)
  if objectp(t_rMem) then
    m_rBlinker = t_rMem.image
  end if
end
on GetBlinker me
  return m_rBlinker
end
on getPos me
  return m_pPos
end
on resize me, i_w, i_h
  m_iWidth = i_w
  m_iHeight = i_h
  m_bNeedUpdate = 1
end
on checkSize me, t_iWidth, t_iHeight, t_xOffset
  if m_iWidth = 0 then
    m_iWidth = t_iWidth
  end if
  if m_iHeight = 0 then
    m_iHeight = t_iHeight
  end if
  m_pPos.locH = max(m_pPos.locH, t_xOffset)
  m_bNeedUpdate = 1
end
on SetTextColor me, a_rColor
  m_rTextColor = a_rColor
end
on randomizeColor me
  m_rColor = rgb(random(255), random(255), random(255))
  m_bNeedUpdate = 1
end
on isMask me
  return the useAlpha of m_rImg or m_bMask
end
on getWidth me
  return m_iWidth
end
on getRect me
  return rect(m_pPos, m_pPos + point(m_iWidth, m_iHeight))
end
on Activate me
  m_bActive = 1
  m_bNeedUpdate = 1
end
on inActivate me
  if m_bShowBorder then
  end if
  m_bActive = 0
  m_bNeedUpdate = 1
  m_bShowBorder = 0
end
on showBorder me
  m_bShowBorder = 1
  m_bActive = 1
  m_bNeedupate = 1
end
on setEvent me, i_sEvent
  m_sEvent = i_sEvent
end
on getEvent me
  return m_sEvent
end
on setText me, t_sTxt
  if voidp(t_sTxt) then
    m_sTxt = EMPTY
  else
    m_sTxt = t_sTxt
  end if
  m_bNeedUpdate = 1
end
on getText me
  return m_sTxt
end
on setNode me, a_rNode
  m_rNode = a_rNode
end
on GetNode me
  return m_rNode
end
on setTextStruct me, t_sTxt, t_sFont, t_iFontSize, t_sTxtAlignH, t_sTxtAlignV, t_bAntiAlias
  m_sTxt = t_sTxt
  m_sFont = t_sFont
  m_iFontSize = t_iFontSize
  m_sTxtAlignH = t_sTxtAlignH
  m_sTxtAlignV = t_sTxtAlignV
  m_bAntiAlias = t_bAntiAlias
  m_bNeedUpdate = 1
end
on setIcon me, t_sIcon, t_sIconAlign
  m_sIcon = t_sIcon
  if not voidp(t_sIconAlign) then
    m_sIconAlign = t_sIconAlign
  end if
  if voidp(m_sIconAlign) then
    m_sIconAlign = "CENTER"
  end if
  if m_sIcon <> EMPTY then
    me.setIconImage(member(m_sIcon).image.duplicate())
  else
    me.setIconImage(VOID)
  end if
end
on setIconImage me, a_rIcon
  if a_rIcon.ilk = #image then
    m_rIcon = a_rIcon
  else
    m_rIcon = VOID
  end if
  m_bNeedUpdate = 1
end
on setClickable me, a_bClickable
  m_bClickable = a_bClickable
end
on getClickable me
  return m_bClickable
end
on readDefinition me, i_sDef
  m_sDefinition = i_sDef
  tDoc = CreateXML(getMember(i_sDef).text)
  tDoc.Search("TYPE", "SCALE", 1)
  m_sMemname = tDoc.GetParam("MEMBER")
  if getmemnum(m_sMemname) <> 0 then
    m_rMember = getMember(m_sMemname)
    if objectp(m_rMember) then
      m_rImg = m_rMember.image.duplicate()
    end if
    if objectp(m_rImg) then
      m_iWidth = m_rImg.width
      m_iHeight = m_rImg.height
    end if
  else
    m_iWidth = 0
    m_iHeight = 0
    m_rImg = image(m_iWidth, m_iHeight, 32)
  end if
  t_sColor = tDoc.GetParam("COLOR")
  if t_sColor contains "rgb" then
    m_rColor = value(t_sColor)
  else
    if not (t_sColor = EMPTY) then
      m_rColor = rgb(t_sColor)
    end if
  end if
  t_sBgColor = tDoc.GetParam("BGCOLOR")
  if not (t_sBgColor = EMPTY) then
    m_rBgColor = rgb(t_sBgColor)
  end if
  t_sActiveColor = tDoc.GetParam("ACTIVE")
  if not (t_sActiveColor = EMPTY) then
    m_rActiveColor = rgb(t_sActiveColor)
  end if
  m_bMask = value(tDoc.GetParam("MASK"))
  m_iBlend = value(tDoc.GetParam("BLEND"))
  m_iInk = value(tDoc.GetParam("INK"))
  tDoc.Search("TYPE", "GRID", 1)
  m_rGrid = rect(0, 0, 0, 0)
  m_rGrid.top = value(tDoc.GetParam("TOP"))
  m_rGrid.left = value(tDoc.GetParam("LEFT"))
  m_rGrid.bottom = value(tDoc.GetParam("BOTTOM"))
  m_rGrid.right = value(tDoc.GetParam("RIGHT"))
  m_bNeedUpdate = 1
  tDoc.close()
  tDoc = VOID
end
on render me, t_rWriter
  if m_bNeedUpdate then
    t_Img = image(m_iWidth, m_iHeight, 32)
    if m_rImg.useAlpha then
      t_Img.useAlpha = 1
    end if
    if m_bMask and m_rImg.useAlpha then
      m_rImg = m_rImg.extractAlpha()
    end if
    t_rBgColor = m_rBgColor
    t_rColor = m_rColor
    if (m_bActive or m_bShowAsActive) and objectp(m_rActiveColor) then
      t_rColor = m_rActiveColor
    end if
    if not m_bMask and objectp(t_rBgColor) then
      t_Img.fill(t_Img.rect, [#shapeType: #rect, #lineSize: 0, #color: t_rBgColor])
    end if
    t_rDest = rect(0, 0, m_rGrid.left, m_rGrid.top)
    t_rSrc = rect(0, 0, m_rGrid.left, m_rGrid.top)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    t_rDest = rect(m_rGrid.left, 0, m_iWidth - m_rGrid.right, m_rGrid.top)
    t_rSrc = rect(m_rGrid.left, 0, m_rImg.width - m_rGrid.right, m_rGrid.top)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    t_rDest = rect(m_iWidth - m_rGrid.right, 0, m_iWidth, m_rGrid.top)
    t_rSrc = rect(m_rImg.width - m_rGrid.right, 0, m_rImg.width, m_rGrid.top)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    t_rDest = rect(0, m_rGrid.top, m_rGrid.left, m_iHeight - m_rGrid.bottom)
    t_rSrc = rect(0, m_rGrid.top, m_rGrid.left, m_rImg.height - m_rGrid.bottom)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    t_rDest = rect(m_rGrid.left, m_rGrid.top, m_iWidth - m_rGrid.right, m_iHeight - m_rGrid.bottom)
    t_rSrc = rect(m_rGrid.left, m_rGrid.top, m_rImg.width - m_rGrid.right, m_rImg.height - m_rGrid.bottom)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    t_rDest = rect(m_iWidth - m_rGrid.right, m_rGrid.top, m_iWidth, m_iHeight - m_rGrid.bottom)
    t_rSrc = rect(m_rImg.width - m_rGrid.right, m_rGrid.top, m_rImg.width, m_rImg.height - m_rGrid.bottom)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    t_rDest = rect(0, m_iHeight - m_rGrid.bottom, m_rGrid.left, m_iHeight)
    t_rSrc = rect(0, m_rImg.height - m_rGrid.bottom, m_rGrid.left, m_rImg.height)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    t_rDest = rect(m_rGrid.left, m_iHeight - m_rGrid.bottom, m_iWidth - m_rGrid.right, m_iHeight)
    t_rSrc = rect(m_rGrid.left, m_rImg.height - m_rGrid.bottom, m_rImg.width - m_rGrid.right, m_rImg.height)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    t_rDest = rect(m_iWidth - m_rGrid.right, m_iHeight - m_rGrid.bottom, m_iWidth, m_iHeight)
    t_rSrc = rect(m_rImg.width - m_rGrid.right, m_rImg.height - m_rGrid.bottom, m_rImg.width, m_rImg.height)
    t_Img.copyPixels(m_rImg, t_rDest, t_rSrc, [#ink: m_iInk])
    if m_bMask and not m_rImg.useAlpha then
      t_mask = image(m_iWidth, m_iHeight, 8, #grayscale)
      t_mask.copyPixels(t_Img, t_Img.rect, t_Img.rect)
      t_Img.fill(t_Img.rect, [#shapeType: #rect, #lineSize: 0, #color: t_rColor])
      t_Img.setAlpha(t_mask)
      t_Img.useAlpha = 1
    end if
    t_iIconPadding = 0
    if m_rIcon.ilk = #image then
      pImg = m_rIcon
      t_h = t_Img.rect.height - pImg.rect.height
      t_w = t_Img.rect.width - pImg.rect.width
      t_iPadding = 5
      case m_sIconAlign of
        "LEFT":
          t_rOffset = rect(point(t_iPadding, t_h / 2), point(t_iPadding, t_h / 2))
          t_iIconPadding = t_iPadding + pImg.rect.width
        "RIGHT":
          t_rOffset = rect(point(t_w - t_iPadding, t_h / 2), point(t_w - t_iPadding, t_h / 2))
        otherwise:
          t_rOffset = rect(point(t_w / 2, t_h / 2), point(t_w / 2, t_h / 2))

      end case
      t_Img.copyPixels(pImg, t_rOffset + pImg.rect, pImg.rect, [#ink: 36, #maskImage: pImg.extractAlpha()])
    end if
    if m_sTxt <> EMPTY and not voidp(m_sTxt) then
      t_rWriter.font = m_sFont
      t_rWriter.fontSize = m_iFontSize
      t_rWriter.antialias = m_bAntiAlias
      t_rColorWas = t_rWriter.color
      if not voidp(m_rTextColor) then
        t_rWriter.color = m_rTextColor
      end if
      t_rWriter.text = string(m_sTxt)
      pImg = t_rWriter.image.duplicate()
      if m_sTxtAlignV = "TOP" then
        t_h = 0
      else
        t_h = (t_Img.rect.height - pImg.rect.height) / 2
      end if
      if m_sTxtAlignH = "CENTER" then
        t_iTxtWidth = t_rWriter.charPosToLoc(t_rWriter.text.length + 1).locH
        t_w = (t_Img.rect.width - t_iTxtWidth) / 2
      else
        t_w = 5
        t_w = t_w + t_iIconPadding
      end if
      t_rOffset = rect(point(t_w, t_h), point(t_w, t_h))
      t_Img.copyPixels(pImg, t_rOffset + pImg.rect, pImg.rect, [#maskImage: pImg.extractAlpha()])
      if not voidp(m_rTextColor) then
        t_rWriter.color = t_rColorWas
      end if
    end if
    if m_bShowBorder then
      t_Img.draw(t_Img.rect + [-0, -0, 0, 0], [#color: m_rHiliterCol, #shapeType: #rect, #lineSize: 2])
    end if
    m_rRender = t_Img
    m_bNeedUpdate = 0
    t_Img = VOID
  end if
  return m_rRender
end
on getLastRender me
  return m_rRender
end