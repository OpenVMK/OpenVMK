// 38365562899c7799eeaea4a99041ea57.cct / CQuestBasePage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sType", "normal");
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_bVisible", 0);
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_rCurPageObj", undefined);
  setMeProp(_me, "m_sCurPageName", symbol("none"));
  return 1;
}

