-- Movie Script
property m_ar_sPopulus

on construct me
  m_ar_sPopulus = []
  tMsgs = [:]
  tMsgs.setaProp(2582, #CreateAvatar)
  tMsgs.setaProp(2589, #RemoveAvatar)
  registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  registerMessage(#room_leave, me.getID(), #ClearAll)
end
on deconstruct me
  m_ar_sPopulus = []
  tMsgs = [:]
  tMsgs.setaProp(2582, #CreateAvatar)
  tMsgs.setaProp(2589, #RemoveAvatar)
  unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  unregisterMessage(#room_leave, me.getID())
end
on AddOne me, i_string
  m_ar_sPopulus.add(i_string)
end
on RemoveOne me, i_string
  m_ar_sPopulus.deleteOne(i_string)
end
on FirstCharToUpper me, a_cWord
  tNum = charToNum(a_cWord.char[1])
  if tNum >= 97 and tNum <= 122 then
    return string(numToChar(tNum - 32)) & chars(a_cWord, 2, the length of a_cWord)
  else
    return a_cWord
  end if
end
on FirstCharToLower me, a_cWord
  tNum = charToNum(a_cWord.char[1])
  if tNum >= 65 and tNum <= 90 then
    return string(numToChar(tNum + 32)) & chars(a_cWord, 2, the length of a_cWord)
  else
    return a_cWord
  end if
end
on ClearAll me
  m_ar_sPopulus = []
  SetCannedFreeWordList([])
end
on CreateAvatar me, a_rMsg
  t_rInput = a_rMsg.connection
  t_iCount = t_rInput.GetIntFrom()
  repeat with i = 1 to t_iCount
    t_sName = t_rInput.GetStrFrom()
    t_iSex = t_rInput.GetIntFrom()
    t_sDesc = t_rInput.GetStrFrom()
    t_ar_iFigure = []
    repeat with j = 1 to 12
      t_ar_iFigure.append(t_rInput.GetIntFrom())
    end repeat
    t_iPins = t_rInput.GetIntFrom()
    t_ar_ar_iPins = []
    repeat with j = 1 to t_iPins
      t_iCode = t_rInput.GetIntFrom()
      t_iLevel = t_rInput.GetIntFrom()
      t_iSingleUse = t_rInput.GetIntFrom()
      t_ar_ar_iPins.add([t_iCode, t_iLevel, t_iSingleUse])
    end repeat
    t_iIcons = t_rInput.GetIntFrom()
    t_ar_iIcons = []
    repeat with j = 1 to t_iIcons
      t_iCode = t_rInput.GetIntFrom()
      t_ar_iIcons.add(t_iCode)
    end repeat
    t_iRef = t_rInput.GetIntFrom()
    t_iTile = t_rInput.GetIntFrom()
    t_iStack = t_rInput.GetIntFrom()
    t_ar_iActions = []
    repeat with j = 1 to 12
      t_ar_iActions.add(t_rInput.GetIntFrom())
    end repeat
    me.AddOne(t_sName)
  end repeat
  t_ar_nameList = GetCannedFreeWordList()
  repeat with t_sName in m_ar_sPopulus
    if t_ar_nameList.getOne(t_sName) = 0 then
      me.padNameForDictionary(t_sName, t_ar_nameList)
    end if
  end repeat
  SetCannedFreeWordList(t_ar_nameList)
end
on RemoveAvatar me, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_rAvatar = getThread("room").component._AccessRoom()._AccessIndexed(t_iRef, "avatar")
  if not voidp(t_rAvatar) then
    t_sName = t_rAvatar.GetParam("NAME")
    me.RemoveOne(t_sName)
    t_ar_nameList = GetCannedFreeWordList()
    if t_ar_nameList.getOne(t_sName) <> 0 then
      me.removeNameFromDictionary(t_sName, t_ar_nameList)
    end if
    SetCannedFreeWordList(t_ar_nameList)
  end if
end
on padNameForDictionary me, t_sName, o_ar_WordList
  o_ar_WordList.append(t_sName)
  o_ar_WordList.append(t_sName & "s")
  o_ar_WordList.append(t_sName & "'s")
  tNum = charToNum(t_sName.char[1])
  if tNum >= 65 and tNum <= 90 then
    o_ar_WordList.append(me.FirstCharToLower(t_sName))
    o_ar_WordList.append(me.FirstCharToLower(t_sName & "s"))
    o_ar_WordList.append(me.FirstCharToLower(t_sName & "'s"))
  else
    o_ar_WordList.append(me.FirstCharToUpper(t_sName))
    o_ar_WordList.append(me.FirstCharToUpper(t_sName & "s"))
    o_ar_WordList.append(me.FirstCharToUpper(t_sName & "'s"))
  end if
  o_ar_WordList.append(convertToLowerCase(t_sName))
  o_ar_WordList.append(convertToLowerCase(t_sName) & "s")
  o_ar_WordList.append(convertToLowerCase(t_sName) & "'s")
end
on removeNameFromDictionary me, t_sName, o_ar_WordList
  o_ar_WordList.deleteOne(t_sName)
  o_ar_WordList.deleteOne(t_sName & "s")
  o_ar_WordList.deleteOne(t_sName & "'s")
  tNum = charToNum(t_sName.char[1])
  if tNum >= 65 and tNum <= 90 then
    o_ar_WordList.deleteOne(me.FirstCharToLower(t_sName))
    o_ar_WordList.deleteOne(me.FirstCharToLower(t_sName & "s"))
    o_ar_WordList.deleteOne(me.FirstCharToLower(t_sName & "'s"))
  else
    o_ar_WordList.deleteOne(me.FirstCharToUpper(t_sName))
    o_ar_WordList.deleteOne(me.FirstCharToUpper(t_sName & "s"))
    o_ar_WordList.deleteOne(me.FirstCharToUpper(t_sName & "'s"))
  end if
  o_ar_WordList.deleteOne(convertToLowerCase(t_sName))
  o_ar_WordList.deleteOne(convertToLowerCase(t_sName) & "s")
  o_ar_WordList.deleteOne(convertToLowerCase(t_sName) & "'s")
end
on showPopulusWindow me
end
on hidePopulusWindow me
end
on GetList me
  return m_ar_sPopulus
end