-- Movie Script
property m_sWindowTitle
property m_currentView
property m_iClientID
property m_pSongList
property m_bVisible

on construct me
  m_currentView = "vmk_musicmix_start.window"
  m_sWindowTitle = "Music Mixer Popup Window"
  m_iClientID = 0
  m_pSongList = 0
  m_bVisible = 0
  return 1
end
on deconstruct me
  if getObject("Music Mixer Song List") <> 0 then
    m_pSongList.deconstruct()
    removeObject("Music Mixer Song List")
  end if
end
on Init me, t_iClientID
  m_iClientID = t_iClientID
  me.show()
end
on show me
  me.changeView(m_currentView)
  if m_pSongList <> 0 then
    m_pSongList.Init(me.getID(), m_sWindowTitle, "musicmix.editsongs.list")
  end if
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
on getVisible me
  return m_bVisible
end
on GetSelected me
  if m_pSongList <> 0 then
    return m_pSongList.GetSelected()
  end if
  return 0
end
on CreateSongList me
  t_pSongList = createObject("Music Mixer Song List", "CMusicMixerSongList")
  if t_pSongList <> 0 then
    t_pSongList.Init(me.getID(), m_sWindowTitle, "musicmix.editsongs.list")
    return t_pSongList
  end if
  return 0
end
on setSongList me, i_ar_list
  if m_pSongList <> 0 then
    m_pSongList.setSongList(i_ar_list)
    m_pSongList.render()
    me.evaluateActiveButtons()
  end if
end
on changeView me, tView
  tWndObj = getWindow(m_sWindowTitle)
  tLastView = m_currentView
  if tWndObj = 0 then
    t_window = createWindow(m_sWindowTitle, "vmk_musicmix.window", 0, 0, #modal)
    if not t_window then
      return error(me, "Failed to open Popup Window" && m_sWindowTitle & "!!!", #changeView)
    else
      tWndObj = getWindow(m_sWindowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcPopup, me.getID(), #mouseUp)
      tWndObj.merge(m_currentView)
    end if
  end if
  if tLastView <> tView then
    tWndObj.unmerge()
    tWndObj.merge(tView)
    m_currentView = tView
  end if
  case m_currentView of
    "vmk_musicmix_start.window":
      t_Elem = tWndObj.getElement("musicmix.dialog.hd")
      if t_Elem <> 0 then
        t_Elem.setText(getText("musicmix.start.hd"))
      end if
      me.setButtonText("musicmix.edit.button", getText("musicmix.edit"))
      me.setButtonText("musicmix.returntoroom.button", getText("monorail.musicmix.returntoroom.button"))
      if m_pSongList = 0 then
        m_pSongList = me.CreateSongList()
      end if
      me.evaluateActiveButtons()
    otherwise:
      put "[MusicMix start] #changeView, unknown view" && m_currentView

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
on evaluateActiveButtons me
  tActiveItem = m_pSongList.GetSelected()
  if tActiveItem <> 0 then
    me.setButtonState("musicmix.rename.button", 1)
    me.setButtonState("musicmix.delete.button", 1)
    me.setButtonText("musicmix.edit.button", getText("musicmix.edit"))
    me.setButtonState("musicmix.edit.button", 1)
  else
    me.setButtonState("musicmix.rename.button", 0)
    me.setButtonState("musicmix.delete.button", 0)
    me.setButtonText("musicmix.edit.button", getText("musicmix.createsong"))
    if m_pSongList.m_pSongs.count >= 4 then
      me.setButtonState("musicmix.edit.button", 0)
    else
      me.setButtonState("musicmix.edit.button", 1)
    end if
  end if
  t_bError = 1
  if m_iClientID <> 0 then
    tObject = getObjectManager().get(m_iClientID)
    if tObject <> 0 then
      tComponent = tObject.getComponent()
      if tComponent <> 0 then
        t_bMode = tComponent.getEditingMode()
        if t_bMode <> #none then
          t_bError = 0
        end if
      end if
    end if
  end if
  if t_bError then
    me.setButtonState("musicmix.cancel.button", 0)
  else
    me.setButtonState("musicmix.cancel.button", 1)
  end if
end
on eventProcSongList me, tEvent, tActiveItem
  me.evaluateActiveButtons()
end
on eventProcPopup me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWindowTitle)
  if tEvent = #mouseUp then
    receiverEvent = #popupWindowEvent
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
      "close", "musicmix.cancel.button":
        executeMessage("PlayInterfaceSound", "close-popup")
        me.hide()
      "musicmix.returntoroom.button":
        executeMessage("PlayInterfaceSound", "UI-click")
        if passEvent then
          call(receiverEvent, tObject, "exit")
          me.hide()
        end if
      "musicmix.edit.button":
        executeMessage("PlayInterfaceSound", "UI-click")
        t_bCreateNew = 1
        if m_pSongList <> 0 then
          if m_pSongList.GetSelected() <> 0 then
            t_bCreateNew = 0
          end if
        end if
        if t_bCreateNew then
          if passEvent then
            call(receiverEvent, tObject, "new")
            me.hide()
          end if
        else
          if passEvent then
            call(receiverEvent, tObject, "edit", m_pSongList.GetSelected())
            m_pSongList.reset()
            me.hide()
          end if
        end if
      "musicmix.rename.button":
        t_sSaveDialogName = "MMRenameDialog"
        if getObject(t_sSaveDialogName) <> 0 then
          removeObject(t_sSaveDialogName)
        end if
        t_pPopup = createObject(t_sSaveDialogName, "CMusicMixerSaveDialog")
        if t_pPopup <> 0 then
          t_pPopup.Init(me.getID())
          t_pPopup.editSelectedSong(m_pSongList.GetSelected())
        end if
      "musicmix.delete.button":
        executeMessage("PlayInterfaceSound", "UI-click")
        t_pHelpDialog = createDialogWindow(me.getID(), "musicmix.dialog.delete.confirm", 2, 1)
        t_pHelpDialog.show()
        t_pHelpDialog.setText(getText("musicmix.dialog.delete.confirm.text"), getText("musicmix.dialog.delete.confirm.title"), getText("musicmix.dialog.delete.confirm.btn1"), getText("musicmix.dialog.delete.confirm.btn2"))
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        executeMessage(#ui_help)

    end case
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  receiverEvent = #popupWindowEvent
  passEvent = 1
  tObject = getObjectManager().get(m_iClientID)
  if tObject = 0 then
    passEvent = 0
  else
    if tObject.handlers().getOne(receiverEvent) = 0 then
      passEvent = 0
    end if
  end if
  case t_dialogName of
    "musicmix.dialog.delete.confirm":
      case t_dialogEvent of
        #dialogOK:
          if m_pSongList <> 0 then
            if m_pSongList.GetSelected() <> 0 then
              if passEvent then
                call(receiverEvent, tObject, "delete", m_pSongList.GetSelected())
                m_pSongList.reset()
              end if
            end if
          end if
          me.evaluateActiveButtons()
        #dialogCancel:
        #dialogAlternative:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end