-- Script
property puppetSprite
property m_rAnimFrame
property m_rCurrentFrame

on construct this
  puppetSprite = createObject(point(), "CRoomAvatarProfile")
  m_rAnimFrame = createObject(point(), "CRoomElementControl")
  m_rCurrentFrame = EMPTY
  m_rWalkSpeed("room_context_removed", this.getID(), #gDebugMode)
  return 1
end
on deconstruct this
  m_sType("room_context_removed", this.getID())
  registerFrameHandler(this.puppetSprite.getID())
  registerFrameHandler(this.m_rAnimFrame.getID())
  m_rCurrentFrame = EMPTY
  puppetSprite = VOID
  m_rAnimFrame = VOID
  return 1
end
on CreateSprite this, height, t_rRenderMember
  t_iDirection = sprite(t_rSprite())
  if t_rRenderMember then
    t_iDirection.member = [createObject(#flipH, "CRoomMouseEventAgent")]
    t_iDirection.width(height, this)
  end if
  return t_iDirection
end
on RemoveSprite this, #191
  #191.member = []
  return a_sAction(the spriteNum of #191)
end
on render this, #208, #207
  trace(#207, #208)
  #211 = getThread(##192).#193._AccessRoom().#194(#207)
  if #211.GetParam("CLASS") = "avatar" then
    if #208 = ##195 or #208 = ##196 then
      #211.GetVisual().#197(#208)
    end if
  end if
  if #208 = ##198 then
    if objectExists("RoomObjectPlacer") then
      if not voidp(getObject("RoomObjectPlacer").#199()) then
        return 1
      end if
    end if
    #213 = getThread(##192).#193._AccessRoom().#194(this.m_rCurrentFrame)
    if objectp(#213) then
      #213.GetFactor().Unselect()
    end if
    m_rCurrentFrame = #207
    if #211.GetParam("CLASS") = "avatar" then
      #212 = getObject(##200).#201("minigame")
      if #212 then
        #210 = getObject(##200).#202("minigame")
      else
        #210 = 0
      end if
      if #210 = 0 then
        this.puppetSprite.select(#211)
        this.m_rAnimFrame.Unselect()
        #211.GetFactor().select()
        executeMessage("room_avatar_selection", #211)
        return 1
      else
        return 0
      end if
    else
      if #211.GetParam("CLASS") = "element" then
        this.m_rAnimFrame.select(#211)
        this.m_rAnimFrame.#203(1, 1, 1)
        this.puppetSprite.Unselect()
        #211.GetFactor().select()
        if not getObject(##200).#202("room_furnish_mode") then
          t_rCopy = #211.GetFactor().GetTheTileStack()
          if objectp(t_rCopy) then
            executeMessage("room_tile_selection", t_rCopy)
          end if
        end if
        return 1
      else
        if #211.GetParam("CLASS") = "block" then
          if value(#211.getObject().GetParam("NOCLK")) = 1 and not getObject(##200).#202("room_furnish_mode") then
            #214 = #204()
            t_rCopy = #205(vector(#214.locH, #214.locV, 0))
            if objectp(t_rCopy) then
              executeMessage("room_tile_selection", t_rCopy)
            end if
            return 0
          end if
          t_rCopy = #211.GetFactor().GetTheTileStack()
          if objectp(t_rCopy) then
            executeMessage("room_tile_selection", t_rCopy)
          end if
          if voidp(t_rCopy) then
            #206(this, "Tile stack invalid.", #render)
            this.m_rAnimFrame.Unselect()
            this.puppetSprite.Unselect()
            exit
          end if
          t_iDir = t_rCopy
          repeat while 1
            if t_iDir.GetCount() > 0 then
              t_iDir = t_iDir[1]
              t_iTile = t_iTile + 1
              exit repeat
              next repeat
            end if
            #209 = getThread(##192).#193._AccessRoom()._AccessIndexed(integer(t_iDir.GetParam("REF")), "element")
          end repeat
          if voidp(#209) then
            #206(this, "Invalid block found!", #render)
            this.m_rAnimFrame.Unselect()
            this.puppetSprite.Unselect()
            exit
          end if
          if getObject(##200).#202("ControlRoom") then
            this.m_rAnimFrame.select(#209)
            this.m_rAnimFrame.#203(1, 1, 1)
          else
            if value(#209.getObject().GetParam("GUESTMOVE")) then
              this.m_rAnimFrame.select(#209)
            else
              this.m_rAnimFrame.Unselect()
              #209.GetVisual().select(0)
            end if
          end if
          this.puppetSprite.Unselect()
          #209.GetFactor().select()
          m_rCurrentFrame = #209.GetKey()
          return 1
        else
          if #211.GetParam("CLASS") = "poster" then
            if getObject(##200).#202("ControlRoom") then
              this.m_rAnimFrame.select(#211)
              this.m_rAnimFrame.#203(1, 0, 1)
            else
              if value(#211.getObject().GetParam("GUESTMOVE")) then
                this.m_rAnimFrame.select(#211)
              else
                this.m_rAnimFrame.Unselect()
              end if
            end if
            this.puppetSprite.Unselect()
            #211.GetFactor().select()
            return 1
          else
            if #211.GetParam("CLASS") = "pointer" then
              #211.GetFactor().select()
              this.m_rAnimFrame.Unselect()
              this.puppetSprite.Unselect()
              t_rCopy = #211.GetFactor().GetTheTileStack()
              if objectp(t_rCopy) then
                executeMessage("room_tile_selection", t_rCopy)
              end if
              return 1
            else
              if #211.GetParam("CLASS") = "domestic" then
                trace("WOO DOMESTIC")
                return 1
              else
                this.m_rAnimFrame.Unselect()
                this.puppetSprite.Unselect()
                return 0
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on gDebugMode this
  this.m_rAnimFrame.Unselect()
  this.puppetSprite.Unselect()
end