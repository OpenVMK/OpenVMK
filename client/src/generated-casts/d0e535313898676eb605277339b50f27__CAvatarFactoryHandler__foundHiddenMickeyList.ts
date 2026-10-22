// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryHandler / foundHiddenMickeyList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function foundHiddenMickeyList(_me: LingoMe, tMsg: LingoValue) {
  var t_iFoundMickeysCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_rFoundMickeys = new LingoList([]);
  if (lingoBinary("neq", t_iFoundMickeysCount, 0)) {
  for (var i = 1; i <= t_iFoundMickeysCount; ++i) {
  var t_rFoundMickey = new LingoPropList([]);
  callMethod("sort", t_rFoundMickey)
  t_rFoundMickey[symbol("id")] = callMethod("GetIntFrom", tMsg.connection);
  t_rFoundMickey[symbol("date")] = callMethod("GetStrFrom", tMsg.connection);
  callMethod("append", t_ar_rFoundMickeys, t_rFoundMickey)
  }

  }

  if (callNamed("objectp", meProp(_me, "m_Obj_HmDetails"))) {
  callMethod("updateMickeyList", meProp(_me, "m_Obj_HmDetails"), t_ar_rFoundMickeys)
  }

}

