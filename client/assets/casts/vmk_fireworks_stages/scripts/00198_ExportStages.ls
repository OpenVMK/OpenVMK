-- Behavior
on FixFWStageDescriptions
  t_ar_ext = []
  t_ar_ext.append(EMPTY)
  repeat with s = 1 to 5
    repeat with i = 1 to 3
      repeat with tExts in t_ar_ext
        tMemName = "stage.fireworks.level" & s & "-stage" & i & tExts & ".xml"
        tMem = member(tMemName)
        if not voidp(tMem) then
          tMem.alignment = "left"
          tMem.font = "courier"
          tMem.fontSize = 12
          tMem.rect = rect(0, 0, 1200, 600)
        end if
      end repeat
    end repeat
  end repeat
end
on ExportFireworksStages
  t_ar_ext = []
  t_ar_ext.append(EMPTY)
  repeat with s = 1 to 5
    repeat with i = 1 to 3
      repeat with tExts in t_ar_ext
        tMemName = "stage.fireworks.level" & s & "-stage" & i & tExts & ".xml"
        tMem = member(tMemName)
        if not voidp(tMem) then
          f = xtra("FileIO").new()
          tPath = _movie.path
          tMedia = VOID
          if objectp(f) then
            f.createFile(tPath & tMemName)
            if f.error(f.status()) = "OK" then
              f.openfile(tPath & tMemName, 2)
              if f.error(f.status()) = "OK" then
                f.writeString(tMem.text)
                f.closeFile()
              else
                put f.status() && f.error(f.status())
              end if
            else
              put f.status() && f.error(f.status())
            end if
            next repeat
          end if
          put f.status() && f.error(f.status())
        end if
      end repeat
    end repeat
  end repeat
end
on FWparseWindow t_ar_windowDescriptions
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