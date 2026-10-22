// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / NameError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NameError(_me: LingoMe, tMsg: LingoValue) {
  var t_iErrorCode = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("eq", t_iErrorCode, 4582)) {
  callMethod("RestorePrivateName", _me._interface)
  }

}

