// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / cancelSubtask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function cancelSubtask(_me: LingoMe, a_bScrapSubtask: LingoValue) {
  if ((lingoTruthy(callMethod("isEmpty", meProp(_me, "m_st_done"))) ? 0 : 1)) {
  if (a_bScrapSubtask) {
  callMethod("pop", meProp(_me, "m_st_todo"))
  } else {
  callMethod("push", meProp(_me, "m_st_todo"), callMethod("pop", meProp(_me, "m_st_done")))
  }

  setMeProp(_me, "m_iLastAction", symbol("cancel"));
  } else {
  setMeProp(_me, "m_iLastAction", symbol("tryquit"));
  }

}

