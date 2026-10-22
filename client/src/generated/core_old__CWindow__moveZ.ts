// core.old.cct / CWindow / moveZ

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveZ(_me: LingoMe, _this: LingoValue, a_iZ: LingoValue) {
  if (!lingoTruthy(callNamed("integerp", a_iZ))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Integer expected:", a_iZ), symbol("moveZ"));
  }

  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  setThePropOf(meProp(_me, "pSpriteList")[i], "locZ", lingoBinary("sub", lingoBinary("add", a_iZ, i), 1));
  }

  setMeProp(_me, "pLocZ", a_iZ);
}

