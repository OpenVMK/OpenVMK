-- Parent Script
property m_fTurnSpacing
property m_iMoveDelay
property m_rSpring
property m_iMood
property m_bDebugMotion

on SetConstants me
  m_iMood = 0
  m_fTurnSpacing = 1.64999997615814
  m_iMoveDelay = me.getObject().GetParam("GameParams")[1]
  t_vWorldPos = me.getObject().GetParam("WorldPosition")
  t_vePos = vector(t_vWorldPos.x, t_vWorldPos.y, t_vWorldPos.z)
  m_rSpring = createObject(#random, "CHMSimpleSpring")
  m_rSpring.setAnchorPoint(t_vePos)
  m_rSpring.setBobPosition(t_vePos)
end
on deconstruct me
  if not voidp(m_rSpring) then
    removeObject(m_rSpring.getID())
  end if
  return 1
end
on update me
  m_rSpring.update()
  t_vePos = m_rSpring.getPos()
  me.getObject().SetAbsPos(t_vePos)
end
on move me
end
on SetMoveTarget me, a_vPos, i_iDirection, i_iMood
  case i_iMood of
    0:
      m_iMoveDelay = 3
    1:
      m_iMoveDelay = 2
    2:
      m_iMoveDelay = 2
    otherwise:
      m_iMoveDelay = 3

  end case
  me.getObject().SetParam("WorldPosition", a_vPos)
  m_rSpring.setAnchorPoint(vector(a_vPos.x, a_vPos.y, a_vPos.z))
  if m_bDebugMotion then
    trace("Ghost debug setAnchorpoint:" && [a_vPos.x, a_vPos.y, a_vPos.z])
  end if
  if not voidp(i_iMood) then
    m_iMood = i_iMood
  end if
  me.getObject().GetVisual().setDirection(i_iDirection, i_iMood)
  me.SyncGameParameters()
end
on SyncGameParameters me
  t_params = []
  t_params[1] = m_iMoveDelay
  t_params[2] = m_iMood
  me.getObject().SetParam("GameParams", t_params)
end
on UpdateParameters me, i_ar_data
  put "Ghost updates data" && i_ar_data
end