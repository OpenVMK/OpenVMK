// vmk_music_mixer.cct / CMusicMixerHandler / CreateSongResult

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSongResult(_me: LingoMe, tMsg: LingoValue) {
  var t_result = callMethod("GetIntFrom", tMsg.connection);
  var t_songId = callMethod("GetIntFrom", tMsg.connection);
  switch (t_result) {
case 0:
  break;
case 1:
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "CreateSongDialog1", 1, 1);
  callMethod("setText", t, "Could not create song", "Could not create new song, all slots are full", "OK")
  callMethod("show", t)
  break;
case 2:
  break;
case 3:
  break;
case 4:
  break;
  }

  callMethod("parseSongList", _me, tMsg, 0)
}

