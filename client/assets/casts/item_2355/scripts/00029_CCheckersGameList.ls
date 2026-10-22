-- Script
property m_rBuffer
property m_rElement
property m_rComponent
property m_iPollInterval

on construct this
  m_iGameCode = 1
  this.m_iGameCode = 1
  if variableExists("checkers.polling.interval") then
    m_iPollInterval = getVariable("checkers.polling.interval")
  else
    m_iPollInterval = 30000
  end if
  this._PollOngoingGames()
  return 1
end
on deconstruct this
  if objectp(m_rComponent) then
    removeObject(m_rComponent.getID())
    m_rComponent = VOID
  end if
  return 1
end
on render this
  m_rElement.feedImage(m_rComponent.render())
end
on SetGameList this, a_ar_rGames
  callAncestor(#SetGameList, this, a_ar_rGames)
  if objectp(m_rComponent) then
    removeObject(m_rComponent.getID())
    m_rComponent = VOID
  end if
  m_rComponent = createObject(getUniqueID(), "CUIComponentPage")
  m_rComponent.setSize(m_rElement.pOwnW, m_rElement.pOwnH)
  m_rComponent.setColor(rgb("#001F56"))
  t_iCount = a_ar_rGames.count
  repeat with i = 1 to t_iCount
    t_rComponent = m_rComponent.addComponent("component.casual.gamelist.watch.item.xml")
    t_sText = EMPTY
    t_sPlayer = a_ar_rGames[i].players[1].name
    t_sScore = string(a_ar_rGames[i].players[1].score)
    put t_sPlayer && "Lvl:" & t_sScore & RETURN & "vs" & RETURN after t_sText
    t_sPlayer = a_ar_rGames[i].players[2].name
    t_sScore = string(a_ar_rGames[i].players[2].score)
    put t_sPlayer && "Lvl:" & t_sScore after t_sText
    t_rComponent.GetLayout(1).setText(t_sText)
  end repeat
  m_rElement.feedImage(m_rComponent.render())
end
on GetSelectedGame this
  if objectp(m_rComponent) then
    t_iIndex = m_rComponent.GetActiveComponentID()
    t_ar_rGames = this.GetGameList()
    if t_iIndex > 0 and t_iIndex <= t_ar_rGames.count then
      return t_ar_rGames[t_iIndex]
    end if
  end if
  return [#players: [], #instance: -1]
end
on SetImageElement this, a_rElem
  m_rElement = a_rElem
  this.SetGameList(this.GetGameList())
end
on GetImageElement this
  return m_rElement
end
on EventProc this, a_kEvent, a_sElement, a_ptOffset, a_sWindow
  t_rEvent = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
  if m_rComponent.EventProc(a_ptOffset, t_rEvent) then
    this.render()
    t_iIndex = m_rComponent.getComponentID(t_rEvent.route[1])
    this.m_iSelected = t_iIndex
  end if
end
on _PollOngoingGames this
  if this.valid then
    getConnection("VMK").send("GetOngoingGames", [#integer: this.m_iGameCode])
    this.delay(m_iPollInterval, #_PollOngoingGames)
  end if
end