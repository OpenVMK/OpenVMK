// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / getTutorialsVisibleState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getTutorialsVisibleState(_me: LingoMe, t_list: LingoValue) {
  return meProp(_me, "m_bTutorialsAllowed");
  if (callNamed("voidp", t_list)) {
  t_list = new LingoList([]);
  }

  callMethod("deleteAll", t_list)
  var t_bAllowTutorials = 1;
  var t_sPlayerName = callMethod("get", callNamed("getObject", symbol("session")), "name");
  var t_ar_config = callMethod("_getTutorialConfiguration", _me);
  var tPos = callMethod("findPos", t_ar_config, t_sPlayerName);
  if (lingoBinary("neq", tPos, 0)) {
  var tvalue = callNamed("value", t_ar_config[t_sPlayerName]);
  if (lingoBinary("eq", tvalue, 0)) {
  t_bAllowTutorials = 0;
  }

  }

  callMethod("append", t_list, t_bAllowTutorials)
  return t_bAllowTutorials;
}

