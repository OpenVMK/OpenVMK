-- Script
property m_mpSndProps
property m_rMemSound
property m_iSoundChannel
property m_sSoundType

on deconsturct me
  me.StopSound()
  m_mpSndProps = VOID
  m_iSoundChannel = VOID
  m_sSoundType = VOID
  return 1
end
on Define me, a_SndName
  t_sndMem = member(getmemnum(a_SndName))
  if not voidp(t_sndMem) then
    m_mpSndProps = [#member: t_sndMem]
    m_rMemSound = t_sndMem
    return 1
  else
    return 0
  end if
end
on setStartTime me, a_iTime
  if not voidp(m_mpSndProps) then
    m_mpSndProps[#startTime] = a_iTime
    me.updateSound()
  end if
end
on setEndTime me, a_iTime
  if not voidp(m_mpSndProps) then
    m_mpSndProps[#endTime] = a_iTime
  end if
end
on setLoopStartTime me, a_iTime
  if not voidp(m_mpSndProps) then
    m_mpSndProps[#loopStartTime] = a_iTime
  end if
end
on setLoopEndTime me, a_iTime
  if not voidp(m_mpSndProps) then
    m_mpSndProps[#loopEndTime] = a_iTime
  end if
end
on setLoopCount me, a_iCount
  if not voidp(m_mpSndProps) then
    m_mpSndProps[#loopCount] = a_iCount
  end if
end
on PitchSound me, a_iAmount
  if not voidp(m_mpSndProps) then
    m_mpSndProps[#rateShift] = a_iAmount
    me.updateSound()
  end if
end
on SetSoundPlayList me, a_mpPlaylist
  if listp(a_mpPlaylist) then
    m_mpSndProps = a_mpPlaylist
    me.PlaySound()
  end if
end
on SetFadeIn me, a_iFadeTime
  if not voidp(m_iSoundChannel) then
    sound(m_iSoundChannel).fadeIn(a_iFadeTime)
  end if
end
on SetFadeOut me, a_iFadeTime
  if not voidp(m_iSoundChannel) then
    sound(m_iSoundChannel).fadeOut(a_iFadeTime)
  end if
end
on SetSoundType me, a_sType
  m_sSoundType = a_sType
end
on resetSound me
  m_mpSndProps = [#member: m_rMemSound]
end
on CheckTypeStatus me
  t_iVolume = VOID
  t_iVolume = getObject(#session).get("volume")
  if voidp(t_iVolume) then
    t_iVolume = 240
  end if
  case m_sSoundType of
    "music", "Music":
      t_bSetting = getObject(#session).get("music")
      if t_bSetting then
        sound(m_iSoundChannel).volume = t_iVolume
        put "set volume(", m_iSoundChannel & ") to : " & t_iVolume
        return 1
      else
        return 0
      end if
    "ui", "UI", "Ui":
      t_bSetting = getObject(#session).get("ui")
      if t_bSetting then
        sound(m_iSoundChannel).volume = t_iVolume
        put "set volume(", m_iSoundChannel & ") to : " & t_iVolume
        return 1
      else
        return 0
      end if
    "fx", "FX", "Fx":
      t_bSetting = getObject(#session).get("fx")
      if t_bSetting then
        sound(m_iSoundChannel).volume = t_iVolume
        put "set volume(", m_iSoundChannel & ") to : " & t_iVolume
        return 1
      else
        return 0
      end if
    otherwise:
      sound(m_iSoundChannel).volume = t_iVolume
      put "set volume(", m_iSoundChannel & ") to : " & t_iVolume
      return 1

  end case
end
on PlaySound me
  if voidp(m_iSoundChannel) then
    repeat with i = 1 to 8
      if sound(i).status = 0 then
        m_iSoundChannel = i
        exit repeat
      end if
    end repeat
  else
    if sound(m_iSoundChannel).status <> 0 then
      repeat with i = 1 to 8
        if sound(i).status = 0 then
          m_iSoundChannel = i
          exit repeat
        end if
      end repeat
    end if
  end if
  if voidp(m_iSoundChannel) then
    m_iSoundChannel = 1
  end if
  if not voidp(m_iSoundChannel) and objectp(sound(m_iSoundChannel)) then
    t_bStatus = me.CheckTypeStatus()
    if t_bStatus then
      call(#queue, [sound(m_iSoundChannel)], m_mpSndProps)
      call(#play, [sound(m_iSoundChannel)])
    end if
  else
    put "All soundchannels in use!"
    return 0
  end if
end
on updateSound me
  if not voidp(m_mpSndProps) and not voidp(m_iSoundChannel) then
    sound(m_iSoundChannel).stop()
    sound(m_iSoundChannel).setPlayList([])
  end if
end
on StopSound me
  if not voidp(m_iSoundChannel) then
    sound(m_iSoundChannel).stop()
  end if
end
on GetSoundChannel me
  return m_iSoundChannel
end
on getSoundProps me
  return m_mpSndProps
end