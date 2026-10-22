// vmk_hm_minigame.cct / CHMSimpleSpring / setBobPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setBobPosition(_me: LingoMe, tP: LingoValue) {
  setMeProp(_me, "m_vLocation", callMethod("duplicate", tP));
}

