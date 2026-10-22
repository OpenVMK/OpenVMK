-- Behavior
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on RoomEvent me, tMsg
  ttype = tMsg.connection.GetIntFrom()
  if ttype = 22 then
    tParamCount = tMsg.connection.GetIntFrom()
    tColor = tMsg.connection.GetIntFrom()
    t_ar_Params = []
    repeat with i = 2 to tParamCount
      t_ar_Params.append(tMsg.connection.GetIntFrom())
    end repeat
    me.getInterface().NewBoat(tColor, t_ar_Params)
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
      tBoat = t_ar_animations[tAniC]
      if tBoat.param1.count > 1 then
        tColor = tBoat.param1[1]
        t_ar_Params = []
        repeat with i = 2 to tBoat.param1.count
          t_ar_Params.append(tBoat.param1[i])
        end repeat
        me.getInterface().NewBoat(tColor, t_ar_Params, tBoat.age)
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