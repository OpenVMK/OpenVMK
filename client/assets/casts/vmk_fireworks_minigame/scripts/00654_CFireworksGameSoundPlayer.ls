-- Script
property m_ar_rFx1Channel
property m_ar_rFx2Channel
property m_iCurFX1Channel
property m_iCurFX2Channel
property m_rCrowdChannel
property m_iCrowdSatisfaction
property m_mp_rCrowdReactions
property m_rMusicChannel

on construct me
  m_iCurFX1Channel = 1
  m_iCurFX2Channel = 2
  m_ar_rFx1Channel = [sound(1), sound(2)]
  m_ar_rFx2Channel = [sound(3), sound(4)]
  m_rCrowdChannel = sound(5)
  m_rMusicChannel = sound(6)
  m_iCrowdSatisfaction = 1
  m_mp_rCrowdReactions = [#positive: [member("fireworks-crowd-2 1"), member("fireworks-crowd-1 1"), member("fireworks-crowd-3 1")], #negative: [member("fireworks-crowd-boo-1 1")]]
  return 1
end
on deconstruct me
  m_rMusicChannel.stop()
  m_rCrowdChannel.stop()
  repeat with tCh in m_ar_rFx1Channel
    tCh.stop()
  end repeat
  repeat with tCh in m_ar_rFx2Channel
    tCh.stop()
  end repeat
  return 1
end
on PlayIfNotBusy me, a_rChannel, a_rSound, a_fPitch
  if not a_rChannel.isBusy() then
    if voidp(a_fPitch) then
      call(#queue, [a_rChannel], [#member: a_rSound])
    else
      call(#queue, [a_rChannel], [#member: a_rSound, #rateShift: a_fPitch])
    end if
    call(#play, [a_rChannel])
  end if
end
on Boom me, a_rSound, a_fPitch
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    me.PlayIfNotBusy(m_ar_rFx1Channel[m_iCurFX1Channel], a_rSound, a_fPitch)
    m_iCurFX1Channel = m_iCurFX1Channel + 1
    if m_iCurFX1Channel > m_ar_rFx1Channel.count then
      m_iCurFX1Channel = 1
    end if
  end if
end
on Shoot me, a_rSound, a_fPitch
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    me.PlayIfNotBusy(m_ar_rFx2Channel[m_iCurFX2Channel], a_rSound, a_fPitch)
    m_iCurFX2Channel = m_iCurFX2Channel + 1
    if m_iCurFX2Channel > m_ar_rFx2Channel.count then
      m_iCurFX2Channel = 1
    end if
  end if
end
on Crowd me, a_posneg
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    tSound = EMPTY
    case a_posneg of
      #positive:
        m_iCrowdSatisfaction = m_iCrowdSatisfaction + 1
        if m_iCrowdSatisfaction > 8 then
          tSound = m_mp_rCrowdReactions[#positive][3]
        else
          if m_iCrowdSatisfaction > 4 then
            tSound = m_mp_rCrowdReactions[#positive][2]
          else
            if m_iCrowdSatisfaction > 0 then
              tSound = m_mp_rCrowdReactions[#positive][1]
            end if
          end if
        end if
      #negative:
        m_iCrowdSatisfaction = m_iCrowdSatisfaction - 1
        if m_iCrowdSatisfaction <= 0 then
          tSound = m_mp_rCrowdReactions[#negative][1]
        end if

    end case
    me.PlayIfNotBusy(m_rCrowdChannel, tSound, VOID)
    if m_iCrowdSatisfaction > 10 then
      m_iCrowdSatisfaction = 10
    end if
    if m_iCrowdSatisfaction < -5 then
      m_iCrowdSatisfaction = -5
    end if
  end if
end
on music me, a_rSound
  t_bOn = getObject(#session).get("music")
  if t_bOn then
    call(#stop, [m_rMusicChannel])
    call(#queue, [m_rMusicChannel], [#member: a_rSound])
    call(#play, [m_rMusicChannel])
  end if
end