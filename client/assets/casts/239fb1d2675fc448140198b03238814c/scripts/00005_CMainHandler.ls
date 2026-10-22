-- Script
property m_objLoadingWindow
property m_bFurniMapsLoaded

on construct this
  m_objLoadingWindow = VOID
  registerMessage(#dictionary_ready, this.getID(), #OpenConnection)
  registerMessage(#furnimap_ready, this.getID(), #UpdateFurnimapState)
  m_bFurniMapsLoaded = 0
  this.regMsgList(1)
  return 1
end
on deconstruct this
  t_sID = getVariable("main.connection.id", "VMK")
  this.regMsgList(0)
  unregisterMessage(#dictionary_ready, this.getID())
  unregisterMessage(#furnimap_ready, this.getID())
  removeConnection(t_sID)
  return 1
end
on UpdateFurnimapState this
  m_bFurniMapsLoaded = 1
end
on OpenConnection this
  if getObject(#session).get("ExternalTexts") <> 1 then
    if not DialogWindowExists("DictionaryError") then
      t = createDialogWindow(this.getID(), "DictionaryError", 1, 1)
      t.setText("Cannot start VMK. The game was unable to download all required resources. Please first check your Internet connection and Firewall settings and then retry logging into the game. If the problem persists, please send feedback using the feedback forms in VMK.com.", "ERROR", "OK")
      t.show()
      return 0
    end if
  end if
  t_sIP = getVariable("main.connection.ip")
  t_sID = getVariable("main.connection.id", "VMK")
  t_iPt = getIntVariable("main.connection.pt")
  createConnection(t_sID, t_sIP, t_iPt)
end
on connectionReady this, a_rMsg
  t_bEncryptionEnabled = 0
  if getVariable("connection.encryption.enabled") <> 0 then
    t_bEncryptionEnabled = getVariableValue("connection.encryption.enabled")
  end if
  if t_bEncryptionEnabled then
    p = BigInt_str2bigInt("AEFBD08604A3F4BDE60CD6BD9", 16)
    g = BigInt_str2bigInt("29A05BBCE4064976EF7C30AA3", 16)
    t_sServerPublicKey = a_rMsg.connection.GetStrFrom()
    serverPublic = BigInt_str2bigInt(t_sServerPublicKey, 16)
    privateKey = BigInt_randTruePrime(128)
    publicKey = BigInt_powMod(g, privateKey, p)
    t_sPublicKey = BigInt_bigInt2str(publicKey, 16)
    sharedKey = BigInt_powMod(serverPublic, privateKey, p)
    t_sSharedKey = BigInt_bigInt2str(sharedKey, 16)
    if t_sSharedKey.length mod 2 <> 0 then
      t_sSharedKey = "0" & t_sSharedKey
    end if
    a_rMsg.connection.send(11, [#str: t_sPublicKey])
    tSharedKeyString = EMPTY
    tStrSrv = getStringServices()
    repeat with a = 1 to length(t_sSharedKey)
      t = tStrSrv.convertHexToInt(t_sSharedKey.char[a..a + 1])
      tSharedKeyString = tSharedKeyString & numToChar(t)
      a = a + 1
    end repeat
    debug_array = []
    repeat with a = 1 to tSharedKeyString.length
      debug_array.append(charToNum(tSharedKeyString.char[a]))
    end repeat
    t_rDecoder = createObject("ConnectionEncryption", "CDecoderRC4")
    t_rDecoder.Setkey(tSharedKeyString, #old)
    a_rMsg.connection.setDecoder(t_rDecoder)
    a_rMsg.connection.setEncryption(1)
  else
    t_sPublicKey = a_rMsg.connection.GetStrFrom()
    a_rMsg.connection.send(11, [#str: "00"])
  end if
end
on SendEcho this, a_mp_kType_vData
  if a_mp_kType_vData.ilk = #propList then
    t_sHeader = EMPTY
    t_iCount = a_mp_kType_vData.count
    repeat with i = 1 to t_iCount
      case a_mp_kType_vData.getPropAt(i) of
        #bool, #boolean:
          put "0" after t_sHeader
        #int, #integer:
          put "1" after t_sHeader
        #str, #string:
          put "2" after t_sHeader

      end case
    end repeat
    t_mp_kType_vData = [#str: t_sHeader]
    repeat with i = 1 to a_mp_kType_vData.count
      t_mp_kType_vData.addProp(a_mp_kType_vData.getPropAt(i), a_mp_kType_vData[i])
    end repeat
    getConnection(getVariable("main.connection.id", "VMK")).send("echo", t_mp_kType_vData)
  end if
end
on HandleEcho this, a_vMsg
  t_sHeader = a_vMsg.connection.GetStrFrom()
  repeat with i = 1 to t_sHeader.length
    case char i of t_sHeader of
      "0":
        put a_vMsg.connection.GetBoolFrom()
      "1":
        put a_vMsg.connection.GetIntFrom()
      "2":
        put a_vMsg.connection.GetStrFrom()

    end case
  end repeat
end
on SendLogin this, a_sName, a_sPassword
  t_sMachineId = getMachineID()
  getConnection(getVariable("main.connection.id")).send("login", [#str: a_sName, #str: a_sPassword, #str: t_sMachineId])
end
on HandleLogin this, a_rMsg
  executeMessage(#login_hide)
  executeMessage(#ui_show)
  executeMessage("init_messenger")
  getConnection(getVariable("main.connection.id", "VMK")).send(20)
end
on _ConnectionLost this
  if not windowExists("LoginFail") and not DialogWindowExists("AdminMessage") then
    t = createDialogWindow(this.getID(), "ConnectionLost", 1, 1)
    t.show()
    t_sText = getText("error.connection.lost")
    t.setText(t_sText, "Disconnected", "OK")
  end if
  if the runMode <> "Author" then
    getThread("room").getComponent()._RemoveRoom()
  end if
end
on _GenericError this, a_rMsg
  tCode = a_rMsg.connection.GetIntFrom()
  executeMessage("GenericError", tCode)
  error(this, "Server sent generic error! Errorcode:" && tCode, #_GenericError)
  t_ar_sErrorClasses = value(getVariable("errorclasses"))
  t_sHeadline = "Error"
  tModal = 0
  if ilk(t_ar_sErrorClasses, #linearList) then
    tLayout = "Dialog"
    repeat with sClass in t_ar_sErrorClasses
      t_ar_iErrorList = value(getVariable("errorprops." & sClass & ".list"))
      if t_ar_iErrorList.getPos(tCode) then
        t_sHeadline = getText(getVariable("errorprops." & sClass & ".headline"))
        tModal = value(getVariable("errorprops." & sClass & ".modal"))
        tLayout = getVariable("errorprops." & sClass & ".layout")
        exit repeat
      end if
      if getObject(#session).exists("minigame") then
        if getObject(#session).get("minigame") = sClass then
          t_sHeadline = getText(getVariable("errorprops." & sClass & ".headline"))
          tModal = value(getVariable("errorprops." & sClass & ".modal"))
          tLayout = getVariable("errorprops." & sClass & ".layout")
          exit repeat
        end if
      end if
    end repeat
    if tLayout = "Dialog" or tLayout = "dialog" then
      t = createDialogWindow(this.getID(), "ErrorDialog", 1, tModal)
      t.show()
      t_sTxt = getText("error." & tCode)
      t.setText(t_sTxt, t_sHeadline, "OK")
    else
      if windowExists("ErrorDialogSpecial") then
        removeWindow("ErrorDialogSpecial")
      end if
      if tModal then
        tProps = #modal
      else
        tProps = VOID
      end if
      if not createWindow("ErrorDialogSpecial", VOID, 0, 0, tProps) then
        return error(this, "Failed to create special error Dialog with id ErrorDialogSpecial!!", #_GenericError)
      end if
      tWndObj = getWindow("ErrorDialogSpecial")
      if not tWndObj.merge(tLayout) then
        return error(this, "Failed to create special error Dialog from layout!!" && tLayout, #_GenericError)
      else
        tWndObj.registerClient(this.getID())
        tWndObj.registerProcedure(#eventProcSpecialError, this.getID(), #mouseUp)
        tWndObj.getElement("content.text").setText(getText("error." & tCode))
        tWndObj.getElement("window.title").setText(t_sHeadline)
        tWndObj.center()
      end if
    end if
  else
    t = createDialogWindow(this.getID(), "ErrorDialog", 1, tModal)
    t.show()
    t_sTxt = getText("error." & tCode)
    t.setText(t_sTxt, t_sHeadline, "OK")
  end if
end
on _AdminMessage this, a_arMsg
  t_sMsg = a_arMsg.connection.GetStrFrom()
  t_iTarget = a_arMsg.connection.GetIntFrom()
  t = createDialogWindow(this.getID(), "AdminMessage", 1, 1)
  t.show()
  case t_iTarget of
    0:
      t_sTxt = getText("admin.message.user.hd")
    1:
      t_sTxt = getText("admin.message.room.hd")
    2:
      t_sTxt = getText("admin.message.queue.hd")
    3:
      t_sTxt = getText("admin.message.global.hd")

  end case
  t.setText(t_sMsg, t_sTxt, "OK")
end
on _Hello this, a_rMsg
  t_bEncryptionEnabled = 0
  if getVariable("connection.encryption.enabled") <> 0 then
    t_bEncryptionEnabled = getVariableValue("connection.encryption.enabled")
  end if
  if t_bEncryptionEnabled then
    t_iNonceByteCount = a_rMsg.connection.GetIntFrom()
    if not voidp(t_iNonceByteCount) then
      tConnection = getConnection(getVariable("main.connection.id", "VMK"))
      tConnection.sendNonce(t_iNonceByteCount)
    end if
  else
    t_iNonceByteCount = a_rMsg.connection.GetIntFrom()
    if not voidp(t_iNonceByteCount) then
      if t_iNonceByteCount > 0 then
      end if
    end if
  end if
  if not timeoutExists("login_starter") then
    createTimeout("login_starter", 500, #DoTheLogin, this.getID(), VOID, 0)
  end if
end
on DoTheLogin this
  if m_bFurniMapsLoaded then
    if timeoutExists("login_starter") then
      removeTimeout("login_starter")
    end if
    if the runMode contains "Plugin" then
      if variableExists("username") and variableExists("password") then
        t_mp_Msg = [#str: getVariable("username"), #str: getVariable("password"), #str: getMachineID()]
        getConnection(getVariable("main.connection.id", "VMK")).send("login", t_mp_Msg)
        this.ShowLoginLoadingScreen()
      else
        if variableExists("at") then
          getConnection(getVariable("main.connection.id", "VMK")).send(720, [#str: getVariable("at"), #str: getMachineID()])
          this.ShowLoginLoadingScreen()
        end if
      end if
    else
      t_rLogin = getObject("login")
      if t_rLogin <> 0 then
        t_rLogin.enableLogin()
      end if
    end if
  end if
end
on ShowLoginLoadingScreen this
  t_iTimeOut = getVariable("login.timeout", 180000)
  createTimeout("login_timer", t_iTimeOut, #LoginTimeout, this.getID(), VOID, 1)
  t_sHdTxt = getText("roomqueue.preloader.hd")
  m_objLoadingWindow = createObject(getUniqueID(), "CLoadingWindow")
  t_mp_data = [#headline: t_sHdTxt, #showbutton: 0, #client: this.getID(), #modal: 1]
  if objectp(m_objLoadingWindow) then
    m_objLoadingWindow.DefineWindow(t_mp_data)
  end if
end
on LoadingWindowEvent this
  if textExists("game.exit.url") then
    t_sExitURL = getText("game.exit.url")
  else
    t_sExitURL = "https://secure.disney.go.com/vmk/en_US/index?name=LoginPage"
  end if
  gotoNetPage(t_sExitURL, "_self")
  if objectp(m_objLoadingWindow) then
    removeObject(m_objLoadingWindow.getID())
  end if
end
on LoginTimeout this
  if timeoutExists("login_timer") then
    removeTimeout("login_timer")
  end if
  if objectp(m_objLoadingWindow) then
    t_sInfoTxt = getText("roomqueue.preloadfailed.info")
    t_sButtonTxt = getText("roomqueue.preloader.ok")
    t_mp_data = [#showbutton: 1, #ButtonText: t_sButtonTxt, #infotext: t_sInfoTxt]
    m_objLoadingWindow.UpdateWindowdata(t_mp_data)
    m_objLoadingWindow.stopAnimation()
  end if
  return 1
end
on _ConnectionDropped this, a_rMsg
  tCode = a_rMsg.connection.GetIntFrom()
  t = createDialogWindow(this.getID(), "ConnectionLost", 1, 0)
  t.show()
  t_sTxt = getText("connection.dropped." & tCode)
  t.setText(t_sTxt, "Error", "OK")
end
on _InactivityAlert this, a_rMsg
  t_iTime = integer(getText("notice.inactivity.countdown"))
  t = createDialogWindow(this.getID(), "InactivityAlert", 1, 1)
  t.show()
  if windowExists("InactivityAlert_window") then
    getWindow("InactivityAlert_window").moveZ(1000)
  end if
  this._InactivityUpdater([t, t_iTime])
end
on _InactivityUpdater this, t_ar_param
  t = t_ar_param[1]
  t_iTime = t_ar_param[2]
  if voidp(t) then
    return 0
  end if
  if t_iTime < 0 then
    t_iTime = 0
  end if
  t_sTxt = getText("notice.inactivity")
  t_sHd = getText("notice.hd")
  t_sBtn = getText("notice.btn.ok")
  t_rTime = this.int2time(t_iTime)
  if t_rTime.s < 10 then
    t_rTime.s = "0" & t_rTime.s
  end if
  t_sTxt = t_sTxt & RETURN & t_rTime.m & ":" & t_rTime.s
  t.setText(t_sTxt, t_sHd, t_sBtn)
  createTimeout("InactivityAlertTimer", 1000, #_InactivityUpdater, this.getID(), [t, t_iTime - 1], 1)
end
on RemoveLoginWindow this, tMsg
  if timeoutExists("login_timer") then
    removeTimeout("login_timer")
  end if
  if objectp(m_objLoadingWindow) then
    removeObject(m_objLoadingWindow.getID())
  end if
  if the runMode = "Author" or the runMode = "Projector" then
    if objectExists("AuthorLoginAnim") then
      removeObject("AuthorLoginAnim")
    end if
  end if
end
on dialogWindowEvent this, a_sDialogName, a_sDialogEvent
  t_rWnd = getWindow(a_sDialogName)
  case a_sDialogName of
    "InactivityAlert":
      removeTimeout("InactivityAlertTimer")
      t_rWnd.hide()
      getConnection(getVariable("main.connection.id", "VMK")).send("activeresponse")
    "AdminMessage":
      t_rWnd.hide()
    "DictionaryError", "ConnectionLost":
      if textExists("game.exit.url") then
        t_sExitURL = getText("game.exit.url")
      else
        t_sExitURL = "https://secure.disney.go.com/vmk/en_US/index?name=LoginPage"
      end if
      gotoNetPage(t_sExitURL, "_self")

  end case
end
on eventProcSpecialError this, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "close", "btn_ok":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow("ErrorDialogSpecial")
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        executeMessage(#open_help_page, "help.dialog.windows")
        removeWindow("ErrorDialogSpecial")

    end case
  end if
end
on regMsgList this, tBool
  tMsgs = [:]
  tMsgs.setaProp(-1, #_ConnectionLost)
  tMsgs.setaProp(2000, #_GenericError)
  tMsgs.setaProp(2001, #connectionReady)
  tMsgs.setaProp(2011, #_ConnectionDropped)
  tMsgs.setaProp(2012, #_InactivityAlert)
  tMsgs.setaProp(2002, #_Hello)
  tMsgs.setaProp(2018, #RemoveLoginWindow)
  tMsgs.setaProp(2240, #_AdminMessage)
  tCmds = [:]
  tCmds.setaProp("login", 10)
  tCmds.setaProp("activeresponse", 12)
  tCmds.setaProp("init", 540)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
end
on int2time me, a_iInteger
  return [#m: a_iInteger / 60, #s: a_iInteger mod 60]
end