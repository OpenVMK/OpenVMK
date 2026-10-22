// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / GetItemDetailsByCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetItemDetailsByCategory(_me: LingoMe, _this: LingoValue, a_kCat: LingoValue) {
  if (lingoBinary("eq", a_kCat, symbol("all"))) {
  var t_mp_out = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "m_mp_kCat_rDetails").count; ++i) {
  var t_mpList = meProp(_me, "m_mp_kCat_rDetails")[i];
  for (var j = 1; j <= t_mpList.count; ++j) {
  callMethod("addProp", t_mp_out, callMethod("getPropAt", t_mpList, j), t_mpList[j])
  }

  }

  return t_mp_out;
  } else {
  return meProp(_me, "m_mp_kCat_rDetails")[a_kCat];
  }

}

