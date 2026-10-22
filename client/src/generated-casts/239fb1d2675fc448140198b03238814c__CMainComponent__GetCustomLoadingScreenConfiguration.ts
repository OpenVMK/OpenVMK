// 239fb1d2675fc448140198b03238814c.cct / CMainComponent / GetCustomLoadingScreenConfiguration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetCustomLoadingScreenConfiguration(_me: LingoMe) {
  return meProp(_me, "m_rCustomLoadingScreenConfiguration");
}

