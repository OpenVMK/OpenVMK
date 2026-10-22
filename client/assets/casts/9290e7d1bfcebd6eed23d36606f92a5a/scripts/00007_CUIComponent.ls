-- Script
property m_rImg
property m_iWidth
property m_iHeight
property m_pOffset
property m_rBgColor
property m_rBackground
property m_sEvent
property m_iPad
property m_bClickable
property m_ar_layouts
property m_ar_Children
property m_bShowChildren
property m_bActive
property m_bShowAsActive
property m_rActiveColor
property m_rParent
property m_bVisibility

on construct me
  m_bActive = 0
  m_bShowAsActive = 0
  m_ar_layouts = []
  m_ar_Children = []
  m_bShowChildren = 0
  m_bClickable = 1
  m_rParent = VOID
  m_bVisibility = 1
  m_rWindowElement = VOID
  return 1
end
on deconstruct me
  repeat with t_rLayout in m_ar_layouts
    t_rLayout.deconstruct()
    t_rLayout = VOID
  end repeat
  repeat with t_rComponent in m_ar_Children
    removeObject(t_rComponent.getID())
  end repeat
  m_ar_layouts = []
  m_ar_Children = []
  m_rParent = VOID
  m_rImg = VOID
  if objectp(m_rBackground) then
    case m_rBackground.ilk of
      #instance:
        m_rBackground.deconstruct()
        m_rBackground = VOID

    end case
  end if
  m_rImg = VOID
  m_iWidth = VOID
  m_iHeight = VOID
  m_pOffset = VOID
  m_rBgColor = VOID
  m_rBackground = VOID
  m_sEvent = VOID
  m_iPad = VOID
  m_bClickable = VOID
  m_ar_layouts = VOID
  m_ar_Children = VOID
  m_bShowChildren = VOID
  m_bActive = VOID
  m_bShowAsActive = VOID
  m_rActiveColor = VOID
  return 1
end
on showAsActive me, a_bShowAsActive
  if voidp(a_bShowAsActive) then
    a_bShowAsActive = 0
  end if
  m_bShowAsActive = a_bShowAsActive
  repeat with t_rLayout in m_ar_layouts
    t_rLayout.showAsActive(a_bShowAsActive)
  end repeat
  if objectp(m_rBackground) then
    case m_rBackground.ilk of
      #instance:
        m_rBackground.showAsActive(a_bShowAsActive)
      otherwise:
        nothing()

    end case
  end if
end
on SetVisibility me, a_bVisibility
  m_bVisibility = a_bVisibility
end
on GetVisibility me, a_bVisibility
  return m_bVisibility
end
on getVisible me, a_ar_visible
  if m_bVisibility then
    a_ar_visible.append(me)
    if me.hasChildren() then
      repeat with t_rChild in me.getChildren()
        t_rChild.getVisible(a_ar_visible)
      end repeat
    end if
  end if
end
on setParent me, a_rParent
  m_rParent = a_rParent
end
on getParent me
  return m_rParent
end
on getChildren me
  return m_ar_Children
end
on hasChildren me
  return bitAnd(the count of m_ar_Children > 0, bitAnd(m_bShowChildren, m_bVisibility))
end
on toggleShowChildren me
  m_bShowChildren = not m_bShowChildren
  return m_bShowChildren
end
on addComponent me, i_sDef, t_bWithControlBar
  t_rComponent = createObject(#random, "CUIComponent")
  t_rComponent.readDefinition(i_sDef)
  t_rComponent.checkSize(m_iWidth, m_iHeight)
  t_rComponent.setParent(me)
  if t_bWithControlBar then
    t_iPos = max(m_ar_Children.count, 1)
    m_ar_Children.addAt(t_iPos, t_rComponent)
  else
    m_ar_Children.append(t_rComponent)
  end if
  return t_rComponent
end
on setActiveComponent me, a_rComponent
  m_rParent.setActiveComponent(a_rComponent)
end
on setActiveLayout me, a_rLayout
  m_rParent.setActiveLayout(a_rLayout)
end
on GetActiveComponent me
  return m_rParent.GetActiveComponent()
end
on GetActive me
  return m_rParent.GetActive()
end
on deleteComponent me, t_rComponent
  if m_rParent.GetActiveComponent() = t_rComponent then
    m_rParent.setActiveComponent(VOID)
    m_rParent.setActiveLayout(VOID)
  end if
  t_iPos = m_ar_Children.getOne(t_rComponent)
  if t_iPos > 0 then
    removeObject(t_rComponent.getID())
    m_ar_Children.deleteAt(t_iPos)
  end if
  m_bNeedSorting = 1
end
on moveComponent me, t_rComponent, t_iDirection
  t_iPos = m_ar_Children.getOne(t_rComponent)
  if t_iPos > 0 then
    t_iNewPos = t_iPos + t_iDirection
    if t_iNewPos > 0 and t_iNewPos < m_ar_Children.count then
      m_ar_Children.deleteAt(t_iPos)
      m_ar_Children.addAt(t_iNewPos, t_rComponent)
    end if
  end if
end
on checkSize me, t_iWidth, t_iHeight
  if m_iWidth = 0 then
    m_iWidth = t_iWidth
  end if
  if m_iHeight = 0 then
    m_iHeight = t_iHeight
  end if
  t_xOffset = 0
  repeat with t_rLayout in m_ar_layouts
    t_rLayout.checkSize(m_iWidth, m_iHeight, t_xOffset)
    t_xOffset = t_xOffset + t_rLayout.getWidth() + m_iPad
  end repeat
end
on resize me, t_iWidth, t_iHeight
  m_iWidth = t_iWidth
  m_iHeight = t_iHeight
end
on setColor me, t_rColor
  m_rBgColor = t_rColor
end
on getPos me
  return m_pOffset
end
on getRect me
  return rect(m_pOffset, m_pOffset + point(m_iWidth, m_iHeight))
end
on GetLayouts me
  return m_ar_layouts
end
on GetLayout me, i_index
  if i_index <= m_ar_layouts.count then
    return m_ar_layouts[i_index]
  end if
  return VOID
end
on GetPadding me
  return m_iPad
end
on getClickable me
  return m_bClickable
end
on setClickable me, a_bClickable
  m_bClickable = a_bClickable
end
on readDefinition me, i_sDef
  m_sDefinition = i_sDef
  tDoc = CreateXML(getMember(i_sDef).text)
  tDoc.Search("TYPE", "COMPONENT", 1)
  m_iWidth = value(tDoc.GetParam("WIDTH"))
  m_iHeight = value(tDoc.GetParam("HEIGHT"))
  t_sBgColor = tDoc.GetParam("BGCOLOR")
  if not (t_sBgColor = EMPTY) then
    m_rBgColor = rgb(t_sBgColor)
  end if
  t_sActiveColor = tDoc.GetParam("ACTIVE")
  if not (t_sActiveColor = EMPTY) then
    m_rActiveColor = rgb(t_sActiveColor)
  end if
  t_sBackground = tDoc.GetParam("BACKGROUND")
  if not (t_sBackground = EMPTY) then
    t_rBgMbr = member(t_sBackground)
    case t_rBgMbr.type of
      #empty:
      #field:
        m_rBackground = createObject(#temp, "CScale9Grid")
        m_rBackground.readDefinition(t_sBackground)
        m_rBackground.resize(m_iWidth, m_iHeight)
        m_rBackground.setTextStruct(EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY)
        m_rBackground.setIcon(EMPTY, EMPTY)
      #bitmap:
        m_rBackground = m_rBackground.image.duplicate()

    end case
  end if
  t_iOffsetX = value(tDoc.GetParam("OFFSETX"))
  t_iOffsetY = value(tDoc.GetParam("OFFSETY"))
  m_pOffset = point(t_iOffsetX, t_iOffsetY)
  m_iPad = value(tDoc.GetParam("PAD"))
  m_bClickable = value(tDoc.GetParam("CLICKABLE"))
  m_ar_layouts = []
  t_iLayoutPos = point(0, 0)
  repeat with t_ar_layOut in tDoc
    t_iLayoutPos = point(0, 0)
    t_rLayout = createObject(#temp, "CScale9Grid")
    t_rLayout.readDefinition(t_ar_layOut[#param]["DESC"])
    t_rLayout.resize(value(t_ar_layOut[#param]["WIDTH"]), value(t_ar_layOut[#param]["HEIGHT"]))
    t_rLayout.setEvent(t_ar_layOut[#param]["EVENT"])
    t_iLayoutPos = t_iLayoutPos + point(value(t_ar_layOut[#param]["X"]), value(t_ar_layOut[#param]["Y"]))
    t_rLayout.setPos(t_iLayoutPos.locH, t_iLayoutPos.locV)
    t_sTxtKey = t_ar_layOut[#param]["TXTKEY"]
    t_sFont = t_ar_layOut[#param]["FONT"]
    t_iFontSize = value(t_ar_layOut[#param]["TXTSIZE"])
    t_sTxtAlignH = t_ar_layOut[#param]["ALIGNH"]
    t_sTxtAlignV = t_ar_layOut[#param]["ALIGNV"]
    t_sIcon = t_ar_layOut[#param]["ICON"]
    t_sIconAlign = t_ar_layOut[#param]["ICONALIGN"]
    t_bAntiAlias = value(t_ar_layOut[#param]["ANTIALIAS"])
    t_bClickable = value(t_ar_layOut[#param]["CLICKABLE"])
    t_bSearchable = value(t_ar_layOut[#param]["SEARCHABLE"])
    t_sBlinker = t_ar_layOut[#param]["BLINKER"]
    t_iBlend = value(t_ar_layOut[#param]["BLEND"])
    if not voidp(t_sTxtKey) then
      if t_sTxtKey = EMPTY then
        t_sText = EMPTY
      else
        t_sText = getText(t_sTxtKey)
      end if
      t_rLayout.setTextStruct(t_sText, t_sFont, t_iFontSize, t_sTxtAlignH, t_sTxtAlignV, t_bAntiAlias)
    end if
    t_rLayout.setIcon(t_sIcon, t_sIconAlign)
    t_rLayout.setClickable(t_bClickable)
    t_rLayout.setSearchable(t_bSearchable)
    t_rLayout.setBlinker(t_sBlinker)
    t_rLayout.SetBlend(t_iBlend)
    t_rLayout.setParentComponent(me)
    m_ar_layouts.append(t_rLayout)
  end repeat
  tDoc.close()
  tDoc = VOID
end
on render me, t_rWriter
  t_bNeedUpdate = 0
  repeat with t_rScale in m_ar_layouts
    if t_rScale.m_bNeedUpdate then
      t_bNeedUpdate = 1
      exit repeat
    end if
  end repeat
  if not t_bNeedUpdate then
    return m_rImg
  end if
  m_rImg = image(m_iWidth, m_iHeight, 32)
  m_rImg.useAlpha = 1
  t_rMask = image(m_iWidth, m_iHeight, 8, #grayscale)
  t_rBgColor = m_rBgColor
  if (m_bActive or m_bShowAsActive) and objectp(m_rActiveColor) then
    t_rBgColor = m_rActiveColor
  end if
  if objectp(t_rBgColor) then
    m_rImg.fill(m_rImg.rect, [#shapeType: #rect, #lineSize: 0, #color: t_rBgColor])
  else
    t_rMask.fill(t_rMask.rect, [#shapeType: #rect, #lineSize: 0, #color: rgb("#FFFFFF")])
    m_rImg.setAlpha(t_rMask)
  end if
  if objectp(m_rBackground) then
    case m_rBackground.ilk of
      #instance:
        m_rBackground.resize(m_iWidth, m_iHeight)
        t_rBgImg = m_rBackground.render()
      #image:
        t_rBgImg = m_rBackground
      otherwise:
        t_rBgImg = image(0, 0, 32)

    end case
    m_rImg.copyPixels(t_rBgImg, t_rBgImg.rect, t_rBgImg.rect, [#maskImage: t_rBgImg.extractAlpha()])
  end if
  repeat with t_rScale in m_ar_layouts
    t_pLoc = t_rScale.getPos()
    t_rImg = t_rScale.render(t_rWriter)
    if t_rScale.isMask() and objectp(m_rBgColor) then
      m_rImg.copyPixels(t_rImg, rect(t_pLoc, t_pLoc) + t_rImg.rect, t_rImg.rect, [#blend: t_rScale.m_iBlend, #maskImage: t_rImg.extractAlpha()])
      next repeat
    end if
    m_rImg.copyPixels(t_rImg, rect(t_pLoc, t_pLoc) + t_rImg.rect, t_rImg.rect, [#blend: t_rScale.m_iBlend])
  end repeat
  if objectp(m_rBgColor) then
    t_rMask.fill(t_rMask.rect, [#shapeType: #rect, #lineSize: 0, #color: rgb("#000000")])
    m_rImg.setAlpha(t_rMask)
  end if
  return m_rImg
end
on EventProc me, tParm, t_ar_event
  repeat with t_rLayout in m_ar_layouts
    t_pForward = tParm - m_pOffset
    if t_pForward.inside(t_rLayout.getRect()) then
      t_sEvent = t_rLayout.getEvent()
      case t_sEvent of
        EMPTY:
          nothing()
        otherwise:
          t_ar_event[#found] = 1
          t_ar_event[#event] = t_sEvent
          t_ar_event[#client] = t_rLayout
          t_ar_event[#route][#layout] = t_rLayout
          t_ar_event[#offset] = m_pOffset
          t_ar_event[#rect] = rect(m_pOffset, m_pOffset) + t_rLayout.getRect()

      end case
      return 1
    end if
  end repeat
  return 0
end