-- Score Script
property m_ar_NavLands
property m_ar_NavSubs
property m_obj_FastPassWindow

on construct me
  m_ar_NavSubs = VOID
  m_obj_FastPassWindow = VOID
  registerMessage(#ui_navigator, me.getID(), #showhidenavigator)
  return 1
end
on deconstruct me
  unregisterMessage(#ui_navigator)
  return 1
end
on showhidenavigator me
  return me.getInterface().showhidenavigator(#hide)
end
on RequestNavigationNodes me, a_land
  t_navNode = VOID
  case a_land of
    #parkmap:
      t_navNode = 7
    #adventureland:
      t_navNode = 3
    #frontierland:
      t_navNode = 5
    #fantasyland:
      t_navNode = 4
    #tomorrowland:
      t_navNode = 6
    #mainstreet:
      t_navNode = 2
    #whatsnew:
      t_navNode = 8
    #neworleans:
      t_navNode = 9

  end case
  if not voidp(t_navNode) then
    if getObject(#session).get("AdvNavigation") then
      getConnection(getVariable("main.connection.id", "VMK")).send(26, [#integer: t_navNode])
    else
      getConnection(getVariable("main.connection.id", "VMK")).send(22, [#integer: t_navNode])
    end if
  end if
end
on NavigateToRoom me, a_roomTag
  tRoomID = VOID
  tRoomName = EMPTY
  tRoomInstances = [:]
  if not voidp(m_ar_NavSubs) then
    repeat with tSpace in m_ar_NavSubs
      if tSpace.tag = a_roomTag then
        tRoomID = tSpace.spaceid
        if tSpace.roomtype = "public" then
          tRoomName = getText("ROOM." & tSpace.tag & ".NAME")
        else
          tRoomName = tSpace.roomName
        end if
        if tSpace.findPos(#instances) > 0 then
          tRoomInstances = tSpace.instances
        end if
        exit repeat
      end if
    end repeat
    if not voidp(tRoomID) then
      if getObject(#session).get("AdvNavigation") and not voidp(tRoomInstances) then
        me.getInterface().ShowAdvancedModeWindow()
        me.getInterface().SetAdvancedModeWindowData(tRoomName, tRoomID, tRoomInstances)
      else
        getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: tRoomID, #integer: -1])
        executeMessage("PlayInterfaceSound", "map-room-selection")
        me.getInterface().HideNavigator()
      end if
    else
      if getObject(#session).get("AdvNavigation") then
        me.getInterface().ShowAdvancedModeWindow()
        me.getInterface().SetAdvancedModeWindowData("Room not available", -1, [:])
      end if
    end if
  end if
end
on CreateNavigator me, a_mp_Data
  if not voidp(a_mp_Data.spaces) then
    m_ar_NavSubs = a_mp_Data.spaces
  end if
  me.getInterface().NavigatorReady()
end
on GetNavNodes me
  return m_ar_NavSubs
end
on SetNavNodes me, a_ar_NavSubs
  m_ar_NavSubs = a_ar_NavSubs
end
on CreateFastPass me, a_mp_FastPassData
  if not objectExists("FastPassWindow") then
    m_obj_FastPassWindow = createObject("FastPassWindow", "CNavigatorFastPassWindow")
  end if
  m_obj_FastPassWindow.CreateFastPassWindow()
  m_obj_FastPassWindow.SetFastPassData(a_mp_FastPassData)
end
on CancelFastPass me
  if objectp(m_obj_FastPassWindow) then
    removeObject("FastPassWindow")
    if objectExists("Navigation.Room.Queue") then
      t_Obj = getObject("Navigation.Room.Queue")
      t_Obj.FastPassRemoved()
    end if
  end if
end
on UpdateFastPassQueuePosition me, a_iPos
  if objectp(m_obj_FastPassWindow) then
    m_obj_FastPassWindow.UpdateQueuePosition(a_iPos)
  end if
end
on RequestFastPass me
  if not objectExists("FastPassWindow") then
    m_obj_FastPassWindow = createObject("FastPassWindow", "CNavigatorFastPassWindow")
    m_obj_FastPassWindow.CreateFastPassWindow()
  end if
end