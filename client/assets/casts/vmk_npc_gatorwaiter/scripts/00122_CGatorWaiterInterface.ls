-- Behavior
property m_bInitialized
property m_npcSprite
property m_bWalking
property m_sMarkerName

on construct me
  m_bWalking = 0
  m_npcSprite = VOID
  m_bInitialized = 0
  m_sMarkerName = EMPTY
  return 1
end
on ControlGator me, a_iNpcDir, a_iNpcAction
  if not m_bInitialized then
    me.InitAnimation(a_iNpcDir, a_iNpcAction)
  end if
  t_sAnimName = "vmk_gator_waiter_anim"
  m_bWalking = 0
  case a_iNpcAction of
    0:
      t_sMarkerName = "Default" && a_iNpcDir
      if m_sMarkerName <> t_sMarkerName then
        executeMessage(#changeAnimationState, t_sAnimName, #goto, t_sMarkerName)
        m_sMarkerName = t_sMarkerName
      end if
    1:
      t_sMarkerName = "Walk" && a_iNpcDir
      if m_sMarkerName <> t_sMarkerName then
        m_bWalking = 1
        executeMessage(#changeAnimationState, t_sAnimName, #goto, t_sMarkerName)
        m_sMarkerName = t_sMarkerName
      end if
    2:
      t_sMarkerName = "Talk" && a_iNpcDir
      if m_sMarkerName <> t_sMarkerName then
        executeMessage(#changeAnimationState, t_sAnimName, #goto, t_sMarkerName)
        m_sMarkerName = t_sMarkerName
      end if
    3:
      t_sMarkerName = "Serve" && a_iNpcDir
      if m_sMarkerName <> t_sMarkerName then
        executeMessage(#changeAnimationState, t_sAnimName, #goto, t_sMarkerName)
        m_sMarkerName = t_sMarkerName
      end if
    4:
      t_sMarkerName = "Idle" && a_iNpcDir
      if m_sMarkerName <> t_sMarkerName then
        executeMessage(#changeAnimationState, t_sAnimName, #goto, t_sMarkerName)
        m_sMarkerName = t_sMarkerName
      end if

  end case
end
on InitAnimation me, a_iNpcDir, a_iNpcAction
  t_sAnimName = "vmk_gator_waiter_anim"
  t_sMemName = "npc_gatorwaiter_anim.ani"
  t_rObjRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_rObjAnimationManager = getObject("AnimationManager")
  if objectp(t_rObjRoomContext) then
    t_rNode = t_rObjRoomContext.Search("TYPE", "4009")
    if objectp(t_rNode) then
      t_PntWorldPos = t_rNode.getObject().GetAbsPos()
      t_rObjAnimationManager.NewAnimation(t_PntWorldPos, t_sAnimName, t_sMemName)
      executeMessage(#changeAnimationState, t_sAnimName, #followObject, t_rNode)
      t_Obj = getObject("AnimationManager")
      if objectp(t_Obj) then
        t_arList = t_Obj.getAnimation(t_sAnimName).GetVisual().GetChannels()
        if listp(t_arList) then
          tSprite = t_arList[1].getSprite()
        end if
      end if
      if tSprite <> 0 then
        if tSprite.spriteNum <> 0 then
          m_npcSprite = sprite(tSprite)
          setEventBroker(m_npcSprite.spriteNum, "NPCGatorWaiter")
          m_npcSprite.registerProcedure(#eventProcNPC, me.getID(), #mouseUp)
          m_npcSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
          m_npcMoveStartPos = vector(m_npcSprite.loc.locH, m_npcSprite.loc.locV, m_npcSprite.locZ)
        end if
      end if
      m_bInitialized = 1
      me.ControlGator(a_iNpcDir, a_iNpcAction)
    end if
  end if
end
on eventProcNPC me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    if the doubleClick then
      tRoomContext = getThread(#room).getComponent()._AccessRoom()
      tNPC = tRoomContext.Search("TYPE", "4009")
      put "eventProcNPC found" && tNPC
      if not voidp(tNPC) then
        me.getHandler().selectNPC(integer(tNPC.GetParam("REF")))
      else
        put "The NPC Gator Waiter Room Item was not found"
      end if
    end if
  end if
end