-- Script
property m_mp_prefixes
property m_mp_suffixes
property m_ar_chars
property m_ar_validFlags

on construct me
  m_ar_chars = []
  m_mp_prefixes = [:]
  m_mp_prefixes.setaProp("A", [[#condition: ".", #strip: EMPTY, #insert: "re"]])
  m_mp_prefixes.setaProp("a", [[#condition: ".", #strip: EMPTY, #insert: "re"]])
  m_mp_prefixes.setaProp("I", [[#condition: ".", #strip: EMPTY, #insert: "in"]])
  m_mp_prefixes.setaProp("i", [[#condition: ".", #strip: EMPTY, #insert: "in"]])
  m_mp_prefixes.setaProp("U", [[#condition: ".", #strip: EMPTY, #insert: "un"]])
  m_mp_prefixes.setaProp("u", [[#condition: ".", #strip: EMPTY, #insert: "un"]])
  m_mp_suffixes = [:]
  m_mp_suffixes.setaProp("V", [[#condition: "E", #strip: "E", #append: "ive"], [#condition: "[^E]", #strip: EMPTY, #append: "ive"]])
  m_mp_suffixes.setaProp("v", [[#condition: "E", #strip: "E", #append: "ive"], [#condition: "[^E]", #strip: EMPTY, #append: "ive"]])
  m_mp_suffixes.setaProp("N", [[#condition: "E", #strip: "E", #append: "ion"], [#condition: "Y", #strip: "Y", #append: "ication"], [#condition: "[^EY]", #strip: EMPTY, #append: "en"]])
  m_mp_suffixes.setaProp("n", [[#condition: "E", #strip: "E", #append: "ion"], [#condition: "Y", #strip: "Y", #append: "ication"], [#condition: "[^EY]", #strip: EMPTY, #append: "en"]])
  m_mp_suffixes.setaProp("X", [[#condition: "E", #strip: "E", #append: "ions"], [#condition: "Y", #strip: "Y", #append: "ications"], [#condition: "[^EY]", #strip: EMPTY, #append: "ens"]])
  m_mp_suffixes.setaProp("x", [[#condition: "E", #strip: "E", #append: "ions"], [#condition: "Y", #strip: "Y", #append: "ications"], [#condition: "[^EY]", #strip: EMPTY, #append: "ens"]])
  m_mp_suffixes.setaProp("H", [[#condition: "Y", #strip: "Y", #append: "ieth"], [#condition: "[^Y]", #strip: EMPTY, #append: "th"]])
  m_mp_suffixes.setaProp("h", [[#condition: "Y", #strip: "Y", #append: "ieth"], [#condition: "[^Y]", #strip: EMPTY, #append: "th"]])
  m_mp_suffixes.setaProp("Y", [[#condition: ".", #strip: EMPTY, #append: "ly"]])
  m_mp_suffixes.setaProp("y", [[#condition: ".", #strip: EMPTY, #append: "ly"]])
  m_mp_suffixes.setaProp("G", [[#condition: "E", #strip: "E", #append: "ing"], [#condition: "[^E]", #strip: EMPTY, #append: "ing"]])
  m_mp_suffixes.setaProp("g", [[#condition: "E", #strip: "E", #append: "ing"], [#condition: "[^E]", #strip: EMPTY, #append: "ing"]])
  m_mp_suffixes.setaProp("J", [[#condition: "E", #strip: "E", #append: "ings"], [#condition: "[^E]", #strip: EMPTY, #append: "ings"]])
  m_mp_suffixes.setaProp("j", [[#condition: "E", #strip: "E", #append: "ings"], [#condition: "[^E]", #strip: EMPTY, #append: "ings"]])
  m_mp_suffixes.setaProp("D", [[#condition: "E", #strip: EMPTY, #append: "d"], [#condition: "[^AEIOU]Y", #strip: "Y", #append: "ied"], [#condition: "[^EY]", #strip: EMPTY, #append: "ed"], [#condition: "[AEIOU]Y", #strip: "Y", #append: "ed"]])
  m_mp_suffixes.setaProp("d", [[#condition: "E", #strip: EMPTY, #append: "d"], [#condition: "[^AEIOU]Y", #strip: "Y", #append: "ied"], [#condition: "[^EY]", #strip: EMPTY, #append: "ed"], [#condition: "[AEIOU]Y", #strip: "Y", #append: "ed"]])
  m_mp_suffixes.setaProp("T", [[#condition: "E", #strip: EMPTY, #append: "st"], [#condition: "[^AEIOU]Y", #strip: "Y", #append: "iest"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "est"], [#condition: "[^EY]", #strip: EMPTY, #append: "est"]])
  m_mp_suffixes.setaProp("t", [[#condition: "E", #strip: EMPTY, #append: "st"], [#condition: "[^AEIOU]Y", #strip: "Y", #append: "iest"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "est"], [#condition: "[^EY]", #strip: EMPTY, #append: "est"]])
  m_mp_suffixes.setaProp("R", [[#condition: "E", #strip: EMPTY, #append: "r"], [#condition: "[^AEIOU]Y", #strip: "Y", #append: "ier"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "er"], [#condition: "[^EY]", #strip: EMPTY, #append: "er"]])
  m_mp_suffixes.setaProp("r", [[#condition: "E", #strip: EMPTY, #append: "r"], [#condition: "[^AEIOU]Y", #strip: "Y", #append: "ier"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "er"], [#condition: "[^EY]", #strip: EMPTY, #append: "er"]])
  m_mp_suffixes.setaProp("Z", [[#condition: "E", #strip: EMPTY, #append: "rs"], [#condition: "[^AEIOU]Y", #strip: "Y", #append: "iers"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "ers"], [#condition: "[^EY]", #strip: EMPTY, #append: "ers"]])
  m_mp_suffixes.setaProp("z", [[#condition: "E", #strip: EMPTY, #append: "rs"], [#condition: "[^AEIOU]Y", #strip: "Y", #append: "iers"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "ers"], [#condition: "[^EY]", #strip: EMPTY, #append: "ers"]])
  m_mp_suffixes.setaProp("S", [[#condition: "[^AEIOU]Y", #strip: "Y", #append: "ies"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "s"], [#condition: "[SXZH]", #strip: EMPTY, #append: "es"], [#condition: "[^SXZHY]", #strip: EMPTY, #append: "s"]])
  m_mp_suffixes.setaProp("s", [[#condition: "[^AEIOU]Y", #strip: "Y", #append: "ies"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "s"], [#condition: "[SXZH]", #strip: EMPTY, #append: "es"], [#condition: "[^SXZHY]", #strip: EMPTY, #append: "s"]])
  m_mp_suffixes.setaProp("P", [[#condition: "[^AEIOU]Y", #strip: "Y", #append: "iness"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "ness"], [#condition: "[^Y]", #strip: EMPTY, #append: "ness"]])
  m_mp_suffixes.setaProp("p", [[#condition: "[^AEIOU]Y", #strip: "Y", #append: "iness"], [#condition: "[AEIOU]Y", #strip: EMPTY, #append: "ness"], [#condition: "[^Y]", #strip: EMPTY, #append: "ness"]])
  m_mp_suffixes.setaProp("M", [[#condition: ".", #strip: EMPTY, #append: "'s"]])
  m_mp_suffixes.setaProp("m", [[#condition: ".", #strip: EMPTY, #append: "'s"]])
  m_ar_validFlags = ["A", "a", "I", "i", "U", "u", "V", "v", "N", "n", "X", "x", "H", "h", "Y", "y", "G", "g", "J", "j", "D", "d", "T", "t", "R", "r", "Z", "z", "S", "s", "P", "p", "M", "m"]
  return 1
end
on ExpandWord me, i_sDictionaryWord
  t_ar_cFlags = []
  t_sBareWord = me.SliceWord(i_sDictionaryWord, t_ar_cFlags)
  t_ar_out = [t_sBareWord]
  repeat with tFlag in t_ar_cFlags
    me.ExpandFlag(t_sBareWord, tFlag, t_ar_out)
  end repeat
  return t_ar_out
end
on ExpandListToList me, a_ar_input, o_ar_output
  repeat with t_sWord in a_ar_input
    t_ar_cFlags = []
    t_sBareWord = t_sWord
    t_iSlicePoint = offset("/", t_sWord)
    if t_iSlicePoint > 0 then
      t_sBareWord = chars(t_sWord, 1, t_iSlicePoint - 1)
      t_iLen = t_sWord.length
      repeat with i = t_iSlicePoint + 1 to t_iLen
        tChar = chars(t_sWord, i, i)
        if m_ar_validFlags.getPos(tChar) > 0 then
          t_ar_cFlags.append(tChar)
          next repeat
        end if
        return error(me, "Invalid flag! Dictionary may be corrupt!", #ExpandListToList)
      end repeat
    end if
    o_ar_output.append(t_sBareWord)
    repeat with tFlag in t_ar_cFlags
      me.ExpandFlag(t_sBareWord, tFlag, o_ar_output)
    end repeat
  end repeat
  return 1
end
on SliceWord me, i_sDictionaryWord, o_ar_cFlags
  t_sBareWord = i_sDictionaryWord
  tSlicePoint = offset("/", i_sDictionaryWord)
  if tSlicePoint > 0 then
    t_sBareWord = chars(i_sDictionaryWord, 1, tSlicePoint - 1)
    t_iLen = i_sDictionaryWord.length
    repeat with i = tSlicePoint + 1 to t_iLen
      o_ar_cFlags.append(chars(i_sDictionaryWord, i, i))
    end repeat
  end if
  return t_sBareWord
end
on ExpandFlag me, i_sBareWord, i_cFlag, o_ar_newWords
  tPrefixRules = m_mp_prefixes.getaProp(i_cFlag)
  if not voidp(tPrefixRules) then
    repeat with tRule in tPrefixRules
      t_bPreCondApplies = 0
      t_sCondition = tRule.condition
      t_ar_subStrings = []
      if t_sCondition = "." then
        t_bPreCondApplies = 1
      else
        m_ar_chars = []
        me.parse(t_sCondition)
        t_bPreCondApplies = me.TestString(chars(i_sBareWord, 1, m_ar_chars.count))
      end if
      if t_bPreCondApplies then
        tWord = i_sBareWord
        if tRule.strip <> EMPTY then
          tBeginning = chars(tWord, 1, tRule.strip.length)
          if not (tBeginning = tRule.strip) then
            error(me, "Word" && tWord && "does not begin with the string that is supposed to be stripped of it", #ExpandFlag)
          else
            tWord = chars(tWord, 1 + tRule.strip.length, tWord.length)
          end if
        end if
        if tRule.insert <> EMPTY then
          put tRule.insert before tWord
        end if
        o_ar_newWords.append(tWord)
      end if
    end repeat
  end if
  tSuffixRules = m_mp_suffixes.getaProp(i_cFlag)
  if not voidp(tSuffixRules) then
    repeat with tRule in tSuffixRules
      t_bSufCondApplies = 0
      t_sCondition = tRule.condition
      if t_sCondition = "." then
        t_bSufCondApplies = 1
      else
        m_ar_chars = []
        me.parse(t_sCondition)
        t_iLength = i_sBareWord.length
        t_bSufCondApplies = me.TestString(chars(i_sBareWord, t_iLength - m_ar_chars.count + 1, t_iLength))
      end if
      if t_bSufCondApplies then
        tWord = i_sBareWord
        t_sStrip = tRule.strip
        t_iStrip = length(t_sStrip)
        t_iLength = length(tWord)
        if t_iStrip then
          tEnding = chars(tWord, t_iLength - t_iStrip + 1, t_iLength)
          if not (tEnding = t_sStrip) then
            error(me, "Word" && tWord && "does not end in the string that is supposed to be stripped of it", #ExpandFlag)
          else
            tWord = chars(tWord, 1, t_iLength - t_iStrip)
          end if
        end if
        if tRule.append <> EMPTY then
          put tRule.append after tWord
        end if
        o_ar_newWords.append(tWord)
      end if
    end repeat
  end if
end
on SuffixConditionApplies me, i_sWord, i_sCondition
  if i_sCondition = "." then
    return 1
  else
    m_ar_chars = []
    me.parse(i_sCondition)
    t_iLength = i_sWord.length
    return me.TestString(chars(i_sWord, t_iLength - the count of m_ar_chars + 1, t_iLength))
  end if
  return 0
end
on PrefixConditionApplies me, i_sWord, i_sCondition
  t_ar_subStrings = []
  if i_sCondition = "." then
    return 1
  else
    m_ar_chars = []
    me.parse(i_sCondition)
    return me.TestString(chars(i_sWord, 1, the count of m_ar_chars))
  end if
  return 0
end
on AddYesChar me, i_sChar, i_iOffset
  if m_ar_chars.count < i_iOffset then
    m_ar_chars[i_iOffset] = [:]
  end if
  tMap = m_ar_chars[i_iOffset]
  if voidp(tMap.getaProp(#yes)) then
    m_ar_chars[i_iOffset].setaProp(#yes, [i_sChar])
  else
    m_ar_chars[i_iOffset].yes.append(i_sChar)
  end if
end
on AddNoChar me, i_sChar, i_iOffset
  if m_ar_chars.count < i_iOffset then
    m_ar_chars[i_iOffset] = [:]
  end if
  tMap = m_ar_chars[i_iOffset]
  if voidp(tMap.getaProp(#no)) then
    m_ar_chars[i_iOffset].setaProp(#no, [i_sChar])
  else
    m_ar_chars[i_iOffset].no.append(i_sChar)
  end if
end
on parse me, i_sCondition
  tWriteIndex = 1
  tReadIndex = 1
  t_iLen = length(i_sCondition)
  repeat while tReadIndex <= t_iLen
    tChar = chars(i_sCondition, tReadIndex, tReadIndex)
    case tChar of
      "[":
        if chars(i_sCondition, tReadIndex + 1, tReadIndex + 1) = "^" then
          tLastReadIndex = offset("]", chars(i_sCondition, tReadIndex, t_iLen)) - 1
          if tLastReadIndex = 0 then
            error(me, "range field not closed!", #ExpandCondition)
            exit
          end if
          repeat with i = tReadIndex + 2 to tLastReadIndex
            me.AddNoChar(chars(i_sCondition, i, i), tWriteIndex)
          end repeat
          tReadIndex = tLastReadIndex + 2
          tWriteIndex = tWriteIndex + 1
        else
          tLastReadIndex = offset("]", chars(i_sCondition, tReadIndex, t_iLen)) - 1
          if tLastReadIndex = 0 then
            error(me, "range field not closed!", #parse)
            exit
          end if
          repeat with i = tReadIndex + 1 to tLastReadIndex
            me.AddYesChar(chars(i_sCondition, i, i), tWriteIndex)
          end repeat
          tReadIndex = tLastReadIndex + 2
          tWriteIndex = tWriteIndex + 1
        end if
      "]":
        error(me, "range field error!", #parse)
        tReadIndex = tReadIndex + 1
      otherwise:
        me.AddYesChar(char tReadIndex of i_sCondition, tWriteIndex)
        tReadIndex = tReadIndex + 1
        tWriteIndex = tWriteIndex + 1

    end case
  end repeat
end
on TestString me, i_sString
  t_iCount = m_ar_chars.count
  repeat with i = 1 to t_iCount
    t_sTest = chars(i_sString, i, i)
    t_ar_sNoChr = m_ar_chars[i].getaProp(#no)
    if listp(t_ar_sNoChr) then
      repeat with t_sNo in t_ar_sNoChr
        if t_sTest = t_sNo then
          return 0
        end if
      end repeat
    end if
    t_ar_sYesChr = m_ar_chars[i].getaProp(#yes)
    t_bYesMatch = 1
    if listp(t_ar_sYesChr) then
      t_bYesMatch = 0
      repeat with t_sYes in t_ar_sYesChr
        if t_sTest = t_sYes then
          t_bYesMatch = 1
        end if
      end repeat
    end if
    if not t_bYesMatch then
      return 0
    end if
  end repeat
  return 1
end