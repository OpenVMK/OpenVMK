// core.old.cct / CMgrCastload / setImportedCast

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setImportedCast(_me: LingoMe, _this: LingoValue, tCastNum: LingoValue, tCastName: LingoValue, tFileName: LingoValue) {
  var tCastLib = callNamed("castLib", tCastNum);
  if (lingoBinary("contains", tCastLib.name, meProp(_me, "pNullCastName"))) {
  setThePropOf(tCastLib, "fileName", tFileName);
  setThePropOf(tCastLib, "name", tCastName);
  meProp(_me, "pPermanentLevelList")[tCastName][2] = tCastNum;
  callMethod("preIndexMembers", callNamed("getResourceManager"), tCastNum)
  meProp(_me, "pLoadedCasts")[tCastName] = callNamed("string", tCastNum);
  }

}

