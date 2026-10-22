-- Script
property m_ar_rSprites

on construct this
  m_ar_rSprites = []
  registerMessage(#room_ready, this.getID(), #Initialize)
  return 1
end
on deconstruct this
  repeat with t_rSprite in m_ar_rSprites
    removeEventBroker(t_rSprite.spriteNum)
  end repeat
  unregisterMessage(#room_ready, this.getID())
  return 1
end
on Initialize this, a_sNodeName
  t_sNodeName = "cg_1"
  t_rRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_rNode = t_rRoomContext.Search("NAME", t_sNodeName)
  if t_rNode <> 0 then
    t_rSprite = t_rNode.GetVisual().getSprite()
    m_ar_rSprites.append(t_rSprite)
    setEventBroker(t_rSprite.spriteNum, t_sNodeName)
    t_rSprite.registerProcedure(#eventProcRoom, this.getID(), #mouseUp)
    t_rSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  end if
end
on eventProcRoom this, tEvent, tElemID, tParm
  put tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    put "Clicked" && [tEvent, tElemID, tParm]
    case tElemID of
      "magicshop_1_cl", "cg_1":
        executeMessage("casual_game_interface", 1, #score)
      "magicshop_2_cl":
        executeMessage("casual_game_interface", 1, #play)
      "magicshop_3_cl":
        executeMessage("casual_game_interface", 1, #watch)

    end case
  end if
end