-- Movie Script
property m_ar_empty_masks
property m_bReady
property m_animIDs
property m_ar_hiddenAvatars

on construct me
  m_bReady = 0
  m_ar_hiddenAvatars = []
  registerMessage(#room_animations_ready, me.getID(), #Init)
  registerMessage(#room_leave, me.getID(), #Release)
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #Init)
  unregisterMessage(#room_leave, me.getID(), #Release)
  return 1
end
on Init me
  me.rewindAndStopAnimations()
  me.showEmptyMasks()
  me.hideSittingAvatars()
  m_bReady = 1
end
on Release me
end
on Arrived me, i_age
  if m_bReady then
    me.hideEmptyMasks()
    executeMessage(#changeAnimationState, "vmk_anim_2", #show)
    executeMessage(#changeAnimationState, "vmk_anim_2", #goto, "arrive")
  end if
end
on idle me, i_age
  if m_bReady then
    me.hideEmptyMasks()
    executeMessage(#changeAnimationState, "vmk_anim_2", #show)
    executeMessage(#changeAnimationState, "vmk_anim_2", #goto, "idle")
  end if
end
on PreLaunch me, i_age
  if m_bReady then
    me.hideEmptyMasks()
    executeMessage(#changeAnimationState, "vmk_anim_2", #show)
    executeMessage(#changeAnimationState, "vmk_anim_2", #goto, "prelaunch")
  end if
end
on Depart me, i_age
  if m_bReady then
    me.showEmptyMasks()
    executeMessage(#changeAnimationState, "vmk_anim_2", #show)
    executeMessage(#changeAnimationState, "vmk_anim_2", #goto, "depart")
  end if
end
on rewindAndStopAnimations me
  executeMessage(#changeAnimationState, "vmk_anim_2", #stop)
end
on hideAnimations me
  executeMessage(#changeAnimationState, "vmk_anim_2", #hide)
end
on showEmptyMasks me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tRoomContext.GetRoot()
  tNode1 = tRoomContext.Search("NAME", "empty_mask")
  if not voidp(tNode1) then
    tNode1.GetVisual().getSprite().visible = 1
  end if
end
on hideEmptyMasks me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tRoomContext.GetRoot()
  tNode1 = tRoomContext.Search("NAME", "empty_mask")
  if not voidp(tNode1) then
    tNode1.GetVisual().getSprite().visible = 0
  end if
end
on showHiddenAvatars me
  repeat with t_rAvatar in m_ar_hiddenAvatars
    t_rAvatar.GetVisual().visible(1, 1)
  end repeat
  m_ar_hiddenAvatars = []
end
on hideSittingAvatars me
  t_ar_tiles = GetTilesOnFloor("rocket")
  m_ar_hiddenAvatars = GetAvatarsOnTiles(t_ar_tiles)
  repeat with t_rAvatar in m_ar_hiddenAvatars
    t_rAvatar.GetVisual().visible(0, 0)
  end repeat
end
on animationStateChanged me, a_kNewState, a_sAnimationID
end
on animationFreezed me, a_sAnimationID
end