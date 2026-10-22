-- Script
property m_mp_iGameID_iCode
property m_mp_iCode_rModule
property m_mp_sType_rDialog

on construct this
  m_mp_iGameID_iCode = [:]
  m_mp_iCode_rModule = [:]
  m_mp_sType_rDialog = [:]
  registerMessage("register_game_module", this.getID(), #RegisterGameModule)
  registerMessage("unregister_game_module", this.getID(), #UnregisterGameModule)
  registerMessage("acquire_game_module", this.getID(), #AcquireGameModule)
  registerMessage("casual_game_interface", this.getID(), #ShowInterface)
  registerMessage("room_leave", this.getID(), #RemoveDialogs)
  this._RegisterServerMessageHandlers(1)
  return 1
end
on deconstruct this
  this._RegisterServerMessageHandlers(0)
  this.RemoveDialogs()
  unregisterMessage("register_game_module", this.getID())
  unregisterMessage("unregister_game_module", this.getID())
  unregisterMessage("acquire_game_module", this.getID())
  unregisterMessage("casual_game_interface", this.getID())
  unregisterMessage("room_leave", this.getID())
  m_mp_iGameID_iCode = VOID
  m_mp_iCode_rModule = VOID
  return 1
end
on RegisterGameModule this, a_rModule
  if this.valid then
    t_iCode = a_rModule.GetGameTypeCode()
    if voidp(m_mp_iCode_rModule.getaProp(t_iCode)) then
      m_mp_iCode_rModule.setaProp(t_iCode, a_rModule)
    else
      error(this, "Given module already registered!", #RegisterGameModule)
    end if
  end if
end
on UnregisterGameModule this, a_rModule
  if this.valid then
    m_mp_iCode_rModule.deleteProp(a_rModule.GetGameTypeCode())
  end if
end
on AcquireGameModule this, a_rOutput
  repeat with i = 1 to a_rOutput.count
    t_iCode = a_rOutput.getPropAt(i)
    t_rModule = m_mp_iCode_rModule.getaProp(t_iCode)
    a_rOutput[i] = t_rModule
  end repeat
end
on ShowInterface this, a_iGameCode, a_kInterface
  t_rModule = m_mp_iCode_rModule.getaProp(a_iGameCode)
  if objectp(t_rModule) then
    t_rModule.ShowInterface(a_kInterface)
  end if
end
on RemoveDialogs this
  repeat with t_rDialog in m_mp_sType_rDialog
    removeDialogWindow(t_rDialog.getID())
  end repeat
  m_mp_sType_rDialog = [:]
end
on _RegisterServerMessageHandlers this, a_bBool
  t_sConnection = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2950, #_OnTurnBasedGameStart)
  t_rList.setaProp(2951, #_OnTurnBasedGameEnd)
  t_rList.setaProp(2952, #_OnTurnBasedGameEvent)
  t_rList.setaProp(2953, #_OnNextTurnMessage)
  t_rList.setaProp(2954, #_OnChallengeMessage)
  t_rList.setaProp(2955, #_OnChallengeSentMessage)
  t_rList.setaProp(2956, #_OnCurrentGamesList)
  t_rList.setaProp(2957, #_OnHighScoreList)
  t_rList.setaProp(2958, #_OnGameDetails)
  t_rList.setaProp(2959, #_OnPlayerDetails)
  t_rList.setaProp(2960, #_OnNextGameStarting)
  t_rList.setaProp(2961, #_OnNextGameCanceled)
  if a_bBool then
    registerListener(t_sConnection, this.getID(), t_rList)
  else
    unregisterListener(t_sConnection, this.getID(), t_rList)
  end if
  t_rList = [:]
  t_rList.setaProp("TurnBasedGameAction", 950)
  t_rList.setaProp("AcceptChallengeMessage", 951)
  t_rList.setaProp("PlayNow", 952)
  t_rList.setaProp("GetOngoingGames", 953)
  t_rList.setaProp("GetHighScores", 954)
  t_rList.setaProp("GoWatchGame", 955)
  t_rList.setaProp("GetGameDetails", 956)
  t_rList.setaProp("GetPlayerDetails", 957)
  if a_bBool then
    registerCommands(t_sConnection, this.getID(), t_rList)
  else
    unregisterCommands(t_sConnection, this.getID(), t_rList)
  end if
  return 1
end
on _OnTurnBasedGameStart this, a_rMsg
  if this.valid then
    t_iGameCode = a_rMsg.connection.GetIntFrom()
    t_iGameID = a_rMsg.connection.GetIntFrom()
    t_iPlayers = a_rMsg.connection.GetIntFrom()
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game type" && t_iGameCode && "not found!", #_OnTurnBasedGameStart)
    else
      t_rModule.OnCreateGame(t_iGameID, a_rMsg)
      m_mp_iGameID_iCode.setaProp(t_iGameID, t_iGameCode)
      repeat with i = 1 to t_iPlayers
        t_iAvatarRef = a_rMsg.connection.GetIntFrom()
        t_rModule.OnAddPlayer(t_iGameID, t_iAvatarRef, a_rMsg)
      end repeat
      t_rModule.OnGameStart(t_iGameID, a_rMsg)
    end if
  end if
end
on _OnTurnBasedGameEnd this, a_rMsg
  if this.valid then
    t_iGameID = a_rMsg.connection.GetIntFrom()
    t_iWinnerRef = a_rMsg.connection.GetIntFrom()
    t_iGameCode = m_mp_iGameID_iCode.getaProp(t_iGameID)
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game ID" && t_iGameID && "not found!", #_OnTurnBasedGameEnd)
    else
      t_rModule.OnGameEnd(t_iGameID, t_iWinnerRef, a_rMsg)
    end if
  end if
end
on _OnTurnBasedGameEvent this, a_rMsg
  if this.valid then
    t_iGameID = a_rMsg.connection.GetIntFrom()
    t_iEventType = a_rMsg.connection.GetIntFrom()
    t_iGameCode = m_mp_iGameID_iCode.getaProp(t_iGameID)
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game ID" && t_iGameID && "not found!", #_OnTurnBasedGameEvent)
    else
      t_rModule.OnGameEvent(t_iGameID, t_iEventType, a_rMsg)
    end if
  end if
end
on _OnNextTurnMessage this, a_rMsg
  if this.valid then
    t_iGameID = a_rMsg.connection.GetIntFrom()
    t_iAvatarRef = a_rMsg.connection.GetIntFrom()
    t_iGameCode = m_mp_iGameID_iCode.getaProp(t_iGameID)
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game ID" && t_iGameID && "not found!", #_OnNextTurnMessage)
    else
      t_rModule.OnNextTurn(t_iGameID, t_iAvatarRef, a_rMsg)
    end if
  end if
end
on _OnChallengeMessage this, a_rMsg
  if this.valid then
    t_iGameID = a_rMsg.connection.GetIntFrom()
    t_iAvatarRef = a_rMsg.connection.GetIntFrom()
    t_iLevel = a_rMsg.connection.GetIntFrom()
    t_rObj = createObject(getUniqueID(), "CCasualGameChallengeInterface")
    t_rObj.ShowDialog(t_iGameID, t_iAvatarRef, t_iLevel)
  end if
end
on _OnChallengeSentMessage this, a_rMsg
  if this.valid then
    t_iGameCode = a_rMsg.connection.GetIntFrom()
    t_iAvatarRef = a_rMsg.connection.GetIntFrom()
    t_rObj = createDialogWindow(this.getID(), getUniqueID(), 1, 0)
    t_rObj.setText("Challenge sent", "Challenge sent", "OK", "foo4")
    t_rObj.show()
    m_mp_sType_rDialog.addProp("challenge_sent", t_rObj)
  end if
end
on _OnCurrentGamesList this, a_rMsg
  if this.valid then
    t_ar_rGames = []
    t_iGameCode = a_rMsg.connection.GetIntFrom()
    t_iCount = a_rMsg.connection.GetIntFrom()
    repeat with i = 1 to t_iCount
      t_rGame = [#players: [], #instance: a_rMsg.connection.GetIntFrom()]
      t_iPlayers = a_rMsg.connection.GetIntFrom()
      repeat with j = 1 to t_iPlayers
        t_sPlayer = a_rMsg.connection.GetStrFrom()
        t_iScore = a_rMsg.connection.GetIntFrom()
        t_rGame.players.add([#name: t_sPlayer, #score: t_iScore])
      end repeat
      t_ar_rGames.add(t_rGame)
    end repeat
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game type" && t_iGameCode && "not found!", #_OnCurrentGamesList)
    else
      t_rInterface = t_rModule.GetGameListInterface()
      if objectp(t_rInterface) then
        t_rInterface.SetGameList(t_ar_rGames)
      end if
    end if
  end if
end
on _OnHighScoreList this, a_rMsg
  if this.valid then
    t_ar_rScores = []
    t_iGameCode = a_rMsg.connection.GetIntFrom()
    t_iCount = a_rMsg.connection.GetIntFrom()
    repeat with i = 1 to t_iCount
      t_iPlayer = a_rMsg.connection.GetIntFrom()
      t_sPlayer = a_rMsg.connection.GetStrFrom()
      t_iScore = a_rMsg.connection.GetIntFrom()
      t_ar_rScores.add([#player: t_iPlayer, #name: t_sPlayer, #score: t_iScore])
    end repeat
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game type" && t_iGameCode && "not found!", #_OnHighScoreList)
    else
      t_rInterface = t_rModule.GetHighScoreInterface()
      if objectp(t_rInterface) then
        t_rInterface.SetScoreList(t_ar_rScores)
      end if
    end if
  end if
end
on _OnGameDetails this, a_rMsg
  if this.valid then
    t_iGameCode = a_rMsg.connection.GetIntFrom()
    t_iGameID = a_rMsg.connection.GetIntFrom()
    t_iPlayers = a_rMsg.connection.GetIntFrom()
    t_ar_rPlayers = []
    repeat with i = 1 to t_iPlayers
      t_sName = a_rMsg.connection.GetStrFrom()
      t_iSex = a_rMsg.connection.GetIntFrom()
      t_sSlogan = a_rMsg.connection.GetStrFrom()
      t_ar_iFigure = []
      repeat with j = 1 to 12
        t_ar_iFigure.add(a_rMsg.connection.GetIntFrom())
      end repeat
      t_ar_rPlayers.add([#name: t_sName, #sex: t_iSex, #slogan: t_sSlogan, #figure: t_ar_iFigure])
    end repeat
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game type" && t_iGameCode && "not found!", #_OnGameDetails)
    else
      t_rModule.OnGameDetails(t_ar_rPlayers)
    end if
  end if
end
on _OnPlayerDetails this, a_rMsg
  if this.valid then
    t_iGameCode = a_rMsg.connection.GetIntFrom()
    t_sName = a_rMsg.connection.GetStrFrom()
    t_iSex = a_rMsg.connection.GetIntFrom()
    t_sSlogan = a_rMsg.connection.GetStrFrom()
    t_ar_iFigure = []
    repeat with i = 1 to 12
      t_ar_iFigure.add(a_rMsg.connection.GetIntFrom())
    end repeat
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game type" && t_iGameCode && "not found!", #_OnPlayerDetails)
    else
      t_rModule.OnPlayerDetails([#name: t_sName, #sex: t_iSex, #slogan: t_sSlogan, #figure: t_ar_iFigure])
    end if
  end if
end
on _OnNextGameStarting this, a_rMsg
  if this.valid then
    t_iGameCode = a_rMsg.connection.GetIntFrom()
    t_iSeconds = a_rMsg.connection.GetIntFrom()
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game type" && t_iGameCode && "not found!", #_OnNextGameStarting)
    else
      t_rModule.OnNextGameStarting(t_iSeconds)
    end if
  end if
end
on _OnNextGameCanceled this, a_rMsg
  if this.valid then
    t_iGameCode = a_rMsg.connection.GetIntFrom()
    t_rModule = m_mp_iCode_rModule.getaProp(t_iGameCode)
    if voidp(t_rModule) then
      error(this, "Module for game type" && t_iGameCode && "not found!", #_OnNextGameCanceled)
    else
      t_rModule.OnNextGameCanceled()
    end if
  end if
end