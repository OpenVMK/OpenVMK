// core.old.cct / String Services Class / initConvList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initConvList(_me: LingoMe) {
  if (lingoBinary("contains", theProperty("platform"), "win")) {
  var tMachineType = ".win";
  } else {
  tMachineType = ".mac";
  }

  setMeProp(_me, "pConvList", new LingoPropList([]));
  var tCharList = callNamed("getVariableValue", lingoBinary("join", "char.conversion", tMachineType), new LingoPropList([]));
  for (var i = 1; i <= tCharList.count; ++i) {
  var tKey = callMethod("getPropAt", tCharList, i);
  var tVal = tCharList[i];
  if (callNamed("integerp", callNamed("integer", tKey))) {
  tKey = callNamed("numToChar", callNamed("integer", tKey));
  }

  if (callNamed("integerp", callNamed("integer", tVal))) {
  tVal = callNamed("numToChar", callNamed("integer", tVal));
  }

  meProp(_me, "pConvList")[tKey] = tVal;
  }

  return 1;
}

