-- Script
property m_animIDs
property m_hidden

on construct me
  registerMessage(#room_ready, me.getID(), #LoadAnim)
  registerMessage(#room_leave, me.getID(), #UnloadAnim)
  registerMessage(#ghostStayHidden, me.getID(), #StayHidden)
  registerMessage(#ghostAppear, me.getID(), #Appear)
  registerMessage(#ghostIdle, me.getID(), #idle)
  registerMessage(#ghostSpeak, me.getID(), #speak)
  registerMessage(#ghostDisAppear, me.getID(), #DisAppear)
  m_animIDs = []
  m_hidden = 1
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #LoadAnim)
  unregisterMessage(#room_leave, me.getID(), #UnloadAnim)
  return 1
end
on LoadAnim me
  put "LoadAnim" && me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    m_animIDs[1] = tAnimEngine.LoadAnim("ghost_invisible_arrangement")
    m_animIDs[2] = tAnimEngine.LoadAnim("ghost_appear_arrangement")
    m_animIDs[3] = tAnimEngine.LoadAnim("ghost_idle_arrangement")
    m_animIDs[4] = tAnimEngine.LoadAnim("ghost_speak_arrangement")
    m_animIDs[5] = tAnimEngine.LoadAnim("ghost_disappear_arrangement")
  end if
end
on UnloadAnim me
  put "UnloadAnim" && me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    repeat with i = 1 to m_animIDs.count
      tAnimEngine.RemoveAnim(m_animIDs[i])
    end repeat
  end if
end
on stopAnimations me, tAnimEngine
  put "stopAnimations" && me
  repeat with i = 1 to m_animIDs.count
    tAnimEngine.StopAnim(m_animIDs[i])
  end repeat
end
on StayHidden me, i_age
  put "StayHidden" && i_age && me
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
  m_hidden = 1
end
on Appear me, i_age
  put "Appear" && i_age && me
  if m_hidden then
    me.getInterface().warpToSpot()
    m_hidden = 0
  end if
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
on idle me, i_age
  put "Idle" && i_age && me
  if m_hidden then
    me.getInterface().warpToSpot()
    m_hidden = 0
  end if
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
on speak me, i_age
  put "Speak" && i_age && me
  if m_hidden then
    me.getInterface().warpToSpot()
    m_hidden = 0
  end if
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
on DisAppear me, i_age
  put "DisAppear" && i_age && me
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
  m_hidden = 1
end
on foo me, i_age
  put "Foo" && i_age && me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    me.stopAnimations(tAnimEngine)
    tRoomContext = getThread(#room).getComponent()._AccessRoom()
    tNode = tRoomContext.Search("NAME", "ghost_2")
    if tNode <> 0 then
      tNode.GetVisual().getSprite().member = getMember("ghost_blank")
    end if
  end if
end