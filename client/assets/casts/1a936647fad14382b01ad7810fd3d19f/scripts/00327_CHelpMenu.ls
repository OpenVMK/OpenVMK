-- Movie Script
property pXMLData
property bParsed
property helpCategories
property pImg
property pActiveTopic
property pMouseOver
property pVisibleCount
property pContent
property m_fillColor

on construct me
  pXMLData = createObject("Help XML Loader", "CHelpLoadStructure")
  pXMLData.setNotifyObject(me)
  pXMLData.LoadMapFile()
  bParsed = 0
  helpCategories = []
  pActiveTopic = VOID
  pMouseOver = VOID
  pContent = createObject("Help Content View", "CHelpContent")
  pContent.setup(me, 267)
  pContent.pOffset = point(310, 0)
  pImg = image(267, 300, 32)
  m_fillColor = rgb("#001f55")
  return 1
end
on setWindowTitle me, i_WindowTitle
  pContent.setWindowTitle(i_WindowTitle)
end
on setFirstPageActive me
  if bParsed then
    category = helpCategories[1]
    category.Active = 1
    category.update()
    Help = category.helps[1]
    pActiveTopic = Help
    pActiveTopic.setActive(1)
    pActiveTopic.setActivePage(1)
    t_text = pActiveTopic.getText()
    pContent.setTopic(pActiveTopic)
    pContent.setText(t_text)
    me.getVisible()
    pImg = image(267, pVisibleCount * helpCategories[1].pLineHeight, 32)
    me.render()
  end if
end
on deconstruct me
  repeat with category in helpCategories
    removeObject(category.getID())
  end repeat
  helpCategories = []
  removeObject(pContent.getID())
  removeObject(pXMLData.getID())
  pContent = VOID
  pXMLData = VOID
end
on getVisible me
  t_list = []
  repeat with category in helpCategories
    t_list.append([#item: category, #type: "category"])
    if category.Active then
      repeat with Help in category.helps
        t_list.append([#item: Help, #type: "help", #category: category])
      end repeat
    end if
  end repeat
  pVisibleCount = t_list.count()
  return t_list
end
on getMouseItem me, locV
  if bParsed then
    lineH = helpCategories[1].pLineHeight
    tIndex = locV / lineH + 1
    t_list = me.getVisible()
    if tIndex > t_list.count then
      return 0
    end if
    if tIndex < 1 then
      return 0
    end if
    tIndex = max(1, min(t_list.count, tIndex))
    clickItem = t_list[tIndex]
    return clickItem
  else
    return VOID
  end if
end
on clickMenu me, locV
  t_mouseItem = me.getMouseItem(locV)
  if t_mouseItem <> 0 then
    if t_mouseItem.type = "category" then
      t_mouseItem.item.toggleActive()
    else
      if t_mouseItem.type = "help" then
        if not (t_mouseItem.item = pActiveTopic) then
          if not voidp(pActiveTopic) then
            pActiveTopic.setActive(0)
          end if
          pActiveTopic = t_mouseItem.item
          pActiveTopic.setActive(1)
          pActiveTopic.setActivePage(1)
          t_text = pActiveTopic.getText()
          pContent.setTopic(pActiveTopic)
          pContent.setText(t_text)
        end if
      end if
    end if
    me.getVisible()
    pImg = image(267, pVisibleCount * t_mouseItem.item.pLineHeight, 32)
    me.render()
  end if
end
on clickContent me, loc
  t_target = point(0, 0)
  if pContent.inside(loc, t_target) then
    pContent.clickPage(t_target)
  end if
end
on getCurrentOffset me
  visibleItems = me.getVisible()
  tSelected = 0
  if helpCategories.length > 0 then
    tHeight = helpCategories[1].pLineHeight
  else
    tHeight = 21
  end if
  repeat with i = 1 to visibleItems.count
    tItem = visibleItems[i]
    if tItem.type = "help" and tItem.item.Active = 1 then
      tSelected = i - 3
      exit repeat
    end if
  end repeat
  return tSelected * tHeight
end
on render me, a_bPageNotFound
  if voidp(pActiveTopic) and not a_bPageNotFound then
    me.setFirstPageActive()
  end if
  visibleItems = me.getVisible()
  pImg.fill(pImg.rect, [#shapeType: #rect, #color: m_fillColor])
  i = 0
  repeat with helpitem in visibleItems
    helpitem.item.update()
    helpitem.item.render(pImg, i)
    i = i + 1
  end repeat
end
on getImage me
  return pImg
end
on inactivateAllCategories me
  repeat with category in helpCategories
    category.Active = 0
    category.update()
  end repeat
  me.getVisible()
  if helpCategories.length > 0 then
    tHeight = helpCategories[1].pLineHeight
  else
    tHeight = 21
  end if
  pImg = image(267, pVisibleCount * tHeight, 32)
  me.render()
end
on searchNode me, nodename
  repeat with category in helpCategories
    repeat with Help in category.helps
      if Help.name = nodename then
        category.Active = 1
        category.update()
        if not (Help = pActiveTopic) then
          if not voidp(pActiveTopic) then
            pActiveTopic.setActive(0)
          end if
          pActiveTopic = Help
          pActiveTopic.setActive(1)
          pActiveTopic.setActivePage(1)
          t_text = pActiveTopic.getText()
          pContent.setTopic(pActiveTopic)
          pContent.setText(t_text)
        end if
        me.getVisible()
        pImg = image(267, pVisibleCount * helpCategories[1].pLineHeight, 32)
        me.render()
        return 1
      end if
    end repeat
  end repeat
  if not voidp(pActiveTopic) then
    pActiveTopic.setActive(0)
  end if
  pActiveTopic = VOID
  t_text = getText("help.error.page.notfound")
  pContent.setTopic(pActiveTopic)
  pContent.setText(t_text)
  pContent.setButtonState("hlp.nextpage.button", 0)
  pContent.setButtonState("hlp.previouspage.button", 0)
  me.getVisible()
  pImg = image(267, pVisibleCount * helpCategories[1].pLineHeight, 32)
  me.render(1)
  return 0
end
on getTopics me
  t_rTopics = VOID
  if pXMLData.m_bReady then
    pXMLData.m_rTypeMapXML.GetRoot()
    if pXMLData.m_rTypeMapXML.Search("type", "HELPSTRUCTURE") then
      t_rTopics = pXMLData.m_rTypeMapXML.GetNode()
    end if
  end if
  return t_rTopics
end
on parseHelpXML me, xmlData
  t_sMemName = "HELPITEM.node"
  t_iMemNum = createMember(t_sMemName, #text)
  t_rMem = member(t_iMemNum)
  t_rMem.font = "Arial"
  t_rMem.wordWrap = 0
  t_rMem.fontStyle = [#plain]
  t_rMem.fontSize = 12
  t_rMem.antialias = 0
  t_rMem.color = rgb(255, 255, 255)
  objects = me.getTopics()
  if not voidp(objects) then
    repeat with node in objects.child
      if node.type = "HELPCATEGORY" then
        t_clsList = GetClsVariable("help.menu.item.category")
        nucategory = createObject(#random, t_clsList)
        nucategory.addHelps(node, t_rMem)
        helpCategories.append(nucategory)
      end if
    end repeat
    bParsed = 1
  else
    put "ERROR while parsing Help XML data"
  end if
  removeMember(t_sMemName)
end