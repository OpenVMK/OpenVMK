// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / photoTaken

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function photoTaken(_me: LingoMe) {
  for (var tMickey of meProp(_me, "m_lHiddenMickeysInViewFinder").toArray()) {
  var tSprite = tMickey["SPRITE"];
  setThePropOf(tSprite, "blend", tMickey["BLEND"]);
  }

  if (lingoBinary("eq", meProp(_me, "m_lHiddenMickeysInViewFinder").count, 0)) {
  callNamed("executeMessage", symbol("MickeyInPicture"), 0)
  }

  setMeProp(_me, "m_lHiddenMickeysInViewFinder", new LingoList([]));
}

