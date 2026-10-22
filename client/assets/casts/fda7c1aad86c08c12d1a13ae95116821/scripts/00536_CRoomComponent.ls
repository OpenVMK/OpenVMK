-- Score Script
property m_rFactory
property m_rContext
property m_rProcess
property m_sActive
property m_rCache
property m_rSprites
property m_iVersion
property m_rFurniMap
property m_fPercent
property m_bCancelled
property m_rRoomXML
property m_rRoomBSPXML
property m_rThumbRenderer
property m_bProcessInitialized

on construct this
  if the controlDown and _key.keyPressed(0) then
    the debugPlaybackEnabled = 1
  end if
  m_sActive = EMPTY
  m_rCache = [:]
  m_rSprites = [:]
  m_iVersion = 0
  m_fPercent = 0.0
  m_bCancelled = 0
  m_rRoomXML = CreateXML()
  m_rRoomBSPXML = VOID
  m_bProcessInitialized = 0
  m_rFactory = createObject(#temp, GetClsVariable("core.xml.tree.factory"))
  m_rContext = VOID
  t_rXML = CreateXML()
  t_rXML.open(getMember("room.classes.xml").text)
  m_rFactory.LoadTagDef(t_rXML)
  t_rXML.close()
  this._ResetProcess()
  registerMessage("room_create", this.getID(), #_CreateRoom)
  registerMessage("room_switch", this.getID(), #_SwitchRoom)
  registerMessage("room_remove", this.getID(), #_RemoveRoom)
  registerMessage(#Initialize, this.getID(), #_Initialize)
  return 1
end
on deconstruct this
  unregisterMessage("room_create", this.getID())
  unregisterMessage("room_switch", this.getID())
  unregisterMessage("room_remove", this.getID())
  this._ResetProcess()
  call(#deconstruct, m_rFactory)
  if not voidp(m_rFurniMap) then
    removeObject(m_rFurniMap.getID())
  end if
  m_rRoomXML = VOID
  m_rRoomBSPXML = VOID
  m_rFurniMap = VOID
  m_rFactory = VOID
  m_rContext = VOID
  m_sActive = EMPTY
  m_rCache = [:]
  removeObject("RoomItemAssetManager")
  if objectp(m_rThumbRenderer) then
    removeObject(m_rThumbRenderer.getID())
    m_rThumbRenderer = VOID
  end if
  return 1
end
on update this
  m_rContext.update()
end
on getLoadPercent this
  return m_fPercent
end
on GetFurniAssetManager this
  return getObject("RoomItemAssetManager")
end
on _Initialize this, a_sStatus
  unregisterMessage(#Initialize, this.getID())
  m_rFurniMap = createObject(getUniqueID(), "CRoomFurnitureMap")
  createObject("RoomItemAssetManager", "CRoomItemAssetManager")
  m_rThumbRenderer = createObject(getUniqueID(), "CRoomFurniThumbRenderer")
end
on _CreateRoom this, a_rXML, a_iVersion
  m_bProcessInitialized = 0
  if objectp(m_rContext) then
    this._RemoveRoom()
  end if
  this._ResetProcess()
  a_rXML.GetRoot()
  if not a_rXML.Search("type", "FILES") then
    return error(this, "Invalid resource document!", #_CreateRoom)
  end if
  m_sActive = a_rXML.GetNode().param.getaProp("ID")
  t_iRoomCode = a_rXML.GetNode().param.getaProp("CODE")
  m_rCache.setaProp(m_sActive, a_rXML)
  if a_rXML.Search("type", "CASTS") then
    t_rCasts = a_rXML.GetNode()
    if t_rCasts.child.count > 0 then
      repeat with t_rCast in t_rCasts.child
        m_rProcess.casts.add(0)
        t_iLoadID = startCastLoad(t_rCast.param.getaProp("URL"), 0, 1)
        registerCastloadCallback(t_iLoadID, #_UpdateProcess, this.getID(), "casts_ready")
      end repeat
      this.getInterface().ShowLoadBar("foo", t_iRoomCode)
    else
      this._UpdateProcess("casts_ready")
    end if
  end if
  a_rXML.GetRoot()
  a_rXML.Search("type", "FILES")
  if a_rXML.Search("type", "OTHER") then
    t_rFiles = a_rXML.GetNode()
    if t_rFiles.child.count > 0 then
      repeat with t_rFile in t_rFiles.child
        m_rProcess.Files.add(0)
        t_iMemNum = queueDownload(t_rFile.param.getaProp("URL"), VOID, VOID, 1)
        registerDownloadCallback(t_iMemNum, #_UpdateProcess, this.getID(), "files_ready")
      end repeat
    end if
  else
    this._UpdateProcess("files_ready")
  end if
  if integerp(a_iVersion) then
    m_iVersion = a_iVersion
  else
    m_iVersion = 0
  end if
end
on _SwitchRoom this, a_sActive
  if objectp(m_rContext) then
    m_rRoomXML = CreateXML()
    m_rFactory.Remove(m_rContext.GetKey())
    m_rContext = VOID
  end if
  removeUpdate(this.getID())
  executeMessage("room_leave")
  m_iVersion = 0
  m_rCache.setaProp(a_sActive, m_rCache.getaProp(m_sActive))
  this._PrepareRoom(a_sActive, #localswitch)
end
on _CancelRoom this
  if objectp(m_rContext) then
    this._RemoveRoom()
  else
    this.interface.hideLoadBar()
    m_bCancelled = 1
  end if
end
on _RemoveRoom this
  if not objectp(m_rContext) then
    return error(this, "Context already removed!", #_RemoveRoom)
  else
    executeMessage("room_leave")
  end if
  if m_rFactory.Remove(m_rContext.GetKey()) then
    m_rRoomXML = CreateXML()
    m_rContext = VOID
    this._UnloadRoom(m_sActive)
  end if
  removeUpdate(this.getID())
  this._ResetProcess()
  m_sActive = EMPTY
  m_fPercent = 0.0
  this.getInterface().hideLoadBar()
end
on _AccessRoom this
  return m_rContext
end
on _ResetProcess this
  m_rProcess = [#casts: [], #Files: [], #logic: []]
  m_fPercent = 0.0
  m_bCancelled = 0
end
on _UpdateProcess this, a_sState
  case a_sState of
    "casts_ready":
      t_rTask = m_rProcess.casts
    "files_ready":
      t_rTask = m_rProcess.Files
    "logic_ready":
      t_rTask = m_rProcess.logic

  end case
  return error(this, "Unknown step:" && a_sState, #_UpdateProcess)
  repeat with i = 1 to t_rTask.count
    if t_rTask[i] = 0 then
      t_rTask[i] = 1
      exit repeat
    end if
  end repeat
  t_iReady = 0
  t_iTotal = 0
  repeat with t_rStep in m_rProcess
    repeat with i = 1 to t_rStep.count
      t_iTotal = t_iTotal + 1
      if t_rStep[i] = 1 then
        t_iReady = t_iReady + 1
      end if
    end repeat
  end repeat
  if t_iReady = 0 then
    m_fPercent = 0.0
  else
    m_fPercent = float(t_iReady) / float(t_iTotal)
  end if
  t_bReady = 1
  repeat with t_rStep in m_rProcess
    repeat with i = 1 to t_rStep.count
      if t_rStep[i] = 0 then
        t_bReady = 0
        exit repeat
      end if
    end repeat
  end repeat
  if m_bCancelled then
    m_bCancelled = 0
  else
    if t_bReady then
      if voidp(m_rFurniMap) then
        error(this, "Room thread isn't initialized properly!!!", #_UpdateProcess)
        this.delay(1000, #_UpdateProcess, "files_ready")
        exit
      end if
      if not m_rFurniMap.IsReady() then
        error(this, "Furniture map no ready!!!", #_UpdateProcess)
        this.delay(1000, #_UpdateProcess, "files_ready")
        exit
      end if
      if not m_bProcessInitialized then
        m_bProcessInitialized = 1
        this.delay(500, #_PrepareRoom, m_sActive)
      end if
    end if
  end if
end
on _PrepareRoom this, a_sActive, a_kLocalSwitch
  this._ResetProcess()
  this.getInterface().hideLoadBar()
  if objectp(m_rContext) then
    error(this, "There's already active room context!", #_PrepareRoom)
    m_rFactory.Remove(m_rContext.GetKey())
    m_rContext = VOID
  end if
  m_sActive = a_sActive
  t_sDoc = "project." & a_sActive & ".xml"
  if not memberExists(t_sDoc) then
    return error(this, "Project doc not found:" && QUOTE & t_sDoc & QUOTE, #_PrepareRoom)
  end if
  t_rProjXML = CreateXML(getMember(t_sDoc).text)
  t_sXML = EMPTY
  t_bspXML = EMPTY
  if t_rProjXML.Search("type", "PROJECT") then
    t_sXML = t_rProjXML.GetParam("DOC")
    if voidp(t_sXML) then
      t_sXML = EMPTY
    end if
    t_bspXML = t_rProjXML.GetParam("BSP")
    if voidp(t_bspXML) then
      t_bspXML = EMPTY
    end if
  end if
  if t_sXML = EMPTY then
    return error(this, "Invalid project doc:" && QUOTE & t_sDoc & QUOTE, #_PrepareRoom)
  end if
  t_rXML = CreateXML(getMember(t_sXML).text)
  if not t_rXML.Search("type", "ROOM") then
    return error(this, "Missing data in document:" && QUOTE & "ROOM" & QUOTE, #_PrepareRoom)
  else
    m_rRoomXML = t_rXML
  end if
  if t_bspXML <> EMPTY then
    m_rRoomBSPXML = CreateXML(getMember(t_bspXML).text)
  else
    m_rRoomBSPXML = VOID
  end if
  m_rSprites = [:]
  t_rProjNode = t_rProjXML.GetNode()
  repeat with t_rLayout in t_rProjNode.child
    t_rSpriteXML = CreateXML(getMember(t_rLayout.param.getaProp("DOC")).text)
    if t_rSpriteXML.Search("type", "SCORE") then
      t_rScore = t_rSpriteXML.GetNode()
      repeat with t_rSprite in t_rScore.child
        m_rSprites.setaProp(t_rSprite.param.getaProp("ID"), t_rSprite)
      end repeat
    end if
  end repeat
  t_sKey = m_rFactory.createKey()
  if m_rFactory.create(t_sKey, t_rXML) then
    m_rContext = m_rFactory.Access(t_sKey)
    m_rContext._IndexObjects()
    repeat while 1
      t_rPointer = m_rContext.Search("CLASS", "pointer")
      if objectp(t_rPointer) then
        t_rPointer.GetOwner().Remove(t_rPointer.GetKey())
        next repeat
      end if
      exit repeat
    end repeat
    t_rPtrXML = CreateXML(getMember("room.object.pointer.xml").text)
    t_rPtrXML.Search("type", "NODE")
    t_rPtrXML.RemParam("REF")
    m_rContext.create(m_rFactory.createKey(), t_rPtrXML)
    receiveUpdate(this.getID())
    executeMessage("room_ready", m_rContext)
    if m_iVersion <> 0 then
      t_iVersion = integer(m_rContext.GetParam("VERSION"))
      if t_iVersion <> m_iVersion then
        if the runMode = "Author" then
          put "Room version mismatch!" & RETURN & "Client:" && t_iVersion && "/" && "Server:" && m_iVersion
        end if
      end if
    end if
    if voidp(a_kLocalSwitch) then
      if getObject("RoomItemAssetManager").GetQueueLength() = 0 then
        if connectionExists(getVariable("main.connection.id", "VMK")) then
          getConnection(getVariable("main.connection.id", "VMK")).send("start")
        end if
      else
        this.delay(500, #_WaitForItemsToPreloadBeforeEnteringRoom)
      end if
    else
      if a_kLocalSwitch = #localswitch then
      end if
    end if
  else
    if the runMode = "Author" then
      error(this, "Failed to create room context!", #_PrepareRoom)
    end if
  end if
end
on _UnloadRoom this, a_sActive
  if not voidp(m_rContext) then
    error(this, "Can't remove resources while room is active!", #_UnloadRoom)
    exit
  end if
  m_rRoomBSPXML = VOID
  t_rXML = m_rCache.getaProp(a_sActive)
  if objectp(t_rXML) then
    t_rXML.GetRoot()
    t_rXML.Search("type", "FILES")
    if t_rXML.Search("type", "CASTS") then
      t_rCasts = t_rXML.GetNode()
      if t_rCasts.child.count > 0 then
        repeat with t_rCast in t_rCasts.child
          t_sCstName = t_rCast.param.getaProp("URL")
          if castExists(t_sCstName) then
            RemoveCastLib(t_sCstName)
          end if
        end repeat
      end if
    end if
    t_rXML.GetRoot()
    t_rXML.Search("type", "FILES")
    if t_rXML.Search("type", "OTHER") then
      t_rFiles = t_rXML.GetNode()
      if t_rFiles.child.count > 0 then
        repeat with t_rFile in t_rFiles.child
          t_sMemName = t_rFile.param.getaProp("URL")
          if memberExists(t_sMemName) then
            removeMember(t_sMemName)
          end if
        end repeat
      end if
    end if
  end if
end
on _WaitForItemsToPreloadBeforeEnteringRoom this
  t_rLoader = getObject("RoomItemAssetManager")
  if voidp(t_rLoader) then
    error(this, "Asset loader instance was lost!", #_WaitForItemsToPreloadBeforeEnteringRoom)
    exit
  end if
  if t_rLoader.GetQueueLength() = 0 then
    if connectionExists(getVariable("main.connection.id", "VMK")) then
      if getObjectManager().exists("RoomAssetLoadingDialog") then
        getObject("RoomAssetLoadingDialog").DeleteWindow()
        removeObject("RoomAssetLoadingDialog")
      end if
      if objectp(m_rContext) then
        getConnection(getVariable("main.connection.id", "VMK")).send("start")
      end if
    end if
  else
    if objectp(m_rContext) then
      if not getObjectManager().exists("RoomAssetLoadingDialog") then
        t_rObj = createObject("RoomAssetLoadingDialog", "CLoadingWindow")
        t_rObj.DefineWindow([#headline: getText("room.loading.assets.headline"), #infotext: getText("room.loading.assets.info"), #showbutton: 1, #ButtonText: getText("roomqueue.cancel"), #modal: 1, #client: this.getID(), #soundloop: "VMK-loadingloop-v1"])
      end if
      this.delay(500, #_WaitForItemsToPreloadBeforeEnteringRoom)
    end if
  end if
end
on LoadingWindowEvent this, a_sBtnText
  if getObjectManager().exists("RoomAssetLoadingDialog") then
    getObject("RoomAssetLoadingDialog").DeleteWindow()
    removeObject("RoomAssetLoadingDialog")
  end if
  getObject("RoomItemAssetManager").FlushQueue()
  executeMessage("room_remove")
  executeMessage(#ui_navigator)
end