-- Movie Script
property m_mpSndProps
property m_rMemSound
property m_rSoundChannel
property m_sSoundType
property m_sSndNAme
property m_sSndParameter
property m_rSoundChannelObj

on deconsturct me
  me.StopSound()
  m_mpSndProps = VOID
  m_iSoundChannel = VOID
  m_sSoundType = VOID
  m_sSndNAme = VOID
  m_sSndParameter = VOID
  m_rSoundChannelObj = VOID
  return 1
end
on Define me, a_SndName
  if not objectExists("SoundChannelAllocator") then
    t_Obj = createObject("SoundChannelAllocator", "CSoundChannelAllocator")
    t_Obj.Define()
  end if
  m_rSoundChannelObj = VOID
  m_sSndNAme = a_SndName
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
  end if
  if objectp(m_rSoundChannelObj) and not voidp(m_mpSndProps) then
    m_rSoundChannelObj.PitchSound(me, m_sSndParameter)
  end if
end
on SetSoundPlayList me, a_mpPlaylist
  if listp(a_mpPlaylist) then
    m_mpSndProps = a_mpPlaylist
    me.PlaySound()
  end if
end
on SetFadeIn me, a_iFadeTime
  if objectp(m_rSoundChannelObj) then
    m_rSoundChannelObj.SetFadeIn(a_iFadeTime)
  end if
end
on SetFadeOut me, a_iFadeTime
  if objectp(m_rSoundChannelObj) then
    m_rSoundChannelObj.SetFadeOut(a_iFadeTime)
  end if
end
on SetSoundType me, a_sType
  m_sSoundType = a_sType
end
on GetSoundType me
  return m_sSoundType
end
on resetSound me
  m_mpSndProps = [#member: m_rMemSound]
end
on SetParameter me, a_sSndParameter
  m_sSndParameter = a_sSndParameter
end
on GetParameter me
  return m_sSndParameter
end
on PlaySound me
  t_mp_DataList = [#input: me, "output": VOID]
  executeMessage("GetSndChannel", t_mp_DataList)
  if t_mp_DataList["output"] = VOID then
    m_rSoundChannelObj = VOID
    m_rSoundChannel = VOID
  else
    m_rSoundChannelObj = t_mp_DataList["output"]
    m_rSoundChannel = _sound.channel(m_rSoundChannelObj.getChannel())
  end if
  return 1
end
on updateSound me
  if not voidp(m_mpSndProps) and objectp(m_rSoundChannel) then
    m_rSoundChannel.play()
  end if
end
on StopSound me
  if objectp(m_rSoundChannelObj) then
    m_rSoundChannelObj.StopSound()
  end if
end
on GetSoundChannel me
  return m_rSoundChannel
end
on getSoundProps me
  return m_mpSndProps
end
on GetSndName me
  return m_sSndNAme
end