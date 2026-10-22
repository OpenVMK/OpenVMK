-- Movie Script
property m_sWndTitle
property m_sClientElement
property m_bVisible
property m_bValidFlag
property m_ar_cWords
property m_sPhotoPopupWndTitle
property m_bFlashing
property m_iLastFrameFlashColor
property m_iFlashCounter
property m_iFLASHDELAY
property m_colorInput
property m_colorNonMatch
property m_bScrolling
property m_bAllowErrors
property m_bNotified
property m_bAllowEmpty
property m_ar_symParseOptions

on construct me
  m_bVisible = 0
  m_bValidFlag = 0
  m_bFlashing = 0
  m_bScrolling = 0
  m_bAllowErrors = 0
  m_bAllowEmpty = 0
  m_ar_symParseOptions = []
  m_iLastFrameFlashColor = #red
  m_iFlashCounter = 0
  m_iFLASHDELAY = 5
  m_ar_cWords = []
  m_colorInput = rgb("#000000")
  m_colorNonMatch = rgb(255, 0, 0)
  m_colorBgr = rgb(0, 0, 0)
  m_bNotified = 0
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  m_cCurrWord = EMPTY
  m_bValidFlag = 0
  m_ar_cWords = []
  removeUpdate(me.getID())
  return 1
end
on Init me, t_sWindowTitle, t_sFieldElement, t_pNormalColor, t_pErrorColor
  if not voidp(t_sWindowTitle) then
    m_sWndTitle = t_sWindowTitle
  end if
  if not voidp(t_sFieldElement) then
    m_sClientElement = t_sFieldElement
  end if
  if not voidp(t_pNormalColor) then
    m_colorInput = t_pNormalColor
  end if
  if not voidp(t_pErrorColor) then
    m_colorNonMatch = t_pErrorColor
  end if
end
on setScrolling me, t_scrolling
  m_bScrolling = t_scrolling
end
on setAllowErrors me, t_newState
  m_bAllowErrors = t_newState
end
on setAllowEmpty me, i_bValue
  m_bAllowEmpty = i_bValue
end
on getAllowEmpty me
  return m_bAllowEmpty
end
on setAllowFriendNames me, t_allowFriendNames
  if not t_allowFriendNames then
    if m_ar_symParseOptions.getPos(#DisAllowFriendNames) = 0 then
      m_ar_symParseOptions.append(#DisAllowFriendNames)
    end if
  else
    m_ar_symParseOptions.deleteOne(#DisAllowFriendNames)
  end if
end
on setAllowOwnName me, t_allowOwnName
  if not t_allowOwnName then
    if m_ar_symParseOptions.getPos(#DisAllowOwnName) = 0 then
      m_ar_symParseOptions.append(#DisAllowOwnName)
    end if
  else
    m_ar_symParseOptions.deleteOne(#DisAllowOwnName)
  end if
end
on setAllowFreeWords me, t_allowFreeWords
  if not t_allowFreeWords then
    if m_ar_symParseOptions.getPos(#DisAllowFreeWords) = 0 then
      m_ar_symParseOptions.append(#DisAllowFreeWords)
    end if
  else
    m_ar_symParseOptions.deleteOne(#DisAllowFreeWords)
  end if
end
on reset me
  tWndObj = getWindow(m_sWndTitle)
  if tWndObj <> 0 then
    tElement = tWndObj.getElement(m_sClientElement)
    if tElement <> 0 then
      tTextField = tElement.getProperty(#sprite).member
      tTextField.color = m_colorInput
      tElement.setText(EMPTY)
    end if
  end if
  m_ar_cWords = []
  m_bValidFlag = 0
  m_bFlashing = 0
  m_bNotified = 0
  set the selStart to 1
  set the selEnd to 1
end
on GetContent me
  return m_ar_cWords
end
on CheckWord me
  tWndObj = getWindow(m_sWndTitle)
  if tWndObj <> 0 then
    tElement = tWndObj.getElement(m_sClientElement)
    if tElement <> 0 then
      tSprite = tElement.getProperty(#sprite)
      tMem = tSprite.member
      tWordLoc = tMem.charPosToLoc(the selStart + 1)
      tOffset = tSprite.loc
      tWordIndex = tSprite.pointToWord(tWordLoc + tOffset)
      if tWordIndex <> -1 then
        tWord = tMem.word[tWordIndex]
        tWord = me.removeLastSeparator(tWord)
        t_tst = TestPartialWord(tWord, m_ar_symParseOptions)
        if not t_tst then
          m_ar_cWords = []
          repeat with i = 1 to tMem.word.count
            t_word = [#word: tMem.word[i], #valid: 1]
            if i = tWordIndex then
              t_word.valid = 0
            end if
            m_ar_cWords.append(t_word)
            if not (i = tMem.word.count) then
              m_ar_cWords.append([#word: " ", #valid: 1])
            end if
          end repeat
          m_bFlashing = 1
        end if
        return t_tst
      end if
    end if
  end if
  return 0
end
on removeLastSeparator me, iWord
  if iWord.length > 1 then
    case iWord.char[iWord.char.count] of
      "!", "?", ",", ".", " ":
        return iWord.char[the count of the char of iWord - 1]

    end case
  end if
  return iWord
end
on CheckContent me, i_KeyCode
  tWndObj = getWindow(m_sWndTitle)
  tElement = tWndObj.getElement(m_sClientElement)
  if tElement <> 0 then
    if not m_bAllowEmpty then
      if tElement.getProperty(#sprite).member.text.length = 0 then
        return 0
      end if
    end if
    m_ar_cWords = []
    m_ar_cWords = ParseCannedField(tElement, m_ar_symParseOptions)
    m_bValidFlag = 0
    tInvalids = 0
    repeat with tWord in m_ar_cWords
      if not tWord.valid then
        tInvalids = 1
        exit repeat
      end if
    end repeat
    repeat with i = 1 to m_ar_cWords.count
      if i > 1 then
        if m_ar_cWords[i].word = " " and m_ar_cWords[i - 1].word = " " then
          return 0
        end if
      end if
    end repeat
    if not tInvalids then
      m_bValidFlag = 1
    else
      if m_bFlashing then
        if the keyCode = 36 then
          if m_bNotified then
            if m_bAllowErrors then
              m_bValidFlag = 1
            end if
            m_bNotified = 0
          else
            m_bNotified = 1
          end if
        end if
      else
        m_bFlashing = 1
      end if
    end if
    if m_bValidFlag then
      t_txt = tElement.getProperty(#sprite).member.text
      if m_bAllowEmpty then
        if t_txt.length = 0 then
          return 1
        end if
      end if
      if me.isEmpty(t_txt) then
        return 0
      end if
      return 1
    end if
  end if
  return 0
end
on isEmpty me, txt
  t_emptyChars = " " & RETURN & TAB & ENTER
  repeat with i = 1 to txt.char.count
    if not (t_emptyChars contains txt.char[i]) then
      return 0
    end if
  end repeat
  return 1
end
on updateContent me
  tWndObj = getWindow(m_sWndTitle)
  tElement = tWndObj.getElement(m_sClientElement)
  if tElement <> 0 then
    tTextField = tElement.getProperty(#sprite).member
    if m_bFlashing then
      tTextField.color = m_colorInput
      m_ar_cWords = []
      m_bValidFlag = 0
      m_bFlashing = 0
      m_bNotified = 0
    end if
    if m_bScrolling then
      tElement.updateText()
    end if
  end if
  if the commandDown or the optionDown or the controlDown then
    if the key = "v" or the key = "V" then
      return 0
    end if
  end if
  return 1
end
on update me
  t_error = 1
  tWndObj = getWindow(m_sWndTitle)
  if tWndObj <> 0 then
    tElement = tWndObj.getElement(m_sClientElement)
    if tElement <> 0 then
      tTextField = tElement.getProperty(#sprite).member
      t_error = 0
    end if
  end if
  if not t_error then
    if tTextField.text = EMPTY then
    else
      if keyPressed(BACKSPACE) then
        if the keyboardFocusSprite = tElement.getProperty(#sprite).spriteNum then
          if (the environment).productVersion = "10.2" then
            if (the environment).productBuildVersion = "21" then
              t_sText = tTextField.text
              delete char -30000 of t_sText
              tTextField.text = t_sText
              me.updateContent()
            end if
          end if
        end if
      end if
    end if
    if m_bFlashing then
      if m_iFlashCounter = 0 then
        m_iFlashCounter = m_iFLASHDELAY
        if m_iLastFrameFlashColor = #red then
          tTextField.color = m_colorInput
          m_iLastFrameFlashColor = #white
        else
          m_iLastFrameFlashColor = #red
          c = 1
          repeat with i = 1 to m_ar_cWords.count
            w = m_ar_cWords[i]
            repeat with ch = 1 to w.word.length
              if not w.valid then
                tTextField.char[c].color = m_colorNonMatch
              end if
              c = c + 1
            end repeat
          end repeat
        end if
      else
        m_iFlashCounter = m_iFlashCounter - 1
      end if
    end if
  end if
end