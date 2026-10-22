-- Script
property m_rImg
property m_iWidth
property m_iHeight
property m_rBgColor
property m_iMinWidth
property m_iMinHeight
property m_ar_components
property m_rWriter
property m_rActiveComponent
property m_rActive
property m_iSortingOrder
property m_bHasController
property m_bNeedSorting

on construct me
  m_ar_components = []
  t_sMemName = "UIComponenPageWriter" & getUniqueID()
  t_iMemNum = createMember(t_sMemName, #text)
  t_rMem = member(t_iMemNum)
  t_rMem.font = "Arial"
  t_rMem.wordWrap = 0
  t_rMem.fontStyle = [#plain]
  t_rMem.fontSize = 12
  t_rMem.antialias = 0
  t_rMem.antiAliasThreshold = 11
  t_rMem.color = rgb(250, 250, 250)
  m_bHasController = 0
  m_rWriter = t_rMem
  m_iSortingOrder = #fifo
  m_bNeedSorting = 1
  return 1
end
on deconstruct me
  m_rWriter.erase()
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on setSortingOrder me, a_iSortingType
  case a_iSortingType of
    #alphabetical:
      m_iSortingOrder = a_iSortingType
      me.sortComponentsAlphabetically()
    #fifo, #normal:
      m_iSortingOrder = a_iSortingType
    otherwise:
      put "Unknown sorting order" && a_iSortingType

  end case
end
on sortComponentsAlphabetically me
  t_ar_sorted = []
  t_iLastComponent = m_ar_components.count
  t_rController = VOID
  if m_bHasController then
    if t_iLastComponent > 0 then
      t_rController = m_ar_components[m_ar_components.count]
      t_iLastComponent = t_iLastComponent - 1
    else
      exit
    end if
  end if
  repeat with i = 1 to t_iLastComponent
    t_rComponent = m_ar_components[i]
    t_ar_sorted.append([t_rComponent.GetLayout(1).getText(), t_rComponent])
  end repeat
  t_ar_sorted.sort()
  m_ar_components.deleteAll()
  repeat with t_rSorted in t_ar_sorted
    m_ar_components.append(t_rSorted[2])
  end repeat
  if objectp(t_rController) then
    m_ar_components.append(t_rController)
  end if
end
on setSize me, t_iWidth, t_iHeight
  m_iMinWidth = t_iWidth
  m_iMinHeight = t_iHeight
  me.resize(m_iMinWidth, m_iMinHeight)
end
on resize me, t_iWidth, t_iHeight
  m_iWidth = max(m_iMinWidth, t_iWidth)
  m_iHeight = max(m_iMinHeight, t_iHeight)
end
on setColor me, t_rColor
  m_rBgColor = t_rColor
end
on getCurrentOffset me
  return m_iHeight
end
on readDefinition me, i_sDef
end
on moveComponent me, t_rComponent, t_iDirection
  t_iPos = m_ar_components.getOne(t_rComponent)
  if t_iPos > 0 then
    t_iNewPos = t_iPos + t_iDirection
    if t_iNewPos > 0 and t_iNewPos < m_ar_components.count then
      m_ar_components.deleteAt(t_iPos)
      m_ar_components.addAt(t_iNewPos, t_rComponent)
    end if
  end if
end
on getComponentID me, t_rComponent
  return m_ar_components.getOne(t_rComponent)
end
on getComponentAt me, t_iPos, t_bWithoutControlBar
  if t_bWithoutControlBar then
    t_iCount = m_ar_components.count - 1
  else
    t_iCount = m_ar_components.count
  end if
  if t_iPos > 0 and t_iPos <= t_iCount then
    return m_ar_components[t_iPos]
  end if
  return VOID
end
on deleteComponentAt me, t_iPos
  if t_iPos > 0 and t_iPos <= m_ar_components.count then
    t_rComponent = m_ar_components[t_iPos]
    removeObject(t_rComponent.getID())
    m_ar_components.deleteAt(t_iPos)
  end if
  m_bNeedSorting = 1
end
on deleteComponent me, t_rComponent
  t_iPos = m_ar_components.getOne(t_rComponent)
  if t_iPos > 0 then
    removeObject(t_rComponent.getID())
    m_ar_components.deleteAt(t_iPos)
  end if
  m_bNeedSorting = 1
end
on deleteAllComponents me, t_bWithControlBar
  if t_bWithControlBar then
    repeat while m_ar_components.count > 1
      t_rComponent = m_ar_components[1]
      removeObject(t_rComponent.getID())
      m_ar_components.deleteAt(1)
    end repeat
    put m_ar_components
  else
    repeat with t_rComponent in m_ar_components
      removeObject(t_rComponent.getID())
    end repeat
    m_ar_components.deleteAll()
  end if
end
on addComponent me, i_sDef, t_bWithControlBar, a_bMakeActive
  t_rComponent = createObject("CUIComponent" & getUniqueID(), "CUIComponent")
  t_rComponent.readDefinition(i_sDef)
  t_rComponent.checkSize(m_iWidth, m_iHeight)
  if t_bWithControlBar then
    t_iPos = max(m_ar_components.count, 1)
    m_ar_components.addAt(t_iPos, t_rComponent)
  else
    m_ar_components.append(t_rComponent)
  end if
  if a_bMakeActive then
    if objectp(m_rActiveComponent) then
      m_rActiveComponent.showAsActive(0)
      m_rActiveComponent.render(m_rWriter)
    end if
    m_rActiveComponent = t_rComponent
    m_rActiveComponent.showAsActive(1)
    t_rLayout = m_rActiveComponent.GetLayout(1)
    if objectp(m_rActive) then
      m_rActive.inActivate()
      m_rActive.render(m_rWriter)
    end if
    t_rLayout.Activate()
    m_rActive = t_rLayout
  end if
  m_bNeedSorting = 1
  return t_rComponent
end
on GetComponents me
  return m_ar_components
end
on getLastTask me
  return m_ar_components[the count of m_ar_components - 1]
end
on GetActiveComponentID me
  if objectp(m_rActiveComponent) then
    return me.getComponentID(m_rActiveComponent)
  end if
  return 0
end
on GetActiveComponent me
  return m_rActiveComponent
end
on GetActive me
  return m_rActive
end
on setActive me, a_kEvent
  t_bfound = 0
  repeat with t_rComponent in m_ar_components
    repeat with t_rLayout in t_rComponent.GetLayouts()
      if t_rLayout.getEvent() = string(a_kEvent) then
        t_bfound = 1
        exit repeat
      end if
    end repeat
    if t_bfound then
      exit repeat
    end if
  end repeat
  if not t_bfound then
    return 0
  end if
  if objectp(m_rActiveComponent) then
    m_rActiveComponent.showAsActive(0)
    m_rActiveComponent.render(m_rWriter)
  end if
  m_rActiveComponent = t_rComponent
  m_rActiveComponent.showAsActive(1)
  if objectp(m_rActive) then
    m_rActive.inActivate()
    m_rActive.render(m_rWriter)
  end if
  t_rLayout.Activate()
  m_rActive = t_rLayout
  return 1
end
on getVisible me
  t_ar_visible = []
  repeat with t_rComponent in m_ar_components
    t_ar_visible.append(t_rComponent)
    if t_rComponent.hasChildren() then
      repeat with t_rChild in t_rComponent.getChildren()
        t_ar_visible.append(t_rChild)
      end repeat
    end if
  end repeat
  return t_ar_visible
end
on render me
  if m_bNeedSorting then
    case m_iSortingOrder of
      #alphabetical:
        me.sortComponentsAlphabetically()
      #fifo, #normal:
        nothing()
      otherwise:
        nothing()

    end case
    m_bNeedSorting = 0
  end if
  t_ar_visible = me.getVisible()
  t_pOffset = point(0, 0)
  repeat with t_rComponent in t_ar_visible
    t_pLoc = t_rComponent.getPos() + t_pOffset
    t_pOffset = t_pOffset + point(0, t_rComponent.m_iHeight + t_rComponent.GetPadding())
  end repeat
  me.resize(m_iWidth, t_pOffset.locV)
  m_rImg = image(m_iWidth, m_iHeight, 32)
  m_rImg.useAlpha = 1
  t_rMask = image(m_iWidth, m_iHeight, 8, #grayscale)
  if objectp(m_rBgColor) then
    m_rImg.fill(m_rImg.rect, [#shapeType: #rect, #lineSize: 0, #color: m_rBgColor])
  else
    t_rMask.fill(t_rMask.rect, [#shapeType: #rect, #lineSize: 0, #color: rgb("#FFFFFF")])
    m_rImg.setAlpha(t_rMask)
  end if
  t_pOffset = point(0, 0)
  repeat with t_rComponent in t_ar_visible
    t_rImg = t_rComponent.render(m_rWriter)
    t_pLoc = t_rComponent.getPos() + t_pOffset
    m_rImg.copyPixels(t_rImg, rect(t_pLoc, t_pLoc) + t_rImg.rect, t_rImg.rect)
    t_pOffset = t_pOffset + point(0, t_rComponent.m_iHeight + t_rComponent.GetPadding())
  end repeat
  if objectp(m_rBgColor) then
    t_rMask.fill(t_rMask.rect, [#shapeType: #rect, #lineSize: 0, #color: rgb("#000000")])
    m_rImg.setAlpha(t_rMask)
  end if
  return m_rImg
end
on EventProc me, tParm, t_ar_event
  t_ar_visible = me.getVisible()
  t_pOffset = point(0, 0)
  repeat with t_rComponent in t_ar_visible
    t_pLoc = t_rComponent.getPos() + t_pOffset
    t_pForward = tParm - point(0, t_pLoc.locV)
    if t_pForward.inside(t_rComponent.getRect()) then
      t_ar_event[#route][#component] = t_rComponent
      t_bReturnvalue = t_rComponent.EventProc(t_pForward, t_ar_event)
      if t_ar_event.found then
        if objectp(m_rActiveComponent) then
          m_rActiveComponent.showAsActive(0)
          m_rActiveComponent.render(m_rWriter)
        end if
        m_rActiveComponent = t_rComponent
        m_rActiveComponent.showAsActive(1)
        t_rLayout = t_ar_event[#route][#layout]
        if objectp(m_rActive) then
          m_rActive.inActivate()
          m_rActive.render(m_rWriter)
        end if
        t_rLayout.Activate()
        m_rActive = t_rLayout
      end if
      return t_bReturnvalue
    end if
    t_pOffset = t_pOffset + point(0, t_rComponent.m_iHeight + t_rComponent.GetPadding())
  end repeat
  return 0
end