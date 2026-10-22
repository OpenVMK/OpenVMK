// core.old.cct / CMgrCastload / removeTemporaryCast

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeTemporaryCast(_me: LingoMe, _this: LingoValue, tNewLoadListOfcasts: LingoValue) {
  var tTempList = callMethod("duplicate", meProp(_me, "pPermanentLevelList"));
  for (var f = 1; f <= tTempList.count; ++f) {
  var tPermanent = tTempList[f][1];
  var tCstNumber = tTempList[f][2];
  if (lingoBinary("and", lingoBinary("eq", tPermanent, 0), lingoBinary("gt", tCstNumber, 0))) {
  var tCastName = callMethod("getPropAt", tTempList, f);
  if (!lingoTruthy(callMethod("getOne", tNewLoadListOfcasts, tCastName))) {
  callMethod("deleteProp", meProp(_me, "pPermanentLevelList"), tCastName)
  callMethod("ResetOneDynamicCast", _this, tCstNumber)
  if (lingoBinary("neq", meProp(_me, "pCastLibCount"), theProperty("number of castLibs"))) {
  setMeProp(_me, "pCastLibCount", theProperty("number of castLibs"));
  var tError = lingoBinary("join", "CastLib count was changed!!!", "\r");
  tError = lingoBinary("joinPad", lingoBinary("join", tError, "CastLib with problems:"), callNamed("castLib", meProp(_me, "pCastLibCount")).name);
  callNamed("error", _this, tError, symbol("removeTemporaryCast"))
  }

  }

  }

  }

}

