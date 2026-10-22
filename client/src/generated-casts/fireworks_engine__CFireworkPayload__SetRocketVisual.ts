// fireworks_engine.cct / CFireworkPayload / SetRocketVisual

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRocketVisual(_me: LingoMe, i_spriteSeq: LingoValue) {
  setMeProp(_me, "m_ar_rocketVisual", i_spriteSeq);
}

