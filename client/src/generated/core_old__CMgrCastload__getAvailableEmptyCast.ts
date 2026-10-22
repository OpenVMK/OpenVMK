// core.old.cct / CMgrCastload / getAvailableEmptyCast

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAvailableEmptyCast(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "pAvailableDynCasts").count, 0)) {
  var tCastNum = callMethod("getLast", meProp(_me, "pAvailableDynCasts"));
  callMethod("deleteAt", meProp(_me, "pAvailableDynCasts"), meProp(_me, "pAvailableDynCasts").count)
  return tCastNum;
  } else {
  callNamed("SystemAlert", _this, "Out of free cast entries! CastLoad failed.")
  return 0;
  }

}

