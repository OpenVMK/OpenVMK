-- Script
property m_rSprite
property m_veLastAbs
property m_iLastDir
property m_iCurrentDir
property m_iLastAct
property m_sCurAct
property m_rRenderer
property m_iOriginalPosY
property m_iFrame

on construct this
  m_rSprite = sprite(0)
  m_veLastAbs = VOID
  m_sCurAct = "std"
  m_iFrame = 0
  return 1
end
on deconstruct this
  this._Close()
  m_veLastAbs = VOID
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  t_rSprMgr.RemoveSprite(m_rSprite)
  return 1
end
on SetObject this, a_rObj
  callAncestor(#SetObject, this, a_rObj)
  m_veLastAbs = a_rObj.GetAbsPos()
end
on CreateSprites this
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  t_veScr = this.getObject().GetScrPos()
  if integer(this.getObject().GetParam("TYPE")) < 3 then
    this.m_rRenderer = createObject(#random, "CIronCanRenderer")
  else
    if integer(this.getObject().GetParam("TYPE")) = 3 then
      this.m_rRenderer = createObject(#random, "CBunnyRenderer")
    else
      if integer(this.getObject().GetParam("TYPE")) = 4 then
        this.m_rRenderer = createObject(#random, "CYodaRenderer")
        this.getObject().GetFactor().m_iStatusDelay = 1500
      else
        if integer(this.getObject().GetParam("TYPE")) = 5 then
          this.m_rRenderer = createObject(#random, "CR2D2Renderer")
          this.getObject().GetFactor().m_iStatusDelay = 1500
        else
          if integer(this.getObject().GetParam("TYPE")) = 6 then
            this.m_rRenderer = createObject(#random, "CEveRenderer")
            this.getObject().GetFactor().m_iStatusDelay = 750
          else
            if integer(this.getObject().GetParam("TYPE")) = 7 then
              this.m_rRenderer = createObject(#random, "CPanicRenderer")
              this.getObject().GetFactor().m_iStatusDelay = 1500
            else
              if integer(this.getObject().GetParam("TYPE")) = 8 then
                this.m_rRenderer = createObject(#random, "CPainRenderer")
                this.getObject().GetFactor().m_iStatusDelay = 1500
              else
                if integer(this.getObject().GetParam("TYPE")) = 9 then
                  this.m_rRenderer = createObject(#random, "CYzmaRenderer")
                  this.getObject().GetFactor().m_iStatusDelay = 500
                else
                  if integer(this.getObject().GetParam("TYPE")) = 10 then
                    this.m_rRenderer = createObject(#random, "CTurkeyRenderer")
                    this.getObject().GetFactor().m_iStatusDelay = 500
                  else
                    if integer(this.getObject().GetParam("TYPE")) = 11 then
                      this.m_rRenderer = createObject(#random, "CEverTurkeyRenderer")
                      this.getObject().GetFactor().m_iStatusDelay = 500
                    else
                      this.m_rRenderer = createObject(#random, "CIronCanRenderer")
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
  this.m_rSprite = t_rSprMgr.CreateSprite(this.getObject().GetKey(), 0)
  this.m_rSprite.locH = t_veScr.x
  this.m_rSprite.locV = t_veScr.y
  this.m_rSprite.locZ = t_veScr.z
  m_iOriginalPosY = t_veScr.y
  this.m_rRenderer.Init(this.m_rSprite)
  if integer(this.getObject().GetParam("TYPE")) < 3 then
    this.m_rSprite.locV = t_veScr.y - 38
    this.m_rRenderer.m_rID = 1
  end if
end
on GetBlocks this
  return []
end
on update this
  if voidp(this.m_rSprite) then
    exit
  end if
  t_iCurrentDir = integer(this.getObject().GetParam("DIR"))
  if t_iCurrentDir <> this.m_iLastDir then
    this.m_iLastDir = t_iCurrentDir
    this.m_rRenderer.m_rDirection = t_iCurrentDir
    this.m_rRenderer.m_bDirty = 1
  end if
  t_iCurAct = integer(this.getObject().GetParam("ACT"))
  if t_iCurAct <> this.m_iLastAct then
    this.m_iLastAct = t_iCurAct
    this.m_rRenderer.m_iAction = t_iCurAct
    this.m_rRenderer.m_bDirty = 1
    this.m_iFrame = 0
  end if
  t_veAbs = this.getObject().GetAbsPos()
  if this.m_rSprite.spriteNum > 0 then
    if this.m_veLastAbs <> t_veAbs then
      t_veScr = this.getObject().GetScrPos()
      this.m_rSprite.locH = t_veScr.x
      this.m_rSprite.locV = t_veScr.y
      this.m_rSprite.locZ = t_veScr.z
      this.m_iOriginalPosY = t_veScr.y
      if integer(this.getObject().GetParam("TYPE")) < 3 then
        this.m_rSprite.locV = t_veScr.y - 42
      end if
    end if
  end if
  if integer(this.getObject().GetParam("TYPE")) = 6 then
    this.m_rSprite.locV = m_iOriginalPosY - 20 - abs(sin(this.m_iFrame * 1.32499992847443) * 15)
  end if
  m_veLastAbs = t_veAbs
  if not voidp(this.m_rRenderer) then
    this.m_rRenderer.update()
  end if
  this.m_iFrame = this.m_iFrame + 1
end
on visible this, a_sBool
  if this.m_rSprite.spriteNum > 0 then
    this.m_rSprite.visible = a_sBool
  end if
end
on getSprite this
  return the m_rSprite of this
end
on _Show this
  if this.m_rSprite.spriteNum > 0 then
    this.m_rSprite.visible = 1
  end if
end
on select this
  if doubleClick() then
    getObject(#VMK).send("CLICKPET", [#int: integer(this.getObject().GetParam("REF"))])
    return 1
  end if
end