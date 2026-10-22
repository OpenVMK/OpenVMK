// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / __RemoveCollectable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function __RemoveCollectable(_me: LingoMe, _this: LingoValue, t_iRef: LingoValue) {
  var t_rRoom = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("objectp", t_rRoom)) {
  callMethod("_RemoveIndexed", t_rRoom, t_iRef, "collectable")
  }

}

