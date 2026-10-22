-- Script
property m_rWindow
property m_ar_inbox
property m_rCurrentMessage
property m_sSender

on construct me
  registerMessage("DeleteMessages", me.getID(), #DeleteAllMessages)
  m_sSender = EMPTY
  return 1
end
on deconstruct me
  me.Purge()
  unregisterMessage("DeleteMessages", me.getID())
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_mes_messages_new.window")
  me.updateContent()
end
on Purge me
  m_rWindow.unmerge()
end
on DeleteAllMessages me
  t_iCount = m_ar_inbox.count
  if t_iCount > 0 then
    repeat with i = 1 to t_iCount
      me.getComponent().deleteMessage()
    end repeat
    me.getInterface().changeView("messagesnone")
  end if
end
on updateContent me
  m_ar_inbox = me.getComponent().GetInbox()
  if m_ar_inbox.count > 0 then
    m_rCurrentMessage = m_ar_inbox[1]
  end if
  if objectp(m_rCurrentMessage) then
    me.showCurrentMessage()
  else
    me.getInterface().changeView("messagesnone")
    return 0
  end if
  if m_ar_inbox.count > 1 then
    t_txt = replaceChunks(getText("mes.messages.newamount.many"), "%messageCount%", m_ar_inbox.count)
  else
    t_txt = getText("mes.messages.newamount.one")
  end if
  t_rElem = m_rWindow.getElement("mes.messages.newamount")
  if objectp(t_rElem) then
    t_rElem.setText(t_txt)
  end if
end
on showCurrentMessage me
  if m_ar_inbox.count = 1 then
    me.setButtonTxt("mes.nextmessage.button", getText("mes.deletemessage"))
    if stringp(m_rCurrentMessage.getaProp(#url)) then
      me.setButtonState("mes.nextmessage.button", 0)
    else
      me.setButtonState("mes.nextmessage.button", 1)
    end if
  else
    me.setButtonTxt("mes.nextmessage.button", getText("mes.nextmessage"))
  end if
  if m_rCurrentMessage.senderID = 0 then
    t_sName = getText("mes.administrator.name", "VMK Administrator")
    me.setButtonState("mes.reply.button", 0)
    me.setButtonState("mes.report.button", 0)
  else
    if not voidp(m_rCurrentMessage.getaProp(#reported)) then
      me.setButtonState("mes.report.button", 0)
    else
      me.setButtonState("mes.report.button", 1)
    end if
    t_ar_entry = [#index: -1, #entry: VOID]
    if me.getComponent().findAddressbookEntry(m_rCurrentMessage.senderID, t_ar_entry) then
      t_sName = t_ar_entry.entry.buddyname
    else
      t_sName = "Unknown"
    end if
  end if
  m_sSender = t_sName
  m_rWindow.getElement("mes.messages.sender").setText(t_sName)
  m_rWindow.getElement("mes.messages.time").setText(m_rCurrentMessage.date)
  t_bNormalMessage = voidp(m_rCurrentMessage.getaProp(#url))
  if t_bNormalMessage then
    m_rWindow.getElement("mes.messages.messagetext").setText(m_rCurrentMessage.content)
  else
    t_sText = m_rCurrentMessage.content & RETURN & RETURN & m_rCurrentMessage.Caption
    m_rWindow.getElement("mes.messages.messagetext").setText(t_sText)
    t_rElem = m_rWindow.getElement("mes.messages.messagetext")
    m_rCurrentMessage[#clickarea] = t_rElem.pTextMem.rect
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_rParam
  case a_sElemID of
    "mes.reply.button":
      t_rRecipient = [#buddyname: m_sSender, #userID: m_rCurrentMessage.senderID]
      me.getComponent().setRecipient(t_rRecipient)
      me.getInterface().changeView("messagescompose")
    "mes.nextmessage.button":
      t_bNormalMessage = voidp(m_rCurrentMessage.getaProp(#url))
      if t_bNormalMessage then
        me.getComponent().deleteMessage()
      else
        me.getComponent().moveMessageToBack()
      end if
      me.getInterface().changeView("messagesnone")
    "mes.report.button":
      t_txt = getText("mes.dialog.confirm.report.text")
      t_title = getText("mes.dialog.confirm.report.title")
      t_btn1 = getText("mes.dialog.confirm.report.btn.cancel")
      t_btn2 = getText("mes.dialog.confirm.report.btn.ok")
      t = createDialogWindow(me.getID(), "mes.report.dialog", 2, 1)
      t.setText(t_txt, t_title, t_btn1, t_btn2)
      t.show()

  end case
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "mes.report.dialog":
      case t_dialogEvent of
        #dialogOK:
          me.getHandler().ReportMessageAsOffensive([m_rCurrentMessage.msgid])
          if objectp(getThread("Help")) then
            t_sPlayerName = getObject(#session).get("name")
            getThread("Help").getHandler().callForHelp(3, m_rCurrentMessage.content, m_sSender)
          end if
          me.setButtonState("mes.report.button", 0)

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on ConvertWinStringToMac me, aString
  vWinFontMap = [196, 197, 199, 201, 209, 214, 220, 225, 224, 226, 228, 227, 229, 231, 233, 232, 234, 235, 237, 236, 238, 239, 241, 243, 242, 244, 246, 245, 250, 249, 251, 252, 134, 176, 162, 163, 167, 149, 182, 223, 174, 169, 153, 180, 168, 141, 198, 216, 144, 177, 143, 142, 165, 181, 240, 221, 222, 254, 138, 170, 186, 253, 230, 248, 191, 161, 172, 175, 131, 188, 208, 171, 187, 133, 160, 192, 195, 213, 140, 156, 173, 151, 147, 148, 145, 146, 247, 215, 255, 159, 158, 164, 139, 155, 128, 129, 135, 183, 130, 132, 137, 194, 202, 193, 203, 200, 205, 206, 207, 204, 211, 212, 157, 210, 218, 219, 217, 166, 136, 152, 150, 154, 178, 190, 184, 189, 179, 185]
  vTemp = aString
  aString = EMPTY
  vCount = the number of chars in vTemp
  repeat with i = 1 to vCount
    vChar = char i of vTemp
    vCharNum = charToNum(vChar)
    if vCharNum = 10 then
      vChar = EMPTY
    else
      if vCharNum > 127 then
        vAdjust = vWinFontMap.getPos(vCharNum)
        vChar = numToChar(127 + vAdjust)
      end if
    end if
    put vChar after aString
  end repeat
  return aString
end