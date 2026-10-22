// core.old.cct / CMgrCastload / RemoveCastLib

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveCastLib(_me: LingoMe, _this: LingoValue, a_sCastName: LingoValue) {
  setMeProp(_me, "pCastLibCount", theProperty("number of castLibs"));
  var t_iEmptyCstNum = 1;
  for (var t_iCstNum = 2; t_iCstNum <= meProp(_me, "pCastLibCount"); ++t_iCstNum) {
  if (lingoBinary("eq", callNamed("castLib", t_iCstNum).name, a_sCastName)) {
  callMethod("ResetOneDynamicCast", _this, t_iCstNum)
  }

  t_iEmptyCstNum = lingoBinary("add", t_iEmptyCstNum, 1);
  }

}

