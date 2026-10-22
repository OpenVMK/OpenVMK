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
on initNPC me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "neds_regpoint")
  tSprite = tNode.GetVisual().getSprite()
  m_npcSprite = sprite(tSprite)
  if m_npcSprite.spriteNum <> 0 then
    setEventBroker(m_npcSprite.spriteNum, "NPCNedsShop")
    m_npcSprite.registerProcedure(#eventProcNPC, me.getID(), #mouseUp)
    m_npcSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  end if
end
on eventProcNPC me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
      tRoomContext = getThread(#room).getComponent()._AccessRoom()
      tNPC = tRoomContext.Search("TYPE", "4002")
      if not voidp(tNPC) then
        me.getHandler().selectNPC(integer(tNPC.GetParam("REF")))
      else
        put "The NPC Shrunken Ned Room Item was not found"
      end if
    end if
  end if
end