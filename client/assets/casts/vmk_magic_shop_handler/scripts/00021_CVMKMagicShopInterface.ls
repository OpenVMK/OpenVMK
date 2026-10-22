-- Script
property m_cashRegisterSprites

on construct me
  registerMessage(#room_ready, me.getID(), #initCashRegisters)
  m_cashRegisterSprites = []
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #initCashRegisters)
  repeat with tSprite in m_cashRegisterSprites
    removeEventBroker(tSprite.spriteNum)
  end repeat
  return 1
end
on initCashRegisters me
  m_cashRegisterSprites = []
  tSpriteNames = ["magicshop_1_cl", "magicshop_2_cl", "magicshop_3_cl", "magicshop_4_cl"]
  repeat with tSprite in tSpriteNames
    me.createProcedure(tSprite, #eventProcCashRegister)
  end repeat
end
on createProcedure me, t_NodeName, t_eventProc
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", t_NodeName)
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    m_cashRegisterSprites.append(tSprite)
    t_CashRegisterSprite = sprite(tSprite)
    setEventBroker(t_CashRegisterSprite.spriteNum, t_NodeName)
    t_CashRegisterSprite.registerProcedure(t_eventProc, me.getID(), #mouseUp)
    t_CashRegisterSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  end if
end
on eventProcCashRegister me, tEvent, tElemID, tParm
  put tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    put "Clicked" && [tEvent, tElemID, tParm]
    case tElemID of
      "magicshop_1_cl":
        executeMessage("casual_game_interface", 1, #score)
      "magicshop_2_cl":
        executeMessage("casual_game_interface", 1, #play)
      "magicshop_3_cl":
        executeMessage("casual_game_interface", 1, #watch)
      "magicshop_4_cl":
        if the doubleClick then
          me.getHandler().cashRegisterClicked()
        end if

    end case
  end if
end