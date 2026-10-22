-- Script
property m_rSprite
property m_veLastAbs

on construct this
  m_rSprite = sprite(0)
  m_veLastAbs = VOID
  return 1
end
on deconstruct this
  this._Close()
  m_veLastAbs = VOID
  return 1
end
on SetObject this, a_rObj
  callAncestor(#SetObject, this, a_rObj)
  m_veLastAbs = a_rObj.GetAbsPos()
  t_sSprite = a_rObj.GetParam("SPRITE")
  if t_sSprite <> EMPTY and t_sSprite <> VOID then
    t_rSprite = getThread("room").component.m_rSprites.getaProp(t_sSprite)
    if listp(t_rSprite) then
      this._Open(t_rSprite)
    end if
  end if
end
on update this
  t_veAbs = this.getObject().GetAbsPos()
  if m_rSprite.spriteNum > 0 then
    if m_veLastAbs <> t_veAbs then
      t_veScr = this.getObject().GetScrPos()
      m_rSprite.locH = t_veScr.x
      m_rSprite.locV = t_veScr.y
      m_rSprite.locZ = t_veScr.z
    end if
  end if
  m_veLastAbs = t_veAbs
end
on visible this, a_sBool
  if m_rSprite.spriteNum > 0 then
    m_rSprite.visible = a_sBool
  end if
end
on getSprite this
  return m_rSprite
end
on _Show this
  if m_rSprite.spriteNum > 0 then
    m_rSprite.visible = 1
  end if
end
on _Hide this
  if m_rSprite.spriteNum > 0 then
    m_rSprite.visible = 0
  end if
end
on _Open this, a_rNode
  if m_rSprite.spriteNum > 0 then
    this._Close()
  end if
  t_vePos = this.getObject().GetScrPos()
  t_sMember = a_rNode.param["MEMBER"]
  if memberExists(t_sMember) then
    if objectExists("RoomEventProcessor") then
      t_rSprMgr = getObject("RoomEventProcessor")
    else
      t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
    end if
    m_rSprite = t_rSprMgr.CreateSprite(this.getObject().GetKey(), 0)
    m_rSprite.member = getMember(t_sMember)
    m_rSprite.locH = t_vePos.x
    m_rSprite.locV = t_vePos.y
    m_rSprite.locZ = t_vePos.z
    m_rSprite.width = integer(a_rNode.param["W"])
    m_rSprite.height = integer(a_rNode.param["H"])
    m_rSprite.blend = integer(a_rNode.param["BLEND"])
    m_rSprite.ink = integer(a_rNode.param["INK"])
    m_rSprite.flipH = integer(a_rNode.param["FLIPH"])
    m_rSprite.flipV = integer(a_rNode.param["FLIPV"])
    m_rSprite.color = rgb(a_rNode.param["COLOR"])
    m_rSprite.bgColor = rgb(a_rNode.param["BGCOLOR"])
    m_rSprite.skew = float(a_rNode.param["SKEW"])
    m_rSprite.rotation = integer(a_rNode.param["ROTATION"])
  else
    error(this, "Graphics not found:" && t_sMember, #_Open)
  end if
  return 1
end
on _Close this
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  if m_rSprite.spriteNum > 0 then
    t_rSprMgr.RemoveSprite(m_rSprite)
    m_rSprite = sprite(0)
  end if
  return 1
end