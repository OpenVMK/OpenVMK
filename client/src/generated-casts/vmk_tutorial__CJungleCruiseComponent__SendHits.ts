// vmk_tutorial.cct / CJungleCruiseComponent / SendHits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendHits(_me: LingoMe, a_ar_hits: LingoValue, a_iFrameID: LingoValue) {
  var tdata = new LingoList([]);
  callMethod("append", tdata, a_iFrameID)
  callMethod("append", tdata, callMethod("count", a_ar_hits))
  for (var tHit of a_ar_hits.toArray()) {
  callMethod("append", tdata, tHit.ref)
  callMethod("append", tdata, tHit.distance)
  callMethod("append", tdata, tHit.accuracy)
  callMethod("append", tdata, tHit.time)
  }

  callNamed("put", lingoBinary("joinPad", "Send possible hits to server", tdata))
  callNamed("executeMessage", symbol("SendMinigameAction"), 1, tdata)
}

