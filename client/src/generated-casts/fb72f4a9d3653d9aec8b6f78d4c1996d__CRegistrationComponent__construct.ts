// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_CatalogIndex", undefined);
  setMeProp(_me, "m_mp_ProductList", undefined);
  setMeProp(_me, "m_mp_RegData", new LingoPropList([]));
  setMeProp(_me, "m_mp_ServerData", new LingoPropList([]));
  setMeProp(_me, "m_ar_HatList", undefined);
  return 1;
}

