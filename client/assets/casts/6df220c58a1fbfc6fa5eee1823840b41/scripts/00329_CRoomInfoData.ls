-- Movie Script
property pXMLData
property bParsed
property m_pRooms

on construct me
  pXMLData = VOID
  bParsed = 1
  m_pRooms = [:]
  return 1
end
on deconstruct me
  if not voidp(pXMLData) then
    removeObject(pXMLData.getID())
  end if
  pXMLData = VOID
  bParsed = 0
  m_pRooms = [:]
  return 1
end
on IsReady me
  if bParsed then
    return 1
  else
    return 0
  end if
end
on getRoomByTag me, roomTag
  t_pInfo = [:]
  t_pInfo[#name] = getText("ROOM." & roomTag & ".NAME")
  t_pInfo[#description] = getText("ROOM." & roomTag & ".DESC")
  return t_pInfo
end
on getRoomByTagOLD me, roomTag
  t_pInfo = [#name: EMPTY, #description: EMPTY]
  t_data = m_pRooms.getaProp(string(roomTag))
  if not voidp(t_data) then
    t_pInfo.name = t_data.getaProp(#name)
    t_pInfo.description = t_data.getaProp(#desc)
  end if
  return t_pInfo
end
on GetRooms me
  t_rTopics = VOID
  if pXMLData.m_bReady then
    pXMLData.m_rTypeMapXML.GetRoot()
    if pXMLData.m_rTypeMapXML.Search("type", "ROOMS") then
      t_rTopics = pXMLData.m_rTypeMapXML.GetNode()
    end if
  end if
  return t_rTopics
end
on parseHelpXML me, xmlData
  m_pRooms = [:]
  objects = me.GetRooms()
  if not voidp(objects) then
    repeat with node in objects.child
      if node.type = "ROOM" then
        roomdata = [:]
        repeat with roomdataNode in node.child
          if roomdataNode.type = "NAME" then
            roomdata[#name] = roomdataNode.value
          end if
          if roomdataNode.type = "DESC" then
            roomdata[#desc] = roomdataNode.value
          end if
        end repeat
        m_pRooms[node.param.getaProp("TAG")] = roomdata
      end if
    end repeat
    bParsed = 1
  else
    put "ERROR while parsing Room Info XML data"
  end if
end