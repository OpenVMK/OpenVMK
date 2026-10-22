-- Behavior
property m_sWindowID
property m_mp_MessageIDList
property m_rModReplyField

on construct me
  m_sWindowID = "Moderator_Message"
  m_rModReplyField = VOID
  m_mp_MessageIDList = [:]
  return 1
end
on deconstruct me
  m_mp_MessageIDList = [:]
  m_rModReplyField = VOID
  return 1
end
on CreateModeratorMessage this, a_mp_Data
  if listp(a_mp_Data) then
    t_sWndName = m_sWindowID & getUniqueID()
    if createWindow(t_sWndName, "vmk_mods_window.window") then
      t_rWnd = getWindow(t_sWndName)
      t_rWnd.center()
      t_rWnd.registerClient(this.getID())
      t_rWnd.registerProcedure(#_EventProcModeratorMessages, this.getID(), #mouseDown)
      t_rWnd.registerProcedure(#_EventProcModeratorMessages, this.getID(), #keyDown)
      t_rWnd.registerProcedure(#_EventProcModeratorMessages, this.getID(), #keyUp)
      t_sHdTxt = getText("mods.message.hd")
      t_rWnd.getElement("mods.window.title").setText(t_sHdTxt)
    else
      return 0
    end if
  end if
  if a_mp_Data.Response then
    t_rWnd.merge("vmk_mods_message_edit.window")
    t_sTxt = a_mp_Data.message
    t_rWnd.getElement("mods.message.text").setText(t_sTxt)
    t_rWnd.getElement("mods.messagereply.input").setFocus(1)
    t_iID = a_mp_Data.id
    m_mp_MessageIDList.addProp(t_sWndName, t_iID)
    t_rModReplyField = CreateCannedField(t_sWndName, "mods.messagereply.input")
    m_mp_MessageIDList.addProp(t_sWndName & "_field", t_rModReplyField)
  else
    t_rWnd.merge("vmk_mods_message.window")
    t_sTxt = a_mp_Data.message
    t_rWnd.getElement("mods.message.text").setText(t_sTxt)
    t_iID = a_mp_Data.id
    m_mp_MessageIDList.addProp(t_sWndName, t_iID)
  end if
end
on SendMessage this, a_sID
  t_iPos = m_mp_MessageIDList.findPos(a_sID & "_field")
  if t_iPos > 0 then
    t_rModReplyField = m_mp_MessageIDList[a_sID & "_field"]
    if t_rModReplyField.CheckContent() then
      t_sTxt = t_rModReplyField.GetContent()
      if stringp(t_sTxt) then
        t_sTxt = ParseCannedText(t_sTxt)
      end if
      t_iPos = m_mp_MessageIDList.findPos(a_sID)
      if not voidp(t_iPos) then
        t_iID = m_mp_MessageIDList[t_iPos]
        t_mp_MsgToServer = [:]
        t_mp_MsgToServer.addProp(#int, t_iID)
        tCannedBlock = TransformCannedToMsg(t_sTxt)
        repeat with i = 1 to tCannedBlock.count
          tKey = tCannedBlock.getPropAt(i)
          tvalue = tCannedBlock[i]
          t_mp_MsgToServer.addProp(tKey, tvalue)
        end repeat
        t_mp_MsgToServer.addProp(#int, 1)
        getConnection(getVariable("main.connection.id", "VMK")).send("SendMessageToModerator", t_mp_MsgToServer)
        this._Remove(a_sID)
      end if
    else
      t_pHelpDialog = createDialogWindow(this.getID(), "IllegalWordsInDescriptionDialog", 1, 1)
      t_pHelpDialog.show()
      t_pHelpDialog.setText(getText("hlp.dialog.illegalWords.text"), getText("hlp.dialog.illegalWords.title"), getText("hlp.dialog.illegalWords.btnConfirm"))
    end if
  end if
end
on _Remove this, a_sID
  t_iFieldPos = m_mp_MessageIDList.findPos(a_sID & "_field")
  if t_iFieldPos > 0 then
    t_rModReplyField = m_mp_MessageIDList[t_iFieldPos]
    removeCannedField(t_rModReplyField)
    m_mp_MessageIDList.deleteAt(t_iFieldPos)
  end if
  if windowExists(a_sID) then
    removeWindow(a_sID)
    t_iPos = m_mp_MessageIDList.findPos(a_sID)
    if t_iPos > 0 then
      m_mp_MessageIDList.deleteAt(t_iPos)
    end if
  end if
end
on _EventProcModeratorMessages this, tEvent, tElemID, tParam, a_sID
  if m_mp_MessageIDList.findPos(a_sID & "_field") then
    t_rModReplyField = m_mp_MessageIDList[a_sID & "_field"]
  end if
  if tElemID = "mods.messagereply.input" and objectp(t_rModReplyField) then
    case the keyCode of
      123, 124, 125, 126:
        t_rModReplyField.updateContent()
        pass()
      117, 51:
        t_rModReplyField.updateContent()
        pass()
      36:
        t_pass = t_rModReplyField.CheckContent()
        return 1
      49:
        tElem = getWindow(a_sID).getElement(tElemID)
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
        t_pass = t_rModReplyField.CheckContent()
      otherwise:
        if not t_rModReplyField.updateContent() then
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

    end case
  else
    if tElemID = #keyUp then
      if tElemID = "mods.messagereply.input" then
        case the keyCode of
          36, 49:
          otherwise:
            t_rModReplyField.CheckWord()

        end case
        case the keyCode of
          36, 49:
          otherwise:
            t_rModReplyField.CheckWord()

        end case
      end if
    end if
  end if
  case tElemID of
    "mods.ok":
      this._Remove(a_sID)
    "mods.reply.send":
      this.SendMessage(a_sID)
      executeMessage("PlayInterfaceSound", "UI-click")
    "mods.cancel":
      this._Remove(a_sID)

  end case
end