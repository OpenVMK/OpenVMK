-- Behavior
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
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
      tTrig = t_ar_animations[tAniC]
      if tTrig[#type] = 8 then
        if tTrig.param1.count > 1 then
          me.getComponent().ShootEventFirework(tTrig.param1)
        end if
      end if
    end repeat
  end if
end
on RoomAnimationStateChange me, tMsg
end
on RoomAnimationRemove me, tMsg
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2791, #RoomAnimationList)
  tMsgs.setaProp(2792, #RoomAnimationStateChange)
  tMsgs.setaProp(2793, #RoomAnimationRemove)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  end if
end