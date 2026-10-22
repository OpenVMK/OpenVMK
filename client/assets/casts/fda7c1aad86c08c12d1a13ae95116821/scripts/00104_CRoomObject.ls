-- Script
property m_bRunning
property m_rVisual
property m_rFactor

on construct this
  t_sClass = "room.class.factor." & this.GetParam("CLASS")
  if variableExists(t_sClass) then
    t_ar_sClass = GetClsVariable(t_sClass)
    t_sItemType = this.GetParam("TYPE")
    t_sObjectCode = "CRoomObjectType" & t_sItemType
    if memberExists("item." & t_sItemType & ".ani.xml") then
      t_ar_sClass.append("CRoomItemStateAnimator")
    end if
    if variableExists(t_sObjectCode) then
      t_ar_sExtend = GetClsVariable(t_sObjectCode)
      repeat with t_sCls in t_ar_sExtend
        t_ar_sClass.append(t_sCls)
      end repeat
    end if
    m_rFactor = createObject(#temp, t_ar_sClass)
  else
    m_rFactor = createObject(#temp, GetClsVariable("room.class.factor"))
  end if
  t_sClass = "room.class.visual." & this.GetParam("CLASS")
  if variableExists(t_sClass) then
    m_rVisual = createObject(#temp, GetClsVariable(t_sClass))
  else
    m_rVisual = createObject(#temp, GetClsVariable("room.class.visual"))
  end if
  m_rFactor.SetObject(this)
  m_rVisual.SetObject(this)
  m_bRunning = 1
  return 1
end
on deconstruct this
  if objectp(m_rVisual) then
    deconstruct(m_rVisual)
  end if
  if objectp(m_rFactor) then
    deconstruct(m_rFactor)
  end if
  m_rVisual = VOID
  m_rFactor = VOID
  m_bRunning = 0
  return 1
end
on GetVisual this
  return m_rVisual
end
on GetFactor this
  return m_rFactor
end
on getObject this
  return this
end
on GetContext this
  if objectp(this.GetOwner()) then
    return this.GetOwner().GetContext()
  end if
end
on update this
  if m_bRunning then
    m_rFactor.update()
    m_rVisual.update()
    callAncestor(#update, this)
  end if
end
on TellVisual this, a_kMethod, a_vArgA, a_vArgB, a_vArgC
  if m_bRunning then
    call(a_kMethod, [m_rVisual], a_vArgA, a_vArgB, a_vArgC)
  end if
end
on TellFactor this, a_kMethod, a_vArgA, a_vArgB, a_vArgC
  if m_bRunning then
    call(a_kMethod, [m_rFactor], a_vArgA, a_vArgB, a_vArgC)
  end if
end