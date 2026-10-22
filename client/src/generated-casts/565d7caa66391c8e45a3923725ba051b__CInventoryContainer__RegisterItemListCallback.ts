// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / RegisterItemListCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RegisterItemListCallback(_me: LingoMe, _this: LingoValue, a_rTarget: LingoValue, a_kMethod: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_mp_itemListCallbacks"), new LingoPropList([symbol("target"), a_rTarget, symbol("method"), a_kMethod]))
  for (var i = 1; i <= meProp(_me, "m_mp_kCat_rGroups").count; ++i) {
  if (meProp(_me, "m_mp_kCat_rGroups")[i].count) {
  callNamed("call", a_kMethod, a_rTarget, meProp(_me, "m_mp_kCat_rGroups"), callMethod("getPropAt", meProp(_me, "m_mp_kCat_rGroups"), i))
  }

  }

}

