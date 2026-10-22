-- Script
property pChannelNum
property pDurationLeft
property pCounter

on Define me, tChannelNum
  pChannelNum = tChannelNum
  tChannel = sound(pChannelNum)
  if ilk(tChannel) <> #instance then
    return error(me, "Invalid sound channel:" && pChannelNum, #play)
  end if
  pDurationLeft = 0
  pCounter = 0
  return 1
end
on reset me
  tChannel = sound(pChannelNum)
  tChannel.setPlayList([])
  tChannel.stop()
  return 1
end
on play me, tSoundObj
  tmember = tSoundObj.getMember()
  if tmember = 0 then
    return 0
  end if
  tChannel = sound(pChannelNum)
  if tSoundObj.getProperty(#infiniteloop) then
    tLoopCount = the maxinteger
  else
    tLoopCount = tSoundObj.getProperty(#loopCount)
  end if
  if tLoopCount <> VOID then
    tChannel.loopCount = tLoopCount
  else
    tLoopCount = 1
  end if
  tVolume = tSoundObj.getProperty(#volume)
  if tVolume <> VOID then
  end if
  pDurationLeft = pDurationLeft + tmember.duration * tLoopCount
  tChannel.play(tmember)
  return 1
end
on queue me, tSoundObj
  tmember = tSoundObj.getMember()
  if tmember = 0 then
    return 0
  end if
  tChannel = sound(pChannelNum)
  tChannel.queue(tmember)
  return 1
end
on getTimeRemaining me
  tChannel = sound(pChannelNum)
  if not tChannel.isBusy() then
    return 0
  end if
  return pDurationLeft
end
on countTimeRemaining me
  pCounter = pCounter + 10
  pDurationLeft = pDurationLeft - pCounter
  if pDurationLeft > 0 then
    me.delay(10, #countTimeRemaining)
  else
    pDurationLeft = 0
  end if
  put pDurationLeft
end
on dump me
  tChannel = sound(pChannelNum)
  tName = "<none>"
  if tChannel.isBusy() then
    tName = tChannel.member.name
  end if
  put "* Channel" && pChannelNum & " - Playtime left:" && me.getTimeRemaining() && "Now playing:" && tName && "Queue:" && tChannel.getPlaylist().count
  if tChannel.isBusy() then
    me.delay(700, #dump)
  end if
end