-- Score Script
property m_animIDs

on construct me
  registerMessage(#room_ready, me.getID(), #LoadAnim)
  registerMessage(#room_leave, me.getID(), #UnloadAnim)
  registerMessage(#levitate, me.getID(), #levitateEsmeralda)
  registerMessage(#animation_ready, me.getID(), #animationFinished)
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
    m_animIDs[1] = tAnimEngine.LoadAnim("esmeralda_levitate_arrangement")
  end if
end
on UnloadAnim me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    repeat with i = 1 to m_animIDs.count
      tAnimEngine.RemoveAnim(m_animIDs[i])
    end repeat
  end if
end
on stopAnimations me, tAnimEngine
  repeat with i = 1 to m_animIDs.count
    tAnimEngine.StopAnim(m_animIDs[i])
  end repeat
end
on animationFinished me, t_animName
end
on levitateEsmeralda me, i_age
  if threadExists(#animation) then
    if not voidp(i_age) then
      tFrameIndex = i_age * 24 / 1000.0
    else
      tFrameIndex = 0
    end if
    executeMessage("PlayInterfaceSound", "NPC-esmeralda-levitate-III")
    executeMessage("PlayInterfaceSound", "NPC-esmeralda-lights")
    tAnimEngine = getThread(#animation).getComponent()
    me.stopAnimations(tAnimEngine)
    tAnimEngine.PlayAnim(m_animIDs[1], tFrameIndex)
  end if
end