// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / clickContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clickContent(_me: LingoMe, loc: LingoValue) {
  var t_target = callNamed("point", 0, 0);
  if (callMethod("inside", meProp(_me, "pContent"), loc, t_target)) {
  callMethod("clickPage", meProp(_me, "pContent"), t_target)
  }

}

