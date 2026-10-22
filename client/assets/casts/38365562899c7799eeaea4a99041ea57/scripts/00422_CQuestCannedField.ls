-- Script
property m_rField
property m_sElem
property m_rWindow
property m_iWordLimit
property m_iCharacterLimit

on construct me
  m_iWordLimit = -1
  m_iCharacterLimit = 255
  return 1
end
on deconstruct me
  if objectp(m_rField) then
    removeObject(m_rField)
  end if
  return 1
end
on setCharacterLimit me, a_iLimit
  m_iCharacterLimit = a_iLimit
end
on setWordLimit me, a_iLimit
  m_iWordLimit = a_iLimit
end
on Init me, a_rWindow, a_sFieldName, t_bMultiple
  m_rWindow = a_rWindow
  m_sElem = a_sFieldName
  t_rElem = a_rWindow.getElement(a_sFieldName)
  if objectp(t_rElem) then
    put "Canned type" && t_bMultiple
    if not t_bMultiple then
    end if
    m_rField = CreateCannedField(m_rWindow.getID(), a_sFieldName)
    return m_rField
  end if
  return VOID
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  if m_sElem = a_sElemID then
    if a_kEvent = #keyDown then
      case the keyCode of
        123, 124, 125, 126:
          m_rField.updateContent()
          pass()
        117, 51:
          m_rField.updateContent()
          pass()
        36:
          t_pass = m_rField.CheckContent()
          if t_pass then
            m_rField.updateContent()
            m_bHelpContentOk = 1
          end if
          t_rElem = m_rWindow.getElement(m_sElem)
          if t_rElem <> 0 then
            if m_iWordLimit > 0 then
              if t_rElem.getText().word.count = m_iWordLimit then
                return 1
              end if
            end if
          end if
        49:
          tElem = m_rWindow.getElement(m_sElem)
          tSelection = tElem.pMember.selection
          tCharcount = tElem.pMember.text.char.count
          if tCharcount > 0 then
            if tElem.pMember.text.char[tSelection[2]] = " " then
              return 1
            end if
            if tSelection[2] + 1 <= tCharcount then
              if tElem.pMember.text.char[tSelection[2] + 1] = " " then
                return 1
              end if
            end if
          end if
          t_pass = m_rField.CheckContent()
          if t_pass then
            m_rField.updateContent()
          end if
          t_rElem = m_rWindow.getElement(m_sElem)
          if t_rElem <> 0 then
            if m_iWordLimit > 0 then
              if t_rElem.getText().word.count = m_iWordLimit then
                return 1
              end if
            end if
          end if
        otherwise:
          if not m_rField.updateContent() then
            return 1
          end if
          tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\#;" & QUOTE
          tAscii = charToNum(the key)
          t_allow = 0
          if tAscii > 31 and tAscii < 128 then
            if tValidKeys contains the key or tValidKeys = EMPTY then
              t_allow = 1
            end if
          end if
          if not t_allow then
            return 1
          end if
          t_rElem = m_rWindow.getElement(m_sElem)
          if t_rElem <> 0 then
            if t_rElem.pMember.text.char.count >= m_iCharacterLimit then
              t_txt = getText("quest.alert.canned.toolong.text")
              t_title = getText("quest.alert.title")
              t_btn1 = getText("quest.alert.ok")
              t = createDialogWindow(me.getID(), "quest.alert.canned.toolong", 1, 1)
              t.setText(t_txt, t_title, t_btn1)
              t.show()
              t_rElem.pMember.text = t_rElem.pMember.char[1..m_iCharacterLimit]
              return 1
            end if
          end if

      end case
    else
      if a_kEvent = #keyUp then
        case the keyCode of
          36, 49:
          otherwise:
            m_rField.CheckWord()

        end case
      end if
    end if
  end if
end
on CheckContent me
  if voidp(m_rField) then
    return 0
  end if
  return m_rField.CheckContent()
end
on GetContent me
  if voidp(m_rField) then
    return []
  end if
  return m_rField.GetContent()
end