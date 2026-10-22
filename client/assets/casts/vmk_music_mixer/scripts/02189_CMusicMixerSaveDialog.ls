-- Score Script
property m_sWindowTitle
property m_currentView
property m_iClientID
property m_bVisible
property m_pSongNameField
property m_iEditMode
property m_iSongIndex

on construct me
  m_currentView = "vmk_musicmix_editname.window"
  m_sWindowTitle = "Music Mixer Save Dialog Window"
  m_iClientID = 0
  m_bVisible = 0
  m_pSongNameField = VOID
  m_iEditMode = #new
  m_iSongIndex = 0
  return 1
end
on deconstruct me
  if not voidp(m_pSongNameField) then
    removeCannedField(m_sWindowTitle, "music.mixer.entername")
  end if
end
on Init me, t_iClientID
  m_iClientID = t_iClientID
  me.show()
end
on editSelectedSong me, i_index
  m_iSongIndex = i_index
  m_iEditMode = #rename
  if m_iSongIndex <> 0 then
    tSongData = getThread("MusicMixer").getComponent().getSongData(m_iSongIndex)
    tWndObj = getWindow(m_sWindowTitle)
    tElem = tWndObj.getElement("music.mixer.entername")
    if tElem <> 0 then
      tElem.setText(tSongData.name)
    end if
  end if
end
on show me
  me.changeView(m_currentView)
  m_bVisible = 1
end
on hide me
  if getWindow(m_sWindowTitle) <> 0 then
    removeWindow(m_sWindowTitle)
  end if
  m_bVisible = 0
end
on UpdateView me
  me.changeView(m_currentView)
end
on changeView me, tView
  tWndObj = getWindow(m_sWindowTitle)
  tLastView = m_currentView
  if tWndObj = 0 then
    t_window = createWindow(m_sWindowTitle, "vmk_musicmix.window", 0, 0, #modal)
    if not t_window then
      return error(me, "Failed to open Save Dialog Window" && m_sWindowTitle & "!!!", #changeView)
    else
      tWndObj = getWindow(m_sWindowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#EventProc, me.getID(), #mouseUp)
      tWndObj.registerProcedure(#EventProc, me.getID(), #keyDown)
      tWndObj.registerProcedure(#EventProc, me.getID(), #keyUp)
      tWndObj.merge(m_currentView)
      m_pSongNameField = CreateCannedField(m_sWindowTitle, "music.mixer.entername")
    end if
  end if
  if tLastView <> tView then
    tWndObj.unmerge()
    tWndObj.merge(tView)
    m_currentView = tView
  end if
  case m_currentView of
    "vmk_musicmix_editname.window":
      t_Elem = tWndObj.getElement("musicmix.dialog.hd")
      if t_Elem <> 0 then
        t_Elem.setText(getText("musicmix.entername.hd"))
      end if
    otherwise:
      put "[MusicMix save] #changeView, unknown view" && m_currentView

  end case
end
on setButtonText me, t_btnname, t_txt
  if listp(t_txt) then
    t_txt = t_txt.text
  end if
  if not voidp(t_btnname) and not voidp(t_txt) then
    tWndObj = getWindow(m_sWindowTitle)
    if tWndObj <> 0 then
      tBtn = tWndObj.getElement(t_btnname)
      if tBtn <> 0 then
        tBtn.pButtonText = t_txt
        tBtn.pCachedImgs = [:]
        tBtn.changeState(#up)
      end if
    end if
  end if
end
on setButtonState me, t_elemName, t_state
  tWndObj = getWindow(m_sWindowTitle)
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
on EventProc me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWindowTitle)
  if tEvent = #keyUp then
    if m_pSongNameField <> 0 then
      case the keyCode of
        36, 49:
        otherwise:
          m_pSongNameField.CheckWord()

      end case
    end if
  end if
  if tEvent = #keyDown then
    if not voidp(m_pSongNameField) then
      case the keyCode of
        123, 124, 125, 126:
          m_pSongNameField.updateContent()
          pass()
        117, 51:
          m_pSongNameField.updateContent()
          pass()
        36:
          t_pass = m_pSongNameField.CheckContent()
          if t_pass then
            m_pSongNameField.reset()
          end if
          return 1
        49:
          t_pass = m_pSongNameField.CheckContent()
          if t_pass then
            m_pSongNameField.updateContent()
          end if
        otherwise:
          if not m_pSongNameField.updateContent() then
            return 1
          end if
          tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\#;" & QUOTE
          tAscii = charToNum(the key)
          t_allow = 0
          if tAscii > 31 and tAscii < 128 then
            if tValidKeys contains the key or tValidKeys = EMPTY then
              t_allow = 1
            end if
          end if
          if not t_allow then
            return 1
          end if

      end case
      tElem = tWndObj.getElement(tElemID)
      if tElem <> 0 then
        t_iChar = tElem.pMember.text.char.count + 1
        if tElem.pMember.charPosToLoc(t_iChar).locH >= tElem.pMember.width - 10 then
          return 1
        end if
      end if
    end if
  end if
  if tEvent = #mouseUp then
    receiverEvent = #SaveDialogWindowEvent
    passEvent = 1
    tObject = getObjectManager().get(m_iClientID)
    if tObject = 0 then
      passEvent = 0
    else
      if tObject.handlers().getOne(receiverEvent) = 0 then
        passEvent = 0
      end if
    end if
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        me.hide()
      "musicmix.cancel":
        executeMessage("PlayInterfaceSound", "close-popup")
        if m_iEditMode = #new then
          t_Thread = getThread("MusicMixer")
          if t_Thread <> 0 then
            t_Thread.getInterface().setButtonState("button.savemusic", 1)
          end if
        end if
        me.hide()
      "musicmix.ok":
        tElem = tWndObj.getElement("music.mixer.entername")
        if tElem <> 0 then
          check = m_pSongNameField.CheckContent()
          if check then
            if tElem.getText().length = 0 then
              t_pMusicMixDialog = createDialogWindow(me.getID(), "NoSongNameGiven", 1, 1)
              t_pMusicMixDialog.show()
              t_pMusicMixDialog.setText(getText("musicmix.dialog.noSongName.text"), getText("musicmix.dialog.noSongName.title"), getText("musicmix.dialog.noSongName.btnConfirm"))
            else
              put "OK to save"
              if m_iEditMode = #new then
                t_Thread = getThread("MusicMixer")
                if t_Thread <> 0 then
                  t_Thread.getComponent().saveCurrentSong(m_pSongNameField.GetContent())
                  me.hide()
                end if
              else
                if m_iEditMode = #rename then
                  if m_iSongIndex <> 0 then
                    tSongData = getThread("MusicMixer").getComponent().getSongData(m_iSongIndex)
                    t_Thread = getThread("MusicMixer")
                    if t_Thread <> 0 then
                      t_Thread.getHandler().RenameSong(tSongData.id, m_pSongNameField.GetContent())
                    end if
                    me.hide()
                  end if
                else
                  put "Unknown editing mode"
                end if
              end if
            end if
          else
            t_pMusicMixDialog = createDialogWindow(me.getID(), "SongNameErrorDialog", 1, 1)
            t_pMusicMixDialog.show()
            t_pMusicMixDialog.setText(getText("musicmix.dialog.SongNameError.text"), getText("musicmix.dialog.SongNameError.title"), getText("musicmix.dialog.SongNameError.btnConfirm"))
          end if
        end if
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        executeMessage(#ui_help)

    end case
  end if
end