-- Score Script
property m_visible
property m_iFoundMickeys
property m_iTotalMickeys

on construct me
  m_visible = 0
  m_iFoundMickeys = 0
  m_iTotalMickeys = 0
end
on deconstruct me
end
on setQuestStatus me, i_iFoundMickeys, i_iTotalMickeys
  m_iFoundMickeys = i_iFoundMickeys
  m_iTotalMickeys = i_iTotalMickeys
end
on getQuestStatus me
  return [#foundMickeys: m_iFoundMickeys, #totalMickeys: m_iTotalMickeys]
end