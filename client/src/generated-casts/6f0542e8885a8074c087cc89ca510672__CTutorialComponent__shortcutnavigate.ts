// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / shortcutnavigate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function shortcutnavigate(_me: LingoMe) {
  if (callNamed("integerp", meProp(_me, "m_iNavCode"))) {
  callMethod("NavigateToRoom", callMethod("getComponent", callNamed("getThread", "navigator")), meProp(_me, "m_iNavCode"))
  setMeProp(_me, "m_iNavCode", undefined);
  }

}

