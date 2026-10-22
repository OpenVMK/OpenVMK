-- Script
property m_iGameCode
property m_ar_rItems
property m_iSelected

on construct this
  m_iGameCode = 0
  m_ar_rItems = []
  m_iSelected = 0
  return 1
end
on deconstruct this
  m_ar_rItems = []
  return 1
end
on StartGame this
  getConnection("VMK").send(952, [#integer: m_iGameCode])
end
on WatchGame this
  t_iSelected = this.GetSelectedGame().instance
  if t_iSelected > -1 then
    getConnection("VMK").send(955, [#integer: m_iGameCode, #integer: t_iSelected])
  end if
end
on SetGameList this, a_ar_rGames
  m_ar_rItems = a_ar_rGames
end
on GetGameList this
  return m_ar_rItems
end
on GetSelectedGame this
  if m_iSelected > 0 then
    return m_ar_rItems[m_iSelected]
  else
    return [#players: [], #instance: -1]
  end if
end