-- Behavior
property m_TmrTracker
property m_CurrentTime
property m_PanCounter
property m_mp_SoundProperties
property m_mpSoundData
property m_mpEndTime
property m_arLoopChannels
property m_iMasterLoopCount
property m_ar_OneShot
property m_mp_SndTypes
property m_sRoomName
property m_bMusic
property m_bFx
property m_iVolume

on construct me
  registerMessage("LoadRoomSound", me.getID(), #StartRoomSounds)
  registerMessage("StopRoomSound", me.getID(), #StopRoomSounds)
  registerMessage("ResetRoomSound", me.getID(), #ResetRoomSounds)
  registerMessage("ResetFXChannels", me.getID(), #ResetFXChannels)
  registerMessage(#room_ready, me.getID(), #StartRoomSounds)
  registerMessage("room_leave", me.getID(), #StopRoomSounds)
  m_TmrTracker = "trackerTimer"
  m_CurrentTime = 0.0
  m_PanCounter = 0
  m_mpSoundData = [:]
  m_mp_SoundProperties = [:]
  m_ar_OneShot = [:]
  m_mp_SndTypes = [:]
  m_mpEndTime = VOID
  m_arLoopChannels = VOID
  m_bStatus = VOID
  m_sRoomName = VOID
  m_iMasterLoopCount = 0
  m_bMusic = getObject(#session).get("music")
  m_bFx = getObject(#session).get("fx")
  m_iVolume = getObject(#session).get("volume")
  me.resetSettings()
  return 1
end
on deconstruct me
  unregisterMessage("LoadRoomSound")
  unregisterMessage("StopRoomSound")
  unregisterMessage("ResetRoomSound")
  unregisterMessage(#room_ready)
  unregisterMessage("room_leave")
  if timeoutExists(m_TmrTracker) then
    removeTimeout(m_TmrTracker)
  end if
  me.resetSettings()
  return 1
end
on ResetRoomSounds me
  m_bMusic = getObject(#session).get("music")
  m_bFx = getObject(#session).get("fx")
  m_iVolume = getObject(#session).get("volume")
  me.StartRoomSounds()
end
on StartRoomSounds me, a_sRoomName
  if m_iVolume = 0 then
    me.StopRoomSounds()
  else
    if m_bFx = 0 and m_bMusic = 0 then
      me.StopRoomSounds()
    else
      m_TmrTracker = "trackerTimer"
      m_CurrentTime = 0.0
      m_PanCounter = 0
      m_mpSoundData = [:]
      m_mp_SoundProperties = [:]
      m_mp_SndTypes = [:]
      m_mpEndTime = VOID
      m_arLoopChannels = VOID
      m_sRoomName = a_sRoomName
      if timeoutExists(m_TmrTracker) then
        removeTimeout(m_TmrTracker)
      end if
      if memberExists(a_sRoomName & "sound.xml") then
        me.ParseSounds(a_sRoomName & "sound.xml")
      else
        if memberExists("Sound.xml") then
          me.ParseSounds("Sound.xml")
        end if
      end if
      if memberExists(a_sRoomName & "Tracker" & ".xml") then
        me.parseTrackerData(a_sRoomName & "Tracker" & ".xml")
      else
        if memberExists("Tracker.xml") then
          me.parseTrackerData("Tracker.xml")
        end if
      end if
    end if
  end if
end
on StopRoomSounds me
  m_TmrTracker = "trackerTimer"
  m_CurrentTime = 0.0
  m_PanCounter = 0
  m_mpSoundData = [:]
  m_mp_SoundProperties = [:]
  m_mpEndTime = VOID
  m_arLoopChannels = VOID
  if timeoutExists(m_TmrTracker) then
    removeTimeout(m_TmrTracker)
  end if
  me.resetSettings()
end
on ParseSounds me, a_sSoundList
  if memberExists(a_sSoundList) then
    m_mp_SoundProperties = [:]
    t_rDocXML = CreateXML()
    t_mem = member(getmemnum(a_sSoundList)).text
    t_rDocXML.open(t_mem)
    if t_rDocXML.Search("type", "SOUNDS") then
      t_rSOundList = t_rDocXML.GetNode()
      t_iSoundCount = t_rSOundList.child.count
      repeat with i = 1 to t_iSoundCount
        t_mp_Child = t_rSOundList.child[i]
        if t_mp_Child.param.findPos("member") then
          t_sName = t_mp_Child.param["member"]
          if memberExists(t_sName) then
            t_arList = [#member: member(getmemnum(t_sName))]
          else
            return error(me, "No such Member:" && t_sName, #ParseSounds)
          end if
        else
          return error(me, "Sound name Missing:" && the param of t_mp_Child, #ParseSounds)
        end if
        repeat with e = 2 to t_mp_Child.param.count
          t_kSymbol = symbol(t_mp_Child.param.getPropAt(e))
          t_iValue = value(t_mp_Child.param[e])
          t_arList[t_kSymbol] = t_iValue
        end repeat
        m_mp_SoundProperties[t_sName] = t_arList
      end repeat
    end if
  else
  end if
end
on parseTrackerData me, a_sTrackerData
  if memberExists(a_sTrackerData) then
    t_rDocXML = CreateXML()
    t_mem = member(getmemnum(a_sTrackerData)).text
    t_rDocXML.open(t_mem)
    if t_rDocXML.Search("type", "CHANNELS") then
      t_rSOundList = t_rDocXML.GetNode()
      t_iSoundCount = t_rSOundList.child.count
      m_mpSoundData = [:]
      repeat with i = 1 to t_iSoundCount
        t_mpChild = t_rSOundList.child[i]
        t_iChildCount = t_mpChild.child.count
        t_iChannelNo = value(t_mpChild[#param]["ID"])
        repeat with e = 1 to t_iChildCount
          t_sName = t_mpChild.child[e][#param]["NAME"]
          t_sStart = t_mpChild.child[e][#param]["START"]
          t_sType = t_mpChild.child[e][#param]["TYPE"]
          t_iLoopFreq = value(t_mpChild.child[e][#param]["LOOPFREQ"])
          t_iPanFreq = value(t_mpChild.child[e][#param]["PANFREQ"])
          t_iVolFreq = value(t_mpChild.child[e][#param]["VOLFREQ"])
          t_iLength = value(t_mpChild.child[e][#param]["PREF"])
          t_arOneShot = value(t_mpChild.child[e][#param]["ONESHOT"])
          if m_mpSoundData.findPos(t_sStart) then
            m_mpSoundData[t_sStart].add([t_sName, t_iChannelNo, t_sType, t_iLength])
          else
            m_mpSoundData[t_sStart] = []
            m_mpSoundData[t_sStart].add([t_sName, t_iChannelNo, t_sType, t_iLength])
          end if
          case t_sType of
            "music", "fx", "Music", "FX", "Fx", "sound":
              m_mp_SndTypes.addProp(t_sName, t_sType)

          end case
          if not voidp(t_iLoopFreq) then
            me.setLoopFrequent(t_sName, t_iChannelNo, t_iLoopFreq, t_sType)
          end if
          if not voidp(t_arOneShot) then
            m_ar_OneShot.addProp(t_sStart, [[t_sName, t_iChannelNo, t_sType, t_iLength], t_arOneShot])
          end if
          if not voidp(t_iPanFreq) then
            t_iMin = t_iPanFreq[1]
            t_iMax = t_iPanFreq[2]
            t_iDuration = t_iPanFreq[3]
            me.startPanLoop(t_iChannelNo, t_iMin, t_iMax, t_iDuration, "Pan")
          end if
          if not voidp(t_iVolFreq) then
            t_iMin = t_iVolFreq[1]
            t_iMax = t_iVolFreq[2]
            t_iDuration = t_iVolFreq[3]
            me.startPanLoop(t_iChannelNo, t_iMin, t_iMax, t_iDuration, "Vol")
          end if
        end repeat
      end repeat
      m_mpEndTime = value(t_rSOundList.child[t_iSoundCount][#param]["TIME"])
      if voidp(m_mpEndTime) then
        put "EndTime Not Set for sounds!"
      end if
      me.timerStart()
    end if
  else
  end if
end
on timerStart me
  if timeoutExists(m_TmrTracker) then
    removeTimeout(m_TmrTracker)
  end if
  m_CurrentTime = 0.0
  createTimeout(m_TmrTracker, 100, #TrackerEvent, me.getID(), VOID, 0)
end
on TrackerEvent me
  t_FloatPre = the floatPrecision
  set the floatPrecision to 1
  m_CurrentTime = m_CurrentTime + 1.44999992847443
  t_iPos = m_mpSoundData.findPos(string(m_CurrentTime))
  set the floatPrecision to t_FloatPre
  if m_CurrentTime >= m_mpEndTime then
    me.ResetTracker()
  end if
  if t_iPos <> 0 then
    repeat with i = 1 to m_mpSoundData[t_iPos].count
      t_Snd = m_mpSoundData[t_iPos][i][1]
      t_iChannel = m_mpSoundData[t_iPos][i][2]
      t_sType = m_mpSoundData[t_iPos][i][3]
      t_arPref = m_mpSoundData[t_iPos][i][4]
      if not voidp(m_arLoopChannels) then
        t_iData = m_arLoopChannels.findPos(t_iChannel)
      end if
      if t_iData = 0 then
        case t_sType of
          "sound", "music", "fx", "Music", "FX":
            if objectp(sound(t_iChannel)) then
              if sound(t_iChannel).getPlaylist() <> [] then
                sound(t_iChannel).stop()
                t_SndData = value(m_mp_SoundProperties[t_Snd])
                sound(t_iChannel).setPlayList(t_SndData)
                if not voidp(t_SndData) then
                  t_bStatus = me.CheckTypeStatus(t_SndData[#member])
                  if t_bStatus then
                    call(#play, [sound(t_iChannel)])
                    if sound(t_iChannel).volume > m_iVolume then
                      sound(t_iChannel).volume = m_iVolume
                    end if
                  end if
                end if
              else
                if memberExists(t_Snd) then
                  t_SndData = value(m_mp_SoundProperties[t_Snd])
                  if not voidp(t_SndData) and objectp(sound(t_iChannel)) then
                    t_bStatus = me.CheckTypeStatus(t_SndData[#member])
                    if t_bStatus then
                      call(#queue, [sound(t_iChannel)], t_SndData)
                      call(#play, [sound(t_iChannel)])
                      if sound(t_iChannel).volume > m_iVolume then
                        sound(t_iChannel).volume = m_iVolume
                      end if
                    end if
                  end if
                else
                end if
              end if
            end if
          "fade":
            t_iDuration = t_arPref[1]
            sound(t_iChannel).fadeOut(t_iDuration)
          "vol":
            if t_arPref.count = 3 then
              me.EventTimer(["channel": t_iChannel, "min": t_arPref[1], "max": t_arPref[2], "event": t_sType, "time": t_arPref[3]])
            else
              t_iVol = t_arPref[1]
              if t_iVol > m_iVolume then
                t_iVol = m_iVolume
              end if
              sound(t_iChannel).volume = t_iVol
            end if
          "pan":
            if t_arPref.count = 3 then
              me.EventTimer(["channel": t_iChannel, "min": t_arPref[1], "max": t_arPref[2], "event": t_sType, "time": t_arPref[3]])
            else
              sound(t_iChannel).pan = t_arPref[1]
            end if

        end case
      end if
    end repeat
  end if
end
on EventTimer me, a_mpSoundData
  if listp(a_mpSoundData) then
    t_iSndChn = a_mpSoundData
    t_iChn = a_mpSoundData["channel"]
    t_sID = "sndEvent" & t_iChn
    t_iTime = a_mpSoundData["time"] / 50
    tEvent = a_mpSoundData["event"]
    if timeoutExists(t_sID) then
      removeTimeout(t_sID)
    end if
    case tEvent of
      "vol":
        t_iVol = a_mpSoundData["min"]
        if t_iVol > m_iVolume then
          t_iVol = m_iVolume
        end if
        sound(t_iChn).volume = t_iVol
      "pan":
        sound(t_iChn).pan = a_mpSoundData["min"]

    end case
    a_mpSoundData["count"] = 0
    createTimeout(t_sID, t_iTime, #SoundEvent, me.getID(), a_mpSoundData, 50)
  else
    return error(me, "Sound data Missing:" && a_mpSoundData, #EventTimer)
  end if
end
on SoundEvent me, a_mpSoundData
  if listp(a_mpSoundData) then
    a_mpSoundData["count"] = a_mpSoundData["count"] + 1
    tEvent = a_mpSoundData["event"]
    t_iCount = a_mpSoundData["count"]
    case tEvent of
      "vol":
        t_iMin = a_mpSoundData["min"]
        t_iMax = a_mpSoundData["max"]
        t_iChn = a_mpSoundData["channel"]
        t_iVol = (t_iMax - t_iMin) / 50
        t_iVol = sound(t_iChn).volume + t_iVol
        if t_iVol > m_iVolume then
          t_iVol = m_iVolume
        end if
        sound(t_iChn).volume = t_iVol
      "pan":
        t_iMin = a_mpSoundData["min"]
        t_iMax = a_mpSoundData["max"]
        t_iChn = a_mpSoundData["channel"]
        t_iPan = (t_iMax - t_iMin) / 50
        if t_iMax > t_iMin then
          t_iPan = 0 - t_iPan
        end if
        sound(t_iChn).pan = sound(t_iChn).pan + t_iPan

    end case
  else
    return error(me, "Sound data Missing:" && a_mpSoundData, #SoundEvent)
  end if
end
on resetSettings me
  m_iVolume = getObject(#session).get("volume")
  repeat with i = 4 to 8
    sound(i).pan = 0
    sound(i).volume = m_iVolume
    sound(i).stop()
    t_sID = "sndEvent" & i
    if timeoutExists(t_sID) then
      removeTimeout(t_sID)
    end if
    t_sID = "PanEvent" & i
    if timeoutExists(t_sID) then
      removeTimeout(t_sID)
    end if
    t_sID = "VolEvent" & i
    if timeoutExists(t_sID) then
      removeTimeout(t_sID)
    end if
  end repeat
end
on setLoopFrequent me, a_SndName, a_ichannelNo, a_iFrequent, a_sType
  t_FloatPre = the floatPrecision
  set the floatPrecision to 1
  t_SndDuration = member(getmemnum(a_SndName)).duration / 1000
  t_iNewTime = m_CurrentTime + a_iFrequent + t_SndDuration
  repeat with i = 1 to 50
    if m_mpSoundData.findPos(string(t_iNewTime)) then
      m_mpSoundData[string(t_iNewTime)].add([a_SndName, a_ichannelNo, a_sType, VOID])
    else
      m_mpSoundData[string(t_iNewTime)] = []
      m_mpSoundData[string(t_iNewTime)].add([a_SndName, a_ichannelNo, a_sType, VOID])
    end if
    t_iNewTime = t_iNewTime + a_iFrequent
  end repeat
  set the floatPrecision to t_FloatPre
end
on startPanLoop me, a_ichannelNo, a_iMin, a_iMax, a_iTime, a_sType
  t_iTime = a_iTime / 50
  t_iPan = (a_iMax - a_iMin) / 50
  if a_iMax > a_iMin then
    t_iPan = 0 - t_iPan
  end if
  t_arPanData = [a_ichannelNo, t_iPan, a_sType]
  t_sID = a_sType & "Event" & a_ichannelNo
  if timeoutExists(t_sID) then
    removeTimeout(t_sID)
  end if
  createTimeout(t_sID, t_iTime, #panLoop, me.getID(), t_arPanData, VOID)
end
on panLoop me, a_arPanData
  t_iChannelNo = a_arPanData[1]
  t_iAmount = a_arPanData[2]
  t_sType = a_arPanData[3]
  if m_PanCounter > 50 then
    if t_iAmount < 0 then
      t_iAmount = abs(t_iAmount)
    else
      t_iAmount = t_iAmount - 2 * t_iAmount
    end if
  end if
  if m_PanCounter >= 99 then
    m_PanCounter = 0
  end if
  m_PanCounter = m_PanCounter + 1
  case t_sType of
    "Pan":
      t_iPan = sound(t_iChannelNo).pan
      t_iPanAmount = t_iPan + t_iAmount
      sound(t_iChannelNo).pan = t_iPanAmount
    "Vol":
      t_iVol = sound(t_iChannelNo).volume
      t_iVolAmount = t_iVol + t_iAmount
      if t_iVolAmount > m_iVolume then
        t_iVolAmount = m_iVolume
      end if
      sound(t_iChannelNo).volume = t_iVolAmount

  end case
end
on CheckTypeStatus me, a_memSnd
  t_iPos = m_mp_SndTypes.findPos(a_memSnd.name)
  if not voidp(t_iPos) then
    a_sType = m_mp_SndTypes[t_iPos]
  else
    a_sType = VOID
  end if
  case a_sType of
    "music", "Music", "sound":
      t_bSetting = getObject(#session).get("music")
      if t_bSetting then
        return 1
      else
        return 0
      end if
    "ui", "UI", "Ui":
      t_bSetting = getObject(#session).get("ui")
      if t_bSetting then
        return 1
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
  return 0
end
on ResetTracker me
  m_arLoopChannels = []
  repeat with i = 1 to 8
    if sound(i).loopCount > 0 then
      m_arLoopChannels.add(i)
    end if
  end repeat
  if m_ar_OneShot.count > 0 then
    repeat with f = 1 to m_ar_OneShot.count
      t_iPos = m_mpSoundData.findPos(m_ar_OneShot.getPropAt(f))
      t_ar_List = m_ar_OneShot[f]
      if t_ar_List[2].findPos(m_iMasterLoopCount) <> VOID then
        if t_iPos > 0 then
          m_mpSoundData[t_iPos].add(t_ar_List[1])
        end if
        next repeat
      end if
      if t_iPos > 0 then
        repeat with e = 1 to m_mpSoundData[t_iPos].count
          if m_mpSoundData[t_iPos][e][1] = m_ar_OneShot[f][1][1] then
            m_mpSoundData[t_iPos].deleteAt(e)
            exit repeat
          end if
        end repeat
      end if
    end repeat
  end if
  m_iMasterLoopCount = m_iMasterLoopCount + 1
  m_CurrentTime = 0.0
  m_mp_SndTypes = [:]
end
on ResetFXChannels me
  m_iVolume = getObject(#session).get("volume")
  repeat with i = 1 to 3
    sound(i).pan = 0
    sound(i).volume = m_iVolume
  end repeat
end