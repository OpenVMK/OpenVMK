// core.old.cct / CMgrCastload / addOneCastToWaitList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addOneCastToWaitList(_me: LingoMe, _this: LingoValue, tCastName: LingoValue, tPermanentOrNot: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(callMethod("FindCastNumber", _this, tCastName)), !lingoTruthy(callMethod("getOne", meProp(_me, "pWaitList"), tCastName)))) {
  callMethod("add", meProp(_me, "pTempWaitList"), tCastName)
  callMethod("addProp", meProp(_me, "pPermanentLevelList"), tCastName, new LingoList([tPermanentOrNot, 0]))
  } else {
  if (callNamed("voidp", meProp(_me, "pLoadedCasts")[tCastName])) {
  meProp(_me, "pLoadedCasts")[tCastName] = callNamed("string", callMethod("FindCastNumber", _this, tCastName));
  }

  }

}

