-- Parent Script
property m_sWindowTitle
property m_sWindowResource
property m_pItemlist
property m_selectedRoomData
property m_rRoomNameField
property m_rRoomDescField
property m_sRoomName
property m_sRoomDesc
property m_ar_components

on construct me
  m_ar_components = [:]
  m_sWindowTitle = "Nav_Themed_GuestRooms"
  m_sWindowResource = "vmk_nav_theme_guestrooms.window"
  m_pItemlist = createObject(#random, "CGuestNavItemList")
  m_pItemlist.SetWidth(getMember("field.nav.active").image.width)
  m_pItemlist.SetMinimumHeight(164)
  m_pItemlist.render()
  m_selectedRoomData = [:]
  m_sRoomName = EMPTY
  m_sRoomDesc = EMPTY
  m_rRoomNameField = 0
  m_rRoomDescField = 0
  return 1
end
on deconstruct me
  removeObject(m_pItemlist.getID())
  return 1
end
on showHide me
  if windowExists(m_sWindowTitle) then
    tWndObj = getWindow(m_sWindowTitle)
    if tWndObj.getProperty(#visible) then
      tWndObj.hide()
    else
      tWndObj.show()
      me.GetContent()
    end if
  else
    createWindow(m_sWindowTitle, m_sWindowResource, 0, 0, #modal)
    tWndObj = getWindow(m_sWindowTitle)
    tWndObj.registerClient(me.getID())
    tWndObj.registerProcedure(#eventProcGuestRooms, me.getID(), #mouseUp)
    me.SetVisibleElements()
    me.GetContent()
  end if
end
on IsVisible me
  if windowExists(m_sWindowTitle) then
    tWndObj = getWindow(m_sWindowTitle)
    return tWndObj.getProperty(#visible)
  else
    return 0
  end if
end
on GetContent me
end
on SetRoom me, a_iRoomCode
  t_sRoomName = getText("ROOM." & a_iRoomCode & ".NAME")
  tWndObj = getWindow(m_sWindowTitle)
  if objectp(tWndObj) then
    tText = getText("nav.themedguestroom.heading.1") && t_sRoomName && getText("nav.themedguestroom.heading.2")
    tWndObj.getElement("nav.themeguestrooms.hd").setText(tText)
  end if
end
on SetList me, a_mp_spaceList
  tWndObj = getWindow(m_sWindowTitle)
  m_pItemlist.createTopics(a_mp_spaceList)
  if tWndObj <> 0 then
    t_rImg = m_pItemlist.getImage()
    t_rBuffer = tWndObj.getElement("nav.roomlist")
    t_ielemHeight = t_rBuffer.getProperty(#height)
    if t_rImg.height < t_ielemHeight then
      t_rTmp = image(t_rImg.width, t_ielemHeight, t_rImg.depth)
      t_rTmp.fill(t_rTmp.rect, rgb("#001F55"))
      t_rTmp.copyPixels(t_rImg, t_rImg.rect, t_rImg.rect)
      t_rBuffer.feedImage(t_rTmp)
    else
      t_rBuffer.feedImage(t_rImg)
    end if
  end if
end
on createComponentWindow me, a_mpSpaceList
  t_ar_componentsPage = ["nav.roomlist": ["component.guestroomnavi.roomlist.title.xml", "component.guestroomnavi.roomlist.xml"]]
  tWndObj = getWindow(m_sWindowTitle)
  if windowExists(m_sWindowTitle) then
    repeat with i = 1 to t_ar_componentsPage.count
      t_sElemName = t_ar_componentsPage.getPropAt(i)
      t_ar_components = t_ar_componentsPage[i]
      t_rClientElement = tWndObj.getElement(t_sElemName)
      t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
      t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
      t_rComponentsPage.setColor(rgb("#001F56"))
      t_rComponent = t_rComponentsPage.addComponent(t_ar_components[1])
      t_rComponent.setClickable(0)
      repeat with j = 1 to a_mpSpaceList.count
        t_rComponent = t_rComponentsPage.addComponent(t_ar_components[2])
        t_rComponent.GetLayout(1).setText(a_mpSpaceList[j]["Name"])
        if a_mpSpaceList[j]["friendOnly"] = 2 or a_mpSpaceList[j]["friendOnly"] = 3 then
          t_rComponent.GetLayout(1).setIcon("icon.fastpass")
        end if
        t_iQueue = a_mpSpaceList[j]["UserCount"] - a_mpSpaceList[j]["MaxUsers"]
        if t_iQueue > 0 then
          t_rComponent.GetLayout(2).setText(string(a_mpSpaceList[j]["MaxUsers"]))
          t_rComponent.GetLayout(3).setText(string(t_iQueue))
        else
          t_rComponent.GetLayout(2).setText(string(a_mpSpaceList[j]["UserCount"]))
          t_rComponent.GetLayout(3).setText("-")
        end if
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
  end if
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
  me.setButtonState("nav.modifyroom.button", 0)
  me.setButtonState("nav.gotoroom.button", 0)
  t_rElement = tWndObj.getElement("nav.roomlist")
  if t_rElement <> 0 then
    tRect = t_rElement.getProperty(#rect)
    t_rTmp = image(tRect.width, tRect.height, 32)
    t_rTmp.fill(t_rTmp.rect, [#shapeType: #rect, #color: rgb("#001F55")])
    t_rElement.feedImage(t_rTmp)
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
      "nav.gotoroom.button":
        tSelectedRoomID = me.GetSelectedRoomID()
        if tSelectedRoomID <> -1 then
          getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: tSelectedRoomID, #integer: -1])
        end if
        removeWindow(m_sWindowTitle)
      "nav.modifyroom.button":
        tSelectedRoomID = me.GetSelectedRoomID()
        if tSelectedRoomID <> -1 then
          m_sRoomName = m_selectedRoomData["Name"]
          m_sRoomDesc = m_selectedRoomData["Description"]
          me.CreateRoomNameWindow()
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
          end if
        else
          m_selectedRoomData = [:]
          getWindow(m_sWindowTitle).getElement("nav.roominfo.owner").setText(EMPTY)
          getWindow(m_sWindowTitle).getElement("nav.roominfo.description").setText(EMPTY)
          me.clearPopulation()
          me.setButtonState("nav.modifyroom.button", 0)
          me.setButtonState("nav.gotoroom.button", 0)
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
end