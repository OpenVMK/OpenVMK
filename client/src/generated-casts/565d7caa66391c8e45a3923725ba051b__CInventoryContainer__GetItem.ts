// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / GetItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetItem(_me: LingoMe, _this: LingoValue, a_kCat: LingoValue, a_sGroup: LingoValue) {
  if (lingoBinary("or", lingoBinary("eq", a_kCat, symbol("all")), callNamed("voidp", a_kCat))) {
  for (var i = 1; i <= meProp(_me, "m_mp_kCat_rGroups").count; ++i) {
  var t_rGroup = callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[i], a_sGroup);
  if ((lingoTruthy(callNamed("voidp", t_rGroup)) ? 0 : 1)) {
  return t_rGroup;
  }

  }

  return undefined;
  } else {
  return callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[a_kCat], a_sGroup);
  }

}

