-- Score Script
property m_iTimeElapsed
property m_fPercentReady
property m_netID
property m_dictionary
property m_ar_freeWords
property m_ar_friendWords
property m_ar_ownWords
property m_iExpandOffset
property m_bDecrunched
property m_bGotRaw
property m_ar_rawList
property m_sSeparators
property m_iProcessNumber

on construct me
  m_dictionary = VOID
  m_ar_freeWords = []
  m_ar_friendWords = []
  m_ar_ownWords = []
  m_iExpandOffset = 1
  m_ar_rawList = []
  m_bDecrunched = 0
  m_bGotRaw = 0
  registerMessage(#Initialize, me.getID(), #Initialize)
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  unregisterMessage(#Initialize, me.getID())
  if not voidp(m_dictionary) then
    removeObject(m_dictionary)
  end if
  return 1
end
on Initialize this
  m_iProcessNumber = getThread(#main).component.GetProcessManager().QueueProcessTurn()
  registerMessage("start_process_" & m_iProcessNumber, this.getID(), #LoadAndDecruchTexts)
end
on LoadAndDecruchTexts this
  unregisterMessage("start_process_" & m_iProcessNumber, this.getID())
  if getText("dict.separators") = 0 then
    m_sSeparators = " .,!?:;)(]-" & ENTER & RETURN
  else
    m_sSeparators = getText("dict.separators") & ENTER & RETURN
  end if
  m_netID = getNetText(getVariableValue("dictionary_url"))
  receiveUpdate(this.getID())
  m_iTimeElapsed = 0
  m_fPercentReady = 0.0
end
on SpliceString me, i_sText
  tOut = []
  tCurrentWord = EMPTY
  t_iChars = the number of chars in i_sText
  repeat with i = 1 to t_iChars
    tChar = char i of i_sText
    if me.isSeparator(tChar) then
      if tCurrentWord <> EMPTY then
        tOut.append(tCurrentWord)
      end if
      tOut.append(string(tChar))
      tCurrentWord = EMPTY
      next repeat
    end if
    tCurrentWord = tCurrentWord & tChar
  end repeat
  if tCurrentWord <> EMPTY then
    tOut.append(tCurrentWord)
  end if
  return tOut
end
on pickMatches me, a_sString, a_ar_words, o_ar_matches
  c = 1
  t_iLength = a_sString.length
  repeat with tFreeWord in a_ar_words
    if tFreeWord.length > 0 then
      TestString = convertToLowerCase(a_sString)
      tCurrentOffset = 1
      repeat while tCurrentOffset < t_iLength
        if TestString contains tFreeWord then
          tOffset = offset(tFreeWord, TestString)
          if tOffset = 0 then
            error(me, "W00T!? String contained substring but it's offset is not valid?", #pickMatches)
          end if
          tNextIndex = tOffset + tFreeWord.length
          tChar = TestString.char[tNextIndex]
          if me.isSeparator(tChar) or tNextIndex > t_iLength then
            o_ar_matches.append([#offset: tCurrentOffset + tOffset - 1, #string: chars(TestString, tOffset, tOffset + tFreeWord.length - 1), #word: c])
          else
          end if
          tCurrentOffset = tCurrentOffset + tOffset + tFreeWord.length - 1
          TestString = chars(TestString, tCurrentOffset, t_iLength)
          next repeat
        end if
        tCurrentOffset = t_iLength
      end repeat
    end if
    c = c + 1
  end repeat
end
on SpliceLine me, i_sText
  tOut = []
  tMatches = []
  me.pickMatches(i_sText, m_ar_ownWords, tMatches)
  me.pickMatches(i_sText, m_ar_friendWords, tMatches)
  repeat with tFreeWord in m_ar_freeWords
    if tFreeWord.length > 0 and getPos(m_ar_ownWords, tFreeWord) = 0 then
      TestString = convertToLowerCase(i_sText)
      tCurrentOffset = 1
      repeat while tCurrentOffset < i_sText.length
        if TestString contains tFreeWord then
          tOffset = offset(tFreeWord, TestString)
          if tOffset = 0 then
            error(me, "W00T!? String contained substring but it's offset is not valid?", #SpliceLine)
          end if
          tNextIndex = tOffset + tFreeWord.length
          tChar = TestString.char[tNextIndex]
          if me.isSeparator(tChar) or tNextIndex > TestString.length then
            tMatches.append([#offset: tCurrentOffset + tOffset - 1, #string: chars(TestString, tOffset, tOffset + tFreeWord.length - 1)])
          else
          end if
          tCurrentOffset = tCurrentOffset + tOffset + tFreeWord.length - 1
          TestString = chars(TestString, tCurrentOffset, TestString.length)
          next repeat
        end if
        tCurrentOffset = i_sText.length
      end repeat
    end if
  end repeat
  repeat with i = 1 to tMatches.count
    repeat with j = 1 to tMatches.count
      if i <> j then
        tTest1 = tMatches[i]
        tTest2 = tMatches[j]
        if tTest1.offset = tTest2.offset then
          if tTest1.string.length > tTest2.string.length then
            if voidp(tTest2.getaProp(#discard)) then
              tTest2.setaProp(#discard, 1)
            end if
            if voidp(tTest1.getaProp(#discard)) then
              tTest1.setaProp(#discard, 0)
            end if
            next repeat
          end if
          if voidp(tTest1.getaProp(#discard)) then
            tTest1.setaProp(#discard, 1)
          end if
          if voidp(tTest2.getaProp(#discard)) then
            tTest2.setaProp(#discard, 0)
          end if
        end if
      end if
    end repeat
  end repeat
  t_ar_TrueMatches = []
  repeat with tMatch in tMatches
    if voidp(tMatch.getaProp(#discard)) then
      t_ar_TrueMatches.append(tMatch)
      next repeat
    end if
    if not tMatch.discard then
      t_ar_TrueMatches.append(tMatch)
    end if
  end repeat
  tMatches = t_ar_TrueMatches
  if tMatches.count > 1 then
    tBubble = 2
    repeat with i = 1 to tMatches.count
      repeat with j = tBubble to tMatches.count
        if tMatches[i].offset > tMatches[j].offset then
          tTemp = tMatches[i]
          tMatches[i] = tMatches[j]
          tMatches[j] = tTemp
        end if
      end repeat
      tBubble = tBubble + 1
    end repeat
  end if
  tMaskRegister = []
  repeat with a = 1 to i_sText.length
    tMaskRegister.append([#char: i_sText.char[a], #mask: 0])
  end repeat
  repeat with tMatch in tMatches
    tMaskedOut = 0
    repeat with t = tMatch.offset to tMatch.offset + tMatch.string.length - 1
      if tMaskRegister[t].mask then
        tMaskedOut = 1
      end if
    end repeat
    if not tMaskedOut then
      repeat with t = tMatch.offset to tMatch.offset + tMatch.string.length - 1
        tMaskRegister[t].mask = 1
      end repeat
      tMatch.setaProp(#discard, 0)
      next repeat
    end if
    tMatch.setaProp(#discard, 1)
  end repeat
  t_ar_TrueMatches = []
  repeat with tMatch in tMatches
    if voidp(tMatch.getaProp(#discard)) then
      t_ar_TrueMatches.append(tMatch)
      next repeat
    end if
    if not tMatch.discard then
      t_ar_TrueMatches.append(tMatch)
    end if
  end repeat
  tMatches = t_ar_TrueMatches
  repeat with tMatch in tMatches
    tLen = tMatch.string.length
    t_sOrg = i_sText.char[tMatch.offset..tMatch.offset + tLen - 1]
    tMatch.string = t_sOrg
  end repeat
  tBlocks = []
  tCurrentOffset = 1
  repeat with tMatch in tMatches
    if tMatch.offset > tCurrentOffset then
      tBlocks.append([#string: chars(i_sText, tCurrentOffset, tMatch.offset - 1), #dest: #splicer])
    end if
    tBlocks.append([#string: tMatch.string, #dest: #free])
    tCurrentOffset = tMatch.offset + tMatch.string.length
  end repeat
  if tCurrentOffset <= i_sText.length then
    tBlocks.append([#string: chars(i_sText, tCurrentOffset, i_sText.length), #dest: #splicer])
  end if
  repeat with tBlock in tBlocks
    case tBlock.dest of
      #free:
        tOut.append(tBlock.string)
      #splicer:
        t_ar_splices = me.SpliceString(tBlock.string)
        repeat with tSplice in t_ar_splices
          tOut.append(tSplice)
        end repeat

    end case
  end repeat
  return tOut
end
on isLinefeed me, a_sWord
  if a_sWord.char[1] = ENTER or a_sWord.char[1] = RETURN then
    return 1
  else
    return 0
  end if
end
on ParseText me, a_sText, a_ar_symOptions
  if m_bGotRaw then
    if not m_bDecrunched then
      createWindow("Decrypting_Dictionary", "vmk_basic.window")
      getWindow("Decrypting_Dictionary").merge("please_wait.window")
      getWindow("Decrypting_Dictionary").center()
      getWindow("Decrypting_Dictionary").show()
      updateStage()
      me.DecrunchABunchOfWords(m_ar_rawList.count - m_iExpandOffset + 1)
      removeWindow("Decrypting_Dictionary")
      updateStage()
    end if
    if not voidp(m_dictionary) then
      tItems = me.SpliceLine(a_sText)
      t_ar_mp_words = []
      t_mp_iWordIndexCount = [:]
      tRepeatLimit = getVariableValue("dictionary_word_repeat_limit", 2)
      tCountLimit = getVariableValue("dictionary_word_total_count_limit", 3)
      repeat with t_cCurrWord in tItems
        tCapitalized = me.FirstCharIsCapital(t_cCurrWord)
        tLowerCaseWord = me.FirstCharToLower(t_cCurrWord)
        if me.isLinefeed(t_cCurrWord) then
          t_ar_mp_words.append([#word: t_cCurrWord, #valid: 1, #source: #linefeed, #code: -1001, #capitalized: 0])
          next repeat
        end if
        tWordListIndex = m_dictionary.GetWordListObj().getIndexOfWord(tLowerCaseWord)
        tCount = t_mp_iWordIndexCount.getaProp(t_cCurrWord)
        if voidp(tCount) then
          t_mp_iWordIndexCount.setaProp(t_cCurrWord, 1)
          tCount = 1
        else
          tCount = tCount + 1
          t_mp_iWordIndexCount.setaProp(t_cCurrWord, tCount)
        end if
        tValid = tCount <= tCountLimit
        if tValid then
          if t_ar_mp_words.count >= tRepeatLimit - 1 then
            tCount = 0
            repeat with i = t_ar_mp_words.count down to 1
              if t_ar_mp_words[i].word <> t_cCurrWord then
                exit repeat
                next repeat
              end if
              tCount = tCount + 1
            end repeat
            if tCount > tRepeatLimit then
              tValid = 0
            end if
          end if
        end if
        if t_cCurrWord = " " then
          tValid = 1
        end if
        t_ar_matchtable = []
        if tWordListIndex <> 0 then
          t_ar_mp_words.append([#word: tLowerCaseWord, #valid: tValid, #source: #dictionary, #code: tWordListIndex, #capitalized: tCapitalized])
          next repeat
        end if
        if me.ValidateFreeWord(t_cCurrWord, a_ar_symOptions, t_ar_matchtable) then
          if getPos(t_ar_matchtable, #ownName) <> 0 then
            t_ar_mp_words.append([#word: t_cCurrWord, #valid: tValid, #source: #ownName, #code: VOID, #capitalized: tCapitalized])
          else
            if getPos(t_ar_matchtable, #friend) <> 0 then
              tFriend = getThread("Messenger").getComponent().getFriend(t_cCurrWord)
              if not voidp(tFriend) then
                tEntry = [#word: t_cCurrWord, #valid: tValid, #source: #friend, #code: tFriend.id, #capitalized: tCapitalized, #form: #nominative]
                if t_ar_matchtable.getPos(#plural) <> 0 then
                  tEntry.setaProp(#form, #plural)
                else
                  if t_ar_matchtable.getPos(#genitive) <> 0 then
                    tEntry.setaProp(#form, #genitive)
                  end if
                end if
                t_ar_mp_words.append(tEntry)
              else
                error(me, "Friend was not actually on friend list!!", #ParseText)
              end if
            else
              if getPos(t_ar_matchtable, #room) <> 0 then
                t_ar_mp_words.append([#word: t_cCurrWord, #valid: tValid, #source: #room, #code: VOID, #capitalized: tCapitalized])
              end if
            end if
          end if
          next repeat
        end if
        t_ar_mp_words.append([#word: t_cCurrWord, #valid: 0, #source: #ownName, #code: VOID, #capitalized: tCapitalized])
      end repeat
      return t_ar_mp_words
    end if
  else
    error(me, "Dictionary has not loaded correctly!", #ParseText)
  end if
  return []
end
on FirstCharIsCapital me, a_cWord
  tNum = charToNum(a_cWord.char[1])
  if tNum >= 65 and tNum <= 90 then
    return 1
  else
    return 0
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
on FirstCharToUpper me, a_cWord
  tNum = charToNum(a_cWord.char[1])
  if tNum >= 97 and tNum <= 122 then
    return string(numToChar(tNum - 32)) & chars(a_cWord, 2, the length of a_cWord)
  else
    return a_cWord
  end if
end
on SetFreeWordList me, a_ar_words
  m_ar_freeWords = a_ar_words.duplicate()
  m_dictionary.GetFreeWordTree().ClearWords()
  m_dictionary.GetFreeWordTree().AppendWords(a_ar_words)
end
on SetFriendWordList me, a_ar_words
  m_ar_friendWords = a_ar_words.duplicate()
  m_dictionary.GetFriendListWordTree().ClearWords()
  m_dictionary.GetFriendListWordTree().AppendWords(a_ar_words)
end
on SetOwnNameWordList me, a_ar_words
  m_ar_ownWords = a_ar_words.duplicate()
  m_dictionary.GetOwnNameWordTree().ClearWords()
  m_dictionary.GetOwnNameWordTree().AppendWords(a_ar_words)
end
on GetFreeWordList me, a_ar_words
  return m_ar_freeWords.duplicate()
end
on GetFriendWordList me, a_ar_words
  return m_ar_friendWords.duplicate()
end
on GetOwnNameWordList me, a_ar_words
  return m_ar_ownWords.duplicate()
end
on MatchFriendWithForm me, a_sWord, a_ar_words, o_mp_flags
  tPos = a_ar_words.getPos(a_sWord)
  if tPos <> 0 then
    tFriend = getThread("Messenger").getComponent().getFriend(a_sWord)
    if voidp(tFriend) then
      o_mp_flags.setaProp(#friend, 0)
      exit
    end if
    tFriendPos = a_ar_words.getPos(tFriend.name)
    tOffset = tPos - tFriendPos
    case tOffset of
      0, 3, 6:
        o_mp_flags.setaProp(#form, #nominative)
      1, 4, 7, -2, -1:
        o_mp_flags.setaProp(#form, #plural)
      2, 5, 8, -6, -5, -4, -3:
        o_mp_flags.setaProp(#form, #genitive)
      otherwise:
        o_mp_flags.setaProp(#form, #nominative)
        error(me, "Invalid offset in friend name list! Offset: " && tOffset, #MatchFriendWithForm)

    end case
    o_mp_flags.setaProp(#friend, 1)
  else
    o_mp_flags.setaProp(#friend, 0)
  end if
end
on TransformCannedToMsg me, a_ar_mp_cannedMap, a_bNoPhraseLength
  tMsg = [:]
  if not a_bNoPhraseLength then
    tMsg.addProp(#int, a_ar_mp_cannedMap.count)
  end if
  repeat with tEntry in a_ar_mp_cannedMap
    case tEntry.source of
      #ownName:
        tMsg.addProp(#int, 0)
        tMsg.addProp(#str, tEntry.word)
      #friend:
        case tEntry.form of
          #nominative:
            tMsg.addProp(#int, -1)
          #genitive:
            tMsg.addProp(#int, -3)
          #plural:
            tMsg.addProp(#int, -4)
          otherwise:
            error(me, "Invalid form of friend's name !", #TransformCannedToMsg)

        end case
        tMsg.addProp(#int, tEntry.code)
      #room:
        tMsg.addProp(#int, -2)
        tMsg.addProp(#str, tEntry.word)
      #dictionary:
        if tEntry.capitalized then
          tMsg.addProp(#int, -1000)
        end if
        tIndex = tEntry.code
        tMsg.addProp(#int, tIndex)
      #linefeed:
        tMsg.addProp(#int, -1001)

    end case
  end repeat
  return tMsg
end
on TransformCannedMsgToString me, a_rMsg
  tDecodedMessage = EMPTY
  tCount = a_rMsg.connection.GetIntFrom()
  repeat with i = 1 to tCount
    tWordIndex = a_rMsg.connection.GetIntFrom()
    if tWordIndex = -1000 then
      tWordIndex = a_rMsg.connection.GetIntFrom()
      if tWordIndex = -1001 then
        tDecodedMessage = tDecodedMessage & RETURN
      else
        tDecodedMessage = tDecodedMessage & me.FirstCharToUpper(me.getWordOfIndex(tWordIndex))
      end if
      next repeat
    end if
    if tWordIndex = -1001 then
      tDecodedMessage = tDecodedMessage & RETURN
      next repeat
    end if
    if tWordIndex = 0 then
      tDecodedMessage = tDecodedMessage & a_rMsg.connection.GetStrFrom()
      next repeat
    end if
    if tWordIndex < 0 and tWordIndex > -255 then
      repeat with i = -1 down to tWordIndex
        tDecodedMessage = tDecodedMessage & "*"
      end repeat
      next repeat
    end if
    tDecodedMessage = tDecodedMessage & me.getWordOfIndex(tWordIndex)
  end repeat
  return tDecodedMessage
end
on ValidateFreeWord me, a_sWord, a_ar_symOptions, o_ar_matches
  tAllowFriendNames = 1
  tAllowOwnName = 1
  tAllowFreeWords = 1
  if not voidp(a_ar_symOptions) then
    if a_ar_symOptions.getPos(#DisAllowFriendNames) <> 0 then
      tAllowFriendNames = 0
    end if
    if a_ar_symOptions.getPos(#DisAllowOwnName) <> 0 then
      tAllowOwnName = 0
    end if
    if a_ar_symOptions.getPos(#DisAllowFreeWords) <> 0 then
      tAllowFreeWords = 0
    end if
  end if
  tOut = 0
  if tAllowFreeWords and m_ar_freeWords.getPos(a_sWord) <> 0 then
    if not voidp(o_ar_matches) then
      o_ar_matches.append(#room)
    end if
    tOut = 1
  end if
  if tAllowFriendNames then
    tForm = [:]
    me.MatchFriendWithForm(a_sWord, m_ar_friendWords, tForm)
    if tForm.friend then
      if not voidp(o_ar_matches) then
        o_ar_matches.append(#friend)
        o_ar_matches.append(tForm.form)
      end if
      tOut = 1
    end if
  end if
  if tAllowOwnName and m_ar_ownWords.getPos(a_sWord) <> 0 then
    if not voidp(o_ar_matches) then
      o_ar_matches.append(#ownName)
    end if
    tOut = 1
  end if
  return tOut
end
on stringsIdentical me, a_string1, a_string2
  if a_string1.length <> a_string2.length then
    return 0
  end if
  repeat with i = 1 to a_string1.length
    if charToNum(a_string1.char[i]) <> charToNum(a_string2.char[i]) then
      return 0
    end if
  end repeat
  return 1
end
on isSeparator me, i_cKey
  return m_sSeparators contains i_cKey
end
on isStopper me, i_iWordIndex
  return 0
end
on getWordOfIndex me, a_iIndex
  return m_dictionary.GetWordListObj().getWordOfIndex(a_iIndex)
end
on TestPartialWord me, a_sWord, a_ar_symOptions, o_ar_matches
  tAllowFriendNames = 1
  tAllowOwnName = 1
  tAllowFreeWords = 1
  if not voidp(a_ar_symOptions) then
    if a_ar_symOptions.getPos(#DisAllowFriendNames) <> 0 then
      tAllowFriendNames = 0
    end if
    if a_ar_symOptions.getPos(#DisAllowOwnName) <> 0 then
      tAllowOwnName = 0
    end if
    if a_ar_symOptions.getPos(#DisAllowFreeWords) <> 0 then
      tAllowFreeWords = 0
    end if
  end if
  tDictMatch = m_dictionary.GetDictionaryWordTree().FindWord(me.FirstCharToLower(a_sWord))
  if tAllowFreeWords then
    tFreeMatch = m_dictionary.GetFreeWordTree().FindWord(me.FirstCharToLower(a_sWord))
  else
    tFreeMatch = EMPTY
  end if
  if tAllowFriendNames then
    tFriendMatch = m_dictionary.GetFriendListWordTree().FindWord(me.FirstCharToLower(a_sWord))
  else
    tFriendMatch = EMPTY
  end if
  if tAllowOwnName then
    tOwnMatch = m_dictionary.GetOwnNameWordTree().FindWord(me.FirstCharToLower(a_sWord))
  else
    tOwnMatch = EMPTY
  end if
  if not voidp(o_ar_matches) then
    o_ar_matches = []
    if tFreeMatch = a_sWord then
      o_ar_matches.append(#room)
    end if
    if tFriendMatch = a_sWord then
      o_ar_matches.append(#friend)
    end if
    if tOwnMatch = a_sWord then
      o_ar_matches.append(#ownName)
    end if
  end if
  tLongestMatch = 0
  if tFreeMatch.length > tLongestMatch then
    tLongestMatch = tFreeMatch.length
  end if
  if tFriendMatch.length > tLongestMatch then
    tFreeMatch = tFriendMatch
    tLongestMatch = tFriendMatch.length
  end if
  if tOwnMatch.length > tLongestMatch then
    tFreeMatch = tOwnMatch
    tLongestMatch = tOwnMatch.length
  end if
  return not (the length of tDictMatch < the length of a_sWord and the length of tFreeMatch < the length of a_sWord)
end
on DecrunchABunchOfWords me, a_iCount
  t_ar_range = []
  tRangeEnd = m_iExpandOffset + a_iCount
  if not listp(m_ar_rawList) then
    return 0
  end if
  if tRangeEnd >= m_ar_rawList.count then
    tRangeEnd = m_ar_rawList.count
    m_bDecrunched = 1
  end if
  repeat with i = m_iExpandOffset to tRangeEnd
    t_ar_range.append(m_ar_rawList[i])
  end repeat
  m_iExpandOffset = m_iExpandOffset + a_iCount + 1
  m_dictionary.add(t_ar_range)
  if m_ar_rawList.count > 0 then
    return float(m_iExpandOffset) / float(the count of m_ar_rawList)
  else
    return 0
  end if
end
on update me
  if netDone(m_netID) and not m_bGotRaw then
    tText = netTextResult(m_netID)
    t_bError = 0
    if netError(m_netID) = "OK" then
      m_ar_rawList = value(tText)
    else
      t_bError = 1
    end if
    if voidp(m_ar_rawList) or t_bError then
      tMsg = getDownloadManager().solveNetErrorMsg(netError(m_netID))
      if not DialogWindowExists("DictionaryError") then
        t = createDialogWindow(me.getID(), "DictionaryError", 1, 1)
        t.setText("Cannot start VMK. The game was unable to download all required resources. Please first check your Internet connection and Firewall settings and then retry logging into the game. If the problem persists, please send feedback using the feedback forms in VMK.com.", "ERROR", "OK")
        t.show()
        return 0
      end if
    end if
    m_dictionary = createObject("VMK_Dictionary", "CDictionary")
    m_bGotRaw = 1
    m_bDecrunched = 0
    ShowCustomLoadingScreen(0)
    if createWindow("dict_status_wnd", "vmk_loadbar.window") then
      t_rWnd = getWindow("dict_status_wnd")
      t_rWnd.center()
      t_rWnd.getElement("basic.content.text").setText(getText("dict.preparing"))
      createObject("dict_status_bar", "Loading Bar Class")
      t_rProps = [:]
      t_rProps.setaProp(#buffer, t_rWnd.getElement("bar").getProperty(#buffer).image)
      t_rProps.setaProp(#width, 200)
      t_rProps.setaProp(#height, 20)
      t_rProps.setaProp(#type, #other)
      getObject("dict_status_bar").Define(me.getID(), t_rProps)
    end if
    getWindowManager().lock()
  end if
  if m_bGotRaw and not m_bDecrunched then
    t = the milliSeconds
    m_fPercentReady = me.DecrunchABunchOfWords(100)
    getWindow("dict_status_wnd").getElement("basic.content.text").setText(getText("dict.preparing") & RETURN & integer(m_fPercentReady * 100) & "%")
    t = the milliSeconds - t
    m_iTimeElapsed = m_iTimeElapsed + t
  else
    if m_bDecrunched then
      put "Dictionary parsed in" && m_iTimeElapsed && "ms."
      getWindowManager().unlock()
      RemoveCustomLoadingScreen()
      removeUpdate(me.getID())
      removeObject("dict_status_bar")
      removeWindow("dict_status_wnd")
      executeMessage(#dictionary_ready)
      getThread(#main).component.GetProcessManager().ProcessReadyCallback(m_iProcessNumber)
    end if
  end if
end
on dialogWindowEvent this, a_sDialogName, a_sDialogEvent
  if textExists("game.exit.url") then
    t_sExitURL = getText("game.exit.url")
  else
    t_sExitURL = "https://secure.disney.go.com/vmk/en_US/index?name=LoginPage"
  end if
  gotoNetPage(t_sExitURL, "_self")
end
on getLoadPercent this
  return m_fPercentReady
end
on GetDictionary me
  return m_dictionary
end