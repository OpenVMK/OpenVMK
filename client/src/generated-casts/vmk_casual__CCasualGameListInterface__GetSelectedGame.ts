// vmk_casual.cct / CCasualGameListInterface / GetSelectedGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelectedGame(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "m_iSelected"), 0)) {
  return meProp(_me, "m_ar_rItems")[meProp(_me, "m_iSelected")];
  } else {
  return new LingoPropList([symbol("players"), new LingoList([]), symbol("instance"), -float(1)]);
  }

}

