-- Score Script
property m_animID

on construct me
  registerMessage(#room_ready, me.getID(), #LoadAnim)
  registerMessage(#room_leave, me.getID(), #UnloadAnim)
  registerMessage(#room_animations_ready, me.getID(), #Init)
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #LoadAnim)
  unregisterMessage(#room_leave, me.getID(), #UnloadAnim)
  return 1
end
on Init me
  m_bReady = 1
end
on LoadAnim me
  t_rNode = me.getInterface().findNode("dragon")
  t_rAnimationManager = getObject("AnimationManager")
  if objectp(t_rNode) then
    tSprite = t_rNode.GetVisual().getSprite()
    if objectp(tSprite) then
      tSprite.blend = 0
    end if
    if objectp(t_rAnimationManager) then
      t_rAnimationManager.NewAnimation(t_rNode.getObject().GetAbsPos(), "dragon", "dragon_all.ani")
    end if
  else
    put "Could not initialize NPC-animation"
  end if
end
on UnloadAnim me
end
on BreatheFire me, i_age
  if not voidp(i_age) then
    tFrameIndex = i_age * 24 / 1000.0
  else
    tFrameIndex = 0
  end if
  executeMessage(#changeAnimationState, "dragon", #goto, "FIRE", i_age)
end