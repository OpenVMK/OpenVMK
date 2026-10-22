-- Script
property m_ar_rFxChannel
property m_iCurFXChannel
property m_rGuideChannel
property m_rMusicChannel
property m_rAtmosChannel
property m_rCameraChannel
property m_rMotorSound

on construct me
  m_iCurFXChannel = 1
  m_ar_rFxChannel = [sound(1), sound(2), sound(3)]
  m_rCameraChannel = sound(4)
  m_rGuideChannel = sound(5)
  m_rMusicChannel = sound(6)
  m_rAtmosChannel = sound(7)
  m_rMotorSound = sound(8)
  return 1
end
on deconstruct me
  m_rMusicChannel.stop()
  m_rGuideChannel.stop()
  m_rAtmosChannel.stop()
  m_rCameraChannel.stop()
  m_rMotorSound.stop()
  repeat with tCh in m_ar_rFxChannel
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
on SoundFX me, a_rSound, a_fPitch
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    me.PlayIfNotBusy(m_ar_rFxChannel[m_iCurFXChannel], a_rSound, a_fPitch)
    m_iCurFXChannel = m_iCurFXChannel + 1
    if m_iCurFXChannel > m_ar_rFxChannel.count then
      m_iCurFXChannel = 1
    end if
  end if
end
on Guide me, a_rSound
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    me.PlayIfNotBusy(m_rGuideChannel, a_rSound, VOID)
  end if
end
on camera me, a_rSound
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    call(#stop, [m_rCameraChannel])
    call(#play, [m_rCameraChannel], [#member: a_rSound])
  end if
end
on Motor me, a_rSound
  t_bOn = getObject(#session).get("music")
  if t_bOn then
    call(#stop, [m_rMusicChannel])
    call(#play, [m_rMusicChannel], [#member: a_rSound])
  end if
end
on music me, a_rSound
  t_bOn = getObject(#session).get("music")
  if t_bOn then
    call(#stop, [m_rMusicChannel])
    call(#play, [m_rMusicChannel], [#member: a_rSound])
  end if
end
on Atmos me, a_rSound
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    call(#stop, [m_rAtmosChannel])
    call(#play, [m_rAtmosChannel], [#member: a_rSound])
  end if
end