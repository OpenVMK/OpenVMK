// vmk_hm_minigame.cct / CCollisionEngine / setLinks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLinks(_me: LingoMe, i_ar_links: LingoValue) {
  if (callNamed("listp", i_ar_links)) {
  setMeProp(_me, "m_ar_links", i_ar_links);
  } else {
  callNamed("put", "Incorrect link-format")
  }

}

