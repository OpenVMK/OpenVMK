// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / handle_cantconnect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_cantconnect(_me: LingoMe, tMsg: LingoValue) {
  var tConn = callMethod("getaProp", tMsg, symbol("connection"));
  var tErrorMsg = callMethod("GetStrFrom", tConn);
  callNamed("executeMessage", symbol("leaveRoom"))
  return callNamed("executeMessage", symbol("alert"), new LingoPropList([symbol("Msg"), tErrorMsg]));
}

