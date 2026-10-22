-- Behavior
on TestPartialWord a_sWord, a_ar_symOptions, o_ar_matches
  return 1
end
on ParseCannedText a_sText, a_ar_symOptions
  return getThread("dictionary").getComponent().ParseText(a_sText, a_ar_symOptions)
end
on GetCannedWord a_iIndex
  return getThread("dictionary").getComponent().getWordOfIndex(a_iIndex)
end
on SetCannedFreeWordList a_ar_words
  getThread("dictionary").getComponent().SetFreeWordList(a_ar_words)
end
on SetCannedFriendWordList a_ar_words
  getThread("dictionary").getComponent().SetFriendWordList(a_ar_words)
end
on SetCannedOwnNameWordList a_ar_words
  getThread("dictionary").getComponent().SetOwnNameWordList(a_ar_words)
end
on GetCannedFreeWordList a_ar_words
  return getThread("dictionary").getComponent().GetFreeWordList()
end
on GetCannedFriendWordList a_ar_words
  return getThread("dictionary").getComponent().GetFriendWordList()
end
on GetCannedOwnNameWordList a_ar_words
  return getThread("dictionary").getComponent().GetOwnNameWordList()
end
on TransformCannedToMsg a_ar_mp_cannedMap, a_bNoPhraseLength
  trace("TransformCannedToMsg()" && a_ar_mp_cannedMap && a_bNoPhraseLength)
  t_sStr = EMPTY
  repeat with i = 1 to a_ar_mp_cannedMap.count
    if a_ar_mp_cannedMap[i].capitalized and charToNum(a_ar_mp_cannedMap[i].word.char[1]) > 96 and charToNum(a_ar_mp_cannedMap[i].word.char[1]) < 123 then
      t_sStr = t_sStr & numToChar(charToNum(a_ar_mp_cannedMap[i].word.char[1]) - 32) & a_ar_mp_cannedMap[i].word.char[2..a_ar_mp_cannedMap[i].word.length]
      next repeat
    end if
    t_sStr = t_sStr & a_ar_mp_cannedMap[i].word
  end repeat
  return propList(#str, t_sStr)
end
on TransformCannedMsgToString a_rMsg
  trace("TransformCannedMsg()" && a_rMsg)
  return getThread("dictionary").getComponent().TransformCannedMsgToString(a_rMsg)
end
on GetDictionary
  return getThread("dictionary").getComponent().GetDictionary()
end
on CheckContent content
  trace("CheckContent(): " && content)
end