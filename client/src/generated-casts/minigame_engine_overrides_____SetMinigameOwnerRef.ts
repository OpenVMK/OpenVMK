// minigame_engine_overrides.cct /  / _SetMinigameOwnerRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetMinigameOwnerRef(_me: LingoMe, i_iRef: LingoValue) {
  setThePropOf(_me, "m_iOwnerRef", i_iRef);
}

