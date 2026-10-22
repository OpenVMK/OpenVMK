-- Script
property m_mp_ThumbsCache

on construct this
  m_mp_ThumbsCache = [:]
  return 1
end
on deconstruct this
  m_mp_ThumbsCache = VOID
  return 1
end
on GetCachedItem me, a_iItemID
  t_iPos = m_mp_ThumbsCache.findPos(a_iItemID)
  if t_iPos > 0 then
    return m_mp_ThumbsCache[t_iPos]
  else
    return VOID
  end if
end
on AddItemToCache me, a_iItemID, a_mp_Data
  t_iPos = m_mp_ThumbsCache.findPos(a_iItemID)
  if t_iPos = 0 then
    m_mp_ThumbsCache.addProp(a_iItemID, a_mp_Data)
  else
    m_mp_ThumbsCache[t_iPos] = a_mp_Data
  end if
end