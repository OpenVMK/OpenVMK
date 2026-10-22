// core.old.cct / CWindowTextWrapper / initResources

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initResources(_me: LingoMe, _this: LingoValue, tFontProps: LingoValue) {
  var tMemNum = callMethod("getmemnum", callNamed("getResourceManager"), "visual window text");
  if (lingoBinary("eq", tMemNum, 0)) {
  tMemNum = callMethod("createMember", callNamed("getResourceManager"), "visual window text", symbol("text"));
  setMeProp(_me, "pTextMem", callNamed("member", tMemNum));
  setThePropOf(meProp(_me, "pTextMem"), "boxType", symbol("adjust"));
  } else {
  setMeProp(_me, "pTextMem", callNamed("member", tMemNum));
  }

  return 1;
}

