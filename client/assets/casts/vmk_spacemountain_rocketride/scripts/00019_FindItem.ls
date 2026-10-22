-- Behavior
on findAvatarsOnItem
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_rRoomItem = tRoomContext.Search("TYPE", "405")
  if not voidp(t_rRoomItem) then
    put t_rRoomItem.GetFactor().GetTheTileStack()
    t_ar_sKeys = t_rRoomItem.GetFactor().m_ar_sKey
    repeat with t = 1 to t_ar_sKeys.count
      t_sKey = t_ar_sKeys[t]
      t_rBlk = t_rRoomItem.getObject().GetContext().GetObjByKey(t_sKey)
    end repeat
  end if
end