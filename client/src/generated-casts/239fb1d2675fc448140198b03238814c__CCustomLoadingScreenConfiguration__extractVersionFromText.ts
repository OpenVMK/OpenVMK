// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreenConfiguration / extractVersionFromText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function extractVersionFromText(_me: LingoMe, _this: LingoValue, a_sText: LingoValue) {
  for (var i = a_sText.length; i >= 1; --i) {
  if (lingoBinary("eq", a_sText.char[i], "_")) {
  setMeProp(_me, "m_sBaseUrl", callNamed("chars", a_sText, 1, i));
  setMeProp(_me, "m_iConfVersion", callNamed("value", callNamed("chars", a_sText, lingoBinary("add", i, 1), a_sText.length)));
  break;
  }

  if (lingoBinary("eq", i, 1)) {
  return callNamed("error", _this, "Unable to extract version from loadingscreen source url!");
  }

  }

}

