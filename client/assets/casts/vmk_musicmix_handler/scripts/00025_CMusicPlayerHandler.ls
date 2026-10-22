-- Score Script
on construct me
  registerMessage(#RequestSongs, me.getID(), #GetSongs)
  registerMessage(#RequestPlaySong, me.getID(), #PlaySong)
  registerMessage(#CancelPlaySong, me.getID(), #CancelPlay)
  me.regMsgList(1)
  return 1
end
on deconstruct me
  unregisterMessage(#RequestSongs)
  unregisterMessage(#CancelPlaySong)
  me.regMsgList(0)
  return 1
end
on GetSongs me
  getConnection("VMK").send("GetSongs")
end
on PlaySong me, t_ID
  me.getComponent().setPlayerState(0)
  tMsg = [#int: t_ID]
  getConnection("VMK").send("PlaySong", tMsg)
end
on CancelPlay me
  getConnection("VMK").send("CancelPlay")
end
on SongList me, tMsg
  t_songCount = me.parseSongList(tMsg)
end
on PlaySongResult me, tMsg
  put "Play song"
  t_data = tMsg.connection.GetStrFrom()
  t_songName = tMsg.connection.GetStrFrom()
  t_Avatar = tMsg.connection.GetStrFrom()
  t_songData = t_data.value
  if t_Avatar = getObject(#session).get("name") then
    me.getComponent().setPlayerState(1)
  end if
  if t_songData.ilk = #list then
    t_txt = replaceChunks(getText("musicmix.dialog.performSong.text"), "%songName%", t_songName)
    t_txt = replaceChunks(t_txt, "%avatarName%", t_Avatar)
    me.getComponent().PlaySong(t_songData)
    me.getInterface().displayText(t_txt)
  end if
end
on PlaySongQueueStart me, tMsg
  t_iGotSongs = tMsg.connection.GetIntFrom()
  case t_iGotSongs of
    1:
      me.getInterface().openMusicPlayer()
    0:
      t_pSongPerformingDialog = createDialogWindow(me.getID(), "NoSongsDialog", 1, 1)
      t_pSongPerformingDialog.show()
      t_txt = getText("musicmix.dialog.performSong.nosongs.text")
      t_title = getText("musicmix.dialog.performSong.nosongs.title")
      t_btn = getText("musicmix.dialog.performSong.nosongs.btnConfirm")
      t_pSongPerformingDialog.setText(t_txt, t_title, t_btn)
    2:
      me.getInterface().m_pPlayerPopup.hide()

  end case
end
on PlaySongQueueEnd me, tMsg
  me.getComponent().setPlayerState(1)
end
on PlaySongNotFound me, tMsg
end
on parseSongList me, tMsg
  t_songCount = tMsg.connection.GetIntFrom()
  t_ar_Songs = []
  if t_songCount then
    repeat with i = 1 to t_songCount
      t_Song = [:]
      t_Song[#id] = tMsg.connection.GetIntFrom()
      t_Song[#name] = tMsg.connection.GetStrFrom()
      t_ar_Songs.append(t_Song)
    end repeat
  end if
  executeMessage(#songListReady, t_ar_Songs)
  return t_songCount
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2751, #SongList)
  tMsgs.setaProp(2756, #PlaySongResult)
  tMsgs.setaProp(2757, #PlaySongQueueStart)
  tMsgs.setaProp(2758, #PlaySongNotFound)
  tMsgs.setaProp(2759, #PlaySongQueueEnd)
  tCmds = [:]
  tCmds.setaProp("GetSongs", 751)
  tCmds.setaProp("LoadSong", 752)
  tCmds.setaProp("PlaySong", 756)
  tCmds.setaProp("CancelPlay", 758)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end