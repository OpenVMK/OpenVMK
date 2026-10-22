// core.old.cct / CMgrResource / removeMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeMember(_me: LingoMe, tMemName: LingoValue) {
  var tMemNum = meProp(_me, "pAllMemNumList")[tMemName];
  if (lingoBinary("lt", callMethod("getPos", meProp(_me, "pDynMemNumList"), tMemNum), 1)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Can't delete member:", tMemName), symbol("removeMember"));
  }

  var tmember = callNamed("member", tMemNum);
  if (lingoBinary("eq", tmember._type, symbol("bitmap"))) {
  setThePropOf(tmember, "name", "");
  setThePropOf(tmember, "paletteRef", symbol("systemWin"));
  callMethod("add", meProp(_me, "pBmpMemNumList"), tMemNum)
  } else {
  callMethod("erase", tmember)
  }

  callMethod("deleteOne", meProp(_me, "pDynMemNumList"), tMemNum)
  callMethod("deleteProp", meProp(_me, "pAllMemNumList"), tMemName)
  return 1;
}

