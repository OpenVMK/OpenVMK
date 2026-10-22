// vmk_monorail_mixer.cct / CMusicMixerSaveDialog / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("eq", tEvent, symbol("keyUp"))) {
  if (lingoBinary("neq", meProp(_me, "m_pSongNameField"), 0)) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_pSongNameField"))
  break;
  }

  }

  }

  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pSongNameField"))) ? 0 : 1)) {
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_pSongNameField"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_pSongNameField"))
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_pSongNameField"));
  if (t_pass) {
  callMethod("reset", meProp(_me, "m_pSongNameField"))
  }

  return 1;
case 49:
  t_pass = callMethod("CheckContent", meProp(_me, "m_pSongNameField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_pSongNameField"))
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_pSongNameField"))) ? 0 : 1)) {
  return 1;
  }

  var tValidKeys = lingoBinary("join", "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\\#;", "\"");
  var tAscii = callNamed("charToNum", theProperty("key"));
  var t_allow = 0;
  if (lingoBinary("and", lingoBinary("gt", tAscii, 31), lingoBinary("lt", tAscii, 128))) {
  if (lingoBinary("or", lingoBinary("contains", tValidKeys, theProperty("key")), lingoBinary("eq", tValidKeys, ""))) {
  t_allow = 1;
  }

  }

  if ((lingoTruthy(t_allow) ? 0 : 1)) {
  return 1;
  }

  break;
  break;
  break;
  break;
  }

  var tElem = callMethod("getElement", tWndObj, tElemID);
  if (lingoBinary("neq", tElem, 0)) {
  var t_iChar = lingoBinary("add", tElem.pMember.text.char.count, 1);
  if (lingoBinary("gte", callMethod("charPosToLoc", tElem.pMember, t_iChar).locH, lingoBinary("sub", tElem.pMember.width, 10))) {
  return 1;
  }

  }

  }

  }

  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  var receiverEvent = symbol("SaveDialogWindowEvent");
  var passEvent = 1;
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_iClientID"));
  if (lingoBinary("eq", tObject, 0)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), receiverEvent), 0)) {
  passEvent = 0;
  }

  }

  switch (tElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("hide", _me)
  break;
case "musicmix.cancel":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  if (lingoBinary("eq", meProp(_me, "m_iEditMode"), symbol("new"))) {
  var t_Thread = callNamed("getThread", "MusicMixer");
  if (lingoBinary("neq", t_Thread, 0)) {
  callMethod("setButtonState", callMethod("getInterface", t_Thread), "button.savemusic", 1)
  }

  }

  callMethod("hide", _me)
  break;
case "musicmix.ok":
  tElem = callMethod("getElement", tWndObj, "music.mixer.entername");
  if (lingoBinary("neq", tElem, 0)) {
  var check = callMethod("CheckContent", meProp(_me, "m_pSongNameField"));
  if (check) {
  if (lingoBinary("eq", callMethod("getText", tElem).length, 0)) {
  var t_pMusicMixDialog = callNamed("createDialogWindow", callMethod("getID", _me), "NoSongNameGiven", 1, 1);
  callMethod("show", t_pMusicMixDialog)
  callMethod("setText", t_pMusicMixDialog, callNamed("getText", "musicmix.dialog.noSongName.text"), callNamed("getText", "musicmix.dialog.noSongName.title"), callNamed("getText", "musicmix.dialog.noSongName.btnConfirm"))
  } else {
  callNamed("put", "OK to save")
  if (lingoBinary("eq", meProp(_me, "m_iEditMode"), symbol("new"))) {
  t_Thread = callNamed("getThread", "MusicMixer");
  if (lingoBinary("neq", t_Thread, 0)) {
  callMethod("saveCurrentSong", callMethod("getComponent", t_Thread), callMethod("GetContent", meProp(_me, "m_pSongNameField")))
  callMethod("hide", _me)
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_iEditMode"), symbol("rename"))) {
  if (lingoBinary("neq", meProp(_me, "m_iSongIndex"), 0)) {
  var tSongData = callMethod("getSongData", callMethod("getComponent", callNamed("getThread", "MusicMixer")), meProp(_me, "m_iSongIndex"));
  t_Thread = callNamed("getThread", "MusicMixer");
  if (lingoBinary("neq", t_Thread, 0)) {
  callMethod("RenameSong", callMethod("getHandler", t_Thread), tSongData.id, callMethod("GetContent", meProp(_me, "m_pSongNameField")))
  }

  callMethod("hide", _me)
  }

  } else {
  callNamed("put", "Unknown editing mode")
  }

  }

  }

  } else {
  t_pMusicMixDialog = callNamed("createDialogWindow", callMethod("getID", _me), "SongNameErrorDialog", 1, 1);
  callMethod("show", t_pMusicMixDialog)
  callMethod("setText", t_pMusicMixDialog, callNamed("getText", "musicmix.dialog.SongNameError.text"), callNamed("getText", "musicmix.dialog.SongNameError.title"), callNamed("getText", "musicmix.dialog.SongNameError.btnConfirm"))
  }

  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("executeMessage", symbol("ui_help"))
  break;
  }

  }

}

