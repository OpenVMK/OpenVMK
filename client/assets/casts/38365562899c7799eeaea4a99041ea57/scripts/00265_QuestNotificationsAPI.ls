-- Behavior
on array_slice t_ar_array, t_iOffset, t_iLength
  t_ar_out = t_ar_array.duplicate()
  repeat with i = t_iOffset - 1 down to 1
    t_ar_out.deleteAt(i)
  end repeat
  repeat while t_ar_out.count > t_iLength
    t_ar_out.deleteAt(t_ar_out.count)
  end repeat
  return t_ar_out
end
on getAvailableMagics
  t_ar_magics = []
  if getObject("MagicMenu") <> 0 then
    t_rMagic = getObject("MagicMenu")
    t_ar_wornmagics = getObject("MagicMenu").m_mp_FxList.duplicate()
    repeat with t_ar_magic in t_ar_wornmagics
      t_ar_new = [:]
      t_ar_new[#id] = t_ar_magic[#ItemId]
      t_ar_magics.append(t_ar_new)
    end repeat
  end if
  t = [:]
  getThread("inventory").getComponent().GetItemsByCategory(#pins, t)
  repeat with t_ar_magic in t
    if t_ar_magic[#param] > 0 then
      t_ar_new = [:]
      t_ar_new[#id] = t_ar_magic[#code]
      t_ar_magics.append(t_ar_new)
    end if
  end repeat
  return t_ar_magics
end
on CreateQuestNotification t_sID, t_rOwner, t_ar_populate, t_sType, t_ar_data
  if getObject(t_sID) <> 0 then
    removeObject(t_sID)
  end if
  t = createObject(t_sID, "CQuestWindowManager")
  if objectp(t) then
    t.SetOwner(t_rOwner)
    if not voidp(t_sType) then
      t.getInterface().SetType(t_sType)
    end if
    if not voidp(t_ar_populate) then
      t.populate(t_ar_populate)
      t.Activate()
    end if
    if not voidp(t_ar_data) then
      if listp(t_ar_data) then
        if objectp(t.getInterface()) then
          if objectp(t.getInterface().GetBase()) then
            if objectp(t.getInterface().GetBase().getPage()) then
              t.getInterface().GetBase().getPage().rawData(t_ar_data)
            end if
          end if
        end if
      end if
    end if
  end if
  return t
end
on seconds2time a_iSeconds
  t_iSeconds = a_iSeconds mod 60
  t_iMinutes = a_iSeconds / 60 mod 60
  t_iHours = a_iSeconds / 3600
  t_iiSeconds = t_iSeconds
  t_iiMinutes = t_iMinutes
  t_iiHours = t_iHours
  if t_iSeconds < 10 then
    t_iiSeconds = "0" & t_iSeconds
  end if
  if t_iMinutes < 10 then
    t_iiMinutes = "0" & t_iMinutes
  end if
  if t_iHours < 10 then
    t_iiHours = "0" & t_iHours
  end if
  return t_iiHours & ":" & t_iiMinutes & ":" & t_iiSeconds
end
on time2seconds a_sTime
  t_rDelim = the itemDelimiter
  the itemDelimiter = ":"
  t_iSeconds = integer(a_sTime.item[1]) * 3600
  t_iSeconds = t_iSeconds + integer(a_sTime.item[2]) * 60
  t_iSeconds = t_iSeconds + integer(a_sTime.item[3])
  the itemDelimiter = t_rDelim
  return t_iSeconds
end
on parseNavNodeInfo t_ar_List
  t_sNodeText = TAB & TAB & "<ITEM ID=" & QUOTE & "%code%" & QUOTE & ">" & RETURN & TAB & TAB & TAB & "<NODE ID=" & QUOTE & "1" & QUOTE & " CAPTION=" & QUOTE & "ROOM.%code%.NAME" & QUOTE & " EVENT=" & QUOTE & "room.%code%" & QUOTE & " />" & RETURN & TAB & TAB & "</ITEM>"
  t_sContent = RETURN
  if listp(t_ar_List) then
    repeat with t_rNode in t_ar_List
      if listp(t_rNode) then
        t_iTag = t_rNode[#tag]
        t_sContent = t_sContent & replaceChunks(t_sNodeText, "%code%", t_iTag) & RETURN
      end if
    end repeat
  end if
  put t_sContent
end
on TransformCannedToString t_ar_Canned
  t_sWords = EMPTY
  if listp(t_ar_Canned) then
    repeat with t_ar_word in t_ar_Canned
      put t_ar_word[#word] after t_sWords
    end repeat
  end if
  return t_sWords
end
on rank2text a_iRank
  t_iRest = a_iRank mod 10
  if a_iRank < 10 or a_iRank > 20 then
    case t_iRest of
      1:
        return a_iRank & "st"
      2:
        return a_iRank & "nd"
      3:
        return a_iRank & "rd"

    end case
  end if
  return a_iRank & "th"
end
on GetOwnAvatarTile
  t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(getObject(#session).get("room_own_avatar"), "avatar")
  if objectp(t_rObj) then
    t_rAvatarTile = t_rObj.GetFactor().m_rTarget
    if voidp(t_rAvatarTile) then
      t_rAvatarTile = t_rObj.GetFactor().m_rOldTarget
    end if
    if voidp(t_rAvatarTile) then
      t_rAvatarTile = GetTileAtPos(t_rObj.GetAbsPos())
    end if
    return t_rAvatarTile
  end if
  return VOID
end
on parseWindow t_ar_windowDescriptions
  t_ar_buttons = []
  t_ar_texts = []
  t_ar_fields = []
  t_ar_Images = []
  t_sID = getUniqueID()
  t_bSuccess = createWindow(t_sID, VOID, 0, 0, #modal)
  t_rWindow = getWindow(t_sID)
  repeat with t_sWinDesc in t_ar_windowDescriptions
    t_bSuccess = t_rWindow.merge(t_sWinDesc)
  end repeat
  t_rWindow.center()
  repeat with i = 1 to t_rWindow.pElemList.count
    t_sElemName = t_rWindow.pElemList.getPropAt(i)
    t_rElem = t_rWindow.getElement(t_sElemName)
    if objectp(t_rElem) then
      t_sElemType = t_rElem.string.word[2]
      t_sElemType = replaceChunks(t_sElemType, QUOTE, EMPTY)
      case t_sElemType of
        "CWindowCommonButton":
          t_ar_buttons.append(t_sElemName)
        "CWindowTextWrapper":
          t_ar_texts.append(t_sElemName)
        "CWindowFieldWrapper":
          t_ar_fields.append(t_sElemName)
        "CWindowImageWrapper":
          t_ar_Images.append(t_sElemName)
        otherwise:
          put "Unused elem-type" && t_sElemType && t_sElemName
          nothing()

      end case
    end if
  end repeat
  t_ar_buttons.sort()
  t_ar_texts.sort()
  t_ar_fields.sort()
  t_ar_Images.sort()
  put "<IMAGES>"
  repeat with t_sElemName in t_ar_Images
    put TAB & t_sElemName
  end repeat
  put "</IMAGES>"
  put "<TEXTS>"
  repeat with t_sElemName in t_ar_texts
    put TAB & t_sElemName
  end repeat
  put "</TEXTS>"
  put "<FIELDS>"
  repeat with t_sElemName in t_ar_fields
    put TAB & t_sElemName
  end repeat
  put "</FIELDS>"
  put "<BUTTONS>"
  repeat with t_sElemName in t_ar_buttons
    put TAB & t_sElemName
  end repeat
  put "</BUTTONS>"
  createTimeout(getUniqueID(), 2000, #Remove, getWindowManager().getID(), t_sID, 1)
  return t_sID
end
on findTextFromFiles
  casts = []
  casts.append("vmk_questengine/vmk_quest_engine")
  existingCastlibs = []
  repeat with i = 1 to _movie.castLib.count
    tName = castLib(i).name
    if existingCastlibs.getOne(tName) = 0 then
      existingCastlibs.append(tName)
    end if
  end repeat
  t_iFound = 0
  t_ar_texts = []
  repeat with cstName in casts
    if existingCastlibs.getOne(cstName) > 0 then
      cst = castLib(cstName)
      t = the milliSeconds
      windowCount = 0
      repeat with i = 1 to cst.member.count
        mbr = member(i, cstName)
        if mbr.type = #script then
          t_sText = mbr.scriptText
          repeat with j = 1 to t_sText.line.count
            t_sLine = t_sText.line[j]
            t_lLine = lineToLowerCase(t_sLine)
            if t_lLine contains "gettext" then
              t_iStart = offset("gettext", t_lLine)
              t_sLine = t_sLine.char[t_iStart..t_sLine.char.count]
              t_iFound = t_iFound + 1
              t_iEnd = offset(")", t_sLine)
              t_sLine = t_sLine.char[1..t_iEnd]
              t_sLine = SearchAndReplace(t_sLine, "GetText(", EMPTY)
              t_sLine = SearchAndReplace(t_sLine, ")", EMPTY)
              t_sLine = SearchAndReplace(t_sLine, "(", EMPTY)
              t_sLine = SearchAndReplace(t_sLine, QUOTE, EMPTY)
              t_sLine = splitString(t_sLine, " ")
              t_sLine = SearchAndReplace(t_sLine, ",", EMPTY)
              t_ar_texts.append(t_sLine)
            end if
          end repeat
        end if
      end repeat
    end if
  end repeat
  t_ar_texts.sort()
  t_ar_final = []
  repeat with t_sLine in t_ar_texts
    if t_ar_final.getOne(t_sLine) = 0 then
      t_ar_final.append(t_sLine)
    end if
  end repeat
  repeat with t_sLine in t_ar_final
    put t_sLine
  end repeat
  put "Found" && t_ar_final.count && "keys"
end
on splitString a_sString, a_sDelim
  t_sDelim = the itemDelimiter
  the itemDelimiter = a_sDelim
  t_sString = a_sString.item[1]
  the itemDelimiter = t_sDelim
  return t_sString
end
on SearchAndReplace input, stringToFind, stringToInsert
  Output = EMPTY
  findLen = stringToFind.length - 1
  repeat while input contains stringToFind
    currOffset = offset(stringToFind, input)
    Output = Output & input.char[1..currOffset]
    delete char -30000 of Output
    Output = Output & stringToInsert
    delete (input).char[1..currOffset + findLen]
  end repeat
  Output = Output & input
  return Output
end
on lineToLowerCase tString
  tValueStr = EMPTY
  repeat with i = 1 to length(tString)
    tChar = tString.char[i]
    tNum = charToNum(tChar)
    if tNum >= 65 and tNum <= 90 then
      tChar = numToChar(tNum + 32)
    end if
    tValueStr = tValueStr & tChar
  end repeat
  return tValueStr
end