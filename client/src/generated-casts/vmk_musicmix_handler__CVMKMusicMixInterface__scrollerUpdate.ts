// vmk_musicmix_handler.cct / CVMKMusicMixInterface / scrollerUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function scrollerUpdate(_me: LingoMe, t_Img: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_pTextScrollerHolder"), 0)) {
  setThePropOf(meProp(_me, "m_pTextScrollerHolder"), "image", t_Img);
  setThePropOf(meProp(_me, "m_pTextScrollerHolder"), "regPoint", callNamed("point", 0, meProp(_me, "m_pTextScrollerHolder").height));
  }

}

