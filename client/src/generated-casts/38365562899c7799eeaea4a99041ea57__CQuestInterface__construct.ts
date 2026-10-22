// 38365562899c7799eeaea4a99041ea57.cct / CQuestInterface / construct

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
  setMeProp(_me, "m_bInitialized", 0);
  setMeProp(_me, "m_rPageBase", undefined);
  return 1;
}

