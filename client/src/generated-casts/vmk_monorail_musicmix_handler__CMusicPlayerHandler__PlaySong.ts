// vmk_monorail_musicmix_handler.cct / CMusicPlayerHandler / PlaySong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySong(_me: LingoMe, t_ID: LingoValue) {
  callMethod("setPlayerState", callMethod("getComponent", _me), 0)
  var tMsg = new LingoPropList([symbol("int"), t_ID]);
  callMethod("send", callNamed("getConnection", "VMK"), "PlaySong", tMsg)
}

