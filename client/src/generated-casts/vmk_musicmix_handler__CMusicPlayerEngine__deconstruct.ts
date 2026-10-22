// vmk_musicmix_handler.cct / CMusicPlayerEngine / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("put", "Deconstruct, Stop and remove timeouts")
  callMethod("playBackControl", _me, "Stop")
  if (callNamed("timeoutExists", symbol("executeOnce1"))) {
  callNamed("removeTimeout", symbol("executeOnce1"))
  }

  if (callNamed("timeoutExists", symbol("executeOnce2"))) {
  callNamed("removeTimeout", symbol("executeOnce2"))
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}

