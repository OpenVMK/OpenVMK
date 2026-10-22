-- Script
property m_rWindow
property m_bRegistrationGoingOn
property m_bContinueRegistrationAfterAcceptedName
property m_bHatListReady
property m_bAvailableSetsReady
property m_arPArsedAvailbleSets
property m_iLandingRoom
property m_bNameRejected

on construct this
  m_rWindow = VOID
  m_bHatListReady = 0
  m_bAvailableSetsReady = 0
  m_bRegistrationGoingOn = 0
  m_bNameRejected = 0
  m_iLandingRoom = -1
  m_bContinueRegistrationAfterAcceptedName = 0
  this.regMsgList(1)
  return 1
end
on deconstruct this
  m_rWindow = VOID
  m_bRegistrationGoingOn = 0
  m_bNameRejected = 0
  m_bContinueRegistrationAfterAcceptedName = 0
  return 1
end
on getAvailableSets this, tMsg
  if not m_bAvailableSetsReady and not voidp(tMsg) then
    t_ar_AllAvailableSets = []
    t_mp_SetList = [:]
    t_arMaleSets = []
    t_iMaleSetCount = tMsg.connection.GetIntFrom()
    repeat with i = 1 to t_iMaleSetCount
      t_sSetId = string(tMsg.connection.GetIntFrom())
      t_arMaleSets.add(t_sSetId)
      t_ar_AllAvailableSets.add(t_sSetId)
    end repeat
    t_arMaleSets.sort()
    t_mp_SetList.addProp("M", t_arMaleSets)
    t_arFemaleSets = []
    t_iFemaleSetCount = tMsg.connection.GetIntFrom()
    repeat with e = 1 to t_iFemaleSetCount
      t_sSetId = string(tMsg.connection.GetIntFrom())
      t_arFemaleSets.add(t_sSetId)
      t_ar_AllAvailableSets.add(t_sSetId)
    end repeat
    t_arFemaleSets.sort()
    t_mp_SetList.addProp("F", t_arFemaleSets)
    t_arDefaultMaleSet = []
    repeat with f = 1 to 12
      t_arDefaultMaleSet.add(tMsg.connection.GetIntFrom())
    end repeat
    t_mp_SetList.addProp("Default_M", t_arDefaultMaleSet)
    t_arDefaultFemaleSet = []
    repeat with g = 1 to 12
      t_arDefaultFemaleSet.add(tMsg.connection.GetIntFrom())
    end repeat
    t_mp_SetList.addProp("Default_F", t_arDefaultFemaleSet)
    m_arPArsedAvailbleSets = t_mp_SetList
    m_bAvailableSetsReady = 1
  end if
  if listp(t_ar_AllAvailableSets) then
    if not objectExists("RegistrationClothesLoader") then
      t_Obj = createObject("RegistrationClothesLoader", "CRegClothesLoader")
      t_Obj.DefineAvailableSets(t_ar_AllAvailableSets)
    end if
  end if
end
on AllClothesLoaded this
  if objectExists("RegistrationClothesLoader") then
    removeObject("RegistrationClothesLoader")
  end if
  if m_bHatListReady and m_bAvailableSetsReady then
    this.interface.AllClothesLoaded()
    return this.getComponent()._UpdateRegData(m_arPArsedAvailbleSets, "AvailableSets")
  end if
end
on changeFigure this, tMsg
  t_ar_FigData = []
  t_iID = tMsg.connection.GetIntFrom()
  repeat with i = 1 to 10
    t_iData = tMsg.connection.GetIntFrom()
    t_ar_FigData.add(t_iData)
  end repeat
  return this.getComponent()._UpdateRegData(t_ar_FigData, "ChangeAvatar")
end
on getAvatarData this, tMsg
  t_sName = tMsg.connection.GetStrFrom()
  t_iSex = tMsg.connection.GetIntFrom()
  t_sSlogan = tMsg.connection.GetStrFrom()
  t_ar_FigData = []
  repeat with i = 1 to 10
    t_iData = tMsg.connection.GetIntFrom()
    t_ar_FigData.add(t_iData)
  end repeat
  t_ar_FigureData = [t_sName, t_iSex, t_sSlogan]
  return this.getComponent()._UpdateRegData(t_ar_FigData, "AvatarData")
  return 1
end
on SloganChanged this, tMsg
  t_sSlogan = tMsg.connection.GetStrFrom()
end
on AvatarCreated this
  if m_bRegistrationGoingOn then
    return this.getComponent()._UpdateRegData(VOID, "AvatarCreated")
  else
    if m_bContinueRegistrationAfterAcceptedName then
      if objectExists("NameRejection") then
        removeObject("NameRejection")
      end if
      executeMessage("init_messenger")
      this.interface._RefreshRegList(VOID, "RegistrationContinued")
    else
      if m_bNameRejected then
        getConnection("VMK").send("GetName")
      end if
      if windowExists("NameRejected") then
        removeWindow("NameRejected")
      end if
      executeMessage("init_messenger")
      executeMessage(#login_hide)
    end if
  end if
end
on AvatarNotCreated this, tMsg
  t_iCount = tMsg.connection.GetIntFrom()
  t_sNameSuggestions = getText("reg.username.taken.hd") & RETURN & RETURN
  t_sNameList = EMPTY
  repeat with i = 1 to t_iCount
    t_sNameList = t_sNameList && tMsg.connection.GetStrFrom()
  end repeat
  t_sNameSuggestions = t_sNameSuggestions & t_sNameList
  t = createDialogWindow(this.getID(), "NameSuggestions", 1, 1)
  t.show()
  t_sMsg = t_sNameSuggestions
  t.setText(t_sMsg, "Name Suggestion", "OK")
end
on NavigatorHandshaked this
  executeMessage(#MinigameState, #idle)
  executeMessage(#ui_show)
  if not m_bRegistrationGoingOn or m_iLandingRoom = -1 or m_bNameRejected then
    executeMessage(#ui_navigator)
    executeMessage("SetButtonStates", [#all: 0])
    executeMessage("SetButtonStates", [#Messenger: 1, #Help: 1, #exit: 1])
  end if
end
on NameCreated this
end
on HandleError this, tMsg
  put "ERROR" && tMsg
end
on HandleLogin this, tMsg
  if timeoutExists("login_timer") then
    removeTimeout("login_timer")
  end if
  if windowExists("LoginInProgress") then
    t_rAnimationManager = getObject("AnimationManager")
    if objectp(t_rAnimationManager) then
      t_rAnimationManager.ClearAll()
    end if
    removeWindow("LoginInProgress")
  end if
  t_iState = tMsg.connection.GetIntFrom()
  case t_iState of
    0:
      getConnection("VMK").send("GetName")
      executeMessage("init_messenger")
    1:
      m_bRegistrationGoingOn = 1
      this.interface.CreateAvatar()
    99:
      t_sName = tMsg.connection.GetStrFrom()
      getObject(#session).set("name", t_sName)
      this.interface._RefreshRegList(VOID, "RegistrationContinued")
      executeMessage(#login_hide)
    100, 101:
      m_bNameRejected = 1
      t_sName = tMsg.connection.GetStrFrom()
      this.interface.NameRejected(t_sName)
      getObject(#session).set("name", t_sName)
      executeMessage(#login_hide)
    1101:
      this.interface.AlertNameResubmit()
      executeMessage(#login_hide)
    102:
      m_bContinueRegistrationAfterAcceptedName = 1
      t_sName = tMsg.connection.GetStrFrom()
      this.interface.NameRejected(t_sName, 1)
      executeMessage(#login_hide)
    103:
      m_bRegistrationGoingOn = 1
      this.interface._RefreshRegList(VOID, "NoNameNoRoom")
      executeMessage(#login_hide)
    104:
      t_sName = tMsg.connection.GetStrFrom()
      getObject(#session).set("name", t_sName)
      m_bRegistrationGoingOn = 1
      this.interface._RefreshRegList(VOID, "NoEULA")
      getConnection("VMK").send("GetName")
      executeMessage(#login_hide)
    105:
      m_bRegistrationGoingOn = 1
      this.interface.CreateAvatar()
      t_wnd = createDialogWindow(this.getID(), "AvatarDeleted", 1, 1)
      t_wnd.show()
      t_sMsg = getText("reg.avatar.deleted")
      t_wnd.setText(t_sMsg, getText("reg.avatar.deleted.hd"), "OK")

  end case
end
on showErrorDialog this, a_iID, a_sExtraMsg
  t_sTxt = string(a_iID)
  case a_iID of
    -1:
      t_sTxt = getText("Login.undefined.error")
    2, 11:
      t_sTxt = getText("Login.wrong.password")
    3:
      t_sTxt = getText("Login.avatar.banned")
    4, 5:
      t_sTxt = getText("Login.server.error")
    6:
      t_sTxt = getText("Login.no.permission")
    7:
      t_sTxt = getText("Login.machine.banned")
    8:
      t_sTxt = getText("Login.ip.banned")
    9:
      t_sTxt = getText("Login.site.closed")
    10:
      t_sTxt = getText("Login.account.exists")
    12:
      t_sTxt = getText("Login.vmk.full")

  end case
  if createWindow("LoginFail", "vmk_mods_window.window") then
    m_rWindow = getWindow("LoginFail")
    m_rWindow.registerClient(this.getID())
    m_rWindow.registerProcedure(#_EventProcLoginFailed, this.getID(), #mouseDown)
    m_rWindow.center()
    t_sTxt2 = getText("Login.error.hd")
    m_rWindow.getElement("mods.window.title").setText(t_sTxt2)
  end if
  m_rWindow.merge("vmk_mods_message.window")
  m_rWindow.getElement("mods.message.text").setText(t_sTxt & RETURN & a_sExtraMsg)
  return 1
end
on SaveSessionId this, tMsg
  t_iParam = tMsg.connection.GetIntFrom()
  t_sSessionID = tMsg.connection.GetStrFrom()
  if objectExists(#session) then
    getObject(#session).set("sessionID", t_sSessionID)
  end if
  t_sLoginFailure = tMsg.connection.GetStrFrom()
  case t_iParam of
    -1, 2, 11, 3, 4, 5, 6, 7, 8, 9, 10, 12:
      this.showErrorDialog(t_iParam, t_sLoginFailure)

  end case
end
on LoginTimeout this
  removeTimeout("login_timer")
  if createWindow("LoginFail", "vmk_mods_window.window") then
    m_rWindow = getWindow("LoginFail")
    m_rWindow.registerClient(this.getID())
    m_rWindow.registerProcedure(#_EventProcLoginFailed, this.getID(), #mouseDown)
    m_rWindow.center()
    t_sTxt2 = getText("Login.error.hd")
    m_rWindow.getElement("mods.window.title").setText(t_sTxt2)
  end if
  t_sTxt = getText("Login.server.error")
  m_rWindow.merge("vmk_mods_message.window")
  m_rWindow.getElement("mods.message.text").setText(t_sTxt)
  return 1
end
on SetName this, tMsg
  t_sName = tMsg.connection.GetStrFrom()
  getObject(#session).set("name", t_sName)
  t_ar_Permissions = []
  t_iDatacount = tMsg.connection.GetIntFrom()
  if t_iDatacount > 0 then
    repeat with i = 1 to t_iDatacount
      t_ar_Permissions.add(tMsg.connection.GetIntFrom())
    end repeat
    getObject(#session).set("permissions", t_ar_Permissions)
  end if
  if m_bRegistrationGoingOn then
    executeMessage("init_messenger")
  end if
  executeMessage(#login_hide)
  if not m_bRegistrationGoingOn then
    getConnection("VMK").send("NavigatorHandshake")
    executeMessage("show_mod_window")
  end if
end
on NameRejected this, tMsg
  t_iReason = tMsg.connection.GetIntFrom()
  t_sInfo = VOID
  if t_iReason > 0 and t_iReason < 5 then
    t_sInfo = tMsg.connection.GetStrFrom()
  end if
  this.interface.AlertNameRejection(t_iReason, t_sInfo)
end
on HairListForHats this, tMsg
  t_iLength = tMsg.connection.GetIntFrom()
  t_ar_HatList = []
  repeat with i = 1 to t_iLength
    t_ar_HatList.add(tMsg.connection.GetIntFrom())
  end repeat
  this.getComponent().SetHatList(t_ar_HatList)
  m_bHatListReady = 1
  this.getAvailableSets()
  return 1
end
on AvailableGuestRooms this, tMsg
  t_iLength = tMsg.connection.GetIntFrom()
  t_ar_RoomList = []
  repeat with i = 1 to t_iLength
    t_ar_RoomList.add(tMsg.connection.GetIntFrom())
  end repeat
  return this.getComponent()._UpdateRegData(t_ar_RoomList, "GuestRoomList")
end
on LandingRoom this, tMsg
  m_iLandingRoom = tMsg.connection.GetIntFrom()
  executeMessage(#LandingOnRoom)
  return this.getComponent()._UpdateRegData(m_iLandingRoom, "LandingRoom")
end
on InstanceInfo this, tMsg
  if m_bRegistrationGoingOn then
    m_bRegistrationGoingOn = 0
    this.regMsgList(0)
    t_iRoomId = tMsg.connection.GetIntFrom()
    return this.getComponent()._UpdateRegData(t_iRoomId, "LandingRoomRealID")
  end if
end
on GeneratedNames this, tMsg
  t_iNameCount = tMsg.connection.GetIntFrom()
  t_ar_nameList = []
  repeat with i = 1 to 5
    t_ar_nameList.add(tMsg.connection.GetStrFrom())
  end repeat
  return this.getComponent()._UpdateRegData(t_ar_nameList, "GeneratedNames")
end
on regMsgList this, tBool
  tMsgs = [:]
  tMsgs.setaProp(2010, #SaveSessionId)
  tMsgs.setaProp(2018, #HandleLogin)
  tMsgs.setaProp(2023, #InstanceInfo)
  tMsgs.setaProp(2034, #NavigatorHandshaked)
  tMsgs.setaProp(2502, #getAvailableSets)
  tMsgs.setaProp(2507, #AvatarCreated)
  tMsgs.setaProp(2508, #AvatarNotCreated)
  tMsgs.setaProp(2509, #AvailableGuestRooms)
  tMsgs.setaProp(2510, #SetName)
  tMsgs.setaProp(2511, #NameRejected)
  tMsgs.setaProp(2512, #HairListForHats)
  tMsgs.setaProp(2514, #LandingRoom)
  tMsgs.setaProp(2515, #GeneratedNames)
  tMsgs.setaProp(4501, #HandleError)
  tMsgs.setaProp(4502, #HandleError)
  tMsgs.setaProp(4503, #HandleError)
  tCmds = [:]
  tCmds.setaProp("NavigatorHandshake", 20)
  tCmds.setaProp("InstanceInfoByTag", 36)
  tCmds.setaProp("LoginRequest", 720)
  tCmds.setaProp("GetNewAvatarSets", 502)
  tCmds.setaProp("CreateAvatar", 507)
  tCmds.setaProp("AcceptEULA", 508)
  tCmds.setaProp("GetName", 510)
  tCmds.setaProp("SendNewName", 511)
  tCmds.setaProp("GenarateNames", 512)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
end
on dialogWindowEvent this, a_sDialogName, a_sDialogEvent
  case a_sDialogName of
    "PasswordError":
    "LoginError":
      if textExists("game.exit.url") then
        t_sURL = getText(" game.exit.url")
      else
        t_sURL = getVariable("client.reload.url")
      end if
      if stringp(t_sURL) then
        gotoNetPage(t_sURL, "_self")
      end if

  end case
end
on _EventProcLoginFailed this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "mods.ok":
      if textExists("game.exit.url") then
        t_sExitURL = getText("game.exit.url")
        gotoNetPage(t_sExitURL, "_self")
      end if
    "vmk_mods_banned":
      if textExists("game.exit.url") then
        t_sExitURL = getText("game.exit.url")
        gotoNetPage(t_sExitURL, "_self")
      end if

  end case
end