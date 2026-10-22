// vmk_jungle_cruise.cct / CSpriteHider / HideSprites

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideSprites(_me: LingoMe) {
  for (var tChannel of meProp(_me, "m_ar_hideables").toArray()) {
  setThePropOf(callNamed("sprite", tChannel), "visible", 0);
  }

}

