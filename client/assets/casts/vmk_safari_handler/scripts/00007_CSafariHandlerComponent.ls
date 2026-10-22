-- Score Script
property m_stage

on construct me
  m_stage = VOID
  registerMessage(#room_ready, me.getID(), #RoomReady)
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready)
  if not voidp(m_stage) then
    removeObject(m_stage.getID())
  end if
  return 1
end
on GetSpline me
  return m_stage.GetBaseSpline()
end
on RoomReady me
  m_stage = createObject("safari_boats", "CStage")
  m_stage.LoadXML("safari.stage1.xml")
  receiveUpdate(me.getInterface().getID())
end