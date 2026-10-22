-- Behavior
property m_ar_framelist
property m_ar_soundList
property m_iLoopStart
property m_iLoopEnd
property m_iLoopCount
property m_bFreeze
property m_bStopped

on construct me
  m_ar_framelist = []
  m_ar_soundList = [:]
  m_iLoopStart = 0
  m_iLoopEnd = 0
  m_iLoopCount = 0
  m_bFreeze = 0
  m_bStopped = 1
  return 1
end
on deconstruct me
  return 1
end
on load me, i_ar_framelist, i_iLoopStart, i_iLoopEnd, i_iLoopCount, i_bFreeze, i_ar_soundList
  m_ar_framelist = i_ar_framelist
  m_iLoopCount = i_iLoopCount
  m_iLoopStart = i_iLoopStart
  m_iLoopEnd = i_iLoopEnd
  m_bFreeze = i_bFreeze
  if not voidp(i_ar_soundList) then
    m_ar_soundList = [:]
    if i_ar_soundList.count <> 0 then
      repeat with i = 1 to i_ar_soundList.count
        prop = i_ar_soundList.getPropAt(i)
        m_ar_soundList[prop] = [:]
        m_ar_soundList[prop][#name] = i_ar_soundList[i]
        m_ar_soundList[prop][#playcount] = 0
      end repeat
    end if
  end if
end
on resetSounds me
  if m_ar_soundList.count <> 0 then
    repeat with snd in m_ar_soundList
      snd[#playcount] = 0
    end repeat
  end if
end
on getAt me, i_iframe
  tFrameNum = 1
  if i_iframe > m_iLoopEnd and m_iLoopCount <> 0 then
    tLoopLength = integer(m_iLoopEnd - m_iLoopStart) + 1
    tTimesOver = (i_iframe - m_iLoopEnd) / tLoopLength
    if tTimesOver > m_iLoopCount then
      tFrameNum = i_iframe - (m_iLoopCount + 1) * tLoopLength
    else
      if tTimesOver <> 0 then
        tFrameNum = m_iLoopStart + (i_iframe - m_iLoopEnd - tLoopLength * tTimesOver)
      else
        tFrameNum = m_iLoopStart + (i_iframe - m_iLoopEnd)
      end if
    end if
  else
    tFrameNum = i_iframe
  end if
  if not voidp(m_ar_soundList.getaProp(string(tFrameNum))) then
    snd = m_ar_soundList[string(tFrameNum)]
    snd.playcount = snd.playcount + 1
    if snd.playcount <= 1 then
      executeMessage("PlayFxSound", snd.name)
    end if
  end if
  if tFrameNum > m_ar_framelist.count then
    if m_bFreeze then
      tFrameNum = m_ar_framelist.count
    else
      return EMPTY
    end if
    m_bStopped = 1
  else
    m_bStopped = 0
  end if
  return m_ar_framelist[tFrameNum]
end