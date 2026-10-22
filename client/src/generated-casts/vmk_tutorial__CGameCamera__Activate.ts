// vmk_tutorial.cct / CGameCamera / Activate

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
  setThePropOf(meProp(_me, "m_rSprBase"), "visible", meProp(_me, "m_bActive"));
  setThePropOf(meProp(_me, "m_rSprLock"), "visible", meProp(_me, "m_bActive"));
  setThePropOf(meProp(_me, "m_rSprLED"), "visible", meProp(_me, "m_bActive"));
}

