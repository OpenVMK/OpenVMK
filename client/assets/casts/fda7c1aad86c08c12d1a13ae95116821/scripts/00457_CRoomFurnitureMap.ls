-- Script
property m_bReady
property m_rNullObjDesc
property m_mp_iCode_rItem
property m_ar_sMapFileName
property m_iProcessNumber

on construct this
  m_bReady = 0
  m_mp_iCode_rItem = [:]
  m_ar_sMapFileName = []
  m_rNullObjDesc = CreateXML(getMember("room.furniture.null.xml").text)
  m_rNullObjDesc.Search("TYPE", "ITEM")
  m_iProcessNumber = getThread(#main).component.GetProcessManager().QueueProcessTurn()
  registerMessage("start_process_" & m_iProcessNumber, this.getID(), #_LoadMapFile)
  return 1
end
on deconstruct this
  m_bReady = 0
  m_mp_iCode_rItem = VOID
  m_rNullObjDesc = VOID
  m_ar_sMapFileName = []
  return 1
end
on IsReady this
  return m_bReady
end
on GetByTypeCode this, a_iType
  t_rObjDesc = VOID
  if m_bReady then
    t_rObjDesc = m_mp_iCode_rItem.getaProp(a_iType)
  end if
  if voidp(t_rObjDesc) then
    error(this, "Unknown object type code:" && a_iType, #GetByTypeCode)
    return m_rNullObjDesc.GetNode()
  else
    return t_rObjDesc
  end if
end
on SetByTypeCode this, a_iType, a_rXML
  m_mp_iCode_rItem.setaProp(a_iType, a_rXML)
end
on GetTypecodeList this
  t_ar_iOutput = []
  repeat with i = 1 to m_mp_iCode_rItem.count
    t_ar_iOutput.append(m_mp_iCode_rItem.getPropAt(i))
  end repeat
  return t_ar_iOutput
end
on _LoadMapFile this
  unregisterMessage("start_process_" & m_iProcessNumber, this.getID())
  ShowCustomLoadingScreen(0)
  if not getObjectManager().exists("RoomFurniMapLoadingDialog") then
    t_rObj = createObject("RoomFurniMapLoadingDialog", "CLoadingWindow")
    t_rObj.DefineWindow([#headline: getText("room.loading.furnimap.headline"), #infotext: getText("room.loading.furnimap.info"), #showbutton: 0, #modal: 0, #client: this.getID()])
  end if
  getWindowManager().lock()
  i = 1
  m_ar_sMapFileName = []
  repeat while 1
    if variableExists("furnituremap_url." & i) then
      t_sFile = getVariable("furnituremap_url." & i)
      m_ar_sMapFileName.add(t_sFile)
      if memberExists(t_sFile) then
        this._FileLoadCallback(t_sFile)
      end if
    else
      exit repeat
    end if
    i = i + 1
  end repeat
  if m_ar_sMapFileName.count then
    repeat with i = 1 to m_ar_sMapFileName.count
      t_sFile = m_ar_sMapFileName[i]
      t_sMember = t_sFile
      t_iMember = queueDownload(t_sFile, t_sMember, #text)
      registerDownloadCallback(t_iMember, #_FileLoadCallback, this.getID(), t_sMember)
    end repeat
    m_bReady = 0
  else
    m_bReady = 1
  end if
  if m_ar_sMapFileName.count = 0 then
    if variableExists("furnituremap_url") then
      t_sFile = getVariable("furnituremap_url")
      t_sMember = t_sFile
      t_iMember = queueDownload(t_sFile, t_sMember, #text)
      m_ar_sMapFileName.add(t_sFile)
      registerDownloadCallback(t_iMember, #_FileLoadCallback, this.getID(), t_sMember)
      m_bReady = 0
    else
      m_bReady = 1
    end if
  end if
end
on _FileLoadCallback this, a_sMember
  if m_ar_sMapFileName.getPos(a_sMember) > 0 then
    m_ar_sMapFileName.deleteOne(a_sMember)
  else
    error(this, "File load callback for unknown file:" && QUOTE & a_sMember & QUOTE & "!", #_FileLoadCallback)
    exit
  end if
  tt = the milliSeconds
  t_rTypeMapXML = CreateXML(getMember(a_sMember).text)
  if t_rTypeMapXML.Search("type", "ITEMS") then
    t_rItems = t_rTypeMapXML.GetNode()
    repeat with t_rItem in t_rItems.child
      m_mp_iCode_rItem.setaProp(integer(t_rItem.param["CODE"]), t_rItem)
    end repeat
  end if
  tt = the milliSeconds - tt
  put "furnimap parsed in" && tt && "ms."
  if m_ar_sMapFileName.count = 0 then
    m_bReady = 1
    if getObjectManager().exists("RoomFurniMapLoadingDialog") then
      getObject("RoomFurniMapLoadingDialog").DeleteWindow()
      removeObject("RoomFurniMapLoadingDialog")
    end if
    getWindowManager().unlock()
    RemoveCustomLoadingScreen()
    getThread(#main).component.GetProcessManager().ProcessReadyCallback(m_iProcessNumber)
    executeMessage("furnimap_ready")
  end if
end
on _ReplaceNodeParam this, a_sVar, a_sVal, a_rNode
  repeat with i = 1 to a_rNode.param.count
    if a_rNode.param[i] = a_sVar then
      a_rNode.param.setaProp(a_rNode.param.getPropAt(i), a_sVal)
    end if
  end repeat
  repeat with t_rChild in a_rNode.child
    this._ReplaceNodeParam(a_sVar, a_sVal, t_rChild)
  end repeat
end