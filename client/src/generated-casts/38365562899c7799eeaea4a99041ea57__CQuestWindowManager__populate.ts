// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / populate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function populate(_me: LingoMe, a_ar_subtasks: LingoValue, a_bOntop: LingoValue) {
  if (a_bOntop) {
  for (var i = a_ar_subtasks.count; i >= 1; --i) {
  var t_rSubtask = a_ar_subtasks[i];
  callMethod("push", meProp(_me, "m_st_todo"), t_rSubtask)
  }

  } else {
  for (var t_rSubtask of a_ar_subtasks.toArray()) {
  callMethod("unshift", meProp(_me, "m_st_todo"), t_rSubtask)
  }

  }

  setMeProp(_me, "m_iLastAction", symbol("populate"));
}

