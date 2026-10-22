-- Script
property m_rSound
property m_bReady
property m_iLastState

on construct this
  m_iLastState = 0
  m_rSound = VOID
  m_bReady = 0
  return 1
end
on select this
  if the doubleClick then
    t_iRef = integer(this.getObject().GetParam("REF"))
    getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
    return callAncestor(#select, this)
  end if
end
on setState this, a_iState
  if a_iState <> m_iLastState then
    if not (voidp(m_rSound) or m_rSound = 0) then
      executeMessage("PlayFxSound", m_rSound)
    end if
  end if
  m_iLastState = a_iState
end
on update this
  if not m_bReady then
    this._Init()
  end if
end
on _Init this
  tItemType = this.getObject().GetParam("TYPE")
  m_rSound = getVariable("item." & tItemType & ".state.1")
  this.getObject().GetVisual().SetBlockVisualCursors([getMember("cursor.finger"), getMember("cursor.finger.mask")], [[1]])
  m_bReady = 1
end