-- Script
property m_rAvatarCtrl
property m_rElementCtrl
property m_sSelected

on construct this
  m_rAvatarCtrl = createObject(getUniqueID(), "CRoomAvatarProfile")
  m_rElementCtrl = createObject(getUniqueID(), "CRoomElementControl")
  m_sSelected = EMPTY
  registerMessage("room_context_removed", this.getID(), #reset)
  return 1
end
on deconstruct this
  unregisterMessage("room_context_removed", this.getID())
  removeObject(m_rAvatarCtrl.getID())
  removeObject(m_rElementCtrl.getID())
  m_sSelected = EMPTY
  m_rAvatarCtrl = VOID
  m_rElementCtrl = VOID
  return 1
end
on CreateSprite this, a_sOwner, a_bActive
  t_rSpr = sprite(reserveSprite())
  if a_bActive then
    t_rSpr.scriptInstanceList = [createObject(#temp, "CRoomMouseEventAgent")]
    t_rSpr.setup(a_sOwner, this)
  end if
  return t_rSpr
end
on RemoveSprite this, a_rSprite
  a_rSprite.scriptInstanceList = []
  return releaseSprite(the spriteNum of a_rSprite)
end
on Process this, a_kEvent, a_sKey
  t_rUnknown = getThread(#room).component._AccessRoom().GetObjByKey(a_sKey)
  if t_rUnknown.GetParam("CLASS") = "avatar" then
    if a_kEvent = #mouseEnter or a_kEvent = #mouseLeave then
      t_rUnknown.GetVisual().ShowAvatarName(a_kEvent)
    end if
  end if
  if a_kEvent = #mouseDown then
    if objectExists("RoomObjectPlacer") then
      if not voidp(getObject("RoomObjectPlacer").getMovable()) then
        return 1
      end if
    end if
    t_rSelected = getThread(#room).component._AccessRoom().GetObjByKey(m_sSelected)
    if objectp(t_rSelected) then
      t_rSelected.GetFactor().Unselect()
    end if
    m_sSelected = a_sKey
    case t_rUnknown.GetParam("CLASS") of
      "avatar":
        t_bExists = getObject(#session).exists("minigame")
        if t_bExists then
          t_bState = getObject(#session).get("minigame")
        else
          t_bState = 0
        end if
        if t_bState = 0 then
          m_rAvatarCtrl.select(t_rUnknown)
          m_rElementCtrl.Unselect()
          t_rUnknown.GetFactor().select()
          executeMessage("room_avatar_selection", t_rUnknown)
          return 1
        else
          return 0
        end if
      "element":
        m_rElementCtrl.select(t_rUnknown)
        m_rElementCtrl.SetButtonStates(1, 1, 1)
        m_rAvatarCtrl.Unselect()
        t_rUnknown.GetFactor().select()
        if not getObject(#session).get("room_furnish_mode") then
          t_rTile = t_rUnknown.GetFactor().GetTheTileStack()
          if objectp(t_rTile) then
            executeMessage("room_tile_selection", t_rTile)
          end if
        end if
        return 1
      "block":
        if value(t_rUnknown.getObject().GetParam("NOCLK")) = 1 and not getObject(#session).get("room_furnish_mode") then
          tloc = the clickLoc
          t_rTile = GetTileAtScrPos(vector(tloc.locH, tloc.locV, 0))
          if objectp(t_rTile) then
            executeMessage("room_tile_selection", t_rTile)
          end if
          return 0
        end if
        t_rTile = t_rUnknown.GetFactor().GetTheTileStack()
        if objectp(t_rTile) then
          executeMessage("room_tile_selection", t_rTile)
        end if
        if voidp(t_rTile) then
          error(this, "Tile stack invalid.", #Process)
          m_rElementCtrl.Unselect()
          m_rAvatarCtrl.Unselect()
          exit
        end if
        t_rCopy = t_rTile
        repeat while 1
          if t_rCopy.GetCount() > 0 then
            t_rCopy = t_rCopy[1]
            t_iStack = t_iStack + 1
            next repeat
          end if
          exit repeat
        end repeat
        t_rElement = getThread(#room).component._AccessRoom()._AccessIndexed(integer(t_rCopy.GetParam("REF")), "element")
        if voidp(t_rElement) then
          error(this, "Invalid block found!", #Process)
          m_rElementCtrl.Unselect()
          m_rAvatarCtrl.Unselect()
          exit
        end if
        if getObject(#session).get("ControlRoom") then
          m_rElementCtrl.select(t_rElement)
          m_rElementCtrl.SetButtonStates(1, 1, 1)
        else
          if value(t_rElement.getObject().GetParam("GUESTMOVE")) then
            m_rElementCtrl.select(t_rElement)
          else
            m_rElementCtrl.Unselect()
            t_rElement.GetVisual().select(0)
          end if
        end if
        m_rAvatarCtrl.Unselect()
        t_rElement.GetFactor().select()
        m_sSelected = t_rElement.GetKey()
        return 1
      "poster":
        if getObject(#session).get("ControlRoom") then
          m_rElementCtrl.select(t_rUnknown)
          m_rElementCtrl.SetButtonStates(1, 0, 1)
        else
          if value(t_rUnknown.getObject().GetParam("GUESTMOVE")) then
            m_rElementCtrl.select(t_rUnknown)
          else
            m_rElementCtrl.Unselect()
          end if
        end if
        m_rAvatarCtrl.Unselect()
        t_rUnknown.GetFactor().select()
        return 1
      "pointer":
        t_rUnknown.GetFactor().select()
        m_rElementCtrl.Unselect()
        m_rAvatarCtrl.Unselect()
        t_rTile = t_rUnknown.GetFactor().GetTheTileStack()
        if objectp(t_rTile) then
          executeMessage("room_tile_selection", t_rTile)
        end if
        return 1
      otherwise:
        m_rElementCtrl.Unselect()
        m_rAvatarCtrl.Unselect()
        return 0

    end case
  end if
end
on reset this
  m_rElementCtrl.Unselect()
  m_rAvatarCtrl.Unselect()
end