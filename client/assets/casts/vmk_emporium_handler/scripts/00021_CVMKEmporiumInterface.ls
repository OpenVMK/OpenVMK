-- Behavior
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
  tSpriteNames = ["shop_cash", "shop_cloth1", "shop_cloth2"]
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
  if tEvent = #mouseUp then
    if the doubleClick then
      put "Clicked" && [tEvent, tElemID, tParm]
      me.getHandler().cashRegisterClicked()
    end if
  end if
end