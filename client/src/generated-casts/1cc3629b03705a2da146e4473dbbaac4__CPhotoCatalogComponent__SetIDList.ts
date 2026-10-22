// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogComponent / SetIDList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetIDList(_me: LingoMe, a_ar_IDs: LingoValue) {
  var t_ar_removeList = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "m_mp_photos").count; ++i) {
  var tID = callMethod("getPropAt", meProp(_me, "m_mp_photos"), i);
  if (lingoBinary("eq", callMethod("getPos", a_ar_IDs, tID), 0)) {
  callMethod("append", t_ar_removeList, tID)
  }

  }

  for (var tID of t_ar_removeList.toArray()) {
  callMethod("deleteProp", meProp(_me, "m_mp_photos"), tID)
  }

  for (var tID of a_ar_IDs.toArray()) {
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_photos"), tID))) {
  callMethod("addProp", meProp(_me, "m_mp_photos"), tID, new LingoPropList([symbol("thumb"), undefined, symbol("pic"), undefined, symbol("Caption"), undefined, symbol("published"), undefined]))
  callMethod("RequestThumbnail", _me, tID)
  }

  }

}

