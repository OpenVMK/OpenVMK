-- Script
property m_objModMessage
property m_objModAKB
property m_objModMenu

on construct this
  m_sWindowID = "Moderator_Message"
  m_mp_MessageIDList = [:]
  registerMessage("show_mod_window", this.getID(), #ShowModsWindow)
  registerMessage("room_avatar_selection", this.getID(), #AvatarSelected)
  registerMessage("OpenModerationMenu", this.getID(), #OpenModMenu)
  m_objModMessage = createObject("ModMessage", "CModeratorMessage")
  m_objModAKB = createObject("ModAKB", "CModeratorAKB")
  m_objModMenu = createObject("ModMenu", "CModeratorMenu")
  return 1
end
on deconstruct this
  m_mp_MessageIDList = [:]
  removeObject("ModMessage")
  removeObject("ModAKB")
  removeObject("ModMenu")
  unregisterMessage("room_avatar_selection", this.getID())
  unregisterMessage("OpenModerationMenu", this.getID())
  unregisterMessage("show_mod_window", this.getID())
  return 1
end
on OpenModMenu this
  this.ManageModWindows("mod_menu")
end
on ManageModWindows this, a_sWndName, a_mp_Data
  case a_sWndName of
    "mod_message":
      if objectp(m_objModMessage) and listp(a_mp_Data) then
        m_objModMessage.CreateModeratorMessage(a_mp_Data)
      end if
    "akb":
      if objectp(m_objModAKB) then
        m_objModAKB.OpenCloseAkbWindow()
      end if
    "mod_menu":
      if objectp(m_objModMenu) then
        m_objModMenu.OpenCloseMenuWindow()
      end if

  end case
end
on SetAvatarName this, a_sName
  if objectp(m_objModAKB) then
    if voidp(a_sName) then
      m_objModAKB.SetName(EMPTY)
      m_objModAKB.SelectUser(VOID)
    else
      m_objModAKB.SetName(a_sName)
      m_objModAKB.SelectUser(VOID)
    end if
  end if
  if objectp(m_objModMenu) then
    if voidp(a_sName) then
      m_objModMenu.SetName(EMPTY)
      m_objModMenu.SelectUser(VOID)
    else
      m_objModMenu.SetName(a_sName)
      m_objModMenu.SelectUser(VOID)
    end if
  end if
end
on AvatarSelected this, a_obj
  if objectp(m_objModAKB) then
    m_objModAKB.SelectUser(a_obj)
  end if
  if objectp(m_objModMenu) then
    m_objModMenu.SelectUser(a_obj)
  end if
end
on SelectWholeRoom this
  if objectp(m_objModAKB) then
    m_objModAKB.SelectWholeRoom()
  end if
  if objectp(m_objModMenu) then
    m_objModMenu.SelectWholeRoom()
  end if
end
on ShowModsWindow this
  if getObject(#session).exists("permissions") then
    t_ar_Permission = ["alert", "kick", "ban", "mute", "roomalert", "roomkick", "roomban", "roommute", "forcenamechange", "searchAnyRoom"]
    t_ar_Permissions = getObject(#session).get("permissions")
    if listp(t_ar_Permissions) then
      t_iListCount = t_ar_Permission.count
      t_ar_PermList = []
      repeat with i = 1 to t_ar_Permissions.count
        if t_iListCount >= t_ar_Permissions[i] then
          t_ar_PermList.add(t_ar_Permission[t_ar_Permissions[i]])
        end if
      end repeat
      if objectp(m_objModAKB) then
        m_objModMenu.SetPermissions(t_ar_PermList)
      end if
      if objectp(m_objModMenu) then
        m_objModMenu.SetPermissions(t_ar_PermList)
      end if
    end if
    t_sWndName = "mod_wnd"
    if createWindow(t_sWndName, "vmk_mods_button.window") then
      t_rWnd = getWindow(t_sWndName)
      t_rWnd.moveTo(0, 0)
      t_rWnd.registerClient(this.getID())
      t_rWnd.registerProcedure(#_EventProcModeratorWnd, this.getID(), #mouseDown)
    else
      return 0
    end if
  else
    return 0
  end if
end
on _EventProcModeratorWnd this, tEvent, tElemID, tParam, a_sID
  case tElemID of
    "mods.open":
      this.ManageModWindows("mod_menu")

  end case
end