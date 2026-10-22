-- Script
property m_sWindowID

on construct me
  m_sWindowID = "Arcade"
  registerMessage("ui_Arcade", me.getID(), #showHideArcade)
  executeMessage("SetButtonStates", [#all: 0])
  executeMessage("SetButtonStates", [#navigator: 1])
  return 1
end
on deconstruct me
  if windowExists(m_sWindowID) then
    tWndObj = getWindow(m_sWindowID)
    tWndObj.close()
  end if
  unregisterMessage("ui_Arcade", me.getID())
  return 1
end
on showHideArcade me
  if windowExists(m_sWindowID) then
    tWndObj = getWindow(m_sWindowID)
    if tWndObj.getProperty(#visible) then
      removeWindow(m_sWindowID)
    end if
    me.getHandler().removeFriendListUpdate()
  else
    createWindow(m_sWindowID, "vmk_modal.window")
    tWndObj = getWindow(m_sWindowID)
    tWndObj.registerClient(me.getID())
    tWndObj.merge("vmk_arcade_popup.window")
    tWndObj.moveTo(0, 0)
    tWndObj.registerProcedure(#eventProcArcade, me.getID(), #mouseUp)
    me.getHandler().startFriendListUpdate()
  end if
  me.OpenArcade()
end
on OpenArcade me
  if variableExists("at") and textExists("arcade.url") then
    t_sURL = getText("arcade.url") & "?at=" & getVariable("at")
  else
    t_sURL = getText("arcade.url") & "?at=Missing"
  end if
  if stringp(t_sURL) then
    gotoNetPage(t_sURL, "arcade")
  end if
end
on eventProcArcade me, tEvent, tElemID, tParam
  tWndObj = getWindow(m_sWindowID)
  case 1 of
    tElemID = "arcade.return":
      executeMessage("PlayInterfaceSound", "close-popup")
      getConnection("VMK").send("LeaveArcade")
      return 1
    tElemID = "arcade.open":
      me.OpenArcade()
      return 1
    otherwise:
      put tElemID

  end case
end