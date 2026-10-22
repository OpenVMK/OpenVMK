-- Script
property m_sGamelistWndTitle
property m_sPeerlistWndTitle
property m_sStartGameDlgWndTitle
property m_sGamePrestartDlgWndTitle
property m_sHighScoreWndTitle
property m_sInstructionsWndTitle
property m_sSelectShipWndTitle
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
property m_ar_instructionstitles
property m_iCurInstructionsPage
property m_iSelectedInstance
property m_rRoomInstanceList
property m_iSpaceID
property m_gameOn
property m_iMyTeam
property m_iGameMode
property m_iShipType
property m_iSelectedAvatar
property m_ar_AIPlayer
property m_bCheckEqualPlayers
property m_iMyGameLevel

on construct me
  registerMessage(#SetHighScores, me.getID(), #highScoreWasSet)
  registerMessage(#room_ready, me.getID(), #initRoom)
  registerMessage(#Kicked_From_Game, me.getID(), #kickedfromgame)
  m_gameOn = 0
  m_bCheckEqualPlayers = 1
  m_iMyTeam = 0
  m_iGameMode = 0
  m_iShipType = 0
  m_sGamelistWndTitle = "PPSGameList"
  m_sPeerlistWndTitle = "PPSPeerlistWindow"
  m_sStartGameDlgWndTitle = "PPSStartGameDialog"
  m_sGamePrestartDlgWndTitle = "PPSGamePrestartDialog"
  m_sInstructionsWndTitle = "PPSInstructions"
  m_sHighScoreWndTitle = "PPSHighScorePlaque"
  m_sSelectShipWndTitle = "PPSSelectShipDialog"
  m_iMyGameLevel = 0
  return 1
end
on CreateInterface me
  createWindow(m_sGamelistWndTitle, "vmk_pirates_preshow_signup.window")
  tWndObj = getWindow(m_sGamelistWndTitle)
  if not voidp(tWndObj) then
    tWndObj.moveTo(53, 418)
  else
    return error(me, "Unable to create game list window", #construct)
  end if
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#PPSEventProc, me.getID(), #mouseUp)
  tWndObj.getElement("button.leave.redteam").hide()
  tWndObj.getElement("button.leave.blueteam").hide()
  tWndObj.getElement("button.leave.redteam2").hide()
  tWndObj.getElement("button.leave.blueteam2").hide()
  me.DisableStartAndMoreRooms()
  repeat with side in [EMPTY, 2]
    repeat with team in ["red", "blue"]
      repeat with player in [1, 2, 3, 4]
        t_sIconName = "piratesship" & side & "." & team & player
        t_sButtonName = "button." & t_sIconName
        t_rIcon = tWndObj.getElement(t_sIconName)
        t_rButton = tWndObj.getElement(t_sButtonName)
        if objectp(t_rIcon) then
          t_rIcon.hide()
        end if
        if objectp(t_rButton) then
          t_rButton.hide()
        end if
      end repeat
    end repeat
  end repeat
  me.ClearGameDisplays()
  getWindowManager().deactivate(m_sGamelistWndTitle)
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
  tWndObj.getElement("pirates.modeselector1").hide()
  tWndObj.getElement("pirates.modeselector2").hide()
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
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#PrestartDlgEventProc, me.getID(), #mouseUp)
  tWndObj.center()
  tWndObj.show()
  t_rElem = tWndObj.getElement("button.pirateskick.red1")
  if objectp(t_rElem) then
    t_rElem.deactivate()
  end if
  repeat with team in ["red", "blue"]
    repeat with player in [1, 2, 3, 4]
      t_sElemName = "button.piratesship." & team & player
      t_rElem = tWndObj.getElement(t_sElemName)
      if objectp(t_rElem) then
        t_rElem.hide()
      end if
      t_sElemName = "piratesship." & team & player
      t_rElem = tWndObj.getElement(t_sElemName)
      if objectp(t_rElem) then
        t_rElem.hide()
      end if
    end repeat
  end repeat
end
on CreateInstructionsWindow me
  createWindow(m_sInstructionsWndTitle, "vmk_pirates_window.window")
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
  tWndObj.getElement("pirates.dialog.hd").setText(getText(m_ar_instructionstitles[m_iCurInstructionsPage]))
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#InstructionsEventProc, me.getID(), #mouseUp)
  tWndObj.center()
  tWndObj.show()
  if m_iCurInstructionsPage <= 1 then
    m_iCurInstructionsPage = 1
    tWndObj.getElement("button.previous").hide()
    tWndObj.getElement("pirates.previouspage").hide()
  end if
  if m_iCurInstructionsPage >= m_ar_instructionspages.count then
    m_iCurInstructionsPage = m_ar_instructionspages.count
    tWndObj.getElement("button.next").hide()
    tWndObj.getElement("pirates.nextpage").hide()
  end if
end
on CreateHighscorePlaque me
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
      DisplayHighscore(7, tWndObj.getElement("highscores.lms"))
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#HighScoreWndEventProc, me.getID(), #mouseUp)
    end if
  else
    return error(me, "Unable to create highscore display", #HighScoreEventProc)
  end if
end
on getCTFHighScore me
  tWndObj = getWindow("PPSHighScore")
  if objectp(tWndObj) then
    DisplayHighscore(6, tWndObj.getElement("highscores.ctf"))
  end if
end
on highScoreWasSet me, t_rElement
  tWndObj = getWindow("PPSHighScore")
  t_rElem = VOID
  if objectp(tWndObj) then
    t_rElem = tWndObj.getElement("highscores.lms")
    if t_rElement = t_rElem then
      DisplayHighscore(6, tWndObj.getElement("highscores.ctf"))
    end if
  end if
end
on DisableStartAndMoreRooms me
  tWndObj = getWindow(m_sGamelistWndTitle)
  tWndObj.getElement("button.newgame").deactivate()
end
on EnableStartAndMoreRooms me
  tWndObj = getWindow(m_sGamelistWndTitle)
  tWndObj.getElement("button.newgame").Activate()
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
  if windowExists(m_sSelectShipWndTitle) then
    removeWindow(m_sSelectShipWndTitle)
  end if
end
on initRoom me
  if getThread("navigator") <> 0 then
    m_ar_instanceTitles = getThread("navigator").getInterface().getRoomInstanceTitles()
  else
    m_ar_instanceTitles = []
  end if
  t_iHMHelpPageCount = value(getText("pirates.instructions.page.count"))
  if t_iHMHelpPageCount <= 0 then
    t_iHMHelpPageCount = 8
  end if
  m_ar_instructionspages = []
  m_ar_instructionsimage = []
  m_ar_instructionstitles = []
  repeat with i = 1 to t_iHMHelpPageCount
    m_ar_instructionspages.append("pirates.instructions.text.page." & i)
    m_ar_instructionsimage.append("pirates.instructions.pic.page." & i)
    m_ar_instructionstitles.append("pirates.instructions.title.page." & i)
  end repeat
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
    m_iGameMode = 0
    m_iShipType = 0
    m_sGameDescription = "My Game"
    m_ar_leftTeamParticipants = []
    m_ar_rightTeamParticipants = []
    m_ar_instances = []
    m_ar_AIPlayer = [:]
    receiveUpdate(me.getID())
    tLobbyThread = getThread("lobby")
    if tLobbyThread = 0 then
      return error(me, "Unable to connect to lobby thread", #initRoom)
    end if
    m_rLobby = tLobbyThread.getComponent()
    m_rLobby.InitService()
    m_rLobby.RequestGameConditions()
    m_rRoomInstanceList = createObject("RoomInstanceListView", "CRoomInstanceList")
    me.GetMoreGameRooms()
    me.DisableStartAndMoreRooms()
    me.refreshOnScreen()
  else
    me.CloseWindows()
  end if
end
on deconstruct me
  unregisterMessage(#ShowPPSInterface, me.getID())
  unregisterMessage(#HidePPSInterface, me.getID())
  unregisterMessage(#room_ready, me.getID(), #initRoom)
  if objectp(m_rLobby) then
    m_rLobby.CloseService()
  end if
  if objectp(m_rRoomInstanceList) then
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
  t_rPirates = getThread("piratesminigame")
  if objectp(t_rPirates) then
    put "m_iMyGameLevel" && m_iMyGameLevel
    if m_iMyGameLevel > 0 then
      t_sStage = "level" & m_iMyGameLevel
      put "t_sStage" && t_sStage
      t_rPirates.getInterface().ShowPreGame()
      t_rPirates.getInterface().showStoryLine(t_sStage)
    end if
  end if
  m_gameOn = 1
  removeUpdate(me.getID())
  updateStage()
end
on SetSpaceID me, a_iSpaceID
  m_iSpaceID = a_iSpaceID
end
on CreateGameDisplay me, a_list, i_rGame
  if i_rGame = m_rLobby.CurrentGame() then
    m_iMyGameLevel = integer(i_rGame.GetParameterValue("l"))
  end if
  t_mp_rParticipants = i_rGame.GetParticipants()
  tWndObj = getWindow(m_sGamelistWndTitle)
  tMyAvatarRef = getObject(#session).get("room_own_avatar")
  t_rMyAvatar = getThread("room").component._AccessRoom()._AccessIndexed(tMyAvatarRef, "avatar")
  t_sMyName = t_rMyAvatar.GetParam("NAME")
  tFields = [[], []]
  if not voidp(tWndObj) then
    if a_list = #left then
      t_sSide = EMPTY
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
      t_sSide = 2
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
    repeat with team in ["red", "blue"]
      repeat with player in [1, 2, 3, 4]
        t_sIconName = "piratesship" & t_sSide & "." & team & player
        t_sButtonName = "button." & t_sIconName
        t_rIcon = tWndObj.getElement(t_sIconName)
        t_rButton = tWndObj.getElement(t_sButtonName)
        if objectp(t_rIcon) then
          t_rIcon.hide()
        end if
        if objectp(t_rButton) then
          t_rButton.hide()
        end if
      end repeat
    end repeat
    tLevel = i_rGame.GetParameterValue("l")
    t_iGameMode = i_rGame.GetParameterValue("m")
    tCountLeft = 1
    tCountRight = 1
    tTeams = [[], []]
    repeat with tParticipant in t_mp_rParticipants
      tRoom = getThread("room").component._AccessRoom()
      tAvatarRef = tParticipant.GetParameterValue(#AvatarRef)
      t_bShowShipButton = 0
      if tAvatarRef = tMyAvatarRef then
        t_bShowShipButton = 1
      end if
      t_sSender = EMPTY
      if tAvatarRef < 0 then
        t_sSender = "AI Player" && tAvatarRef
      else
        t_rAvatar = tRoom._AccessIndexed(tAvatarRef, "avatar")
        if not voidp(t_rAvatar) then
          t_sSender = t_rAvatar.GetParam("NAME")
        end if
      end if
      case tParticipant.GetParameterValue("Team") of
        1:
          t_sShipStatus = "piratesship" & t_sSide & ".red" & tCountLeft
          tCountLeft = tCountLeft + 1
        2:
          t_sShipStatus = "piratesship" & t_sSide & ".blue" & tCountRight
          tCountRight = tCountRight + 1

      end case
      t_sButtonStatus = "button." & t_sShipStatus
      t_rElem = tWndObj.getElement(t_sShipStatus)
      t_rButton = tWndObj.getElement(t_sButtonStatus)
      if objectp(t_rElem) then
        t_iShipType = integer(tParticipant.GetParameterValue("t"))
        if t_bShowShipButton then
          t_rUpMember = VOID
          t_rDownMember = VOID
          case t_iShipType of
            1:
              t_rUpMember = getMember("button.pearl.active")
              t_rDownMember = getMember("button.pearl.pressed")
            2:
              t_rUpMember = getMember("button.dutchman.active")
              t_rDownMember = getMember("button.dutchman.pressed")
            3:
              t_rUpMember = getMember("button.wicked.active")
              t_rDownMember = getMember("button.wicked.pressed")

          end case
          t_rButton.pButtonImg[#up] = t_rUpMember.image
          t_rButton.pButtonImg[#down] = t_rDownMember.image
          t_rButton.pCachedImgs = [:]
          t_rButton.changeState(#up)
          t_rButton.show()
        else
          t_rElem.show()
          t_rMember = VOID
          case t_iShipType of
            1:
              t_rMember = getMember("pearl.selected")
            2:
              t_rMember = getMember("dutchman.selected")
            3:
              t_rMember = getMember("wicked.selected")

          end case
          t_rElem.getProperty(#sprite).member = t_rMember
        end if
      end if
      tTeams[tParticipant.GetParameterValue("Team")].append(t_sSender)
    end repeat
    repeat with t = 1 to 2
      repeat with i = 1 to tTeams[t].count
        tFields[t][i].setText(tTeams[t][i])
      end repeat
    end repeat
    tFields[3].setText(getText("pps_level") && tLevel && "-" && getText("pirates.gamemode." & t_iGameMode))
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
  repeat with side in [EMPTY, 2]
    repeat with team in ["red", "blue"]
      repeat with player in [1, 2, 3, 4]
        t_sIconName = "piratesship" & side & "." & team & player
        t_sButtonName = "button." & t_sIconName
        t_rIcon = tWndObj.getElement(t_sIconName)
        t_rButton = tWndObj.getElement(t_sButtonName)
        if objectp(t_rIcon) then
          t_rIcon.hide()
        end if
        if objectp(t_rButton) then
          t_rButton.hide()
        end if
      end repeat
    end repeat
  end repeat
end
on GetMoreGameRooms me
  tConnection = getConnection(getVariable("main.connection.id", "VMK"))
  if tConnection <> 0 then
    tConnection.send(36, [#int: 1001])
  end if
end
on RefreshGameRooms me
  m_rRoomInstanceList.clear()
  t_mp_topics = [:]
  i = 1
  t_ar_filteredInstances = []
  if listp(m_ar_instances) and m_ar_instances.count > 1 then
    t_OneEmptyAdded = 0
    repeat with i = 1 to m_ar_instances.count
      if m_ar_instances[i].population > 0 then
        t_ar_filteredInstances.add(m_ar_instances[i])
        next repeat
      end if
      if not t_OneEmptyAdded then
        t_ar_filteredInstances.add(m_ar_instances[i])
        t_OneEmptyAdded = 1
      end if
    end repeat
  else
    t_ar_filteredInstances = m_ar_instances
  end if
  repeat with tInstance in t_ar_filteredInstances
    if i > m_ar_instanceTitles.count then
      i = 1
    end if
    t_mp_topics.addProp(m_ar_instanceTitles[i], tInstance)
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
        tWndObj.getElement("button.topirates").hide()
        tWndObj.getElement("button.toport").hide()
        m_ar_leftTeamParticipants = []
        m_ar_rightTeamParticipants = []
        tCountLeft = 1
        tCountRight = 1
        tMyAvatarRef = getObject(#session).get("room_own_avatar")
        t_rMyAvatar = getThread("room").component._AccessRoom()._AccessIndexed(tMyAvatarRef, "avatar")
        t_sMyName = t_rMyAvatar.GetParam("NAME")
        t_iGameMode = tMyGame.GetParameterValue("m")
        repeat with team in ["red", "blue"]
          repeat with player in [1, 2, 3, 4]
            t_sElemName = "button.piratesship." & team & player
            t_rElem = tWndObj.getElement(t_sElemName)
            if objectp(t_rElem) then
              t_rElem.hide()
            end if
            t_sElemName = "piratesship." & team & player
            t_rElem = tWndObj.getElement(t_sElemName)
            if objectp(t_rElem) then
              t_rElem.hide()
            end if
          end repeat
        end repeat
        repeat with tParticipant in tMyGame.GetParticipants()
          t_iAvatarRef = tParticipant.GetParameterValue(#AvatarRef)
          t_sName = EMPTY
          t_bShowShipButton = 0
          if t_iAvatarRef = tMyAvatarRef then
            t_bShowShipButton = 1
          end if
          if t_iAvatarRef = tMyAvatarRef then
            t_rKick1 = tWndObj.getElement("button.pirateskick.red1")
            t_rKick2 = tWndObj.getElement("button.pirateskick.blue1")
            case tParticipant.GetParameterValue("Team") of
              1:
                tWndObj.getElement("button.topirates").show()
                if objectp(t_rKick1) then
                  t_rKick1.deactivate()
                end if
                if objectp(t_rKick2) then
                  t_rKick2.Activate()
                end if
              2:
                tWndObj.getElement("button.toport").show()
                if objectp(t_rKick1) then
                  t_rKick1.Activate()
                end if
                if objectp(t_rKick2) then
                  t_rKick2.deactivate()
                end if

            end case
          end if
          if t_iAvatarRef < 0 then
            t_sName = getText("pirates.player.ai.name") && t_iAvatarRef
          else
            t_rAvatar = getThread("room").component._AccessRoom()._AccessIndexed(t_iAvatarRef, "avatar")
            if not voidp(t_rAvatar) then
              t_sName = t_rAvatar.GetParam("NAME")
            end if
          end if
          case tParticipant.GetParameterValue("Team") of
            1:
              m_ar_leftTeamParticipants.append(tParticipant)
              tWndObj.getElement("team.red.player" & tCountLeft).setText(t_sName)
              t_sShipStatus = "piratesship.red" & tCountLeft
              tCountLeft = tCountLeft + 1
            2:
              m_ar_rightTeamParticipants.append(tParticipant)
              tWndObj.getElement("team.blue.player" & tCountRight).setText(t_sName)
              t_sShipStatus = "piratesship.blue" & tCountRight
              tCountRight = tCountRight + 1

          end case
          t_sButtonStatus = "button." & t_sShipStatus
          t_rElem = tWndObj.getElement(t_sShipStatus)
          t_rButton = tWndObj.getElement(t_sButtonStatus)
          if objectp(t_rElem) then
            t_iShipType = integer(tParticipant.GetParameterValue("t"))
            if t_bShowShipButton then
              t_rUpMember = VOID
              t_rDownMember = VOID
              case t_iShipType of
                1:
                  t_rUpMember = getMember("button.pearl.active")
                  t_rDownMember = getMember("button.pearl.pressed")
                2:
                  t_rUpMember = getMember("button.dutchman.active")
                  t_rDownMember = getMember("button.dutchman.pressed")
                3:
                  t_rUpMember = getMember("button.wicked.active")
                  t_rDownMember = getMember("button.wicked.pressed")

              end case
              t_rButton.pButtonImg[#up] = t_rUpMember.image
              t_rButton.pButtonImg[#down] = t_rDownMember.image
              t_rButton.pCachedImgs = [:]
              t_rButton.changeState(#up)
              t_rButton.show()
              next repeat
            end if
            t_rElem.show()
            t_rMember = VOID
            case t_iShipType of
              1:
                t_rMember = getMember("pearl.selected")
              2:
                t_rMember = getMember("dutchman.selected")
              3:
                t_rMember = getMember("wicked.selected")

            end case
            t_rElem.getProperty(#sprite).member = t_rMember
          end if
        end repeat
        t_bOkToStart = 1
        if m_bCheckEqualPlayers then
          t_iTotalPlayersMin = 4
          if tMyGame.GetParticipants().count < t_iTotalPlayersMin then
            t_bOkToStart = 0
          else
            if not (tCountLeft = tCountRight) then
              t_bOkToStart = 0
            end if
          end if
        end if
        t_rElem = tWndObj.getElement("button.pirates.startnow")
        if t_bOkToStart then
          t_rElem.Activate()
        else
          t_rElem.deactivate()
        end if
        if m_ar_leftTeamParticipants.count = 4 then
          tWndObj.getElement("button.toport").deactivate()
        else
          tWndObj.getElement("button.toport").Activate()
        end if
        if m_ar_rightTeamParticipants.count = 4 then
          tWndObj.getElement("button.topirates").deactivate()
        else
          tWndObj.getElement("button.topirates").Activate()
        end if
        if t_iGameMode = 2 then
          repeat with team in ["red", "blue"]
            repeat with player in [1, 2, 3, 4]
              t_sElemName = "team." & team & ".player" & player
              t_rElem = tWndObj.getElement(t_sElemName)
              if objectp(t_rElem) then
                if t_rElem.getText() = EMPTY then
                  t_rElem.setText(getText("pirates.player.ai.create"))
                end if
              end if
            end repeat
          end repeat
        end if
      end if
    else
      t_ar_gameConditions = m_rLobby.GetGameConditions()
      if not voidp(t_ar_gameConditions["c"]) then
        me.EnableStartAndMoreRooms()
      else
        me.DisableStartAndMoreRooms()
      end if
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
on JoinGame me, i_iGameID, i_iTeamID
  t_iGameConditions = m_rLobby.GetGameConditions()
  t_iCost = integer(t_iGameConditions["c"])
  case t_iCost of
    0:
      t_ar_GameData = ["c": string(t_iCost)]
      m_rLobby.JoinGame(i_iGameID, i_iTeamID, t_ar_GameData)
      m_iMyTeam = i_iTeamID
    otherwise:
      me.createJoinGameConditionsDialog(i_iGameID, i_iTeamID, t_iCost)

  end case
end
on PPSEventProc me, tEvent, tElemID, tParm
  getWindowManager().deactivate(m_sGamelistWndTitle)
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
            me.JoinGame(tGameID, 1)
          else
            if m_iMyTeam <> 1 or m_rLobby.CurrentGame().GetParameterValue("GameID") <> tGameID then
              m_rLobby.LeaveCurrentGame()
              me.JoinGame(tGameID, 1)
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
            me.JoinGame(tGameID, 2)
          else
            if m_iMyTeam <> 2 or m_rLobby.CurrentGame().GetParameterValue("GameID") <> tGameID then
              m_rLobby.LeaveCurrentGame()
              me.JoinGame(tGameID, 2)
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
            me.JoinGame(tGameID, 1)
          else
            if m_iMyTeam <> 1 or m_rLobby.CurrentGame().GetParameterValue("GameID") <> tGameID then
              m_rLobby.LeaveCurrentGame()
              me.JoinGame(tGameID, 1)
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
            me.JoinGame(tGameID, 2)
          else
            if m_iMyTeam <> 2 or m_rLobby.CurrentGame().GetParameterValue("GameID") <> tGameID then
              m_rLobby.LeaveCurrentGame()
              me.JoinGame(tGameID, 2)
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
        t_iGameConditions = m_rLobby.GetGameConditions()
        t_iCost = integer(t_iGameConditions["c"])
        case t_iCost of
          0:
            me.CreateStartGameWindow()
          otherwise:
            me.createGameConditionsDialog(t_iCost)

        end case
      "button.moregames":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        me.CreatePeerListWindow()
        me.GetMoreGameRooms()
      "button.instructions":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        me.CreateInstructionsWindow()
      "button.piratesship.red1", "button.piratesship.red2", "button.piratesship.red3", "button.piratesship.red4", "button.piratesship.blue1", "button.piratesship.blue2", "button.piratesship.blue3", "button.piratesship.blue4", "button.piratesship2.red1", "button.piratesship2.red2", "button.piratesship2.red3", "button.piratesship2.red4", "button.piratesship2.blue1", "button.piratesship2.blue2", "button.piratesship2.blue3", "button.piratesship2.blue4":
        t_rParticipant = VOID
        t_iPlayer = integer(tElemID.char[tElemID.length])
        t_rGame = m_rLobby.GetJoinedGame()
        if objectp(t_rGame) then
          t_ar_leftTeamParticipants = []
          t_ar_rightTeamParticipants = []
          repeat with tParticipant in t_rGame.GetParticipants()
            case tParticipant.GetParameterValue("Team") of
              1:
                t_ar_leftTeamParticipants.append(tParticipant)
              2:
                t_ar_rightTeamParticipants.append(tParticipant)

            end case
          end repeat
          if tElemID contains "red" then
            if t_ar_leftTeamParticipants.count >= t_iPlayer then
              t_rParticipant = t_ar_leftTeamParticipants[t_iPlayer]
            end if
          else
            if t_ar_rightTeamParticipants.count >= t_iPlayer then
              t_rParticipant = t_ar_rightTeamParticipants[t_iPlayer]
            end if
          end if
          tMyAvatarRef = getObject(#session).get("room_own_avatar")
          if objectp(t_rParticipant) then
            t_iAvatarRef = t_rParticipant.GetParameterValue(#AvatarRef)
            m_iShipType = integer(t_rParticipant.GetParameterValue("t"))
            if t_iAvatarRef >= 0 then
              if t_iAvatarRef = tMyAvatarRef then
                me.createSelectShipDialog(t_iAvatarRef)
              end if
            end if
          end if
        end if
      "button.highscores":
        executeMessage("PlayInterfaceSound", "UI-click")
        me.CreateHighscoreWindow()

    end case
  end if
end
on StartGameDlgEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sStartGameDlgWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "button.pirates.creategame":
        if m_iGameLevel <> 0 and m_iGameMode <> 0 then
          executeMessage("PlayInterfaceSound", "PG-UI-knock")
          m_rLobby.LeaveCurrentGame()
          tWndObj.getElement("pirates.levelselector1").hide()
          tWndObj.getElement("pirates.levelselector2").hide()
          tWndObj.getElement("pirates.levelselector3").hide()
          t_sGameCost = m_rLobby.GetGameConditions()["c"]
          m_rLobby.CreateGame(["l": string(m_iGameLevel), "m": string(m_iGameMode), "c": string(t_sGameCost)])
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
      "pirates.ctf.mode":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_iGameMode = 1
        tWndObj.getElement("pirates.modeselector1").show()
        tWndObj.getElement("pirates.modeselector2").hide()
      "pirates.lms.mode":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_iGameMode = 2
        tWndObj.getElement("pirates.modeselector1").hide()
        tWndObj.getElement("pirates.modeselector2").show()
      "pirates.close", "button.pirates.cancel":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sStartGameDlgWndTitle)
      "pirates.help":
        executeMessage(#open_help_page, "help.games.pirates")
      otherwise:
        put "StartGameDlgEventProc" && tElemID

    end case
  end if
end
on PrestartDlgEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sGamePrestartDlgWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "button.pirates.startnow":
        executeMessage("PlayInterfaceSound", "PG-UI-knock")
        m_rLobby.StartMyGame()
      "button.piratesship.red1", "button.piratesship.red2", "button.piratesship.red3", "button.piratesship.red4", "button.piratesship.blue1", "button.piratesship.blue2", "button.piratesship.blue3", "button.piratesship.blue4":
        t_rParticipant = VOID
        t_iPlayer = integer(tElemID.char[tElemID.length])
        if tElemID contains "red" then
          if m_ar_leftTeamParticipants.count >= t_iPlayer then
            t_rParticipant = m_ar_leftTeamParticipants[t_iPlayer]
          end if
        else
          if m_ar_rightTeamParticipants.count >= t_iPlayer then
            t_rParticipant = m_ar_rightTeamParticipants[t_iPlayer]
          end if
        end if
        tMyAvatarRef = getObject(#session).get("room_own_avatar")
        if objectp(t_rParticipant) then
          t_iAvatarRef = t_rParticipant.GetParameterValue(#AvatarRef)
          m_iShipType = integer(t_rParticipant.GetParameterValue("t"))
          if t_iAvatarRef >= 0 then
            if t_iAvatarRef = tMyAvatarRef then
              me.createSelectShipDialog(t_iAvatarRef)
            end if
          end if
        end if
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
          m_iGameMode = 0
          m_iShipType = 0
        end if
      "pirates.help":
        executeMessage(#open_help_page, "help.games.pirates")
      "team.red.player1", "team.red.player2", "team.red.player3", "team.red.player4", "team.blue.player1", "team.blue.player2", "team.blue.player3", "team.blue.player4":
        m_ar_AIPlayer = [:]
        t_iPlayer = integer(tElemID.char[tElemID.length])
        if tElemID contains "red" then
          t_iTeam = 1
        else
          t_iTeam = 2
          t_iPlayer = t_iPlayer + 4
        end if
        tMyGame = m_rLobby.GetMyGame()
        if objectp(tMyGame) then
          if tMyGame.GetParameterValue("m") = 2 then
            t_iGameID = tMyGame.GetParameterValue("GameID")
            m_ar_AIPlayer[#GameID] = t_iGameID
            m_ar_AIPlayer[#player] = t_iPlayer
            m_ar_AIPlayer[#ship] = 2
            me.createConfirmAIDialog()
          end if
        end if
      "button.topirates", "button.toport":
        tMyAvatarRef = getObject(#session).get("room_own_avatar")
        m_rLobby.SendParticipantData(tMyAvatarRef, ["team": "switch"])
      otherwise:
        put "PrestartDlgEventProc" && tElemID

    end case
  end if
end
on SelectShipDlgEventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sSelectShipWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "pirates.ship.pearl":
        executeMessage("PlayInterfaceSound", "UI-click")
        tWndObj.getElement("pirates.shipselector1").show()
        tWndObj.getElement("pirates.shipselector2").hide()
        tWndObj.getElement("pirates.shipselector3").hide()
        m_iShipType = 1
      "pirates.ship.dutch":
        executeMessage("PlayInterfaceSound", "UI-click")
        tWndObj.getElement("pirates.shipselector1").hide()
        tWndObj.getElement("pirates.shipselector2").show()
        tWndObj.getElement("pirates.shipselector3").hide()
        m_iShipType = 2
      "pirates.ship.wicked":
        executeMessage("PlayInterfaceSound", "UI-click")
        tWndObj.getElement("pirates.shipselector1").hide()
        tWndObj.getElement("pirates.shipselector2").hide()
        tWndObj.getElement("pirates.shipselector3").show()
        m_iShipType = 3
      "button.pirates.selectship":
        if m_ar_AIPlayer.count > 0 then
          m_ar_AIPlayer[#ship] = m_iShipType
          m_rLobby.SendGameData(["a": m_ar_AIPlayer[#player], "t": m_ar_AIPlayer[#ship]])
          m_ar_AIPlayer = [:]
        else
          m_rLobby.SendParticipantData(m_iSelectedAvatar, ["t": m_iShipType])
        end if
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sSelectShipWndTitle)
      "pirates.close", "button.pirates.cancel":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sSelectShipWndTitle)
      "pirates.help":
        executeMessage(#open_help_page, "help.games.pirates")
      otherwise:
        put "SelectShipDlgEventProc" && tElemID

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
        if m_rRoomInstanceList.GetSelected() <> 0 and m_iSpaceID <> -1 then
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
  getWindowManager().deactivate(m_sHighScoreWndTitle)
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
        DisableHighScore()
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
        tWndObj.getElement("pirates.dialog.hd").setText(getText(m_ar_instructionstitles[m_iCurInstructionsPage]))
        tWndObj.getElement("button.previous").show()
        tWndObj.getElement("pirates.previouspage").show()
        if m_iCurInstructionsPage >= m_ar_instructionspages.count then
          m_iCurInstructionsPage = m_ar_instructionspages.count
          tWndObj.getElement("button.next").hide()
          tWndObj.getElement("pirates.nextpage").hide()
        end if
      "button.previous":
        executeMessage("PlayInterfaceSound", "UI-click")
        m_iCurInstructionsPage = m_iCurInstructionsPage - 1
        if m_iCurInstructionsPage < 1 then
          m_iCurInstructionsPage = 1
        end if
        tWndObj.getElement("pirates.instructions.text").setText(getText(m_ar_instructionspages[m_iCurInstructionsPage]))
        tWndObj.getElement("pirates.instructions.image").feedImage(member(getText(m_ar_instructionsimage[m_iCurInstructionsPage])).image)
        tWndObj.getElement("pirates.dialog.hd").setText(getText(m_ar_instructionstitles[m_iCurInstructionsPage]))
        tWndObj.getElement("button.next").show()
        tWndObj.getElement("pirates.nextpage").show()
        if m_iCurInstructionsPage <= 1 then
          m_iCurInstructionsPage = 1
          tWndObj.getElement("button.previous").hide()
          tWndObj.getElement("pirates.previouspage").hide()
        end if
      "pirates.close":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sInstructionsWndTitle)
      "pirates.help":
        executeMessage(#open_help_page, "help.games.pirates")
      otherwise:
        put tElemID

    end case
  end if
end
on kickedfromgame me
  t = createDialogWindow(me.getID(), "pirates_kicked_from_game", 1)
  t.show()
  t.setText(getText("pirates.kicked.from.game"), "Pirates Of The Caribbean", "OK")
end
on createSelectShipDialog me, i_AvatarRef
  createWindow(m_sSelectShipWndTitle, "vmk_pirates_window.window")
  tWndObj = getWindow(m_sSelectShipWndTitle)
  if not voidp(tWndObj) then
    if not tWndObj.merge("vmk_pirates_select_ship.window") then
      return error(me, "Unable to merge select ship dialog", #construct)
    end if
  else
    return error(me, "Unable to create select ship dialog", #construct)
  end if
  tWndObj.getElement("pirates.dialog.hd").setText(getText("pps_create_new_game"))
  tWndObj.getElement("pirates.shipselector1").hide()
  tWndObj.getElement("pirates.shipselector2").hide()
  tWndObj.getElement("pirates.shipselector3").hide()
  if m_iShipType > 0 then
    t_iElem = 2
    case m_iShipType of
      1:
        t_iElem = 1
      2:
        t_iElem = 2
      3:
        t_iElem = 3

    end case
    tWndObj.getElement("pirates.shipselector" & t_iElem).show()
  end if
  m_iSelectedAvatar = i_AvatarRef
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#SelectShipDlgEventProc, me.getID(), #mouseUp)
  tWndObj.center()
  tWndObj.show()
end
on createGameConditionsDialog me, i_iCost
  t = createDialogWindow(me.getID(), "pirates_create_game_conditions", 2)
  t.show()
  t_ar_btnShip1 = [#text: "OK", #eventID: #Ok, #data: VOID]
  t_ar_btnShip2 = [#text: "CANCEL", #eventID: #cancel, #data: VOID]
  t_txt = getText("pirates.pricepergame") && i_iCost
  t.setText(t_txt, getText("pirates.game.name"), t_ar_btnShip2, t_ar_btnShip1)
end
on createJoinGameConditionsDialog me, i_iGameID, i_iTeamID, i_iCost
  t = createDialogWindow(me.getID(), "pirates_join_game_conditions", 2)
  t.show()
  t_ar_btnShip1 = [#text: "OK", #eventID: #Ok, #data: [i_iGameID, i_iTeamID, i_iCost]]
  t_ar_btnShip2 = [#text: "CANCEL", #eventID: #cancel, #data: VOID]
  t_txt = getText("pirates.pricepergame") && i_iCost
  t.setText(t_txt, getText("pirates.game.name"), t_ar_btnShip2, t_ar_btnShip1)
end
on createConfirmAIDialog me, i_iGameID, i_iTeamID, i_iCost
  t = createDialogWindow(me.getID(), "pirates_confirm_ai_player", 2)
  t.show()
  t_ar_btnShip1 = [#text: "OK", #eventID: #Ok, #data: [i_iGameID, i_iTeamID, i_iCost]]
  t_ar_btnShip2 = [#text: "CANCEL", #eventID: #cancel, #data: VOID]
  t_txt = getText("pirates.create.aiplayer")
  t.setText(t_txt, getText("pirates.game.name"), t_ar_btnShip2, t_ar_btnShip1)
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent, t_rdata
  case t_dialogName of
    "pirates_confirm_ai_player":
      case t_dialogEvent of
        #Ok:
          m_iShipType = 2
          me.createSelectShipDialog(VOID)
        #cancel:
          nothing()

      end case
    "pirates_join_game_conditions":
      case t_dialogEvent of
        #Ok:
          t_iGameID = t_rdata[1]
          t_iTeamID = t_rdata[2]
          t_ar_GameData = ["c": string(t_rdata[3])]
          m_rLobby.JoinGame(t_iGameID, t_iTeamID, t_ar_GameData)
          m_iMyTeam = t_iTeamID
        #cancel:
          nothing()

      end case
    "pirates_create_game_conditions":
      case t_dialogEvent of
        #Ok:
          me.CreateStartGameWindow()
        #cancel:
          nothing()

      end case
    "pirates_select_game_type":
      case t_dialogEvent of
        #ctf:
          m_iGameMode = 1
        #lsm:
          m_iGameMode = 2

      end case
    "pirates_select_ship_type":
      case t_dialogEvent of
        #ship1:
          m_iShipType = 1
        #ship2:
          m_iShipType = 2
        #ship3:
          m_iShipType = 3
        otherwise:
          m_iShipType = 1

      end case
      m_rLobby.SendParticipantData(t_rdata, ["t": m_iShipType])

  end case
  removeDialogWindow(t_dialogName)
end