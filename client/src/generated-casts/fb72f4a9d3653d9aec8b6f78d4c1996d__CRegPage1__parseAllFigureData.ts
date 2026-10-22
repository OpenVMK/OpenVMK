// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / parseAllFigureData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseAllFigureData(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_AllSets", callNamed("getVariableValue", "AllAvailableSets"));
}

