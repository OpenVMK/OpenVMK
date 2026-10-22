// 3f02613936ba018480acffaf92dd883a.cct / CVisualizerVmkAnimation / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var tChannel of meProp(_me, "m_ar_channels").toArray()) {
  var tID = callMethod("getID", tChannel);
  if (callNamed("objectExists", tID)) {
  callNamed("removeObject", tID)
  }

  }

  return 1;
}

