// registration.cct / CRegClothesLoader / AssetsLoaded

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

