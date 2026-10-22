-- Score Script
property m_npcSprite
property m_npcMoveMode
property m_npcDeltaDistance
property m_npcMoveStartTime
property m_npcMoveStartPos

on construct me
  registerMessage(#room_ready, me.getID(), #initNPC)
  registerMessage(#ghost_1_update, me.getID(), #foo)
  m_npcSprite = VOID
  m_npcMoveMode = #stay
  m_npcMoveDeltaDistance = vector(0, 0, 0)
  m_npcMoveStartTime = the milliSeconds
  m_npcMoveStartPos = vector(0, 0, 0)
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #initNPC)
  unregisterMessage(#ghost_1_update, me.getID(), #foo)
  if not voidp(m_npcSprite) then
    removeEventBroker(m_npcSprite.spriteNum)
  end if
  return 1
end
on initNPC me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "ghost_1")
  if tNode = VOID then
    put "Ghost sprite not found"
  end if
  if tNode <> VOID then
    tSprite = tNode.GetVisual().getSprite()
    put "Ghost init" && tSprite
    if tSprite <> 0 then
      if tSprite.spriteNum <> 0 then
        m_npcSprite = sprite(tSprite)
        setEventBroker(m_npcSprite.spriteNum, "NPCGhost")
        m_npcSprite.registerProcedure(#eventProcNPC, me.getID(), #mouseUp)
        m_npcSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
        m_npcMoveStartPos = vector(m_npcSprite.loc.locH, m_npcSprite.loc.locV, m_npcSprite.locZ)
      end if
    end if
  end if
end
on foo me, a_rTarget
  me.update(a_rTarget)
end
on eventProcNPC me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
      tRoomContext = getThread(#room).getComponent()._AccessRoom()
      tNPC = tRoomContext.Search("TYPE", "4006")
      put "eventProcNPC found" && tNPC
      if not voidp(tNPC) then
        me.getHandler().selectNPC(integer(tNPC.GetParam("REF")))
      else
        put "The NPC Ghost Room Item was not found"
      end if
    end if
  end if
end
on warpToSpot me
  m_npcMoveMode = #warp
end
on update me, tNPC
  tTime = the milliSeconds
  if not voidp(tNPC) then
    tMyPos = vector(m_npcSprite.loc.locH, m_npcSprite.loc.locV, m_npcSprite.locZ)
    tNpcPos = tNPC.GetScrPos()
    if m_npcMoveMode = #stay then
      if tMyPos <> tNpcPos then
        m_npcMoveMode = #move
        m_npcDeltaDistance = tNpcPos - tMyPos
        m_npcMoveStartPos = tMyPos
        m_npcMoveStartTime = tTime
      end if
    else
      if m_npcMoveMode = #move then
        tFactor = (tTime - m_npcMoveStartTime) / 500.0
        if tTime - m_npcMoveStartTime > 500 then
          tFactor = 1.0
        end if
        tPos = m_npcMoveStartPos + tFactor * m_npcDeltaDistance
        m_npcSprite.loc = point(tPos.x, tPos.y)
        m_npcSprite.locZ = tPos.z
        if tPos = tNpcPos then
          m_npcSprite.loc = point(tNpcPos.x, tNpcPos.y)
          m_npcSprite.locZ = tNpcPos.z
          m_npcMoveMode = #stay
        else
          m_npcMoveMode = #move
          m_npcDeltaDistance = tNpcPos - tPos
          m_npcMoveStartPos = tPos
          m_npcMoveStartTime = tTime
        end if
      else
        if m_npcMoveMode = #warp then
          m_npcSprite.loc = point(tNpcPos.x, tNpcPos.y)
          m_npcSprite.locZ = tNpcPos.z
          m_npcDeltaDistance = vector(0, 0, 0)
          m_npcMoveStartPos = tNpcPos
          m_npcMoveStartTime = tTime - 500
          m_npcMoveMode = #stay
        end if
      end if
    end if
  end if
end