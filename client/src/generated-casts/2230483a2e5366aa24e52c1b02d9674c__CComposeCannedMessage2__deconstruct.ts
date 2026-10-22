// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var m_cCurrWord = "";
  setThePropOf(_me, "m_bValidFlag", 0);
  setThePropOf(_me, "m_ar_cWords", new LingoList([]));
  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}

