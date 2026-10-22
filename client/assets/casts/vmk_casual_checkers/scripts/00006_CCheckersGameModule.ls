-- Script
property m_sInterface

on construct this
  m_sInterface = getUniqueID()
  this.m_iGameTypeCode = 1
  this.m_ar_sEngineClass = GetClsVariable("checkers.engine.class")
  executeMessage("register_game_module", this)
  return 1
end
on deconstruct this
  if objectExists(m_sInterface) then
    removeObject(m_sInterface)
  end if
  t_sCounter = "CheckersNextGameCounter"
  if objectExists(t_sCounter) then
    removeObject(t_sCounter)
  end if
  return callAncestor(#deconstruct, this)
end
on getInterface this
  return getObject(m_sInterface)
end
on ShowInterface this, a_kType
  if not objectExists(m_sInterface) then
    createObject(m_sInterface, "CCheckersLobbyInterface")
  end if
  getObject(m_sInterface).open(a_kType)
end
on GetGameListInterface this
  return this.getInterface()
end
on GetHighScoreInterface this
  return this.getInterface()
end
on OnGameDetails this, a_ar_rPlayers
  this.getInterface().SetGameDetails(a_ar_rPlayers)
end
on OnPlayerDetails this, a_rPlayer
  this.getInterface().SetAvatarFigure(a_rPlayer)
end
on OnNextGameStarting this, a_iSeconds
  t_sCounter = "CheckersNextGameCounter"
  if objectExists(t_sCounter) then
    t_rCounter = getObject(t_sCounter)
  else
    t_rCounter = createObject(t_sCounter, "CCheckersNextGameCountDown")
  end if
  t_rCounter.updateCounter(a_iSeconds)
  if a_iSeconds = 1 then
    t_rCounter.delay(1000, #Destroy)
  end if
end
on OnNextGameCanceled this
  t_sCounter = "CheckersNextGameCounter"
  if objectExists(t_sCounter) then
    removeObject(t_sCounter)
  end if
end