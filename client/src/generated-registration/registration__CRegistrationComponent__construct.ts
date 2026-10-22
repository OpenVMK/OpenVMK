// registration.cct / CRegistrationComponent / construct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

