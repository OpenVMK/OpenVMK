-- Script
property m_ar_data

on construct me
  m_ar_data = []
  return 1
end
on deconstruct me
  return 1
end
on top me
  if not me.isEmpty() then
    return m_ar_data[the count of m_ar_data]
  end if
  return VOID
end
on pop me
  if not me.isEmpty() then
    t_rdata = m_ar_data[m_ar_data.count]
    m_ar_data.deleteAt(m_ar_data.count)
    return t_rdata
  end if
  return VOID
end
on push me, t_rdata
  m_ar_data.append(t_rdata)
end
on isEmpty me
  return the count of m_ar_data = 0
end
on units me
  return the count of m_ar_data
end
on Shift me
  if not me.isEmpty() then
    t_rdata = m_ar_data[1]
    m_ar_data.deleteAt(1)
    return t_rdata
  end if
  return VOID
end
on unshift me, t_rdata
  m_ar_data.addAt(1, t_rdata)
  return the count of m_ar_data
end
on flush me
  m_ar_data.deleteAll()
end
on toString me
  t_s = "["
  repeat with i = 1 to m_ar_data.count
    t_rdata = m_ar_data[i]
    put t_rdata after t_s
    if i <> m_ar_data.count then
      put ", " after t_s
    end if
  end repeat
  put "]" after t_s
  return t_s
end