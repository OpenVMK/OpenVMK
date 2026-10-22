// vmk_monorail_train_handler.cct / CStar / accelerate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function accelerate(_me: LingoMe, iDirection: LingoValue) {
  setMeProp(_me, "pSpeed", lingoBinary("add", meProp(_me, "pSpeed"), lingoBinary("mul", 0.5, iDirection)));
}

