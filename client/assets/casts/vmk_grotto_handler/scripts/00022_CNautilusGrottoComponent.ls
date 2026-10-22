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
  me.HandleGate(0)
end
on Release me
end
on HandleDisplay me, a_iState
  case a_iState of
    0:
      executeMessage(#changeAnimationState, "vmk_anim_1", #show)
    1:
      executeMessage(#changeAnimationState, "vmk_anim_1", #hide)

  end case
end
on HandleGate me, a_iState
  if m_bReady then
    case a_iState of
      0:
        executeMessage(#changeAnimationState, "vmk_anim_9", #show)
        executeMessage(#changeAnimationState, "vmk_anim_10", #show)
      1:
        executeMessage(#changeAnimationState, "vmk_anim_9", #hide)
        executeMessage(#changeAnimationState, "vmk_anim_10", #hide)

    end case
  end if
end