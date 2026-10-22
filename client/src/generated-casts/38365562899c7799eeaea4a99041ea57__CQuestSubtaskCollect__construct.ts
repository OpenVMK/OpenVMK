// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskCollect / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_defaults", new LingoPropList([symbol("min"), 1, symbol("max"), 15, symbol("accuracy"), 1, symbol("default"), 1]));
  var m_iCurrenAmount = 1;
  meProp(_me, "m_ar_defaults")[symbol("accuracy")] = 1;
  setMeProp(_me, "m_iScoreState", symbol("inactive"));
  setMeProp(_me, "m_rSprite", undefined);
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  return 1;
}

