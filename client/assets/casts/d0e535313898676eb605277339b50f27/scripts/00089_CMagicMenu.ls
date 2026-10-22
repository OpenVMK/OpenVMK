-- Script
property m_sWindowID
property m_rGrid
property m_mp_FxList
property m_iMagicStatus
property m_EventAgent_obj
property m_iItemId
property m_iActiveFx
property m_iSelectedFx
property m_arAvailableTimes
property m_bMagicMenuOpened
property m_iTelePortFxId
property m_rWaitImage

on construct this
  m_sWindowID = "MagicWindow"
  m_mp_FxList = [:]
  m_iMagicStatus = 0
  m_EventAgent_obj = VOID
  m_iItemId = VOID
  m_iActiveFx = -1
  m_iSelectedFx = VOID
  m_arAvailableTimes = VOID
  m_iTelePortFxId = VOID
  m_bMagicMenuOpened = 0
  m_rGrid = createObject(getUniqueID(), "CGenericThumbnailGrid")
  if memberExists("magic.timer") then
    m_rWaitImage = getMember("magic.timer").image
  else
    m_rWaitImage = image(1, 1, 32)
  end if
  registerMessage("ui_Magic", this.getID(), #showHideMagic)
  registerMessage("close_Magic", this.getID(), #_Close)
  registerMessage("room_tile_selection", this.getID(), #_Close)
  registerMessage("room_leave", this.getID(), #_Close)
  this.regMsgList(1)
  return 1
end
on deconstruct this
  removeObject(m_rGrid.getID())
  unregisterMessage("ui_Magic", this.getID())
  unregisterMessage("close_Magic", this.getID())
  unregisterMessage("room_tile_selection", this.getID())
  unregisterMessage("room_leave", this.getID())
  removeObject("MagicTeleporter")
  this.regMsgList(0)
  return 1
end
on showHideMagic this
  if windowExists(m_sWindowID) then
    tWndObj = getWindow(m_sWindowID)
    if tWndObj.getProperty(#visible) then
      removeWindow(m_sWindowID)
      m_iSelectedFx = VOID
      m_bMagicMenuOpened = 0
    end if
  else
    getConnection(getVariable("main.connection.id", "VMK")).send("QueryMagicFx")
    m_bMagicMenuOpened = 1
  end if
end
on DrawGrid this
  if windowExists(m_sWindowID) then
    t_rWnd = getWindow(m_sWindowID)
    t_Obj = t_rWnd.getElement("magic.grid")
  end if
end
on GetSelected this
  t_iSelected = m_rGrid.GetSelected()
  if t_iSelected > 0 and t_iSelected <= m_mp_FxList.count then
    return m_mp_FxList[t_iSelected]
  else
    return [#FxId: -1, #code: -1, #ItemId: -1, #name: EMPTY, #trigger: EMPTY, #available: 0, #level: 0, #Active: 0, #singleuse: 0, #expirydate: -1]
  end if
end
on ShowMagicInfo this, a_vParam, a_bDoubleClick
  t_rWnd = getWindow(m_sWindowID)
  if listp(m_mp_FxList) and m_mp_FxList.count > 0 then
    if not voidp(a_vParam) then
      m_rGrid.MouseSelection(a_vParam)
      m_iItemId = this.GetSelected().FxId
      t_FxID = this.GetSelected().code
    else
      m_iItemId = m_mp_FxList[1].FxId
      t_FxID = m_mp_FxList[1].code
      m_rGrid.select(m_iItemId)
    end if
    m_iSelectedFx = m_iItemId
    t_rItem = m_mp_FxList.getaProp(m_iItemId)
    if m_iItemId = -1 then
      exit
    end if
    if a_bDoubleClick then
      if m_iItemId > -1 then
        if m_iMagicStatus = 0 then
          if t_FxID <> 4 then
            m_iActiveFx = m_iItemId
            getConnection(getVariable("main.connection.id", "VMK")).send("ActivataMagicFx", [#int: m_iItemId])
            getConnection(getVariable("main.connection.id", "VMK")).send("QueryMagicFx")
            if not t_rItem.singleuse then
              t_rWnd.getElement("magics.stop.button").setProperty(#visible, 1)
            end if
            t_rWnd.getElement("magics.word").setProperty(#visible, 0)
            t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
            t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
            t_rWnd.getElement("magics.word.hd").setProperty(#visible, 0)
            this._Close()
          else
            this.HandleTeleportFx()
            this._Close()
          end if
        end if
      end if
    else
      if m_iActiveFx = m_iSelectedFx then
        t_rWnd.getElement("magics.stop.button").setProperty(#visible, 1)
        t_rWnd.getElement("magics.word").setProperty(#visible, 0)
        t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
        t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
        t_rWnd.getElement("magics.word.hd").setProperty(#visible, 0)
        if t_rWnd.elementExists("magics.name") then
          t_sName = this.GetSelected().name
          t_rWnd.getElement("magics.name").setText(t_sName)
        end if
        t_iExpiryDate = this.GetSelected().expirydate
        if t_iExpiryDate = -1 then
          t_rWnd.getElement("pin.expirydate").setProperty(#visible, 0)
        else
          t_rWnd.getElement("pin.expirydate").setProperty(#visible, 1)
          t_iHours = t_iExpiryDate / 3600
          t_IDaysLeft = t_iHours / 24
          t_sTxt = getText("singleuse.expiry.info.text") && t_IDaysLeft && getText("days.left.text")
          t_rWnd.getElement("pin.expirydate").setText(t_sTxt)
          t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
          t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
          t_rWnd.getElement("magics.stop.button").setProperty(#visible, 0)
        end if
      else
        if t_rWnd.elementExists("magics.word") then
          t_sTxt = this.GetSelected().trigger
          t_rWnd.getElement("magics.word").setText(t_sTxt)
        end if
        if t_rWnd.elementExists("magics.name") then
          t_sName = this.GetSelected().name
          t_rWnd.getElement("magics.name").setText(t_sName)
        end if
        if t_rWnd.elementExists("magics.timeout") then
          t_sTxt = EMPTY
          t_rWnd.getElement("magics.timeout").setText(t_sTxt)
          t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
        end if
        t_rWnd.getElement("magics.stop.button").setProperty(#visible, 0)
        t_rWnd.getElement("magics.word").setProperty(#visible, 1)
        t_rWnd.getElement("magics.timeout").setProperty(#visible, 1)
        t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 1)
        t_rWnd.getElement("magics.word.hd").setProperty(#visible, 1)
        t_iExpiryDate = this.GetSelected().expirydate
        if t_iExpiryDate = -1 then
          t_rWnd.getElement("pin.expirydate").setProperty(#visible, 0)
        else
          t_rWnd.getElement("pin.expirydate").setProperty(#visible, 1)
          t_iHours = t_iExpiryDate / 3600
          t_IDaysLeft = t_iHours / 24
          t_sTxt = getText("singleuse.expiry.info.text") && t_IDaysLeft && getText("days.left.text")
          t_rWnd.getElement("pin.expirydate").setText(t_sTxt)
          t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
          t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
        end if
        if t_rItem.singleuse then
          t_rWnd.getElement("magics.stop.button").setProperty(#visible, 0)
        end if
      end if
    end if
  end if
end
on HandleUi this
  if windowExists(m_sWindowID) and integerp(m_iActiveFx) and m_iActiveFx <> m_iSelectedFx then
    t_rWnd = getWindow(m_sWindowID)
    t_rWnd.getElement("magics.stop.button").setProperty(#visible, 0)
    t_rWnd.getElement("magics.word").setProperty(#visible, 1)
    t_rWnd.getElement("magics.timeout").setProperty(#visible, 1)
    t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 1)
    t_rWnd.getElement("magics.word.hd").setProperty(#visible, 1)
  end if
end
on HandleTeleportFx this
  if voidp(m_EventAgent_obj) then
    m_EventAgent_obj = createObject("MagicTeleporter", "CEventAgent")
    m_EventAgent_obj.registerEvent(this, #mouseDown, #CatchLoc)
  end if
end
on CatchLoc this
  t_iStack = value(getThread(#room).component._AccessRoom().Search("CLASS", "pointer").GetFactor().GetTheTileStack())
  if not voidp(t_iStack) then
    t_iTile = value(t_iStack.GetParam("REF"))
  end if
  if integerp(t_iTile) then
    getConnection(getVariable("main.connection.id", "VMK")).send("MagicTeleport", [#int: m_iTelePortFxId, #int: t_iTile])
    removeObject("MagicTeleporter")
    m_EventAgent_obj = VOID
    if windowExists(m_sWindowID) then
      t_rWnd = getWindow(m_sWindowID)
      t_rWnd.getElement("magics.stop.button").setProperty(#visible, 1)
      t_rWnd.getElement("magics.word").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
      t_rWnd.getElement("magics.word.hd").setProperty(#visible, 0)
    end if
  end if
end
on _GenericError this, a_rMsg
  tCode = a_rMsg.connection.GetIntFrom()
  case tCode of
    4522:
      this.HandleUi()

  end case
end
on _CheckFxTimers this
  if listp(m_arAvailableTimes) then
    t_iCount = m_arAvailableTimes.count
    if t_iCount > 0 then
      t_iUpdateNeeded = 0
      repeat with i = 1 to t_iCount
        t_iTime = m_arAvailableTimes[i]
        m_arAvailableTimes[i] = t_iTime - 1
        if t_iTime - 1 > 0 then
          t_iUpdateNeeded = t_iUpdateNeeded + 1
        end if
      end repeat
      if windowExists(m_sWindowID) and m_iActiveFx <> m_iSelectedFx then
        if m_arAvailableTimes.findPos(string(m_iSelectedFx)) then
          t_rWnd = getWindow(m_sWindowID)
          t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 1)
          t_rWnd.getElement("magics.timeout").setProperty(#visible, 1)
          if t_rWnd.elementExists("magics.timeout") then
            t_iCurrentMseconds = m_arAvailableTimes[string(m_iSelectedFx)]
            t_iCurrentMinutes = t_iCurrentMseconds / 60
            t_iCurrentSeconds = t_iCurrentMseconds mod 60
            if t_iCurrentSeconds < 10 then
              t_iCurrentSeconds = "0" & t_iCurrentSeconds
            end if
            t_sTxt = t_iCurrentMinutes & ":" & t_iCurrentSeconds && getText("magics.minutes")
            t_rWnd.getElement("magics.timeout").setText(t_sTxt)
          end if
        end if
      end if
      if t_iUpdateNeeded <> t_iCount then
        m_arAvailableTimes = [:]
        getConnection(getVariable("main.connection.id", "VMK")).send("QueryMagicFx")
        return 1
      else
        this.delay(1000, #_CheckFxTimers)
      end if
    else
      return 0
    end if
  end if
end
on getAvailableMagic this, tMsg
  t_iFxCount = tMsg.connection.GetIntFrom()
  m_arAvailableTimes = [:]
  m_mp_FxList = [:]
  m_iTelePortFxId = VOID
  m_iActiveFx = -1
  repeat with i = 1 to t_iFxCount
    t_iID = tMsg.connection.GetIntFrom()
    t_sID = string(t_iID)
    t_iItemId = tMsg.connection.GetIntFrom()
    t_iFxCode = tMsg.connection.GetIntFrom()
    t_sFxName = tMsg.connection.GetStrFrom()
    t_sTrigger = tMsg.connection.GetStrFrom()
    t_iAvailable = tMsg.connection.GetIntFrom()
    t_iLevel = tMsg.connection.GetIntFrom()
    t_bActive = tMsg.connection.GetIntFrom()
    t_bSingleUse = tMsg.connection.GetIntFrom()
    t_sExpiryDate = tMsg.connection.GetIntFrom()
    t_iPos = m_mp_FxList.findPos(t_sID)
    if t_iPos = 0 then
      m_mp_FxList.addProp(t_sID, [:])
    end if
    if t_iAvailable > 0 then
      m_arAvailableTimes.addProp(t_iID, t_iAvailable)
    end if
    if t_bActive then
      m_iActiveFx = t_iID
    end if
    if t_iFxCode = 4 then
      m_iTelePortFxId = t_iID
    end if
    m_mp_FxList[t_sID].addProp(#FxId, t_iID)
    m_mp_FxList[t_sID].addProp(#code, t_iFxCode)
    m_mp_FxList[t_sID].addProp(#ItemId, t_iItemId)
    m_mp_FxList[t_sID].addProp(#name, t_sFxName)
    m_mp_FxList[t_sID].addProp(#trigger, t_sTrigger)
    m_mp_FxList[t_sID].addProp(#available, t_iAvailable)
    m_mp_FxList[t_sID].addProp(#level, t_iLevel)
    m_mp_FxList[t_sID].addProp(#Active, t_bActive)
    m_mp_FxList[t_sID].addProp(#singleuse, t_bSingleUse)
    m_mp_FxList[t_sID].addProp(#expirydate, t_sExpiryDate)
  end repeat
  executeMessage("close_Emoticons")
  executeMessage(#hide_roominfo)
  executeMessage(#hide_camera)
  if windowExists(m_sWindowID) and m_bMagicMenuOpened then
    t_rWnd = getWindow(m_sWindowID)
    t_rWnd.show()
    m_bMagicMenuOpened = 0
  else
    if m_bMagicMenuOpened then
      createWindow(m_sWindowID, "vmk_popup.window")
      t_rWnd = getWindow(m_sWindowID)
      t_rWnd.merge("vmk_popup_magics.window")
      tW = t_rWnd.getProperty(#width)
      tH = t_rWnd.getProperty(#height)
      t_rWnd.moveTo(663 - tW, 572 - tH)
      t_rWnd.registerClient(this.getID())
      t_rWnd.registerProcedure(#_EventProcMagic, this.getID(), #mouseUp)
      t_rWnd.registerProcedure(#_EventProcMagic, this.getID(), #mouseDown)
      m_bMagicMenuOpened = 0
    end if
  end if
  if windowExists(m_sWindowID) then
    t_rWnd = getWindow(m_sWindowID)
    if t_rWnd.elementExists("popup.hd") then
      t_sTxt = getText("magic.wnd.name")
      t_rWnd.getElement("popup.hd").setText(t_sTxt)
    end if
    t_mp_iType_rThumb = [:]
    repeat with i = 1 to m_mp_FxList.count
      t_mp_iType_rThumb.addProp(m_mp_FxList[i].ItemId, VOID)
    end repeat
    executeMessage("GetPinThumbnail", t_mp_iType_rThumb, [#client: this.getID(), #method: #_ThumbsRenderedCbk])
    if m_mp_FxList.count then
      t_rWnd.getElement("magics.stop.button").setProperty(#visible, 0)
      t_rWnd.getElement("magics.word").setProperty(#visible, 1)
      t_rWnd.getElement("magics.timeout").setProperty(#visible, 1)
      t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 1)
      t_rWnd.getElement("magics.word.hd").setProperty(#visible, 1)
    else
      t_rWnd.getElement("magics.stop.button").setProperty(#visible, 0)
      t_rWnd.getElement("magics.word").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
      t_rWnd.getElement("magics.word.hd").setProperty(#visible, 0)
    end if
    if m_arAvailableTimes.count > 0 then
      t_mpDelays = [:]
      t_mpDelays = this.delays
      repeat with g = 1 to t_mpDelays.count
        if t_mpDelays[g].method = #_CheckFxTimers then
          this.cancel(t_mpDelays.getPropAt(g))
        end if
      end repeat
      t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
      this._CheckFxTimers()
    end if
    t_mpList = this.GetSelected()
    if listp(t_mpList) then
      m_iSelectedFx = this.GetSelected().FxId
      if t_rWnd.elementExists("magics.word") then
        t_sTxt = this.GetSelected().trigger
        t_rWnd.getElement("magics.word").setText(t_sTxt)
      end if
      if t_rWnd.elementExists("magics.name") then
        t_sName = this.GetSelected().name
        t_rWnd.getElement("magics.name").setText(t_sName)
      end if
      t_iExpiryDate = t_mpList.expirydate
      if t_iExpiryDate = -1 then
        t_rWnd.getElement("pin.expirydate").setProperty(#visible, 0)
      else
        t_rWnd.getElement("pin.expirydate").setProperty(#visible, 1)
        t_iHours = t_iExpiryDate / 3600
        t_IDaysLeft = t_iHours / 24
        t_sTxt = getText("singleuse.expiry.info.text") && t_IDaysLeft && getText("days.left.text")
        t_rWnd.getElement("pin.expirydate").setText(t_sTxt)
        t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
        t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
      end if
      if t_rWnd.elementExists("magics.timeout") then
        t_sTxt = EMPTY
        t_rWnd.getElement("magics.timeout").setText(t_sTxt)
        t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
      end if
      if m_iActiveFx = m_iSelectedFx and m_iActiveFx > -1 then
        this._ShowStopMagic()
      end if
    else
      t_rWnd.getElement("magics.word").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
      t_rWnd.getElement("magics.word.hd").setProperty(#visible, 0)
      if t_rWnd.elementExists("magics.name") then
        t_rWnd.getElement("magics.name").setText(getText("magics.nomagic"))
      end if
    end if
  end if
end
on _ThumbsRenderedCbk this, a_mp_iRef_rThumb
  if windowExists(m_sWindowID) then
    t_rWnd = getWindow(m_sWindowID)
    t_iCount = a_mp_iRef_rThumb.count
    t_mp_iRef_rThumb = [:]
    repeat with i = 1 to t_iCount
      t_rThumb = a_mp_iRef_rThumb[i]
      if voidp(t_rThumb) then
        t_rThumb = image(1, 1, 32)
      else
        t_rThumb = a_mp_iRef_rThumb[i].duplicate()
      end if
      t_rItem = m_mp_FxList[i]
      t_iLevel = t_rItem.level
      t_rcOff = rect(0, 0, 0, 0)
      if t_iLevel > 0 then
        t_rStar = getMember("inv.pin.star.thumb").image
        t_rRect = t_rStar.rect
        repeat with s = 1 to t_iLevel
          t_rThumb.copyPixels(t_rStar, t_rRect + t_rcOff + [(s - 1) * (t_rRect.width + 1) + 3, 31, (s - 1) * (t_rRect.width + 1) + 3, 31], t_rRect, [#ink: 36, #useFastQuads: 1])
        end repeat
      end if
      t_rItem = m_mp_FxList[i]
      if t_rItem.available > 0 then
        t_rImg = t_rThumb.duplicate()
        t_iSourceImgH = t_rImg.height
        t_iDestImgH = t_rImg.height
        t_iMArgin = (t_rImg.height - m_rWaitImage.height) / 2
        t_rImg.copyPixels(m_rWaitImage, rect(t_iMArgin, t_iMArgin, t_iDestImgH - t_iMArgin, t_iDestImgH - t_iMArgin), m_rWaitImage.rect, [#ink: 0])
        t_rThumb = t_rImg
      end if
      t_mp_iRef_rThumb.addProp(t_rItem.ItemId, [#thumbnail: t_rThumb, #blend: 100])
    end repeat
    m_rGrid.render(t_mp_iRef_rThumb, t_rWnd.getElement("magics.grid"))
  end if
end
on _ShowStopMagic this
  if windowExists(m_sWindowID) then
    t_rWnd = getWindow(m_sWindowID)
    if t_rWnd.elementExists("magics.name") then
      t_sName = this.GetSelected().name
      t_rWnd.getElement("magics.name").setText(t_sName)
    end if
    if integerp(m_iActiveFx) and m_iActiveFx = m_iSelectedFx then
      t_rWnd.getElement("magics.stop.button").setProperty(#visible, 1)
      t_rWnd.getElement("magics.word").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout").setProperty(#visible, 0)
      t_rWnd.getElement("magics.timeout.hd").setProperty(#visible, 0)
      t_rWnd.getElement("magics.word.hd").setProperty(#visible, 0)
    else
      this.HandleUi()
    end if
  end if
end
on _StopMagic this
  getConnection(getVariable("main.connection.id", "VMK")).send("DeactivateMagicFx")
  getConnection(getVariable("main.connection.id", "VMK")).send("QueryMagicFx")
  this.HandleUi()
end
on _Close this
  if windowExists(m_sWindowID) then
    removeWindow(m_sWindowID)
    m_mp_FxList = [:]
    m_iMagicStatus = 0
    m_EventAgent_obj = VOID
    m_iItemId = VOID
    m_iActiveFx = VOID
    m_iSelectedFx = VOID
    m_arAvailableTimes = VOID
    m_bMagicMenuOpened = 0
  end if
end
on _RechargeCount this, a_rMsg
  t_iID = a_rMsg.connection.GetIntFrom()
  t_iTime = a_rMsg.connection.GetIntFrom()
end
on regMsgList this, tBool
  tMsgs = [:]
  tMsgs.setaProp(2527, #getAvailableMagic)
  tMsgs.setaProp(2000, #_GenericError)
  tMsgs.setaProp(2591, #_Close)
  tMsgs.setaProp(2529, #_RechargeCount)
  tCmds = [:]
  tCmds.setaProp("QueryMagicFx", 527)
  tCmds.setaProp("ActivataMagicFx", 526)
  tCmds.setaProp("DeactivateMagicFx", 528)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
end
on _EventProcMagic this, tEvent, tElemID, tParam
  if tEvent = #mouseUp then
    case tElemID of
      "magics.grid":
        if the doubleClick then
          this.ShowMagicInfo(tParam, 1)
        else
          this.ShowMagicInfo(tParam, 0)
        end if
      "help":
        executeMessage(#open_help_page, "help.chat.emotes")
      "close":
        removeWindow(m_sWindowID)
        executeMessage("PlayInterfaceSound", "close-popup")

    end case
  else
    if tElemID = "magics.stop.button" and tEvent = #mouseDown then
      this._StopMagic()
    end if
  end if
  return 1
end