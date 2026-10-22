-- Script
property m_rWindow
property m_pComposeMessage
property m_rAddressbookList
property m_rRecipient

on construct me
  return 1
end
on deconstruct me
  if objectp(m_pComposeMessage) then
    removeObject(m_pComposeMessage.getID())
  end if
  me.Purge()
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_mes_messages_compose.window")
  m_rAddressbookList = me.getInterface().GetAddressBook()
  m_pComposeMessage = CreateCannedField(a_rWindow.getID(), "mes.messages.messageinput")
  m_pComposeMessage.setScrolling(1)
  me.updateContent()
end
on Purge me
  m_rWindow.unmerge()
end
on updateContent me
  m_rRecipient = me.getComponent().getRecipient()
  if objectp(m_rRecipient) then
    tElem = m_rWindow.getElement("mes.messages.recipient")
    if objectp(tElem) then
      tElem.setText(m_rRecipient.buddyname)
    end if
    tElem = m_rWindow.getElement("mes.messages.messageinput")
    if objectp(tElem) then
      tElem.setMaxChars(0)
    end if
    createTimeout(getUniqueID(), 500, #setEditFocus, me.getID(), VOID, 1)
  else
    me.getInterface().changeView("friendlist")
  end if
end
on setEditFocus me
  tElem = m_rWindow.getElement("mes.messages.messageinput")
  if objectp(tElem) then
    tElem.setFocus(1)
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_rParam
  if a_sElemID = "mes.messages.messageinput" then
    if a_kEvent = #keyUp then
      case the keyCode of
        36, 49:
        otherwise:
          m_pComposeMessage.CheckWord()

      end case
    else
      if a_kEvent = #keyDown then
        t_iKeyCode = the keyCode
        case t_iKeyCode of
          123, 124, 125, 126:
            m_pComposeMessage.updateContent()
            pass()
          117, 51:
            m_pComposeMessage.updateContent()
            pass()
          36, 49:
            t_rElem = m_rWindow.getElement(a_sElemID)
            tSelection = t_rElem.pMember.selection
            tCharcount = t_rElem.pMember.text.char.count
            if tCharcount > 0 then
              if t_rElem.pMember.text.char[tSelection[2]] = " " then
                return 1
              end if
              if tSelection[2] + 1 <= tCharcount then
                if t_rElem.pMember.text.char[tSelection[2] + 1] = " " then
                  return 1
                end if
              end if
            end if
            m_pComposeMessage.updateContent()
            t_bCheck = m_pComposeMessage.CheckContent()
          otherwise:
            if not m_pComposeMessage.updateContent() then
              return 1
            end if

        end case
        t_rElem = m_rWindow.getElement(a_sElemID)
        if t_rElem <> 0 then
          if t_rElem.pMember.text.char.count >= 255 then
            t_txt = getText("mes.msgtoolong.text")
            t_title = getText("mes.msgtoolong.title")
            t_btn1 = getText("mes.msgtoolong.OK")
            t = createDialogWindow(me.getID(), "mes.msgtoolong.dialog", 1, 1)
            t.setText(t_txt, t_title, t_btn1)
            t.show()
            t_rElem.pMember.text = t_rElem.pMember.char[1..255]
            return 1
          end if
        end if
      end if
    end if
  end if
  case a_sElemID of
    "mes.cancelcompose.button":
      m_rWindow.getElement("mes.messages.messageinput").setText(EMPTY)
      me.getInterface().changeView("friendlist")
    "mes.sendmessage.button":
      t_okToSend = m_pComposeMessage.CheckContent()
      me.getComponent().setRecipient(VOID)
      if t_okToSend then
        me.getHandler().SendInstantMessage([1, [m_rRecipient.userID], m_pComposeMessage.GetContent()])
        me.getInterface().changeView("friendlist")
        m_pComposeMessage.reset()
      else
        t_txt = getText("mes.dialog.dictionaryError.info")
        t_title = getText("mes.dialog.dictionaryError.title")
        t_btn1 = getText("mes.dialog.dictionaryError.btn1")
        t = createDialogWindow(me.getID(), "mes.dialog.dictionaryError", 1, 1)
        t.setText(t_txt, t_title, t_btn1)
        t.show()
      end if

  end case
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
end
on HandleKeyPressed this, a_iKey
  t_rField = m_rWindow.getElement("mes.messages.messageinput").pMember
  if t_rField.editable then
    if objectp(m_pComposeMessage) then
      case a_iKey of
        BACKSPACE:
          t_sText = t_rField.text
          delete char -30000 of t_sText
          t_rField.text = t_sText
          m_pComposeMessage.updateContent()
        123:
          m_pComposeMessage.updateContent()
        124:
          m_pComposeMessage.updateContent()
        125:
          m_pComposeMessage.updateContent()
        126:
          m_pComposeMessage.updateContent()

      end case
    end if
  end if
end