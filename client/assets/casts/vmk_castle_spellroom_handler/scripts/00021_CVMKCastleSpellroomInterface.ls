-- Script
property m_ar_spellSprites
property m_pExits
property m_pTileExits

on construct me
  registerMessage(#room_ready, me.getID(), #initSpellRoom)
  m_ar_spellSprites = []
  m_pExits = []
  m_pTileExits = []
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #initSpellRoom)
  repeat with tSprite in m_ar_spellSprites
    removeEventBroker(tSprite.spriteNum)
  end repeat
  return 1
end
on initSpellRoom me
  m_ar_spellSprites = []
  tSpriteNames = ["magicpotion"]
  repeat with tSprite in tSpriteNames
    me.createProcedure(tSprite, #EventProc)
  end repeat
  me.hideExits()
end
on createProcedure me, t_NodeName, t_eventProc
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", t_NodeName)
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    m_ar_spellSprites.append(tSprite)
    t_SpellRoomSprite = sprite(tSprite)
    setEventBroker(t_SpellRoomSprite.spriteNum, t_NodeName)
    t_SpellRoomSprite.registerProcedure(t_eventProc, me.getID(), #mouseUp)
    t_SpellRoomSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  end if
end
on EventProc me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
    end if
  end if
end
on findExits me
  m_pExits = []
  m_pTileExits = []
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = []
  repeat with nodeID in t_Nodes
    tNode = tRoomContext.Search("ID", nodeID)
    if tNode <> 0 then
      m_pExits.append(tNode)
    end if
  end repeat
  t_Nodes = ["6"]
  repeat with nodeID in t_Nodes
    tNode = tRoomContext.Search("ID", nodeID)
    if tNode <> 0 then
      m_pTileExits.append(tNode)
    end if
  end repeat
end
on hideExits me
  if m_pExits.count = 0 then
    me.findExits()
  end if
  repeat with t_exit in m_pExits
    t_exit.SetParam("CLASS", "hide")
  end repeat
  repeat with t_exit in m_pTileExits
    t_exit.SetParam("CLASS", "tile")
  end repeat
end
on showExits me
  if m_pExits.count = 0 then
    me.findExits()
  end if
  repeat with t_exit in m_pExits
    t_exit.SetParam("CLASS", "exit")
  end repeat
  repeat with t_exit in m_pTileExits
    t_exit.SetParam("CLASS", "exit")
  end repeat
end