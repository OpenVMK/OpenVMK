// 1cc3629b03705a2da146e4473dbbaac4.cct / CThumbList / getPrevID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getPrevID(_me: LingoMe, a_iCurrentID: LingoValue) {
  for (var i = 1; i <= meProp(_me, "m_ar_items").count; ++i) {
  if (lingoBinary("eq", meProp(_me, "m_ar_items")[i].id, a_iCurrentID)) {
  if (lingoBinary("gt", i, 1)) {
  return meProp(_me, "m_ar_items")[lingoBinary("sub", i, 1)].id;
  }

  }

  }

  return a_iCurrentID;
}

