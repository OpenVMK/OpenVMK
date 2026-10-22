-- Script
property m_iChallengerRef
property m_iGameID
property m_sDialogName
property m_iTimeLeft
property m_iChallengerLevel
property m_sChallengeTimeout

on construct this
  m_iTimeLeft = 20
  m_iChallengerRef = VOID
  m_iGameID = VOID
  m_iChallengerLevel = VOID
  m_sChallengeTimeout = getUniqueID()
  return 1
end
on deconstruct this
  if timeoutExists(m_sChallengeTimeout) then
    removeTimeout(m_sChallengeTimeout)
  end if
  if DialogWindowExists(m_sDialogName) then
    removeDialogWindow(m_sDialogName)
  end if
  return 1
end
on ShowDialog this, a_iGameID, a_iChallengerRef, a_iChallengerLevel
  m_sDialogName = getUniqueID()
  m_iGameID = a_iGameID
  m_iChallengerRef = a_iChallengerRef
  m_iChallengerLevel = a_iChallengerLevel
  m_iTimeLeft = 21
  t = createDialogWindow(this.getID(), m_sDialogName, 2, 0)
  this.UpdateTime(t)
  t.show()
end
on UpdateTime this, a_rDialog
  m_iTimeLeft = m_iTimeLeft - 1
  t_txt = getText("casual.challenge.dialog.text")
  t_title = getText("casual.challenge.dialog.title")
  t_btn1 = getText("casual.challenge.dialog.button.1")
  t_btn2 = getText("casual.challenge.dialog.button.2")
  t_sAvatarName = EMPTY
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  if objectp(tRoomContext) then
    t_rAvatar = tRoomContext._AccessIndexed(m_iChallengerRef, "avatar")
    if objectp(t_rAvatar) then
      t_sAvatarName = t_rAvatar.GetParam("NAME")
    end if
  end if
  t_txt = replaceChunks(t_txt, "%A", t_sAvatarName)
  t_txt = replaceChunks(t_txt, "%L", m_iChallengerLevel)
  t_txt = replaceChunks(t_txt, "%T", m_iTimeLeft && "seconds.")
  t_txt = replaceChunks(t_txt, "\r", RETURN)
  a_rDialog.setText(t_txt, t_title, t_btn1, t_btn2)
  createTimeout(m_sChallengeTimeout, 1000, #UpdateTime, this.getID(), a_rDialog, 1)
  if m_iTimeLeft < 0 then
    removeObject(this.getID())
  end if
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent
  if t_dialogName = m_sDialogName then
    case t_dialogEvent of
      #dialogOK:
        getConnection("VMK").send(951, [#integer: m_iGameID, #integer: m_iChallengerRef])
      #dialogCancel:

    end case
    removeObject(this.getID())
  end if
end