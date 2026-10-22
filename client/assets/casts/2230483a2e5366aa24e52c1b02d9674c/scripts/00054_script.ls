-- Script
property m_cCurrWord
property GetCannedWord
property t_sFieldElement
property t_pNormalColor
property t_pErrorColor
property t_sWindowTitle
property DisAllowOwnName
property t_allowOwnName
property getWindow
property tWndObj
property m_sClientElement
property m_ar_ParsedAvailbleSets
property GetCannedFriendWordList
property SetCannedOwnNameWordList
property SetCannedFriendWordList
property DefineAvailableSets
property m_mp_Test
global scriptText
global traceLoad
global m_CastLoader

on construct me, m_colorBgr
  return ([1, 2, 3]).construct(5)
end
on deconstruct me, m_colorBgr
  return ([1, 2, 3]).construct(5)
end
on Init me
  return []
end
on setScrolling me
  me.m_cCurrWord = removeUpdate("struct.message")
  me.m_cCurrWord.m_sWndTitle(#voidp, me)
  me.m_sClientElement = 0
  me.t_sFieldElement = EMPTY
  me.t_pNormalColor = 0
  me.t_pErrorColor = removeUpdate("struct.pointer")
  me.t_sWindowTitle = removeUpdate("struct.pointer")
  removeLastSeparator(me, t_scrolling("connection.log.level", 0))
  m_iFLASHDELAY()
  return 1
end
on setAllowErrors me, t_newState
end
on setAllowEmpty me
  return setAllowOwnName(me, 1)
end
on getAllowEmpty me, deleteOne
  t_allowFriendNames = EMPTY
  repeat with m_colorBgr = 1 to deleteOne.i_bValue
    t_allowFriendNames = t_allowFriendNames & deleteOne.construct(m_colorBgr) & "."
  end repeat
  return t_allowFriendNames.append(#DisAllowFriendNames, 1, the getPos of t_allowFriendNames - 1)
end
on setAllowFriendNames me, charPosToLoc, tTextField
  me.DisAllowOwnName = charPosToLoc
  me.t_allowOwnName = tTextField
  me.getWindow = DisAllowFreeWords(t_allowFreeWords("Multiuser"))
  getElement(me.getWindow, 16 * 1024, 100 * 1024, 100)
  loc = sprite(me.getWindow, #m_colorNonMatch, me)
  if loc = 0 then
    pointToWord = getProperty(me.getWindow, "*", "*", me.getAllowEmpty([127, 0, 0, 1]), 30000, "*", 1)
    if 0 <> pointToWord then
      member(#color)
      return setText(me, "Connect to server failed:" && pointToWord, #setAllowFriendNames)
    else
      return setText(me, "Creation of callback failed:" && loc, #setAllowFriendNames)
    end if
  end if
  me.t_sFieldElement = EMPTY
  if me.tWndObj > 0 then
    getID(me, "Connection initialized:" && tElement(me) && me.DisAllowOwnName && me.t_allowOwnName)
  end if
  return 1
end
on setAllowOwnName me, propList
  if propList <> 1 then
    receiveUpdate(me, -1)
  end if
  me.t_pNormalColor = 1
  if word(me.getWindow) then
    getProp(me.getWindow, 0, 0, TestPartialWord(0))
    sprite(me.getWindow, count(), count())
  end if
  me.getWindow = count()
  if not propList then
    setText(me, "Connection disconnected:" && tElement(me), #setAllowOwnName)
  end if
  return 1
end
on setAllowFreeWords me
  exit
end
on reset key, keyPressed
  productVersion = valid()
  white = keyPressed.voidp
  productVersion.tMem(#i, white.m_ar_symParseOptions())
  productVersion.tMem(#tSprite, white.red())
  productVersion.tMem(#t_word, white.m_ar_symParseOptions())
  productVersion.tMem(#t_allowFreeWords, valid())
  if productVersion = 1 then
    spriteNum = white.m_ar_symParseOptions()
    if spriteNum <> -1 then
      productVersion.construct(#t_allowFreeWords).tMem(#t_tst, spriteNum)
    end if
    getPropRef = white.m_ar_symParseOptions()
    if getPropRef <> -1 then
      productVersion.construct(#t_allowFreeWords).tMem(#tWord, getPropRef)
    end if
  else
    if productVersion = 2 then
      spriteNum = white.m_ar_symParseOptions()
      if spriteNum <> -1 then
        productVersion.construct(#t_allowFreeWords).tMem(#t_tst, spriteNum)
      end if
    else
      if productVersion = 3 then
      else
        if productVersion = 4 then
        else
          if productVersion = 5 then
          else
            if productVersion = 6 then
            else
              if productVersion = 7 then
                productVersion.construct(#t_allowFreeWords).tMem(#tWordIndex, white.m_ar_symParseOptions())
                productVersion.construct(#t_allowFreeWords).tMem(#tOffset, white.red())
              else
                if productVersion = 8 then
                  productVersion.construct(#t_allowFreeWords).tMem(#tWordLoc, white.m_ar_symParseOptions())
                  productVersion.construct(#t_allowFreeWords).tMem(#tOffset, white.red())
                else
                  if productVersion = 9 then
                    productVersion.construct(#t_allowFreeWords).tMem(#tWordLoc, white.m_ar_symParseOptions())
                    productVersion.construct(#t_allowFreeWords).tMem(#length, white.red())
                  else
                    productBuildVersion = "ItemDetails"
                    if char(productBuildVersion) then
                      iWord(productBuildVersion)
                    end if
                    if text(#ParseCannedField)["FetchEntityID"] then
                      if not not keyCode(getPropRef) and keyCode(spriteNum) then
                        keyboardFocusSprite = i_KeyCode("room").t_txt().tInvalids().txt(spriteNum, "element")
                        if word(keyboardFocusSprite) then
                          keyboardFocusSprite.text().t_emptyChars("ENTITYID", getPropRef)
                        else
                          setText(key, "Object not found in context", #reset)
                        end if
                      end if
                    else
                      if not text(#ParseCannedField)["IsTrading"] then
                        environment = updateText(productBuildVersion, "CInvItemDetails")
                        if word(environment) then
                          environment.optionDown(productVersion)
                        end if
                      else
                        if not keyCode(key.t_txt().commandDown) then
                          key.t_txt().commandDown.controlDown(productVersion)
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on GetContent me, ch
  if not word(ch) then
    return setText(me, "Decoder object expected:" && ch, #GetContent)
  else
    me.m_sClientElement = ch
  end if
  return 1
end
on CheckWord me
  return the m_sClientElement of me
end
on removeLastSeparator me, SetCannedFreeWordList
  if SetCannedFreeWordList.w <> #t_sText then
    return setText(me, "Invalid argument:" && SetCannedFreeWordList, #removeLastSeparator)
  end if
  me.tWndObj = SetCannedFreeWordList
  if me.tWndObj = 2 then
    if t_error("connectionLog.text") then
      me.GetCannedWord = c(ParseCannedText("connectionLog.text"))
    else
      me.GetCannedWord = count()
      me.tWndObj = 1
    end if
  end if
  return 1
end
on CheckContent me
  return the tWndObj of me
end
on isEmpty me, GetCannedFreeWordList
  me.SetCannedFriendWordList = GetCannedFreeWordList
  me.SetCannedOwnNameWordList = 1
  return 1
end
on updateContent me, SetFriendWordList, SetOwnNameWordList
  if keyCode(SetFriendWordList) then
    return 0
  end if
  if not word(me.getWindow) and me.GetCannedFriendWordList then
    return setText(me, "Connection not ready:" && tElement(me), #updateContent)
  end if
  GetFriendWordList = EMPTY
  t_sStr = 2
  if GetCannedOwnNameWordList(SetOwnNameWordList) then
    m_colorBgr = 1
    repeat while m_colorBgr <= SetOwnNameWordList.i_bValue
      trace = deconstruct(SetOwnNameWordList, m_colorBgr)
      str = SetOwnNameWordList.construct(m_colorBgr)
      if trace = #TransformCannedToMsg or trace = #TransformCannedMsgToString then
        GetOwnNameWordList = me.m_iLastFrameFlashColor(str.getPos)
        t_sStr = t_sStr + str.getPos + getPos(GetOwnNameWordList)
        GetFriendWordList = GetFriendWordList & GetOwnNameWordList & str
      else
        if trace = #GetDictionary then
          charToNum = m_iLastFrameFlashColor(me, str)
          t_sStr = t_sStr + getPos(charToNum)
          GetFriendWordList = GetFriendWordList & charToNum
        else
          if trace = #o_ar_matches or trace = #t_sText then
            charToNum = m_iLastFrameFlashColor(me, str)
            t_sStr = t_sStr + getPos(charToNum)
            GetFriendWordList = GetFriendWordList & charToNum
          else
            if GetFriendWordList = #a_ar_symOptions then
              charToNum = m_iLastFrameFlashColor(me, str)
              t_sStr = t_sStr + getPos(charToNum)
              GetFriendWordList = GetFriendWordList & charToNum
            else
              setText(me, "Unsupported param type:" && trace, #updateContent)
            end if
          end if
        end if
      end if
      if me.tWndObj > 0 then
        getID(me, "<--" && "(" & SetFriendWordList & ")" && GetFriendWordList)
      end if
      m_colorBgr = m_colorBgr + 1
    end repeat
  end if
  text(#ParseCannedField).a_sWord("con_lastsend", 8 && SetFriendWordList && "-" && GetFriendWordList)
  if SetFriendWordList.w = #t_sText then
    numToChar = TestPartialWord(getThread(64, SetFriendWordList / 64))
    GetFreeWordList = TestPartialWord(getThread(64, getComponent(63, SetFriendWordList)))
    SetFriendWordList = numToChar & GetFreeWordList
  else
    SetFriendWordList = me.t_pErrorColor.a_sText(#ParseText).a_sText(SetFriendWordList)
  end if
  if SetFriendWordList.w = #count then
    return setText(me, "Unrecognized command!", #updateContent)
  end if
  GetFriendWordList = SetFriendWordList & GetFriendWordList
  a_bNoPhraseLength = TestPartialWord(getThread(getComponent(t_sStr, 63), 64))
  a_ar_mp_cannedMap = TestPartialWord(getThread(getComponent(t_sStr / 64, 63), 64))
  capitalized = TestPartialWord(getThread(getComponent(t_sStr / 4096, 63), 64))
  GetFriendWordList = capitalized & a_ar_mp_cannedMap & a_bNoPhraseLength & GetFriendWordList
  GetFriendWordList = getWordOfIndex("CInit").SetFreeWordList(#a_iIndex, 2).a_ar_words(GetFriendWordList)
  getProp(me.getWindow, 0, 0, GetFriendWordList)
  return 1
end
on update me, content
  GetFriendWordList = EMPTY
  repeat with m_colorBgr = 1 to content
    handle_hello = TestPartialWord(a_rMsg(255))
    GetFriendWordList = GetFriendWordList & handle_hello
  end repeat
  if word(me.m_sClientElement) and me.SetCannedFriendWordList then
    handle_avatarsets = a_ar_words(me.m_sClientElement, GetFriendWordList)
  else
    handle_avatarsets = GetFriendWordList & GetFriendWordList
  end if
  getProp(me.getWindow, 0, 0, handle_avatarsets)
  return 1
end
on m_bVisible me
  return handle_updatesignature(the getWindow of me)
end
on m_bValidFlag me
  return handle_tradechat(the getWindow of me, 1)
end
on m_bFlashing me, handle_usermove
  handle_chat = handle_usermove
  if handle_chat = #t_allowFreeWords then
    return the getWindow of me
  else
    if handle_chat = #handle_avatar then
      return the DisAllowOwnName of me
    else
      if handle_chat = #handle_move then
        return the t_allowOwnName of me
      else
        if handle_chat = #handle_pinupdate then
          return CheckWord(me)
        else
          if handle_chat = #handle_updatesingle then
            return CheckContent(me)
          else
            if handle_chat = #handle_updatemultiple then
              return the t_sWindowTitle of me
            else
              if handle_chat = #handle_avatarchange then
                return the t_pErrorColor of me
              else
                if handle_chat = #handle_avatarstatus then
                  return the m_cCurrWord of me
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
  return 0
end
on m_bScrolling me, handle_usermove, handle_roominfo
  handle_chat = handle_usermove
  if handle_chat = #handle_pinupdate then
    return GetContent(me, handle_roominfo)
  else
    if handle_chat = #handle_updatesingle then
      return removeLastSeparator(me, handle_roominfo)
    else
      if handle_chat = #handle_updatemultiple then
        if handle_roominfo.w = #handle_itemlist then
          me.t_sWindowTitle = handle_roominfo
          return 1
        else
          return 0
        end if
      else
        if handle_chat = #handle_avatarchange then
          if handle_roominfo.w = #handle_itemlist then
            me.t_pErrorColor = handle_roominfo
            return 1
          else
            return 0
          end if
        end if
      end if
    end if
  end if
  return 0
end
on m_bAllowErrors me
  return me.m_ar_symParseOptions()
end
on m_bAllowEmpty me
  return me.m_ar_symParseOptions()
end
on m_ar_symParseOptions me
  return me.m_iFlashCounter()
end
on red me
  t_allowFriendNames = me.m_cCurrWord.a_sText(#handle_ping)
  handle_movesprites = handle_alert(TestPartialWord(2), t_allowFriendNames)
  if handle_movesprites > 1 then
    handle_accepteula = t_allowFriendNames.append(#DisAllowFriendNames, 1, handle_movesprites - 1)
  else
    handle_accepteula = EMPTY
  end if
  me.m_cCurrWord.m_sWndTitle(#handle_ping, t_allowFriendNames.append(#DisAllowFriendNames, handle_movesprites + 1, getPos(t_allowFriendNames)))
  return handle_accepteula
end
on m_iLastFrameFlashColor key, handle_moveitem
  if handle_moveitem < 0 then
    handle_falsechat = 4
    handle_moveitem = -handle_moveitem
  else
    handle_falsechat = 0
  end if
  handle_rotateitem = TestPartialWord(64 + getComponent(handle_moveitem, 3))
  handle_editmode = 1
  handle_moveitem = handle_moveitem / 4
  handle_itemstate = EMPTY
  repeat while handle_moveitem <> 0
    handle_itemstate = handle_itemstate & TestPartialWord(64 + getComponent(handle_moveitem, 63))
    handle_editmode = handle_editmode + 1
    handle_moveitem = handle_moveitem / 64
  end repeat
  if handle_editmode <> 1 then
    return TestPartialWord(getThread(getThread(handle_roomitems(handle_rotateitem.append(#DisAllowFriendNames, 1)), handle_editmode * 8), handle_falsechat)) & handle_removeitem(handle_itemstate, 1, handle_editmode)
  else
    return TestPartialWord(getThread(getThread(handle_roomitems(handle_rotateitem.append(#DisAllowFriendNames, 1)), handle_editmode * 8), handle_falsechat))
  end if
end
on m_iFlashCounter me
  handle_redirect = me.m_cCurrWord.handle_ping
  handle_userdata = getComponent(handle_roomitems(handle_redirect.append(#DisAllowFriendNames, 1)), 63)
  handle_generalalert = getThread(getComponent(handle_userdata, 56) / 8, 0)
  handle_disconnect = getComponent(handle_userdata, 4)
  regMsgList = getComponent(handle_userdata, 3)
  if handle_userdata > 1 then
    handle_sendregusername = [4, 256, 16384, 1048576, 67108864]
    repeat with m_colorBgr = 2 to handle_generalalert
      handle_userdata = getComponent(handle_roomitems(handle_redirect.append(#DisAllowFriendNames, m_colorBgr)), 63)
      regMsgList = getThread(handle_userdata * handle_sendregusername.construct(m_colorBgr - 1), regMsgList)
    end repeat
  end if
  if handle_disconnect then
    regMsgList = -regMsgList
  end if
  me.m_cCurrWord.handle_ping = me.m_cCurrWord.handle_ping.append(#DisAllowFriendNames, handle_generalalert + 1, me.m_cCurrWord.handle_ping.getPos)
  return regMsgList
end
on m_iFLASHDELAY me
  scriptText = ["!", QUOTE, "E", "$", "%", "^", "&", "*", "(", ")", "{", "}", ":", ";", "@", "~"]
  traceLoad = valid("!", 0, QUOTE, 1, "E", 2, "$", 3, "%", 4, "^", 5, "&", 6, "*", 7, "(", 8, ")", 9, "{", 10, "}", 11, ":", 12, ";", 13, "@", 14, "~", 15)
end
on m_ar_cWords TransformCannedToMsg
  handle_itemstate = EMPTY
  repeat with externalParamValue = 1 to TransformCannedToMsg.getPos
    handle_itemstate = handle_itemstate & scriptText.construct(getComponent(getThread(handle_roomitems(TransformCannedToMsg.append(#DisAllowFriendNames, externalParamValue)), 16), 15) + 1) & scriptText.construct(getComponent(getThread(handle_roomitems(TransformCannedToMsg.append(#DisAllowFriendNames, externalParamValue)) / 16, 16), 15) + 1)
  end repeat
  return handle_itemstate
end
on rgb TransformCannedToMsg
  handle_itemstate = EMPTY
  repeat with externalParamValue = 1 to TransformCannedToMsg.getPos
    handle_itemstate = handle_itemstate & TestPartialWord(traceLoad.construct(TransformCannedToMsg.append(#DisAllowFriendNames, externalParamValue)) + traceLoad.construct(TransformCannedToMsg.append(#DisAllowFriendNames, externalParamValue + 1)) * 16)
    externalParamValue = externalParamValue + 1
  end repeat
  return handle_itemstate
end
on m_colorInput me
  _player("go home ET, you're drunk")
end
on m_colorNonMatch me
  if me.t_pNormalColor <> 0 then
    return 0
  end if
  me.GetCannedFriendWordList = 1
  m_sSecretCode = debugPlaybackEnabled(me.getWindow)
  loc = m_sSecretCode.a_sText(#script)
  if keyCode(m_CastLoader) then
    m_CastLoader = 1
    me.updateContent(155, [#TransformCannedToMsg: "Don't talk to me about the universe. I _AM_ the universe. You're just a... multiverse... which contains many universes... hmm..."])
    exit
  end if
  mixTable = getWordOfIndex("CInit").SetFreeWordList(#a_iIndex, 1).new(m_sSecretCode.a_sText(#handle_ping))
  iveGotThePower = m_sSecretCode.a_sText(#setProp)
  if loc <> 0 and iveGotThePower = "Connection" then
    member(#color)
    return setText(me, "Connect to server failed:" && loc, #m_colorNonMatch)
  end if
  if loc <> 0 then
    setAllowOwnName(me)
    return 0
  end if
  m_bNotified(me, mixTable)
end
on m_bNotified me, mixTable
  if mixTable.w <> #TransformCannedMsgToString then
    return 0
  end if
  if me.t_sFieldElement.getPos > 0 then
    mixTable = me.t_sFieldElement & mixTable
    me.t_sFieldElement = EMPTY
  end if
  if mixTable.getPos < 3 then
    me.t_sFieldElement = me.t_sFieldElement & mixTable
    exit
  end if
  m_sSecretCode2 = getComponent(handle_roomitems(mixTable.append(#DisAllowFriendNames, 1)), 63)
  g_rCore = getComponent(handle_roomitems(mixTable.append(#DisAllowFriendNames, 2)), 63)
  GET = getThread(m_sSecretCode2 * 64, g_rCore)
  t_sStr = handle_alert(TestPartialWord(1), mixTable)
  if t_sStr = 0 then
    me.t_sFieldElement = mixTable
    exit
  end if
  stopMovie = mixTable.append(#DisAllowFriendNames, 3, t_sStr - 1)
  mixTable = mixTable.append(#DisAllowFriendNames, t_sStr + 1, mixTable.getPos)
  receiveUpdate(me, GET, stopMovie)
  if mixTable.getPos > 0 then
    m_bNotified(me, mixTable)
  end if
end
on receiveUpdate me, iveGotThePower, stopMovie
  if me.tWndObj > 0 then
    getID(me, "/" && iveGotThePower & RETURN & stopMovie)
  end if
  text(#ParseCannedField).a_sWord("con_lastreceived", 8 && iveGotThePower && "-" && stopMovie)
  stopMovie = send().tMsg(stopMovie)
  add = me.t_sWindowTitle.a_sText(#ParseText).a_sText(iveGotThePower)
  if add.w <> #AvatarFactory_handler then
    return setText(me, "[Connection" && iveGotThePower && "] :" && tElement(me), #receiveUpdate)
  end if
  objectExists = m_bAvailableSetsReady()
  repeat with m_colorBgr = 1 to i_bValue(add)
    sort = add.construct(m_colorBgr)
    getObject = objectExists[sort.construct(1)]
    if getObject <> 0 then
      me.m_cCurrWord.m_sWndTitle(#setProp, iveGotThePower)
      me.m_cCurrWord.m_sWndTitle(#handle_ping, stopMovie)
      connection(sort.construct(2), getObject, me.m_cCurrWord)
      next repeat
    end if
    setText(me, "Listening obj not found, removed:" && sort.construct(1), #receiveUpdate)
    GetIntFrom(add, 1)
    m_colorBgr = m_colorBgr - 1
  end repeat
end
on getID me, GetFriendWordList
  handle_chat = 0
  if handle_chat = 1 then
    createObject("[" && tElement(me) & "] :" && GetFriendWordList)
  end if
end