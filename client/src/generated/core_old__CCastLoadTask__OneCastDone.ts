// core.old.cct / CCastLoadTask / OneCastDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OneCastDone(_me: LingoMe, tFile: LingoValue) {
  setMeProp(_me, "pLoadedSoFar", lingoBinary("add", meProp(_me, "pLoadedSoFar"), float(1)));
  if (lingoBinary("eq", callNamed("integer", meProp(_me, "pLoadedSoFar")), meProp(_me, "pCastcount"))) {
  setMeProp(_me, "pStatus", symbol("ready"));
  }

  meProp(_me, "pCastList")[tFile] = 1;
  while (1) {
  if (lingoBinary("eq", callNamed("count", meProp(_me, "pCastList")), 0)) {
  break;
  }

  if (lingoBinary("eq", meProp(_me, "pCastList")[1], 1)) {
  var tCastName = callMethod("getPropAt", meProp(_me, "pCastList"), 1);
  if (callMethod("exists", callNamed("getCastLoadManager"), tCastName)) {
  callMethod("initThread", callNamed("getThreadManager"), callNamed("castLib", tCastName)._number)
  }

  callMethod("deleteProp", meProp(_me, "pCastList"), tCastName)
  continue;
  }

  break;
  }

  return 1;
}

