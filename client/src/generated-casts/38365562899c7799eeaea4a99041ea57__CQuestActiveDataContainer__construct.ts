// 38365562899c7799eeaea4a99041ea57.cct / CQuestActiveDataContainer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rInterface", callNamed("createObject", callNamed("getUniqueID"), "CQuestWindowManager"));
  callMethod("SetType", callMethod("getInterface", meProp(_me, "m_rInterface")), "dialog")
  callMethod("SetOwner", meProp(_me, "m_rInterface"), _me)
  setMeProp(_me, "m_ar_dataContainer", new LingoPropList([]));
  return 1;
}

