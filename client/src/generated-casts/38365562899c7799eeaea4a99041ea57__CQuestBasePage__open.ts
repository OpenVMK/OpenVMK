// 38365562899c7799eeaea4a99041ea57.cct / CQuestBasePage / open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function open(_me: LingoMe) {
  if (meProp(_me, "m_bReady")) {
  callMethod("show", meProp(_me, "m_rWindow"))
  setMeProp(_me, "m_bVisible", 1);
  return meProp(_me, "m_bVisible");
  } else {
  setMeProp(_me, "m_bVisible", 0);
  return callNamed("error", _me, "Quest Engine Subtask not ready yet!", symbol("open"));
  }

}

