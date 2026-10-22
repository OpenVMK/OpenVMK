-- Script
property m_rSelected
property m_rControls
property m_rPinGrid
property m_iTradeState
property m_ar_rPinData
property m_iFriendRequestState

on construct this
  m_rSelected = VOID
  m_rControls = VOID
  m_iTradeState = -1
  m_iFriendRequestState = -1
  m_ar_rPinData = VOID
  registerMessage("ask_friendship", this.getID(), #AskFriendship)
  registerMessage("RemoveAvatar", this.getID(), #_RemoveAvatarCbk)
  registerMessage("close_profile", this.getID(), #CloseProfile)
  registerMessage("CreateAvatar", this.getID(), #UpdateAvatarProfile)
  m_rPinGrid = createObject(getUniqueID(), "CGenericThumbnailGrid")
  return 1
end
on deconstruct this
  unregisterMessage("ask_friendship", this.getID())
  unregisterMessage("RemoveAvatar", this.getID())
  unregisterMessage("CreateAvatar", this.getID())
  m_rSelected = VOID
  if objectp(m_rControls) then
    removeWindow(m_rControls.getID())
    m_rControls = VOID
  end if
  removeObject(m_rPinGrid.getID())
  m_rPinGrid = VOID
  m_ar_rPinData = VOID
  return 1
end
on setButtonState this, t_sElemName, t_bState
  if objectp(m_rControls) then
    tWndObj = getWindow(m_rControls.getID())
  end if
  if tWndObj <> 0 then
    t_rElem = tWndObj.getElement(t_sElemName)
    if t_rElem <> 0 then
      case t_bState of
        1:
          t_rElem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_rElem.Activate()
        0:
          t_rElem.setProperty(#cursor, #arrow)
          t_rElem.deactivate()

      end case
    end if
  end if
end
on CloseProfile me
  if objectp(m_rControls) then
    removeWindow(m_rControls.getID())
    m_rControls = VOID
  end if
end
on select this, a_rSelected
  if not (a_rSelected.GetParam("NAME") = getObject(#session).get("name")) then
    executeMessage("ui_avatarprofile")
  end if
  if a_rSelected.GetParam("NAME") = getObject(#session).get("name") then
  end if
  m_rSelected = a_rSelected
  t_sID = getUniqueID()
  if voidp(m_rControls) then
    if createWindow(t_sID, "vmk_avatarinfo.window") then
      m_rControls = getWindow(t_sID)
      m_rControls.moveTo(571, 259)
      m_rControls.registerClient(this.getID())
      m_rControls.registerProcedure(#_EventProc, this.getID(), #mouseUp)
    else
      return error(this, "Failed to show avatar profile!", #select)
    end if
  end if
  m_rControls.getElement("avatarinfo.name").setText(a_rSelected.GetParam("NAME"))
  m_rControls.getElement("avatarinfo.userslogan").setText(a_rSelected.GetParam("DESC"))
  m_rControls.getElement("avatarinfo.userspin").setText(EMPTY)
  m_iTradeState = integer(a_rSelected.GetParam("TRADE"))
  m_iFriendRequestState = integer(a_rSelected.GetParam("FRIEND"))
  if a_rSelected.GetParam("NAME") = getObject(#session).get("name") then
    this.setButtonState("avatarinfo.ignore.button", 0)
    this.setButtonState("avatarinfo.askfriendship.button", 0)
    this.setButtonState("avatarinfo.trade.button", 0)
    this.setButtonState("avatarinfo.kick.button", 0)
    this.setButtonState("avatarinfo.report.button", 0)
  else
    t_sName = a_rSelected.GetParam("NAME")
    tbNotFriend = not getThread("Messenger").getComponent().isFriend(t_sName)
    t_bAskFriendButton = tbNotFriend and m_iFriendRequestState = 0
    t_bIsTrading = getObject(#session).get("IsTrading")
    t_bTradeState = getObject(#session).get("traderequests")
    this.setButtonState("avatarinfo.ignore.button", 1)
    this.setButtonState("avatarinfo.trade.button", 0)
    this.setButtonState("avatarinfo.askfriendship.button", 0)
    this.setButtonState("avatarinfo.kick.button", getObject(#session).get("ControlRoom"))
    this.setButtonState("avatarinfo.report.button", 1)
    if m_iTradeState = 0 and not t_bIsTrading and t_bTradeState then
      this.setButtonState("avatarinfo.trade.button", 1)
    end if
    this.setButtonState("avatarinfo.askfriendship.button", t_bAskFriendButton)
  end if
  t_rFill = image(36, 36, 32)
  t_rFill.fill(t_rFill.rect, rgb(39, 86, 146))
  m_ar_rPinData = []
  t_mp_iType_rImage = [:]
  i = 1
  repeat while 1
    t_iType = integer(m_rSelected.GetParam("pin.type." & i))
    t_iLevel = integer(m_rSelected.GetParam("pin.level." & i))
    if VOID <> t_iType then
      m_ar_rPinData.add([t_iType, t_iLevel])
      if t_iLevel <> 0 then
        t_mp_iType_rImage.addProp(t_iType, [#level: t_iLevel, #Output: VOID])
      else
        t_mp_iType_rImage.addProp(t_iType, VOID)
      end if
    end if
    if i > 15 then
      exit repeat
    end if
    i = i + 1
  end repeat
  executeMessage("GetPinThumbnail", t_mp_iType_rImage, [#client: this.getID(), #method: #_PinsRenderedCbk])
  m_rControls.getElement("avatarinfo.userspin").setText(EMPTY)
  i = 1
  repeat while 1
    t_sIcon = a_rSelected.GetParam("icon.type." & i)
    if i > 4 then
      exit repeat
    else
      if voidp(t_sIcon) then
        m_rControls.getElement("avatarinfo.icon" & i).clearImage()
      else
        m_rControls.getElement("avatarinfo.icon" & i).feedImage(getMember("badge_" & t_sIcon).image)
      end if
    end if
    i = i + 1
  end repeat
  m_rControls.show()
  return 1
end
on _PinsRenderedCbk this, a_mp_iRef_rThumb
  if objectp(m_rControls) then
    t_iCount = a_mp_iRef_rThumb.count
    t_mp_iRef_rThumb = [:]
    t_rcOff = rect(0, 0, 0, 0)
    t_rStar = getMember("inv.pin.star.thumb").image
    repeat with i = 1 to t_iCount
      t_iType = m_ar_rPinData[i][1]
      t_iLevel = m_ar_rPinData[i][2]
      t_rThumb = a_mp_iRef_rThumb[i]
      if voidp(t_rThumb) then
        t_rThumb = image(1, 1, 32)
      end if
      t_rThumb = t_rThumb.duplicate()
      if t_iType <> a_mp_iRef_rThumb.getPropAt(i) then
        error(this, "Pin grid thumbnails are out of sync!!!", #_PinsRenderedCbk)
        exit
      end if
      t_mp_iRef_rThumb.addProp(a_mp_iRef_rThumb.getPropAt(i), [#thumbnail: t_rThumb, #blend: 100])
    end repeat
    m_rPinGrid.render(t_mp_iRef_rThumb, m_rControls.getElement("avatarinfo.pins"))
  end if
end
on Unselect this
  m_rSelected = VOID
  if objectp(m_rControls) then
    m_rControls.hide()
  end if
end
on _RemoveAvatarCbk this, a_rData
  if objectp(m_rSelected) then
    if a_rData.getaProp(#avatar) = integer(m_rSelected.GetParam("REF")) then
      this.Unselect()
    end if
  end if
end
on AskFriendship this, a_sName
  getConnection("VMK").send("AskToBeFriend", [#str: a_sName])
end
on _EventProc this, a_kEvt, a_sElm, a_vPrm, a_sWnd
  case a_sElm of
    "avatarinfo.report.button":
      executeMessage(#call_for_help_report, m_rSelected.GetParam("NAME"))
    "avatarinfo.kick.button":
      if objectp(m_rSelected) then
        t_sTxt = getText("avatarinfo.kick.confirm")
        t_sTxt = replaceChunks(t_sTxt, "\$", m_rSelected.GetParam("NAME"))
        t_rDialog = createDialogWindow(this.getID(), "RoomProfileKickUser", 2, 0)
        t_rDialog.show()
        t_rDialog.setText(t_sTxt, getText("avatarinfo.kick.title"), "CANCEL", "OK")
      end if
    "avatarinfo.trade.button":
      if objectp(m_rSelected) then
        getConnection("VMK").send("TrdSendRequest", [#int: integer(m_rSelected.GetParam("REF"))])
      end if
    "avatarinfo.ignore.button":
      if objectp(m_rSelected) then
        t_sTxt = getText("avatarinfo.ignore.confirm")
        t_sTxt = replaceChunks(t_sTxt, "\$", m_rSelected.GetParam("NAME"))
        t_rDialog = createDialogWindow(this.getID(), "RoomProfileIgnoreUser", 2, 0)
        t_rDialog.show()
        t_rDialog.setText(t_sTxt, getText("avatarinfo.ignore.title"), "CANCEL", "OK")
      end if
    "avatarinfo.askfriendship.button":
      if objectp(m_rSelected) then
        t_sTxt = getText("avatarinfo.askfriend.confirm")
        t_sTxt = replaceChunks(t_sTxt, "\$", m_rSelected.GetParam("NAME"))
        t_rDialog = createDialogWindow(this.getID(), "RoomProfileAskFriend", 2, 0)
        t_rDialog.show()
        t_rDialog.setText(t_sTxt, getText("avatarinfo.askfriend.title"), "CANCEL", "OK")
      end if
    "avatarinfo.userspinlist":
    "help":
      executeMessage(#open_help_page, "help.messaging.friends")
    "close":
      m_rSelected = VOID
      if objectp(m_rControls) then
        m_rControls.hide()
      end if
    "avatarinfo.pins":
      this.ShowPinInfo(a_vPrm)
    otherwise:
      if a_sElm starts "avatarinfo.icon" then
        t_sIcon = m_rSelected.GetParam("icon.type." & the last char in a_sElm)
        if voidp(t_sIcon) then
          m_rControls.getElement("avatarinfo.userspin").setText(EMPTY)
        else
          m_rControls.getElement("avatarinfo.userspin").setText(getText("icon." & t_sIcon))
        end if
      end if

  end case
end
on _AskFriendCbk this
  if objectp(m_rSelected) then
    getConnection("VMK").send("AskToBeFriend", [#str: m_rSelected.GetParam("NAME")])
  end if
end
on ShowPinInfo this, a_vParam
  if not voidp(a_vParam) then
    m_rPinGrid.MouseSelection(a_vParam)
    t_iPin = m_rSelected.GetParam("pin.type." & m_rPinGrid.GetSelected())
    if voidp(t_iPin) then
      m_rControls.getElement("avatarinfo.userspin").setText(EMPTY)
    else
      m_rControls.getElement("avatarinfo.userspin").setText(getText("item." & t_iPin))
      if the doubleClick then
        if objectp(m_rSelected) then
          t_iPinIndex = m_rPinGrid.GetSelected() - 1
          getConnection("VMK").send("RequestItemDetails", [#int: integer(m_rSelected.GetParam("REF")), #int: 1, #int: t_iPinIndex])
        end if
      end if
    end if
  end if
end
on dialogWindowEvent me, a_sDialog, a_kEvent
  case a_sDialog of
    "RoomProfileKickUser":
      if a_kEvent = #dialogOK then
        if objectp(m_rSelected) then
          getConnection("VMK").send("KickUser", [#int: integer(m_rSelected.GetParam("REF"))])
        end if
        removeDialogWindow("RoomProfileKickUser")
      else
        if a_kEvent = "help" then
          executeMessage(#open_help_page, "help.messaging.friends")
        end if
      end if
    "RoomProfileIgnoreUser":
      if a_kEvent = #dialogOK then
        if objectp(m_rSelected) then
          getConnection("VMK").send("IgnoreUser", [#int: integer(m_rSelected.GetParam("REF"))])
        end if
        removeDialogWindow("RoomProfileIgnoreUser")
      else
        if a_kEvent = "help" then
          executeMessage(#open_help_page, "help.messaging.friends")
        end if
      end if
    "RoomProfileAskFriend":
      if a_kEvent = #dialogOK then
        if objectp(m_rSelected) then
          getConnection("VMK").send("AskToBeFriend", [#str: m_rSelected.GetParam("NAME")])
        end if
        removeDialogWindow("RoomProfileAskFriend")
      else
        if a_kEvent = "help" then
          executeMessage(#open_help_page, "help.messaging.guide")
        end if
      end if

  end case
end
on UpdateAvatarProfile me, a_mp_DataList
  if not voidp(m_rSelected) then
    if a_mp_DataList.findPos(#avatar) > 0 then
      if a_mp_DataList[#avatar].GetParam("NAME") = m_rSelected.GetParam("NAME") then
        me.select(m_rSelected)
      end if
    end if
  end if
end