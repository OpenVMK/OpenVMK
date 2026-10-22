-- Movie Script
property m_ar_list

on construct me
  m_ar_list = []
  return 1
end
on deconstruct me
  m_ar_list = []
  return 1
end
on importWords me, i_cMemName
  tt = the milliSeconds
  t_cText = member(getmemnum(i_cMemName)).text
  t_iCount = the number of words in t_cText
  repeat with i = 1 to t_iCount
    m_ar_list.append(word i of t_cText)
  end repeat
  tt = the milliSeconds - tt
end
on addWord me, t_sWord
  m_ar_list.append(t_sWord)
end
on addWords me, t_ar_sWords
  repeat with tWord in t_ar_sWords
    m_ar_list.append(tWord)
  end repeat
end
on wordListRef me
  return m_ar_list
end
on getIndexOfWord me, a_cWord
  return m_ar_list.getPos(a_cWord)
end
on getWordOfIndex me, i_iIndex
  if i_iIndex <= m_ar_list.count and i_iIndex >= 1 then
    return m_ar_list[i_iIndex]
  else
  end if
  return EMPTY
end
on dumpListToMember me, o_member
  t_text = EMPTY
  repeat with i = 1 to m_ar_list.count
    t_text = t_text & i & TAB & m_ar_list[i] & RETURN
  end repeat
  o_member.text = t_text
  o_member.copyToClipboard()
end