-- Script
property m_boardMgr

on construct me
  registerMessage(#Initialize, me.getID(), #createManager)
  registerMessage(#room_ready, me.getID(), #activateBillBoards)
  m_boardMgr = VOID
  return 1
end
on deconstruct me
  unregisterMessage(#Initialize, me.getID())
  unregisterMessage(#room_ready, me.getID())
  if objectp(m_boardMgr) then
    removeObject(m_boardMgr.getID())
  end if
  return 1
end
on createManager me
  m_boardMgr = createObject("BillBoardManager", "CBillBoardManager")
end
on activateBillBoards me
  if not objectp(m_boardMgr) then
    me.createManager()
  end if
  createTimeout("LateBillboardActivator", 1000, #LateActivation, me.getID(), VOID, 1)
end
on LateActivation me
  tRoomTag = getThread(#RoomInfo).getComponent().getRoomTag()
  t = 1
  tSomeThere = 1
  repeat while tSomeThere
    t_sTextName = "room." & tRoomTag & ".board." & t
    if textExists(t_sTextName) then
      m_boardMgr.InitBillBoard(value(getText("room." & tRoomTag & ".board." & t)), tRoomTag)
    else
      tSomeThere = 0
    end if
    t = t + 1
  end repeat
end