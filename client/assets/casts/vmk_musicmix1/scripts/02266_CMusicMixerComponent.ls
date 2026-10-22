-- Behavior
property m_mp_TrackData
property m_rCurrentSample
property m_iSampleLength
property m_colInstrument
property m_mp_LongSamples
property m_imgSample
property m_imgLongSample1
property m_imgLongSample2
property m_ImgSymbol
property m_pSongList
property m_iEditMode
property m_iActiveSongID
property m_iFirstSoundChannel

on construct me
  m_mp_TrackData = [:]
  m_mp_LongSamples = [:]
  m_colInstrument = VOID
  m_rCurrentSample = VOID
  m_iSampleLength = VOID
  m_ImgSymbol = VOID
  m_pSongList = []
  m_imgSample = member(getmemnum("instrument.track.single")).image
  m_imgLongSample1 = member(getmemnum("instrument.track.left")).image
  m_imgLongSample2 = member(getmemnum("instrument.track.right")).image
  repeat with i = 1 to 4
    m_mp_TrackData.addProp(string(i), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    m_mp_LongSamples.addProp(string(i), [:])
  end repeat
  m_iEditMode = #none
  m_iActiveSongID = -1
  m_iFirstSoundChannel = 2
  return 1
end
on deconstruct me
  return 1
end
on setSongList me, i_ar_list, i_bOpenManager
  t_pOldSongList = m_pSongList.duplicate()
  t_ar_oldNames = []
  repeat with tSong in t_pOldSongList
    t_ar_oldNames.append(tSong.name)
  end repeat
  if i_ar_list.ilk = #list then
    m_pSongList = i_ar_list
    me.getInterface().setSongList(m_pSongList, i_bOpenManager)
    put t_pOldSongList & RETURN & m_pSongList
    if me.getEditingMode() = #new then
      repeat with i = 1 to m_pSongList.count
        tSong = m_pSongList[i]
        if t_ar_oldNames.getOne(tSong.name) = 0 then
          put "Found new at" && i && tSong
          me.setActiveSong(i)
          exit repeat
        end if
      end repeat
      me.setEditingMode(#edit)
    end if
  end if
end
on getSongList me, i_ar_list
  return m_pSongList
end
on editSong me, songIndex
  if songIndex <= m_pSongList.count then
    me.getHandler().LoadSong(m_pSongList[songIndex].id)
    me.setActiveSong(songIndex)
  end if
end
on getSongData me, songIndex
  if songIndex <= m_pSongList.count then
    return m_pSongList[songIndex]
  end if
  return []
end
on DeleteSong me, songIndex
  if m_iActiveSongID > 0 then
    if m_pSongList[songIndex] = m_pSongList[m_iActiveSongID] then
      me.setEditingMode(#none)
    end if
  end if
  if songIndex <= m_pSongList.count then
    me.getHandler().DeleteSong(m_pSongList[songIndex].id)
  end if
end
on getEditingMode me
  return m_iEditMode
end
on setEditingMode me, t_iEditMode
  case t_iEditMode of
    #none:
      me.setActiveSong(-1)
      me.ClearAll()
    #new:
      me.setActiveSong(-1)

  end case
  m_iEditMode = t_iEditMode
end
on getActiveSong me
  return m_iActiveSongID
end
on setActiveSong me, i_index
  m_iActiveSongID = i_index
end
on SelectedSample me, a_sInst, a_iSampleNum
  if memberExists(a_sInst & "_" & a_iSampleNum & "_" & 2) then
    m_rCurrentSample = member(getmemnum(a_sInst & "_" & a_iSampleNum & "_" & 2))
    m_iSampleLength = 2
  end if
  if memberExists(a_sInst & "_" & a_iSampleNum & "_" & 4) then
    m_rCurrentSample = member(getmemnum(a_sInst & "_" & a_iSampleNum & "_" & 4))
    m_iSampleLength = 4
  end if
  case a_sInst of
    "drm":
      tBtnColor = "red"
      t_Col = rgb("6F0000")
    "gtr":
      tBtnColor = "green"
      t_Col = rgb("5C8B00")
    "fx":
      tBtnColor = "blue"
      t_Col = rgb("008687")
    "bas":
      tBtnColor = "orange"
      t_Col = rgb("B05800")
    "snt":
      tBtnColor = "pink"
      t_Col = rgb("C20081")
    otherwise:
      t_Col = rgb(20, 30, 210)

  end case
  t_sSymbolNum = a_iSampleNum.char[a_iSampleNum.length]
  t_Img = member(getmemnum(tBtnColor & t_sSymbolNum & ".big")).image
  m_colInstrument = t_Col
  m_ImgSymbol = t_Img
end
on playBackControl me, a_sAction
  case a_sAction of
    "Play":
      me.SetUpPlaying()
      repeat with i = 1 to 5
        if objectp(sound(m_iFirstSoundChannel + i)) then
          sound(m_iFirstSoundChannel + i).play()
        end if
      end repeat
    "Stop":
      repeat with i = 1 to 5
        if objectp(sound(m_iFirstSoundChannel + i)) then
          sound(m_iFirstSoundChannel + i).stop()
        end if
      end repeat

  end case
end
on AddSample me, a_iTrack, a_iSlot
  if not voidp(a_iTrack) and not voidp(a_iSlot) then
    me.playBackControl("Stop")
    t_iNextPos = a_iSlot + 1
    t_iPrevPos = a_iSlot - 1
    t_iPos1 = m_mp_LongSamples[a_iTrack].findPos(t_iPrevPos)
    t_iPos2 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
    t_iPos3 = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos)
    t_iPos4 = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos + 1)
    if t_iPos1 > 0 then
      t1 = m_mp_LongSamples[a_iTrack][t_iPos1]
    else
      t1 = getUniqueID()
    end if
    if t_iPos2 > 0 then
      t2 = m_mp_LongSamples[a_iTrack][t_iPos2]
    else
      t2 = getUniqueID()
    end if
    if t_iPos3 > 0 then
      t3 = m_mp_LongSamples[a_iTrack][t_iPos3]
    else
      t3 = getUniqueID()
    end if
    if t_iPos4 > 0 then
      t4 = m_mp_LongSamples[a_iTrack][t_iPos4]
    else
      t4 = getUniqueID()
    end if
    if m_iSampleLength = 2 then
      if t1 = t2 then
        put 1
        m_mp_LongSamples[a_iTrack].deleteAt(t_iPos1)
        m_mp_TrackData[a_iTrack][t_iPrevPos] = 0
        me.interface.ChangeImage(a_iTrack, t_iPrevPos)
        t_iPos2 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
        m_mp_LongSamples[a_iTrack].deleteAt(t_iPos2)
        m_mp_TrackData[a_iTrack][a_iSlot] = 0
        me.interface.ChangeImage(a_iTrack, a_iSlot)
        m_mp_TrackData[a_iTrack][a_iSlot] = m_rCurrentSample
        me.interface.ChangeImage(a_iTrack, a_iSlot, m_colInstrument, m_imgSample, m_ImgSymbol)
        t_iPos1 = m_mp_LongSamples[a_iTrack].findPos(t_iPrevPos)
        t_iPos2 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
        t_iPos3 = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos)
        if t_iPos1 > 0 then
          t1 = m_mp_LongSamples[a_iTrack][t_iPos1]
        else
          t1 = getUniqueID()
        end if
        if t_iPos2 > 0 then
          t2 = m_mp_LongSamples[a_iTrack][t_iPos2]
        else
          t2 = getUniqueID()
        end if
        if t_iPos3 > 0 then
          t3 = m_mp_LongSamples[a_iTrack][t_iPos3]
        else
          t3 = getUniqueID()
        end if
      end if
      if t2 = t3 then
        put 2
        m_mp_LongSamples[a_iTrack].deleteAt(t_iPos3)
        m_mp_TrackData[a_iTrack][t_iNextPos] = 0
        me.interface.ChangeImage(a_iTrack, t_iNextPos)
        t_iPos2 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
        m_mp_LongSamples[a_iTrack].deleteAt(t_iPos2)
        m_mp_TrackData[a_iTrack][a_iSlot] = 0
        me.interface.ChangeImage(a_iTrack, a_iSlot)
        m_mp_TrackData[a_iTrack][a_iSlot] = m_rCurrentSample
        me.interface.ChangeImage(a_iTrack, a_iSlot, m_colInstrument, m_imgSample, m_ImgSymbol)
      end if
      m_mp_TrackData[a_iTrack][a_iSlot] = m_rCurrentSample
      me.interface.ChangeImage(a_iTrack, a_iSlot, m_colInstrument, m_imgSample, m_ImgSymbol)
    else
      if m_iSampleLength = 4 then
        if t_iNextPos < 17 then
          if t1 = t2 then
            m_mp_LongSamples[a_iTrack].deleteAt(t_iPos1)
            m_mp_TrackData[a_iTrack][t_iPrevPos] = 0
            me.interface.ChangeImage(a_iTrack, t_iPrevPos)
            t_iPos2 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
            m_mp_LongSamples[a_iTrack].deleteAt(t_iPos2)
            m_mp_TrackData[a_iTrack][a_iSlot] = 0
            me.interface.ChangeImage(a_iTrack, a_iSlot)
            t_iPos1 = m_mp_LongSamples[a_iTrack].findPos(t_iPrevPos)
            t_iPos2 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
            t_iPos3 = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos)
            t_iPos4 = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos + 1)
            if t_iPos1 > 0 then
              t1 = m_mp_LongSamples[a_iTrack][t_iPos1]
            else
              t1 = getUniqueID()
            end if
            if t_iPos2 > 0 then
              t2 = m_mp_LongSamples[a_iTrack][t_iPos2]
            else
              t2 = getUniqueID()
            end if
            if t_iPos3 > 0 then
              t3 = m_mp_LongSamples[a_iTrack][t_iPos3]
            else
              t3 = getUniqueID()
            end if
            if t_iPos4 > 0 then
              t4 = m_mp_LongSamples[a_iTrack][t_iPos4]
            else
              t4 = getUniqueID()
            end if
          end if
          if t2 = t3 then
            m_mp_TrackData[a_iTrack][t_iNextPos] = -1
            m_mp_LongSamples[a_iTrack].deleteAt(t_iPos3)
            me.interface.ChangeImage(a_iTrack, t_iNextPos)
            t_iPos2 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
            m_mp_TrackData[a_iTrack][a_iSlot] = -1
            m_mp_LongSamples[a_iTrack].deleteAt(t_iPos2)
            me.interface.ChangeImage(a_iTrack, a_iSlot)
            t_iPos1 = m_mp_LongSamples[a_iTrack].findPos(t_iPrevPos)
            t_iPos2 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
            t_iPos3 = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos)
            t_iPos4 = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos + 1)
            if t_iPos1 > 0 then
              t1 = m_mp_LongSamples[a_iTrack][t_iPos1]
            else
              t1 = getUniqueID()
            end if
            if t_iPos2 > 0 then
              t2 = m_mp_LongSamples[a_iTrack][t_iPos2]
            else
              t2 = getUniqueID()
            end if
            if t_iPos3 > 0 then
              t3 = m_mp_LongSamples[a_iTrack][t_iPos3]
            else
              t3 = getUniqueID()
            end if
            if t_iPos4 > 0 then
              t4 = m_mp_LongSamples[a_iTrack][t_iPos4]
            else
              t4 = getUniqueID()
            end if
          end if
          if t3 = t4 then
            m_mp_LongSamples[a_iTrack].deleteAt(t_iPos3)
            m_mp_TrackData[a_iTrack][t_iNextPos] = 0
            me.interface.ChangeImage(a_iTrack, t_iNextPos)
            t_iPos4 = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos + 1)
            m_mp_LongSamples[a_iTrack].deleteAt(t_iPos4)
            m_mp_TrackData[a_iTrack][t_iNextPos + 1] = 0
            me.interface.ChangeImage(a_iTrack, t_iNextPos + 1)
          end if
          t_sID = getUniqueID()
          m_mp_LongSamples[a_iTrack].addProp(a_iSlot, t_sID)
          m_mp_LongSamples[a_iTrack].addProp(t_iNextPos, t_sID)
          m_mp_TrackData[a_iTrack][t_iNextPos] = -1
          me.interface.ChangeImage(a_iTrack, t_iNextPos, m_colInstrument, m_imgLongSample2, m_ImgSymbol)
          m_mp_TrackData[a_iTrack][a_iSlot] = m_rCurrentSample
          me.interface.ChangeImage(a_iTrack, a_iSlot, m_colInstrument, m_imgLongSample1, m_ImgSymbol)
        else
          put "Too Long"
        end if
      end if
    end if
  end if
end
on RemoveSample me, a_iTrack, a_iSlot
  if not voidp(a_iTrack) and not voidp(a_iSlot) then
    me.playBackControl("Stop")
    if m_mp_TrackData[a_iTrack][a_iSlot] = -1 then
      t_iPrevPos = a_iSlot - 1
      if t_iPrevPos > 0 then
        m_mp_TrackData[a_iTrack][t_iPrevPos] = 0
        me.interface.ChangeImage(a_iTrack, t_iPrevPos, 0)
        t_iPos = m_mp_LongSamples[a_iTrack].findPos(t_iPrevPos)
        if t_iPos > 0 then
          m_mp_LongSamples[a_iTrack].deleteAt(t_iPos)
        end if
      end if
    else
      t_iNextPos = a_iSlot + 1
      if t_iNextPos < 17 then
        t_iNextSample = m_mp_TrackData[a_iTrack][t_iNextPos]
        if t_iNextSample = -1 then
          m_mp_TrackData[a_iTrack][t_iNextPos] = 0
          me.interface.ChangeImage(a_iTrack, t_iNextPos, 0)
          t_iPos = m_mp_LongSamples[a_iTrack].findPos(t_iNextPos)
          if t_iPos > 0 then
            m_mp_LongSamples[a_iTrack].deleteAt(t_iPos)
          end if
        end if
      end if
    end if
    m_mp_TrackData[a_iTrack][a_iSlot] = 0
    me.interface.ChangeImage(a_iTrack, a_iSlot, 0)
    t_iPos1 = m_mp_LongSamples[a_iTrack].findPos(a_iSlot)
    if t_iPos1 > 0 then
      m_mp_LongSamples[a_iTrack].deleteAt(t_iPos1)
    end if
  end if
end
on getSongType me, songname
  t_delim = the itemDelimiter
  the itemDelimiter = "_"
  t_item = songname.item[2]
  the itemDelimiter = t_delim
  return t_item.char[the length of t_item]
end
on getInstrumentType me, songname
  t_delim = the itemDelimiter
  the itemDelimiter = "_"
  t_item = songname.item[1]
  the itemDelimiter = t_delim
  return t_item
end
on SetTrackData me, t_pData
  me.ClearAll()
  t_ar_config = getVariableValue("samples.config")
  t_channelNum = 1
  me.ClearAll()
  t_ar_trackLengths = []
  repeat with t_channel in t_pData
    repeat while t_channel.count < 16
      t_channel.append(0)
    end repeat
  end repeat
  repeat with t_channel in t_pData
    t_trackData = []
    t_sampleNum = 1
    t_length = 0
    repeat with t_sample in t_channel
      if t_sample <> 0 then
        t_length = t_sampleNum
        t_error = 0
        if t_sample = -1 then
          lastData = t_pData[t_channelNum][t_sampleNum - 1]
          if lastData <> 0 then
            t_trackData.append(t_sample)
            t_imgSample = m_imgLongSample2
            t_memname = t_ar_config[lastData]
            t_mem = member(getmemnum(t_memname))
            t_sID = getUniqueID()
            m_mp_LongSamples[t_channelNum.string].addProp(t_sampleNum, t_sID)
            m_mp_LongSamples[t_channelNum.string].addProp(t_sampleNum - 1, t_sID)
          else
            t_error = 1
            t_trackData.append(0)
          end if
        else
          t_memname = t_ar_config[t_sample]
          t_mem = member(getmemnum(t_memname))
          if t_sampleNum < 16 then
            tNext = t_pData[t_channelNum][t_sampleNum + 1]
            if tNext = -1 then
              t_imgSample = m_imgLongSample1
            else
              t_imgSample = m_imgSample
            end if
          else
            t_imgSample = m_imgSample
          end if
          t_trackData.append(t_mem)
        end if
        if not t_error then
          t_sSymbolNum = me.getSongType(t_memname)
          a_sInst = me.getInstrumentType(t_memname)
          case a_sInst of
            "drm":
              tBtnColor = "red"
              t_Col = rgb("6F0000")
            "gtr":
              tBtnColor = "green"
              t_Col = rgb("5C8B00")
            "fx":
              tBtnColor = "blue"
              t_Col = rgb("008687")
            "bas":
              tBtnColor = "orange"
              t_Col = rgb("B05800")
            "snt":
              tBtnColor = "pink"
              t_Col = rgb("C20081")
            otherwise:
              t_Col = rgb(20, 30, 210)

          end case
          t_Img = member(getmemnum(tBtnColor & t_sSymbolNum & ".big")).image
          me.getInterface().ChangeImage(t_channelNum, t_sampleNum, t_Col, t_imgSample, t_Img)
        end if
      else
        t_trackData.append(t_sample)
      end if
      t_sampleNum = t_sampleNum + 1
    end repeat
    t_ar_trackLengths.append(t_length)
    m_mp_TrackData[t_channelNum.string] = t_trackData
    t_channelNum = t_channelNum + 1
  end repeat
  me.SetUpPlaying()
end
on GetTrackData me
  return m_mp_TrackData
end
on saveCurrentSong me, t_ar_songName
  t_ar_config = getVariableValue("samples.config")
  t_data = []
  t_shortData = []
  repeat with t_channel in m_mp_TrackData
    t_track = []
    repeat with t_sample in t_channel
      if t_sample <> 0 and t_sample <> -1 then
        t_index = t_ar_config.getOne(t_sample.name)
        t_sampleName = t_index
      else
        t_sampleName = t_sample
      end if
      t_track.append(t_sampleName)
    end repeat
    t_data.append(t_track)
    t_short = t_track.duplicate()
    repeat with t_index = t_short.count down to 1
      if t_short[t_index] = 0 then
        t_short.deleteAt(t_index)
        next repeat
      end if
      exit repeat
    end repeat
    t_shortData.append(t_short)
  end repeat
  t_sendData = replaceChunks(t_shortData.string, " ", EMPTY)
  if me.getEditingMode() = #edit then
    me.getHandler().SaveSong(me.getActiveSong() - 1, t_ar_songName, t_sendData)
  else
    if me.getEditingMode() = #new then
      me.getHandler().CreateSong(t_ar_songName, t_sendData)
    end if
  end if
end
on ClearAll me
  repeat with i = 1 to m_mp_TrackData.count
    repeat with e = 1 to m_mp_TrackData[i].count
      if m_mp_TrackData[i][e] <> 0 then
        me.RemoveSample(i, e)
      end if
    end repeat
  end repeat
  m_mp_TrackData = [:]
  m_mp_LongSamples = [:]
  repeat with i = 1 to 4
    m_mp_TrackData.addProp(string(i), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    m_mp_LongSamples.addProp(string(i), [:])
  end repeat
end
on StartPreview me, a_sInst, a_iSampleNum
  if memberExists(a_sInst & "_" & a_iSampleNum & "_" & 2) then
    t_rCurrentSample = member(getmemnum(a_sInst & "_" & a_iSampleNum & "_" & 2))
  end if
  if memberExists(a_sInst & "_" & a_iSampleNum & "_" & 4) then
    t_rCurrentSample = member(getmemnum(a_sInst & "_" & a_iSampleNum & "_" & 4))
  end if
  if t_rCurrentSample <> 0 then
    sound(m_iFirstSoundChannel + 6).setPlayList([])
    sound(m_iFirstSoundChannel + 6).queue(t_rCurrentSample)
    sound(m_iFirstSoundChannel + 6).play(t_rCurrentSample)
  else
    put "Could not find sample" && [a_sInst, a_iSampleNum]
  end if
end
on SetUpPlaying me, a_iTrack
  t_rEmptyMem = member(getmemnum("emptySnd"))
  if not voidp(a_iTrack) then
    a_iTrack = value(a_iTrack)
    sound(m_iFirstSoundChannel + a_iTrack).setPlayList([])
    repeat with e = 1 to 16
      t_rMem = m_mp_TrackData[a_iTrack][e]
      if t_rMem = 0 then
        t_rMem = t_rEmptyMem
      end if
      if t_rMem <> -1 then
        sound(m_iFirstSoundChannel + a_iTrack).queue(t_rMem)
      end if
    end repeat
  else
    repeat with i = 1 to 4
      sound(m_iFirstSoundChannel + i).setPlayList([])
      repeat with e = 1 to 16
        t_rMem = m_mp_TrackData[i][e]
        if t_rMem = 0 then
          t_rMem = t_rEmptyMem
        end if
        if t_rMem <> -1 then
          sound(m_iFirstSoundChannel + i).queue(t_rMem)
        end if
      end repeat
    end repeat
    sound(m_iFirstSoundChannel + 5).setPlayList([])
    repeat with g = 1 to 17
      if g = 16 then
        rtshft = -8
      else
        rtshft = 0
      end if
      sound(m_iFirstSoundChannel + 5).queue([#member: t_rEmptyMem, #startTime: 0, #endTime: 1777, #loopStartTime: 0, #loopEndTime: 1777, #loopCount: 1, #preloadTime: 1777, #rateShift: rtshft])
    end repeat
  end if
end