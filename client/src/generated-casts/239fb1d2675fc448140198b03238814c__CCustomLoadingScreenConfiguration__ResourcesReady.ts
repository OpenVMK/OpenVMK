// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreenConfiguration / ResourcesReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResourcesReady(_me: LingoMe, _this: LingoValue, a_iID: LingoValue) {
  var t_mpConf = callMethod("getConfigurationForRoom", _this, a_iID);
  for (var i = 1; i <= 4; ++i) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mpConf[i], symbol("img")))) ? 0 : 1)) {
  if (lingoBinary("lt", callNamed("getDownLoadPercent", t_mpConf[i][symbol("img")]), float(1))) {
  return 0;
  }

  }

  }

  return 1;
}

