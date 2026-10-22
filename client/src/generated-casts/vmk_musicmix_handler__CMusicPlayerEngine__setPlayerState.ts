// vmk_musicmix_handler.cct / CMusicPlayerEngine / setPlayerState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPlayerState(_me: LingoMe, t_state: LingoValue) {
  setMeProp(_me, "m_bAllowOpenPlayer", t_state);
}

