// vmk_junglecruise_minigame.cct / CSpriteHider / AddHideable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddHideable(_me: LingoMe, i_iChannel: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_hideables"), i_iChannel)
}

