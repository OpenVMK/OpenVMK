-- Script
property m_rWindow
property m_rAddressbookList
property m_ar_Requests

on construct me
  return 1
end
on deconstruct me
  me.Purge()
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_mes_friendsinfo.window")
  m_rAddressbookList = me.getInterface().GetAddressBook()
  put m_rAddressbookList.GetActive()
  if objectp(m_rAddressbookList.GetActive()) then
    me.updateContent()
  else
    me.getInterface().changeView("friendlist")
  end if
end
on Purge me
  m_rWindow.unmerge()
end
on updateContent me
  m_ar_Requests = me.getComponent().GetRequests()
  t_rImg = m_rAddressbookList.render()
  m_rWindow.getElement("mes.friendslist").feedImage(t_rImg)
  me.showAddressBookEntryInfo()
  me.updateRequestField()
end
on showAddressBookEntryInfo me
  t_rSelected = m_rAddressbookList.GetActive()
  if not objectp(t_rSelected) then
    return 0
  end if
  t_rFriend = t_rSelected.GetNode()
  m_rWindow.getElement("mes.friends.username").setText(t_rFriend.buddyname)
  m_rWindow.getElement("mes.friends.userslogan").setText(t_rFriend.slogan)
  if t_rFriend.online then
    t_bAccessible = t_rFriend.locationAccessible
    t_sVisitInfo = getText("mes.friends.visitinfo.online") && t_rFriend.usersRoom
  else
    t_bAccessible = 0
    t_sVisitInfo = getText("mes.friends.visitinfo.offline") && t_rFriend.lastAccessTime
  end if
  m_rWindow.getElement("mes.friends.visitinfo").setText(t_sVisitInfo)
  if t_bAccessible then
    me.setButtonState("mes.sameroom.button", 1)
  else
    me.setButtonState("mes.sameroom.button", 0)
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_rParam
  case a_sElemID of
    "mes.friendslist":
      t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
      m_rAddressbookList.EventProc(a_rParam, t_ar_event)
      m_rWindow.getElement(a_sElemID).feedImage(m_rAddressbookList.render())
      if t_ar_event.found then
        me.showAddressBookEntryInfo()
      end if
    "mes.sameroom.button":
      if windowExists("Navigator Window") then
        t_rNavigator = getWindow("Navigator Window")
        if t_rNavigator.getProperty(#visible) then
          executeMessage(#ui_navigator)
        end if
      end if
      t_rFriend = m_rAddressbookList.GetActive().GetNode()
      me.getHandler().GoToFriend([t_rFriend.userID])
      executeMessage("PlayInterfaceSound", "close-popup")
      me.getInterface().hide()
    "mes.remove.button":
      t_rFriend = m_rAddressbookList.GetActive().GetNode()
      t_txt = replaceChunks(getText("mes.friends.removeConfirmInfo"), "%friendName%", t_rFriend.buddyname)
      t_title = getText("mes.friends.removeConfirmHD")
      t_btn1 = getText("mes.friends.removeConfirmDialogButton1")
      t_btn2 = getText("mes.friends.removeConfirmDialogButton2")
      t = createDialogWindow(me.getID(), "mes.remove.dialog", 2, 1)
      t.setText(t_txt, t_title, t_btn1, t_btn2)
      t.show()
    "mes.sendmessage.button":
      t_rFriend = m_rAddressbookList.GetActive().GetNode()
      me.getComponent().setRecipient(t_rFriend)
      me.getInterface().changeView("messagescompose")
    "mes.friends.requestamount", "mes.view.button":
      if m_ar_Requests.count > 0 then
        me.getInterface().changeView("friendrequest")
      end if

  end case
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "mes.remove.dialog":
      case t_dialogEvent of
        #dialogOK:
          t_rFriend = m_rAddressbookList.GetActive().GetNode()
          if objectp(t_rFriend) then
            me.getHandler().RemoveFriendship([t_rFriend.userID])
            me.getComponent().removeFriend(t_rFriend.userID)
          end if
          me.getInterface().changeView("friendlist")

      end case
    otherwise:
      put "CMessengerViewFriendInfo: Unknown Dialog" && t_dialogName

  end case
end
on UpdateScrollBar me
  tScrollbar = m_rWindow.getElement("mes.scrollbar")
  t_offset = m_rAddressbookList.getFriendOffset()
  call(#setScrollOffset, tScrollbar, t_offset)
end