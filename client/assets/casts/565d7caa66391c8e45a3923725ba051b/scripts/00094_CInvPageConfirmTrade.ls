-- Script
property m_rWindow
property m_sWndID
property m_bOwnConfirm
property m_bHerConfirm
property m_mp_iRef_rOwnItems
property m_mp_iRef_rHerItems
property m_sPartner

on deconstruct this
  if objectp(m_rWindow) then
    removeWindow(m_sWndID)
  end if
  return 1
end
on Define this, a_sPartner
  m_sWndID = "TradeConfirmation"
  if windowExists(m_sWndID) then
    removeWindow(m_sWndID)
  end if
  m_sPartner = a_sPartner
  if createWindow(m_sWndID, "vmk_tra_confirm.window", 0, 0, #modal) then
    m_rWindow = getWindow(m_sWndID)
    m_rWindow.registerClient(this.getID())
    m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseUp)
    m_rWindow.getElement("tra.heoffers.hd").setText(replaceChunks(getText("tra.heoffers"), "\$", m_sPartner))
    return 1
  else
    return error(this, "Failed to open trade confirm dialog!", #Define)
  end if
end
on Feedimages this, a_ImgMine, a_ImgHers
  m_rWindow.getElement("tra.mystuff").feedImage(a_ImgMine)
  m_rWindow.getElement("tra.herstuff").feedImage(a_ImgHers)
end
on UpdateStates this, a_bOwnConfirm, a_bHerConfirm
  t_bOwnConfirm = m_bOwnConfirm
  t_bHerConfirm = m_bHerConfirm
  m_bOwnConfirm = a_bOwnConfirm
  m_bHerConfirm = a_bHerConfirm
  if t_bHerConfirm > m_bHerConfirm and m_bOwnConfirm <> 0 then
    getConnection("VMK").send(586, [#int: 0])
    if windowExists(m_sWndID) then
      removeWindow(m_sWndID)
    end if
  end if
  if windowExists(m_sWndID) then
    if m_bHerConfirm = 2 then
      t_sTxt = getText("tra.confirm.hd") & TAB & m_sPartner && getText("tra.heaccepts")
      m_rWindow.getElement("tra.confirm.hd").setText(t_sTxt)
    else
      if m_bOwnConfirm = 2 then
        t_sTxt = replaceChunks(getText("tra.confirm.hd2"), "%name%", m_sPartner)
        m_rWindow.getElement("tra.confirm.hd").setText(t_sTxt)
      else
        t_sTxt = getText("tra.confirm.hd")
        m_rWindow.getElement("tra.confirm.hd").setText(t_sTxt)
      end if
    end if
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "tra.confirm.ok":
      getConnection("VMK").send(586, [#int: 2])
      removeWindow(m_sWndID)
    "tra.confirm.cancel":
      getConnection("VMK").send(586, [#int: 0])
      if windowExists("vmk_tra.window") then
        getWindow("vmk_tra.window").setProperty(#modal, 1)
      end if
      removeWindow(m_sWndID)

  end case
end