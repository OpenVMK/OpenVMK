// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / GetItemDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetItemDetails(_me: LingoMe, _this: LingoValue, a_kCat: LingoValue, a_sGroup: LingoValue) {
  if (lingoBinary("or", lingoBinary("eq", a_kCat, symbol("all")), callNamed("voidp", a_kCat))) {
  for (var i = 1; i <= meProp(_me, "m_mp_kCat_rDetails").count; ++i) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_kCat_rDetails")[i], a_sGroup))) ? 0 : 1)) {
  return callMethod("getaProp", meProp(_me, "m_mp_kCat_rDetails")[i], a_sGroup);
  }

  }

  return undefined;
  } else {
  return callMethod("getaProp", meProp(_me, "m_mp_kCat_rDetails")[a_kCat], a_sGroup);
  }

}

