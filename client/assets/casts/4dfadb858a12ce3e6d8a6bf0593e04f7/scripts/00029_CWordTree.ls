-- Script
property m_cTerminator
property m_mp_cCharTable

on construct this
  m_cTerminator = "#"
  return this.ClearWords()
end
on deconstruct this
  return this.ClearWords()
end
on ClearWords this
  m_mp_cCharTable = [:]
  m_mp_cCharTable.sort()
  return 1
end
on AppendWords this, a_ar_cWords
  repeat with t_cWord in a_ar_cWords
    t_ar_cArrPtr = m_mp_cCharTable
    t_iLength = t_cWord.length
    repeat with i = 1 to t_iLength
      t_cChar = char i of t_cWord
      t_ar_cNewPtr = t_ar_cArrPtr.getaProp(t_cChar)
      if voidp(t_ar_cNewPtr) then
        t_ar_cNewPtr = [:]
        t_ar_cNewPtr.sort()
        t_ar_cArrPtr.setaProp(t_cChar, t_ar_cNewPtr)
      end if
      t_ar_cArrPtr = t_ar_cNewPtr
      if i = t_iLength then
        t_ar_cArrPtr.setaProp(m_cTerminator, [:])
      end if
    end repeat
  end repeat
  return 1
end
on FindWord this, a_cWord
  t_ar_cArrPtr = m_mp_cCharTable
  t_iLength = a_cWord.length
  t_cReturn = EMPTY
  repeat with i = 1 to t_iLength
    t_cNext = char i of a_cWord
    t_ar_cArrPtr = t_ar_cArrPtr.getaProp(t_cNext)
    if voidp(t_ar_cArrPtr) then
      return t_cReturn
    end if
    put t_cNext after t_cReturn
  end repeat
  if voidp(t_ar_cArrPtr.getaProp(m_cTerminator)) then
    repeat while 1
      if t_ar_cArrPtr.count = 0 then
        exit repeat
      end if
      t_cNext = t_ar_cArrPtr.getPropAt(1)
      if t_cNext = m_cTerminator then
        exit repeat
      end if
      put t_cNext after t_cReturn
      t_ar_cArrPtr = t_ar_cArrPtr.getaProp(t_cNext)
    end repeat
  end if
  return t_cReturn
end