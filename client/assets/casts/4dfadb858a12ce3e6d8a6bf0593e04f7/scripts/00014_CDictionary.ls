-- Behavior
property m_fixedWordTree
property m_freeWordTree
property m_friendListWordTree
property m_ownNameWordTree
property m_wordIndexList
property m_expander

on construct me
  m_fixedWordTree = createObject("DictionaryCharacterTree", "CWordTree")
  m_freeWordTree = createObject("FreeWordCharacterTree", "CWordTree")
  m_friendListWordTree = createObject("FriendListCharacterTree", "CWordTree")
  m_ownNameWordTree = createObject("OwnNameCharacterTree", "CWordTree")
  m_wordIndexList = createObject("DictionaryWordList", "CWordIndexList")
  m_expander = createObject("AffixExpander", "CAffixExpanderAndConditionEvaluator")
  return 1
end
on deconstruct me
  removeObject(m_expander.getID())
  removeObject(m_wordIndexList.getID())
  removeObject(m_freeWordTree.getID())
  removeObject(m_friendListWordTree.getID())
  removeObject(m_ownNameWordTree.getID())
  removeObject(m_fixedWordTree.getID())
  return 1
end
on add me, a_ar_words
  tOutput = []
  if m_expander.ExpandListToList(a_ar_words, tOutput) then
    m_wordIndexList.addWords(tOutput)
    m_fixedWordTree.AppendWords(tOutput)
    return 1
  else
    t = createDialogWindow(me.getID(), "ErrorDialog", 1, 0)
    t.show()
    t_sTxt = "Dictionary resource content was invalid."
    t.setText(t_sTxt, "Error", "OK")
    return 0
  end if
end
on GetWordListObj me
  return m_wordIndexList
end
on GetExpander me
  return m_expander
end
on GetDictionaryWordTree me
  return m_fixedWordTree
end
on GetFreeWordTree me
  return m_freeWordTree
end
on GetFriendListWordTree me
  return m_friendListWordTree
end
on GetOwnNameWordTree me
  return m_ownNameWordTree
end