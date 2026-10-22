-- Score Script
property m_mp_games
property m_myGameID
property m_bGameListPending
property m_bGameDataPending
property m_bReadyToPlay
property m_bDirty
property m_ar_GameConditions

on construct me
  m_mp_games = [:]
  m_ar_GameConditions = [:]
  return 1
end
on deconstruct me
  repeat with tGame in m_mp_games
    if not voidp(tGame.data) then
      removeObject(tGame.data.getID())
    end if
  end repeat
  return 1
end
on InitService me
  m_bGameListPending = 0
  m_bGameDataPending = 0
  m_myGameID = VOID
  m_bReadyToPlay = 0
  m_bDirty = 0
end
on CloseService me
end
on QueryGameList me
  m_bGameListPending = 1
  me.getHandler().SendListGames()
end
on GameListReceived me
  return not m_bGameListPending
end
on GetGameList me
  return m_mp_games
  m_bDirty = 0
end
on GetGameByIndex me, i_iIndex
  tOut = VOID
  if i_iIndex >= 1 and i_iIndex <= m_mp_games.count then
    tOut = m_mp_games[i_iIndex].data
  end if
  m_bDirty = 0
  return tOut
end
on GameListDirty me
  return m_bDirty
end
on GetGameDescription me, i_ID
  return the desc of m_mp_games.getaProp(i_ID)
  m_bDirty = 0
end
on QueryGameData me, i_ID
  m_bGameDataPending = 1
  me.getHandler().SendGetGameData(i_ID)
end
on GameDataReceived me
  return not m_bGameDataPending
end
on GetGameData me, i_ID
  return m_mp_games.getaProp(i_ID).getaProp(#data)
  m_bDirty = 0
end
on CreateGame me, a_mp_keypairs
  me.getHandler().SendCreateGame(a_mp_keypairs)
end
on JoinGame me, i_ID, i_iTeam, a_mp_keypairs
  me.getHandler().SendJoinGame(i_ID, i_iTeam, a_mp_keypairs)
  m_myGameID = i_ID
end
on CurrentGame me
  m_bDirty = 0
  if not voidp(m_myGameID) then
    t_rGame = m_mp_games.getaProp(m_myGameID)
    if objectp(t_rGame) then
      return the data of t_rGame
    else
      m_myGameID = VOID
      return VOID
    end if
  else
    return VOID
  end if
end
on LeaveCurrentGame me
  if not voidp(m_myGameID) then
    t_rMyGame = m_mp_games.getaProp(m_myGameID)
    if objectp(t_rMyGame) then
      tMyAvatarRef = getObject(#session).get("room_own_avatar")
      if m_mp_games.getaProp(m_myGameID).data.GetParameterValue("OwnerRef") = tMyAvatarRef then
        me.RemoveMyGame()
      else
        me.getHandler().SendLeaveGame(m_myGameID)
        m_myGameID = VOID
      end if
    end if
  end if
end
on GetMyGame me
  m_bDirty = 0
  tMyAvatarRef = getObject(#session).get("room_own_avatar")
  if not voidp(m_myGameID) then
    tMyGame = m_mp_games.getaProp(m_myGameID)
    if not voidp(tMyGame) then
      if tMyGame.data.GetParameterValue("OwnerRef") = tMyAvatarRef then
        return the data of m_mp_games.getaProp(m_myGameID)
      end if
    end if
  end if
  return VOID
end
on GetJoinedGame me
  m_bDirty = 0
  tMyAvatarRef = getObject(#session).get("room_own_avatar")
  if not voidp(m_myGameID) then
    tMyGame = m_mp_games.getaProp(m_myGameID)
    if not voidp(tMyGame) then
      return the data of m_mp_games.getaProp(m_myGameID)
    end if
  end if
  return VOID
end
on KickAvatarFromMyGame me, i_AvatarRef
  me.getHandler().SendKickFromGame(m_myGameID, i_AvatarRef)
end
on RemoveMyGame me
  me.getHandler().SendRemoveGame(m_myGameID)
  m_myGameID = VOID
end
on StartMyGame me
  me.getHandler().SendStartGame(m_myGameID)
end
on ReadyToPlay me
  return m_bReadyToPlay
end
on SendParticipantData me, i_AvatarRef, a_mp_keypairs
  if not voidp(m_myGameID) then
    me.getHandler().SendParticipantData(m_myGameID, i_AvatarRef, a_mp_keypairs)
  end if
end
on SendGameData me, a_mp_keypairs
  if not voidp(m_myGameID) then
    me.getHandler().SendSetGameData(m_myGameID, a_mp_keypairs)
  end if
end
on RequestGameConditions me
  me.getHandler().RequestGameConditions()
end
on AddOrUpdateGameShort me, i_ID, i_sDescription, a_iNumParticipants, a_iTimeLeft
  tGame = m_mp_games.getaProp(i_ID)
  if voidp(tGame) then
    m_mp_games.setaProp(i_ID, [#desc: i_sDescription, #data: VOID])
    tGame = m_mp_games.getaProp(i_ID)
  end if
  tGame.desc = i_sDescription
  if voidp(tGame.data) then
    tGame.setaProp(#data, createObject("GameContainer:" & i_ID, "CGameContainer"))
  end if
  tGame.data.SetParameter("GameID", i_ID)
  tGame.data.SetParameter("GameName", i_sDescription)
  tGame.data.SetParameter("NumParticipants", a_iNumParticipants)
  tGame.data.SetParameter("TimeLeft", a_iTimeLeft)
  m_bDirty = 1
end
on UpdateGameLong me, i_ID, i_sDescription, i_iOwner, i_iNumParticipants, i_ar_participants, a_iTimeLeft, i_mp_data
  tGame = m_mp_games.getaProp(i_ID)
  if voidp(tGame) then
    m_mp_games.setaProp(i_ID, [#desc: i_sDescription, #data: VOID])
    tGame = m_mp_games.getaProp(i_ID)
  end if
  tGame.desc = i_sDescription
  if voidp(tGame.data) then
    tGame.setaProp(#data, createObject("GameContainer:" & i_ID, "CGameContainer"))
  end if
  tGame.data.SetParameter("GameID", i_ID)
  tGame.data.SetParameter("OwnerRef", i_iOwner)
  tGame.data.SetParameter("GameName", i_sDescription)
  tGame.data.SetParameter("NumParticipants", i_iNumParticipants)
  tGame.data.SetParameter("TimeLeft", a_iTimeLeft)
  repeat with i = 1 to i_mp_data.count
    tGame.data.SetParameter(i_mp_data.getPropAt(i), i_mp_data[i])
  end repeat
  repeat with i = 1 to i_iNumParticipants
    if not tGame.data.ParticipantExists(i_ar_participants[i].ref) then
      tParticipant = tGame.data.AddParticipant(i_ar_participants[i].ref)
      if not voidp(tParticipant) then
        tParticipant.SetParameter("AvatarRef", i_ar_participants[i].ref)
        tParticipant.SetParameter("Team", i_ar_participants[i].team)
        repeat with j = 1 to i_ar_participants[i].data.count
          tKey = i_ar_participants[i].data.getPropAt(j)
          tvalue = i_ar_participants[i].data[j]
          tParticipant.SetParameter(tKey, tvalue)
        end repeat
      end if
    end if
  end repeat
  tMyAvatarRef = getObject(#session).get("room_own_avatar")
  if i_iOwner = tMyAvatarRef then
    m_myGameID = i_ID
  end if
  m_bDirty = 1
  m_bGameDataPending = 0
  me.getInterface().CreateGameListContent()
  me.getInterface().CreatePlayerListContent()
  me.getInterface().CreateAttributeListContent()
  me.getInterface().CreateMyAttributeListContent()
end
on RemoveGame me, i_ID
  t_rGame = m_mp_games.getaProp(i_ID)
  if objectp(t_rGame) then
    removeObject(t_rGame.data.getID())
  end if
  m_mp_games.deleteProp(i_ID)
  me.getInterface().CreateGameListContent()
  m_bDirty = 1
  if i_ID = m_myGameID then
    m_myGameID = VOID
  end if
end
on JoinAvatarToGame me, i_ID, i_iAvatarRef, i_iTeam, i_ar_data
  t_rMyGame = me.GetMyGame()
  tGame = m_mp_games.getaProp(i_ID)
  if voidp(tGame) then
    return error(me, "GameID" && i_ID && "not found", #JoinAvatarToGame)
  end if
  tParticipant = tGame.data.AddParticipant(i_iAvatarRef)
  tParticipant.SetParameter("AvatarRef", i_iAvatarRef)
  tParticipant.SetParameter("Team", i_iTeam)
  repeat with j = 1 to i_ar_data.count
    tKey = i_ar_data.getPropAt(j)
    tvalue = i_ar_data[j]
    tParticipant.SetParameter(tKey, tvalue)
  end repeat
  tMyAvatarRef = getObject(#session).get("room_own_avatar")
  if i_iAvatarRef = tMyAvatarRef then
    m_myGameID = i_ID
  end if
  m_bDirty = 1
  tGame.data.SetParameter("NumParticipants", tGame.data.GetParticipants().count)
  me.getInterface().CreateGameListContent()
  me.getInterface().CreatePlayerListContent()
  me.getInterface().CreateAttributeListContent()
  me.getInterface().CreateMyAttributeListContent()
  return tParticipant
end
on RemoveAvatarFromGame me, i_ID, i_iAvatarRef
  tGame = m_mp_games.getaProp(i_ID)
  if voidp(tGame) then
    return error(me, "GameID" && i_ID && "not found", #RemoveAvatarFromGame)
  end if
  tGame.data.RemoveParticipant(i_iAvatarRef)
  tMyAvatarRef = getObject(#session).get("room_own_avatar")
  if i_iAvatarRef = tMyAvatarRef then
    m_myGameID = VOID
  end if
  m_bDirty = 1
  me.getInterface().CreateGameListContent()
  me.getInterface().CreatePlayerListContent()
  me.getInterface().CreateAttributeListContent()
  me.getInterface().CreateMyAttributeListContent()
end
on KickAvatarFromGame me, i_ID, i_iAvatarRef
  me.RemoveAvatarFromGame(i_ID, i_iAvatarRef)
  tMyAvatarRef = getObject(#session).get("room_own_avatar")
  if i_iAvatarRef = tMyAvatarRef then
    executeMessage(#Kicked_From_Game)
  end if
end
on SetGameListReceived me, i_bState
  m_bGameListPending = not i_bState
  me.getInterface().CreateGameListContent()
end
on SetReadyToPlayState me, i_bState
  m_bReadyToPlay = i_bState
  m_bDirty = 1
  me.getHandler().SendSetReadyToPlay(i_bState)
end
on setParticipantData me, i_ID, i_iAvatarRef, i_iTeam, i_ar_data
  tGame = m_mp_games.getaProp(i_ID)
  if voidp(tGame) then
    return error(me, "GameID" && i_ID && "not found", #setParticipantData)
  end if
  t_rParticipant = tGame.data.GetParticipant(i_iAvatarRef)
  if not voidp(t_rParticipant) then
    t_rParticipant.SetParameter("Team", i_iTeam)
    repeat with j = 1 to i_ar_data.count
      tKey = i_ar_data.getPropAt(j)
      tvalue = i_ar_data[j]
      t_rParticipant.SetParameter(tKey, tvalue)
    end repeat
    put "Participant data" && t_rParticipant.GetParameterList()
    m_bDirty = 1
    me.getInterface().CreateGameListContent()
    me.getInterface().CreatePlayerListContent()
    me.getInterface().CreateAttributeListContent()
    me.getInterface().CreateMyAttributeListContent()
  end if
end
on SetGameConditions me, i_ar_data
  m_bDirty = 1
  m_ar_GameConditions = i_ar_data
end
on GetGameConditions me
  return m_ar_GameConditions
end
on MarkReadyToPlayState me, i_bState
  m_bReadyToPlay = i_bState
  m_bDirty = 1
end