-- Script
property pStatus
property pMemName
property pMember
property pProps

on Define me, tMemName, tPriority, tProps
  pMemName = tMemName
  pMember = member(getmemnum(tMemName))
  if pMember.type <> #sound then
    return error(me, "Sound member not found or not a sound:" && tMemName, #Define)
  end if
  pPriority = tPriority
  pProps = tProps
  return 1
end
on getProperty me, tProp
  if not listp(tProp) then
    return 0
  end if
  case tProp of
    #loopCount:
      return pProps[#loopCount]
    #infiniteloop:
      return pProps[#infiniteloop]
    #volume:
      return pProps[#volume]

  end case
  return 0
end
on getMember me
  return pMember
end