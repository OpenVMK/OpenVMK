-- Script
property m_mp_sequence
property m_mp_sayBuffer
property m_fLastTime
property m_fInitTime
property m_boatSlowPoint
property m_avatarToBoatPoint
property m_avatarWaitPos

on construct me
  m_fInitTime = the milliSeconds / 1000.0
  m_mp_sequence = [:]
  m_mp_sayBuffer = [:]
  m_boatSlowPoint = 10000000.0
  m_avatarToBoatPoint = 1000000.0
  m_avatarWaitPos = vector(0, 0, 0)
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  return 1
end
on ReadTutorial me, i_sMemberName
  dumpVariableField(getMember("tutorial"))
  m_mp_sequence = getVariableValue("JungleCruiseTutorialSequence")
  m_boatSlowPoint = getVariableValue("JungleCruiseTutorialBoatSlowPoint")
  m_avatarToBoatPoint = getVariableValue("JungleCruiseTutorialAvatarToBoatPoint")
  m_avatarWaitPos = getVariableValue("JungleCruiseTutorialAvatarWaitPos")
  m_fLastTime = the milliSeconds / 1000.0
  m_fInitTime = m_fLastTime
end
on GetSomethingToSay me
  tOut = [:]
  if m_mp_sayBuffer.count > 0 then
    tOut = m_mp_sayBuffer
  end if
  m_mp_sayBuffer = [:]
  return tOut
end
on GetBoatSlowPoint me
  return m_boatSlowPoint
end
on GetAvatarToBoatPoint me
  return m_avatarToBoatPoint
end
on GetAvatarWaitPos me
  return m_avatarWaitPos
end
on update me
  tTime = the milliSeconds / 1000.0 - m_fInitTime
  tDt = tTime - m_fLastTime
  m_fLastTime = tTime
  repeat with tLine in m_mp_sequence
    if m_fLastTime < tLine.time and m_fLastTime + tDt >= tLine.time then
      m_mp_sayBuffer = tLine.speak
    end if
  end repeat
end