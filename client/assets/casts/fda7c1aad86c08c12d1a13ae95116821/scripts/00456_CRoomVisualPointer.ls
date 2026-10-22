-- Script
property m_bReady
property m_rMember
property m_rSprite

on construct this
  m_bReady = 0
  m_rSprite = sprite(0)
  m_rMember = VOID
  return 1
end
on deconstruct this
  m_bReady = 0
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  if m_rSprite.ilk = #sprite then
    if m_rSprite.spriteNum > 0 then
      t_rSprMgr.RemoveSprite(m_rSprite)
      m_rSprite = VOID
    end if
  end if
  m_rMember = VOID
  return 1
end
on update this
  if not m_bReady then
    if objectExists("RoomEventProcessor") then
      t_rSprMgr = getObject("RoomEventProcessor")
    else
      t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
    end if
    m_rSprite = t_rSprMgr.CreateSprite(this.getObject().GetKey(), 1)
    t_sMember = "room_hiliter_" & this.getObject().GetContext().GetParam("TILESIZE")
    if memberExists(t_sMember) then
      m_rMember = getMember(t_sMember)
      m_rSprite.member = m_rMember
      m_rSprite.width = m_rSprite.member.width
      m_rSprite.height = m_rSprite.member.height
    else
      error(this, "Mouse pointer graphics not found!", #construct)
      m_rMember = member(0)
    end if
    m_bReady = 1
  end if
  t_rObj = this.getObject()
  t_sPointed = t_rObj.GetParam("POINTED")
  t_veAbs = t_rObj.GetAbsPos()
  m_rSprite.locH = t_veAbs.x
  m_rSprite.locV = t_veAbs.y
  m_rSprite.locZ = t_veAbs.z
  t_rContext = t_rObj.GetContext()
  t_bVisible = 1
  case t_sPointed of
    "tile":
      m_rSprite.member = getMember("room_hiliter_" & t_rContext.GetParam("TILESIZE"))
    "exit":
      m_rSprite.member = getMember("exit_hiliter_" & t_rContext.GetParam("TILESIZE"))
    "teleport":
      m_rSprite.member = getMember("teleport_hiliter_" & t_rContext.GetParam("TILESIZE"))
    "queue":
      m_rSprite.member = getMember("queue_hiliter_" & t_rContext.GetParam("TILESIZE"))
    "sit":
      m_rSprite.member = getMember("sit_hiliter_" & t_rContext.GetParam("TILESIZE"))
    "hide":
      t_bVisible = 0

  end case
  m_rSprite.width = m_rSprite.member.width
  m_rSprite.height = m_rSprite.member.height
  m_rSprite.visible = t_bVisible
end