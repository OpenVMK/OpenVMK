-- Behavior
property m_animIDs

on construct me
  registerMessage(#room_ready, me.getID(), #LoadAnim)
  registerMessage(#room_leave, me.getID(), #UnloadAnim)
  registerMessage(#pirateClimbMast, me.getID(), #climbUpMastSlideDownRope)
  registerMessage(#pirateClimbRope, me.getID(), #climbUpRopeSlideDownMast)
  registerMessage(#pirateWeave, me.getID(), #PointSword)
  registerMessage(#pirateSteer, me.getID(), #steerBoat)
  registerMessage(#pirateSpeak, me.getID(), #lookAndSpeak)
  registerMessage(#pirateLook, me.getID(), #LookLeftAndRight)
  m_animIDs = []
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #LoadAnim)
  unregisterMessage(#room_leave, me.getID(), #UnloadAnim)
  return 1
end
on LoadAnim me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    m_animIDs[1] = tAnimEngine.LoadAnim("pirate_look_arrangement")
    m_animIDs[2] = tAnimEngine.LoadAnim("pirate_weave_arrangement")
    m_animIDs[3] = tAnimEngine.LoadAnim("pirate_climb_mast_arrangement")
    m_animIDs[4] = tAnimEngine.LoadAnim("pirate_talk_arrangement")
    m_animIDs[5] = tAnimEngine.LoadAnim("pirate_steer_arrangement")
    m_animIDs[6] = tAnimEngine.LoadAnim("pirate_climb_rope_arrangement")
  end if
end
on UnloadAnim me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.RemoveAnim(m_animIDs[1])
    tAnimEngine.RemoveAnim(m_animIDs[2])
    tAnimEngine.RemoveAnim(m_animIDs[3])
    tAnimEngine.RemoveAnim(m_animIDs[4])
    tAnimEngine.RemoveAnim(m_animIDs[5])
    tAnimEngine.RemoveAnim(m_animIDs[6])
  end if
end
on stopAnimations me, tAnimEngine
  tAnimEngine.StopAnim(m_animIDs[1])
  tAnimEngine.StopAnim(m_animIDs[2])
  tAnimEngine.StopAnim(m_animIDs[3])
  tAnimEngine.StopAnim(m_animIDs[4])
  tAnimEngine.StopAnim(m_animIDs[5])
  tAnimEngine.StopAnim(m_animIDs[6])
end
on LookLeftAndRight me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    me.stopAnimations(tAnimEngine)
    tAnimEngine.PlayAnim(m_animIDs[1], tFrameIndex)
  end if
end
on PointSword me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    me.stopAnimations(tAnimEngine)
    tAnimEngine.PlayAnim(m_animIDs[2], tFrameIndex)
  end if
end
on climbUpMastSlideDownRope me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    me.stopAnimations(tAnimEngine)
    tAnimEngine.PlayAnim(m_animIDs[3], tFrameIndex)
  end if
end
on lookAndSpeak me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    me.stopAnimations(tAnimEngine)
    tAnimEngine.PlayAnim(m_animIDs[4], tFrameIndex)
  end if
end
on steerBoat me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    me.stopAnimations(tAnimEngine)
    tAnimEngine.PlayAnim(m_animIDs[5], tFrameIndex)
  end if
end
on climbUpRopeSlideDownMast me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    me.stopAnimations(tAnimEngine)
    tAnimEngine.PlayAnim(m_animIDs[6], tFrameIndex)
  end if
end