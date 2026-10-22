// registration.cct / CRegPage1 / changeFigurePart

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeFigurePart(_me: LingoMe, _this: LingoValue, ar_mp_partList: LingoValue) {
  for (var i = 1; i <= ar_mp_partList.count; ++i) {
  callMethod("setPartModel", _this, callMethod("getPropAt", ar_mp_partList, i), ar_mp_partList[i])
  }

}

