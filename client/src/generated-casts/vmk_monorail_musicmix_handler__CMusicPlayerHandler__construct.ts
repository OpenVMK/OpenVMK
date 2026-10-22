// vmk_monorail_musicmix_handler.cct / CMusicPlayerHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("RequestSongs"), callMethod("getID", _me), symbol("GetSongs"))
  callNamed("registerMessage", symbol("RequestPlaySong"), callMethod("getID", _me), symbol("PlaySong"))
  callNamed("registerMessage", symbol("CancelPlaySong"), callMethod("getID", _me), symbol("CancelPlay"))
  callMethod("regMsgList", _me, 1)
  return 1;
}

