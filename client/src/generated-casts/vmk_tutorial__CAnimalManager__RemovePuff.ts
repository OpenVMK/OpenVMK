// vmk_tutorial.cct / CAnimalManager / RemovePuff

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemovePuff(_me: LingoMe, i_iRef: LingoValue) {
  callMethod("RemoveRoomObject", _me, "puff", i_iRef)
}

