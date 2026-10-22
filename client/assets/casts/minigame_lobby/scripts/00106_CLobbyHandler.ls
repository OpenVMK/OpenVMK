-- Script
on construct me
  t_sID = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2640, #HandleGameRemoved)
  tMsgs.setaProp(2641, #HandleGameList)
  tMsgs.setaProp(2642, #HandleGameData)
  tMsgs.setaProp(2643, #HandleGameJoined)
  tMsgs.setaProp(2644, #HandleAvatarKicked)
  tMsgs.setaProp(2645, #HandleCreateFailed)
  tMsgs.setaProp(2646, #HandleReadyToPlay)
  tMsgs.setaProp(2647, #HandleJoinFailed)
  tMsgs.setaProp(2648, #HandleAvatarLeft)
  tMsgs.setaProp(2650, #HandleSetParticipantData)
  tMsgs.setaProp(2651, #HandleGameConditions)
  tMsgs.setaProp(2652, #HandleStartFailed)
  tCmds = [:]
  tCmds.setaProp("create_game", 640)
  tCmds.setaProp("remove_game", 641)
  tCmds.setaProp("list_games", 642)
  tCmds.setaProp("get_game_data", 643)
  tCmds.setaProp("set_game_data", 644)
  tCmds.setaProp("join_game", 645)
  tCmds.setaProp("leave_game", 646)
  tCmds.setaProp("kick_from_game", 647)
  tCmds.setaProp("start_game", 648)
  tCmds.setaProp("set_ready_to_play", 649)
  tCmds.setaProp("send_participant_data", 650)
  tCmds.setaProp("request_game_conditions", 651)
  registerListener(t_sID, me.getID(), tMsgs)
  registerCommands(t_sID, me.getID(), tCmds)
  return 1
end
on deconstruct me
  t_sID = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2640, #HandleGameRemoved)
  tMsgs.setaProp(2641, #HandleGameList)
  tMsgs.setaProp(2642, #HandleGameData)
  tMsgs.setaProp(2643, #HandleGameJoined)
  tMsgs.setaProp(2644, #HandleAvatarKicked)
  tMsgs.setaProp(2645, #HandleCreateFailed)
  tMsgs.setaProp(2646, #HandleReadyToPlay)
  tMsgs.setaProp(2647, #HandleJoinFailed)
  tMsgs.setaProp(2648, #HandleAvatarLeft)
  tMsgs.setaProp(2650, #HandleSetParticipantData)
  tMsgs.setaProp(2651, #HandleGameConditions)
  tMsgs.setaProp(2652, #HandleStartFailed)
  tCmds = [:]
  tCmds.setaProp("create_game", 640)
  tCmds.setaProp("remove_game", 641)
  tCmds.setaProp("list_games", 642)
  tCmds.setaProp("get_game_data", 643)
  tCmds.setaProp("set_game_data", 644)
  tCmds.setaProp("join_game", 645)
  tCmds.setaProp("leave_game", 646)
  tCmds.setaProp("kick_from_game", 647)
  tCmds.setaProp("start_game", 648)
  tCmds.setaProp("set_ready_to_play", 649)
  tCmds.setaProp("send_participant_data", 650)
  tCmds.setaProp("request_game_conditions", 651)
  unregisterListener(t_sID, me.getID(), tMsgs)
  unregisterCommands(t_sID, me.getID(), tCmds)
  return 1
end
on HandleGameRemoved me, tMsg
  tRef = tMsg.connection.GetIntFrom()
  me.getComponent().RemoveGame(tRef)
end
on HandleGameList me, tMsg
  tNum = tMsg.connection.GetIntFrom()
  repeat with i = 1 to tNum
    tGameRef = tMsg.connection.GetIntFrom()
    tGameName = tMsg.connection.GetStrFrom()
    tNumParticipants = tMsg.connection.GetIntFrom()
    tTimeLeft = tMsg.connection.GetIntFrom()
    me.getComponent().AddOrUpdateGameShort(tGameRef, tGameName, tNumParticipants, tTimeLeft)
  end repeat
  me.getComponent().SetGameListReceived(1)
end
on HandleGameData me, tMsg
  tNum = tMsg.connection.GetIntFrom()
  repeat with i = 1 to tNum
    tGameRef = tMsg.connection.GetIntFrom()
    tGameDesc = tMsg.connection.GetStrFrom()
    tOwnerID = tMsg.connection.GetIntFrom()
    tTimeLeft = tMsg.connection.GetIntFrom()
    tNumAvatars = tMsg.connection.GetIntFrom()
    t_ar_participants = []
    repeat with j = 1 to tNumAvatars
      tAvatarRef = tMsg.connection.GetIntFrom()
      tAvatarTeam = tMsg.connection.GetIntFrom()
      tAmountOfData = tMsg.connection.GetIntFrom()
      t_mp_avatar_data = [:]
      repeat with k = 1 to tAmountOfData
        t_sKey = tMsg.connection.GetStrFrom()
        t_sValue = tMsg.connection.GetStrFrom()
        t_mp_avatar_data.addProp(t_sKey, t_sValue)
      end repeat
      t_ar_participants.append([#ref: tAvatarRef, #team: tAvatarTeam, #data: t_mp_avatar_data])
    end repeat
    tAmountOfData = tMsg.connection.GetIntFrom()
    t_mp_data = [:]
    repeat with j = 1 to tAmountOfData
      t_sKey = tMsg.connection.GetStrFrom()
      t_sValue = tMsg.connection.GetStrFrom()
      t_mp_data.addProp(t_sKey, t_sValue)
    end repeat
    me.getComponent().UpdateGameLong(tGameRef, tGameDesc, tOwnerID, tNumAvatars, t_ar_participants, tTimeLeft, t_mp_data)
  end repeat
end
on HandleGameJoined me, tMsg
  tGameRef = tMsg.connection.GetIntFrom()
  tAvatarRef = tMsg.connection.GetIntFrom()
  tTeam = tMsg.connection.GetIntFrom()
  tAmountOfData = tMsg.connection.GetIntFrom()
  t_mp_data = [:]
  repeat with j = 1 to tAmountOfData
    t_sKey = tMsg.connection.GetStrFrom()
    t_sValue = tMsg.connection.GetStrFrom()
    t_mp_data.addProp(t_sKey, t_sValue)
  end repeat
  me.getComponent().JoinAvatarToGame(tGameRef, tAvatarRef, tTeam, t_mp_data)
end
on HandleAvatarKicked me, tMsg
  tGameRef = tMsg.connection.GetIntFrom()
  tAvatarRef = tMsg.connection.GetIntFrom()
  me.getComponent().KickAvatarFromGame(tGameRef, tAvatarRef)
end
on HandleCreateFailed me, tMsg
  tCode = tMsg.connection.GetIntFrom()
  me.getInterface().DisplayError(getText("lobby.error.create." & tCode))
end
on HandleReadyToPlay me, tMsg
  tstate = tMsg.connection.GetIntFrom()
  me.getComponent().MarkReadyToPlayState(tstate)
end
on HandleJoinFailed me, tMsg
  tCode = tMsg.connection.GetIntFrom()
  me.getInterface().DisplayError(getText("lobby.error.join." & tCode))
end
on HandleStartFailed me, tMsg
  tCode = tMsg.connection.GetIntFrom()
  me.getInterface().DisplayError(getText("lobby.error.start." & tCode))
end
on HandleAvatarLeft me, tMsg
  tGameRef = tMsg.connection.GetIntFrom()
  tAvatarRef = tMsg.connection.GetIntFrom()
  me.getComponent().RemoveAvatarFromGame(tGameRef, tAvatarRef)
end
on HandleSetParticipantData me, tMsg
  tGameRef = tMsg.connection.GetIntFrom()
  tAvatarRef = tMsg.connection.GetIntFrom()
  t_iTeam = tMsg.connection.GetIntFrom()
  tKeyPairCount = tMsg.connection.GetIntFrom()
  t_ar_keypairs = [:]
  repeat with i = 1 to tKeyPairCount
    t_sKey = tMsg.connection.GetStrFrom()
    t_sValue = tMsg.connection.GetStrFrom()
    t_ar_keypairs[t_sKey] = t_sValue
  end repeat
  me.getComponent().setParticipantData(tGameRef, tAvatarRef, t_iTeam, t_ar_keypairs)
end
on HandleGameConditions me, tMsg
  tKeyPairCount = tMsg.connection.GetIntFrom()
  t_ar_keypairs = [:]
  repeat with i = 1 to tKeyPairCount
    t_sKey = tMsg.connection.GetStrFrom()
    t_sValue = tMsg.connection.GetStrFrom()
    t_ar_keypairs[t_sKey] = t_sValue
  end repeat
  me.getComponent().SetGameConditions(t_ar_keypairs)
end
on SendCreateGame me, a_mp_keypairs
  tMsg = [#int: a_mp_keypairs.count]
  repeat with i = 1 to a_mp_keypairs.count
    tKey = a_mp_keypairs.getPropAt(i)
    tvalue = a_mp_keypairs.getaProp(tKey)
    tMsg.addProp(#str, tKey)
    tMsg.addProp(#str, tvalue)
  end repeat
  getConnection(getVariable("main.connection.id", "VMK")).send(640, tMsg)
end
on SendRemoveGame me, i_iRef
  tMsg = [#int: i_iRef]
  getConnection(getVariable("main.connection.id", "VMK")).send(641, tMsg)
end
on SendListGames me
  tMsg = [:]
  getConnection(getVariable("main.connection.id", "VMK")).send(642, tMsg)
end
on SendGetGameData me, i_iRef
  tMsg = [#int: i_iRef]
  getConnection(getVariable("main.connection.id", "VMK")).send(643, tMsg)
end
on SendSetGameData me, i_iRef, a_mp_keypairs
  tMsg = [#int: i_iRef, #int: a_mp_keypairs.count]
  repeat with i = 1 to a_mp_keypairs.count
    tKey = a_mp_keypairs.getPropAt(i)
    tvalue = a_mp_keypairs.getaProp(tKey)
    tMsg.addProp(#str, string(tKey))
    tMsg.addProp(#str, string(tvalue))
  end repeat
  getConnection(getVariable("main.connection.id", "VMK")).send(644, tMsg)
end
on SendJoinGame me, i_iRef, i_iTeam, a_mp_keypairs
  if not listp(a_mp_keypairs) then
    a_mp_keypairs = [:]
  end if
  tMsg = [#int: i_iRef, #int: i_iTeam, #int: a_mp_keypairs.count]
  repeat with i = 1 to a_mp_keypairs.count
    tKey = a_mp_keypairs.getPropAt(i)
    tvalue = a_mp_keypairs.getaProp(tKey)
    tMsg.addProp(#str, string(tKey))
    tMsg.addProp(#str, string(tvalue))
  end repeat
  getConnection(getVariable("main.connection.id", "VMK")).send(645, tMsg)
end
on SendLeaveGame me, i_iRef
  tMsg = [#int: i_iRef]
  getConnection(getVariable("main.connection.id", "VMK")).send(646, tMsg)
end
on SendKickFromGame me, i_iRef, i_iAvatarRef
  tMsg = [#int: i_iRef, #int: i_iAvatarRef]
  getConnection(getVariable("main.connection.id", "VMK")).send(647, tMsg)
end
on SendStartGame me, i_iRef
  tMsg = [#int: i_iRef]
  getConnection(getVariable("main.connection.id", "VMK")).send(648, tMsg)
end
on SendSetReadyToPlay me, i_iState
  tMsg = [#int: integer(i_iState)]
  getConnection(getVariable("main.connection.id", "VMK")).send(649, tMsg)
end
on SendParticipantData me, i_iRef, i_AvatarRef, a_mp_keypairs
  tMsg = [#int: i_iRef, #int: i_AvatarRef, #int: a_mp_keypairs.count]
  repeat with i = 1 to a_mp_keypairs.count
    tKey = a_mp_keypairs.getPropAt(i)
    tvalue = a_mp_keypairs.getaProp(tKey)
    tMsg.addProp(#str, string(tKey))
    tMsg.addProp(#str, string(tvalue))
  end repeat
  getConnection(getVariable("main.connection.id", "VMK")).send(650, tMsg)
end
on RequestGameConditions me
  getConnection(getVariable("main.connection.id", "VMK")).send(651, [])
end