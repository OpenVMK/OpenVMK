// fireworks_engine.cct / CFireworkPayload / AddEmitterNode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddEmitterNode(_me: LingoMe, i_rNode: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_activeEmitters"), i_rNode)
}

