// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpContent / previousPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function previousPage(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "pTopic"))) ? 0 : 1)) {
  callMethod("previousPage", meProp(_me, "pTopic"))
  callMethod("setText", _me, callMethod("getText", meProp(_me, "pTopic")))
  callMethod("render", meProp(_me, "pHelp"))
  return 1;
  } else {
  return 0;
  }

}

