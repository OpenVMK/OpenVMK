-- Score Script
property m_npcSprite
property m_mouseBlockerSprites

on construct me
  registerMessage(#room_ready, me.getID(), #initNPC)
  m_npcSprite = VOID
  m_mouseBlockerSprites = []
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #initNPC)
  if not voidp(m_npcSprite) then
    removeEventBroker(m_npcSprite.spriteNum)
  end if
  repeat with tSprite in m_mouseBlockerSprites
    removeEventBroker(tSprite.spriteNum)
  end repeat
  return 1
end
on initNPC me
  me.initMouseBlockers()
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "pirate")
  tSprite = tNode.GetVisual().getSprite()
  m_npcSprite = sprite(tSprite)
  if m_npcSprite.spriteNum <> 0 then
    setEventBroker(m_npcSprite.spriteNum, "NPCPirate")
    m_npcSprite.registerProcedure(#eventProcNPC, me.getID(), #mouseUp)
    m_npcSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  end if
end
on eventProcNPC me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
      tRoomContext = getThread(#room).getComponent()._AccessRoom()
      tNPC = tRoomContext.Search("TYPE", "4004")
      if not voidp(tNPC) then
        me.getHandler().selectNPC(integer(tNPC.GetParam("REF")))
      else
        put "The NPC Pirate Room Item was not found"
      end if
    end if
  end if
end
on initMouseBlockers me
  m_mouseBlockerSprites = []
  tSpriteNames = ["noclick_mask"]
  repeat with tSprite in tSpriteNames
    me.createProcedure(tSprite, #eventProcMouseBlocker)
  end repeat
end
on createProcedure me, t_NodeName, t_eventProc
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", t_NodeName)
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    m_mouseBlockerSprites.append(tSprite)
    t_MouseBlockersprite = sprite(tSprite)
    setEventBroker(t_MouseBlockersprite.spriteNum, t_NodeName)
    t_MouseBlockersprite.registerProcedure(t_eventProc, me.getID(), #mouseUp)
    t_MouseBlockersprite.cursor = -1
  end if
end
on eventProcMouseBlocker me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
      put "Clicked" && [tEvent, tElemID, tParm]
    end if
    return 1
  end if
end