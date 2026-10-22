// vmk_cambodian_handler.cct / CCambodianTempleHandlerHandler / RoomEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomEvent(_me: LingoMe, tMsg: LingoValue) {
  var ttype = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("eq", ttype, 22)) {
  var tParamCount = callMethod("GetIntFrom", tMsg.connection);
  var tColor = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_Params = new LingoList([]);
  for (var i = 2; i <= tParamCount; ++i) {
  callMethod("append", t_ar_Params, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("NewBoat", callMethod("getInterface", _me), tColor, t_ar_Params)
  }

}

