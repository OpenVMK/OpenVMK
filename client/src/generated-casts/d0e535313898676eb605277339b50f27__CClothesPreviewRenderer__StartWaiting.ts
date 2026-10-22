// d0e535313898676eb605277339b50f27.cct / CClothesPreviewRenderer / StartWaiting

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartWaiting(_me: LingoMe) {
  if (lingoBinary("or", (lingoTruthy(meProp(_me, "m_bAllClothesLoaded")) ? 0 : 1), lingoBinary("gt", meProp(_me, "m_ar_ClothesToLoad").count, 0))) {
  callMethod("delay", _me, 200, symbol("StartWaiting"))
  } else {
  callNamed("call", meProp(_me, "m_rCallback")[symbol("method")], new LingoList([callNamed("getObject", meProp(_me, "m_rCallback")[symbol("client")])]), meProp(_me, "m_mp_ThumbList"), meProp(_me, "m_rCallback"))
  callNamed("removeObject", callMethod("getID", _me))
  }

}

