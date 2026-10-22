// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / flushSubtasks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flushSubtasks(_me: LingoMe) {
  callMethod("flush", meProp(_me, "m_st_todo"))
  callMethod("deleteAll", meProp(_me, "m_ar_results"))
}

