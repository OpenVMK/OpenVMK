-- Script
property m_rElement
property m_rBuffer
property m_rComponent

on construct this
  this.m_iGameCode = 1
  this.RequireScoreList(1, 20)
  return 1
end
on deconstruct this
  m_rElement = VOID
  return 1
end
on render this
  m_rElement.feedImage(m_rComponent.render())
end
on StartGame this
  put "TODO: Challenge player!"
end
on SetScoreList this, a_ar_rScore
  callAncestor(#SetScoreList, this, a_ar_rScore)
  if objectp(m_rComponent) then
    removeObject(m_rComponent.getID())
    m_rComponent = VOID
  end if
  m_rComponent = createObject(getUniqueID(), "CUIComponentPage")
  m_rComponent.setSize(m_rElement.pOwnW, m_rElement.pOwnH)
  m_rComponent.setColor(rgb("#001F56"))
  t_iCount = a_ar_rScore.count
  repeat with i = 1 to t_iCount
    t_rComponent = m_rComponent.addComponent("component.casual.gamelist.item.xml")
    t_sText = EMPTY
    t_sPlayer = a_ar_rScore[i].name
    t_sScore = string(a_ar_rScore[i].score)
    put t_sPlayer && "Lvl:" & t_sScore after t_sText
    t_rComponent.GetLayout(1).setText(t_sText)
  end repeat
  m_rElement.feedImage(m_rComponent.render())
end
on SetImageElement this, a_rElement
  m_rElement = a_rElement
end
on GetImageElement this
  return m_rElement
end
on EventProc this, a_kEvent, a_sElement, a_ptOffset, a_sWindow
  t_rEvent = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
  if not voidp(m_rComponent) then
    if m_rComponent.EventProc(a_ptOffset, t_rEvent) then
      this.render()
      t_iIndex = m_rComponent.getComponentID(t_rEvent.route[1])
      this.m_iSelected = t_iIndex
    end if
  end if
end