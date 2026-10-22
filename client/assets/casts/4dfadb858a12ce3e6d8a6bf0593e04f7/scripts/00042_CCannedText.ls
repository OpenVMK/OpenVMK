-- Behavior
on TestPartialWord a_sWord, a_ar_symOptions, o_ar_matches
  return getThread("dictionary").getComponent().TestPartialWord(a_sWord, a_ar_symOptions)
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
  return getThread("dictionary").getComponent().TransformCannedToMsg(a_ar_mp_cannedMap, a_bNoPhraseLength)
end
on TransformCannedMsgToString a_rMsg
  return getThread("dictionary").getComponent().TransformCannedMsgToString(a_rMsg)
end
on GetDictionary
  return getThread("dictionary").getComponent().GetDictionary()
end