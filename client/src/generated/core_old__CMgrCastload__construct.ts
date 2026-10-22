// core.old.cct / CMgrCastload / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", theProperty("runMode"), "Author")) {
  setMeProp(_me, "pFileExtension", ".cst");
  } else {
  setMeProp(_me, "pFileExtension", ".cct");
  }

  setMeProp(_me, "pLoadedCasts", new LingoPropList([]));
  setMeProp(_me, "pTempWaitList", new LingoList([]));
  setMeProp(_me, "pCastLibCount", 0);
  setMeProp(_me, "pNullCastName", "empty");
  setMeProp(_me, "pSysCastNum", callNamed("castLib", "core")._number);
  setMeProp(_me, "pBinCastNum", callNamed("castLib", callNamed("getVariable", "dynamic.bin.cast"))._number);
  return 1;
}

