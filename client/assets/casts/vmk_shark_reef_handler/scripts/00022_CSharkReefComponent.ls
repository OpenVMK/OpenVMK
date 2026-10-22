-- Script
property m_ar_empty_masks
property m_bReady
property m_animIDs

on construct me
  m_bReady = 0
  registerMessage(#room_animations_ready, me.getID(), #Init)
  registerMessage(#room_leave, me.getID(), #Release)
  registerMessage(#animation_freezed, me.getID(), #HideSplash)
  return 1
end
on deconstruct me
  unregisterMessage(#room_animations_ready, me.getID())
  unregisterMessage(#room_leave, me.getID())
  unregisterMessage(#animation_freezed, me.getID())
  return 1
end
on Init me
  m_bReady = 1
  me.HideSplash(3)
end
on Release me
end
on ShowSplash me, a_iAnimRef
  if m_bReady then
    case a_iAnimRef of
      0:
        executeMessage(#changeAnimationState, "vmk_anim_1", #rewind)
        executeMessage(#changeAnimationState, "vmk_anim_1", #show)
        executeMessage(#changeAnimationState, "vmk_anim_1", #freeze)
        executeMessage("PlayFxSound", "SR-fallintowater")
      1:
        executeMessage(#changeAnimationState, "vmk_anim_2", #rewind)
        executeMessage(#changeAnimationState, "vmk_anim_2", #show)
        executeMessage(#changeAnimationState, "vmk_anim_2", #freeze)
        executeMessage("PlayFxSound", "SR-fallintowater")

    end case
  end if
end
on HideSplash me, a_iAnimRef
  if m_bReady then
    case a_iAnimRef of
      "vmk_anim_1":
        executeMessage(#changeAnimationState, "vmk_anim_1", #hide)
      "vmk_anim_2":
        executeMessage(#changeAnimationState, "vmk_anim_2", #hide)
      otherwise:
        executeMessage(#changeAnimationState, "vmk_anim_1", #hide)
        executeMessage(#changeAnimationState, "vmk_anim_2", #hide)

    end case
  end if
end
on rewindAndStopAnimations me
  executeMessage(#changeAnimationState, "vmk_anim_1", #stop)
  executeMessage(#changeAnimationState, "vmk_anim_2", #stop)
  executeMessage(#changeAnimationState, "vmk_anim_1", #rewind)
  executeMessage(#changeAnimationState, "vmk_anim_2", #rewind)
end
on hideAnimations me
  executeMessage(#changeAnimationState, "vmk_anim_1", #hide)
  executeMessage(#changeAnimationState, "vmk_anim_2", #hide)
end