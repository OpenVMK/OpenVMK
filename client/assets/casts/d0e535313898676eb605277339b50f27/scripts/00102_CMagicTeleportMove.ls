-- Script
property m_iAnimCounter
property m_arFrameList
property m_iMagicFxNum

on construct this
  m_iMagicFxNum = VOID
  registerMessage("room_tile_selection", this.getID(), #_CatchLoc)
  return 1
end
on deconstruct this
  removeObject("MagicTeleporter")
  unregisterMessage("room_tile_selection", this.getID())
  return 1
end
on _CatchLoc this
  t_Obj = getThread(#room).component._AccessRoom()
  if objectp(t_Obj) then
    t_iStack = value(getThread(#room).component._AccessRoom().Search("CLASS", "pointer").GetFactor().GetTheTileStack())
    if not voidp(t_iStack) then
      t_iTile = value(t_iStack.GetParam("REF"))
    end if
    if not voidp(t_iTile) then
      getConnection(getVariable("main.connection.id", "VMK")).send("MagicTeleport", [#int: m_iMagicFxNum, #int: t_iTile])
      removeObject("MagicTeleporter")
      if objectExists("TeleportObj") then
        removeObject("TeleportObj")
      end if
    end if
  end if
end
on SetFxNum this, a_iNum
  m_iMagicFxNum = a_iNum
end
on update this
end