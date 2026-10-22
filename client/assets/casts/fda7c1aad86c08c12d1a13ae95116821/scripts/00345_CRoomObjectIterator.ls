-- Script
property m_iIndex
property m_rContainer
property m_mp_iRef_sKey

on NextToken this
  if integerp(m_iIndex) then
    if m_mp_iRef_sKey.count < m_iIndex + 1 then
      return 0
    else
      m_iIndex = m_iIndex + 1
      return 1
    end if
  else
    return error(this, "Uninitialized iterator!", #NextToken)
  end if
end
on PrevToken this
  if integerp(m_iIndex) then
    if m_iIndex = 1 or m_iIndex - 1 > m_mp_iRef_sKey.count then
      return 0
    else
      m_iIndex = m_iIndex - 1
      return 1
    end if
  else
    return error(this, "Uninitialized iterator!", #PrevToken)
  end if
end
on CurrIndex this
  if integerp(m_iIndex) then
    return m_iIndex > 0 and m_iIndex <= the count of m_mp_iRef_sKey
  else
    return error(this, "Uninitialized iterator!", #CurrToken)
  end if
end
on FirstToken this
  if integerp(m_iIndex) then
    m_iIndex = 1
    return the count of m_mp_iRef_sKey > 0
  else
    return error(this, "Uninitialized iterator!", #FirstToken)
  end if
end
on LastToken this
  if integerp(m_iIndex) then
    m_iIndex = m_mp_iRef_sKey.count
    return m_iIndex > 0
  else
    return error(this, "Uninitialized iterator!", #LastToken)
  end if
end
on getToken this
  if m_mp_iRef_sKey.count < m_iIndex then
    return VOID
  else
    return m_rContainer.GetObjByKey(m_mp_iRef_sKey[m_iIndex])
  end if
end
on GetCount this
  return the count of m_mp_iRef_sKey
end
on clear this
  m_rContainer = VOID
  m_mp_iRef_sKey = VOID
  m_iIndex = VOID
end
on _FeedObjMap this, a_rContainer, a_mp_iRef_sKey
  m_rContainer = a_rContainer
  m_mp_iRef_sKey = a_mp_iRef_sKey
  m_iIndex = 1
end