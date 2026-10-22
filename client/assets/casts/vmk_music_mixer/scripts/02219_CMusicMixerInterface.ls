-- Script
property m_sWindowID
property m_sIntrument
property m_iMilliseconds
property m_iListCount
property m_iPointerLoc
property m_arMuteStates
property m_pPopup
property m_ar_trackClickBuffer
property m_iDoubleClickDelta

on construct me
  m_sWindowID = "MusicMixer"
  m_i_DataDone = 0
  pPropsToServer = [:]
  pPartChangeButtons = [:]
  m_arMuteStates = [0, 0, 0, 0]
  m_ar_BodyPartList = []
  m_ar_BodyPartObjects = [:]
  m_TmrPointer = "MixerPointer"
  m_iListCount = 17
  m_iPointerLoc = 57
  m_ar_trackClickBuffer = []
  m_iDoubleClickDelta = 250
  registerMessage("ui_MusicMixer", me.getID(), #showHideMusicMixer)
  m_pPopup = 0
  executeMessage("SetButtonStates", [#all: 0])
  executeMessage("SetButtonStates", [#navigator: 1])
  executeMessage(#MinigameState, #running)
  return 1
end
on deconstruct me
  if windowExists(m_sWindowID) then
    tWndObj = getWindow(m_sWindowID)
    tWndObj.close()
  end if
  if getObject("Music Mixer Popup") <> 0 then
    if m_pPopup <> 0 then
      m_pPopup.deconstruct()
    end if
    removeObject("Music Mixer Popup")
  end if
  unregisterMessage("ui_MusicMixer", me.getID())
  executeMessage("SetButtonStates", [#all: 1])
  executeMessage(#MinigameState, #idle)
  return 1
end
on showHideMusicMixer me
  if windowExists(m_sWindowID) then
    tWndObj = getWindow(m_sWindowID)
    if tWndObj.getProperty(#visible) then
      me.StopEverything()
      removeWindow(m_sWindowID)
    else
      me.StopEverything()
      removeWindow(m_sWindowID)
    end if
  else
    createWindow(m_sWindowID, "vmk_music_mixer.window")
    tWndObj = getWindow(m_sWindowID)
    tWndObj.registerClient(me.getID())
    tWndObj.moveTo(0, 0)
    tWndObj.registerProcedure(#eventProcMusicMixer, me.getID(), #mouseUp)
    tWndObj.registerProcedure(#eventProcMusicMixer, me.getID(), #mouseDown)
    tWndObj.registerProcedure(#eventProcMusicMixer, me.getID(), #keyDown)
    tWndObj.registerProcedure(#eventProcMusicMixer, me.getID(), #keyUp)
    tWndObj.registerProcedure(#eventProcMusicMixer, me.getID(), #mouseEnter)
    tWndObj.registerProcedure(#eventProcMusicMixer, me.getID(), #mouseLeave)
    m_arMuteStates = [0, 0, 0, 0]
    repeat with i = 1 to 4
      me.HandleMuteButtons(i)
    end repeat
    me.ResetSelected()
    me.getComponent().ClearAll()
    me.StopPointerTimer()
    me.SelectInstrument("drm", "1")
    me.getComponent().SelectedSample("drm", "1")
  end if
  m_pPopup = me.createPopup()
  me.getHandler().GetSongs()
end
on setSongList me, i_ar_list, i_bOpenManager
  if m_pPopup <> 0 then
    m_pPopup.setSongList(i_ar_list)
    if i_bOpenManager then
      if not m_pPopup.getVisible() then
        m_pPopup.show()
      end if
    end if
  end if
end
on createPopup me
  t_pPopup = createObject("Music Mixer Popup", "CMusicMixerPopup")
  if t_pPopup <> 0 then
    t_pPopup.Init(me.getID())
    return t_pPopup
  end if
  return 0
end
on ChangeImage me, a_iTrackNum, a_iSlot, a_Col, a_imgSample, a_imgSymbol
  tWndObj = getWindow(m_sWindowID)
  t_ElemID = "track_" & a_iTrackNum & "_" & a_iSlot
  if tWndObj.elementExists(t_ElemID) then
    t_Obj = tWndObj.getElement(t_ElemID)
    t_imgButton = a_imgSymbol
    if not voidp(t_imgButton) then
      t_iWidth = t_imgButton.width
      t_Obj.feedImage(t_imgButton)
      t_Obj.setProperty(#width, t_iWidth)
      t_Obj.setProperty(#blend, 100)
    end if
    if ilk(a_Col) = #color then
      t_Obj.setProperty(#blend, 100)
    else
      t_Obj.setProperty(#blend, 0)
    end if
  end if
end
on StartPointerTimer me
  tWndObj = getWindow(m_sWindowID)
  if tWndObj.elementExists("track.pointer") then
    t_rElement = tWndObj.getElement("track.pointer")
    t_rElement.setProperty(#locH, 57)
    receiveUpdate(me.getID())
    m_iListCount = 17
    m_iPointerLoc = 57
    t_rElement.setProperty(#visible, 1)
    m_iMilliseconds = the milliSeconds
  end if
end
on StopPointerTimer me
  tWndObj = getWindow(m_sWindowID)
  if tWndObj.elementExists("track.pointer") then
    t_rElement = tWndObj.getElement("track.pointer")
    t_rElement.setProperty(#visible, 0)
  end if
  removeUpdate(me.getID())
  m_iListCount = 17
  m_iPointerLoc = 57
end
on update me
  t_iMillisecs = the milliSeconds - m_iMilliseconds
  if t_iMillisecs > 500 then
    m_iMilliseconds = the milliSeconds
  end if
  t_iCount = sound(me.getComponent().m_iFirstSoundChannel + 5).getPlaylist().count
  tWndObj = getWindow(m_sWindowID)
  if tWndObj.elementExists("track.pointer") then
    t_rElement = tWndObj.getElement("track.pointer")
    if t_iCount = 0 then
      m_iPointerLoc = m_iPointerLoc + 40
      t_rElement.setProperty(#locH, m_iPointerLoc)
      me.StopPointerTimer()
      me.getComponent().playBackControl("Stop")
    end if
    if m_iListCount - t_iCount >= 1 then
      m_iListCount = t_iCount
      t_LocH = t_rElement.getProperty(#locH)
      m_iPointerLoc = m_iPointerLoc + 40
      t_rElement.setProperty(#locH, m_iPointerLoc)
    end if
  end if
end
on MovePointer me
  tWndObj = getWindow(m_sWindowID)
  if tWndObj.elementExists("track.pointer") then
    t_rElement = tWndObj.getElement("track.pointer")
    t_LocH = t_rElement.getProperty(#locH)
    if t_LocH > 736 then
      me.StopPointerTimer()
    else
      t_rElement.setProperty(#locH, t_LocH + 10)
    end if
  end if
end
on ResetSelected me
  tWndObj = getWindow(m_sWindowID)
  repeat with i = 1 to 8
    if tWndObj.elementExists("inst_drm_" & i) then
      t_rElement = tWndObj.getElement("inst_drm_" & i)
      t_rElement.setProperty(#blend, 0)
    end if
    if tWndObj.elementExists("inst_bas_20" & i) then
      t_rElement2 = tWndObj.getElement("inst_bas_20" & i)
      t_rElement2.setProperty(#blend, 0)
    end if
    if tWndObj.elementExists("inst_gtr_10" & i) then
      t_rElement3 = tWndObj.getElement("inst_gtr_10" & i)
      t_rElement3.setProperty(#blend, 0)
    end if
    if tWndObj.elementExists("inst_snt_30" & i) then
      t_rElement4 = tWndObj.getElement("inst_snt_30" & i)
      t_rElement4.setProperty(#blend, 0)
    end if
    if tWndObj.elementExists("inst_fx_40" & i) then
      t_rElement5 = tWndObj.getElement("inst_fx_40" & i)
      t_rElement5.setProperty(#blend, 0)
    end if
  end repeat
end
on SelectInstrument me, a_sInst, a_iSampleNum
  me.ResetSelected()
  case a_sInst of
    "drm":
      tBtnColor = "red"
      t_Col = rgb("6F0000")
    "gtr":
      tBtnColor = "green"
      t_Col = rgb("5C8B00")
    "fx":
      tBtnColor = "blue"
      t_Col = rgb("008687")
    "bas":
      tBtnColor = "orange"
      t_Col = rgb("B05800")
    "snt":
      tBtnColor = "pink"
      t_Col = rgb("C20081")
    otherwise:
      t_Col = rgb(20, 30, 210)

  end case
  tWndObj = getWindow(m_sWindowID)
  if tWndObj.elementExists("inst_" & a_sInst & "_" & a_iSampleNum) then
    t_rElement = tWndObj.getElement("inst_" & a_sInst & "_" & a_iSampleNum)
    t_sprite = t_rElement.getProperty(#sprite)
    if t_sprite <> 0 then
      t_Alpha = member("button." & tBtnColor & a_iSampleNum.char[a_iSampleNum.char.count] & ".pressed").image.extractAlpha()
      t_sprite.member.image.setAlpha(t_Alpha)
      t_sprite.member.useAlpha = 1
    end if
    t_rElement.setProperty(#blend, 100)
  end if
end
on HandleMuteButtons me, a_iChannel
  if not voidp(a_iChannel) then
    t_iNum = value(a_iChannel)
    t_iCurState = m_arMuteStates[t_iNum]
    t_iNewState = not t_iCurState
    m_arMuteStates[t_iNum] = t_iNewState
    tWndObj = getWindow(m_sWindowID)
    if tWndObj.elementExists("button.mute." & a_iChannel) then
      t_rElement = tWndObj.getElement("button.mute." & a_iChannel)
      t_Img = member(getmemnum("button.audio." & t_iNewState)).image
      t_rElement.feedImage(t_Img)
    end if
    sound(me.getComponent().m_iFirstSoundChannel + t_iNum).volume = t_iNewState * 255
  end if
end
on StopEverything me
  me.getComponent().playBackControl("Stop")
  me.StopPointerTimer()
  repeat with i = 1 to 5
    sound(me.getComponent().m_iFirstSoundChannel + i).setPlayList([])
  end repeat
end
on setButtonState me, t_elemName, t_state
  tWndObj = getWindow(m_sWindowID)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement(t_elemName)
    if t_Elem <> 0 then
      case t_state of
        1:
          t_Elem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_Elem.Activate()
        0:
          t_Elem.setProperty(#cursor, #arrow)
          t_Elem.deactivate()

      end case
    end if
  end if
end
on popupWindowEvent me, tEvent, tParam
  put "Popup Window Event" && [tEvent, tParam]
  tWndObj = getWindow(m_sWindowID)
  case tEvent of
    "edit":
      me.getComponent().editSong(tParam)
      tSong = me.getComponent().getSongData(tParam)
      tElem = tWndObj.getElement("music.mixer.entername")
      if tElem <> 0 then
        if not voidp(tSong.getaProp(#name)) then
          tElem.setText(tSong.name)
        end if
      end if
      me.getComponent().setEditingMode(#edit)
    "delete":
      me.getComponent().DeleteSong(tParam)
    "exit":
      me.StopEverything()
      me.showHideMusicMixer()
      getConnection("VMK").send("CloseMixer")
    "new":
      me.setButtonState("button.savemusic", 1)
      if tWndObj <> 0 then
        tElem = tWndObj.getElement("music.mixer.entername")
        if tElem <> 0 then
          tElem.setText(EMPTY)
          tElem.setFocus(0)
        end if
      end if
      me.getComponent().ClearAll()
      me.StopPointerTimer()
      me.getComponent().setEditingMode(#new)
    otherwise:
      put "Unknown popup-event" && tEvent

  end case
end
on removeMouseDown me, t_arguments
  if m_ar_trackClickBuffer.count <> 0 then
    if t_arguments.ilk = #list then
      if t_arguments.count > 0 then
        t_lastClickTime = t_arguments[1]
      end if
      if t_arguments.count > 1 then
        t_iTrack = t_arguments[2]
      end if
      if t_arguments.count > 2 then
        t_iSlot = t_arguments[3]
      end if
    end if
    me.getComponent().AddSample(t_iTrack, t_iSlot)
    m_ar_trackClickBuffer = []
  end if
end
on eventProcMusicMixer me, tEvent, tElemID, tParam
  tWndObj = getWindow(m_sWindowID)
  if tEvent = #mouseUp then
    case 1 of
      tElemID = "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        me.StopEverything()
        me.showHideMusicMixer()
        getConnection("VMK").send("CloseMixer")
        return 1
      tElemID = "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, "help.games.music")
        return 1
      tElemID = "button.exitgame":
        executeMessage("PlayInterfaceSound", "close-popup")
        t_pMusicMixDialog = createDialogWindow(me.getID(), "musicmix.dialog.exit.confirm", 2, 1)
        t_pMusicMixDialog.show()
        t_pMusicMixDialog.setText(getText("musicmix.dialog.exit.confirm.text"), getText("musicmix.dialog.exit.confirm.title"), getText("musicmix.dialog.exit.confirm.btnCancel"), getText("musicmix.dialog.exit.confirm.btnOk"))
      tElemID = "button.mixmanager":
        if m_pPopup = 0 then
          m_pPopup = me.createPopup()
        end if
        if m_pPopup <> 0 then
          if not m_pPopup.getVisible() then
            m_pPopup.show()
          end if
        end if
      tElemID = "button.savemusic":
        t_bMode = me.getComponent().getEditingMode()
        if t_bMode = #new then
          t_sSaveDialogName = "MMSaveDialog"
          if getObject(t_sSaveDialogName) <> 0 then
            removeObject(t_sSaveDialogName)
          end if
          t_pPopup = createObject(t_sSaveDialogName, "CMusicMixerSaveDialog")
          if t_pPopup <> 0 then
            t_pPopup.Init(me.getID())
          end if
        else
          if t_bMode = #edit then
            tSongID = me.getComponent().getActiveSong()
            tSong = me.getComponent().getSongData(tSongID)
            if not voidp(tSong.getaProp(#name)) then
              me.getComponent().saveCurrentSong(ParseCannedText(tSong.name))
            end if
          else
            if t_bMode = #none then
              if m_pPopup = 0 then
                m_pPopup = me.createPopup()
              end if
              if m_pPopup <> 0 then
                if not m_pPopup.getVisible() then
                  m_pPopup.show()
                end if
              end if
            else
              put "Music Mixer: Unknown mode..."
              if m_pPopup = 0 then
                m_pPopup = me.createPopup()
              end if
              if m_pPopup <> 0 then
                if not m_pPopup.getVisible() then
                  m_pPopup.show()
                end if
              end if
            end if
          end if
        end if
        me.setButtonState("button.savemusic", 0)
        return 1
      tElemID = "button.playmusic":
        me.getComponent().playBackControl("Stop")
        me.getComponent().playBackControl("Play")
        me.StartPointerTimer()
        return 1
      tElemID = "button.stopmusic":
        me.getComponent().playBackControl("Stop")
        me.StopPointerTimer()
        return 1
      tElemID = "rew":
        me.getComponent().playBackControl("Stop")
        me.getComponent().playBackControl("Play")
        return 1
      tElemID = "button.clearmusic":
        t_pMusicMixDialog = createDialogWindow(me.getID(), "MusicMixerClearAllDialog", 2, 1)
        t_pMusicMixDialog.show()
        t_pMusicMixDialog.setText(getText("musicmix.dialog.clearall.text"), getText("musicmix.dialog.clearall.title"), getText("musicmix.dialog.clearall.btnCancel"), getText("musicmix.dialog.clearall.btnOk"))
      tElemID contains "button.mute":
        tTempDelim = the itemDelimiter
        the itemDelimiter = "."
        t_iTrackNum = tElemID.item[3]
        the itemDelimiter = tTempDelim
        me.HandleMuteButtons(t_iTrackNum)
        return 1
      tElemID contains "track":
        tTempDelim = the itemDelimiter
        the itemDelimiter = "_"
        t_iTrack = tElemID.item[2]
        t_iSlot = value(tElemID.item[3])
        the itemDelimiter = tTempDelim
        if m_ar_trackClickBuffer.count <> 0 then
          m_ar_trackClickBuffer = []
          me.getComponent().RemoveSample(t_iTrack, t_iSlot)
        else
          m_ar_trackClickBuffer.append([the milliSeconds, t_iTrack, t_iSlot])
          createTimeout(#mouseDown & the milliSeconds, m_iDoubleClickDelta, #removeMouseDown, me.getID(), [the milliSeconds, t_iTrack, t_iSlot], 1)
        end if
        me.StopPointerTimer()
        me.getComponent().playBackControl("Stop")
        me.setButtonState("button.savemusic", 1)
        return 1
      tElemID contains "inst":
        tTempDelim = the itemDelimiter
        the itemDelimiter = "_"
        t_sInst = tElemID.item[2]
        t_iSampleNum = tElemID.item[3]
        the itemDelimiter = tTempDelim
        m_sIntrument = t_sInst
        me.SelectInstrument(t_sInst, t_iSampleNum)
        me.getComponent().SelectedSample(t_sInst, t_iSampleNum)
        return 1
      otherwise:
        put tElemID

    end case
  end if
  if tEvent = #mouseEnter and tElemID contains "inst" then
    tTempDelim = the itemDelimiter
    the itemDelimiter = "_"
    t_sInst = tElemID.item[2]
    t_iSampleNum = tElemID.item[3]
    the itemDelimiter = tTempDelim
    me.getComponent().StartPreview(t_sInst, t_iSampleNum)
    return 1
  end if
  if tEvent = #mouseLeave and tElemID contains "inst" then
    sound(me.getComponent().m_iFirstSoundChannel + 6).stop()
    return 1
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  tWndObj = getWindow(m_sWindowID)
  case t_dialogName of
    "musicmix.dialog.exit.confirm":
      case t_dialogEvent of
        #dialogOK:
          me.StopEverything()
          me.showHideMusicMixer()
          getConnection("VMK").send("CloseMixer")
          return 1
        #dialogCancel:
        #dialogAlternative:

      end case
    "MusicMixerClearAllDialog":
      case t_dialogEvent of
        #dialogOK:
          tElem = tWndObj.getElement("music.mixer.entername")
          if tElem <> 0 then
            tElem.setFocus(0)
          end if
          me.getComponent().ClearAll()
          me.StopPointerTimer()
          me.setButtonState("button.savemusic", 1)
          return 1
        #dialogCancel:
        #dialogAlternative:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end