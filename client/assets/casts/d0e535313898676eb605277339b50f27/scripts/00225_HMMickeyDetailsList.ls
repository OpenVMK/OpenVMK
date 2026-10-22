-- Script
property m_mp_List
property m_objTopics
property m_Img
property m_ar_pTopics
property m_ar_pLinks
property m_ar_rects
property m_fillColor
property m_rWndObj
property m_iItemWidth
property m_iItemHeight
property m_rClientElement

on construct me
  m_mp_List = [:]
  m_objTopics = VOID
  m_rWndObj = VOID
  m_rClientElement = VOID
  m_Img = VOID
  m_ar_pTopics = []
  m_ar_pLinks = []
  m_ar_rects = []
  m_fillColor = rgb("#001F55")
  m_iItemWidth = 0
  m_iItemHeight = 0
  return 1
end
on deconstruct me
  return 1
end
on Define me, a_mp_List, a_sWndName
  m_rWndObj = a_sWndName
  me.createTopics(a_mp_List)
  return m_Img
end
on clear me
  repeat with tObj in m_ar_pTopics
    removeObject(tObj.getID())
  end repeat
  m_ar_pTopics = []
end
on padNum me, numToPad, paddedLength
  repeat while 1
    if power(10, paddedLength - 1) - numToPad <= 0 then
      exit repeat
    end if
    numToPad = "0" & numToPad
    paddedLength = paddedLength - 1
  end repeat
  return numToPad
end
on createTopics me, a_mp_List
  me.clear()
  t_mp_list = [:]
  m_objTopics = VOID
  m_pImage = VOID
  m_ar_pTopics = []
  m_ar_pLinks = []
  m_ar_rects = []
  repeat with tListItem in a_mp_List
    t_sName = tListItem.date && getText("hidden.mickey." & me.padNum(tListItem.id, 3))
    t_Obj = me.createTopCategory(t_sName, 0, tListItem.duplicate())
  end repeat
  m_mp_List = a_mp_List
  me.render()
  return m_Img
end
on click me, a_Pnt
  repeat with tTopic in m_ar_pTopics
    tTopic.setState(0)
  end repeat
  t_mpList = m_ar_rects
  if t_mpList.count > 0 then
    if t_mpList[t_mpList.count].bottom > a_Pnt.locV then
      repeat with i = 1 to t_mpList.count
        if not (a_Pnt.locV > m_ar_rects[i].bottom) then
          t_iPos = i
          exit repeat
        end if
      end repeat
      if t_mpList[t_iPos].left < a_Pnt.locH and t_mpList[t_iPos].right > a_Pnt.locH then
        m_ar_pTopics[t_iPos].setState(1)
      end if
    end if
  end if
  me.render()
  return m_Img
end
on GetSelected me
  tSelected = 0
  repeat with i = 1 to m_ar_pTopics.count
    if m_ar_pTopics[i].GetState() then
      return i
    end if
  end repeat
  return tSelected
end
on GetItem me, i_iIndex
  return m_ar_pTopics[i_iIndex]
end
on getImage me
  return m_Img
end
on SetItemWidth me, a_iWidth
  m_iItemWidth = a_iWidth
end
on SetItemHeight me, a_iHeight
  m_iItemHeight = a_iHeight
end
on setClientElement me, a_rUniqueElement
  m_rClientElement = a_rUniqueElement
end
on render me
  m_ar_rects = []
  call(#render, m_ar_pTopics)
  t_iHeight = 0
  repeat with e = 1 to m_ar_pTopics.count
    tImage = m_ar_pTopics[e].getImage()
    t_iHeight = t_iHeight + (tImage.height + 1)
  end repeat
  m_Img = image(m_rClientElement.getProperty(#width), t_iHeight, 32)
  m_Img.fill(m_Img.rect, [#shapeType: #rect, #color: m_fillColor])
  t_PrevTop = 1
  i = 0
  repeat with tTopic in m_ar_pTopics
    tImage = tTopic.getImage()
    t_iMArgin = 1
    t_iHeight = tImage.height
    tdestrect = rect(t_iMArgin, t_PrevTop, t_iMArgin + tImage.rect.right, t_PrevTop + tImage.rect.bottom)
    m_ar_rects.add(tdestrect)
    m_Img.copyPixels(tImage, tdestrect, tImage.rect)
    t_PrevTop = tdestrect.bottom + 1
    i = i + 1
  end repeat
end
on RenderOne me, a_iPos
  tTopic = m_ar_pTopics[a_iPos]
  tImage = tTopic.getImage()
  tdestrect = m_ar_rects[a_iPos]
  m_Img.copyPixels(tImage, tdestrect, tImage.rect)
end
on createTopCategory me, i_sText, a_bState, a_link
  t_objTopic = createObject(#random, "HMMickeyDetailsListItem")
  if not voidp(t_objTopic) then
    t_objTopic.SetWidth(m_iItemWidth)
    t_objTopic.SetHeight(m_iItemHeight)
    t_objTopic.setText(i_sText)
    t_objTopic.setState(a_bState)
    t_objTopic.m_bNeedUpdate = 1
    t_objTopic.setLink(a_link)
    m_ar_pTopics.append(t_objTopic)
    return t_objTopic
  else
    error("Failed to create Item Object", #createTopCategory)
  end if
end