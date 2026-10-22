-- Script
property m_rWindow

on construct this
  m_rWindow = VOID
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
  getThread("inventory").component.RegisterCreditUpdateCallback(#update, this)
  return m_rWindow.merge("vmk_inv_credits.window")
end
on Purge this, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    getThread("inventory").component.UnregisterCreditUpdateCallback(#update, this)
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    if a_kAlteredCategory = #credits then
      t_iCredits = a_mp_kType_mp_iRef_rItem.getaProp(#credits)[1]
      m_rWindow.getElement("inv.credits.amount").setText(string(t_iCredits))
    end if
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "inv.opencatalog.button":
      executeMessage("ui_catalog")
    "help":
      executeMessage("ui_help", "help.inventory.credits")

  end case
end