-- Parent Script
property ancestor
property m_bDebug

on construct me
  me.m_bDebug = 0
  me.regMsgList(1)
  registerMessage("init_messenger", me.getID(), #InitMessengerOnce)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  unregisterMessage("init_messenger", me.getID())
end
on InitMessengerOnce me
  unregisterMessage("init_messenger", me.getID())
  me.MessengerInit([])
end
on parseServerMessage me, tMsgStruct, t_ar_msgDesc
  t_ar_out = propList()
  repeat with t = 1 to t_ar_msgDesc.count
    t_symProp = t_ar_msgDesc.getPropAt(t)
    t_symValue = t_ar_msgDesc[t]
    if t_symProp = #bool then
      t_ar_out[t_symValue] = tMsgStruct.connection.GetIntFrom()
      next repeat
    end if
    if t_symProp = #int then
      t_iValue = tMsgStruct.connection.GetIntFrom()
      t_ar_out[t_symValue] = t_iValue
      next repeat
    end if
    if t_symProp = #str then
      t_ar_out[t_symValue] = tMsgStruct.connection.GetStrFrom()
      next repeat
    end if
    if t_symProp = #canned then
      t_ar_out[t_symValue] = tMsgStruct.connection.GetStrFrom()
      next repeat
    end if
    if t_symProp = #condition then
      t_iValue = tMsgStruct.connection.GetIntFrom()
      t_ar_out[t_symValue] = t_iValue
      if t_iValue then
        t_ar_chosen = t_ar_msgDesc[t + 1]
      else
        t_ar_chosen = t_ar_msgDesc[t + 2]
      end if
      t_ar_temp = me.parseServerMessage(tMsgStruct, t_ar_chosen)
      repeat with t_iTemp = 1 to t_ar_temp.count
        t_ar_out[t_ar_temp.getPropAt(t_iTemp)] = t_ar_temp[t_iTemp]
      end repeat
      t = t + 2
      next repeat
    end if
    if t_symProp = #Array then
      t_iArrayCount = t_ar_out[t_ar_out.count]
      t_sArrayParam = t_ar_out.getPropAt(t_ar_out.count).string
      t_sArrayParam = symbol(replaceChunks(t_sArrayParam, "count", EMPTY) & "array")
      t_ar_out[t_sArrayParam] = []
      repeat with t_iCounter = 1 to t_iArrayCount
        t_ar_out[t_sArrayParam].append(me.parseServerMessage(tMsgStruct, t_symValue))
      end repeat
      next repeat
    end if
    put "Unknown property" && t_symProp
  end repeat
  return t_ar_out
end
on createClientCommand me, t_ar_Params, t_ar_msgDesc
  t_ar_out = propList()
  repeat with t = 1 to t_ar_msgDesc.count
    t_symProp = t_ar_msgDesc.getPropAt(t)
    t_symValue = t_ar_msgDesc[t]
    if t_symProp = #int then
      addProp(t_ar_out, t_symProp, t_ar_Params[t])
      next repeat
    end if
    if t_symProp = #str then
      addProp(t_ar_out, t_symProp, t_ar_Params[t])
      next repeat
    end if
    if t_symProp = #canned then
      addProp(t_ar_out, #str, TransformCannedToMsg(t_ar_Params[t]).str)
      next repeat
    end if
    if t_symProp = #Array then
      t_ar_append = me.createClientCommand(t_ar_Params[t], t_symValue)
      repeat with t_iCounter = 1 to t_ar_append.count
        t_rAppendProp = t_ar_append.getPropAt(t_iCounter)
        t_rAppendValue = t_ar_append[t_iCounter]
        addProp(t_ar_out, t_rAppendProp, t_rAppendValue)
      end repeat
      next repeat
    end if
    put "Could not append unknown prop-type" & t_symProp
  end repeat
  return t_ar_out
end
on MessengerReady me, tMsgStruct
  t_ar_msgDesc = []
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->MessengerReady" & t_ar_out
  end if
  me.getComponent().MessengerReady(t_ar_out)
end
on friendlist me, tMsgStruct
  t_ar_msgDesc = propList(#int, #friend_count, #Array, propList(#int, #userID, #str, #buddyname, #canned, #slogan, #condition, #online, #Array, propList(#str, #usersRoom, #int, #locationAccessible), #Array, propList(#str, #lastAccessTime)))
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->Friendlist" & t_ar_out
  end if
  me.getComponent().friendlist(t_ar_out.friend_array)
end
on FriendlistUpdate me, tMsgStruct
  t_ar_msgDesc = propList(#int, #friend_count, #Array, propList(#int, #userID, #str, #buddyname, #canned, #slogan, #condition, #online, #Array, propList(#str, #usersRoom, #int, #locationAccessible), #Array, propList(#str, #lastAccessTime)))
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->FriendlistUpdate" & t_ar_out
  end if
  me.getComponent().FriendlistUpdate(t_ar_out.friend_array)
end
on InstantmessageReceived me, tMsgStruct
  t_ar_msgDesc = propList(#int, #msgid, #int, #senderID, #str, #date, #canned, #content, #str, #avatarName)
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->InstantmessageReceived" & t_ar_out
  end if
  me.getComponent().InstantmessageReceived(t_ar_out)
end
on FriendshipRequested me, tMsgStruct
  t_ar_msgDesc = propList(#int, #requester_id, #str, #requester_name)
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->FriendshipRequested" & t_ar_out
  end if
  me.getComponent().FriendshipRequested(t_ar_out)
end
on AddFriend me, tMsgStruct
  t_ar_msgDesc = propList(#int, #userID, #str, #buddyname, #canned, #slogan, #condition, #online, #Array, propList(#str, #usersRoom, #int, #locationAccessible), #Array, propList(#str, #lastAccessTime))
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->AddFriend" & t_ar_out
  end if
  me.getComponent().AddFriend(t_ar_out)
end
on removeFriend me, tMsgStruct
  t_ar_msgDesc = propList(#int, #targetid)
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->RemoveFriend" & t_ar_out
  end if
  me.getComponent().removeFriend(t_ar_out.targetid)
end
on AvatarInfo me, tMsgStruct
  t_ar_msgDesc = propList(#int, #userID, #str, #userName)
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->AvatarInfo" & t_ar_out
  end if
  me.getComponent().AvatarInfo(t_ar_out.userID, t_ar_out.userName)
end
on AdminMessage me, tMsgStruct
  t_ar_msgDesc = propList(#int, #msgid, #int, #flash, #str, #date, #str, #content)
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->AdminMessage" & t_ar_out
  end if
  me.getComponent().AdminMessage(t_ar_out)
end
on AdminResourceMessage me, tMsgStruct
  t_ar_msgDesc = propList(#int, #msgid, #int, #flash, #str, #date, #str, #content, #str, #url, #str, #Caption)
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->AdminResourceMessage" & t_ar_out
  end if
  me.getComponent().AdminResourceMessage(t_ar_out)
end
on AddFriendFailed me, tMsgStruct
  t_ar_msgDesc = propList(#int, #requesterId)
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->AddFriendFailed" & t_ar_out
  end if
  me.getComponent().AddFriendFailed(t_ar_out.requesterId)
end
on ReinitializeMessenger me, tMsgStruct
  t_ar_msgDesc = []
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if me.m_bDebug then
    put "Messenger->ReInitializeMessenger" & t_ar_out
  end if
  me.getComponent().ReinitializeMessenger()
end
on MessengerInit me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 540, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-MessengerInit" & t_ar_Msg
  end if
end
on RequestFriendListUpdate me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 541, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-RequestFriendListUpdate" & t_ar_Msg
  end if
end
on RequestCompleteFriendlist me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 542, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-RequestCompleteFriendlist" & t_ar_Msg
  end if
end
on MarkReadInstantMessage me, t_arg
  t_ar_msgDesc = propList(#int, #message_id)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 543, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-MarkReadInstantMessage" & t_ar_Msg
  end if
end
on SendInstantMessage me, t_arg
  t_ar_msgDesc = propList(#int, #number_of_recipients, #Array, propList(#int, #recipient), #canned, #content)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 544, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-SendInstantMessage" & t_ar_Msg
  end if
end
on RequestFriendship me, t_arg
  t_ar_msgDesc = propList(#str, #userName)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 545, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-RequestFriendship" & t_ar_Msg
  end if
end
on AcceptFriendRequest me, t_arg
  t_ar_msgDesc = propList(#int, #user_id)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 546, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-AcceptFriendRequest" & t_ar_Msg
  end if
end
on DeclineFriendRequest me, t_arg
  t_ar_msgDesc = propList(#int, #user_id)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 547, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-DeclineFriendRequest" & t_ar_Msg
  end if
end
on RemoveFriendship me, t_arg
  t_ar_msgDesc = propList(#int, #user_id)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 548, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-RemoveFriendship" & t_ar_Msg
  end if
end
on RequestAvatarInfo me, t_arg
  t_ar_msgDesc = propList(#int, #user_id)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 549, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-RequestAvatarInfo" & t_ar_Msg
  end if
end
on GoToFriend me, t_arg
  t_ar_msgDesc = propList(#int, #friend_user_id)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 550, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-GoToFriend" & t_ar_Msg
  end if
end
on ReportMessageAsOffensive me, t_arg
  t_ar_msgDesc = propList(#int, #messageId)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 551, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-ReportMessageAsOffensive" & t_ar_Msg
  end if
end
on IgnoreFriend me, t_arg
  t_ar_msgDesc = propList(#int, #messageId)
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  send(getConnection(getVariable("main.connection.id", "VMK")), 593, t_ar_Msg)
  if me.m_bDebug then
    put "Messenger<-IgnoreFriend" & t_ar_Msg
  end if
end
on regMsgList me, tBool
  tMsgs = propList()
  setaProp(tMsgs, 2540, #MessengerReady)
  setaProp(tMsgs, 2541, #friendlist)
  setaProp(tMsgs, 2542, #FriendlistUpdate)
  setaProp(tMsgs, 2543, #InstantmessageReceived)
  setaProp(tMsgs, 2544, #FriendshipRequested)
  setaProp(tMsgs, 2545, #AddFriend)
  setaProp(tMsgs, 2546, #removeFriend)
  setaProp(tMsgs, 2547, #AvatarInfo)
  setaProp(tMsgs, 2548, #AdminMessage)
  setaProp(tMsgs, 2549, #AdminResourceMessage)
  setaProp(tMsgs, 2550, #AddFriendFailed)
  setaProp(tMsgs, 2551, #ReinitializeMessenger)
  tCmds = propList()
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
  unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
end