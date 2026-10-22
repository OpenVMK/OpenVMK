// core.old.cct / CWindowImageWrapper / adjustOffsetBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function adjustOffsetBy(_me: LingoMe, tOffX: LingoValue, tOffY: LingoValue) {
  setMeProp(_me, "pOffX", lingoBinary("add", meProp(_me, "pOffX"), tOffX));
  setMeProp(_me, "pOffY", lingoBinary("add", meProp(_me, "pOffY"), tOffY));
  if (!lingoTruthy(meProp(_me, "pUpdateLock"))) {
  callMethod("clearImage", _me)
  callMethod("render", _me)
  }

}

