// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerHandler / HandleUnloadPackage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleUnloadPackage(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_sPackageName = callMethod("GetStrFrom", tMsg.connection);
  callMethod("DelayedUnloadPackage", _this.component, t_sPackageName, 10000)
}

