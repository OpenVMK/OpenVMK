// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  return callMethod("GetSelected", meProp(_me, "m_rCurPageObj"));
  } else {
  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("state"), symbol("invalid")]);
  }

}

