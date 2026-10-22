// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / FastPAssQueuePosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FastPAssQueuePosition(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iPosInQueue = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("UpdateFastPassQueuePosition", _me.component, t_iPosInQueue)
}

