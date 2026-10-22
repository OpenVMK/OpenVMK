-- Script
property m_ar_eventSprites
property m_ar_rExits
property m_ar_rTileExits

on construct me
  registerMessage(#room_ready, me.getID(), #initRoom)
  m_ar_eventSprites = []
  m_ar_rExits = []
  m_ar_rTileExits = []
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
  me.hideExits()
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
      t_rRoomItem = tRoomContext.Search("TYPE", "405")
      if not voidp(t_rRoomItem) then
        t_iRef = integer(t_rRoomItem.GetParam("REF"))
        getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
      end if
    end if
  end if
end
on findExits me
  m_ar_rExits = []
  m_ar_rTileExits = []
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["4", "5", "6", "7", "10", "11", "12", "13"]
  repeat with nodeID in t_Nodes
    tNode = tRoomContext.Search("ID", nodeID)
    if tNode <> 0 then
      m_ar_rExits.append(tNode)
    end if
  end repeat
  t_Nodes = []
  repeat with nodeID in t_Nodes
    tNode = tRoomContext.Search("ID", nodeID)
    if tNode <> 0 then
      m_ar_rTileExits.append(tNode)
    end if
  end repeat
end
on hideExits me
  if m_ar_rExits.count = 0 then
    me.findExits()
  end if
  repeat with t_exit in m_ar_rExits
    t_exit.SetParam("CLASS", "hide")
  end repeat
  repeat with t_exit in m_ar_rTileExits
    t_exit.SetParam("CLASS", "tile")
  end repeat
end
on showExits me
  if m_ar_rExits.count = 0 then
    me.findExits()
  end if
  repeat with t_exit in m_ar_rExits
    t_exit.SetParam("CLASS", "exit")
  end repeat
  repeat with t_exit in m_ar_rTileExits
    t_exit.SetParam("CLASS", "exit")
  end repeat
end