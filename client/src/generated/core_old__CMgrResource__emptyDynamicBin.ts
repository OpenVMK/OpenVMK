// core.old.cct / CMgrResource / emptyDynamicBin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function emptyDynamicBin(_me: LingoMe) {
  var tMemberAmount = thePropOf(callNamed("castLib", meProp(_me, "pBin")), "number of castMembers");
  for (var i = 1; i <= tMemberAmount; ++i) {
  var tmember = callNamed("member", i, meProp(_me, "pBin"));
  if (lingoBinary("neq", tmember._type, symbol("empty"))) {
  callMethod("erase", tmember)
  }

  }

  setMeProp(_me, "pDynMemNumList", new LingoList([]));
  setMeProp(_me, "pBmpMemNumList", new LingoList([]));
  return 1;
}

