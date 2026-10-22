// vmk_jungle_cruise.cct / CScoreFeedback / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe) {
  setMeProp(_me, "m_bActive", 1);
  setThePropOf(meProp(_me, "m_rSprite"), "visible", meProp(_me, "m_bActive"));
}

