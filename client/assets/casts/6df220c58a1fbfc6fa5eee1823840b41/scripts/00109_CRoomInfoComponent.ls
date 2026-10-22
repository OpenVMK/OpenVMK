-- Score Script
property m_visible
property m_active
property m_roomMode
property m_sRoomName
property m_sRoomDesc
property m_sRoomInstance
property m_sRoomOwner
property m_bControlRoom
property m_bFriendsOnly
property m_arRoomInstanceTitles
property m_iRoomTag
property m_pulser
property m_pRoomInfo

on construct me
  registerMessage(#room_ready, me.getID(), #Activate)
  registerMessage(#room_leave, me.getID(), #inActivate)
  m_sRoomName = EMPTY
  m_sRoomDesc = EMPTY
  m_sRoomInstance = EMPTY
  m_sRoomOwner = EMPTY
  m_iRoomTag = -1
  m_bControlRoom = 0
  m_roomMode = "public"
  m_active = 0
  m_visible = 0
  registerMessage(#ui_roominfo, me.getID(), #showHide)
  registerMessage(#hide_roominfo, me.getID(), #hideRoomInfo)
  registerMessage("room_tile_selection", me.getID(), #hideRoomInfo)
  registerMessage(#avatarsex, me.getID(), #getAvatarSex)
  registerMessage(#roomOwner, me.getID(), #GetRoomOwner)
  registerMessage(#Initialize, me.getID(), #InitializeObject)
  m_pRoomInfo = VOID
  m_pulser = VOID
  m_arRoomInstanceTitles = ["North", "East", "South", "West"]
  return 1
end
on deconstruct me
  unregisterMessage(#ui_help, me.getID())
  unregisterMessage(#hide_roominfo, me.getID())
  unregisterMessage(#avatarsex, me.getID())
  unregisterMessage(#roomOwner, me.getID())
  unregisterMessage("room_leave", me.getID())
  if not voidp(m_pulser) then
    removeObject(m_pulser.getID())
  end if
  if not voidp(m_pRoomInfo) then
    removeObject(m_pRoomInfo.getID())
  end if
  m_pRoomInfo = VOID
  return 1
end
on InitializeObject me
  m_pRoomInfo = createObject("Room Information Data", "CRoomInfoData")
end
on setIconPulse me, t_state
  if voidp(m_pulser) then
    m_pulser = createObject("Room Info Icon Pulser", "CRoomInfoIconPulser")
  end if
  if t_state then
    m_pulser.Activate()
  else
    m_pulser.deactivate()
  end if
end
on setRoomName me, t_sName
  m_sRoomName = t_sName
  if m_visible then
    me.getInterface().UpdateView()
  end if
end
on setRoomDesc me, t_sDesc
  m_sRoomDesc = t_sDesc
  if m_visible then
    me.getInterface().UpdateView()
  end if
end
on setRoomAccesCode me, a_iCode
  if m_bControlRoom then
    m_bFriendsOnly = a_iCode
    me.setRoomEntryState(a_iCode)
  end if
end
on setPublic me
  m_roomMode = "public"
  me.getInterface().m_currentView = "vmk_popup_roominfop.window"
  if m_visible then
    me.getInterface().UpdateView()
  end if
end
on setPrivate me
  m_roomMode = "private"
  me.getInterface().m_currentView = "vmk_popup_roominfog.window"
  if m_visible then
    me.getInterface().UpdateView()
  end if
end
on setPublicInfo me, t_room
  if m_pRoomInfo.IsReady() then
    t_desc = m_pRoomInfo.getRoomByTag(t_room.roomTag)
    m_sRoomName = t_desc.getaProp(#name)
    m_sRoomDesc = t_desc.getaProp(#description)
    if t_room.instanceID <= m_arRoomInstanceTitles.count then
      m_sRoomInstance = m_arRoomInstanceTitles[t_room.instanceID]
    end if
    m_iRoomTag = t_room.roomTag
  else
    m_sRoomName = "Unknown"
    m_sRoomDesc = "-"
    m_iRoomTag = -1
  end if
end
on getFriendsOnly me
  return m_bFriendsOnly
end
on setFriendsOnly me, a_iState
  me.getHandler().SendFriendsOnlyState(a_iState)
end
on setRoomEntryState me, a_bState
  m_bFriendsOnly = a_bState
  me.interface.UpdateChoises(a_bState)
end
on setGuestInfo me, t_info
  m_sRoomName = t_info.getaProp(#roomName)
  m_sRoomDesc = t_info.getaProp(#roomDescription)
  m_sRoomOwner = t_info.getaProp(#roomOwner)
  m_bControlRoom = t_info.getaProp(#controlRoom)
  m_bFriendsOnly = t_info.getaProp(#friendsOnly)
  m_iRoomTag = -1
  me.setRoomEntryState(m_bFriendsOnly)
end
on getRoomMode me
  return m_roomMode
end
on Activate me
  m_active = 1
  m_arRoomInstanceTitles = getThread("navigator").getInterface().getRoomInstanceTitles()
end
on getRoomDesc me
  return [#name: m_sRoomName, #desc: m_sRoomDesc, #owner: m_sRoomOwner, #control: m_bControlRoom, #instance: m_sRoomInstance]
end
on getRoomTag me
  return m_iRoomTag
end
on inActivate me
  m_sRoomName = EMPTY
  m_sRoomDesc = EMPTY
  m_sRoomInstance = EMPTY
  if m_visible then
    me.showHide()
  end if
  m_active = 0
end
on enterRoom me
  if not m_visible then
    me.setIconPulse(1)
    createTimeout(#hideRoomInfo, 4000, #enterRoomHideInfo, me.getID(), VOID, 0)
  end if
end
on enterRoomHideInfo me
  me.setIconPulse(0)
  removeTimeout(#hideRoomInfo)
end
on showHide me
  if m_active then
    if m_visible then
      me.getInterface().hide()
    else
      me.getInterface().show()
      executeMessage("close_Emoticons")
      executeMessage("close_Magic")
      executeMessage(#hide_camera)
    end if
    m_visible = not m_visible
  end if
end
on hideRoomInfo me
  if m_active then
    if m_visible then
      me.getInterface().hide()
    end if
  end if
end
on getAvatarSex me, i_sAvatarName, i_ar_sexInfo
  if me.findAvatarinRoom(i_sAvatarName, i_ar_sexInfo) then
    return 1
  else
    return 0
  end if
end
on GetRoomOwner this, a_ar_sOwnerName
  t_rContext = getThread(#room).getComponent()._AccessRoom()
  if not voidp(t_rContext) then
    if not stringp(m_sRoomOwner) then
      m_sRoomOwner = EMPTY
    end if
    a_ar_sOwnerName.add(m_sRoomOwner)
  end if
end
on findAvatarinRoom me, i_sAvatarName, i_ar_avatarInfo
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  if voidp(tRoomContext) then
    return 0
  end if
  t_rXML = tRoomContext.GetRoot()
  repeat with tNode in t_rXML.child
    case tNode[#type] of
      "NODE":
        if tNode[#param]["CLASS"] = "avatar" then
          if tNode[#param]["NAME"] = i_sAvatarName then
            i_ar_avatarInfo["NAME"] = tNode[#param]["NAME"]
            i_ar_avatarInfo["SEX"] = tNode[#param]["SEX"]
            i_ar_avatarInfo["REF"] = tNode[#param]["REF"]
            i_ar_avatarInfo["DESC"] = tNode[#param]["DESC"]
            return 1
          end if
        end if

    end case
  end repeat
  return 0
end