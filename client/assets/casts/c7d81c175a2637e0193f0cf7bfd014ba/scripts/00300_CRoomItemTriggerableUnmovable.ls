-- Movie Script
on select this
  t_rEventProcessor = getObject("RoomEventProcessor")
  if t_rEventProcessor <> 0 then
    t_rEventProcessor.reset()
  end if
  if the doubleClick then
    t_iRef = integer(this.getObject().GetParam("REF"))
    getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
  end if
end