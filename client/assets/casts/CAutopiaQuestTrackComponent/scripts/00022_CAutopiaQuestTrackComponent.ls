-- Score Script
property m_ar_empty_masks
property m_bReady
property m_animIDs

on construct me
  m_bReady = 0
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
  m_bReady = 1
  me.GateClosed()
end
on Release me
end
on GateClosed me
  if m_bReady then
    executeMessage(#changeAnimationState, "vmk_anim_1", #hide)
    executeMessage(#changeAnimationState, "vmk_anim_2", #hide)
    executeMessage(#changeAnimationState, "vmk_anim_3", #show)
    executeMessage(#changeAnimationState, "vmk_anim_4", #show)
  end if
end
on GateOpen me, a_iAnimRef
  if m_bReady then
    executeMessage(#changeAnimationState, "vmk_anim_1", #show)
    executeMessage(#changeAnimationState, "vmk_anim_2", #show)
    executeMessage(#changeAnimationState, "vmk_anim_3", #hide)
    executeMessage(#changeAnimationState, "vmk_anim_4", #hide)
  end if
end