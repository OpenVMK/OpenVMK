-- Movie Script
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
on GateClosed me, a_iAnimRef
  if m_bReady then
    case a_iAnimRef of
      0:
        executeMessage(#changeAnimationState, "vmk_anim_4", #show)
      1:
        executeMessage(#changeAnimationState, "vmk_anim_3", #show)

    end case
  end if
end
on GateOpen me, a_iAnimRef
  if m_bReady then
    case a_iAnimRef of
      0:
        executeMessage(#changeAnimationState, "vmk_anim_4", #hide)
      1:
        executeMessage(#changeAnimationState, "vmk_anim_3", #hide)

    end case
  end if
end