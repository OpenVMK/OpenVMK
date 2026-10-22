-- Script
property m_iInertia
property m_iK
property m_vDestination
property m_vLocation
property m_iDeltaX
property m_iDeltaY

on construct me
  m_iInertia = 1.84999990463257
  m_iK = 1.1599999666214
  m_vDestination = vector(0, 0, 0)
  m_vLocation = vector(0, 0, 0)
  m_iDeltaX = 0
  m_iDeltaY = 0
  return 1
end
on deconstruct me
end
on update me
  t_iX = -m_vLocation.x + m_vDestination.x
  t_iY = -m_vLocation.y + m_vDestination.y
  m_iDeltaX = m_iDeltaX * m_iInertia + t_iX * m_iK
  m_iDeltaY = m_iDeltaY * m_iInertia + t_iY * m_iK
  m_vLocation.x = m_vLocation.x + m_iDeltaX
  m_vLocation.y = m_vLocation.y + m_iDeltaY
  t_dz = m_vDestination.z - m_vLocation.z
  m_vLocation.z = m_vLocation.z + t_dz / 10
end
on setAnchorPoint me, tP
  m_vDestination = tP.duplicate()
end
on setBobPosition me, tP
  m_vLocation = tP.duplicate()
end
on getPos me
  return m_vLocation
end