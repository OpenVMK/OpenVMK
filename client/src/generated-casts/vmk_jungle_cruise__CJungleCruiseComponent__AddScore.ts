// vmk_jungle_cruise.cct / CJungleCruiseComponent / AddScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddScore(_me: LingoMe, i_iFrameID: LingoValue, i_iAmount: LingoValue) {
  setMeProp(_me, "m_score", lingoBinary("add", meProp(_me, "m_score"), i_iAmount));
  callMethod("updateScoreinfo", callMethod("getInterface", _me))
  for (var tPhoto of meProp(_me, "m_ar_photoAlbum").toArray()) {
  if (lingoBinary("eq", tPhoto.frameid, i_iFrameID)) {
  callNamed("put", "Found photo")
  setThePropOf(tPhoto, "score", i_iAmount);
  break;
  }

  }

}

