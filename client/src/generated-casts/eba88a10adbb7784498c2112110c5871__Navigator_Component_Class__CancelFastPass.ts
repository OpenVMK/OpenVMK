// eba88a10adbb7784498c2112110c5871.cct / Navigator Component Class / CancelFastPass

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CancelFastPass(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_obj_FastPassWindow"))) {
  callNamed("removeObject", "FastPassWindow")
  if (callNamed("objectExists", "Navigation.Room.Queue")) {
  var t_Obj = callNamed("getObject", "Navigation.Room.Queue");
  callMethod("FastPassRemoved", t_Obj)
  }

  }

}

