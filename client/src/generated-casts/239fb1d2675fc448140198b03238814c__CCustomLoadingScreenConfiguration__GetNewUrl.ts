// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreenConfiguration / GetNewUrl

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetNewUrl(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iConfVersion", lingoBinary("add", meProp(_me, "m_iConfVersion"), 1));
  var t_sNewUrl = lingoBinary("join", meProp(_me, "m_sBaseUrl"), callNamed("string", meProp(_me, "m_iConfVersion")));
  return t_sNewUrl;
}

