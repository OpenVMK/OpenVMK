// vmk_monorail_musicmix_handler.cct / CVMKMusicMixInterface / enterRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function enterRoom(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_pTextScroller"), 0)) {
  setMeProp(_me, "m_pTextScroller", callMethod("initTextScroller", _me));
  }

  if (lingoBinary("eq", meProp(_me, "m_pTextScrollerHolder"), 0)) {
  setMeProp(_me, "m_pTextScrollerHolder", callMethod("initTextScrollerHolder", _me));
  }

}

