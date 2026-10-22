// vmk_hm_minigame.cct / CHMPlayerStatus / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iStatus", symbol("normal"));
  setMeProp(_me, "m_ar_teams", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_teams"))
  setMeProp(_me, "m_iBarTime", float(10000));
  setMeProp(_me, "m_iPossessStartTime", 0);
  setMeProp(_me, "m_iDelayedStartTime", 0);
  setMeProp(_me, "m_ar_arrows", new LingoList([]));
  return 1;
}

