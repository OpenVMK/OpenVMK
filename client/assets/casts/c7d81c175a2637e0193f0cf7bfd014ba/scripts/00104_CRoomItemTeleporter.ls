-- Script
property m_bReady

on construct this
  m_bReady = 0
  return 1
end
on update this
  if not m_bReady then
    this._Init()
  end if
end
on _Init this
  t_rObj = this.getObject()
  t_rObj.SetParam("TELEPORTER", 1)
  this.GetTheTileStack().SetParam("CLASS", "teleport")
  m_bReady = 1
end