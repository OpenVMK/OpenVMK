-- Behavior
on construct me
  me._Config(1)
  return 1
end
on deconstruct me
  me._Config(0)
  return 1
end
on _Config this, a_bBool
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2591, #_LeaveRoom)
  if a_bBool then
    registerListener(t_sID, this.getID(), t_rList)
  else
    unregisterListener(t_sID, this.getID(), t_rList)
  end if
  return 1
end
on _LeaveRoom me
  me.getComponent().SetLeaveRoomCalled()
end