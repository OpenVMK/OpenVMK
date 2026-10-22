// core.old.cct / CMgrResource / deleteDynamicMembers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteDynamicMembers(_me: LingoMe) {
  for (var tMemNum of meProp(_me, "pDynMemNumList").toArray()) {
  callMethod("erase", callNamed("member", tMemNum))
  }

  for (var tMemNum of meProp(_me, "pBmpMemNumList").toArray()) {
  var tmember = callNamed("member", tMemNum);
  setThePropOf(tmember, "paletteRef", symbol("systemWin"));
  callMethod("erase", tmember)
  }

  setMeProp(_me, "pDynMemNumList", new LingoList([]));
  setMeProp(_me, "pBmpMemNumList", new LingoList([]));
  return 1;
}

