-- Score Script
property m_rElement
property m_rItemList

on construct me
  m_rElement = VOID
  m_rItemList = VOID
  return 1
end
on deconstruct me
  if not voidp(m_rItemList) then
    removeObject(m_rItemList.getID())
  end if
  return 1
end
on SetElement me, a_rElement
  m_rElement = a_rElement
  if m_rElement <> 0 then
    m_rItemList = createObject(#random, "CHighscoreItemList")
    if m_rItemList = 0 then
      return error(me, "Failed to create Highscore Item List", #SetElement)
    end if
    m_rItemList.SetWidth(m_rElement.getProperty(#width))
  end if
end
on SetRenderColor me, a_rgbColor
  if objectp(m_rItemList) then
    m_rItemList.SetTextColor(a_rgbColor)
  end if
end
on SetHighScores me, a_mp_highscoretable, a_bForceRender
  if objectp(m_rElement) and not voidp(m_rItemList) then
    if a_bForceRender then
      if listp(a_mp_highscoretable) then
        m_rElement.feedImage(m_rItemList.createTopics(a_mp_highscoretable))
      end if
    else
      if a_mp_highscoretable.count > 0 then
        m_rElement.feedImage(m_rItemList.createTopics(a_mp_highscoretable))
      end if
    end if
  end if
  executeMessage(#SetHighScores, m_rElement)
end