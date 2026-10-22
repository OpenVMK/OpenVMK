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
  m_rWindow.merge("vmk_mes_friends_list.window")
  m_rAddressbookList = me.getInterface().GetAddressBook()
  if objectp(m_rAddressbookList.GetActive()) then
    me.getInterface().changeView("friendinfo")
  else
    me.updateContent()
  end if
end
on Purge me
  m_rWindow.unmerge()
end
on updateContent me
  m_ar_Requests = me.getComponent().GetRequests()
  t_rImg = m_rAddressbookList.render()
  m_rWindow.getElement("mes.friendslist").feedImage(t_rImg)
  me.updateRequestField()
end
on _EventProc me, a_kEvent, a_sElemID, a_rParam
  case a_sElemID of
    "mes.friendslist":
      t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
      m_rAddressbookList.EventProc(a_rParam, t_ar_event)
      m_rWindow.getElement(a_sElemID).feedImage(m_rAddressbookList.render())
      if t_ar_event.found then
        me.getInterface().changeView("friendinfo")
      end if
    "mes.friends.requestamount", "mes.view.button":
      if m_ar_Requests.count > 0 then
        me.getInterface().changeView("friendrequest")
      end if

  end case
end