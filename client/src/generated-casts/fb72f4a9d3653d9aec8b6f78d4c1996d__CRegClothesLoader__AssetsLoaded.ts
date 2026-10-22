// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegClothesLoader / AssetsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AssetsLoaded(_me: LingoMe, a_iCloth: LingoValue) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_ar_ClothesToLoad"), a_iCloth);
  if (lingoBinary("gt", t_iPos, 0)) {
  callMethod("deleteAt", meProp(_me, "m_ar_ClothesToLoad"), t_iPos)
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_ClothesToLoad").count, 0)) {
  var m_bAllClothesLoaded = 1;
  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objLoadingWindow")))
  }

  callMethod("AllClothesLoaded", callNamed("getThread", symbol("registration")).handler)
  }

}

