// vmk_kelloggs_pirate_handler.cct / KelloggsPirateExtensionHandler / HandleRoomEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleRoomEvent(_me: LingoMe, i_rMsg: LingoValue) {
  var tEventType = callMethod("GetIntFrom", i_rMsg.connection);
  var tNumParams = callMethod("GetIntFrom", i_rMsg.connection);
  var tIntParams = new LingoList([]);
  for (var i = 1; i <= tNumParams; ++i) {
  callMethod("append", tIntParams, callMethod("GetIntFrom", i_rMsg.connection))
  }

  tNumParams = callMethod("GetIntFrom", i_rMsg.connection);
  var tStringParams = new LingoList([]);
  for (var i = 1; i <= tNumParams; ++i) {
  callMethod("append", tStringParams, callMethod("GetStrFrom", i_rMsg.connection))
  }

  callNamed("put", lingoBinary("joinPad", "Play sound", tEventType))
  if (lingoBinary("eq", tEventType, 25)) {
  callNamed("createTimeout", symbol("splashSound_timeout"), 300, symbol("PlaySplash"), callMethod("getID", _me), undefined, 1)
  }

}

