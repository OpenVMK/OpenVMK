-- Script
property m_bReady
property m_rTypeMapXML
property m_rNullObjDesc
property m_pNotifyObject

on construct me
  m_bReady = 0
  m_rTypeMapXML = CreateXML()
  m_rNullObjDesc = VOID
  m_pNotifyObject = VOID
  return 1
end
on deconstruct me
  m_bReady = 0
  m_rTypeMapXML = VOID
  m_rNullObjDesc = VOID
  return 1
end
on setNotifyObject me, t_object
  m_pNotifyObject = t_object
end
on IsReady me
  return m_bReady
end
on LoadMapFile me
  if variableExists("roominfo_url") then
    t_sFile = getVariable("roominfo_url")
    t_sMember = "Room Information Structure"
    t_iMember = queueDownload(t_sFile, t_sMember, #text)
    registerDownloadCallback(t_iMember, #_FileLoadCallback, me.getID(), t_sMember)
    m_bReady = 0
  else
    error(me, "URL for external Room Information Structure not defined!", #_LoadMapFile)
    m_bReady = 1
  end if
end
on _FileLoadCallback me, a_sMember
  m_rTypeMapXML = CreateXML(getMember(a_sMember).text)
  m_bReady = 1
  m_pNotifyObject.parseHelpXML(m_rTypeMapXML)
end