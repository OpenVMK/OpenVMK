-- Parent Script
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
  t_rTileStack = this.GetTheTileStack()
  if not voidp(t_rTileStack) then
    t_rTileStack.SetParam("CLASS", "sit")
    m_bReady = 1
  end if
end