// vmk_hm_lobby_handler.cct / CHMLobbyInterface / AddInstance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddInstance(_me: LingoMe, a_iInstanceID: LingoValue, a_iPopulation: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_instances"), new LingoPropList([symbol("id"), a_iInstanceID, symbol("population"), a_iPopulation]))
}

