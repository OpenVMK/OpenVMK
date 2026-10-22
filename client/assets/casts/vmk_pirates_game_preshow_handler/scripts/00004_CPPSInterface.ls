-- Script
property m_sGamelistWndTitle
property m_sPeerlistWndTitle
property m_sStartGameDlgWndTitle
property m_sGamePrestartDlgWndTitle
property m_sHighScoreWndTitle
property m_sInstructionsWndTitle
property m_iListDisplayOffset
property m_rLobby
property m_iGameLevel
property m_sGameDesc
property m_ar_leftTeamParticipants
property m_ar_rightTeamParticipants
property m_ar_instances
property m_ar_instanceTitles
property m_ar_instructionspages
property m_ar_instructionsimage
property m_iCurInstructionsPage
property m_iSelectedInstance
property m_rRoomInstanceList
property m_iSpaceID
property m_gameOn
property m_iMyTeam

on construct me
  registerMessage(#room_ready, me.getID(), #initRoom)
  registerMessage(#Kicked_From_Game, me.getID(), #kickedfromgame)
  m_gameOn = 0
  m_iMyTeam = 0
  m_sGamelistWndTitle = "PPSGameList"
  m_sPeerlistWndTitle = "PPSPeerlistWindow"
  m_sStartGameDlgWndTitle = "PPSStartGameDialog"
  m_sGamePrestartDlgWndTitle = "PPSGamePrestartDialog"
  m_sInstructionsWndTitle = "PPSInstructions"
  m_sHighScoreWndTitle = "PPSHighScorePlaque"
  return 1
end
on CreateInterface me
  createWindow(m_sGamelistWndTitle, "vmk_pirates_preshow_signup.window")
  tWndObj = getWindow(m_sGamelistWndTitle)
  if not voidp(tWndObj) then
    tWndObj.moveTo(97, 463)
  else
    return error(me, "Unable to create game list window", #construct)
  end if
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#PPSEventProc, me.getID(), #mouseUp)
  tWndObj.getElement("button.leave.redteam").hide()
  tWndObj.getElement("button.leave.blueteam").hide()
  tWndObj.getElement("button.leave.redteam2").hide()
  tWndObj.getElement("button.leave.blueteam2").hide()
  me.ClearGameDisplays()
end
on CreatePeerListWindow me
  createWindow(m_sPeerlistWndTitle, "vmk_pirates_window.window")
  tWndObj = getWindow(m_sPeerlistWndTitle)
  if not voidp(tWndObj) then
    if not tWndObj.merge("vmk_pirates_moregames.window") then
      return error(me, "Unable to merge peer list window", #construct)
    end if
  else
    return error(me, "Unable to create peer list window", #construct)
  end if
  tWndObj.getElement("pirates.dialog.hd").setText(getText("pps_more_game_rooms"))
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#PeerListEventProc, me.getID(), #mouseUp)
  tWndObj.show()
  m_rRoomInstanceList = getObject("RoomInstanceListView")
  m_rRoomInstanceList.SetWidth(tWndObj.getElement("pirates.selectroom.list").getProperty(#width))
end
on CreateStartGameWindow me
  createWindow(m_sStartGameDlgWndTitle, "vmk_pirates_window.window")
  tWndObj = getWindow(m_sStartGameDlgWndTitle)
  if not voidp(tWndObj) then
    if not tWndObj.merge("vmk_pirates_create_game.window") then
      return error(me, "Unable to merge start game dialog", #construct)
    end if
  else
    return error(me, "Unable to create start game dialog", #construct)
  end if
  tWndObj.getElement("pirates.dialog.hd").setText(getText("pps_create_new_game"))
  tWndObj.getElement("pirates.levelselector1").hide()
  tWndObj.getElement("pirates.levelselector2").hide()
  tWndObj.getElement("pirates.levelselector3").hide()
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#StartGameDlgEventProc, me.getID(), #mouseUp)
  tWndObj.center()
  tWndObj.show()
end
on CreateGamePrestartWindow me, a_sTitleText
  createWindow(m_sGamePrestartDlgWndTitle, "vmk_pirates_window.window")
  tWndObj = getWindow(m_sGamePrestartDlgWndTitle)
  if not voidp(tWndObj) then
    if not tWndObj.merge("vmk_pirates_start_players.window") then
      error(me, "Unable to merge game prestart dialog", #construct)
    end if
  else
    return error(me, "Unable to create game prestart dialog", #construct)
  end if
  tWndObj.getElement("pirates.dialog.hd").setText(a_sTitleText)
  tWndObj.getElement("button.pirateskick.red1").hide()
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#PrestartDlgEventProc, me.getID(), #mouseUp)
  tWndObj.center()
  tWndObj.show()
end
on CreateInstructionsWindow me
  createWindow(m_sInstructionsWndTitle, "vmk_pirates_simple.window")
  tWndObj = getWindow(m_sInstructionsWndTitle)
  if not voidp(tWndObj) then
    if not tWndObj.merge("vmk_pirates_instructions.window") then
      error(me, "Unable to merge instructions dialog", #construct)
    end if
  else
    return error(me, "Unable to create instructions dialog", #construct)
  end if
  tWndObj.getElement("pirates.dialog.hd").setText(getText("pirates.instructions.window.title"))
  tWndObj.getElement("pirates.instructions.text").setText(getText(m_ar_instructionspages[m_iCurInstructionsPage]))
  tWndObj.getElement("pirates.instructions.image").feedImage(member(getText(m_ar_instructionsimage[m_iCurInstructionsPage])).image)
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#InstructionsEventProc, me.getID(), #mouseUp)
  tWndObj.center()
  tWndObj.show()
end
on CreateHighscorePlaque me
  createWindow(m_sHighScoreWndTitle, "vmk_pirates_highscores_button.window")
  tWndObj = getWindow(m_sHighScoreWndTitle)
  if not voidp(tWndObj) then
    tWndObj.moveTo(360, 210)
  else
    return error(me, "Unable to create high score button window", #construct)
  end if
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#HighScoreEventProc, me.getID(), #mouseUp)
end
on CreateHighscoreWindow me
  if windowExists("PPSHighScore") then
    removeWindow("PPSHighScore")
  end if
  createWindow("PPSHighScore", "vmk_pirates_window.window")
  tWndObj = getWindow("PPSHighScore")
  if not voidp(tWndObj) then
    if tWndObj.merge("vmk_pirates_highscores.window") then
      tWndObj.getElement("pirates.dialog.hd").setText(getText("pps_highscores"))
      DisplayHighscore(4, tWndObj.getElement("highscores"))
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#HighScoreWndEventProc, me.getID(), #mouseUp)
    end if
  else
    return error(me, "Unable to create highscore display", #HighScoreEventProc)
  end if
end
on DisableStartAndMoreRooms me
  tWndObj = getWindow(m_sGamelistWndTitle)
  tWndObj.getElement("button.newgame").deactivate()
  tWndObj.getElement("button.moregames").deactivate()
end
on EnableStartAndMoreRooms me
  tWndObj = getWindow(m_sGamelistWndTitle)
  tWndObj.getElement("button.newgame").Activate()
  tWndObj.getElement("button.moregames").Activate()
end
on CloseWindows me
  if windowExists("PPSHighScore") then
    removeWindow("PPSHighScore")
  end if
  if windowExists(m_sInstructionsWndTitle) then
    removeWindow(m_sInstructionsWndTitle)
  end if
  if windowExists(m_sPeerlistWndTitle) then
    removeWindow(m_sPeerlistWndTitle)
  end if
  if objectExists("RoomInstanceListView") then
    removeObject("RoomInstanceListView")
  end if
end
on initRoom me
  m_ar_instanceTitles = getThread("navigator").getInterface().getRoomInstanceTitles()
  m_ar_instructionspages = ["pirates.instructions.text.page.1", "pirates.instructions.text.page.2", "pirates.instructions.text.page.3", "pirates.instructions.text.page.4", "pirates.instructions.text.page.5", "pirates.instructions.text.page.6", "pirates.instructions.text.page.7", "pirates.instructions.text.page.8"]
  m_ar_instructionsimage = ["pirates.instructions.pic.page.1", "pirates.instructions.pic.page.2", "pirates.instructions.pic.page.3", "pirates.instructions.pic.page.4", "pirates.instructions.pic.page.5", "pirates.instructions.pic.page.6", "pirates.instructions.pic.page.7", "pirates.instructions.pic.page.8"]
  m_iCurInstructionsPage = 1
  m_iSelectedInstance = 0
  m_iSpaceID = -1
  if not m_gameOn then
    me.CreateInterface()
    me.CreateHighscorePlaque()
    registerMessage(#ShowPPSInterface, me.getID(), #ShowInterface)
    registerMessage(#HidePPSInterface, me.getID(), #HideInterface)
    m_iListDisplayOffset = 1
    m_iGameLevel = 0
    m_sGameDescription = "My Game"
    m_ar_leftTeamParticipants = []
    m_ar_rightTeamParticipants = []
    m_ar_instances = []
    receiveUpdate(me.getID())
    tLobbyThread = getThread("lobby")
    if tLobbyThread = 0 then
      return error(me, "Unable to connect to lobby thread", #initRoom)
    end if
    m_rLobby = tLobbyThread.getComponent()
    m_rLobby.InitService()
    m_rRoomInstanceList = createObject("RoomInstanceListView", "CRoomInstanceList")
    me.GetMoreGameRooms()
    me.EnableStartAndMoreRooms()
    me.refreshOnScreen()
  else
    me.CloseWindows()
  end if
end
on deconstruct me
  unregisterMessage(#ShowPPSInterface, me.getID())
  unregisterMessage(#HidePPSInterface, me.getID())
  unregisterMessage(#room_ready, me.getID(), #initRoom)
  if not voidp(m_rLobby) then
    m_rLobby.CloseService()
  end if
  if not voidp(m_rRoomInstanceList) then
    removeObject(m_rRoomInstanceList.getID())
  end if
  if windowExists(m_sGamelistWndTitle) then
    removeWindow(m_sGamelistWndTitle)
  end if
  if windowExists(m_sPeerlistWndTitle) then
    removeWindow(m_sPeerlistWndTitle)
  end if
  if windowExists(m_sStartGameDlgWndTitle) then
    removeWindow(m_sStartGameDlgWndTitle)
  end if
  if windowExists(m_sGamePrestartDlgWndTitle) then
    removeWindow(m_sGamePrestartDlgWndTitle)
  end if
  if windowExists(m_sHighScoreWndTitle) then
    removeWindow(m_sHighScoreWndTitle)
  end if
  if windowExists("PPSHighScore") then
    removeWindow("PPSHighScore")
  end if
  if windowExists("RoomInstanceListView") then
    removeObject("RoomInstanceListView")
  end if
  removeUpdate(me.getID())
  return 1
end
on ShowInterface me
  if windowExists(m_sGamelistWndTitle) then
    getWindow(m_sGamelistWndTitle).show()
  end if
  if windowExists(m_sPeerlistWndTitle) then
    getWindow(m_sPeerlistWndTitle).hide()
  end if
  if windowExists(m_sStartGameDlgWndTitle) then
    getWindow(m_sStartGameDlgWndTitle).hide()
  end if
  if windowExists(m_sGamePrestartDlgWndTitle) then
    getWindow(m_sGamePrestartDlgWndTitle).hide()
  end if
  if windowExists(m_sHighScoreWndTitle) then
    getWindow(m_sHighScoreWndTitle).hide()
  end if
  m_gameOn = 0
end
on HideInterface me
  if windowExists(m_sGamelistWndTitle) then
    getWindow(m_sGamelistWndTitle).hide()
  end if
  if windowExists(m_sPeerlistWndTitle) then
    getWindow(m_sPeerlistWndTitle).hide()
  end if
  if windowExists(m_sStartGameDlgWndTitle) then
    getWindow(m_sStartGameDlgWndTitle).hide()
  end if
  if windowExists(m_sGamePrestartDlgWndTitle) then
    getWindow(m_sGamePrestartDlgWndTitle).hide()
  end if
  if windowExists(m_sHighScoreWndTitle) then
    getWindow(m_sHighScoreWndTitle).hide()
  end if
  m_gameOn = 1
  updateStage()
end
on SetSpaceID me, a_iSpaceID
  m_iSpaceID = a_iSpaceID
end
on CreateGameDisplay me, a_list, i_rGame
  t_mp_rParticipants = i_rGame.GetParticipants()
  tWndObj = getWindow(m_sGamelistWndTitle)
  tFields = [[], []]
  if not voidp(tWndObj) then
    if a_list = #left then
      tFields[1].append(tWndObj.getElement("team.red.player1"))
      tFields[1].append(tWndObj.getElement("team.red.player2"))
      tFields[1].append(tWndObj.getElement("team.red.player3"))
      tFields[1].append(tWndObj.getElement("team.red.player4"))
      tFields[2].append(tWndObj.getElement("team.blue.player1"))
      tFields[2].append(tWndObj.getElement("team.blue.player2"))
      tFields[2].append(tWndObj.getElement("team.blue.player3"))
      tFields[2].append(tWndObj.getElement("team.blue.player4"))
      tFields[3] = tWndObj.getElement("signup.level.team1")
    else
      tFields[1].append(tWndObj.getElement("team.red2.player1"))
      tFields[1].append(tWndObj.getElement("team.red2.player2"))
      tFields[1].append(tWndObj.getElement("team.red2.player3"))
      tFields[1].append(tWndObj.getElement("team.red2.player4"))
      tFields[2].append(tWndObj.getElement("team.blue2.player1"))
      tFields[2].append(tWndObj.getElement("team.blue2.player2"))
      tFields[2].append(tWndObj.getElement("team.blue2.player3"))
      tFields[2].append(tWndObj.getElement("team.blue2.player4"))
      tFields[3] = tWndObj.getElement("signup.level.team2")
    end if
    tLevel = i_rGame.GetParameterValue("l")
    tLeftIterator = 1
    tRightIterator = 1
    tTeams = [[], []]
    repeat with tParticipant in t_mp_rParticipants
      tRoom = getThread("room").component._AccessRoom()
      tAvatarRef = tParticipant.GetParameterValue(#AvatarRef)
      t_rAvatar = tRoom._AccessIndexed(tAvatarRef, "avatar")
      t_sSender = EMPTY
      if not voidp(t_rAvatar) then
        t_sSender = t_rAvatar.GetParam("NAME")
      end if
      tTeams[tParticipant.GetParameterValue("Team")].append(t_sSender)
    end repeat
    repeat with t = 1 to 2
      repeat with i = 1 to tTeams[t].count
        tFields[t][i].setText(tTeams[t][i])
      end repeat
    end repeat
    tFields[3].setText(getText("pps_level") && tLevel)
  end if
end
on ClearGameDisplays me
  tWndObj = getWindow(m_sGamelistWndTitle)
  tWndObj.getElement("team.red.player1").setText(EMPTY)
  tWndObj.getElement("team.red.player2").setText(EMPTY)
  tWndObj.getElement("team.red.player3").setText(EMPTY)
  tWndObj.getElement("team.red.player4").setText(EMPTY)
  tWndObj.getElement("team.blue.player1").setText(EMPTY)
  tWndObj.getElement("team.blue.player2").setText(EMPTY)
  tWndObj.getElement("team.blue.player3").setText(EMPTY)
  tWndObj.getElement("team.blue.player4").setText(EMPTY)
  tWndObj.getElement("signup.level.team1").setText(EMPTY)
  tWndObj.getElement("team.red2.player1").setText(EMPTY)
  tWndObj.getElement("team.red2.player2").setText(EMPTY)
  tWndObj.getElement("team.red2.player3").setText(EMPTY)
  tWndObj.getElement("team.red2.player4").setText(EMPTY)
  tWndObj.getElement("team.blue2.player1").setText(EMPTY)
  tWndObj.getElement("team.blue2.player2").setText(EMPTY)
  tWndObj.getElement("team.blue2.player3").setText(EMPTY)
  tWndObj.getElement("team.blue2.player4").setText(EMPTY)
  tWndObj.getElement("signup.level.team2").setText(EMPTY)
end
on GetMoreGameRooms me
  getConnection(getVariable("main.connection.id", "VMK")).send(36, [#int: 1001])
end
on RefreshGameRooms me
  m_rRoomInstanceList.clear()
  t_mp_topics = [:]
  i = 1
  repeat with tInstance in m_ar_instances
    if i > m_ar_instanceTitles.count then
      i = 1
    end if
    t_mp_topics.addProp(m_ar_instanceTitles[tInstance.id + 1], tInstance)
    i = i + 1
  end repeat
  m_rRoomInstanceList.createTopics(t_mp_topics)
  tWndObj = getWindow(m_sPeerlistWndTitle)
  if tWndObj <> 0 then
    tList = tWndObj.getElement("pirates.selectroom.list")
    tList.setProperty(#ink, 36)
    tList.feedImage(m_rRoomInstanceList.getImage())
    updateStage()
  end if
end
on ClearInstanceList me
  m_ar_instances = []
end
on AddInstance me, a_iInstanceID, a_iPopulation
  m_ar_instances.append([#id: a_iInstanceID, #population: a_iPopulation])
end
on update me
  if m_rLobby.GameListDirty() then
    tMyGame = m_rLobby.GetMyGame()
    if objectp(tMyGame) then
      me.DisableStartAndMoreRooms()
      tWndObj = getWindow(m_sGamePrestartDlgWndTitle)
      if not voidp(tWndObj) then
        tWndObj.show()
        tWndObj.getElement("team.red.player1").setText(EMPTY)
        tWndObj.getElement("team.red.player2").setText(EMPTY)
        tWndObj.getElement("team.red.player3").setText(EMPTY)
        tWndObj.getElement("team.red.player4").setText(EMPTY)
        tWndObj.getElement("team.blue.player1").setText(EMPTY)
        tWndObj.getElement("team.blue.player2").setText(EMPTY)
        tWndObj.getElement("team.blue.player3").setText(EMPTY)
        tWndObj.getElement("team.blue.player4").setText(EMPTY)
        m_ar_leftTeamParticipants = []
        m_ar_rightTeamParticipants = []
        tCountLeft = 1
        tCountRight = 1
        tMyAvatarRef = getObject(#session).get("room_own_avatar")
        repeat with tParticipant in tMyGame.GetParticipants()
          t_rAvatar = getThread("room").component._AccessRoom()._AccessIndexed(tParticipant.GetParameterValue(#AvatarRef), "avatar")
          t_sName = EMPTY
          if not voidp(t_rAvatar) then
            t_sName = t_rAvatar.GetParam("NAME")
          end if
          case tParticipant.GetParameterValue("Team") of
            1:
              m_ar_leftTeamParticipants.append(tParticipant)
              tWndObj.getElement("team.red.player" & tCountLeft).setText(t_sName)
              tCountLeft = tCountLeft + 1
            2:
              m_ar_rightTeamParticipants.append(tParticipant)
              tWndObj.getElement("team.blue.player" & tCountRight).setText(t_sName)
              tCountRight = tCountRight + 1

          end case
        end repeat
        t_sMyName = getThread("room").component._AccessRoom()._AccessIndexed(tMyAvatarRef, "avatar").GetParam("NAME")
      end if
    else
      me.EnableStartAndMoreRooms()
    end if
    me.refreshOnScreen()
  end if
end
on findGameByID me, a_iID
  tGames = m_rLobby.GetGameList()
  repeat with i = 1 to tGames.count
    if tGames.getPropAt(i) = a_iID then
      return i
    end if
  end repeat
  return 0
end
on refreshOnScreen me
  me.ClearGameDisplays()
  tGame = m_rLobby.GetGameByIndex(m_iListDisplayOffset)
  if objectp(tGame) then
    me.CreateGameDisplay(#left, tGame)
  end if
  tGame = m_rLobby.GetGameByIndex(m_iListDisplayOffset + 1)
  if objectp(tGame) then
    me.CreateGameDisplay(#right, tGame)
  end if
  tGame = m_rLobby.CurrentGame()
  if not voidp(tGame) then
    tOfs = me.findGameByID(tGame.GetParameterValue("GameID"))
    if tOfs = 0 then
      return error(me, "Pirates Lobby: Could not find reference to current game ID", #refreshOnScreen)
    end if
    me.SetJoinLeaveButtons(tOfs, m_iMyTeam)
  else
    me.SetJoinLeaveButtons(0, 0)
  end if
  me.SetScrollArrows()
end
on SetScrollArrows me
  tGameCount = m_rLobby.GetGameList().count
  tWndObj = getWindow(m_sGamelistWndTitle)
  if m_iListDisplayOffset > 1 then
    tWndObj.getElement("button.previous").show()
  else
    tWndObj.getElement("button.previous").hide()
  end if
  if tGameCount - 1 > m_iListDisplayOffset then
    tWndObj.getElement("button.next").show()
  else
    tWndObj.getElement("button.next").hide()
  end if
end
on SetJoinLeaveButtons me, a_iMyGame, a_iMyTeam
  tWndObj = getWindow(m_sGamelistWndTitle)
  if not voidp(tWndObj) then
    if a_iMyGame = m_iListDisplayOffset or a_iMyGame = m_iListDisplayOffset + 1 then
      if a_iMyGame = m_iListDisplayOffset then
        case a_iMyTeam of
          1:
            tWndObj.getElement("button.join.redteam").hide()
            tWndObj.getElement("button.leave.redteam").show()
            tWndObj.getElement("button.join.blueteam").show()
            tWndObj.getElement("button.leave.blueteam").hide()
          2:
            tWndObj.getElement("button.join.blueteam").hide()
            tWndObj.getElement("button.leave.blueteam").show()
            tWndObj.getElement("button.join.redteam").show()
            tWndObj.getElement("button.leave.redteam").hide()

        end case
        if m_rLobby.GetGameList().count >= m_iListDisplayOffset + 1 then
          tWndObj.getElement("button.join.blueteam2").show()
          tWndObj.getElement("button.join.redteam2").show()
          tWndObj.getElement("button.leave.blueteam2").hide()
          tWndObj.getElement("button.leave.redteam2").hide()
        else
          tWndObj.getElement("button.join.blueteam2").hide()
          tWndObj.getElement("button.join.redteam2").hide()
          tWndObj.getElement("button.leave.blueteam2").hide()
          tWndObj.getElement("button.leave.redteam2").hide()
        end if
      else
        case a_iMyTeam of
          1:
            tWndObj.getElement("button.join.redteam2").hide()
            tWndObj.getElement("button.leave.redteam2").show()
            tWndObj.getElement("button.join.blueteam2").show()
            tWndObj.getElement("button.leave.blueteam2").hide()
          2:
            tWndObj.getElement("button.join.blueteam2").hide()
            tWndObj.getElement("button.leave.blueteam2").show()
            tWndObj.getElement("button.join.redteam2").show()
            tWndObj.getElement("button.leave.redteam2").hide()

        end case
        tWndObj.getElement("button.join.blueteam").show()
        tWndObj.getElement("button.join.redteam").show()
        tWndObj.getElement("button.leave.blueteam").hide()
        tWndObj.getElement("button.leave.redteam").hide()
      end if
    else
      tCount = m_rLobby.GetGameList().count
      if m_iListDisplayOffset + 1 > tCount then
        tWndObj.getElement("button.join.blueteam2").hide()
        tWndObj.getElement("button.join.redteam2").hide()
        tWndObj.getElement("button.leave.blueteam2").hide()
        tWndObj.getElement("button.leave.redteam2").hide()
      end if
      if m_iListDisplayOffset > tCount then
        tWndObj.getElement("button.join.blueteam").hide()
        tWndObj.getElement("button.join.redteam").hide()
        tWndObj.getElement("button.leave.blueteam").hide()
        tWndObj.getElement("button.leave.redteam").hide()
      end if
      if m_iListDisplayOffset + 1 <= tCount then
        tWndObj.getElement("button.join.blueteam2").show()
        tWndObj.getElement("button.join.redteam2").show()
        tWndObj.getElement("button.leave.blueteam2").hide()
        tWndObj.getElement("button.leave.redteam2").hide()
      end if
      if m_iListDisplayOffset <= tCount then
        tWndObj.getElement("button.join.blueteam").show()
        tWndObj.getElement("button.join.redteam").show()
        tWndObj.getElement("button.leave.blueteam").hide()
        tWndObj.getElement("button.leave.redteam").hide()
      end if
    end if
  end if
  tGameList = m_rLobby.GetGameList()
  if tGameList.count >= m_iListDisplayOffset then
    tGame1 = m_rLobby.GetGameData(tGameList.getPropAt(m_iListDisplayOffset))
    tCountLeft = 0
    tCountRight = 0
    repeat with tParticipant in tGame1.GetParticipants()
      case tParticipant.GetParameterValue("Team") of
        1:
          tCountLeft = tCountLeft + 1
        2:
          tCountRight = tCountRight + 1

      end case
    end repeat
    if tCountLeft >= 4 then
      tWndObj.getElement("button.join.redteam").hide()
    end if
    if tCountRight >= 4 then
      tWndObj.getElement("button.join.blueteam").hide()
    end if
    tOwner = tGame1.GetParameterValue("OwnerRef")
    if tOwner = getObject(#session).getValue("room_own_avatar") then
      tWndObj.getElement("button.join.blueteam").hide()
      tWndObj.getElement("button.join.redteam").hide()
      tWndObj.getElement("button.leave.blueteam").hide()
      tWndObj.getElement("button.leave.redteam").hide()
    end if
  end if
  if tGameList.count >= m_iListDisplayOffset + 1 then
    tGame2 = m_rLobby.GetGameData(tGameList.getPropAt(m_iListDisplayOffset + 1))
    tCountLeft = 0
    tCountRight = 0
    repeat with tParticipant in tGame1.GetParticipants()
      case tParticipant.GetParameterValue("Team") of
        1:
          tCountLeft = tCountLeft + 1
        2:
          tCountRight = tCountRight + 1

      end case
    end repeat
    if tCountLeft >= 4 then
      tWndObj.getElement("button.join.redteam2").hide()
    end if
    if tCountRight >= 4 then
      tWndObj.getElement("button.join.blueteam2").hide()
    end if
    tOwner = tGame2.GetParameterValue("OwnerRef")
    if tOwner = getObject(#session).getValue("room_own_avatar") then
      tWndObj.getElement("button.join.blueteam2").hide()
      tWndObj.getElement("button.join.redteam2").hide()
      tWndObj.getElement("button.leave.blueteam2").hide()
      tWndObj.getElement("button.leave.redteam2").hide()
    end if
  end if
end
on HidePrestart me
  if windowExists(m_sGamePrestartDlgWndTitle) then
    removeWindow(m_sGamePrestartDlgWndTitle)
  end if
end
on PPSEventProc me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    tGameList = m_rLobby.GetGameList()
    case tElemID of
      "button.next":
        m_iListDisplayOffset = m_iListDisplayOffset + 1
        if m_iListDisplayOffset > tGameList.count - 1 then
          m_iListDisplayOffset = tGameList.count - 1
        end if
        if m_iListDisplayOffset < 1 then
          m_iListDisplayOffset = 1
        end if
        executeMessage("PlayInterfaceSound", "UI-click")
        me.refreshOnScreen()
      "button.previous":
        m_iListDisplayOffset = m_iListDisplayOffset - 1
        if m_iListDisplayOffset < 1 then
          m_iListDisplayOffset = 1
        end if
        executeMessage("PlayInterfaceSound", "UI-click")
        me.refreshOnScreen()
      "button.join.redteam":
        if tGameList.count >= m_iListDisplayOffset then
          tGameID = tGameList.getPropAt(m_iListDisplayOffset)
          if voidp(m_rLobby.CurrentGame()) then
            m_rLobby.JoinGame(tGameID, 1)
            m_iMyTeam = 1
          else
            if m_iMyTeam <> 1 or m_rLobby.CurrentGame().GetParameterValue("GameID") <> tGameID then
              m_rLobby.LeaveCurrentGame()
              m_rLobby.JoinGame(tGameID, 1)
              m_iMyTeam = 1
            end if
          end if
          if windowExists(m_sGamePrestartDlgWndTitle) then
            removeWindow(m_sGamePrestartDlgWndTitle)
          end if
        end if
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
      "button.join.blueteam":
        if tGameList.count >= m_iListDisplayOffset then
          tGameID = tGameList.getPropAt(m_iListDisplayOffset)
          if voidp(m_rLobby.CurrentGame()) then
            m_rLobby.JoinGame(tGameID, 2)
            m_iMyTeam = 2
          else
            if m_iMyTeam <> 2 or m_rLobby.CurrentGame().GetParameterValue("GameID") <> tGameID then
              m_rLobby.LeaveCurrentGame()
              m_rLobby.JoinGame(tGameID, 2)
              m_iMyTeam = 2
            end if
          end if
          if windowExists(m_sGamePrestartDlgWndTitle) then
            removeWindow(m_sGamePrestartDlgWndTitle)
          end if
        end if
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
      "button.join.redteam2":
        if tGameList.count >= m_iListDisplayOffset + 1 then
          tGameID = tGameList.getPropAt(m_iListDisplayOffset + 1)
          if voidp(m_rLobby.CurrentGame()) then
            m_rLobby.JoinGame(tGameID, 1)
            m_iMyTeam = 1
          else
            if m_iMyTeam <> 1 or m_rLobby.CurrentGame().GetParameterValue("GameID") <> tGameID then
              m_rLobby.LeaveCurrentGame()
              m_rLobby.JoinGame(tGameID, 1)
              m_iMyTeam = 1
            end if
          end if
          if windowExists(m_sGamePrestartDlgWndTitle) then
            removeWindow(m_sGamePrestartDlgWndTitle)
          end if
        end if
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
      "button.join.blueteam2":
        if tGameList.count >= m_iListDisplayOffset + 1 then
          tGameID = tGameList.getPropAt(m_iListDisplayOffset + 1)
          if voidp(m_rLobby.CurrentGame()) then
            m_rLobby.JoinGame(tGameID, 2)
            m_iMyTeam = 2
          else
            if m_iMyTeam <> 2 or m_rLobby.CurrentGame().GetParameterValue("GameID") <> tGameID then
              m_rLobby.LeaveCurrentGame()
              m_rLobby.JoinGame(tGameID, 2)
              m_iMyTeam = 2
            end if
          end if
          if windowExists(m_sGamePrestartDlgWndTitle) then
            removeWindow(m_sGamePrestartDlgWndTitle)
          end if
        end if
      "button.leave.redteam", "button.leave.blueteam", "button.leave.redteam2", "button.leave.blueteam2":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        if m_rLobby.GetMyGame() = m_rLobby.CurrentGame() then
          removeWindow(m_sGamePrestartDlgWndTitle)
        end if
        m_rLobby.LeaveCurrentGame()
        m_iMyTeam = 0
      "button.newgame":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        me.CreateStartGameWindow()
      "button.moregames":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        me.CreatePeerListWindow()
        me.GetMoreGameRooms()
      "button.instructions":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        me.CreateInstructionsWindow()

    end case
  end if
end
on StartGameDlgEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sStartGameDlgWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "button.pirates.creategame":
        if m_iGameLevel <> 0 then
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
          m_rLobby.LeaveCurrentGame()
          tWndObj.getElement("pirates.levelselector1").hide()
          tWndObj.getElement("pirates.levelselector2").hide()
          tWndObj.getElement("pirates.levelselector3").hide()
          m_rLobby.CreateGame(["l": string(m_iGameLevel)])
          removeWindow(m_sStartGameDlgWndTitle)
          case m_iGameLevel of
            1:
              me.CreateGamePrestartWindow(getText("pps_create_lev_1_game"))
            2:
              me.CreateGamePrestartWindow(getText("pps_create_lev_2_game"))
            3:
              me.CreateGamePrestartWindow(getText("pps_create_lev_3_game"))

          end case
          m_iMyTeam = 1
        end if
      "pirates.level1.preview":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_iGameLevel = 1
        tWndObj.getElement("pirates.levelselector1").show()
        tWndObj.getElement("pirates.levelselector2").hide()
        tWndObj.getElement("pirates.levelselector3").hide()
      "pirates.level2.preview":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_iGameLevel = 2
        tWndObj.getElement("pirates.levelselector1").hide()
        tWndObj.getElement("pirates.levelselector2").show()
        tWndObj.getElement("pirates.levelselector3").hide()
      "pirates.level3.preview":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_iGameLevel = 3
        tWndObj.getElement("pirates.levelselector1").hide()
        tWndObj.getElement("pirates.levelselector2").hide()
        tWndObj.getElement("pirates.levelselector3").show()
      "pirates.close", "button.pirates.cancel":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sStartGameDlgWndTitle)
      "pirates.help":
        executeMessage(#open_help_page, "help.games.pirates")

    end case
  end if
end
on PrestartDlgEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sGamePrestartDlgWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "button.pirates.startnow":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        removeUpdate(me.getID())
        m_rLobby.StartMyGame()
      "button.pirateskick.red1":
        if m_ar_leftTeamParticipants.count >= 1 then
          m_rLobby.KickAvatarFromMyGame(m_ar_leftTeamParticipants[1].GetParameterValue(#AvatarRef))
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
        end if
      "button.pirateskick.red2":
        if m_ar_leftTeamParticipants.count >= 2 then
          m_rLobby.KickAvatarFromMyGame(m_ar_leftTeamParticipants[2].GetParameterValue(#AvatarRef))
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
        end if
      "button.pirateskick.red3":
        if m_ar_leftTeamParticipants.count >= 3 then
          m_rLobby.KickAvatarFromMyGame(m_ar_leftTeamParticipants[3].GetParameterValue(#AvatarRef))
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
        end if
      "button.pirateskick.red4":
        if m_ar_leftTeamParticipants.count >= 4 then
          m_rLobby.KickAvatarFromMyGame(m_ar_leftTeamParticipants[4].GetParameterValue(#AvatarRef))
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
        end if
      "button.pirateskick.blue1":
        if m_ar_rightTeamParticipants.count >= 1 then
          m_rLobby.KickAvatarFromMyGame(m_ar_rightTeamParticipants[1].GetParameterValue(#AvatarRef))
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
        end if
      "button.pirateskick.blue2":
        if m_ar_rightTeamParticipants.count >= 2 then
          m_rLobby.KickAvatarFromMyGame(m_ar_rightTeamParticipants[2].GetParameterValue(#AvatarRef))
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
        end if
      "button.pirateskick.blue3":
        if m_ar_rightTeamParticipants.count >= 3 then
          m_rLobby.KickAvatarFromMyGame(m_ar_rightTeamParticipants[3].GetParameterValue(#AvatarRef))
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
        end if
      "button.pirateskick.blue4":
        if m_ar_rightTeamParticipants.count >= 4 then
          m_rLobby.KickAvatarFromMyGame(m_ar_rightTeamParticipants[4].GetParameterValue(#AvatarRef))
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
        end if
      "button.pirates.cancel", "pirates.close":
        if not voidp(m_rLobby.GetMyGame()) then
          executeMessage("PlayInterfaceSound", "close-popup")
          m_rLobby.RemoveMyGame()
          removeWindow(m_sGamePrestartDlgWndTitle)
          me.EnableStartAndMoreRooms()
        end if
      "pirates.help":
        executeMessage(#open_help_page, "help.games.pirates")

    end case
  end if
end
on PeerListEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sPeerlistWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "pirates.selectroom.list":
        if not voidp(tWndObj) then
          tElement = tWndObj.getElement("pirates.selectroom.list")
          tElement.feedImage(m_rRoomInstanceList.click(tParm))
        end if
      "button.pirates.gotoroom":
        if m_rRoomInstanceList.GetSelected() <> 0 then
          tInstanceID = m_rRoomInstanceList.GetItem(m_rRoomInstanceList.GetSelected()).getLink().id
          getConnection(getVariable("main.connection.id", "VMK")).send(31, [#int: m_iSpaceID, #int: tInstanceID])
        end if
      "pirates.close", "button.pirates.cancel":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sPeerlistWndTitle)
      "pirates.help":
        executeMessage(#open_help_page, "help.games.pirates")

    end case
  end if
end
on HighScoreEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sHighScoreWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "button.highscores":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        me.CreateHighscoreWindow()

    end case
  end if
end
on HighScoreWndEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow("PPSHighScore")
  if tEvent = #mouseUp then
    case tElemID of
      "pirates.close":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow("PPSHighScore")
      "pirates.help":
        executeMessage(#open_help_page, "help.games.scores")

    end case
  end if
end
on InstructionsEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sInstructionsWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "button.next":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_iCurInstructionsPage = m_iCurInstructionsPage + 1
        if m_iCurInstructionsPage > m_ar_instructionspages.count then
          m_iCurInstructionsPage = m_ar_instructionspages.count
        end if
        tWndObj.getElement("pirates.instructions.text").setText(getText(m_ar_instructionspages[m_iCurInstructionsPage]))
        tWndObj.getElement("pirates.instructions.image").feedImage(member(getText(m_ar_instructionsimage[m_iCurInstructionsPage])).image)
      "button.previous":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_iCurInstructionsPage = m_iCurInstructionsPage - 1
        if m_iCurInstructionsPage < 1 then
          m_iCurInstructionsPage = 1
        end if
        tWndObj.getElement("pirates.instructions.text").setText(getText(m_ar_instructionspages[m_iCurInstructionsPage]))
        tWndObj.getElement("pirates.instructions.image").feedImage(member(getText(m_ar_instructionsimage[m_iCurInstructionsPage])).image)
      "pirates.close":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sInstructionsWndTitle)
      "pirates.help":
        executeMessage(#open_help_page, "help.games.pirates")

    end case
  end if
end
on kickedfromgame me
  t = createDialogWindow(me.getID(), "pirates_kicked_from_game", 1)
  t.show()
  t.setText(getText("pirates.kicked.from.game"), "Pirates Of The Caribbean", "OK")
end