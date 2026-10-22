-- Script
property m_rWindow
property m_ar_Requests
property m_rRequest

on construct me
  return 1
end
on deconstruct me
  me.Purge()
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_mes_friendrequest.window")
  me.updateContent()
end
on Purge me
  m_rWindow.unmerge()
end
on updateContent me
  m_ar_Requests = me.getComponent().GetRequests()
  if m_ar_Requests.count > 0 then
    m_rRequest = m_ar_Requests[1]
    t_sName = m_rRequest.requester_name
    m_rWindow.getElement("mes.friends.requestwho").setText(t_sName)
    t_txt = replaceChunks(getText("mes.friends.requestwhoinfo"), "%senderName%", t_sName)
    m_rWindow.getElement("mes.friends.requestwhoinfo").setText(t_txt)
  end if
  me.updateRequestField()
end
on removeRequest me
  if m_ar_Requests.count > 0 then
    m_ar_Requests.deleteAt(1)
  end if
  if m_ar_Requests.count > 0 then
    me.getInterface().changeView("friendrequest")
  else
    me.getInterface().changeView("friendlist")
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_rParam
  case a_sElemID of
    "mes.accept.button":
      if objectp(m_rRequest) then
        tMsg = [#int: m_rRequest.requester_id]
        me.getHandler().AcceptFriendRequest(tMsg)
      end if
      me.removeRequest()
    "mes.deny.button":
      if objectp(m_rRequest) then
        tMsg = [#int: m_rRequest.requester_id]
        me.getHandler().DeclineFriendRequest(tMsg)
      end if
      me.removeRequest()
    "mes.ignore.button":
      t_txt = getText("mes.dialog.ignorerequest.info")
      t_title = getText("mes.dialog.ignorerequest.title")
      t_btn1 = getText("mes.dialog.ignorerequest.btn1")
      t_btn2 = getText("mes.dialog.ignorerequest.btn2")
      t = createDialogWindow(me.getID(), "mes.confirm.ignore.dialog", 2, 1)
      t.setText(t_txt, t_title, t_btn1, t_btn2)
      t.show()

  end case
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "mes.confirm.ignore.dialog":
      case t_dialogEvent of
        #dialogOK:
          if objectp(m_rRequest) then
            tMsg = [#int: m_rRequest.requester_id]
            me.getHandler().DeclineFriendRequest(tMsg)
            me.getHandler().IgnoreFriend(tMsg)
          end if
          me.removeRequest()

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end