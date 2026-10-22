-- Script
property _tokenList
property _currPos

on new me, str, delims, returnTokens
  case the paramCount of
    2:
      delims = " " & TAB & RETURN
      returnTokens = 0
    3:
      returnTokens = 0

  end case
  me._tokenList = []
  numDelims = delims.length
  delimList = []
  repeat with i = 1 to numDelims
    delimChar = delims.char[i]
    if offset(delimChar, str) then
      delimList.add(delimChar)
    end if
  end repeat
  repeat while str.length
    offsetList = []
    repeat with j in delimList
      charOffset = offset(j, str)
      if charOffset then
        offsetList.add(charOffset)
      end if
    end repeat
    if offsetList.count then
      tokenOffset = min(offsetList)
      if tokenOffset > 1 then
        me._tokenList.add(str.char[1..tokenOffset - 1])
      end if
      if returnTokens then
        me._tokenList.add(str.char[tokenOffset])
      end if
      delete (str).char[1..tokenOffset]
      next repeat
    end if
    me._tokenList.add(str)
    str = EMPTY
  end repeat
  me._currPos = 1
  return me
end
on countTokens me
  return the count of the _tokenList of me
end
on hasMoreTokens me
  if me._currPos <= me._tokenList.count then
    return 1
  else
    return 0
  end if
end
on NextToken me
  if me._currPos <= me._tokenList.count then
    token = me._tokenList[me._currPos]
    me._currPos = me._currPos + 1
    return token
  else
    return VOID
  end if
end