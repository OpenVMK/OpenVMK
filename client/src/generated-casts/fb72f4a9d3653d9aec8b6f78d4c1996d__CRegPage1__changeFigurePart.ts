// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / changeFigurePart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeFigurePart(_me: LingoMe, _this: LingoValue, ar_mp_partList: LingoValue) {
  for (var i = 1; i <= ar_mp_partList.count; ++i) {
  callMethod("setPartModel", _this, callMethod("getPropAt", ar_mp_partList, i), ar_mp_partList[i])
  }

}

