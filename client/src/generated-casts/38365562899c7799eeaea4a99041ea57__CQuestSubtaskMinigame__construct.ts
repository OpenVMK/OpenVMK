// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMinigame / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_defaults", new LingoPropList([symbol("min"), 0, symbol("max"), 0, symbol("accuracy"), 5, symbol("default"), 0]));
  var m_iCurrenAmount = 0;
  meProp(_me, "m_ar_defaults")[symbol("accuracy")] = 5;
  setMeProp(_me, "m_iScoreState", symbol("inactive"));
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  return 1;
}

