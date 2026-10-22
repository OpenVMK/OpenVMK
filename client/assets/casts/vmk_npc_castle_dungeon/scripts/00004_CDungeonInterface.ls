-- Behavior
property m_npcSprite

on construct me
  registerMessage(#room_ready, me.getID(), #initNPC)
  m_npcSprite = VOID
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #initNPC)
  if not voidp(m_npcSprite) then
    removeEventBroker(m_npcSprite.spriteNum)
  end if
  return 1
end
on findNode me, a_sNodeName
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  return tRoomContext.Search("NAME", a_sNodeName)
end
on initNPC me
  tNode = me.findNode("dragon")
  if objectp(tNode) then
    tSprite = tNode.GetVisual().getSprite()
    m_npcSprite = sprite(tSprite)
    if m_npcSprite.spriteNum <> 0 then
      setEventBroker(m_npcSprite.spriteNum, "NPCDragon")
      m_npcSprite.registerProcedure(#eventProcNPC, me.getID(), #mouseUp)
      m_npcSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
    end if
  end if
end
on eventProcNPC me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
      tRoomContext = getThread(#room).getComponent()._AccessRoom()
      tNPC = tRoomContext.Search("TYPE", "4001")
      if not voidp(tNPC) then
        me.getHandler().selectNPC(integer(tNPC.GetParam("REF")))
      end if
    end if
  end if
end