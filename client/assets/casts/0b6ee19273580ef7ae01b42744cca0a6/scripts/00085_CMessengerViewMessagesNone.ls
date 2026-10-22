-- Parent Script
property m_rWindow
property m_ar_inbox

on construct me
  return 1
end
on deconstruct me
  me.Purge()
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_mes_messages_none.window")
  me.updateContent()
end
on Purge me
  m_rWindow.unmerge()
end
on updateContent me
  m_ar_inbox = me.getComponent().GetInbox()
  if m_ar_inbox.count > 0 then
    me.getInterface().changeView("messagesnew")
  else
    t_rElem = m_rWindow.getElement("mes.messages.newamount")
    if objectp(t_rElem) then
      t_rElem.setText(getText("mes.messages.newamount"))
    end if
    t_rElem = m_rWindow.getElement("mes.messages.info")
    if objectp(t_rElem) then
      t_rElem.setText(getText("mes.messages.info"))
    end if
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_rParam
  case a_sElemID of
    "what":
    otherwise:
      nothing()

  end case
end