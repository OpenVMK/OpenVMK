-- Script
on get me, tKey, tDefault
  tText = me.pItemList[tKey]
  if voidp(tText) then
    t_LowerCaseKey = convertToLowerCase(tKey)
    tText = me.pItemList[t_LowerCaseKey]
  end if
  if voidp(tText) then
    tError = "Text not found:" && tKey
    if not voidp(tDefault) then
      tText = tDefault
      tError = tError & RETURN & "Using given default:" && tDefault
    else
      tText = tKey
    end if
    error(me, tError, #get)
  end if
  return tText
end
on Dump_ me, tField, tDelimiter
  t = the milliSeconds
  if not memberExists(tField) then
    return error(me, "Field member expected:" && tField, #dump)
  end if
  tStr = field(tField)
  tStrServices = getStringServices()
  tSpecialChunks = ["\r": RETURN, "\t": TAB, "\s": SPACE, "<BR>": RETURN]
  tDelim = the itemDelimiter
  if voidp(tDelimiter) then
    tDelimiter = RETURN
  end if
  the itemDelimiter = tDelimiter
  repeat with i = 1 to tStr.item.count
    tPair = tStr.item[i]
    if tPair.word[1].char[1] <> "#" and tPair <> EMPTY then
      the itemDelimiter = "="
      tProp = tPair.item[1].word[1..tPair.item[1].word.count]
      tvalue = tPair.item[2..tPair.item.count]
      tvalue = tvalue.word[1..tvalue.word.count]
      tvalue = tStrServices.convertSpecialChars(tvalue)
      repeat with k = 1 to tSpecialChunks.count
        tMark = tSpecialChunks.getPropAt(k)
        if tvalue contains tMark then
          tvalue = tStrServices.replaceChunks(tvalue, tMark, tSpecialChunks[k])
        end if
      end repeat
      tPropLowerCase = convertToLowerCase(tProp)
      me.pItemList[tPropLowerCase] = tvalue
    end if
    the itemDelimiter = tDelimiter
  end repeat
  the itemDelimiter = tDelim
  t = the milliSeconds - t
  put "text parsed in" && t && "ms"
  return 1
end
on dump me, tField, tDelimiter
  if not memberExists(tField) then
    return error(me, "Field member expected:" && tField, #dump)
  end if
  t_sRawStr = field(tField)
  tStrServices = getStringServices()
  tSpecialChunks = ["\r": RETURN, "\t": TAB, "\s": SPACE, "<BR>": RETURN]
  t_ar_sLineChunks = []
  t_iMaxLinesPerChunk = 100
  t_iTotalChunkCount = t_sRawStr.line.count / t_iMaxLinesPerChunk + 1
  repeat with t_iChunk = 1 to t_iTotalChunkCount
    t_iStartChunkIndex = (t_iChunk - 1) * t_iMaxLinesPerChunk + 1
    t_iEndChunkIndex = t_iStartChunkIndex + t_iMaxLinesPerChunk - 1
    t_sLines = t_sRawStr.line[t_iStartChunkIndex..t_iEndChunkIndex]
    t_ar_sLineChunks[t_iChunk] = t_sLines
  end repeat
  tDelim = the itemDelimiter
  the itemDelimiter = "="
  repeat with t_sStr in t_ar_sLineChunks
    t_iLineCount = t_sStr.line.count
    repeat with t_iLineNo = 1 to t_iLineCount
      tPair = t_sStr.line[t_iLineNo]
      if chars(tPair, 1, 1) <> "#" and tPair <> EMPTY then
        tProp = tPair.item[1]
        tvalue = tPair.item[2..tPair.item.count]
        tvalue = tStrServices.convertSpecialChars(tvalue)
        repeat with k = 1 to tSpecialChunks.count
          tMark = tSpecialChunks.getPropAt(k)
          if tvalue contains tMark then
            tvalue = tStrServices.replaceChunks(tvalue, tMark, tSpecialChunks[k])
          end if
        end repeat
        me.pItemList[convertToLowerCase(tProp)] = tvalue
      end if
    end repeat
  end repeat
  the itemDelimiter = tDelim
  return 1
end