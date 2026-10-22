-- Movie Script
property pXMLData
property bParsed
property m_pRooms

on construct me
  pXMLData = createObject("Tutorials XML Loader", "CTutorialsLoadStructure")
  pXMLData.setNotifyObject(me)
  pXMLData.LoadMapFile()
  bParsed = 0
  m_pRooms = [:]
  return 1
end
on deconstruct me
  removeObject(pXMLData.getID())
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
on getTutorialByID me, tutorialID, t_ar_Info
  if bParsed then
    t_data = m_pRooms.getaProp(string(tutorialID))
    if not voidp(t_data) then
      t_ar_Info.name = t_data.getaProp(#name)
      t_ar_Info.Caption = t_data.getaProp(#Caption)
      t_ar_Info.description = t_data.getaProp(#desc)
      t_ar_Info.link = t_data.getaProp(#link)
    end if
    return 1
  end if
  return 0
end
on GetRooms me
  t_rTopics = VOID
  if pXMLData.m_bReady then
    pXMLData.m_rTypeMapXML.GetRoot()
    if pXMLData.m_rTypeMapXML.Search("type", "TUTORIALS") then
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
      if node.type = "TUTORIAL" then
        roomdata = [:]
        roomdata[#name] = node.param.getaProp("NAME")
        roomdata[#Caption] = node.param.getaProp("CAPTION")
        repeat with roomdataNode in node.child
          if roomdataNode.type = "DESC" then
            roomdata[#desc] = roomdataNode.value
          end if
          if roomdataNode.type = "LINK" then
            roomdata[#link] = roomdataNode.value
          end if
        end repeat
        m_pRooms[node.param.getaProp("NAME")] = roomdata
        bParsed = 1
      end if
    end repeat
    bParsed = 1
  else
    put "ERROR while parsing Tutorials XML data"
  end if
end