-- Script
property pChannelCount
property pChannelList
property pMuted

on construct me
  pMuted = 0
  pChannelCount = 4
  pChannelList = []
  repeat with i = 1 to pChannelCount
    tObject = createObject(#temp, "Sound Channel Class")
    if tObject.Define(i) then
      pChannelList.add(tObject)
    end if
  end repeat
  registerMessage(#set_all_sounds, me.getID(), #setAllSounds)
end
on deconstruct me
  unregisterMessage(#set_all_sounds, me.getID())
  repeat with i = 1 to pChannelCount
    tObject = me.getChannel(i)
    if tObject <> 0 then
      tObject.reset()
    end if
  end repeat
  pChannelList = VOID
  pChannelCount = VOID
  return 1
end
on getProperty me, tPropID
  case tPropID of
    #channelCount:
      return the count of pChannelList

  end case
  return 0
end
on setProperty me, tPropID, tvalue
  -- ERROR: Could not identify jmp
  return 0
end
on getChannel me, tNum
  if tNum < 0 or tNum > pChannelList.count then
    return 0
  end if
  return pChannelList[tNum]
end
on print me, tCount
  if integerp(tCount) then
  end if
end
on play me, tMemName, tPriority, tProps
  if pMuted then
    return 1
  end if
  tObject = me.createSoundInstance(tMemName, tPriority, tProps)
  case tPriority of
    #pass, VOID:
      repeat with i = 1 to pChannelCount
        tStatus = pChannelList[i].getTimeRemaining()
        if tStatus = 0 then
          return pChannelList[i].play(tObject)
        end if
      end repeat
      return 0
    #cut:
      tStatusList = [:]
      repeat with i = 1 to pChannelCount
        tStatus = pChannelList[i].getTimeRemaining()
        if tStatus = 0 then
          return pChannelList[i].play(tObject)
        end if
        tStatusList.addProp(tStatus, i)
      end repeat
      tStatusList.sort()
      return pChannelList[tStatusList[1]].play(tObject)
    #queue:
      tStatusList = [:]
      repeat with i = 1 to pChannelCount
        tStatus = pChannelList[i].getTimeRemaining()
        if tStatus = 0 then
          return pChannelList[i].play(tObject)
        end if
        tStatusList.addProp(tStatus, i)
      end repeat
      tStatusList.sort()
      return pChannelList[tStatusList[1]].queue(tObject)

  end case
  tObject = VOID
  return 0
end
on StopSound me, tID
  repeat with i = 1 to pChannelCount
    pChannelList[i].cancel(tID)
  end repeat
  return 1
end
on setAllSounds me, tvalue
  if tvalue then
    pMuted = 0
  else
    pMuted = 1
    repeat with i = 1 to pChannelCount
      pChannelList[i].reset()
    end repeat
  end if
  return 1
end
on createSoundInstance me, tMemName, tPriority, tProps
  tObject = createObject(#temp, "Sound Instance Class")
  if tObject = 0 then
    return 0
  end if
  tObject.Define(tMemName, tPriority, tProps)
  return tObject
end