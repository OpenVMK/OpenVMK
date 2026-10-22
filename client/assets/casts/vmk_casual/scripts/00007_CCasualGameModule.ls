-- Score Script
property m_iGameTypeCode
property m_ar_sEngineClass
property m_mp_iRef_rEngine

on construct this
  m_iGameTypeCode = 0
  m_ar_sEngineClass = GetClsVariable("casual.engine.class")
  m_mp_iRef_rEngine = [:]
  return 1
end
on deconstruct this
  executeMessage("unregister_game_module", this)
  repeat with t_rEngine in m_mp_iRef_rEngine
    removeObject(t_rEngine.getID())
  end repeat
  m_mp_iRef_rEngine = VOID
  return 1
end
on GetGameTypeCode this
  return m_iGameTypeCode
end
on GetGameInstance this, a_iGameID
  return m_mp_iRef_rEngine.getaProp(a_iGameID)
end
on ShowInterface this, a_kType
  case a_kType of
    #play:
    #watch:
    #score:

  end case
end
on GetPlayInterface this
  return VOID
end
on GetGameListInterface this
  return VOID
end
on GetHighScoreInterface this
  return VOID
end
on OnCreateGame this, a_iGameID, a_rMsg
  if voidp(m_mp_iRef_rEngine.getaProp(a_iGameID)) then
    t_rInstance = createObject(getUniqueID(), m_ar_sEngineClass)
    t_rInstance.setup(a_iGameID, getThread(#room).component._AccessRoom())
    m_mp_iRef_rEngine.setaProp(a_iGameID, t_rInstance)
  else
    error(this, "Game instance with given id" && a_iGameID && "already exists!", #OnCreateGame)
  end if
end
on OnAddPlayer this, a_iGameID, a_iAvatarRef, a_rMsg
  m_mp_iRef_rEngine.getaProp(a_iGameID).AddPlayer(a_iAvatarRef, a_rMsg)
end
on RemovePlayer this, a_iGameID, a_iAvatarRef, a_rMsg
  m_mp_iRef_rEngine.getaProp(a_iGameID).RemovePlayer(a_iAvatarRef, a_rMsg)
end
on OnGameStart this, a_iGameID, a_rMsg
  m_mp_iRef_rEngine.getaProp(a_iGameID).GameStart(a_rMsg)
end
on OnGameEnd this, a_iGameID, a_iWinnerRef, a_rMsg
  m_mp_iRef_rEngine.getaProp(a_iGameID).GameEnd(a_iWinnerRef, a_rMsg)
end
on OnGameEvent this, a_iGameID, a_iEventType, a_rMsg
  m_mp_iRef_rEngine.getaProp(a_iGameID).GameEvent(a_iEventType, a_rMsg)
end
on OnNextTurn this, a_iGameID, a_iAvatarRef, a_rMsg
  m_mp_iRef_rEngine.getaProp(a_iGameID).NextTurn(a_iAvatarRef, a_rMsg)
end
on OnGameDetails this, a_ar_rPlayers
end
on OnPlayerDetails this, a_rPlayer
end
on OnNextGameStarting this, a_iSeconds
end
on OnNextGameCanceled this
end