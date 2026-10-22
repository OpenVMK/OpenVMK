-- Score Script
property m_ar_empty_masks
property m_bReady
property m_ar_hiddenAvatars
property m_animIDs

on construct me
  m_bReady = 0
  m_ar_hiddenAvatars = []
  registerMessage(#room_animations_ready, me.getID(), #Init)
  registerMessage(#room_leave, me.getID(), #Release)
  registerMessage(#animation_freezed, me.getID(), #animationFreezed)
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  m_ar_hiddenAvatars = []
  unregisterMessage(#room_ready, me.getID(), #Init)
  unregisterMessage(#room_leave, me.getID(), #Release)
  return 1
end
on Init me
  m_ar_hiddenAvatars = []
  me.rewindAndStopAnimations()
  me.hideAnimations()
  me.hideEmptyMasks()
  me.hideQueueTiles()
  m_bReady = 1
end
on animationFreezed me, a_sAnimationID
  case a_sAnimationID of
    "vmk_anim_8":
      executeMessage(#changeAnimationState, "vmk_anim_8", #hide)

  end case
end
on Release me
end
on Arrived me, i_age
  m_ar_hiddenAvatars = []
  if m_bReady then
    me.rewindAndStopAnimations()
    me.hideAnimations()
    executeMessage(#changeAnimationState, "vmk_anim_5", #show)
    executeMessage(#changeAnimationState, "vmk_anim_5", #play)
    executeMessage(#changeAnimationState, "vmk_anim_5", #freeze)
  end if
end
on idle me, i_age
  m_ar_hiddenAvatars = []
  if m_bReady then
    me.rewindAndStopAnimations()
    me.showQueueTiles()
    executeMessage(#changeAnimationState, "vmk_anim_1", #show)
    executeMessage(#changeAnimationState, "vmk_anim_1", #play)
    executeMessage(#changeAnimationState, "vmk_anim_1", #freeze)
    executeMessage(#changeAnimationState, "vmk_anim_6", #show)
    executeMessage(#changeAnimationState, "vmk_anim_6", #play)
    executeMessage(#changeAnimationState, "vmk_anim_6", #freeze)
    executeMessage(#changeAnimationState, "vmk_anim_7", #show)
    executeMessage(#changeAnimationState, "vmk_anim_7", #play)
    executeMessage(#changeAnimationState, "vmk_anim_7", #freeze)
  end if
end
on PreLaunch me, i_age
  m_ar_hiddenAvatars = []
  me.hideQueueTiles()
  executeMessage(#changeAnimationState, "vmk_anim_6", #show)
  executeMessage(#changeAnimationState, "vmk_anim_6", #play)
  executeMessage(#changeAnimationState, "vmk_anim_6", #freeze)
  executeMessage(#changeAnimationState, "vmk_anim_7", #show)
  executeMessage(#changeAnimationState, "vmk_anim_7", #play)
  executeMessage(#changeAnimationState, "vmk_anim_7", #freeze)
end
on Depart me, i_age
  m_ar_hiddenAvatars = []
  if m_bReady then
    m_ar_hiddenAvatars = me.hideSittingAvatars()
    me.rewindAndStopAnimations()
    me.hideAnimations()
    executeMessage(#changeAnimationState, "vmk_anim_8", #rewind)
    executeMessage(#changeAnimationState, "vmk_anim_8", #show)
    executeMessage(#changeAnimationState, "vmk_anim_8", #play)
    executeMessage(#changeAnimationState, "vmk_anim_8", #freeze)
  end if
end
on rewindAndStopAnimations me
  executeMessage(#changeAnimationState, "vmk_anim_1", #stop)
  executeMessage(#changeAnimationState, "vmk_anim_5", #stop)
  executeMessage(#changeAnimationState, "vmk_anim_6", #stop)
  executeMessage(#changeAnimationState, "vmk_anim_7", #stop)
  executeMessage(#changeAnimationState, "vmk_anim_8", #stop)
  executeMessage(#changeAnimationState, "vmk_anim_9", #stop)
end
on hideAnimations me
  executeMessage(#changeAnimationState, "vmk_anim_1", #hide)
  executeMessage(#changeAnimationState, "vmk_anim_5", #hide)
  executeMessage(#changeAnimationState, "vmk_anim_6", #hide)
  executeMessage(#changeAnimationState, "vmk_anim_7", #hide)
  executeMessage(#changeAnimationState, "vmk_anim_8", #hide)
  executeMessage(#changeAnimationState, "vmk_anim_9", #hide)
end
on showEmptyMasks me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tRoomContext.GetRoot()
  tNode1 = tRoomContext.Search("NAME", "empty_mask_1")
  tNode2 = tRoomContext.Search("NAME", "empty_mask_2")
  if not voidp(tNode1) and not voidp(tNode2) then
    tNode1.GetVisual().getSprite().visible = 1
    tNode2.GetVisual().getSprite().visible = 1
  end if
end
on hideEmptyMasks me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tRoomContext.GetRoot()
  tNode1 = tRoomContext.Search("NAME", "empty_mask_1")
  tNode2 = tRoomContext.Search("NAME", "empty_mask_2")
  if not voidp(tNode1) and not voidp(tNode2) then
    tNode1.GetVisual().getSprite().visible = 0
    tNode2.GetVisual().getSprite().visible = 0
  end if
end
on showQueueTiles me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_rRoomItem = tRoomContext.Search("TYPE", "378")
  if not voidp(t_rRoomItem) then
    t_ar_sKeys = t_rRoomItem.GetFactor().m_ar_sKey
    repeat with t = 1 to t_ar_sKeys.count
      t_sKey = t_ar_sKeys[t]
      t_rBlk = t_rRoomItem.getObject().GetContext().GetObjByKey(t_sKey)
      if t = 1 or t = 4 then
        t_rBlk.SetParam("ACT", "2")
        next repeat
      end if
      t_rBlk.SetParam("ACT", "0")
    end repeat
  end if
end
on hideQueueTiles me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_rRoomItem = tRoomContext.Search("TYPE", "378")
  if not voidp(t_rRoomItem) then
    t_ar_sKeys = t_rRoomItem.GetFactor().m_ar_sKey
    repeat with t = 1 to t_ar_sKeys.count
      t_sKey = t_ar_sKeys[t]
      t_rBlk = t_rRoomItem.getObject().GetContext().GetObjByKey(t_sKey)
      t_rBlk.SetParam("ACT", "2")
    end repeat
  end if
end
on hideSittingAvatars me
  t_ar_tiles = []
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tRoomContext.GetRoot()
  tNode1 = tRoomContext.Search("NAME", "sit_rocket_1")
  tNode2 = tRoomContext.Search("NAME", "sit_rocket_2")
  if objectp(tNode1) then
    t_ar_tiles.append(tNode1)
  end if
  if objectp(tNode2) then
    t_ar_tiles.append(tNode2)
  end if
  t_ar_foundAvatars = GetAvatarsOnTiles(t_ar_tiles)
  return t_ar_foundAvatars
end
on update me
  repeat with t_rAvatar in m_ar_hiddenAvatars
    if objectp(t_rAvatar) then
      if objectp(t_rAvatar.GetVisual()) then
        t_rAvatar.GetVisual().visible(0, 0)
      end if
    end if
  end repeat
end