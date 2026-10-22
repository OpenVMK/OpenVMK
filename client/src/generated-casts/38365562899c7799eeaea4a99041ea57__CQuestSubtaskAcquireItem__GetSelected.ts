// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rGrid"))) {
  return callMethod("GetSelected", meProp(_me, "m_rGrid"));
  } else {
  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("state"), symbol("invalid")]);
  }

}

