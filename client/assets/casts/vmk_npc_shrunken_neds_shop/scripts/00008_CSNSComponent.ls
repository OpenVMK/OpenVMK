-- Score Script
property m_animIDs

on construct me
  registerMessage(#room_ready, me.getID(), #LoadAnim)
  registerMessage(#room_leave, me.getID(), #UnloadAnim)
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
    m_animIDs[1] = tAnimEngine.LoadAnim("talk_arrangement")
    m_animIDs[2] = tAnimEngine.LoadAnim("look_arrangement")
    m_animIDs[3] = tAnimEngine.LoadAnim("move_arrangement")
    m_animIDs[4] = tAnimEngine.LoadAnim("blink_arrangement")
  end if
end
on UnloadAnim me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.RemoveAnim(m_animIDs[1])
    tAnimEngine.RemoveAnim(m_animIDs[2])
    tAnimEngine.RemoveAnim(m_animIDs[3])
    tAnimEngine.RemoveAnim(m_animIDs[4])
  end if
end
on LookAtCashRegister me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.StopAnim(m_animIDs[1])
    tAnimEngine.StopAnim(m_animIDs[3])
    tAnimEngine.StopAnim(m_animIDs[4])
    tAnimEngine.PlayAnim(m_animIDs[2], tFrameIndex)
  end if
end
on WiggleAbout me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.StopAnim(m_animIDs[1])
    tAnimEngine.StopAnim(m_animIDs[2])
    tAnimEngine.StopAnim(m_animIDs[4])
    tAnimEngine.PlayAnim(m_animIDs[3], tFrameIndex)
    executeMessage(#play_SingleSound, "SNS-rope-loop-long")
  end if
end
on speak me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.StopAnim(m_animIDs[2])
    tAnimEngine.StopAnim(m_animIDs[3])
    tAnimEngine.StopAnim(m_animIDs[4])
    tAnimEngine.PlayAnim(m_animIDs[1], tFrameIndex)
    executeMessage(#play_SingleSound, "SNS-clear-throat")
  end if
end
on blink me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.StopAnim(m_animIDs[1])
    tAnimEngine.StopAnim(m_animIDs[2])
    tAnimEngine.StopAnim(m_animIDs[3])
    tAnimEngine.PlayAnim(m_animIDs[4], tFrameIndex)
  end if
end