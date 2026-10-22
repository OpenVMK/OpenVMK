-- Script
property m_bReady
property m_bVisible
property m_rWindow
property m_kCurPage
property m_rCurPageObj
property m_sType
property m_mpItemList
property m_mpRoomData
property m_mp_CatalogData
property m_mp_RoomDataList
property m_iCurPageName
property m_mp_rPageObjects

on construct this
  m_bReady = 0
  m_bVisible = 0
  m_rWindow = VOID
  m_kCurPage = #closed
  m_rCurPageObj = VOID
  m_mpItemList = VOID
  m_sType = VOID
  m_mpRoomData = VOID
  m_mp_RoomDataList = VOID
  m_iCurPageName = #none
  m_mp_CatalogData = [:]
  m_mp_rPageObjects = [:]
  return 1
end
on deconstruct this
  if m_bReady then
    repeat with t_rPageObj in m_mp_rPageObjects
      removeObject(t_rPageObj.getID())
    end repeat
    m_mp_rPageObjects = [:]
    m_rCurPageObj = VOID
    if objectp(m_rWindow) then
      removeWindow(m_rWindow.getID())
      m_rWindow = VOID
    end if
  end if
  m_bReady = 0
  m_bVisible = 0
  return 1
end
on close this
  if m_bReady then
    m_bVisible = not m_rWindow.hide()
    return m_bVisible
  else
    return error(this, "Inventory not ready yet!", #close)
  end if
end
on FindPageToShowTab this, a_iSuperCat, a_iSubCat
  repeat with supercat in m_mp_CatalogData[1]
    repeat with i = 4 to supercat.count
      if supercat.getaProp(#id) = a_iSuperCat then
        if supercat[i].getaProp(#id) = a_iSubCat then
          t_sPageName = supercat.getPropAt(i)
          case t_sPageName of
            "Furniture":
              return #furniture
            "Pins":
              return #pins
            "Posters":
              return #posters
            "Specials!":
              return #specials
            "Tops", "Bottoms", "Shose", "Hats":
              return #clothes
            "GuestRooms":
              return #rooms

          end case
          return #furniture
        end if
      end if
    end repeat
  end repeat
  return VOID
end
on update this, a_mpItemList, a_kAlteredCategory, a_kDefaultPage, a_mpPageToShowItemList
  if a_kAlteredCategory = "index" then
    this.GetRooms(a_mpItemList)
  end if
  t_kDefaultPage = #clothes
  if not voidp(a_kDefaultPage) then
    t_kDefaultPage = a_kDefaultPage
  end if
  if a_kAlteredCategory <> "PageToShow" then
    m_mp_CatalogData = a_mpItemList
  else
    if not listp(m_mp_RoomDataList) then
      this.GetRooms(a_mpPageToShowItemList)
    end if
    m_mp_CatalogData = a_mpPageToShowItemList
    t_kPage = this.FindPageToShowTab(a_mpItemList[1], a_mpItemList[2])
    if voidp(t_kPage) then
      t_kDefaultPage = #clothes
    else
      t_kDefaultPage = t_kPage
    end if
  end if
  t_updatedPage = 0
  if voidp(m_rWindow) then
    t_sID = getUniqueID()
    if createWindow(t_sID) then
      m_rWindow = getWindow(t_sID)
      m_rWindow.registerClient(this.getID())
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseUp)
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseDown)
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
      if m_rWindow.merge("vmk_cat.window") then
        m_rWindow.center()
        if a_kAlteredCategory <> "PageToShow" then
          this._ChangePage(t_kDefaultPage)
        else
          this._ChangePage(t_kDefaultPage, "PageToShow", a_mpItemList)
        end if
        t_updatedPage = 1
      end if
    end if
  end if
  if not t_updatedPage then
    call(#update, [m_rCurPageObj], a_mpItemList, a_kAlteredCategory)
  end if
end
on GetWindowObj this
  return m_rWindow
end
on SaveRoomList this, a_mpRoomList
  m_mp_RoomDataList = a_mpRoomList
end
on _ChangePage this, a_kPage, a_sPageToShow, a_arExtra
  m_iCurPageName = a_kPage
  if objectp(m_rWindow) then
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.Purge(m_rWindow)
    end if
    case a_kPage of
      #furniture:
        t_rCls = ["CCatalogFurniView"]
        t_sTab = "furniture"
      #rooms:
        t_rCls = ["CCatalogRoomsView"]
        t_sTab = "rooms"
      #pins:
        t_rCls = ["CCatalogFurniView", "CCatalogPinsView"]
        t_sTab = "pins"
      #clothes:
        t_rCls = ["CCatalogClothesView"]
        t_sTab = "clothes"
      #posters:
        t_rCls = ["CCatalogFurniView"]
        t_sTab = "posters"
      #specials:
        t_rCls = ["CCatalogSpecialsView"]
        t_sTab = "specials"

    end case
    return error(this, "Unknown Catalog page!", #_ChangePage)
    m_rWindow.getElement("cat.tab.furniture.active").hide()
    m_rWindow.getElement("cat.tab.rooms.active").hide()
    m_rWindow.getElement("cat.tab.pins.active").hide()
    m_rWindow.getElement("cat.tab.clothes.active").hide()
    m_rWindow.getElement("cat.tab.posters.active").hide()
    m_rWindow.getElement("cat.tab.specials.active").hide()
    m_rWindow.getElement("cat.tab." & t_sTab & ".active").show()
    if m_mp_rPageObjects.getaProp(a_kPage) = VOID then
      m_rCurPageObj = createObject(getUniqueID(), t_rCls)
      m_rCurPageObj.SetCategory(t_sTab)
      m_mp_rPageObjects.setaProp(a_kPage, m_rCurPageObj)
    else
      m_rCurPageObj = m_mp_rPageObjects[a_kPage]
    end if
  end if
  if objectp(m_rCurPageObj) then
    m_kCurPage = a_kPage
    m_rCurPageObj.merge(m_rWindow)
    tCursors = [:]
    this.getRollOverCursors(m_rCurPageObj.m_rWndObj, tCursors)
    this.forceRollOverCursors(m_rCurPageObj.m_rWndObj, 4)
    if a_kPage = #rooms then
      m_rCurPageObj.SaveRooms(m_mp_RoomDataList)
      call(#update, [m_rCurPageObj], m_mp_CatalogData)
    else
      if voidp(a_sPageToShow) then
        m_rCurPageObj.m_iDefinedPageToShow = VOID
        call(#update, [m_rCurPageObj], m_mp_CatalogData)
      else
        call(#update, [m_rCurPageObj], a_arExtra, a_sPageToShow)
        call(#update, [m_rCurPageObj], m_mp_CatalogData)
      end if
    end if
    this.setRollOverCursors(m_rCurPageObj.m_rWndObj, tCursors)
    m_bReady = 1
  else
    m_kCurPage = #closed
    return error(this, "Failed to initialize inventory page!", #_ChangePage)
  end if
end
on getRollOverCursors me, a_rWindow, o_mp_iCursors
  repeat with i = 1 to a_rWindow.pElemList.count
    tName = a_rWindow.pElemList.getPropAt(i)
    tElem = a_rWindow.pElemList[i]
    o_mp_iCursors.addProp(tName, tElem.pSprite.cursor)
  end repeat
end
on setRollOverCursors me, a_rWindow, a_mp_iCursors
  repeat with i = 1 to a_rWindow.pElemList.count
    tElem = a_rWindow.pElemList[i]
    tCursor = a_mp_iCursors[i]
    tElem.pSprite.cursor = tCursor
  end repeat
end
on forceRollOverCursors me, a_rWindow, a_iCursor
  repeat with i = 1 to a_rWindow.pElemList.count
    tElem = a_rWindow.pElemList[i]
    tElem.pSprite.cursor = a_iCursor
  end repeat
end
on CloseCatalog this
  if objectp(m_rCurPageObj) then
    this.deconstruct()
  end if
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
    m_rWindow = VOID
  end if
end
on GetRooms this, a_mpItemList
  if listp(a_mpItemList) then
    if a_mpItemList.findPos("index") > 0 then
      repeat with i = 1 to a_mpItemList["index"].count
        if a_mpItemList["index"][i].id = 10 then
          t_mpRoomList = a_mpItemList["index"][i].Guestrooms
          exit repeat
        end if
      end repeat
    end if
  end if
  if not voidp(t_mpRoomList) then
    t_ID = t_mpRoomList.id
    getConnection(getVariable("main.connection.id", "VMK")).send(16, [#int: t_ID])
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "cat.tab.furniture.passive":
      if a_kEvent = #mouseDown then
        executeMessage("PlayInterfaceSound", "popup-tab-change")
        this._ChangePage(#furniture)
      end if
    "cat.tab.rooms.passive":
      if listp(m_mp_RoomDataList) then
        if a_kEvent = #mouseDown then
          this._ChangePage(#rooms)
          executeMessage("PlayInterfaceSound", "popup-tab-change")
        end if
      end if
    "cat.tab.pins.passive":
      if listp(m_mp_RoomDataList) then
        if a_kEvent = #mouseDown then
          this._ChangePage(#pins)
          executeMessage("PlayInterfaceSound", "popup-tab-change")
        end if
      end if
    "cat.tab.clothes.passive":
      if listp(m_mp_RoomDataList) then
        if a_kEvent = #mouseDown then
          this._ChangePage(#clothes)
          executeMessage("PlayInterfaceSound", "popup-tab-change")
        end if
      end if
    "cat.tab.posters.passive":
      if listp(m_mp_RoomDataList) then
        if a_kEvent = #mouseDown then
          this._ChangePage(#posters)
          executeMessage("PlayInterfaceSound", "popup-tab-change")
        end if
      end if
    "cat.tab.specials.passive":
      if listp(m_mp_RoomDataList) then
        if a_kEvent = #mouseDown then
          this._ChangePage(#specials)
          executeMessage("PlayInterfaceSound", "popup-tab-change")
        end if
      end if
    "close":
      if a_kEvent = #mouseUp then
        executeMessage("PlayInterfaceSound", "close-popup")
        getThread(#Catalog).interface.CloseCatalog()
      end if
    "help":
      if a_kEvent = #mouseDown then
        put m_iCurPageName
        case m_iCurPageName of
          #items:
            executeMessage(#open_help_page, "help.stuff.shopping")
          #rooms:
            executeMessage(#open_help_page, "help.stuff.shopping")
          otherwise:
            executeMessage(#open_help_page, "help.stuff.shopping")

        end case
      end if

  end case
  return call(#_EventProc, [m_rCurPageObj], a_kEvent, a_sElem, a_vParam)
end