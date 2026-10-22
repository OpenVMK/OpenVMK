// vmk_minigame.cct / CRoomObjectManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mp_ar_rUsepool", new LingoPropList([]));
  setMeProp(_me, "m_mp_ar_rFreepool", new LingoPropList([]));
  setMeProp(_me, "m_iRefSource", 0);
  setMeProp(_me, "m_iAllocationSize", 8);
  setMeProp(_me, "m_rEmptyFactor", callNamed("createObject", "StubFactor", "CEmptyFactor"));
  setMeProp(_me, "m_rEmptyVisual", callNamed("createObject", "StubVisual", "CEmptyVisualizer"));
  return 1;
}

