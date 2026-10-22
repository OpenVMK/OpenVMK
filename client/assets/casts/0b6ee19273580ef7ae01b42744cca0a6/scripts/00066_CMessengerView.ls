-- Movie Script
on construct me
  return 1
end
on deconstruct me
  return 1
end
on merge me, a_rWindow
end
on Purge me
end
on updateContent me
end
on getInterface me
  return getThread("Messenger").getInterface()
end
on getComponent me
  return getThread("Messenger").getComponent()
end
on getHandler me
  return getThread("Messenger").getHandler()
end
on _EventProc me, a_kEvent, a_sElemID, a_rParam
end
on setButtonState me, a_sElem, a_bState
  t_rElem = me.m_rWindow.getElement(a_sElem)
  if objectp(t_rElem) then
    case a_bState of
      1:
        t_rElem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
        t_rElem.Activate()
      0:
        t_rElem.setProperty(#cursor, #arrow)
        t_rElem.deactivate()

    end case
  end if
end
on setButtonTxt me, a_sButton, a_sText
  t_rButton = me.m_rWindow.getElement(a_sButton)
  if objectp(t_rButton) then
    t_rButton.pButtonText = a_sText
    t_rButton.pCachedImgs = [:]
    t_rButton.changeState(#up)
  end if
end
on updateRequestField me
  tElem = me.m_rWindow.getElement("mes.friends.requestamount")
  t_ar_requests = me.getComponent().GetRequests()
  t_iCount = t_ar_requests.count
  if objectp(tElem) then
    if t_iCount > 0 then
      me.setButtonState("mes.view.button", 1)
      if t_iCount = 1 then
        t_txt = getText("mes.friends.requestamount.one")
      else
        t_txt = replaceChunks(getText("mes.friends.requestamount.many"), "%requestCount%", t_iCount)
      end if
      tElem.setText(t_txt)
      tElem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
    else
      me.setButtonState("mes.view.button", 0)
      tElem.setText(getText("mes.friends.requestamount"))
      tElem.setProperty(#cursor, #arrow)
    end if
  end if
end