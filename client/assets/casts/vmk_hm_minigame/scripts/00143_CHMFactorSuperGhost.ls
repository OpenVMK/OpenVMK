-- Script
property m_fTurnSpacing
property m_iMoveDelay
property m_rSpring
property m_iMood

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
  me.getObject().SetAbsPos(m_rSpring.getPos())
end
on move me
end
on SetMoveTarget me, a_vPos, i_iDirection, i_iMood
  me.getObject().SetParam("WorldPosition", a_vPos)
  m_rSpring.setAnchorPoint(vector(a_vPos.x, a_vPos.y, a_vPos.z))
  if not voidp(i_iMood) then
    m_iMood = i_iMood
  end if
  me.getObject().GetVisual().setDirection(i_iDirection, i_iMood)
  me.SyncGameParameters()
end
on SyncGameParameters me
  t_params = []
  t_params[1] = m_iMoveDelay
  me.getObject().SetParam("GameParams", t_params)
end
on UpdateParameters me, i_ar_data
  put "Ghost updates data" && i_ar_data
end