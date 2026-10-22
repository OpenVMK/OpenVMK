// core.old.cct / CMgrCastload / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, _this: LingoValue) {
  for (var i = 1; i <= theProperty("number of castLibs"); ++i) {
  callNamed("put", callNamed("castLib", i).name)
  }

  for (var tObj of meProp(_me, "pCurrentDownLoads").toArray()) {
  callNamed("put", lingoBinary("joinPad", tObj[symbol("pFile")], tObj[symbol("pPercent")]))
  }

}

