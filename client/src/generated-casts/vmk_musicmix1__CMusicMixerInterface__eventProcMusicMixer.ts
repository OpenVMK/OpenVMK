// vmk_musicmix1.cct / CMusicMixerInterface / eventProcMusicMixer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcMusicMixer(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (1) {
case lingoBinary("eq", tElemID, "close"):
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("StopEverything", _me)
  callMethod("showHideMusicMixer", _me)
  callMethod("send", callNamed("getConnection", "VMK"), "CloseMixer")
  return 1;
case lingoBinary("eq", tElemID, "help"):
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), "help.games.music")
  return 1;
case lingoBinary("eq", tElemID, "button.exitgame"):
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  var t_pMusicMixDialog = callNamed("createDialogWindow", callMethod("getID", _me), "musicmix.dialog.exit.confirm", 2, 1);
  callMethod("show", t_pMusicMixDialog)
  callMethod("setText", t_pMusicMixDialog, callNamed("getText", "musicmix.dialog.exit.confirm.text"), callNamed("getText", "musicmix.dialog.exit.confirm.title"), callNamed("getText", "musicmix.dialog.exit.confirm.btnCancel"), callNamed("getText", "musicmix.dialog.exit.confirm.btnOk"))
  break;
case lingoBinary("eq", tElemID, "button.mixmanager"):
  if (lingoBinary("eq", meProp(_me, "m_pPopup"), 0)) {
  setMeProp(_me, "m_pPopup", callMethod("createPopup", _me));
  }

  if (lingoBinary("neq", meProp(_me, "m_pPopup"), 0)) {
  if ((lingoTruthy(callMethod("getVisible", meProp(_me, "m_pPopup"))) ? 0 : 1)) {
  callMethod("show", meProp(_me, "m_pPopup"))
  }

  }

  break;
case lingoBinary("eq", tElemID, "button.savemusic"):
  var t_bMode = callMethod("getEditingMode", callMethod("getComponent", _me));
  if (lingoBinary("eq", t_bMode, symbol("new"))) {
  var t_sSaveDialogName = "MMSaveDialog";
  if (lingoBinary("neq", callNamed("getObject", t_sSaveDialogName), 0)) {
  callNamed("removeObject", t_sSaveDialogName)
  }

  var t_pPopup = callNamed("createObject", t_sSaveDialogName, "CMusicMixerSaveDialog");
  if (lingoBinary("neq", t_pPopup, 0)) {
  callMethod("Init", t_pPopup, callMethod("getID", _me))
  }

  } else {
  if (lingoBinary("eq", t_bMode, symbol("edit"))) {
  var tSongID = callMethod("getActiveSong", callMethod("getComponent", _me));
  var tSong = callMethod("getSongData", callMethod("getComponent", _me), tSongID);
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", tSong, symbol("name")))) ? 0 : 1)) {
  callMethod("saveCurrentSong", callMethod("getComponent", _me), callNamed("ParseCannedText", tSong.name))
  }

  } else {
  if (lingoBinary("eq", t_bMode, symbol("none"))) {
  if (lingoBinary("eq", meProp(_me, "m_pPopup"), 0)) {
  setMeProp(_me, "m_pPopup", callMethod("createPopup", _me));
  }

  if (lingoBinary("neq", meProp(_me, "m_pPopup"), 0)) {
  if ((lingoTruthy(callMethod("getVisible", meProp(_me, "m_pPopup"))) ? 0 : 1)) {
  callMethod("show", meProp(_me, "m_pPopup"))
  }

  }

  } else {
  callNamed("put", "Music Mixer: Unknown mode...")
  if (lingoBinary("eq", meProp(_me, "m_pPopup"), 0)) {
  setMeProp(_me, "m_pPopup", callMethod("createPopup", _me));
  }

  if (lingoBinary("neq", meProp(_me, "m_pPopup"), 0)) {
  if ((lingoTruthy(callMethod("getVisible", meProp(_me, "m_pPopup"))) ? 0 : 1)) {
  callMethod("show", meProp(_me, "m_pPopup"))
  }

  }

  }

  }

  }

  callMethod("setButtonState", _me, "button.savemusic", 0)
  return 1;
case lingoBinary("eq", tElemID, "button.playmusic"):
  callMethod("playBackControl", callMethod("getComponent", _me), "Stop")
  callMethod("playBackControl", callMethod("getComponent", _me), "Play")
  callMethod("StartPointerTimer", _me)
  return 1;
case lingoBinary("eq", tElemID, "button.stopmusic"):
  callMethod("playBackControl", callMethod("getComponent", _me), "Stop")
  callMethod("StopPointerTimer", _me)
  return 1;
case lingoBinary("eq", tElemID, "rew"):
  callMethod("playBackControl", callMethod("getComponent", _me), "Stop")
  callMethod("playBackControl", callMethod("getComponent", _me), "Play")
  return 1;
case lingoBinary("eq", tElemID, "button.clearmusic"):
  t_pMusicMixDialog = callNamed("createDialogWindow", callMethod("getID", _me), "MusicMixerClearAllDialog", 2, 1);
  callMethod("show", t_pMusicMixDialog)
  callMethod("setText", t_pMusicMixDialog, callNamed("getText", "musicmix.dialog.clearall.text"), callNamed("getText", "musicmix.dialog.clearall.title"), callNamed("getText", "musicmix.dialog.clearall.btnCancel"), callNamed("getText", "musicmix.dialog.clearall.btnOk"))
  break;
case lingoBinary("contains", tElemID, "button.mute"):
  var tTempDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ".");
  var t_iTrackNum = tElemID.item[3];
  setTheProperty("itemDelimiter", tTempDelim);
  callMethod("HandleMuteButtons", _me, t_iTrackNum)
  return 1;
case lingoBinary("contains", tElemID, "track"):
  tTempDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "_");
  var t_iTrack = tElemID.item[2];
  var t_iSlot = callNamed("value", tElemID.item[3]);
  setTheProperty("itemDelimiter", tTempDelim);
  if (lingoBinary("neq", meProp(_me, "m_ar_trackClickBuffer").count, 0)) {
  setMeProp(_me, "m_ar_trackClickBuffer", new LingoList([]));
  callMethod("RemoveSample", callMethod("getComponent", _me), t_iTrack, t_iSlot)
  } else {
  callMethod("append", meProp(_me, "m_ar_trackClickBuffer"), new LingoList([theProperty("milliSeconds"), t_iTrack, t_iSlot]))
  callNamed("createTimeout", lingoBinary("join", symbol("mouseDown"), theProperty("milliSeconds")), meProp(_me, "m_iDoubleClickDelta"), symbol("removeMouseDown"), callMethod("getID", _me), new LingoList([theProperty("milliSeconds"), t_iTrack, t_iSlot]), 1)
  }

  callMethod("StopPointerTimer", _me)
  callMethod("setButtonState", _me, "button.savemusic", 1)
  return 1;
case lingoBinary("contains", tElemID, "inst"):
  tTempDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "_");
  var t_sInst = tElemID.item[2];
  var t_iSampleNum = tElemID.item[3];
  setTheProperty("itemDelimiter", tTempDelim);
  setMeProp(_me, "m_sIntrument", t_sInst);
  callMethod("SelectInstrument", _me, t_sInst, t_iSampleNum)
  callMethod("SelectedSample", callMethod("getComponent", _me), t_sInst, t_iSampleNum)
  return 1;
  default:
  callNamed("put", tElemID)
  }

  }

  if (lingoBinary("and", lingoBinary("eq", tEvent, symbol("mouseEnter")), lingoBinary("contains", tElemID, "inst"))) {
  tTempDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "_");
  t_sInst = tElemID.item[2];
  t_iSampleNum = tElemID.item[3];
  setTheProperty("itemDelimiter", tTempDelim);
  callMethod("StartPreview", callMethod("getComponent", _me), t_sInst, t_iSampleNum)
  return 1;
  }

  if (lingoBinary("and", lingoBinary("eq", tEvent, symbol("mouseLeave")), lingoBinary("contains", tElemID, "inst"))) {
  callMethod("stop", callNamed("sound", lingoBinary("add", callMethod("getComponent", _me).m_iFirstSoundChannel, 6)))
  return 1;
  }

}

