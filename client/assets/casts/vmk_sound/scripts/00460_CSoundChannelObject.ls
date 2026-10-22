-- Script
property m_r_SndChannel
property m_sNowPlaying
property m_iDuration
property m_iCounter
property m_iDurationLeft
property m_sSoundType
property m_iChannelStatus
property m_bInfiniteLoop
property m_iChannelNum

on deconsturct this
  m_r_SndChannel = VOID
  m_sNowPlaying = VOID
  m_sSoundType = VOID
  m_iDuration = 0
  m_iCounter = 0
  m_iDurationLeft = 0
  m_iChannelStatus = 0
  m_bInfiniteLoop = 0
  return 1
end
on DefineChannel this, a_iChannelNum
  if integerp(a_iChannelNum) then
    m_r_SndChannel = _sound.channel(a_iChannelNum)
    m_iChannelNum = a_iChannelNum
  end if
  m_sNowPlaying = VOID
  m_sSoundType = VOID
  m_iDuration = 0
  m_iCounter = 0
  m_iDurationLeft = 0
  m_iChannelStatus = 0
  m_bInfiniteLoop = 0
  return 1
end
on StopSound this
  call(#stop, [m_r_SndChannel])
  m_sNowPlaying = VOID
  m_sSoundType = VOID
  m_iDuration = 0
  m_iCounter = 0
  m_iDurationLeft = 0
  m_iChannelStatus = 0
  m_bInfiniteLoop = 0
  return 1
end
on getChannel this
  return m_iChannelNum
end
on PitchSound this, a_rSndObj, a_sSndParameter
  this.PlaySound(a_rSndObj, a_sSndParameter)
end
on SetFadeIn this, a_iFadeTime
  if objectp(m_r_SndChannel) then
    m_r_SndChannel.fadeIn(a_iFadeTime)
  end if
end
on SetFadeOut this, a_iFadeTime
  if objectp(m_r_SndChannel) then
    m_r_SndChannel.fadeOut(a_iFadeTime)
  end if
end
on SetFadeTo this, a_iVolume, a_iFadeTime
  if objectp(m_r_SndChannel) then
    m_r_SndChannel.fadeTo(a_iVolume, a_iFadeTime)
  end if
end
on PlaySound this, a_rSndObj, a_sPref
  t_mp_SndDAta = a_rSndObj.getSoundProps()
  t_iLoopCount = 0
  t_rSndMem = t_mp_SndDAta.member
  if t_rSndMem.loop then
    m_bInfiniteLoop = 1
    m_iChannelStatus = 1
    m_sNowPlaying = t_rSndMem.name
    call(#queue, [m_r_SndChannel], t_mp_SndDAta)
    call(#play, [m_r_SndChannel], t_mp_SndDAta)
    return 1
  end if
  m_bInfiniteLoop = 0
  if t_mp_SndDAta.findPos(#loopCount) then
    t_iLoopCount = t_mp_SndDAta.loopCount
  end if
  t_bStatus = this.CheckTypeStatus()
  if t_bStatus then
    m_sSoundType = a_rSndObj.GetSoundType()
    if t_iLoopCount > 0 then
      m_iDuration = t_rSndMem.duration * t_iLoopCount
    else
      m_iDuration = t_rSndMem.duration
    end if
    m_iCounter = 0
    this.TimeLeft()
    m_sNowPlaying = t_rSndMem.name
    call(#queue, [m_r_SndChannel], t_mp_SndDAta)
    call(#play, [m_r_SndChannel])
  else
    m_sSoundType = a_rSndObj.GetSoundType()
    if t_iLoopCount > 0 then
      m_iDuration = t_rSndMem.duration * t_iLoopCount
    else
      m_iDuration = t_rSndMem.duration
    end if
    m_iCounter = 0
    this.TimeLeft()
    m_r_SndChannel.setPlayList([])
    m_sNowPlaying = t_rSndMem.name
    call(#queue, [m_r_SndChannel], t_mp_SndDAta)
    call(#play, [m_r_SndChannel], t_mp_SndDAta)
  end if
end
on TimeLeft this
  m_iCounter = m_iCounter + 10
  m_iDurationLeft = m_iDuration - m_iCounter
  if m_iDurationLeft > 0 then
    m_iChannelStatus = m_iDurationLeft
    this.delay(10, #TimeLeft)
  else
    m_sNowPlaying = VOID
    m_iChannelStatus = 0
  end if
end
on GetStatus this
  return m_iChannelStatus
end
on CheckTypeStatus this
  t_iVolume = VOID
  t_iVolume = getObject(#session).get("volume")
  if voidp(t_iVolume) then
    t_iVolume = 200
  end if
  case m_sSoundType of
    "music", "Music":
      t_bSetting = getObject(#session).get("music")
      if t_bSetting then
        return 1
      else
        return 0
      end if
    "ui", "UI", "Ui":
      t_bSetting = getObject(#session).get("ui")
      if t_bSetting then
      else
        return 0
      end if
    "fx", "FX", "Fx":
      t_bSetting = getObject(#session).get("fx")
      if t_bSetting then
        return 1
      else
        return 0
      end if

  end case
  return 1
end