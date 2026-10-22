-- Script
property m_sWindowName
property m_rGameListView
property m_rPlayerListView
property m_rAttributeListView
property m_rMyAttributeListView
property m_iGameListSelection
property m_iPlayerListSelection
property m_iAttributeListSelection
property m_iMyAttributeListSelection

on construct me
  m_sWindowName = "DefaultLobby"
  m_iGameListSelection = VOID
  m_iPlayerListSelection = VOID
  m_iAttributeListSelection = VOID
  m_iMyAttributeListSelection = VOID
  m_rGameListView = VOID
  m_rPlayerListView = VOID
  m_rAttributeListView = VOID
  m_rMyAttributeListView = VOID
  return 1
end
on deconstruct me
  ShowDefaultLobbyWindow(0)
  return 1
end
on ShowDefaultLobbyWindow me, i_bVisibility
  tWndObj = getWindow(m_sWindowName)
  if i_bVisibility then
    if not objectp(tWndObj) then
      if not createWindow(m_sWindowName, "vmk_basic.window") then
        return error(me, "Failed to create lobby window", #ShowDefaultLobbyWindow)
      else
        tWndObj = getWindow(m_sWindowName)
        if not tWndObj.merge("vmk_lobby_test.window") then
          return error(me, "Failed to merge lobby window interface", #ShowDefaultLobbyWindow)
        end if
        tWndObj.registerClient(me.getID())
        tWndObj.registerProcedure(#LobbyEventProc, me.getID(), #mouseUp)
        tWndObj.show()
        tWndObj.center()
        m_rGameListView = createObject("LobbyGameListView", "CListView")
        m_rPlayerListView = createObject("LobbyPlayerListView", "CListView")
        m_rAttributeListView = createObject("LobbyAttribyteListView", "CListView")
        m_rMyAttributeListView = createObject("LobbyMyAttributeListView", "CListView")
        if voidp(m_rGameListView) then
          return error(me, "Failed to create list view", #ShowDefaultLobbyWindow)
        end if
        if voidp(m_rPlayerListView) then
          return error(me, "Failed to create list view", #ShowDefaultLobbyWindow)
        end if
        if voidp(m_rAttributeListView) then
          return error(me, "Failed to create list view", #ShowDefaultLobbyWindow)
        end if
        if voidp(m_rMyAttributeListView) then
          return error(me, "Failed to create list view", #ShowDefaultLobbyWindow)
        end if
        m_rGameListView.SetItemHeight(15)
        m_rPlayerListView.SetItemHeight(15)
        m_rAttributeListView.SetItemHeight(15)
        m_rMyAttributeListView.SetItemHeight(15)
      end if
    end if
  else
    if objectp(tWndObj) then
      if not removeWindow(m_sWindowName) then
        return error(me, "Failed to destroy lobby window", #ShowDefaultLobbyWindow)
      end if
      removeObject(m_rGameListView.getID())
      removeObject(m_rPlayerListView.getID())
      removeObject(m_rAttributeListView.getID())
      removeObject(m_rMyAttributeListView.getID())
      m_iGameListSelection = VOID
      m_iPlayerListSelection = VOID
      m_iAttributeListSelection = VOID
      m_iMyAttributeListSelection = VOID
    end if
  end if
end
on CreateGameListContent me
  if not voidp(m_rGameListView) then
    tWndObj = getWindow(m_sWindowName)
    if objectp(tWndObj) then
      tElement = tWndObj.getElement("lobby_list_of_games")
      if objectp(tElement) then
        m_rGameListView.clear()
        m_rGameListView.SetItemWidth(tElement.getProperty(#width))
        tGameList = me.getComponent().GetGameList()
        repeat with tGame in tGameList
          tID = tGame.data.GetParameterValue(#GameID)
          tName = tGame.data.GetParameterValue(#GameName)
          m_rGameListView.createItem(tID & ", " & tName)
        end repeat
        tImage = m_rGameListView.render()
        tElement.feedImage(tImage)
      end if
    end if
    m_iGameListSelection = VOID
  end if
end
on CreatePlayerListContent me
  if not voidp(m_rPlayerListView) then
    tWndObj = getWindow(m_sWindowName)
    if objectp(tWndObj) then
      tElement = tWndObj.getElement("lobby_current_game_players")
      if objectp(tElement) then
        tCurrentGame = me.getComponent().CurrentGame()
        m_rPlayerListView.clear()
        m_rPlayerListView.SetItemWidth(tElement.getProperty(#width))
        if objectp(tCurrentGame) then
          tParticipantList = tCurrentGame.GetParticipants()
          repeat with tParticipant in tParticipantList
            tRoom = getThread("room").component._AccessRoom()
            tAvatarRef = tParticipant.GetParameterValue(#AvatarRef)
            t_rAvatar = tRoom._AccessIndexed(tAvatarRef, "avatar")
            t_sSender = EMPTY
            if not voidp(t_rAvatar) then
              t_sSender = t_rAvatar.GetParam("NAME")
            end if
            m_rPlayerListView.createItem(string(tAvatarRef) & ", " & t_sSender)
          end repeat
          tImage = m_rPlayerListView.render()
          tElement.feedImage(tImage)
        end if
      end if
    end if
    m_iPlayerListSelection = VOID
  end if
end
on CreateAttributeListContent me
  if not voidp(m_rAttributeListView) then
    tWndObj = getWindow(m_sWindowName)
    if objectp(tWndObj) then
      tElement = tWndObj.getElement("lobby_attribute_list")
      if objectp(tElement) then
        tCurrentGame = me.getComponent().CurrentGame()
        m_rAttributeListView.clear()
        m_rAttributeListView.SetItemWidth(tElement.getProperty(#width))
        if objectp(tCurrentGame) then
          tAttributeMap = tCurrentGame.GetParameterList()
          repeat with i = 1 to tAttributeMap.count
            tID = tAttributeMap.getPropAt(i)
            tDescription = tCurrentGame.GetParameterDescription(tID)
            tvalue = tCurrentGame.GetParameterValue(tID)
            m_rAttributeListView.createItem(tID & ", " & tDescription & ": " & tvalue)
          end repeat
          tImage = m_rAttributeListView.render()
          tElement.feedImage(tImage)
        end if
      end if
    end if
  end if
end
on CreateMyAttributeListContent me
  if not voidp(m_rMyAttributeListView) then
    tWndObj = getWindow(m_sWindowName)
    if objectp(tWndObj) then
      tElement = tWndObj.getElement("lobby_my_attribute_list")
      if objectp(tElement) then
        m_rMyAttributeListView.clear()
        m_rMyAttributeListView.SetItemWidth(tElement.getProperty(#width))
        tMyAvatarRef = getObject(#session).get("room_own_avatar")
        tMe = me.getComponent().GetCurrentGame().GetByAvatarRef(tMyAvatarRef)
        if objectp(tMe) then
          tAttributeMap = tMe.GetParameterList()
          repeat with i = 1 to tAttributeMap.count
            tID = tAttributeMap.getPropAt(i)
            tDescription = tMe.GetParameterDescription(tID)
            tvalue = tMe.GetParameterValue(tID)
            m_rMyAttributeListView.createItem(tID & ", " & tDescription & ": " & tvalue)
          end repeat
          tImage = m_rMyAttributeListView.render()
          tElement.feedImage(tImage)
        end if
      end if
    end if
  end if
end
on RefreshDisplay me
  tWndObj = getWindow(m_sWindowName)
  if objectp(tWndObj) then
    tElement = tWndObj.getElement("lobby_list_of_games")
    if objectp(tElement) then
      tImage = m_rGameListView.render()
      tElement.feedImage(tImage)
    end if
    tElement = tWndObj.getElement("lobby_current_game_players")
    if objectp(tElement) then
      tImage = m_rPlayerListView.render()
      tElement.feedImage(tImage)
    end if
    tElement = tWndObj.getElement("lobby_attribute_list")
    if objectp(tElement) then
      tImage = m_rAttributeListView.render()
      tElement.feedImage(tImage)
    end if
    tElement = tWndObj.getElement("lobby_my_attributes")
    if objectp(tElement) then
      tImage = m_rMyAttributeListView.render()
      tElement.feedImage(tImage)
    end if
  end if
end
on LobbyEventProc me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "lobby_join_game":
        if m_iGameListSelection <> 0 then
          tGameID = me.getComponent().GetGameList().getPropAt(m_iGameListSelection)
          tTeam = value(getWindow(m_sWindowName).getElement("lobby_team").getText())
          me.getComponent().JoinGame(tGameID, tTeam)
        end if
      "lobby_leave_game":
        me.getComponent().LeaveCurrentGame()
      "lobby_create_game":
        me.getComponent().CreateGame([:])
      "lobby_remove_game":
        me.getComponent().RemoveMyGame()
      "lobby_start_game":
        me.getComponent().StartMyGame()
        me.ShowDefaultLobbyWindow(0)
        updateStage()
      "lobby_kick_avatar":
        if m_iPlayerListSelection <> 0 then
          tParticipantList = me.getComponent().GetCurrentGame().GetParticipants()
          tRef = tParticipantList[m_iPlayerListSelection]
          me.getComponent().KickAvatarFromMyGame(tRef)
        end if
      "lobby_set_attribute":
        if m_iAttributeListSelection <> 0 then
          tAttributelist = me.getComponent().GetCurrentGame().GetParameterList()
          tKey = tAttributelist[m_iAttributeListSelection]
          tvalue = getWindow(m_sWindowName).getElement("lobby_attribute_value").getText()
          me.getComponent().GetCurrentGame().SetParameter(tKey, tvalue)
        end if
      "lobby_set_my_attribute":
        if m_iMyAttributeListSelection <> 0 then
          tMyAvatarRef = getObject(#session).get("room_own_avatar")
          tMe = me.getComponent().GetCurrentGame().GetByAvatarRef(tMyAvatarRef)
          if objectp(tMe) then
            tAttributeMap = tMe.GetParameterList()
          end if
        end if
      "lobby_list_of_games":
        m_rGameListView.unselectAll()
        tClickPos = tParm
        m_iGameListSelection = m_rGameListView.getItemIndexClickedOn(tClickPos)
        m_rGameListView.selectItem(m_iGameListSelection, 1)
        me.RefreshDisplay()
      "lobby_current_game_players":
        m_rPlayerListView.unselectAll()
        tClickPos = tParm
        m_iPlayerListSelection = m_rPlayerListView.getItemIndexClickedOn(tClickPos)
        m_rPlayerListView.selectItem(m_iPlayerListSelection, 1)
        me.RefreshDisplay()
      "lobby_attribute_list":
        m_rAttributeListView.unselectAll()
        tClickPos = tParm
        m_iAttributeListSelection = m_rAttributeListView.getItemIndexClickedOn(tClickPos)
        m_rAttributeListView.selectItem(m_iAttributeListSelection, 1)
        me.RefreshDisplay()
      "lobby_my_attribute_list":
        m_rMyAttributeListView.unselectAll()
        tClickPos = tParm
        m_iMyAttributeListSelection = m_rMyAttributeListView.getItemIndexClickedOn(tClickPos)
        m_rMyAttributeListView.selectItem(m_iMyAttributeListSelection, 1)
        me.RefreshDisplay()
      "close":
        me.ShowDefaultLobbyWindow(0)
        updateStage()

    end case
  end if
end
on DisplayError me, a_sText
  t = createDialogWindow(me.getID(), "LobbyError", 1, 1)
  t.show()
  t.setText(a_sText, getText("lobby.error.title"), "OK")
end