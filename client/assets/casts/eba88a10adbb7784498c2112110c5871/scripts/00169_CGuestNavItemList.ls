-- Script
property m_mp_List
property m_objTopics
property m_mpOrigServerData
property m_Img
property m_ar_pTopics
property m_ar_pLinks
property m_ar_rects
property m_fillColor
property m_rWndObj
property m_sCurrentLand
property m_iCategoryId
property m_width
property m_minHeight

on construct me
  m_mp_List = [:]
  m_objTopics = VOID
  m_mpOrigServerData = VOID
  m_rWndObj = VOID
  m_sCurrentLand = VOID
  m_iCategoryId = VOID
  m_minHeight = 200
  m_Img = VOID
  m_ar_pTopics = []
  m_ar_pLinks = []
  m_ar_rects = []
  m_fillColor = rgb("#001F55")
  m_width = 0
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
end
on createTopics me, a_mp_List
  me.clear()
  t_mp_list = [:]
  m_objTopics = VOID
  m_pImage = VOID
  m_ar_pTopics = []
  m_ar_pLinks = []
  m_ar_rects = []
  m_mpOrigServerData = a_mp_List
  repeat with i = 1 to a_mp_List.count
    t_sName = a_mp_List.getPropAt(i)
    t_Obj = me.createTopCategory(t_sName, 0, a_mp_List[i])
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
on UpdateTopics me, a_sChanging
  if not voidp(m_mpOrigServerData) then
    t_bState = m_mpOrigServerData[a_sChanging]["State"]
    m_mpOrigServerData[a_sChanging]["State"] = not t_bState
    return 1
  end if
end
on getImage me
  return m_Img
end
on SetWidth me, a_iWidth
  m_width = a_iWidth
end
on SetMinimumHeight me, i_iHeight
  m_minHeight = i_iHeight
end
on render me
  m_ar_rects = []
  call(#render, m_ar_pTopics)
  t_iHeight = 0
  repeat with e = 1 to m_ar_pTopics.count
    tImage = m_ar_pTopics[e].getImage()
    t_iHeight = t_iHeight + (tImage.height + 2)
  end repeat
  t_iHeight = max(t_iHeight, m_minHeight)
  m_Img = image(m_width, t_iHeight, 32)
  m_Img.fill(m_Img.rect, [#shapeType: #rect, #color: m_fillColor])
  t_PrevRect = 2
  i = 0
  repeat with tTopic in m_ar_pTopics
    tImage = tTopic.getImage()
    t_iMArgin = tTopic.GetMargin()
    t_iHeight = tImage.height
    tdestrect = rect(t_iMArgin, t_PrevRect, t_iMArgin + tImage.rect.right, t_PrevRect + tImage.rect.bottom)
    m_ar_rects.add(tdestrect)
    m_Img.copyPixels(tImage, tdestrect, tImage.rect)
    t_PrevRect = tdestrect.bottom + 2
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
  t_objTopic = createObject(#random, "CGuestNavListItem")
  if not voidp(t_objTopic) then
    t_objTopic.setText(a_link["Name"])
    t_objTopic.setState(a_bState)
    t_objTopic.setLink(a_link)
    m_ar_pTopics.append(t_objTopic)
    t_objTopic.SetVisibleInNavi(a_link["AccesFromNavi"])
    return t_objTopic
  else
    error("Failed to create Item Object", #createTopCategory)
  end if
end