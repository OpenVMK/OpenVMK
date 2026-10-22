// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogItemListing / UpdateTopics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateTopics(_me: LingoMe, a_sChanging: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_mpOrigServerData"))) ? 0 : 1)) {
  var t_bState = meProp(_me, "m_mpOrigServerData")[a_sChanging].state;
  setThePropOf(meProp(_me, "m_mpOrigServerData")[a_sChanging], "state", (lingoTruthy(t_bState) ? 0 : 1));
  return 1;
  }

}

