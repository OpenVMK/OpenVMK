-- Script
property m_arConf

on construct this
  m_arConf = VOID
  return 1
end
on deconstruct this
  if windowExists("room_custom_load_wnd") then
    removeWindow("room_custom_load_wnd")
  end if
  if objectExists("room_status_bar") then
    removeObject("room_status_bar")
  end if
  return 1
end
on Define this, a_iRoomID
  t_rConf = GetLoadingScreenConfigurationObj()
  m_arConf = t_rConf.getConfigurationForRoom(a_iRoomID)
  if voidp(m_arConf) then
    a_iRoomID = -1
    m_arConf = t_rConf.getConfigurationForRoom(a_iRoomID)
  end if
  if not voidp(m_arConf) then
    if createWindow("room_custom_load_wnd", "vmk_customload.window", 0, 0) then
      t_rWnd = getWindow("room_custom_load_wnd")
      t_rWnd.center()
      if not t_rConf.ResourcesReady(a_iRoomID) then
        if not voidp(m_arConf[4].getaProp(#img)) then
          registerDownloadCallback(t_rConf.GetMemnumForUrl(m_arConf[4].getaProp(#img)), #FeedBackground, this.getID(), VOID)
        else
          this.FeedBackground()
        end if
        repeat with i = 1 to 3
          if not voidp(m_arConf[i].getaProp(#img)) then
            t_iIndex = i
            registerDownloadCallback(t_rConf.GetMemnumForUrl(m_arConf[i].getaProp(#img)), #FeedImageSlot, this.getID(), t_iIndex)
          else
            this.FeedImageSlot(i)
          end if
          this.FeedTextSlot(i)
        end repeat
      else
        this.FeedBackground()
        repeat with i = 1 to 3
          this.FeedImageSlot(i)
          this.FeedTextSlot(i)
        end repeat
      end if
    end if
    return 1
  else
    return 0
  end if
end
on FeedBackground this
  t_rWnd = getWindow("room_custom_load_wnd")
  t_mpBgConf = m_arConf[4]
  t_rBgElem = t_rWnd.getElement("loading.image.bg")
  t_sBgColor = "#000000"
  if not voidp(t_mpBgConf.getaProp(#color)) then
    t_sBgColor = t_mpBgConf.getaProp(#color)
  end if
  if not voidp(t_mpBgConf.getaProp(#img)) then
    tImage = getMember(t_mpBgConf.getaProp(#img)).image
    tDestImage = image(t_rBgElem.getProperty(#width), t_rBgElem.getProperty(#height), tImage.depth)
    if t_mpBgConf.getaProp(#vAlign) = #bottom then
      t_offSetY = tDestImage.height - tImage.height
    else
      t_offSetY = 0
    end if
    tDestImage.fill(tDestImage.rect, [#color: rgb(t_sBgColor), #shapeType: #fill])
    tdestrect = rect(0, t_offSetY, tImage.width, tImage.height + t_offSetY)
    tDestImage.copyPixels(tImage, tdestrect, tImage.rect, [#useFastQuads: 1])
    t_rBgElem.feedImage(tDestImage)
  else
    t_rBgElem.setProperty(#bgColor, rgb(t_sBgColor))
    t_rBgElem.clearImage()
  end if
end
on FeedImageSlot this, a_iSlot
  t_rWnd = getWindow("room_custom_load_wnd")
  t_mpSlotConf = m_arConf[a_iSlot]
  if not voidp(t_mpSlotConf.getaProp(#img)) then
    t_rWnd.getElement("loading.image" & a_iSlot).feedImage(getMember(t_mpSlotConf[#img]).image)
    if value(t_mpSlotConf.getaProp(#flip)) then
      t_rWnd.getElement("loading.image" & a_iSlot).flipH()
      t_rWnd.getElement("loading.image" & a_iSlot).render()
    end if
  else
    t_rWnd.getElement("loading.image" & a_iSlot).hide()
  end if
end
on FeedTextSlot this, a_iSlot
  t_rWnd = getWindow("room_custom_load_wnd")
  t_mpSlotConf = m_arConf[a_iSlot]
  if not voidp(t_mpSlotConf.getaProp(#text)) then
    t_rElement = t_rWnd.getElement("loadingscreen.headline" & a_iSlot)
    t_sText = replaceChunks(t_mpSlotConf.getaProp(#text), "\r", RETURN)
    t_sFontName = t_mpSlotConf.getaProp(#font)
    t_sTextColor = t_mpSlotConf.getaProp(#color)
    t_sTextStyle = t_mpSlotConf.getaProp(#style)
    t_iTextSize = t_mpSlotConf.getaProp(#size)
    if voidp(t_sFontName) then
      t_sFontName = "Folio BoldCondensed *"
    end if
    if voidp(t_sTextColor) then
      t_sTextColor = "#FEFEFE"
    end if
    if voidp(t_sTextStyle) then
      t_sTextStyle = "#plain"
    end if
    if voidp(t_iTextSize) then
      t_iTextSize = 12
    end if
    tFontData = [#font: t_sFontName, #fontSize: t_iTextSize, #lineHeight: t_iTextSize, #color: rgb(t_sTextColor), #ilk: #struct, #fontStyle: [symbol(t_sTextStyle)]]
    t_rElement.setFont(tFontData)
    t_iMTop = value(t_mpSlotConf.getaProp(#mtop))
    t_iMBottom = value(t_mpSlotConf.getaProp(#mbottom))
    t_iMLeft = value(t_mpSlotConf.getaProp(#mleft))
    t_iMRight = value(t_mpSlotConf.getaProp(#mright))
    t_member = t_rElement.getProperty(#member)
    t_newrect = rect(0, 0, t_member.width - t_iMLeft - t_iMRight, t_member.height - t_iMBottom - t_iMTop)
    t_rElement.setProperty(#width, t_newrect.width)
    t_rElement.setProperty(#height, t_newrect.height)
    t_rElement.pOwnW = t_newrect.width
    t_rElement.pOwnH = t_newrect.height
    t_rElement.setText(t_sText)
    t_rElement.moveBy(t_iMLeft, t_iMTop)
    this.fixAntialiasing("room_custom_load_wnd", "loadingscreen.headline" & a_iSlot, 1)
  else
    t_rWnd.getElement("loadingscreen.headline" & a_iSlot).hide()
  end if
end
on updateQueue this, a_iPeopleInQueue, a_iQueueLength, a_bFastPass, a_iPos, a_sRoom
  if windowExists("room_custom_load_wnd") then
    t_rWnd = getWindow("room_custom_load_wnd")
    if a_iPeopleInQueue > a_iQueueLength and not a_bFastPass then
      t_rWnd.getElement("nav.fastpass.button").setProperty(#visible, 1)
    else
      t_rWnd.getElement("nav.fastpass.button").setProperty(#visible, 0)
    end if
    t_rWnd.getElement("roomqueue.destination").setText(a_sRoom)
    t_rWnd.getElement("fastpass.queue").setText(a_iPos + 1)
  end if
end
on imageLoadCallback this, a_mpParams
  a_sMemname = a_mpParams[#url]
  a_iSlotNum = a_mpParams[#slot]
end
on fixAntialiasing me, t_sWindowTitle, tElemName, forceupdate, setText, bDebug
  tWndObj = getWindow(t_sWindowTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tElem.pParams.deleteProp(#ink)
      tElem.pParams.deleteProp(#color)
      tElem.pParams.deleteProp(#bgColor)
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.foreColor = 255
        tSprite.bgColor = tElem.pFontData[#bgColor]
        tSprite.ink = 36
      end if
      if not voidp(setText) then
        tElem.setText(setText)
      end if
      if forceupdate then
        tElem.render()
      end if
    end if
  end if
end