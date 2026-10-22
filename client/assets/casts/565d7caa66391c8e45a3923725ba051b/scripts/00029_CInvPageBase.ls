-- Movie Script
property m_bReady
property m_bLoaded
property m_bVisible
property m_rWindow
property m_rCurPageObj
property m_mp_kType_mp_iRef_rItem
property m_kCurPageName

on construct this
  registerMessage("teleport_selected", this.getID(), #TeleportSelected)
  registerMessage("teleport_unselected", this.getID(), #TeleportUnSelected)
  m_bReady = 0
  m_bLoaded = 0
  m_bVisible = 0
  m_rWindow = VOID
  m_rCurPageObj = VOID
  m_kCurPageName = #none
  m_mp_kType_mp_iRef_rItem = [:]
  m_mp_kType_mp_iRef_rItem[#items] = [:]
  m_mp_kType_mp_iRef_rItem[#pins] = [:]
  m_mp_kType_mp_iRef_rItem[#clothes] = [:]
  m_mp_kType_mp_iRef_rItem[#posters] = [:]
  return 1
end
on deconstruct this
  unregisterMessage("teleport_selected", this.getID(), #TeleportSelected)
  unregisterMessage("teleport_unselected", this.getID(), #TeleportUnSelected)
  if m_bReady then
    unregisterMessage(#ui_inventory, this.getID())
    unregisterMessage("room_leave", this.getID())
    unregisterMessage("hide_inventory", this.getID())
    unregisterMessage("show_inventory", this.getID())
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.Purge(m_rWindow)
      removeObject(m_rCurPageObj.getID())
      m_rCurPageObj = VOID
    end if
    if objectp(m_rWindow) then
      removeWindow(m_rWindow.getID())
      m_rWindow = VOID
    end if
  end if
  getThread("inventory").component.GetInventory(1).UnregisterItemListCallback(this, #update)
  m_bReady = 0
  m_bLoaded = 0
  m_bVisible = 0
  return 1
end
on open this
  if getThread("inventory").getComponent().getInventoryLoaded() then
    m_bLoaded = 1
  else
    getThread("inventory").component._LoadInventory()
  end if
  if m_bReady then
    m_rWindow.show()
    m_bVisible = 1
  else
    m_bVisible = 0
    error(this, "Failed to open inventory page!", #open)
  end if
  case m_kCurPageName of
    #credits:
      m_rCurPageObj.update(getThread("inventory").component.m_iCredits, #credits)
    #items:
      m_rCurPageObj.checkTeleporterSelection()
    #posters:
    #pins:
    #clothes:
    #code:
      m_rCurPageObj.open()

  end case
  return m_bVisible
end
on close this
  if m_bReady then
    m_rWindow.hide()
    m_bVisible = 0
    return m_bVisible
  else
    m_bVisible = 0
    return error(this, "Inventory not ready yet!", #close)
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
  if not m_bReady then
    t_sID = getUniqueID()
    if createWindow(t_sID) then
      m_rWindow = getWindow(t_sID)
      m_rWindow.registerClient(this.getID())
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseUp)
      if m_rWindow.merge("vmk_inv.window") then
        m_rWindow.center()
        m_bReady = 1
        m_bVisible = 1
        this._ChangePage(#pins)
      else
        return error(this, "Failed to open inventory page!", #update)
      end if
    end if
    registerMessage(#ui_inventory, this.getID(), #_ShowHideUI)
    registerMessage("room_leave", this.getID(), #close)
    registerMessage("hide_inventory", this.getID(), #close)
    registerMessage("show_inventory", this.getID(), #open)
  end if
  m_rCurPageObj.update(m_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
end
on GetSelected this
  if objectp(m_rCurPageObj) then
    return m_rCurPageObj.GetSelected()
  else
    return [#ref: -1, #code: -1, #state: #invalid]
  end if
end
on _ShowHideUI this
  if m_bVisible then
    this.close()
  else
    this.open()
    if objectp(m_rWindow) then
      m_rWindow.BringUpFront()
    end if
  end if
end
on _ChangePage this, a_kPage
  m_kCurPageName = a_kPage
  if objectp(m_rWindow) then
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.Purge(m_rWindow)
      removeObject(m_rCurPageObj.getID())
    end if
    t_ar_kCategories = [a_kPage]
    case a_kPage of
      #credits:
        t_sCls = GetClsVariable("inv.class.credits")
        t_sTab = "credits"
      #items:
        t_sCls = GetClsVariable("inv.class.items")
        t_sTab = "furniture"
      #posters:
        t_sCls = GetClsVariable("inv.class.posters")
        t_sTab = "posters"
      #pins:
        t_sCls = GetClsVariable("inv.class.pins")
        t_sTab = "pins"
      #clothes:
        t_sCls = GetClsVariable("inv.class.clothes")
        t_sTab = "clothes"
      #code:
        t_sCls = GetClsVariable("inv.class.code")
        t_sTab = "codes"

    end case
    return error(this, "Unknown inventory page!", #_ChangePage)
    m_rWindow.getElement("inv.tab.credits.active").hide()
    m_rWindow.getElement("inv.tab.furniture.active").hide()
    m_rWindow.getElement("inv.tab.posters.active").hide()
    m_rWindow.getElement("inv.tab.pins.active").hide()
    m_rWindow.getElement("inv.tab.clothes.active").hide()
    m_rWindow.getElement("inv.tab.codes.active").hide()
    m_rWindow.getElement("inv.tab." & t_sTab & ".active").show()
    m_rCurPageObj = createObject(getUniqueID(), t_sCls)
    t_ar_iCursors = [:]
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.merge(m_rWindow)
      this.getRollOverCursors(m_rCurPageObj.m_rWindow, t_ar_iCursors)
      this.forceRollOverCursors(m_rCurPageObj.m_rWindow, 4)
      if a_kPage <> #credits then
        repeat with t_kCategory in t_ar_kCategories
          m_rCurPageObj.update(m_mp_kType_mp_iRef_rItem, t_kCategory)
        end repeat
      else
        m_rCurPageObj.update(getThread("inventory").component.m_iCredits, #credits)
      end if
      this.setRollOverCursors(m_rCurPageObj.m_rWindow, t_ar_iCursors)
    else
      return error(this, "Failed to initialize inventory page!", #_ChangePage)
    end if
    case m_kCurPageName of
      #credits:
      #items:
      #posters:
      #pins:
      #clothes:
      #code:
        m_rCurPageObj.open()

    end case
  end if
end
on getRollOverCursors this, a_rWindow, a_mp_sElem_iCursors
  t_iCount = a_rWindow.pElemList.count
  repeat with i = 1 to t_iCount
    t_sName = a_rWindow.pElemList.getPropAt(i)
    t_rElem = a_rWindow.pElemList[i]
    a_mp_sElem_iCursors.addProp(t_sName, t_rElem.pSprite.cursor)
  end repeat
end
on setRollOverCursors this, a_rWindow, a_mp_sElem_iCursors
  t_iCount = a_rWindow.pElemList.count
  repeat with i = 1 to t_iCount
    a_rWindow.pElemList[i].pSprite.cursor = a_mp_sElem_iCursors[i]
  end repeat
end
on forceRollOverCursors me, a_rWindow, a_iCursor
  t_iCount = a_rWindow.pElemList.count
  repeat with i = 1 to t_iCount
    a_rWindow.pElemList[i].pSprite.cursor = a_iCursor
  end repeat
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "inv.tab.credits.passive":
      executeMessage("PlayInterfaceSound", "popup-tab-change")
      this._ChangePage(#credits)
    "inv.tab.furniture.passive":
      executeMessage("PlayInterfaceSound", "popup-tab-change")
      this._ChangePage(#items)
    "inv.tab.pins.passive":
      executeMessage("PlayInterfaceSound", "popup-tab-change")
      this._ChangePage(#pins)
    "inv.tab.clothes.passive":
      executeMessage("PlayInterfaceSound", "popup-tab-change")
      this._ChangePage(#clothes)
    "inv.tab.posters.passive":
      executeMessage("PlayInterfaceSound", "popup-tab-change")
      this._ChangePage(#posters)
    "inv.tab.codes.passive":
      executeMessage("PlayInterfaceSound", "popup-tab-change")
      this._ChangePage(#code)
    "close":
      this.close()
      case m_kCurPageName of
        #credits:
        #items:
        #posters:
        #pins:
        #clothes:
        #code:
          m_rCurPageObj.close()

      end case
      executeMessage("PlayInterfaceSound", "close-popup")
    "help":
      case m_kCurPageName of
        #credits:
          executeMessage(#open_help_page, "help.stuff.credits")
        #items:
          executeMessage(#open_help_page, "help.stuff.furniture")
        #posters:
          executeMessage(#open_help_page, "help.stuff.posters")
        #pins:
          executeMessage(#open_help_page, "help.stuff.pins")
        #clothes:
          executeMessage(#open_help_page, "help.stuff.clothes")
        #code:
          executeMessage(#open_help_page, "help.stuff.codes")
        otherwise:
          executeMessage(#open_help_page, "help.stuff.shopping")

      end case

  end case
  return call(#_EventProc, [m_rCurPageObj], a_kEvent, a_sElem, a_vParam)
end
on TeleportSelected this, a_iOtherID
  if m_kCurPageName = #items then
    t_ar_rItems = m_mp_kType_mp_iRef_rItem.getaProp(#items)
    c = 1
    repeat with i = m_rCurPageObj.GetFirstItemInGrid() to m_rCurPageObj.GetLastItemInGrid()
      t_rItem = t_ar_rItems[i]
      if not (t_rItem.getaProp(#param) = 0) then
        if ilk(t_rItem.param, #list) then
          if t_rItem.param.count = 3 then
            if t_rItem.param[1] = 1 then
              if t_rItem.param[3] = a_iOtherID then
                m_rCurPageObj.m_rGridRenderer.Highlight(c)
                exit repeat
              end if
            end if
          end if
        end if
      end if
      c = c + 1
    end repeat
  end if
end
on TeleportUnSelected this, a_iOtherID
  if m_kCurPageName = #items then
    m_rCurPageObj.m_rGridRenderer.Unhighlight()
  end if
end