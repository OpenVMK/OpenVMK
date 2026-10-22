-- Movie Script
property m_sWindowTitle
property m_sWindowResource
property m_page
property m_pItemlist
property m_selectedRoomData
property m_rRoomNameField
property m_rRoomDescField
property m_sRoomName
property m_sRoomDesc
property m_sSearchString
property m_ar_components
property m_sIconMickeyAndTicket

on construct me
  m_ar_components = [:]
  m_sWindowTitle = "Nav_GuestRooms"
  m_sWindowResource = "vmk_nav_guestrooms.window"
  m_page = #popular
  m_pItemlist = createObject(#random, "CGuestNavItemList")
  m_pItemlist.SetWidth(getMember("field.nav.active").image.width)
  m_pItemlist.SetMinimumHeight(164)
  m_pItemlist.render()
  m_selectedRoomData = [:]
  m_sRoomName = EMPTY
  m_sRoomDesc = EMPTY
  m_rRoomNameField = 0
  m_rRoomDescField = 0
  m_sSearchString = VOID
  tWidth = getMember("icon.fastpass").width + 2 + getMember("eventroom_icon").width
  tHeight = max(getMember("icon.fastpass").height, getMember("eventroom_icon").height)
  m_sIconMickeyAndTicket = "tempicon.mickeyandticket"
  if createMember(m_sIconMickeyAndTicket, #bitmap) then
    tImage = image(tWidth, tHeight, 32)
    tImage.useAlpha = 1
    tSrc = getMember("eventroom_icon").image
    tYOffs = (tHeight - tSrc.height) / 2
    tdestrect = rect(0, tYOffs, tSrc.width, tYOffs + tSrc.height)
    ReallyCopyPixels(tImage, tSrc, tdestrect, tSrc.rect)
    tSrc = getMember("icon.fastpass").image
    tYOffs = (tHeight - tSrc.height) / 2
    tXOffs = tWidth - tSrc.width
    tdestrect = rect(tXOffs, tYOffs, tWidth, tYOffs + tSrc.height)
    ReallyCopyPixels(tImage, tSrc, tdestrect, tSrc.rect)
    getMember(m_sIconMickeyAndTicket).image = tImage
  end if
  return 1
end
on deconstruct me
  if memberExists(m_sIconMickeyAndTicket) then
    removeMember(m_sIconMickeyAndTicket)
  end if
  removeObject(m_pItemlist.getID())
  return 1
end
on ReallyCopyPixels a_rDestImg, a_rSrcImg, a_rectDest, a_rectSrc
  tAlphaSrc = a_rSrcImg.extractAlpha()
  tAlphaDest = a_rSrcImg.extractAlpha()
  a_rDestImg.copyPixels(a_rSrcImg, a_rectDest, a_rectSrc)
  tAlphaDest.copyPixels(tAlphaSrc, a_rectDest, a_rectSrc)
  a_rDestImg.setAlpha(tAlphaDest)
  a_rDestImg.useAlpha = 1
end
on showHide me
  if windowExists(m_sWindowTitle) then
    tWndObj = getWindow(m_sWindowTitle)
    if tWndObj.getProperty(#visible) then
      tWndObj.hide()
    else
      tWndObj.show()
      me.SetTabs()
      me.GetContent()
    end if
  else
    createWindow(m_sWindowTitle, m_sWindowResource, 0, 0, #modal)
    tWndObj = getWindow(m_sWindowTitle)
    tWndObj.registerClient(me.getID())
    tWndObj.registerProcedure(#eventProcGuestRooms, me.getID(), #mouseUp)
    me.SetTabs()
    me.SetVisibleElements()
    me.GetContent()
  end if
end
on ChangePage me, a_newPage
  m_page = a_newPage
  me.SetTabs()
  me.SetVisibleElements()
  me.GetContent()
  if m_page = #popular then
    receiveUpdate(me.getID())
  else
    removeUpdate(me.getID())
  end if
end
on SetTabs me
  tWndObj = getWindow(m_sWindowTitle)
  case m_page of
    #popular:
      tWndObj.getElement("nav.tab.popguestrooms.active").show()
      tWndObj.getElement("nav.tab.friendsrooms.active").hide()
      tWndObj.getElement("nav.tab.ownrooms.active").hide()
    #friends:
      tWndObj.getElement("nav.tab.popguestrooms.active").hide()
      tWndObj.getElement("nav.tab.friendsrooms.active").show()
      tWndObj.getElement("nav.tab.ownrooms.active").hide()
    #own:
      tWndObj.getElement("nav.tab.popguestrooms.active").hide()
      tWndObj.getElement("nav.tab.friendsrooms.active").hide()
      tWndObj.getElement("nav.tab.ownrooms.active").show()

  end case
end
on GetContent me
  case m_page of
    #popular:
      getConnection(getVariable("main.connection.id", "VMK")).send(29)
    #friends:
      getConnection(getVariable("main.connection.id", "VMK")).send(27)
    #own:
      getConnection(getVariable("main.connection.id", "VMK")).send(24)

  end case
end
on createComponentWindow me, a_mpSpaceList, a_bAppend
  tWndObj = getWindow(m_sWindowTitle)
  if windowExists(m_sWindowTitle) then
    t_ar_componentsPage = ["nav.roomlist": ["component.guestroomnavi.roomlist.title.xml", "component.guestroomnavi.roomlist.xml"]]
    repeat with i = 1 to t_ar_componentsPage.count
      t_sElemName = t_ar_componentsPage.getPropAt(i)
      t_ar_components = t_ar_componentsPage[i]
      t_rClientElement = tWndObj.getElement(t_sElemName)
      if not a_bAppend then
        t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
        t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
        t_rComponentsPage.setColor(rgb("#001F56"))
        t_rComponent = t_rComponentsPage.addComponent(t_ar_components[1])
        t_rComponent.setClickable(0)
      else
        t_rComponentsPage = m_ar_components[t_sElemName]
      end if
      repeat with j = 1 to a_mpSpaceList.count
        t_clrText = rgb(250, 250, 250)
        if not a_mpSpaceList[j]["AccesFromNavi"] then
          t_clrText = rgb(250, 10, 50)
        else
          case a_mpSpaceList[j]["friendOnly"] of
            1:
              t_clrText = rgb("#99EE3C")
            2:
              t_clrText = rgb("#FFFF25")
            3:
              t_clrText = rgb("#FF6CFF")

          end case
        end if
        t_iQueue = a_mpSpaceList[j]["UserCount"] - a_mpSpaceList[j]["MaxUsers"]
        tFeatured = not voidp(a_mpSpaceList[j].getaProp("Featured"))
        tFastPass = a_mpSpaceList[j]["friendOnly"] = 2 or a_mpSpaceList[j]["friendOnly"] = 3
        t_rComponent = t_rComponentsPage.addComponent(t_ar_components[2])
        if tFastPass and not tFeatured then
          t_rComponent.GetLayout(1).setIcon("icon.fastpass")
        else
          if not tFastPass and tFeatured then
            t_rComponent.GetLayout(1).setIcon("eventroom_icon")
          else
            if tFastPass and tFeatured then
              t_rComponent.GetLayout(1).setIcon(m_sIconMickeyAndTicket)
            end if
          end if
        end if
        if t_iQueue > 0 then
          t_rComponent.GetLayout(2).setText(string(a_mpSpaceList[j]["MaxUsers"]))
          t_rComponent.GetLayout(3).setText(string(t_iQueue))
        else
          t_rComponent.GetLayout(2).setText(string(a_mpSpaceList[j]["UserCount"]))
          t_rComponent.GetLayout(3).setText("-")
        end if
        t_rComponent.GetLayout(1).setText(a_mpSpaceList[j]["Name"])
        t_rComponent.GetLayout(1).setNode(a_mpSpaceList[j])
        t_rComponent.GetLayout(2).setNode(a_mpSpaceList[j])
        t_rComponent.GetLayout(3).setNode(a_mpSpaceList[j])
        t_rComponent.GetLayout(1).SetTextColor(t_clrText)
        t_rComponent.GetLayout(2).SetTextColor(t_clrText)
        t_rComponent.GetLayout(3).SetTextColor(t_clrText)
      end repeat
      t_rImg = t_rComponentsPage.render()
      t_rClientElement.feedImage(t_rImg)
      m_ar_components[t_sElemName] = t_rComponentsPage
    end repeat
    if not a_bAppend then
      m_selectedRoomData = [:]
      getWindow(m_sWindowTitle).getElement("nav.roominfo.owner").setText(EMPTY)
      getWindow(m_sWindowTitle).getElement("nav.roominfo.description").setText(EMPTY)
      me.clearPopulation()
      me.setButtonState("nav.modifyroom.button", 0)
      me.setButtonState("nav.gotoroom.button", 0)
      me.setButtonState("nav.deleteroom.button", 0)
    end if
  end if
end
on createComponentWindowWithFeatures me, a_mpSpaceListFeat, a_mpSpaceList
  me.createComponentWindow(a_mpSpaceListFeat, VOID)
  me.createComponentWindow(a_mpSpaceList, 1)
end
on setButtonState me, t_elemName, t_state
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement(t_elemName)
    if t_Elem <> 0 then
      case t_state of
        1:
          t_Elem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_Elem.Activate()
        0:
          t_Elem.setProperty(#cursor, #arrow)
          t_Elem.deactivate()

      end case
    end if
  end if
end
on SetVisibleElements me
  tWndObj = getWindow(m_sWindowTitle)
  tWndObj.getElement("nav.roominfo.owner").setText(EMPTY)
  tWndObj.getElement("nav.roominfo.description").setText(EMPTY)
  me.clearPopulation()
  case m_page of
    #popular:
      tWndObj.getElement("nav.roomsearch.field").show()
      tWndObj.getElement("nav.searchfield.bg").show()
      tWndObj.getElement("nav.searchrooms.button").show()
      tWndObj.getElement("nav.deleteroom.button").hide()
      me.setButtonState("nav.gotoroom.button", 0)
      me.setButtonState("nav.modifyroom.button", 0)
    #friends:
      tWndObj.getElement("nav.roomsearch.field").hide()
      tWndObj.getElement("nav.searchfield.bg").hide()
      tWndObj.getElement("nav.searchrooms.button").hide()
      tWndObj.getElement("nav.deleteroom.button").hide()
      me.setButtonState("nav.gotoroom.button", 0)
      me.setButtonState("nav.modifyroom.button", 0)
    #own:
      tWndObj.getElement("nav.roomsearch.field").hide()
      tWndObj.getElement("nav.searchfield.bg").hide()
      tWndObj.getElement("nav.searchrooms.button").hide()
      tWndObj.getElement("nav.deleteroom.button").show()
      me.setButtonState("nav.gotoroom.button", 0)
      me.setButtonState("nav.modifyroom.button", 0)

  end case
  t_rElement = tWndObj.getElement("nav.roomlist")
  if t_rElement <> 0 then
    tRect = t_rElement.getProperty(#rect)
    t_rTmp = image(tRect.width, tRect.height, 32)
    t_rTmp.fill(t_rTmp.rect, [#shapeType: #rect, #color: rgb("#001F55")])
    t_rElement.feedImage(t_rTmp)
  end if
end
on SearchRooms me, a_sText
  if a_sText.length < 3 then
    exit
  end if
  if getObject(#session).exists("permissions") then
    t_iPos = getObject(#session).get("permissions").findPos("10")
  end if
  if t_iPos > 0 then
    m_sSearchString = a_sText
    t = createDialogWindow(me.getID(), "SearchAllRooms", 2, 1)
    t.show()
    t.setText(getText("nav.search.all.rooms"), getText("mods.alert"), getText("nav.allrooms.no"), getText("nav.allrooms.yes"))
  else
    getConnection(getVariable("main.connection.id", "VMK")).send(28, [#string: a_sText])
  end if
end
on GetSelectedRoomID me
  if m_selectedRoomData.count > 0 then
    return m_selectedRoomData["ID"]
  end if
  return -1
end
on eventProcGuestRooms me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sWindowTitle)
      "help":
        getWindow(m_sWindowTitle).setProperty(#modal, 0)
        executeMessage(#open_help_page, "help.navigation.navigator")
      "nav.tab.popguestrooms.passive":
        me.ChangePage(#popular)
      "nav.tab.friendsrooms.passive":
        me.ChangePage(#friends)
      "nav.tab.ownrooms.passive":
        me.ChangePage(#own)
      "nav.searchrooms.button":
        me.SearchRooms(getWindow(m_sWindowTitle).getElement("nav.roomsearch.field").getText())
      "nav.gotoroom.button":
        tSelectedRoomID = me.GetSelectedRoomID()
        if tSelectedRoomID <> -1 then
          getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: tSelectedRoomID, #integer: -1])
        end if
        executeMessage("ui_navigator")
        removeWindow(m_sWindowTitle)
      "nav.modifyroom.button":
        tSelectedRoomID = me.GetSelectedRoomID()
        if tSelectedRoomID <> -1 then
          m_sRoomName = m_selectedRoomData["Name"]
          m_sRoomDesc = m_selectedRoomData["Description"]
          me.CreateRoomNameWindow()
        end if
      "nav.deleteroom.button":
        tContext = getThread("room").component._AccessRoom()
        if voidp(tContext) then
          t = createDialogWindow(me.getID(), "RoomSellNotAvailable", 1, 1)
          t.show()
          t.setText(getText("nav.sellnotavailable.desc"), getText("nav.sellnotavailable.title"), getText("nav.sellnotavailable.ok"))
        end if
        tSelectedRoomID = me.GetSelectedRoomID()
        if tSelectedRoomID <> -1 then
          getConnection(getVariable("main.connection.id", "VMK")).send("SellRoom", [#integer: tSelectedRoomID, #integer: 0])
        end if
      "nav.roomlist":
        t_mpEvent = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        executeMessage("PlayInterfaceSound", "UI-click")
        m_ar_components[tElemID].EventProc(tParm, t_mpEvent)
        if objectp(t_mpEvent[#client]) then
          t_Selected = t_mpEvent[#client].GetNode()
          if not voidp(t_Selected) then
            m_selectedRoomData = t_Selected
            getWindow(m_sWindowTitle).getElement("nav.roominfo.owner").setText(m_selectedRoomData["Owner"])
            getWindow(m_sWindowTitle).getElement("nav.roominfo.description").setText(m_selectedRoomData["Description"])
            me.showPopulation()
            me.setButtonState("nav.gotoroom.button", 1)
            case m_page of
              #own:
                me.setButtonState("nav.modifyroom.button", 1)
                me.setButtonState("nav.deleteroom.button", 1)

            end case
          else
            m_selectedRoomData = [:]
            getWindow(m_sWindowTitle).getElement("nav.roominfo.owner").setText(EMPTY)
            getWindow(m_sWindowTitle).getElement("nav.roominfo.description").setText(EMPTY)
            me.clearPopulation()
            me.setButtonState("nav.modifyroom.button", 0)
            me.setButtonState("nav.gotoroom.button", 0)
            me.setButtonState("nav.deleteroom.button", 0)
          end if
        end if
        t_rClientElement = getWindow(m_sWindowTitle).getElement(tElemID)
        t_rImg = m_ar_components[tElemID].render()
        t_rClientElement.feedImage(t_rImg)

    end case
  end if
end
on clearPopulation me
  tWnd = getWindow(m_sWindowTitle)
  if tWnd <> 0 then
    repeat with i = 1 to 3
      tElem = tWnd.getElement("nav.roominfo.population" & i)
      if tElem <> 0 then
        tElem.clearImage()
      end if
    end repeat
  end if
end
on showPopulation me
  me.clearPopulation()
  tMem = getmemnum("roomspace.indicator")
  if integerp(m_selectedRoomData["UserCount"]) then
    t_iPercent = m_selectedRoomData["UserCount"]
    t_iCount = 0
    if t_iPercent > 0 and t_iPercent <= 50 then
      t_iCount = 1
    else
      if t_iPercent > 50 and t_iPercent < 100 then
        t_iCount = 2
      else
        if t_iPercent >= 100 then
          t_iCount = 3
          if t_iPercent >= 120 then
            tMem = getmemnum("roomspace.indicator.full")
          end if
        end if
      end if
    end if
  else
    t_iCount = 0
  end if
  tWnd = getWindow(m_sWindowTitle)
  if tWnd <> 0 then
    if tMem <> 0 then
      tImg = member(tMem).image
      tVisibleMickeys = 3
      repeat with i = 1 to t_iCount
        tElem = tWnd.getElement("nav.roominfo.population" & i)
        if tElem <> 0 then
          tElem.feedImage(tImg)
        end if
      end repeat
    end if
  end if
end
on CreateRoomNameWindow this
  t_sWndName = "RoomNameWnd"
  if not createWindow(t_sWndName, "vmk_modal.window", 0, 0, #modal) then
    return error(this, "Failed to create room name window!!!", #CreateRoomNameWindow)
  else
    t_rWindow = getWindow(t_sWndName)
    t_rWindow.merge("vmk_edit_roominfo.window")
    t_rWindow.registerClient(this.getID())
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseDown)
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #keyUp)
    tElem = t_rWindow.getElement("basic.window.title")
    if tElem <> 0 then
      tElem.setText(getText("edit.rooms.title"))
    end if
    t_nameField = t_rWindow.getElement("reg.roomname.input")
    t_nameField.setText(m_sRoomName)
    t_DescField = t_rWindow.getElement("reg.roomdescription.input")
    t_DescField.setText(m_sRoomDesc)
  end if
  m_rRoomNameField = CreateCannedField(t_sWndName, "reg.roomname.input")
  m_rRoomDescField = CreateCannedField(t_sWndName, "reg.roomdescription.input")
end
on CreateRoomCreatedWindow this, a_mp_RoomData
  m_iMyRoomID = a_mp_RoomData.id
  t_sWndName = "RoomNameWnd"
  if not createWindow(t_sWndName, "vmk_modal.window", 0, 0, #modal) then
    return error(this, "Failed to create room name window!!!", #CreateRoomCreatedWindow)
  else
    t_rWindow = getWindow(t_sWndName)
    t_rWindow.merge("vmk_cat_rooms_step2.window")
    t_rWindow.registerClient(this.getID())
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseDown)
    t_rWindow.getElement("cat.createroom.name").setText(m_sRoomName)
    t_rWindow.getElement("cat.roomdescription.text").setText(m_sRoomDesc)
    t_sName = getObject(#session).get("name")
    t_rWindow.getElement("cat.username").setText(t_sName)
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  t_rWindow = getWindow("RoomNameWnd")
  if a_kEvent = #mouseDown then
    case a_sElem of
      "edit.cancel.button":
        t_rWindow.close()
      "cat.rooms.nextstep.button":
        this._NextStep()
      "cat.rooms.goto.button":
        this._GoToNewRoom()

    end case
  end if
  if a_kEvent = #keyDown then
    t_rWindow = getWindow("RoomNameWnd")
    if a_sElem = "reg.roomname.input" then
      case the keyCode of
        123, 124, 125, 126:
          m_rRoomNameField.updateContent()
          pass()
        117, 51:
          m_rRoomNameField.updateContent()
          pass()
        36:
          t_pass = m_rRoomNameField.CheckContent()
          if t_pass then
            m_bRoomNAmeOK = 1
          end if
          return 1
        49:
          tElem = t_rWindow.getElement(a_sElem)
          tSelection = tElem.pMember.selection
          tCharcount = tElem.pMember.text.char.count
          if tCharcount > 0 then
            if tElem.pMember.text.char[tSelection[2]] = " " then
              return 1
            end if
            if tSelection[2] + 1 <= tCharcount then
              if tElem.pMember.text.char[tSelection[2] + 1] = " " then
                return 1
              end if
            end if
          end if
          t_pass = m_rRoomNameField.CheckContent()
          if t_pass then
            m_rRoomNameField.updateContent()
          end if
        otherwise:
          if not m_rRoomNameField.updateContent() then
            return 1
          end if
          tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\#;" & QUOTE
          tAscii = charToNum(the key)
          t_allow = 0
          if tAscii > 31 and tAscii < 128 then
            if tValidKeys contains the key or tValidKeys = EMPTY then
              t_allow = 1
            end if
          end if
          if not t_allow then
            return 1
          end if

      end case
      t_iMaxlength = 30
      tElem = t_rWindow.getElement(a_sElem)
      if tElem <> 0 then
        if tElem.pMember.text.char.count >= t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.roomname.toolong")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        end if
      end if
    end if
    if a_sElem = "reg.roomdescription.input" then
      case the keyCode of
        123, 124, 125, 126:
          m_rRoomDescField.updateContent()
          pass()
        117, 51:
          m_rRoomDescField.updateContent()
          pass()
        36:
          t_pass = m_rRoomDescField.CheckContent()
          if t_pass then
            m_bRoomDescOK = 1
          end if
          return 1
        49:
          tElem = t_rWindow.getElement(a_sElem)
          tSelection = tElem.pMember.selection
          tCharcount = tElem.pMember.text.char.count
          if tCharcount > 0 then
            if tElem.pMember.text.char[tSelection[2]] = " " then
              return 1
            end if
            if tSelection[2] + 1 <= tCharcount then
              if tElem.pMember.text.char[tSelection[2] + 1] = " " then
                return 1
              end if
            end if
          end if
          t_pass = m_rRoomDescField.CheckContent()
          if t_pass then
            m_rRoomDescField.updateContent()
          end if
        otherwise:
          if not m_rRoomDescField.updateContent() then
            return 1
          end if
          tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\#;" & QUOTE
          tAscii = charToNum(the key)
          t_allow = 0
          if tAscii > 31 and tAscii < 128 then
            if tValidKeys contains the key or tValidKeys = EMPTY then
              t_allow = 1
            end if
          end if
          if not t_allow then
            return 1
          end if

      end case
      t_iMaxlength = 255
      tElem = t_rWindow.getElement(a_sElem)
      if tElem <> 0 then
        if tElem.pMember.text.char.count >= t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.roomdesc.toolong")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        end if
      end if
    end if
  else
    if a_kEvent = #keyUp then
      if a_sElem = "reg.roomname.input" then
        if m_rRoomNameField <> 0 then
          case the keyCode of
            36, 49:
            otherwise:
              m_rRoomNameField.CheckWord()

          end case
        end if
      end if
      if a_sElem = "reg.roomdescription.input" then
        if m_rRoomDescField <> 0 then
          case the keyCode of
            36, 49:
            otherwise:
              m_rRoomDescField.CheckWord()

          end case
        end if
      end if
    end if
  end if
end
on _NextStep this
  t_error = 0
  t_sWndName = "RoomNameWnd"
  m_bRoomNAmeOK = m_rRoomNameField.CheckContent()
  m_bRoomDescOK = m_rRoomDescField.CheckContent()
  m_rDialogWindow = createDialogWindow(this.getID(), "RoomCreationError", 1, 1)
  if not m_bRoomNAmeOK then
    t_sTxt = getText("cat.check.name")
    m_rDialogWindow.show()
    m_rDialogWindow.setText(t_sTxt, "Room Creation Error", "OK")
  end if
  if not m_bRoomDescOK then
    t_sTxt = getText("cat.check.desc")
    m_rDialogWindow.show()
    m_rDialogWindow.setText(t_sTxt, "Room Creation Error", "OK")
  end if
  if m_bRoomNAmeOK and m_bRoomDescOK then
    t_rWindow = getWindow(t_sWndName)
    t_rElementName = t_rWindow.getElement("reg.roomname.input")
    t_rElementDesc = t_rWindow.getElement("reg.roomdescription.input")
    m_sRoomName = t_rElementName.getText()
    m_sRoomDesc = t_rElementDesc.getText()
    t_RoomNameCanned = m_rRoomNameField.GetContent()
    t_RoomDescCanned = m_rRoomDescField.GetContent()
    this.SendEditRoomInfo(t_RoomNameCanned, t_RoomDescCanned)
    t_rWindow.close()
  end if
  this.GetContent()
end
on SendEditRoomInfo me, t_ar_roomName, t_ar_roomDesc
  tMsg = [#int: me.GetSelectedRoomID()]
  tCannedBlock = TransformCannedToMsg(t_ar_roomName)
  tMsg.addProp(#int, t_ar_roomName.count)
  repeat with i = 1 to tCannedBlock.count
    tKey = tCannedBlock.getPropAt(i)
    tvalue = tCannedBlock[i]
    tMsg.addProp(tKey, tvalue)
  end repeat
  tCannedBlock = TransformCannedToMsg(t_ar_roomDesc)
  tMsg.addProp(#int, t_ar_roomDesc.count)
  repeat with i = 1 to tCannedBlock.count
    tKey = tCannedBlock.getPropAt(i)
    tvalue = tCannedBlock[i]
    tMsg.addProp(tKey, tvalue)
  end repeat
  getConnection("VMK").send(37, tMsg)
  createTimeout(#update_own_rooms_once, 1000, #updateOwnRoomInfo, me.getID(), VOID, 1)
  return 1
end
on updateOwnRoomInfo me
  getConnection(getVariable("main.connection.id", "VMK")).send(24)
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent
  if t_dialogName = "SearchAllRooms" then
    if not voidp(m_sSearchString) then
      if t_dialogEvent = #dialogCancel then
        getConnection(getVariable("main.connection.id", "VMK")).send(28, [#string: m_sSearchString])
      else
        getConnection(getVariable("main.connection.id", "VMK")).send(38, [#string: m_sSearchString])
      end if
    end if
  else
    removeDialogWindow("RoomCreationError")
  end if
end
on update this
  if keyPressed(BACKSPACE) then
    if windowExists(m_sWindowTitle) then
      t_rWndObj = getWindow(m_sWindowTitle)
      t_rElement = t_rWndObj.getElement("nav.roomsearch.field")
      if objectp(t_rElement) then
        if the keyboardFocusSprite = t_rElement.getProperty(#sprite).spriteNum then
          if (the environment).productVersion = "10.2" then
            if (the environment).productBuildVersion = "21" then
              t_rTextField = t_rElement.getProperty(#sprite).member
              t_sText = t_rTextField.text
              delete char -30000 of t_sText
              t_rTextField.text = t_sText
            end if
          end if
        end if
      end if
    end if
  end if
end