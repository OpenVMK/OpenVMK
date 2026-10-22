// item_2355.cct / CCheckersThread / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rModule"))) {
  if (lingoBinary("eq", meProp(_me, "m_rModule").valid, 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rModule")))
  setMeProp(_me, "m_rModule", undefined);
  }

  }

  return 1;
}

