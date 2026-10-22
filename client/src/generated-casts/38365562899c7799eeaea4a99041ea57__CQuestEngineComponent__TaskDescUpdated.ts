// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / TaskDescUpdated

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskDescUpdated(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rQuestTemplate"))) {
  callMethod("TaskDescUpdated", meProp(_me, "m_rQuestTemplate"), t_ar_data)
  }

}

