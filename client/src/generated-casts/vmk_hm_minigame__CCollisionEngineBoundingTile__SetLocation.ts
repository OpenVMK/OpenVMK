// vmk_hm_minigame.cct / CCollisionEngineBoundingTile / SetLocation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetLocation(_me: LingoMe, a_vLocation: LingoValue, a_iTileRef: LingoValue, a_iDirection: LingoValue) {
  if (callNamed("vectorp", a_vLocation)) {
  setMeProp(_me, "m_vLocation", a_vLocation);
  }

  setMeProp(_me, "m_iTileRef", a_iTileRef);
  setMeProp(_me, "m_iDirection", callMethod("getPos", meProp(_me, "m_ar_directions"), a_iDirection));
}

