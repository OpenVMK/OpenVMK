// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("GoTrain"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("GoSulake"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("GoMusicMixer"), callMethod("getID", _me))
  callMethod("regMsgList", _me, 0)
  return 1;
}

