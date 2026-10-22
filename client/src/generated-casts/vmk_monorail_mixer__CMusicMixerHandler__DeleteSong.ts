// vmk_monorail_mixer.cct / CMusicMixerHandler / DeleteSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DeleteSong(_me: LingoMe, t_ID: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), t_ID]);
  callMethod("send", callNamed("getConnection", "VMK"), "DeleteSong", tMsg)
}

