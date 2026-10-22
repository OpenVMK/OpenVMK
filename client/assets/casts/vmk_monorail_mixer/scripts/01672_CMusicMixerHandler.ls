-- Script
on construct me
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  return 1
end
on GetSongs me
  getConnection("VMK").send("GetSongs")
end
on LoadSong me, t_ID
  tMsg = [#int: t_ID]
  getConnection("VMK").send("LoadSong", tMsg)
end
on CreateSong me, t_ar_name, t_data
  tMsg = [#str: t_data.string]
  tCannedBlock = TransformCannedToMsg(t_ar_name, 1)
  repeat with i = 1 to tCannedBlock.count
    tKey = tCannedBlock.getPropAt(i)
    tvalue = tCannedBlock[i]
    tMsg.addProp(tKey, tvalue)
  end repeat
  getConnection("VMK").send("CreateSong", tMsg)
end
on SaveSong me, t_ID, t_ar_name, t_data
  tMsg = [#int: t_ID, #str: t_data.string]
  tCannedBlock = TransformCannedToMsg(t_ar_name, 1)
  repeat with i = 1 to tCannedBlock.count
    tKey = tCannedBlock.getPropAt(i)
    tvalue = tCannedBlock[i]
    tMsg.addProp(tKey, tvalue)
  end repeat
  getConnection("VMK").send("SaveSong", tMsg)
end
on RenameSong me, t_ID, t_ar_name
  tMsg = [#int: t_ID]
  tCannedBlock = TransformCannedToMsg(t_ar_name, 1)
  repeat with i = 1 to tCannedBlock.count
    tKey = tCannedBlock.getPropAt(i)
    tvalue = tCannedBlock[i]
    tMsg.addProp(tKey, tvalue)
  end repeat
  getConnection("VMK").send("RenameSong", tMsg)
end
on DeleteSong me, t_ID
  tMsg = [#int: t_ID]
  getConnection("VMK").send("DeleteSong", tMsg)
end
on PlaySong me, t_ID
  tMsg = [#int: t_ID]
  getConnection("VMK").send("PlaySong", tMsg)
end
on OpenMixer me
  executeMessage("ui_MusicMixer")
end
on SongList me, tMsg
  t_songCount = me.parseSongList(tMsg, 1)
end
on SongData me, tMsg
  t_data = tMsg.connection.GetStrFrom()
  t_songData = t_data.value
  if t_songData.ilk = #list then
    me.getComponent().SetTrackData(t_songData)
  end if
end
on CreateSongResult me, tMsg
  t_result = tMsg.connection.GetIntFrom()
  t_songId = tMsg.connection.GetIntFrom()
  case t_result of
    0:
    1:
      t = createDialogWindow(me.getID(), "CreateSongDialog1", 1, 1)
      t.setText("Could not create song", "Could not create new song, all slots are full", "OK")
      t.show()
    2:
    3:
    4:

  end case
  me.parseSongList(tMsg, 0)
end
on SaveSongResult me, tMsg
  t_result = tMsg.connection.GetIntFrom()
  me.parseSongList(tMsg, 0)
end
on DeleteSongResult me, tMsg
  t_result = tMsg.connection.GetIntFrom()
  me.parseSongList(tMsg, 0)
end
on PlaySongResult me, tMsg
  put "Received PlaySongResult"
end
on InvalidSongName me, tMsg
  t_pMusicMixDialog = createDialogWindow(me.getID(), "InvalidSongNameErrorDialog", 1, 1)
  t_pMusicMixDialog.show()
  t_pMusicMixDialog.setText(getText("musicmix.dialog.SongNameError.text"), getText("musicmix.dialog.SongNameError.title"), getText("musicmix.dialog.SongNameError.btnConfirm"))
end
on parseSongList me, tMsg, i_bOpenManager
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
  me.getComponent().setSongList(t_ar_Songs, i_bOpenManager)
  return t_songCount
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2750, #OpenMixer)
  tMsgs.setaProp(2751, #SongList)
  tMsgs.setaProp(2752, #SongData)
  tMsgs.setaProp(2753, #CreateSongResult)
  tMsgs.setaProp(2754, #SaveSongResult)
  tMsgs.setaProp(2755, #DeleteSongResult)
  tMsgs.setaProp(2756, #PlaySongResult)
  tMsgs.setaProp(2758, #InvalidSongName)
  tCmds = [:]
  tCmds.setaProp("CloseMixer", 750)
  tCmds.setaProp("GetSongs", 751)
  tCmds.setaProp("LoadSong", 752)
  tCmds.setaProp("CreateSong", 753)
  tCmds.setaProp("SaveSong", 754)
  tCmds.setaProp("DeleteSong", 755)
  tCmds.setaProp("PlaySong", 756)
  tCmds.setaProp("RenameSong", 757)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end