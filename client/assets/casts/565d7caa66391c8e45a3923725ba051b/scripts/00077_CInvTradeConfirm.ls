-- Script
property m_iUserRef
property m_iReqRef
property m_sDialog
property m_sIgnoreConfirmDialog
property m_sDialogTxt

on construct this
  m_iUserRef = -1
  m_iReqRef = -1
  m_sDialog = EMPTY
  m_sIgnoreConfirmDialog = EMPTY
  m_sDialogTxt = EMPTY
  return 1
end
on Init this, a_iUserRef, a_iReqRef
  m_iUserRef = a_iUserRef
  m_iReqRef = a_iReqRef
  t_rContext = getThread(#room).component._AccessRoom()
  if voidp(t_rContext) then
    return removeObject(this.getID())
  end if
  t_rSelected = t_rContext._AccessIndexed(a_iUserRef, "avatar")
  if voidp(t_rSelected) then
    return removeObject(this.getID())
  end if
  t_sTxt = getText("tra.confirm")
  m_sDialogTxt = replaceChunks(t_sTxt, "\$", t_rSelected.GetParam("NAME"))
  m_sDialog = "InvTradeConfirm" & the milliSeconds
  t_rDialog = createDialogWindow(this.getID(), m_sDialog, 3, 0)
  t_rDialog.show()
  t_rDialog.setText(m_sDialogTxt, getText("tra.tradeconfirm.hd"), getText("tra.cancel"), getText("tra.refuse"), getText("tra.ok"))
end
on dialogWindowEvent this, a_sDialog, a_kEvent
  case a_sDialog of
    m_sDialog:
      case a_kEvent of
        #dialogOK:
          m_sIgnoreConfirmDialog = "InvIgnoreConfirm" & the milliSeconds
          t = createDialogWindow(this.getID(), m_sIgnoreConfirmDialog, 2, 1)
          t_sTitle = getText("tra.confirm.ignore.dialog.title")
          t_sText = getText("tra.confirm.ignore.dialog.text")
          t_rBtn1 = getText("tra.confirm.ignore.dialog.btnCancel")
          t_rBtn2 = getText("tra.confirm.ignore.dialog.btnOK")
          t.setText(t_sText, t_sTitle, t_rBtn1, t_rBtn2)
          t.show()
        #dialogCancel, "close":
          t_iResp = 0
          getConnection("VMK").send("TrdResponse", [#int: t_iResp, #int: m_iReqRef])
          removeDialogWindow(m_sDialog)
          removeObject(this.getID())
        #dialogAlternative:
          t_iResp = 1
          getConnection("VMK").send("TrdResponse", [#int: t_iResp, #int: m_iReqRef])
          removeDialogWindow(m_sDialog)
          removeObject(this.getID())
        "help":
          executeMessage(#open_help_page, "help.stuff.trading")

      end case
    m_sIgnoreConfirmDialog:
      case a_kEvent of
        #dialogOK:
          t_iResp = 2
          getConnection("VMK").send("TrdResponse", [#int: t_iResp, #int: m_iReqRef])
          removeObject(this.getID())
        #dialogCancel:
          m_sDialog = "InvTradeConfirm" & the milliSeconds
          t_rDialog = createDialogWindow(this.getID(), m_sDialog, 3, 0)
          t_rDialog.show()
          t_rDialog.setText(m_sDialogTxt, getText("tra.confirm.title"), getText("tra.cancel"), getText("tra.refuse"), getText("tra.ok"))

      end case

  end case
end