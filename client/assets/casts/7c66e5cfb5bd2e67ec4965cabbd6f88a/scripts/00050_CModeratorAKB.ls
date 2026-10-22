-- Script
property m_sWindowID
property m_rWnd
property m_arBanTimes
property m_ObjUserToOperate
property m_sName
property m_iBanTime
property m_ar_PermList
property m_mp_modReasons
property m_rComponentsPage

on construct this
  m_sWindowID = "Moderator_AKB"
  m_rWnd = VOID
  m_arBanTimes = [120, 1440, 10080, 43200, 6000000]
  m_ObjUserToOperate = VOID
  m_sName = EMPTY
  m_ar_PermList = VOID
  m_mp_modReasons = value(getText("modreasons"))
  m_rComponentsPage = VOID
  if (the environment).productVersion = "10.2" then
    if (the environment).productBuildVersion = "21" then
      receiveUpdate(this.getID())
    end if
  end if
  return 1
end
on deconstruct this
  m_ar_PermList = VOID
  if (the environment).productVersion = "10.2" then
    if (the environment).productBuildVersion = "21" then
      removeUpdate(this.getID())
    end if
  end if
  return 1
end
on update this
  if keyPressed(BACKSPACE) then
    if (the environment).productVersion = "10.2" then
      if (the environment).productBuildVersion = "21" then
        t_rWindow = getWindow(m_sWindowID)
        if objectp(t_rWindow) then
          t_rElement = t_rWindow.getElement("mods.tousers.input")
          if objectp(t_rElement) then
            if the keyboardFocusSprite = t_rElement.getProperty(#sprite).spriteNum then
              t_sText = t_rElement.getProperty(#sprite).member.text
              delete char -30000 of t_sText
              t_rElement.getProperty(#sprite).member.text = t_sText
            end if
          end if
          t_rElement = t_rWindow.getElement("mods.logmessage.input")
          if objectp(t_rElement) then
            if the keyboardFocusSprite = t_rElement.getProperty(#sprite).spriteNum then
              t_sText = t_rElement.getProperty(#sprite).member.text
              delete char -30000 of t_sText
              t_rElement.getProperty(#sprite).member.text = t_sText
            end if
          end if
        end if
      end if
    end if
  end if
end
on OpenCloseAkbWindow this
  if createWindow(m_sWindowID, "vmk_mods_akb.window") then
    m_rWnd = getWindow(m_sWindowID)
    m_rWnd.center()
    m_rWnd.registerClient(this.getID())
    m_rWnd.registerProcedure(#_EventProcAKB, this.getID(), #mouseDown)
    t_sHdTxt = getText("mods.akb.hd")
    m_rWnd.getElement("mods.window.title").setText(t_sHdTxt)
    this._HandleRadioButtons(2)
    this._CheckPermissions()
    this._SetNameText()
    this._PopulateReasonList()
    m_rWnd.getElement("mods.tousers.input").setFocus(1)
  else
    removeWindow(m_sWindowID)
    createWindow(m_sWindowID, "vmk_mods_akb.window")
    m_rWnd = getWindow(m_sWindowID)
    m_rWnd.center()
    m_rWnd.registerClient(this.getID())
    m_rWnd.registerProcedure(#_EventProcModeratorMessages, this.getID(), #mouseDown)
    t_sHdTxt = getText("mods.akb.hd")
    m_rWnd.getElement("mods.window.title").setText(t_sHdTxt)
    this._HandleRadioButtons(2)
    this._CheckPermissions()
    this._SetNameText()
    this._PopulateReasonList()
    m_rWnd.getElement("mods.tousers.input").setFocus(1)
    return 0
  end if
end
on SetPermissions this, a_ar_PermList
  if listp(a_ar_PermList) then
    m_ar_PermList = a_ar_PermList
  end if
end
on _CheckPermissions this
  if objectp(m_rWnd) then
    if listp(m_ar_PermList) then
      if m_ar_PermList.findPos("alert") > 0 then
        if m_rWnd.elementExists("mods.alert") then
          m_rWnd.getElement("mods.alert").Activate()
        end if
      else
        if m_rWnd.elementExists("mods.alert") then
          m_rWnd.getElement("mods.alert").deactivate()
        end if
      end if
      if m_ar_PermList.findPos("kick") > 0 then
        if m_rWnd.elementExists("mods.kick") then
          m_rWnd.getElement("mods.kick").Activate()
        end if
      else
        if m_rWnd.elementExists("mods.kick") then
          m_rWnd.getElement("mods.kick").deactivate()
        end if
      end if
      if m_ar_PermList.findPos("ban") > 0 then
        if m_rWnd.elementExists("mods.ban") then
          m_rWnd.getElement("mods.ban").Activate()
        end if
      else
        if m_rWnd.elementExists("mods.ban") then
          m_rWnd.getElement("mods.ban").deactivate()
        end if
      end if
      t_ar_ElemList = ["mods.akb.inputhd4", "mods.akb.inputhd5", "mods.bantime1.text", "mods.bantime2.text", "mods.bantime3.text", "mods.bantime4.text", "mods.bantime5.text"]
      repeat with i = 1 to t_ar_ElemList.count
        if m_rWnd.elementExists(t_ar_ElemList[i]) then
          m_rWnd.getElement(t_ar_ElemList[i]).setProperty(#blend, 15)
        end if
      end repeat
    end if
  end if
end
on SelectWholeRoom this
  m_ObjUserToOperate = VOID
  m_sName = EMPTY
end
on _SetNameText this
  if objectp(m_rWnd) then
    if m_rWnd.elementExists("mods.akb.target") then
      if not objectp(m_ObjUserToOperate) and m_sName = EMPTY then
        t_sTxt = getText("mods.room")
        m_rWnd.getElement("mods.akb.target").setText(t_sTxt)
      else
        if m_sName <> EMPTY then
          m_rWnd.getElement("mods.akb.target").setText(m_sName)
        end if
      end if
    end if
  end if
end
on _PopulateReasonList this
  if objectp(m_rWnd) then
    t_rClientElement = m_rWnd.getElement("mods.logmessage.list")
    t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
    t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
    t_rComponentsPage.setColor(rgb("#001F56"))
    repeat with i = 1 to m_mp_modReasons.count
      t_rComponent = t_rComponentsPage.addComponent("component.modreasons.xml")
      t_rComponent.GetLayout(1).setEvent(string(m_mp_modReasons.getPropAt(i)))
      t_rComponent.GetLayout(1).setText(m_mp_modReasons[i])
    end repeat
    m_rComponentsPage = t_rComponentsPage
    t_rImg = m_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
end
on SelectUser this, a_ObjAvatar
  if objectp(a_ObjAvatar) then
    m_sName = a_ObjAvatar.GetParam("NAME")
    m_ObjUserToOperate = a_ObjAvatar
  else
    m_ObjUserToOperate = VOID
  end if
  if objectp(m_rWnd) then
    if m_rWnd.elementExists("mods.akb.target") then
      m_rWnd.getElement("mods.akb.target").setText(m_sName)
    end if
  end if
end
on SetName this, a_sName
  if stringp(a_sName) then
    m_sName = a_sName
    m_ObjUserToOperate = VOID
  else
    if a_sName = EMPTY then
      m_sName = a_sName
      m_ObjUserToOperate = VOID
    end if
  end if
end
on _HandleRadioButtons this, a_iID
  if integerp(a_iID) then
    repeat with i = 2 to 4
      t_Img = member(getMember("button.radiobutton.0")).image
      t_rElem = m_rWnd.getElement("mods.bantime" & i & ".button")
      if objectp(t_rElem) then
        t_rElem.feedImage(t_Img)
        next repeat
      end if
      put "Could not find Radio Button (akb) " && i
    end repeat
    t_img2 = member(getMember("button.radiobutton.1")).image
    t_rElem = m_rWnd.getElement("mods.bantime" & a_iID & ".button")
    if objectp(t_rElem) then
      t_rElem.feedImage(t_img2)
    else
      put "Could not activate Radio Button (akb) " && a_iID
    end if
    m_iBanTime = m_arBanTimes[a_iID]
  end if
end
on avatar_selected this, a_obj
end
on _Remove this
  if windowExists(m_sWindowID) then
    removeWindow(m_sWindowID)
  end if
end
on _Kick this
  t_sMsg = m_rWnd.getElement("mods.tousers.input").getText()
  t_sLog = m_rWnd.getElement("mods.logmessage.input").getText()
  if not objectp(m_rComponentsPage.GetActive()) and t_sLog.length = 0 then
    t_bLogToSave = 0
  else
    if objectp(m_rComponentsPage.GetActive()) then
      t_iLog = value(m_rComponentsPage.GetActive().getEvent())
      t_bLogToSave = 1
    end if
  end if
  if length(t_sMsg) = 0 then
    t_sDialogID = "AKBEnterMessage" & the milliSeconds
    t = createDialogWindow(this.getID(), t_sDialogID, 1, 1)
    t_sTitle = getText("mods.akb.enter.message.dialog.title")
    t_sText = getText("mods.akb.enter.message.dialog.text")
    t_rBtn1 = getText("mods.akb.enter.message.dialog.btnOK")
    t.show()
    t.setText(t_sText, t_sTitle, t_rBtn1)
    exit
  end if
  if m_sName = EMPTY then
    this.CreateConfirmDialog("kick")
  else
    getConnection(getVariable("main.connection.id", "VMK")).send("KickUsers", [#string: m_sName, #integer: t_iLog, #string: t_sMsg, #string: t_sLog, #integer: t_bLogToSave])
    t_sLog = VOID
    this._Remove()
  end if
end
on _AlertQueue this
  this.CreateConfirmDialog("AlertQueue")
end
on _Alert this
  t_sMsg = m_rWnd.getElement("mods.tousers.input").getText()
  t_sLog = m_rWnd.getElement("mods.logmessage.input").getText()
  if not objectp(m_rComponentsPage.GetActive()) and t_sLog.length = 0 then
    t_bLogToSave = 0
  else
    if objectp(m_rComponentsPage.GetActive()) then
      t_iLog = value(m_rComponentsPage.GetActive().getEvent())
      t_bLogToSave = 1
    end if
  end if
  if length(t_sMsg) = 0 then
    t_sDialogID = "AKBEnterMessage" & the milliSeconds
    t = createDialogWindow(this.getID(), t_sDialogID, 1, 1)
    t_sTitle = getText("mods.akb.enter.message.dialog.title")
    t_sText = getText("mods.akb.enter.message.dialog.text")
    t_rBtn1 = getText("mods.akb.enter.message.dialog.btnOK")
    t.show()
    t.setText(t_sText, t_sTitle, t_rBtn1)
    exit
  end if
  if m_sName = EMPTY then
    this.CreateConfirmDialog("alert")
  else
    getConnection(getVariable("main.connection.id", "VMK")).send("SendAlertToUser", [#string: m_sName, #integer: t_iLog, #string: t_sMsg, #string: t_sLog, #integer: t_bLogToSave])
    t_sLog = VOID
    this._Remove()
  end if
end
on _Ban this
  t_sMsg = m_rWnd.getElement("mods.tousers.input").getText()
  t_sLog = m_rWnd.getElement("mods.logmessage.input").getText()
  t_iLog = -1
  if not objectp(m_rComponentsPage.GetActive()) and t_sLog.length = 0 then
    t_bLogToSave = 0
  else
    if objectp(m_rComponentsPage.GetActive()) then
      t_iLog = value(m_rComponentsPage.GetActive().getEvent())
      t_bLogToSave = 1
    end if
  end if
  if m_sName = EMPTY then
    this.CreateConfirmDialog("ban")
  else
    if t_iLog < 0 then
      t = createDialogWindow(this.getID(), "select.ban.reason.dialog", 1, 1)
      t_sTitle = getText("mods.akb.select.banreason.dialog.title", "ERROR")
      t_sText = getText("mods.akb.select.banreason.dialog.text", "You need to select the reason why the player needs to be banned")
      t_rBtn1 = getText("mods.akb.select.banreason.dialog.btnOK", "OK")
      t.show()
      t.setText(t_sText, t_sTitle, t_rBtn1)
    else
      getConnection(getVariable("main.connection.id", "VMK")).send("BanUser", [#string: m_sName, #integer: t_iLog, #string: t_sMsg, #string: t_sLog, #integer: m_iBanTime, #integer: t_bLogToSave])
      t_sLog = VOID
      this._Remove()
    end if
  end if
end
on CreateConfirmDialog me, t_dialogName
  case t_dialogName of
    "ban":
      t_sMsg = getText("mod.confirm.ban.text")
      t_sTitle = getText("mod.confirm.ban.title")
      t = createDialogWindow(me.getID(), "BanRoom", 2, 1)
      t.show()
      t.setText(t_sMsg, t_sTitle, "CANCEL", "OK")
    "kick":
      t_sMsg = getText("mod.confirm.kick.text")
      t_sTitle = getText("mod.confirm.kick.title")
      t = createDialogWindow(me.getID(), "KickRoom", 2, 1)
      t.show()
      t.setText(t_sMsg, t_sTitle, "CANCEL", "OK")
    "alert":
      t_sMsg = getText("mod.confirm.alert.text")
      t_sTitle = getText("mod.confirm.alert.title")
      t = createDialogWindow(me.getID(), "AlerRoom", 2, 1)
      t.show()
      t.setText(t_sMsg, t_sTitle, "CANCEL", "OK")
    "AlertQueue":
      t_sMsg = getText("mod.confirm.alert.queue.text")
      t_sTitle = getText("mod.confirm.alert.queue.title")
      t = createDialogWindow(me.getID(), "AlertQueue", 2, 1)
      t.show()
      t.setText(t_sMsg, t_sTitle, "CANCEL", "OK")

  end case
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent, t_rParameter
  t_sMsg = m_rWnd.getElement("mods.tousers.input").getText()
  t_sLog = m_rWnd.getElement("mods.logmessage.input").getText()
  if not objectp(m_rComponentsPage.GetActive()) and t_sLog.length = 0 then
    t_bLogToSave = 0
  else
    if objectp(m_rComponentsPage.GetActive()) then
      t_iLog = value(m_rComponentsPage.GetActive().getEvent())
      t_bLogToSave = 1
    end if
  end if
  case t_dialogName of
    "AlertQueue":
      if t_dialogEvent = #dialogOK then
        t_sMsg = m_rWnd.getElement("mods.tousers.input").getText()
        getConnection(getVariable("main.connection.id", "VMK")).send("AlertQueue", [#string: t_sMsg])
        me._Remove()
      end if
    "AlerRoom":
      if t_dialogEvent = #dialogOK then
        getConnection(getVariable("main.connection.id", "VMK")).send("SendAlertToRoom", [#integer: t_iLog, #string: t_sMsg, #string: t_sLog, #integer: t_bLogToSave])
        t_sLog = VOID
        me._Remove()
      end if
    "KickRoom":
      if t_dialogEvent = #dialogOK then
        getConnection(getVariable("main.connection.id", "VMK")).send("KickRoom", [#integer: t_iLog, #string: t_sMsg, #string: t_sLog, #integer: t_bLogToSave])
        t_sLog = VOID
        me._Remove()
      end if
    "BanRoom":
      if t_dialogEvent = #dialogOK then
        getConnection(getVariable("main.connection.id", "VMK")).send("BanRoom", [#integer: t_iLog, #string: t_sMsg, #string: t_sLog, #integer: m_iBanTime, #integer: t_bLogToSave])
        t_sLog = VOID
        me._Remove()
      end if
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on _EventProcAKB this, tEvent, tElemID, tParam
  case tElemID of
    "mods.kick":
      this._Kick()
    "mods.alert":
      this._Alert()
    "mods.ban":
      this._Ban()
    "mods.alertqueue":
      this._AlertQueue()
    "close":
      this._Remove()
    "mods.bantime1.button":
      this._HandleRadioButtons(1)
    "mods.bantime2.button":
      this._HandleRadioButtons(2)
    "mods.bantime3.button":
      this._HandleRadioButtons(3)
    "mods.bantime4.button":
      this._HandleRadioButtons(4)
    "mods.bantime5.button":
      this._HandleRadioButtons(5)
    "mods.logmessage.list":
      t_mpEvent = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
      executeMessage("PlayInterfaceSound", "UI-click")
      m_rComponentsPage.EventProc(tParam, t_mpEvent)
      t_rClientElement = m_rWnd.getElement(tElemID)
      t_rImg = m_rComponentsPage.render()
      t_rClientElement.feedImage(t_rImg)

  end case
end