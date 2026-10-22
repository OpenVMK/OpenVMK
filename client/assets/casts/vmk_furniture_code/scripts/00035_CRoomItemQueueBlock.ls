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
  this.GetTheTileStack().SetParam("CLASS", "queue")
  m_bReady = 1
end