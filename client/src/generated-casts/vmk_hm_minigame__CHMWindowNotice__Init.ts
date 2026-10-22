// vmk_hm_minigame.cct / CHMWindowNotice / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, a_rClient: LingoValue, a_sNotification: LingoValue) {
  setMeProp(_me, "m_rClient", a_rClient);
  callMethod("showNotification", _me, a_sNotification)
}

