-- Script
property m_rWindow
property m_sWndID
property m_ar_NonTradableItems
property m_mp_props

on construct this
  m_ar_NonTradableItems = []
  m_mp_props = [:]
  if variableExists("nontradable") then
    m_ar_NonTradableItems = getVariableValue("nontradable")
  end if
  registerMessage("room_leave", this.getID(), #RemoveMe)
  return 1
end
on deconstruct this
  if windowExists(m_sWndID) then
    removeWindow(m_sWndID)
  end if
  if objectp(m_rWindow) then
    removeWindow(m_sWndID)
  end if
  unregisterMessage("room_leave", this.getID())
  return 1
end
on Define this, a_ar_props
  m_sWndID = "ItemDetailsWindow"
  if windowExists(m_sWndID) then
    removeWindow(m_sWndID)
  end if
  t_kSpecial = VOID
  if value(getObject(#session).get("IsTrading")) then
    t_kSpecial = #modal
  end if
  if createWindow(m_sWndID, VOID, 0, 0, t_kSpecial) then
    t_rWindow = getWindow(m_sWndID)
    t_ar_windowDescriptions = ["vmk_basic.window", "vmk_item_info.window"]
    repeat with t_sWinDesc in t_ar_windowDescriptions
      t_bSuccess = t_rWindow.merge(t_sWinDesc)
    end repeat
    t_rWindow.center()
    m_rWindow = t_rWindow
    m_rWindow.registerClient(this.getID())
    m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseUp)
    this.setField(m_rWindow, "basic.window.title", getText("iteminfo.title.hd", "Item Info"))
    this.setField(m_rWindow, "roominfog.owner", a_ar_props[#owner])
    this.ShowSelected(a_ar_props[#code])
    this.setField(m_rWindow, "iteminfo.item", getText("item." & a_ar_props[#code]))
    t_sItemType = EMPTY
    t_bTradeable = 1
    if m_ar_NonTradableItems.findPos(a_ar_props[#code]) <> VOID then
      t_bTradeable = 0
    end if
    t_sExpireTime = getText("iteminfo.expires", "This expires in %days% day(s)")
    m_rWindow.getElement("iteminfo.check.guestsmove").hide()
    m_rWindow.getElement("iteminfo.text.guestsmove").hide()
    m_mp_props = a_ar_props
    case a_ar_props[#type] of
      1:
        t_sItemType = getText("iteminfo.1.type", "Furniture")
        t_bMeOwner = 0
        if m_mp_props[#owner] = getObject(#session).get("name") then
          t_bMeOwner = 1
        end if
        if not voidp(m_mp_props[#xtra].getaProp(#ref)) and t_bMeOwner then
          m_rWindow.getElement("iteminfo.check.guestsmove").show()
          m_rWindow.getElement("iteminfo.text.guestsmove").show()
          t_rContext = getThread("room").getComponent()._AccessRoom()
          t_rItem = t_rContext._AccessIndexed(m_mp_props[#xtra][#ref], "element")
          if voidp(t_rItem) then
            return error(this, "Could not find element in room", #Define)
          end if
          tStatus = integer(t_rItem.getObject().GetParam("GUESTMOVE"))
          if tStatus then
            this.changeImageInElement(m_rWindow, "iteminfo.check.guestsmove", member(getmemnum("button.checkbox.1")))
          else
            this.changeImageInElement(m_rWindow, "iteminfo.check.guestsmove", member(getmemnum("button.checkbox.0")))
          end if
        end if
      2:
        t_sItemType = getText("iteminfo.2.type", "Poster")
        t_bMeOwner = 0
        if m_mp_props[#owner] = getObject(#session).get("name") then
          t_bMeOwner = 1
        end if
        if not voidp(m_mp_props[#xtra].getaProp(#ref)) and t_bMeOwner then
          m_rWindow.getElement("iteminfo.check.guestsmove").show()
          m_rWindow.getElement("iteminfo.text.guestsmove").show()
          t_rContext = getThread("room").getComponent()._AccessRoom()
          t_rItem = t_rContext._AccessIndexed(m_mp_props[#xtra][#ref], "poster")
          if voidp(t_rItem) then
            return error(this, "Could not find element in room", #Define)
          end if
          tStatus = integer(t_rItem.getObject().GetParam("GUESTMOVE"))
          if tStatus then
            this.changeImageInElement(m_rWindow, "iteminfo.check.guestsmove", member(getmemnum("button.checkbox.1")))
          else
            this.changeImageInElement(m_rWindow, "iteminfo.check.guestsmove", member(getmemnum("button.checkbox.0")))
          end if
        end if
      3:
        t_sItemType = getText("iteminfo.3.type", "Unisex Clothing")
      4:
        t_sItemType = getText("iteminfo.4.type", "Male Clothing")
      5:
        t_sItemType = getText("iteminfo.5.type", "Female Clothing")
      6:
        t_sItemType = getText("iteminfo.6.type", "Normal Pin")
      7:
        t_sItemType = getText("iteminfo.7.type", "Magic Pin")
        this.setField(m_rWindow, "magics.word", a_ar_props[#xtra][#magiword])
      8:
        t_sItemType = getText("iteminfo.8.type", "Single Use Magic Pin")
        t_ar_Time = this.seconds2time(a_ar_props[#xtra][#timeToExpire])
        t_IDaysLeft = integer(t_ar_Time[#h]) / 24
        t_sExpireTime = replaceChunks(t_sExpireTime, "%days%", t_IDaysLeft)
        this.setField(m_rWindow, "expiredate.info", t_sExpireTime)
        this.setField(m_rWindow, "magics.word", a_ar_props[#xtra][#magiword])
        this.changeImageInElement(m_rWindow, "singleuse", member("icon.singleuse"))
      9:
        t_sItemType = getText("iteminfo.9.type", "Ticket Pin")
        t_ar_Time = this.seconds2time(a_ar_props[#xtra][#timeToExpire])
        t_IDaysLeft = integer(t_ar_Time[#h]) / 24
        t_sExpireTime = replaceChunks(t_sExpireTime, "%days%", t_IDaysLeft)
        this.setField(m_rWindow, "expiredate.info", t_sExpireTime)
        this.setField(m_rWindow, "iteminfo.type.hd", getText("iteminfo.goodfor.hd", "Good For:"))
        t_sItemType = a_ar_props[#xtra][#validForRooms]

    end case
    if a_ar_props[#type] <> 7 and a_ar_props[#type] <> 8 then
      this.setField(m_rWindow, "iteminfo.magicword.hd", EMPTY)
    end if
    t_sTradeable = getText("iteminfo.tradeable", "Tradeable")
    if not t_bTradeable or a_ar_props[#type] = 8 then
      t_sTradeable = getText("iteminfo.nontradeable", "Nontradeable")
    end if
    this.setField(m_rWindow, "iteminfo.tradeable.off", t_sTradeable)
    this.setField(m_rWindow, "iteminfo.type", t_sItemType)
    return 1
  else
    return error(this, "Failed to open item details!", #update)
  end if
end
on ShowSelected this, t_iCode
  t_rBack = getMember("previewbox").image.duplicate()
  if t_iCode < 0 then
    m_rWindow.getElement("inv.preview").feedImage(t_rBack)
  else
    t_rInput = [:]
    t_rInput.setaProp(t_iCode, VOID)
    executeMessage("GetMixedPreview", t_rInput, [#client: this.getID(), #method: #ShowItemPreview])
  end if
end
on ShowItemPreview this, a_iType_rImage
  t_rBack = getMember("previewbox").image.duplicate()
  t_rPrev = a_iType_rImage[1]
  if voidp(t_rPrev) then
    t_rPrev = image(1, 1, 32)
  end if
  t_iOffX = (t_rBack.width - t_rPrev.width) / 2
  t_iOffY = (t_rBack.height - t_rPrev.height) / 2
  t_rcDest = t_rPrev.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY]
  if t_rcDest.bottom - t_rcDest.top > t_rBack.rect.bottom - t_rBack.rect.top or t_rcDest.right - t_rcDest.left > t_rBack.rect.right - t_rBack.rect.left then
    tHeightOverflow = t_rcDest.bottom - t_rcDest.top - (t_rBack.rect.bottom - t_rBack.rect.top)
    tWidthOverflow = t_rcDest.right - t_rcDest.left - (t_rBack.rect.right - t_rBack.rect.left)
    if tWidthOverflow > 0 then
      tScale = float(t_rBack.rect.right - t_rBack.rect.left) / float(t_rcDest.right - t_rcDest.left)
      tOffsetLeftCorner = [t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]
      t_rcDest = t_rcDest - tOffsetLeftCorner
      t_rcDest.top = integer(t_rcDest.top * tScale)
      t_rcDest.bottom = integer(t_rcDest.bottom * tScale)
      t_rcDest.left = integer(t_rcDest.left * tScale)
      t_rcDest.right = integer(t_rcDest.right * tScale)
    end if
    tHeightOverflow = t_rcDest.bottom - t_rcDest.top - (t_rBack.rect.bottom - t_rBack.rect.top)
    if tHeightOverflow > 0 then
      tScale = float(t_rBack.rect.bottom - t_rBack.rect.top) / float(t_rcDest.bottom - t_rcDest.top)
      tOffsetLeftCorner = [t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]
      t_rcDest = t_rcDest - tOffsetLeftCorner
      t_rcDest.top = integer(t_rcDest.top * tScale)
      t_rcDest.bottom = integer(t_rcDest.bottom * tScale)
      t_rcDest.left = integer(t_rcDest.left * tScale)
      t_rcDest.right = integer(t_rcDest.right * tScale)
    end if
    t_iDestMidX = t_rBack.width / 2
    t_iDestMidY = t_rBack.height / 2
    t_rcMove = [t_iDestMidX - t_rcDest.right / 2, t_iDestMidY - t_rcDest.bottom / 2, t_iDestMidX - t_rcDest.right / 2, t_iDestMidY - t_rcDest.bottom / 2]
    t_rcDest = t_rcDest + t_rcMove
  end if
  t_rBack.useAlpha = 0
  t_rBack.copyPixels(t_rPrev, t_rcDest, t_rPrev.rect, [#useFastQuads: 1])
  m_rWindow.getElement("inv.preview").feedImage(t_rBack)
end
on RemoveMe this
  if windowExists(m_sWndID) then
    removeWindow(m_sWndID)
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "close":
      if windowExists(m_sWndID) then
        removeWindow(m_sWndID)
      end if
      if objectp(m_rWindow) then
        removeWindow(m_sWndID)
      end if
    "iteminfo.check.guestsmove":
      if windowExists(m_sWndID) then
        tNewState = this.toggleCheckBox(getWindow(m_sWndID), a_sElem)
        if not voidp(tNewState) then
          getConnection("VMK").send("ChangeItemProperties", [#int: m_mp_props[#xtra][#ref], #int: tNewState])
        end if
      end if
    "help":
      executeMessage("ui_help")

  end case
end
on setField me, t_rWindow, t_sFieldName, t_sText
  if objectp(t_rWindow) then
    t_rTitleElem = t_rWindow.getElement(t_sFieldName)
    if t_rTitleElem <> 0 then
      t_rTitleElem.setText(t_sText)
    end if
  end if
end
on changeImageInElement me, tWndObj, tElemName, tmember
  if objectp(tWndObj) then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.ink = 36
        tSprite.member.image = tmember.image
        tSprite.member.regPoint = tmember.regPoint
        tSprite.width = tmember.width
        tSprite.height = tmember.height
      end if
    end if
  end if
end
on seconds2time me, a_iSeconds
  t_iSeconds = a_iSeconds mod 60
  t_iMinutes = a_iSeconds / 60 mod 60
  t_iHours = a_iSeconds / 3600
  t_iiSeconds = t_iSeconds
  t_iiMinutes = t_iMinutes
  t_iiHours = t_iHours
  if t_iSeconds < 10 then
    t_iiSeconds = "0" & t_iSeconds
  end if
  if t_iMinutes < 10 then
    t_iiMinutes = "0" & t_iMinutes
  end if
  if t_iHours < 10 then
    t_iiHours = "0" & t_iHours
  end if
  return [#h: t_iHours, #m: t_iMinutes, #s: t_iSeconds, #hh: t_iiHours, #mm: t_iiMinutes, #ss: t_iiSeconds]
end
on toggleCheckBox me, a_rWindow, a_sElement
  t_Elem = a_rWindow.getElement(a_sElement)
  t_memTrue = member(getmemnum("button.checkbox.1"))
  t_memFalse = member(getmemnum("button.checkbox.0"))
  if t_Elem <> 0 then
    tSprite = t_Elem.getProperty(#sprite)
    if tSprite <> 0 then
      if tSprite.member.image = t_memFalse.image then
        tstate = 0
      else
        tstate = 1
      end if
      tstate = not tstate
      if tstate then
        t_Elem.feedImage(t_memTrue.image)
      else
        t_Elem.feedImage(t_memFalse.image)
      end if
      return tstate
    end if
  end if
  return VOID
end