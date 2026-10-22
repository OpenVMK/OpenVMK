// vmk_fireworks_minigame.cct / CFireworksGameComponent / switchState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function switchState(_me: LingoMe, i_newstate: LingoValue) {
  setMeProp(_me, "m_iGameState", i_newstate);
  setMeProp(_me, "m_fStateTime", float(0));
}

