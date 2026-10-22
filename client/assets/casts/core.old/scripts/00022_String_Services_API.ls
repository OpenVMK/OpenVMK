-- Behavior
on CreateStringServices
  return createManager(#string_services, GetClsVariable("string.services.class"))
end
on RemoveStringServices
  return removeManager(#string_services)
end
on getStringServices
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#string_services) then
    return t_rMgr.getManager(#string_services)
  else
    return CreateStringServices()
  end if
end
on convertToPropList a_sString, a_sDelimiter
  t_sOldDelim = the itemDelimiter
  if voidp(a_sDelimiter) then
    a_sDelimiter = ","
  end if
  the itemDelimiter = a_sDelimiter
  t_mp_sKey_sValue = [:]
  repeat with i = 1 to a_sString.item.count
    t_sPair = a_sString.item[i].word[1..a_sString.item[i].word.count]
    t_sProp = t_sPair.char[1..offset("=", t_sPair) - 1]
    t_sValue = t_sPair.char[offset("=", t_sPair) + 1..length(a_sString)]
    t_mp_sKey_sValue[t_sProp.word[1..t_sProp.word.count]] = t_sValue.word[1..t_sValue.word.count]
  end repeat
  the itemDelimiter = t_sOldDelim
  return t_mp_sKey_sValue
end
on convertToLowerCase a_sString
  return getStringServices().convertToLowerCase(a_sString)
end
on convertToHigherCase a_sString
  return getStringServices().convertToHigherCase(a_sString)
end
on convertSpecialChars a_sString
  return getStringServices().convertSpecialChars(a_sString)
end
on convertIntToHex a_iInt
  return getStringServices().convertIntToHex(a_iInt)
end
on convertHexToInt a_sHex
  return getStringServices().convertHexToInt(a_sHex)
end
on replaceChars a_sString, a_cCharA, a_cCharB
  return getStringServices().replaceChars(a_sString, a_cCharA, a_cCharB)
end
on replaceChunks a_sString, a_cChunkA, a_cChunkB
  return getStringServices().replaceChunks(a_sString, a_cChunkA, a_cChunkB)
end