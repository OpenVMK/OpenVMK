-- Behavior
property m_ar_eventSprites

on construct me
  registerMessage(#room_ready, me.getID(), #initRoom)
  m_ar_eventSprites = []
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #initRoom)
  repeat with tSprite in m_ar_eventSprites
    removeEventBroker(tSprite.spriteNum)
  end repeat
  return 1
end
on initRoom me
  m_ar_eventSprites = []
  tSpriteNames = ["open_quests"]
  repeat with tSprite in tSpriteNames
    me.createEventProc(tSprite, #EventProc)
  end repeat
end
on createEventProc me, t_NodeName, t_eventProc
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", t_NodeName)
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    m_ar_eventSprites.append(tSprite)
    t_rRoomSprite = sprite(tSprite)
    setEventBroker(t_rRoomSprite.spriteNum, t_NodeName)
    t_rRoomSprite.registerProcedure(t_eventProc, me.getID(), #mouseUp)
    t_rRoomSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  end if
end
on EventProc me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
      tRoomContext = getThread(#room).getComponent()._AccessRoom()
      t_rRoomItem = tRoomContext.Search("TYPE", "407")
      if not voidp(t_rRoomItem) then
        t_iRef = integer(t_rRoomItem.GetParam("REF"))
        getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
      end if
    end if
  end if
end