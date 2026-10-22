// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreenConfiguration / initializeUrl

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initializeUrl(_me: LingoMe, _this: LingoValue, a_sUrl: LingoValue) {
  callMethod("extractVersionFromText", _this, a_sUrl)
}

