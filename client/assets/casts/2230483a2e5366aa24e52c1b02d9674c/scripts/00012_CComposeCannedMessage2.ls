-- Script
on construct me
  me.m_bVisible = 0
  me.m_bValidFlag = 0
  me.m_bFlashing = 0
  me.m_bScrolling = 0
  me.m_bAllowErrors = 0
  me.m_bAllowEmpty = 0
  me.m_ar_symParseOptions = []
  me.m_iLastFrameFlashColor = #red
  me.m_iFlashCounter = 0
  me.m_iFLASHDELAY = 5
  me.m_ar_cWords = []
  me.m_colorInput = rgb("#000000")
  me.m_colorNonMatch = rgb(255, 0, 0)
  m_colorBgr = rgb(0, 0, 0)
  me.m_bNotified = 0
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  m_cCurrWord = EMPTY
  me.m_bValidFlag = 0
  me.m_ar_cWords = []
  removeUpdate(me.getID())
  return 1
end
on Init me, t_sWindowTitle, t_sFieldElement, t_pNormalColor, t_pErrorColor
  if not voidp(t_sWindowTitle) then
    me.m_sWndTitle = t_sWindowTitle
  end if
  if not voidp(t_sFieldElement) then
    me.m_sClientElement = t_sFieldElement
  end if
  if not voidp(t_pNormalColor) then
    me.m_colorInput = t_pNormalColor
  end if
  if not voidp(t_pErrorColor) then
    me.m_colorNonMatch = t_pErrorColor
  end if
end
on setScrolling me, t_scrolling
  me.m_bScrolling = t_scrolling
end
on setAllowErrors me, t_newState
  me.m_bAllowErrors = t_newState
end
on setAllowEmpty me, i_bValue
  me.m_bAllowEmpty = i_bValue
end
on getAllowEmpty me
  return the m_bAllowEmpty of me
end
on setAllowFriendNames me, t_allowFriendNames
  if not t_allowFriendNames then
    if me.m_ar_symParseOptions.getPos(#DisAllowFriendNames) = 0 then
      me.m_ar_symParseOptions.append(#DisAllowFriendNames)
    end if
  else
    me.m_ar_symParseOptions.deleteOne(#DisAllowFriendNames)
  end if
end
on setAllowOwnName me, t_allowOwnName
  if not t_allowOwnName then
    if me.m_ar_symParseOptions.getPos(#DisAllowOwnName) = 0 then
      me.m_ar_symParseOptions.append(#DisAllowOwnName)
    end if
  else
    me.m_ar_symParseOptions.deleteOne(#DisAllowOwnName)
  end if
end
on setAllowFreeWords me, t_allowFreeWords
  if not t_allowFreeWords then
    if me.m_ar_symParseOptions.getPos(#DisAllowFreeWords) = 0 then
      me.m_ar_symParseOptions.append(#DisAllowFreeWords)
    end if
  else
    me.m_ar_symParseOptions.deleteOne(#DisAllowFreeWords)
  end if
end
on reset me
  tWndObj = getWindow(me.m_sWndTitle)
  if tWndObj <> 0 then
    tElement = tWndObj.getElement(me.m_sClientElement)
    if tElement <> 0 then
      tTextField = tElement.getProperty(#sprite).member
      tTextField.color = me.m_colorInput
      tElement.setText(EMPTY)
    end if
    me.m_ar_cWords = []
  end if
  me.m_bValidFlag = 0
  me.m_bFlashing = 0
  me.m_bNotified = 0
end
on GetContent me
  return the m_ar_cWords of me
end
on CheckWord me
  tWndObj = getWindow(me.m_sWndTitle)
  if tWndObj <> 0 then
    tElement = tWndObj.getElement(me.m_sClientElement)
    if tElement <> 0 then
      tSprite = tElement.getProperty(#sprite)
      tMem = tSprite.member
      tWordLoc = tMem.charPosToLoc(7 + 1)
      tOffset = tSprite.loc
      tWordIndex = tSprite.pointToWord(tWordLoc + tOffset)
      if tWordIndex <> -1 then
        tWord = tMem.word[tWordIndex]
        tWord = me.removeLastSeparator(tWord)
        t_tst = TestPartialWord(tWord, me.m_ar_symParseOptions)
        if not t_tst then
          me.m_ar_cWords = []
          repeat with i = 1 to tMem.word.count
            t_word = propList(#word, tMem.word[i], #valid, 1)
            if i = tWordIndex then
              t_word.valid = 0
            end if
            me.m_ar_cWords.append(t_word)
            if not i = tMem.word.count then
              me.m_ar_cWords.append(propList(#word, " ", #valid, 1))
            end if
          end repeat
          me.m_bFlashing = 1
        end if
        return t_tst
      end if
      return 0
    end if
  end if
end
on removeLastSeparator me, iWord
  if iWord.length > 1 then
    if iWord.char[iWord.char.count] <> "!" then
      if iWord.char[iWord.char.count] <> "?" then
        if iWord.char[iWord.char.count] <> "," then
          if iWord.char[iWord.char.count] <> "." then
            if iWord.char[iWord.char.count] = " " then
              return iWord.char[the count of the char of iWord - 1]
            end if
            return iWord
          end if
        end if
      end if
    end if
  end if
end
on CheckContent me, i_KeyCode
  tWndObj = getWindow(me.m_sWndTitle)
  tElement = tWndObj.getElement(me.m_sClientElement)
  if tElement <> 0 then
    if not me.m_bAllowEmpty then
      if tElement.getProperty(#sprite).member.text.length = 0 then
        return 0
      end if
      me.m_ar_cWords = []
    end if
    me.m_ar_cWords = ParseCannedField(tElement, me.m_ar_symParseOptions)
    me.m_bValidFlag = 0
    tInvalids = 0
    repeat while tWndObj <= tInvalids
      tWord = getAt(tInvalids, tElement)
      if not tWord.valid then
        tInvalids = 1
      end if
    end repeat
    repeat with i = 1 to me.m_ar_cWords.count
      if i > 1 then
        if me.m_ar_cWords[i - 1].word = " " and me.m_ar_cWords[i].word = " " then
          return 0
        end if
      end if
    end repeat
    if not tInvalids then
      me.m_bValidFlag = 1
    else
      if me.m_bFlashing then
        if the keyCode = 36 then
          if me.m_bNotified then
            if me.m_bAllowErrors then
              me.m_bValidFlag = 1
            end if
            me.m_bNotified = 0
          else
            me.m_bNotified = 1
          end if
        end if
        me.m_bFlashing = 1
      end if
    end if
    if me.m_bValidFlag then
      t_txt = tElement.getProperty(#sprite).member.text
      if me.m_bAllowEmpty then
        if t_txt.length = 0 then
          return 1
        end if
        if me.isEmpty(t_txt) then
          return 0
        end if
        return 1
      end if
      return 0
    end if
  end if
end
on isEmpty me, txt
  t_emptyChars = " " & "[[RETURN]]" & "    " & ENTER
  repeat with i = 1 to txt.char.count
    if not t_emptyChars contains txt.char[i] then
      return 0
    end if
  end repeat
  return 1
end
on updateContent me
  tWndObj = getWindow(me.m_sWndTitle)
  tElement = tWndObj.getElement(me.m_sClientElement)
  if tElement <> 0 then
    tTextField = tElement.getProperty(#sprite).member
    if me.m_bFlashing then
      tTextField.color = me.m_colorInput
      me.m_ar_cWords = []
      me.m_bValidFlag = 0
      me.m_bFlashing = 0
      me.m_bNotified = 0
    end if
    if me.m_bScrolling then
      tElement.updateText()
    end if
    if the optionDown or the commandDown or the controlDown then
      if the key = "V" or the key = "v" then
        return 0
      end if
      return 1
    end if
  end if
end
on update me
  t_error = 1
  tWndObj = getWindow(me.m_sWndTitle)
  if tWndObj <> 0 then
    tElement = tWndObj.getElement(me.m_sClientElement)
    if tElement <> 0 then
      tTextField = tElement.getProperty(#sprite).member
      t_error = 0
    end if
    if not t_error then
      if tTextField.text = EMPTY then
      else
        if keyPressed(BACKSPACE) then
          if the keyboardFocusSprite = tElement.getProperty(#sprite).spriteNum then
            if (the environment).productVersion = "10.2" then
              if (the environment).productBuildVersion = "21" then
                t_sText = tTextField.text
                c = 4
                tTextField.text = t_sText
                me.updateContent()
              end if
              if me.m_bFlashing then
                if me.m_iFlashCounter = 0 then
                  me.m_iFlashCounter = me.m_iFLASHDELAY
                  if me.m_iLastFrameFlashColor = #red then
                    tTextField.color = me.m_colorInput
                    me.m_iLastFrameFlashColor = #white
                  else
                    me.m_iLastFrameFlashColor = #red
                  end if
                  c = 1
                  repeat with i = 1 to me.m_ar_cWords.count
                    w = me.m_ar_cWords[i]
                    repeat with ch = 1 to w.word.length
                      if not w.valid then
                        tTextField.char[c].color = me.m_colorNonMatch
                      end if
                      c = c + 1
                    end repeat
                  end repeat
                else
                  me.m_iFlashCounter = me.m_iFlashCounter - 1
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end