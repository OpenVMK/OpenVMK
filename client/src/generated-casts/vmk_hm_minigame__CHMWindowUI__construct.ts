// vmk_hm_minigame.cct / CHMWindowUI / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindowName", "HMG Window UI");
  setMeProp(_me, "m_iLastPurpleScore", 0);
  setMeProp(_me, "m_iLastGreenScore", 0);
  setMeProp(_me, "m_iLastPurpleWins", 0);
  setMeProp(_me, "m_iLastGreenWins", 0);
  setMeProp(_me, "m_bActive", 0);
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

