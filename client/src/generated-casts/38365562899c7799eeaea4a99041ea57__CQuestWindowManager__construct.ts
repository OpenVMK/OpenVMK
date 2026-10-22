// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_results", new LingoPropList([]));
  setMeProp(_me, "m_st_todo", callNamed("createObject", callNamed("getUniqueID"), "CStructStack"));
  setMeProp(_me, "m_st_done", callNamed("createObject", callNamed("getUniqueID"), "CStructStack"));
  setMeProp(_me, "m_rInterface", callNamed("createObject", callNamed("getUniqueID"), "CQuestInterface"));
  callMethod("setManager", meProp(_me, "m_rInterface"), _me)
  setMeProp(_me, "m_iLastAction", symbol("none"));
  return 1;
}

