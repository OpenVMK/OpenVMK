// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogComponent / getPhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getPhoto(_me: LingoMe, a_iID: LingoValue) {
  return callMethod("getaProp", meProp(_me, "m_mp_photos"), a_iID);
}

