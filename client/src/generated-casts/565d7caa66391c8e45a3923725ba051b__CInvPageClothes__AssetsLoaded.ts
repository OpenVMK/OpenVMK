// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageClothes / AssetsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AssetsLoaded(_me: LingoMe, _this: LingoValue, a_iCloth: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("deleteOne", meProp(_me, "m_ar_iClothsToBeLoaded"), a_iCloth)
  if (lingoBinary("eq", meProp(_me, "m_ar_iClothsToBeLoaded").count, 0)) {
  callMethod("render", meProp(_me, "m_rGridRenderer"), callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("clothes")), callMethod("getElement", meProp(_me, "m_rWindow"), "thumbs.grid.b"))
  }

  }

}

