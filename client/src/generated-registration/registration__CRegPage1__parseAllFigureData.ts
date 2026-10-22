// registration.cct / CRegPage1 / parseAllFigureData

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseAllFigureData(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_AllSets", callNamed("getVariableValue", "AllAvailableSets"));
}

