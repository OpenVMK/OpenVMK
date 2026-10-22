// 1cc3629b03705a2da146e4473dbbaac4.cct / CThumbList / getClickedID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getClickedID(_me: LingoMe, a_pLoc: LingoValue) {
  for (var tItem of meProp(_me, "m_ar_items").toArray()) {
  if (callNamed("inside", a_pLoc, tItem.rect)) {
  return tItem.id;
  }

  }

  return undefined;
}

