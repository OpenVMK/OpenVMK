// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _RemovePoster

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RemovePoster(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  if ((lingoTruthy(callMethod("_RemoveIndexed", callMethod("_AccessRoom", callMethod("getComponent", _this)), t_iRef, "poster")) ? 0 : 1)) {
  callNamed("error", _this, lingoBinary("joinPad", "Poster not found:", t_iRef), symbol("_RemovePoster"))
  }

}

