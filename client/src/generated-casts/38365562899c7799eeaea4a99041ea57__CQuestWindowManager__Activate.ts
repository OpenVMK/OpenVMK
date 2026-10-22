// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe) {
  if (callMethod("isEmpty", meProp(_me, "m_st_todo"))) {
  callMethod("broadcastResults", _me)
  } else {
  if (lingoBinary("eq", meProp(_me, "m_iLastAction"), symbol("tryquit"))) {
  callNamed("removeObject", callMethod("getID", _me))
  } else {
  setMeProp(_me, "m_rActiveSubtask", callMethod("top", meProp(_me, "m_st_todo")));
  callMethod("ActivateSubtaskInterface", _me, meProp(_me, "m_rActiveSubtask"))
  }

  }

}

