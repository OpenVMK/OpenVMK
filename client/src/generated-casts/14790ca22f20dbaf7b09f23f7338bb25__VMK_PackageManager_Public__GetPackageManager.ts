// 14790ca22f20dbaf7b09f23f7338bb25.cct / VMK PackageManager Public / GetPackageManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetPackageManager(_me: LingoMe) {
  return callMethod("getComponent", callNamed("getThread", "vmk_package_manager"));
}

