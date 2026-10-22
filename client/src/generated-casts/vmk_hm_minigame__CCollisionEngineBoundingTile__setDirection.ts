// vmk_hm_minigame.cct / CCollisionEngineBoundingTile / setDirection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDirection(_me: LingoMe, i_iDirection: LingoValue) {
  if (lingoBinary("gte", i_iDirection, 0)) {
  setMeProp(_me, "m_vDirection", meProp(_me, "m_ar_directions")[lingoBinary("add", i_iDirection, 1)]);
  } else {
  setMeProp(_me, "m_vDirection", callNamed("vector", 0, 0, 0));
  }

}

