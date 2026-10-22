// vmk_monorail_mixer.cct / CMusicMixerHandler / SaveSongResult

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SaveSongResult(_me: LingoMe, tMsg: LingoValue) {
  var t_result = callMethod("GetIntFrom", tMsg.connection);
  callMethod("parseSongList", _me, tMsg, 0)
}

