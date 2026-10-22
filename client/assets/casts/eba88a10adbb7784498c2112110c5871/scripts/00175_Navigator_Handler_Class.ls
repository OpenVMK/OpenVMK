-- Behavior
property m_iSellRoomID

on construct me
  return me.regMsgList(1)
end
on deconstruct me
  return me.regMsgList(0)
end
on _EntranceDenied this, a_rMsg
  t_iCheckID = a_rMsg.connection.GetIntFrom()
  t_iExplanationCode = a_rMsg.connection.GetIntFrom()
  case t_iExplanationCode of
    1000:
      tThread = getThread("room")
      if tThread <> 0 then
        tThread.getComponent()._CancelRoom()
      end if
      this.getInterface().ShowNavigator()
      t_rDialog = createDialogWindow(this.getID(), "NavUserKicked", 1, 0)
      t_rDialog.show()
      t_rDialog.setText(getText("nav.kicked.title"), getText("nav.kicked.desc"), getText("nav.kicked.ok"))
    1001:
      tThread = getThread("room")
      if tThread <> 0 then
        tThread.getComponent()._CancelRoom()
      end if
      this.getInterface().ShowNavigator()
      t_rDialog = createDialogWindow(this.getID(), "NavUserTicketing", 1, 0)
      t_rDialog.show()
      t_rDialog.setText(getText("nav.ticketing.title"), getText("nav.ticketing.desc"), getText("nav.ticketing.ok"))

  end case
end
on _QueueRoom this, a_rMsg
  t_sRoomName = a_rMsg.connection.GetStrFrom()
  t_iQueueNumber = a_rMsg.connection.GetIntFrom()
  tRoomQueue = this.getInterface().getRoomQueueWindow()
  if objectp(tRoomQueue) then
    tRoomQueue.ShowQueue(t_sRoomName, t_iQueueNumber)
  end if
end
on _CancelRoomLoad this, a_rMsg
  tThread = getThread("room")
  if tThread <> 0 then
    tThread.getComponent()._CancelRoom()
  end if
  if objectExists("Navigation.Room.Queue") then
    getObject("Navigation.Room.Queue").hideLoadBar()
  end if
  this.getInterface().ShowNavigator()
end
on handle_cantconnect me, tMsg
  tConn = tMsg.getaProp(#connection)
  tErrorMsg = tConn.GetStrFrom()
  executeMessage(#leaveRoom)
  return executeMessage(#alert, [#Msg: tErrorMsg])
end
on handle_success me, tMsg
  tConn = tMsg.getaProp(#connection)
  tMsgId = tMsg.connection.GetIntFrom()
  return 1
end
on navigationNodeInfo me, tMsg
  t_mp_NodeInfo = [:]
  t_mp_NodeInfo[#nodetag] = tMsg.connection.GetIntFrom()
  t_mp_NodeInfo[#parentnodetag] = tMsg.connection.GetIntFrom()
  t_mp_NodeInfo[#absolutenodeusercount] = tMsg.connection.GetIntFrom()
  t_bInstanceInfoIncluded = tMsg.connection.GetIntFrom()
  t_iSpaceCount = tMsg.connection.GetIntFrom()
  t_ar_SpaceInfo = []
  if t_iSpaceCount > 0 then
    repeat with i = 1 to t_iSpaceCount
      t_bPublicSpace = tMsg.connection.GetIntFrom()
      t_ar_SpaceList = [:]
      if t_bPublicSpace then
        t_ar_SpaceList[#roomtype] = "public"
        t_ar_SpaceList[#spaceid] = tMsg.connection.GetIntFrom()
        t_ar_SpaceList[#tag] = tMsg.connection.GetIntFrom()
      else
        t_ar_SpaceList[#roomtype] = "private"
        t_ar_SpaceList[#spaceid] = tMsg.connection.GetIntFrom()
        t_ar_SpaceList[#roomName] = tMsg.connection.GetStrFrom()
        t_ar_SpaceList[#owner] = tMsg.connection.GetStrFrom()
        t_ar_SpaceList[#description] = tMsg.connection.GetStrFrom()
        t_ar_SpaceList[#friendonly] = tMsg.connection.GetIntFrom()
        t_ar_SpaceList[#accesfromnavi] = tMsg.connection.GetIntFrom()
        t_ar_SpaceList[#absoluteusercount] = tMsg.connection.GetIntFrom()
        t_ar_SpaceList[#maxusers] = tMsg.connection.GetIntFrom()
      end if
      if t_bInstanceInfoIncluded then
        t_iMaxUsers = tMsg.connection.GetIntFrom()
        t_iInstanceCount = tMsg.connection.GetIntFrom()
        if t_iInstanceCount > 0 then
          t_ar_SpaceList.addProp(#instances, [])
          repeat with g = 1 to t_iInstanceCount
            t_mp_list = [:]
            t_mp_list.addProp(#instanceID, tMsg.connection.GetIntFrom())
            t_iUserCount = tMsg.connection.GetIntFrom()
            t_iPercent = t_iUserCount * 100 / t_iMaxUsers
            t_mp_list.addProp(#instanusercount, t_iUserCount)
            t_mp_list.addProp(#instanmaxusers, t_iMaxUsers)
            t_mp_list.addProp(#instanuserpercent, t_iPercent)
            t_ar_SpaceList.instances.add(t_mp_list)
          end repeat
        end if
      end if
      t_ar_SpaceInfo.add(t_ar_SpaceList)
    end repeat
  end if
  t_mp_NodeInfo[#spaces] = t_ar_SpaceInfo
  t_iChildNodeCount = tMsg.connection.GetIntFrom()
  if t_iChildNodeCount > 0 then
    t_ar_ChildInfo = []
    repeat with h = 1 to t_iChildNodeCount
      t_mp_ChildInfo = [:]
      t_mp_ChildInfo.addProp(#childtag, tMsg.connection.GetIntFrom())
      t_mp_ChildInfo.addProp(#childabsoluteusercount, tMsg.connection.GetIntFrom())
      t_ar_ChildInfo.add(t_mp_ChildInfo)
    end repeat
  end if
  t_mp_NodeInfo[#children] = t_ar_ChildInfo
  me.getComponent().CreateNavigator(t_mp_NodeInfo)
end
on parentChain me, tMsg
  t_iNodeCount = tMsg.connection.GetIntFrom()
  t_ar_ParentChain = []
  repeat with i = 1 to t_iNodeCount
    t_iID = tMsg.connection.GetIntFrom()
    t_ar_ParentChain.add(t_iID)
  end repeat
end
on userSelectableNodes me, tMsg
  t_iNodeCount = tMsg.connection.GetIntFrom()
  t_ar_UserNodes = [:]
  repeat with i = 1 to t_iNodeCount
    t_iID = tMsg.connection.GetIntFrom()
  end repeat
end
on InstanceInfo me, tMsg
  t_mpInstanceData = [:]
  t_iSpaceID = tMsg.connection.GetIntFrom()
  t_iMaxUsers = tMsg.connection.GetIntFrom()
  t_iInstanceCount = tMsg.connection.GetIntFrom()
  repeat with i = 1 to t_iInstanceCount
    t_iID = tMsg.connection.GetIntFrom()
    t_iUserCount = tMsg.connection.GetIntFrom()
    t_mpInstanceData.addProp(t_iID, [#maxusers: t_iMaxUsers, #usercount: t_iUserCount])
  end repeat
end
on spaceListSearch me, tMsg
  t_iNodeCount = tMsg.connection.GetIntFrom()
  if t_iNodeCount = 0 then
    return me.NoResults()
  end if
  t_mp_SpaceList = [:]
  repeat with i = 1 to t_iNodeCount
    t_iID = tMsg.connection.GetIntFrom()
    t_sName = tMsg.connection.GetStrFrom()
    t_sOwner = tMsg.connection.GetStrFrom()
    t_sDesc = tMsg.connection.GetStrFrom()
    t_bFriendsOnly = tMsg.connection.GetIntFrom()
    t_bAccesFromNavi = tMsg.connection.GetIntFrom()
    t_iUserCount = tMsg.connection.GetIntFrom()
    t_iMaxUsers = tMsg.connection.GetIntFrom()
    t_mp_SpaceList[t_sName & getUniqueID()] = ["ID": t_iID, "Name": t_sName, "Owner": t_sOwner, "Description": t_sDesc, "friendOnly": t_bFriendsOnly, "AccesFromNavi": t_bAccesFromNavi, "UserCount": t_iUserCount, "MaxUsers": t_iMaxUsers]
  end repeat
  tGuestRoomNavigator = me.getInterface().GetGuestRoomNavigator()
  if not voidp(tGuestRoomNavigator) then
    tGuestRoomNavigator.createComponentWindow(t_mp_SpaceList)
  end if
end
on spaceListPopular me, tMsg
  t_mp_spaceListFeat = [:]
  t_mp_SpaceList = [:]
  t_iNodeCount = tMsg.connection.GetIntFrom()
  repeat with i = 1 to t_iNodeCount
    t_iID = tMsg.connection.GetIntFrom()
    t_sName = tMsg.connection.GetStrFrom()
    t_sOwner = tMsg.connection.GetStrFrom()
    t_sDesc = tMsg.connection.GetStrFrom()
    t_bFriendsOnly = tMsg.connection.GetIntFrom()
    t_bAccesFromNavi = tMsg.connection.GetIntFrom()
    t_iUserCount = tMsg.connection.GetIntFrom()
    t_iMaxUsers = tMsg.connection.GetIntFrom()
    t_mp_spaceListFeat[t_sName & getUniqueID()] = ["ID": t_iID, "Name": t_sName, "Owner": t_sOwner, "Description": t_sDesc, "friendOnly": t_bFriendsOnly, "AccesFromNavi": t_bAccesFromNavi, "UserCount": t_iUserCount, "MaxUsers": t_iMaxUsers, "Featured": 1]
  end repeat
  t_iNodeCount = tMsg.connection.GetIntFrom()
  repeat with i = 1 to t_iNodeCount
    t_iID = tMsg.connection.GetIntFrom()
    t_sName = tMsg.connection.GetStrFrom()
    t_sOwner = tMsg.connection.GetStrFrom()
    t_sDesc = tMsg.connection.GetStrFrom()
    t_bFriendsOnly = tMsg.connection.GetIntFrom()
    t_bAccesFromNavi = tMsg.connection.GetIntFrom()
    t_iUserCount = tMsg.connection.GetIntFrom()
    t_iMaxUsers = tMsg.connection.GetIntFrom()
    t_mp_spaceListFeat[t_sName & getUniqueID()] = ["ID": t_iID, "Name": t_sName, "Owner": t_sOwner, "Description": t_sDesc, "friendOnly": t_bFriendsOnly, "AccesFromNavi": t_bAccesFromNavi, "UserCount": t_iUserCount, "MaxUsers": t_iMaxUsers]
  end repeat
  tGuestRoomNavigator = me.getInterface().GetGuestRoomNavigator()
  if not voidp(tGuestRoomNavigator) then
    tGuestRoomNavigator.createComponentWindowWithFeatures(t_mp_spaceListFeat, t_mp_SpaceList)
  end if
end
on spaceListRoomType me, tMsg
  t_iRoomCode = tMsg.connection.GetIntFrom()
  t_iNodeCount = tMsg.connection.GetIntFrom()
  t_mp_SpaceList = [:]
  if t_iNodeCount > 0 then
    repeat with i = 1 to t_iNodeCount
      t_iID = tMsg.connection.GetIntFrom()
      t_sName = tMsg.connection.GetStrFrom()
      t_sOwner = tMsg.connection.GetStrFrom()
      t_sDesc = tMsg.connection.GetStrFrom()
      t_bFriendsOnly = tMsg.connection.GetIntFrom()
      t_bAccesFromNavi = tMsg.connection.GetIntFrom()
      t_iUserCount = tMsg.connection.GetIntFrom()
      t_iMaxUsers = tMsg.connection.GetIntFrom()
      t_mp_SpaceList[t_sName & getUniqueID()] = ["ID": t_iID, "Name": t_sName, "Owner": t_sOwner, "Description": t_sDesc, "friendOnly": t_bFriendsOnly, "AccesFromNavi": t_bAccesFromNavi, "UserCount": t_iUserCount, "MaxUsers": t_iMaxUsers]
    end repeat
  end if
  tThemedGuestRoomNavigator = me.getInterface().GetThemedGuestRoomNavigator()
  if voidp(tThemedGuestRoomNavigator) then
    me.getInterface().startThemedGuestRoomNavigator()
    tThemedGuestRoomNavigator = me.getInterface().GetThemedGuestRoomNavigator()
  end if
  if not tThemedGuestRoomNavigator.IsVisible() then
    tThemedGuestRoomNavigator.showHide()
  end if
  tThemedGuestRoomNavigator.SetRoom(t_iRoomCode)
  tThemedGuestRoomNavigator.createComponentWindow(t_mp_SpaceList)
end
on NoResults me
  tGuestRoomNavigator = me.getInterface().GetGuestRoomNavigator()
  if not voidp(tGuestRoomNavigator) then
    tGuestRoomNavigator.createComponentWindow([])
  end if
end
on HandleError me, tMsg
  t_iMsgNum = tMsg[#subject]
  case t_iMsgNum of
    20:
      put "space does not exist"
    21:
      put "search string too short"
    22:
      put "entering space without owner present"
    23:
      put "space not accessible from navigator"
    30:
      put "unknown navigation node tag"

  end case
end
on PrivateRoomIsClosing this, a_rMsg
  this.interface.ShowNavigator()
  t_rDialog = createDialogWindow(this.getID(), "NavOwnerNotPresent", 1, 0)
  t_rDialog.show()
  t_rDialog.setText(getText("nav.closing.title"), getText("nav.closing.desc"), getText("nav.closing.ok"))
end
on UserWasKicked this, a_rMsg
  this.interface.ShowNavigator()
  t_rDialog = createDialogWindow(this.getID(), "NavUserKicked", 1, 0)
  t_rDialog.show()
  if getObject(#session).get("RoomType") = "private" then
    t_rDialog.setText(getText("nav.kicked.title"), getText("nav.kicked.desc"), getText("nav.kicked.ok"))
  else
    t_rDialog.setText(getText("nav.kicked.public.title"), getText("nav.kicked.desc"), getText("nav.kicked.ok"))
  end if
end
on RoomSellConfRequest me, a_rMsg
  t_iSpaceID = a_rMsg.connection.GetIntFrom()
  t_sSpaceName = a_rMsg.connection.GetStrFrom()
  t_iRefund = a_rMsg.connection.GetIntFrom()
  t_rDialog = createDialogWindow(me.getID(), "ConfirmRoomSell", 2, 1)
  t_rDialog.show()
  t_rDialog.setText(getText("nav.sellroom.desc1") & t_sSpaceName & getText("nav.sellroom.desc2") && t_iRefund && getText("nav.sellroom.desc3"), getText("nav.sellroom.title"), getText("nav.sellroom.no"), getText("nav.sellroom.yes"))
  m_iSellRoomID = t_iSpaceID
end
on RoomSold me, a_rMsg
  t_iSpaceID = a_rMsg.connection.GetIntFrom()
  t_iRefund = a_rMsg.connection.GetIntFrom()
  t_rDialog = createDialogWindow(me.getID(), "RoomSold", 1, 1)
  t_rDialog.show()
  t_rDialog.setText(getText("nav.roomsold.desc1") && t_iRefund && getText("nav.roomsold.desc2"), getText("nav.roomsold.title"), getText("nav.roomsold.ok"))
  me.getInterface().GetGuestRoomNavigator().GetContent()
end
on SpaceListRoomTypeTrigger me, a_rMsg
  t_iRoomCode = a_rMsg.connection.GetIntFrom()
  getConnection(getVariable("main.connection.id", "VMK")).send("GetPopularSpacesByType", [#integer: t_iRoomCode])
end
on CreateFastPass me, a_rMsg
  t_iSpaceID = a_rMsg.connection.GetIntFrom()
  t_iInstanceId = a_rMsg.connection.GetIntFrom()
  t_sSpaceName = a_rMsg.connection.GetStrFrom()
  t_iPosInQueue = a_rMsg.connection.GetIntFrom()
  t_mp_FastPassData = [#spaceid: t_iSpaceID, #instanceID: t_iInstanceId, #spaceName: t_sSpaceName, #queuePos: t_iPosInQueue]
  me.component.CreateFastPass(t_mp_FastPassData)
end
on CancelFastPass me
  me.component.CancelFastPass()
end
on FastPAssQueuePosition me, a_rMsg
  t_iPosInQueue = a_rMsg.connection.GetIntFrom()
  me.component.UpdateFastPassQueuePosition(t_iPosInQueue)
end
on dialogWindowEvent me, a_sDialog, a_kEvent
  case a_sDialog of
    "ConfirmRoomSell":
      if a_kEvent = #dialogOK then
        getConnection(getVariable("main.connection.id", "VMK")).send("SellRoom", [#integer: m_iSellRoomID, #integer: 1])
      else
        if a_kEvent = #dialogCancel then
        end if
      end if

  end case
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2020, #navigationNodeInfo)
  tMsgs.setaProp(2021, #parentChain)
  tMsgs.setaProp(2022, #userSelectableNodes)
  tMsgs.setaProp(2023, #InstanceInfo)
  tMsgs.setaProp(2030, #spaceListSearch)
  tMsgs.setaProp(2031, #spaceListPopular)
  tMsgs.setaProp(2032, #spaceListSearch)
  tMsgs.setaProp(2033, #spaceListSearch)
  tMsgs.setaProp(2046, #PrivateRoomIsClosing)
  tMsgs.setaProp(2047, #PrivateRoomIsClosing)
  tMsgs.setaProp(2790, #UserWasKicked)
  tMsgs.setaProp(2040, #_EntranceDenied)
  tMsgs.setaProp(2041, #_QueueRoom)
  tMsgs.setaProp(2042, #_CancelRoomLoad)
  tMsgs.setaProp(2794, #RoomSellConfRequest)
  tMsgs.setaProp(2795, #RoomSold)
  tMsgs.setaProp(2830, #spaceListRoomType)
  tMsgs.setaProp(2831, #SpaceListRoomTypeTrigger)
  tMsgs.setaProp(2832, #CreateFastPass)
  tMsgs.setaProp(2833, #CancelFastPass)
  tMsgs.setaProp(2834, #FastPAssQueuePosition)
  tMsgs.setaProp(20, #HandleError)
  tMsgs.setaProp(21, #HandleError)
  tMsgs.setaProp(22, #HandleError)
  tMsgs.setaProp(23, #HandleError)
  tCmds = [:]
  tCmds.setaProp("NavigatorHandshake", 20)
  tCmds.setaProp("GET_PARENT_CHAIN", 21)
  tCmds.setaProp("NAVIGATE_NODE", 22)
  tCmds.setaProp("GET_USER_SELECTABLE_NODES", 23)
  tCmds.setaProp("GET_OWN_SPACES", 24)
  tCmds.setaProp("GET_ROOT_NODE", 25)
  tCmds.setaProp("NODE_INSTANCES", 26)
  tCmds.setaProp("FRIEND_SPACES", 27)
  tCmds.setaProp("SEARCH_PRIVATE", 28)
  tCmds.setaProp("GET_POPULAR", 29)
  tCmds.setaProp("PRIVATE_SPACE_REQUEST", 30)
  tCmds.setaProp("PUBLIC_SPACE_REQUEST", 31)
  tCmds.setaProp("searchAnyRoom", 38)
  tCmds.setaProp("CancelRoomQueue", 41)
  tCmds.setaProp("SellRoom", 597)
  tCmds.setaProp("Ping", 12)
  tCmds.setaProp("GetPopularSpacesByType", 830)
  tCmds.setaProp("GetFastPass", 832)
  tCmds.setaProp("DiscardFastPass", 833)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
  return 1
end