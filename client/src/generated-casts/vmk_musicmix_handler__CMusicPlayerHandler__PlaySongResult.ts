// vmk_musicmix_handler.cct / CMusicPlayerHandler / PlaySongResult

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySongResult(_me: LingoMe, tMsg: LingoValue) {
  callNamed("put", "Play song")
  var t_data = callMethod("GetStrFrom", tMsg.connection);
  var t_songName = callMethod("GetStrFrom", tMsg.connection);
  var t_Avatar = callMethod("GetStrFrom", tMsg.connection);
  var t_songData = t_data.value;
  if (lingoBinary("eq", t_Avatar, callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  callMethod("setPlayerState", callMethod("getComponent", _me), 1)
  }

  if (lingoBinary("eq", callNamed("ilk", t_songData), symbol("list"))) {
  var t_txt = callNamed("replaceChunks", callNamed("getText", "musicmix.dialog.performSong.text"), "%songName%", t_songName);
  t_txt = callNamed("replaceChunks", t_txt, "%avatarName%", t_Avatar);
  callMethod("PlaySong", callMethod("getComponent", _me), t_songData)
  callMethod("displayText", callMethod("getInterface", _me), t_txt)
  }

}

