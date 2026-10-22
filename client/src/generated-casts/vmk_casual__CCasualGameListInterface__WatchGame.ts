// vmk_casual.cct / CCasualGameListInterface / WatchGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function WatchGame(_me: LingoMe, _this: LingoValue) {
  var t_iSelected = callMethod("GetSelectedGame", _this).instance;
  if (lingoBinary("gt", t_iSelected, -float(1))) {
  callMethod("send", callNamed("getConnection", "VMK"), 955, new LingoPropList([symbol("integer"), meProp(_me, "m_iGameCode"), symbol("integer"), t_iSelected]))
  }

}

