// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rInterface")))
  }

  if (callNamed("objectp", meProp(_me, "m_st_todo"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_st_todo")))
  }

  if (callNamed("objectp", meProp(_me, "m_st_done"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_st_done")))
  }

  return 1;
}

