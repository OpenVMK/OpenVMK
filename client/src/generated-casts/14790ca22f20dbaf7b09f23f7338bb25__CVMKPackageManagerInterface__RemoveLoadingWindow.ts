// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerInterface / RemoveLoadingWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveLoadingWindow(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objLoadingWindow")))
  }

}

