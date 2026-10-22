// vmk_music_mixer.cct / CMusicMixerHandler / DeleteSongResult

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DeleteSongResult(_me: LingoMe, tMsg: LingoValue) {
  var t_result = callMethod("GetIntFrom", tMsg.connection);
  callMethod("parseSongList", _me, tMsg, 0)
}

