-- Script
property m_sWnd
property m_iRef

on construct this
  m_iRef = -1
  m_sWnd = "InvSellRequestWnd"
  return 1
end
on deconstruct this
  removeWindow(m_sWnd)
  return 1
end
on setup this, a_iRef, a_iType, a_iPrice
  m_iRef = a_iRef
  if not windowExists(m_sWnd) then
    createWindow(m_sWnd, "vmk_basic.window", 0, 0, #modal)
    t_rWnd = getWindow(m_sWnd)
    t_rWnd.center()
    t_rWnd.merge("vmk_basic_2.window")
    t_rWnd.registerClient(this.getID())
    t_rWnd.registerProcedure(#_EventProc, this.getID(), #mouseUp)
    t_sTxt = getText("inv.sell", "Sell")
    t_rWnd.getElement("basic.dialog.button1").pButtonText = t_sTxt
    t_rWnd.getElement("basic.dialog.button1").pCachedImgs = [:]
    t_rWnd.getElement("basic.dialog.button1").createButtonImg(t_sTxt, #up)
    t_rWnd.getElement("basic.dialog.button1").createButtonImg(t_sTxt, #down)
    t_rWnd.getElement("basic.dialog.button1").changeState(#up)
    t_sTxt = getText("inv.cancel", "Cancel")
    t_rWnd.getElement("basic.dialog.button2").pButtonText = t_sTxt
    t_rWnd.getElement("basic.dialog.button2").pCachedImgs = [:]
    t_rWnd.getElement("basic.dialog.button2").createButtonImg(t_sTxt, #up)
    t_rWnd.getElement("basic.dialog.button2").createButtonImg(t_sTxt, #down)
    t_rWnd.getElement("basic.dialog.button2").changeState(#up)
  else
    t_rWnd = getWindow(m_sWnd)
  end if
  t_sTxt = replaceChunks(getText("inv.sell.request", "Are you sure? $"), "$", string(a_iPrice))
  t_rWnd.getElement("basic.content.text").setText(t_sTxt)
end
on _EventProc this, a_kEvt, a_sElm, a_vPrm, a_sWnd
  case a_sElm of
    "close", "basic.dialog.button2":
      removeObject(this.getID())
    "basic.dialog.button1":
      getConnection("VMK").send("SellItemConfirm", [#int: m_iRef])
      removeObject(this.getID())
    "help":
      executeMessage("ui_help")

  end case
end