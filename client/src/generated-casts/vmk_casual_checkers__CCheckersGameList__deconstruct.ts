// vmk_casual_checkers.cct / CCheckersGameList / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rComponent"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rComponent")))
  setMeProp(_me, "m_rComponent", undefined);
  }

  return 1;
}

