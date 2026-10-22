-- Script
property m_ar_channels
property m_rAnchorObject
property m_npcSprite
property m_npcMoveMode
property m_npcDeltaDistance
property m_npcMoveStartTime
property m_npcMoveStartPos

on construct me
  m_ar_channels = []
  m_rAnchorObject = VOID
  m_npcSprite = VOID
  m_npcMoveMode = #stay
  m_npcMoveDeltaDistance = vector(0, 0, 0)
  m_npcMoveStartTime = the milliSeconds
  m_npcMoveStartPos = vector(0, 0, 0)
  return 1
end
on deconstruct me
  repeat with tChannel in m_ar_channels
    tID = tChannel.getID()
    if objectExists(tID) then
      removeObject(tID)
    end if
  end repeat
  return 1
end
on setState me, i_bState
  case i_bState of
    #hide:
      repeat with tChannel in m_ar_channels
        tChannel.hide()
      end repeat
    #show:
      repeat with tChannel in m_ar_channels
        tChannel.show()
      end repeat

  end case
end
on UpdateVisual me
  if objectp(m_rAnchorObject) then
    tMyPos = me.getObject().GetAbsPos()
    tNpcPos = m_rAnchorObject.GetAbsPos()
    tTime = the milliSeconds
    if m_npcMoveMode = #stay then
      if tMyPos <> tNpcPos then
        m_npcMoveMode = #move
        m_npcDeltaDistance = tNpcPos - tMyPos
        m_npcMoveStartPos = tMyPos
        m_npcMoveStartTime = tTime
      end if
    else
      if m_npcMoveMode = #move then
        tFactor = (tTime - m_npcMoveStartTime) / 500.0
        if tTime - m_npcMoveStartTime > 500 then
          tFactor = 1.0
        end if
        tPos = m_npcMoveStartPos + tFactor * m_npcDeltaDistance
        me.getObject().SetAbsPos(tPos)
        if tPos = tNpcPos then
          m_npcMoveMode = #stay
        else
          m_npcMoveMode = #move
          m_npcDeltaDistance = tNpcPos - tPos
          m_npcMoveStartPos = tPos
          m_npcMoveStartTime = tTime
        end if
      end if
    end if
  end if
  t_iFrameCounter = me.getObject().GetParam("FRAMECOUNTER")
  if m_ar_channels.count > 0 then
    repeat with tChannel in m_ar_channels
      tChannel.update(t_iFrameCounter)
    end repeat
  end if
end
on GetChannels me
  return m_ar_channels
end
on setFollowRoomObject me, t_rNode
  m_rAnchorObject = t_rNode
end
on addAnimation me, i_animation
  m_ar_channels = []
  t_inputData = [#version, #creator, #date, #time]
  repeat with tdata in t_inputData
    me.getObject().SetParam(tdata, i_animation[tdata])
  end repeat
  tInfo = i_animation.Info
  repeat with iParamCounter = 1 to tInfo.count
    tParamName = tInfo.getPropAt(iParamCounter)
    tParamValue = value(tInfo[iParamCounter])
    me.getObject().SetParam(tParamName, value(tParamValue))
  end repeat
  tRegPoint = value(me.getObject().GetParam("REGPOINT"))
  i = 0
  repeat with tChannelData in i_animation.channels
    t_rChannel = createObject(#random, "CAnimationChannel")
    t_rChannel.Init(tChannelData, me.getObject().GetParam("spriteDefaults"))
    t_rChannel.setRegPoint(tRegPoint)
    t_rChannel.setRoomObject(me.getObject())
    t_rChannel.setDeltaLocZ(i)
    m_ar_channels.append(t_rChannel)
    i = i + 1
  end repeat
end