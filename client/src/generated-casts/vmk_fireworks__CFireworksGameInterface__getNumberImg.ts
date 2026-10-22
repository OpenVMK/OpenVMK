// vmk_fireworks.cct / CFireworksGameInterface / getNumberImg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getNumberImg(_me: LingoMe, i: LingoValue) {
  if (lingoBinary("lt", i, 0)) {
  i = 0;
  }

  if (lingoBinary("gt", i, 9)) {
  i = 0;
  }

  return meProp(_me, "m_ar_numbers")[lingoBinary("add", i, 1)];
}

