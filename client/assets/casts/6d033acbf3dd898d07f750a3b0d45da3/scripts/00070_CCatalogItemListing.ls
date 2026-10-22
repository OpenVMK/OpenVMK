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
property m_mpTopicByObject

on construct me
  m_mp_List = [:]
  m_mpTopicByObject = [:]
  m_objTopics = VOID
  m_mpOrigServerData = VOID
  m_rWndObj = VOID
  m_sCurrentLand = VOID
  m_iCategoryId = VOID
  m_Img = VOID
  m_ar_pTopics = []
  m_ar_pLinks = []
  m_ar_rects = []
  m_fillColor = rgb(0, 51, 102)
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
on createTopics me, a_mp_List
  t_mp_list = [:]
  m_objTopics = VOID
  m_pImage = VOID
  m_ar_pTopics = []
  m_ar_pLinks = []
  m_ar_rects = []
  m_mpOrigServerData = a_mp_List
  repeat with i = 1 to a_mp_List.count
    t_sName = string(a_mp_List.getPropAt(i))
    t_iID = a_mp_List[i].id
    if t_iID <> 10 then
      t_iState = a_mp_List[i].state
      t_iLandId = a_mp_List[i].id
      t_mp_list.addProp(t_sName, [:])
      t_mp_list[t_sName].addProp(#state, t_iState)
      t_Obj = me.createTopCategory(t_sName, t_iState, t_iLandId)
      t_iLand = a_mp_List[i].id
      t_mp_list[t_sName].addProp(#object, t_Obj)
      t_iPos = m_mpTopicByObject.findPos(t_iID)
      if voidp(t_iPos) then
        t_sID2 = string(t_iID)
        m_mpTopicByObject.addProp(t_sID2, [:])
        m_mpTopicByObject[t_sID2].addProp(#top, t_Obj)
        m_mpTopicByObject[t_sID2].addProp(#bottom, [])
      end if
      if t_iState > 0 then
        repeat with e = 2 to a_mp_List[i].count
          if listp(a_mp_List[i][e]) then
            t_sName = a_mp_List[i].getPropAt(e)
            t_sID = a_mp_List[i].getPropAt(e) & t_iLandId
            t_iState = a_mp_List[i][e].state
            t_mp_list.addProp(t_sID, [:])
            t_mp_list[t_sID].addProp(#state, t_iState)
            t_iLink = a_mp_List[i][e].id
            t_sSpecial = a_mp_List[i][e].special
            t_Obj = me.createSubCategory(t_sName, t_iState, t_iLink, t_sSpecial, t_iLand)
            t_mp_list[t_sID].addProp("Obj", t_Obj)
            if m_mpTopicByObject.findPos(string(t_iID)) then
              m_mpTopicByObject[string(t_iID)].bottom.add(t_Obj)
            end if
          end if
        end repeat
      end if
    end if
  end repeat
  m_mp_List = t_mp_list
  me.render()
  return m_Img
end
on UpdateStates me, a_Pnt
  t_mpList = m_ar_rects
  if t_mpList[t_mpList.count].bottom > a_Pnt.locV then
    repeat with i = 1 to t_mpList.count
      if not (a_Pnt.locV > m_ar_rects[i].bottom) then
        t_iPos = i
        exit repeat
      end if
    end repeat
    if t_mpList[t_iPos].left < a_Pnt.locH and t_mpList[t_iPos].right > a_Pnt.locH then
      t_iType = m_ar_pTopics[t_iPos].GetType()
      if t_iType > 1 then
        m_ar_pTopics[t_iPos].setState()
        me.RenderOne(t_iPos)
        t_iLink = m_ar_pTopics[t_iPos].getLink()
        m_sCurrentLand = m_ar_pTopics[t_iPos].getLand()
      end if
    end if
  end if
  return m_Img
end
on UpdateView me, a_Pnt
  t_mpList = m_ar_rects
  if t_mpList[t_mpList.count].bottom > a_Pnt.locV then
    repeat with i = 1 to t_mpList.count
      if not (a_Pnt.locV > m_ar_rects[i].bottom) then
        t_iPos = i
        exit repeat
      end if
    end repeat
    if t_mpList[t_iPos].left < a_Pnt.locH and t_mpList[t_iPos].right > a_Pnt.locH then
      t_iType = m_ar_pTopics[t_iPos].GetType()
    end if
  end if
  case t_iType of
    1:
      m_ar_pTopics[t_iPos].setState()
      t_bUpdate = me.UpdateTopics(m_ar_pTopics[t_iPos].getText())
      if t_bUpdate then
        me.createTopics(m_mpOrigServerData)
      end if
      m_sCurrentLand = m_ar_pTopics[t_iPos].getLand()
    2:
      repeat with f = 1 to m_ar_pTopics.count
        if m_ar_pTopics[f].GetState() then
          m_ar_pTopics[f].setState(0)
          me.RenderOne(f)
        end if
      end repeat
      m_ar_pTopics[t_iPos].setState(1)
      me.RenderOne(t_iPos)
      t_iLink = m_ar_pTopics[t_iPos].getLink()
      m_iCategoryId = t_iLink
      m_sCurrentLand = m_ar_pTopics[t_iPos].getLand()
      getConnection(getVariable("main.connection.id", "VMK")).send(16, [#int: t_iLink])

  end case
  return m_Img
end
on UpdateTopics me, a_sChanging
  if not voidp(m_mpOrigServerData) then
    t_bState = m_mpOrigServerData[a_sChanging].state
    m_mpOrigServerData[a_sChanging].state = not t_bState
    return 1
  end if
end
on GetCurrentLand me, a_Pnt
  if voidp(m_sCurrentLand) then
    t_Obj = m_mp_List[1].object
    if objectp(t_Obj) then
      m_sCurrentLand = t_Obj.getLand()
    end if
  end if
  return m_sCurrentLand
end
on GetCategoryId me
  return m_iCategoryId
end
on getImage me
  return m_Img
end
on render me
  m_ar_rects = [:]
  call(#render, m_ar_pTopics)
  t_iHeight = 0
  repeat with e = 1 to m_ar_pTopics.count
    tImage = m_ar_pTopics[e].getImage()
    t_iHeight = t_iHeight + (tImage.height + 2)
  end repeat
  m_Img = image(215, t_iHeight, 8)
  m_Img.fill(m_Img.rect, [#shapeType: #rect, #color: m_fillColor])
  t_PrevRect = 2
  i = 0
  repeat with tTopic in m_ar_pTopics
    tImage = tTopic.getImage()
    t_iMArgin = tTopic.GetMargin()
    t_iHeight = tImage.height
    tdestrect = rect(t_iMArgin, t_PrevRect, t_iMArgin + tImage.rect.right, t_PrevRect + tImage.rect.bottom)
    if tTopic.GetType() = 2 then
      t_iID = tTopic.getLink()
    else
      t_iID = tTopic.getLand()
    end if
    m_ar_rects.addProp(t_iID, tdestrect)
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
on createTopCategory me, i_sText, a_bState, a_iLandId
  t_iPos = m_mp_List.findPos(i_sText)
  if not voidp(m_mp_List) and t_iPos > 0 then
    t_objTopic = m_mp_List[t_iPos].object
  else
    t_objTopic = createObject(#temp, "CCatalogShops")
  end if
  if not voidp(t_objTopic) then
    t_objTopic.setText(string(i_sText))
    t_objTopic.setState(a_bState)
    t_objTopic.setLand(a_iLandId)
    m_ar_pTopics.append(t_objTopic)
    return t_objTopic
  else
    error(me, "Failed to create catalog Topic Object", #addTopic)
  end if
end
on createSubCategory me, i_sText, a_bState, a_iLink, a_sSpecial, a_iLandId
  t_iPos = m_mp_List.findPos(i_sText)
  if not voidp(m_mp_List) and t_iPos > 0 then
    t_objTopic = m_mp_List[t_iPos]["Obj"]
  else
    t_objTopic = createObject(#temp, "CCatalogItems")
  end if
  if not voidp(t_objTopic) then
    t_objTopic.setText(string(i_sText))
    t_objTopic.setLink(a_iLink)
    t_objTopic.setState(a_bState)
    t_objTopic.setSpecial(a_sSpecial)
    t_objTopic.setLand(a_iLandId)
    m_ar_pTopics.append(t_objTopic)
    return t_objTopic
  else
    error(me, "Failed to create Catalog Sub Object", #addTopic)
  end if
end