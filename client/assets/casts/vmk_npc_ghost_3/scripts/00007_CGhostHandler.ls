-- Behavior
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2593, #HandleRoomEvent)
  t_rList.setaProp(2710, #handleNPCClicked)
  unregisterListener(t_sID, me.getID(), t_rList)
  me.regMsgList(0)
  return 1
end
on selectNPC me, npcRef
  tMsg = [#int: npcRef, #int: 0]
  getConnection("VMK").send(584, tMsg)
end
on handleNPCClicked me, tMsg
  tItemCode = tMsg.connection.GetIntFrom()
  tMessage = tMsg.connection.GetStrFrom()
  t = createNPCDialogWindow(me.getID(), "GhostNPCDialog", 1, 1)
  if t <> 0 then
    t_npcFoundMsg = getText("item.4008", "Gus") && "Found!"
    t.setText(tMessage, t_npcFoundMsg, "ghost3")
    t.show()
  end if
end
on RoomAnimationList me, tMsg
  t_iAnimationsCount = tMsg.connection.GetIntFrom()
  t_ar_animations = []
  repeat with i = 1 to t_iAnimationsCount
    t_animation = [:]
    t_animation[#ref] = tMsg.connection.GetIntFrom()
    t_animation[#type] = tMsg.connection.GetIntFrom()
    t_animation[#state] = tMsg.connection.GetIntFrom()
    t_animation[#age] = tMsg.connection.GetIntFrom()
    t_animation[#param1] = []
    t_animation[#param2] = []
    t_paramCount1 = tMsg.connection.GetIntFrom()
    repeat with i2 = 1 to t_paramCount1
      t_animation[#param1].append(tMsg.connection.GetIntFrom())
    end repeat
    t_paramCount2 = tMsg.connection.GetIntFrom()
    repeat with i3 = 1 to t_paramCount2
      t_animation[#param2].append(tMsg.connection.GetStrFrom())
    end repeat
    t_ar_animations.append(t_animation)
  end repeat
  if t_ar_animations.count > 0 then
    repeat with tAniC = 1 to t_ar_animations.count
      tCurrentAnimation = t_ar_animations[tAniC]
      tAnimationNewState = tCurrentAnimation.state
      case tAnimationNewState of
        0:
          me.getComponent().StayHidden(tCurrentAnimation.age)
        1:
          me.getComponent().Appear(tCurrentAnimation.age)
        2:
          me.getComponent().idle(tCurrentAnimation.age)
        3:
          me.getComponent().speak(tCurrentAnimation.age)
        4:
          me.getComponent().DisAppear(tCurrentAnimation.age)

      end case
    end repeat
  end if
end
on RoomAnimationStateChange me, tMsg
  tAnimationRef = tMsg.connection.GetIntFrom()
  tAnimationNewState = tMsg.connection.GetIntFrom()
  case tAnimationNewState of
    0:
      me.getComponent().StayHidden()
    1:
      me.getComponent().Appear()
    2:
      me.getComponent().idle()
    3:
      me.getComponent().speak()
    4:
      me.getComponent().DisAppear()

  end case
end
on RoomAnimationRemove me, tMsg
  t_iAnimationsCount = tMsg.connection.GetIntFrom()
  t_ar_animations = []
  repeat with i = 1 to t_iAnimationsCount
    t_animation = [:]
    t_animation[#ref] = tMsg.connection.GetIntFrom()
    t_ar_animations.append(t_animation)
  end repeat
  put "RoomAnimationRemove" && t_ar_animations
  me.getComponent().foo()
end
on regMsgList me, tBool
  t_sID = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2710, #handleNPCClicked)
  tMsgs.setaProp(2791, #RoomAnimationList)
  tMsgs.setaProp(2792, #RoomAnimationStateChange)
  tMsgs.setaProp(2793, #RoomAnimationRemove)
  tCmds = [:]
  if tBool then
    registerListener(t_sID, me.getID(), tMsgs)
    registerCommands(t_sID, me.getID(), tCmds)
  else
    unregisterListener(t_sID, me.getID(), tMsgs)
    unregisterCommands(t_sID, me.getID(), tCmds)
  end if
end