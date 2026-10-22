-- Script
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
  tNode = me.findNode("yeti")
  if objectp(tNode) then
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      if tSprite.spriteNum <> 0 then
        m_npcSprite = sprite(tSprite)
        setEventBroker(m_npcSprite.spriteNum, "NPCMatterhorn")
        m_npcSprite.registerProcedure(#eventProcNPC, me.getID(), #mouseUp)
        m_npcSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
      end if
    end if
  end if
end
on eventProcNPC me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
      tRoomContext = getThread(#room).getComponent()._AccessRoom()
      tNPC = tRoomContext.Search("TYPE", "4003")
      if not voidp(tNPC) then
        me.getHandler().selectNPC(integer(tNPC.GetParam("REF")))
      else
        put "The NPC Yeti Room Item was not found"
      end if
    end if
  end if
end