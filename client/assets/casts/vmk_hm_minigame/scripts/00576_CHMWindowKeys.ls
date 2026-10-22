-- Script
property m_rClient
property m_sWindowName

on construct me
  m_sWindowName = "HMG Window Keys"
  return 1
end
on deconstruct me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  return 1
end
on Init me, a_rClient
  m_rClient = a_rClient
end
on hide me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  m_bActive = 0
end
on show me
  if getWindow(m_sWindowName) <> 0 then
    getWindow(m_sWindowName).show()
  else
    me.InitWindow()
  end if
end
on InitWindow me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  createWindow(m_sWindowName, "vmk_modal.window", 0, 0, #modal)
  tWndObj = getWindow(m_sWindowName)
  if not voidp(tWndObj) then
    tWndObj.center()
  else
    return error(me, "HMGWindow.Keys: Unable to create window ", #InitWindow)
  end if
  tWndObj.merge("vmk_hm_keyoptions.window")
  tWndObj.registerClient(me.getID())
  tWndObj.registerProcedure(#EventProc, me.getID(), #mouseUp)
  t_Elem = tWndObj.getElement("basic.window.title")
  if t_Elem <> 0 then
    t_Elem.setText(getText("hmg.keys.title"))
  end if
  tWndObj.getElement("select.default").hide()
  tWndObj.getElement("select.alternative").hide()
  t_ar_directions = m_rClient.GetMoveDirections()
  case t_ar_directions of
    [0, 1, 2, 3, 4, 5, 6, 7]:
      tWndObj.getElement("select.default").show()
    [7, 0, 1, 2, 3, 4, 5, 6, 7]:
      tWndObj.getElement("select.alternative").show()

  end case
end
on EventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWindowName)
  if tEvent = #mouseUp then
    case tElemID of
      "hm.help":
        executeMessage(#open_help_page, "help.games.hauntedmansion")
        removeWindow(m_sWindowName)
      "hm.close", "cancel.button":
        removeWindow(m_sWindowName)
      "hm.defaultkeys":
        t_ar_directions = [0, 1, 2, 3, 4, 5, 6, 7]
        m_rClient.SetMoveDirections(t_ar_directions)
        m_rClient.setClientKeyConfiguration(1)
        removeWindow(m_sWindowName)
      "hm.alternativekeys":
        t_ar_directions = [7, 0, 1, 2, 3, 4, 5, 6, 7]
        m_rClient.SetMoveDirections(t_ar_directions)
        m_rClient.setClientKeyConfiguration(2)
        removeWindow(m_sWindowName)

    end case
  end if
end