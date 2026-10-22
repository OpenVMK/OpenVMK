// vmk_fireworks.cct / CFireworksStage / AddToChecksum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddToChecksum(_me: LingoMe, a_value: LingoValue) {
  setMeProp(_me, "m_iChecksum", lingoBinary("add", lingoBinary("add", meProp(_me, "m_iChecksum"), 3), callNamed("integer", a_value)));
}

