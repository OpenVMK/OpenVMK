-- Script
property m_stage

on construct me
  m_stage = VOID
  registerMessage(#room_ready, me.getID(), #RoomReady)
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready)
  if objectp(m_stage) then
    removeObject(m_stage.getID())
  end if
  return 1
end
on GetSpline me
  if m_stage <> 0 then
    return m_stage.GetBaseSpline()
  else
    return VOID
  end if
end
on RoomReady me
  m_stage = createObject("cambodian_boats", "CStage")
  if objectp(m_stage) then
    m_stage.LoadXML("cambodian.stage1.xml")
    receiveUpdate(me.getInterface().getID())
  end if
end