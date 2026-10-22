-- Behavior
property m_sWindowTitle
property m_currentView
property m_iClientID
property m_pSongList
property m_bVisible

on construct me
  m_currentView = "vmk_musicmix_play.window"
  m_sWindowTitle = "Music Player Popup Window"
  m_iClientID = 0
  m_pSongList = 0
  m_bVisible = 0
  registerMessage(#songListReady, me.getID(), #setSongList)
  return 1
end
on deconstruct me
  unregisterMessage(#songListReady)
  if getObject("Music Player Song List") <> 0 then
    m_pSongList.deconstruct()
    removeObject("Music Player Song List")
  end if
end
on Init me, t_iClientID
  m_iClientID = t_iClientID
  me.show()
end
on show me
  me.changeView(m_currentView)
  if m_pSongList <> 0 then
    m_pSongList.Init(me.getID(), m_sWindowTitle, "musicmix.playsongs.list")
    executeMessage(#RequestSongs)
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
  t_pSongList = createObject("Music Player Song List", "CMusicPlayerSongList")
  if t_pSongList <> 0 then
    t_pSongList.Init(me.getID(), m_sWindowTitle, "musicmix.playsongs.list")
    return t_pSongList
  end if
  return 0
end
on setSongList me, i_ar_list
  if m_pSongList <> 0 then
    m_pSongList.setSongList(i_ar_list)
    m_pSongList.render()
    if m_pSongList.m_pSongs.count >= 4 then
      me.setButtonState("musicmix.createsong.button", 0)
    else
      me.setButtonState("musicmix.createsong.button", 1)
    end if
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
    "vmk_musicmix_play.window":
      t_Elem = tWndObj.getElement("musicmix.dialog.hd")
      if t_Elem <> 0 then
        t_Elem.setText(getText("musicmix.dialog.playsong.title"))
      end if
      if m_pSongList = 0 then
        m_pSongList = me.CreateSongList()
      end if
      me.setButtonState("musicmix.playsong.button", 0)
    otherwise:
      put "[MusicMixPlayer start] #changeView, unknown view" && m_currentView

  end case
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
on eventProcSongList me, tEvent, tActiveItem
  me.setButtonState("musicmix.playsong.button", 1)
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
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        me.hide()
      "musicmix.dontperform.button":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#CancelPlaySong)
        me.hide()
      "musicmix.playsong.button":
        executeMessage("PlayInterfaceSound", "UI-click")
        t_Song = m_pSongList.getSelectedSong()
        if t_Song <> 0 then
          t_ID = t_Song.getID()
          executeMessage(#RequestPlaySong, t_ID)
        end if
        me.hide()
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        executeMessage(#ui_help)

    end case
  end if
end