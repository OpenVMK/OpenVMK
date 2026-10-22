// 3f02613936ba018480acffaf92dd883a.cct / CSpriteAnimationObject / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_ar_params", new LingoPropList([]));
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rVisual")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rFactor")))
  return 1;
}

