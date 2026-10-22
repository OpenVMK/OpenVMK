-- Behavior
on offsetCaseSensitive a_sChar, a_sString
  tNum = charToNum(a_sChar.char[1])
  repeat with i = 1 to a_sString.length
    if tNum = charToNum(a_sString.char[i]) then
      return i
    end if
  end repeat
  return VOID
end
on ShufflerCryptCreateTable a_sOrigin, a_sKey
  t_sShuffler = a_sOrigin
  tKey = a_sKey
  repeat while tKey.length < a_sOrigin.length
    tKey = tKey & tKey
  end repeat
  tKey = chars(tKey, 1, a_sOrigin.length)
  repeat with i = 1 to tKey.length
    tSrc = chars(tKey, i, i)
    tOfs = offsetCaseSensitive(tSrc, t_sShuffler)
    if not voidp(tOfs) then
      tCharDst = chars(t_sShuffler, i, i)
      tCharSrc = chars(t_sShuffler, tOfs, tOfs)
      if i < tOfs then
        tNewString = chars(t_sShuffler, 1, i - 1) & tCharSrc & chars(t_sShuffler, i + 1, tOfs - 1) & tCharDst & chars(t_sShuffler, tOfs + 1, t_sShuffler.length)
      else
        if i > tOfs then
          tNewString = chars(t_sShuffler, 1, tOfs - 1) & tCharDst & chars(t_sShuffler, tOfs + 1, i - 1) & tCharSrc & chars(t_sShuffler, i + 1, t_sShuffler.length)
        else
          tNewString = t_sShuffler
        end if
      end if
      t_sShuffler = tNewString
      next repeat
    end if
    put "Error fuck! Char not found in shuffler string"
    exit
  end repeat
  return t_sShuffler
end
on ShufflerCryptUnCode a_sMemberIn, a_sMemberOut, a_sShuffler, a_sOrigin
  tTime = the milliSeconds
  tInText = member(a_sMemberIn).text
  tOutText = EMPTY
  tMap = []
  if a_sShuffler.length <> a_sOrigin.length then
    put "Error, shuffler & origin different length"
    return 0
  end if
  t_mp_ofs = [:]
  repeat with i = 1 to a_sShuffler.length
    t_mp_ofs.setaProp(a_sShuffler.char[i], i)
  end repeat
  t_mp_ofs.sort()
  tI = 0
  repeat with tL = 1 to tInText.line.count
    tLine = tInText.line[tL]
    tOutLine = EMPTY
    repeat with t = 1 to tLine.char.count
      tChar = tLine.char[t]
      tOfs = getaProp(t_mp_ofs, tChar) - 1
      if tOfs <> -1 then
        tOfs = (tOfs - tI) mod a_sShuffler.length + 1
        if tOfs < 1 then
          tOfs = tOfs + a_sShuffler.length
        end if
        tChar = a_sOrigin.char[tOfs]
        tI = tI + 1
      end if
      put tChar after tOutLine
    end repeat
    put tOutLine & RETURN after tOutText
  end repeat
  member(a_sMemberOut).text = tOutText
  put "Decoding Encrypted texts took " & the milliSeconds - tTime & " ms"
end