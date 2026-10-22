-- Script
property m_fRangeMin
property m_fRangeMax
property m_fN
property m_fSlope
property m_syFinish

on Init me, a_rangestart, a_rangeend, a_param1, a_param2, a_param3
  m_fRangeMin = float(a_rangestart)
  m_fRangeMax = float(a_rangeend)
  m_fN = float(a_param1)
  m_fSlope = float(a_param2)
  m_syFinish = symbol(a_param3)
end
on get me, a_x
  case m_syFinish of
    #early:
      tVal = (m_fRangeMax - m_fRangeMin) / m_fN * m_fSlope * (a_x / m_fN) + m_fRangeMin
    #late:
      tVal = (m_fRangeMax - m_fRangeMin) / m_fN * m_fSlope * (a_x / m_fN) + m_fRangeMax - m_fSlope * (m_fRangeMax - m_fRangeMin)
    #otherwise:
      return error(me, "Slope invalid type", #get)

  end case
  if tVal > max([m_fRangeMax, m_fRangeMin]) then
    tVal = max([m_fRangeMax, m_fRangeMin])
  else
    if tVal < min([m_fRangeMax, m_fRangeMin]) then
      tVal = min([m_fRangeMax, m_fRangeMin])
    end if
  end if
  return tVal
end