-- Movie Script
property m_wWindowTitle
property m_sDialogTitle
property m_currentView
property m_iClientID
property m_bModal
property m_iType
property m_pTexts
property m_bSpecialEvents

on construct me
  m_currentView = "vmk_basic.window"
  m_sDialogTitle = "NPCDialogWindow"
  m_wWindowTitle = m_sDialogTitle & "_window"
  m_iType = 2
  m_bModal = 0
  m_bSpecialEvents = 0
  m_iClientID = 0
  m_pTexts = [:]
  return 1
end
on deconstruct me
end
on Init me, t_iClientID, t_sDialogTitle, t_iType, t_bModal
  m_iClientID = t_iClientID
  m_sDialogTitle = t_sDialogTitle
  m_wWindowTitle = m_sDialogTitle & "_window"
  if not voidp(t_iType) then
    m_iType = max(min(3, t_iType), 1)
  end if
  if not voidp(t_bModal) then
    m_bModal = t_bModal
  end if
  m_currentView = "vmk_npc_greeting.window"
  case m_iType of
    1:
    2:
    3:
    4:
    otherwise:
      put "NPC Dialog Window: unknow type" && m_iType

  end case
end
on show me
  me.changeView(m_currentView)
end
on hide me
  if getWindow(m_wWindowTitle) <> 0 then
    removeWindow(m_wWindowTitle)
  end if
end
on UpdateView me
  me.changeView(m_currentView)
end
on changeView me, tView
  tWndObj = getWindow(m_wWindowTitle)
  tLastView = m_currentView
  if tWndObj = 0 then
    if m_bModal then
      t_window = createWindow(m_wWindowTitle, "vmk_npc_greeting.window", 0, 0, #modal)
    else
      t_window = createWindow(m_wWindowTitle, "vmk_npc_greeting.window")
    end if
    if not t_window then
      return error(me, "Failed to open NPC Dialog Window" && m_sDialogTitle & "!!!", #changeView)
    else
      tWndObj = getWindow(m_wWindowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcMessenger, me.getID(), #mouseUp)
      tWndObj.center()
    end if
  end if
  if tLastView <> tView then
    tWndObj.unmerge()
    tWndObj.merge(tView)
    m_currentView = tView
  end if
  case m_currentView of
    "vmk_npc_greeting.window":
      me.updateInterface()
    otherwise:
      put "[NPCDialogWindow] #changeView, unknown view" && m_currentView

  end case
end
on eventProcMessenger me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_wWindowTitle)
  if tEvent = #mouseUp then
    passEvent = 1
    tObject = getObjectManager().get(m_iClientID)
    if tObject = 0 then
      passEvent = 0
    else
      if tObject.handlers().getOne(#NPCdialogWindowEvent) = 0 then
        passEvent = 0
      end if
    end if
    case tElemID of
      "close", "npc.greeting.close":
        executeMessage("PlayInterfaceSound", "close-popup")
        if passEvent then
          call(#NPCdialogWindowEvent, tObject, m_sDialogTitle, "close")
        end if
        RemoveNPCDialogWindow(m_sDialogTitle)
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        if passEvent then
          call(#NPCdialogWindowEvent, tObject, m_sDialogTitle, "help")
        end if
        executeMessage(#ui_help)
      otherwise:
        put "[NPC Dialog Window] Uncaught #mouseUp: " & tElemID && tParm && tWndObj.getElement(tElemID)

    end case
  end if
end
on updateInterface me
  tWndObj = getWindow(m_wWindowTitle)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement("npc.greeting.text")
    if t_Elem <> 0 then
      t_Elem.setText(m_pTexts.getaProp(#desc))
    end if
    t_Elem = tWndObj.getElement("npc.window.title")
    if t_Elem <> 0 then
      t_Elem.setText(m_pTexts.getaProp(#title))
    end if
    t_Elem = tWndObj.getElement("npc.greeting")
    if t_Elem <> 0 then
      t_iMemNum = getmemnum("npc." & m_pTexts.getaProp(#NPCName))
      if t_iMemNum <> 0 then
        t_Elem.feedImage(member(t_iMemNum).image.duplicate())
      end if
    end if
  end if
end
on setText me
  m_pTexts = [:]
  if the paramCount > 1 then
    m_pTexts[#desc] = param(2)
  end if
  if the paramCount > 2 then
    m_pTexts[#title] = param(3)
  end if
  if the paramCount > 3 then
    m_pTexts[#NPCName] = param(4)
  end if
  me.updateInterface()
end
on SetName me, tName
  m_sDialogTitle = tName
end