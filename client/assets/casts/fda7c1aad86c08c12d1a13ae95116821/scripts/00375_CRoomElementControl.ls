-- Script
property m_rSelected
property m_rControls

on construct this
  m_rSelected = VOID
  t_sID = getUniqueID()
  createObject("RoomObjectPlacer", "CRoomObjectPlacer")
  registerMessage("room_furnish_mode", this.getID(), #_SetFurnishMode)
  t_sWindowName = "vmk_place_item.window"
  if getObject(#session).exists("permissions") then
    t_ar_Permissions = getObject(#session).get("permissions")
    if t_ar_Permissions.count >= 1 then
      if getObject(#session).exists("build_version") then
        if value(getObject(#session).get("build_version")) >= 9.0 then
          t_sWindowName = "vmk_place_item_vmks.window"
        end if
      end if
    end if
  end if
  if createWindow(t_sID, t_sWindowName) then
    m_rControls = getWindow(t_sID)
    m_rControls.hide()
    m_rControls.registerClient(this.getID())
    m_rControls.registerProcedure(#_EventProc, this.getID(), #mouseUp)
    return 1
  else
    return error(this, "Failed to prepare control window!", #construct)
  end if
end
on deconstruct this
  removeObject("RoomObjectPlacer")
  registerMessage("room_furnish_mode", this.getID())
  m_rSelected = VOID
  if objectp(m_rControls) then
    removeWindow(m_rControls.getID())
    m_rControls = VOID
  end if
  return 1
end
on select this, a_rSelected
  t_bGuestMove = 0
  if not voidp(m_rSelected) then
    this.Unselect()
  end if
  m_rSelected = a_rSelected
  if not voidp(m_rSelected) then
    t_bGuestMove = value(m_rSelected.getObject().GetParam("GUESTMOVE"))
  end if
  t_bFurnish = getObject(#session).get("room_furnish_mode")
  if t_bFurnish and not t_bGuestMove then
    if not voidp(m_rSelected) then
      if not voidp(m_rSelected.GetVisual()) then
        m_rSelected.GetVisual().select(1)
      end if
    end if
    t_veScr = a_rSelected.GetScrPos()
    t_xOff = m_rControls.getElement("place.regpoint").getProperty(#locX)
    t_yOff = m_rControls.getElement("place.regpoint").getProperty(#locY)
    m_rControls.moveTo(t_veScr.x - t_xOff, t_veScr.y - t_yOff)
    m_rControls.getElement("place.itemname").setText(getText("item." & m_rSelected.GetParam("TYPE")))
    if getObject(#session).get("ControlRoom") then
      m_rControls.getElement("place.move.button").setProperty(#blend, 100)
    else
      m_rControls.getElement("place.move.button").setProperty(#blend, 50)
    end if
    if getObject(#session).exists("permissions") then
      t_ar_Permissions = getObject(#session).get("permissions")
      if t_ar_Permissions.count >= 1 then
        if getObject(#session).exists("build_version") then
          if value(getObject(#session).get("build_version")) >= 9.0 then
            if t_ar_Permissions.getPos(12) = 0 then
              m_rControls.getElement("place.vmks.button").hide()
              m_rControls.getElement("place.state.button").hide()
            end if
          end if
        end if
      end if
    end if
  else
    if not voidp(m_rSelected) then
      if t_bGuestMove then
        t_veScr = a_rSelected.GetScrPos()
        t_xOff = m_rControls.getElement("place.regpoint").getProperty(#locX)
        t_yOff = m_rControls.getElement("place.regpoint").getProperty(#locY)
        m_rControls.moveTo(t_veScr.x - t_xOff, t_veScr.y - t_yOff)
        m_rControls.getElement("place.itemname").setText(getText("item." & m_rSelected.GetParam("TYPE")))
        m_rControls.getElement("place.takeaway.button").deactivate()
      end if
    end if
  end if
  if t_bFurnish or t_bGuestMove then
    m_rControls.show()
  else
    m_rControls.hide()
  end if
end
on Unselect this
  m_rControls.hide()
  if not voidp(m_rSelected) then
    if not voidp(m_rSelected.GetVisual()) then
      m_rSelected.GetVisual().select(0)
    end if
    if not voidp(m_rSelected.GetFactor()) then
      m_rSelected.GetFactor().Unselect()
    end if
  end if
  m_rSelected = VOID
end
on GetSelected this
  return m_rSelected
end
on _SetFurnishMode this, a_bFurnish
  if a_bFurnish then
    if objectp(m_rSelected) then
      this.select(m_rSelected)
    end if
  else
    m_rControls.hide()
    if not voidp(m_rSelected) then
      if not voidp(m_rSelected.GetVisual()) then
        m_rSelected.GetVisual().select(0)
      end if
    end if
  end if
end
on _EventProc this, a_kEvt, a_sElm, a_vPrm, a_sWnd
  if voidp(m_rSelected) then
    m_rControls.hide()
  else
    if not objectp(m_rSelected.GetFactor()) or not objectp(m_rSelected.GetVisual()) then
      m_rControls.hide()
      return error(this, "Object was invalidated by server!", #_EventProc)
    end if
    case a_sElm of
      "place.move.button":
        if m_rSelected.GetFactor().CanBeMoved() then
          case m_rSelected.GetParam("CLASS") of
            "element":
              executeMessage("move_element_start", m_rSelected)
              registerMessage("move_element_end", this.getID(), #PlaceElementCbk)
              registerMessage("move_element_failed", this.getID(), #PlaceElementCbk)
              m_rControls.hide()
            "poster":
              executeMessage("move_poster_start", m_rSelected)
              registerMessage("move_poster_end", this.getID(), #PlacePosterCbk)
              registerMessage("move_poster_failed", this.getID(), #PlacePosterCbk)
              m_rControls.hide()
            otherwise:
              error(this, "Unknown object type can't be moved:" && m_rSelected.GetParam("CLASS"), #_EventProc)

          end case
        end if
      "place.rotate.button":
        getConnection("VMK").send("RotateItem", [#int: integer(m_rSelected.GetParam("REF"))])
      "place.takeaway.button":
        t_sType = m_rSelected.GetParam("TYPE")
        if t_sType = "3008" then
          getConnection("VMK").send(765, [#int: integer(m_rSelected.GetParam("REF"))])
        else
          getConnection("VMK").send("PickItem", [#int: integer(m_rSelected.GetParam("REF"))])
        end if
        this.Unselect()
      "place.iteminfo.button":
        getConnection("VMK").send("RequestItemDetails", [#int: getObject(#session).get("room_own_avatar"), #int: 3, #int: integer(m_rSelected.GetParam("REF"))])
      "place.vmks.button":
        if variableExists("rpgfurnipopup.url") then
          if voidp(m_rSelected.GetParam("ENTITYID")) then
            getObject(#session).set("FetchEntityID", 1)
            registerListener(getVariable("main.connection.id", "VMK"), this.getID(), [2522: #GotoRPGWebPage])
            getConnection("VMK").send("RequestItemDetails", [#int: getObject(#session).get("room_own_avatar"), #int: 3, #int: integer(m_rSelected.GetParam("REF"))])
          else
            this.GotoRPGWebPage()
          end if
        end if
      "place.state.button":
        getConnection("VMK").send("ToggleItem", [#int: integer(m_rSelected.GetParam("REF"))])
      "close":
        this.Unselect()

    end case
  end if
end
on GotoRPGWebPage this
  if variableExists("rpgfurnipopup.url") then
    t_sURL = getVariable("rpgfurnipopup.url")
    t_sURL = t_sURL & "=" & m_rSelected.GetParam("ENTITYID")
    if stringp(t_sURL) then
      gotoNetPage(t_sURL, "rpg_link_window")
    end if
  end if
  unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), [2522: #GotoRPGWebPage])
  getObject(#session).set("FetchEntityID", 0)
end
on PlaceElementCbk this, a_iTileRef, a_veRelPos
  unregisterMessage("move_element_end", this.getID())
  unregisterMessage("move_element_failed", this.getID())
  if objectp(m_rSelected) then
    t_iX = integer(a_veRelPos.x)
    t_iY = integer(a_veRelPos.y)
    t_iZ = integer(a_veRelPos.z)
    t_rParams = [#int: integer(m_rSelected.GetParam("REF")), #int: a_iTileRef, #int: t_iX, #int: t_iY, #int: t_iZ]
    getConnection("VMK").send("MoveItem", t_rParams)
  end if
  this.Unselect()
end
on PlacePosterCbk this, a_iWallRef, a_veRelPos
  unregisterMessage("move_poster_end", this.getID())
  unregisterMessage("move_poster_failed", this.getID())
  if objectp(m_rSelected) then
    t_iX = integer(a_veRelPos.x)
    t_iY = integer(a_veRelPos.y)
    t_iZ = integer(a_veRelPos.z)
    t_rParams = [#int: integer(m_rSelected.GetParam("REF")), #int: a_iWallRef, #int: t_iX, #int: t_iY, #int: t_iZ]
    getConnection("VMK").send("MovePoster", t_rParams)
  end if
  this.Unselect()
end
on SetButtonStates this, a_bMove, a_bRotate, a_bTakeAway
  if getObject(#session).get("RoomType") = #public then
    t_rEventProcessor = getObject("RoomEventProcessor")
    if t_rEventProcessor <> 0 then
      t_rEventProcessor.reset()
    end if
    exit
  end if
  if not voidp(m_rControls) then
    tWnd = getWindow(m_rControls.getID())
    if not voidp(a_bMove) then
      if not a_bMove then
        tWnd.getElement("place.move.button").deactivate()
      else
        tWnd.getElement("place.move.button").Activate()
      end if
    end if
    if not voidp(a_bRotate) then
      if not a_bRotate then
        tWnd.getElement("place.rotate.button").deactivate()
      else
        tWnd.getElement("place.rotate.button").Activate()
      end if
    end if
    if not voidp(a_bTakeAway) then
      if not a_bTakeAway then
        tWnd.getElement("place.takeaway.button").deactivate()
      else
        tWnd.getElement("place.takeaway.button").Activate()
      end if
    end if
  end if
end