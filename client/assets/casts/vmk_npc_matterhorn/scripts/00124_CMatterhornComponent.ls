-- Movie Script
property m_bReady

on construct me
  m_bReady = 0
  registerMessage(#room_ready, me.getID(), #LoadAnim)
  registerMessage(#room_leave, me.getID(), #UnloadAnim)
  registerMessage(#room_animations_ready, me.getID(), #Init)
  registerMessage(#yetiRoar, me.getID(), #RoarAndSpeak)
  registerMessage(#yetiIdle, me.getID(), #idle)
  registerMessage(#yetiPhone, me.getID(), #AnswerPhone)
  registerMessage(#yetiSnowball, me.getID(), #ThrowSnowball)
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID())
  unregisterMessage(#room_leave, me.getID())
  unregisterMessage(#yetiRoar, me.getID())
  unregisterMessage(#yetiIdle, me.getID())
  unregisterMessage(#yetiPhone, me.getID())
  unregisterMessage(#yetiSnowball, me.getID())
  return 1
end
on Init me
  m_bReady = 1
end
on LoadAnim me
  t_rSnowball = me.getInterface().findNode("snowball")
  if objectp(t_rSnowball) then
    t_rSnowballSprite = t_rSnowball.GetVisual().getSprite()
    if objectp(t_rSnowballSprite) then
      t_rSnowballSprite.visible = 0
    end if
  end if
  t_rNode = me.getInterface().findNode("yeti")
  t_rAnimationManager = getObject("AnimationManager")
  if objectp(t_rNode) then
    tSprite = t_rNode.GetVisual().getSprite()
    if objectp(tSprite) then
      tSprite.blend = 0
    end if
    if objectp(t_rAnimationManager) then
      t_rAnimationManager.NewAnimation(t_rNode.getObject().GetAbsPos(), "yeti", "yeti_all.ani")
    end if
  else
    put "Could not initialize NPC-animation"
  end if
end
on UnloadAnim me
end
on RoarAndSpeak me, i_age
  executeMessage(#changeAnimationState, "yeti", #goto, "ROAR", i_age)
end
on idle me, i_age
  executeMessage(#changeAnimationState, "yeti", #goto, "IDLE", i_age)
end
on AnswerPhone me, i_age
  executeMessage(#changeAnimationState, "yeti", #goto, "PHONE", i_age)
end
on ThrowSnowball me, i_age
  executeMessage(#changeAnimationState, "yeti", #goto, "THROW", i_age)
end