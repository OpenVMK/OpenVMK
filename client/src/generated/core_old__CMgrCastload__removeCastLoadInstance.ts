// core.old.cct / CMgrCastload / removeCastLoadInstance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeCastLoadInstance(_me: LingoMe, _this: LingoValue, tFile: LingoValue) {
  if (lingoBinary("neq", callNamed("ilk", tFile), symbol("string"))) {
  return 0;
  }

  if (callNamed("voidp", meProp(_me, "pCurrentDownLoads")[tFile])) {
  return callNamed("error", _this, lingoBinary("joinPad", "CastLoad instance was lost!", tFile), symbol("removeCastLoadInstance"));
  } else {
  return callMethod("deleteProp", meProp(_me, "pCurrentDownLoads"), tFile);
  }

}

