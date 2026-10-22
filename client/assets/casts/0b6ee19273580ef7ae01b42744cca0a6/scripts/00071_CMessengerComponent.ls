-- Score Script
property m_ar_inbox
property m_ar_addressbook
property m_ar_Requests
property m_ar_avatars
property m_bInboxUpdated
property m_bAddressbookUpdated
property m_bRequestsUpdated
property m_rRecipient
property m_bPolling
property m_iPollingDelay

on construct me
  m_ar_inbox = []
  m_ar_addressbook = []
  m_ar_Requests = []
  m_ar_avatars = []
  m_bInboxUpdated = 0
  m_bAddressbookUpdated = 0
  m_bRequestsUpdated = 0
  m_rRecipient = VOID
  m_bPolling = 0
  m_iPollingDelay = getVariableValue("mes.polling.interval", 5000)
  return 1
end
on deconstruct me
  m_ar_inbox = []
  m_ar_addressbook = []
  m_ar_Requests = []
  m_ar_avatars = []
  m_bInboxUpdated = 0
  m_bAddressbookUpdated = 0
  m_bRequestsUpdated = 0
  m_rRecipient = VOID
  return 1
end
on getMessengerState me
  return me.getInterface().GetState()
end
on startPolling me
  if not m_bPolling then
    me.poll()
    createTimeout(#messenger_poller, m_iPollingDelay, #poll, me.getID(), VOID, 0)
    m_bPolling = 1
  end if
end
on stopPolling me
  m_bPolling = 0
  if timeoutExists(#messenger_poller) then
    removeTimeout(#messenger_poller)
  end if
end
on poll me
  me.getHandler().RequestFriendListUpdate([])
end
on updateCannedFriendList me
  t_ar_friendnamelist = GetCannedFriendWordList()
  repeat with t_ar_friend in m_ar_addressbook
    t_sName = t_ar_friend[#buddyname]
    if t_ar_friendnamelist.getOne(t_sName) = 0 then
      me.padNameForDictionary(t_sName, t_ar_friendnamelist)
    end if
  end repeat
  SetCannedFriendWordList(t_ar_friendnamelist)
end
on padNameForDictionary me, t_sName, o_ar_WordList
  if stringp(t_sName) then
    o_ar_WordList.append(t_sName)
    o_ar_WordList.append(t_sName & "s")
    o_ar_WordList.append(t_sName & "'s")
    tNum = charToNum(t_sName.char[1])
    if tNum >= 65 and tNum <= 90 then
      o_ar_WordList.append(me.FirstCharToLower(t_sName))
      o_ar_WordList.append(me.FirstCharToLower(t_sName & "s"))
      o_ar_WordList.append(me.FirstCharToLower(t_sName & "'s"))
    else
      o_ar_WordList.append(me.FirstCharToUpper(t_sName))
      o_ar_WordList.append(me.FirstCharToUpper(t_sName & "s"))
      o_ar_WordList.append(me.FirstCharToUpper(t_sName & "'s"))
    end if
    o_ar_WordList.append(convertToLowerCase(t_sName))
    o_ar_WordList.append(convertToLowerCase(t_sName) & "s")
    o_ar_WordList.append(convertToLowerCase(t_sName) & "'s")
  end if
end
on MessengerReady me
  nothing()
end
on friendlist me, a_ar_friends
  m_ar_addressbook = a_ar_friends
  me.getInterface().updateCurrentView()
  me.updateCannedFriendList()
end
on FriendlistUpdate me, a_ar_friends
  repeat with t_ar_friend in a_ar_friends
    t_ar_search = [#index: -1, #entry: VOID]
    if me.findAddressbookEntry(t_ar_friend.userID, t_ar_search) then
      t_ar_entry = t_ar_search.entry
      repeat with i = 1 to t_ar_friend.count
        t_kProp = t_ar_friend.getPropAt(i)
        t_kValue = t_ar_friend[i]
        t_ar_entry[t_kProp] = t_kValue
      end repeat
      me.getInterface().updateAddressbookEntry(t_ar_entry)
      next repeat
    end if
    me.AddFriend(t_ar_friend)
  end repeat
  me.getInterface().updateCurrentView()
  me.updateCannedFriendList()
end
on InstantmessageReceived me, a_ar_msg
  if a_ar_msg.senderID = 0 then
    a_ar_msg[#flash] = 0
    me.AdminMessage(a_ar_msg)
  else
    i = 1
    repeat with t_ar_Msg in m_ar_inbox
      if t_ar_Msg.senderID > 0 then
        if compareDates(a_ar_msg.date, t_ar_Msg.date) then
          exit repeat
        end if
      end if
      i = i + 1
    end repeat
    m_ar_inbox.addAt(i, a_ar_msg)
    me.getInterface().updateCurrentView()
    me.getInterface().setIconPulse(1)
    t_iState = me.getInterface().GetState()
    if t_iState = #hidden then
      me.getInterface().setState(#waiting)
    else
      executeMessage("PlayInterfaceSound", "UI-message")
    end if
  end if
end
on FriendshipRequested me, a_ar_request
  m_ar_Requests.append(a_ar_request)
  me.getInterface().updateCurrentView()
  me.getInterface().setIconPulse(1)
end
on AddFriend me, a_ar_friend
  me.getInterface().addAddressbookEntry(a_ar_friend)
  m_ar_addressbook.append(a_ar_friend)
  me.getInterface().updateCurrentView()
  me.getInterface().setIconPulse(1)
  me.updateCannedFriendList()
end
on removeFriend me, a_iTargetID
  t_ar_search = [#index: -1, #entry: VOID]
  if me.findAddressbookEntry(a_iTargetID, t_ar_search) then
    me.getInterface().removeAddressbookEntry(t_ar_search.entry)
    me.removeMessagesByFriend(a_iTargetID)
    m_ar_addressbook.deleteAt(t_ar_search.index)
  end if
  me.getInterface().updateCurrentView()
end
on AvatarInfo me, a_iUserID, a_sUserName
  m_ar_avatars.append([#userID: a_iUserID, #buddyname: a_sUserName])
end
on AdminMessage me, a_ar_msg
  a_ar_msg[#senderID] = 0
  me.addPrivilegedMessage(a_ar_msg)
  t_iState = me.getInterface().GetState()
  if t_iState = #normal then
    if a_ar_msg[#flash] then
      me.getInterface().show()
      me.getInterface().changeView("messagesnew")
    else
    end if
  end if
  if t_iState = #hidden then
    me.getInterface().setState(#waiting)
    me.getInterface().changeView("messagesnew")
  else
    executeMessage("PlayInterfaceSound", "UI-message")
  end if
  me.getInterface().setIconPulse(1)
  me.getInterface().updateCurrentView()
end
on AdminResourceMessage me, a_ar_msg
  me.AdminMessage(a_ar_msg)
end
on AddFriendFailed me, a_iRequesterId
  t_txt = getText("mes.dialog.addfriendfailed.info", "We failed to add your friend at this time since his friend-list is full, try again later.")
  t_title = getText("mes.dialog.addfriendfailed.title", "Add Friend Failed")
  t_btn1 = getText("mes.dialog.addfriendfailed.btn1", "OK")
  t = createDialogWindow(me.getID(), "mes.dialog.addfriendfailed", 1, 1)
  t.setText(t_txt, t_title, t_btn1)
  t.show()
end
on ReinitializeMessenger me
  me.getHandler().MessengerInit()
end
on setRecipient me, a_rRecipientData
  m_rRecipient = a_rRecipientData
end
on GetAddressBook me
  return m_ar_addressbook
end
on GetInbox me
  return m_ar_inbox
end
on GetRequests me
  return m_ar_Requests
end
on getRecipient me
  return m_rRecipient
end
on addPrivilegedMessage me, a_ar_msg
  if a_ar_msg.flash <> 0 then
    m_ar_inbox.addAt(1, a_ar_msg)
  else
    i = 1
    repeat with t_ar_Msg in m_ar_inbox
      if compareDates(a_ar_msg.date, t_ar_Msg.date) then
        exit repeat
      end if
      if t_ar_Msg.senderID <> 0 then
        exit repeat
      end if
      i = i + 1
    end repeat
    m_ar_inbox.addAt(i, a_ar_msg)
  end if
end
on deleteMessage me
  if m_ar_inbox.count > 0 then
    me.getHandler().MarkReadInstantMessage([m_ar_inbox[1].msgid])
    m_ar_inbox.deleteAt(1)
    return 1
  else
    return 0
  end if
end
on moveMessageToBack me
  if m_ar_inbox.count > 0 then
    t_msg = m_ar_inbox[1]
    m_ar_inbox.deleteAt(1)
    m_ar_inbox.append(t_msg)
  end if
end
on removeMessagesByFriend me, a_iUserID
  t_ar_found = []
  repeat with t_rMessage in m_ar_inbox
    if t_rMessage.senderID = a_iUserID then
      me.getHandler().MarkReadInstantMessage([t_rMessage.msgid])
      t_ar_found.append(t_rMessage)
    end if
  end repeat
  repeat with t_rDelete in t_ar_found
    i = m_ar_inbox.getOne(t_rDelete)
    if i > 0 then
      m_ar_inbox.deleteAt(i)
    end if
  end repeat
end
on findAddressbookEntry me, a_iEntryId, a_ar_out
  repeat with i = 1 to m_ar_addressbook.count
    if m_ar_addressbook[i].userID = a_iEntryId then
      a_ar_out[#index] = i
      a_ar_out[#entry] = m_ar_addressbook[i]
      return 1
    end if
  end repeat
  return 0
end
on isFriend me, a_sName
  repeat with t_ar_entry in m_ar_addressbook
    if t_ar_entry.buddyname = a_sName then
      return 1
    end if
  end repeat
  return 0
end
on getFriendNames me
  t_ar_friends = []
  repeat with t_ar_entry in m_ar_addressbook
    t_ar_friends.append(t_ar_entry.buddyname)
  end repeat
  return t_ar_friends
end
on FirstCharToUpper me, a_cWord
  tNum = charToNum(a_cWord.char[1])
  if tNum >= 97 and tNum <= 122 then
    return string(numToChar(tNum - 32)) & chars(a_cWord, 2, the length of a_cWord)
  else
    return a_cWord
  end if
end
on FirstCharToLower me, a_cWord
  tNum = charToNum(a_cWord.char[1])
  if tNum >= 65 and tNum <= 90 then
    return string(numToChar(tNum + 32)) & chars(a_cWord, 2, the length of a_cWord)
  else
    return a_cWord
  end if
end
on getFriend me, a_sName
  t_bfound = 0
  repeat with t_rEntry in m_ar_addressbook
    t_sName = t_rEntry.buddyname
    t_gen1 = t_sName & "s"
    t_gen2 = t_sName & "'s"
    if a_sName = t_sName then
      t_bfound = 1
    else
      if a_sName = t_gen1 then
        t_bfound = 1
      else
        if a_sName = t_gen2 then
          t_bfound = 1
        end if
      end if
    end if
    if t_bfound then
      t_rFriend = t_rEntry.duplicate()
      t_rFriend[#name] = t_rFriend[#buddyname]
      t_rFriend[#id] = t_rFriend[#userID]
      return t_rFriend
    end if
  end repeat
  return VOID
end