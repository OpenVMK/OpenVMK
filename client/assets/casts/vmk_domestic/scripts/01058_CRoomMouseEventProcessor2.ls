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
  removeObject(this.m_rAvatarCtrl.getID())
  removeObject(this.m_rElementCtrl.getID())
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
  trace(a_sKey, a_kEvent)
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
    t_rSelected = getThread(#room).component._AccessRoom().GetObjByKey(this.m_sSelected)
    if objectp(t_rSelected) then
      t_rSelected.GetFactor().Unselect()
    end if
    m_sSelected = a_sKey
    if t_rUnknown.GetParam("CLASS") = "avatar" then
      t_bExists = getObject(#session).exists("minigame")
      if t_bExists then
        t_bState = getObject(#session).get("minigame")
      else
        t_bState = 0
      end if
      if t_bState = 0 then
        this.m_rAvatarCtrl.select(t_rUnknown)
        this.m_rElementCtrl.Unselect()
        t_rUnknown.GetFactor().select()
        executeMessage("room_avatar_selection", t_rUnknown)
        return 1
      else
        return 0
      end if
    else
      if t_rUnknown.GetParam("CLASS") = "element" then
        this.m_rElementCtrl.select(t_rUnknown)
        this.m_rElementCtrl.SetButtonStates(1, 1, 1)
        this.m_rAvatarCtrl.Unselect()
        t_rUnknown.GetFactor().select()
        if not getObject(#session).get("room_furnish_mode") then
          t_rTile = t_rUnknown.GetFactor().GetTheTileStack()
          if objectp(t_rTile) then
            executeMessage("room_tile_selection", t_rTile)
          end if
        end if
        return 1
      else
        if t_rUnknown.GetParam("CLASS") = "block" then
          if value(t_rUnknown.getObject().GetParam("NOCLK")) = 1 and not getObject(#session).get("room_furnish_mode") then
            tloc = clickLoc()
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
            this.m_rElementCtrl.Unselect()
            this.m_rAvatarCtrl.Unselect()
            exit
          end if
          t_rCopy = t_rTile
          repeat while 1
            if t_rCopy.GetCount() > 0 then
              t_rCopy = t_rCopy[1]
              t_iStack = t_iStack + 1
              exit repeat
              next repeat
            end if
            t_rElement = getThread(#room).component._AccessRoom()._AccessIndexed(integer(t_rCopy.GetParam("REF")), "element")
          end repeat
          if voidp(t_rElement) then
            error(this, "Invalid block found!", #Process)
            this.m_rElementCtrl.Unselect()
            this.m_rAvatarCtrl.Unselect()
            exit
          end if
          if getObject(#session).get("ControlRoom") then
            this.m_rElementCtrl.select(t_rElement)
            this.m_rElementCtrl.SetButtonStates(1, 1, 1)
          else
            if value(t_rElement.getObject().GetParam("GUESTMOVE")) then
              this.m_rElementCtrl.select(t_rElement)
            else
              this.m_rElementCtrl.Unselect()
              t_rElement.GetVisual().select(0)
            end if
          end if
          this.m_rAvatarCtrl.Unselect()
          t_rElement.GetFactor().select()
          m_sSelected = t_rElement.GetKey()
          return 1
        else
          if t_rUnknown.GetParam("CLASS") = "poster" then
            if getObject(#session).get("ControlRoom") then
              this.m_rElementCtrl.select(t_rUnknown)
              this.m_rElementCtrl.SetButtonStates(1, 0, 1)
            else
              if value(t_rUnknown.getObject().GetParam("GUESTMOVE")) then
                this.m_rElementCtrl.select(t_rUnknown)
              else
                this.m_rElementCtrl.Unselect()
              end if
            end if
            this.m_rAvatarCtrl.Unselect()
            t_rUnknown.GetFactor().select()
            return 1
          else
            if t_rUnknown.GetParam("CLASS") = "pointer" then
              t_rUnknown.GetFactor().select()
              this.m_rElementCtrl.Unselect()
              this.m_rAvatarCtrl.Unselect()
              t_rTile = t_rUnknown.GetFactor().GetTheTileStack()
              if objectp(t_rTile) then
                executeMessage("room_tile_selection", t_rTile)
              end if
              return 1
            else
              if t_rUnknown.GetParam("CLASS") = "domestic" then
                trace("WOO DOMESTIC")
                return 1
              else
                this.m_rElementCtrl.Unselect()
                this.m_rAvatarCtrl.Unselect()
                return 0
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on reset this
  this.m_rElementCtrl.Unselect()
  this.m_rAvatarCtrl.Unselect()
end