-- Script
property m_ar_subturns
property m_iNumber
property m_iChecksum
property m_bTested

on new me, a_ar_turnData, a_iNumber, a_iChecksum, a_bTested
  m_ar_subturns = []
  m_iNumber = -1
  m_bTested = 0
  if not voidp(a_ar_turnData) then
    repeat with subturn in a_ar_turnData
      m_ar_subturns.append(subturn)
    end repeat
  end if
  if not voidp(a_iNumber) then
    m_iNumber = a_iNumber
  end if
  if not voidp(a_iChecksum) then
    m_iChecksum = a_iChecksum
  end if
  if not voidp(a_bTested) then
    m_bTested = a_bTested
  end if
  return me
end
on AddElement me, i_iSubturn, i_rElement
  if m_ar_subturns.count < i_iSubturn then
    repeat with i = m_ar_subturns.count + 1 to i_iSubturn
      m_ar_subturns.append([])
    end repeat
  end if
  if not voidp(i_rElement) then
    m_ar_subturns[i_iSubturn].append(i_rElement)
  end if
end
on SetNumber me, i_iNumber
  m_iNumber = i_iNumber
end
on SetChecksum me, i_iChecksum
  m_iChecksum = i_iChecksum
end
on GetSubTurn me, i_iSubturn
  if i_iSubturn > m_ar_subturns.count or i_iSubturn < 1 then
    put "MGEngine : Requested subturn " & i_iSubturn & " that does not exist"
    return []
  end if
  return m_ar_subturns[i_iSubturn]
end
on GetNSubTurns me
  return the count of m_ar_subturns
end
on GetNumber me
  return m_iNumber
end
on GetChecksum me
  return m_iChecksum
end
on GetTested me
  return m_bTested
end
on SetTested me, a_bVal
  m_bTested = a_bVal
end
on duplicate me
  return new(script("CTurnContainer"), m_ar_subturns, m_iNumber, m_iChecksum)
end