-- Script
on select this
  if getObject(#session).get("RoomType") = #public then
    t_rEventProcessor = getObject("RoomEventProcessor")
    if t_rEventProcessor <> 0 then
      t_rEventProcessor.reset()
    end if
  end if
end