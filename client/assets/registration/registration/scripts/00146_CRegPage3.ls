-- Parent Script
property m_rWindow
property m_mpDataToServer
property m_bWaitForAnswer
property m_iRoomNum
property m_iSelected

on construct this
  m_rWindow = VOID
  m_mpDataToServer = VOID
  m_bWaitForAnswer = 0
  this.updateStats()
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  return 1
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_reg_step3.window")
  return 1
end
on Purge this, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on updateStats this
  if textExists("reg.page3.url") then
    t_sTrackingURL = getText("reg.page3.url")
    t_iRandom = random(the milliSeconds)
    t_sNetThing = replaceChunks(t_sTrackingURL, "randomNumber", t_iRandom)
    if t_sTrackingURL.ilk = #string then
      t_ID = preloadNetThing(t_sNetThing)
    end if
  else
    return 0
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
end
on setData this, a_mpData
  m_mpDataToServer = a_mpData
end
on _sendDelayEnded this
  m_bWaitForAnswer = 0
end
on SendData this
  if m_bWaitForAnswer then
    return 1
  end if
  m_bWaitForAnswer = 1
  createTimeout(#waitForAnswer, 2000, #_sendDelayEnded, this.getID(), VOID, 1)
  getConnection("VMK").send("AcceptEULA")
  return 1
end
on ShowConfirm this
  t_sMsg = getText("reg.check.roomname")
  t = createDialogWindow(this.getID(), "ConfirmReg", 2, 1)
  t.show()
  t_mp_ButtonData1 = [#text: getText("reg.cancel"), #eventID: "cancel"]
  t_mp_ButtonData2 = [#text: getText("reg.agree"), #eventID: "ok"]
  t_sHd = getText("reg.confirm")
  t_sTxt = getText("reg.confirm.eula")
  t.setText(t_sTxt, t_sHd, t_mp_ButtonData1, t_mp_ButtonData2)
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent
  case t_dialogEvent of
    "ok":
    "cancel":
      if textExists("game.exit.url") then
        t_sURL = getText("game.exit.url")
      else
        t_sURL = getVariable("client.reload.url")
      end if
      if stringp(t_sURL) then
        gotoNetPage(t_sURL, "_self")
      end if

  end case
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  if a_kEvent = #mouseDown then
  end if
end