// vmk_casual_checkers.cct / CCheckersGameList / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, _this: LingoValue) {
  callMethod("feedImage", meProp(_me, "m_rElement"), callMethod("render", meProp(_me, "m_rComponent")))
}

