-- Parent Script
property m_iGameCode
property m_ar_rScore
property m_iSelected
property m_ar_rQueryStack

on construct this
  m_iGameCode = 0
  m_ar_rScore = []
  m_iSelected = 0
  m_ar_rQueryStack = []
  return 1
end
on deconstruct this
  return 1
end
on RequireScoreList this, a_iFirst, a_iLast
  m_ar_rQueryStack.add([#first: a_iFirst, #last: a_iLast, #scores: []])
  getConnection("VMK").send("GetHighScores", [#integer: m_iGameCode, #integer: a_iFirst, #integer: a_iLast])
end
on GetScoreList this
  return m_ar_rScore
end
on SetScoreList this, a_ar_rScore
  if m_ar_rQueryStack.count then
    t_rQuery = m_ar_rQueryStack[1]
    t_rQuery.scores = a_ar_rScore
    m_ar_rQueryStack.deleteAt(1)
  else
    t_rQuery = [#first: 1, #last: a_ar_rScore.count, #scores: a_ar_rScore]
  end if
  m_ar_rScore.add(t_rQuery)
end
on GetSelectedScore this
  if m_iSelected > 0 then
    repeat with i = 1 to m_ar_rScore.count
      if m_iSelected >= m_ar_rScore[i].first then
        if m_iSelected <= m_ar_rScore[i].last then
          return m_ar_rScore[i].scores[m_iSelected - the first of m_ar_rScore[i] + 1]
        end if
      end if
    end repeat
  end if
  return [#player: -1, #name: EMPTY, #score: 0]
end