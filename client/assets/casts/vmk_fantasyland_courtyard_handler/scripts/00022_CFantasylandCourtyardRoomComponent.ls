-- Movie Script
property m_bReady
property m_sAnimName

on construct me
  m_sAnimName = "vmk_anim_sword"
  registerMessage(#room_ready, me.getID(), #attachAnimation)
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID())
  return 1
end
on attachAnimation me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_rAnimationManager = getObject("AnimationManager")
  tNode = tRoomContext.Search("NAME", m_sAnimName)
  tWorldPos = tNode.getObject().GetAbsPos()
  t_rAnimationManager.NewAnimation(tWorldPos, m_sAnimName, "flc_sword.ani")
  m_bReady = 1
end
on SwordIdle me, a_iAnimRef
  if m_bReady then
    executeMessage(#changeAnimationState, m_sAnimName, #goto, "idle")
  end if
end
on SwordSuccess me, a_iAnimRef
  if m_bReady then
    executeMessage(#changeAnimationState, m_sAnimName, #goto, "success")
  end if
end
on SwordFailure me, a_iAnimRef
  if m_bReady then
    executeMessage(#changeAnimationState, m_sAnimName, #goto, "failure")
  end if
end