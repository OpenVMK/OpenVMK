-- Script
property m_bReady

on construct me
  m_bReady = 0
  return 1
end
on select this
  t_rEventProcessor = getObject("RoomEventProcessor")
  if t_rEventProcessor <> 0 then
    t_rEventProcessor.reset()
  end if
end
on update this
  if not m_bReady then
    this._Init()
  end if
end
on _Init this
  t_rObj = this.getObject()
  if t_rObj.GetVisual().IsReady() then
    repeat with t_rBlk in this.getObject().GetFactor().GetBlocks()
      t_rBlk.SetParam("ACT", "2")
    end repeat
    m_bReady = 1
  end if
end