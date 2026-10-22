// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / _Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Remove(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  callNamed("removeUpdate", callMethod("getID", _this))
  }

}

