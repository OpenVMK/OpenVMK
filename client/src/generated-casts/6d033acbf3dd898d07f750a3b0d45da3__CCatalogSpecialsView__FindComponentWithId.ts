// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / FindComponentWithId

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindComponentWithId(_me: LingoMe, _this: LingoValue, a_iID: LingoValue) {
  for (var t_rComponent of callMethod("GetComponents", meProp(_me, "m_ar_components")["cat.list"]).toArray()) {
  if (lingoBinary("eq", callMethod("GetNode", callMethod("GetLayout", t_rComponent, 1))["Specials!"][symbol("id")], a_iID)) {
  return t_rComponent;
  }

  }

  return undefined;
}

