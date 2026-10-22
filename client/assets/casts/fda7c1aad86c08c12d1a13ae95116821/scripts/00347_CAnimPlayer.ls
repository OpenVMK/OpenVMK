-- Script
property m_iFps
property m_iCurFrm
property m_iMaxFrm
property m_bLooper
property m_bRandom
property m_ar_rTrk

on construct this
  m_iCurFrm = 1
  m_iMaxFrm = 0
  m_bLooper = 0
  m_bRandom = 0
  m_ar_rTrk = []
  return 1
end
on deconstruct this
  m_iCurFrm = 1
  m_iMaxFrm = 0
  m_bLooper = 0
  m_bRandom = 0
  m_ar_rTrk = []
  return 1
end
on load this, a_sAnim
  return 0
end
on start this
  return 0
end
on stop this
  return 0
end
on pause this
  return 0
end
on resume this
  return 0
end