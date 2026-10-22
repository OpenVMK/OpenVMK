-- Script
property m_mp_arrangements
property m_mp_spriteLists
property m_mp_nodes
property m_idAllocator
property m_maxIDs
property m_frameRate
property m_ar_animations
property m_rAnimationManager
property m_iLastFrame

on construct me
  m_iLastFrame = the milliSeconds
  m_mp_arrangements = [:]
  m_idAllocator = 1
  m_maxIDs = 5000
  m_ar_animations = []
  m_rAnimationManager = VOID
  registerMessage(#Initialize, me.getID(), #InitializeAnimationManager)
  registerMessage(#room_ready, me.getID(), #activateAnimations)
  registerMessage(#room_leave, me.getID(), #deActivateAnimations)
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  if getObject("AnimationManager") <> 0 then
    removeObject("AnimationManager")
  end if
  removeUpdate(me.getID())
  return 1
end
on InitializeAnimationManager me
  if getObject("AnimationManager") <> 0 then
    m_rAnimationManager = getObject("AnimationManager")
  else
    m_rAnimationManager = createObject("AnimationManager", "CVMKAnimationManager")
  end if
end
on removeAllAnimations me
  repeat with i = 1 to m_mp_arrangements.count
    t_arrangementID = "RoomAnimation:" & m_mp_arrangements.getPropAt(i)
    if t_arrangementID <> 0 then
      removeObject(t_arrangementID)
    end if
  end repeat
  if listp(m_mp_arrangements) then
    m_mp_arrangements.deleteAll()
  end if
end
on animationsReady me
  put "Animations ready" && the milliSeconds
end
on activateAnimations me
  m_ar_animations = []
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  if objectp(tRoomContext) then
    repeat with i = 1 to 15
      tAnimName = "vmk_anim_" & i
      tNode = tRoomContext.Search("NAME", tAnimName)
      if tNode <> 0 then
        tWorldPos = tNode.getObject().GetAbsPos()
        if variableExists(tAnimName) then
          tMemName = getVariable(tAnimName)
          if getmemnum(tMemName) <> 0 then
            m_rAnimationManager.NewAnimation(tWorldPos, tAnimName, tMemName)
          end if
        end if
        tSprite = tNode.GetVisual().getSprite()
        if tSprite.spriteNum <> 0 then
          tSprite.visible = 0
        end if
      end if
    end repeat
  end if
end
on RemoveRoomObject me, a_sClass, a_iRef
  t_rRoomContext = getThread("room").getComponent()._AccessRoom()
  if not voidp(t_rRoomContext) then
    t_rRoomContext._RemoveIndexed(a_iRef, a_sClass)
  end if
end
on deActivateAnimations me
  me.removeAllAnimations()
  repeat with i = 1 to 15
    tVarName = "vmk_anim_" & i
    if variableExists(tVarName) then
      removeVariable(tVarName)
      next repeat
    end if
  end repeat
  if objectp(m_rAnimationManager) then
    m_rAnimationManager.ClearAll()
  end if
end
on LoadAnim me, i_sVariable
  tNewID = me.GetNewID()
  tNewArr = createObject("RoomAnimation:" & tNewID, "CArrangement")
  tNewArr.LoadArrangement(getVariableValue(i_sVariable))
  tNewArr.SetName(i_sVariable)
  m_mp_arrangements.setaProp(tNewID, tNewArr)
  return tNewID
end
on RemoveAnim me, i_animID
  tArr = m_mp_arrangements.getaProp(i_animID)
  removeObject(tArr.getID())
  m_mp_arrangements.deleteOne(i_animID)
end
on PlayAnim me, i_animID, i_iFrameIndex
  tArr = m_mp_arrangements.getaProp(i_animID)
  if voidp(tArr) then
    return error(me, "Unknown Anim ID", #PlayAnimation)
  end if
  tArr.play(i_iFrameIndex)
end
on StopAnim me, i_animID
  tArr = m_mp_arrangements.getaProp(i_animID)
  if voidp(tArr) then
    return error(me, "Unknown Anim ID", #PlayAnimation)
  end if
  tArr.stop()
end
on GetNewID me
  if m_mp_arrangements.count < m_maxIDs then
    m_idAllocator = m_idAllocator + 1
    return m_idAllocator
  else
    error(me, "Animation system is out of id's!", #GetNewID)
    return VOID
  end if
end
on update me
  call(#update, m_mp_arrangements)
  call(#render, m_mp_arrangements)
end