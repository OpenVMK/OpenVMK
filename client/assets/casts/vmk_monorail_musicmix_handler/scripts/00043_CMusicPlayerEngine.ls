-- Script
property m_pSoundChannels
property m_mp_TrackData
property m_iLastSample
property m_bAllowOpenPlayer
property m_kState
property m_kNextState

on construct me
  m_pSoundChannels = [5, 6, 7, 8]
  m_mp_TrackData = [:]
  m_iLastSample = 16
  m_bAllowOpenPlayer = 1
  registerMessage(#MusicMixerSetPlayerState, me.getID(), #setPlayerState)
  m_kState = VOID
  m_kNextState = VOID
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  if timeoutExists("MonorailStartRoomSound") then
    removeTimeout("MonorailStartRoomSound")
  end if
  if timeoutExists("MonorailEndSong") then
    removeTimeout("MonorailEndSong")
  end if
  removeUpdate(me.getID())
  return 1
end
on setPlayerState me, t_state
  m_bAllowOpenPlayer = t_state
end
on getPlayerState me
  return m_bAllowOpenPlayer
end
on playBackControl me, a_sAction
  case a_sAction of
    "Play":
      repeat with t_channel in m_pSoundChannels
        if objectp(sound(t_channel)) then
          sound(t_channel).play()
        end if
      end repeat
    "Stop":
      repeat with t_channel in m_pSoundChannels
        if objectp(sound(t_channel)) then
          sound(t_channel).stop()
        end if
      end repeat

  end case
end
on PlaySong me, t_pData
  if timeoutExists("MonorailStartRoomSound") then
    removeTimeout("MonorailStartRoomSound")
  end if
  if timeoutExists("MonorailEndSong") then
    removeTimeout("MonorailEndSong")
  end if
  executeMessage("TrainStartSong")
  if getObject(#session).get("music") then
    executeMessage("StopRoomSound")
  end if
  if getObject(#session).get("music") then
    me.ClearAll()
    repeat with t_channel in t_pData
      repeat while t_channel.count < 16
        t_channel.append(0)
      end repeat
    end repeat
    t_ar_config = getVariableValue("samples.config")
    t_channelNum = 1
    me.ClearAll()
    t_ar_trackLengths = []
    repeat with t_channel in t_pData
      t_trackData = []
      t_sampleNum = 1
      t_Length = 0
      repeat with t_sample in t_channel
        if t_sample <> 0 then
          t_Length = t_sampleNum
        end if
        if t_sample <> 0 and t_sample <> -1 then
          t_memname = t_ar_config[t_sample]
          t_mem = member(getmemnum(t_memname))
          t_trackData.append(t_mem)
        else
          t_trackData.append(t_sample)
        end if
        t_sampleNum = t_sampleNum + 1
      end repeat
      t_ar_trackLengths.append(t_Length)
      m_mp_TrackData[t_channelNum.string] = t_trackData
      t_channelNum = t_channelNum + 1
    end repeat
    createTimeout("MonorailEndSong", t_ar_trackLengths.max() * 1778, #trainEndSong, me.getID(), VOID, 1)
  else
    createTimeout("MonorailEndSong", 16 * 1778, #trainEndSong, me.getID(), VOID, 1)
  end if
  if getObject(#session).get("music") then
    put "Song length" && t_ar_trackLengths.max() * 2 & " sec"
    createTimeout("MonorailStartRoomSound", t_ar_trackLengths.max() * 2 * 1000, #playRoomSounds, me.getID(), VOID, 1)
    m_iLastSample = t_ar_trackLengths.max()
    m_kNextState = #start
  end if
end
on trainEndSong me
  executeMessage("TrainEndSong")
  m_kNextState = VOID
end
on playRoomSounds me
  executeMessage("LoadRoomSound", "music-mix_")
end
on ClearAll me
  m_mp_TrackData = [:]
  repeat with i = 1 to 4
    m_mp_TrackData.addProp(string(i), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  end repeat
end
on SetupSynchroStart me
  t_rEmptyMem = member(getmemnum("emptySnd"))
  repeat with t_channel in m_pSoundChannels
    sound(t_channel).setPlayList([])
    if t_rEmptyMem <> -1 then
      sound(t_channel).queue(t_rEmptyMem)
    end if
  end repeat
end
on SetUpPlaying me, a_iTrack
  t_rEmptyMem = member(getmemnum("emptySnd"))
  if not voidp(a_iTrack) then
    a_iTrack = value(a_iTrack)
    sound(a_iTrack).setPlayList([])
    repeat with e = 1 to 16
      t_rMem = m_mp_TrackData[a_iTrack][e]
      if t_rMem = 0 then
        t_rMem = t_rEmptyMem
      end if
      if t_rMem <> -1 then
        sound(a_iTrack).queue(t_rMem)
      end if
    end repeat
  else
    t_track = 1
    repeat with t_channel in m_pSoundChannels
      sound(t_channel).setPlayList([])
      repeat with e = 1 to m_iLastSample
        t_rMem = m_mp_TrackData[t_track][e]
        if t_rMem = 0 then
          t_rMem = t_rEmptyMem
        end if
        if t_rMem <> -1 then
          sound(t_channel).queue(t_rMem)
        end if
      end repeat
      t_track = t_track + 1
    end repeat
  end if
end
on setState me, a_kState
  if a_kState <> m_kState then
    case a_kState of
      #start:
        me.SetupSynchroStart()
        try()
        me.playBackControl("Start")
        if catch("Script error") then
          put "Caught script error trying to play synchro stub!"
        end if
        m_kNextState = #setup
      #setup:
        me.playBackControl("Stop")
        me.SetUpPlaying()
        m_kNextState = #play
      #play:
        try()
        me.playBackControl("Play")
        if catch("Script error") then
          put "Caught script error trying to play!"
        end if
        m_kNextState = VOID

    end case
    m_kState = a_kState
  end if
end
on update me
  if not voidp(m_kNextState) then
    me.setState(m_kNextState)
  end if
end