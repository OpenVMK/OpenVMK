// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / handle_success

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_success(_me: LingoMe, tMsg: LingoValue) {
  var tConn = callMethod("getaProp", tMsg, symbol("connection"));
  var tMsgId = callMethod("GetIntFrom", tMsg.connection);
  return 1;
}

